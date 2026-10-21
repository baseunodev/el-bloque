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
image: https://images.unsplash.com/photo-...?w=1600&q=75&auto=format&fit=crop   # foto libre (Unsplash)
imageAlt: Qué se ve en la foto
imageCredit: Foto: Nombre / Unsplash
imageCreditUrl: https://unsplash.com/photos/...
---

Cuerpo en Markdown. {{mirador}} se reemplaza por la URL del Mirador Cripto. Cerrar con la fuente original: `*Fuente original: [Medio](url).*`

Reglas: texto propio (nunca copiar la fuente), firma de la Redacción (`author: redaccion`), foto distinta en cada nota y sin fotos de prensa con copyright.
```

Hacer push a `main` y Vercel publica.

## Variables de entorno

| Variable | Para qué |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio final (ej. `https://elbloque.news`). Si falta, usa el de Vercel. |
| `NEXT_PUBLIC_MIRADOR_URL` | URL del Mirador Cripto. Por defecto `https://mirador-cripto.vercel.app`. |
| `COINGECKO_API_KEY` | Clave Demo de CoinGecko (opcional). |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | Opcionales: por defecto usa el proyecto `el-bloque` de Supabase. |
| `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_GA_ID` | AdSense (`ca-pub-…`) y Google Analytics. |
| `NEXT_PUBLIC_ADSENSE_SLOTS` | IDs de bloque de AdSense: `portada-top=123,nota-medio=456,default=789`. |

## AdSense

Espacios reservados: `portada-lateral`, `portada-top`, `portada-medio`, `portada-pie`, `seccion-<slug>`, `nota-medio` (tras el 2.º párrafo), `nota-final` y `nota-pie`.
Mientras no haya ID se ve un recuadro "Publicidad" vacío. Al aprobar AdSense: cargar `NEXT_PUBLIC_ADSENSE_CLIENT` y `NEXT_PUBLIC_ADSENSE_SLOTS` en Vercel y volver a desplegar (el `ads.txt` se arma solo).

## Newsletter

- Suscriptores en Supabase (proyecto `el-bloque`), tabla `suscriptores`. El sitio solo llama a las funciones `suscribir` y `darse_de_baja`.
- La función `supabase/functions/enviar-newsletter` arma el correo con las notas del feed y los precios, y lo manda con Resend.
- `pg_cron` la llama todos los días a las 10:00 UTC (7:00 en Argentina). No manda dos veces el mismo día (tabla `envios`).
- Secretos de la función: `RESEND_API_KEY`, `FROM_EMAIL` (ej. `El Bloque <hola@tudominio.com>`), `SITE_URL`, `MIRADOR_URL`.
- Vista previa: `GET /functions/v1/enviar-newsletter?preview=1` con la clave anon.

## Desarrollo

`MOCK_DATA=1 npm run dev` usa precios falsos sin internet.
