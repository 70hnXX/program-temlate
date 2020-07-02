import ajax from './base'

const baseUrl =  menu_port

/*
* 用户登录
* /v1/login
* */
export const queryPermission = (data) => ajax({
    url: baseUrl + '/permissions',
    method: 'GET',
    params: {
        id: data.id,
        type: data.type
    }
})

export const getRoles = () => ajax({
    url: baseUrl + '/roles?type=1&pageNumber=1&pageSize=1000&filter=projectId=b54657268dc2416a8fd4748a10c1f441',
    method: 'GET'
})

