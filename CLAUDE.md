# CLAUDE.md: Hedge prototype

Context file for Claude. Read this before changing anything in this folder. Last updated 20 Nov 2026.

## 1. What this is

- **Hedge**: a clickable MVP of a bank-agnostic UK student money app. It saves a slice of every spend into pots, but only when a live budget says it's safe.
- Built for the Warwick Enterprise District Tech Challenge (Fintech track, 19–20 Nov 2026) by Neet Jain.
- **Prototype only.** All data is demo data in the browser. No real money moves, nothing is sent to a server, and every feature is unlocked whatever plan is picked.
- Neet writes casually. Reply simply and lead with the answer.

## 2. Stack, files, running, deploying

- Plain HTML, CSS and JS. No framework, no build step, no dependencies besides Google Fonts (Fraunces for display, Plus Jakarta Sans for body).
- Files:
  - `index.html`: the shell. A centred phone column (`main.phone#phone`, max 430px wide, 100dvh tall) containing:
    - fake status bar, shown at 600px and wider
    - `#stage` (screens)
    - `nav#tabbar`
    - `#layer` (sheets and modals)
    - `#toast`
  - On desktop (1000px and wider), a side panel shows the logo and a "Restart demo" button.
  - `app.js`: the whole app in one IIFE, about 2,240 lines (screens, flows, demo data).
  - `styles.css`: design tokens and all components.
  - `assets/`: logo and mascot poses cut from the brand sheet. `assets/raw/` has the originals.
  - `README.md`: short run, deploy and demo notes.
- **Run locally:** `cd ~/Desktop/hedge && python3 -m http.server 5180`, then open http://localhost:5180. The Claude preview config is named `hedge`.
- **Syntax check** (no Node on this Mac): `osascript -l JavaScript -e 'ObjC.import("Foundation"); var s=$.NSString.stringWithContentsOfFileEncodingError("/Users/neetjainnn/Desktop/hedge/app.js",4,null).js; new Function(s); "ok"'`
- **Repo:** https://github.com/neetjainnn/hedge (public, branch `main`).
- **Hosting:** Vercel, with framework preset "Other" and no build command. If Vercel is linked to the repo, pushing to `main` redeploys.
- **Tools on this Mac:**
  - GitHub CLI is at `~/.local/bin/gh` (run `export PATH="$HOME/.local/bin:$PATH"`), logged in as neetjainnn.
  - No Node, npm or Homebrew, so there's no Vercel CLI.
  - Commit or push only when Neet asks.

## 3. Architecture (app.js)

- **Router:** `go(name, params, dir)` renders `screens[name].html(params)` into a new `<section class="screen">`.
  - It runs `mount(el, params)`, which may return a cleanup function, and animates in. `dir` is one of `fwd`, `back`, `fade` or `up`.
  - `refresh()` re-renders the current screen, which is how most actions update the UI.
  - Each screen object is `{ html, mount, tab, title, light }`. `tab` shows the tab bar with that tab active.
- **Navigation shortcuts:** any element with `data-go="screen"` (plus optional `data-params='{"id":"x"}'` and `data-dir`) navigates. The tab bar has 4 tabs: Home, Savings, Budget, Split.
- **Overlays:**
  - `openSheet(html, mount, label)` gives a bottom sheet; `openModal(...)` gives a centred alert dialog.
  - `closeLayer(instant)`. `[data-close]` closes, and so does Escape.
  - `sheetHead(title, sub)` builds the sheet header.
- **Helpers:**
  - `toast(msg, icon)` (shows at the top) and `confetti(n)`.
  - `carousel(track, dots, ms)`: scroll-snap with auto-advance. `ms` can be a function of the slide index. Pauses on hover, focus or touch, and respects reduced motion.
  - `ring()` and `donut()` draw SVG charts.
  - `ic(name, size, stroke)` draws Lucide-style inline SVG icons from the `P` map. Add new icons to `P`, never emoji.
  - Money: `gbp()` gives £1,234.56; `gbpS()` drops the pence when they're zero.
  - Dates: `fmtDate()`, `fmtShort()`, `relDay()`, `localISO()`, `parseISO()`, `dayIn(n)`.
- **State:**
  - Lives in one object `S`, saved to localStorage key `hedge.proto.v1` by `save()`.
  - `fresh()` builds the defaults. On load, missing keys are back-filled so old saved data keeps working.
  - `S.loggedIn` resets to false on every load.
  - `sess` holds per-login flags.
  - `resetDemo()` wipes storage and reloads.
- **Main state keys:**
  - `user` (`{name, phone, email, pw}`; `pw` is a djb2 hash, never plaintext), `pending`, `onboarded`, `banks`, `plan`.
  - Savings: `pots`, `roundup` (5 or 10).
  - Budget: `locks`, `uncat`, `sorted`, `cash`, `customCats`, `cashStart`.
  - Home: `ious`.
  - Split: `groups`, `mates`.

## 4. Features, screen by screen

### Onboarding
- **Splash** (`splash`): cream background, logo, loading bar. Goes to `login` if a user exists, otherwise `welcome`.
- **Welcome** (`welcome`): a 3-slide mascot carousel, "Create an account" and "I already have an account".
- **No validation anywhere** (Neet's rule for the prototype): every Continue, Verify and Log in works with empty or any input.
  - **Sign up** (`signup`): name, +44 mobile, email.
  - **OTP** (`otp`): 6 boxes that handle paste, auto-advance and backspace, plus a resend timer and a "Demo mode: any 6 digits works" chip. It verifies automatically once 6 digits are in, and the Verify button also works with fewer.
  - **Password** (`password`): two fields with show/hide. There are 5 checks (8+ characters, a number, a capital, a symbol, passwords match). Each letter typed ticks the next check: the first 4 come from the password box, the last from the confirm box.
  - **Login** (`login`): "Hi {first name}!" with any password accepted. Also has "Forgot password?" and "Not X? Use another account", which resets the demo. With no saved user, it shows an email and password form.
- **Why connect your bank** (`connectWhy`): copied from Emma's layout, with honest copy. It says "Secure, read-only access via Open Banking" with no FCA registration claim, and "FSCS-protected partner bank, variable rate" with no AER figure. A Help sheet has 3 FAQs.
- **Select banks** (`selectBanks`):
  - 16 UK banks shown as coloured initials (no real logos, for trade mark reasons).
  - Search with an empty state; pick up to 4.
  - Picking none continues with Monzo.
  - A consent sheet then "connects" each bank in turn.
- **Processing** (`processing`): an SVG ring goes from 0 to 100% over 6 seconds, adding checks as it goes (connecting, gathering, analysing, rent and bills, safe-to-spend, pots).
- **Plans, freemium** (`plans`): a review carousel ("Sample reviews"), then 3 plan cards with feature lists.
  - **Hedge Free:** £0 forever (budget, round-ups into 3 pots, 2 banks, split groups, Ask Hedge).
  - **Hedge Plus:** "Most popular". A switch on the card picks **£2 monthly** or **£20 yearly (save £4)**. Features: unlimited pots and quick save, 4 banks, category breakdown and red-flag alerts, locked money, credit builder.
  - **Hedge Family:** £8/mo, up to 5 people at £1.60 each.
  - Toggle: **Try Plus free for 14 days**. The X button continues on Free.
  - A chip on the screen says every feature is open whichever plan you pick.
  - The paid plans open `paySheet`: pick a bank, see "Waiting for X to approve", then a receipt (reference HDG-xxxxxx, next payment date) and confetti.
- **Plan done** (`planDone`, `params.mode` is free, trial or paid), then **Home loader** (`homeLoader`, green screen with a hopping mascot), then Home.

### Home (`home`)
- **Header:** avatar opens a profile sheet (plan, banks, log out, restart demo). Plan chip shows Free, Plus trial, Plus or Family. The bell opens notifications.
- **Hero carousel**, with dots below it:
  - Slide 1 is the **Safe to spend this week** card: £64.20, "On track" status with traffic lights, a meter at £38.80 of £103, and a "How is this worked out?" sheet. The formula: (£1,281 − £520 rent − £40 savings) ÷ 7 weeks = £103/week. The sheet also explains the green, amber and red rules.
  - Then 4 **sponsored event ads** from `ADS`:
    - Winter Ball 2026 at the Students' Union
    - Christmas market nights
    - Early-bird festival tickets (its "Start a pot" button opens the new-pot sheet)
    - Student night 2-for-1 pizza
  - The ads are fictional, with no real dates or organisers.
  - Timing: the hero stays 4.5 seconds, each ad about 2.8 seconds, then it loops. You can swipe it, and the dots are tappable.
- **Ask Hedge:** prompt chips only, no free typing. "Can I afford a £40 night out?", "How much can I save this week?", "When does my loan land?" (`LOAN_DATE` 2027-01-06). Answers appear in a chat-style sheet with a typing indicator.
- **Pay & request:**
  - Pay and Request buttons, a row of recent people (`PEOPLE`: Sophie, Arjun, Maya, Tom, Priya), and a "New" button.
  - IOU rows (`S.ious`): "Arjun owes you £12.50" with Remind; "You owe Sophie £8" with Pay.
  - `moneySheet` has a Pay/Request switch, person, amount chips or a typed amount, a note and the source bank. A payment shows "Waiting for bank to approve", then success. A request adds an IOU.
- **Overview:** Today / Yesterday / Last week / Last month tabs (`OV` data) showing spent vs saved, % change and category bars.
- **12-day hedging streak** card.
- **Borrow & protect:** one sideways scroll of partner offers (`OFFERS`) alternating Loan and Insurance.
  - Loans: student loan top-up ("Apply for a loan"), 0% student overdraft, university hardship fund.
  - Insurance: gadget, contents, travel, bike.
  - Each opens `offerSheet`. The loan sheet carries a "borrowing costs money" warning. A disclaimer below adds "Prices are illustrative. Not financial advice."
- **Removed on purpose** (don't add back unless asked): round-ups row, loan runway, coming-up bills and recent activity.

### Savings (`savings`)
- **Hero:** cream card showing total hedged, "+£28 this week" and an FSCS note (covered up to £120,000 at a partner bank), with the mascot.
- **Round-ups:** a **£5 / £10** switch, £5 by default. Saved data with old values is reset to 5.
- **Quick save:** a range slider from £0 to £50 in £10 steps. Letting go above £0 opens a modal: pick a pot (only pots not yet full), then "Save £X to {pot}". It adds a history entry and the slider resets.
- **Pots:** a "Ready to break" section for full pots, "Your pots", and "Start a new pot".
  - The new-pot sheet takes a name, goal amount, date and icon, and shows the live weekly pace.
  - Default pots: London trip 180/300, Emergency buffer 410/500, Reading Festival 250/250 (full), New laptop 260/900, Christmas gifts 120/120 (full), House deposit 27/28 64.60/400.
- **Pot detail** (`pot`):
  - Shows a ring, pace, a stat grid (goal date, days left, in pot, left to save) and activity.
  - Pot not full: "Add money" (chips or custom amount, source bank) or "Withdraw funds". Withdrawing opens the modal "Are you sure you want to break this pot?", then a shake-crack-coins animation, the pot is removed and a toast shows.
  - Pot full: goal banner and confetti, then "Break pot & withdraw". You choose a bank, the break animation plays, then the **celebrate** screen (stats, "Start a new goal", "Back to savings").

### Budget (`budget`)
- **Numbers come from `B()`:**
  - Money in £1,281 (`INCOME`: loan share £1,031 + part-time job £250).
  - Minus non-negotiables £620.47 (`FIXED`: rent £520, giffgaff £10, Spotify £5.99, Prime £4.49, uni gym £14.99, savings target £40, stocks and shares ISA £25).
  - Minus locked events. That gives the flexible "to spend" amount for the month.
  - Daily limit = flexible ÷ days in month. A day over the limit is a **red-flag day**.
- **Transactions:** `genTx()` makes stable, seeded demo spends for each day of the current month across the connected banks. Today's spends are fixed to match Home (Subway, Tesco, Pret, Stagecoach = £23.40). Cash entries and sorted cards are added on top.
- **Header:**
  - Tapping the **"Budget" title** (`#bTitle`) starts the **swipe-card flow**. This is the only trigger: not the tab bar, and no banner.
  - A **cash icon** opens the "Spent any cash today?" modal (shows "Day N of 7" during the first week), which leads to the cash sheet.
  - A **lock icon** opens the lock-money sheet.
- **Hero:** "You can spend" with **Day / Week / Month** buttons (Month is the default): the amount left a day, a week or this month. It has a meter of spent vs flexible.
  - Over today's limit: a red flag line ("£X spent, £Y over your £Z daily limit"). Otherwise a green "On track today" line.
  - "See full breakdown" opens `budgetDetail`.
- **Where {month} goes:** a stacked bar and a waterfall: money in, non-negotiables, locked, to spend, spent so far, left.
- **Red-flag days card:** shown when there are flagged days.
- **Locked for events** (`S.locks`): rows with a tick box to mark them done (struck through, "Spent"). Tapping a row opens details with tick/untick and "Unlock £X back to spending". "+ Lock money" opens a sheet (name, amount, date within the month, icon).
- **Also on the tab:** top 4 categories with %, a non-negotiables list (paid or due), and an "Add a cash spend" button.
- **Breakdown screen** (`budgetDetail`):
  - Today / This week / This month switch, and bank filter chips (All accounts, each bank, Cash).
  - Spent summary, then a **category donut with %** (top 6 + "Everything else"). Tapping a legend row filters the transactions.
  - **Daily spending bar chart** with a dashed limit line; red bars mark days over the limit.
  - Red-flag days list, spend by account (% split) and up to 40 transactions.
- **Swipe cards** (`flashCards()`): a full overlay of up to 3 spends the "model" wasn't sure about (`S.uncat`).
  - Each card reads, for example, "You spent £5.00 today at around 22:24. Does it go in Food & drink?"
  - Swipe right or tap ✓ for Yes; swipe left or tap ✕ for No. The arrow keys also work. Yes/No stamps fade in as you drag.
  - No opens a category picker: search across 16 categories (`CATS`) plus custom ones, and "+ Add '{name}'" creates a custom category in `S.customCats`.
  - Ends on "All sorted!". The deck refills each time it opens so the demo always works.
- **Cash sheet:** amount chips or a typed amount, what it was for, a category chip, Today/Yesterday. It goes into `S.cash` and counts in the budget straight away.

### Split (`split`, `splitGroup`)
- Works like Splitwise. `S.groups` items look like `{id, name, icon, budget, members[], expenses[], ended?}`.
  - Member ids: `me`, `p0` to `p4` (from `PEOPLE`), or custom `m…` ids stored in `S.mates`.
  - An expense is `{d, a, by, split[]}`. A settlement is `{settle: true, by, to, a}`.
- **`groupMath(g)`** works out each person's net balance and simplifies debts greedily into the fewest payments. It returns spent, debts, pending and the user's own balance.
- **Split tab:**
  - Top card: you're owed vs you owe across all groups.
  - Group cards: avatars, budget bar (red when over), your balance line, and an "Ended" tag on finished trips.
  - "Start a new group" asks for a name (placeholder "Day trip to Coventry"), budget, icon, mates from contacts, and lets you add someone new by name.
  - Default groups: **Day trip to Coventry** (£150 budget, 4 people) and **Flat 12 bills** (£300).
- **Group screen:**
  - A sticky top card showing **Spent / Left in budget (or Over budget) / Pending**, with a meter and "Edit budget".
  - Members row with an Add button.
  - **Who owes who**: "Settle up" when you owe (pay by bank or "I paid in cash", recorded as a settlement); "Remind" when someone owes you.
  - Expense list showing who paid, the split, and your share or how much you lent.
- **Add an expense:** what, how much, paid by, then split **Everyone** (the default) or **Choose people** (tick avatars). It shows a live per-person share.
- **End trip:** the modal shows total, budget and what's still to settle. Once ended:
  - a gold "Trip ended {date}" banner appears
  - adding expenses stops, but people can still settle up
  - **Reopen trip** undoes it

## 5. Brand and UI rules

- **Palette** (tokens in `:root` of styles.css):
  - Hedgerow green `#0E4D3C`, cream `#F7F3EA`, mint `#CFE8DC`, ink `#0B1F1A`.
  - Champagne gold `#D9B66B` is for rewards and highlights only.
  - Dark mode is the default; surfaces are `--surface`, `--surface-2`, `--surface-3`.
- **Status colours:** green `#2E9E6B`, amber `#E8A33D`, red `#D64545`. They are never brand colours and **always come with an icon and a label**.
- **Avoid** teal, purple, coral and lime (competitors own them). Stay warm, leaning on cream and gold.
- **Mascot:** the hedgehog poses always sit on cream `mascot-tile` backgrounds, because the dark spines get lost on ink.
- **Accessibility:**
  - Touch targets at least 44px; `:focus-visible` gold rings.
  - ARIA roles on custom controls (radio, checkbox, switch, tablist, meter, carousel).
  - Respect `prefers-reduced-motion`; fit at 375px with no sideways scroll.
- **Icons:** inline SVG via `ic()` only. No emoji.
- **Avoid in copy:** dashes in UI text and inflated claims.

## 6. Honesty and compliance rules for all copy

- Never say Hedge holds money itself. Money sits with an FSCS-protected partner bank, and payments are "pay by bank" approved in the user's own bank app.
- Never promise returns or quote an AER. Say "variable rate". Investing would mean "capital at risk".
- FSCS deposit limit: **£120,000** per person per bank (since 1 Dec 2025).
- Don't claim FCA registration. Label partner offers as illustrative, with "Not financial advice". Loans always carry a "borrowing costs money" line.
- Reviews are labelled "Sample reviews"; ads are "Sponsored" and fictional. No real bank logos.
- For current facts (rates, fees, limits, trade marks), search first and say when sources disagree.

## 7. Conventions when editing

- Keep it one file per layer (`app.js`, `styles.css`). Add new screens as `screens.name = {...}` and new sheets as functions near their feature.
- Re-render after a state change with `save(); refresh();` (or `go(...)`) rather than patching the DOM by hand, except for live previews inside sheets.
- Add new keys to `S` in `fresh()` **and** back-fill them on load so saved demos don't break.
- Test in the browser pane (preview `hedge`): clear localStorage, click through, check the console for errors, and check 375px width. Reset localStorage afterwards so the demo starts clean.
- Update `README.md` demo notes, and this file, when features change.
