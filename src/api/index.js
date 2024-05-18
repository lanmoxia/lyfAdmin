import {commonApi} from './path/common'
import {permissionApi} from './path/permission'
import {userApi} from './path/user'

export const api = {
  ...commonApi,
  ...permissionApi,
  ...userApi,
}