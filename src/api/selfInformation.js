import request from '../utils/request'

// 修改用户信息接口
export const updateUserInfo = (id, data) => {
    return request.put(`/user/update/${id}`, data)
}

// 修改密码
export const updatePassword = (id, data) => {
    return request.put(`/user/updatePassword/${id}`, data)
}

// 修改头像
export const updateAvatar = (data) => {
    return request.post('/user/avatar', data)
}

// 重置密码
export const userPassword = (id) => {
    return request.put(`/user/password/${id}`)
}