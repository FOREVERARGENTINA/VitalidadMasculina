/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:        'var(--color-navy)',
        'navy-dark': 'var(--color-navy-dark)',
        'navy-light':'var(--color-navy-light)',
        gold:        'var(--color-gold)',
        sand:        'var(--color-sand)',
        bg:          'var(--color-bg)',
        text:        'var(--color-text)',
        'text-muted':'var(--color-text-muted)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body:    'var(--font-body)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
      },
    },
  },
  plugins: [],
};
