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