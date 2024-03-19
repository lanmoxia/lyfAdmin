import { login, getPermission} from '@/api'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { ACCESS_TOKEN,REFRESH_TOKEN,USERINFO } from '@/constant'
import { setTimeStamp } from '@/utils/auth'
import { formatPermissionList } from '@/utils/index'
import router, { resetRouter } from '@/router'
import { ElMessage } from "element-plus"


export default {
    namespaced: true,
    state: () => ({
        accessToken: getItem(ACCESS_TOKEN) || '',
        refreshToken: getItem(REFRESH_TOKEN) || '',
        userInfo: getItem(USERINFO) || {},
        roles: [],
        buttons: []
    }),
    mutations: {
        setAccessToken(state, token) {
            state.token = token
            setItem(ACCESS_TOKEN, token)
        },
        setRefreshToken(state, token) {
            state.token = token
            setItem(REFRESH_TOKEN, token)
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            setItem(USERINFO, userInfo)

        },
        setRoles: (state, roles) => {
            state.roles = roles
        },
        setButtons: (state, buttons) => {
            state.buttons = buttons
        }
    },
    actions: {

        login(context, userInfo) {
            const { username, password, captcha_code, code_key } = userInfo
            return new Promise((resolve, reject) => {
                login({
                    username,
                    password,
                    captcha_code,
                    code_key,
                })
                    .then(data => {
                        this.commit('user/setAccessToken', data.accessToken)
                        this.commit('user/setRefreshToken', data.refreshToken)
                        this.commit('user/setUserInfo', data.obj)
                        // 保存登录时间
                        setTimeStamp()
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getPermissionData(context) {
            return new Promise((resolve, reject) => {
                getPermission()
                    .then(data => {
                        let obj = formatPermissionList(data.obj)
                        let role_arr = obj.role_arr
                        let button_arr = obj.button_arr
                        let info = {
                            roles: role_arr
                        }

                        if (role_arr.length == 0) {
                            ElMessage.error("您登录的账号暂无权限！")
                            this.dispatch('user/logout')
                        }
                        this.commit('user/setRoles', role_arr)
                        this.commit('user/setButtons', button_arr)
                        resolve(info)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        logout() {
            resetRouter()
            this.commit('user/setAccessToken', '')
            this.commit('user/setRefreshToken', '')
            this.commit('user/setUserInfo', {})
            this.commit('user/setRoles', [])
            this.commit('user/setButtons', [])
            this.commit('app/removeTagsView', {
                type: 'all'
            })
            removeAllItem()
            router.push('/login')          
        }
    }
}
