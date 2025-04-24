import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import svgr from 'vite-plugin-svgr'; // Закомментируйте или удалите эту строку

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Оставьте только плагин react()
});