import request from '../utils/request' 

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

// 修改用户信息接口
export const updateUserInfo = (id) => {
    return request.post(`/user/update/${id}`)
}

// 获取部门详情
export const departmentDetail = () => {
    return request.get(`/department/detail/${params.id}`)
}

// 获取部门列表
export const departmentList = (params) => {
    return request.get('/department/list', { params })
}

// 创建部门
export const departmentCreate = (data) => {
    return request.post('/department/create', data)
}

// 删除部门
export const departmentDelete = (id) => {
    return request.delete(`/department/delete/${id}`)
}


// 获取员工列表
export const stuffList = (params) => {
    return request.get('/stuff', { params })
}

// 创建员工
export const stuffCreate = (data) => {
    return request.post('/stuff', data)
}

// 删除员工
// export const stuffDel = () => {
//     return request.delete('/stuff/{id}')
// }

// 查询固定资产
export const assetRead = (params) => {
    return request.get('/asset', { params })
} 

// 查询会计科目列表
export const accountRead = (params) => {
    return request.get('/finance/chartOfAccounts/list', { params })
}
