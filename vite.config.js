import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-fade-right.svg'],
      manifest: {
        name: 'Food Junction | Bikram, Patna',
        short_name: 'FoodJunction',
        description: 'Exquisite Dining & Authentic Flavors at Food Junction',
        theme_color: '#0c1117',
        background_color: '#0c1117',
        display: 'standalone',
        icons: [
          {
            src: '/FJ_logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/FJ_logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/FJ_logo.png',
            sizes: '1024x1024',
            type: 'image/png'
          },
          {
            src: '/FJ_logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: '/pwa-desktop.png',
            sizes: '1280x800',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Food Junction Home'
          },
          {
            src: '/pwa-mobile.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Food Junction Mobile'
          }
        ]
      }
    })
  ],
})
