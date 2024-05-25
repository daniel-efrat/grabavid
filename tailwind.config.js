/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "neumorphic-dark": "#1e1e1e",
        "neumorphic-light": "#2a2a2a",
      },
      boxShadow: {
        neumorphic: "3px 3px 16px #121212, -3px -3px 16px #fafafa50",
      },
    },
  },
  plugins: [],
}
