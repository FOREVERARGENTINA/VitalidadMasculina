# INFORME DE PROYECTO — Vitalidad Masculina Consultorio VM
**Para:** Agente de planificación / Claude Code  
**Preparado por:** FrandoWeb  
**Fecha:** Marzo 2026  
**Versión:** v1.0

---

## 1. RESUMEN EJECUTIVO

Sitio web médico profesional para el Dr. Leandro Mateu, especialista en salud sexual masculina y urología. El sitio opera bajo el dominio `www.vitalidadmasculina.com.ar` y tiene como objetivo principal captar pacientes a través de SEO orgánico y publicidad digital (Google Ads / Meta Ads), con contenido redactado estratégicamente para evitar restricciones publicitarias en dichas plataformas.

**Naturaleza del proyecto:** Sitio estático multi-página con blog. Sin CMS. Sin base de datos. El desarrollador (Hernán Frandolich) gestiona el contenido directamente desde el repositorio.

---

## 2. CONTEXTO Y ANTECEDENTES

El cliente tiene actualmente un sitio compartido con un socio: `www.cmds.com.ar` (Centro Médico de Sexología). Necesita presencia digital propia con:

- Dominio e identidad independiente
- Contenido redactado con lenguaje médico neutro (no usar términos que activen restricciones en Google Ads / Meta: evitar palabras como "impotencia", "eyaculación" en titulares principales, usar sinónimos clínicos)
- Mejor estructura SEO que el sitio actual (que es una landing one-page sin subpáginas)
- Blog activo desde el inicio como motor de posicionamiento orgánico
- Mención explícita a videoconsulta / atención online

**Sitio actual de referencia interna:** `www.cmds.com.ar`  
- WordPress one-page
- Diseño oscuro con animaciones de entrada en imágenes al hacer scroll (efecto reveal/fade-in)
- Secciones: Disfunción Eréctil, Eyaculación Precoz, Falta de Deseo, Chip Sexual
- Botón WhatsApp flotante
- Este sitio **no** debe ser imitado, pero sí tener en cuenta: las animaciones de entrada de imágenes al hacer scroll son un elemento que el cliente valora y quiere trasladar al nuevo sitio

---

## 3. CLIENTE

| Campo | Datos |
|-------|-------|
| Nombre | Dr. Leandro Mateu |
| Especialidad | Salud sexual masculina / Urología |
| WhatsApp | Por generar (se actualizará) |
| Email | Por generar (se actualizará) |
| Ubicación consultorio | Zona Palermo, CABA — **no publicar dirección exacta** (evitar superposición con CMDS) |
| Modalidad | Presencial + Online / Videoconsulta |
| Coberturas | Solo particular |
| Redes sociales | Instagram: por crear (botón dejar en página). Facebook, TikTok, LinkedIn: no por ahora |
| Foto profesional | No disponible — usar imágenes de Unsplash (hombres, entorno médico, consulta, vitalidad masculina) o generar con IA |

---

## 4. STACK TÉCNICO

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | **Astro** (última versión estable) | Generación estática, soporte nativo MD/MDX |
| Estilos | **Tailwind CSS** | Utility-first, sin CSS personalizado salvo excepciones |
| Animaciones | **CSS Scroll-driven Animations (nativo)** | Para animaciones de entrada de imágenes al hacer scroll (ver sección Diseño) |
| Blog | Archivos `.md` en `/src/content/blog/` | Sin CMS. El dev gestiona directo en repo |
| Hosting | **Cloudflare Pages** | Plan free, uso comercial permitido |
| Formulario de contacto | **Cloudflare Pages Functions** + **Resend** (API email) | Serverless, sin backend dedicado |
| Dominio | `vitalidadmasculina.com.ar` | Registrar en NIC Argentina si no está registrado |
| Imágenes | **Unsplash** (via URL directa o descarga) / generación IA | Sin foto personal del médico |

**No usar:**
- Firebase (overkill para sitio estático)
- WordPress (mantenimiento, lentitud)
- Next.js (no hay SSR ni rutas de API complejas)
- CMS externo (Strapi, Sanity, Contentful)
- Vercel / Netlify (preferencia de hosting en Cloudflare Pages)

---

## 5. ESTRUCTURA DE PÁGINAS

### Páginas confirmadas por el cliente:

```
/                        → Inicio (Homepage)
/sobre-mi/               → Sobre mí / Historia del médico
/disfuncion-erectil/     → Disfunción Eréctil
/eyaculacion-precoz/     → Eyaculación Precoz
/falta-de-deseo/         → Falta de Deseo / Libido
/terapia-hormonal/       → Terapia con Pellets / Chip de Testosterona
/urologia/               → Urología (contenido a desarrollar con el cliente)
/blog/                   → Listado de artículos
/blog/[slug]/            → Artículo individual
/contacto/               → Contacto + Turnos
```

### Navegación principal sugerida:
`Inicio | Servicios (dropdown) | Blog | Sobre mí | Contacto`

El dropdown de Servicios agrupa las 5 páginas de especialidades.

---

## 6. CONTENIDO DISPONIBLE

El cliente entregó contenido redactado para 4 servicios. El texto ya usa lenguaje clínico estratégico (apto para publicidad):

### Disfunción Eréctil
- Definición clínica, síntomas, causas (físicas, hormonales, emocionales), enfoque de tratamiento
- Frase destacada: *"La disfunción eréctil no es solo un problema. Es una señal de que algo en tu salud necesita atención."*

### Eyaculación Precoz
- Definición, cuándo consultar, causas múltiples, tratamientos (reeducación, medicación, terapias combinadas)

### Falta de Deseo / Disminución de la Libido
- Causas hormonales y emocionales, cuándo consultar, opciones de tratamiento

### Terapia con Pellets Hormonales (Chip de Testosterona)
- Indicaciones, funcionamiento, procedimiento ambulatorio (15-20 min, anestesia local, zona glútea)

### Urología
- **Pendiente:** El cliente solicitó desarrollarlo junto con el dev/agente. Contemplar sección general de urología masculina.

### Blog — Temas confirmados para primeros artículos:
1. Disfunción Eréctil (introducción general)
2. Eyaculación Precoz
3. Reemplazo Hormonal / Testosterona
4. Disfunción Eréctil Post-Prostatectomía Radical
5. (Más a definir)

**Nota sobre el blog:** El cliente no escribe los artículos. Los temas los define él y el desarrollador (FrandoWeb) se encarga de la redacción o los genera con IA. Los artículos se entregarán como archivos `.md` para incorporar al repo.

---

## 7. DISEÑO Y ESTILO VISUAL

### Paleta de colores
El logo establece el azul marino como color principal. El cliente solicitó explorar la incorporación de dorado o arena como color de acento.

| Rol | Color | Hex sugerido |
|-----|-------|-------------|
| Principal | Azul marino oscuro | `#1A2A5E` |
| Secundario / Acento | Dorado / Arena | `#C9A84C` o `#B8973A` (dorado) / `#D4B896` (arena cálida) |
| Fondo claro | Blanco roto / crema | `#FAFAF8` |
| Texto principal | Gris oscuro | `#1F1F1F` |
| Texto suave | Gris medio | `#6B7280` |
| CTA / Botones | Dorado o azul | A definir en diseño |

**Combinación recomendada:** Azul marino + dorado es una paleta clásica premium para medicina privada. Transmite autoridad, exclusividad y confianza. El arena puede usarse como alternativa más cálida para fondos de secciones.

### Sensación buscada (según cliente)
- Médico / clínico / sobrio ✓
- Exclusivo / premium ✓
- Cálido / cercano / humano ✓

### Referencias de diseño analizadas

**1. institutourologicoigb.com/blog/**
- WordPress + Bricks Builder
- Layout blog: grid de cards con imagen destacada (800x460), título H3, excerpt, botón "Leer más"
- Cada post tiene: breadcrumb, autor con avatar, categorías, fecha, imagen hero grande
- Estructura de artículo: H2 y H3 bien jerarquizados, listas con viñetas, conclusión final
- Tipografía: serif para títulos, sans-serif para cuerpo
- **Imitar:** estructura de card de blog, jerarquía tipográfica de artículos, breadcrumbs en posts

**2. centroargentinodeurologia.com.ar**
- WordPress
- Navegación con mega-menú (especialidades como dropdown)
- Diseño institucional, azul como color base
- **Imitar:** estructura de navegación con dropdown de especialidades

**3. cmds.com.ar (sitio actual del cliente)**
- WordPress one-page
- **Elemento valorado por el cliente:** animaciones de entrada (reveal/fade-in) de imágenes al hacer scroll. Implementar con CSS nativo en el nuevo sitio.

### Imágenes
- Sin foto del médico (no disponible)
- Usar imágenes de Unsplash: hombres en entorno médico, consulta privada, actividad física, vitalidad
- Alternativa: generar con IA (Midjourney, DALL-E, Flux) imágenes abstractas o ilustrativas
- Todas las imágenes deben optimizarse (WebP, lazy loading nativo de Astro)

### Tipografía sugerida (self-hosted, no Google Fonts CDN)
- Títulos: `Playfair Display` o `Merriweather` (serif, premium)
- Cuerpo: `Inter` o `DM Sans` (sans-serif, legible)
- Alternativa completa sans: `Plus Jakarta Sans` para look más moderno

---

## 8. FUNCIONALIDADES

### Formulario de contacto
- Campos: Nombre, Teléfono, Email, Mensaje, Motivo de consulta (select)
- Envío via Cloudflare Pages Functions → Resend API
- Respuesta de confirmación al usuario
- Sin base de datos (no se guardan los mensajes en ningún lado, solo se envían por email)

### Botón WhatsApp flotante
- Presente en todas las páginas
- Número a completar cuando el cliente lo genere
- Mensaje pre-cargado sugerido: "Hola, quisiera consultar sobre..."

### Videoconsulta / Atención online
- Sección destacada en Homepage y en página de Contacto
- Mencionar explícitamente: "Atención por videollamada desde cualquier parte del país"
- No integrar sistema de turnos por ahora (el cliente no lo solicitó)

### Animaciones (CSS Scroll-driven Animations nativo)
- Fade-in + leve translate-Y en imágenes de servicios al entrar al viewport
- Stagger en cards del blog
- Header con leve efecto al hacer scroll (cambio de fondo/sombra)
- **Criterio:** animaciones sutiles, no distractoras. El contenido es médico, la sobriedad es importante.

### SEO
- Meta title y description únicos por página (Astro `<head>` configurable)
- Sitemap automático (`@astrojs/sitemap`)
- Robots.txt
- Open Graph tags para compartir en redes
- Schema.org JSON-LD: `MedicalBusiness` + `Person` (médico) + `BlogPosting` en artículos
- URLs amigables en español (slugs descriptivos)
- H1 único por página, jerarquía H2/H3 correcta

---

## 9. TONO Y COMUNICACIÓN

- **Tono:** Indistinto (vos/usted según contexto). En textos informativos: registro formal pero accesible. En CTAs: directo y accionable.
- **Diferencial del consultorio:** Atención personalizada y especializada
- **Videoconsulta:** Mencionar como beneficio clave (privacidad, comodidad, disponibilidad nacional)
- **Testimonios:** No disponibles por ahora. No incluir sección de testimonios en v1.
- **FAQ:** No por ahora. Puede sumarse en v2.
- **Lenguaje publicitario seguro:** Evitar en titulares y meta descriptions las palabras: "impotencia", "eyaculación", "sexual", "erección" como términos aislados. Usar: "salud masculina", "vitalidad", "bienestar íntimo", "rendimiento", "consulta médica especializada".

---

## 10. ESTRUCTURA DE ARCHIVOS SUGERIDA (Astro)

```
src/
├── components/
│   ├── layout/       Header, Footer, Nav
│   ├── ui/           Button, Card, Badge, Icon
│   └── sections/     Hero, ServiceCard, BlogCard, ContactForm, WhatsAppBtn
├── content/
│   └── blog/         *.md  (artículos del blog)
├── layouts/
│   ├── Base.astro    Head, meta, estilos globales
│   ├── Page.astro    Layout general de páginas
│   └── Post.astro    Layout de artículos del blog
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
│   └── global.css    Variables CSS, reset, tipografías
└── utils/
    └── formatDate.ts
```

---

## 11. PENDIENTES / INFORMACIÓN FALTANTE

Los siguientes datos están pendientes de recibir del cliente. El sitio puede desarrollarse sin ellos en un primer paso, dejando placeholders:

| Item | Estado | Impacto |
|------|--------|---------|
| WhatsApp | Por generar | Botón flotante y página de contacto |
| Email de contacto | Por generar | Formulario de contacto |
| Foto del médico | No disponible | Usar Unsplash/IA hasta disponibilidad |
| Dirección exacta | Solo "Zona Palermo" (intencional) | Mapa no requerido |
| Matrícula | No entregada | Opcional en "Sobre mí" |
| Especialidad / Título | No completado | Página "Sobre mí" |
| Contenido Urología | A desarrollar | Página /urologia/ |
| Instagram | Por crear | Solo dejar el ícono/botón, sin link activo |
| Artículos del blog | Temas definidos, redacción pendiente | Blog (se puede lanzar con 2-3 posts) |

---

## 12. CRITERIOS DE LANZAMIENTO (MVP)

El sitio puede lanzarse cuando esté completo:
- [ ] Homepage con hero, servicios resumidos, sección videoconsulta, CTA
- [ ] 4 páginas de servicios con contenido entregado
- [ ] Página Sobre mí (con Unsplash hasta tener foto real)
- [ ] Formulario de contacto funcional
- [ ] Botón WhatsApp flotante
- [ ] Blog con mínimo 2 artículos
- [ ] SEO básico configurado (meta, sitemap, robots)
- [ ] Animaciones CSS nativas implementadas
- [ ] Deploy en Cloudflare Pages

**Página de Urología** puede publicarse en una segunda iteración.

---

## 13. CONTACTO DEL DESARROLLADOR

**Hernán Frandolich — FrandoWeb**  
WhatsApp: 15-2807-4000  
Web: frandoweb.com
