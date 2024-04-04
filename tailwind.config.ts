import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        typewriter: 'typewriter 2s steps(24) forwards',
        caret: 'typewriter 2s steps(24) forwards, blink 1s steps(24) infinite 2s',
        
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
          
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    },
    fontFamily: {
      "lato": ['Lato', 'sans-serif']
    }
  },
  plugins: [],
};

export default config;
