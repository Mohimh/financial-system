import request from '../../utils/request'

// 查询资金流水列表
export const fundList = () => {
    return request.get('/fund')
}

// 查询资金流水详情
export const fundDetailList = (id) => {
    return request.get(`/fund/${id}`)
}

// 查询资金流水类型列表
export const fundType = (id) => {
    return request.get('/fund/type')
}

// 资金统计
export const fundStatistics = () => {
    return request.get('/fund/statistics')
}

// 查询账户余额
export const fundBalance = (params) => {
    return request.get('/fund/balance', { params })
}

// 创建资金流水
export const fundCreate = (data) => {
    return request.post('/fund', data)
}