/// <reference types="@cloudflare/workers-types" />
import { z } from 'zod';

// ─── Schema (mismo que src/utils/contactSchema.ts) ───────────────────────────
const motivoOptions = [
  'Disfunción Eréctil',
  'Eyaculación Precoz',
  'Falta de Deseo',
  'Terapia Hormonal',
  'Urología',
  'Otra consulta',
] as const;

const contactSchema = z.object({
  nombre:   z.string().min(2).max(100),
  telefono: z.string().min(6).max(30).regex(/^[\d\s\+\-\(\)]+$/),
  email:    z.string().email().max(254),
  motivo:   z.enum(motivoOptions),
  mensaje:  z.string().min(10).max(2000),
});

// ─── Rate limiting básico (in-memory por IP) ─────────────────────────────────
// Nota: se resetea en cada cold start del worker. Para producción robusta usar KV.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX       = 3;      // máx 3 envíos por minuto por IP

const rateLimitStore = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now  = Date.now();
  const hits = (rateLimitStore.get(ip) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  rateLimitStore.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

// ─── Helper: respuesta JSON ───────────────────────────────────────────────────
function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

// ─── Handler principal ────────────────────────────────────────────────────────
export const onRequestPost: PagesFunction<{
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}> = async (context) => {
  const { request, env } = context;

  // 1. Verificar variables de entorno
  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL) {
    console.error('[contact] Variables de entorno RESEND_API_KEY o CONTACT_EMAIL no configuradas');
    return json({ message: 'Error de configuración del servidor.' }, 500);
  }

  // 2. Rate limiting por IP
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  if (isRateLimited(ip)) {
    return json({ message: 'Demasiados intentos. Esperá un momento e intentá de nuevo.' }, 429);
  }

  // 3. Parsear body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ message: 'El cuerpo de la solicitud no es JSON válido.' }, 400);
  }

  // 4. Validación server-side con Zod
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return json({
      message: 'Datos inválidos.',
      errors: result.error.flatten().fieldErrors,
    }, 422);
  }

  const { nombre, telefono, email, motivo, mensaje } = result.data;

  // 5. Envío via Resend API
  const emailHtml = `
    <h2>Nueva consulta desde Vitalidad Masculina</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="font-weight:600;width:140px;border-bottom:1px solid #e5e7eb">Nombre</td><td style="border-bottom:1px solid #e5e7eb">${escapeHtml(nombre)}</td></tr>
      <tr><td style="font-weight:600;border-bottom:1px solid #e5e7eb">Teléfono</td><td style="border-bottom:1px solid #e5e7eb">${escapeHtml(telefono)}</td></tr>
      <tr><td style="font-weight:600;border-bottom:1px solid #e5e7eb">Email</td><td style="border-bottom:1px solid #e5e7eb"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="font-weight:600;border-bottom:1px solid #e5e7eb">Motivo</td><td style="border-bottom:1px solid #e5e7eb">${escapeHtml(motivo)}</td></tr>
      <tr><td style="font-weight:600;vertical-align:top">Mensaje</td><td style="white-space:pre-wrap">${escapeHtml(mensaje)}</td></tr>
    </table>
    <hr style="margin:1.5rem 0;border:none;border-top:1px solid #e5e7eb"/>
    <p style="color:#6b7280;font-size:0.85rem">Enviado desde el formulario de contacto de vitalidadmasculina.com.ar</p>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Vitalidad Masculina <formulario@vitalidadmasculina.com.ar>',
        to: [env.CONTACT_EMAIL],
        reply_to: email,
        subject: `Nueva consulta: ${motivo} — ${nombre}`,
        html: emailHtml,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error('[contact] Resend error:', resendRes.status, errBody);
      return json({ message: 'Error al enviar el email. Intentá de nuevo más tarde.' }, 502);
    }

    return json({ message: 'Consulta enviada correctamente.' }, 200);

  } catch (err) {
    console.error('[contact] Fetch error:', err);
    return json({ message: 'Error de conexión con el servicio de email.' }, 502);
  }
};

// ─── Rechazar métodos no permitidos ──────────────────────────────────────────
export const onRequest: PagesFunction = async () => {
  return json({ message: 'Método no permitido.' }, 405);
};

// ─── Sanitización HTML básica ────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
