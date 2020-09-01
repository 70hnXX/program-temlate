/**
 * data-list组件，自动滚动加载
 * Created by leiyin on 2020/08/19.
 */
import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

class DataList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      loading: false, //数据正在加载标志
      isFinish: false, //数据加载完毕标志
      size: 10,
      page: 1
    }
  }
  componentDidMount() {
    this.goPage(this.state.page)
  }
  goPage = (page) => {
    const { url, query } = this.props.baseListConfig
    const { size, dataSource } = this.state

    let options = {
      url,
      data: {
        size,
        page,
        ...query
      }
    }
    // Http.callApi(options).then((res) => {
    //   if (!res) return

    //   const { content, totalPages } = res

    //   this.setState({
    //     dataSource: dataSource.concat(content),
    //     page: page,
    //   }, () => {
    //     this.setState({ loading: false })
    //   })

    //   if (page === totalPages || content.length === 0) {
    //     this.setState({ isFinish: true })
    //     return;
    //   }
    // }).catch(() => { })
  }
  onScrollToLower = () => {
    const { loading, page, isFinish } = this.state

    if (loading || isFinish) return;

    this.setState({ loading: true })
    this.goPage(page + 1)
  }
  render() {
    const { children } = this.props
    const { dataSource, isFinish } = this.state

    let items = []
    dataSource.forEach((item, index) => {
      items.push(createElement(children, {
        key: item.id | index,
        data: item
      }))
    })

    let isEmpty = dataSource.length === 0

    return (
      <ScrollView className='contain' scrollY onScrollToLower={this.onScrollToLower} lowerThreshold={50}>
        {items}
        {isEmpty && <View className={styles.noResult}>
          {/* <Image src={Assets.iconNoResult} className={styles.iconNoResult} /> */}
          <Text>暂无数据</Text>
        </View>}
        {(!isEmpty && isFinish) && <View className={styles.noMore}>
          {/* <Image src={Assets.logo} className={styles.logo} /> */}
          <Text>已全部加载完毕</Text>
        </View>}
      </ScrollView>
    )
  }
}
/**
* baseListConfig 配置项
* @param {Object} baseListConfig 
* @param {String} baseListConfig.url 访问接口地址
* @param {Object} baseListConfig.query 传参
*/
DataList.propTypes = {
  baseListConfig: PropTypes.object.isRequired,    //列表配置项
}
export default DataList