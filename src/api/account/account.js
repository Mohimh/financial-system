import request from '../../utils/request'

// 查询账户类型列表
export const accountTypeList = () => {
    return request.get('/account/type')
}

// 查看会计科目
export const accountList = (params) => {
    return request.get('/account', { params })
}

// 创建会计科目
export const accountCreate = (data) => {
    return request.post('/account', data)
}

// 删除会计科目
export const accountDelete = (id, data) => {
    return request.delete(`/account/${id}`, data)
}

// 修改会计科目
export const accountUpdate = (id, data) => {
    return request.put(`/account/${id}`, data)
}