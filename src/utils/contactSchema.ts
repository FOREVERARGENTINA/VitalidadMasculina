import { z } from 'zod';

export const motivoOptions = [
  'Disfunción Eréctil',
  'Eyaculación Precoz',
  'Falta de Deseo',
  'Terapia Hormonal',
  'Urología',
  'Otra consulta',
] as const;

export const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  telefono: z
    .string()
    .min(6, 'Ingresá un teléfono válido')
    .max(30, 'El teléfono es demasiado largo')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Solo se permiten números y símbolos (+, -, paréntesis)'),
  email: z
    .string()
    .email('Ingresá un email válido')
    .max(254, 'El email es demasiado largo'),
  motivo: z
    .enum(motivoOptions, { errorMap: () => ({ message: 'Seleccioná un motivo de consulta' }) }),
  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje es demasiado largo (máximo 2000 caracteres)'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
