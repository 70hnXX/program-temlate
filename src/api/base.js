import axios from 'axios'
import {
    getToken,
    removeToken
} from '@/utils/auth'
import {
    MessageBox,
    Loading,
} from 'element-ui'
import qs from 'qs'
import router from '../router/index'
import code from '../config/code.js'
let loadOption = {
    fullscreen: true,
    lock: true,
    text: "Loading",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
};
const service = axios.create({
    baseURL: "",
    timeout: 1000000,
    crossDomain: true == !(document.all)
})
var showModal = true // 控制弹窗显示

service.defaults.retry = 4;
service.defaults.retryDelay = 5000;
// 防止多次请求
// 正在进行中的请求列表
let reqList = []

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
const stopRepeatRequest = function(reqList, url, cancel, errorMessage) {
    const errorMsg = errorMessage || ''
    for (let i = 0; i < reqList.length; i++) {
        if (reqList[i] === url) {
            cancel(errorMsg)
            return
        }
    }
    reqList.push(url)
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function(reqList, url) {
    for (let i = 0; i < reqList.length; i++) {
        if (reqList[i] === url) {
            reqList.splice(i, 1)
            break
        }
    }
}

service.interceptors.request.use(config => {
    // 不需要弹出loading的可以用下面方式过滤
    // if (config.url.indexOf('task/listCountBy') == -1 && config.url.indexOf("task/getAllService") == -1) {
    //     Loading.service(loadOption)
    // }

    if (getToken()) {
        config.headers['accessToken'] = getToken()
        config.headers['projectId'] = "b54657268dc2416a8fd4748a10c1f441"
    }

    if (config.method === 'get' || config.method === 'post') {
        //如果是get或post请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
        config.paramsSerializer = function(params) {
            return qs.stringify(params, {
                arrayFormat: 'repeat'
            })
        }
    }
    // 新增的防抖逻辑
    // let cancel
    // config.cancelToken = new axios.CancelToken(function (c) {
    //     cancel = c
    // })
    // stopRepeatRequest(reqList, config.url, cancel, `${config.url} 请求被中断`)
    // setTimeout(() => {
    //     allowRequest(reqList, config.url)
    // }, 1000)
    return config

}, error => {
    Promise.reject(error)
})

function showMessageNoJump(msg) {
    if (showModal) {
        showModal = false
        MessageBox.alert(msg, '提示', {
            type: "warning",
            dangerouslyUseHTMLString: true,
            message: '<pre style="max-height:350px;overflow-y: auto;">' + msg + '</pre>',
            customClass: 'customClass',
            callback: () => {
                showModal = true
            }
        });
    }
}

function showMessage(msg) {
    if (showModal) {
        showModal = false
        MessageBox.alert(msg, '提示', {
            type: "warning",
            dangerouslyUseHTMLString: true,
            message: '<pre style="max-height:350px;overflow-y: auto;">' + msg + '</pre>',
            customClass: 'customClass',
            callback: () => {
                // 清除失效token
                removeToken();
                //跳转登录页
                router.push({
                    path: '/login',
                    query: {
                        redirect: location.hostname
                    }
                })
                showModal = true
            }
        });
    }
}


service.interceptors.response.use(
    response => {
        Loading.service(loadOption).close()
            // ...请求成功后的后续操作
        const res = response.data
        if (!res.code) {
            return res
        } else {
            if (res.code == code.unauthorized) {
                //跳转登录页
                router.push({
                    path: '/login',
                })
                showMessage("登录信息已过期,请重新登录")
            }
            if (res.code !== code.success) {
                showMessageNoJump(res.message)
            }
            return res
        }
    },
    err => {
        Loading.service(loadOption).close()
        if (err.message && !err.response) {
            MessageBox.alert(err.message, '提示', {
                type: 'error',
                confirmButtonText: '确定',
                callback: () => {}
            })
        }
        if (err.response) {
            MessageBox.alert(err.response.data.message, '提示', {
                type: 'error',
                confirmButtonText: '确定',
                callback: () => {}
            })
        }
        return Promise.reject(err);
    }
)
export default service