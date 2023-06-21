/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{html,js,jsx}"],
  content: ["./src/**/*.{html,js, jsx, ts, tsx}"],
  theme: {
    extend: {
      fontFamily: {
        def: ["Inter"],
      },
    },
  },
  plugins: [],
};
