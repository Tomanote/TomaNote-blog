---
title: "La Evolución del Editor: TomaNote v0.5.6 y v0.5.7"
description: "De un textarea plano a un editor WYSIWYG con Milkdown y ProseMirror: así evolucionó el Markdown en TomaNote, con más precisión, rendimiento y privacidad."
publishDate: "2026-09-21"
updatedDate: "2026-09-21"
author: "camiicode"
tags: ["open-source", "product-update", "markdown", "dev-journal", "tech-stack"]
featured: true
draft: false
ogImage: "/images/blog/v057-editor-evolution/hero.png"
i18nSlug: v057-markdown-evolution
---

<br/>

# La Evolución del Editor: TomaNote v0.5.6 y v0.5.7 🚀

Algunas versiones corrigen cosas. Otras redefinen lo que la herramienta puede ser. **TomaNote v0.5.6** (publicada el 4 de septiembre) y **v0.5.7** (21 de septiembre) pertenecen, sin duda, a la segunda categoría.

Durante este ciclo de lanzamiento, el editor de TomaNote pasó de ser un simple `textarea` HTML plano a una experiencia de escritura Markdown **WYSIWYG** completa: formato en vivo, bloques de código con resaltado, pegado inteligente y una interfaz que se adapta a tu pantalla en lugar de pelear con ella.

Este artículo es la crónica de esa evolución: qué cambió, por qué lo hicimos así y qué significa para tu flujo de escritura.

## El punto de partida: honestidad ante todo

Para entender el salto, hay que recordar de dónde veníamos.

El workspace original era un `<textarea>` incrustado en HTML plano. Funcionaba. Escribías, se guardaba, punto. Pero si querías **negrita**, tenías que escribir `**negrita**` y confiar en tu memoria para saber cómo se vería. Sin vista previa, sin formato visual, sin guía.

Fiel a la filosofía minimalista del proyecto, la respuesta no fue apilar funciones: fue **reconstruir la base**.

## La nueva base: Milkdown + ProseMirror

**v0.5.6** reemplazó por completo el sistema legacy `contenteditable` por [Milkdown](https://milkdown.dev/), un editor de Markdown construido sobre [ProseMirror](https://prosemirror.net/).

¿Por qué esta combinación?

* **WYSIWYG de verdad**: escribes Markdown, ves formato rico. Lo que lees es lo que obtienes, sin modos alternados ni vistas previas separadas.
* **Markdown puro por debajo**: el documento se serializa a Markdown real, sin envoltorios propietarios ni formatos cerrados. Tus notas siguen siendo tuyas, en texto plano.
* **Arquitectura basada en plugins**: cada capacidad (historial, resaltado de sintaxis, marcas personalizadas) es un módulo independiente que se compone limpiamente.

La integración no fue trivial. Eliminamos la dependencia de `marked` —absorbida por Milkdown— y evaluamos [Shiki](https://shiki.style/) para el resaltado de código, pero lo descartamos: sus tiempos asíncronos chocaban con el modelo transaccional síncrono de ProseMirror. En su lugar, los bloques de código ahora lucen **etiquetas de lenguaje, números de línea y colores adaptados al tema** activo.

Un detalle de robustez que nos enorgullece: corregimos un *key mismatch* en el contexto del esquema de ProseMirror que crasheaba la creación del editor. Es el tipo de bug invisible que decide si una migración se siente sólida o frágil.

## Formato sin fricción

El editor nuevo vino acompañado de una **barra lateral derecha con 12 botones de formato**: negrita, cursiva, subrayado, encabezados, código, citas, listas y enlaces. Más los atajos de siempre:

* `Ctrl+B` / `Ctrl+I` / `Ctrl+U` para formato en línea.
* `Ctrl+Z` / `Ctrl+Y` para deshacer y rehacer.
* `Ctrl+S` para confirmación instantánea de guardado.

Y un plugin propio de **líneas vacías automáticas** que posiciona el cursor correctamente alrededor de bloques de código y citas — un detalle pequeño que se nota en cada párrafo que escribes.

## Markdown con precisión quirúrgica

Aquí viene una de las mejoras más pedidas: **pegar desde herramientas de IA sin arrastrar basura de formato**.

Si alguna vez copiaste una respuesta de Google Gemini (o ChatGPT, o cualquier asistente) y la pegaste en un editor, conoces el drama: spans anidados, estilos en línea, listas rotas, artefactos invisibles que rompen tu documento.

TomaNote ahora ejecuta una **sanitización de portapapeles en segundo plano**: cuando pegas contenido con formato enriquecido, se procesa y normaliza hacia Markdown limpio antes de tocar tu nota. Copias de Gemini, pegas en TomaNote, y el resultado es Markdown íntegro y estructurado. Sin limpieza manual. Sin sorpresas.

> Escribir con IA ya es parte del flujo de trabajo diario. Que tu editor respete ese flujo —en lugar de romperlo— es la diferencia entre una herramienta y una fricción.

## Adiós, `prompt()`: modales de verdad

**v0.5.7** se enfocó en pulir la experiencia hasta el último detalle.

Uno de los cambios más visibles: los enlaces ya no se insertan a través del nativo `prompt()` del navegador, esa ventana gris genérica que se sentía ajena al diseño de la app. Ahora existe un **modal propio de TomaNote** para insertar enlaces, coherente con el sistema de diseño, accesible con teclado y consistente en todos los temas.

Pero insertar el enlace era solo la mitad del problema. ¿Y cuando haces clic en uno? Antes, no pasaba nada. Ahora:

* **Ctrl/Cmd + clic** abre el enlace en una pestaña nueva.
* Los enlaces insertados sin selección previa **se renderizan como `<a>` reales**, con su marca intacta — un fix sutil de `inheritMarks` que evita que el enlace muera al nacer.

## El flujo estilo Adobe: la barra lateral que se adapta

Otra corrección que suena menor hasta que la vives: en pantallas bajas (portátiles, modo ventana partido, tablets en horizontal), la barra lateral derecha de herramientas **recortaba sus botones** o recurría a un scrollbar vertical insípido.

La solución se inspiró en el comportamiento de las paletas de herramientas de Adobe: por debajo de **900px de altura de viewport**, las herramientas **fluyen en múltiples columnas verticales adaptativas**. Nada se recorta. Nada se esconde tras un scroll. Todo lo que necesitas sigue visible, reorganizado con inteligencia.

Es un cambio de CSS y layout, sí. Pero encarna la filosofía del proyecto: **la interfaz se adapta a ti, no al revés**.

## Bajo el capó: rendimiento y privacidad radical

Mientras el pulido era visible, la arquitectura hacía trabajo silencioso:

* **Debounce de guardado de 5000ms**: cada pulsación de tecla no dispara un ciclo de guardado. El sistema agrupa la actividad y persiste cuando te detienes, ahorrando escrituras innecesarias a `localStorage` y manteniendo la interfaz fluida incluso con notas largas. Hasta el indicador de "Guardado" respeta el debounce — porque anunciar un guardado antes de que ocurra sería mentirle al usuario.
* **100% serverless**: TomaNote no tiene backend. Tus notas viven en tu navegador, vía `localStorage`. Cero telemetría, cero cuentas, cero servidores que puedan filtrar o revender tus notas.
* **Deduplicación de atajos**: los atajos de teclado que fallaban intermitentemente ahora se re-registran limpiamente, eliminando los `keydown` duplicados que causaban comportamientos erráticos.

Y como todo buen release open source, la cobertura creció con el código: **867 tests en total** — 725 unitarios (Vitest) y 142 E2E (Playwright), incluidas suites nuevas para el debounce de guardado, el pin de pestañas y la barra lateral responsiva.

## Lo que nos llevamos de este ciclo

1. **Reconstruir la base vale la pena.** La migración a Milkdown/ProseMirror dolió más que pulir detalles, pero cada mejora posterior se construyó sobre ella.
2. **Los detalles son la característica.** Un modal de enlaces, un debounce respetado, una columna que fluye: ninguna de estas cosas aparece en el README, pero todas definen cómo se siente la app.
3. **La privacidad no es una función, es una decisión de arquitectura.** Ser serverless no fue una restricción; es lo que hace posible prometer que tus notas jamás salen de tu dispositivo.

## Pruébalo tú mismo

TomaNote v0.5.7 ya está disponible en [tomanote.app](https://tomanote.app). Es gratis, open source y funciona offline después de la primera carga.

Abre una nota, pega una respuesta de tu asistente de IA favorito y mira cómo se convierte en Markdown limpio, formateado y tuyo.

Nos vemos en el próximo ciclo.

---

**Explora TomaNote:** [tomanote.app](https://tomanote.app)

**Sigue el proyecto en GitHub:** [TomaNote/TomaNote](https://github.com/Tomanote/TomaNote)
