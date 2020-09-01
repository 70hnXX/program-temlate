import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Button } from '@tarojs/components'

function BaseButton({ children, style, className, openType, onClick, noRepeat, formType, onGetUserInfo, disabled, onGetPhoneNumber }) {
  let doubleClick //定时器
  let isDisable = false

  useEffect(() => {
    //注册组件销毁函数，清除定时器
    return () => {
      doubleClick && clearTimeout(doubleClick)
    };
  }, [])

  function onBtnClick(e) {

    e.stopPropagation() // 阻止冒泡

    if (isDisable) return
    if (!noRepeat) isDisable = true //防重复点击

    onClick && onClick()

    doubleClick = setTimeout(() => {
      isDisable = false
    }, 1000);
  }

  return (
    <Button className={className} disabled={disabled} onClick={onBtnClick} openType={openType} formType={formType} onGetUserInfo={onGetUserInfo} onGetPhoneNumber={onGetPhoneNumber} style={style}>{children}</Button>
  );
}
BaseButton.propTypes = {
  noRepeat: PropTypes.bool,               //是否关闭防重复点击
  disabled: PropTypes.bool,               //是否禁用
  openType: PropTypes.string,             //微信开放能力
  onGetUserInfo: PropTypes.func,          //授权登录获取用户信息回调函数
  onGetPhoneNumber: PropTypes.func,       //授权获取手机号回调函数
};

export default React.memo(BaseButton);