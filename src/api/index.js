import request from '../utils/request' 

// 接口测试
export const health = () => {
    return request.get('/health')
}

// 验证码接口
export const getCode = (data) => {
    return request.post('/base/captcha', data)
}

// 员工列表
// export const stuffList = (params) => {
//     return request.get
// }