import type { MockMethod, Recordable } from 'vite-plugin-mock'

export default [
  {
    url: '/api/get',
    method: 'get',
    response({ query }: { url: Recordable; body: Recordable; query: Recordable; headers: Recordable }) {
      return {
        code: '0',
        data: {
          name: 'vben',
          ...query
        }
      }
    }
  }
] as MockMethod[]
