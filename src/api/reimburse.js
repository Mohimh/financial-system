import request from '../utils/request'

// 报销单列表查询
// export const reimburseList = (params) => {
//     return request.get('/reimburse/list', { params })
// }
// export const reimburseList = (params) => {
//     return request.get('/reimburse/list', { params })
// }

// 创建报销单
export const reimburseCreate = (data) => {
    return request.post('/reimburse/create', data)
}

// 根据用户角色获取报销单列表
export const reimburseList = (params) => {
    return request.get('/reimburse/role', { params })
}

// 报销审批
export const reimburseApproval = (reimburseId, data) => {
    return request.put(`/reimburse/approval/${reimburseId}`, data)
}

