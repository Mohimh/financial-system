import request from '../utils/request'

// 获取部门详情
export const departmentDetail = (id) => {
    return request.get(`/department/detail/${id}`)
}

// 获取部门列表
export const departmentList = (params) => {
    return request.get('/department/list', { params })
}

// 获取正常状态部门列表
export const departmentActiveList = () => {
    return request.get('/department/active/list')
}

// 创建部门
export const departmentCreate = (data) => {
    return request.post('/department/create', data)
}

// 删除部门
export const departmentDelete = (id, data) => {
    return request.delete(`/department/delete/${id}`, data)
}

// 更新部门信息
export const departmentUpdate = (id, data) => {
    return request.put(`/department/update/${id}`, data)
}