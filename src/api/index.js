import request from '../utils/request' 

// 接口测试
export const health = () => {
    return request.get('/health')
}