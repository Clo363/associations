'use strict';
// Web version of the "Associations" game; mirrors the Android app (app/src/main/java/ua/assoc/game).

const T = {
  ru: {
    appName: 'Ассоциации', whoPlays: 'Кто играет?', adults: 'Взрослые', kids: 'Дети',
    kidsNote: 'около 10 лет', adultsNote: 'литература, кино, поговорки',
    levels: ['Лёгкий', 'Средний', 'Сложный'],
    openFifth: 'Открыть 5-ю подсказку', fifthLabel: '5-я подсказка', letter: 'Буква', clear: 'Стереть',
    giveUp: 'Сдаться', giveUpConfirm: 'Показать ответ? Очков за это слово не будет, серия прервётся.',
    cancel: 'Отмена', reward: 'Награда за слово', wrong: 'Не то слово, попробуйте ещё',
    correct: 'Верно!', answerWas: 'Ответ', next: 'Дальше', whyClues: 'Почему эти подсказки',
    wordPts: 'Слово', fifthPenalty: '5-я подсказка', lettersPenalty: 'Открытые буквы',
    streakBonus: 'Серия без подсказок', noPoints: 'Без очков',
    levelDone: 'Все загадки этого уровня пройдены!',
    levelDoneHint: 'Выберите другой уровень сверху или пройдите этот заново.',
    replayLevel: 'Пройти уровень заново', replayShort: 'Заново', loading: 'Загрузка…',
    loadError: 'Не удалось загрузить слова. Проверьте интернет и обновите страницу.',
    settings: 'Настройки', language: 'Язык', audience: 'Кто играет', progress: 'Пройдено',
    score: 'Очки', streak: 'Серия', resetAll: 'Сбросить весь прогресс',
    resetAllConfirm: 'Очки и все отметки о пройденных словах будут удалены.', reset: 'Сбросить',
    howToPlay: 'Как играть', back: 'Назад',
    rules: 'Четыре слова связаны с загаданным словом, и каждое — со своей стороны: через другое значение, ' +
      'поговорку, сказку или фильм, признак. Соберите ответ из букв внизу; лишние буквы — для хитрости.\n\n' +
      'Если трудно — откройте 5-ю подсказку или букву, но награда станет меньше. ' +
      'Слова, угаданные подряд без подсказок, дают бонус серии.\n\n' +
      'Уровень сложности можно менять в любой момент; пройденные слова не повторяются.\n\n' +
      'На iPhone: «Поделиться» → «На экран „Домой“», и игра будет открываться как приложение.',
  },
  uk: {
    appName: 'Асоціації', whoPlays: 'Хто грає?', adults: 'Дорослі', kids: 'Діти',
    kidsNote: 'близько 10 років', adultsNote: 'література, кіно, приказки',
    levels: ['Легкий', 'Середній', 'Складний'],
    openFifth: 'Відкрити 5-ту підказку', fifthLabel: '5-та підказка', letter: 'Літера', clear: 'Стерти',
    giveUp: 'Здатися', giveUpConfirm: 'Показати відповідь? Балів за це слово не буде, серія перерветься.',
    cancel: 'Скасувати', reward: 'Нагорода за слово', wrong: 'Не те слово, спробуйте ще',
    correct: 'Правильно!', answerWas: 'Відповідь', next: 'Далі', whyClues: 'Чому ці підказки',
    wordPts: 'Слово', fifthPenalty: '5-та підказка', lettersPenalty: 'Відкриті літери',
    streakBonus: 'Серія без підказок', noPoints: 'Без балів',
    levelDone: 'Усі загадки цього рівня пройдено!',
    levelDoneHint: 'Оберіть інший рівень угорі або пройдіть цей знову.',
    replayLevel: 'Пройти рівень знову', replayShort: 'Знову', loading: 'Завантаження…',
    loadError: 'Не вдалося завантажити слова. Перевірте інтернет і оновіть сторінку.',
    settings: 'Налаштування', language: 'Мова', audience: 'Хто грає', progress: 'Пройдено',
    score: 'Бали', streak: 'Серія', resetAll: 'Скинути весь прогрес',
    resetAllConfirm: 'Бали та всі позначки про пройдені слова буде видалено.', reset: 'Скинути',
    howToPlay: 'Як грати', back: 'Назад',
    rules: 'Чотири слова пов\'язані із загаданим словом, і кожне — зі свого боку: через інше значення, ' +
      'приказку, казку чи фільм, ознаку. Складіть відповідь з літер унизу; зайві літери — для хитрощів.\n\n' +
      'Якщо важко — відкрийте 5-ту підказку або літеру, але нагорода стане меншою. ' +
      'Слова, вгадані поспіль без підказок, дають бонус серії.\n\n' +
      'Рівень складності можна змінювати будь-коли; пройдені слова не повторюються.\n\n' +
      'На iPhone: «Поділитися» → «На початковий екран», і гра відкриватиметься як застосунок.',
  },
};

// Decoy letters, roughly by frequency (same as the Android app).
const POOL = {
  ru: 'ОООООЕЕЕЕАААААИИИИНННТТТССССРРРВВВЛЛЛКККММДДППУУЯЫЬГЗБЧЙХЖШЮЦЩФЭ',
  uk: 'ОООООАААААИИИИНННЕЕЕІІІТТТРРРВВВССКККЛЛДДМММУУППЯЗЬБГЧХЙЖШЮЦЄЇЩФҐ',
};

const Scoring = {
  base: lv => lv * 10,
  fifthCost: lv => Math.floor(lv * 10 * 4 / 10),
  letterCost: lv => Math.floor(lv * 10 * 2 / 10),
  minReward: lv => Math.max(1, lv),
  wordReward(lv, fifth, letters) {
    const r = this.base(lv) - (fifth ? this.fifthCost(lv) : 0) - letters * this.letterCost(lv);
    return Math.max(this.minReward(lv), r);
  },
  streakBonus: streak => Math.max(0, Math.min(streak - 1, 5) * 2),
};

// localStorage can be unavailable (private mode etc.) — the game still works, just forgets.
const store = {
  get(k, d) { try { const v = localStorage.getItem('assoc.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('assoc.' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
  del(k) { try { localStorage.removeItem('assoc.' + k); } catch (e) { /* ignore */ } },
  keys() { try { return Object.keys(localStorage).filter(k => k.startsWith('assoc.')).map(k => k.slice(6)); } catch (e) { return []; } },
};

const S = {
  screen: 'onboard', onboardLang: null,
  lang: store.get('lang', null), aud: store.get('audience', null),
  level: store.get('level', 1), score: store.get('score', 0), streak: store.get('streak', 0),
  data: {}, loading: false, loadError: false,
  puzzle: null, ans: [], tiles: [], slots: [], locked: new Set(), fifth: false,
  wrong: false, shake: false, levelDone: false, result: null, solved: new Set(), dialog: null,
};

const t = () => T[S.lang || 'ru'];
const baseKey = () => S.lang + '_' + S.aud;
const all = () => S.data[baseKey()] || [];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Answer letters plus decoys, shuffled; stable for a given seed. Tile id = index. */
function makeTiles(ans, lang, seed) {
  let total = Math.min(14, Math.max(10, ans.length + 5));
  if (total % 2) total++;
  const rnd = mulberry32(seed);
  const pool = POOL[lang];
  const chars = ans.slice();
  while (chars.length < total) chars.push(pool[Math.floor(rnd() * pool.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars;
}

// ------------------------------------------------------------------ game logic

async function openBase() {
  const key = baseKey();
  document.documentElement.lang = S.lang;
  S.solved = new Set(store.get('solved_' + key, []));
  if (!S.data[key]) {
    S.loading = true; S.loadError = false; render();
    try {
      const r = await fetch('data/' + key + '.json');
      if (!r.ok) throw new Error(r.status);
      S.data[key] = await r.json();
    } catch (e) {
      S.loadError = true;
    }
    S.loading = false;
  }
  loadCurrent();
  render();
}

function loadCurrent() {
  const key = baseKey();
  const list = all().filter(p => p.level === S.level);
  const remaining = list.filter(p => !S.solved.has(p.answer));
  const saved = store.get(`cur_${key}_${S.level}`, null);
  const p = remaining.find(x => x.answer === saved) ||
    (remaining.length ? remaining[Math.floor(Math.random() * remaining.length)] : null);
  store.set(`cur_${key}_${S.level}`, p ? p.answer : null);
  S.levelDone = !p && list.length > 0;
  S.puzzle = p; S.wrong = false; S.locked = new Set();
  if (!p) { S.ans = []; S.tiles = []; S.slots = []; S.fifth = false; return; }
  S.ans = [...p.answer];
  S.tiles = makeTiles(S.ans, S.lang, hash(key + p.answer));
  S.slots = S.ans.map(() => null);
  S.fifth = store.get(`h5_${key}_${p.answer}`, false);
  for (const pos of store.get(`hl_${key}_${p.answer}`, [])) if (pos < S.ans.length) revealAt(pos);
}

function tapTile(i) {
  if (S.slots.includes(i)) return;
  const idx = S.slots.indexOf(null);
  if (idx < 0) return;
  S.slots[idx] = i;
  S.wrong = false;
  checkFull();
}

function tapSlot(i) {
  if (S.locked.has(i) || S.slots[i] === null) return;
  S.slots[i] = null;
  S.wrong = false;
}

function clearSlots() {
  S.slots = S.slots.map((v, i) => (S.locked.has(i) ? v : null));
  S.wrong = false;
}

function checkFull() {
  if (!S.puzzle || S.slots.includes(null)) return;
  const word = S.slots.map(i => S.tiles[i]).join('');
  if (word === S.puzzle.answer) solve();
  else { S.wrong = true; S.shake = true; }
}

const canRevealLetter = () => S.puzzle && S.slots.length - S.locked.size > 1;

function openFifth() {
  if (!S.puzzle || S.fifth) return;
  S.fifth = true;
  store.set(`h5_${baseKey()}_${S.puzzle.answer}`, true);
}

function revealLetter() {
  if (!canRevealLetter()) return;
  // Skip positions the player already filled correctly, so the hint isn't wasted.
  const pos = S.ans.findIndex((ch, i) => !S.locked.has(i) && (S.slots[i] === null || S.tiles[S.slots[i]] !== ch));
  if (pos < 0) return;
  revealAt(pos);
  store.set(`hl_${baseKey()}_${S.puzzle.answer}`, [...S.locked]);
  S.wrong = false;
  checkFull();
}

function revealAt(pos) {
  if (S.locked.has(pos)) return;
  const ch = S.ans[pos];
  S.slots[pos] = null;
  let id = S.tiles.findIndex((c, i) => c === ch && !S.slots.includes(i));
  if (id < 0) {
    // Every letter of the answer is among the tiles, so it must sit in another unlocked slot.
    const j = S.slots.findIndex((s, k) => !S.locked.has(k) && s !== null && S.tiles[s] === ch);
    id = S.slots[j];
    S.slots[j] = null;
  }
  S.slots[pos] = id;
  S.locked.add(pos);
}

function solve() {
  const p = S.puzzle;
  const clean = !S.fifth && S.locked.size === 0;
  const streak = clean ? S.streak + 1 : 0;
  const r = {
    puzzle: p, gaveUp: false,
    wordPts: Scoring.wordReward(p.level, S.fifth, S.locked.size),
    fifthPenalty: S.fifth ? Scoring.fifthCost(p.level) : 0,
    letters: S.locked.size, lettersPenalty: S.locked.size * Scoring.letterCost(p.level),
    streak, streakBonus: clean ? Scoring.streakBonus(streak) : 0,
  };
  r.total = r.wordPts + r.streakBonus;
  S.score += r.total;
  S.streak = streak;
  finish(r);
}

function giveUp() {
  S.streak = 0;
  finish({ puzzle: S.puzzle, gaveUp: true, total: 0 });
}

function finish(r) {
  const key = baseKey();
  store.set('score', S.score);
  store.set('streak', S.streak);
  S.solved.add(r.puzzle.answer);
  store.set('solved_' + key, [...S.solved]);
  store.del(`h5_${key}_${r.puzzle.answer}`);
  store.del(`hl_${key}_${r.puzzle.answer}`);
  store.set(`cur_${key}_${S.level}`, null);
  S.result = r;
  S.screen = 'result';
  window.scrollTo(0, 0);
}

function counts(lv) {
  const list = all().filter(p => p.level === lv);
  return [list.filter(p => S.solved.has(p.answer)).length, list.length];
}

function replayLevel(lv) {
  const answers = new Set(all().filter(p => p.level === lv).map(p => p.answer));
  S.solved = new Set([...S.solved].filter(a => !answers.has(a)));
  store.set('solved_' + baseKey(), [...S.solved]);
  if (lv === S.level) loadCurrent();
}

function resetAll() {
  for (const k of store.keys()) if (!['lang', 'audience', 'level'].includes(k)) store.del(k);
  S.score = 0; S.streak = 0; S.solved = new Set();
  loadCurrent();
}

function setBase(lang, aud) {
  S.lang = lang; S.aud = aud;
  store.set('lang', lang); store.set('audience', aud);
  openBase();
}

// ------------------------------------------------------------------ rendering

const ICON = {
  star: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 17.3l6.2 3.7-1.6-7 5.4-4.7-7.1-.6L12 2 9.1 8.7 2 9.3l5.4 4.7-1.6 7z"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><path d="M19.1 12.9a7 7 0 000-1.8l2-1.6-2-3.4-2.4 1a7 7 0 00-1.6-.9L14.8 3h-4l-.3 2.6a7 7 0 00-1.6.9l-2.4-1-2 3.4 2 1.6a7 7 0 000 1.8l-2 1.6 2 3.4 2.4-1a7 7 0 001.6.9l.3 2.6h4l.3-2.6a7 7 0 001.6-.9l2.4 1 2-3.4zM12.8 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z"/></svg>',
  logo: '<svg class="logo" viewBox="0 0 108 108"><rect width="108" height="108" rx="26" fill="#5b3fd9"/>' +
    '<path d="M33 33L75 75M75 33L33 75" stroke="#fff" stroke-opacity=".7" stroke-width="4" stroke-linecap="round"/>' +
    '<g fill="#fff"><rect x="24" y="24" width="18" height="18" rx="4"/><rect x="66" y="24" width="18" height="18" rx="4"/>' +
    '<rect x="24" y="66" width="18" height="18" rx="4"/><rect x="66" y="66" width="18" height="18" rx="4"/></g>' +
    '<circle cx="54" cy="54" r="13" fill="#ffc83d"/></svg>',
};

function seg(items, selected, action) {
  return '<div class="seg">' + items.map(([title, sub], i) =>
    `<button class="${i === selected ? 'on' : ''}" data-a="${action}" data-v="${i}"><b>${esc(title)}</b>` +
    (sub ? `<small>${esc(sub)}</small>` : '') + '</button>').join('') + '</div>';
}

function viewOnboard() {
  if (!S.onboardLang) {
    return `<div class="screen center">${ICON.logo}<h1>Ассоциации · Асоціації</h1>
      <button class="big" data-a="obLang" data-v="ru"><b>Русский</b></button>
      <button class="big" data-a="obLang" data-v="uk"><b>Українська</b></button></div>`;
  }
  const x = T[S.onboardLang];
  return `<div class="screen center">${ICON.logo}<h1>${esc(x.appName)}</h1><div>${esc(x.whoPlays)}</div>
    <button class="big" data-a="obAud" data-v="adult"><b>${esc(x.adults)}</b><span>${esc(x.adultsNote)}</span></button>
    <button class="big" data-a="obAud" data-v="kids"><b>${esc(x.kids)}</b><span>${esc(x.kidsNote)}</span></button></div>`;
}

function viewGame() {
  const x = t();
  let h = `<div class="screen"><div class="top"><span class="chip score">${ICON.star}${S.score}</span>` +
    (S.streak > 0 ? `<span class="chip streak">🔥 ${S.streak}</span>` : '') +
    `<span class="aud">${esc(S.aud === 'kids' ? x.kids : x.adults)}</span>` +
    `<button class="icon" data-a="settings" aria-label="${esc(x.settings)}">${ICON.gear}</button></div>`;
  h += seg([1, 2, 3].map(lv => { const [d, n] = counts(lv); return [x.levels[lv - 1], `${d}/${n}`]; }), S.level - 1, 'level');

  const p = S.puzzle;
  if (S.loading) return h + `<div class="screen center muted">${esc(x.loading)}</div></div>`;
  if (S.loadError) return h + `<div class="screen center muted">${esc(x.loadError)}</div></div>`;
  if (!p && S.levelDone) {
    return h + `<div class="screen center"><div style="font-size:56px">🏆</div><h2>${esc(x.levelDone)}</h2>
      <p class="muted">${esc(x.levelDoneHint)}</p>
      <button class="btn filled" data-a="replay" data-v="${S.level}">${esc(x.replayLevel)}</button></div></div>`;
  }
  if (!p) return h + '</div>';

  const clue = (c, extra) => `<div class="clue${extra ? ' extra' : ''}${c.w.length > 11 ? ' small' : ''}">${esc(cap(c.w))}</div>`;
  h += '<div class="clues">' + p.clues.slice(0, 4).map(c => clue(c, false)).join('') + '</div>';
  h += S.fifth ? clue(p.clues[4], true)
    : `<button class="btn outline wide" data-a="fifth">${esc(x.openFifth)} &nbsp;−${Scoring.fifthCost(p.level)}</button>`;
  h += `<div class="grow"></div><div class="reward">${esc(x.reward)}: ${Scoring.wordReward(p.level, S.fifth, S.locked.size)}</div>`;
  h += `<div class="slots${S.wrong ? ' wrong' : ''}" id="slots" style="--n:${S.ans.length}">` + S.slots.map((id, i) =>
    `<button class="slot${id !== null ? ' filled' : ''}${S.locked.has(i) ? ' locked' : ''}" data-a="slot" data-v="${i}">` +
    (id !== null ? esc(S.tiles[id]) : '') + '</button>').join('') + '</div>';
  h += `<div class="msg">${S.wrong ? esc(x.wrong) : ''}</div>`;
  h += `<div class="tiles" style="--cols:${Math.ceil(S.tiles.length / 2)}">` + S.tiles.map((c, i) => {
    const used = S.slots.includes(i);
    return `<button class="tile${used ? ' used' : ''}" data-a="tile" data-v="${i}"${used ? ' disabled' : ''}>${esc(c)}</button>`;
  }).join('') + '</div>';
  h += `<div class="grow"></div><div class="actions">
    <button class="btn tonal" data-a="letter"${canRevealLetter() ? '' : ' disabled'}>${esc(x.letter)} −${Scoring.letterCost(p.level)}</button>
    <button class="btn outline" data-a="clear">${esc(x.clear)}</button>
    <button class="btn text" data-a="giveup">${esc(x.giveUp)}</button></div></div>`;
  return h;
}

function viewResult() {
  const x = t(), r = S.result, p = r.puzzle;
  let h = `<div class="screen"><div class="scroll"><div class="verdict${r.gaveUp ? '' : ' ok'}">${esc(r.gaveUp ? x.answerWas : x.correct)}</div>
    <div class="answer">${esc(p.answer)}</div>`;
  if (r.gaveUp) {
    h += `<p class="muted" style="text-align:center">${esc(x.noPoints)}</p>`;
  } else {
    const line = (a, b) => `<div class="line"><span>${esc(a)}</span><b>${esc(b)}</b></div>`;
    h += `<div class="card"><div class="total">+${r.total} ⭐</div>` +
      line(`${x.wordPts} · ${x.levels[p.level - 1]}`, `+${Scoring.base(p.level)}`) +
      (r.fifthPenalty ? line(x.fifthPenalty, `−${r.fifthPenalty}`) : '') +
      (r.letters ? line(`${x.lettersPenalty} ×${r.letters}`, `−${r.lettersPenalty}`) : '') +
      (r.streakBonus ? line(`${x.streakBonus} ×${r.streak}`, `+${r.streakBonus}`) : '') + '</div>';
  }
  h += `<h2>${esc(x.whyClues)}</h2>` + p.clues.map((c, i) =>
    `<div class="ex${i === 4 ? ' extra' : ''}"><b>${esc(cap(c.w))}</b>${i === 4 ? `<small>· ${esc(x.fifthLabel)}</small>` : ''}<p>${esc(c.e)}</p></div>`
  ).join('');
  h += `</div><div class="grow"></div><div class="bottom sticky"><button class="btn filled wide" data-a="next">${esc(x.next)}</button></div></div>`;
  return h;
}

function viewSettings() {
  const x = t();
  let h = `<div class="screen"><div class="head"><button class="icon" data-a="back" aria-label="${esc(x.back)}">${ICON.back}</button><h1>${esc(x.settings)}</h1></div>`;
  h += `<h2>${esc(x.language)}</h2>` + seg([['Русский'], ['Українська']], S.lang === 'ru' ? 0 : 1, 'setLang');
  h += `<h2>${esc(x.audience)}</h2>` + seg([[x.adults], [x.kids, x.kidsNote]], S.aud === 'adult' ? 0 : 1, 'setAud');
  h += `<h2>${esc(x.progress)}</h2>`;
  for (const lv of [1, 2, 3]) {
    const [d, n] = counts(lv);
    h += `<div class="row"><span>${esc(x.levels[lv - 1])}: ${d} / ${n}</span>
      <button class="btn text" data-a="replay" data-v="${lv}"${d ? '' : ' disabled'}>${esc(x.replayShort)}</button></div>`;
  }
  h += `<div class="row"><b>${esc(x.score)}: ${S.score} &nbsp; ${esc(x.streak)}: ${S.streak}</b></div>`;
  h += `<h2>${esc(x.howToPlay)}</h2><p class="rules">${esc(x.rules)}</p>`;
  h += `<div class="bottom"><button class="btn danger wide" data-a="askReset">${esc(x.resetAll)}</button></div></div>`;
  return h;
}

function viewDialog() {
  const x = t();
  if (S.dialog === 'giveup') {
    return `<div class="overlay" data-a="closeDialog"><div class="dialog"><p>${esc(x.giveUpConfirm)}</p>
      <div class="btns"><button class="btn text" data-a="closeDialog">${esc(x.cancel)}</button>
      <button class="btn text" data-a="confirmGiveUp">${esc(x.giveUp)}</button></div></div></div>`;
  }
  if (S.dialog === 'reset') {
    return `<div class="overlay" data-a="closeDialog"><div class="dialog"><h3>${esc(x.resetAll)}</h3><p>${esc(x.resetAllConfirm)}</p>
      <div class="btns"><button class="btn text" data-a="closeDialog">${esc(x.cancel)}</button>
      <button class="btn text" style="color:var(--error)" data-a="confirmReset">${esc(x.reset)}</button></div></div></div>`;
  }
  return '';
}

const $app = document.getElementById('app');

function render() {
  const views = { onboard: viewOnboard, game: viewGame, result: viewResult, settings: viewSettings };
  $app.innerHTML = views[S.screen]() + viewDialog();
  if (S.shake) {
    S.shake = false;
    const el = document.getElementById('slots');
    if (el) el.classList.add('shake');
  }
}

const actions = {
  obLang: v => { S.onboardLang = v; },
  obAud: v => { S.screen = 'game'; setBase(S.onboardLang, v); },
  level: v => { const lv = Number(v) + 1; if (lv !== S.level) { S.level = lv; store.set('level', lv); loadCurrent(); } },
  tile: v => tapTile(Number(v)),
  slot: v => tapSlot(Number(v)),
  clear: clearSlots,
  fifth: openFifth,
  letter: revealLetter,
  giveup: () => { S.dialog = 'giveup'; },
  confirmGiveUp: () => { S.dialog = null; giveUp(); },
  next: () => { S.result = null; S.screen = 'game'; loadCurrent(); },
  settings: () => { S.screen = 'settings'; window.scrollTo(0, 0); },
  back: () => { S.screen = 'game'; },
  setLang: v => setBase(v === '0' ? 'ru' : 'uk', S.aud),
  setAud: v => setBase(S.lang, v === '0' ? 'adult' : 'kids'),
  replay: v => replayLevel(Number(v)),
  askReset: () => { S.dialog = 'reset'; },
  confirmReset: () => { S.dialog = null; resetAll(); },
  closeDialog: () => { S.dialog = null; },
};

$app.addEventListener('click', e => {
  const el = e.target.closest('[data-a]');
  if (!el || el.disabled) return;
  // Clicks inside a dialog card must not close it via the overlay.
  if (el.classList.contains('overlay') && e.target !== el) return;
  const fn = actions[el.dataset.a];
  if (!fn) return;
  fn(el.dataset.v);
  render();
});

if (S.lang && S.aud) {
  S.screen = 'game';
  openBase();
} else {
  render();
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
