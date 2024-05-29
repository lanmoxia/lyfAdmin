import {api} from '@/api'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { ACCESS_TOKEN,REFRESH_TOKEN,USERINFO } from '@/constant'
import { setTimeStamp } from '@/utils/auth'
import router, { resetRouter } from '@/router'

export default {
    namespaced: true,
    state: () => ({
      accessToken: getItem(ACCESS_TOKEN) || '',
      refreshToken: getItem(REFRESH_TOKEN) || '',
      userInfo: getItem(USERINFO) || {},
      roles: [],
      buttons: [],
      isLoading: false,
      activeState: "login",
      // 登录标志位解决登录与token缺失报错提示重叠
      justLoggedIn: false
    }),
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token
            setItem(ACCESS_TOKEN, token)
        },
        setRefreshToken(state, token) {
            state.refreshToken = token
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
        },
        setLoadingState: (state,bool) => {
          state.isLoading = bool
        },
        setActiveState: (state,str) => {
          state.activeState = str
        },
        setJustLoggedIn(state, flag) {
          state.justLoggedIn = flag
        }
    },
    actions: {
        async login(context, userInfo) {
          const { username, password, captcha_code, code_key } = userInfo
          const [err,res] = await api.userLogin({username,password,captcha_code,code_key})
          const result = res.data
          this.commit('user/setAccessToken', result.accessToken)
          this.commit('user/setRefreshToken', result.refreshToken)
          this.commit('user/setUserInfo', result.info)
          this.commit('user/setJustLoggedIn', true)
          // 保存登录时间
          setTimeStamp()          
        },
        async mobileLogin(context,userInfo){
          const { mobile, sms_code} = userInfo
          const [err,res] = await api.mobileLogin({ mobile,sms_code})
          const result = res.data.data
          this.commit('user/setAccessToken', result.accessToken)
          this.commit('user/setRefreshToken', result.refreshToken)
          this.commit('user/setUserInfo', result.info)
          // 保存登录时间
          setTimeStamp()
        },
        async getPermissionData() {
          const [err,res] = await api.userPermissions()
          if(!err){
            const menuList = res.data[0].menus.map(obj => {
              let result = { unique: obj.unique,sort: obj.sort }
              if (obj.icon && obj.icon.trim() !== '') {
                result.icon = obj.icon.replace(/<\?xml.*?\?>|<!DOCTYPE.*?>/g, '')
              }
              return result
            })
            const resourcesList = res.data[0].resources.map(obj => ({
              name: obj.name,
              url: obj.unique
            }))
            this.commit('user/setRoles', menuList)
            this.commit('user/setButtons', resourcesList)
            return menuList
          }
        },
        logout() {
            console.log('退出登录')
            resetRouter()
            this.commit('user/setAccessToken', '')
            this.commit('user/setRefreshToken', '')
            this.commit('user/setUserInfo', {})
            this.commit('user/setRoles', [])
            this.commit('user/setButtons', [])
            this.commit('app/removeTagsView', {
                type: 'all'
            })
            this.commit('user/setJustLoggedIn', false)
            removeAllItem()
            router.push('/login')          
        },
        updateUserInfo({state},updatedData){
          const updatedUserInfo = { ...state.userInfo, ...updatedData };
          this.commit('user/setUserInfo', updatedUserInfo);
        },
        loginBtnLoading(){
          this.commit('user/setLoadingState', false)
        }
    }
}
