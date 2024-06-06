
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
  isProgress: state => state.user.isProgress,
  progressNum: state => state.user.progressNum,
  isLoading: state => state.user.isLoading,
  activeState: state => state.user.activeState,
  // 检查菜单显示隐藏
  visibleMenuItems: state=> {
    return getters.roles.filter(item => !item.hidden)
  }
}
export default getters
