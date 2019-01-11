import "./dom"
import "../css/reset.css"
import Vue from 'vue'
import rem from "./util";
import fastclick from 'fastclick'
import 'babel-polyfill'
import router from "../../router";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'


Vue.use(VueDirectiveImagePreviewer)
Vue.use(VueAwesomeSwiper);

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
fastclick.attach(document.body);
//
new rem({
  desinWidth: 750, //750这个值，根据设计师的psd宽度来修改，是多少就写多少，插件默认750
  num: 100         //100这个值，是1rem = 100px的比例 默认100比1的 可修改自己的比例 计算
});


