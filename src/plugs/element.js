import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import elementIcons from '@/plugs/svgicon'
import 'virtual:svg-icons-register'

export default app => {
  app
    .use(ElementPlus, { locale })
    .use(elementIcons)
}