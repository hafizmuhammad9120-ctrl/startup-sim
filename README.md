# StartupSim

Turn-based startup simulation. Built with Next.js + Supabase.

## Setup

1. `npm install`
2. Copy `.env.local.example` → `.env.local` and fill Supabase keys
3. Run SQL schema in Supabase SQL Editor
4. `npm run dev`

## What was built
All 6 core requirements: auth, decision panel, server-side simulation,
dashboard, office visualization, win/lose states.

## What was cut
- No competitor AI behavior (competitors field is stored but unused)
- No animations between turns
- Office capped at 30 desks

## Known issues
- Salary % below ~70 with low headcount can cause slow growth



# StartupSim

A turn-based startup simulation game built with **Next.js 15**, **Supabase**, **Tailwind CSS**, and **Recharts**.

Players make quarterly business decisions — pricing, hiring, and salaries — to grow their startup over 10 years without going bankrupt.

---

## How to Play

1. Sign up with any email and password
2. Each turn represents one quarter (Q1–Q4 per year)
3. Set your decisions:
   - **Unit Price** — higher price = more revenue per sale, but lower demand
   - **Hire Engineers** — improves product quality each quarter
   - **Hire Sales Staff** — directly multiplies units sold
   - **Salary %** — percentage of industry average ($30,000/quarter per person)
4. Click **Advance Quarter** to simulate results
5. **Win** by surviving all 10 years
6. **Lose** if cash hits $0

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes (server-side simulation) |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth |
| Charts | Recharts |

---

## Local Setup

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd startup-sim
npm install
