---
title: MetaMask ya funciona con Stellar, pero ojo: si no activás el USDC antes de recibirlo, podés perder la plata
description: La billetera sumó la red Stellar en celular y navegador. Para recibir USDC hay que activar el token y tener XLM para las reservas. Te explicamos paso a paso.
kicker: GUÍA
date: 2026-10-31T08:25:00-03:00
author: redaccion
section: guias
coins: XLM, USDC
tags: metamask, stellar, xlm, usdc, billeteras, guia, trustline
image: https://images.unsplash.com/photo-1633381573179-d3cadd62970a?w=1600&q=75&auto=format&fit=crop
imageAlt: Un celular apoyado sobre una billetera
imageCredit: Foto: Georgi Dyulgerov / Unsplash
imageCreditUrl: https://unsplash.com/photos/a-cell-phone-sitting-on-top-of-a-wallet-Hj8paHW1pZ4
sources: CryptoSlate | https://cryptoslate.com/metamask-adds-stellar-integration-but-cross-chain-bridges-require-manual-setup/
---

**MetaMask** sumó la red **Stellar** a su app para celular y a su extensión de navegador desde el **29 de octubre**. La dirección de Stellar se genera a partir de tu misma **frase de recuperación** y aparece dentro de tus cuentas multired. Pero antes de mandar USDC, hay algo que tenés que saber.

## Stellar funciona distinto

En Stellar, para recibir un token que no sea XLM (como **USDC**), tu cuenta necesita una **«trustline»**: una especie de permiso que habilita ese token. Y además hay reservas mínimas en **XLM**:

- **1 XLM** para tener una cuenta común.
- **0,5 XLM** más por cada trustline.
- Más XLM libre para pagar las comisiones.

## Paso a paso para recibir USDC

1. Hacé un primer depósito de **al menos 1 XLM** en tu cuenta Stellar nueva.
2. Entrá a **Administrar tokens** (Manage Tokens).
3. Buscá USDC, que aparece como **inactivo**, y elegí **Activar**.
4. Confirmá la transacción.

Agregar el token a la lista **no alcanza**: tiene que quedar activado.

**Ojo:** si mandás USDC por un puente desde otra red a una cuenta Stellar **sin la trustline activada**, podés **perder los fondos**. Un envío directo dentro de Stellar a alguien sin trustline, en cambio, simplemente falla. Ya explicamos [qué es un puente cripto y por qué son un punto débil](/guias/que-es-un-puente-cripto-bridge-hackeos) y [qué es una stablecoin](/guias/que-es-una-stablecoin).
