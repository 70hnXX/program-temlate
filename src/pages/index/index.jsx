import React, { PureComponent } from 'react'
import './index.scss'
import Example from '../example'

export default class Index extends PureComponent {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Example />
      </View>
    )
  }
}
