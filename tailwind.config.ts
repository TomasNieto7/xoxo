import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'movilstartIMG': "url('/home/pqAserrinrinrirn.png')",
        'aserrinIMG': "url('/home/pqAserrinrinrirn.png')",
        'pillofonIMG': "url('/home/pqAserrinrinrirn.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
