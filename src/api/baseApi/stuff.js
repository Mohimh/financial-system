import request from '../../utils/request'

// 获取员工列表
export const stuffList = (params) => {
    return request.get('/stuff', { params })
}

// 获取未成为员工的用户
export const nonEmployeeList = () => {
    return request.get('/user/nonEmployeeList')
}

// 获取用户详情列表
export const userList = (id) => {
    return request.get(`/user/${id}`)
}

// 获取员工详情信息
export const stuffDetailList = (id) => {
    return request.get(`/stuff/${id}`)
}

// 创建员工
export const stuffCreate = (data) => {
    return request.post('/stuff', data)
}

// 删除员工
export const stuffDel = (id) => {
    return request.delete(`/stuff/${id}`)
}
