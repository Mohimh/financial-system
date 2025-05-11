import request from '../utils/request' 

// 验证码接口
export const getCode = (data) => {
    return request.post('/base/captcha', data)
}

// 注册接口
export const register = (data) => {
    return request.post('/base/register', data)
}

export const login = (data) => {
    return request.post('/base/login', data)
}

// 员工列表
export const stuffList = (params) => {
    return request.get('/stuff', { params })
}

// 创建员工
export const stuffCreate = (data) => {
    return request.post('/stuff', data)
}

// 删除员工
export const stuffDel = () => {
    return request.delete('/stuff/{id}')
}

