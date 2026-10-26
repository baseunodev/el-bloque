---
title: Si usás Electrum, actualizá ya: una falla dejaba que un servidor trucho te hiciera firmar un pago al ladrón
description: La billetera de bitcoin lanzó la versión 4.8.3 para cerrar un agujero crítico que ya se usó para robar. El truco aprovechaba la función para acelerar pagos. Qué pasó y qué tenés que hacer.
kicker: ALERTA
date: 2026-10-26T03:20:00-03:00
author: redaccion
section: seguridad
coins: bitcoin
tags: electrum, billeteras, seguridad, bitcoin
image: https://images.unsplash.com/photo-1751448555253-f39c06e29d82?w=1600&q=75&auto=format&fit=crop
imageAlt: Un panel de seguridad y privacidad en una pantalla
imageCredit: Foto: Zulfugar Karimov / Unsplash
imageCreditUrl: https://unsplash.com/photos/a-security-and-privacy-dashboard-with-its-status--nBClEqKKVM
sources: Tech Insider | https://tech-insider.org/electrum-4-8-3-rbf-malicious-server-bitcoin-wallet-bug-2026/
---

**Electrum**, una de las billeteras de bitcoin más antiguas y usadas en computadoras, publicó el **24 de octubre** la versión **4.8.3** para tapar una falla crítica. Ya hubo al menos un caso confirmado de robo. Si la usás, el mensaje del propio equipo es directo:

> "Esta versión corrige un problema de seguridad crítico, así que pedimos a todos los usuarios que actualicen."

## Cómo funcionaba la trampa

Electrum se conecta a servidores externos para ver el estado de la red. El ataque necesitaba que la billetera estuviera conectada a un **servidor malicioso**:

1. Mandabas un pago normal.
2. Justo después, el servidor trucho te mostraba en el historial una transacción **falsa** que en realidad pagaba a una dirección del atacante. Para disimular, la dirección terminaba con los mismos cuatro caracteres que la del destinatario real.
3. Si el pago tardaba y usabas la opción **RBF** ("reemplazar con comisión más alta") sobre esa transacción para acelerarla, Electrum **firmaba la del ladrón**.

El problema: las versiones viejas no verificaban las firmas de esas transacciones pendientes antes de mostrarlas. La 4.8.3 ahora las chequea y, si son falsas, ni aparecen.

## Qué tenés que hacer

- **Actualizá** a la 4.8.3 o posterior, bajándola **solo del sitio oficial** y verificando la firma del archivo.
- **No uses RBF** en pagos pendientes hasta tener la versión nueva.
- **Revisá la dirección completa** del destinatario, no solo el principio y el final.
- Si un pago pendiente te parece raro, buscalo en un explorador de bloques independiente antes de tocar la comisión.
- Si sospechás que te cambiaron una transacción, mové el resto de tus fondos a una billetera nueva, ya actualizada.

El caso se suma a una seguidilla de golpes contra las billeteras este mes, desde [los datos filtrados de Keystone y los Ledger trucados](/seguridad/keystone-ledger-billeteras-fisicas-en-la-mira) hasta [las 1.404 billeteras vaciadas de Qubic](/seguridad/qubic-vaciaron-1404-billeteras-iphone).
