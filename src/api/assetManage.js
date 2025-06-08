import request from '../utils/request'

// 查询固定资产列表
export const assetList = (params) => {
    return request.get('/asset', { params })
}

// 创建固定资产
export const assetCreate = (body) => {
    return request.get('/asset', body)
}

