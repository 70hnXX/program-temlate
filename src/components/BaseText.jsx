import React from 'react'
import PropTypes from 'prop-types';
import { Text } from '@tarojs/components'

function BaseText({ children, style, n, c, b, h, ft, className }) {
  let fontStyle = {
  }
  //统一基础色，W白色。B蓝色。G灰色。O橘色。R红色
  let colors = { W: '#fff', B: '#2778FF', G: '#999', O: '#FA6400', R: '#E02020' }

  if (ft) fontStyle.fontSize = Taro.pxTransform(ft,'750px')
  if (c) fontStyle.color = colors[c]
  if (h) fontStyle.lineHeight = Taro.pxTransform(h,'750px')
  if (b) fontStyle.fontWeight = 'bold'
  if (style) fontStyle = { ...fontStyle, ...style }
  if (n) {
    fontStyle.overflow = 'hidden'
    fontStyle.textOverflow = 'ellipsis'
    fontStyle['-webkit-line-clamp'] = `${n}`
    fontStyle['-webkit-box-orient'] = 'vertical'
    fontStyle.wordBreak = 'break-all'
    fontStyle.display = '-webkit-box'
  }
  return (
    <Text className={className} style={fontStyle}>{children}</Text>
  );
}

BaseText.propTypes = {
  n: PropTypes.number,  //多行文本省略
  b: PropTypes.bool,    //是否加粗
  h: PropTypes.number,  //行高
  ft: PropTypes.number, //字体大小
  c: PropTypes.string,  //颜色
};

export default React.memo(BaseText);