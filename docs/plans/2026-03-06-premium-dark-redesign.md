# Premium Dark Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transformar el sitio de un template genérico a un diseño tech medical premium con dark mode total, glassmorphism refinado y glow eléctrico.

**Architecture:** Full dark mode usando tokens CSS centralizados en `global.css`. Los cambios de paleta se propagan automáticamente a todas las páginas. Las 5 tareas son independientes y se ejecutan en orden para evitar conflictos visuales.

**Tech Stack:** Astro 5, CSS custom properties, CSS Scroll-driven Animations (nativas, sin JS)

**Build check:** `npm run build` — debe producir 0 errores. Visual check: `npm run dev` en `http://localhost:4321`

---

### Task 1: Tokens globales y base tipográfica

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Actualizar tokens de color en `:root`**

Reemplazar el bloque de `/* Colores */` dentro de `:root` con:

```css
/* Colores */
--color-navy:         #1A2A5E;
--color-navy-dark:    #0F1A3E;
--color-navy-light:   #1a2d4d;
--color-gold:         #C9A84C;
--color-sand:         #D4B896;
--color-bg:           #0a1628;
--color-bg-2:         #0d1d35;
--color-bg-3:         #111e38;
--color-electric:     #4a9eff;
--color-electric-dim: rgba(74, 158, 255, 0.12);
--color-text:         #e2e8f4;
--color-text-muted:   #7a9bb5;
--color-white:        #FFFFFF;
```

**Step 2: Cambiar color base de headings**

Encontrar el bloque `h1, h2, h3, h4, h5, h6` en la sección Reset y cambiar:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  line-height: 1.2;
  color: var(--color-text);
}
```

**Step 3: Verificar build**

```bash
npm run build
```
Esperado: 0 errores, 0 warnings tipográficos.

**Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: dark mode token palette — bg #0a1628, electric #4a9eff"
```

---

### Task 2: Header shadow en dark

**Files:**
- Modify: `src/styles/animations.css`

**Step 1: Actualizar el keyframe `header-shadow`**

Reemplazar:
```css
@keyframes header-shadow {
  to {
    box-shadow: 0 2px 16px rgba(26, 42, 94, 0.15);
  }
}
```

Con:
```css
@keyframes header-shadow {
  to {
    box-shadow: 0 2px 20px rgba(6, 12, 28, 0.55);
  }
}
```

**Step 2: Verificar build**

```bash
npm run build
```
Esperado: 0 errores.

**Step 3: Commit**

```bash
git add src/styles/animations.css
git commit -m "feat: update header scroll shadow for dark mode"
```

---

### Task 3: Hero sin panel — contenido a sangre

**Files:**
- Modify: `src/components/sections/Hero.astro`

**Step 1: Eliminar `.hero-panel` del HTML**

En el template, el `<div class="hero-panel">` y su `</div>` de cierre deben eliminarse. El contenido interno (eyebrow, h1, subtitle, actions, trust) queda directo dentro de `.hero-content`. Resultado:

```astro
<section class="hero" aria-labelledby="hero-heading">
  <div class="hero-bg" aria-hidden="true"></div>

  <div class="hero-content reveal">
    <div class="hero-line" aria-hidden="true"></div>
    <p class="hero-eyebrow">Práctica médica privada en salud masculina</p>

    <h1 id="hero-heading" class="hero-title">
      Medicina masculina<br />
      <span class="hero-title--accent">de precisión y máxima discreción</span>
    </h1>

    <p class="hero-subtitle">
      Diagnóstico integral, tratamiento personalizado y seguimiento cercano en un entorno reservado.
      Atención presencial en Palermo y videoconsulta para pacientes de toda Argentina.
    </p>

    <div class="hero-actions">
      <a href="/contacto" class="btn btn--primary">
        Coordinar consulta privada
      </a>
      <a href="#servicios" class="btn btn--outline">
        Explorar especialidades
      </a>
    </div>

    <div class="hero-trust">
      <span>Atención 1 a 1</span>
      <span class="trust-sep" aria-hidden="true">·</span>
      <span>Telemedicina premium</span>
      <span class="trust-sep" aria-hidden="true">·</span>
      <span>Confidencialidad absoluta</span>
    </div>
  </div>
</section>
```

**Step 2: Reemplazar TODO el bloque `<style>` del Hero**

```css
<style>
  .hero {
    position: relative;
    min-height: 80svh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background-color: #060c1c;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('/images/hero.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .hero-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(6, 12, 28, 0.92) 0%,
      rgba(6, 12, 28, 0.65) 50%,
      rgba(6, 12, 28, 0.08) 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 1240px;
    margin: 0 auto;
    padding: 5rem 1.75rem;
    width: 100%;
  }

  /* Línea decorativa eléctrica */
  .hero-line {
    width: 80px;
    height: 2px;
    background: var(--color-electric);
    margin-bottom: 1.5rem;
    box-shadow: 0 0 12px rgba(74, 158, 255, 0.6);
  }

  .hero-eyebrow {
    display: inline-block;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #d8bc6a;
    margin-bottom: 1.1rem;
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 700;
    color: var(--color-white);
    line-height: 1.05;
    letter-spacing: 0.01em;
    margin-bottom: 1.25rem;
    max-width: 620px;
  }

  .hero-title--accent {
    color: var(--color-gold);
  }

  .hero-subtitle {
    font-size: clamp(0.94rem, 1.5vw, 1.05rem);
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.72;
    max-width: 520px;
    margin-bottom: 2rem;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.875rem;
    margin-bottom: 2rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.82rem 1.65rem;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: transform 0.15s ease, box-shadow 0.2s ease, background-color 0.2s;
    white-space: nowrap;
  }

  .btn--primary {
    background-color: var(--color-gold);
    color: #060c1c;
    box-shadow: 0 8px 20px rgba(201, 168, 76, 0.28);
  }

  .btn--primary:hover {
    background-color: #dbb94f;
    transform: translateY(-2px);
    box-shadow: 0 0 28px rgba(74, 158, 255, 0.45), 0 10px 24px rgba(201, 168, 76, 0.2);
  }

  .btn--outline {
    background-color: transparent;
    color: var(--color-white);
    border: 1px solid rgba(255, 255, 255, 0.35);
  }

  .btn--outline:hover {
    border-color: rgba(74, 158, 255, 0.7);
    background-color: rgba(74, 158, 255, 0.06);
    transform: translateY(-2px);
  }

  /* Trust items inline */
  .hero-trust {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.6rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }

  .trust-sep {
    color: var(--color-electric);
    opacity: 0.6;
  }

  @media (max-width: 900px) {
    .hero-title {
      max-width: 100%;
    }
  }

  @media (max-width: 600px) {
    .hero {
      min-height: 72svh;
    }

    .hero-content {
      padding: 3rem 1rem 3.5rem;
    }

    .btn {
      width: 100%;
    }
  }
</style>
```

**Step 3: Verificar build**

```bash
npm run build
```
Esperado: 0 errores.

**Step 4: Visual check**

```bash
npm run dev
```
Navegar a `http://localhost:4321`. El Hero debe mostrar el texto directamente sobre la imagen, sin caja. La línea eléctrica azul debe aparecer encima del eyebrow.

**Step 5: Commit**

```bash
git add src/components/sections/Hero.astro
git commit -m "feat: hero — remove panel box, electric line, inline trust items"
```

---

### Task 4: ServiceCard dark glass

**Files:**
- Modify: `src/components/sections/ServiceCard.astro`

**Step 1: Reemplazar TODO el bloque `<style>` de ServiceCard**

```css
<style>
  .service-card {
    position: relative;
    overflow: hidden;
    background: rgba(13, 29, 53, 0.75);
    border-radius: var(--radius-lg);
    border: 1px solid rgba(74, 158, 255, 0.15);
    box-shadow: 0 8px 24px rgba(4, 9, 23, 0.45);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
    height: 100%;
  }

  .service-card:hover {
    border-color: rgba(74, 158, 255, 0.5);
    box-shadow:
      0 0 0 1px rgba(74, 158, 255, 0.25),
      0 24px 48px rgba(4, 9, 23, 0.6),
      0 0 40px rgba(74, 158, 255, 0.06);
    transform: translateY(-4px);
  }

  .service-card__link {
    display: flex;
    flex-direction: column;
    padding: 1.75rem;
    min-height: 100%;
    height: 100%;
    color: inherit;
  }

  .service-card__link:focus-visible {
    outline: 2px solid rgba(74, 158, 255, 0.6);
    outline-offset: -2px;
    border-radius: var(--radius-lg);
  }

  .service-card__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    background: var(--color-electric-dim);
    border: 1px solid rgba(74, 158, 255, 0.2);
    color: var(--color-electric);
    border-radius: var(--radius-md);
    margin-bottom: 1.25rem;
    transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  }

  .service-card:hover .service-card__icon {
    background: rgba(74, 158, 255, 0.18);
    border-color: rgba(74, 158, 255, 0.45);
    box-shadow: 0 0 16px rgba(74, 158, 255, 0.2);
    color: #7db8ff;
  }

  .service-card__title {
    font-family: var(--font-heading);
    font-size: 1.22rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: var(--color-text);
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  .service-card__desc {
    font-size: 0.95rem;
    color: var(--color-text-muted);
    line-height: 1.65;
    flex: 1;
    margin-bottom: 1.25rem;
  }

  .service-card__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-electric);
    opacity: 0.75;
    transition: gap 0.15s, opacity 0.15s;
  }

  .service-card:hover .service-card__cta {
    gap: 0.58rem;
    opacity: 1;
  }

  @media (max-width: 640px) {
    .service-card__link {
      padding: 1.35rem;
    }
  }
</style>
```

**Step 2: Verificar build**

```bash
npm run build
```
Esperado: 0 errores.

**Step 3: Commit**

```bash
git add src/components/sections/ServiceCard.astro
git commit -m "feat: service cards — dark glass, electric glow border on hover"
```

---

### Task 5: index.astro — stats section + fondos de secciones

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Agregar stats section en el HTML**

Insertar DESPUÉS del bloque `<!-- ── Hero ───── -->` y ANTES de `<!-- ── Servicios ── -->`:

```astro
<!-- ── Stats ──────────────────────────────────────────────── -->
<section class="section-stats" aria-label="Indicadores del consultorio">
  <div class="stats-container">
    <div class="stat-item reveal">
      <span class="stat-number">10+</span>
      <span class="stat-label">Años en ejercicio</span>
    </div>
    <div class="stat-divider" aria-hidden="true"></div>
    <div class="stat-item reveal">
      <span class="stat-number">500+</span>
      <span class="stat-label">Pacientes atendidos</span>
    </div>
    <div class="stat-divider" aria-hidden="true"></div>
    <div class="stat-item reveal">
      <span class="stat-number">100%</span>
      <span class="stat-label">Privado y confidencial</span>
    </div>
    <div class="stat-divider" aria-hidden="true"></div>
    <div class="stat-item reveal">
      <span class="stat-number">∞</span>
      <span class="stat-label">Disponible por video</span>
    </div>
  </div>
</section>
```

**Step 2: Actualizar backgrounds de secciones existentes en `<style>`**

Reemplazar `.section--light`:
```css
.section--light {
  background: var(--color-bg-2);
}
```

Reemplazar `.section--navy`:
```css
.section--navy {
  position: relative;
  isolation: isolate;
  background:
    radial-gradient(900px 400px at 10% -10%, rgba(74, 158, 255, 0.08), transparent 55%),
    radial-gradient(700px 320px at 88% 108%, rgba(201, 168, 76, 0.10), transparent 58%),
    linear-gradient(135deg, #060c1c 0%, #0a1628 60%, #0d1d35 100%);
}

.section--navy::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    repeating-linear-gradient(
      -45deg,
      rgba(74, 158, 255, 0.025) 0px,
      rgba(74, 158, 255, 0.025) 1px,
      transparent 1px,
      transparent 18px
    );
  opacity: 0.5;
  pointer-events: none;
}
```

Reemplazar `.cta-final`:
```css
.cta-final {
  background:
    radial-gradient(ellipse at 15% 50%, rgba(74, 158, 255, 0.12), transparent 55%),
    radial-gradient(ellipse at 85% 40%, rgba(201, 168, 76, 0.10), transparent 55%),
    #060c1c;
}

.cta-final h2 {
  font-size: clamp(2rem, 3vw, 2.7rem);
  color: var(--color-text);
  margin-bottom: 1.1rem;
}

.cta-final p {
  font-size: 1.12rem;
  color: var(--color-text-muted);
  line-height: 1.75;
  margin-bottom: 2.3rem;
}
```

Actualizar `.btn-primary-lg` para glow:
```css
.btn-primary-lg {
  display: inline-block;
  padding: 1.05rem 2.6rem;
  background-color: var(--color-gold);
  color: #060c1c;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 999px;
  box-shadow: 0 8px 24px rgba(201, 168, 76, 0.3);
  transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
}

.btn-primary-lg:hover {
  background-color: #dbb94f;
  transform: translateY(-2px);
  box-shadow: 0 0 32px rgba(201, 168, 76, 0.4), 0 10px 24px rgba(201, 168, 76, 0.2);
}
```

Actualizar `.btn-outline-navy` (en blog) para versión dark:
```css
.btn-outline-navy {
  display: inline-block;
  padding: 0.84rem 1.8rem;
  border: 1px solid rgba(74, 158, 255, 0.35);
  color: var(--color-electric);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 999px;
  transition: background-color 0.2s, border-color 0.2s, transform 0.15s;
}

.btn-outline-navy:hover {
  background-color: rgba(74, 158, 255, 0.08);
  border-color: rgba(74, 158, 255, 0.6);
  transform: translateY(-2px);
}
```

Actualizar `.section-header h2` (debe heredar `--color-text` del reset global — verificar que no haya override que lo fuerce a navy):
```css
.section-header h2 {
  font-size: clamp(2rem, 3.3vw, 2.8rem);
  margin-bottom: 1rem;
  letter-spacing: 0.01em;
}
```
*(Eliminar la línea `color: var(--color-navy)` si existe — debe heredar del token global)*

Actualizar `.section-lead`:
```css
.section-lead {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  line-height: 1.78;
  max-width: 62ch;
  margin: 0 auto;
}
```

Actualizar `.service-trust li` (dark):
```css
.service-trust li {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: rgba(74, 158, 255, 0.06);
  border: 1px solid rgba(74, 158, 255, 0.18);
  border-radius: 999px;
  padding: 0.48rem 0.82rem;
}
```

**Step 3: Agregar estilos de la sección stats al final del `<style>`**

Agregar ANTES del cierre `</style>`:

```css
/* ── Stats section ───────────────────────────────────────── */
.section-stats {
  background: #060c1c;
  padding: 3.5rem 1.75rem;
  border-top: 1px solid rgba(74, 158, 255, 0.08);
  border-bottom: 1px solid rgba(74, 158, 255, 0.08);
}

.stats-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 700;
  color: var(--color-gold);
  line-height: 1;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

.stat-divider {
  width: 1px;
  height: 3.5rem;
  background: rgba(74, 158, 255, 0.18);
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .stats-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1rem;
  }
  .stat-divider { display: none; }
}
```

**Step 4: Verificar build**

```bash
npm run build
```
Esperado: 0 errores, 9 páginas generadas.

**Step 5: Visual check completo**

```bash
npm run dev
```
Verificar en `http://localhost:4321`:
- Hero: texto a sangre, línea eléctrica azul, sin panel-caja
- Stats: 4 números dorados sobre fondo casi-negro, separadores sutiles
- Servicios: cards oscuras con glass, glow azul al hover
- Sección doctor: gradiente oscuro con toque eléctrico
- CTA final: fondo oscuro con glow dual (azul izquierda, dorado derecha)

**Step 6: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: index — stats section, dark section backgrounds, electric accents"
```

---

## Verificación final

```bash
npm run build
```

Resultado esperado:
```
✓ Built in X.XXs
  9 page(s) built
```

0 errores TypeScript, 0 errores de build.
