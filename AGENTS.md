<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# NE. Portfolio — Guía del proyecto para agentes

Este es el portfolio de Nicolás Espin (creative full-stack developer, fundador de Synttek). Ya está diseñado e implementado siguiendo un sistema de marca propio ("NE. / ACTIVE SYSTEM") con nivel Awwwards. **Cualquier trabajo nuevo sobre este repo tiene que construirse sobre lo que ya existe, no reinventarlo.**

## Fuentes de verdad — leer antes de tocar diseño

1. **[docs/brand-system.md](docs/brand-system.md)** — concepto de marca, uso del logo `NE.` y su punto, paleta exacta, tipografía + escala fluida, gramática gráfica, tono de copy. Incluye la nota de override sobre el robot Spline (ver más abajo).
2. **[docs/visual-direction.md](docs/visual-direction.md)** — qué decisiones de composición se conservan del hero, Selected Work, project detail y contact, en desktop y mobile.

Ninguna decisión visual nueva debería poder justificarse sin remitir a una regla de estos dos documentos. Si hace falta una decisión que no está cubierta, resolverla ahí primero (actualizando el doc) y recién después en código.

## Skills a usar para trabajo visual/estructural nuevo

Están instaladas en `.claude/skills/` y hay que invocarlas para cualquier sección, página o componente nuevo que tenga impacto visual — no diseñar "a mano" sin pasarlo por ellas:

- **`brandkit`** — para cualquier extensión del sistema de marca (nuevas aplicaciones del punto de `NE.`, nuevas piezas gráficas).
- **`imagegen-frontend-web`** / **`imagegen-frontend-mobile`** — para generar dirección visual de referencia de una sección/página nueva *antes* de implementarla en código, igual que se hizo para el hero, Selected Work, project detail y contact.
- **`design-taste-frontend`** — al implementar, con los mismos parámetros ya usados en este proyecto: `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 8`, `VISUAL_DENSITY: 3`.
- **`high-end-visual-design`** — como capa de refinamiento final sobre cualquier sección nueva.
- **`redesign-existing-projects`** — para auditar cualquier cambio grande antes de darlo por terminado, contra el mismo checklist ya aplicado (consistencia de marca, jerarquía, ritmo Void/Paper, legibilidad, singularidad, responsive, accesibilidad, performance, exceso de animación).

Workflow para cualquier sección/página nueva: `imagegen-frontend-web`/`mobile` → documentar qué se conserva (sumar al final de `docs/visual-direction.md`) → implementar con `design-taste-frontend` + `high-end-visual-design` → auditar con `redesign-existing-projects`.

## Arquitectura actual (no reinventar)

Stack: Next.js 16 App Router + TypeScript + Tailwind v4 (tokens en `@theme`, ver `src/app/globals.css`) + GSAP/ScrollTrigger/@gsap/react + Lenis + SplitType + `@splinetool/react-spline`.

```
src/app/
  layout.tsx            fonts (Bricolage Grotesque, Instrument Serif, IBM Plex Mono), shell global
  globals.css            tokens del brand system en @theme, clases utilitarias (.hero-*, .work-row, .mono-label, etc.)
  page.tsx                ensambla las secciones de la home
  error.tsx / not-found.tsx   con marca, no defaults de Next
  work/[slug]/page.tsx   detalle de proyecto (generateStaticParams desde src/lib/projects.ts)

src/components/
  Nav.tsx, Footer.tsx        header fixed + menú fullscreen mobile, footer mono
  Loader.tsx                  loader de primera visita (sessionStorage), ≤1.4s, con cap de seguridad
  Cursor.tsx                   cursor contextual (desktop pointer:fine), dot que sigue el mouse + hover state
  PageTransition.tsx + SignalLink.tsx   transición de página: el punto naranja se expande al entrar a un proyecto
  Reveal.tsx                   scroll reveal genérico (clip-path), usado en casi todas las secciones
  SignalCore.tsx                el "kinetic signal core" propio — fallback real cuando Spline no aplica (reduced-motion)
  SplineScene.tsx + SplineErrorBoundary.tsx   robot Spline del hero + boundary que cae a SignalCore si falla
  sections/                    Hero, SelectedWork, WorkRow, Positioning, Capabilities, About, Contact
  providers/SmoothScroll.tsx   Lenis + ScrollTrigger, desactivado en prefers-reduced-motion

src/hooks/useMagnetic.ts    Track behavior reutilizable (CTAs, contact dot)
src/lib/motion.ts             constantes de motion + prefersReducedMotion() + helpers del loader
src/lib/projects.ts            datos de proyectos — **placeholder, marcado con [Reemplazar — ...]**, reemplazar antes de publicar
```

Todo el motion deriva de tres comportamientos (no inventar una lógica nueva por sección): **Pulse** (loader, cursor, contact dot), **Track** (cursor, magnetic, parallax del hero), **Reveal** (scroll-into-view). `prefers-reduced-motion` se respeta en cada componente individualmente y globalmente en `globals.css`.

## Decisiones deliberadas — no "corregir" sin preguntar

- **El hero usa un robot Spline público** (`SplineScene.tsx`, escena `rjGep9cbFtBZCEU8`) como visual principal en desktop y mobile. Esto es un override explícito del cliente sobre la regla original de "nada de 3D de stock" — está documentado en `docs/brand-system.md`. `SignalCore` sigue siendo el asset propio del sistema y es el fallback real para `prefers-reduced-motion` (no se descartó).
- El import de Spline es `next/dynamic(..., {ssr:false})` + `Suspense`, **no** `@splinetool/react-spline/next`: ese import es un Server Component async y rompe en runtime (`An unknown Component is an async Client Component`) al estar anidado bajo el `Hero` (que necesita ser Client Component). Ya se probó y falló — no reintentarlo sin resolver antes ese conflicto de Server/Client boundary.
- **No ocultar el watermark de Spline con un div encima.** Remover el badge del plan gratuito de Spline está contra sus términos de servicio; si se quiere sacar, es la feature paga de Spline, no un workaround en CSS.
- El wrapper del robot necesita "overscan" (`inset` negativo mayor al desplazamiento máximo del parallax) más `overflow:hidden` en `.hero-right` — si se toca el parallax, mantener ese margen o va a reaparecer el bug de franjas en los bordes.
- Los componentes usan estilos inline referenciando las custom properties de `@theme` en vez de clases utilitarias de Tailwind. Es una decisión de tiempo, no un error — funciona 1:1 con los tokens del brand system. Si se migra a utilities, hacerlo como refactor aparte, sección por sección, sin cambiar valores.
- `src/lib/projects.ts` tiene contenido placeholder a propósito (pedido explícito del cliente). No inventar nombres de proyectos, cifras o resultados reales — eso lo completa Nicolás.
