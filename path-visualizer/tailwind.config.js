import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index/html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wall: {
          "0%": {
            transform: "scale(0.7)"
          },
          "100%": {
            transform: "scale(1)"
          }
        }
      },
      animation: {
        wall: "wall 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }
    },
  },
  plugins: [],
}

