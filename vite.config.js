import { fileURLToPath, URL } from 'node:url'
// import path from 'path'
import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import vueI18n from '@intlify/vite-plugin-vue-i18n'
// import svgLoader from 'vite-svg-loader'
// import tailwind from 'tailwindcss'
// import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   postcss: {
  //     plugins: [tailwind(), autoprefixer()],
  //   },
  // },
  plugins: [
    // vue(),
    // vueI18n({
    //   include: path.resolve(__dirname, './path/to/src/locales/**'),
    //   defaultSFCLang: 'yaml',
    // }),
    // svgLoader(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
})
