/**
 * Formatea una fecha para mostrar en artículos del blog.
 * TODO: implementar formato en español (ej. "5 de marzo de 2026")
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
