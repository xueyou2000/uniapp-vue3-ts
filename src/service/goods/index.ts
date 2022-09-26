import { uanInstance } from '@/helpers'

/**
 * 获取用户信息
 */
export function queryMyGoodsByPage(data = { page: 1, page_size: 10, type: 0 }) {
  return uanInstance
    .post<TResponseData, TRequestData, IRequestResponse<TResponseData<MyGoodsInfo[]>, TRequestData>>('/api/my/goods/list', data)
    .then((res) => res.data?.data)
}
