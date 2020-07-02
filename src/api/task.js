import ajax from './base'

const baseUrl =  task_port

export const getTaskList = (params) => ajax({
    url: baseUrl + '/task/list',
    method: 'GET',
    params
})

export const updateTaskNameOrDesc = (params) => ajax({
    url: baseUrl + '/task/updateTaskNameOrDesc',
    method: 'POST',
    params
})

export const getAllService = () => ajax({
    url: baseUrl + '/task/getAllService',
    method: 'GET'
})

export const listCountByStatus = (params) => ajax({
    url: baseUrl + '/task/listCountByStatus',
    method: 'GET',
    params
})

export const listCountByServiceStatus = (params) => ajax({
    url: baseUrl + '/task/listCountByServiceStatus',
    method: 'GET',
    params
})

export const updateTaskStatus = (params) => ajax({
    url: baseUrl + '/task/updateTaskStatus',
    method: 'GET',
    params
})