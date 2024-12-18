import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {enabled: true},
      manifest:{
        name: "Buugym App",
        short_name: "Buugym",
        theme_color: "#ffffff",
        description: "Buugym App",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      }
    
    })
  ],
  define: {
    global: "window",
    "process.env": {},
  },
  resolve: {
    alias: [
      { find: "components", replacement: path.resolve(__dirname, "src/components") },
      { find: "containers", replacement: path.resolve(__dirname, "src/containers") },
      { find: "shared", replacement: path.resolve(__dirname, "src/shared") },
      { find: "hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "routers", replacement: path.resolve(__dirname, "src/routers") },
      { find: "utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "images", replacement: path.resolve(__dirname, "src/assets/images") },
      { find: "fonts", replacement: path.resolve(__dirname, "src/assets/fonts") },
      { find: "contains", replacement: path.resolve(__dirname, "src/contains") },
      { find: "pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "api", replacement: path.resolve(__dirname, "src/api") },
      { find: "states", replacement: path.resolve(__dirname, "src/states") },
      { find: "enums", replacement: path.resolve(__dirname, "src/enums") },
      { find: "@", replacement: path.resolve(__dirname, "src") }
    ]
  },

})
