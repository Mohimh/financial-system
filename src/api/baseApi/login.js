import request from '../../utils/request'

// 验证码接口
export const getCode = (data) => {
    return request.post('/base/captcha', data)
}

// 注册接口
export const register = (data) => {
    return request.post('/base/register', data)
}

// 登录接口
export const login = (data) => {
    return request.post('/base/login', data)
}

// 重置密码
export const userPassword = (id) => {
    return request.put(`/user/password/${id}`)
}