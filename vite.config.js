import { defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [path.resolve('./src/icons/svg')],
      // 执行icon name的格式
      symbolId: 'icon-[name]',
    }),
  ],
  base: "./", 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    // host: '0.0.0.0',
    // port: 3000, // 服务端口号
    // open: true, // 服务启动时是否自动打开浏览器
    // cors: true, // 允许跨域
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
})
