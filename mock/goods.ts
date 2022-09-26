import type { MockMethod, Recordable } from 'vite-plugin-mock'
import { Random } from 'mockjs'

export default [
  {
    url: '/api/my/goods/list',
    method: 'post',
    timeout: 300,
    response({ body }: { url: Recordable; body: Recordable; query: Recordable; headers: Recordable }) {
      const { page, page_size, type } = body

      function createData(): MyGoodsInfo {
        return {
          goods_pid: Random.increment(),
          goods_thumb: Random.image('330x330'),
          goods_name: Random.first(),
          goods_price: Random.float(60, 100, 0, 2) + '',
          type,
          author_avatar: Random.image('330x330'),
          author_name: Random.name(),
          is_blind_box: 0,
          total: Random.integer(1, 100)
        }
      }

      return {
        code: '0',
        message: '',
        success: true,
        data: page * page_size > 30 ? [] : Array.from({ length: page_size }, createData)
      }
    }
  }
] as MockMethod[]
