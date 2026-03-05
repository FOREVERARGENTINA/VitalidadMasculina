# GitHub Copilot Instructions — Vitalidad Masculina

Lee `docs/AGENTS_VitalidadMasculina.md` para decisiones específicas de este proyecto.
Lee `docs/guia.md` para principios generales de desarrollo web.

**Jerarquía:** AGENTS_VitalidadMasculina.md > guia.md > Sugerencias por defecto

## Stack definido (no sugerir alternativas):
- Framework: Astro (static)
- Estilos: Tailwind CSS
- Animaciones: CSS Scroll-driven Animations nativo (sin GSAP, sin AOS)
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
