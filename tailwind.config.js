/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xxs: "10px",
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
    },
    extend: {
      keyframes: {
        logo: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(359deg)" },
        },
      },
      bgGradientDeg: {
        40: "40deg",
      },
      animation: {
        logo: "logo 6s infinite linear",
      },
      boxShadow: {
        innerBall: "inset -5px -5px 6px #FFFFFF, inset 5px 5px 6px #E5E7EB",
        outerBall: "-4px -4px 6px #fefefe, 4px 4px 6px #E5E7EB",
        lightBlur: "5px 5px 25px 0px #2222221A",
      },
      dropShadow: {
        darker: "5px 5px 25px rgba(34, 38, 119, 0.25)",
        innerDarker: "inset 5px 5px 25px rgba(34, 38, 119, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-safe-area")],
  corePlugins: {
    preflight: false,
  },
};
