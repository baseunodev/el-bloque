---
title: Ethereum pisa el freno: suspenden a último momento su gran actualización por un riesgo en contratos que ya están funcionando
description: Glamsterdam, el cambio más importante de la red en el año, debía activarse hoy en la red de pruebas Hoodi. Los desarrolladores lo postergaron sin fecha tras detectar 13 casos reales que podrían fallar. Qué significa para el que tiene ether.
kicker: ÚLTIMO MOMENTO
date: 2026-10-26T01:15:00-03:00
author: redaccion
section: mercado
coins: ethereum
tags: ethereum, glamsterdam, actualización, seguridad
image: https://images.unsplash.com/photo-1639327380086-f13b8fef4211?w=1600&q=75&auto=format&fit=crop
imageAlt: Una moneda de ether iluminada por un foco
imageCredit: Foto: Shubham Dhage / Unsplash
imageCreditUrl: https://unsplash.com/photos/RNDX5XmZjWo
sources: Ethereum Foundation | https://blog.ethereum.org/2026/10/22/glamsterdam-hoodi-delay ; crypto.news | https://crypto.news/ethereum-glamsterdam-hoodi-upgrade-postponed/ ; DiarioBitcoin | https://www.diariobitcoin.com/blockchain/ethereum-probara-glamsterdam-en-hoodi-el-26-de-octubre/
---

Hoy, **26 de octubre a las 14:42 de Argentina**, Ethereum tenía que dar un paso clave: activar **Glamsterdam**, su gran actualización del año, en la red de pruebas **Hoodi**. No va a pasar. Los desarrolladores la suspendieron y, por ahora, **no hay fecha nueva**.

## Qué encontraron

El problema está en una de las piezas del paquete, la propuesta **EIP-8037**, que cambia cómo se cobra el gas cuando se crean datos nuevos en la red. La firma de auditoría **ChainSecurity** advirtió el 13 de octubre que ese cambio puede alterar el comportamiento de contratos que **ya están funcionando** en la red principal.

¿Cómo? Muchas aplicaciones miran cuánto gas sobró después de una llamada fallida para decidir si el error es definitivo o si se puede reintentar. Con las reglas nuevas, una operación fallida podría dejar gas suficiente para que el contrato siga adelante, registre el fallo y **no permita reintentarlo**. Eso afecta retiros, operaciones en lote y otras funciones sensibles.

ChainSecurity identificó **13 casos reales** y está trabajando en privado con esos proyectos para que se corrijan antes de que el problema se haga público.

> "Atención: la actualización de Hoodi del lunes quedó cancelada", avisó la investigadora Christine Kim a los operadores de nodos.

## Qué se posterga

- La activación de Glamsterdam en Hoodi, que estaba prevista para la época 132.352.
- La suba del **límite de gas a 200 millones**, que iba a darle mucha más capacidad a la red.
- Las fechas tentativas para la red principal, que se discutían para el **1, 8 o 9 de diciembre**, quedan en el aire.

La prueba en la otra red de testeo, Sepolia, ya se había hecho el 6 de octubre y no se revierte.

## ¿Tengo que hacer algo?

Si solo tenés ether, **no**. La Fundación Ethereum aclaró que los usuarios y tenedores no tienen que hacer nada. Los que sí deben actualizar sus programas son los operadores de nodos y validadores en Hoodi.

La noticia llega en un momento delicado para la red, que [casi no quema monedas y ve crecer su oferta](/mercado/ethereum-casi-no-quema-oferta-crece). Frenar a tiempo, igual, es la mejor señal: la mayoría de los grandes robos de este mes vinieron de fallas que nadie vio venir, como repasamos en [octubre negro para DeFi](/seguridad/octubre-negro-defi-718-millones-robados).

Seguí el precio de ether en el [Mirador Cripto]({{mirador}}/precio/ethereum).
