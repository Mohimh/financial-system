import request from '../utils/request'

// 报销单列表查询
export const reimburseList = (params) => {
    return request.get('/reimburse/list', { params })
}

// 创建报销单
export const reimburseCreate = (data) => {
    return request.get('/reimburse/create', data)
}