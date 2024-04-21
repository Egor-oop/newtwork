/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tgBtnColor': 'var(--tg-theme-button-color)',
        'tgBtnTextColor': 'var(--tg-theme-button-text-color)',
        'tgLinkColor': 'var(--tg-theme-link-color)',
        'tgHintColor': 'var(--tg-theme-hint-color)',
        'tgSecondaryBgColor': 'var(--tg-theme-secondary-bg-color)',
        'postBg': 'var(--post-bg)',
      }
    },
  },
  plugins: [],
}

