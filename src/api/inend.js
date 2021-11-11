import request from '@/utils/request'

export function list(data) {
    return request({url: 'inends', method: 'get', data})
}
export function create(data) {
    return request({url: 'inends', method: 'post', data})
}

export function remove(data) {
    return request({url: 'inends', method: 'delete', data})
}

export function detail(data) {
    return request({url: 'inends', method: 'get', data})
}
