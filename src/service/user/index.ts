import { uanInstance } from '@/helpers'

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return uanInstance
    .post<TResponseData, TRequestData, IRequestResponse<TResponseData<UserInfo>, TRequestData>>('/api/user/info', {}, { showError: true })
    .then((res) => res.data?.data)
}
