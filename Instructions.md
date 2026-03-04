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
