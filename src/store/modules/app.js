import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    siderType: true,
    lang: localStorage.getItem('lang') || ''
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    // 控制menu的伸缩
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changLang(state, lang) {
      state.lang = lang
    }
  },
  actions: {
    // 通过action来操作登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // 拿数据
        loginApi(userInfo).then(res => {
          console.log(res)
          // store 的 state.token 状态将被更新为 res.token
          commit('setToken', res.token)
          // 记录登录时间
          setTokenTime()
          // 登录后跳转
          router.replace('/')
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 退出操作
    logout({ commit }) {
      // 将token变为空
      commit('setToken', '')
      // 清空一下localStorage
      localStorage.clear()
      router.replace('/login')
    }
  }
}
