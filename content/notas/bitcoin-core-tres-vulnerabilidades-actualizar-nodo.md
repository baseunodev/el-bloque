---
title: Encuentran tres fallas en Bitcoin Core con ayuda de IA: si tenés un nodo, toca actualizar
description: Las nuevas versiones 29.5, 30.4, 31.2 y 32.1 corrigen dos errores de agotamiento de memoria y uno que podía apagar nodos. Fueron detectados con escaneo automático por IA.
kicker: ALERTA
date: 2026-10-28T17:20:00-03:00
author: redaccion
section: seguridad
coins: bitcoin
tags: bitcoin core, vulnerabilidades, nodos, seguridad, ia, actualizacion
image: https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=75&auto=format&fit=crop
imageAlt: Líneas de código de programación en una pantalla
imageCredit: Foto: Shahadat Rahman / Unsplash
imageCreditUrl: https://unsplash.com/photos/shallow-focus-photography-of-computer-codes-BfrQnKBulYQ
sources: CriptoNoticias | https://www.criptonoticias.com/seguridad-bitcoin/descubren-3-vulnerabilidades-bitcoin-core/ ; Bitcoin Core | https://bitcoincore.org/en/2026/10/28/disclose-undo-overflow/
---

Los desarrolladores de **Bitcoin Core**, el software que usa la mayoría de los nodos de la red, publicaron tres fallas de seguridad ya corregidas. Si corrés un nodo, la recomendación es simple: **actualizá** a las versiones **29.5, 30.4, 31.2 o 32.1**, publicadas el 27 y 28 de octubre.

## Las tres fallas

1. **Cola sin límite (gravedad media).** Un nodo vecino que finge no soportar cierta función del protocolo podía hacer crecer sin control una cola de datos salientes, hasta **5 MB por hora**, y agotar la memoria.
2. **Datos "urgentes" de red (gravedad media).** Afecta solo a **Windows, macOS y BSD**: un truco con un tipo especial de paquete de red permitía saltarse el límite de procesamiento. **Linux no está afectado**.
3. **Desborde en los datos de deshacer (gravedad baja).** Esos datos se guardaban en enteros de 32 bits sin tope. Un minero podría crear bloques de más de **4 GiB** de esos datos y, ante una reorganización de la cadena, el nodo se apagaría solo.

## La IA como cazadora de errores

Lo llamativo es cómo se encontraron: con **escaneo automático usando modelos de lenguaje**, a cargo de **Project Loupe**, de la empresa Spiral. También se acreditó a investigadores del equipo Bitcoin Red Team.

Es la otra cara de la IA en seguridad: la misma tecnología que usan los atacantes sirve para encontrar fallas antes que ellos. Ya pasa en otras redes, como Solana, donde [reportar errores encontrados con IA ahora cuesta 1 SOL](/seguridad/solana-firedancer-reportes-errores-cuestan-1-sol-ia) para frenar el spam de reportes.

## ¿Corre peligro mi bitcoin?

No. Son fallas que podían afectar el funcionamiento de los nodos, no permiten robar fondos. Si usás una billetera en el celular o un exchange, no tenés que hacer nada.
