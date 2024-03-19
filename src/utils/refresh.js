import {requestRefreshToken} from '@/api'
import store from '@/store'
import {REFRESH_TOKEN, ACCESS_TOKEN, PASS } from "@/constant"
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
export const sendRefreshToken = () => {
    console.log('token 刷新了')
    if (!flag) {
        flag = true // 关闭开关
        let r_tk = getItem(REFRESH_TOKEN) // 获取长token

        // 携带长token去请求短token
        requestRefreshToken(r_tk).then((res) => {  
            // 长token失效，删除token，重新登录
            if (res.status.error_code === 4004) {
                flag = false
                removeItem(REFRESH_TOKEN)
            } else if (res.status.error_code === 2002) { 
                removeItem(REFRESH_TOKEN)

                // 存储新的短token
                // TODO: store 也需要存一份               
                setItem(ACCESS_TOKEN,res.obj.accessToken)
                setItem(REFRESH_TOKEN,res.obj.refreshToken)
                flag = false
                // 重新请求数据
                retryRequest()
            }
        }).catch(error => {
            console.log('这里是sendRefreshToken的error',error)
        })

    }

}