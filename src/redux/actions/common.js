/**
 * 定义公共常量
 */
export const USER_START = 'USER_START'
export const USER_ERROR = 'USER_ERROR'
export const TEST_ACTION = 'TEST_ACTION' // 测试

function testFuction(data) {
  return ({
    type: TEST_ACTION,
    data: data
  })
}

export function testAction(data) {
  return function (dispatch) {
    //本地保存用户信息
    dispatch(testFuction(data))
  }
}

// 异步操作
// export function testAsyncAction(param) {
//   return function (dispatch) {
//     dispatch({ type: USER_START })
//     return Http.getMemberDefaultAddress(param).then((res) => {
//       if (!res) throw new Error(res)
//       dispatch(addAddress(res));
//       return res;
//     }).catch(() => {
//       dispatch({ type: USER_ERROR })
//       return {};
//     });
//   }
// }