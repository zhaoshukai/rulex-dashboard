import request from '@/utils/request'
// {
//     "code" : 200,
//     "msg" : "......",
//     "data" : {
//         "token": "defe7c05fea849c78cec647273427ee7",
//         "userNick": "演示用户",
//         "userName": "demo",
//         "roleType": 3,
//         "roleTypeName": null
//     },
//     "time" : "2021-11-10 15:53:12",
//     "success" : true
// }
export function login(data) {
    return request({url: '/vue-admin-template/user/login', method: 'post', data})
}

export function getInfo(token) {
    return request({url: '/vue-admin-template/user/info', method: 'get', params: {
            token
        }})
}

export function logout() {
    return request({url: '/vue-admin-template/user/logout', method: 'post'})
}
