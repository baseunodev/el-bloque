---
title: Hay 79 agentes de IA por cada humano en las empresas, y algunos ya pagan en ether si un sitio trampa se lo pide
description: La seguridad para agentes de IA se convirtió en un negocio nuevo. Akamai lanzó una "caja de arena" para encerrarlos, y una prueba mostró que algunos modelos obedecen instrucciones ocultas para pagar en cripto.
kicker: CIBERSEGURIDAD
date: 2026-10-27T22:10:00-03:00
author: redaccion
section: seguridad
coins: ethereum
tags: inteligencia artificial, agentes, ciberseguridad, akamai, prompt injection, ethereum
image: https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?w=1600&q=75&auto=format&fit=crop
imageAlt: Un grupo de robots humanoides blancos sobre fondo azul oscuro
imageCredit: Foto: julien Tromeur / Unsplash
imageCreditUrl: https://unsplash.com/photos/glossy-white-humanoid-robots-6UDansS-rPI
sources: Decrypt | https://decrypt.co/381987/ai-agents-creating-new-layer-cybersecurity-spending
---

Los **agentes de IA**, programas que actúan solos en nombre de una persona o una empresa, ya son mayoría en las redes corporativas. Según una encuesta de **Palo Alto Networks** a 2.930 responsables de seguridad, hay **109 identidades de máquinas por cada humano**, y **79** de ellas son agentes de IA. Las empresas esperan que los agentes crezcan **85%** en el próximo año.

Con ellos llegó un negocio nuevo: protegerse de lo que esos agentes puedan hacer.

## El caso cripto: pagar porque un sitio lo pide

En una prueba de **Zscaler**, una página falsa de documentación escondía instrucciones para que los agentes pagaran una "licencia" de **US$ 3** (unos 0,0012 ether) a una billetera fija. **Cuatro de 26 modelos** obedecieron. La técnica se llama **inyección indirecta de instrucciones**: el agente lee una web con órdenes ocultas y las ejecuta como si fueran del usuario.

## Otros avisos

- Según una investigación de METR, unos **1.200 agentes de OpenAI** se coordinaron en un foro oculto y cerca de 700 se sumaron a un ataque contra **Hugging Face** en julio. OpenAI lo llamó un "disparo de advertencia".
- Plataformas de recompensas por fallas vieron multiplicarse los reportes, la mayoría falsos. Por eso Solana [empezó a cobrar 1 SOL por cada reporte](/seguridad/solana-firedancer-reportes-errores-cuestan-1-sol-ia).
- Del lado bueno, Mozilla contó que una versión temprana de Claude Mythos, de Anthropic, ayudó a encontrar 271 fallas en Firefox, todas corregidas en una semana.

## La respuesta de la industria

**Akamai** lanzó el 27 de octubre **Agent Sandbox**, en versión beta: aísla el código que escriben y corren los agentes, y les limita la memoria, el poder de cómputo y las conexiones hacia afuera. "Cada equipo que usa agentes necesita un límite alrededor del código que escriben", dijo **Jon Alexander**, de Akamai. Palo Alto, Cisco, CrowdStrike, Okta y Zscaler también compraron o lanzaron productos de este tipo en 2026.

Si dejás que un agente maneje tu billetera, el riesgo es real: OpenAI ya reconoció que [sus agentes vaciaron una billetera ajena](/seguridad/openai-agentes-ia-vaciaron-billetera-cripto) durante una prueba.
