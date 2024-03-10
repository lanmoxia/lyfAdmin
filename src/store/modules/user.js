import { login, getPermission } from '@/api'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN, USERINFO } from '@/constant'
import { setTimeStamp } from '@/utils/auth'
import { formatPermissionList } from '@/utils/index'
import router, { resetRouter } from '@/router'
import { ElMessage } from "element-plus"


export default {
    namespaced: true,
    state: () => ({
        token: getItem(TOKEN) || '',
        userInfo: getItem(USERINFO) || {},
        roles: [],
        buttons: []
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
            setItem(TOKEN, token)
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
        },
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
                        console.log('data', data)
                        this.commit('user/setToken', data.obj.sys_token)
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
            this.commit('user/setToken', '')
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
