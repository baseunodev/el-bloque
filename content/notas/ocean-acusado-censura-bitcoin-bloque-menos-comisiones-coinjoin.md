---
title: Acusan a un minero del pool Ocean de dejar afuera una transacción de privacidad en un bloque de bitcoin
description: Un desarrollador dice que el bloque 973.817 cobró 7,68% menos comisiones de lo esperado por excluir una transacción. El debate reabre la pregunta de quién decide qué entra en la red.
kicker: MINERÍA
date: 2026-10-30T17:30:00-03:00
author: redaccion
section: mercado
coins: BTC
tags: bitcoin, mineria, ocean, datum, coinjoin, censura, privacidad
image: https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=75&auto=format&fit=crop
imageAlt: Una laptop con líneas de código en la pantalla sobre un escritorio
imageCredit: Foto: Christopher Gower / Unsplash
imageCreditUrl: https://unsplash.com/photos/a-macbook-with-lines-of-code-on-its-screen-on-a-busy-desk-m_HRfLhgABo
sources: DiarioBitcoin | https://www.diariobitcoin.com/mineria/ocean-enfrenta-una-acusacion-de-censura-tras-un-bloque-con-768-menos-comisiones/
---

¿Puede un minero de bitcoin elegir qué transacciones deja afuera, aunque pierda plata? Esa es la discusión que se abrió en la comunidad después de que el desarrollador **Kruw** acusara a un minero identificado como **«Powre»**, vinculado al pool **Ocean**, de **excluir una transacción del bloque 973.817**.

Según Kruw, ese bloque cobró **7,68% menos comisiones** de lo que habría cobrado con una plantilla esperada. Ese número sale de su propia comparación, no de una medición independiente.

## Los números en disputa

- La plantilla que esperaba Kruw tenía **3.580 transacciones**; el bloque real tuvo **1.698**.
- El peso del bloque fue de unos **2,93 millones de unidades**, contra casi **4 millones** posibles.
- La transacción excluida era una **consolidación** que pagaba **223 satoshis** de comisión (0,15 sat/vB), y según Kruw ya circulaba **cuatro minutos antes** de que se encontrara el bloque.

El tema de fondo es **CoinJoin**, una técnica que mezcla pagos de varias personas para darles más **privacidad**.

## La respuesta de Ocean

Desde el lado de Ocean, **Coinjoined Chris** explicó que el pool usa **DATUM**, un sistema que permite a cada minero **armar su propia plantilla de bloque** y elegir qué transacciones incluye. Dijo que apoya CoinJoin y la privacidad, pero reconoció que dejar comisiones sin cobrar es **«económicamente cuestionable»**.

Kruw propuso que Ocean **rechace el trabajo de bloques que cobren muy pocas comisiones**. Chris respondió con preguntas: si el umbral debería ser el 99% o el 95% del máximo posible, y recordó que cada nodo ve las transacciones en momentos distintos. No hubo acuerdo y **Ocean no anunció cambios** en sus reglas.

## Por qué importa

El caso toca un punto sensible: bitcoin se presenta como una red donde nadie puede bloquear un pago. Si los mineros eligen excluir ciertas transacciones, aunque sea a costa de ganar menos, ese ideal se pone a prueba. Pasa además en un momento duro para el sector, con [la dificultad de minería en récord y los ingresos de los mineros en mínimos](/mercado/bitcoin-dificultad-record-148-billones-mineros-ingresos-minimo).
