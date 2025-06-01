import request from '../../utils/request'

// 查询科目类型列表
export const accountSubTypeList = () => {
    return request.get('/finance/chartOfAccounts/type/list')
}

// 查看会计科目
export const accountSubList = (params) => {
    return request.get('/finance/chartOfAccounts/list', { params })
}

// 创建会计科目
export const accountSubCreate = (data) => {
    return request.post('/finance/chartOfAccounts/create', data)
}

// 删除会计科目
export const accountSubDelete = (id, data) => {
    return request.delete(`/finance/chartOfAccounts/delete/${id}`, data)
}

// 修改会计科目
export const accountSubUpdate = (id, data) => {
    return request.put(`/finance/chartOfAccounts/update/${id}`, data)
}