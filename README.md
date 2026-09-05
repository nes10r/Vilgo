# Vilgo

Wolt tərzi yemək çatdırılması platforması. Bu monorepo müştəri, kuryer və restoran
tərəflərini ayrı Expo tətbiqləri olaraq saxlayacaq; hazırda yalnız **müştəri tərəfi**
üzərində iş gedir.

## Struktur

```
apps/
  customer/   ← Expo (React Native) müştəri tətbiqi — bax apps/customer/README.md
packages/     ← gələcəkdə paylaşılan kod (types, ui) üçün
supabase/
  migrations/ ← Supabase Postgres migrasiyaları
```

## Texnologiya seçimləri

- **Expo (React Native) + TypeScript**, `expo-router` ilə fayl əsaslı naviqasiya
- **Supabase** (Postgres + PostGIS + Auth + Realtime + Storage) — backend
- **TanStack Query** (server state) + **Zustand** (cart/UI state)
- **NativeWind** (Tailwind for React Native) — dizayn sistemi

## Müştəri tətbiqi üçün yol xəritəsi

- ✅ **Phase A — Foundation**: layihə skeleti, qeydiyyat/giriş, ünvan seçimi, tab
  naviqasiyası (hazırda tamamlanıb)
- **Phase B — Discovery**: əsas səhifə, restoran siyahısı, kateqoriyalar, axtarış/filtr
- **Phase C — Restoran & Menyu**: restoran detalları, menyu, məhsul seçimləri (modifiers)
- **Phase D — Səbət & Sifariş**: səbət, çatdırılma ünvanı, ödəniş üsulu, sifarişin təsdiqi
- **Phase E — Sifariş izləmə & Tarixçə**: canlı status/xəritə izləmə, keçmiş sifarişlər, rəy
- **Phase F — Profil & Əlavələr**: hesab, sevimlilər, bildirişlər, dəstək

## Başlanğıc

Bax [`apps/customer/README.md`](apps/customer/README.md) quraşdırma addımları üçün.

```bash
pnpm install
cp apps/customer/.env.example apps/customer/.env   # Supabase açarlarını doldur
pnpm customer start
```
