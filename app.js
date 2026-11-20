/* Hedge prototype · vanilla JS single-page app
   All data is demo data stored on this device only. No real money moves. */
(() => {
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const phone = $('#phone'), stage = $('#stage'), tabbar = $('#tabbar'), layer = $('#layer'), toastEl = $('#toast');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- Icons (Lucide-style, 24px grid) ---------------- */
const P = {
  back: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  shieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
  chart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  piggy: '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/>',
  pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  laptop: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="m2 2 20 20"/>',
  phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>',
  bank: '<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="m12 2 8 5H4z"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  okCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  sparkle: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
  up: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
  down: '<path d="M22 17 13.5 8.5 8.5 13.5 2 7"/><path d="M16 17h6v-6"/>',
  coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  bus: '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  card: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
  grad: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  arrowOut: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  wine: '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"/>',
  shirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  cash: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  film: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
  tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  arrowIn: '<path d="M17 7 7 17"/><path d="M17 17H7V7"/>',
  unlock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
};
const ic = (n, s = 22, sw = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[n] || ''}</svg>`;
const star = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

/* ---------------- Helpers ---------------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const gbp = n => '£' + Number(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const gbpS = n => Number.isInteger(+n) ? '£' + Number(n).toLocaleString('en-GB') : gbp(n);
const DAY = 864e5;
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const addDays = (d, n) => new Date(d.getTime() + n * DAY);
const fmtDate = d => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const fmtShort = d => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const daysTo = d => Math.max(0, Math.round((new Date(d).setHours(0, 0, 0, 0) - today()) / DAY));
const isoIn = n => addDays(today(), n).toISOString().slice(0, 10);
const first = name => esc(String(name || 'there').trim().split(/\s+/)[0]);
const initials = name => esc(String(name || 'H').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase());
const hash = s => { let h = 5381; for (const c of String(s)) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return h.toString(36); };
const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };
const sleep = ms => new Promise(r => setTimeout(r, reduce ? Math.min(ms, 150) : ms));
const LOAN_DATE = '2027-01-06';

/* ---------------- Demo data ---------------- */
const BANKS = [
  { id: 'monzo', name: 'Monzo', bg: '#14233C', fg: '#FF8A7A', l: 'M' },
  { id: 'starling', name: 'Starling Bank', bg: '#2A1F3D', fg: '#B7F0E4', l: 'S' },
  { id: 'barclays', name: 'Barclays', bg: '#E9F3FB', fg: '#00AEEF', l: 'B' },
  { id: 'natwest', name: 'NatWest', bg: '#F4EEF8', fg: '#5A287D', l: 'N' },
  { id: 'santander', name: 'Santander', bg: '#FDECEC', fg: '#EC0000', l: 'S' },
  { id: 'hsbc', name: 'HSBC UK', bg: '#FFFFFF', fg: '#DB0011', l: 'H' },
  { id: 'lloyds', name: 'Lloyds Bank', bg: '#E8F4EE', fg: '#006A4D', l: 'L' },
  { id: 'halifax', name: 'Halifax', bg: '#E8EEFA', fg: '#005EB8', l: 'H' },
  { id: 'nationwide', name: 'Nationwide', bg: '#E7EAF4', fg: '#1E2D78', l: 'N' },
  { id: 'revolut', name: 'Revolut', bg: '#F2F4F7', fg: '#191C1F', l: 'R' },
  { id: 'chase', name: 'Chase UK', bg: '#E8EFF8', fg: '#117ACA', l: 'C' },
  { id: 'firstdirect', name: 'first direct', bg: '#1A1A1A', fg: '#FFFFFF', l: 'fd' },
  { id: 'tsb', name: 'TSB', bg: '#E9F1FB', fg: '#1F5FA8', l: 'T' },
  { id: 'virgin', name: 'Virgin Money', bg: '#FCE9EC', fg: '#CC0033', l: 'V' },
  { id: 'metro', name: 'Metro Bank', bg: '#E8EDF6', fg: '#1C3F94', l: 'M' },
  { id: 'coop', name: 'Co-operative Bank', bg: '#E6F1FA', fg: '#00A1E0', l: 'Co' },
];
const bankById = id => BANKS.find(b => b.id === id) || BANKS[0];
const bankLogo = (b, s = 46) => `<span class="bank-logo" style="width:${s}px;height:${s}px;background:${b.bg};color:${b.fg};font-size:${b.l.length > 1 ? 15 : 18}px" aria-hidden="true">${b.l}</span>`;
const myBanks = () => (S.banks.length ? S.banks : ['monzo']).map(bankById);

function defaultPots() {
  const h = (rows) => rows.map(([t, d, a]) => ({ t, d, a }));
  return [
    { id: 'london', name: 'London trip', icon: 'plane', saved: 180, target: 300, date: '2027-02-14', created: '2026-09-28',
      history: h([['Round-ups this week', '16 Nov', 9], ['Lump sum from Monzo', '1 Nov', 50], ['Round-ups in October', '31 Oct', 41], ['Birthday money', '12 Oct', 60], ['Round-ups in September', '30 Sep', 20]]) },
    { id: 'buffer', name: 'Emergency buffer', icon: 'shield', saved: 410, target: 500, date: '2027-06-30', created: '2026-09-21',
      history: h([['Round-ups this week', '16 Nov', 11], ['Lump sum from Monzo', '25 Oct', 150], ['Round-ups in October', '31 Oct', 49], ['Starting deposit', '21 Sep', 200]]) },
    { id: 'festival', name: 'Reading Festival', icon: 'ticket', saved: 250, target: 250, date: '2027-03-01', created: '2026-08-14',
      history: h([['Final round-ups', '15 Nov', 6], ['Lump sum from Monzo', '1 Nov', 80], ['Round-ups in October', '31 Oct', 64], ['Round-ups in September', '30 Sep', 100]]) },
    { id: 'laptop', name: 'New laptop', icon: 'laptop', saved: 260, target: 900, date: '2027-09-01', created: '2026-10-02',
      history: h([['Round-ups this week', '16 Nov', 8], ['Lump sum from Monzo', '1 Nov', 100], ['Part-time job payday', '25 Oct', 152]]) },
    { id: 'xmas', name: 'Christmas gifts', icon: 'gift', saved: 120, target: 120, date: '2026-12-15', created: '2026-10-05',
      history: h([['Final top-up', '14 Nov', 20], ['Round-ups in October', '31 Oct', 52], ['Lump sum from Monzo', '5 Oct', 48]]) },
    { id: 'house', name: 'House deposit 27/28', icon: 'home', saved: 64.6, target: 400, date: '2027-07-01', created: '2026-11-01',
      history: h([['Round-ups this week', '16 Nov', 14.6], ['Pot created', '1 Nov', 50]]) },
  ];
}

const localISO = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parseISO = s => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, m - 1, d); };
const dayIn = n => { const t = today(); const dim = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate(); return localISO(new Date(t.getFullYear(), t.getMonth(), Math.max(1, Math.min(dim, t.getDate() + n)))); };
function defaultLocks() {
  return [
    { id: 'l1', name: 'Sophie’s birthday drinks', icon: 'wine', amount: 35, date: dayIn(8), done: false },
    { id: 'l2', name: 'Train to London', icon: 'ticket', amount: 28, date: dayIn(10), done: false },
    { id: 'l3', name: 'Flat dinner party', icon: 'utensils', amount: 20, date: dayIn(-3), done: true },
  ];
}
function defaultUncat() {
  const now = Date.now();
  const at = (daysAgo, h, m) => { const d = addDays(today(), -daysAgo); d.setHours(h, m); return d.getTime(); };
  return [
    { id: 'u1', m: 'SumUp *Kiosk 24', a: 5.00, ts: now - 40 * 60000, guess: 'food' },
    { id: 'u2', m: 'PAYPAL *JDSPORTS', a: 18.99, ts: at(1, 17, 42), guess: 'shopping' },
    { id: 'u3', m: 'CRV*Campus Vending', a: 2.40, ts: at(2, 10, 5), guess: 'coffee' },
  ];
}
const PEOPLE = [
  { n: 'Sophie Turner', c: '#D9B66B' }, { n: 'Arjun Mehta', c: '#CFE8DC' }, { n: 'Maya Okafor', c: '#EBD9B0' },
  { n: 'Tom Reed', c: '#9FD3BC' }, { n: 'Priya Shah', c: '#E8CB8A' },
];
const defaultIous = () => [
  { id: 'i1', type: 'owed', p: 1, a: 12.50, note: 'Pizza night' },
  { id: 'i2', type: 'owe', p: 0, a: 8.00, note: 'Uber home' },
];

const KEY = 'hedge.proto.v1';
const fresh = () => ({ user: null, loggedIn: false, onboarded: false, banks: [], plan: null, pots: defaultPots(), roundup: 5, pending: null,
  locks: defaultLocks(), uncat: defaultUncat(), sorted: [], cash: [], customCats: [], cashStart: null, ious: defaultIous(), groups: defaultGroups(), mates: [] });
let S;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
if (!S || !Array.isArray(S.pots)) S = fresh();
{ const f = fresh(); ['locks', 'uncat', 'sorted', 'cash', 'customCats', 'ious'].forEach(k => { if (!Array.isArray(S[k])) S[k] = f[k]; }); if (!('cashStart' in S)) S.cashStart = null; }
if (![5, 10].includes(S.roundup)) S.roundup = 5;
S.loggedIn = false;
const sess = { flash: false, cash: false }; // per-login prompts
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked: demo still runs */ } };
const resetDemo = () => { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); };

/* ---------------- Router ---------------- */
const screens = {};
let cur = null, cleanup = null, curName = null, curParams = {};

function go(name, params = {}, dir = 'fwd') {
  const def = screens[name];
  if (!def) return;
  curName = name; curParams = params;
  closeLayer(true);
  if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; }
  const el = document.createElement('section');
  el.className = 'screen' + ({ back: ' from-back', fade: ' from-fade', up: ' from-up' }[dir] || '');
  if (def.tab) el.classList.add('has-tabs');
  el.setAttribute('aria-label', def.title || name);
  el.innerHTML = def.html(params);
  stage.appendChild(el);
  const old = cur;
  el.getBoundingClientRect();
  el.classList.add('active');
  if (old) {
    old.classList.remove('active');
    old.classList.add('leave');
    if (dir === 'back') old.classList.add('to-back');
    if (dir === 'fade') old.classList.add('to-fade');
    old.setAttribute('aria-hidden', 'true');
    setTimeout(() => old.remove(), 320);
  }
  cur = el;
  phone.classList.toggle('light-top', !!def.light);
  setTabs(def.tab);
  const c = def.mount && def.mount(el, params);
  if (typeof c === 'function') cleanup = c;
  const h = el.querySelector('h1');
  if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
}

const refresh = () => go(curName, curParams, 'fade');

document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]');
  if (!g) return;
  e.preventDefault();
  go(g.dataset.go, g.dataset.params ? JSON.parse(g.dataset.params) : {}, g.dataset.dir || 'fwd');
});

/* ---------------- Tab bar ---------------- */
const TABS = [['home', 'Home', 'home'], ['savings', 'Savings', 'piggy'], ['budget', 'Budget', 'pie'], ['split', 'Split', 'users']];
tabbar.innerHTML = TABS.map(([id, label, icon]) => `<button type="button" class="tab" data-tab="${id}"><span class="pill">${ic(icon, 22)}</span>${label}</button>`).join('');
tabbar.addEventListener('click', e => {
  const t = e.target.closest('.tab');
  if (!t) return;
  if (t.getAttribute('aria-current') !== 'page') go(t.dataset.tab, {}, 'fade');
});
function setTabs(active) {
  tabbar.hidden = !active;
  $$('.tab', tabbar).forEach(t => t.dataset.tab === active ? t.setAttribute('aria-current', 'page') : t.removeAttribute('aria-current'));
}

/* ---------------- Layer: sheets + modals ---------------- */
let lastFocus = null;
function openLayer(inner, mount) {
  lastFocus = document.activeElement;
  layer.innerHTML = `<div class="scrim" data-close></div>${inner}`;
  layer.getBoundingClientRect();
  layer.classList.add('open');
  const box = layer.querySelector('.sheet, .modal');
  if (mount) mount(box);
  setTimeout(() => { const f = box.querySelector('[autofocus]') || box.querySelector('.btn:not([disabled])') || box.querySelector('button, input'); f && f.focus({ preventScroll: true }); }, 60);
  return box;
}
const openSheet = (html, mount, label = 'Sheet') =>
  openLayer(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(label)}"><div class="grabber" aria-hidden="true"></div><div class="sheet-body">${html}</div></div>`, mount);
const openModal = (html, mount, label = 'Dialog') =>
  openLayer(`<div class="modal" role="alertdialog" aria-modal="true" aria-label="${esc(label)}">${html}</div>`, mount);
function closeLayer(instant) {
  if (!layer.classList.contains('open')) return;
  layer.classList.remove('open');
  if (instant) layer.innerHTML = '';
  else setTimeout(() => { if (!layer.classList.contains('open')) layer.innerHTML = ''; }, 340);
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
}
layer.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeLayer(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLayer(); });
const sheetHead = (title, sub = '') => `<div class="sheet-head"><div><h2 class="h2">${title}</h2>${sub ? `<p class="sub" style="margin:0">${sub}</p>` : ''}</div><button type="button" class="icon-btn" data-close aria-label="Close">${ic('x')}</button></div>`;

/* ---------------- Toast, confetti, carousel ---------------- */
let toastT;
function toast(msg, icon = 'okCircle') {
  toastEl.innerHTML = ic(icon, 18) + `<span>${msg}</span>`;
  toastEl.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove('show'), 2600);
}
function confetti(n = 70) {
  if (reduce) return;
  const c = document.createElement('div');
  c.className = 'confetti';
  const cols = ['#D9B66B', '#CFE8DC', '#F7F3EA', '#2E9E6B', '#E8CB8A'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i');
    p.style.left = Math.random() * 100 + '%';
    p.style.background = cols[i % cols.length];
    p.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
    p.style.animationDelay = Math.random() * .5 + 's';
    p.style.setProperty('--dx', (Math.random() * 140 - 70) + 'px');
    p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
    if (i % 3 === 0) { p.style.width = '10px'; p.style.height = '10px'; p.style.borderRadius = '50%'; }
    c.appendChild(p);
  }
  phone.appendChild(c);
  setTimeout(() => c.remove(), 4000);
}
function carousel(track, dotsEl, ms) {
  const n = track.children.length;
  let i = 0, timer = null, paused = false;
  const delay = () => typeof ms === 'function' ? ms(i) : ms;
  dotsEl.innerHTML = Array.from({ length: n }, (_, k) => `<button type="button" aria-label="Show slide ${k + 1} of ${n}"><i></i></button>`).join('');
  const dots = [...dotsEl.children];
  const mark = k => dots.forEach((d, j) => d.setAttribute('aria-current', j === k ? 'true' : 'false'));
  const to = k => { i = (k + n) % n; track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' }); mark(i); };
  dots.forEach((d, k) => d.addEventListener('click', () => to(k)));
  track.addEventListener('scroll', () => { const k = Math.round(track.scrollLeft / track.clientWidth); if (k !== i) { i = k; mark(i); } }, { passive: true });
  ['pointerenter', 'focusin', 'touchstart'].forEach(ev => track.addEventListener(ev, () => { paused = true; }, { passive: true }));
  ['pointerleave', 'focusout'].forEach(ev => track.addEventListener(ev, () => { paused = false; }, { passive: true }));
  track.addEventListener('touchend', () => setTimeout(() => { paused = false; }, 3000), { passive: true });
  mark(0);
  const tick = () => { timer = setTimeout(() => { if (!paused && !document.hidden) to(i + 1); tick(); }, delay()); };
  if (!reduce && ms) tick();
  return () => clearTimeout(timer);
}
const ring = (size, stroke, pct, color = 'var(--mint)', track = 'var(--ink-2)') => {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.min(1, pct));
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${track}" stroke-width="${stroke}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg>`;
};
const topbar = (left = '', mid = '', right = '') => `<div class="topbar">${left || '<span style="width:44px"></span>'}${mid}${right || '<span style="width:44px"></span>'}</div>`;
const backBtn = (to, params) => `<button type="button" class="icon-btn" data-go="${to}" data-dir="back" ${params ? `data-params='${JSON.stringify(params)}'` : ''} aria-label="Back">${ic('back', 24)}</button>`;
const steps = n => `<div class="steps" aria-label="Step ${n} of 3">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`;
const eyeBtn = id => `<button type="button" class="icon-btn" data-eye="${id}" aria-label="Show password" aria-pressed="false">${ic('eye', 20)}</button>`;
function wireEyes(el) {
  $$('[data-eye]', el).forEach(b => b.addEventListener('click', () => {
    const inp = $('#' + b.dataset.eye, el);
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    b.innerHTML = ic(show ? 'eyeOff' : 'eye', 20);
    b.setAttribute('aria-pressed', String(show));
    b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  }));
}
const setBusy = (btn, label) => { btn.disabled = true; btn.innerHTML = `<span class="spin" aria-hidden="true"></span>${label}`; };

/* =========================================================
   SCREENS
   ========================================================= */

/* ---------- Splash ---------- */
screens.splash = {
  light: true, title: 'Hedge',
  html: () => `<div class="splash"><div class="splash-inner">
      <img src="assets/logo-main.png" alt="Hedge" class="splash-logo" width="240">
      <div class="loadbar" aria-hidden="true"><i></i></div>
      <p>Hedging your month…</p></div></div>`,
  mount() { const t = setTimeout(() => go(S.user ? 'login' : 'welcome', {}, 'fade'), reduce ? 600 : 2100); return () => clearTimeout(t); },
};

/* ---------- Welcome ---------- */
const WELCOME = [
  { img: 'pose-welcome', t: 'Spent £8,<br>hedged £2.', d: 'Every time you spend, Hedge tucks a little into your pots. You barely notice. Future you does.' },
  { img: 'pose-ontrack', t: 'Only saves when<br>it’s safe to.', d: 'A live budget checks rent, bills and your next loan payment first, so saving never leaves you short.' },
  { img: 'pose-progress', t: 'Pots for the things<br>you actually want.', d: 'London trips, a new laptop, festival tickets. Watch each goal fill up, then break it and enjoy.' },
];
screens.welcome = {
  title: 'Welcome',
  html: () => `
    <div class="topbar" style="padding:4px 12px 4px 20px"><div class="wordmark" aria-label="Hedge">Hedge<span>.</span></div><button type="button" class="link-btn" data-go="login">Log in</button></div>
    <div class="scroll" style="display:flex;flex-direction:column;justify-content:center">
      <h1 class="sr">Welcome to Hedge</h1>
      <div class="carousel" id="wc" aria-roledescription="carousel" aria-label="What Hedge does">
        ${WELCOME.map((s, i) => `<div class="w-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of 3">
          <div class="mascot-tile"><img src="assets/${s.img}.png" alt=""></div>
          <h2 class="h1">${s.t}</h2><p class="sub">${s.d}</p></div>`).join('')}
      </div>
      <div class="dots" id="wd"></div>
    </div>
    <div class="bottom-cta">
      <button type="button" class="btn btn-primary" data-go="signup">Create an account</button>
      <button type="button" class="btn btn-ghost" data-go="login">I already have an account</button>
      <p class="fine">Prototype for demo only. No real money moves.</p>
    </div>`,
  mount: el => carousel($('#wc', el), $('#wd', el), 4200),
};

/* ---------- Sign up: details ---------- */
const V = {
  name: s => s.trim().length >= 2,
  phone: s => /^7\d{9}$/.test(s.replace(/\D/g, '').replace(/^44/, '').replace(/^0/, '')),
  email: s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim()),
};
const fmtPhone = s => { const d = s.replace(/\D/g, '').replace(/^44/, '').replace(/^0/, ''); return `+44 ${d.slice(0, 4)} ${d.slice(4)}`; };
screens.signup = {
  title: 'Create account',
  html: () => {
    const p = S.pending || {};
    return `
    ${topbar(backBtn('welcome'), steps(1))}
    <div class="scroll">
      <h1 class="h1">Let’s get you set up</h1>
      <p class="sub">It takes about a minute. We’ll text you a code to check it’s really you.</p>
      <form id="f" novalidate>
        <div class="field" data-f="name">
          <label for="fn">Full name</label>
          <div class="input-wrap"><input id="fn" name="name" autocomplete="name" placeholder="As it appears on your bank account" value="${esc(p.name)}" aria-describedby="fn-e"></div>
          <span class="error" id="fn-e">${ic('alert', 14)} Please enter your full name</span>
        </div>
        <div class="field" data-f="phone">
          <label for="fp">Mobile number</label>
          <div class="input-wrap"><span class="prefix">+44</span><input id="fp" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="7700 900123" value="${esc(p.phoneRaw)}" aria-describedby="fp-h fp-e"></div>
          <span class="hint" id="fp-h">We’ll send a 6-digit code to this number.</span>
          <span class="error" id="fp-e">${ic('alert', 14)} Enter a UK mobile number, like 07700 900123</span>
        </div>
        <div class="field" data-f="email">
          <label for="fe">Email address</label>
          <div class="input-wrap"><input id="fe" name="email" type="email" inputmode="email" autocomplete="email" placeholder="you@uni.ac.uk" value="${esc(p.email)}" aria-describedby="fe-h fe-e"></div>
          <span class="hint" id="fe-h">Your uni email works great.</span>
          <span class="error" id="fe-e">${ic('alert', 14)} Enter a valid email address</span>
        </div>
      </form>
    </div>
    <div class="bottom-cta"><button type="submit" form="f" class="btn btn-primary" id="go">Continue</button></div>`;
  },
  mount(el) {
    const f = $('#f', el), btn = $('#go', el);
    const val = k => $(`[data-f="${k}"] input`, el).value;
    f.addEventListener('submit', e => {
      e.preventDefault();
      S.pending = { name: val('name').trim(), phoneRaw: val('phone'), phone: fmtPhone(val('phone')), email: val('email').trim() };
      save();
      go('otp');
    });
  },
};

/* ---------- Sign up: OTP ---------- */
screens.otp = {
  title: 'Verify your number',
  html: () => {
    const ph = (S.pending && S.pending.phone) || '+44 7700 900123';
    const masked = ph.slice(0, 5) + '••• •••' + ph.replace(/\D/g, '').slice(-3);
    return `
    ${topbar(backBtn('signup'), steps(2))}
    <div class="scroll">
      <h1 class="h1">Enter the code we texted you</h1>
      <p class="sub">Sent to <b style="color:var(--text)">${esc(masked)}</b>. <button type="button" class="link-btn" style="min-height:auto;padding:0;color:var(--mint)" data-go="signup" data-dir="back">Change</button></p>
      <div class="otp" id="otp" role="group" aria-label="6-digit code">
        ${[0, 1, 2, 3, 4, 5].map(i => `<input inputmode="numeric" pattern="[0-9]*" aria-label="Digit ${i + 1}" ${i === 0 ? 'autocomplete="one-time-code" autofocus' : 'autocomplete="off"'}>`).join('')}
      </div>
      <span class="demo-chip">${ic('sparkle', 16)} Demo mode: any 6 digits works</span>
      <p class="tiny" style="margin-top:18px" id="rs" aria-live="polite"></p>
    </div>
    <div class="bottom-cta"><button type="button" class="btn btn-primary" id="v">Verify</button></div>`;
  },
  mount(el) {
    const boxes = $$('#otp input', el), btn = $('#v', el), rs = $('#rs', el);
    let left = 30, done = false;
    const tick = () => {
      if (left > 0) rs.textContent = `Resend code in 0:${String(left).padStart(2, '0')}`;
      else rs.innerHTML = `<button type="button" class="link-btn" style="padding:0;color:var(--mint)" id="again">Resend code</button>`;
      left--;
    };
    tick();
    const timer = setInterval(() => { if (left >= -1) tick(); }, 1000);
    rs.addEventListener('click', e => { if (e.target.id === 'again') { toast('New code sent'); left = 30; tick(); } });
    const code = () => boxes.map(b => b.value).join('');
    const verify = async () => {
      if (done) return; done = true;
      $('#otp', el).classList.add('ok');
      setBusy(btn, 'Verifying');
      await sleep(900);
      go('password');
    };
    const sync = () => {
      boxes.forEach(b => b.classList.toggle('filled', !!b.value));
      if (code().length === 6) setTimeout(verify, 250);
    };
    const fill = (start, digits) => {
      digits.split('').forEach((d, j) => { if (boxes[start + j]) boxes[start + j].value = d; });
      const next = boxes[Math.min(start + digits.length, 5)];
      next.focus();
      sync();
    };
    boxes.forEach((b, i) => {
      b.addEventListener('input', () => {
        const d = b.value.replace(/\D/g, '');
        b.value = '';
        if (d) fill(i, d.slice(0, 6 - i)); else sync();
      });
      b.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && !b.value && i > 0) { boxes[i - 1].value = ''; boxes[i - 1].focus(); sync(); e.preventDefault(); }
        if (e.key === 'ArrowLeft' && i > 0) boxes[i - 1].focus();
        if (e.key === 'ArrowRight' && i < 5) boxes[i + 1].focus();
      });
      b.addEventListener('paste', e => {
        e.preventDefault();
        const d = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
        if (d) fill(0, d);
      });
      b.addEventListener('focus', () => b.select());
    });
    btn.addEventListener('click', verify);
    return () => clearInterval(timer);
  },
};

/* ---------- Sign up: password ---------- */
screens.password = {
  title: 'Create a password',
  html: () => `
    ${topbar(backBtn('otp'), steps(3))}
    <div class="scroll">
      <h1 class="h1">Create a password</h1>
      <p class="sub">You’ll use this to log in. Pick one you don’t use anywhere else.</p>
      <form id="f" novalidate>
        <input class="sr" type="text" autocomplete="username" value="${esc(S.pending && S.pending.email)}" tabindex="-1" aria-hidden="true">
        <div class="field">
          <label for="p1">Password</label>
          <div class="input-wrap"><input id="p1" type="password" autocomplete="new-password" placeholder="At least 8 characters">${eyeBtn('p1')}</div>
        </div>
        <div class="field">
          <label for="p2">Confirm password</label>
          <div class="input-wrap" id="w2"><input id="p2" type="password" autocomplete="new-password" placeholder="Type it again">${eyeBtn('p2')}</div>
        </div>
        <ul class="rules" aria-live="polite">
          ${['At least 8 characters', 'Includes a number', 'Includes a capital letter', 'Includes a symbol', 'Passwords match'].map(t => `<li><span class="dot">${ic('check', 12, 3)}</span>${t}</li>`).join('')}
        </ul>
      </form>
    </div>
    <div class="bottom-cta"><button type="submit" form="f" class="btn btn-primary" id="go">Continue</button></div>`,
  mount(el) {
    wireEyes(el);
    const p1 = $('#p1', el), p2 = $('#p2', el), btn = $('#go', el);
    // Prototype: every letter typed ticks the next check (first 4 from the password, the last from the confirm box)
    const rules = $$('.rules li', el);
    const check = () => rules.forEach((li, i) => li.classList.toggle('ok', i < 4 ? p1.value.length > i : p2.value.length > 0));
    [p1, p2].forEach(i => i.addEventListener('input', check));
    $('#f', el).addEventListener('submit', async e => {
      e.preventDefault();
      setBusy(btn, 'Creating account');
      const p = S.pending || { name: 'Hedge user', phone: '', email: '' };
      S.user = { name: p.name, phone: p.phone, email: p.email, pw: hash(p1.value) };
      S.pending = null; S.onboarded = false; S.plan = null; S.banks = [];
      save();
      await sleep(700);
      toast('Account created');
      go('login', {}, 'fade');
    });
  },
};

/* ---------- Login ---------- */
screens.login = {
  title: 'Log in',
  html: () => {
    const u = S.user;
    if (u) return `
      ${topbar('', '', `<button type="button" class="link-btn" id="help">Help</button>`)}
      <div class="scroll">
        <div class="mascot-tile mascot-round" style="width:128px;height:128px;margin:8px 0 18px"><img src="assets/pose-welcome.png" alt="" style="width:84%"></div>
        <h1 class="h1">Hi ${first(u.name)}!</h1>
        <p class="sub">Welcome back. Enter your password to log in.</p>
        <div class="row" style="padding:0;min-height:auto;margin-bottom:18px"><span class="avatar">${initials(u.name)}</span><div class="grow"><div class="title">${esc(u.name)}</div><div class="desc">${esc(u.email)}</div></div></div>
        <form id="f" novalidate>
          <input class="sr" type="text" autocomplete="username" value="${esc(u.email)}" tabindex="-1" aria-hidden="true">
          <div class="field" id="pf">
            <label for="pw">Password</label>
            <div class="input-wrap" id="pww"><input id="pw" type="password" autocomplete="current-password" placeholder="Your password" aria-describedby="pw-e">${eyeBtn('pw')}</div>
            <span class="error" id="pw-e" role="alert">${ic('alert', 14)} That password doesn’t match. Try again.</span>
          </div>
        </form>
        <button type="button" class="link-btn" style="padding:0;color:var(--mint)" id="forgot">Forgot password?</button>
      </div>
      <div class="bottom-cta">
        <button type="submit" form="f" class="btn btn-primary" id="go">Log in</button>
        <button type="button" class="btn btn-ghost" id="notme">Not ${first(u.name)}? Use another account</button>
      </div>`;
    return `
      ${topbar(backBtn('welcome'))}
      <div class="scroll">
        <h1 class="h1">Welcome back</h1>
        <p class="sub">Log in with your email and password.</p>
        <form id="f" novalidate>
          <div class="field"><label for="em">Email address</label><div class="input-wrap"><input id="em" type="email" autocomplete="username" placeholder="you@uni.ac.uk"></div></div>
          <div class="field"><label for="pw">Password</label><div class="input-wrap"><input id="pw" type="password" autocomplete="current-password" placeholder="Your password">${eyeBtn('pw')}</div></div>
        </form>
        <span class="demo-chip">${ic('sparkle', 16)} Demo mode: anything works</span>
      </div>
      <div class="bottom-cta">
        <button type="submit" form="f" class="btn btn-primary" id="go">Log in</button>
        <button type="button" class="btn btn-ghost" data-go="signup">Create an account</button>
      </div>`;
  },
  mount(el) {
    wireEyes(el);
    const btn = $('#go', el), pw = $('#pw', el), em = $('#em', el);
    $('#forgot', el) && $('#forgot', el).addEventListener('click', () => toast('Demo: we’d text you a reset link', 'chat'));
    $('#help', el) && $('#help', el).addEventListener('click', () => toast('Help centre opens here in the full app', 'help'));
    $('#notme', el) && $('#notme', el).addEventListener('click', () => openModal(`
        <div class="ic-big" style="background:rgba(207,232,220,.12);color:var(--mint)">${ic('user', 28)}</div>
        <h2 class="h2">Switch account?</h2>
        <p class="muted" style="margin:0">This removes ${first(S.user.name)}’s demo account and pots from this device.</p>
        <div class="btns"><button type="button" class="btn btn-primary" data-close>Stay logged in as ${first(S.user.name)}</button><button type="button" class="btn btn-danger" id="sw">Switch account</button></div>`,
      box => $('#sw', box).addEventListener('click', () => { S = fresh(); save(); go('welcome', {}, 'back'); }), 'Switch account'));
    $('#f', el).addEventListener('submit', async e => {
      e.preventDefault();
      if (!S.user) {
        const nm = em.value.split('@')[0].replace(/[._\d]+/g, ' ').trim() || 'Student';
        S.user = { name: nm.replace(/\b\w/g, c => c.toUpperCase()), email: em.value.trim(), phone: '', pw: hash(pw.value) };
      }
      setBusy(btn, 'Logging in');
      S.loggedIn = true; save();
      sess.flash = false; sess.cash = false;
      await sleep(800);
      go(S.onboarded ? 'homeLoader' : 'connectWhy', {}, 'fade');
    });
  },
};

/* ---------- Onboarding: why connect ---------- */
const helpSheet = () => openSheet(`${sheetHead('Connecting your bank')}
  <div class="list-card" style="margin-top:8px">
    ${[['lock', 'Is it safe?', 'Yes. We use Open Banking, the same tech UK banks use. You log in on your bank’s own app, never in Hedge.'],
       ['eye', 'What can Hedge see?', 'Balances and transactions, read-only, for 90 days. You can remove access at any time.'],
       ['bank', 'Can Hedge move my money?', 'Only into your pots, only by rules you set, and only when your budget says it’s safe.']]
      .map(([i, t, d]) => `<div class="row"><span class="ic-tile" style="color:var(--mint)">${ic(i)}</span><div class="grow"><div class="title">${t}</div><div class="desc">${d}</div></div></div>`).join('')}
  </div><div style="height:12px"></div><button type="button" class="btn btn-primary" data-close>Got it</button>`, null, 'Help');

screens.connectWhy = {
  title: 'Why connect your bank',
  html: () => `
    ${topbar(backBtn('login'), '', `<button type="button" class="link-btn" id="help">Help</button>`)}
    <div class="scroll">
      <h1 class="h1">Why do we connect your bank account?</h1>
      <div class="badge-line">${ic('shieldCheck', 22)} Secure, read-only access via Open Banking</div>
      <div class="list-card">
        ${[['ban', '#F08A8A', 'Cancel wasteful subscriptions', 'Say goodbye to paying twice for the same thing.'],
           ['chart', '#E8CB8A', 'Boost your credit history', 'Report the rent you already pay to help lift your credit score.'],
           ['piggy', '#CFE8DC', 'Start saving with round-ups', 'Spend £8, save £2. Your pots sit with an FSCS-protected partner bank and earn a variable rate of interest.'],
           ['user', '#F7F3EA', 'All your money in one place', 'See all your accounts together and track your net worth.']]
          .map(([i, c, t, d]) => `<div class="row" style="align-items:flex-start;padding:18px"><span class="ic-tile" style="color:${c}">${ic(i, 24)}</span><div class="grow"><div class="title" style="font-size:17px">${t}</div><div class="desc" style="font-size:15px;margin-top:2px">${d}</div></div></div>`).join('')}
      </div>
    </div>
    <div class="bottom-cta"><button type="button" class="btn btn-primary" data-go="selectBanks">Continue</button></div>`,
  mount: el => { $('#help', el).addEventListener('click', helpSheet); },
};

/* ---------- Onboarding: select banks ---------- */
screens.selectBanks = {
  title: 'Select your banks',
  html: () => `
    ${topbar(backBtn('connectWhy'), '', `<button type="button" class="link-btn" id="help">Help</button>`)}
    <div class="scroll">
      <h1 class="h1">Select your bank accounts</h1>
      <p class="sub" style="margin-bottom:6px">Connect up to 4. It’s fast, secure and read-only.</p>
      <div class="badge-line" style="margin-bottom:18px">${ic('shieldCheck', 22)} Hedge never sees your banking login</div>
      <label class="search"><span style="color:var(--text-3)">${ic('search', 20)}</span><span class="sr">Search banks</span><input id="q" type="search" placeholder="Search 40+ UK banks" autocomplete="off"></label>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <span class="eyebrow" id="lbl">Most popular</span>
        <span class="counter-pill" aria-live="polite"><b id="cnt">0</b> of 4 selected</span>
      </div>
      <div class="list-card" id="bl">
        ${BANKS.map(b => `<button type="button" class="row" role="checkbox" aria-checked="false" data-bank="${b.id}" data-name="${b.name.toLowerCase()}">
          ${bankLogo(b)}<div class="grow"><div class="title">${b.name}</div><div class="desc">Personal and student accounts</div></div><span class="check-box">${ic('check', 16, 3)}</span></button>`).join('')}
      </div>
      <p class="empty" id="none" hidden></p>
    </div>
    <div class="bottom-cta"><button type="button" class="btn btn-primary" id="go">Continue</button></div>`,
  mount(el) {
    $('#help', el).addEventListener('click', helpSheet);
    const sel = new Set(S.banks);
    const rows = $$('[data-bank]', el), btn = $('#go', el);
    const paint = () => {
      rows.forEach(r => { const on = sel.has(r.dataset.bank); r.classList.toggle('sel', on); r.setAttribute('aria-checked', String(on)); });
      $('#cnt', el).textContent = sel.size;
      btn.textContent = sel.size ? `Connect ${sel.size} bank${sel.size > 1 ? 's' : ''}` : 'Continue';
    };
    rows.forEach(r => r.addEventListener('click', () => {
      const id = r.dataset.bank;
      if (sel.has(id)) sel.delete(id);
      else if (sel.size >= 4) { toast('You can connect up to 4 banks', 'alert'); return; }
      else sel.add(id);
      paint();
    }));
    $('#q', el).addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      let n = 0;
      rows.forEach(r => { const m = r.dataset.name.includes(q); r.hidden = !m; if (m) n++; });
      $('#lbl', el).textContent = q ? `Results` : 'Most popular';
      $('#bl', el).hidden = !n;
      const none = $('#none', el); none.hidden = !!n; none.textContent = `No banks match “${e.target.value}”. Try another name.`;
    });
    btn.addEventListener('click', () => {
      S.banks = sel.size ? [...sel] : ['monzo']; save();
      const banks = S.banks.map(bankById);
      openSheet(`${sheetHead('Allow read-only access', 'You’ll approve each bank in its own app. Hedge can see balances and transactions for 90 days.')}
        <div class="list-card" style="margin:8px 0 14px">
          ${banks.map(b => `<div class="row" data-c="${b.id}">${bankLogo(b, 40)}<div class="grow"><div class="title">${b.name}</div><div class="desc st">Waiting for approval</div></div><span class="state" style="width:26px;display:grid;place-items:center;color:var(--text-3)">${ic('clock', 20)}</span></div>`).join('')}
        </div>
        <p class="tiny" style="display:flex;gap:8px;margin:0 0 14px">${ic('lock', 16)} Hedge can’t move money from these accounts without asking you first.</p>
        <button type="button" class="btn btn-primary" id="ok">Approve and connect</button>`,
      box => $('#ok', box).addEventListener('click', async () => {
        const ok = $('#ok', box);
        setBusy(ok, 'Connecting');
        for (const b of banks) {
          const r = $(`[data-c="${b.id}"]`, box);
          $('.st', r).textContent = `Opening ${b.name}…`;
          $('.state', r).innerHTML = '<span class="spin" aria-hidden="true"></span>';
          await sleep(650);
          $('.st', r).textContent = 'Connected';
          $('.state', r).innerHTML = `<span style="color:var(--ok)">${ic('okCircle', 22)}</span>`;
        }
        await sleep(350);
        go('processing', {}, 'fade');
      }), 'Approve access');
    });
    paint();
  },
};

/* ---------- Onboarding: processing ---------- */
screens.processing = {
  title: 'Processing your account',
  html: () => `
    <div class="scroll" style="padding-top:28px">
      <h1 class="h1">Processing your account</h1>
      <p class="sub">This will take a few seconds</p>
      <div class="ring-wrap" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Setting up" id="rw">
        <svg width="100%" height="100%" viewBox="0 0 210 210" aria-hidden="true"><circle class="ring-bg" cx="105" cy="105" r="92" fill="none" stroke-width="14"/><circle class="ring-fg" id="rf" cx="105" cy="105" r="92" fill="none" stroke-width="14" stroke-dasharray="578" stroke-dashoffset="578"/></svg>
        <div class="ring-center"><div><div class="pct num" id="pct">0%</div><div class="tiny" style="margin-top:6px;font-weight:700">Hedging…</div></div></div>
      </div>
      <div class="checks" id="ck" aria-live="polite"></div>
    </div>`,
  mount(el) {
    const names = myBanks().map(b => b.name);
    const bankLabel = names.length > 2 ? `${names.length} banks` : names.join(' and ');
    const STEPS = [[2, `Connecting ${bankLabel}`], [20, 'Gathering information'], [40, 'Analysing accounts'], [58, 'Finding rent and bills'], [74, 'Working out your safe-to-spend'], [88, 'Setting up your pots']];
    const C = 578, total = reduce ? 800 : 6000, t0 = performance.now();
    let shown = 0, raf, timer;
    const rows = [];
    const doneRow = r => { r.classList.add('done'); $('.state', r).innerHTML = ic('check', 22, 3); };
    const frame = now => {
      const t = Math.min(1, (now - t0) / total);
      const p = Math.round((t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2) * 100);
      $('#pct', el).textContent = p + '%';
      $('#rf', el).setAttribute('stroke-dashoffset', C * (1 - p / 100));
      $('#rw', el).setAttribute('aria-valuenow', p);
      while (shown < STEPS.length && p >= STEPS[shown][0]) {
        if (rows.length) doneRow(rows[rows.length - 1]);
        const r = document.createElement('div');
        r.className = 'check-row';
        r.innerHTML = `<span>${STEPS[shown][1]}</span><span class="state"><span class="spin" aria-hidden="true"></span></span>`;
        $('#ck', el).appendChild(r); rows.push(r); shown++;
        r.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      }
      if (t < 1) raf = requestAnimationFrame(frame);
      else { doneRow(rows[rows.length - 1]); timer = setTimeout(() => go('plans', {}, 'up'), 800); }
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  },
};

/* ---------- Onboarding: plans ---------- */
const mo = d => { const x = new Date(d); x.setMonth(x.getMonth() + 1); return x; };
const PLANS = {
  monthly: { id: 'monthly', name: 'Hedge Plus Monthly', price: 2, per: 'mo', renew: mo },
  yearly: { id: 'yearly', name: 'Hedge Plus Yearly', price: 20, per: 'yr', renew: d => { const x = new Date(d); x.setFullYear(x.getFullYear() + 1); return x; } },
  family: { id: 'family', name: 'Hedge Family', price: 8, per: 'mo', renew: mo },
};
const PLAN_CARDS = [
  { id: 'free', name: 'Free', price: '£0', per: 'forever', tag: 'Start here',
    f: ['Live budget and safe-to-spend', 'Round-ups into up to 3 pots', 'Connect up to 2 banks', 'Split groups with your mates', 'Ask Hedge quick answers'] },
  { id: 'plus', name: 'Plus', price: '£2', per: '/mo', tag: 'Most popular',
    f: ['Everything in Free', 'Unlimited pots and quick save', 'Connect up to 4 banks', 'Category breakdown and red-flag alerts', 'Lock money for events', 'Credit builder from the rent you pay'] },
  { id: 'family', name: 'Family', price: '£8', per: '/mo', tag: 'Up to 5 people',
    f: ['Hedge Plus for up to 5 people', 'Works out at £1.60 each', 'Shared pots for flat bills', 'One bill, one payer'] },
];
const REVIEWS = [
  ['Finally gets student life', 'It knows my loan lands in January and stops saving when rent is due. Saved £214 for Reading without trying.', 'Priya, 2nd year, Leeds'],
  ['My overdraft and I broke up', 'First term I haven’t touched my overdraft. The safe-to-spend number is the only thing I check now.', 'Tom, 1st year, Coventry'],
  ['Splitting bills is painless', 'Five of us share the Family plan. £1.60 each, and the split groups mean no more group chat maths.', 'Aisha, 3rd year, Manchester'],
  ['Round-ups that don’t overdo it', 'I set £5 round-ups and forgot about it. It only saves when my budget says it’s safe, so I never go short.', 'Josh, Master’s, Bristol'],
];
screens.plans = {
  title: 'Choose your plan',
  html: () => `
    ${topbar(`<button type="button" class="icon-btn" id="skip" aria-label="Skip and continue on Free">${ic('x', 24)}</button>`)}
    <div class="scroll" style="padding-top:0">
      <h1 class="h1" style="text-align:center;margin-top:0">Choose your plan</h1>
      <p class="sub" style="text-align:center">Start free. Upgrade when you want more.</p>
      <div class="carousel" id="rc" aria-roledescription="carousel" aria-label="What students say">
        ${REVIEWS.map(([t, b, w], i) => `<div role="group" aria-roledescription="slide" aria-label="Review ${i + 1} of ${REVIEWS.length}"><div class="review">
          <div class="h3" style="font-size:17px">${t}</div><div class="stars" aria-label="5 out of 5 stars">${star.repeat(5)}</div><p>${b}</p><div class="who">${w}</div></div></div>`).join('')}
      </div>
      <div class="dots" id="rd"></div>
      <p class="tiny" style="text-align:center;margin:2px 0 0">Sample reviews for the prototype</p>

      <div class="pcards" role="radiogroup" aria-label="Plans">
        ${PLAN_CARDS.map(c => `<div class="pcard" data-card="${c.id}">
          <button type="button" class="pcard-sel" role="radio" aria-checked="${c.id === 'plus'}" data-pc="${c.id}">
            <span class="pc-tag ${c.id}">${c.tag}</span>
            <span class="pc-row"><span class="pc-name">Hedge ${c.name}</span><span class="radio"></span></span>
            <span class="pc-price num" ${c.id === 'plus' ? 'id="plusPrice"' : ''}>${c.price}<small>${c.per}</small></span>
          </button>
          ${c.id === 'plus' ? `<div class="mini-seg pc-bill" role="group" aria-label="Billing">
            <button type="button" data-bill="monthly" aria-pressed="false">£2 monthly</button>
            <button type="button" data-bill="yearly" aria-pressed="true">£20 yearly · save £4</button></div>` : ''}
          <ul class="pc-feats">${c.f.map(x => `<li>${ic('check', 15, 3)}${x}</li>`).join('')}</ul>
        </div>`).join('')}
      </div>

      <label class="trial-toggle" for="tr"><span>Try Plus free for 14 days</span>
        <span class="switch"><input type="checkbox" id="tr" role="switch"><span class="track"></span><span class="knob"></span></span></label>
      <p class="tiny" style="text-align:center;margin:-6px 0 0" id="trn">No payment today. We’ll remind you 2 days before it ends.</p>
      <span class="demo-chip" style="display:flex;justify-content:center;margin-top:16px">${ic('sparkle', 16)} Prototype: every feature is open, whichever plan you pick</span>
      <p class="fine" style="margin-top:14px">Cancel any time. T&amp;Cs apply.</p>
    </div>
    <div class="bottom-cta"><button type="button" class="btn btn-primary" id="cta"></button></div>`,
  mount(el) {
    const stop = carousel($('#rc', el), $('#rd', el), 4500);
    let card = 'plus', bill = 'yearly';
    const tr = $('#tr', el), cta = $('#cta', el);
    const paint = () => {
      $$('[data-pc]', el).forEach(b => b.setAttribute('aria-checked', String(b.dataset.pc === card)));
      $$('.pcard', el).forEach(c => c.classList.toggle('on', c.dataset.card === card));
      $$('[data-bill]', el).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.bill === bill)));
      $('#plusPrice', el).innerHTML = bill === 'yearly' ? '£20<small>/yr</small>' : '£2<small>/mo</small>';
      $('#trn', el).hidden = !tr.checked;
      if (tr.checked) { cta.textContent = `Start 14-day free trial of ${card === 'family' ? 'Family' : 'Plus'}`; cta.className = 'btn btn-gold'; return; }
      cta.className = 'btn btn-primary';
      if (card === 'free') cta.textContent = 'Continue with Free';
      else { const p = PLANS[card === 'family' ? 'family' : bill]; cta.textContent = `Continue · £${p.price}/${p.per}`; }
    };
    $$('[data-pc]', el).forEach(b => b.addEventListener('click', () => { card = b.dataset.pc; if (card === 'free') tr.checked = false; paint(); }));
    $$('[data-bill]', el).forEach(b => b.addEventListener('click', () => { bill = b.dataset.bill; card = 'plus'; paint(); }));
    tr.addEventListener('change', () => { if (tr.checked && card === 'free') card = 'plus'; paint(); });
    const goFree = () => { S.plan = { id: 'free', name: 'Hedge Free' }; save(); go('planDone', { mode: 'free' }, 'up'); };
    $('#skip', el).addEventListener('click', goFree);
    cta.addEventListener('click', () => {
      if (tr.checked) { S.plan = { id: 'trial', name: card === 'family' ? 'Hedge Family trial' : 'Hedge Plus trial', ends: addDays(today(), 14).toISOString() }; save(); go('planDone', { mode: 'trial' }, 'up'); }
      else if (card === 'free') goFree();
      else paySheet(PLANS[card === 'family' ? 'family' : bill]);
    });
    paint();
    return stop;
  },
};

function paySheet(plan) {
  const banks = myBanks();
  let from = banks[0].id;
  const amount = gbp(plan.price);
  openSheet(`${sheetHead('Pay for ' + plan.name)}
    <div class="pay-amount"><div class="money-xl num">${amount}</div><div class="tiny">${plan.per === 'yr' ? 'Once a year' : 'Every month'} · renews ${fmtDate(plan.renew(today()))}</div></div>
    <div class="eyebrow" style="margin-bottom:10px">Pay from</div>
    <div class="list-card" role="radiogroup" aria-label="Pay from">
      ${banks.map((b, i) => `<button type="button" class="row radio-row" role="radio" aria-checked="${i === 0}" data-from="${b.id}">${bankLogo(b, 40)}<div class="grow"><div class="title">${b.name}</div><div class="desc">Current account ••${(42 + i * 17) % 100}</div></div><span class="radio"></span></button>`).join('')}
    </div>
    <p class="tiny" style="display:flex;gap:8px;align-items:flex-start;margin:14px 0">${ic('lock', 16)}<span>Pay by bank with Open Banking. You’ll approve it in your bank’s app. No card details needed.</span></p>
    <button type="button" class="btn btn-primary" id="pay">Pay ${amount}</button>`,
  box => {
    $$('[data-from]', box).forEach(r => r.addEventListener('click', () => {
      from = r.dataset.from;
      $$('[data-from]', box).forEach(x => x.setAttribute('aria-checked', String(x === r)));
    }));
    $('#pay', box).addEventListener('click', async () => {
      const b = bankById(from);
      setBusy($('#pay', box), `Waiting for ${b.name} to approve`);
      await sleep(1800);
      const ref = 'HDG-' + Math.random().toString(36).slice(2, 8).toUpperCase();
      $('.sheet-body', box).innerHTML = `
        <div style="text-align:center"><div class="success-burst">${ic('check', 40, 3)}</div>
        <h2 class="h2">Payment successful</h2><p class="muted" style="margin:0">You’re on ${plan.name}.</p></div>
        <div class="receipt num">
          <div><span>Plan</span><span>${plan.name}</span></div>
          <div><span>Amount</span><span>${amount}</span></div>
          <div><span>Paid from</span><span>${b.name}</span></div>
          <div><span>Reference</span><span>${ref}</span></div>
          <div><span>Next payment</span><span>${fmtDate(plan.renew(today()))}</span></div>
        </div>
        <button type="button" class="btn btn-primary" id="cont">Continue</button>`;
      confetti(40);
      S.plan = { id: plan.id, name: plan.name, ref, from: b.id };
      save();
      $('#cont', box).focus();
      $('#cont', box).addEventListener('click', () => go('planDone', { mode: 'paid' }, 'up'));
    });
  }, 'Payment');
}

/* ---------- Plan confirmation ---------- */
screens.planDone = {
  title: 'You’re all set',
  html: ({ mode }) => {
    const nm = first(S.user && S.user.name);
    const T = {
      free: ['Welcome to Hedge Free', `You’re in, ${nm}!`, 'Your budget, round-ups, pots and split groups are ready. Upgrade to Plus any time from your profile.'],
      trial: ['Welcome to Hedge Plus', 'Your 14-day free trial has started!', `Explore everything until ${fmtDate(addDays(today(), 14))}. We’ll remind you 2 days before it ends.`],
      paid: ['Payment confirmed', `You’re all set, ${nm}!`, `${esc(S.plan && S.plan.name)} is active. Your receipt is saved in your profile.`],
    }[mode || 'free'];
    return `
    <div class="scroll" style="display:flex;flex-direction:column;justify-content:center;text-align:center">
      <div class="mascot-tile done-hero"><img src="assets/pose-achieved.png" alt=""></div>
      <p class="eyebrow" style="margin:0">${T[0]}</p>
      <h1 class="h1">${T[1]}</h1>
      <p class="sub">${T[2]}</p>
    </div>
    <div class="bottom-cta"><button type="button" class="btn btn-primary" id="home">Take me home</button></div>`;
  },
  mount(el) {
    confetti(60);
    $('#home', el).addEventListener('click', () => { S.onboarded = true; save(); go('homeLoader', {}, 'fade'); });
  },
};

/* ---------- Home loader ---------- */
screens.homeLoader = {
  title: 'Loading',
  html: () => `<div class="loader-screen"><div class="loader-inner">
      <div class="mascot-tile"><img src="assets/pose-saving.png" alt=""></div>
      <div class="loadbar" aria-hidden="true"><i style="animation-duration:1.5s"></i></div>
      <p role="status">Hedging your month…</p></div></div>`,
  mount() { const t = setTimeout(() => go('home', {}, 'fade'), reduce ? 400 : 1700); return () => clearTimeout(t); },
};

/* ---------- Home ---------- */
const OV = {
  today: { label: 'Today', spent: 23.40, saved: 6, n: 4, d: -25, vs: 'yesterday', cats: [['coffee', 'Food & drink', 11.40], ['bag', 'Groceries', 7.50], ['bus', 'Transport', 4.50]] },
  yesterday: { label: 'Yesterday', spent: 31.10, saved: 8, n: 5, d: 12, vs: 'the day before', cats: [['bag', 'Groceries', 14.20], ['coffee', 'Food & drink', 9.40], ['music', 'Going out', 7.50]] },
  week: { label: 'Last week', spent: 186.50, saved: 28, n: 19, d: -8, vs: 'the week before', cats: [['bag', 'Groceries', 64.30], ['music', 'Going out', 52.00], ['coffee', 'Food & drink', 41.70], ['bus', 'Transport', 28.50]] },
  month: { label: 'Last month', spent: 742.10, saved: 118, n: 71, d: -14, vs: 'September', cats: [['bag', 'Groceries', 238.40], ['music', 'Going out', 176.00], ['coffee', 'Food & drink', 154.20], ['bus', 'Transport', 98.50], ['receipt', 'Subscriptions', 75.00]] },
};
const TX = [
  ['coffee', 'Subway', 'Today, 13:05', 7.05, 2],
  ['bag', 'Tesco Express', 'Today, 11:40', 7.50, 2],
  ['coffee', 'Pret A Manger', 'Today, 09:14', 4.35, 1],
  ['bus', 'Stagecoach', 'Today, 08:02', 4.50, 1],
  ['music', 'Fatsoma tickets', 'Sat, 21:10', 24.00, 0],
];
const ASK = {
  afford: ['Can I afford a £40 night out?', 'Yes, just about. You’ve got £64.20 safe to spend this week. After £40 you’d have £24.20 for the next 4 days, about £6 a day. I’d drop round-ups to £1 until Monday so you stay green.'],
  save: ['How much can I save this week?', 'Around £18. Round-ups are on track for £12, and you could move another £6 into London trip without going amber.'],
  loan: ['When does my loan land?', ''],
};
function askSheet(key) {
  const loanDays = daysTo(LOAN_DATE);
  ASK.loan[1] = `Your next Maintenance Loan instalment is due on ${fmtDate(LOAN_DATE)}, ${loanDays} days away. At your current pace your money lasts until about ${fmtShort(addDays(new Date(LOAN_DATE), 4))}, so you’re covered.`;
  openSheet(`${sheetHead('Ask Hedge', 'Quick answers from your own numbers.')}
    <div id="chat" style="min-height:160px" aria-live="polite"></div>
    <div class="eyebrow" style="margin:18px 0 10px">Ask something else</div>
    <div class="chips" id="more" style="margin:0;padding:0;flex-wrap:wrap">${Object.entries(ASK).map(([k, [q]]) => `<button type="button" class="chip" data-ask="${k}">${ic('chat', 16)}${q}</button>`).join('')}</div>`,
  box => {
    const chat = $('#chat', box);
    const ask = async k => {
      const [q, a] = ASK[k];
      chat.insertAdjacentHTML('beforeend', `<div class="bubble me" style="margin-top:12px">${q}</div>`);
      const row = document.createElement('div');
      row.className = 'bot-row';
      row.innerHTML = `<div class="mascot-tile"><img src="assets/pose-ontrack.png" alt=""></div><div class="bubble bot"><span class="typing" aria-label="Hedge is typing"><i></i><i></i><i></i></span></div>`;
      chat.appendChild(row);
      row.scrollIntoView({ block: 'nearest' });
      await sleep(900);
      $('.bubble', row).textContent = a;
      row.scrollIntoView({ block: 'nearest' });
    };
    $$('[data-ask]', box).forEach(b => b.addEventListener('click', () => ask(b.dataset.ask)));
    ask(key);
  }, 'Ask Hedge');
}
function profileSheet() {
  const u = S.user || {};
  const plan = S.plan ? (S.plan.id === 'trial' ? `Free trial until ${fmtShort(S.plan.ends)}` : S.plan.name) : 'Hedge Free';
  openSheet(`${sheetHead('Your profile')}
    <div class="row" style="padding:6px 0 16px"><span class="avatar" style="width:56px;height:56px;font-size:20px">${initials(u.name)}</span><div class="grow"><div class="title" style="font-size:18px">${esc(u.name)}</div><div class="desc">${esc(u.email)}${u.phone ? ' · ' + esc(u.phone) : ''}</div></div></div>
    <div class="list-card">
      <div class="row"><span class="ic-tile" style="color:var(--gold)">${ic('sparkle')}</span><div class="grow"><div class="title">Plan</div><div class="desc">${esc(plan)}</div></div></div>
      <div class="row"><span class="ic-tile" style="color:var(--mint)">${ic('bank')}</span><div class="grow"><div class="title">Connected banks</div><div class="desc">${myBanks().map(b => b.name).join(', ')}</div></div></div>
    </div>
    <div style="display:grid;gap:10px;margin-top:16px">
      <button type="button" class="btn btn-ghost" id="lo">${ic('logout', 20)} Log out</button>
      <button type="button" class="btn btn-danger" id="rs">${ic('refresh', 20)} Restart demo</button>
    </div>`, box => {
    $('#lo', box).addEventListener('click', () => { S.loggedIn = false; save(); go('login', {}, 'back'); });
    $('#rs', box).addEventListener('click', resetDemo);
  }, 'Profile');
}
function moneySheet({ mode = 'pay', p = 0, amt = 10, note = '', iou = null }) {
  const banks = myBanks();
  let from = banks[0].id;
  openSheet(`${sheetHead('Pay &amp; request')}
    <div class="seg" role="tablist" aria-label="Pay or request" style="margin-bottom:16px">${['pay', 'request'].map(m => `<button type="button" role="tab" data-mm="${m}" aria-selected="${m === mode}">${m === 'pay' ? 'Pay' : 'Request'}</button>`).join('')}</div>
    <div class="eyebrow" id="who" style="margin-bottom:8px"></div>
    <div class="people pick" role="radiogroup" aria-label="Person">${PEOPLE.map((x, i) => `<button type="button" class="person" role="radio" aria-checked="${i === p}" data-pp="${i}"><span class="pav" style="background:${x.c}">${initials(x.n)}</span>${first(x.n)}</button>`).join('')}</div>
    <div class="pay-amount" style="padding:10px 0 8px"><div class="money-xl num" id="ma">${gbp(amt)}</div></div>
    <div class="amt-chips" role="group" aria-label="Amount">${[5, 10, 20, 50].map(v => `<button type="button" data-amt="${v}" aria-pressed="${v === amt}">£${v}</button>`).join('')}</div>
    <div class="field"><label for="mo">Or type an amount</label><div class="input-wrap"><span class="prefix">£</span><input id="mo" inputmode="decimal" placeholder="0.00"></div></div>
    <div class="field"><label for="mn">What’s it for?</label><div class="input-wrap"><input id="mn" value="${esc(note)}" placeholder="e.g. Pizza night" autocomplete="off"></div></div>
    <div id="fromWrap"><div class="eyebrow" style="margin-bottom:8px">Pay from</div>
      <div class="list-card" role="radiogroup" aria-label="Pay from" style="margin-bottom:14px">${banks.map((b, i) => `<button type="button" class="row radio-row" role="radio" aria-checked="${i === 0}" data-from="${b.id}" style="min-height:56px;padding:10px 16px">${bankLogo(b, 34)}<div class="grow"><div class="title" style="font-size:15px">${b.name}</div></div><span class="radio"></span></button>`).join('')}</div></div>
    <p class="tiny" id="mnote" style="display:flex;gap:8px;margin:0 0 14px">${ic('lock', 16)}<span></span></p>
    <button type="button" class="btn btn-primary" id="mgo"></button>`, box => {
    const go_ = $('#mgo', box), mo = $('#mo', box);
    const paint = () => {
      const nm = first(PEOPLE[p].n);
      $('#who', box).textContent = mode === 'pay' ? 'Pay to' : 'Request from';
      $('#fromWrap', box).hidden = mode !== 'pay';
      $('#mnote span', box).textContent = mode === 'pay' ? 'Pay by bank with Open Banking. You approve it in your bank’s app. Hedge never holds the money.' : `${nm} gets a link to pay you by bank. We’ll nudge them if they forget.`;
      go_.innerHTML = mode === 'pay' ? `${ic('send', 18)} Pay ${gbp(amt)} to ${nm}` : `${ic('arrowIn', 18)} Request ${gbp(amt)} from ${nm}`;
      $('#ma', box).textContent = gbp(amt);
    };
    $$('[data-mm]', box).forEach(x => x.addEventListener('click', () => { mode = x.dataset.mm; $$('[data-mm]', box).forEach(y => y.setAttribute('aria-selected', String(y === x))); paint(); }));
    $$('[data-pp]', box).forEach(x => x.addEventListener('click', () => { p = +x.dataset.pp; $$('[data-pp]', box).forEach(y => y.setAttribute('aria-checked', String(y === x))); paint(); }));
    $$('[data-amt]', box).forEach(x => x.addEventListener('click', () => { mo.value = ''; amt = +x.dataset.amt; $$('[data-amt]', box).forEach(y => y.setAttribute('aria-pressed', String(y === x))); paint(); }));
    mo.addEventListener('input', () => { $$('[data-amt]', box).forEach(y => y.setAttribute('aria-pressed', 'false')); amt = Math.round((parseFloat(mo.value.replace(/[^\d.]/g, '')) || 0) * 100) / 100; paint(); });
    $$('[data-from]', box).forEach(r => r.addEventListener('click', () => { from = r.dataset.from; $$('[data-from]', box).forEach(x => x.setAttribute('aria-checked', String(x === r))); }));
    go_.addEventListener('click', async () => {
      const person = PEOPLE[p], nm = first(person.n), what = $('#mn', box).value.trim();
      if (mode === 'pay') {
        setBusy(go_, `Waiting for ${bankById(from).name} to approve`);
        await sleep(1500);
        if (iou) S.ious = S.ious.filter(x => x.id !== iou);
      } else {
        setBusy(go_, 'Sending request');
        await sleep(800);
        S.ious.push({ id: 'i' + Date.now(), type: 'owed', p, a: amt, note: what || 'Money request' });
      }
      save();
      $('.sheet-body', box).innerHTML = `<div style="text-align:center"><div class="success-burst">${ic(mode === 'pay' ? 'check' : 'send', 38, 3)}</div>
        <h2 class="h2">${mode === 'pay' ? `${gbp(amt)} sent to ${nm}` : `Request sent to ${nm}`}</h2>
        <p class="muted" style="margin:0">${mode === 'pay' ? `From ${bankById(from).name}${what ? ` · ${esc(what)}` : ''}. Usually arrives in seconds.` : `${gbp(amt)}${what ? ` for ${esc(what)}` : ''}. You’ll get a notification when they pay.`}</p></div>
        <div style="height:20px"></div><button type="button" class="btn btn-primary" id="mdone">Done</button>`;
      if (mode === 'pay') confetti(24);
      $('#mdone', box).focus();
      $('#mdone', box).addEventListener('click', () => { closeLayer(true); refresh(); });
    });
    paint();
  }, 'Pay and request');
}
function offerSheet(o) {
  const loan = o.kind === 'loan';
  openSheet(`${sheetHead(o.n, o.d)}
    <div class="card" style="margin:10px 0 14px"><div class="eyebrow">${loan ? 'What to expect' : 'Example price'}</div><div class="h2" style="margin:4px 0 0">${o.p}</div>
      <p class="tiny" style="margin:6px 0 0">${loan ? 'Borrowing costs money if you don’t repay on time. Your rate depends on your circumstances. Checking eligibility won’t affect your credit score.' : 'Illustrative price from a partner insurer. Your quote depends on what you cover.'}</p></div>
    <button type="button" class="btn ${loan ? 'btn-gold' : 'btn-primary'}" id="q">${o.cta}</button>`,
  box => $('#q', box).addEventListener('click', () => { closeLayer(); toast(loan ? 'Partner loan application opens here' : 'Partner quote flow opens here', 'sparkle'); }), o.n);
}
const ADS = [
  { t: 'ad-gold', i: 'ticket', where: 'Students’ Union', n: 'Winter Ball 2026', d: 'Black tie, live band and a late bar. Tickets from £18.', perk: '10% off with Hedge', cta: 'Get tickets', partner: 'Ticket checkout' },
  { t: 'ad-cream', i: 'gift', where: 'In town this weekend', n: 'Christmas market nights', d: 'Street food, mulled drinks and late opening, Thursday to Sunday.', perk: 'Free hot drink with Hedge', cta: 'See offer', partner: 'Partner offer' },
  { t: 'ad-green', i: 'music', where: 'Festivals 2027', n: 'Early-bird festival tickets', d: 'Tickets drop next month. Start a pot now and let round-ups pay for it.', perk: 'Save for it in a pot', cta: 'Start a pot', pot: true },
  { t: 'ad-ink', i: 'utensils', where: 'Near campus', n: 'Student night: 2-for-1 pizza', d: 'Every Tuesday at local pizza spots near campus.', perk: 'Show your Hedge card', cta: 'Find a place', partner: 'Restaurant finder' },
];
const OFFERS = [
  { kind: 'loan', i: 'card', t: 't3', n: 'Apply for a student loan top-up', d: 'Short of cash before your next instalment? Borrow £200 to £2,000 from a partner lender.', p: 'Check your rate', cta: 'Apply for a loan' },
  { kind: 'ins', i: 'phone', t: 't1', n: 'Gadget insurance', d: 'Phone, laptop and tablet, covered for theft and cracked screens.', p: 'from £4.20/mo', cta: 'Get a quote' },
  { kind: 'loan', i: 'bank', t: 't3', n: '0% student overdraft', d: 'Compare interest-free overdrafts on UK student accounts and apply.', p: 'Compare and apply', cta: 'Apply now' },
  { kind: 'ins', i: 'home', t: 't2', n: 'Contents insurance', d: 'Cover your stuff in halls or a shared student house.', p: 'from £3.50/mo', cta: 'Get a quote' },
  { kind: 'loan', i: 'grad', t: 't3', n: 'University hardship fund', d: 'Money from your uni that you don’t pay back. See if you can apply.', p: 'Free to check', cta: 'Check and apply' },
  { kind: 'ins', i: 'plane', t: 't4', n: 'Travel insurance', d: 'Single trip or annual cover for holidays and study abroad.', p: 'from £9/trip', cta: 'Get a quote' },
  { kind: 'ins', i: 'bike', t: 't2', n: 'Bike insurance', d: 'Theft and damage cover, even when it’s locked up outside.', p: 'from £2.90/mo', cta: 'Get a quote' },
];

screens.home = {
  tab: 'home', title: 'Home',
  html: () => {
    const u = S.user || { name: 'Student' };
    const planChip = !S.plan || S.plan.id === 'free' ? 'Free' : S.plan.id === 'trial' ? 'Plus trial' : S.plan.id === 'family' ? 'Family' : 'Plus';
    return `
    <div class="home-head">
      <button type="button" class="avatar" id="me" aria-label="Open profile">${initials(u.name)}</button>
      <div class="grow"><div class="hello">${greeting()}</div><h1 class="name" style="margin:0">${first(u.name)} <span class="plan-chip" style="vertical-align:middle">${ic('sparkle', 12)} ${planChip}</span></h1></div>
      <button type="button" class="icon-btn bell" id="bell" aria-label="Notifications, 2 new">${ic('bell')}</button>
    </div>
    <div class="scroll" style="padding-top:12px">

      <div class="carousel hero-car" id="hc" aria-roledescription="carousel" aria-label="Your money and offers near you">
      <div class="hslide" role="group" aria-roledescription="slide" aria-label="1 of ${ADS.length + 1}">
      <section class="safe-card" aria-labelledby="stsh">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;position:relative;z-index:1">
          <span id="stsh" style="font-weight:700;font-size:14px;color:rgba(247,243,234,.85)">Safe to spend this week</span>
          <span class="status ok">${ic('okCircle', 15)} On track <span class="lights" aria-hidden="true"><i class="g"></i><i class="a"></i><i class="r"></i></span></span>
        </div>
        <div class="money-xl num" style="margin:8px 0 14px;position:relative;z-index:1">£64<small>.20</small></div>
        <div class="meter" role="meter" aria-valuemin="0" aria-valuemax="103" aria-valuenow="38.8" aria-label="£38.80 of £103 weekly budget spent"><i style="width:38%"></i></div>
        <div class="safe-foot num"><span>£38.80 spent</span><span>£103.00 weekly budget</span></div>
        <button type="button" class="how-link" id="how">How is this worked out? ${ic('right', 16)}</button>
      </section>
      </div>
      ${ADS.map((a, k) => `<div class="hslide" role="group" aria-roledescription="slide" aria-label="${k + 2} of ${ADS.length + 1}">
        <section class="ad-card ${a.t}">
          <span class="ad-ic" aria-hidden="true">${ic(a.i, 84, 1.4)}</span>
          <span class="ad-tag">Sponsored · ${a.where}</span>
          <h2 class="ad-title">${a.n}</h2>
          <p class="ad-sub">${a.d}</p>
          <div class="ad-foot"><span class="ad-perk">${ic('sparkle', 14)} ${a.perk}</span><button type="button" class="ad-cta" data-ad="${k}">${a.cta} ${ic('right', 16)}</button></div>
        </section></div>`).join('')}
      </div>
      <div class="dots" id="hd" style="margin-top:10px"></div>

      <div class="section-head"><h2 class="h3">Ask Hedge</h2><span class="tiny">Answers from your numbers</span></div>
      <div class="chips">${Object.entries(ASK).map(([k, [q]]) => `<button type="button" class="chip" data-ask="${k}">${ic('chat', 16)}${q}</button>`).join('')}</div>

      <div class="section-head"><h2 class="h3">Pay &amp; request</h2><span class="tiny">Pay by bank</span></div>
      <section class="card payreq">
        <div class="pr-btns">
          <button type="button" class="pr-btn" data-money="pay">${ic('send', 20)} Pay</button>
          <button type="button" class="pr-btn" data-money="request">${ic('arrowIn', 20)} Request</button>
        </div>
        <div class="people" role="list" aria-label="Recent people">
          ${PEOPLE.map((p, i) => `<button type="button" class="person" role="listitem" data-person="${i}" aria-label="Pay or request with ${esc(p.n)}"><span class="pav" style="background:${p.c}">${initials(p.n)}</span>${first(p.n)}</button>`).join('')}
          <button type="button" class="person" role="listitem" id="newp"><span class="pav add">${ic('plus', 18)}</span>New</button>
        </div>
        ${S.ious.length ? `<div class="ious">${S.ious.map(o => { const p = PEOPLE[o.p]; return `<div class="iou">
          <span class="pav sm" style="background:${p.c}">${initials(p.n)}</span>
          <div class="grow"><div style="font-weight:700;font-size:14.5px">${o.type === 'owed' ? `${first(p.n)} owes you` : `You owe ${first(p.n)}`} <span class="num">${gbp(o.a)}</span></div><div class="tiny">${esc(o.note)}</div></div>
          <button type="button" class="iou-btn ${o.type}" data-iou="${o.id}">${o.type === 'owed' ? `${ic('bell', 15)} Remind` : `${ic('send', 15)} Pay`}</button></div>`; }).join('')}</div>` : ''}
      </section>

      <div class="section-head"><h2 class="h3">Overview</h2></div>
      <section class="card">
        <div class="seg" role="tablist" aria-label="Time period">
          ${[['today', 'Today'], ['yesterday', 'Yesterday'], ['week', 'Last week'], ['month', 'Last month']].map(([k, l], i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-ov="${k}">${l}</button>`).join('')}
        </div>
        <div id="ov" role="tabpanel"></div>
      </section>

      <section class="card streak" style="margin-top:12px">
        <div class="mascot-tile"><img src="assets/pose-saving.png" alt=""></div>
        <div class="grow"><div style="font-weight:800">12-day hedging streak</div><div class="tiny">You’ve saved something every day since 7 Nov.</div>
          <div class="week-dots" aria-label="Saved on 6 of 7 days this week">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => `<span class="${i < 6 ? 'on' : ''}">${d}</span>`).join('')}</div></div>
      </section>

      <div class="section-head"><div><h2 class="h3">Borrow &amp; protect</h2><div class="partner">Partner offers</div></div></div>
      <div class="hscroll" role="list">
        ${OFFERS.map((o, k) => `<button type="button" class="offer ${o.t}" role="listitem" data-offer="${k}"><span class="offer-top"><span class="ic-tile" style="color:${o.kind === 'loan' ? 'var(--gold-2)' : 'var(--mint)'}">${ic(o.i)}</span><span class="offer-kind">${o.kind === 'loan' ? 'Loan' : 'Insurance'}</span></span><span class="h3">${o.n}</span><p>${o.d}</p><span class="from"><span>${o.p}</span><span class="offer-cta">${o.cta} ${ic('right', 16)}</span></span></button>`).join('')}
      </div>
      <p class="disclaimer">Borrowing costs money if you don’t repay on time. Hedge shows offers from partners and may earn a fee. Prices are illustrative. Not financial advice.</p>
      <p class="tiny" style="text-align:center;margin-top:24px">Prototype · sample data</p>
    </div>`;
  },
  mount(el) {
    const ov = $('#ov', el);
    const paintOv = k => {
      const o = OV[k], max = Math.max(...o.cats.map(c => c[2]));
      const better = o.d < 0;
      ov.innerHTML = `
        <div class="ov-stats">
          <div class="ov-stat"><div class="label">${ic('arrowOut', 15)} Spent</div><div class="val num">${gbp(o.spent)}</div>
            <span class="delta ${better ? 'up' : 'down'}">${ic(better ? 'down' : 'up', 14)} ${Math.abs(o.d)}% ${better ? 'less' : 'more'} than ${o.vs}</span></div>
          <div class="ov-stat saved"><div class="label">${ic('piggy', 15)} Saved</div><div class="val num">${gbp(o.saved)}</div>
            <span class="tiny">${o.n} payments · ${Math.round(o.saved / o.spent * 100)}% of spend</span></div>
        </div>
        <div class="cats">${o.cats.map(([i, n, a]) => `<div class="cat"><span class="ci">${ic(i, 15)}</span><span>${n}</span><span class="num" style="font-weight:700">${gbp(a)}</span><span class="bar"><i style="width:${a / max * 100}%"></i></span></div>`).join('')}</div>`;
    };
    $$('[data-ov]', el).forEach(b => b.addEventListener('click', () => {
      $$('[data-ov]', el).forEach(x => x.setAttribute('aria-selected', String(x === b)));
      paintOv(b.dataset.ov);
    }));
    paintOv('today');
    $('#me', el).addEventListener('click', profileSheet);
    $('#bell', el).addEventListener('click', () => openSheet(`${sheetHead('Notifications')}
      <div class="list-card">
        <div class="row"><span class="ic-tile" style="color:var(--warn)">${ic('pause')}</span><div class="grow"><div class="title">Rent is due in 5 days</div><div class="desc">Round-ups pause from ${fmtShort(addDays(today(), 3))} so you’re never short. <span class="status warn" style="margin-top:4px">${ic('alert', 12)} Amber week ahead</span></div></div></div>
        <div class="row"><span class="ic-tile" style="color:var(--gold)">${ic('trophy')}</span><div class="grow"><div class="title">2 pots are ready to break</div><div class="desc">Reading Festival and Christmas gifts hit their goals.</div></div></div>
        <div class="row"><span class="ic-tile" style="color:var(--mint)">${ic('up')}</span><div class="grow"><div class="title">Best week yet</div><div class="desc">You hedged £28 last week without going over budget.</div></div></div>
      </div>`, null, 'Notifications'));
    $('#how', el).addEventListener('click', () => openSheet(`${sheetHead('How safe-to-spend works', 'We check what’s coming before we let you spend or save.')}
      <div class="receipt num" style="margin-top:6px">
        <div><span>Money available</span><span>£1,281.00</span></div>
        <div><span>Bills still due (rent)</span><span>−£520.00</span></div>
        <div><span>Savings target</span><span>−£40.00</span></div>
        <div><span>Left until your loan lands</span><span>£721.00</span></div>
        <div><span>Weeks until ${fmtShort(LOAN_DATE)}</span><span>÷ 7</span></div>
        <div style="border-bottom:0"><span style="color:var(--text);font-weight:700">Weekly safe-to-spend</span><span style="color:var(--mint)">£103.00</span></div>
      </div>
      <div class="list-card">
        <div class="row"><span class="status ok">${ic('okCircle', 14)} Green</span><div class="desc grow">Round-ups at your full amount (£5 or £10)</div></div>
        <div class="row"><span class="status warn">${ic('alert', 14)} Amber</span><div class="desc grow">Round-ups drop to £5, capped weekly</div></div>
        <div class="row"><span class="status bad">${ic('pause', 14)} Red</span><div class="desc grow">Saving pauses until you’re safe</div></div>
      </div>`, null, 'How safe-to-spend works'));
    $$('[data-ask]', el).forEach(b => b.addEventListener('click', () => askSheet(b.dataset.ask)));
    $$('[data-money]', el).forEach(b => b.addEventListener('click', () => moneySheet({ mode: b.dataset.money })));
    $$('[data-person]', el).forEach(b => b.addEventListener('click', () => moneySheet({ mode: 'pay', p: +b.dataset.person })));
    $('#newp', el).addEventListener('click', () => toast('Pick from your contacts in the full app', 'users'));
    $$('[data-iou]', el).forEach(b => b.addEventListener('click', () => {
      const o = S.ious.find(x => x.id === b.dataset.iou);
      if (o.type === 'owed') { b.innerHTML = `${ic('check', 15, 3)} Sent`; b.disabled = true; toast(`Reminder sent to ${first(PEOPLE[o.p].n)}`, 'bell'); }
      else moneySheet({ mode: 'pay', p: o.p, amt: o.a, note: o.note, iou: o.id });
    }));
    $$('[data-offer]', el).forEach(b => b.addEventListener('click', () => offerSheet(OFFERS[b.dataset.offer])));
    $$('[data-ad]', el).forEach(b => b.addEventListener('click', () => {
      const a = ADS[b.dataset.ad];
      if (a.pot) go('savings', { openNew: true }, 'fade');
      else toast(`${a.partner} opens here in the full app`, 'ticket');
    }));
    // Safe-to-spend stays up longest, ads rotate every ~2.8s, then it loops back
    return carousel($('#hc', el), $('#hd', el), k => k === 0 ? 4500 : 2800);
  },
};

/* ---------- Savings ---------- */
const potFull = p => p.saved >= p.target;
const potTotal = () => S.pots.reduce((s, p) => s + p.saved, 0);
const potCard = p => {
  const pct = Math.min(1, p.saved / p.target), full = potFull(p);
  return `<button type="button" class="pot ${full ? 'full' : ''}" data-go="pot" data-params='{"id":"${p.id}"}'>
    <span class="mini-ring">${ring(52, 5, pct, full ? 'var(--gold)' : 'var(--mint)')}<span class="ico">${ic(p.icon, 20)}</span></span>
    <span class="grow"><span class="pname" style="display:block">${esc(p.name)}</span>
      <span class="pmeta" style="display:block">${full ? `<span class="ready-tag">${ic('trophy', 13)} Goal reached · ready to break</span>` : `${gbp(p.target - p.saved)} to go · by ${fmtShort(p.date)}`}</span>
      <span class="pot-bar" style="display:block"><i style="width:${pct * 100}%"></i></span></span>
    <span class="pamt num">${gbp(p.saved)}<small>${Math.round(pct * 100)}% of ${gbpS(p.target)}</small></span></button>`;
};
screens.savings = {
  tab: 'savings', title: 'Savings',
  html: () => {
    const full = S.pots.filter(potFull), going = S.pots.filter(p => !potFull(p));
    const total = potTotal();
    return `
    <div class="topbar" style="padding:4px 8px 4px 20px"><h1 class="h2" style="margin:0">Savings</h1><button type="button" class="icon-btn" id="new" aria-label="New pot">${ic('plus', 24)}</button></div>
    <div class="scroll">
      <section class="save-hero">
        <div class="eyebrow">Total hedged</div>
        <div class="money-xl num">£${Math.floor(total).toLocaleString('en-GB')}<small>.${(total % 1).toFixed(2).slice(2)}</small></div>
        <span class="gain">${ic('up', 14)} £28.00 this week</span>
        <div class="fscs">${ic('shieldCheck', 16)} Held with our FSCS-protected partner bank, covered up to £120,000</div>
        <img src="assets/pose-saving.png" alt="">
      </section>
      <div class="rule-row">
        <span class="ic-tile" style="width:40px;height:40px;color:var(--gold)">${ic('zap', 20)}</span>
        <div class="grow"><div style="font-weight:700">Round-ups</div><div class="tiny">Saved on every spend · pauses near rent</div></div>
        <div class="mini-seg" role="group" aria-label="Round-up amount">${[5, 10].map(v => `<button type="button" data-ru="${v}" aria-pressed="${S.roundup === v}">£${v}</button>`).join('')}</div>
      </div>
      <section class="card qs">
        <div class="qs-head"><div><div class="h3">Quick save</div><div class="tiny">Stretch the bar, then let go to save</div></div><div class="qs-val num" id="qsv">£0</div></div>
        <input type="range" id="qs" min="0" max="50" step="10" value="0" aria-label="Quick save amount" aria-valuetext="£0">
        <div class="qs-ticks" aria-hidden="true">${[0, 10, 20, 30, 40, 50].map(v => `<span>£${v}</span>`).join('')}</div>
      </section>
      ${full.length ? `<div class="section-head"><h2 class="h3">Ready to break</h2><span class="ready-tag">${ic('trophy', 14)} ${full.length} goal${full.length > 1 ? 's' : ''} reached</span></div>
        <div class="pots">${full.map(potCard).join('')}</div>` : ''}
      <div class="section-head"><h2 class="h3">Your pots</h2><span class="tiny">${going.length} saving</span></div>
      <div class="pots">
        ${going.map(potCard).join('')}
        ${!S.pots.length ? `<div class="empty"><div class="mascot-tile mascot-round" style="width:120px;height:120px;margin:0 auto 12px"><img src="assets/pose-relax.png" alt=""></div>No pots yet. Start one for something you want.</div>` : ''}
        <button type="button" class="add-pot" id="new2">${ic('plus', 20)} Start a new pot</button>
      </div>
    </div>`;
  },
  mount(el, params) {
    $('#new', el).addEventListener('click', newPotSheet);
    $('#new2', el).addEventListener('click', newPotSheet);
    $$('[data-ru]', el).forEach(b => b.addEventListener('click', () => {
      S.roundup = +b.dataset.ru; save();
      $$('[data-ru]', el).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      toast(`Round-ups set to £${S.roundup} per spend`, 'zap');
    }));
    const qs = $('#qs', el), qsv = $('#qsv', el);
    const qpaint = () => { const v = +qs.value; qs.style.setProperty('--p', v / 50 * 100 + '%'); qsv.textContent = `£${v}`; qs.setAttribute('aria-valuetext', `£${v}`); qsv.classList.toggle('on', v > 0); };
    qs.addEventListener('input', qpaint);
    qs.addEventListener('change', () => { const v = +qs.value; if (v > 0) quickSaveModal(v, () => { qs.value = 0; qpaint(); }); });
    qpaint();
    if (params.openNew) setTimeout(newPotSheet, 350);
  },
};

function quickSaveModal(v, reset) {
  const pots = S.pots.filter(p => !potFull(p));
  if (!pots.length) { reset(); toast('Start a pot first, then quick save into it', 'piggy'); return; }
  let id = pots[0].id;
  const b = myBanks()[0];
  openModal(`
    <div class="ic-big" style="background:rgba(217,182,107,.14);color:var(--gold)">${ic('zap', 28)}</div>
    <h2 class="h2">Save £${v} now?</h2>
    <p class="muted" style="margin:0 0 14px">From ${b.name} into this pot:</p>
    <div class="list-card qs-pots" role="radiogroup" aria-label="Pot">${pots.map((p, i) => `<button type="button" class="row radio-row" role="radio" aria-checked="${i === 0}" data-qp="${p.id}" style="min-height:58px;padding:10px 14px">
      <span class="ic-tile" style="width:38px;height:38px;color:var(--mint)">${ic(p.icon, 18)}</span><div class="grow"><div class="title" style="font-size:15px">${esc(p.name)}</div><div class="desc">${gbp(p.saved)} of ${gbpS(p.target)}</div></div><span class="radio"></span></button>`).join('')}</div>
    <div class="btns"><button type="button" class="btn btn-primary" id="qok"></button><button type="button" class="btn btn-ghost" data-close>Cancel</button></div>`, box => {
    const ok = $('#qok', box);
    const paint = () => { ok.textContent = `Save £${v} to ${S.pots.find(p => p.id === id).name}`; };
    $$('[data-qp]', box).forEach(x => x.addEventListener('click', () => { id = x.dataset.qp; $$('[data-qp]', box).forEach(y => y.setAttribute('aria-checked', String(y === x))); paint(); }));
    ok.addEventListener('click', async () => {
      const p = findPot(id), wasFull = potFull(p);
      setBusy(ok, 'Saving');
      await sleep(700);
      p.saved = Math.round((p.saved + v) * 100) / 100;
      p.history = [{ t: `Quick save from ${b.name}`, d: fmtShort(today()), a: v }, ...(p.history || [])];
      save(); closeLayer(true);
      go('savings', {}, 'fade');
      toast(!wasFull && potFull(p) ? `Goal reached! ${esc(p.name)} is ready to break` : `£${v} saved to ${esc(p.name)}`, !wasFull && potFull(p) ? 'trophy' : 'piggy');
    });
    paint();
  }, 'Quick save');
  setTimeout(reset, 400);
}

function newPotSheet() {
  const ICONS = ['plane', 'laptop', 'ticket', 'gift', 'shield', 'home', 'music', 'bike', 'grad', 'phone', 'coffee', 'bag'];
  let icon = 'plane';
  openSheet(`${sheetHead('Start a new pot', 'Name your goal and we’ll work out the weekly pace.')}
    <form id="np" novalidate>
      <div class="field"><label for="nn">What are you saving for?</label><div class="input-wrap"><input id="nn" maxlength="28" placeholder="e.g. Summer in Lisbon" autocomplete="off"></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="field"><label for="nt">Goal amount</label><div class="input-wrap"><span class="prefix">£</span><input id="nt" inputmode="decimal" placeholder="300"></div></div>
        <div class="field"><label for="nd">Goal date</label><div class="input-wrap"><input id="nd" type="date" min="${isoIn(1)}" value="${isoIn(90)}"></div></div>
      </div>
      <div class="field"><span style="font-size:14px;font-weight:600;color:var(--text-2)">Pick an icon</span>
        <div class="icon-pick" role="group" aria-label="Pot icon">${ICONS.map(i => `<button type="button" data-icon="${i}" aria-label="${i}" aria-pressed="${i === icon}">${ic(i, 20)}</button>`).join('')}</div></div>
      <p class="pace" id="pace" hidden></p>
      <button type="submit" class="btn btn-primary" id="mk" style="margin-top:6px">Create pot</button>
    </form>`, box => {
    const nn = $('#nn', box), nt = $('#nt', box), nd = $('#nd', box), mk = $('#mk', box), pace = $('#pace', box);
    const amt = () => parseFloat(nt.value.replace(/[^\d.]/g, '')) || 0;
    const check = () => {
      if (amt() > 0 && nd.value) {
        const wk = Math.max(1, Math.ceil(daysTo(nd.value) / 7));
        pace.hidden = false; pace.innerHTML = `${ic('calendar', 18)} About ${gbp(amt() / wk)} a week for ${wk} week${wk > 1 ? 's' : ''}`;
      } else pace.hidden = true;
    };
    [nn, nt, nd].forEach(i => i.addEventListener('input', check));
    $$('[data-icon]', box).forEach(b => b.addEventListener('click', () => { icon = b.dataset.icon; $$('[data-icon]', box).forEach(x => x.setAttribute('aria-pressed', String(x === b))); }));
    $('#np', box).addEventListener('submit', e => {
      e.preventDefault();
      const p = { id: 'p' + Date.now(), name: nn.value.trim() || 'New goal', icon, saved: 0, target: amt() || 100, date: nd.value || isoIn(90), created: new Date().toISOString().slice(0, 10), history: [{ t: 'Pot created', d: fmtShort(today()), a: 0 }] };
      S.pots.push(p); save();
      go('savings', {}, 'fade');
      toast(`${esc(p.name)} pot created`, 'piggy');
    });
  }, 'New pot');
}

/* ---------- Pot detail ---------- */
const findPot = id => S.pots.find(p => p.id === id);
screens.pot = {
  title: 'Pot',
  html: ({ id }) => {
    const p = findPot(id);
    if (!p) return `${topbar(backBtn('savings'))}<div class="soon"><h1 class="h2">This pot has closed</h1></div>`;
    const full = potFull(p), pct = Math.min(1, p.saved / p.target), left = Math.max(0, p.target - p.saved);
    const days = daysTo(p.date), weeks = Math.max(1, Math.ceil(days / 7));
    return `
    ${topbar(backBtn('savings'), `<span style="font-weight:700">${esc(p.name)}</span>`)}
    <div class="scroll">
      <h1 class="sr">${esc(p.name)}</h1>
      ${full ? `<div class="goal-banner"><div class="mascot-tile"><img src="assets/pose-achieved.png" alt=""></div>
        <div><div style="font-weight:800;color:var(--gold-2)">Goal reached!</div><div class="tiny" style="color:var(--text-2)">You saved every penny for ${esc(p.name)}. Break the pot and enjoy it.</div></div></div>` : ''}
      <div class="pd-ring" role="img" aria-label="${gbp(p.saved)} of ${gbp(p.target)} saved, ${Math.round(pct * 100)} percent">
        ${ring(220, 16, pct, full ? 'var(--gold)' : 'var(--mint)', 'var(--surface)')}
        <div class="center"><div class="ico-badge" style="${full ? 'color:var(--gold)' : ''}">${ic(p.icon, 22)}</div>
          <div class="money-xl num">${gbp(p.saved)}</div><div class="of num">of ${gbp(p.target)} · ${Math.round(pct * 100)}%</div></div>
      </div>
      ${full
        ? `<div class="pace" style="background:rgba(217,182,107,.1);color:var(--gold-2)">${ic('trophy', 18)} Full ${days ? `${days} days early` : 'on time'}. Nice hedging.</div>`
        : `<div class="pace">${ic('calendar', 18)} Save ${gbp(left / weeks)} a week to hit your goal by ${fmtShort(p.date)}</div>`}
      <div class="stat-grid num">
        <div class="stat"><div class="k">${ic('calendar', 14)} Goal date</div><div class="v">${fmtDate(p.date)}</div></div>
        <div class="stat"><div class="k">${ic('clock', 14)} Days left</div><div class="v">${days}</div></div>
        <div class="stat"><div class="k">${ic('piggy', 14)} In this pot</div><div class="v">${gbp(p.saved)}</div></div>
        <div class="stat"><div class="k">${ic('zap', 14)} Left to save</div><div class="v">${full ? '£0.00' : gbp(left)}</div></div>
      </div>
      <div class="section-head" style="margin-top:8px"><h2 class="h3">Activity</h2></div>
      <div class="list-card">
        ${(p.history || []).map(h => `<div class="row"><span class="ic-tile" style="width:40px;height:40px;color:${h.a ? 'var(--gold)' : 'var(--text-3)'}">${ic(h.a ? 'plus' : 'sparkle', 18)}</span>
          <div class="grow"><div class="title" style="font-size:15px">${esc(h.t)}</div><div class="desc">${esc(h.d)}</div></div><div class="num" style="font-weight:700;color:${h.a ? 'var(--gold-2)' : 'var(--text-3)'}">${h.a ? '+' + gbp(h.a) : ''}</div></div>`).join('')}
      </div>
    </div>
    <div class="bottom-cta">
      ${full
        ? `<button type="button" class="btn btn-gold" id="brk">${ic('trophy', 20)} Break pot &amp; withdraw ${gbp(p.saved)}</button><button type="button" class="btn btn-ghost" id="add">${ic('plus', 20)} Keep adding</button>`
        : `<button type="button" class="btn btn-primary" id="add">${ic('plus', 20)} Add money</button><button type="button" class="btn btn-danger" id="wd">Withdraw funds</button>`}
    </div>`;
  },
  mount(el, { id }) {
    const p = findPot(id);
    if (!p) return;
    if (potFull(p)) setTimeout(() => confetti(36), 250);
    $('#add', el) && $('#add', el).addEventListener('click', () => addMoneySheet(p));
    $('#wd', el) && $('#wd', el).addEventListener('click', () => confirmBreak(p));
    $('#brk', el) && $('#brk', el).addEventListener('click', () => celebrateSheet(p));
  },
};

function addMoneySheet(p) {
  const banks = myBanks();
  let amt = 20, from = banks[0].id;
  openSheet(`${sheetHead('Add to ' + esc(p.name))}
    <div class="pay-amount"><div class="money-xl num" id="amt">${gbp(amt)}</div><div class="tiny">${potFull(p) ? 'Goal reached. Anything extra stays in this pot.' : `${gbp(Math.max(0, p.target - p.saved))} left to reach your goal`}</div></div>
    <div class="amt-chips" role="group" aria-label="Amount">${[5, 10, 20, 50].map(v => `<button type="button" data-amt="${v}" aria-pressed="${v === amt}">£${v}</button>`).join('')}</div>
    <div class="field"><label for="oa">Or enter an amount</label><div class="input-wrap"><span class="prefix">£</span><input id="oa" inputmode="decimal" placeholder="0.00"></div></div>
    <div class="eyebrow" style="margin-bottom:10px">From</div>
    <div class="list-card" role="radiogroup" aria-label="Pay from" style="margin-bottom:16px">
      ${banks.map((b, i) => `<button type="button" class="row radio-row" role="radio" aria-checked="${i === 0}" data-from="${b.id}">${bankLogo(b, 40)}<div class="grow"><div class="title">${b.name}</div><div class="desc">Current account</div></div><span class="radio"></span></button>`).join('')}
    </div>
    <button type="button" class="btn btn-primary" id="go">Add ${gbp(amt)}</button>`, box => {
    const go_ = $('#go', box), oa = $('#oa', box);
    const set = v => { amt = v; $('#amt', box).textContent = gbp(v); go_.textContent = `Add ${gbp(v)}`; };
    $$('[data-amt]', box).forEach(b => b.addEventListener('click', () => { oa.value = ''; $$('[data-amt]', box).forEach(x => x.setAttribute('aria-pressed', String(x === b))); set(+b.dataset.amt); }));
    oa.addEventListener('input', () => { $$('[data-amt]', box).forEach(x => x.setAttribute('aria-pressed', 'false')); set(Math.round((parseFloat(oa.value.replace(/[^\d.]/g, '')) || 0) * 100) / 100); });
    $$('[data-from]', box).forEach(r => r.addEventListener('click', () => { from = r.dataset.from; $$('[data-from]', box).forEach(x => x.setAttribute('aria-checked', String(x === r))); }));
    go_.addEventListener('click', async () => {
      const wasFull = potFull(p);
      setBusy(go_, 'Adding');
      await sleep(900);
      p.saved = Math.round((p.saved + amt) * 100) / 100;
      p.history = [{ t: `Lump sum from ${bankById(from).name}`, d: fmtShort(today()), a: amt }, ...(p.history || [])];
      save();
      go('pot', { id: p.id }, 'fade');
      if (!wasFull && potFull(p)) toast('Goal reached! Ready to break', 'trophy');
      else toast(`${gbp(amt)} added to ${esc(p.name)}`, 'piggy');
    });
  }, 'Add money');
}

function confirmBreak(p) {
  const b = myBanks()[0];
  openModal(`
    <div class="ic-big">${ic('alert', 30)}</div>
    <h2 class="h2">Are you sure you want to break this pot?</h2>
    <p class="muted" style="margin:0">You’re <b style="color:var(--text)">${gbp(p.target - p.saved)}</b> away from your ${esc(p.name)} goal. Breaking it moves <b style="color:var(--text)">${gbp(p.saved)}</b> back to ${b.name} and closes the pot.</p>
    <div class="btns"><button type="button" class="btn btn-primary" data-close autofocus>Keep saving</button><button type="button" class="btn btn-danger" id="yes">Yes, break the pot</button></div>`,
  box => $('#yes', box).addEventListener('click', () => {
    closeLayer(true);
    breakAnim(`Pot broken. ${gbp(p.saved)} is on its way to ${b.name}.`, () => {
      S.pots = S.pots.filter(x => x.id !== p.id); save();
      go('savings', {}, 'back');
      toast(`${gbp(p.saved)} moved to ${b.name}`, 'bank');
    });
  }), 'Break pot');
}

function breakAnim(msg, done) {
  const st = document.createElement('div');
  st.className = 'break-stage';
  st.setAttribute('role', 'status');
  const coins = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return `<span class="break-coin" style="--x:${Math.cos(a) * 130}px;--y:${Math.sin(a) * 130}px"></span>`;
  }).join('');
  st.innerHTML = `<div style="position:relative;display:grid;place-items:center"><div class="break-pot">${ic('piggy', 56, 1.6)}</div>${coins}</div><p>${msg}</p>`;
  phone.appendChild(st);
  setTimeout(() => { st.style.transition = 'opacity .25s'; st.style.opacity = '0'; done(); setTimeout(() => st.remove(), 260); }, reduce ? 600 : 2300);
}

function celebrateSheet(p) {
  const banks = myBanks();
  let to = banks[0].id;
  openSheet(`${sheetHead(`Where should ${gbp(p.saved)} go?`, 'Usually arrives in seconds. The pot closes once it’s empty.')}
    <div class="list-card" role="radiogroup" aria-label="Send to" style="margin:8px 0 16px">
      ${banks.map((b, i) => `<button type="button" class="row radio-row" role="radio" aria-checked="${i === 0}" data-to="${b.id}">${bankLogo(b, 40)}<div class="grow"><div class="title">${b.name}</div><div class="desc">Current account</div></div><span class="radio"></span></button>`).join('')}
    </div>
    <button type="button" class="btn btn-gold" id="ok">${ic('trophy', 20)} Break pot &amp; withdraw</button>`, box => {
    $$('[data-to]', box).forEach(r => r.addEventListener('click', () => { to = r.dataset.to; $$('[data-to]', box).forEach(x => x.setAttribute('aria-checked', String(x === r))); }));
    $('#ok', box).addEventListener('click', () => {
      const b = bankById(to);
      closeLayer(true);
      breakAnim(`Cracking open ${esc(p.name)}…`, () => {
        const weeks = Math.max(1, Math.round((today() - new Date(p.created || today())) / (7 * DAY)));
        S.pots = S.pots.filter(x => x.id !== p.id); save();
        go('celebrate', { name: p.name, amount: p.saved, bank: b.name, weeks, ups: (p.history || []).length * 9 + 7 }, 'up');
      });
    });
  }, 'Withdraw');
}

screens.celebrate = {
  title: 'Goal smashed',
  html: ({ name, amount, bank, weeks, ups }) => `
    <div class="celebrate">
      <div class="mascot-tile"><img src="assets/pose-achieved.png" alt=""></div>
      <p class="eyebrow" style="margin:0;color:var(--gold-2)">Goal smashed</p>
      <h1 class="h1">You did it, ${first(S.user && S.user.name)}!</h1>
      <p class="sub"><b style="color:var(--text)">${gbp(amount)}</b> from ${esc(name)} is on its way to ${esc(bank)}. Go and enjoy it.</p>
      <div class="stat-grid num" style="text-align:left">
        <div class="stat"><div class="k">${ic('calendar', 14)} Saved over</div><div class="v">${weeks} week${weeks > 1 ? 's' : ''}</div></div>
        <div class="stat"><div class="k">${ic('zap', 14)} Round-ups</div><div class="v">${ups}</div></div>
      </div>
    </div>
    <div class="bottom-cta">
      <button type="button" class="btn btn-primary" data-go="savings" data-params='{"openNew":true}' data-dir="fade">${ic('plus', 20)} Start a new goal</button>
      <button type="button" class="btn btn-ghost" data-go="savings" data-dir="fade">Back to savings</button>
    </div>`,
  mount() { confetti(90); },
};

/* ---------- Budget + Split (next build) ---------- */
const soon = (tab, title, img, lead, items) => ({
  tab, title,
  html: () => `
    <div class="topbar" style="padding:4px 20px"><h1 class="h2" style="margin:0">${title}</h1></div>
    <div class="soon">
      <div class="mascot-tile"><img src="assets/${img}.png" alt=""></div>
      <span class="demo-chip" style="justify-self:center">${ic('sparkle', 14)} Coming in the next build</span>
      <h2 class="h2" style="margin-top:10px">${lead}</h2>
      <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>`,
});
/* =========================================================
   BUDGET
   ========================================================= */
const CATS = {
  groceries: { n: 'Groceries', i: 'bag' },
  food: { n: 'Food & drink', i: 'utensils' },
  coffee: { n: 'Coffee & snacks', i: 'coffee' },
  drinks: { n: 'Drinks & nights out', i: 'wine' },
  transport: { n: 'Transport', i: 'bus' },
  shopping: { n: 'Shopping', i: 'shirt' },
  events: { n: 'Gigs & events', i: 'ticket' },
  ent: { n: 'Entertainment', i: 'film' },
  health: { n: 'Health & beauty', i: 'heart' },
  uni: { n: 'Books & uni', i: 'book' },
  gifts: { n: 'Gifts', i: 'gift' },
  tech: { n: 'Phone & tech', i: 'phone' },
  travel: { n: 'Travel', i: 'plane' },
  sport: { n: 'Sport & gym', i: 'bike' },
  cash: { n: 'Cash', i: 'cash' },
  other: { n: 'Other', i: 'tag' },
};
const allCats = () => [...Object.entries(CATS).map(([id, c]) => ({ id, ...c })), ...S.customCats];
const catOf = id => CATS[id] || S.customCats.find(c => c.id === id) || CATS.other;
const RANK_COLS = ['#CFE8DC', '#D9B66B', '#6FAF8F', '#EBD9B0', '#3F8A6E', '#B08A4E', '#5B6F67'];
const INCOME = [['Maintenance Loan (monthly share)', 1031], ['Part-time job', 250]];
const FIXED = [
  ['home', 'Rent · halls', 'Rent & bills', 520, 1],
  ['phone', 'giffgaff', 'Rent & bills', 10, 3],
  ['music', 'Spotify Student', 'Subscriptions', 5.99, 6],
  ['receipt', 'Amazon Prime Student', 'Subscriptions', 4.49, 12],
  ['bike', 'Uni gym', 'Subscriptions', 14.99, 15],
  ['piggy', 'Savings target', 'Saving & investing', 40, 1],
  ['up', 'Stocks & shares ISA', 'Saving & investing', 25, 2],
];
const sum = (a, f = x => x) => a.reduce((s, x) => s + f(x), 0);
const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
const hhmm = ts => new Date(ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
const relDay = ts => { const d = Math.round((today() - new Date(new Date(ts).setHours(0, 0, 0, 0))) / DAY); return d === 0 ? 'Today' : d === 1 ? 'Yesterday' : new Date(ts).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }); };
const bankName = id => id === 'cash' ? 'Cash' : bankById(id).name;

function MONTH() {
  const t = today();
  return { y: t.getFullYear(), m: t.getMonth(), d: t.getDate(), dim: new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate(), name: t.toLocaleDateString('en-GB', { month: 'long' }) };
}
let txCache = null;
function genTx(M) {
  let s = ((M.y * 100 + M.m) * 7919) >>> 0;
  const r = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  const pick = a => a[Math.floor(r() * a.length)];
  const banks = myBanks().map(b => b.id);
  const MER = {
    groceries: ['Tesco Express', 'Sainsbury’s Local', 'Aldi', 'Co-op', 'Lidl'], food: ['Nando’s', 'Wagamama', 'Subway', 'Domino’s', 'Greggs'],
    coffee: ['Pret A Manger', 'Costa', 'Starbucks', 'Uni café'], drinks: ['The Phoenix', 'Students’ Union bar', 'Kasa bar', 'Wetherspoons'],
    transport: ['Stagecoach', 'Uber', 'Trainline', 'National Express'], shopping: ['Primark', 'ASOS', 'Amazon', 'Boots'],
    events: ['Fatsoma', 'Skiddle', 'Ticketmaster'], ent: ['Odeon', 'Vue', 'Steam'], health: ['Boots', 'Superdrug', 'Uni pharmacy'], uni: ['Waterstones', 'Uni print shop', 'Blackwell’s'],
  };
  const R = { groceries: [6, 26], food: [6, 15], coffee: [2.4, 4.8], drinks: [12, 38], transport: [2, 12], shopping: [8, 32], events: [10, 24], ent: [6, 13], health: [4, 14], uni: [3, 18] };
  const H = { coffee: [8, 11], drinks: [20, 23], groceries: [10, 20] };
  const W = ['groceries', 'groceries', 'food', 'food', 'coffee', 'coffee', 'transport', 'transport', 'shopping', 'ent', 'health', 'uni', 'events'];
  const out = [];
  const mk = (c, d) => {
    const [lo, hi] = R[c], [h0, h1] = H[c] || [9, 20];
    const a = Math.round((lo + r() * (hi - lo)) * 100) / 100;
    const ts = new Date(M.y, M.m, d, h0 + Math.floor(r() * (h1 - h0 + 1)), Math.floor(r() * 60)).getTime();
    return { id: `g${d}-${out.length}`, m: pick(MER[c]), a, cat: c, bank: pick(banks), ts, day: d };
  };
  for (let d = 1; d < M.d; d++) {
    const dow = new Date(M.y, M.m, d).getDay(), x = r();
    const n = x < .22 ? 0 : x < .72 ? 1 : 2;
    for (let k = 0; k < n; k++) out.push(mk(pick(W), d));
    if ((dow === 5 || dow === 6) && r() < .6) out.push(mk('drinks', d));
  }
  // Today matches the Home screen's recent activity
  [['Subway', 7.05, 'food', 13, 5], ['Tesco Express', 7.50, 'groceries', 11, 40], ['Pret A Manger', 4.35, 'coffee', 9, 14], ['Stagecoach', 4.50, 'transport', 8, 2]]
    .forEach(([m, a, c, h, mi], i) => out.push({ id: 't' + i, m, a, cat: c, bank: banks[0], ts: new Date(M.y, M.m, M.d, h, mi).getTime(), day: M.d }));
  return out;
}
function monthTx() {
  const M = MONTH(), key = `${M.y}-${M.m}-${M.d}-${S.banks.join()}`;
  if (!txCache || txCache.key !== key) txCache = { key, list: genTx(M) };
  const own = [...S.cash.map(c => ({ ...c, bank: 'cash' })), ...S.sorted];
  return [...txCache.list, ...own.filter(t => { const d = new Date(t.ts); return d.getFullYear() === M.y && d.getMonth() === M.m; }).map(t => ({ ...t, day: new Date(t.ts).getDate() }))]
    .sort((a, b) => b.ts - a.ts);
}
function B() {
  const M = MONTH(), tx = monthTx();
  const income = sum(INCOME, x => x[1]), fixed = sum(FIXED, f => f[3]), locked = sum(S.locks, l => l.amount);
  const flex = income - fixed - locked, spent = sum(tx, t => t.a), left = flex - spent;
  const daysLeft = M.dim - M.d + 1, weeksLeft = Math.max(1, Math.ceil(daysLeft / 7)), limit = flex / M.dim;
  const byDay = Array(M.dim + 1).fill(0);
  tx.forEach(t => { byDay[t.day] += t.a; });
  const flags = byDay.map((v, d) => ({ d, v })).filter(x => x.d && x.d <= M.d && x.v > limit);
  return { M, tx, income, fixed, locked, flex, spent, left, daysLeft, weeksLeft, limit, byDay, flags, todaySpent: byDay[M.d] };
}
const catTotals = tx => {
  const m = {};
  tx.forEach(t => { m[t.cat] = (m[t.cat] || 0) + t.a; });
  return Object.entries(m).map(([id, v]) => ({ id, v, ...catOf(id) })).sort((a, b) => b.v - a.v);
};
function donut(parts, size = 172, sw = 22) {
  const r = (size - sw) / 2, C = 2 * Math.PI * r, total = sum(parts, p => p.v) || 1;
  let acc = 0;
  const segs = parts.map(p => {
    const len = p.v / total * C, gap = parts.length > 1 ? 2.5 : 0;
    const el = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${p.c}" stroke-width="${sw}" stroke-dasharray="${Math.max(.1, len - gap)} ${C}" stroke-dashoffset="${-acc}"/>`;
    acc += len; return el;
  }).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true" style="transform:rotate(-90deg)"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--ink-2)" stroke-width="${sw}"/>${segs}</svg>`;
}
const flagLine = b => b.todaySpent > b.limit
  ? `<div class="flag-line bad">${ic('flag', 16)}<span><b>Red flag today:</b> ${gbp(b.todaySpent)} spent, ${gbp(b.todaySpent - b.limit)} over your ${gbp(b.limit)} daily limit</span></div>`
  : `<div class="flag-line ok">${ic('okCircle', 16)}<span><b>On track today:</b> ${gbp(b.todaySpent)} of your ${gbp(b.limit)} daily limit</span></div>`;

const lockRow = l => {
  const days = Math.round((parseISO(l.date) - today()) / DAY);
  const when = l.done ? 'Done · ticked off' : days < 0 ? `${fmtShort(parseISO(l.date))} · past date` : days === 0 ? 'Today' : `${fmtShort(parseISO(l.date))} · in ${days} day${days > 1 ? 's' : ''}`;
  return `<div class="lock-row ${l.done ? 'done' : ''}">
    <button type="button" class="lk-check" role="checkbox" aria-checked="${l.done}" data-lk="${l.id}" aria-label="Mark ${esc(l.name)} as done">${ic('check', 16, 3)}</button>
    <button type="button" class="lk-main" data-lkopen="${l.id}"><span class="ic-tile" style="width:40px;height:40px;color:var(--gold)">${ic(l.icon, 20)}</span>
      <span class="grow"><span class="title">${esc(l.name)}</span><span class="desc">${when}</span></span>
      <span class="lk-amt num">${gbp(l.amount)}<small>${ic(l.done ? 'check' : 'lock', 11, 2.5)} ${l.done ? 'Spent' : 'Locked'}</small></span></button></div>`;
};

screens.budget = {
  tab: 'budget', title: 'Budget',
  html: () => {
    const b = B(), M = b.M, nsort = S.uncat.length;
    const top = catTotals(b.tx).slice(0, 4), topMax = top.length ? top[0].v : 1;
    const pct = v => Math.max(0, Math.min(100, v / b.income * 100));
    return `
    <div class="topbar" style="padding:4px 8px 4px 20px"><h1 class="h2" style="margin:0"><button type="button" class="title-btn" id="bTitle" aria-label="Budget. Tap to sort spends we weren’t sure about">Budget</button></h1>
      <div style="display:flex;gap:2px"><button type="button" class="icon-btn" id="addCash" aria-label="Add a cash spend">${ic('cash', 22)}</button><button type="button" class="icon-btn" id="addLock" aria-label="Lock money for an event">${ic('lock', 22)}</button></div></div>
    <div class="scroll">

      <section class="budget-hero" aria-labelledby="bhl">
        <div class="bh-top"><span id="bhl" class="bh-label">You can spend</span>
          <div class="seg seg-dark" role="tablist" aria-label="Break down by">${['day', 'week', 'month'].map(k => `<button type="button" role="tab" data-bp="${k}" aria-selected="${k === 'month'}">${cap1(k)}</button>`).join('')}</div></div>
        <div class="money-xl num" id="bhAmt" aria-live="polite"></div>
        <div class="bh-cap" id="bhCap"></div>
        <div class="meter" role="meter" aria-valuemin="0" aria-valuemax="${b.flex.toFixed(2)}" aria-valuenow="${b.spent.toFixed(2)}" aria-label="${gbp(b.spent)} of ${gbp(b.flex)} spent"><i style="width:${Math.min(100, b.spent / b.flex * 100)}%"></i></div>
        <div class="safe-foot num"><span>${gbp(b.spent)} spent</span><span>${gbp(b.flex)} for ${M.name}</span></div>
        ${flagLine(b)}
        <button type="button" class="how-link" data-go="budgetDetail">See full breakdown ${ic('right', 16)}</button>
      </section>

      <div class="section-head"><h2 class="h3">Where ${M.name} goes</h2></div>
      <section class="card">
        <div class="stack" aria-hidden="true"><i style="width:${pct(b.fixed)}%;background:#5B6F67"></i><i style="width:${pct(b.locked)}%;background:var(--gold)"></i><i style="width:${pct(b.spent)}%;background:var(--mint)"></i><i style="flex:1;background:rgba(207,232,220,.16)"></i></div>
        <div class="wf num">
          <div><span>${ic('arrowIn', 16)} Money in</span><span class="muted">Loan share + part-time job</span><b>${gbp(b.income)}</b></div>
          <div><span><i class="dot" style="background:#5B6F67"></i> Non-negotiables</span><span class="muted">Rent, bills, subs, investing</span><b>−${gbp(b.fixed)}</b></div>
          <div><span><i class="dot" style="background:var(--gold)"></i> Locked for events</span><span class="muted">${S.locks.length} plan${S.locks.length === 1 ? '' : 's'}</span><b>−${gbp(b.locked)}</b></div>
          <div class="tot"><span>To spend in ${M.name}</span><span></span><b>${gbp(b.flex)}</b></div>
          <div><span><i class="dot" style="background:var(--mint)"></i> Spent so far</span><span class="muted">${b.tx.length} payments</span><b>−${gbp(b.spent)}</b></div>
          <div class="tot"><span>Left to spend</span><span></span><b style="color:${b.left < 0 ? 'var(--bad-soft)' : 'var(--mint)'}">${gbp(b.left)}</b></div>
        </div>
      </section>

      ${b.flags.length ? `<button type="button" class="card flags-card" data-go="budgetDetail">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span class="status bad">${ic('flag', 14)} ${b.flags.length} red-flag day${b.flags.length > 1 ? 's' : ''}</span><span class="tiny">Limit ${gbp(b.limit)} a day</span></div>
        <p class="muted" style="margin:10px 0 0;font-size:14px">You went over your daily limit on ${b.flags.slice(-3).map(f => `<b style="color:var(--text)">${fmtShort(new Date(M.y, M.m, f.d))}</b>`).join(', ')}${b.flags.length > 3 ? ' and more' : ''}. Tap to see what happened.</p></button>` : ''}

      <div class="section-head"><h2 class="h3">Locked for events</h2><button type="button" class="link" id="addLock2">${ic('plus', 16)} Lock money</button></div>
      <p class="tiny" style="margin:-6px 0 12px">Set money aside for plans this month. It comes out of your spending, so it’s there on the day. Tick it off when it’s done.</p>
      <div class="list-card">${S.locks.length ? S.locks.map(lockRow).join('') : `<p class="empty" style="padding:20px">Nothing locked yet.</p>`}</div>

      <div class="section-head"><h2 class="h3">Top categories</h2><button type="button" class="link" data-go="budgetDetail">See all</button></div>
      <section class="card"><div class="cats">${top.map(c => `<div class="cat"><span class="ci">${ic(c.i, 15)}</span><span>${esc(c.n)}</span><span class="num" style="font-weight:700">${gbp(c.v)} <span class="tiny">${Math.round(c.v / b.spent * 100)}%</span></span><span class="bar"><i style="width:${c.v / topMax * 100}%"></i></span></div>`).join('')}</div></section>

      <div class="section-head"><h2 class="h3">Non-negotiables</h2><span class="tiny num">${gbp(b.fixed)} a month</span></div>
      <div class="list-card">${FIXED.map(([i, n, g, a, d]) => {
        const paid = d < M.d;
        return `<div class="row"><span class="ic-tile" style="width:40px;height:40px;color:var(--text-2)">${ic(i, 20)}</span><div class="grow"><div class="title" style="font-size:15px">${n}</div><div class="desc">${g} · ${paid ? `${ic('check', 12, 3)} Paid ${d} ${M.name.slice(0, 3)}` : `Due ${d} ${M.name.slice(0, 3)}`}</div></div><div class="num" style="font-weight:700">${gbp(a)}</div></div>`;
      }).join('')}</div>

      <button type="button" class="add-pot" id="addCash2" style="margin-top:16px">${ic('cash', 20)} Add a cash spend</button>
      <p class="tiny" style="text-align:center;margin-top:24px">Prototype · sample data</p>
    </div>`;
  },
  mount(el) {
    const b = B();
    const paintHero = k => {
      const v = Math.max(0, b.left);
      const val = k === 'day' ? v / b.daysLeft : k === 'week' ? v / b.weeksLeft : v;
      const [whole, pence] = val.toFixed(2).split('.');
      $('#bhAmt', el).innerHTML = `£${Number(whole).toLocaleString('en-GB')}<small>.${pence}</small>`;
      $('#bhCap', el).textContent = k === 'day' ? `a day for the next ${b.daysLeft} day${b.daysLeft > 1 ? 's' : ''}`
        : k === 'week' ? `a week for the next ${b.weeksLeft} week${b.weeksLeft > 1 ? 's' : ''}` : `left to spend in ${b.M.name}`;
      $$('[data-bp]', el).forEach(x => x.setAttribute('aria-selected', String(x.dataset.bp === k)));
    };
    $$('[data-bp]', el).forEach(x => x.addEventListener('click', () => paintHero(x.dataset.bp)));
    paintHero('month');
    $('#addCash', el).addEventListener('click', cashPrompt);
    $('#addCash2', el).addEventListener('click', () => cashSheet());
    ['#addLock', '#addLock2'].forEach(s => $(s, el).addEventListener('click', () => lockSheet()));
    $('#bTitle', el).addEventListener('click', () => flashCards());
    $$('[data-lk]', el).forEach(x => x.addEventListener('click', () => {
      const l = S.locks.find(z => z.id === x.dataset.lk); l.done = !l.done; save();
      toast(l.done ? `${esc(l.name)} ticked off` : `${esc(l.name)} back in your plans`, l.done ? 'okCircle' : 'lock');
      refresh();
    }));
    $$('[data-lkopen]', el).forEach(x => x.addEventListener('click', () => lockDetail(S.locks.find(z => z.id === x.dataset.lkopen))));
    return () => { const f = $('.flash', phone); f && f.remove(); };
  },
};

/* ---------- Flash cards: sort spends the model wasn't sure about ---------- */
function flashCards() {
  const old = $('.flash', phone); old && old.remove();
  if (!S.uncat.length) { const k = Date.now(); S.uncat = defaultUncat().map(u => ({ ...u, id: u.id + '-' + k })); save(); } // demo: fresh deck every time
  const ov = document.createElement('div');
  ov.className = 'flash';
  ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Sort spends');
  phone.appendChild(ov);
  const total = S.uncat.length;
  let done = 0;
  const close = refreshAfter => {
    ov.classList.add('out');
    setTimeout(() => ov.remove(), 240);
    if (refreshAfter) go('budget', {}, 'fade');
  };
  const decide = (u, catId) => {
    S.uncat = S.uncat.filter(x => x.id !== u.id);
    S.sorted.push({ id: u.id, m: u.m, a: u.a, cat: catId, bank: u.bank || myBanks()[0].id, ts: u.ts });
    save(); done++;
    render();
  };
  const head = () => `<div class="flash-head"><div><div class="eyebrow">Help Hedge learn</div><div class="h3">${S.uncat.length} spend${S.uncat.length === 1 ? '' : 's'} to sort</div></div>
    <button type="button" class="icon-btn" id="later" aria-label="Sort later">${ic('x')}</button></div>`;

  function render() {
    const u = S.uncat[0];
    if (!u) return renderDone();
    const g = catOf(u.guess), bank = bankById(u.bank || myBanks()[0].id), rel = relDay(u.ts);
    ov.innerHTML = `${head()}
      <div class="flash-intro"><div class="mascot-tile"><img src="assets/pose-ontrack.png" alt=""></div><p>We weren’t sure about this one. <b>Swipe right</b> if we got it right, <b>left</b> if not.</p></div>
      <div class="fc-stack">
        ${S.uncat.slice(1, 3).map((_, k) => `<div class="fc ghost g${k + 1}" aria-hidden="true"></div>`).join('')}
        <div class="fc" id="fc" tabindex="0" aria-describedby="fcq">
          <span class="stamp yes">${ic('check', 18, 3)} Yes</span><span class="stamp no">${ic('x', 18, 3)} No</span>
          <div class="fc-ic">${ic(g.i, 34, 1.8)}</div>
          <div class="fc-cat">${esc(g.n)}?</div>
          <div class="fc-amt num">${gbp(u.a)}</div>
          <div class="fc-m">${esc(u.m)}</div>
          <div class="fc-when">${ic('clock', 14)} ${rel}, around ${hhmm(u.ts)} · ${bank.name}</div>
          <p class="fc-q" id="fcq">You spent <b>${gbp(u.a)}</b> ${rel === 'Today' || rel === 'Yesterday' ? rel.toLowerCase() : 'on ' + rel} at around ${hhmm(u.ts)}. Does it go in <b>${esc(g.n)}</b>?</p>
        </div>
      </div>
      <div class="fc-actions">
        <button type="button" class="fc-btn no" id="no" aria-label="No, pick another category">${ic('x', 28, 2.5)}<span>No</span></button>
        <span class="fc-hint">${ic('back', 14)} swipe ${ic('right', 14)}</span>
        <button type="button" class="fc-btn yes" id="yes" aria-label="Yes, it goes in ${esc(g.n)}">${ic('check', 28, 2.5)}<span>Yes</span></button>
      </div>
      <p class="tiny" style="text-align:center;margin:10px 0 0">${done + 1} of ${total}</p>`;
    $('#later', ov).addEventListener('click', () => close(done > 0));
    const card = $('#fc', ov);
    const fling = dir => {
      card.style.transition = 'transform .28s ease-in, opacity .28s';
      card.style.transform = `translateX(${dir * 480}px) rotate(${dir * 22}deg)`;
      card.style.opacity = '0';
      card.style.setProperty(dir > 0 ? '--yes' : '--no', 1);
      setTimeout(() => dir > 0 ? decide(u, u.guess) : renderPicker(u), reduce ? 10 : 260);
    };
    $('#yes', ov).addEventListener('click', () => fling(1));
    $('#no', ov).addEventListener('click', () => fling(-1));
    card.addEventListener('keydown', e => { if (e.key === 'ArrowRight') fling(1); if (e.key === 'ArrowLeft') fling(-1); });
    let x0 = null, dx = 0;
    card.addEventListener('pointerdown', e => { x0 = e.clientX; dx = 0; card.setPointerCapture(e.pointerId); card.style.transition = 'none'; });
    card.addEventListener('pointermove', e => {
      if (x0 === null) return;
      dx = e.clientX - x0;
      card.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`;
      card.style.setProperty('--yes', Math.max(0, Math.min(1, dx / 90)));
      card.style.setProperty('--no', Math.max(0, Math.min(1, -dx / 90)));
    });
    const end = () => {
      if (x0 === null) return;
      x0 = null;
      if (dx > 90) return fling(1);
      if (dx < -90) return fling(-1);
      card.style.transition = 'transform .25s var(--ease)';
      card.style.transform = ''; card.style.setProperty('--yes', 0); card.style.setProperty('--no', 0);
    };
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', end);
    setTimeout(() => card.focus({ preventScroll: true }), 50);
  }

  function renderPicker(u) {
    ov.innerHTML = `<div class="flash-head"><button type="button" class="icon-btn" id="pback" aria-label="Back to the card">${ic('back', 24)}</button>
        <div class="grow"><div class="eyebrow">${gbp(u.a)} · ${esc(u.m)}</div><div class="h3">Which category is it?</div></div></div>
      <label class="search" style="margin:6px 0 14px"><span style="color:var(--text-3)">${ic('search', 20)}</span><span class="sr">Search categories</span><input id="cq" type="search" placeholder="Search or add a category" autocomplete="off"></label>
      <div class="cat-grid" id="cg" role="list"></div>`;
    $('#pback', ov).addEventListener('click', render);
    const cq = $('#cq', ov), cg = $('#cg', ov);
    const paint = () => {
      const q = cq.value.trim(), ql = q.toLowerCase();
      const list = allCats().filter(c => c.id !== u.guess && c.n.toLowerCase().includes(ql));
      const exact = allCats().some(c => c.n.toLowerCase() === ql);
      cg.innerHTML = list.map(c => `<button type="button" class="cat-tile" role="listitem" data-pick="${c.id}"><span>${ic(c.i, 22)}</span>${esc(c.n)}</button>`).join('')
        + `<button type="button" class="cat-tile add" role="listitem" id="addCat"><span>${ic('plus', 22)}</span>${q && !exact ? `Add “${esc(q)}”` : 'New category'}</button>`;
      $$('[data-pick]', cg).forEach(x => x.addEventListener('click', () => { decide(u, x.dataset.pick); toast(`Moved to ${esc(catOf(x.dataset.pick).n)}`, 'tag'); }));
      $('#addCat', cg).addEventListener('click', () => {
        const name = cq.value.trim();
        if (!name) { cq.focus(); cq.placeholder = 'Type a name for your category'; return; }
        const c = { id: 'c' + Date.now(), n: cap1(name), i: 'tag' };
        S.customCats.push(c); save();
        decide(u, c.id); toast(`New category “${esc(c.n)}” added`, 'tag');
      });
    };
    cq.addEventListener('input', paint);
    paint();
    setTimeout(() => cq.focus({ preventScroll: true }), 50);
  }

  function renderDone() {
    ov.innerHTML = `<div class="flash-done"><div class="mascot-tile"><img src="assets/pose-achieved.png" alt=""></div>
      <h2 class="h2">All sorted!</h2><p class="muted" style="margin:0 0 22px">Thanks. Hedge will remember these shops next time, so you’ll see fewer of these.</p>
      <button type="button" class="btn btn-primary" id="fdone">Back to my budget</button></div>`;
    confetti(30);
    $('#fdone', ov).addEventListener('click', () => close(true));
    $('#fdone', ov).focus();
  }
  render();
}

/* ---------- Cash spends ---------- */
function cashPrompt() {
  if (!S.cashStart) { S.cashStart = localISO(today()); save(); }
  const n = Math.round((today() - parseISO(S.cashStart)) / DAY) + 1;
  openModal(`
    <div class="ic-big" style="background:rgba(217,182,107,.14);color:var(--gold)">${ic('cash', 30)}</div>
    ${n <= 7 ? `<p class="eyebrow" style="margin:0 0 6px">Day ${n} of 7</p>` : ''}
    <h2 class="h2">Spent any cash today?</h2>
    <p class="muted" style="margin:0">Card and bank spends come in by themselves. Cash doesn’t, so add it here to keep your budget right. We’ll only ask during your first week.</p>
    <div class="btns"><button type="button" class="btn btn-primary" id="addc">${ic('plus', 20)} Add a cash spend</button><button type="button" class="btn btn-ghost" data-close>No cash today</button></div>`,
  box => $('#addc', box).addEventListener('click', () => cashSheet()), 'Cash check');
}
function cashSheet() {
  let amt = 10, catId = 'food', ago = 0;
  const cats = allCats().filter(c => c.id !== 'cash');
  openSheet(`${sheetHead('Add a cash spend', 'It counts towards this month’s budget.')}
    <div class="pay-amount" style="padding-bottom:10px"><div class="money-xl num" id="ca">${gbp(amt)}</div></div>
    <div class="amt-chips" role="group" aria-label="Amount">${[5, 10, 20, 50].map(v => `<button type="button" data-amt="${v}" aria-pressed="${v === amt}">£${v}</button>`).join('')}</div>
    <div class="field"><label for="co">Or type an amount</label><div class="input-wrap"><span class="prefix">£</span><input id="co" inputmode="decimal" placeholder="0.00"></div></div>
    <div class="field"><label for="cn">What was it for?</label><div class="input-wrap"><input id="cn" placeholder="e.g. Market stall lunch" autocomplete="off"></div></div>
    <div class="eyebrow" style="margin-bottom:8px">Category</div>
    <div class="cat-chips" role="radiogroup" aria-label="Category">${cats.map(c => `<button type="button" role="radio" aria-checked="${c.id === catId}" data-cc="${c.id}">${ic(c.i, 16)}${esc(c.n)}</button>`).join('')}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin:14px 0 16px"><span class="eyebrow">When</span>
      <div class="mini-seg" role="group" aria-label="When">${['Today', 'Yesterday'].map((w, i) => `<button type="button" data-ago="${i}" aria-pressed="${i === 0}" style="padding:0 12px">${w}</button>`).join('')}</div></div>
    <button type="button" class="btn btn-primary" id="cs">Add ${gbp(amt)} cash spend</button>`, box => {
    const cs = $('#cs', box), co = $('#co', box);
    const set = v => { amt = v; $('#ca', box).textContent = gbp(v); cs.textContent = `Add ${gbp(v)} cash spend`; };
    $$('[data-amt]', box).forEach(x => x.addEventListener('click', () => { co.value = ''; $$('[data-amt]', box).forEach(y => y.setAttribute('aria-pressed', String(y === x))); set(+x.dataset.amt); }));
    co.addEventListener('input', () => { $$('[data-amt]', box).forEach(y => y.setAttribute('aria-pressed', 'false')); set(Math.round((parseFloat(co.value.replace(/[^\d.]/g, '')) || 0) * 100) / 100); });
    $$('[data-cc]', box).forEach(x => x.addEventListener('click', () => { catId = x.dataset.cc; $$('[data-cc]', box).forEach(y => y.setAttribute('aria-checked', String(y === x))); }));
    $$('[data-ago]', box).forEach(x => x.addEventListener('click', () => { ago = +x.dataset.ago; $$('[data-ago]', box).forEach(y => y.setAttribute('aria-pressed', String(y === x))); }));
    cs.addEventListener('click', () => {
      const d = new Date(); if (ago) { d.setDate(d.getDate() - 1); d.setHours(13, 0); }
      S.cash.push({ id: 'cash' + Date.now(), m: $('#cn', box).value.trim() || 'Cash spend', a: amt, cat: catId, ts: d.getTime() });
      save(); closeLayer(true);
      refresh();
      toast(`${gbp(amt)} cash spend added`, 'cash');
    });
  }, 'Add cash spend');
}

/* ---------- Locked amounts for events ---------- */
function lockSheet() {
  const ICONS = ['gift', 'wine', 'ticket', 'utensils', 'music', 'plane', 'bus', 'shirt'];
  let icon = 'gift';
  const M = MONTH();
  openSheet(`${sheetHead('Lock money for an event', `It comes out of what you can spend in ${M.name}, so it’s ready on the day.`)}
    <div class="field"><label for="ln">What’s the plan?</label><div class="input-wrap"><input id="ln" maxlength="32" placeholder="e.g. Mum’s birthday dinner" autocomplete="off"></div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div class="field"><label for="la">Amount</label><div class="input-wrap"><span class="prefix">£</span><input id="la" inputmode="decimal" placeholder="30"></div></div>
      <div class="field"><label for="ld">Date</label><div class="input-wrap"><input id="ld" type="date" min="${localISO(today())}" max="${localISO(new Date(M.y, M.m, M.dim))}" value="${dayIn(7)}"></div></div>
    </div>
    <div class="field"><span style="font-size:14px;font-weight:600;color:var(--text-2)">Pick an icon</span>
      <div class="icon-pick" style="grid-template-columns:repeat(8,1fr)" role="group" aria-label="Icon">${ICONS.map(i => `<button type="button" data-icon="${i}" aria-label="${i}" aria-pressed="${i === icon}">${ic(i, 20)}</button>`).join('')}</div></div>
    <button type="button" class="btn btn-primary" id="lk">${ic('lock', 20)} Lock it</button>`, box => {
    $$('[data-icon]', box).forEach(x => x.addEventListener('click', () => { icon = x.dataset.icon; $$('[data-icon]', box).forEach(y => y.setAttribute('aria-pressed', String(y === x))); }));
    $('#lk', box).addEventListener('click', () => {
      const amount = Math.round((parseFloat($('#la', box).value.replace(/[^\d.]/g, '')) || 30) * 100) / 100;
      const l = { id: 'l' + Date.now(), name: $('#ln', box).value.trim() || 'My plan', icon, amount, date: $('#ld', box).value || dayIn(7), done: false };
      S.locks.push(l); save(); closeLayer(true);
      refresh();
      toast(`${gbp(amount)} locked for ${esc(l.name)}`, 'lock');
    });
  }, 'Lock money');
}
function lockDetail(l) {
  openSheet(`${sheetHead(esc(l.name), `${fmtDate(parseISO(l.date))}`)}
    <div class="pay-amount"><div class="money-xl num">${gbp(l.amount)}</div><div class="tiny">${l.done ? 'Done and ticked off' : 'Locked. Not part of your spending money.'}</div></div>
    <div style="display:grid;gap:10px">
      <button type="button" class="btn btn-primary" id="tick">${ic('check', 20, 3)} ${l.done ? 'Mark as not done' : 'Tick off as done'}</button>
      <button type="button" class="btn btn-danger" id="unl">${ic('unlock', 20)} Unlock ${gbp(l.amount)} back to spending</button>
    </div>`, box => {
    $('#tick', box).addEventListener('click', () => { l.done = !l.done; save(); closeLayer(true); refresh(); toast(l.done ? `${esc(l.name)} ticked off` : `${esc(l.name)} back in your plans`); });
    $('#unl', box).addEventListener('click', () => { S.locks = S.locks.filter(x => x.id !== l.id); save(); closeLayer(true); refresh(); toast(`${gbp(l.amount)} unlocked`, 'unlock'); });
  }, l.name);
}

/* ---------- Breakdown screen ---------- */
screens.budgetDetail = {
  title: 'Spending breakdown',
  html: () => `
    ${topbar(backBtn('budget'), '<span style="font-weight:700">Spending breakdown</span>', `<button type="button" class="icon-btn" id="cashD" aria-label="Add a cash spend">${ic('cash', 22)}</button>`)}
    <div class="scroll">
      <h1 class="sr">Spending breakdown</h1>
      <div class="seg" role="tablist" aria-label="Period">${[['day', 'Today'], ['week', 'This week'], ['month', 'This month']].map(([k, l]) => `<button type="button" role="tab" data-p="${k}" aria-selected="${k === 'month'}">${l}</button>`).join('')}</div>
      <div class="fchips" role="group" aria-label="Filter by bank">
        <button type="button" data-bk="all" aria-pressed="true">All accounts</button>
        ${myBanks().map(bk => `<button type="button" data-bk="${bk.id}" aria-pressed="false">${bankLogo(bk, 20)}${bk.name}</button>`).join('')}
        <button type="button" data-bk="cash" aria-pressed="false">${ic('cash', 16)} Cash</button>
      </div>
      <div id="bd"></div>
    </div>`,
  mount(el) {
    const st = { p: 'month', bk: 'all', cat: null };
    const paint = () => {
      const b = B(), M = b.M;
      const inP = t => st.p === 'day' ? t.day === M.d : st.p === 'week' ? t.day > M.d - 7 : true;
      const base = b.tx.filter(t => inP(t) && (st.bk === 'all' || t.bank === st.bk));
      const tx = st.cat ? base.filter(t => t.cat === st.cat) : base;
      const total = sum(base, t => t.a);
      const cats = catTotals(base);
      const parts = cats.slice(0, 6).map((c, i) => ({ ...c, c: RANK_COLS[i] }));
      if (cats.length > 6) parts.push({ id: '_rest', n: 'Everything else', i: 'tag', v: sum(cats.slice(6), c => c.v), c: RANK_COLS[6] });
      const days = st.p === 'day' ? 1 : st.p === 'week' ? Math.min(7, M.d) : M.d;
      const label = { day: 'today', week: 'in the last 7 days', month: `in ${M.name}` }[st.p];
      const byDay = Array(M.dim + 1).fill(0); base.forEach(t => { byDay[t.day] += t.a; });
      const range = st.p === 'month' ? Array.from({ length: M.dim }, (_, i) => i + 1) : Array.from({ length: 7 }, (_, i) => M.d - 6 + i).filter(d => d >= 1);
      const mx = Math.max(b.limit * 1.35, ...range.map(d => byDay[d]));
      const flags = range.filter(d => d <= M.d && byDay[d] > b.limit);
      const banksAll = [...myBanks().map(x => x.id), 'cash'];
      const byBank = banksAll.map(id => ({ id, v: sum(b.tx.filter(t => inP(t) && t.bank === id), t => t.a) })).filter(x => x.v > 0);
      const bankTotal = sum(byBank, x => x.v) || 1;

      $('#bd', el).innerHTML = `
        <section class="card" style="margin-top:14px">
          <div class="eyebrow">Spent ${label}${st.bk !== 'all' ? ' · ' + esc(bankName(st.bk)) : ''}</div>
          <div class="money-xl num" style="margin:4px 0 6px">${gbp(total)}</div>
          <div class="tiny">${base.length} payment${base.length === 1 ? '' : 's'}${st.p !== 'day' ? ` · ${gbp(total / days)} a day on average` : ''} · daily limit ${gbp(b.limit)}</div>
          ${st.p === 'day' && st.bk === 'all' ? flagLine(b) : ''}
        </section>

        <div class="section-head"><h2 class="h3">By category</h2>${st.cat ? `<button type="button" class="link" id="clr">${ic('x', 16)} Clear filter</button>` : '<span class="tiny">Tap one to filter</span>'}</div>
        <section class="card">
          ${parts.length ? `<div class="donut-wrap" role="img" aria-label="Spending by category: ${parts.map(p => `${p.n} ${Math.round(p.v / total * 100)}%`).join(', ')}">
            ${donut(parts)}<div class="donut-c"><div class="tiny">${st.cat ? esc(catOf(st.cat).n) : 'Total'}</div><div class="h3 num" style="font-size:20px">${gbp(st.cat ? sum(tx, t => t.a) : total)}</div></div></div>
          <div class="legend">${parts.map(p => `<button type="button" class="lg" ${p.id === '_rest' ? 'disabled' : `data-cat="${p.id}"`} aria-pressed="${st.cat === p.id}">
            <i class="sw" style="background:${p.c}"></i><span class="ci">${ic(p.i, 15)}</span><span class="grow">${esc(p.n)}</span><span class="num tiny">${gbp(p.v)}</span><b class="num">${Math.round(p.v / total * 100)}%</b></button>`).join('')}</div>`
          : `<p class="empty">No spending here yet.</p>`}
        </section>

        ${st.p !== 'day' ? `<div class="section-head"><h2 class="h3">Daily spending</h2><span class="tiny">Limit ${gbp(b.limit)} a day</span></div>
        <section class="card">
          <div class="dchart" aria-hidden="true">
            <div class="limit" style="bottom:${b.limit / mx * 100}%"><span>${gbp(b.limit)}</span></div>
            ${range.map(d => { const v = byDay[d], fut = d > M.d, over = !fut && v > b.limit; return `<div class="dcol ${over ? 'over' : ''} ${fut ? 'fut' : ''} ${d === M.d ? 'now' : ''}"><i style="height:${fut ? 3 : Math.max(2, v / mx * 100)}%"></i></div>`; }).join('')}
          </div>
          <div class="dlabels" aria-hidden="true">${range.map(d => `<span>${st.p === 'week' ? new Date(M.y, M.m, d).toLocaleDateString('en-GB', { weekday: 'narrow' }) : (d === 1 || d % 5 === 0 ? d : '')}</span>`).join('')}</div>
          <div class="dlegend"><span><i style="background:var(--mint)"></i> Within limit</span><span class="status bad" style="padding:3px 8px 3px 6px">${ic('flag', 12)} Over limit</span><span><i class="dash"></i> Daily limit</span></div>
          <p class="sr">${flags.length} days over the daily limit of ${gbp(b.limit)}.</p>
        </section>
        ${flags.length ? `<div class="section-head"><h2 class="h3">Red-flag days</h2><span class="status bad">${ic('flag', 14)} ${flags.length}</span></div>
        <div class="list-card">${flags.slice().reverse().map(d => { const top = base.filter(t => t.day === d).sort((x, y) => y.a - x.a)[0]; return `<div class="row"><span class="ic-tile" style="width:40px;height:40px;color:var(--bad-soft);background:rgba(214,69,69,.12)">${ic('flag', 18)}</span>
          <div class="grow"><div class="title" style="font-size:15px">${new Date(M.y, M.m, d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</div><div class="desc">Biggest: ${esc(top.m)} ${gbp(top.a)}</div></div>
          <div class="tx-amt num">${gbp(byDay[d])}<span class="skipped" style="color:var(--bad-soft)">+${gbp(byDay[d] - b.limit)} over</span></div></div>`; }).join('')}</div>` : ''}` : ''}

        ${byBank.length > 1 && st.bk === 'all' ? `<div class="section-head"><h2 class="h3">By account</h2></div>
        <section class="card"><div class="cats">${byBank.sort((x, y) => y.v - x.v).map(x => `<div class="cat"><span class="ci" style="background:none">${x.id === 'cash' ? ic('cash', 18) : bankLogo(bankById(x.id), 26)}</span><span>${esc(bankName(x.id))}</span><span class="num" style="font-weight:700">${gbp(x.v)} <span class="tiny">${Math.round(x.v / bankTotal * 100)}%</span></span><span class="bar"><i style="width:${x.v / bankTotal * 100}%;background:var(--gold)"></i></span></div>`).join('')}</div></section>` : ''}

        <div class="section-head"><h2 class="h3">Transactions</h2><span class="tiny">${tx.length}</span></div>
        <div class="list-card">${tx.length ? tx.slice(0, 40).map(t => { const c = catOf(t.cat); return `<div class="row"><span class="ic-tile" style="width:40px;height:40px;color:var(--mint)">${ic(c.i, 18)}</span>
          <div class="grow"><div class="title" style="font-size:15px">${esc(t.m)}</div><div class="desc">${esc(c.n)} · ${relDay(t.ts)}, ${hhmm(t.ts)}</div></div>
          <div class="tx-amt num">−${gbp(t.a)}<span class="tiny" style="display:block;font-weight:600">${esc(bankName(t.bank))}</span></div></div>`; }).join('') : '<p class="empty">Nothing here.</p>'}</div>
        <p class="tiny" style="text-align:center;margin-top:20px">Prototype · sample data</p>`;
      $$('[data-cat]', el).forEach(x => x.addEventListener('click', () => { st.cat = st.cat === x.dataset.cat ? null : x.dataset.cat; paint(); }));
      $('#clr', el) && $('#clr', el).addEventListener('click', () => { st.cat = null; paint(); });
    };
    $$('[data-p]', el).forEach(x => x.addEventListener('click', () => { st.p = x.dataset.p; st.cat = null; $$('[data-p]', el).forEach(y => y.setAttribute('aria-selected', String(y === x))); paint(); }));
    $$('[data-bk]', el).forEach(x => x.addEventListener('click', () => { st.bk = x.dataset.bk; st.cat = null; $$('[data-bk]', el).forEach(y => y.setAttribute('aria-pressed', String(y === x))); paint(); }));
    $('#cashD', el).addEventListener('click', cashPrompt);
    paint();
  },
};
/* =========================================================
   SPLIT (Splitwise-style groups)
   ========================================================= */
function defaultGroups() {
  const ago = (d, h) => { const x = addDays(today(), -d); x.setHours(h, 0); return x.getTime(); };
  const all1 = ['me', 'p0', 'p1', 'p2'], all2 = ['me', 'p1', 'p3', 'p4'];
  return [
    { id: 'g1', name: 'Day trip to Coventry', icon: 'bus', budget: 150, members: all1, expenses: [
      { id: 'e4', d: 'Coffee at the station', a: 9.60, by: 'p2', split: ['me', 'p2'], ts: ago(1, 17) },
      { id: 'e3', d: 'Cathedral tickets', a: 21.00, by: 'p1', split: ['me', 'p1', 'p2'], ts: ago(1, 14) },
      { id: 'e2', d: 'Lunch at Nando’s', a: 54.40, by: 'p0', split: all1, ts: ago(1, 13) },
      { id: 'e1', d: 'Train tickets', a: 48.00, by: 'me', split: all1, ts: ago(2, 9) },
    ] },
    { id: 'g2', name: 'Flat 12 bills', icon: 'home', budget: 300, members: all2, expenses: [
      { id: 'f3', d: 'Cleaning stuff', a: 12.40, by: 'p4', split: all2, ts: ago(3, 18) },
      { id: 'f2', d: 'Big Tesco shop', a: 64.80, by: 'p3', split: all2, ts: ago(5, 12) },
      { id: 'f1', d: 'Broadband', a: 28.00, by: 'me', split: all2, ts: ago(9, 10) },
    ] },
  ];
}
if (!Array.isArray(S.groups)) S.groups = defaultGroups();
if (!Array.isArray(S.mates)) S.mates = [];
const MATE_COLS = ['#D9B66B', '#CFE8DC', '#EBD9B0', '#9FD3BC', '#E8CB8A', '#B9C6BF'];
const mate = id => {
  if (id === 'me') return { id, n: 'You', full: (S.user && S.user.name) || 'You', c: 'var(--mint)', ini: initials((S.user && S.user.name) || 'Y') };
  if (/^p\d$/.test(id)) { const p = PEOPLE[+id.slice(1)]; return { id, n: p.n.split(' ')[0], full: p.n, c: p.c, ini: initials(p.n) }; }
  const m = S.mates.find(x => x.id === id) || { n: 'Mate', c: '#B9C6BF' };
  return { id, n: m.n.split(' ')[0], full: m.n, c: m.c, ini: initials(m.n) };
};
const mav = (id, cls = '') => { const m = mate(id); return `<span class="pav ${cls}" style="background:${m.c}" title="${esc(m.full)}">${m.ini}</span>`; };
const findGroup = id => S.groups.find(g => g.id === id);
function groupMath(g) {
  const net = {}; g.members.forEach(m => { net[m] = 0; });
  let spent = 0;
  g.expenses.forEach(e => {
    if (e.settle) { net[e.by] = (net[e.by] || 0) + e.a; net[e.to] = (net[e.to] || 0) - e.a; return; }
    spent += e.a;
    net[e.by] = (net[e.by] || 0) + e.a;
    const share = e.a / e.split.length;
    e.split.forEach(s => { net[s] = (net[s] || 0) - share; });
  });
  const cr = Object.entries(net).filter(([, v]) => v > .005).map(([k, v]) => ({ k, v })).sort((a, b) => b.v - a.v);
  const db = Object.entries(net).filter(([, v]) => v < -.005).map(([k, v]) => ({ k, v: -v })).sort((a, b) => b.v - a.v);
  const debts = [];
  let i = 0, j = 0;
  while (i < db.length && j < cr.length) {
    const a = Math.min(db[i].v, cr[j].v);
    debts.push({ from: db[i].k, to: cr[j].k, a: Math.round(a * 100) / 100 });
    db[i].v -= a; cr[j].v -= a;
    if (db[i].v < .005) i++;
    if (cr[j].v < .005) j++;
  }
  return { spent, net, debts, pending: sum(debts, d => d.a), me: net.me || 0 };
}
const meLine = v => v > .005 ? `<span class="owe ok">${ic('arrowIn', 14)} You’re owed ${gbp(v)}</span>`
  : v < -.005 ? `<span class="owe warn">${ic('arrowOut', 14)} You owe ${gbp(-v)}</span>` : `<span class="owe">${ic('check', 14, 3)} You’re square</span>`;

screens.split = {
  tab: 'split', title: 'Split',
  html: () => {
    const all = S.groups.map(g => ({ g, m: groupMath(g) }));
    const owed = sum(all, x => Math.max(0, x.m.me)), owe = sum(all, x => Math.max(0, -x.m.me));
    return `
    <div class="topbar" style="padding:4px 8px 4px 20px"><h1 class="h2" style="margin:0">Split</h1><button type="button" class="icon-btn" id="ng" aria-label="New group">${ic('plus', 24)}</button></div>
    <div class="scroll">
      <section class="split-hero">
        <div class="eyebrow" style="color:rgba(247,243,234,.8)">Across your groups</div>
        <div class="sh-row">
          <div><div class="tiny" style="color:rgba(247,243,234,.75)">You’re owed</div><div class="money-xl num" style="font-size:34px;color:var(--mint)">${gbp(owed)}</div></div>
          <div><div class="tiny" style="color:rgba(247,243,234,.75)">You owe</div><div class="money-xl num" style="font-size:34px">${gbp(owe)}</div></div>
        </div>
        <p class="tiny" style="margin:8px 0 0;color:rgba(247,243,234,.8);max-width:66%">Add what you spend, Hedge works out who owes who. Settle up by bank in a tap.</p>
        <img src="assets/pose-relax.png" alt="">
      </section>
      <div class="section-head"><h2 class="h3">Your groups</h2><span class="tiny">${S.groups.length}</span></div>
      <div class="pots">
        ${all.map(({ g, m }) => `<button type="button" class="group-card" data-go="splitGroup" data-params='{"id":"${g.id}"}'>
          <span class="gc-top"><span class="ic-tile" style="width:46px;height:46px;color:var(--gold)">${ic(g.icon, 22)}</span>
            <span class="grow"><span class="pname">${esc(g.name)}${g.ended ? ` <span class="ended-tag">${ic('flag', 12)} Ended</span>` : ''}</span><span class="stack-av">${g.members.slice(0, 5).map(x => mav(x, 'xs')).join('')}<span class="tiny" style="margin-left:8px">${g.members.length} people</span></span></span>
            ${ic('right', 20)}</span>
          <span class="pot-bar" style="display:block;margin-top:12px"><i style="width:${Math.min(100, m.spent / g.budget * 100)}%;${m.spent > g.budget ? 'background:var(--bad)' : ''}"></i></span>
          <span class="gc-foot"><span class="num">${gbp(m.spent)} of ${gbpS(g.budget)} spent</span>${meLine(m.me)}</span>
        </button>`).join('')}
        <button type="button" class="add-pot" id="ng2">${ic('plus', 20)} Start a new group</button>
      </div>
      <p class="tiny" style="text-align:center;margin-top:24px">Prototype · sample data</p>
    </div>`;
  },
  mount(el) {
    ['#ng', '#ng2'].forEach(s => $(s, el).addEventListener('click', newGroupSheet));
  },
};

screens.splitGroup = {
  title: 'Group',
  html: ({ id }) => {
    const g = findGroup(id);
    if (!g) return `${topbar(backBtn('split'))}<div class="soon"><h1 class="h2">This group has gone</h1></div>`;
    const m = groupMath(g), left = g.budget - m.spent, over = left < 0;
    return `
    ${topbar(backBtn('split'), `<span style="font-weight:700;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(g.name)}</span>`, `<button type="button" class="icon-btn" id="addm" aria-label="Add mates">${ic('users', 22)}</button>`)}
    <div class="scroll">
      <h1 class="sr">${esc(g.name)}</h1>
      ${g.ended ? `<div class="ended-banner">${ic('flag', 20)}<div><b>Trip ended ${fmtShort(g.ended)}</b><span>Final spend ${gbp(m.spent)} of ${gbpS(g.budget)}. ${m.pending > .005 ? 'Settle up below to close it out.' : 'Everyone is square.'}</span></div></div>` : ''}
      <section class="gtab">
        <div class="gtab-stats num">
          <div><span>${ic('receipt', 14)} Spent</span><b>${gbp(m.spent)}</b></div>
          <div><span>${ic('piggy', 14)} ${over ? 'Over budget' : 'Left in budget'}</span><b style="color:${over ? 'var(--bad-soft)' : 'var(--mint)'}">${gbp(Math.abs(left))}</b></div>
          <div><span>${ic('clock', 14)} Pending</span><b style="color:var(--gold-2)">${gbp(m.pending)}</b></div>
        </div>
        <div class="meter" role="meter" aria-valuemin="0" aria-valuemax="${g.budget}" aria-valuenow="${m.spent.toFixed(2)}" aria-label="${gbp(m.spent)} of ${gbp(g.budget)} budget spent" style="background:var(--ink-2)"><i style="width:${Math.min(100, m.spent / g.budget * 100)}%;${over ? 'background:var(--bad)' : ''}"></i></div>
        <div class="safe-foot num" style="color:var(--text-2)"><span>Budget ${gbp(g.budget)}</span><button type="button" class="link-btn" id="eb" style="min-height:32px;padding:0 8px;color:var(--mint);font-size:13px">Edit budget</button></div>
        ${over ? `<div class="flag-line bad" style="margin-top:8px">${ic('flag', 16)}<span><b>Over budget</b> by ${gbp(-left)}</span></div>` : ''}
      </section>

      <div class="members">${g.members.map(x => `<span class="member">${mav(x)}<span>${esc(mate(x).n)}</span></span>`).join('')}
        <button type="button" class="member" id="addm2"><span class="pav add">${ic('plus', 18)}</span><span>Add</span></button></div>

      <div class="section-head"><h2 class="h3">Who owes who</h2>${meLine(m.me)}</div>
      <div class="list-card">${m.debts.length ? m.debts.map((d, k) => `<div class="row" style="min-height:60px">
          ${mav(d.from, 'sm')}<div class="grow"><div class="title" style="font-size:15px">${esc(mate(d.from).n)} ${d.from === 'me' ? 'owe' : 'owes'} ${d.to === 'me' ? 'you' : esc(mate(d.to).n)}</div><div class="desc num">${gbp(d.a)}</div></div>
          ${d.from === 'me' ? `<button type="button" class="iou-btn owe" data-settle="${k}">${ic('send', 15)} Settle up</button>` : d.to === 'me' ? `<button type="button" class="iou-btn owed" data-remind="${k}">${ic('bell', 15)} Remind</button>` : ''}
        </div>`).join('') : `<p class="empty" style="padding:20px">${ic('check', 16, 3)} Everyone is square.</p>`}</div>

      <div class="section-head"><h2 class="h3">Expenses</h2><span class="tiny">${g.expenses.filter(e => !e.settle).length}</span></div>
      <div class="list-card">${g.expenses.length ? g.expenses.slice().sort((a, b) => b.ts - a.ts).map(e => {
        if (e.settle) return `<div class="row"><span class="ic-tile" style="width:40px;height:40px;color:var(--ok)">${ic('okCircle', 18)}</span><div class="grow"><div class="title" style="font-size:15px">${esc(mate(e.by).n)} paid ${e.to === 'me' ? 'you' : esc(mate(e.to).n)}</div><div class="desc">${relDay(e.ts)} · settled up</div></div><div class="num" style="font-weight:700;color:#7FD6AC">${gbp(e.a)}</div></div>`;
        const everyone = e.split.length === g.members.length && g.members.every(x => e.split.includes(x));
        const mine = e.split.includes('me') ? e.a / e.split.length : 0;
        const note = e.by === 'me' ? `you lent ${gbp(e.a - mine)}` : mine ? `your share ${gbp(mine)}` : 'not involved';
        return `<div class="row"><span class="ic-tile" style="width:40px;height:40px;color:var(--mint)">${ic('receipt', 18)}</span>
          <div class="grow"><div class="title" style="font-size:15px">${esc(e.d)}</div><div class="desc">${e.by === 'me' ? 'You' : esc(mate(e.by).n)} paid · ${everyone ? `split between everyone` : `split between ${e.split.map(x => esc(mate(x).n)).join(', ')}`}</div></div>
          <div class="tx-amt num">${gbp(e.a)}<span class="tiny" style="display:block;font-weight:600;color:${e.by === 'me' ? '#7FD6AC' : 'var(--text-3)'}">${note}</span></div></div>`;
      }).join('') : '<p class="empty">No expenses yet. Add the first one.</p>'}</div>
    </div>
    ${g.ended ? `<div class="bottom-cta"><button type="button" class="btn btn-ghost" id="reopen">${ic('refresh', 20)} Reopen trip</button></div>`
      : `<div class="bottom-cta"><div class="cta-row"><button type="button" class="btn btn-primary" id="addx">${ic('plus', 20)} Add an expense</button><button type="button" class="btn btn-danger end-btn" id="endt">${ic('flag', 18)} End trip</button></div></div>`}`;
  },
  mount(el, { id }) {
    const g = findGroup(id);
    if (!g) return;
    const m = groupMath(g);
    $('#addx', el) && $('#addx', el).addEventListener('click', () => expenseSheet(g));
    $('#reopen', el) && $('#reopen', el).addEventListener('click', () => { delete g.ended; save(); refresh(); toast(`${esc(g.name)} is open again`, 'refresh'); });
    $('#endt', el) && $('#endt', el).addEventListener('click', () => openModal(`
      <div class="ic-big" style="background:rgba(217,182,107,.14);color:var(--gold)">${ic('flag', 28)}</div>
      <h2 class="h2">End ${esc(g.name)}?</h2>
      <p class="muted" style="margin:0">Everyone will see the trip has ended. No new expenses can be added, but anyone who still owes can settle up. You can reopen it later.</p>
      <div class="receipt num" style="text-align:left;margin:16px 0 0">
        <div><span>Total spent</span><span>${gbp(m.spent)}</span></div>
        <div><span>Budget</span><span>${gbp(g.budget)}</span></div>
        <div style="border-bottom:0"><span>Still to settle</span><span>${gbp(m.pending)}</span></div>
      </div>
      <div class="btns"><button type="button" class="btn btn-gold" id="endok">${ic('flag', 18)} End trip</button><button type="button" class="btn btn-ghost" data-close>Not yet</button></div>`,
      box => $('#endok', box).addEventListener('click', () => { g.ended = Date.now(); save(); closeLayer(true); refresh(); confetti(40); toast(`${esc(g.name)} has ended`, 'flag'); }), 'End trip'));
    ['#addm', '#addm2'].forEach(s => $(s, el).addEventListener('click', () => addMatesSheet(g)));
    $('#eb', el).addEventListener('click', () => budgetSheet(g));
    $$('[data-remind]', el).forEach(b => b.addEventListener('click', () => { const d = m.debts[b.dataset.remind]; b.innerHTML = `${ic('check', 15, 3)} Sent`; b.disabled = true; toast(`Reminder sent to ${esc(mate(d.from).n)}`, 'bell'); }));
    $$('[data-settle]', el).forEach(b => b.addEventListener('click', () => settleSheet(g, m.debts[b.dataset.settle])));
  },
};

function expenseSheet(g) {
  let by = 'me', mode = 'all';
  const chosen = new Set(g.members);
  openSheet(`${sheetHead('Add an expense', esc(g.name))}
    <div class="field"><label for="xd">What was it?</label><div class="input-wrap"><input id="xd" placeholder="e.g. Pizza for everyone" autocomplete="off"></div></div>
    <div class="field"><label for="xa">How much?</label><div class="input-wrap"><span class="prefix">£</span><input id="xa" inputmode="decimal" placeholder="20.00"></div></div>
    <div class="eyebrow" style="margin-bottom:8px">Paid by</div>
    <div class="people pick" role="radiogroup" aria-label="Paid by">${g.members.map(x => `<button type="button" class="person" role="radio" aria-checked="${x === by}" data-by="${x}">${mav(x)}${esc(mate(x).n)}</button>`).join('')}</div>
    <div class="eyebrow" style="margin:14px 0 8px">Split</div>
    <div class="seg" role="tablist" aria-label="Split between">${[['all', 'Everyone'], ['some', 'Choose people']].map(([k, l]) => `<button type="button" role="tab" data-sm="${k}" aria-selected="${k === mode}">${l}</button>`).join('')}</div>
    <div class="people pick" id="who" role="group" aria-label="Split between" hidden style="margin-top:12px">${g.members.map(x => `<button type="button" class="person" role="checkbox" aria-checked="true" data-w="${x}">${mav(x)}${esc(mate(x).n)}</button>`).join('')}</div>
    <p class="pace" id="each" style="margin:14px 0"></p>
    <button type="button" class="btn btn-primary" id="xs">Add expense</button>`, box => {
    const amt = () => Math.round((parseFloat($('#xa', box).value.replace(/[^\d.]/g, '')) || 20) * 100) / 100;
    const people = () => mode === 'all' ? g.members : g.members.filter(x => chosen.has(x));
    const paint = () => {
      const n = Math.max(1, people().length);
      $('#who', box).hidden = mode !== 'some';
      $('#each', box).innerHTML = `${ic('users', 18)} ${gbp(amt() / n)} each · split between ${mode === 'all' ? 'everyone' : people().map(x => esc(mate(x).n)).join(', ') || 'nobody yet'}`;
    };
    $('#xa', box).addEventListener('input', paint);
    $$('[data-by]', box).forEach(x => x.addEventListener('click', () => { by = x.dataset.by; $$('[data-by]', box).forEach(y => y.setAttribute('aria-checked', String(y === x))); }));
    $$('[data-sm]', box).forEach(x => x.addEventListener('click', () => { mode = x.dataset.sm; $$('[data-sm]', box).forEach(y => y.setAttribute('aria-selected', String(y === x))); paint(); }));
    $$('[data-w]', box).forEach(x => x.addEventListener('click', () => { const k = x.dataset.w; chosen.has(k) ? chosen.delete(k) : chosen.add(k); x.setAttribute('aria-checked', String(chosen.has(k))); paint(); }));
    $('#xs', box).addEventListener('click', () => {
      const split = people().length ? people() : g.members;
      const e = { id: 'x' + Date.now(), d: $('#xd', box).value.trim() || 'Expense', a: amt(), by, split, ts: Date.now() };
      g.expenses.push(e); save(); closeLayer(true); refresh();
      toast(`${gbp(e.a)} added · ${gbp(e.a / split.length)} each`, 'receipt');
    });
    paint();
  }, 'Add expense');
}

function settleSheet(g, d) {
  const banks = myBanks();
  openSheet(`${sheetHead('Settle up', esc(g.name))}
    <div class="pay-amount"><div class="money-xl num">${gbp(d.a)}</div><div class="tiny">to ${esc(mate(d.to).full)}</div></div>
    <p class="tiny" style="display:flex;gap:8px;margin:0 0 14px">${ic('lock', 16)}<span>Pay by bank from ${banks[0].name}. You approve it in your bank’s app. Hedge never holds the money.</span></p>
    <div style="display:grid;gap:10px"><button type="button" class="btn btn-primary" id="sp">${ic('send', 18)} Pay ${gbp(d.a)}</button>
    <button type="button" class="btn btn-ghost" id="sc">I paid in cash</button></div>`, box => {
    const done = how => {
      g.expenses.push({ id: 's' + Date.now(), settle: true, by: d.from, to: d.to, a: d.a, ts: Date.now() });
      save(); closeLayer(true); refresh();
      toast(`Settled ${gbp(d.a)} with ${esc(mate(d.to).n)}${how}`, 'okCircle');
    };
    $('#sp', box).addEventListener('click', async () => { setBusy($('#sp', box), `Waiting for ${banks[0].name} to approve`); await sleep(1400); confetti(24); done(''); });
    $('#sc', box).addEventListener('click', () => done(' in cash'));
  }, 'Settle up');
}

function budgetSheet(g) {
  openSheet(`${sheetHead('Group budget', esc(g.name))}
    <div class="field"><label for="gb">Budget for this group</label><div class="input-wrap"><span class="prefix">£</span><input id="gb" inputmode="decimal" value="${g.budget}"></div></div>
    <button type="button" class="btn btn-primary" id="gbs">Save budget</button>`, box => {
    $('#gbs', box).addEventListener('click', () => { g.budget = parseFloat($('#gb', box).value.replace(/[^\d.]/g, '')) || g.budget; save(); closeLayer(true); refresh(); toast(`Budget set to ${gbp(g.budget)}`); });
  }, 'Group budget');
}

function matePicker(exclude, pre) {
  return `<div class="people pick" role="group" aria-label="Mates" style="flex-wrap:wrap;overflow:visible">${PEOPLE.map((p, i) => 'p' + i).filter(x => !exclude.includes(x)).map(x => `<button type="button" class="person" role="checkbox" aria-checked="${pre.includes(x)}" data-mt="${x}">${mav(x)}${esc(mate(x).n)}</button>`).join('')}</div>
    <div class="field" style="margin-top:12px"><label for="nm">Or add someone new</label><div class="input-wrap"><input id="nm" placeholder="Their name" autocomplete="off"></div></div>`;
}
function wireMates(box, set) {
  $$('[data-mt]', box).forEach(x => x.addEventListener('click', () => { const k = x.dataset.mt; set.has(k) ? set.delete(k) : set.add(k); x.setAttribute('aria-checked', String(set.has(k))); }));
  return () => {
    const nm = $('#nm', box).value.trim();
    if (nm) { const id = 'm' + Date.now(); S.mates.push({ id, n: nm, c: MATE_COLS[S.mates.length % MATE_COLS.length] }); set.add(id); }
    return [...set];
  };
}
function addMatesSheet(g) {
  const set = new Set();
  openSheet(`${sheetHead('Add mates', `To ${esc(g.name)}`)}${matePicker(g.members, [])}
    <button type="button" class="btn btn-primary" id="am">Add to group</button>`, box => {
    const get = wireMates(box, set);
    $('#am', box).addEventListener('click', () => {
      const ids = get();
      g.members.push(...ids.filter(x => !g.members.includes(x))); save(); closeLayer(true); refresh();
      toast(ids.length ? `${ids.length} added to ${esc(g.name)}` : 'No one new added', 'users');
    });
  }, 'Add mates');
}
function newGroupSheet() {
  const ICONS = ['bus', 'home', 'plane', 'utensils', 'wine', 'ticket', 'music', 'gift'];
  let icon = 'bus';
  const set = new Set(['p0', 'p1']);
  openSheet(`${sheetHead('New group', 'Name it, set a budget and add your mates.')}
    <div class="field"><label for="gn">Group name</label><div class="input-wrap"><input id="gn" maxlength="32" placeholder="e.g. Day trip to Coventry" autocomplete="off"></div></div>
    <div class="field"><label for="gbud">Budget</label><div class="input-wrap"><span class="prefix">£</span><input id="gbud" inputmode="decimal" placeholder="150"></div></div>
    <div class="field"><span style="font-size:14px;font-weight:600;color:var(--text-2)">Icon</span>
      <div class="icon-pick" style="grid-template-columns:repeat(8,1fr)" role="group" aria-label="Icon">${ICONS.map(i => `<button type="button" data-icon="${i}" aria-label="${i}" aria-pressed="${i === icon}">${ic(i, 20)}</button>`).join('')}</div></div>
    <div class="eyebrow" style="margin-bottom:8px">Who’s in?</div>
    ${matePicker([], [...set])}
    <button type="button" class="btn btn-primary" id="gc">Create group</button>`, box => {
    $$('[data-icon]', box).forEach(x => x.addEventListener('click', () => { icon = x.dataset.icon; $$('[data-icon]', box).forEach(y => y.setAttribute('aria-pressed', String(y === x))); }));
    const get = wireMates(box, set);
    $('#gc', box).addEventListener('click', () => {
      const g = { id: 'g' + Date.now(), name: $('#gn', box).value.trim() || 'Day trip to Coventry', icon, budget: parseFloat($('#gbud', box).value.replace(/[^\d.]/g, '')) || 150, members: ['me', ...get()], expenses: [] };
      S.groups.unshift(g); save(); closeLayer(true);
      go('splitGroup', { id: g.id });
      toast(`${esc(g.name)} created`, 'users');
    });
  }, 'New group');
}


/* ---------------- Boot ---------------- */
$('#deskReset').addEventListener('click', resetDemo);
const clock = () => { $('#sbTime').textContent = new Date().toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' }); };
clock(); setInterval(clock, 30000);
go('splash', {}, 'fade');
})();
