import request from '@/utils/request'

export function list(data) {
    return request({url: 'inends', method: 'get', data})
}
export function create(data) {
    return request({url: 'inends', method: 'post', data})
}

export function remove(uuid) {
    return request({
        method: 'delete',
        url: 'inends?uuid=' + uuid
    })
}

export function detail(data) {
    return request({
        method: 'get',
        url: 'inends?uuid=' + uuid
    })
}
