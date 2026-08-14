# NE. / ACTIVE SYSTEM
### Brand system — Nicolás Espin, creative full-stack developer · founder, Synttek

---

> **Nota de override (decisión explícita del cliente):** la regla original de este documento prohibía usar el robot Spline público como protagonista del hero, a favor de un objeto propio. Nicolás pidió explícitamente revertir esto e integrar una escena Spline pública (`prod.spline.design/VrQDFKzKgy5RBKFyerANuf8L`) como visual principal del hero en desktop (≥900px, sin `prefers-reduced-motion`). El `SignalCore` construido para este sistema no se descartó: pasó a ser el fallback real para mobile y para `prefers-reduced-motion`, y sigue siendo el lenguaje gráfico del punto en el resto del sitio (loader, cursor, contact, transición de página). Ver `src/components/sections/Hero.tsx`.

## 1. Concepto

**"Controlled systems. Living experiences."**

Nicolás no se presenta como alguien que "arma interfaces". Se presenta como quien diseña, construye y **lleva a producción** productos digitales reales. La marca vive en la tensión entre dos polos que nunca se resuelven del todo:

| Estructura | Movimiento |
|---|---|
| Ingeniería | Creatividad |
| Precisión | Energía |
| Sistemas complejos | Experiencias simples |
| Grilla | Pulso |

El sitio no elige un lado. Cada pantalla es una grilla editorial estricta (estructura) atravesada por un solo elemento vivo: el punto de `NE.` (movimiento). Todo lo demás — tipografía, layout, paleta — está para reforzar esa única fricción, no para acumular efectos.

**Territorio a evitar activamente:** portfolio-de-dev genérico, verde ácido/violeta, glass, cards flotantes, robot 3D de stock, copy tipo "I build digital experiences". Si un elemento no comunica precisión técnica, criterio visual o capacidad de producto, no entra al sitio.

---

## 2. Logo — `NE.`

### 2.1 Construcción

Wordmark tipográfico construido sobre **Bricolage Grotesque**, peso Bold/ExtraBold, con ajuste óptico manual (no usar el tracking por defecto):

- Kerning cerrado entre `N` y `E` (aprox. -2% a -3% del tamaño), de forma que el par se lea como un bloque único, no como dos letras sueltas.
- El punto final **no** hereda el tracking del par `NE`: se separa levemente (aprox. +0.08em respecto al borde de la `E`) para que respire y funcione como elemento independiente, no como puntuación.
- Altura del punto: se ancla a la altura x de la tipografía, nunca a la línea de base completa — esto lo hace sentir "suspendido", casi flotante, listo para animarse.
- Sin serif, sin itálica, sin decoración. El wordmark es el único lugar del sitio donde Bricolage Grotesque se usa en su forma más neutra.

No usar DM Serif Display en el logo bajo ninguna circunstancia — esa fuente queda reservada exclusivamente para las palabras editoriales puntuales dentro de párrafos (ver §3).

### 2.2 El punto como sistema

El punto de `NE.` es el único activo gráfico propietario de la marca. No es un accesorio del logo: es el lenguaje visual completo, reducido a su forma mínima. Reglas de uso:

- **Color por defecto:** `--color-signal` (#FF4D00) sobre fondos Void/Paper. Nunca cambia de forma, solo de escala, posición o color de fondo.
- **Estados que representa:** ejecución, disponibilidad, señal activa, precisión, cierre/finalización, pulso.
- **Aplicaciones obligatorias del sistema:**
  - *Loader*: el punto cruza la pantalla y revela el hero.
  - *Cursor contextual*: reemplaza al cursor nativo en desktop `pointer:fine`, se comporta como magnetic target sobre elementos interactivos.
  - *Indicador de disponibilidad*: en el hero, junto a "Available for work" / ubicación.
  - *Transición entre páginas*: al entrar a un proyecto, el punto se expande y cubre el viewport.
  - *Elemento gráfico suelto*: puede convertirse en ventana circular que revela una imagen de proyecto (mask circular), o desplazarse como acento en secciones densas.
- **Lo que el punto nunca hace:** no se usa como bullet de lista, no se duplica en fila (evitar lectura de "marquee de puntos"), no cambia de forma geométrica (siempre círculo perfecto, nunca cuadrado/rombo).

### 2.3 Espacio de seguridad y escala mínima

- Espacio de seguridad alrededor del wordmark: altura de la `N` mayúscula en los cuatro lados.
- Escala mínima en UI: 20px de altura de caja (nav / favicon simplificado a solo el punto sobre fondo Void).

---

## 3. Paleta

```css
--color-void: #08090a;         /* fondo oscuro primario */
--color-paper: #f3efe7;        /* fondo claro primario, "warm paper" */
--color-signal: #ff4d00;       /* NE Infrared — acento propietario */
--color-signal-soft: #ff7540;  /* variante suave del acento, hover/estados secundarios */
--color-steel: #92928d;        /* texto secundario, metadata sobre paper */
--color-ink: #111214;          /* texto sobre paper, casi-negro cálido */
--color-line-dark: rgba(243, 239, 231, 0.14); /* líneas/bordes sobre Void */
--color-line-light: rgba(8, 9, 10, 0.14);     /* líneas/bordes sobre Paper */
```

### Reglas de aplicación

1. El sitio **alterna** entre secciones Void y secciones Paper por bloque completo (una sección = un fondo). Nunca se mezclan dentro de la misma sección salvo en el propio punto de `NE.` o en imágenes.
2. `--color-signal` se reserva para: el punto de `NE.`, un CTA principal por vista, subrayados de estado activo, y momentos de transición. Si en una sección ya hay dos usos de Infrared, no se agrega un tercero.
3. Sobre `--color-signal` o `--color-signal-soft` como fondo, el texto es **siempre** `--color-void` (negro), nunca blanco.
4. `--color-steel` es el único gris permitido para texto secundario/metadata; no se introducen grises intermedios nuevos.
5. No se agregan colores de acento adicionales. Estados funcionales (error de formulario, success de envío de contacto) se resuelven con tipografía, iconografía de línea y `--color-signal` — no con verde/rojo semáforo.
6. Las fotografías de proyecto pueden traer su propio color; se tratan con recortes duros (sin bordes redondeados, sin sombra difusa) para que no compitan con la paleta del sistema.

---

## 4. Tipografía

```css
--font-display: "Bricolage Grotesque", sans-serif;
--font-editorial: "Instrument Serif", serif;
--font-mono: "IBM Plex Mono", monospace;
```

| Fuente | Uso | Regla dura |
|---|---|---|
| Bricolage Grotesque | Logo, headings, navegación, cuerpo de texto | Es la voz por defecto del sitio. Tracking negativo óptico en headlines grandes (ajustar a ojo, no usar `-0.02em` fijo para todos los tamaños — a mayor tamaño, tracking más negativo). |
| Instrument Serif *Italic* | Una sola palabra emocional/conceptual por bloque de copy (ej. "pulse", "criterio", "real") | Nunca en párrafos completos, nunca en metadata, nunca en más de una palabra consecutiva por vista. |
| IBM Plex Mono | Metadata, índices numéricos, años, stack tecnológico, ubicación, estados ("Available", "In production") | Siempre uppercase cuando es label, tracking positivo leve (+0.04em), tamaño 11–13px. |

### Escala fluida (clamp, base 375px → 1440px)

```css
--text-display-xl: clamp(3.75rem, 2rem + 8vw, 13.75rem);   /* 60px → 220px */
--text-display-l:  clamp(3rem, 1.6rem + 6.2vw, 9.375rem);  /* 48px → 150px */
--text-heading:    clamp(2.25rem, 1.4rem + 3.6vw, 6rem);   /* 36px → 96px */
--text-subheading: clamp(1.5rem, 1.1rem + 1.8vw, 3rem);    /* 24px → 48px */
--text-body-lg:    clamp(1.125rem, 1rem + 0.5vw, 1.5rem);  /* 18px → 24px */
--text-body:       clamp(1rem, 0.94rem + 0.25vw, 1.125rem);/* 16px → 18px */
--text-meta:       clamp(0.6875rem, 0.65rem + 0.15vw, 0.8125rem); /* 11px → 13px */
```

Reglas de composición:

- Ancho máximo de línea de lectura: 58–65ch en body/body-lg. Headlines no siguen esta regla (pueden ocupar el ancho completo de la grilla).
- Nunca dos tamaños de la escala consecutivos en el mismo bloque sin un salto de jerarquía real (evitar "casi todo el mismo tamaño").
- Interlineado: 0.95–1.05 en display/heading (tipografía grande y ajustada), 1.4–1.5 en body.

---

## 5. Gramática del sistema gráfico

- **Grilla:** 12 columnas editoriales, gutter consistente en todo el sitio (definido en tokens de implementación). Los bloques de texto grande pueden romper la grilla intencionalmente una vez por sección como máximo — nunca de forma aleatoria.
- **Índices numéricos:** cada proyecto, cada capability, cada paso del manifiesto lleva un índice en IBM Plex Mono (`01 —`, `02 —`) alineado a la columna, no decorativo: ayuda a navegar.
- **Líneas finas:** 1px, `--color-line-dark` / `--color-line-light` según fondo. Se usan para separar secciones y delimitar la grilla, nunca como marco decorativo alrededor de cards.
- **Puntos de estado:** variantes pequeñas del punto de `NE.` (4–8px) para indicar disponibilidad, item activo en navegación, o hover state — siempre `--color-signal`.
- **Coordenadas:** metadata tipo `CBA, AR · -31.4201, -64.1888` o timestamps en mono, usadas como detalle editorial en hero/footer, no como relleno.
- **Contraste densidad/silencio:** cada sección de alta densidad (Selected Work, Capabilities) va seguida de una sección de silencio (mucho espacio negativo, poco texto). Nunca dos secciones densas consecutivas.
- **Fotografía de proyecto:** recortes fuertes (crops asimétricos, sin padding decorativo), layout editorial (imagen ocupa una función de grilla, no flota sobre un card con sombra).
- **Bordes:** rectos por defecto. Radios permitidos solo en el punto de `NE.` (círculo) y en inputs de formulario (radio mínimo, 2–4px) — en ningún otro lugar.

---

## 6. Tono de voz / copy

- Directo, técnico sin ser frío. Frases cortas, verbos de acción, cero relleno corporativo.
- Prohibido: "I build digital experiences", "passionate developer", "pixel-perfect", cualquier frase que podría estar en cualquier portfolio.
- El copy prioriza resultado sobre proceso: no "usé React y Node" sino "qué problema real se resolvió y qué cambió".
- Una sola palabra en Instrument Serif Italic por headline como firma emocional (ver §4) — el resto del copy se mantiene en Bricolage Grotesque, sin adjetivos innecesarios.
- Metadata (mono) siempre en mayúsculas, corta, factual: años, ubicación, rol, estado.

---

## 7. Resumen de tokens (referencia para implementación)

```css
:root {
  --color-void: #08090a;
  --color-paper: #f3efe7;
  --color-signal: #ff4d00;
  --color-signal-soft: #ff7540;
  --color-steel: #92928d;
  --color-ink: #111214;
  --color-line-dark: rgba(243, 239, 231, 0.14);
  --color-line-light: rgba(8, 9, 10, 0.14);

  --font-display: "Bricolage Grotesque", sans-serif;
  --font-editorial: "Instrument Serif", serif;
  --font-mono: "IBM Plex Mono", monospace;
}
```

Este documento es la fuente de verdad del sistema. Cualquier decisión visual durante la implementación (Fase 4–5) que no pueda justificarse con una regla de este documento debe descartarse o volver a esta fase para resolverse primero.
