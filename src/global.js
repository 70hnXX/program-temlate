import { Swiper, SwiperItem, Image, ScrollView, Form, Switch, Input, Textarea, Picker, WebView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { BaseText, BaseButton, BaseView, DataList } from './components/'

/**插件库 */
global.Taro = Taro
/**Taro 基础组件 */
global.Swiper = Swiper
global.SwiperItem = SwiperItem
global.ScrollView = ScrollView
global.Form = Form
global.Input = Input
global.Textarea = Textarea
global.Picker = Picker
global.WebView = WebView
/**自定义组件 */
global.Text = BaseText
global.Button = BaseButton
global.View = BaseView
global.DataList = DataList