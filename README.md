# El Bloque

Diario cripto de América Latina. Next.js 15 (App Router) + Tailwind 4, desplegado en Vercel.
Los precios y datos en vivo viven en un sitio aparte, el [Mirador Cripto](https://github.com/baseunodev/mirador-cripto), que el diario enlaza.

## Publicar una nota

Crear `content/notas/<slug>.md`:

```md
---
title: Titular de la nota
description: Bajada de una o dos oraciones.
kicker: ÚLTIMO MOMENTO        # volanta (opcional)
date: 2026-10-21T10:00:00-03:00
author: redaccion
section: mercado              # mercado | regulacion | latam | seguridad | guias
featured: true                # candidata a nota principal de portada (opcional)
coins: bitcoin, ethereum      # ids de CoinGecko: muestran precios y enlazan al mirador
tags: bitcoin, etf
---

Cuerpo en Markdown. {{mirador}} se reemplaza por la URL del Mirador Cripto.
```

Hacer push a `main` y Vercel publica.

## Variables de entorno

| Variable | Para qué |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio final (ej. `https://elbloque.news`). Si falta, usa el de Vercel. |
| `NEXT_PUBLIC_MIRADOR_URL` | URL del Mirador Cripto. Por defecto `https://mirador-cripto.vercel.app`. |
| `COINGECKO_API_KEY` | Clave Demo de CoinGecko (opcional). |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Guardar suscriptores del newsletter (tabla `suscriptores`). |
| `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_GA_ID` | AdSense y Google Analytics. |

Tabla de Supabase:

```sql
create table suscriptores (
  email text primary key,
  source text,
  created_at timestamptz default now()
);
alter table suscriptores enable row level security;
```

## Desarrollo

`MOCK_DATA=1 npm run dev` usa precios falsos sin internet.
