---
title: "Todo empezó con una falsa entrevista de trabajo: Binance revela cómo los hackers estuvieron meses adentro antes del robo de US$ 6.300 millones"
description: "El exchange publicó su informe del ataque. Los hackers engañaron a empleados con un paquete trucado y un falso proceso de selección, y usaron una herramienta interna de IA para llegar a las billeteras."
kicker: SEGURIDAD
date: 2026-11-03T13:20:00-03:00
author: redaccion
section: seguridad
coins: BNB, ETH
tags: binance, hackeo, corea del norte, ingenieria social, entrevista falsa, malware, eip-7702
image: https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?w=1600&q=75&auto=format&fit=crop
imageAlt: Una máscara de Guy Fawkes sobre fondo negro
imageCredit: "Foto: Tarik Haiga / Unsplash"
imageCreditUrl: https://unsplash.com/photos/guy-fawkes-mask-on-black-background-BxELNNMN88Y
sources: CoinDesk | https://www.coindesk.com/business/2026/11/03/binance-s-usd6-3-billion-hack-began-with-a-fake-job-interview-exchange-says ; The Block | https://www.theblock.co/news/business/2026-11-03-binance-hack-incident-report-north-korea-fake-job-interview-ai-tool-432406
---

**Binance** contó cómo fue por dentro el robo récord que sufrió. Según su informe, no fue un descuido de un día: los atacantes **trabajaron durante meses** para meterse en el exchange.

> «This wasn't one mistake or one breach — it was a months-long campaign» («No fue un solo error ni una sola brecha: fue una campaña de meses»), dijo el CEO, **Richard Teng**.

## Paso a paso

- **Junio:** un ingeniero del equipo de billeteras instaló un paquete trucado de **Homebrew** (un instalador de programas para Mac) mientras buscaba una herramienta de programación con IA. Binance lo detectó, le cambió la computadora y las credenciales, pero el equipo siguió expuesto.
- **Septiembre:** otro ingeniero recibió una oferta a través de una plataforma de empleo legítima. Tuvo entrevistas por video con un falso responsable de recursos humanos y un supuesto CEO, que le pidieron descargar una **prueba técnica** en su computadora de trabajo. El archivo tenía un **malware desconocido** que esquivó los antivirus.
- **20 de octubre:** desde esa computadora, y usando una **herramienta interna de IA** de Binance, los atacantes llegaron a las computadoras de otros dos ingenieros de billeteras.
- **29 de octubre:** con credenciales robadas, ejecutaron un programa malicioso. Usando una función de Ethereum llamada **EIP-7702**, tomaron control de una billetera caliente. Los fondos empezaron a salir a las 20:05 UTC y el ataque se contuvo recién a las 00:10 UTC del día siguiente.

Ya habíamos explicado [el papel de EIP-7702 en el ataque](/seguridad/eip-7702-ethereum-papel-hackeo-binance-expertos).

## Cómo está la situación

- Binance dice que **congeló o interceptó unos US$ 2.850 millones**.
- Asegura que ya **repuso el 98%** de los activos afectados con fondos propios.
- Afirma haber frenado **57 ataques** atribuidos a Corea del Norte en lo que va de 2026.

## Qué cambia

El exchange cerró los puntos de entrada, reconstruyó los sistemas afectados, endureció los controles sobre los dispositivos, amplió la detección de comportamientos anómalos con IA y encargó una **revisión independiente** de ciberseguridad.

**Ojo:** las falsas ofertas de trabajo son una trampa que también apunta a usuarios comunes. Si una "empresa" te pide descargar un archivo o un programa para una prueba técnica, desconfiá: ese archivo puede vaciar tus billeteras.
