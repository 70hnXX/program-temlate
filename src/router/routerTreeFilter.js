// 递归去给菜单权限的每一项设置vue的path和component
function setComponent(arr) {
  arr.forEach(item => {
    let component = getComponent(item.name, fullRoute.children)
    item.path = component.path
    item.name = component.name
    item.component = component.component
    item.meta = component.meta
    if (component.redirect) {
      item.redirect = component.redirect
    }
    if (item.children && item.children.length > 0) {
      setComponent(item.children)
    }
  })
}
// 根据权限的name参数,去到全路由中去查找对应的路由组件的path/name/component等参数
function getComponent(name, array) {
  let obj = null
  array.forEach(item => {
    if (item.meta.title == name) {
      obj = {
        path: item.path,
        name: item.name,
        component: item.component,
        redirect: item.redirect ? item.redirect : '',
        meta: item.meta
      }
    } else {
      if (item.children && item.children.length > 0) {
        if (getComponent(name, item.children)) {
          obj = getComponent(name, item.children)
        }
      }
    }
  })
  return obj
}