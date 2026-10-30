---
title: ¿Ethereum tiene parte de la culpa? La función EIP-7702 queda en el centro del hackeo a Binance
description: Expertos explican que el atacante usó EIP-7702 para vaciar la billetera de un solo golpe. Pero aclaran que el problema de fondo fue una firma que nunca debió darse.
kicker: SEGURIDAD
date: 2026-10-30T09:20:00-03:00
author: redaccion
section: seguridad
coins: ETH, BNB
tags: ethereum, eip-7702, pectra, binance, hackeo, seguridad
image: https://images.unsplash.com/photo-1757484965213-8393e82789fe?w=1600&q=75&auto=format&fit=crop
imageAlt: Líneas azules y amarillas brillantes sobre un fondo oscuro
imageCredit: Foto: Zoha Gohar / Unsplash
imageCreditUrl: https://unsplash.com/photos/WWlDskG5mY8
sources: Cointelegraph | https://cointelegraph.com/news/binance-hack-security-ethereum-eip-7702-role
---

En el [hackeo de US$ 6.300 millones a Binance](/seguridad/binance-encuentra-mas-puntos-de-ingreso-retiros-45-horas) aparece una y otra vez una sigla: **EIP-7702**. Es una función que llegó a Ethereum con la actualización **Pectra**, en mayo de 2025, y permite que una billetera común delegue su control en un contrato inteligente.

## Qué papel jugó

El atacante usó esa función para convertir una billetera caliente de Binance en una especie de aspiradora que vació los fondos de una sola vez. Pero, según los expertos, **no fue la causa de fondo**.

- «La actualización 7702 es una forma de hacerlo de un solo barrido y quizás de saltear algunos controles», explicó **Ido Ben-Natan**, CEO de Blockaid. Para él, los atacantes **podrían haberse llevado los fondos igual** sin EIP-7702.
- El problema real, dijo, es que quien firmaba **«firmó una transacción que no debía»**. Los investigadores apuntan a un compromiso de los sistemas de firma de Binance.
- **Ivo Georgiev**, CEO de Ambire, fue más crítico: «Es un problema de EIP-7702, que se entiende muy, muy mal».

Binance, por su parte, ya dijo que encontró **puntos adicionales de vulneración**, más allá de la laptop de un ingeniero que había señalado al principio.

## Por qué te importa

Si usás una billetera de Ethereum, EIP-7702 también te afecta: un solo permiso mal dado puede entregarle el control de tu cuenta a un contrato malicioso.

**Ojo:** nunca firmes una "delegación" o "actualización de cuenta" que no entiendas, aunque venga de una app conocida. Revisá siempre qué estás autorizando.
