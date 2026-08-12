/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        whitesmoke: {
          "100": "#f5f5f5",
          "200": "#f0f0f0",
          "300": "#ececec",
        },
        gainsboro: "#d9d9d9",
        "neutral-colors-white": "#fff",
        mediumpurple: {
          "100": "#968eec",
          "200": "#9181f5",
        },
        black: "#000",
        gray: {
          "100": "#fffdfd",
          "200": "#fafafa",
          "300": "#857e7e",
          "400": "rgba(0, 0, 0, 0.7)",
          "500": "rgba(255, 255, 255, 0.83)",
        },
        mediumblue: "rgba(79, 64, 255, 0.49)",
        "neutral-colors-color-400": "#f2f1fa",
        dimgray: "#555",
        darkslategray: "#333",
        lavender: "#d4d2e3",
        teal: "rgba(0, 126, 133, 0.1)",
        slateblue: "#7869db",
        darkorchid: "#7b13ac",
        darkmagenta: "#8d36ab",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        "text-single-200-regular": "'DM Sans'",
        poppins: "Poppins",
        lato: "Lato",
        "lexend-tera": "'Lexend Tera'",
      },
      borderRadius: {
        "6xl": "25px",
        "3xs": "10px",
        "11xl": "30px",
        "26xl": "45px",
        "8xs": "5px",
        "31xl": "50px",
        "4xl": "23px",
        "188xl": "207px",
        "191xl": "210px",
      },
    },
    fontSize: {
      "17xl": "36px",
      xl: "20px",
      base: "16px",
      "5xl": "24px",
      lgi: "19px",
      lg: "18px",
      "9xl": "28px",
      "3xl": "22px",
      "10xl": "29px",
      mini: "15px",
      "4xl": "23px",
      "3xs": "10px",
      xs: "12px",
      "21xl": "40px",
      "13xl": "32px",
      inherit: "inherit",
    },
    screens: {
      mq1325: {
        raw: "screen and (max-width: 1325px)",
      },
      mq1275: {
        raw: "screen and (max-width: 1275px)",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq1100: {
        raw: "screen and (max-width: 1100px)",
      },
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
