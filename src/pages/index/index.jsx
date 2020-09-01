import React, { PureComponent } from 'react'
import './index.scss'

export default class Index extends PureComponent {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text c="R" b ft={36}>Text组件示例</Text>
      </View>
    )
  }
}
