# 🧠 AGENTS.md — Vitalidad Masculina Consultorio VM

**Proyecto:** Sitio web médico profesional — `vitalidadmasculina.com.ar`  
**Desarrollador:** Hernán Frandolich / FrandoWeb  
**Naturaleza:** Reglas de decisión para agente técnico (Claude Code / Copilot)  
**Principio:** Delimitar, no confiar en criterio  
**Estado:** ✅ Activo

---

## 📚 Jerarquía de Documentación

1. **Este archivo (AGENTS.md)** → Decisiones específicas de este proyecto
2. **guia.md** → Principios generales de desarrollo web
3. **Conocimiento base del agente** → Solo si los anteriores no cubren el tema

**Regla de conflicto:**
```
AGENTS.md > guia.md > conocimiento base
Si ninguno cubre el tema → elegir la opción más simple y preguntar
```

---

## 🚦 Defaults del Proyecto

- **Seguridad > todo**
- **No ejecutar deploys** (el agente prepara, Hernán ejecuta)
- **No modificar datos persistentes**
- **Ante cualquier duda → preguntar**
- **No inventar contenido médico** — solo usar el texto provisto o preguntar

---

## 📦 Stack Técnico Definido

| Capa | Tecnología | Estado |
|------|-----------|--------|
| Framework | Astro (última versión estable) | ✅ Definido |
| Estilos | Tailwind CSS | ✅ Definido |
| Animaciones | CSS Scroll-driven Animations (nativo) | ✅ Definido |
| Blog | Archivos `.md` en `/src/content/blog/` | ✅ Definido |
| Hosting | Cloudflare Pages | ✅ Definido |
| Formulario | Cloudflare Pages Functions + Resend | ✅ Definido |
| Tipografías | Self-hosted (NO Google Fonts CDN) | ✅ Definido |
| Imágenes | Unsplash + optimización WebP vía Astro | ✅ Definido |

### Tipo de Proyecto (según guia.md)
**Tipo B — Sitio médico multi-página con blog.** Sin autenticación, sin base de datos, sin usuarios.

### Dependencias Prohibidas ❌
No instalar sin aprobación explícita de Hernán:
- Firebase / Supabase (no hay datos dinámicos)
- Next.js / Nuxt (framework incorrecto para este proyecto)
- jQuery, moment.js, Lodash
- Cualquier CMS headless (Strapi, Sanity, Contentful, Decap)
- `@astrojs/node` para SSR (el proyecto es 100% estático)

### Dependencias Aprobadas ✅
Puede instalar sin consultar:
- `@astrojs/sitemap` (SEO)
- `@astrojs/tailwind`
- `@astrojs/mdx` (si se necesita MDX en el blog)
- `clsx` (utilidad de clases)
- `zod` (validación del formulario)

---

## 🗂️ Estructura de Archivos

```
src/
├── components/
│   ├── layout/       Header.astro, Footer.astro, Nav.astro
│   ├── ui/           Button.astro, Card.astro, Badge.astro
│   └── sections/     Hero.astro, ServiceCard.astro, BlogCard.astro,
│                     ContactForm.astro, WhatsAppBtn.astro, VideoConsultaBanner.astro
├── content/
│   └── blog/         *.md  (artículos — el dev los agrega manualmente)
├── layouts/
│   ├── Base.astro    <head>, meta, estilos globales
│   ├── Page.astro    Layout de páginas internas
│   └── Post.astro    Layout de artículos del blog
├── pages/
│   ├── index.astro
│   ├── sobre-mi.astro
│   ├── disfuncion-erectil.astro
│   ├── eyaculacion-precoz.astro
│   ├── falta-de-deseo.astro
│   ├── terapia-hormonal.astro
│   ├── urologia.astro          ← contenido pendiente, dejar placeholder
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── contacto.astro
├── styles/
│   └── global.css
└── utils/
    └── formatDate.ts
```

### Convenciones de Naming
- Archivos Astro/componentes: `PascalCase.astro`
- Páginas: `kebab-case.astro`
- Utilidades: `camelCase.ts`
- Constantes: `UPPER_SNAKE_CASE`
- Slugs de blog: `kebab-case-en-español`
- Carpetas: `kebab-case`

---

## 🎨 Diseño y Tokens de Color

```css
/* Variables CSS globales — /src/styles/global.css */
--color-navy:        #1A2A5E;   /* Azul marino principal */
--color-navy-dark:   #0F1A3E;   /* Azul marino oscuro */
--color-gold:        #C9A84C;   /* Dorado acento */
--color-sand:        #D4B896;   /* Arena cálida (alternativa) */
--color-bg:          #FAFAF8;   /* Fondo blanco roto */
--color-text:        #1F1F1F;   /* Texto principal */
--color-text-muted:  #6B7280;   /* Texto secundario */
```

**El agente NO debe cambiar la paleta** sin aprobación. Si el diseño requiere un nuevo color, proponer y esperar confirmación.

---

## ✍️ Reglas de Contenido Médico

### ❌ Prohibido al generar o editar texto:
- Inventar información clínica o estadísticas sin fuente
- Usar lenguaje que pueda activar restricciones publicitarias en los titulares y meta descriptions:
  - Evitar en H1/title/meta: "impotencia", "eyaculación", "sexual", "erección" como términos aislados
  - Usar en su lugar: "salud masculina", "vitalidad", "bienestar", "rendimiento", "consulta especializada"
- Hacer afirmaciones de cura o garantía de resultados
- Mencionar marcas comerciales de medicamentos

### ✅ Siempre hacer con el contenido:
- Usar solo el texto provisto en los archivos del cliente o en el INFORME del proyecto
- Mantener tono: formal pero accesible, indistinto (vos/usted según contexto)
- Incluir siempre un CTA al final de cada página de servicio ("Solicitá tu consulta")
- Mencionar videoconsulta como opción disponible en páginas de servicios y contacto

---

## 🎬 Animaciones — Reglas CSS Nativo

- **Técnica:** CSS Scroll-driven Animations (nativo, sin librerías JS)
- **Uso:** Fade-in + translateY en imágenes de servicios al entrar al viewport
- **Stagger:** En cards del blog al cargar la grilla (animation-delay escalonado)
- **Header:** Cambio sutil de sombra/fondo al hacer scroll (CSS scroll-driven)
- **Criterio de sobriedad:** Duración 0.5–0.8s, easing suave (`ease-out`). Este es un sitio médico, no una agencia creativa. Si una animación distrae del contenido → eliminarla.
- **No animar:** textos del cuerpo, formularios, elementos de navegación críticos
- **No instalar** librerías de animación JS — el CSS nativo cubre todos los casos de este proyecto.

---

## 📝 Reglas del Blog

- Los artículos son archivos `.md` con frontmatter estándar:
  ```md
  ---
  title: ""
  description: ""
  pubDate: YYYY-MM-DD
  category: ""
  image: ""        # URL de Unsplash o ruta local en /public/blog/
  author: "Dr. Leandro Mateu"
  ---
  ```
- El agente **no crea artículos de blog** sin que Hernán provea el texto o lo solicite explícitamente
- El agente **sí puede** crear la estructura del frontmatter y el layout, y dejar el contenido como placeholder
- Estructura de artículo a seguir (basada en institutourologicoigb.com):
  - H1: título del artículo
  - Intro párrafo (2-3 oraciones)
  - Secciones H2 con subsecciones H3 si aplica
  - Listas con viñetas para síntomas/causas/tratamientos
  - Conclusión + CTA a consulta
  - Breadcrumb en la página
  - Autor + fecha + categoría visibles

---

## 📬 Formulario de Contacto

- **Proveedor:** Cloudflare Pages Functions + Resend
- La función serverless va en `/functions/api/contact.ts`
- Campos: `nombre`, `telefono`, `email`, `motivo`, `mensaje`
- Validación isomórfica con Zod (cliente + función)
- El email de destino va en variable de entorno: `CONTACT_EMAIL`
- **Zona Roja:** no hardcodear el email de destino ni el API key de Resend en el código

---

## 🔒 Seguridad y Privacidad

### ❌ NO loguear ni commitear:
- API key de Resend
- Email de contacto del médico
- Cualquier dato de pacientes

### ✅ Variables de entorno requeridas:
```
RESEND_API_KEY=
CONTACT_EMAIL=
```
Estas van en `.env` (local) y en el panel de Cloudflare Pages (producción).

### ✅ Siempre:
- Validación server-side del formulario (Cloudflare Function)
- Rate limiting básico en la función de contacto
- Self-hosted fonts (no Google Fonts CDN — privacidad GDPR)
- HTTPS forzado (Cloudflare lo maneja automáticamente)

---

## 🔍 SEO — Reglas

- Meta title y description únicos por página (definidos en el frontmatter o props del layout)
- `@astrojs/sitemap` configurado y activo
- `robots.txt` presente
- Open Graph tags en todas las páginas
- Schema.org JSON-LD:
  - `MedicalBusiness` en Homepage
  - `Person` para el médico en `/sobre-mi/`
  - `BlogPosting` en cada artículo
- H1 único por página, sin saltar niveles de heading
- Imágenes con atributo `alt` descriptivo siempre

---

## 🗄️ Datos del Proyecto

### Placeholders activos (completar cuando el cliente los provea)
```
WHATSAPP_NUMBER=549XXXXXXXXXX     ← pendiente
CONTACT_EMAIL=info@vitalidad...   ← pendiente
INSTAGRAM_URL=                    ← pendiente
MEDICO_NOMBRE=Dr. Leandro Mateu   ✅
MEDICO_MATRICULA=                 ← pendiente
CONSULTORIO_ZONA=Palermo, CABA    ✅ (no publicar dirección exacta)
```

**Regla:** Usar constantes para estos valores. No hardcodear en múltiples componentes.

---

## 🛑 Zonas Rojas

### ZONA ROJA 1 — Contenido médico inventado
❌ Prohibido generar información clínica (síntomas, tratamientos, estadísticas) sin que Hernán la provea o apruebe explícitamente.

### ZONA ROJA 2 — Dirección del consultorio
❌ No publicar la dirección exacta del consultorio. Solo "Zona Palermo, CABA". El cliente lo solicitó explícitamente para no generar conflicto con su socio en CMDS.

### ZONA ROJA 3 — Secrets y variables de entorno
❌ No hardcodear API keys, emails, números de teléfono en el código. Siempre variables de entorno.

### ZONA ROJA 4 — Deploy
❌ El agente no ejecuta deploys. Solo prepara comandos para que Hernán los ejecute.

### ZONA ROJA 5 — Cambio de stack
❌ No sugerir ni implementar Firebase, WordPress, Next.js ni CMS sin aprobación explícita. El stack está definido y cerrado.

---

## ✅ Rol del Agente

### Puede hacer sin confirmar:
- Generar componentes Astro siguiendo la estructura definida
- Crear layouts y páginas con placeholders de contenido
- Implementar animaciones CSS nativas según las reglas definidas
- Configurar SEO (meta, sitemap, schema)
- Aplicar la paleta de colores y tipografías definidas
- Debuggear errores
- Proponer refactors de componentes

### Requiere confirmación:
- Agregar dependencias nuevas no listadas
- Cambiar tokens de color o tipografía
- Modificar la estructura de carpetas
- Crear contenido médico (texto de servicios o blog)
- Cambiar la estructura de URLs

### Prohibido (nunca automático):
- Ejecutar deploys
- Hardcodear datos de contacto del cliente
- Inventar contenido médico
- Cambiar el stack tecnológico

---

## 🚀 Comandos del Proyecto

**El agente prepara, Hernán ejecuta.**

```bash
npm run dev          # Servidor local http://localhost:4321
npm run build        # Build de producción
npm run preview      # Preview del build
npx astro check      # Verificar tipos TypeScript
```

**Deploy (manual, Hernán ejecuta):**
```bash
# Push a main → Cloudflare Pages despliega automáticamente
git push origin main
```

---

## ✅ Checklist Pre-Deploy

### Performance
- [ ] Lighthouse Performance > 90
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Imágenes en WebP con lazy loading

### SEO
- [ ] Meta title + description únicos en todas las páginas
- [ ] Sitemap generado y accesible en `/sitemap.xml`
- [ ] robots.txt presente
- [ ] Schema.org JSON-LD en homepage y posts

### Funcional
- [ ] Formulario de contacto envía correctamente
- [ ] Botón WhatsApp funciona
- [ ] Todas las páginas de servicios cargan
- [ ] Blog lista artículos y los posts individuales cargan
- [ ] Animaciones CSS nativas funcionan sin errores de consola
- [ ] Variables de entorno configuradas en Cloudflare Pages

### Seguridad
- [ ] No hay API keys en el código
- [ ] Validación server-side del formulario activa
- [ ] Fonts self-hosted (no CDN externo)

---

**Última actualización:** Marzo 2026  
**Versión:** v1.0  
**Estado:** ✅ Listo para desarrollo  
**Próxima revisión:** Al recibir datos pendientes del cliente (WhatsApp, email, foto)
