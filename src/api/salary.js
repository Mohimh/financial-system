import request from '../utils/request'

// 查询工资记录列表
export const salaryList = (params) => {
    return request.get('/salary', { params })
}

// 创建工资记录
export const salaryCreate = (data) => {
    return request.post('/salary', data)
}