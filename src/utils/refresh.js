import requests from '@/api/request'
import { ACCESS_TOKEN, REFRESH_TOKEN, AUTH,PASS } from "@/constant"
import {getItem,setItem,removeItem} from '@/utils/storage'
let subscribes = []
let flag = false // 设置开关，保证一次只能请求一次短token，防止客户多点操作，多次请求
export const addRequest = (request) => {
    subscribes.push(request)
}

export const retryRequest = () => {
    console.log('重新请求上次中断的数据');
    subscribes.forEach(request => request())
    subscribes = []
}

// 验证长token 去请求新的短token
export const refreshToken = () => {
console.log('触发刷新 token 请求了')
    if (!flag) {
        flag = true // 关闭开关
        let r_tk = getItem(REFRESH_TOKEN) // 获取长token

        // 携带长token去请求短token
        requests.post('/refresh', Object.assign({}, {
            headers: { [PASS]: r_tk }       
        })).then((res) => {
            // 长token失效，删除token，重新登录
            if (res.code === 4004) {
                console.log('4004')
                flag = false
                removeItem(REFRESH_TOKEN)
            } else if (res.code === 2002) { //长token有效，请求到新的token，重新存储
                console.log('2002')
                removeItem(REFRESH_TOKEN)
                // 存储新的短token
                console.log('accessToken',res.data.accessToken)
                console.log('refreshToken',res.data.refreshToken)
                console.log(typeof(res.data.refreshToken))
                setItem(ACCESS_TOKEN,res.data.accessToken)
                setItem(REFRESH_TOKEN,res.data.refreshToken)
                flag = false
                // 重新请求数据
                retryRequest()
            }

        })

    }

}