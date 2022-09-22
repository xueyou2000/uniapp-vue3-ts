import type { MockMethod, Recordable } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/info',
    method: 'post',
    timeout: 2000,
    response({ body }: { url: Recordable; body: Recordable; query: Recordable; headers: Recordable }) {
      return {
        code: '0',
        data: {
          name: '非酋国酋长',
          avatar: '',
          chainAddress: 'hdie8d2jdj3ei'
        }
      }
    }
  }
] as MockMethod[]
