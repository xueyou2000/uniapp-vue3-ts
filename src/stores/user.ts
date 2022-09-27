import { defineStore } from 'pinia'
import { getToken, setToken, showModal, logger } from '@/helpers'
import { getUserInfo } from '@/service/user'
import { LOGIN_PAGE } from '@/constants'

export interface UserStoreState {
  /** 用户信息 */
  userInfo?: UserInfo
}

export interface UserStoreGetters {
  /** 是否已登录 */
  logged: () => boolean
  [key: string]: () => unknown
}

// defineStore<string, UserStoreState, UserStoreGetters>
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: undefined
    } as UserStoreState
  },
  getters: {
    logged: () => !!getToken()
  },
  actions: {
    getUserInfo() {
      getUserInfo()
        .then((data) => {
          this.userInfo = data
        })
        .catch((error) => {
          logger.error('getUserInfo:' + error)
        })
    },
    authorityExpired() {
      showModal({
        title: '请重新登录。'
      })
      setToken()
      this.userInfo = undefined
      uni.reLaunch({
        url: LOGIN_PAGE
      })
    },
    copyChinaAddr() {
      if (this.userInfo) {
        uni.setClipboardData({
          data: this.userInfo?.chainAddress,
          showToast: true,
          fail: (error) => {
            logger.error('copyChinaAddr:' + error)
            uni.showToast({
              title: '拷贝失败',
              icon: 'error'
            })
          }
        })
      }
    }
  }
})
