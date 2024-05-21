/** @type {import('tailwindcss').Config} */
module.exports= {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        purple: "#A729F5",
        backgroundBlue:"#00004B",
        darkNavy: "#313E51",
        navy: "#3B4D66",
        greyNavy: "#626C7F",
        lightBluish: "#ABC1E1",
        lightGrey: "#F4F6FA",
        customgreen: "#26D782",
        customred: "#EE5454",
        btnHover: "#D394FA",
      },
      backgroundImage: {
        backgroundDesktopDark: "url('/pattern-background-desktop-dark.svg')",
        backgroundDesktopLight: "url('/pattern-background-desktop-light.svg')",
        backgroundMobileDark: "url('/pattern-background-mobile-dark.svg')",
        backgroundMobileLight: "url('/pattern-background-mobile-light.svg')",
        backgroundTabletDark: "url('/pattern-background-tablet-dark.svg')",
        backgroundTabletLight: "url('/pattern-background-tablet-light.svg')",
      },
    },
  },
  plugins: [],
};