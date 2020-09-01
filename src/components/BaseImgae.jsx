/**
 * 自适应高度图片组件
 * Created by leiyin on 2020/08/19.
 */
import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types';
import { Image } from '@tarojs/components'

function BaseImgae({ src, width }) {
  
  const [height, setHeight] = useState(0);

  //图片加载事件
  const onLoadEventDetail = useCallback(({ detail }) => {
    let cuuretHeight = detail.height / detail.width * width //按图片比例设置图片高度
    setHeight(cuuretHeight)
  }, [])

  let imgWidth = Taro.pxTransform(width) //图片当前宽度
  let imgHeight = Taro.pxTransform(height) //图片当前高度

  return (
    <Image src={src} style={{ width: imgWidth, height: imgHeight }} onLoad={onLoadEventDetail} />
  );
}

BaseImgae.propTypes = {
  width: PropTypes.number,   //图片宽度，按750设计稿设置
  src: PropTypes.string,     //图片路径
};

export default React.memo(BaseImgae);