// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import "./common/js/index"
import VueAMap from 'vue-amap';
import cn from '../static/lang/zhCHS'
import en from '../static/lang/en'

//引用图片点击预览组件
import 'viewerjs/dist/viewer.css'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

import VueViewer from 'v-viewer'

Vue.use(VueViewer);

const i18n = new VueI18n({
  locale: 'CN',    // 语言标识
  messages: {
    // CN: require('../static/lang/zhCHS'),   // 中文语言包
    // EN: require('../static/lang/en')    // 英文语言包
    CN: cn,   // 中文语言包
    EN: en   // 英文语言包
  },
});

// console.log(VueViewer);
// Viewer.setDefaults({
//   "inline": true,
//   "button": false,
//   "navbar": false,
//   "tooltip": false
// })
// console.log(VueViewer.default);
// VueViewer.setDefaults({
//   defaultOptions: {

//   }
// });
// "inline": true, //启用 inline 模式
// "button": false, //显示右上角关闭按钮
// "navbar": false, //	显示缩略图导航
// "title": false, //显示当前图片的标题
// "toolbar": false, //显示工具栏
// "tooltip": false, //显示缩放百分比
// "movable": true, //图片是否可移动
// "zoomable": true, //图片是否可缩放
// "rotatable": true, //图片是否可旋转
// "scalable": true, //图片是否可翻转
// "transition": true, //使用 CSS3 过度
// "fullscreen": true, //播放时是否全屏
// "keyboard": false, //是否支持键盘
// "url": "data-source" //设置大图片的 url

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: 'f50df840d14861c95415ec7742d42d86',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.Transfer'],
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
