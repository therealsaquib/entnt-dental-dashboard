// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Tailwind's blue-600
        "primary-dark": "#1E40AF", // Tailwind's blue-800
      },
    },
  },
  plugins: [],
};
