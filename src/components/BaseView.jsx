import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
function BaseView({ children, style, className, onClick, noRepeat, stopPropagation }) {
  let doubleClick //定时器
  let isDisable = false

  useEffect(() => {
    //注册组件销毁函数，清除定时器
    return () => {
      doubleClick && clearTimeout(doubleClick)
    };
  }, [])

  function onBtnClick(e) {
    if (stopPropagation) e.stopPropagation() // 阻止冒泡

    if (isDisable) return
    if (!noRepeat) isDisable = true //防重复点击

    onClick && onClick()

    doubleClick = setTimeout(() => {
      isDisable = false
    }, 1000)
  }

  return (
    <View className={className} onClick={onBtnClick} style={style}>{children}</View>
  )
}
BaseView.propTypes = {
  noRepeat: PropTypes.bool,             //是否关闭防重复点击
  stopPropagation: PropTypes.bool,      //是否开启停止冒泡
}

export default BaseView