---
title: Un error de una empresa de certificados en India llegó hasta Ethereum: actualizan Teku y Besu para que no te desvíen recompensas
description: Las claves de ocho autoridades intermedias de la firma india eMudhra se generaron con poca aleatoriedad. Algunas configuraciones de validadores podían confiar en certificados falsos. Qué nodos están en riesgo y qué versión instalar.
kicker: ALERTA
date: 2026-10-29T03:10:00-03:00
author: redaccion
section: seguridad
coins: ethereum
tags: ethereum, validadores, teku, besu, certificados, ciberseguridad
image: https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=1600&q=75&auto=format&fit=crop
imageAlt: Un celular con un ícono de candado sobre un escritorio de madera
imageCredit: Foto: Dan Nelson / Unsplash
imageCreditUrl: https://unsplash.com/photos/smartphone-with-security-lock-icon-ah-HeguOe9k
sources: CoinDesk | https://www.coindesk.com/tech/2026/10/29/ethereum-clients-patch-flaw-that-could-let-attackers-redirect-eth-rewards
---

Una falla que nació lejos del mundo cripto terminó obligando a los desarrolladores de **Ethereum** a sacar parches de apuro. El origen: **eMudhra**, una empresa de **India** que emite certificados digitales, los que usan las computadoras para confiar unas en otras.

## Qué pasó

- El **17 de octubre**, investigadores descubrieron que las claves privadas de **ocho autoridades certificadoras intermedias** de eMudhra se habían generado **con muy poca aleatoriedad**. En criollo: eran adivinables.
- Los navegadores bloquearon esos certificados y eMudhra los **revocó un día después**. La empresa dice que va a **dejar el negocio** de los certificados.
- El problema: algunas configuraciones de **Teku** y **Besu**, dos programas que usan los validadores de Ethereum, seguían confiando en ellos. Eso abría la puerta a que un atacante se hiciera pasar por un servicio legítimo y **desviara recompensas** en ether.

## Quién tiene que actualizar

- **Teku** lanzó la versión **26.10.3** y **Besu** la **26.10.2**. Ambas dejan de confiar en certificados ligados a eMudhra.
- Según el equipo de Teku, **un nodo Teku por defecto en la red principal no está afectado** y no necesita hacer nada. Tampoco se reportaron ataques.
- La configuración más riesgosa es la que usa un **firmante externo**: si es tu caso, actualizá ya.
- Teku además avisó que **Java 26** dejó de tener soporte y recomienda pasar a **Java 25**.

No es la primera alarma técnica del mes en Ethereum: hace poco se corrigió [otra falla que podía afectar depósitos de staking](/seguridad/ethereum-corrige-falla-glamsterdam-depositos-staking).
