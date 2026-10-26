---
title: Pidió prestados casi US$ 2 millones, tomó el control del proyecto y se llevó US$ 4,7 millones en una sola operación
description: Un atacante usó un préstamo flash para comprar votos en la gobernanza de X100 y aprobar la venta de su propia tesorería. El token cayó más de 96%. Cómo funcionó y qué revisar antes de dejar plata en un protocolo.
kicker: ALERTA
date: 2026-10-26T15:20:00-03:00
author: redaccion
section: seguridad
coins: tether, ethereum
tags: hackeo, defi, gobernanza, préstamo flash, ethereum
image: https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=75&auto=format&fit=crop
imageAlt: Una pantalla llena de caracteres verdes al estilo Matrix
imageCredit: Foto: Markus Spiske / Unsplash
imageCreditUrl: https://unsplash.com/photos/matrix-movie-still-iar-afB0QQw
sources: CryptoTicker | https://cryptoticker.io/en/x100-flashloan-governance-attack/
---

No hizo falta encontrar un error en el código. Al atacante de **X100 Global**, un proyecto en Ethereum, le alcanzó con leer bien las reglas. Con plata prestada por unos segundos se quedó con el control de la tesorería, la vendió y se fue con unos **US$ 4,75 millones**, según la firma de seguridad **BlockSec**. Otra firma, **Blockaid**, calcula unos US$ 4,85 millones.

El ataque fue el **sábado 24 de octubre** y el token **X** se desplomó más de **96%**: de unos US$ 50-60 a cerca de **US$ 1,75**.

## Cómo lo hizo, paso a paso

La tesorería de X100, llamada "Freezer", la controlaba un **"senado" de tres miembros**. Las bancas eran para los tres que más tokens X tuvieran depositados. Ese fue el agujero.

1. Pidió un **préstamo flash** de unos **1,94 millones de USDT**. Es un préstamo sin garantía que hay que devolver dentro de la misma operación.
2. Con esa plata **compró tokens X** y los repartió en dos contratos propios.
3. Así se quedó con **dos de las tres bancas** del senado.
4. En la misma operación, aprobó una propuesta para vender **400.000 X** de la tesorería en un pool que él mismo había armado, casi sin dólares adentro. La tesorería recibió unos **35 USDT** a cambio.
5. Retiró la liquidez, vendió parte de los tokens en otros lados y **devolvió el préstamo**.

Todo pasó en un abrir y cerrar de ojos. Hasta el momento del informe, el equipo de X100 no había confirmado el incidente en sus canales oficiales.

## Qué faltaba

No fue un error de programación sino de **diseño**. El sistema no tenía tres protecciones básicas:

- **Foto de votos:** contar quién tenía tokens *antes* de la votación, para que no se puedan comprar votos en el momento.
- **Tiempo mínimo de tenencia:** exigir que los tokens estén depositados un tiempo antes de dar poder.
- **Demora para ejecutar:** dejar horas o días entre que se aprueba una decisión y que se ejecuta, para que alguien pueda reaccionar.

## Qué revisar antes de dejar plata en un protocolo

- Si las decisiones se ejecutan **al instante**, es una señal de alarma.
- Si no entendés quién controla la tesorería y cómo, asumí que tu plata se puede mover sin aviso.
- Lo que pienses guardar a largo plazo, mejor en tu propia billetera.

Este es otro golpe en un mes complicado: hace días [Initia tuvo que frenar su red por un hackeo](/seguridad/initia-frena-su-red-hackeo-emision-infinita), y el balance del mes ya es un [octubre negro para DeFi](/seguridad/octubre-negro-defi-718-millones-robados).
