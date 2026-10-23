'use strict';
// Web version of the "Associations" game; mirrors the Android app (app/src/main/java/ua/assoc/game).
// League networking lives in league.js.

const T = {
  ru: {
    appName: 'Ассоциации', whoPlays: 'Кто играет?', adults: 'Взрослые', kids: 'Дети',
    kidsNote: 'около 10 лет', adultsNote: 'литература, кино, поговорки',
    levels: ['Лёгкий', 'Средний', 'Сложный'],
    openFifth: 'Открыть доп. подсказку', openExtra: 'Открыть', fifthLabel: 'доп. подсказка', letter: 'Буква', clear: 'Стереть',
    giveUp: 'Сдаться', giveUpConfirm: 'Показать ответ? Очков за это слово не будет, серия прервётся.',
    cancel: 'Отмена', reward: 'Награда за слово', wrong: 'Не то слово, попробуйте ещё',
    correct: 'Верно!', answerWas: 'Ответ', next: 'Дальше', whyClues: 'Почему эти подсказки',
    wordPts: 'Слово', fifthPenalty: 'Доп. подсказка', lettersPenalty: 'Открытые буквы',
    streakBonus: 'Серия без подсказок', noPoints: 'Без очков',
    levelDone: 'Все загадки этого уровня пройдены!',
    levelDoneHint: 'Выберите другой уровень сверху или пройдите этот заново.',
    levelDoneLeague: 'Выберите другой уровень сверху.',
    replayLevel: 'Пройти уровень заново', replayShort: 'Заново', loading: 'Загрузка…',
    loadError: 'Не удалось загрузить слова. Проверьте интернет и обновите страницу.',
    settings: 'Настройки', language: 'Язык', audience: 'Кто играет', progress: 'Пройдено',
    score: 'Очки', streak: 'Серия', resetAll: 'Сбросить весь прогресс',
    resetAllConfirm: 'Очки и все отметки о пройденных словах будут удалены. Результаты в лигах останутся.', reset: 'Сбросить',
    howToPlay: 'Как играть', back: 'Назад',
    rules: 'Четыре слова связаны с загаданным словом, и каждое — со своей стороны: через другое значение, ' +
      'поговорку, сказку или фильм, признак. Соберите ответ из букв внизу; лишние буквы — для хитрости.\n\n' +
      'Если трудно — откройте 5-ю подсказку или букву, но награда станет меньше. ' +
      'Слова, угаданные подряд без подсказок, дают бонус серии.\n\n' +
      'Уровень сложности можно менять в любой момент; пройденные слова не повторяются.\n\n' +
      'На iPhone: «Поделиться» → «На экран „Домой“», и игра будет открываться как приложение.',
    league: 'Лига', leagueIntro: 'Соревнуйтесь с друзьями: все участники лиги проходят одни и те же слова в одном порядке, а в таблице видно, кто как угадал.',
    createLeague: 'Создать лигу', joinLeague: 'Войти в лигу по коду', leagueName: 'Название лиги',
    yourName: 'Ваше имя', words: 'Слова', code: 'Код лиги', create: 'Создать', join: 'Войти',
    invitedTo: 'Вас пригласили в лигу', joinHint: 'Если вы уже играли в этой лиге на другом устройстве, введите то же имя — результаты подтянутся.',
    invite: 'Пригласить', play: 'Играть', table: 'Таблица', copied: 'Ссылка скопирована',
    inviteText: 'Играем в «Ассоциации» в лиге', leave: 'Свободная игра',
    leaveConfirm: 'Перейти в свободную игру? Результаты в лиге сохранятся, вернуться можно по коду лиги.',
    leaveOk: 'Перейти', offline: 'Нет связи с сервером. Ваши результаты сохранены и отправятся позже.',
    notFound: 'Лига с таким кодом не найдена', needName: 'Введите имя', needLeagueName: 'Введите название лиги',
    nobody: 'Пока никто не прошёл ни одного слова', you: 'вы', pts: 'очк.', clean: 'без подсказок',
    gaveUp: 'сдался', hiddenWord: '• • •', hiddenHint: 'Ответы видны только для слов, которые вы уже прошли.',
    refresh: 'Обновить', legend: '✅ без подсказок · 💡 доп. подсказка · 🔤 буквы · 🏳️ сдался',
    baseLabel: 'Слова в лиге', levelLabel: 'Сложность', anyLevel: 'Любая',
    packLabel: 'Набор слов', allPacks: 'Все наборы', pack: 'Набор', onlyPack: 'Только набор',
    packsLabel: 'Наборы слов', packsHint: 'Снимите наборы, которые все уже прошли.',
    packHint: 'Пройденные слова не повторяются. Если прогресс потерялся, выберите только новый набор.',
    newPack: 'Новый набор: +{n} сложных слов! Выбрать набор можно в настройках.',
    rate: 'Как вам загадка?', like: 'Нравится', dislike: 'Не нравится',
  },
  uk: {
    appName: 'Асоціації', whoPlays: 'Хто грає?', adults: 'Дорослі', kids: 'Діти',
    kidsNote: 'близько 10 років', adultsNote: 'література, кіно, приказки',
    levels: ['Легкий', 'Середній', 'Складний'],
    openFifth: 'Відкрити дод. підказку', openExtra: 'Відкрити', fifthLabel: 'дод. підказка', letter: 'Літера', clear: 'Стерти',
    giveUp: 'Здатися', giveUpConfirm: 'Показати відповідь? Балів за це слово не буде, серія перерветься.',
    cancel: 'Скасувати', reward: 'Нагорода за слово', wrong: 'Не те слово, спробуйте ще',
    correct: 'Правильно!', answerWas: 'Відповідь', next: 'Далі', whyClues: 'Чому ці підказки',
    wordPts: 'Слово', fifthPenalty: 'Дод. підказка', lettersPenalty: 'Відкриті літери',
    streakBonus: 'Серія без підказок', noPoints: 'Без балів',
    levelDone: 'Усі загадки цього рівня пройдено!',
    levelDoneHint: 'Оберіть інший рівень угорі або пройдіть цей знову.',
    levelDoneLeague: 'Оберіть інший рівень угорі.',
    replayLevel: 'Пройти рівень знову', replayShort: 'Знову', loading: 'Завантаження…',
    loadError: 'Не вдалося завантажити слова. Перевірте інтернет і оновіть сторінку.',
    settings: 'Налаштування', language: 'Мова', audience: 'Хто грає', progress: 'Пройдено',
    score: 'Бали', streak: 'Серія', resetAll: 'Скинути весь прогрес',
    resetAllConfirm: 'Бали та всі позначки про пройдені слова буде видалено. Результати в лігах залишаться.', reset: 'Скинути',
    howToPlay: 'Як грати', back: 'Назад',
    rules: 'Чотири слова пов\'язані із загаданим словом, і кожне — зі свого боку: через інше значення, ' +
      'приказку, казку чи фільм, ознаку. Складіть відповідь з літер унизу; зайві літери — для хитрощів.\n\n' +
      'Якщо важко — відкрийте 5-ту підказку або літеру, але нагорода стане меншою. ' +
      'Слова, вгадані поспіль без підказок, дають бонус серії.\n\n' +
      'Рівень складності можна змінювати будь-коли; пройдені слова не повторюються.\n\n' +
      'На iPhone: «Поділитися» → «На початковий екран», і гра відкриватиметься як застосунок.',
    league: 'Ліга', leagueIntro: 'Змагайтеся з друзями: усі учасники ліги проходять ті самі слова в одному порядку, а в таблиці видно, хто як вгадав.',
    createLeague: 'Створити лігу', joinLeague: 'Увійти в лігу за кодом', leagueName: 'Назва ліги',
    yourName: 'Ваше ім\'я', words: 'Слова', code: 'Код ліги', create: 'Створити', join: 'Увійти',
    invitedTo: 'Вас запросили до ліги', joinHint: 'Якщо ви вже грали в цій лізі на іншому пристрої, введіть те саме ім\'я — результати підтягнуться.',
    invite: 'Запросити', play: 'Грати', table: 'Таблиця', copied: 'Посилання скопійовано',
    inviteText: 'Граємо в «Асоціації» в лізі', leave: 'Вільна гра',
    leaveConfirm: 'Перейти до вільної гри? Результати в лізі збережуться, повернутися можна за кодом ліги.',
    leaveOk: 'Перейти', offline: 'Немає зв\'язку з сервером. Ваші результати збережено, їх буде надіслано пізніше.',
    notFound: 'Лігу з таким кодом не знайдено', needName: 'Введіть ім\'я', needLeagueName: 'Введіть назву ліги',
    nobody: 'Поки ніхто не пройшов жодного слова', you: 'ви', pts: 'бал.', clean: 'без підказок',
    gaveUp: 'здався', hiddenWord: '• • •', hiddenHint: 'Відповіді видно лише для слів, які ви вже пройшли.',
    refresh: 'Оновити', legend: '✅ без підказок · 💡 дод. підказка · 🔤 літери · 🏳️ здався',
    baseLabel: 'Слова в лізі', levelLabel: 'Складність', anyLevel: 'Будь-яка',
    packLabel: 'Набір слів', allPacks: 'Усі набори', pack: 'Набір', onlyPack: 'Лише набір',
    packsLabel: 'Набори слів', packsHint: 'Зніміть набори, які всі вже пройшли.',
    packHint: 'Пройдені слова не повторюються. Якщо прогрес загубився, оберіть лише новий набір.',
    newPack: 'Новий набір: +{n} складних слів! Обрати набір можна в налаштуваннях.',
    rate: 'Як вам загадка?', like: 'Подобається', dislike: 'Не подобається',
  },
};

const BASE_NAMES = {
  ru_adult: 'RU · взрослые', ru_kids: 'RU · дети', uk_adult: 'UA · дорослі', uk_kids: 'UA · діти',
  ru_all: 'RU · взрослые + дети', uk_all: 'UA · дорослі + діти',
};
/** Word sets a league can use: the four bases plus adult+kids mixes of one language. */
const LEAGUE_BASES = ['ru_adult', 'ru_kids', 'uk_adult', 'uk_kids', 'ru_all', 'uk_all'];
/** Files behind a word set: a mix is the adult and the kids base of the same language. */
const baseParts = key => (key.endsWith('_all') ? [key.slice(0, 2) + '_adult', key.slice(0, 2) + '_kids'] : [key]);

/** Loads a word set; each puzzle remembers its own base (for votes). In a mix an answer present in both bases is kept once. */
async function ensureData(key) {
  if (S.data[key]) return;
  for (const part of baseParts(key)) {
    if (S.data[part]) continue;
    const r = await fetch('data/' + part + '.json');
    if (!r.ok) throw new Error(r.status);
    S.data[part] = (await r.json()).map(p => Object.assign(p, { _base: part }));
  }
  if (key.endsWith('_all')) {
    const seen = new Set();
    S.data[key] = baseParts(key).flatMap(b => S.data[b]).filter(p => !seen.has(p.answer) && seen.add(p.answer));
  }
}

// Decoy letters, roughly by frequency (same as the Android app).
const POOL = {
  ru: 'ОООООЕЕЕЕАААААИИИИНННТТТССССРРРВВВЛЛЛКККММДДППУУЯЫЬГЗБЧЙХЖШЮЦЩФЭ',
  uk: 'ОООООАААААИИИИНННЕЕЕІІІТТТРРРВВВССКККЛЛДДМММУУППЯЗЬБГЧХЙЖШЮЦЄЇЩФҐ',
};

const Scoring = {
  base: lv => lv * 10,
  fifthCost: lv => Math.floor(lv * 1.5),
  letterCost: lv => Math.floor(lv * 1.5),
  minReward: lv => lv,
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
  // League: the active league, my results in it, and the league screen state.
  league: store.get('league', null), lres: {},
  lv: { tab: 'table', level: 1, players: null, loading: false, error: false },
  form: { lname: '', base: null, level: 0, packs: 0, name: store.get('myName', ''), code: '' },
  pack: store.get('pack', 0),
  invite: null, busy: false, formError: '', toast: '',
};

const t = () => T[S.lang || 'ru'];
/** Word base in use: the league's while in a league, otherwise the player's own choice. */
const curBase = () => (S.league ? S.league.base : S.lang + '_' + S.aud);
/** Namespace for progress keys, so league progress never mixes with free play. */
const ns = () => (S.league ? `L_${S.league.code}_${S.league.me.key}` : curBase());
/** Local league results and the unsent flag, per league and per player (a phone may be shared). */
const lresKey = L => `lres_${L.code}_${L.me.key}`;
const dirtyKey = L => `ldirty_${L.code}_${L.me.key}`;
/** Difficulty fixed by the league creator (1..3), or 0 when players switch freely. */
const fixedLevel = () => (S.league && S.league.level) || 0;
const levelText = (x, lv) => (lv ? x.levels[lv - 1] : x.anyLevel);
const all = () => S.data[curBase()] || [];
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

function shuffled(arr, seed) {
  const rnd = mulberry32(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Answer letters plus decoys, shuffled; stable for a given seed. Tile id = index. */
function makeTiles(ans, lang, seed) {
  let total = Math.min(14, Math.max(10, ans.length + 5));
  if (total % 2) total++;
  const rnd = mulberry32(seed);
  const pool = POOL[lang];
  const chars = ans.slice();
  while (chars.length < total) chars.push(pool[Math.floor(rnd() * pool.length)]);
  return shuffled(chars, Math.floor(rnd() * 4294967296));
}

/** The same word order for every member of a league: a shuffle seeded by the league code. */
const packOf = p => p.pack || 1;
/** Pack numbers present in a loaded base, e.g. [1, 2]. */
const packsIn = base => [...new Set((S.data[base] || []).map(packOf))].sort((a, b) => a - b);
/** Pack filter in effect: the league's, or the player's choice in free play (0 = all packs). */
const packFilter = () => (packsIn(curBase()).includes(S.pack) ? S.pack : 0);
/** League pack setting -> set of packs, or null for all: 0 = all, N = only pack N, 1000 + bitmask = several. */
const decodePacks = v => {
  if (!v) return null;
  if (v < 1000) return new Set([v]);
  return new Set([...Array(20).keys()].filter(k => (v - 1000) & (1 << k)));
};
const encodePacks = (chosen, available) => {
  const sel = available.filter(k => chosen.has(k));
  if (!sel.length || sel.length === available.length) return 0;
  return sel.length === 1 ? sel[0] : 1000 + sel.reduce((m, k) => m | (1 << k), 0);
};
/** Packs allowed now (null = all): the league's choice, or the player's in free play. */
const allowedPacks = () => {
  const set = S.league ? decodePacks(S.league.packs || 0) : (packFilter() ? new Set([packFilter()]) : null);
  if (!set) return null;
  const has = packsIn(curBase()).filter(k => set.has(k));
  return has.length ? new Set(has) : null;
};
/** Puzzles of the current word set that the active pack filter allows. */
const pool = () => { const set = allowedPacks(); return all().filter(p => !set || set.has(packOf(p))); };

/**
 * The same word order for every member of a league: each pack is shuffled with a seed from the league code
 * and packs follow one another, so adding a pack never reorders words of older packs.
 */
const leagueOrder = lv => {
  const byPack = {};
  for (const p of pool()) if (p.level === lv) (byPack[packOf(p)] = byPack[packOf(p)] || []).push(p);
  return Object.keys(byPack).map(Number).sort((a, b) => a - b)
    .flatMap(k => shuffled(byPack[k], hash(S.league.code + ':' + lv + (k === 1 ? '' : ':p' + k))));
};

// ------------------------------------------------------------------ game logic

async function openBase() {
  const key = curBase();
  S.level = fixedLevel() || store.get('level', 1);
  document.documentElement.lang = S.lang;
  if (S.league) {
    S.lres = store.get(lresKey(S.league), {});
    S.solved = new Set(Object.keys(S.lres));
  } else {
    S.solved = new Set(store.get('solved_' + key, []));
  }
  if (!S.data[key]) {
    S.loading = true; S.loadError = false; render();
    try {
      await ensureData(key);
    } catch (e) {
      S.loadError = true;
    }
    S.loading = false;
  }
  loadCurrent();
  render();
}

function loadCurrent() {
  // The chosen packs may have no words on this level (e.g. pack 2 is hard only): move to a level that has some.
  if (!pool().some(p => p.level === S.level)) {
    const lv = [1, 2, 3].find(l => pool().some(p => p.level === l));
    if (lv) S.level = lv;
  }
  const list = pool().filter(p => p.level === S.level);
  let p = null;
  if (S.league) {
    p = leagueOrder(S.level).find(x => !S.solved.has(x.answer)) || null;
  } else {
    const remaining = list.filter(x => !S.solved.has(x.answer));
    const saved = store.get(`cur_${ns()}_${S.level}`, null);
    p = remaining.find(x => x.answer === saved) ||
      (remaining.length ? remaining[Math.floor(Math.random() * remaining.length)] : null);
    store.set(`cur_${ns()}_${S.level}`, p ? p.answer : null);
  }
  S.levelDone = !p && list.length > 0;
  S.puzzle = p; S.wrong = false; S.locked = new Set();
  if (!p) { S.ans = []; S.tiles = []; S.slots = []; S.fifth = false; return; }
  S.ans = [...p.answer];
  S.tiles = makeTiles(S.ans, curBase().slice(0, 2), hash(curBase() + p.answer));
  S.slots = S.ans.map(() => null);
  S.fifth = store.get(`h5_${ns()}_${p.answer}`, false);
  for (const pos of store.get(`hl_${ns()}_${p.answer}`, [])) if (pos < S.ans.length) revealAt(pos);
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
  S.popExtra = true;
  store.set(`h5_${ns()}_${S.puzzle.answer}`, true);
}

function revealLetter() {
  if (!canRevealLetter()) return;
  // Skip positions the player already filled correctly, so the hint isn't wasted.
  const pos = S.ans.findIndex((ch, i) => !S.locked.has(i) && (S.slots[i] === null || S.tiles[S.slots[i]] !== ch));
  if (pos < 0) return;
  revealAt(pos);
  store.set(`hl_${ns()}_${S.puzzle.answer}`, [...S.locked]);
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
  finish({ puzzle: S.puzzle, gaveUp: true, total: 0, letters: S.locked.size });
}

function finish(r) {
  const p = r.puzzle;
  store.set('score', S.score);
  store.set('streak', S.streak);
  S.solved.add(p.answer);
  if (S.league) {
    S.lres[p.answer] = { p: r.total, l: p.level, f: S.fifth, n: r.letters || 0, g: r.gaveUp, t: Date.now() };
    store.set(lresKey(S.league), S.lres);
    store.set(dirtyKey(S.league), true);
    syncLeague();
  } else {
    store.set('solved_' + ns(), [...S.solved]);
    store.set(`cur_${ns()}_${S.level}`, null);
  }
  store.del(`h5_${ns()}_${p.answer}`);
  store.del(`hl_${ns()}_${p.answer}`);
  S.result = r;
  S.screen = 'result';
  window.scrollTo(0, 0);
}

function counts(lv) {
  const list = pool().filter(p => p.level === lv);
  return [list.filter(p => S.solved.has(p.answer)).length, list.length];
}

function replayLevel(lv) {
  if (S.league) return;
  const answers = new Set(pool().filter(p => p.level === lv).map(p => p.answer));
  S.solved = new Set([...S.solved].filter(a => !answers.has(a)));
  store.set('solved_' + ns(), [...S.solved]);
  if (lv === S.level) loadCurrent();
}

function resetAll() {
  const keep = k => ['lang', 'audience', 'level', 'league', 'auth', 'myName'].includes(k) ||
    k.startsWith('lres_') || k.startsWith('ldirty_') || k.includes('_L_');
  for (const k of store.keys()) if (!keep(k)) store.del(k);
  S.score = 0; S.streak = 0;
  if (!S.league) S.solved = new Set();
  loadCurrent();
}

function setBase(lang, aud) {
  S.lang = lang; S.aud = aud;
  store.set('lang', lang); store.set('audience', aud);
  openBase();
}

// ------------------------------------------------------------------ league

let syncing = null;

/** Pushes unsent league results (merged with what the server already has). */
function syncLeague() {
  if (!S.league) return Promise.resolve(true);
  if (!syncing) syncing = pushResults(S.league).finally(() => { syncing = null; });
  return syncing;
}

async function pushResults(L) {
  const dirty = dirtyKey(L), lres = lresKey(L);
  try {
    // Results finished while a save is in flight set the flag again, so the loop sends them too.
    while (store.get(dirty, false)) {
      store.set(dirty, false);
      const server = await fetchPlayer(L.code, L.me.key);
      const merged = Object.assign({}, (server && server.results) || {}, store.get(lres, {}));
      await savePlayer(L.code, L.me.key, L.me.name, merged);
      store.set(lres, Object.assign(merged, store.get(lres, {})));
    }
    if (S.league && S.league.code === L.code) {
      S.lres = store.get(lres, {});
      for (const a of Object.keys(S.lres)) S.solved.add(a);
    }
    return true;
  } catch (e) {
    store.set(dirty, true);
    return false;
  }
}

async function joinLeague(code, name) {
  const info = await fetchLeague(code);
  if (!info) throw Object.assign(new Error('not found'), { notFound: true });
  const key = playerKey(name);
  const server = await fetchPlayer(code, key);
  S.league = { code, name: info.name, base: info.base, level: info.level || 0, packs: info.packs || 0, me: { key, name: server ? server.name : name.trim() } };
  const merged = Object.assign({}, (server && server.results) || {}, store.get(lresKey(S.league), {}));
  store.set('league', S.league);
  store.set('myName', name.trim());
  store.set(lresKey(S.league), merged);
  store.set(dirtyKey(S.league), true);
  if (!S.lang || !S.aud) {
    S.lang = info.base.slice(0, 2); S.aud = info.base.endsWith('_kids') ? 'kids' : 'adult';
    store.set('lang', S.lang); store.set('audience', S.aud);
  }
  await syncLeague();
  S.lv = { tab: 'table', level: info.level || S.level, players: null, loading: false, error: false };
  await openBase();
}

async function loadLeagueView() {
  if (!S.league) return;
  S.lv.loading = true; S.lv.error = false; render();
  await syncLeague();
  try {
    const players = await fetchPlayers(S.league.code);
    // My own row always shows local results, which may be newer than the server's.
    const me = players.find(p => p.key === S.league.me.key);
    if (me) me.results = Object.assign({}, me.results, S.lres);
    else players.push({ key: S.league.me.key, name: S.league.me.name, results: S.lres });
    S.lv.players = players;
  } catch (e) {
    S.lv.error = true;
  }
  S.lv.loading = false;
  render();
}

async function startInvite(code) {
  S.screen = 'league';
  S.invite = { code, info: null, loading: true };
  render();
  try {
    const info = await fetchLeague(code);
    S.invite = { code, info, loading: false, notFound: !info };
    if (info && (!S.lang || !S.aud)) {
      S.lang = info.base.slice(0, 2); S.aud = info.base.endsWith('_kids') ? 'kids' : 'adult';
      store.set('lang', S.lang); store.set('audience', S.aud);
    }
  } catch (e) {
    S.invite = { code, info: null, loading: false, error: true };
  }
  render();
}

async function doInvite() {
  const x = t();
  const url = location.origin + location.pathname + '?league=' + S.league.code;
  // The link goes inside the text: some messengers drop a separate url field.
  const text = `${x.inviteText} «${S.league.name}» (${x.code}: ${S.league.code})
${url}`;
  if (navigator.share) {
    try {
      await navigator.share({ text });
      return;
    } catch (e) {
      if (e.name === 'AbortError') return;
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    S.toast = x.copied;
  } catch (e) {
    S.toast = url;
  }
  render();
}

/** Runs an async league action with a busy flag and a user-facing error line. */
async function busy(fn) {
  if (S.busy) return;
  S.busy = true; S.formError = ''; render();
  try {
    await fn();
  } catch (e) {
    const x = t();
    S.formError = e.notFound ? x.notFound : x.offline;
  }
  S.busy = false;
  render();
}

// ------------------------------------------------------------------ feedback

const voteKey = p => `${p._base || curBase()}|${p.answer}`;

/** Likes/dislikes on the result screen; kept locally and sent to the server (queued when offline). */
function castVote(v) {
  const p = S.result && S.result.puzzle;
  if (!p) return;
  const votes = store.get('votes', {});
  const key = voteKey(p);
  const vote = votes[key] === v ? 0 : v; // tapping the same thumb again withdraws the vote
  votes[key] = vote;
  store.set('votes', votes);
  const pending = store.get('votesPending', {});
  pending[key] = vote;
  store.set('votesPending', pending);
  flushVotes();
}

let flushing = false;
async function flushVotes() {
  if (flushing) return;
  flushing = true;
  try {
    const pending = store.get('votesPending', {});
    for (const [key, vote] of Object.entries(pending)) {
      const [base, answer] = key.split('|');
      await saveVote(base, answer, vote);
      const now = store.get('votesPending', {});
      if (now[key] === vote) { delete now[key]; store.set('votesPending', now); }
    }
  } catch (e) {
    // offline or server unavailable: stays queued
  }
  flushing = false;
}

// ------------------------------------------------------------------ rendering

const ICON = {
  star: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 17.3l6.2 3.7-1.6-7 5.4-4.7-7.1-.6L12 2 9.1 8.7 2 9.3l5.4 4.7-1.6 7z"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><path d="M19.1 12.9a7 7 0 000-1.8l2-1.6-2-3.4-2.4 1a7 7 0 00-1.6-.9L14.8 3h-4l-.3 2.6a7 7 0 00-1.6.9l-2.4-1-2 3.4 2 1.6a7 7 0 000 1.8l-2 1.6 2 3.4 2.4-1a7 7 0 001.6.9l.3 2.6h4l.3-2.6a7 7 0 001.6-.9l2.4 1 2-3.4zM12.8 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z"/></svg>',
  cup: '<svg viewBox="0 0 24 24"><path d="M19 4h-2V3H7v1H5a2 2 0 00-2 2v1a4 4 0 003.6 4A5 5 0 0011 14.9V18H8v2h8v-2h-3v-3.1a5 5 0 004.4-3.9A4 4 0 0021 7V6a2 2 0 00-2-2zM5 7V6h2v3a2 2 0 01-2-2zm14 0a2 2 0 01-2 2V6h2z"/></svg>',
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

const input = (field, placeholder, extra) =>
  `<input class="input" data-f="${field}" value="${esc(S.form[field] || '')}" placeholder="${esc(placeholder)}" ${extra || ''}>`;

function viewOnboard() {
  if (!S.onboardLang) {
    return `<div class="screen center">${ICON.logo}<h1>Ассоциации · Асоціації</h1>
      <button class="big" data-a="obLang" data-v="ru"><b>Русский</b></button>
      <button class="big" data-a="obLang" data-v="uk"><b>Українська</b></button>
      <button class="btn text" data-a="obCode" style="margin-top:16px">🏆 Есть код лиги · Маю код ліги</button></div>`;
  }
  const x = T[S.onboardLang];
  return `<div class="screen center">${ICON.logo}<h1>${esc(x.appName)}</h1><div>${esc(x.whoPlays)}</div>
    <button class="big" data-a="obAud" data-v="adult"><b>${esc(x.adults)}</b><span>${esc(x.adultsNote)}</span></button>
    <button class="big" data-a="obAud" data-v="kids"><b>${esc(x.kids)}</b><span>${esc(x.kidsNote)}</span></button></div>`;
}

function viewGame() {
  const x = t();
  const score = S.league ? leagueStats(S.lres).pts : S.score;
  let h = `<div class="screen"><div class="top"><span class="chip score">${ICON.star}${score}</span>` +
    (S.streak > 0 ? `<span class="chip streak">🔥 ${S.streak}</span>` : '') +
    (S.league
      ? `<button class="chip league" data-a="league">🏆 ${esc(S.league.name)}</button>`
      : `<span class="aud">${esc(S.aud === 'kids' ? x.kids : x.adults)}</span>` +
        `<button class="icon" data-a="league" aria-label="${esc(x.league)}">${ICON.cup}</button>`) +
    `<button class="icon" data-a="settings" aria-label="${esc(x.settings)}">${ICON.gear}</button></div>`;
  // Hide levels that have no words in the selected pack (e.g. pack 2 is hard words only).
  const withWords = [1, 2, 3].filter(lv => counts(lv)[1] > 0);
  const lvls = fixedLevel() ? [fixedLevel()] : (withWords.length ? withWords : [1, 2, 3]);
  h += seg(lvls.map(lv => { const [d, n] = counts(lv); return [x.levels[lv - 1], `${d}/${n}`]; }), lvls.indexOf(S.level), 'level');

  const newest = Math.max(...packsIn(curBase()), 1);
  if (!S.league && newest > 1 && !store.get(`seenPack_${curBase()}_${newest}`, false)) {
    const n = all().filter(p => packOf(p) === newest).length;
    h += `<div class="banner"><span>🆕 ${esc(x.newPack.replace('{n}', n))}</span><button data-a="hideBanner" data-v="${newest}" aria-label="OK">✕</button></div>`;
  }

  const p = S.puzzle;
  if (S.loading) return h + `<div class="screen center muted">${esc(x.loading)}</div></div>`;
  if (S.loadError) return h + `<div class="screen center muted">${esc(x.loadError)}</div></div>`;
  if (!p && S.levelDone) {
    return h + `<div class="screen center"><div style="font-size:56px">🏆</div><h2>${esc(x.levelDone)}</h2>` +
      (S.league ? `<p class="muted">${esc(x.levelDoneLeague)}</p>`
        : `<p class="muted">${esc(x.levelDoneHint)}</p>
      <button class="btn filled" data-a="replay" data-v="${S.level}">${esc(x.replayLevel)}</button>`) + '</div></div>';
  }
  if (!p) return h + '</div>';

  const clue = (c, extra) => `<div class="clue${extra ? ' extra' : ''}${extra && S.popExtra ? ' pop' : ''}${c.w.length > 11 ? ' small' : ''}">${esc(cap(c.w))}</div>`;
  const last = p.clues.length - 1;
  // Two columns: the main clues, then the extra clue in the last cell (a closed card until opened).
  const closed = `<button class="clue closed" data-a="fifth">${esc(x.openExtra)}<small>−${Scoring.fifthCost(p.level)}</small></button>`;
  h += '<div class="clues">' + p.clues.slice(0, last).map(c => clue(c, false)).join('') +
    (S.fifth ? clue(p.clues[last], true) : closed) + '</div>';
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
    `<div class="ex${i === p.clues.length - 1 ? ' extra' : ''}"><b>${esc(cap(c.w))}</b>${i === p.clues.length - 1 ? `<small>· ${esc(x.fifthLabel)}</small>` : ''}<p>${esc(c.e)}</p></div>`
  ).join('');
  const vote = (store.get('votes', {}))[voteKey(p)] || 0;
  h += `</div><div class="grow"></div><div class="bottom sticky"><div class="rate">${esc(x.rate)}</div><div class="vote-row">
    <button class="vote${vote === 1 ? ' on' : ''}" data-a="vote" data-v="1" aria-label="${esc(x.like)}">👍</button>
    <button class="vote${vote === -1 ? ' on' : ''}" data-a="vote" data-v="-1" aria-label="${esc(x.dislike)}">👎</button>
    <button class="btn filled" data-a="next">${esc(x.next)}</button></div></div></div>`;
  return h;
}

function viewSettings() {
  const x = t();
  let h = `<div class="screen"><div class="head"><button class="icon" data-a="back" aria-label="${esc(x.back)}">${ICON.back}</button><h1>${esc(x.settings)}</h1></div>`;
  h += `<h2>${esc(x.language)}</h2>` + seg([['Русский'], ['Українська']], S.lang === 'ru' ? 0 : 1, 'setLang');
  if (!S.league) {
    h += `<h2>${esc(x.audience)}</h2>` + seg([[x.adults], [x.kids, x.kidsNote]], S.aud === 'adult' ? 0 : 1, 'setAud');
    const packs = packsIn(curBase());
    if (packs.length > 1) {
      const opts = [0, ...packs];
      h += `<h2>${esc(x.packLabel)}</h2>` +
        seg(opts.map(k => [k ? `${x.pack} ${k}` : x.allPacks]), opts.indexOf(packFilter()), 'setPack') +
        `<p class="hint">${esc(x.packHint)}</p>`;
    }
  }
  h += `<h2>${esc(x.progress)}</h2>`;
  for (const lv of [1, 2, 3]) {
    const [d, n] = counts(lv);
    h += `<div class="row"><span>${esc(x.levels[lv - 1])}: ${d} / ${n}</span>` +
      (S.league ? '' : `<button class="btn text" data-a="replay" data-v="${lv}"${d ? '' : ' disabled'}>${esc(x.replayShort)}</button>`) +
      '</div>';
  }
  h += `<div class="row"><b>${esc(x.score)}: ${S.score} &nbsp; ${esc(x.streak)}: ${S.streak}</b></div>`;
  h += `<h2>${esc(x.howToPlay)}</h2><p class="rules">${esc(x.rules)}</p>`;
  h += `<div class="bottom"><button class="btn danger wide" data-a="askReset">${esc(x.resetAll)}</button></div></div>`;
  return h;
}

function viewLeague() {
  const x = t();
  let h = `<div class="screen"><div class="head"><button class="icon" data-a="back" aria-label="${esc(x.back)}">${ICON.back}</button><h1>${esc(x.league)}</h1></div>`;
  const err = S.formError ? `<p class="err">${esc(S.formError)}</p>` : '';
  const dis = S.busy ? ' disabled' : '';

  if (S.invite && !(S.league && S.league.code === S.invite.code)) {
    const iv = S.invite;
    if (iv.loading) return h + `<div class="screen center muted">${esc(x.loading)}</div></div>`;
    if (iv.notFound || iv.error) {
      return h + `<p class="err">${esc(iv.notFound ? x.notFound : x.offline)}</p>` +
        (iv.error ? `<button class="btn filled wide" data-a="inviteRetry">${esc(x.refresh)}</button>` : '') +
        `<button class="btn outline wide" data-a="inviteDone">${esc(x.back)}</button></div>`;
    }
    return h + `<div class="panel"><p class="muted">${esc(x.invitedTo)}</p><h2 class="lname">${esc(iv.info.name)}</h2>
      <p class="muted">${esc(x.baseLabel)}: ${esc(BASE_NAMES[iv.info.base])} · ${esc(x.levelLabel)}: ${esc(levelText(x, iv.info.level || 0))}</p>
      ${input('name', x.yourName, 'maxlength="30" autocomplete="nickname"')}
      <p class="hint">${esc(x.joinHint)}</p>${err}
      <button class="btn filled wide" data-a="joinInvite"${dis}>${esc(S.busy ? x.loading : x.join)}</button></div></div>`;
  }

  if (!S.league) {
    const formBase = S.form.base || curBase();
    const baseIdx = LEAGUE_BASES.indexOf(formBase);
    const createPacks = packsIn(formBase);
    const chosen = S.form.packSel || new Set(createPacks);
    return h + `<p class="muted">${esc(x.leagueIntro)}</p>
      <div class="panel"><h2>${esc(x.createLeague)}</h2>
        ${input('lname', x.leagueName, 'maxlength="40"')}
        <p class="label">${esc(x.baseLabel)}</p>
        <div class="grid2">${LEAGUE_BASES.map((b, i) =>
          `<button class="opt${i === baseIdx ? ' on' : ''}" data-a="pickBase" data-v="${b}">${esc(BASE_NAMES[b])}</button>`).join('')}</div>
        <p class="label">${esc(x.levelLabel)}</p>
        <div class="grid2">${[0, 1, 2, 3].map(lv =>
          `<button class="opt${lv === S.form.level ? ' on' : ''}" data-a="pickLevel" data-v="${lv}">${esc(levelText(x, lv))}</button>`).join('')}</div>
        ${createPacks.length > 1 ? `<p class="label">${esc(x.packsLabel)}</p><div class="grid2">${createPacks.map(k =>
          `<button class="opt${chosen.has(k) ? ' on' : ''}" data-a="togglePack" data-v="${k}">${chosen.has(k) ? '✓ ' : ''}${esc(x.pack)} ${k}</button>`).join('')}</div>
          <p class="hint">${esc(x.packsHint)}</p>` : ''}
        ${input('name', x.yourName, 'maxlength="30" autocomplete="nickname"')}
        <button class="btn filled wide" data-a="create"${dis}>${esc(S.busy ? x.loading : x.create)}</button></div>
      <div class="panel"><h2>${esc(x.joinLeague)}</h2>
        ${input('code', x.code, 'maxlength="8" autocapitalize="characters" autocomplete="off"')}
        ${input('name', x.yourName, 'maxlength="30" autocomplete="nickname"')}
        <p class="hint">${esc(x.joinHint)}</p>
        <button class="btn outline wide" data-a="joinCode"${dis}>${esc(S.busy ? x.loading : x.join)}</button></div>
      ${err}</div>`;
  }

  const L = S.league;
  h += `<h2 class="lname">${esc(L.name)}</h2><p class="muted">${esc(BASE_NAMES[L.base])} · ${esc(levelText(x, fixedLevel()))}${decodePacks(L.packs) ? ` · ${esc(decodePacks(L.packs).size > 1 ? x.packsLabel : x.pack)} ${[...decodePacks(L.packs)].join(', ')}` : ''} · ${esc(x.code)}: <b>${esc(L.code)}</b></p>
    <div class="actions two"><button class="btn tonal" data-a="invite">${esc(x.invite)}</button>
    <button class="btn filled" data-a="back">${esc(x.play)}</button></div>`;
  if (S.toast) h += `<p class="hint center-text">${esc(S.toast)}</p>`;
  h += seg([[x.table], [x.words]], S.lv.tab === 'table' ? 0 : 1, 'ltab');

  if (S.lv.error) h += `<p class="err">${esc(x.offline)}</p>`;
  const players = S.lv.players;
  if (!players) {
    h += `<p class="muted center-text">${esc(S.lv.loading ? x.loading : '')}</p>`;
  } else if (S.lv.tab === 'table') {
    const rows = players.map(p => ({ p, s: leagueStats(p.results) })).sort((a, b) => b.s.pts - a.s.pts || b.s.done - a.s.done);
    h += '<div class="board">' + rows.map(({ p, s }, i) => {
      const me = p.key === L.me.key;
      const solved = s.lv[0] + s.lv[1] + s.lv[2];
      return `<div class="prow${me ? ' me' : ''}"><span class="rank">${i + 1}</span>
        <div class="pname"><b>${esc(p.name)}${me ? ` <small>(${esc(x.you)})</small>` : ''}</b>
        <small>${(fixedLevel() ? [fixedLevel()] : [1, 2, 3]).map(lv => `${esc(fixedLevel() ? x.levels[lv - 1] : x.levels[lv - 1].slice(0, 3))} ${s.lv[lv - 1]}`).join(' · ')}` +
        `${solved ? ` · ${Math.round(100 * s.clean / solved)}% ${esc(x.clean)}` : ''}${s.gave ? ` · 🏳️${s.gave}` : ''}</small></div>
        <span class="ppts">${s.pts}</span></div>`;
    }).join('') + '</div>';
  } else {
    if (fixedLevel()) S.lv.level = fixedLevel();
    else h += seg([1, 2, 3].map(lv => [x.levels[lv - 1]]), S.lv.level - 1, 'lwlevel');
    const order = leagueOrder(S.lv.level);
    let last = -1;
    order.forEach((w, i) => { if (players.some(p => p.results[w.answer])) last = i; });
    if (last < 0) {
      h += `<p class="muted center-text">${esc(x.nobody)}</p>`;
    } else {
      h += `<p class="hint">${esc(x.legend)}<br>${esc(x.hiddenHint)}</p><div class="words">`;
      for (let i = 0; i <= last; i++) {
        const w = order[i];
        const mine = !!S.lres[w.answer];
        const who = players.filter(p => p.results[w.answer])
          .map(p => `<span class="who">${esc(p.name)} ${resultIcon(p.results[w.answer])}</span>`).join('');
        h += `<div class="wrow"><span class="wn">${i + 1}</span><b class="${mine ? '' : 'muted'}">${esc(mine ? w.answer : x.hiddenWord)}</b>
          <div class="whos">${who}</div></div>`;
      }
      h += '</div>';
    }
  }
  h += `<button class="btn text wide" data-a="lrefresh">${esc(x.refresh)}</button>`;
  h += `<div class="bottom"><button class="btn danger wide" data-a="askLeave">${esc(x.leave)}</button></div></div>`;
  return h;
}

function viewDialog() {
  const x = t();
  const dlg = (body, okAction, okText, danger) =>
    `<div class="overlay" data-a="closeDialog"><div class="dialog">${body}
      <div class="btns"><button class="btn text" data-a="closeDialog">${esc(x.cancel)}</button>
      <button class="btn text"${danger ? ' style="color:var(--error)"' : ''} data-a="${okAction}">${esc(okText)}</button></div></div></div>`;
  if (S.dialog === 'giveup') return dlg(`<p>${esc(x.giveUpConfirm)}</p>`, 'confirmGiveUp', x.giveUp);
  if (S.dialog === 'reset') return dlg(`<h3>${esc(x.resetAll)}</h3><p>${esc(x.resetAllConfirm)}</p>`, 'confirmReset', x.reset, true);
  if (S.dialog === 'leave') return dlg(`<p>${esc(x.leaveConfirm)}</p>`, 'confirmLeave', x.leaveOk);
  return '';
}

const $app = document.getElementById('app');

function render() {
  const views = { onboard: viewOnboard, game: viewGame, result: viewResult, settings: viewSettings, league: viewLeague };
  // Re-rendering replaces inputs; keep focus and caret if the user is typing.
  const f = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.f : null;
  $app.innerHTML = views[S.screen]() + viewDialog();
  if (f) {
    const el = $app.querySelector(`[data-f="${f}"]`);
    if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
  }
  S.popExtra = false;
  if (S.shake) {
    S.shake = false;
    const el = document.getElementById('slots');
    if (el) el.classList.add('shake');
  }
}

function openLeagueScreen() {
  S.screen = 'league'; S.toast = ''; S.formError = '';
  window.scrollTo(0, 0);
  if (S.league) loadLeagueView();
}

const actions = {
  obLang: v => { S.onboardLang = v; },
  obAud: v => { S.screen = 'game'; setBase(S.onboardLang, v); },
  level: v => {
    if (fixedLevel()) return;
    const lv = Number(v) + 1;
    if (lv !== S.level) { S.level = lv; store.set('level', lv); loadCurrent(); }
  },
  tile: v => tapTile(Number(v)),
  slot: v => tapSlot(Number(v)),
  clear: clearSlots,
  fifth: openFifth,
  letter: revealLetter,
  giveup: () => { S.dialog = 'giveup'; },
  confirmGiveUp: () => { S.dialog = null; giveUp(); },
  next: () => { S.result = null; S.screen = 'game'; loadCurrent(); },
  vote: v => castVote(Number(v)),
  settings: () => { S.screen = 'settings'; window.scrollTo(0, 0); },
  back: () => {
    S.screen = S.lang && S.aud ? 'game' : 'onboard';
    if (S.invite) { S.invite = null; openBase(); }
  },
  setLang: v => setBase(v === '0' ? 'ru' : 'uk', S.aud),
  setAud: v => setBase(S.lang, v === '0' ? 'adult' : 'kids'),
  replay: v => replayLevel(Number(v)),
  askReset: () => { S.dialog = 'reset'; },
  confirmReset: () => { S.dialog = null; resetAll(); },
  closeDialog: () => { S.dialog = null; },
  // league
  league: openLeagueScreen,
  pickBase: v => {
    S.form.base = v; S.form.packSel = null;
    if (!S.data[v]) ensureData(v).then(render).catch(() => {});
  },
  pickLevel: v => { S.form.level = Number(v); },
  togglePack: v => {
    const all = packsIn(S.form.base || curBase());
    const set = new Set(S.form.packSel || all);
    const k = Number(v);
    if (set.has(k)) set.delete(k); else set.add(k);
    if (set.size) S.form.packSel = set; // at least one pack stays selected
  },
  setPack: v => {
    const opts = [0, ...packsIn(curBase())];
    S.pack = opts[Number(v)] || 0; store.set('pack', S.pack);
    const lv = [S.level, 1, 2, 3].find(l => pool().some(p => p.level === l));
    if (lv && lv !== S.level) { S.level = lv; store.set('level', lv); }
    loadCurrent();
  },
  hideBanner: v => { store.set(`seenPack_${curBase()}_${v}`, true); },
  create: () => {
    const x = t();
    const lname = S.form.lname.trim(), name = S.form.name.trim();
    if (!lname) { S.formError = x.needLeagueName; return; }
    if (!name) { S.formError = x.needName; return; }
    busy(async () => {
      const base = S.form.base || curBase();
      const avail = packsIn(base);
      const code = await createLeagueDoc(lname, base, S.form.level, encodePacks(S.form.packSel || new Set(avail), avail), name);
      await joinLeague(code, name);
      openLeagueScreen();
    });
  },
  joinCode: () => {
    const x = t();
    const code = S.form.code.toUpperCase().replace(/[^A-Z0-9]/g, ''), name = S.form.name.trim();
    if (code.length < 4) { S.formError = x.notFound; return; }
    if (!name) { S.formError = x.needName; return; }
    busy(async () => { await joinLeague(code, name); openLeagueScreen(); });
  },
  joinInvite: () => {
    const name = S.form.name.trim();
    if (!name) { S.formError = t().needName; return; }
    const code = S.invite.code;
    busy(async () => { await joinLeague(code, name); S.invite = null; openLeagueScreen(); });
  },
  inviteDone: () => { S.invite = null; actions.back(); },
  inviteRetry: () => { startInvite(S.invite.code); },
  obCode: () => { S.screen = 'league'; S.invite = null; S.formError = ''; },
  invite: () => { doInvite(); },
  ltab: v => { S.lv.tab = v === '0' ? 'table' : 'words'; },
  lwlevel: v => { S.lv.level = Number(v) + 1; },
  lrefresh: () => { loadLeagueView(); },
  askLeave: () => { S.dialog = 'leave'; },
  confirmLeave: () => {
    S.dialog = null; S.league = null; store.del('league');
    S.screen = S.lang && S.aud ? 'game' : 'onboard';
    if (S.screen === 'game') openBase();
  },
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

$app.addEventListener('input', e => {
  const f = e.target.dataset && e.target.dataset.f;
  if (f) S.form[f] = e.target.value;
});

window.addEventListener('online', () => { syncLeague(); flushVotes(); });

// ------------------------------------------------------------------ start

const inviteCode = (new URLSearchParams(location.search).get('league') || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
if (inviteCode) history.replaceState(null, '', location.pathname);

if (inviteCode && !(S.league && S.league.code === inviteCode)) {
  if (S.lang && S.aud) openBase().then(() => startInvite(inviteCode));
  else startInvite(inviteCode);
} else if (S.lang && S.aud) {
  S.screen = 'game';
  openBase();
  syncLeague();
  flushVotes();
} else {
  render();
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
