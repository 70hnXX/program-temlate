import React, { PureComponent } from 'react'
import styles from './index.modules.scss'

export default class Index extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      baseListConfig: {
        url: 'api-url',
        query: {
          param1: 1,
          param2: 2
        }
      }
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onGetUserInfo = (e) => {
    if (!e.detail.userInfo) {
      Taro.showToast({
        title: '未授权',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let userInfo = e.detail
    console.log(userInfo)
  }
  renderItem = ({ index, data }) => {
    const { id } = data
    return <View>{id}</View>
  }
  render() {
    const { baseListConfig } = this.state
    return (
      <View className='index'>
        <View>组件示例:</View>
        <Text c="R" b ft={36}>Text组件示例</Text>
        <View stopPropagation onClick={() => console.log('点我')}>阻止了默认事件和防抖的view组件</View>
        <View>
          <Text className={styles.title}>按钮示例:</Text>
          <Button>普通按钮</Button>
          <Button openType='getUserInfo' onGetUserInfo={this.onGetUserInfo}>微信账号登录测试(小程序中)</Button>
        </View>
        <View>
          <Text className={styles.title}>滚动加载容器示例:</Text>
          <DataList baseListConfig={baseListConfig}>
            {this.renderItem}
          </DataList>
        </View>
      </View>
    )
  }
}
