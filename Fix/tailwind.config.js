/** @type {import('tailwindcss').Config} */
export default {
  // Essa segunda config (após a vírgula), pede para o programa "olhar" para todos os arquivos com a extensão .js e .html. (indpendente do nome)
  content: ["./src/**/*.{html,js}", "./*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

