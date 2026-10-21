'use strict';
// League backend: Firebase anonymous auth + Firestore, over plain REST (no SDK, works the same from the APK later).
// The API key is a public project identifier, not a secret; access is limited by web/firestore.rules.

const FB = { apiKey: 'AIzaSyC9TWtU-nlDOKmK5aEK7jW6BVsgdblbAQ4', project: 'associations-game-57918' };
const FS_URL = `https://firestore.googleapis.com/v1/projects/${FB.project}/databases/(default)/documents`;
const BASES = ['ru_adult', 'ru_kids', 'uk_adult', 'uk_kids'];

let tokenPromise = null;

/** Anonymous Firebase ID token; signs up once per device and refreshes after an hour. */
function idToken() {
  const a = store.get('auth', null);
  if (a && a.exp > Date.now() + 60000) return Promise.resolve(a.id);
  if (!tokenPromise) tokenPromise = fetchToken(a).finally(() => { tokenPromise = null; });
  return tokenPromise;
}

async function fetchToken(a) {
  if (a && a.refresh) {
    const r = await fetch(`https://securetoken.googleapis.com/v1/token?key=${FB.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(a.refresh),
    });
    if (r.ok) {
      const j = await r.json();
      store.set('auth', { id: j.id_token, refresh: j.refresh_token, exp: Date.now() + Number(j.expires_in) * 1000 });
      return j.id_token;
    }
    // A rejected refresh token (e.g. the anonymous account was removed) falls through to a fresh sign-up.
  }
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FB.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"returnSecureToken":true}',
  });
  if (!r.ok) throw Object.assign(new Error('auth ' + r.status), { status: r.status });
  const j = await r.json();
  store.set('auth', { id: j.idToken, refresh: j.refreshToken, exp: Date.now() + Number(j.expiresIn) * 1000 });
  return j.idToken;
}

// Firestore REST value encoding.
function enc(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'string') return { stringValue: v };
  return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, enc(x)])) } };
}

function dec(v) {
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('mapValue' in v) return decFields(v.mapValue.fields || {});
  return null;
}

const decFields = f => Object.fromEntries(Object.entries(f).map(([k, x]) => [k, dec(x)]));

/** One Firestore REST call; resolves to null on 404. */
async function fs(method, path, body, query) {
  const tok = await idToken();
  const r = await fetch(`${FS_URL}/${path}${query || ''}`, {
    method,
    headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (r.status === 404) return null;
  if (!r.ok) throw Object.assign(new Error('firestore ' + r.status), { status: r.status });
  return r.json();
}

/** Player document id: the name itself, so the same name on another device continues the same record. */
const playerKey = name => name.trim().replace(/\s+/g, ' ').toLowerCase().replace(/\//g, '_').slice(0, 30);
const playerPath = (code, key) => `leagues/${code}/players/${encodeURIComponent(key)}`;

function randomCode() {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const b = new Uint8Array(6);
  crypto.getRandomValues(b);
  return [...b].map(x => abc[x % abc.length]).join('');
}

async function fetchLeague(code) {
  const d = await fs('GET', 'leagues/' + code);
  return d ? decFields(d.fields || {}) : null;
}

/** Creates a league with a fresh code; returns the code. level 0 = players pick any difficulty. */
async function createLeagueDoc(name, base, level, creator) {
  for (let i = 0; i < 5; i++) {
    const code = randomCode();
    try {
      await fs('POST', 'leagues', {
        fields: { name: enc(name), base: enc(base), level: enc(level), createdAt: enc(Date.now()), creator: enc(creator) },
      }, '?documentId=' + code);
      return code;
    } catch (e) {
      if (e.status !== 409) throw e; // 409 = this code is taken, try another
    }
  }
  throw new Error('no free league code');
}

async function fetchPlayer(code, key) {
  const d = await fs('GET', playerPath(code, key));
  return d ? decFields(d.fields || {}) : null;
}

async function savePlayer(code, key, name, results) {
  await fs('PATCH', playerPath(code, key), {
    fields: { name: enc(name), updatedAt: enc(Date.now()), results: enc(results) },
  });
}

async function fetchPlayers(code) {
  const j = await fs('GET', `leagues/${code}/players`, null, '?pageSize=300');
  return ((j && j.documents) || []).map(d => {
    const f = decFields(d.fields || {});
    let key = d.name.split('/').pop();
    try { key = decodeURIComponent(key); } catch (e) { /* keep as is */ }
    return { key, name: f.name || key, results: f.results || {} };
  });
}

/** Aggregates one player's results map: points, solved per level, clean solves, give-ups. */
function leagueStats(results) {
  const s = { pts: 0, lv: [0, 0, 0], clean: 0, gave: 0, done: 0 };
  for (const r of Object.values(results)) {
    s.done++;
    s.pts += r.p || 0;
    if (r.g) s.gave++;
    else {
      s.lv[(r.l || 1) - 1]++;
      if (!r.f && !r.n) s.clean++;
    }
  }
  return s;
}

/** Status icon for one result. */
function resultIcon(r) {
  if (r.g) return '🏳️';
  if (r.f && r.n) return '💡🔤';
  if (r.f) return '💡';
  if (r.n) return '🔤';
  return '✅';
}
