# Diseño: Tech Medical Premium — Full Dark Total
**Fecha:** 2026-03-06
**Alcance:** global.css, Hero.astro, ServiceCard.astro, index.astro, animations.css

## Contexto
El sitio actual se ve genérico (similar a Bootstrap) a pesar de tener buenas bases técnicas. El objetivo es elevar el diseño a nivel "tech medical premium" usando dark mode total, glassmorphism refinado, glow eléctrico y jerarquía visual dramática.

## Dirección visual aprobada
- **Paleta:** Azul noche `#0a1628` como base, oro `#C9A84C` como acento primario, azul eléctrico `#4a9eff` como acento secundario
- **Sensación:** Glassmorphism refinado, bordes luminosos (glow), gradientes complejos, tipografía mono para datos

---

## Sección 1 — Tokens globales (global.css)

### Cambios en :root
| Token | Antes | Después |
|---|---|---|
| `--color-bg` | `#FAFAF8` | `#0a1628` |
| `--color-text` | `#1F1F1F` | `#e2e8f4` |
| `--color-text-muted` | `#6B7280` | `#7a9bb5` |

### Tokens nuevos
```css
--color-bg-2: #0d1d35;          /* secciones elevadas */
--color-bg-3: #111e38;          /* cards / glass */
--color-electric: #4a9eff;
--color-electric-dim: rgba(74, 158, 255, 0.12);
```

### Base h1–h6
Cambiar color base de `var(--color-navy)` a `#e2e8f4` (claro sobre dark).

---

## Sección 2 — Hero.astro

### Cambio principal: eliminar `.hero-panel`
El contenedor glassmorphism (`.hero-panel`) es el elemento más "template". Se elimina. El contenido pasa a flotar directamente sobre el overlay del hero.

### Cambios específicos
- **Overlay:** `rgba(6,12,28,0.90)` izquierda → `rgba(6,12,28,0.08)` derecha
- **Decoración:** línea horizontal eléctrica (`width: 80px; height: 2px; background: #4a9eff`) antes del eyebrow
- **Trust items:** separados por `·` en una sola línea, sin pills/borders
- **Botón primario hover:** `box-shadow: 0 0 28px rgba(74,158,255,0.45)`
- **Padding:** `padding: 5rem 1.75rem` directo en `.hero-content`

---

## Sección 3 — Stats section (nueva, en index.astro)

Posición: entre Hero y Servicios.

```
┌─────────────────────────────────────────────────┐
│   10+        500+       100%        ∞            │
│  años en    pacientes  privado   disponible      │
│  ejercicio  atendidos  absoluto  por video       │
└─────────────────────────────────────────────────┘
```

- **Background:** `#060c1c` (más oscuro que el base)
- **Números:** Playfair Display, `clamp(3rem, 5vw, 5rem)`, color `--color-gold`
- **Labels:** Inter, `0.72rem`, uppercase, letter-spacing, `--color-text-muted`
- **Separadores:** líneas verticales `1px solid rgba(74,158,255,0.15)` entre stats
- **Animación:** `.reveal` en cada stat (stagger existente)

---

## Sección 4 — ServiceCard.astro

Transformar de caja blanca genérica a glass card oscura.

| Propiedad | Antes | Después |
|---|---|---|
| background | `white` | `rgba(13,29,53,0.75)` + `backdrop-filter: blur(14px)` |
| border default | `rgba(26,42,94,0.12)` | `rgba(74,158,255,0.15)` |
| border hover | `rgba(201,168,76,0.45)` | `rgba(74,158,255,0.5)` |
| top bar hover | gold 3px | eliminado |
| hover glow | solo sombra | `box-shadow: 0 0 0 1px rgba(74,158,255,0.35), 0 24px 40px rgba(4,9,23,0.5)` |
| icon bg | `#f0f3fb` | `rgba(74,158,255,0.08)` |
| icon border | navy dim | `rgba(74,158,255,0.2)` |
| text colors | navy/gray | `--color-text` / `--color-text-muted` |

---

## Sección 5 — index.astro: secciones existentes

### `.section--light` (Servicios, Blog)
```css
background: var(--color-bg-2); /* #0d1d35 */
```

### `.section--navy` (Doctor)
```css
background:
  radial-gradient(900px 400px at 10% -10%, rgba(74,158,255,0.10), transparent 55%),
  radial-gradient(700px 320px at 88% 108%, rgba(201,168,76,0.12), transparent 58%),
  linear-gradient(135deg, #060c1c 0%, #0a1628 60%, #0d1d35 100%);
```
Sin cambios en contenido doctor.

### `.cta-final`
```css
background:
  radial-gradient(ellipse at 15% 50%, rgba(74,158,255,0.14), transparent 55%),
  radial-gradient(ellipse at 85% 40%, rgba(201,168,76,0.12), transparent 55%),
  #060c1c;
```
Texto: `--color-text`. Párrafo: `--color-text-muted`.

### Encabezados de sección (`.section-header h2`, `.section-lead`)
En dark, `h2` hereda correctamente del token global. `.section-lead` usa `--color-text-muted`.

---

## Sección 6 — animations.css

Ajuste menor: `header-shadow` keyframe usa sombra oscura:
```css
box-shadow: 0 2px 20px rgba(6, 12, 28, 0.55);
```

---

## Archivos a modificar (en orden)

1. `src/styles/global.css` — tokens + h1-h6 base
2. `src/styles/animations.css` — shadow del header
3. `src/components/sections/Hero.astro` — eliminar panel, nuevo layout
4. `src/components/sections/ServiceCard.astro` — dark glass card
5. `src/pages/index.astro` — stats section + backgrounds de secciones

## Archivos NO modificados
- `VideoConsultaBanner.astro` (ya es dark, compatible con nueva paleta)
- `Header.astro`, `Footer.astro`, `Base.astro`
- Páginas secundarias (heredan tokens automáticamente)
