import {api} from '@/api'
import store from '@/store'
import { ACCESS_TOKEN, REFRESH_TOKEN,PASS } from "@/constant"
import {setItem,removeItem} from '@/utils/storage'

let subscribes = []
let flag = false // 设置开关，保证一次只能请求一次短token，防止客户多点操作，多次请求

export const addRequest = (request) => {
  subscribes.push(request)
}

export const retryRequest = () => {
  console.log('重新请求上次中断的数据')
  // console.log('subscribes',subscribes)
  subscribes.forEach((request, index) => {
    if (typeof request === 'function') {
      console.log(`开始执行索引为 ${index} 的请求函数`)
      request();
      console.log(`索引为 ${index} 的请求函数执行完毕`)
    } else {
      console.error(`索引为 ${index} 的subscribe不是函数，其值为：`, request)
    }
  })
  subscribes = []
  } 

// 验证长token 去请求新的短token
export const refreshToken = async () => {
  if (!flag) {
    flag = true; // 开始刷新token
    const rfk = getItem(REFRESH_TOKEN) || "" 
    const [err, res] = await api.refreshToken( {}, {
      headers: {
        [PASS]: `Bearer ${rfk}`
      }
    })
    if (!err) {
      const result = res.data.data
      // 刷新成功，存储新token
      setItem(ACCESS_TOKEN, result.info.accessToken)
      setItem(REFRESH_TOKEN, result.info.refreshToken)
      store.commit('user/setAccessToken',result.info.accessToken)
      store.commit('user/setRefreshToken', result.info.refreshToken)
      flag = false
      // 重试之前失败的请求
      retryRequest()
    }else {
      flag = false
      removeItem(REFRESH_TOKEN)
    } 
  }
}