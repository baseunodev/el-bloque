---
title: "Alerta BTCPay: están vaciando billeteras de comercios que cobran en bitcoin y piden apagar los servidores"
description: El proyecto recibió reportes de billeteras calientes vaciadas por atacantes. Afectaría a versiones anteriores a la 2.4.2. Qué hacer si cobrás con BTCPay Server.
kicker: ALERTA
date: 2026-11-02T05:20:00-03:00
author: redaccion
section: seguridad
featured: true
coins: BTC
tags: btcpay server, bitcoin, comercios, hackeo, billeteras calientes, lightning
image: https://images.unsplash.com/photo-1714846201670-1c5721196c7a?w=1600&q=75&auto=format&fit=crop
imageAlt: Primer plano de una pantalla con código de un programa
imageCredit: "Foto: Lukas / Unsplash"
imageCreditUrl: https://unsplash.com/photos/a-close-up-of-a-computer-screen-with-a-program-on-it-xIk9zUKjekQ
sources: CoinDesk | https://www.coindesk.com/tech/2026/11/02/btcpay-a-bitcoin-payment-tool-tells-users-to-switch-off-their-servers-after-reports-of-drained-wallets
---

Si tu negocio cobra en bitcoin con **BTCPay Server**, esto es urgente. El proyecto, una herramienta gratuita y de código abierto que usan comercios de todo el mundo, pidió el domingo a sus usuarios que **apaguen sus servidores** tras recibir reportes de **billeteras calientes vaciadas** por atacantes.

## Qué se sabe

- Los casos reportados parecen involucrar **versiones anteriores a la 2.4.2**.
- Según el fundador, Nicolas Dorier, en los servidores afectados el atacante **entró como administrador**.
- Los servidores públicos del propio proyecto, que corren la versión 2.4.7, **no fueron atacados**, según Dorier.
- Todavía no hay cifra de pérdidas, cantidad de servidores afectados ni una solución definitiva.

En agosto se había corregido, justamente en la versión 2.4.2, una falla que permitía a un atacante quedarse con los archivos de credenciales de LND, el software de Lightning que muchos comercios conectan a BTCPay. Y hace pocos días salió [un parche de emergencia, la versión 2.4.7, por otra falla crítica](/seguridad/btcpay-server-parche-urgente-2-4-7-falla-critica).

## Qué hacer si usás BTCPay

1. **Apagá el servidor** hasta que el proyecto dé más información, como pidió el equipo.
2. **Revisá tu versión**: si es anterior a la 2.4.7, actualizá antes de volver a encenderlo.
3. **Mové los fondos** de la billetera caliente a una billetera que controles fuera del servidor, si todavía tenés acceso.
4. **Cambiá las contraseñas** de administrador y revisá si hay usuarios que no reconocés.
5. Si conectás Lightning, **rotá las credenciales** de tu nodo.

**Ojo:** no descargues "parches" ni instaladores que te lleguen por mensaje o redes sociales. Usá solo los canales oficiales del proyecto. Si tenés un nodo propio, repasá también [la falla de Linux que afecta a nodos de bitcoin y Lightning](/seguridad/falla-linux-nodos-bitcoin-lightning-cve-2026-98432-actualizar).
