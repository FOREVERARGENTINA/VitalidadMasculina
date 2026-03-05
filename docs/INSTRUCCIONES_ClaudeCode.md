# INSTRUCCIONES PARA CLAUDE CODE — Vitalidad Masculina

## Antes de hacer cualquier cosa, leer en este orden:
1. `docs/AGENTS_VitalidadMasculina.md` → Reglas del proyecto (prioridad máxima)
2. `docs/guia.md` → Principios generales de desarrollo web
3. `docs/INFORME_VitalidadMasculina.md` → Contexto completo del proyecto
4. Este archivo → Tarea concreta

**Regla de conflicto:** Si AGENTS_VitalidadMasculina.md y guia.md dicen cosas distintas, AGENTS_VitalidadMasculina.md gana.

---

## PASO 0 — SETUP INICIAL DEL PROYECTO

Antes de escribir una sola línea de código, configurar el entorno de trabajo.

### 0a. Verificar que existen los docs

Confirmar que están presentes en `docs/`:
- `docs/AGENTS_VitalidadMasculina.md`
- `docs/guia.md`
- `docs/INFORME_VitalidadMasculina.md`

Si falta alguno → detener y avisar.

### 0b. Crear `.claude.md` en la raíz

```markdown
# Claude Code - Vitalidad Masculina

Lee `docs/AGENTS_VitalidadMasculina.md` para decisiones de este proyecto.
Lee `docs/guia.md` para principios generales.
Lee `docs/INFORME_VitalidadMasculina.md` para contexto completo.

**Jerarquía:** AGENTS_VitalidadMasculina.md > guia.md

## Reglas:
- Mobile-first siempre
- Accesibilidad obligatoria
- INP < 200ms
- Validación isomórfica con Zod
- Self-hosted fonts (NO Google Fonts CDN)
- CSS moderno nativo (nesting, :has(), container queries, scroll-driven animations)
- Sin librerías de animación JS

## Zonas Rojas activas:
- No publicar dirección exacta del consultorio (solo "Zona Palermo, CABA")
- No hardcodear WhatsApp, email ni API keys (usar constants.ts y variables de entorno)
- No inventar contenido médico
- No ejecutar deploys

Consultar docs/AGENTS_VitalidadMasculina.md para stack y reglas completas.
```

### 0c. Crear `.github/copilot-instructions.md`

```markdown
# GitHub Copilot Instructions — Vitalidad Masculina

Lee `docs/AGENTS_VitalidadMasculina.md` para decisiones específicas de este proyecto.
Lee `docs/guia.md` para principios generales de desarrollo web.

**Jerarquía:** AGENTS_VitalidadMasculina.md > guia.md > Sugerencias por defecto

## Stack definido (no sugerir alternativas):
- Framework: Astro (static)
- Estilos: Tailwind CSS
- Animaciones: CSS Scroll-driven Animations nativo (sin librerías JS)
- Hosting: Cloudflare Pages
- Formulario: Cloudflare Pages Functions + Resend

## Reglas principales:
- Mobile-first siempre
- Accesibilidad obligatoria (alt descriptivos, contraste 4.5:1)
- Validación isomórfica con Zod (cliente + servidor)
- Self-hosted fonts (NO Google Fonts CDN)
- CSS moderno nativo (nesting, container queries, :has())
- INP < 200ms

## Nunca hacer:
- Sugerir Firebase, Next.js, WordPress, CMS externo
- Hardcodear datos de contacto del médico
- Inventar contenido médico
- Ejecutar deploys
```

### 0d. Crear carpeta `scripts/` y agregar scripts de encoding

Crear `scripts/check-encoding.js` y `scripts/fix-encoding.js` copiando desde `E:\Aideas\FRANDOWEB\AGENTES\scripts\`.

Si `package.json` ya existe, agregar:

```json
{
  "scripts": {
    "check:encoding": "node scripts/check-encoding.js",
    "fix:encoding": "node scripts/fix-encoding.js",
    "fix:encoding:apply": "node scripts/fix-encoding.js --apply",
    "prebuild": "node scripts/check-encoding.js"
  }
}
```

### 0e. Confirmar setup antes de continuar

Mostrar este resumen y esperar confirmación:

```
✅ Setup completo:

📁 Estructura docs/:
   - docs/AGENTS_VitalidadMasculina.md  ✅
   - docs/guia.md                        ✅
   - docs/INFORME_VitalidadMasculina.md  ✅

📄 Archivos de configuración creados:
   - .claude.md                          ✅
   - .github/copilot-instructions.md     ✅
   - scripts/check-encoding.js           ✅
   - scripts/fix-encoding.js             ✅

📦 Scripts npm configurados:
   - npm run check:encoding
   - npm run fix:encoding
   - npm run fix:encoding:apply
   - prebuild hook

⚙️ Stack:
   - Tipo: B (sitio médico multi-página con blog)
   - Framework: Astro (static)
   - Estilos: Tailwind CSS
   - Animaciones: CSS Scroll-driven (nativo)
   - Hosting: Cloudflare Pages
   - Formulario: Pages Functions + Resend

🛑 Zonas Rojas activas:
   - No publicar dirección exacta del consultorio
   - No hardcodear datos de contacto ni API keys
   - No inventar contenido médico
   - No ejecutar deploys

¿Confirmas para continuar con el Paso 1?
```

---

---

## CONTEXTO DEL PROYECTO

Sitio web médico estático multi-página para el Dr. Leandro Mateu.
- Dominio: `vitalidadmasculina.com.ar`
- Stack: **Astro + Tailwind CSS + CSS Scroll-driven Animations (nativo)**
- Hosting: **Cloudflare Pages** (deploy manual, vos no lo ejecutás)
- Formulario: **Cloudflare Pages Functions + Resend**
- Blog: archivos `.md` sin CMS, el dev los agrega manualmente

---

## TAREA: INICIALIZAR EL PROYECTO

### Paso 1 — Scaffold del proyecto Astro

La estructura raíz del proyecto debe quedar así:

```
vitalidad-masculina/
├── docs/
│   ├── AGENTS_VitalidadMasculina.md
│   ├── guia.md
│   └── INFORME_VitalidadMasculina.md
├── scripts/
│   ├── check-encoding.js
│   ├── fix-encoding.js
│   └── README.md
├── src/                           ← generado por Astro
├── public/                        ← generado por Astro
├── functions/                     ← Cloudflare Pages Functions
├── .claude.md                     ← creado en Paso 0
├── .editorconfig
├── .github/
│   └── copilot-instructions.md   ← creado en Paso 0
├── .gitignore
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs
```

Crear el proyecto Astro con:
```
npm create astro@latest . -- --template minimal --typescript strict --no-install
```

Luego instalar dependencias aprobadas:
```
npm install
npm install -D @astrojs/tailwind tailwindcss
npm install @astrojs/sitemap
```

Configurar `astro.config.mjs` con:
- Integración `@astrojs/tailwind`
- Integración `@astrojs/sitemap`
- `site: 'https://www.vitalidadmasculina.com.ar'`
- Output: `static`

---

### Paso 2 — Estructura de carpetas

Crear esta estructura exacta (sin inventar carpetas adicionales):

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Nav.astro
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   └── WhatsAppBtn.astro
│   └── sections/
│       ├── Hero.astro
│       ├── ServiceCard.astro
│       ├── BlogCard.astro
│       ├── ContactForm.astro
│       └── VideoConsultaBanner.astro
├── content/
│   └── blog/
│       └── _placeholder.md     ← archivo vacío para que git trackee la carpeta
├── layouts/
│   ├── Base.astro
│   ├── Page.astro
│   └── Post.astro
├── pages/
│   ├── index.astro
│   ├── sobre-mi.astro
│   ├── disfuncion-erectil.astro
│   ├── eyaculacion-precoz.astro
│   ├── falta-de-deseo.astro
│   ├── terapia-hormonal.astro
│   ├── urologia.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── contacto.astro
├── styles/
│   └── global.css
└── utils/
    └── formatDate.ts

public/
├── fonts/                      ← self-hosted (vacía por ahora)
├── images/                     ← vacía por ahora
└── robots.txt

functions/
└── api/
    └── contact.ts              ← Cloudflare Pages Function
```

---

### Paso 3 — Tokens de diseño

En `src/styles/global.css`, definir estas variables CSS. No inventar colores adicionales:

```css
:root {
  --color-navy:        #1A2A5E;
  --color-navy-dark:   #0F1A3E;
  --color-navy-light:  #E8EBF5;
  --color-gold:        #C9A84C;
  --color-sand:        #D4B896;
  --color-bg:          #FAFAF8;
  --color-text:        #1F1F1F;
  --color-text-muted:  #6B7280;
  --color-white:       #FFFFFF;

  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;

  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;

  --shadow-sm:  0 1px 3px rgba(0,0,0,0.08);
  --shadow-md:  0 4px 16px rgba(26,42,94,0.12);
}
```

Configurar `tailwind.config.mjs` extendiendo estos tokens para usarlos como clases Tailwind.

---

### Paso 4 — Layout Base

`layouts/Base.astro` debe incluir:
- `<html lang="es">`
- Meta charset, viewport
- Props: `title`, `description`, `ogImage` (opcional)
- Open Graph tags básicos
- Canonical URL
- Enlace a `global.css`
- Import de `animations.css`
- Slot para contenido
- Schema.org JSON-LD básico de `MedicalBusiness` (con datos del proyecto)
- **NO usar Google Fonts CDN** — dejar comentario: `<!-- Fonts: self-hosted, pendiente agregar archivos a /public/fonts/ -->`

---

### Paso 5 — Componentes base con placeholders

Crear cada componente con estructura real pero contenido placeholder claramente marcado. Usar este formato para los placeholders:

```
<!-- TODO: [descripción de qué va acá] -->
```

**Header.astro:**
- Logo VM (texto por ahora, SVG placeholder)
- Nav con links a todas las páginas
- Botón CTA "Solicitar consulta" → `/contacto`
- Efecto al scroll: leve sombra (implementar con CSS nativo)

**Footer.astro:**
- Logo
- Links de navegación agrupados
- Datos de contacto (placeholders para WhatsApp y email)
- Ícono Instagram (link `#` por ahora, con comentario TODO)
- Copyright

**WhatsAppBtn.astro:**
- Botón flotante fijo bottom-right
- Número: usar constante `WHATSAPP_NUMBER` definida en un archivo `src/utils/constants.ts`
- Mensaje pre-cargado: `"Hola, quisiera consultar sobre..."`
- Presente en todas las páginas vía Base.astro

**Hero.astro:**
- Imagen de fondo (placeholder con color navy hasta tener imagen real)
- H1 con título principal
- Subtítulo
- Dos CTAs: "Solicitar consulta" + "Ver servicios"
- Animación de entrada con CSS (fade-in + translateY, clase `.reveal`)

**VideoConsultaBanner.astro:**
- Sección destacada mencionando atención por videollamada
- Texto: "Atención por videollamada desde cualquier parte del país"
- Ícono o imagen ilustrativa (placeholder)

---

### Paso 6 — Páginas con contenido real

Las siguientes páginas tienen contenido provisto. Estructurar con H1, H2, H3 correctos, listas donde corresponda, y CTA al final:

**`disfuncion-erectil.astro`** — Contenido disponible:
- Título principal, síntomas, causas, enfoque de tratamiento
- Frase destacada: *"La disfunción eréctil no es solo un problema. Es una señal de que algo en tu salud necesita atención."*

**`eyaculacion-precoz.astro`** — Contenido disponible:
- Definición, cuándo consultar, causas, tratamientos

**`falta-de-deseo.astro`** — Contenido disponible:
- Definición, causas, cuándo consultar, tratamiento

**`terapia-hormonal.astro`** — Contenido disponible:
- Pellets de testosterona: indicaciones, funcionamiento, procedimiento (ambulatorio, 15-20 min, anestesia local, región glútea)

**`urologia.astro`** — Contenido NO disponible:
- Dejar página con placeholder: `<!-- TODO: Contenido a desarrollar con el cliente -->`
- Incluir solo H1 y un párrafo placeholder

**`sobre-mi.astro`** — Datos parciales:
- Nombre: Dr. Leandro Mateu
- Especialidad: pendiente (placeholder)
- Foto: placeholder con imagen Unsplash (usar URL directa de Unsplash hasta tener foto real)
- Mencionar videoconsulta como modalidad disponible

---

### Paso 7 — Blog

**`blog/index.astro`:**
- Grid de cards (3 columnas desktop, 2 tablet, 1 mobile)
- Cada card: imagen destacada, categoría, título H3, excerpt, "Leer más"
- Breadcrumb: Inicio > Blog
- Por ahora sin artículos reales → mostrar estado vacío con mensaje placeholder

**`blog/[slug].astro`:**
- Layout Post.astro
- Breadcrumb: Inicio > Blog > [título del artículo]
- Autor: Dr. Leandro Mateu
- Fecha formateada con `formatDate.ts`
- Categoría
- Imagen hero
- Contenido del artículo (renderizado desde MD)
- CTA al final: "¿Querés consultar? Contactanos"
- Schema.org `BlogPosting` JSON-LD

---

### Paso 8 — Formulario de contacto

**`contacto.astro`:**
- Campos: Nombre, Teléfono, Email, Motivo (select), Mensaje
- Validación client-side con Zod
- Submit a `/api/contact` (Cloudflare Pages Function)
- Estado de éxito/error visible para el usuario
- Sección adicional con mención a videoconsulta y WhatsApp

**`functions/api/contact.ts`:**
- Validación server-side con Zod (mismo schema que el cliente)
- Envío via Resend API
- Email destino: variable de entorno `CONTACT_EMAIL`
- API key: variable de entorno `RESEND_API_KEY`
- Rate limiting básico
- **NUNCA hardcodear credenciales**

---

### Paso 9 — SEO y archivos finales

**`public/robots.txt`:**
```
User-agent: *
Allow: /
Sitemap: https://www.vitalidadmasculina.com.ar/sitemap.xml
```

**`src/utils/constants.ts`:**
Centralizar todos los datos configurables del sitio:
```ts
export const SITE_NAME = 'Vitalidad Masculina'
export const SITE_URL = 'https://www.vitalidadmasculina.com.ar'
export const MEDICO_NOMBRE = 'Dr. Leandro Mateu'
export const WHATSAPP_NUMBER = '' // TODO: completar cuando el cliente lo provea
export const CONTACT_EMAIL = '' // TODO: completar cuando el cliente lo provea
export const INSTAGRAM_URL = '' // TODO: completar cuando el cliente lo provea
export const CONSULTORIO_ZONA = 'Palermo, CABA'
```

---

### Paso 10 — Animaciones CSS nativas

Crear `src/styles/animations.css` e importarlo en `global.css`.

Implementar con CSS Scroll-driven Animations:

```css
/* Elemento base para revelar al hacer scroll */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: reveal-fade linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}

@keyframes reveal-fade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger para grillas (blog cards, service cards) */
.reveal:nth-child(2) { animation-delay: 0.1s; }
.reveal:nth-child(3) { animation-delay: 0.2s; }
.reveal:nth-child(4) { animation-delay: 0.3s; }

/* Header scroll shadow */
@supports (animation-timeline: scroll()) {
  .site-header {
    animation: header-shadow linear both;
    animation-timeline: scroll();
    animation-range: 0px 80px;
  }
  @keyframes header-shadow {
    to { box-shadow: 0 2px 16px rgba(26,42,94,0.15); }
  }
}
```

Agregar clase `.reveal` a:
- Imágenes de servicios en cada página
- Cards del blog
- Secciones secundarias del homepage

**Sin JS de animaciones. Sin librerías. Cero dependencias extra.**

---

## REGLAS MIENTRAS TRABAJÁS

1. **No inventar contenido médico.** Si una página necesita texto y no está provisto, dejar placeholder con `<!-- TODO -->`.
2. **No publicar la dirección exacta del consultorio.** Solo "Zona Palermo, CABA".
3. **No hardcodear** WhatsApp, email ni API keys. Usar `constants.ts` y variables de entorno.
4. **No instalar dependencias** que no estén en la lista aprobada de AGENTS.md sin avisar.
5. **Verificar antes de marcar como completo.** Si el componente existe pero no está integrado en una página, no es completo.
6. **Ante cualquier duda sobre contenido o decisión de diseño → preguntar antes de inventar.**

---

## ORDEN DE EJECUCIÓN SUGERIDO

0. Setup inicial (.claude.md, copilot-instructions.md, scripts encoding) → confirmar antes de continuar
1. Scaffold + dependencias
2. `constants.ts` + `global.css` (tokens)
3. `Base.astro` + `Page.astro` + `Post.astro`
4. `Header.astro` + `Footer.astro` + `WhatsAppBtn.astro`
5. `index.astro` (homepage) con Hero y VideoConsultaBanner
6. Páginas de servicios (4 con contenido + 1 placeholder)
7. `sobre-mi.astro`
8. Blog (index + [slug])
9. `contacto.astro` + `functions/api/contact.ts`
10. Animaciones CSS nativas
11. SEO final (robots, sitemap, schema)

---

## ESTADO AL TERMINAR

El agente debe poder decir que el proyecto está listo cuando:
- `npm run build` no da errores
- `npm run dev` levanta el sitio sin errores de consola
- Todas las páginas cargan y tienen estructura HTML correcta
- El formulario está conectado a la Cloudflare Function
- Las animaciones CSS funcionan sin errores
- No hay API keys ni datos sensibles en el código
