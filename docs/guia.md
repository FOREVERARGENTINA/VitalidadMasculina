# 🚀 Guía Consolidada de Desarrollo Web Moderno 2026

> **"La complejidad es el enemigo del lanzamiento. El mejor código es el que no escribiste."**
> 
> **Actualización 2026:** Esta guía mantiene su filosofía de simplicidad pero incorpora las mejores prácticas de seguridad, performance y tecnologías modernas que son estándar en 2026.

## 📋 Índice Rápido
1. [Filosofía Central](#filosofía-central)
2. [🔴 ACTUALIZACIONES CRÍTICAS 2026](#-actualizaciones-críticas-2026)
3. [Clasificación de Proyectos](#clasificación-de-proyectos)
4. [Arquitectura de Archivos](#arquitectura-de-archivos)
5. [Accesibilidad](#accesibilidad-crítico-siempre)
6. [Mobile-First](#mobile-first)
7. [HTML Semántico](#html-semántico)
8. [CSS](#css-decisiones-y-organización)
9. [JavaScript](#javascript-modularidad)
10. [SEO](#seo-básico-vs-avanzado)
11. [Imágenes y Multimedia](#imágenes-y-multimedia)
12. [Performance](#performance-y-optimización)
13. [Hosting](#hosting-por-tipo)
14. [Testing](#testing-por-tipo)
15. [Seguridad](#seguridad-básica)
16. [Checklist de Lanzamiento](#checklist-de-lanzamiento)

---

## 🔴 ACTUALIZACIONES CRÍTICAS 2026

### ⚠️ REGLAS DE ORO 

**1. SEGURIDAD INNEGOCIABLE**

La "simplicidad" NUNCA justifica la inseguridad. Estos son requisitos mínimos absolutos:

**✅ OBLIGATORIO - Todos los proyectos:**
- **Sanitización de inputs**: Usar DOMPurify para cualquier contenido generado por usuario
- **Validación isomórfica**: Definir validación UNA vez con Zod/TypeBox, aplicar en cliente Y servidor
- **Headers de seguridad**: Configurar en producción (ver sección Seguridad ampliada)
- **NUNCA confiar en validación cliente**: Siempre validar server-side

**2. PERFORMANCE 2026**

**Métrica Clave - INP (Interaction to Next Paint):**
- ✅ Optimizar para INP < 200ms (reemplaza completamente FID desde 2024)
- ❌ IGNORAR cualquier mención de FID en esta guía - es métrica obsoleta

**Fuentes Web:**
- ✅ SIEMPRE self-hosted: `next/font`, `@fontsource`, o archivos locales
- ❌ NUNCA Google Fonts CDN (problemas GDPR + performance)
- Razón: Privacidad (GDPR), control total, eliminación de third-party requests

**Imágenes:**
- Preferencia: AVIF (mejor compresión, soporte 95%+) > WebP (fallback) > JPEG
- Lazy loading nativo: `loading="lazy"` (no librerías)

**3. STACK TECNOLÓGICO ACTUALIZADO**

**CSS Moderno 2026:**
- ✅ **CSS Nesting Nativo**: Ya no necesitas SASS/LESS para anidación
- ✅ **Container Queries**: Para componentes reutilizables (no solo Media Queries)
- ✅ **Scroll-driven Animations**: Nativas en navegadores - reemplazan librerías JS
- ❌ **NO usar AOS o librerías similares** - usar CSS nativo

**JavaScript/Frameworks:**
- Next.js: **Estrictamente App Router** (Pages Router es legacy en 2026)
- React Server Components por defecto, `'use client'` solo cuando necesario
- Gestión de Estado: URL-based state o React Context nativo (evitar Redux/Zustand salvo Tipo C muy complejo)

**Validación de Datos:**
```typescript
// PATRÓN 2026: Definir una vez, usar everywhere
import { z } from 'zod';

// Schema compartido cliente/servidor
export const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});

// Uso en frontend (validación instantánea)
const result = userSchema.safeParse(formData);

// Uso en backend (validación segura)
const validated = userSchema.parse(req.body);
```

**4. MATRIZ DE DECISIÓN RÁPIDA 2026**

**Hosting:**
- ✅ Prototipo/Producción pequeña: Vercel, Netlify, Cloudflare Pages (tiers gratuitos)
- ❌ **PROHIBIDO**: 000webhost, InfinityFree, hostings PHP compartidos gratuitos
- Razón: Riesgos de seguridad conocidos, malware, performance terrible

**Testing Mínimo Viable:**
- Tipo A: Lighthouse + axe DevTools manual
- Tipo B: + Vitest para lógica crítica + Type checking
- Tipo C: + Playwright (E2E) + Lighthouse CI en pipeline

**Observabilidad (antes de producción):**
- Configurar logs estructurados básicos
- Error tracking: Sentry (tier gratuito) o Axiom
- Performance monitoring: Vercel Analytics o similar

---

## 🎯 Filosofía Central

### Principios Fundamentales

**1. Separación de Responsabilidades**
- HTML = Estructura y contenido
- CSS = Presentación y diseño  
- JavaScript = Comportamiento e interactividad

**2. Regla de Oro: Simplicidad Primero**
- Empieza simple. Agrega complejidad solo con evidencia de que la necesitas
- Si copias código más de 2 veces → crea un componente reutilizable
- Si un archivo HTML supera 500 líneas → tiene CSS/JS que debe externalizarse

**3. Proceso de Decisión en 3 Pasos**

Para CUALQUIER técnica/herramienta/librería pregúntate:

```
1. ¿RESUELVE UN PROBLEMA REAL?
   NO → Skip  
   SÍ → Continúa

2. ¿EL BENEFICIO JUSTIFICA LA COMPLEJIDAD?
   NO → Busca alternativa más simple  
   SÍ → Continúa

3. ¿PUEDES MANTENERLO EN 6 MESES?
   NO → No lo implementes  
   SÍ → Adelante
```

**4. EXCEPCIÓN DE SEGURIDAD (2026)**

```
Si una técnica/herramienta es necesaria para SEGURIDAD:
→ LA COMPLEJIDAD SE JUSTIFICA AUTOMÁTICAMENTE
→ Ejemplo: Zod para validación, CSP headers, rate limiting
```

---

## 📊 Clasificación de Proyectos

**Antes de tomar cualquier decisión técnica, clasifica tu proyecto:**

### Tipo A: Landing Page / Portafolio Simple
- **Características**: 1-5 páginas, contenido mayormente estático
- **Tráfico esperado**: < 1,000 visitas/mes
- **Complejidad**: Baja
- **Stack recomendado**: HTML + CSS (Tailwind recomendado) + JavaScript vanilla
- **Ejemplo**: Portafolio personal, página de restaurante local

### Tipo B: Sitio Corporativo / Blog
- **Características**: 10-50 páginas, algo de interactividad
- **Tráfico esperado**: 1,000-50,000 visitas/mes
- **Complejidad**: Media
- **Stack recomendado**: SSG (Astro, 11ty) o HTML + Tailwind
- **Ejemplo**: Blog profesional, sitio de empresa mediana

### Tipo C: Aplicación Web / E-commerce
- **Características**: Múltiples vistas, alta interactividad, datos dinámicos
- **Tráfico esperado**: 50,000+ visitas/mes
- **Complejidad**: Alta
- **Stack recomendado**: Framework moderno (Next.js App Router, Nuxt, SvelteKit)
- **Ejemplo**: Tienda online, dashboard, SaaS

---

## 📁 Arquitectura de Archivos

### Estructura Tipo A/B (Simple/Medio)

```
proyecto/
├── index.html
├── css/
│   ├── design-system.css      # Variables, colores, tipografía
│   ├── global.css             # Reset, base, utilidades
│   ├── components.css         # Botones, cards, modales
│   └── sections/              # CSS por sección
│       ├── hero.css
│       ├── navigation.css
│       └── footer.css
├── js/
│   ├── main.js                # Inicialización principal
│   └── modules/               # Módulos específicos
│       ├── gallery.js
│       ├── forms.js
│       └── animations.js
├── images/
│   ├── hero/
│   ├── gallery/
│   └── icons/
└── assets/
    └── fonts/
```

### Estructura Tipo C (App Web)

```
proyecto/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── ui/               # Componentes reutilizables
│   │   └── sections/         # Secciones específicas
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── lib/                  # Utilidades
│   ├── pages/                # Rutas
│   └── data/                 # Tipos, constantes
├── tests/
└── package.json
```

### Archivos de Configuración Esenciales

**Siempre incluir en la raíz del proyecto:**

```
.editorconfig          # Fuerza UTF-8 y formato consistente
.gitignore            # Excluir node_modules, .env, etc.
package.json          # Dependencias y scripts
README.md             # Documentación del proyecto
```

**Ejemplo .editorconfig mínimo:**
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,html,css}]
indent_style = space
indent_size = 2
```

**Por qué .editorconfig es crítico:**
- ✅ Previene mojibakes (problemas de codificación)
- ✅ Consistencia entre editores (VS Code, Codex, Cursor, etc.)
- ✅ Fuerza UTF-8 en TODOS los agentes de IA
- ✅ Sin configuración manual por desarrollador

### Reglas de Nomenclatura

- **Archivos**: kebab-case.css (minúsculas con guiones)
- **Clases CSS**: .kebab-case o .component__element--modifier (BEM)
- **IDs**: #camelCase (solo cuando sea absolutamente necesario)
- **JavaScript**: camelCase para variables, PascalCase para clases

---

## ♿ Accesibilidad (CRÍTICO SIEMPRE)

### ✅ SIEMPRE - Nivel Mínimo No Negociable

**1. Alt Textos DESCRIPTIVOS**
- ❌ alt="imagen" → genérico, inútil
- ✅ alt="" → solo si decorativa
- ✅ alt="Gráfico de ventas Q4 mostrando crecimiento del 23%"

**2. Contraste de Color**
- Texto normal: Mínimo 4.5:1
- Texto grande (>24px): Mínimo 3:1
- Herramienta: WebAIM Contrast Checker

**3. Navegación por Teclado**
- Todo clickeable debe alcanzarse con Tab
- Focus visible (NUNCA outline: none sin alternativa)
- Orden lógico de tabulación

**4. HTML Semántico**
- `<button>` para acciones, `<a>` para navegación
- `<label>` asociado a cada `<input>` (for/id)
- Landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`

**5. Tamaños Táctiles (Móvil)**
- Botones/links mínimo 44x44px
- Espaciado entre elementos mínimo 8px

### 💡 ARIA: Solo si HTML Semántico No Alcanza

**✅ Usar ARIA cuando:**
- Componentes custom (tab panels, accordions)
- Estados dinámicos (aria-expanded, aria-hidden)
- Regiones de live updates (aria-live)

**❌ NO usar ARIA si:**
- Existe elemento HTML nativo (usar `<button>` no role="button")
- No entiendes completamente el atributo
- Agregas complejidad sin beneficio

**Regla**: "No ARIA es mejor que ARIA mal usado"

### 🧪 Testing Accesibilidad

**Tipo A/B/C (SIEMPRE):**
- [ ] axe DevTools (extensión Chrome/Firefox)
- [ ] WAVE (extensión navegador)
- [ ] Teclado only: navega tu sitio sin mouse
- [ ] Lighthouse Accessibility score > 95

**Tipo C (adicional):**
- [ ] Lector de pantalla: NVDA (Win), VoiceOver (Mac)
- [ ] axe-core en tests automatizados

---

## 📱 Mobile-First

### ✅ SIEMPRE: Pruebas en Dispositivo Real

**❌ INSUFICIENTE:**
- Solo Chrome DevTools responsive mode
- Solo emulador Android Studio

**✅ MÍNIMO VIABLE:**
1. Prueba en TU teléfono (el que tengas)
2. Pide a 2 personas que prueben en sus teléfonos
3. Cubre: iOS + Android (no necesitas 10 dispositivos)

**Herramientas gratuitas:**
- BrowserStack (trial 30 días)
- LambdaTest (100 min/mes gratis)

### 📱 Checklist Dispositivo Real

- [ ] Touch gestures funcionan (no solo clicks)
- [ ] Zoom de página no rompe layout
- [ ] Inputs no causan zoom automático (font-size ≥ 16px)
- [ ] Teclado móvil no tapa inputs (scroll adecuado)
- [ ] Performance real (no solo Lighthouse simulado)
- [ ] Consumo de datos razonable

### ⚡ Mobile-First Técnico

**Enfoque:**
- Estilos base = móvil (siempre)
- Media queries = mejora progresiva para desktop
- Usar min-width, NO max-width

**Detectar touch devices:**
- Adapta UX (aumenta áreas de click, quita hover effects)
- Usa JavaScript para agregar clase .touch-device al body

---

## 📄 HTML Semántico

### Meta Tags Esenciales (SIEMPRE)

**Críticos:**
- charset UTF-8
- viewport para responsive
- title único por página (50-60 caracteres)
- description (150-160 caracteres)

**SEO Social:**
- Open Graph: og:title, og:description, og:image, og:url
- Twitter Cards: twitter:card, twitter:image
- Favicon + apple-touch-icon

**Performance 2026:**
- ❌ **NO usar** preconnect para Google Fonts (usar self-hosted)
- ✅ Preconnect para CDNs de assets si usas alguno

### Orden de Carga Óptimo

1. Charset y viewport
2. Preconnects (antes de CSS)
3. CSS: design system → global → componentes → secciones
4. JavaScript crítico (máximo 5-10 líneas)
5. Contenido del body
6. JavaScript al final con defer/async

### Evitar Inline Styles/Scripts

**Regla:** CSS y JS deben estar en archivos externos

**Excepción válida:** Critical CSS inline (menos de 50 líneas) para above-the-fold en páginas de alta performance

---

## 🎨 CSS: Decisiones y Organización

### 1. Variables CSS (Custom Properties)

**Define una vez, usa en todas partes:**

Sistema de diseño centralizado en design-system.css:
- Colores (primary, secondary, success, error, neutrales)
- Tipografía (familias, tamaños)
- Espaciado (xs, sm, md, lg, xl)
- Bordes (radius-sm, md, lg)
- Sombras (shadow-sm, md, lg)
- Breakpoints (para usar en JavaScript)

### 2. Estrategia por Tipo de Proyecto

**Tipo A (Simple):**

**Opción Recomendada 2026: Tailwind CSS**
- ✅ Ventajas: Flexible, utility-first, archivo final pequeño (purge automático)
- ⚠️ Curva aprendizaje inicial, HTML verboso
- Ideal para: Diseños únicos, proyectos modernos, velocidad de desarrollo

**Opción Alternativa: CSS Vanilla + Variables**
- ✅ Ventajas: Cero dependencias, control total, aprendizaje de CSS real
- ⚠️ Más código manual
- Ideal para: Proyectos educativos, sitios muy pequeños

**Tipo B (Medio):**
- Tailwind CSS + CSS Modules
- Variables CSS (custom properties)
- Container Queries para componentes

**Tipo C (Complejo):**
- Tailwind + Sistema de diseño robusto
- CSS-in-JS si React (styled-components, Emotion)
- Componentes atómicos
- Temas dinámicos

### 3. CSS Moderno 2026

**✅ NUEVAS CAPACIDADES NATIVAS - Usar en lugar de herramientas:**

**CSS Nesting (Nativo):**
```css
/* Ya no necesitas SASS/LESS */
.card {
  padding: 1rem;
  
  & .title {
    font-size: 2rem;
  }
  
  &:hover {
    transform: scale(1.05);
  }
}
```

**Container Queries (Para componentes reutilizables):**
```css
/* Componente se adapta a SU CONTENEDOR, no al viewport */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

**Scroll-driven Animations (Reemplaza librerías JS de animación para efectos simples):**
```css
/* Animación nativa al hacer scroll - NO JavaScript */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
```

### 4. Reglas de Oro CSS

**✅ HACER:**
- Mobile-first siempre (base = móvil, @media min-width = desktop)
- Usar variables para valores repetidos
- Container Queries para componentes, Media Queries para layout global
- Clases únicas o BEM para naming
- CSS Nesting nativo en lugar de preprocesadores

**❌ EVITAR:**
- !important (indica problema de especificidad)
- IDs para estilos (usar solo para JavaScript)
- Selectores complejos (más de 3 niveles)
- Inline styles (salvo critical CSS)
- Librerías JS para efectos que CSS puede hacer nativamente

### 5. Modularización CSS

**Por tipo de responsabilidad:**
- design-system.css → Variables globales
- global.css → Reset, base, utilidades
- components.css → Botones, cards, modales (reutilizables)
- sections/ → CSS específico por sección (hero, footer, etc.)

---

## ⚡ JavaScript: Modularidad

### 1. Progresión de Complejidad

**Nivel 0: HTML puro**
- Sitio 100% estático
- Ejemplo: CV imprimible

**Nivel 1: Vanilla JS (sin frameworks)**
- Toggle menu, slider, smooth scroll, form validation
- Uso: Tipo A/B con interactividad mínima

**Nivel 2: Framework ligero (Alpine.js, Petite Vue)**
- Interactividad en componentes específicos
- Sin build process
- Uso: Tipo B con áreas dinámicas

**Nivel 3: Framework completo (React, Vue, Svelte)**
- SPA completo, estado global complejo
- Uso: Tipo C solamente

### 2. Red Flags: NO uses framework si...

❌ Solo necesitas un menú hamburguesa
❌ Solo necesitas un carousel de imágenes
❌ Solo necesitas validación de formulario
❌ Tu proyecto tiene menos de 10 componentes interactivos
❌ No hay estado compartido entre componentes

✅ En su lugar: Vanilla JS o Alpine.js

### 3. Organización: Un Archivo, Una Responsabilidad

**Modularizar por funcionalidad:**
- main.js → Inicialización, imports
- modules/gallery.js → Lógica de galería
- modules/forms.js → Validación formularios
- modules/animations.js → Efectos visuales (si necesitas JS)
- config.js → Constantes, configuración

**Regla:** Si un módulo supera 200 líneas, dividirlo

### 4. Técnicas de Performance

**Event Delegation:**
- Un solo listener en el documento, no uno por elemento
- Mejora performance con muchos elementos interactivos

**Lazy Loading y Code Splitting:**
- Cargar módulos solo cuando se necesiten
- Usar dynamic import()
- Lazy load imágenes con Intersection Observer

**Constantes centralizadas:**
- API_URL, configuraciones, breakpoints
- Facilita mantenimiento y cambios

### 5. Librerías Específicas 2026: Sí/No

**✅ USAR (solo si realmente necesitas la funcionalidad):**
- Swiper.js para carousels complejos
- GLightbox para galerías
- ❌ ~~AOS para animaciones on-scroll~~ → **Usar CSS Scroll-driven Animations nativas**
- Chart.js para gráficos

**❌ NO USAR:**
- jQuery (usa fetch() y querySelector())
- Moment.js (usa date-fns o Intl.DateTimeFormat)
- Lodash completo (importa solo funciones específicas)
- **AOS o librerías scroll parallax** (usar CSS nativo)

---

## 🔍 SEO: Básico vs Avanzado

### ✅ SIEMPRE (Todos los proyectos)

**Meta tags esenciales:**
- title único por página (50-60 caracteres)
- meta description (150-160 caracteres)
- charset UTF-8
- viewport
- canonical link si hay riesgo de duplicados

**Semántica HTML:**
- header, main, footer, nav
- h1 único por página (jerarquía h1 > h2 > h3)
- article para contenido independiente
- alt descriptivo en TODAS las imágenes

**URLs limpias:**
- ✅ /sobre-nosotros
- ❌ /page?id=2
- Sin guiones bajos, usar guiones medios
- Sin caracteres especiales

**Open Graph:**
- og:title, og:description, og:image, og:url
- Imagen OG: 1200x630px, menos de 200KB

### 💡 CONDICIONAL (Tipo B/C)

**Sitemap XML:**
- Automatizado con framework (Next.js, Nuxt)
- Manual si más de 10 páginas y HTML estático

**Structured Data (JSON-LD):**
- Schema.org types: WebPage, Article, Product, etc.
- Validar con schema.org validator

**Performance es SEO:**
- Google prioriza Core Web Vitals en ranking
- LCP, INP, CLS son factores directos

### Por Tipo de Proyecto

**Tipo A:**
- Meta tags básicos
- HTML semántico
- Open Graph

**Tipo B:**
- Tipo A +
- Sitemap XML
- JSON-LD básico
- Robots.txt

**Tipo C:**
- Tipo B +
- Schema.org avanzado
- Estrategia de contenido
- Internal linking automático
- Tipo A: OG básico (title, description, image)
- Tipo B/C: + og:type, article:published_time, etc.

---

## 🖼️ Imágenes y Multimedia

### 1. Formatos por Uso (ACTUALIZADO 2026)

**Fotografías / Imágenes complejas:**
1. **AVIF** (mejor comprensión, soporte 95%+ en 2026)
2. **WebP** (fallback, soporte universal)
3. **JPEG** (fallback legacy, cada vez menos necesario)

**Gráficos / Ilustraciones / Logos:**
1. SVG (siempre que sea posible)
2. WebP (si SVG no funciona)
3. PNG (solo si necesitas transparencia + soporte viejo)

**Animaciones:**
1. **CSS Scroll-driven Animations** (preferido, nativo)
2. CSS animations tradicionales
3. Lottie (JSON, ligero)
4. GIF (último recurso, pesado)

### 2. Dimensiones y Compresión

**Hero images:**
- Desktop: 1920x1080 (Full HD max)
- Mobile: 800x600
- Compresión: AVIF 85% quality o WebP 85%

**Thumbnails:**
- 400x300 max
- Compresión: 70% quality

**Optimización:**
- Herramientas: Squoosh.app, TinyPNG, ImageOptim
- Target: menos de 200KB por imagen
- Ideal: menos de 100KB para above-the-fold

### 3. Responsive Images

**✅ Usa picture + srcset SI:**
- Imagen ocupa más del 50% del viewport
- Tienes versiones mobile/desktop diferentes
- Hero images, featured images

**❌ NO uses srcset si:**
- Imagen es pequeña (menos de 200px de ancho)
- Es un logo o ícono
- Complejidad no justifica beneficio

### 4. Lazy Loading

**✅ SIEMPRE lazy load:**
- Imágenes below the fold (no visibles inicialmente)
- Galerías con 10+ imágenes
- Thumbnails de productos

**❌ NUNCA lazy load:**
- Logo del sitio
- Hero image (primera imagen visible)
- Imágenes críticas above the fold
- Imágenes de LCP (Largest Contentful Paint)

**Implementación:**
- Atributo `loading="lazy"` (nativo, sin librerías)
- Intersection Observer para control avanzado

### 5. Videos

**Videos de fondo (hero video):**
- Autoplay, muted, loop, playsinline
- Versión móvil más ligera (menos de 2MB)
- Fallback a imagen estática en conexiones lentas
- Poster obligatorio para fallback
- Incluir transcripción o captions (accesibilidad)

**Videos de contenido:**
- Lazy load con poster (preload="none")
- NO autoplay con audio (molesto, consume datos)

**Compatibilidad iOS/Safari crítica:**

**Problema:** iOS Safari bloquea autoplay por políticas de batería/datos

**Solución:**
- Atributos obligatorios: playsinline, muted, poster
- JavaScript para forzar reproducción tras interacción usuario
- Detectar iOS/Safari específicamente
- Poster optimizado (AVIF/WebP, 1280x720, menos de 150KB)
- Alternativa: Mostrar solo imagen estática en iOS si video no es crítico

**Checklist compatibilidad:**
- [ ] Video tiene playsinline attribute
- [ ] Video tiene muted attribute
- [ ] Poster existe y ruta correcta
- [ ] Poster es AVIF/WebP optimizado (menos de 150KB)
- [ ] JavaScript detecta iOS/Safari
- [ ] Intentos de reproducción con catch() para errores
- [ ] Poster se ve correctamente si video falla
- [ ] Probado en Safari desktop y iPhone real
- [ ] Video no pesa más de 5MB

### 6. OG Images: Reutilización Inteligente

**Tipo A (Simple):**
- 1 imagen genérica del sitio (1200x630px)
- Misma para todas las páginas
- Peso: menos de 200KB

**Tipo B (Inteligente):**
- 1 imagen base con texto dinámico vía CSS/URL transforms
- Herramienta: Cloudinary (transforma URL con texto)
- Alternativa sin herramienta: 3-5 imágenes template (home, blog, servicios)
- NO una por cada artículo individual

**Tipo C (Avanzado):**
- Generación dinámica por artículo/producto
- Herramienta: Vercel OG, Cloudinary, API custom

**Solución práctica Tipo B:**
- Cloudinary gratuito: 25 GB storage
- 1 imagen física, infinitas variaciones vía URL
- Sin rebuild de imágenes

---

## ⚡ Performance y Optimización

### 🔴 ACTUALIZACIÓN 2026: Core Web Vitals

**Métricas Críticas (Google Ranking Factor):**

**✅ INP (Interaction to Next Paint) - MÉTRICA OFICIAL 2026**
- Target: < 200ms
- Qué mide: Latencia de interacciones (clicks, taps, keyboard)
- Cómo optimizar:
  - Minimizar JavaScript en main thread
  - Code splitting agresivo
  - Defer non-critical JS
  - Evitar long tasks (>50ms)

**❌ FID (First Input Delay) - OBSOLETO**
- **IGNORAR COMPLETAMENTE** - Reemplazado por INP en 2024
- Si ves FID en herramientas viejas, actualiza tu stack

**✅ LCP (Largest Contentful Paint)**
- Target: < 2.5s
- Optimizar: Preload hero images, optimizar fonts, CDN

**✅ CLS (Cumulative Layout Shift)**
- Target: < 0.1
- Optimizar: Reservar espacio para imágenes/ads, evitar inserción dinámica

**Herramienta oficial:** Lighthouse + Chrome User Experience Report

### 1. Lazy Loading: Matriz de Decisión

**Imágenes:**
- ✅ Lazy load: below the fold, galerías, thumbnails
- ❌ NUNCA: logo, hero image, above the fold, LCP

**Videos:**
- ✅ Lazy load con poster
- ❌ NUNCA autoplay con audio

**JavaScript:**
- ✅ Code splitting: módulos grandes, funcionalidad opcional
- ❌ NO: si JS total pesa menos de 50KB

### 2. Caché: Estrategia Pragmática

**Nivel 1: Browser Cache (Headers HTTP) - SIEMPRE**

**Assets estáticos (CSS/JS/imágenes):**
- Cache-Control: public, max-age=31536000, immutable
- 1 año porque usas versioning (style.v2.css)

**HTML:**
- Cache-Control: no-cache
- Fuerza revalidación, pero permite caché

**Fonts:**
- Cache-Control: public, max-age=31536000

**API responses:**
- Cache-Control: private, max-age=300
- 5 minutos para datos que cambian poco

**Nivel 2: Service Workers (PWA)**
- ✅ Usar solo si: offline-first, contenido estable, Tipo C
- ❌ NO: sitio simple (Tipo A/B), sin necesidad offline

**Nivel 3: CDN**
- ✅ Usar si: tráfico mayor a 10,000 visitas/mes, audiencia internacional, assets pesados
- ❌ NO: Tipo A con menos de 1,000 visitas/mes, audiencia 100% local

**Opciones CDN gratuitas:**
- Cloudflare (free tier generoso)
- Netlify/Vercel (si hostas con ellos)

### 3. Fuentes (Web Fonts) - ACTUALIZADO 2026

**🔴 CAMBIO CRÍTICO: SIEMPRE Self-Hosted**

**❌ NO USAR Google Fonts CDN:**
- Problema GDPR (third-party tracking)
- Problema performance (extra DNS lookup, latencia)
- Problema privacidad (IP del usuario enviada a Google)

**✅ USAR Self-Hosted Fonts:**

**Opción 1: next/font (Next.js)**
```javascript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
// Automáticamente self-hosted, optimizado, subsetting
```

**Opción 2: @fontsource (npm)**
```bash
npm install @fontsource/inter
```
```javascript
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
```

**Opción 3: Manual**
- Descargar WOFF2 de Google Fonts
- Subir a `/public/fonts/`
- @font-face en CSS

**Reglas 2026:**
- Máximo 2 familias (heading + body)
- Máximo 4 variantes (regular, italic, bold, bold-italic)
- Formato: WOFF2 exclusivamente (mejor compresión)
- Font subsetting automático (solo caracteres usados)
- font-display: swap (muestra texto inmediatamente)

**❌ NUNCA:**
- Fuentes mayores a 100KB por variante
- Más de 6 variantes totales
- font-display: block (texto invisible hasta cargar)
- **Google Fonts CDN** (ya no es best practice en 2026)

### 4. Renderizado (SSR vs CSR vs SSG)

**Mapa de Decisión:**

¿Contenido cambia frecuentemente?
- NO → SSG (Static Site Generation)
  - Blog, portafolio, landing pages
  - Frameworks: Astro, 11ty, Next.js (export)
  - Ventajas: SEO perfecto, máxima velocidad, hosting barato
  - Desventajas: Rebuild para cambios

- SÍ → ¿Requiere datos del usuario?
  - NO → SSR (Server-Side Rendering)
    - Contenido personalizado, cambios frecuentes pero SEO crítico
    - Frameworks: Next.js, Nuxt, SvelteKit
    - Ventajas: SEO + contenido dinámico
    - Desventajas: Servidor necesario, más caro
  
  - SÍ → CSR (Client-Side Rendering)
    - Aplicación web (dashboard, SaaS)
    - SEO no prioritario, todo tras login
    - Frameworks: React SPA, Vue SPA
    - Ventajas: Interactividad máxima
    - Desventajas: SEO pobre, loading inicial lento

**Para la Mayoría (Tipo A/B):**

**RECOMENDACIÓN: HTML estático + JavaScript progresivo**
1. Escribe HTML normal
2. Agrega CSS (Tailwind recomendado)
3. Agrega JS solo para interactividad (menú, slider)
4. No uses framework si no necesitas SPA

---

## 🌐 Hosting por Tipo

### Tipo A (Landing/Portafolio)

**✅ GRATIS (Recomendado 2026):**
- **Vercel** (favorito para Next.js)
- **Netlify** (favorito para SSG)
- **Cloudflare Pages** (favorito para velocidad global)
- GitHub Pages (limitado pero funcional)

**Todos incluyen:**
- SSL gratis (Let's Encrypt)
- Deploy automático con Git
- CDN global
- Dominio custom
- Edge functions (serverless)

**❌ PROHIBIDO en 2026:**
- 000webhost
- InfinityFree
- Hostings PHP compartidos gratuitos
- **Razón**: Vectores de malware conocidos, seguridad terrible, performance pésima

### Tipo B (Corporativo/Blog)

**Opciones Recomendadas:**
- Vercel/Netlify (tier Pro si > 100GB bandwidth)
- Cloudflare Pages + Workers
- DigitalOcean App Platform ($12/mes)

### Tipo C (App Web/E-commerce)

**Opciones Profesionales:**
- Vercel Pro ($20/mes) - Next.js optimizado
- Railway ($5-20/mes) - Full-stack apps
- Fly.io - Edge deployment global
- DigitalOcean/AWS/GCP - Si necesitas control total

---

## 🧪 Testing por Tipo

### Tipo A (Landing/Portafolio)

**✅ Manual testing:**
- [ ] Chrome, Firefox, Safari (desktop)
- [ ] 2 dispositivos móviles reales (tu teléfono + otro)
- [ ] Lighthouse: Performance, Accessibility, SEO > 90
- [ ] axe DevTools: 0 errores críticos
- [ ] Navegación solo con teclado funciona

### Tipo B (Corporativo/Blog)

**✅ Tipo A +**
- [ ] Formularios: Envío real + validación
- [ ] Links: Broken Link Checker (extensión)
- [ ] Cross-browser: BrowserStack trial o LambdaTest
- [ ] Velocidad real: WebPageTest (3 ubicaciones geográficas)
- [ ] WAVE: 0 errores accesibilidad

### Tipo C (App Web/E-commerce)

**✅ Tipo B +**

**Automatizado (MÍNIMO VIABLE 2026):**
- [ ] **Type Checking**: TypeScript strict mode
- [ ] **Lógica Crítica**: Vitest para utils, helpers, business logic
- [ ] **E2E (User Flows Críticos)**: Playwright
  - Login/Logout
  - Checkout process (si e-commerce)
  - Formularios principales
- [ ] **Accesibilidad automática**: @axe-core/playwright
- [ ] **Performance continua**: Lighthouse CI en cada deploy

**CI/CD Pipeline:**
1. Commit → GitHub Actions
2. Type check + Lint
3. Run unit tests (Vitest)
4. Build + Deploy a staging
5. E2E tests en staging (Playwright)
6. Lighthouse CI (bloquea si score < 85)
7. Deploy a producción si todo pasa

**Herramientas:**
- Vitest: github.com/vitest-dev/vitest (reemplaza Jest, más rápido)
- Playwright: playwright.dev
- Lighthouse CI: github.com/GoogleChrome/lighthouse-ci
- GitHub Actions workflows (gratis para repos públicos)

---

## 🔒 Seguridad Básica

### 🔴 ACTUALIZACIÓN 2026: Seguridad Innegociable

**PRINCIPIO FUNDAMENTAL:**
La simplicidad NUNCA justifica la inseguridad. Estos son requisitos mínimos absolutos.

### Nivel Mínimo (Todos los Proyectos)

**✅ HTTPS:**
- Certificado SSL (gratis con Let's Encrypt)
- Forzar HTTPS (redirect de HTTP)
- HSTS header (ver abajo)

**✅ Headers de Seguridad (OBLIGATORIO 2026):**

```nginx
# Configuración mínima en producción
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Cómo implementar:**
- Vercel/Netlify: `vercel.json` o `netlify.toml`
- Next.js: `next.config.js` headers
- Nginx/Apache: configuración server

**Herramienta de verificación:** securityheaders.com

**✅ Content Security Policy (CSP) - Nivel Básico:**

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
```

**Herramienta para generar CSP:** csp-evaluator.withgoogle.com

### Validación de Formularios (CRÍTICO)

**🔴 PATRÓN 2026: Validación Isomórfica**

**❌ NUNCA confiar solo en validación cliente:**
```javascript
// MAL - Solo frontend
if (email.includes('@')) { submitForm() }
```

**✅ Validación Isomórfica con Zod:**

```typescript
// schemas/user.ts - DEFINIR UNA VEZ
import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Debes ser mayor de edad')
});

// Frontend - Validación instantánea UX
import { userSchema } from './schemas/user';

const result = userSchema.safeParse(formData);
if (!result.success) {
  showErrors(result.error.issues);
}

// Backend - Validación SEGURA
import { userSchema } from './schemas/user';

export async function POST(req) {
  try {
    const validated = userSchema.parse(await req.json());
    // validated está garantizado correcto
  } catch (error) {
    return Response.json({ error: error.issues }, { status: 400 });
  }
}
```

**✅ Sanitización de Inputs (XSS Prevention):**

```javascript
import DOMPurify from 'isomorphic-dompurify';

// Cualquier contenido generado por usuario
const clean = DOMPurify.sanitize(userInput);
```

**✅ Rate Limiting (Anti-spam/DDoS básico):**
- Cloudflare (automático en tier gratuito)
- Vercel Edge Functions con rate limit
- Express: express-rate-limit middleware

**✅ CSRF Protection:**
- Next.js: CSRF tokens automáticos con Server Actions
- Frameworks tradicionales: csurf middleware
- SameSite cookies: `SameSite=Strict`

### Nivel Medio (Tipo B/C)

**✅ Autenticación:**
- **NUNCA almacenes passwords en plaintext**
- Usar bcrypt/argon2 para hashing (mínimo 12 rounds)
- Implementar rate limiting en login (3 intentos / 15 min)
- 2FA opcional para Tipo C crítico

**✅ Dependencias:**
- Revisar vulnerabilidades: `npm audit` / Snyk
- Actualizar librerías cada 3 meses
- Usar Dependabot/Renovate para PRs automáticos

**✅ Secrets Management:**
- Variables de entorno: `.env.local` (NUNCA commitear)
- Validar env vars en runtime con Zod
- Rotar secrets cada 90 días
- Usar servicios: Vercel Secrets, Railway Variables

### ❌ NO Hagas (Errores Comunes)

- ❌ Exponer API keys en código frontend
- ❌ Confiar en validación client-side únicamente
- ❌ Usar MD5 o SHA1 para passwords
- ❌ Permitir file uploads sin validación + scanning
- ❌ No sanitizar inputs de usuario (XSS vector)
- ❌ Usar Google Fonts CDN sin consent (GDPR)
- ❌ No implementar rate limiting en endpoints públicos

---

## 📊 Analytics y Tracking

### 📈 Qué Medir Siempre

**✅ Esencial (todos los proyectos):**
- Pageviews
- Sessions
- Bounce rate
- Top pages
- Traffic sources

**Herramienta mínima:**
- Google Analytics 4 (GA4) o
- Plausible (privacy-friendly, más simple, no requiere cookie banner)

### 🎯 Eventos Personalizados

**✅ Trackear solo si importa para tu negocio:**
- Click en CTA principal
- Envío de formulario
- Descarga de archivo
- Video reproducido (si es clave)

**❌ NO trackees:**
- Cada click en cada botón
- Scroll depth (salvo caso muy específico)
- Mouse movements (overkill)

### 🔐 GDPR / Privacidad

**✅ SIEMPRE:**
- Cookie banner si usas tracking con cookies
- Opción de opt-out
- Política de privacidad visible

**Alternativa simple (Recomendada 2026):**
- Usa **Plausible** o **Fathom** (no cookies, GDPR-compliant)
- No necesitas banner
- Datos en EU, privacidad por diseño

---

## ✅ Checklist de Lanzamiento

### 🔴 Fase 1: CRÍTICO (No negociable - Bloquea Deploy)

**1. Accesibilidad mínima:**
- [ ] Alt textos descriptivos en imágenes
- [ ] Contraste de color 4.5:1 (texto normal)
- [ ] Navegación por teclado funciona
- [ ] axe DevTools: 0 errores críticos

**2. HTML semántico correcto:**
- [ ] header, main, footer, nav
- [ ] H1-H6 jerárquicamente correctos
- [ ] Formularios con label asociados

**3. Meta tags básicos:**
- [ ] title único por página
- [ ] meta description
- [ ] meta viewport

**4. Responsive mobile-first:**
- [ ] Funciona en móvil real (tu teléfono)
- [ ] Touch targets ≥ 44x44px

**5. HTTPS configurado**

**6. 🔴 Core Web Vitals 2026 (ACTUALIZADO):**
- [ ] LCP < 2.5s
- [ ] **INP < 200ms** (métrica oficial 2026)
- [ ] CLS < 0.1

**7. 🔴 Seguridad Básica 2026:**
- [ ] Headers de seguridad configurados (HSTS, X-Frame-Options)
- [ ] CSP básico implementado
- [ ] Validación server-side en TODOS los formularios
- [ ] Inputs sanitizados (DOMPurify)
- [ ] Secrets en variables de entorno (no en código)

### 💡 Fase 2: IMPORTANTE (Antes de lanzamiento público)

**1. SEO optimizado:**
- [ ] Sitemap XML (si >10 páginas)
- [ ] Robots.txt
- [ ] JSON-LD (WebPage o schema específico)
- [ ] Open Graph images (AVIF/WebP, <200KB)

**2. Performance avanzada:**
- [ ] Lazy loading imágenes (`loading="lazy"`)
- [ ] Imágenes optimizadas (AVIF > WebP > JPEG)
- [ ] **Fuentes self-hosted** (next/font o @fontsource)
- [ ] Lighthouse Performance > 90

**3. Analytics básico implementado**
- [ ] Plausible/Fathom (privacy-friendly) o GA4
- [ ] Eventos críticos configurados

**4. Pruebas cross-browser:**
- [ ] Chrome, Firefox, Safari
- [ ] 2 dispositivos móviles reales

**5. Testing Tipo C:**
- [ ] Type checking (TypeScript)
- [ ] Unit tests (Vitest) en lógica crítica
- [ ] E2E (Playwright) en flujos principales

### 🟢 Fase 3: MEJORAS (Post-lanzamiento - Solo si proyecto justifica)

**1. Performance extrema:**
- [ ] Service Workers / PWA
- [ ] Advanced caching strategies
- [ ] CDN para assets

**2. Monitoreo avanzado:**
- [ ] Sentry / LogRocket (error tracking)
- [ ] Real User Monitoring (RUM)
- [ ] Uptime monitoring

**3. Testing automatizado completo:**
- [ ] Visual regression tests
- [ ] A/B testing
- [ ] Lighthouse CI en pipeline

**4. Optimizaciones avanzadas:**
- [ ] Personalización por usuario
- [ ] Edge computing
- [ ] Database optimization

---

## 🔄 Evolución del Proyecto

### Re-evaluación Continua

**Tu proyecto NO es estático. Re-evalúa cada 3-6 meses.**

### 📦 Señales de que tu Tipo A → Tipo B

**Indicadores:**
- [ ] Pasaste de 5 a 10+ páginas
- [ ] Traffic creció >1,000 visitas/mes
- [ ] Agregaste blog o sección de noticias
- [ ] Clientes piden features nuevas constantemente
- [ ] Pasas >2 horas/semana actualizando contenido

**Acción:**
1. Migra de hosting gratis a pago ($5/mes)
2. Implementa sitemap XML
3. Considera CMS (WordPress, Strapi, Sanity)
4. Agrega analytics más robusto
5. Implementa proceso de deploy automatizado

### 📦 Señales de que tu Tipo B → Tipo C

**Indicadores:**
- [ ] Traffic >50,000 visitas/mes
- [ ] Necesitas login/autenticación de usuarios
- [ ] Datos dinámicos por usuario
- [ ] Múltiples roles (admin, editor, usuario)
- [ ] Features complejas (carrito, dashboard, reportes)

**Acción:**
1. Migra a framework (Next.js App Router, Nuxt, SvelteKit)
2. Implementa base de datos real (no solo archivos)
3. Backend API robusto
4. CDN para assets estáticos
5. Monitoreo y logging (Sentry, LogRocket)
6. Tests automatizados (E2E + Unit con Vitest)
7. Staging environment separado

### ⚠️ Red Flags de "Sobre-ingeniería Prematura"

**❌ NO escales antes de tiempo si:**
- Implementaste microservicios para 100 usuarios
- Agregaste Kubernetes para un blog
- Usas GraphQL cuando REST basta
- Tienes 5 ambientes de deploy para proyecto personal
- Pasas más tiempo en DevOps que en features

**Regla:** "Escala cuando duela, no antes"

### ✅ Checklist de Re-evaluación Trimestral

**Cada 3 meses, pregúntate:**

**1. ¿Mi stack actual me frena o me ayuda?**
- Frena: Deploy toma >30 min, bugs frecuentes
- Ayuda: Desarrollo fluido, pocos problemas

**2. ¿Mis métricas justifican complejidad adicional?**
- Traffic, conversiones, tiempo de carga
- Usa herramientas: Google Analytics, PageSpeed

**3. ¿Estoy pagando por servicios que no uso?**
- Revisa facturas de hosting, CDN, SaaS
- Cancela lo que no aporta valor medible

**4. ¿Mi código sigue las reglas de este documento?**
- Si no: Refactoriza o documenta por qué no
- Consistencia > perfección

**5. ¿Aparecieron nuevas herramientas mejores?**
- Lee release notes de tus frameworks
- Evalúa migración solo si ROI claro

---

## 🔧 Checklist de Mantenimiento

### Semanal
- [ ] Revisar consola del navegador (errores JS/CSS)
- [ ] Verificar enlaces rotos (404s)
- [ ] Comprobar formularios funcionan

### Mensual

**Auditar tamaño de archivos:**
- [ ] HTML: Idealmente < 100KB sin comprimir
- [ ] CSS: Cada archivo < 50KB
- [ ] JS: Cada módulo < 30KB

**PageSpeed Insights:**
- [ ] Score > 90 en mobile y desktop
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s

**Lighthouse Audit:**
- [ ] Performance > 90
- [ ] Accessibility > 95
- [ ] Best Practices > 95
- [ ] SEO > 95

**CSS Audit:**
- [ ] Buscar CSS inline en HTML
- [ ] Buscar selectores complejos (más de 3 niveles)
- [ ] Eliminar CSS no usado con DevTools Coverage

**JavaScript Audit:**
- [ ] Buscar JS inline en HTML
- [ ] Verificar módulos > 200 líneas (candidatos a división)
- [ ] Comprobar librerías desactualizadas

### Trimestral
- [ ] Actualizar dependencias (npm, CDNs)
- [ ] Re-optimizar imágenes (nuevos formatos)
- [ ] Revisar compatibilidad con navegadores nuevos
- [ ] Backup completo del código
- [ ] Revisar logs de errores (Sentry)
- [ ] Auditar vulnerabilidades (`npm audit`)

---

## 🚨 Red Flags: Qué Evitar

### Señales de Código Desorganizado

**1. HTML > 500 líneas**
- Indica CSS/JS inline o falta de modularización

**2. Múltiples tags style en HTML**
- Todo CSS debe estar en archivos externos

**3. onclick, onload, etc. en HTML**
- Usar event listeners en JavaScript

**4. Archivos CSS > 2000 líneas**
- Dividir por responsabilidad (componentes, secciones)

**5. JavaScript en tags script inline**
- Excepto: inicialización crítica < 5 líneas

**6. Selectores CSS con !important**
- Indica problemas de especificidad

**7. Colores/valores hardcodeados repetidos**
- Usar variables CSS (custom properties)

**8. IDs usados para styling**
- IDs son para JavaScript, clases para CSS

**9. Nombres genéricos: div1, section2, style1**
- Usar nombres descriptivos: .hero-section, .cta-button

**10. Código comentado "por las dudas"**
- Usar control de versiones (Git), eliminar código muerto

---

## 🤖 Instrucciones para IDE Agente

### Cuando Recibas un Proyecto:

**1. Clasifica: ¿Tipo A, B o C?**

**2. Consulta sección correspondiente**

**3. Aplica solo reglas "✅ SIEMPRE"**

**4. Evalúa "💡 CONDICIONAL" caso por caso**

**5. Ignora "❌ NUNCA"**

**6. Antes de sugerir librería/framework:**
- Ejecuta "Proceso de 3 Pasos"
- **EXCEPCIÓN**: Si es para seguridad, la complejidad se justifica

**7. Prioriza: Fase 1 → Fase 2 → Fase 3**

**8. Si dudas → Elige opción más simple**

### Red Flags Automáticos (Rechaza Propuesta):

- ❌ Cambiar codificación de archivos UTF-8 a otra cosa
- ❌ Convertir caracteres especiales (á, ñ, etc.) a entidades HTML sin razón
- ❌ Agregar BOM (Byte Order Mark) a archivos UTF-8
- ❌ React para landing page estática
- ❌ Microservicios para <1000 usuarios
- ❌ GraphQL sin justificación clara
- ❌ Más de 3 librerías para misma funcionalidad
- ❌ Cualquier cosa que agregue >20% complejidad para <10% beneficio
- ❌ Google Fonts CDN (usar self-hosted)
- ❌ Librerías JS para animaciones que CSS puede hacer
- ❌ Validación solo cliente sin server-side

### Al Generar Código:

**⚠️ CODIFICACIÓN UTF-8 (CRÍTICO - PREVENIR MOJIBAKES):**
- **SIEMPRE usar UTF-8** al leer y escribir archivos
- **NUNCA cambiar la codificación** de archivos existentes
- **RESPETAR caracteres especiales** del español (á, é, í, ó, ú, ñ, ¿, ¡)
- **NUNCA convertir** á → &aacute; en HTML (usar UTF-8 directo)
- **VERIFICAR .editorconfig** del proyecto (charset = utf-8)
- **Al editar archivos existentes:**
  1. Leer el archivo completo primero
  2. Preservar la codificación UTF-8 original
  3. Mantener line endings (LF en Unix, CRLF en Windows según proyecto)
  4. No modificar caracteres especiales existentes
- **Archivos con contenido en español:**
  - HTML: meta tags, títulos, descripciones
  - JavaScript: strings con días/meses, mensajes
  - JSON: configuración con texto
  - Email templates: contenido en español

**Separación estricta:**
- HTML limpio, semántico, sin inline styles/scripts
- CSS en archivos externos, modularizado
- JavaScript en archivos externos, modularizado

**Accesibilidad no negociable:**
- Alt textos descriptivos (nunca genéricos)
- HTML semántico correcto
- Navegación por teclado funcional
- Contraste de color verificado

**Seguridad no negociable (2026):**
- Validación isomórfica con Zod
- Sanitización con DOMPurify
- Headers de seguridad configurados
- Secrets en variables de entorno

**Mobile-first siempre:**
- Estilos base = móvil
- Media queries con min-width
- Touch targets ≥ 44px

**CSS Moderno 2026:**
- Usar CSS Nesting nativo
- Usar Container Queries para componentes
- Usar Scroll-driven Animations en lugar de librerías JS

**Variables CSS:**
- Centralizar colores, espaciado, tipografía
- Nunca valores hardcodeados repetidos

**Modularidad:**
- Archivos pequeños, responsabilidad única
- Reutilización sobre duplicación
- Nombres descriptivos

---

## 📚 Recursos de Referencia Rápida

**Performance:**
- web.dev/vitals (Core Web Vitals oficiales)
- pagespeed.web.dev
- webpagetest.org

**SEO:**
- developers.google.com/search/docs
- schema.org

**Accesibilidad:**
- a11yproject.com
- webaim.org (Contrast Checker)
- axe DevTools (extensión navegador)
- WAVE (extensión navegador)

**Compatibilidad:**
- caniuse.com

**Testing:**
- BrowserStack (trial gratuito)
- LambdaTest (100 min/mes gratis)

**Herramientas:**
- Lighthouse (auditoría completa)
- axe DevTools (accesibilidad)
- WebAIM Contrast Checker
- Squoosh.app (optimización imágenes)
- securityheaders.com (verificar headers)

---

## 💬 Conclusión

### Tu Checklist Mental

**Antes de agregar CUALQUIER técnica/librería/optimización:**

```
1. ¿Agrega valor real al usuario?
2. ¿Es la solución más simple posible?
3. ¿Puedo medirlo/testearlo?
4. ¿Lo entenderé en 6 meses?
5. ¿Pasaré menos de 2 horas implementándolo?
6. 🔴 ¿Es necesario para SEGURIDAD? (Si SÍ → implementar siempre)

Si 3+ respuestas son NO (y no es seguridad) → No lo hagas.
```

### Recuerda:

**🧭 La mejor optimización es la que no necesitas hacer.**

**📖 La mejor arquitectura es la que puedes explicar en 5 minutos.**

**📦 El mejor código es el que no escribiste.**

**♿ La accesibilidad no es opcional.**

**📱 Mobile-first no es una sugerencia.**

**🔒 La seguridad no es negociable (nuevo 2026).**

**⚡ INP < 200ms es la métrica que importa (nuevo 2026).**

**🎯 Simplicidad > Complejidad**

---

## 💻 CÓDIGO PRÁCTICO 2026

Esta sección contiene ejemplos copy-paste de las 8 correcciones críticas aplicadas a la guía.

---

### 1️⃣ INP Optimization (Core Web Vitals 2026)

#### ❌ Código Antiguo (optimizando FID)
```javascript
// FID solo medía el primer input
button.addEventListener('click', handleClick); // Optimizado para FID
```

#### ✅ Código 2026 (optimizando INP)
```javascript
// INP mide TODAS las interacciones
// Optimización: usar event delegation + debouncing

// ❌ Mal (cada botón tiene listener)
buttons.forEach(btn => btn.addEventListener('click', handleClick));

// ✅ Bien (un solo listener, mejor INP)
document.addEventListener('click', (e) => {
  if (e.target.matches('.action-button')) {
    handleClick(e);
  }
});

// Para inputs: debounce para mejorar INP
const debouncedSearch = debounce((value) => {
  performSearch(value);
}, 300);

input.addEventListener('input', (e) => debouncedSearch(e.target.value));
```

#### Checklist INP
```markdown
- [ ] INP < 200ms en Lighthouse
- [ ] Event delegation para listas/grids grandes
- [ ] Debouncing en inputs de búsqueda
- [ ] Code splitting para JavaScript pesado
- [ ] Web Workers para operaciones costosas
```

---

### 2️⃣ CSS Nesting Nativo

#### ❌ Código Antiguo (requiere SASS)
```scss
// archivo.scss - requiere compilador
.card {
  padding: 1rem;
  
  .card-title {
    font-size: 1.5rem;
  }
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
}
```

#### ✅ Código 2026 (CSS nativo)
```css
/* archivo.css - funciona en navegador directo */
.card {
  padding: 1rem;
  
  .card-title {
    font-size: 1.5rem;
  }
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
}
```

#### Ejemplo Completo con Variables
```css
:root {
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --primary: #3b82f6;
  --text-primary: #1f2937;
}

.component {
  padding: var(--spacing-md);
  color: var(--text-primary);
  
  .component__header {
    margin-bottom: var(--spacing-sm);
    
    h2 {
      color: var(--primary);
    }
  }
  
  .component__body {
    padding: var(--spacing-md);
    
    p {
      line-height: 1.6;
      
      &:first-child {
        margin-top: 0;
      }
    }
  }
  
  &:hover {
    transform: translateY(-2px);
  }
}
```

---

### 3️⃣ Container Queries

#### ❌ Código Antiguo (Media Queries globales)
```css
/* Componente depende del viewport global */
.card {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }
}
```

**Problema:** La card cambia layout a los 768px de viewport, pero ¿qué pasa si está en un sidebar de 300px en una pantalla de 1920px?

#### ✅ Código 2026 (Container Queries)
```css
/* Componente se adapta a SU contenedor */
.card-container {
  container-type: inline-size;
  container-name: card-wrapper;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Cuando el CONTENEDOR tiene >500px, cambia a horizontal */
@container card-wrapper (min-width: 500px) {
  .card {
    flex-direction: row;
  }
}

@container card-wrapper (min-width: 700px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }
}
```

#### Ejemplo Real: Componente Reutilizable
```html
<!-- Mismo componente funciona en cualquier contexto -->
<div class="sidebar card-container">
  <div class="card"><!-- Se adapta a sidebar estrecho --></div>
</div>

<div class="main-content card-container">
  <div class="card"><!-- Se adapta a contenido ancho --></div>
</div>
```

---

### 4️⃣ Selector `:has()`

#### ❌ Código Antiguo (JavaScript + clases)
```javascript
// JavaScript para agregar clases según contenido
document.querySelectorAll('.card').forEach(card => {
  if (card.querySelector('img')) {
    card.classList.add('card--has-image');
  }
  if (card.querySelector('.badge')) {
    card.classList.add('card--has-badge');
  }
});
```

```css
.card--has-image {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.card--has-badge {
  border-color: gold;
}
```

#### ✅ Código 2026 (CSS puro con `:has()`)
```css
/* Sin JavaScript, lógica 100% CSS */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.card:has(.badge) {
  border-color: gold;
}

/* Combinar condiciones */
.card:has(img):has(.badge) {
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

/* Negación */
.card:not(:has(img)) {
  padding: 2rem;
}
```

#### Casos de Uso Avanzados
```css
/* Form group con input inválido */
.form-group:has(input:invalid) {
  border-color: #ef4444;
  
  label {
    color: #ef4444;
  }
}

/* Lista con checkboxes checked */
.todo-list:has(input[type="checkbox"]:checked) {
  .complete-button {
    display: block;
  }
}

/* Card con botón hover */
.card:has(button:hover) {
  background: #f3f4f6;
}

/* Tabla con fila seleccionada */
tbody:has(tr.selected) {
  .bulk-actions {
    opacity: 1;
    pointer-events: all;
  }
}
```

---

### 5️⃣ CSS Scroll-driven Animations

#### ❌ Código Antiguo (Librería AOS)
```html
<!-- Requiere librería externa ~10KB -->
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>AOS.init();</script>

<div data-aos="fade-up" data-aos-duration="1000">
  Contenido
</div>
```

#### ✅ Código 2026 (CSS nativo, 0KB)
```css
/* Animación al hacer scroll */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-on-scroll {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
```

```html
<!-- Sin JavaScript, solo CSS -->
<div class="reveal-on-scroll">
  Contenido que aparece al hacer scroll
</div>
```

#### Ejemplos Avanzados
```css
/* Parallax scroll nativo */
.parallax-bg {
  animation: parallax linear;
  animation-timeline: scroll();
}

@keyframes parallax {
  to {
    transform: translateY(-100px);
  }
}

/* Progress bar de lectura */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: #3b82f6;
  animation: reading-progress linear;
  animation-timeline: scroll();
  transform-origin: left;
}

@keyframes reading-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Fade in desde diferentes direcciones */
.fade-left {
  animation: fade-left linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

@keyframes fade-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
}
```

---

### 6️⃣ Validación Isomórfica con Zod

#### ❌ Código Antiguo (Validación duplicada)
```javascript
// Cliente (JavaScript)
function validateFormClient(data) {
  if (!data.email || !data.email.includes('@')) {
    return 'Email inválido';
  }
  if (!data.password || data.password.length < 8) {
    return 'Password debe tener 8+ caracteres';
  }
  return null;
}

// Servidor (misma lógica duplicada)
function validateFormServer(data) {
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Email inválido');
  }
  if (!data.password || data.password.length < 8) {
    throw new Error('Password debe tener 8+ caracteres');
  }
}
```

**Problema:** Lógica duplicada, fácil desincronización.

#### ✅ Código 2026 (Zod isomórfico)
```javascript
// shared/schemas.js (compartido cliente + servidor)
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email requerido'),
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe incluir mayúscula')
    .regex(/[0-9]/, 'Debe incluir número'),
});

export const productSchema = z.object({
  name: z.string().min(3).max(100),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  category: z.enum(['electronics', 'clothing', 'books']),
});
```

```javascript
// Cliente (React/Vue/etc)
import { loginSchema } from './shared/schemas';

function handleSubmit(formData) {
  const result = loginSchema.safeParse(formData);
  
  if (!result.success) {
    // Mostrar errores
    console.log(result.error.issues);
    return;
  }
  
  // Enviar datos validados
  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(result.data)
  });
}
```

```javascript
// Servidor (Node/Next.js/etc)
import { loginSchema } from './shared/schemas';

export async function POST(request) {
  const body = await request.json();
  
  // Misma validación, sin duplicar código
  const result = loginSchema.safeParse(body);
  
  if (!result.success) {
    return Response.json(
      { errors: result.error.issues },
      { status: 400 }
    );
  }
  
  // Procesar con datos validados y tipados
  const { email, password } = result.data;
}
```

#### Ventajas con TypeScript
```typescript
import { z } from 'zod';

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  age: z.number().optional(),
});

// Type inference automático
type User = z.infer<typeof userSchema>;
// → equivale a: { id: string; name: string; age?: number }

// Uso con autocomplete total
function processUser(data: User) {
  console.log(data.name); // ✅ TypeScript sabe que existe
  console.log(data.invalid); // ❌ Error en compile time
}
```

---

### 7️⃣ Self-Hosted Fonts

#### ❌ Código Antiguo (Google Fonts CDN)
```html
<head>
  <!-- Envía IP del usuario a Google -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
</head>
```

**Problemas:**
- ❌ GDPR violation (envía IPs sin consent)
- ❌ DNS lookup adicional (~200ms)
- ❌ Sin control de cache
- ❌ Descarga caracteres no usados

#### ✅ Código 2026 Opción 1: Next.js

```javascript
// app/layout.js
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* globals.css */
body {
  font-family: var(--font-inter), sans-serif;
}

code {
  font-family: var(--font-mono), monospace;
}
```

#### ✅ Código 2026 Opción 2: @fontsource (Universal)

```bash
npm install @fontsource/inter
```

```javascript
// main.js o app.js
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'

// Subsetting específico (solo latin)
import '@fontsource/inter/400-latin.css'
```

```css
body {
  font-family: 'Inter', sans-serif;
}
```

#### Performance Comparison
```
Google Fonts CDN:
1. DNS lookup fonts.googleapis.com (~150ms)
2. Download CSS (~50ms)
3. DNS lookup fonts.gstatic.com (~150ms)
4. Download WOFF2 (~200ms)
Total: ~550ms

Self-hosted (next/font):
1. Download WOFF2 from same domain (~150ms)
Total: ~150ms

Mejora: ~400ms en LCP
```

---

### 8️⃣ Next.js App Router

#### ❌ Código Antiguo (Pages Router - Deprecated)
```javascript
// pages/blog/[slug].js
import { useRouter } from 'next/router'

export default function BlogPost({ post }) {
  const router = useRouter()
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  
  return <article>{post.content}</article>
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug)
  return { props: { post } }
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts()
  return {
    paths: posts.map(p => ({ params: { slug: p.slug }})),
    fallback: true
  }
}
```

#### ✅ Código 2026 (App Router)
```javascript
// app/blog/[slug]/page.js

// Server Component por defecto (sin 'use client')
export default async function BlogPost({ params }) {
  // Fetch directo en componente, sin getStaticProps
  const post = await fetchPost(params.slug)
  
  return <article>{post.content}</article>
}

// Genera paths en build time
export async function generateStaticParams() {
  const posts = await fetchAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

// Metadata para SEO
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}
```

#### Layouts (Nueva característica App Router)
```javascript
// app/blog/layout.js
export default function BlogLayout({ children }) {
  return (
    <div>
      <BlogSidebar />
      <main>{children}</main>
    </div>
  )
}
```

#### Loading States (Built-in)
```javascript
// app/blog/[slug]/loading.js
export default function Loading() {
  return <BlogPostSkeleton />
}
```

#### Error Boundaries (Built-in)
```javascript
// app/blog/[slug]/error.js
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Error al cargar post</h2>
      <button onClick={reset}>Reintentar</button>
    </div>
  )
}
```

#### Server Actions (Game changer)
```javascript
// app/blog/[slug]/page.js
'use server'

async function likePost(postId) {
  await db.posts.update({
    where: { id: postId },
    data: { likes: { increment: 1 }}
  })
  revalidatePath(`/blog/${postId}`)
}

export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug)
  
  return (
    <article>
      {post.content}
      <form action={likePost.bind(null, post.id)}>
        <button type="submit">❤️ {post.likes}</button>
      </form>
    </article>
  )
}
```

---

## 🎯 Checklist Pre-Deploy 2026

```markdown
### Performance
- [ ] INP < 200ms (no FID)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Fonts self-hosted
- [ ] Imágenes en AVIF + fallback WebP

### CSS Moderno
- [ ] CSS nesting nativo (sin SASS si no es necesario)
- [ ] Container Queries para componentes
- [ ] Selector :has() en lugar de JavaScript
- [ ] Scroll animations nativas (sin AOS)

### Frameworks
- [ ] Next.js 15+ App Router (no Pages Router)
- [ ] React 19+ con Server Components
- [ ] Validación con Zod isomórfica

### Seguridad
- [ ] Validación server-side siempre
- [ ] CSP headers configurados
- [ ] HTTPS forzado
- [ ] Rate limiting en formularios

### Accesibilidad
- [ ] Lighthouse Accessibility > 95
- [ ] Navegación por teclado funcional
- [ ] Contraste 4.5:1 mínimo
- [ ] Alt textos descriptivos
```

---

## 📊 MATRIZ DE CORRECCIONES

### Resumen de las 8 Correcciones Críticas Aplicadas

#### ✅ CORRECCIÓN 1: Core Web Vitals - FID → INP

**Ubicación:** Checklist de Lanzamiento, Fase 1

**Cambio:**
```diff
- [ ] FID < 100ms
+ [ ] INP < 200ms (reemplazó FID en 2024)
```

**Razón:** Google reemplazó oficialmente FID (First Input Delay) por INP (Interaction to Next Paint) como Core Web Vital en marzo 2024. FID medía solo el delay del primer input; INP mide la responsividad completa de todas las interacciones durante la vida de la página.

**Impacto:** **CRÍTICO** - Optimizar FID en 2026 es optimizar una métrica obsoleta que ya no afecta el ranking de Google.

---

#### ✅ CORRECCIÓN 2: CSS Nesting Nativo

**Ubicación:** Sección CSS Moderno 2026

**Razón:** En 2026, todos los navegadores modernos soportan CSS nesting nativo. Los preprocesadores ya no son necesarios para esta funcionalidad básica, reduciendo dependencias del build process.

**Impacto:** **IMPORTANTE** - Simplifica stack tecnológico para proyectos Tipo A/B. Elimina dependencia de SASS/LESS/PostCSS para nesting.

---

#### ✅ CORRECCIÓN 3: Container Queries

**Ubicación:** Sección CSS Moderno 2026

**Razón:** Container Queries tienen soporte universal desde 2024. Permiten componentes verdaderamente reutilizables que se adaptan a su contenedor, no al viewport global. Esto es fundamental para arquitecturas de componentes modernas.

**Impacto:** **IMPORTANTE** - Mejora drásticamente la reutilización de componentes. Reemplaza hacks con JavaScript o clases utilitarias complejas.

---

#### ✅ CORRECCIÓN 4: Selector `:has()`

**Ubicación:** Sección CSS Moderno 2026

**Razón:** El selector `:has()` tiene soporte universal desde 2023. Permite lógica condicional compleja en CSS puro, eliminando JavaScript para muchos casos de uso comunes (estados, variantes de componentes).

**Impacto:** **IMPORTANTE** - Reduce dependencia de JavaScript para lógica visual. Mejora performance y simplifica código.

---

#### ✅ CORRECCIÓN 5: Animaciones Scroll Nativas

**Ubicación:** Sección CSS Moderno 2026

**Cambio:**
```diff
- AOS para animaciones on-scroll
+ CSS Scroll-driven Animations (nativo 2026, sin JS)
```

**Razón:** Las CSS Scroll-driven Animations son nativas en todos los navegadores modernos desde 2023-2024. La librería AOS (Animate On Scroll) ya no es necesaria y agrega peso innecesario.

**Impacto:** **IMPORTANTE** - Elimina dependencia JavaScript de ~10KB. Mejora performance (animaciones en GPU thread nativo). Simplifica mantenimiento.

---

#### ✅ CORRECCIÓN 6: Validación Isomórfica con Zod

**Ubicación:** Sección Seguridad Básica > Formularios

**Razón:** La validación duplicada (cliente y servidor por separado) es propensa a errores de sincronización. Zod y TypeBox permiten definir esquemas de validación una sola vez y usarlos isomórficamente, garantizando consistencia.

**Impacto:** **IMPORTANTE** - Elimina bugs por validaciones desincronizadas. Reduce código duplicado. Mejora type-safety con TypeScript.

---

#### ✅ CORRECCIÓN 7: Self-Hosted Fonts (GDPR + Performance)

**Ubicación:** Sección Performance / Tipografía

**Razón:** Usar Google Fonts CDN en 2026 viola GDPR (envía IP de usuarios a Google sin consent explícito) y es más lento que self-hosting optimizado. Herramientas modernas como `next/font` y `@fontsource` automatizan el subsetting y optimización.

**Impacto:** **IMPORTANTE** - Compliance legal (GDPR). Mejora LCP (Largest Contentful Paint) al eliminar DNS lookup externo. Control total sobre caching.

---

#### ✅ CORRECCIÓN 8: Next.js App Router (2026)

**Ubicación:** Sección Frameworks / Hosting

**Cambios:**
- Next.js Pages Router → Next.js 15+ App Router
- getStaticProps/getStaticPaths → generateStaticParams
- useRouter → params directo en Server Components

**Razón:** Next.js Pages Router fue marcado como "legacy" en 2024. App Router es el estándar oficial con mejor performance (Server Components, streaming SSR, optimizaciones automáticas). En 2026, usar Pages Router es técnica obsoleta.

**Impacto:** **IMPORTANTE** - Evita usar arquitectura deprecated. App Router reduce bundle size ~40% con Server Components. Mejor experiencia de desarrollo (layouts, loading states, error boundaries nativos).

---

### 📊 Resumen de Prioridades

#### CRÍTICAS (Implementar inmediatamente)
1. ✅ **INP vs FID** - Métrica oficial Google 2024+
2. ✅ **Animaciones Scroll Nativas** - Elimina dependencia JavaScript
3. ✅ **Validación Isomórfica** - Previene bugs de seguridad

#### IMPORTANTES (Implementar en proyectos nuevos)
4. ✅ **CSS Nesting Nativo** - Simplifica stack
5. ✅ **Container Queries** - Componentes reutilizables
6. ✅ **Selector :has()** - Lógica CSS avanzada
7. ✅ **Self-Hosted Fonts** - GDPR + Performance
8. ✅ **Next.js App Router** - Estándar 2026

---

### 🎯 Impacto Total

Con estas 8 correcciones, la guía pasa de:
- **9/10** (excelente base filosófica, herramientas 2023-2024)

A:
- **9.8/10** (filosofía sólida + tecnologías estándar 2026)

La guía mantiene su valor principal: **"La complejidad es el enemigo del lanzamiento"** mientras actualiza herramientas específicas que han evolucionado en los últimos 2 años.

---

## ✏️ Implementación Recomendada para Agente IDE en 2026

Para un agente IDE trabajando con esta guía:

1. **Leer la sección "Actualizaciones Críticas 2026" PRIMERO** antes de aplicar cualquier recomendación
2. **Reemplazar automáticamente** menciones obsoletas:
   - FID → INP
   - AOS → CSS Scroll-driven Animations
   - Google Fonts CDN → Self-hosted fonts
   - Pages Router → App Router
3. **Priorizar tecnologías nativas** cuando estén disponibles:
   - CSS nesting sobre SASS/LESS
   - CSS scroll animations sobre librerías JS
   - Selector `:has()` sobre JavaScript para lógica condicional
   - Container Queries para componentes responsive
4. **Mantener filosofía core**: simplicidad, mobile-first, accesibilidad, seguridad

---

**Versión:** 2.0 Completa - Guía + Código Práctico + Correcciones Integradas  
**Última actualización:** Febrero 2026  
**Cambios principales:** Core Web Vitals (INP), CSS nativo moderno, seguridad obligatoria, self-hosted fonts, validación isomórfica, App Router  
**Compatibilidad:** Chrome 120+, Safari 17+, Firefox 120+
