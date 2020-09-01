## 食用指南
### 1. store文件夹不用管,配置的store以及中间件
### 2.在actions中的某个模块定义如下内容
```
export const TEST_ACTION = 'TEST_ACTION' // 定义action的type

// 封装了一下对象
function testFuction(data) {
  return ({
    type: TEST_ACTION,
    data: data
  })
}

// 暴露方法给组件使用
export function testAction(data) {
  return function (dispatch) {
    dispatch(testFuction(data))
  }
}
```
如果是异步操作的话
```
export function testAsyncAction(param) {
  return function (dispatch) {
    dispatch({ type: USER_START })
    return Http.getMemberDefaultAddress(param).then((res) => {
      if (!res) throw new Error(res)
      dispatch(addAddress(res));
      return res;
    }).catch(() => {
      dispatch({ type: USER_ERROR })
      return {};
    });
  }
}
```
### 3.在reducer中操作数据
```
const thisData = {
  isFetching: false,
  testText: '测试文本' // 这是数据
}
export default function common(state = thisData, action) {
  switch (action.type) {
    case USER_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case TEST_ACTION: // 写个case
      return Object.assign({}, state, {
        isFetching: false,
        testText: action.data,
      })
    case USER_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state
  }
}
```
### 4.然后在reducers/index中引入并暴露出去
```
import common from './common'

export default combineReducers({
  common
})
```
### 5.在组件中使用
```
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { testAction } from '@/redux/actions/common'

function mapStateToProps(state) {
  return {
    testText: state.common.testText
  }
}
function mapDispatchToProps(dispatch) {
  return {
    test: bindActionCreators(testAction, dispatch)
  }
}
@connect(mapStateToProps, mapDispatchToProps)
```
通过`this.props.testText`可以获取到`testText`,通过`this.props.test(val)`可以触发定义在action中的`testAsyncAction`方法