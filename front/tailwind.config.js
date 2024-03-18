/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    animation: {
      "bounce-once": "bounce 1s ease-in-out 1.7", // Adjust timing as needed
    },
  },
};
export const plugins = [];
