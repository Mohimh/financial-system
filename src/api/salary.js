import request from '../utils/request'

// 查询工资记录列表
export const salaryList = (params) => {
    return request.get('/salary', { params })
}

// 创建工资记录
export const salaryCreate = (data) => {
    return request.post('/salary', data)
}

// 更新工资记录
export const salaryUpdate = (id, data) => {
    return request.put(`/salary/${id}`, data)
}

// 删除工资记录
export const salaryDel = (id, data) => {
    return request.delete(`/salary/${id}`, data)
}

