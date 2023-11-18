/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gunmetal': '#282c34',
        'battle-grey1': '#829191',
        'battle-grey2': '#949B96',
      },
    },
  },
  plugins: [],
}

