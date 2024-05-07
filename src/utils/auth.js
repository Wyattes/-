import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant.js'

// 登录时设置当前时间
export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now())
}

// 获取时间
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME)
}

// 判断是否超时
export const diffTokenTime = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  return currentTime - tokenTime > TOKEN_TIME_VALUE
}
