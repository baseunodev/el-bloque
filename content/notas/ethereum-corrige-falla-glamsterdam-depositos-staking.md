---
title: Ethereum tapó una falla en su gran actualización que podía desviar depósitos de staking
description: Un investigador detectó que, con Glamsterdam, el ether de un validador nuevo podía terminar en manos de un «constructor» de bloques. El arreglo ya se aprobó, pero la prueba en Hoodi sigue sin fecha.
kicker: CIBERSEGURIDAD
date: 2026-10-27T05:15:00-03:00
author: redaccion
section: seguridad
coins: ethereum
tags: ethereum, glamsterdam, staking, lido, seguridad
image: https://images.unsplash.com/photo-1680992044138-ce4864c2b962?w=1600&q=75&auto=format&fit=crop
imageAlt: Primer plano de un servidor en una sala de servidores
imageCredit: Foto: Tyler / Unsplash
imageCreditUrl: https://unsplash.com/photos/a-close-up-of-a-server-in-a-server-room-vSprjjDbu60
sources: CoinDesk | https://www.coindesk.com/tech/2026/10/27/ethereum-fixes-glamsterdam-bug-that-could-have-sent-staking-deposits-to-builders
---

**Ethereum** sumó otro capítulo a la saga de **Glamsterdam**, su próxima gran actualización. Los desarrolladores aprobaron este lunes el arreglo de una falla que podía hacer que el **ether depositado para crear un validador nuevo** terminara acreditado a otra cuenta.

## Cuál era el problema

Glamsterdam separa dos roles: los **validadores**, que confirman bloques, y los **constructores** (builders), que los arman. La falla aparecía cuando un depósito de constructor y uno de validador compartían la misma clave pública:

- Un operador se registraba como constructor con una clave.
- Después, un servicio de staking depositaba ether para activar un validador con esa misma clave.
- Con las reglas en borrador, **los dos depósitos iban al constructor**. No se creaba el validador y el servicio no podía generar la prueba para recuperar su plata.

No se reportaron pérdidas, y el propio investigador aclaró que se trata de riesgos "condicionales", no de ataques confirmados.

## Quién la encontró

Un investigador que figura como miembro de la organización de **Lido** en GitHub. También analizó el posible impacto en Lido, Origin y Rocket Pool, y contó que hizo el trabajo con ayuda de IA.

## Cómo se arregló

El primer arreglo se cerró el 19 de octubre por falta de apoyo de los equipos que programan los clientes. Se reabrió, se le sumaron pruebas el 23 y **se aprobó el 26**. Ahora los depósitos pendientes se ordenan por credenciales de retiro, así que el depósito de un validador queda con el validador aunque un constructor use la misma clave.

## Qué falta

Los equipos de cada cliente todavía tienen que incorporar el cambio. Glamsterdam ya corrió en la red de prueba Sepolia, pero su lanzamiento en **Hoodi** se postergó, como contamos en [esta nota](/mercado/ethereum-frena-glamsterdam-hoodi-riesgo-contratos), y sin una nueva fecha ahí no puede programarse la red principal.
