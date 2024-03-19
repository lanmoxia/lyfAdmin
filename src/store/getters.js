
// import variables from '@/styles/variables.scss'
import variables from '@/styles/variables.module.scss'

const getters = {

  accessToken: state => state.user.accessToken,
  refreshToken: state => state.user.refreshToken,
  userInfo: state => state.user.userInfo,
  cssVar: state => variables,
  sidebarOpened: state => state.app.sidebarOpened,
  tagsViewList: state => state.app.tagsViewList,
  roles: state => state.user.roles,
  buttons: state => state.user.buttons,
  hasRoles: state => {
    return state.user.roles&&state.user.roles.length>0
  },

}
export default getters
