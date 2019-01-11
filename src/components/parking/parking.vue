<template>
  <div class="parking">
    <div class="title-wrap">
      <div class="icon" @click.stop="back">
      </div>
      <div class="txt">{{ $t("msg.ParkRide") }}</div>
    </div>
    <div class="location-box">
      <div class="btn-wrap">
        <button type="button" class="btn" @click="check">{{ $t("msg.Markmylocation") }}</button>
      </div>
      <div class="info-wrap">
        <span v-html="add"></span>
        <p v-html="title"></p>
      </div>
      <div class="tip-box" @click.stop="parkingdec">
        <p>{{ $t("msg.txt") }}</p>
      </div>
    </div>
    <div class="map-content">
      <div class="tip-box">
        <p>
          <em class="blue-p"></em> {{ $t("msg.Shuttlebusescarpark") }}<br/>
          <em class="gray-p"></em> {{ $t("msg.Expressbusescarpark") }}
        </p>
      </div>
      <div id="map-content"></div>
    </div>
    <div class="showBox" v-show="flag">
      <div class="wrap">
        <div class="img-wrap">
          <img src="../../assets/images/fail_icon.png" alt=""/>
        </div>
        <h4 class="title">{{ $t("msg.Recordfailure") }}</h4>
        <p class="txt">
          {{ $t("msg.Inordertoprovidebetterreturnservice") }}<br/>
          <span>{{ $t("msg.pakingdetail") }}</span>
        </p>
        <div class="btn-cont">
          <button type="button" class="btn" @click="loginDetail">{{ $t("msg.OK") }}</button>
        </div>
      </div>
      <div class="mode" @click="loginDetail"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {baseurl} from "common/js/config";
  import http from 'api/https'

  export default {
    name: 'parking',
    data() {
      return {
        flag: false,
        params: {},
        addFlag: true,
        title: "",
        add: "",
        Marker1: "",
        Marker2: "",
        Marker3: "",
        Marker4: "",
        Marker5: "",
        Marker6: "",
        Marker7: "",
        Marker8: "",
        Marker9: "",
        Marker10: "",
        blue: require('../../assets/images/123.png'),
        location: require('../../assets/images/456.png'),
        icon: require('../../assets/images/ss.png'),
        value: [],
        options: [
          {
            label: '海泉湾度假村',
          },
          {
            label: 'R1海泉湾停车场',
          }
        ]
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      parkingdec() {
        this.$router.push({
          name: 'parkingdec'
        })
      },
      next2() {
        this.$router.push({
          name: 'driveload'
        })
      },
      check() {
        this.initMap();
        if (!this.addFlag ||!this.add) {
          this.flag = true;
        } else {
          this.$router.push({
            name: "packing-detail",
            params: {userid: 1111}
          })
        }
      },
      //获取地图
      initMap: async function () {
        const url = `${baseurl}/booking/nowLocation.do`;
        const res = await http.get(url, this.params);
        console.log(res);
        if (res.data.code === '802') {
        // this.addFlag = false;
           this.addFlag = true;
        }
      },
      back() {
        this.$router.back()
      },
      init() {
        let _this = this;
        let map = new AMap.Map('map-content', {
          center: [113.510306, 22.222376],
          resizeEnable: true,
          zoom: 10,
          lang: "zh"
        });
        _this.map = map
        AMap.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', function (data) {
            if (data) {
              _this.params.lon = data.position.getLng();
              _this.params.lat = data.position.getLat();
              //_this.params.lon = 113.394063,
              //_this.params.lat = 22.023813
              _this.initMap();
              console.log(data)
              _this.title = data.formattedAddress
              // console.log(data.addresssComponent.building)
              _this.add = data.addressComponent.township;
              console.log(_this.title);
              console.log(_this.add);
              _this.getmap(data.position.getLng(), data.position.getLat())
              //地理编码
              // _this.initialization()
              // _this.regeoCode(params)
            }
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', function (data) {
            console.log(data)
          });      //返回定位出错信息
        });
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          // map.addControl(new AMap.ToolBar())
          //map.addControl(new AMap.Scale())
        });
        AMap.plugin('AMap.Geocoder', function () {
          _this.geocoder = new AMap.Geocoder({
            city: "010", //城市设为北京，默认：“全国”
            radius: 1000 //范围，默认：500
          });
        });
        AMap.plugin('AMap.Marker', function () {

          //P11（国际赛场）
          _this.Marker1 = new AMap.Marker({
            icon: _this.blue,//22.3819800000,113.5689100000
            position: [113.5689100000, 22.3819800000],
            offset: new AMap.Pixel(-13, -30)
          });
          //,P6（银隆公司）113.343426,22.078314
          _this.Marker2 = new AMap.Marker({
            icon: _this.blue,
            position: [113.347986, 22.07693],
            offset: new AMap.Pixel(-13, -30)
          })
          //P7（西部新城B片区）
          _this.Marker3 = new AMap.Marker({
            icon: _this.blue,
            position: [113.328175, 22.109175],
            offset: new AMap.Pixel(-13, -30)
          });
          //22.1587500000,113.2324400000 p8
          _this.Marker4 = new AMap.Marker({
            icon: _this.blue,
            position: [113.233361, 22.157421],
            offset: new AMap.Pixel(-13, -30)
          });
          //22.2244800000,113.2266000000 p9 113.217522,22.219772
          _this.Marker5 = new AMap.Marker({
            icon: _this.blue,
            position: [113.217522, 22.219772],
            offset: new AMap.Pixel(-13, -30)
          });
          //p1-p4停车场
          _this.Marker6 = new AMap.Marker({
            icon: _this.icon, //113.380658,22.013624
            position: [113.380658, 22.013624],
            offset: new AMap.Pixel(-13, -30)
          });
          _this.Marker8 = new AMap.Marker({
            icon: _this.icon,//113.395158,22.022997
            position: [113.395158, 22.022997],
            offset: new AMap.Pixel(-13, -30)
          });
          _this.Marker9 = new AMap.Marker({
            icon: _this.icon,//113.377722,22.011562
            position: [113.377722, 22.011562],
            offset: new AMap.Pixel(-13, -30)
          });
          _this.Marker10 = new AMap.Marker({
            icon: _this.icon,//113.372703,22.005515
            position: [113.372703, 22.005515],
            offset: new AMap.Pixel(-13, -30)
          });
          _this.Marker1.setMap(_this.map);
          _this.Marker2.setMap(_this.map);
          _this.Marker3.setMap(_this.map);
          _this.Marker4.setMap(_this.map);
          _this.Marker5.setMap(_this.map);
          _this.Marker6.setMap(_this.map);
          _this.Marker8.setMap(_this.map);
          _this.Marker9.setMap(_this.map);
          _this.Marker10.setMap(_this.map);

        });
      },
      getmap(a, b) {
        const _this = this;
        _this.Marker7 = new AMap.Marker({
          icon: _this.location,
          position: [a, b,],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker7.setMap(_this.map);
        _this.map.setFitView();
      },
      loginDetail() {
        this.flag = false;
      },
      next() {
        this.$router.push({
          path: '/'
        })
      },
      detail() {
        this.$router.push({
          name: "packing-detail"
        })
      }
    },

  }
</script>
<style lang="less">
  .parking {
    .amap-geolocation-con {
      right: .2rem !important;
      bottom: 1.8rem !important;
    }
    .amap-copyright {
      display: none !important;
    }
  }
</style>
<style scoped lang="less">
  .parking {
    position: relative;
    .title-wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 999;
      height: 1.18rem;
      width: 100%;
      font-size: .36rem;
      background-image: -webkit-linear-gradient(135deg, #42ade4, #1791de);
      background-image: -moz-linear-gradient(135deg, #42ade4, #1791de);
      background-image: -o-linear-gradient(135deg, #42ade4, #1791de);
      background-image: linear-gradient(-135deg, #42ade4, #1791de);
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
    }
    .location-box {
      position: fixed;
      top: 1.18rem;
      left: 0;
      right: 0;
      z-index: 99;
      /*padding: .25rem .3rem .2rem;*/
      padding: .26rem .3rem .8rem;
      background: #fff;
      box-shadow: 0 .1rem .4rem rgba(186, 192, 195, .4);
      .btn-wrap {
        float: right;
        font-size: 0;
        padding-left: .1rem;
        .btn {
          border: 0;
          outline: none;
          /*width: 1.8rem;*/
          height: .86rem;
          line-height: .86rem;
          text-align: center;
          color: #fff;
          font-size: .32rem;
          background: #1c9ae3;
          border-radius: .08rem;
          padding: 0 .2rem;
        }
      }
      .info-wrap {
        min-height: .86rem;
        /*margin-right: 2.1rem;*/
        span {
          display: block;
          height: .45rem;
          line-height: .45rem;
          padding-left: .4rem;
          background: url("../../assets/images/last.png") no-repeat left .02rem;
          background-size: .3rem .36rem;
          font-size: .36rem;
          color: #333;
          margin-bottom: .05rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        p {
          display: block;
          height: .45rem;
          line-height: .36rem;
          font-size: .28rem;
          color: #a5a5a5;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      /*.tip-box{*/
      /*position: absolute;*/
      /*left: .3rem;*/
      /*right: .3rem;*/
      /*top: 100%;*/
      /*margin-top: .2rem;*/
      /*z-index: 99;*/
      /*padding: .3rem;*/
      /*background: rgba(0,0,0,.7);*/
      /*box-shadow: 0 .23rem .8rem rgba(0,0,0,.3);*/
      /*border-radius: .08rem;*/
      /*p {*/
      /*line-height: .4rem;*/
      /*font-size: .28rem;*/
      /*color: #ffffff;*/
      /*}*/
      /*}*/
      .tip-box {
        position: absolute;
        left: .3rem;
        right: .3rem;
        bottom: 0;
        border-top: 1px dashed #dadada;
        p {
          line-height: .7rem;
          font-size: .28rem;
          color: #1c9ae3;
          text-align: right;
        }
      }
    }
    .map-content {
      position: fixed;
      top: 1.18rem;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9;
      #map-content {
        height: 100%;
        width: 100%;
      }
      .tip-box {
        position: fixed;
        right: .2rem;
        bottom: .2rem;
        z-index: 999;
        padding: 0.2rem 0.2rem;
        /*background: rgba(255, 255, 255, 1);*/
        /*box-shadow: 0 0.23rem 0.8rem rgba(0,0,0,.2);*/
        background: rgba(0, 0, 0, .7);
        box-shadow: 0 .23rem .8rem rgba(0, 0, 0, .3);
        p {
          line-height: .56rem;
          font-size: .28rem;
          /*color: #333;*/
          color: #fff;
          em {
            display: inline-block;
            width: .38rem;
            height: .38rem;
            vertical-align: middle;
            background-repeat: no-repeat;
            background-position: left center;
            background-size: .3rem .38rem;
            background-image: url("../../assets/images/gray_p.png");
            &.blue-p {
              background-image: url("../../assets/images/blue_p.png");
            }
          }
        }
      }
    }
    .showBox {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      .mode {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #414c53;
        opacity: .5;
      }
      .wrap {
        position: relative;
        z-index: 99;
        flex: 1;
        background: #fff;
        box-shadow: 0 .23rem .8rem rgba(25, 27, 28, .2);
        border-radius: .08rem;
        margin: -1rem .6rem 0;
        padding: 1.16rem 0 .3rem;
        .img-wrap {
          position: absolute;
          top: -.66rem;
          left: 50%;
          width: 1.32rem;
          height: 1.32rem;
          margin-left: -.66rem;
          background-image: -webkit-linear-gradient(135deg, #fc6c6c, #ef5151);
          background-image: -moz-linear-gradient(135deg, #fc6c6c, #ef5151);
          background-image: -o-linear-gradient(135deg, #fc6c6c, #ef5151);
          background-image: linear-gradient(-135deg, #fc6c6c, #ef5151);
          border-radius: 50%;
          box-shadow: 0 .1rem .3rem rgba(239, 81, 81, .4);
          text-align: center;
          line-height: 1.32rem;
          overflow: hidden;
          img {
            float: left;
            width: 100%;
            height: 100%;
          }
        }
        .title {
          font-size: .36rem;
          text-align: center;
          line-height: .36rem;
          color: #333;
          font-weight: bold;
          margin-bottom: 0.16rem;
        }
        .txt {
          font-size: 0.3rem;
          color: #666666;
          line-height: 0.48rem;
          margin-bottom: 0.3rem;
          text-align: center;
          span {
            color: #1c9ae3;
          }
        }
        .btn-cont {
          text-align: center;
          margin-top: .5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 .3rem;
          .btn {
            flex: 1;
            line-height: .86rem;
            height: .86rem;
            border: 1px solid #bcbcbc;
            border-radius: .08rem;
            font-size: .32rem;
            color: #808080;
            outline: none;
            background: #fff;
          }
        }
      }
    }
  }

</style>
