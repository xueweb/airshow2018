<template>
  <div class="packing-detail">

    <div class="title-wrap">
      <div class="icon" @click="back">
      </div>
      <div class="txt">{{ $t("msg.Parkingdetails") }}</div>
    </div>

    <div class="ticket-detail">
      <div class="bg"></div>
      <div class="ticket-box">
        <div class="btn-box">
          <button type="button" class="btn blue" @click="loginpoint" v-show="initlag()===true"><span>返回停车点</span></button>
          <button type="button" class="btn" @click="close"><span>{{ $t("msg.stopcar") }}</span></button>
        </div>
        <div class="img-box">
          <div id="map-content" class="map-content"></div>
          <p>{{ $t("msg.Locationinformationwhenparking") }}</p>
        </div>
        <div class="detail-box">
          <ul>
            <li style="width: 100%;">
              <em>{{ $t("msg.Parkingpoint") }}</em>
              <span class="blue" v-html="result.parkingLotName"></span>
            </li>
          </ul>
          <ul>
            <li>
              <em>{{ $t("msg.Parkingdate") }}</em>
              <span v-html="result.parkingDay"></span>
            </li>
            <li>
              <em>{{ $t("msg.time") }}</em>
              <span v-html="result.parkingTime"></span>
            </li>
            <li style="width: 100%;">
              <em>{{ $t("msg.add") }}</em>
              <span v-html="result.parkingPosition" style="font-size: .3rem;"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-wrap">
        <p class="txt" v-show="initlag()===true">
          注：请在停车当日及时取走车辆，以免影响次日停车场工作，谢谢配合！
        </p>
      </div>
    </div>

    <!--取消停车记录弹窗-->
    <div class="cacelmodel" v-show="modelflag">
      <div class="wrap">
        <div class="img-wrap">
          <img src="../../assets/images/icon.png" alt=""/>
        </div>
        <h4 class="title" v-html="txt"></h4>
        <div class="btn-cont">
          <button class="btn" @click="confirm">{{ $t("msg.confirm") }}</button>
          <button class="btn blue" @click="cancleBtn">{{ $t("msg.Decidetocancel") }}</button>
        </div>
      </div>
      <div class="mode" @click.stop="confirm"></div>
    </div>

    <!--预约成功弹窗-->
    <div class="cacelmodel" v-show="successflag">
      <div class="wrap">
        <div class="img-wrap right-img">
          <img src="../../assets/images/right.png" alt="">
        </div>
        <h4 class="title" style="margin-bottom: .3rem;">{{ $t("msg.Positioningsuccess") }}</h4>
        <p v-show="initlag()===true">
          <span>已为您记录了当前停车点信息<br/>返程请点击“返回停车点”进入导航</span>
        </p>
        <div class="btn-cont">
          <button class="btn blue" @click="finish" style="margin-right: 0">{{ $t("msg.OK") }}</button>
        </div>
      </div>
      <div class="mode" @click="finish"></div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import {baseurl} from "common/js/config";
  import http from 'api/https'
  import {mapMutations} from 'vuex'

  export default {
    name: 'packing-detail',
    data() {
      return {
        params: {},
        result: '',
        modelflag: false,
        successflag: this.$route.params.userid,
        id: "",
        Marker10: "",
        Marker11: "",
        blue: require('../../assets/images/123.png'),
        location: require('../../assets/images/456.png'),
        icon: require('../../assets/images/ss.png'),
        map: "",
        txt:"是否确定取消该停车记录？"

      }
    },
    mounted() {
      this.init()
      this.initlag()
    },
    methods: {
      ...mapMutations({
        setaddress: 'SET_ADDRESS'
      }),
      initlag() {
        if (this.$i18n.locale === "EN") {
          this.txt="Is it necessary to cancel the parking record?"
          return false
        } else {
          return true
        }
      },
      addMarker(mark, lon, lat, icon) {
        const _this = this;
        if (mark) mark.setMap(null)
        mark = new AMap.Marker({
          icon: icon,
          position: [lon, lat],
          offset: new AMap.Pixel(-13, -30),
          zIndex: 999
        });
        mark.setMap(_this.map);
        // _this.map(zoom)
        // console.log(_this.map);

      },

      initMap: async function () {
        const _this = this
        const url = `${baseurl}/booking/nowLocation.do`;
        console.log(this.params);
         const params = {
           lon: 113.219762,
           lat: 22.222088
         };
        // debugger
        // let params = this.params;
        // console.log(this.params);


        const res = await http.post(url, params);
        if (res.data.code === '200') {
          console.log(res);
          this.result = res.data.data;
          this.setaddress(res.data.data)
          //store.set("result", res.data.data);
          console.log(this.result)
          this.addMarker(_this.Marker10, res.data.data.parkingLon, res.data.data.parkingLat, _this.blue);
          this.addMarker(_this.Marker11, this.params.lon, this.params.lat, _this.location);

          _this.map.setFitView();

        }
      },
      init() {
        let _this = this;
        let map = new AMap.Map('map-content', {
          center: [113.510306, 22.222376],
          resizeEnable: true,
          zoom: 14,
          lang: "zh"
        });
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
              // console.log(data)
              _this.params.lon = data.position.getLng()
              _this.params.lat = data.position.getLat()
              _this.initMap()
              //地理编码
            }
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', function (data) {
            console.log(data)
          });      //返回定位出错信息
        });
        AMap.plugin('AMap.Geocoder', function () {
          _this.geocoder = new AMap.Geocoder({
            city: "0756", //城市设为北京，默认：“全国”
            radius: 1000 //范围，默认：500
          });
        });
//        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
//          map.addControl(new AMap.ToolBar())
//          map.addControl(new AMap.Scale())
//        });
        _this.map = map

      },
      loginpoint() {
        this.$router.push({
            name: 'returnpoint',
            params: {
              id: this.result.id,
              name: this.result.parkingLotName
            }
          }
        )
      },
      back() {
        this.$router.push({
          name: 'index'
        })
      },
      close() {
        this.modelflag = true;
      },
      cancleBtn() {
        this.setaddress(1)
        this.$nextTick(() => {
          this.$router.push({
            name: "index"
          })
        })
      },
      confirm() {
        this.modelflag = false;
      },
      finish() {
        this.successflag = false
      },
    }
  }
</script>
<style scoped lang="less">
  .packing-detail {

    .title-wrap {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;
      height: 1.18rem;
      background-image: linear-gradient(90deg, #1791de, #42ade4);
      width: 100%;
      font-size: .36rem;
      .icon {
        position: absolute;
        left: 0;
        top: 0;
        width: .7rem;
        height: 1.2rem;
        background: url("../../assets/images/back02.png") no-repeat .3rem center;
        background-size: .32rem .32rem;
      }
      .txt {
        text-align: center;
        line-height: 1.2rem;
        color: #fff;
        font-size: .4rem;
      }
    }

    .ticket-detail {
      padding-top: 1.17rem;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .bg {
        height: 3.9rem;
        background-image: linear-gradient(90deg, #1791de, #42ade4);
      }
      .ticket-box {
        margin: -3.53rem .6rem .3rem;
        background: #fff;
        border-radius: .1rem;
        box-shadow: 0 .1rem .4rem rgba(188, 196, 199, .5);
        .btn-box {
          padding: .4rem .3rem;
          border-bottom: 1px dashed #dadada;
          display: flex;
          flex-direction: row;
          font-size: 0;
          .btn {
            width: 1.9rem;
            height: .84rem;
            outline: none;
            text-align: center;
            border: 1px solid #a5a5a5;
            background: #fff;
            border-radius: .5rem;
            span {
              display: inline-block;
              font-size: .32rem;
              color: #828282;
              line-height: .84rem;
            }
            &.blue {
              border-color: #2291e1;
              margin-right: .3rem;
              span {
                color: #2291e1;
                padding-left: .52rem;
                background: url("../../assets/images/dh_icon2.png") no-repeat left center;
                background-size: .4rem .4rem;
              }
            }
            &:first-child {
              flex: 1;
            }
          }
        }
        .img-box {
          border-bottom: 1px dashed #dadada;
          .map-content {
            display: block;
            margin: .3rem;
            height: 3.6rem;
          }
          p {
            text-align: center;
            font-size: .26rem;
            color: #a5a5a5;
            line-height: 1.1;
            margin-bottom: .3rem;
          }
        }
        .detail-box {
          padding: .5rem .3rem .2rem;
          ul {
            overflow: hidden;
            li {
              float: left;
              width: 50%;
              margin-bottom: .32rem;
              em {
                display: block;
                font-size: .26rem;
                color: #a5a5a5;
                line-height: 1.1;
                margin-bottom: .1rem;
              }
              span {
                display: block;
                font-size: .36rem;
                color: #333;
                line-height: 1.1;
                &.blue {
                  color: #1c9ae3;
                }
                &.orange {
                  color: #f39700;
                }
              }
            }
          }
        }
      }
      .btn-wrap {
        position: relative;
        margin: 0 .6rem .6rem;
        .txt {
          font-size: .28rem;
          color: #828282;
          line-height: .42rem;
          margin-bottom: .6rem;
        }
      }
    }

    .cacelmodel {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
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
          &.right-img {
            background-image: -webkit-linear-gradient(135deg, #1fecb4, #13c897);
            background-image: -moz-linear-gradient(135deg, #1fecb4, #13c897);
            background-image: -o-linear-gradient(135deg, #1fecb4, #13c897);
            background-image: linear-gradient(-135deg, #1fecb4, #13c897);
            box-shadow: 0 .1rem .3rem rgba(18, 213, 160, .4);
          }
        }
        .title {
          font-size: .38rem;
          text-align: center;
          line-height: .38rem;
          color: #333;
          font-weight: bold;
          margin: .2rem 0 .8rem;
        }
        p {
          padding: 0 .3rem .2rem;
          line-height: .42rem;
          color: #828282;
          font-size: .32rem;
          text-align: center;
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
            &:first-child {
              margin-right: .3rem;
            }
          }
          .blue {
            background: #1c9ae3;
            border: 1px solid #1c9ae3;
            color: #fff;
          }
        }
      }
    }

  }

</style>
