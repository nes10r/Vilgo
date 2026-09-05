# Vilgo — Customer App

Expo (React Native + TypeScript) customer-facing app for Vilgo, a food-delivery
platform. This is **Phase A: Foundation** — auth, address onboarding, and the tab
navigation shell. See [`/README.md`](../../README.md) at the repo root for the full
roadmap.

## Stack

- Expo + `expo-router` (file-based routing, typed routes)
- Supabase (Postgres + PostGIS + Auth + Realtime + Storage)
- TanStack Query (server state) + Zustand (client/UI state)
- NativeWind (Tailwind for React Native)

## Setup

1. Install dependencies from the repo root (pnpm workspace):

   ```bash
   pnpm install
   ```

2. Create a [Supabase](https://supabase.com) project, enable the **PostGIS**
   extension, and run the migration in `/supabase/migrations/0001_init.sql`
   against it (via the SQL editor or the Supabase CLI).

3. Copy the env file and fill in your project's credentials:

   ```bash
   cp .env.example .env
   ```

   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Start the app:

   ```bash
   pnpm start
   ```

   Then open it in a development build, Android emulator, iOS simulator, or Expo Go.

## What's here (Phase A)

- `(auth)/` — welcome, login, signup, forgot-password screens wired to Supabase Auth
  (email/password).
- `(onboarding)/` — location permission, reverse-geocoded address confirmation, and a
  manual-entry fallback; writes the user's first address to Supabase.
- `(tabs)/` — Home, Search, Orders, Profile tab shell (placeholder content — filled in
  by later phases).
- Root `_layout.tsx` wires up React Query, the Supabase auth context, and redirects
  between the three groups above based on auth/address state.

## Scripts

- `pnpm lint` — ESLint
- `pnpm start` / `pnpm android` / `pnpm ios` / `pnpm web` — run the app

## Next phases

Discovery (restaurant listing/search) → Restaurant & Menu → Cart & Checkout → Order
Tracking & History → Profile & Extras. See the root README for details.
