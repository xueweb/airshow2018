<template>
  <div class="usermap">
    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">馆内导航</div>
        <div class="right" @click="loadingmap">平面图</div>
      </div>
    </div>
    <div id="panel" style="display: none"></div>
    <div class="map-cont" id="map-content">
      <div class="search-box" @click="show">
        <span v-html="query" ref="query"></span>
        <em>▼</em>
        <!--<div class="msg"></div>-->
      </div>
      <div class="msg-wrap" ref="msg">
        <p class="msg">
          请在航展馆内使用该导航
        </p>
      </div>
    </div>

    <div>
      <mode :list="list" ref="mode" @selcetItem="selcetItem"></mode>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import mode from 'base/modal/modal'

  export default {
    name: 'usermap',
    data() {
      return {
        log: [],
        params: [],
        item: '',
        map:"",
        getLng: '',
        Marker1: "",
        location: require('../../assets/images/456.png'),
        getLat: "",
        walking: '',
        query: '你想去哪？',
        list: [
          {name: '①号门', lon: [113.377592, 22.010884]},
          {name: '②号门', lon: [113.386534, 22.018807]},
          {name: '③号门', lon: [113.38905, 22.021512]},
          {name: '⑤号门', lon: [113.39236, 22.017857]},
          {name: '航空航天馆', lon: [113.387945, 22.016962]},
          {name: '中国兵器馆(8号馆)', lon: [113.385284, 22.017936]},
          {name: '9号馆', lon: [113.387715, 22.020183]},
          {name: '10号馆', lon: [113.383466, 22.016573]},
          {name: '厕所', lon: [113.384372, 22.017164]},
          {name: '新闻中心', lon: [113.391502, 22.022129]},
          {name: '地面动态演示区', lon: [113.393197, 22.022109]},
          {name: '飞机展坪', lon: [113.389287,22.016045]},
          {name: 'A餐厅', lon: [113.389946, 22.020885]},
          {name: 'B餐厅', lon: [113.391834, 22.019114]},
          {name: 'C餐厅', lon: [113.378048, 22.012778]},
          {name: 'D餐厅', lon: [113.39162, 22.022665]},
          {name: 'A贵宾房', lon: [113.381198, 22.011982]},
          {name: 'B贵宾房', lon: [113.380447, 22.011106]},
          {name: 'C贵宾房', lon: [113.379492, 22.010679]},
          {name: 'D贵宾房', lon: [113.379159, 22.009933]},
          {name: '办证大厅（门票咨询）', lon: [113.378166, 22.012057]},
          {name: 'P1停车场', lon: [113.376754, 22.010848]},
          {name: 'P2停车场', lon: [113.395579, 22.024152]},
        ]
      }
    },
    components: {
      mode
    },
    mounted() {
      this.init()
    },
    methods: {
      selcetItem(item) {
        const _this = this
        this.query = item.name;
        const arr = [];
        arr.push(this.log[0]);
        arr.push(this.log[1]);
        const arr2 = [];
        arr2.push(item.lon[0]);
        arr2.push(item.lon[1]);
        //要改
        //  this.walking.search([113.39162, 22.022665], item.lon);
        this.walking.search(_this.log, item.lon);
        setTimeout(() => {
          this.$refs.mode.refresh()
        }, 20);
        this.$refs.msg.style.display = 'none'
      },
      show() {
        this.$refs.mode.show();
        setTimeout(() => {
          this.$refs.mode.refresh()
        }, 20)
      },
      back() {
//        this.$router.push({
//          name: 'index'
//        })
        this.$router.back()
      },
      loadingmap() {
        this.$router.push({
          path: 'mapimg'
        })
      },
      addMarker() {
       // alert(_this.getLng)
        //alert(_this.getLat)
        const _this = this;
        _this.Marker1 = new AMap.Marker({
          icon: _this.location,
          position: [_this.getLng, _this.getLat],
          offset: new AMap.Pixel(-13, -30)
        });
        //alert(_this.map);
        _this.Marker1.setMap(_this.map)
      },
      init() {
        let _this = this;

        let map = new AMap.Map('map-content', {
          center: [113.510306, 22.222376],
          resizeEnable: true,
          zoom: 10,
          lang: "zh"
        });
        _this.map=map
        AMap.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          });
         // map.clearMap();
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', function (data) {
            if (data) {
             // console.log(data);

              if (!_this.log.length) {
                _this.log.push(data.position.lng);
                _this.log.push(data.position.lat);
                _this.getLng = data.position.lng;
                _this.getLat = data.position.lat;
                map.clearMap();
                // console.log(_this.log);
                if (data.position.lng && data.position.lat) {
                  _this.addMarker();

                }
              }
            }
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', function (data) {
            console.log(data)
          });      //返回定位出错信息
        });
//        AMap.plugin(['AMap.Scale'], function () {
//          // map.addControl(new AMap.ToolBar())
//          map.addControl(new AMap.Scale())
//        });

        _this.walking = new AMap.Walking({
          map: map,
          panel: "panel"
        });
        // console.log(_this.log);
        //console.log(_this.item.log)
        //map.clearMap();

      },
    }
  }
</script>
<style scoped lang="less">
  .usermap {
    position: relative;
    .fix-wrap{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index:99;
      .title-wrap {
        height: 1.18rem;
        width: 100%;
        font-size: .36rem;
        background-image:-webkit-linear-gradient(135deg, #42ade4, #1791de);
        background-image:-moz-linear-gradient(135deg, #42ade4, #1791de);
        background-image:-o-linear-gradient(135deg, #42ade4, #1791de);
        background-image: linear-gradient(-135deg,#42ade4,#1791de);
        position: relative;
        .icon {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: .7rem;
          background: url("../../assets/images/back02.png") no-repeat .3rem center;
          background-size: .32rem .32rem;
        }
        .txt {
          text-align: center;
          line-height: 1.18rem;
          color: #fff;
          font-size: .4rem;
        }
        .right{
          position: absolute;
          right: .3rem;
          top: 0rem;
          line-height: 1.2rem;
          font-size: .32rem;
          color: #c6e4f7;
        }
      }
    }
    #map-content {
      position: fixed;
      top: 1.18rem;
      right: 0;
      bottom: 0;
      left:0;
      .search-box {
        position: absolute;
        top:.3rem;
        left: .9rem;
        right: .9rem;
        z-index: 100;
        height: .9rem;
        background: #fff;
        box-shadow: 0 .2rem .5rem rgba(207,215,219,.4);
        border-radius: .45rem;
        padding: 0 .3rem;
        span {
          float: left;
          color: #333;
          font-size: .32rem;
          line-height: .9rem;
          vertical-align: middle;
        }
        em{
          position: absolute;
          right: .3rem;
          top: 0;
          bottom: 0;
          line-height: .9rem;
          color: #808080;
          font-size: .3rem;
          opacity: .8;
        }
      }
      .msg-wrap{
        position: absolute;
        bottom: .6rem;
        left: 0;
        right: 0;
        z-index: 99;
        text-align: center;
        .msg{
          display: inline-block;
          line-height: .86rem;
          font-size: .3rem;
          color: #fff;
          background: rgba(0,0,0,.7);
          box-shadow: 0 .23rem .8rem rgba(0,0,0,.3);
          border-radius: .08rem;
          padding: 0 .4rem;
        }
      }
    }
  }
</style>
