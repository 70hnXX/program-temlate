import { USER_START, USER_ERROR, TEST_ACTION } from '../actions/common'
/**
 * @param isFetching    是否获取数据标志
 * @param testText      测试
 */
const thisData = {
  isFetching: false,
  testText: '测试文本'
}
export default function common(state = thisData, action) {
  switch (action.type) {
    case USER_START:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case TEST_ACTION:
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