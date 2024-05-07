import request from './request'

export const getUser = (params) => {
  return request({
    url: '/users',
    params // 有参数
    // method: 'GET' get可以省略
  })
}

export const changeUserState = (uId, type) => {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'PUT'
  })
}

export const addUser = (data) => {
  return request({
    url: 'users',
    method: 'POST',
    data
  })
}

export const editUser = (data) => {
  return request({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

export const deleteUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}
