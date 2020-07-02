import Cookies from 'js-cookie'

const accessToken = 'Tokens'
//token设置
export function getToken(status) {
	return Cookies.get(status ? status : accessToken)
}

export function setToken(token) {
	return Cookies.set(accessToken, token)
}

export function removeToken() {
	return Cookies.remove(accessToken)
}
//其他cookie设置
export function getCookie(cname) {
	return Cookies.get(cname)
}

export function setCookie (cname,value) {
	return Cookies.set(cname, value)
}
export function removeCookie(cname) {
	return Cookies.remove(cname)
}

/**
 * 获取当前标签的传递参数
 * @param {Array} tabs 标签数据
 */
export const getCurTabParams = (tabs) => {
    if(!tabs || !Array.isArray(tabs)) return {};
    // 查找当前标签
    let curTab = tabs.filter(item => {
        return item.active;
    });
    return curTab.length > 0 ? curTab[0].pParams : {};
}