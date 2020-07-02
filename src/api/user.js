import ajax from './base'

const baseUrl = login_port

export const session = (data) => ajax({
    url: baseUrl + '/session',
    method: 'POST',
    data: {
        accountName: data.accountName,
        accountPasswd: data.accountPasswd
    }
})

/*
 * 退出登录
 * /v1/logout
 * */
export const logOut = () => ajax({
    url: baseUrl + '/session/logout',
    method: 'POST'
})

// 校验密码
export const validatePassword = (data) => ajax({
    url: baseUrl + '/session/paaswd',
    method: 'POST',
    data: data
})

// 修改密码
export const resetPassword = (data) => ajax({
    url: baseUrl + '/accounts/password/update',
    method: 'POST',
    data: data
})

// 获取用户
export const accountList = (params) => ajax({
    url: baseUrl + '/accounts',
    method: 'GET',
    params
})

// 新增和修改用户
export const addOrUpdate = (data) => ajax({
    url: baseUrl + '/usermanager/addOrUpdate',
    method: 'POST',
    data
})

// 更新用户状态
export const updateUserInfo = (data) => ajax({
    url: baseUrl + '/accounts/common/' + data.accountId,
    method: 'POST',
    data: data
})

// 获取组织信息
export const orgTree = () => ajax({
    url: baseUrl + '/organization/treeList',
    method: 'GET'
})