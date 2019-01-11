<template>
  <div class="returnpoint">

    <div class="title-wrap">
      <div class="img-wrap" @click="back">
      </div>
      <div class="title">回停车点</div>
    </div>

    <div class="list-wrap">
      <ul>
        <li class="start">
          <em></em>
          <div v-html="position"></div>
        </li>
        <li class="by">
          <em>换<br/>乘</em>
          <div>{{getstation}}</div>
        </li>
        <li class="end">
          <em></em>
          <div>{{destination}}</div>
        </li>
      </ul>
    </div>

    <div class="img-map" id="img-wrap"></div>

    <div id="panel" style="display: none;"></div>

    <div class="steplist">
      <ul class="main-line">
        <li class="walk start">
          <em>起</em>
          <p>我的位置</p>
        </li>
        <li v-for="item in list" class="walk" :class="getclass(item)">
          <em></em>
          <p>{{item.instruction}}</p>
        </li>
        <li class="bus Transfer">
          <em>换</em>
          <p>{{getstation}}</p>
          <ul class="sub-line">
            <li class="car">
              <span>航展接驳车 - {{destination}}</span>
            </li>
            <li>
              <span>{{getstation}} 上车</span>
            </li>
            <li>
              <span>{{destination}} 下车</span>
            </li>
          </ul>
        </li>
        <li class="end">
          <em>终</em>
          <p>{{destination}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {baseurl} from "common/js/config";
  import http from 'api/https'

  export default {
    name: "returnpoint",
    data() {
      return {
        params: [],
        getLng: "",
        getLat: "",
        map: "",
        position: '',
        parkingPosition: "",
        parkingstation: "",
        Walking: "",
        list: [],
        id: "",
        destination: this.$route.params.name//目的地
      }
    },
    computed: {
      getpoint() {
        // this.destination='p6停车停车场'
        //console.log(this.destination);
        if (this.destination.match(/p6/i)) {
          return [113.380658, 22.013624]
        } else {

          return [113.395158, 22.022997]
        }
      },
      getstation() {
        //console.log(this.destination);
        if (this.destination.match(/p6/i)) {
          return "航展馆P1停车场"
        } else {
          return '航展馆P2停车场'
        }
      },

    },
    mounted() {
      // console.log(this.$router.params.id)
      this.initmap();
      this.initdata();


    },
    methods: {
      initdata: async function () {
        // console.log(this.id);
        // debugger
        const url = `${baseurl}/booking/getParkingLocation.do`
        const par = {
          airParkingLocationId: this.$route.params.id,
        };
        const res = await http.get(url, par);
        console.log(par);
        if (res.data.code === "200") {
          console.log(res);
          this.parkingPosition = res.data.data.parkingPosition
          this.$nextTick().then(() => {
            this.search()
          })

        }

      },
      back() {
        this.$router.back()
      },
      initialization() {
        let _this = this;
        _this.id = _this.$route.params.id;
        console.log(this.id);
        this.geocoder.getAddress(this.params, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            _this.position = result.regeocode.formattedAddress;
            _this.$nextTick(() => {
              _this.search()
            })
            //_this.search()
            //debugger
          }
        })
      },
      initmap() {
        let _this = this;
        let map = new AMap.Map('img-wrap', {
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
              _this.getLng = data.position.getLng();//当前经纬度
              _this.getLat = data.position.getLat();//当前经纬度
              _this.params.push(JSON.stringify(data.position.getLng()));
              _this.params.push(JSON.stringify(data.position.getLat()));
              console.log(_this.getLng);
              _this.$nextTick(() => {
                //地理编码
                _this.initialization();

              });
            }
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', function (data) {
          });      //返回定位出错信息
        });
        AMap.plugin('AMap.Geocoder', function () {
          _this.geocoder = new AMap.Geocoder({
            city: "0756",
            radius: 1000
          });
        });
//        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
//          map.addControl(new AMap.ToolBar());
//          map.addControl(new AMap.Scale());
//        });
        AMap.plugin('AMap.Transfer', function () {
          _this.transfer = new AMap.Transfer({
            map: _this.map,
            city: '珠海市',
            panel: 'panel',
            // policy: _this.map.TransferPolicy.LEAST_TIME //乘车策略
          });

        });
        AMap.plugin('AMap.Walking', function () {
          _this.Walking = new AMap.Walking({
            map: _this.map,
            panel: "panel",
            city: '珠海市',
          });

        })
      },
      search() {
        const _this = this;
        console.log(_this.getLng);
        console.log(_this.getpoint);

        _this.Walking.search([
          //{keyword: "粤财大厦", city: "珠海"},
          //{keyword: "珠海航展馆P1停车场", city: "珠海"}
          // {keyword: "粤财大厦", city: "珠海"},
          //{keyword: _this.getpoint, city: "珠海"}
          _this.getLng, _this.getLat
        ], _this.getpoint, function (a, b) {
          _this.list = _this.noarmallist(b)
          //   console.log(b);
        })

      },
      noarmallist(list) {
        let arr = [];
        const a = list.routes[0].steps;
        for (let i in a) {
          arr.push({
            instruction: a[i].instruction
          })
        }
        return arr
      },
      getclass(item) {
        const direction = item.instruction.substring(item.instruction.indexOf("米")+1);
        console.log(direction);
        if(direction == "左转"){
          return 'left'
        }
        else if(direction == "右转"){
          return 'right'
        }
        else if(direction == "向左前方行走"){
          return 'lefttop'
        }
        else if(direction == "向右前方行走"){
          return 'righttop'
        }
        else {
          return 'go'
        }
      }
    }
  }
</script>

<style lang="less">
  .returnpoint {
    .amap-logo {
      display: none !important;
    }
    .amap-copyright {
      display: none !important;
    }
  }
</style>
<style scoped lang="less">
  .returnpoint {
    .title-wrap {
      position: relative;
      z-index: 99;
      background: #fff;
      height: 1.04rem;
      .title {
        line-height: 1.04rem;
        text-align: center;
        color: #1c9ae3;
        font-size: .36rem;
      }
      .img-wrap {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0.7rem;
        background: url("../../assets/images/back-left.png") no-repeat 0.3rem center;
        background-size: 0.32rem 0.32rem;
      }
    }

    .list-wrap {
      position: relative;
      z-index: 9;
      padding: 0 .3rem .3rem;
      background: #fff;
      box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .4);
      li {
        overflow: hidden;
        height: .82rem;
        line-height: .82rem;
        background: #f9f9f9;
        position: relative;
        em {
          position: absolute;
          left: .3rem;
          top: 50%;
          line-height: .3rem;
          font-size: .24rem;
          color: #aaa;
          transform: translate(0, -50%);
        }
        div {
          margin: 0 .3rem 0 .8rem;
          height: .8rem;
          border-bottom: 1px solid #d9d9d9;
          line-height: .82rem;
          font-size: .28rem;
          color: #333;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        &.start {
          border-radius: .08rem .08rem 0 0;
          em {
            width: .16rem;
            height: .16rem;
            border-radius: 50%;
            background: #1c9ae3;
          }
        }
        &.by em {
          left: .24rem;
        }
        &.end {
          border-radius: 0 0 .08rem .08rem;
          em {
            width: .16rem;
            height: .16rem;
            border-radius: 50%;
            background: #ef5151;
          }
          div {
            border-bottom: none;
          }
        }
      }
    }

    .img-map {
      width: 100%;
      height: 5rem;
    }

    .steplist {
      padding-top: .3rem;
      .main-line{
        &>li{
          padding: 0 .3rem .4rem 1.1rem;
          position: relative;
          font-size: 0;
          &>em{
            position: absolute;
            left: .3rem;
            top: 0;
            z-index: 99;
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
            background: #d9d9d9;
            line-height: .6rem;
            text-align: center;
            font-size: .28rem;
            color: #ffffff;
          }
          &>p{
            font-size: .32rem;
            line-height: .46rem;
            padding: .07rem 0;
            color: #444;
          }
          &.walk{
            &:before{
               content: "";
               display: block;
               position: absolute;
               left: .57rem;
               top:0;
               bottom: 0;
               border-left: .06rem dotted #d9d9d9;
             }
            &>em{
              background-repeat: no-repeat;
              background-position: center center;
              background-size: .4rem .4rem;
            }
            &.go>em{
               background-image: url("../../assets/images/navigation/go_icon.png");
             }
            &.left>em{
               background-image: url("../../assets/images/navigation/turnleft_icon.png");
             }
            &.right>em{
               background-image: url("../../assets/images/navigation/turnright_icon.png");
             }
            &.lefttop>em{
               background-image: url("../../assets/images/navigation/lefttop_icon.png");
             }
            &.righttop>em{
               background-image: url("../../assets/images/navigation/righttop_icon.png");
             }
          }
          &.bus{
            padding-bottom: .2rem;
            &:before{
               content: "";
               display: block;
               position: absolute;
               left: .57rem;
               top:0;
               bottom: 0;
               border-left: .06rem solid #1c9ae3;
             }
           }
          &.start{
            &>p{
              font-weight: bold;
            }
            &>em{
              background: #1c9ae3 !important;
            }
          }
          &.Transfer{
            &>p{
              font-weight: bold;
            }
            &>em{
              background: #999 !important;
            }
          }
          &.end{
            &>p{
              font-weight: bold;
            }
            &>em{
              background: #ef5151 !important;
            }
          }
        }
      }
      .sub-line{
        margin: .2rem -.3rem 0 -1.2rem;
        padding: .3rem .3rem .3rem 1.2rem;
        background: #f7fbfc;
        li{
          padding-bottom: .1rem;
          font-size: 0;
          span{
            line-height: .36rem;
            font-size: .26rem;
            color: #555;
          }
          &.car{
           margin-bottom: .1rem;
            span{
              display: inline-block;
              line-height: .46rem;
              font-size: .32rem;
              color: #fff;
              background: #1c9ae3;
              padding: 0 .1rem;
              border-radius: .08rem;
            }
          }
          &:last-child{
            padding-bottom: 0;
           }
        }
      }
    }
  }
</style>
