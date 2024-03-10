import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    vue(),

    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [path.resolve('./src/icons/svg')],
      // 执行icon name的格式
      symbolId: 'icon-[name]',
    }),

    viteMockServe({
      supportTs: false,
      logger: true,
      enable: false,
      mockPath: "./src/mock/",
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    host: '0.0.0.0',
    port: 3005,
    open: true,
    cors: true,
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:3005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }

  }
})
