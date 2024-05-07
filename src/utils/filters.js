const dayjs = require('dayjs')

const filterTimes = (val, format = 'YYYY-MM-DD') => {
   if (!isNull(val)) {
    // 因为时间戳是十位的 正常是13位 所以要进行处理
    // val = parseInt(val) * 1000 也可以用unix
    return dayjs.unix(val).format(format)
   }
}

// 检验是否为空操作
export const isNull = (date) => {
  if (!date) return true
  if (JSON.stringify(date) === '{}') return true
  if (JSON.stringify(date) === '[]') return true
}

// 将其设为全局属性 便于使用 然后要在main.js中传入app
export default (app) => {
  app.config.globalProperties.$filters = {
    filterTimes
  }
}
