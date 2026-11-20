# Hedge prototype

Clickable MVP for the District Tech Challenge (Fintech). Plain HTML, CSS and JS, no build step.

## Run locally

```bash
cd ~/Desktop/hedge && python3 -m http.server 5180
```

Then open http://localhost:5180

## Deploy to Vercel

```bash
cd ~/Desktop/hedge && npx vercel --prod
```

Or drag the `hedge` folder into vercel.com/new. Framework preset: "Other". No build command.

## Files

- `index.html`: the centred phone column (100% screen height)
- `styles.css`: brand tokens (green, cream, mint, gold, ink) and all components
- `app.js`: screens, flows and demo data
- `assets/`: logo and mascot poses cut from the brand sheet (`assets/raw/` holds the originals)

## Demo notes

- No validation anywhere: every Continue / Log in button works with empty or any input. Password checks tick one per letter typed.
- Demo data is saved in the browser only. "Restart demo" (left of the phone on desktop, or Profile > Restart demo) wipes it.
- Plans: freemium. Free, Plus (£2/mo or £20/yr), Family (£8/mo, up to 5), plus a 14-day Plus trial. Every feature is open whatever you pick.
- Budget: Day / Week / Month spend split, breakdown screen (category donut, bank filter, daily chart with red-flag days) and locked money for events. Tapping the "Budget" title at the top starts the swipe cards (nowhere else); tapping the cash icon starts the cash check-in.
- Home: hero carousel (safe-to-spend + sponsored event ads, rotates every ~3s, swipeable, dots), Ask Hedge, Pay & request, overview, streak, and one Borrow & protect scroll (loans + insurance).
- Savings: £5 / £10 round-ups and a Quick save slider (£10 to £50).
- Split: groups with a budget, mates, expenses split with everyone or chosen people, who-owes-who, settle up, and End trip (reopenable).
