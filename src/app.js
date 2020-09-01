import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configStore from './redux/store'
import './app.scss'
import './global.js'

const store = configStore()

class App extends Component {

  //小程序初始化,全局只触发一次
  onLaunch() {
    // let user_info = Taro.getStorageSync(USER_INFO);

    // //判断用户是否有注册小程序信息
    // if (!user_info) {
    //   Taro.reLaunch({ url: LOGIN })
    //   return;
    // }
    // //保存用户信息到store里
    // store.dispatch({ type: 'GET_USER_INFO', data: user_info })
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
