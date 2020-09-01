import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { testAction } from '@/redux/actions/common'
import styles from './index.module.scss'
import { Button } from '@tarojs/components'

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

  changeTextValue = () => {
    this.props.test('修改后的值')
  }

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
    const { testText } = this.props
    console.log(styles)
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
          <Text className={styles.title}>redux示例:</Text>
          <View>
            <Button onClick={() => this.changeTextValue()}>修改redux里面的数据</Button>
            <Text className={styles.title}>redux里的值:{testText}</Text>
          </View>
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
