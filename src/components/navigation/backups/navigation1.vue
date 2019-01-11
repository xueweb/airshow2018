<template>
  <transition name="slide" mode="in-out">
    <div class="navigation">

      <div class="title-wrap">
        <div class="img-wrap" @click="back">
        </div>
        <span :class="{active:currentIndex===0}" @click.stop="change" class="go">去航展</span>
        <img src="../../assets/images/change.png" alt="" class="icon"/>
        <span :class="{active:currentIndex===1}" @click.stop="change2" class="back">回乘车点</span>
      </div>

      <div class="current" v-show="currentIndex===0">
        <div class="list-wrap">
          <ul>
            <li class="start">
              <em></em>
              <div v-html="position"></div>
            </li>
            <li class="by" @click="showMadal">
              <em>换<br/>乘</em>
              <div v-html="ridePoint"></div>
            </li>
            <li class="end">
              <em></em>
              <div v-text="destination"></div>
            </li>
          </ul>
        </div>

        <div class="main">

          <div class="map-wrap" id="img-wrap"></div>

          <div class="bus-wrap">
            <p class="tip">
              推荐公交线路：<span>（其他交通方式请自行选用高德导航）</span>
            </p>
            <swiper :options="swiperOption" ref="mySwiper" v-show="position">
              <swiper-slide class="box" v-for="(item,index) in getbus()" :key="index" :class="{active:currentcls===index}">
                <div class="bus" @click="selcetCar(index)">
                  <p>
                    <span>{{item.bus}}</span>
                    <span>航展专线巴士</span>
                  </p>
                  <p class="sub">共计 {{item.nub+1}} 站</p>
                </div>
              </swiper-slide>
            </swiper>
          </div>

          <div class="map-container" id="container-map">
            <div id="container"></div>
            <div id="panel" style="display: none"></div>
            <div class="list" v-show="position">
              <div class="title clearfix">
                <div class="left">起</div>
                <div class="right">我的位置</div>
              </div>
              <ul>
                <li v-for="(item,index) in lastlist " class="item">
                  <ul>
                    <li v-for="(load,index) of item">
                      <div class="direction">
                        <div>{{index+1}}.{{load.instruction}}</div>
                        <div>
                          <ul>
                            <li v-for="item in load.via_stops">{{item.name}}</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <div class="bottom clearfix">
                <div class="left">换</div>
                <div class="add" v-html="ridePoint"></div>
              </div>
              <div class="bus-station">
                <div class="wrap">
                  <p class="item">开往珠海航展馆方向</p>
                  <p class="item">{{ridePoint}} 上车</p>
                  <p class="item">珠海航展馆P2停车场 下车</p>
                </div>
              </div>
              <div class="bottom clearfix">
                <div class="left" style="background: #ee5150">终</div>
                <div class="add">珠海航展馆P2停车场</div>
              </div>
            </div>
            <div style="width: 100%;height: 4rem;font-size: .3rem;line-height: 4rem;text-align: center"
                 v-show="!position">系统定位失败了哦！
            </div>
          </div>

        </div>
        <modal ref="modal" :list="list" @selcetItem="selcet"></modal>
      </div>
      <div class="next" v-show="currentIndex===1">
        <div class="list-wrap">
          <ul>
            <li class="start">
              <em></em>
              <div v-html="positionb"></div>
            </li>
            <li class="end" @click="showMadal">
              <em></em>
              <div v-text="backridePoint"></div>
            </li>
          </ul>
        </div>
        <!--//地图-->
        <div id="wrap2" style="width: 100%;height: 5rem;position: relative"></div>
        <div id="wrap3" style="display: none;width: 1rem;height: 1rem"></div>
        <div style="width: 100%;height: 6.5rem;position: relative;display: none" id="img-wrap2"></div>
        <div class="list" style="padding-top: .5rem">
          <div class="title clearfix">
            <div class="left">起</div>
            <div class="right">我的位置</div>
          </div>
          <ul>
            <li class="item">
              <ul>
                <li>
                  <div class="direction">{{item.instruction}}</div>
                </li>
              </ul>
            </li>
          </ul>
          <div class="bottom clearfix">
            <div class="left">换</div>
            <div class="add">P2停车场</div>
          </div>
          <div class="bus-station">
            <div class="wrap">
              <p class="item">开往<span v-html="backridePoint"></span>方向</p>
              <p class="item">P2停车场 上车</p>
              <p class="item"><span v-html="backridePoint"></span> 下车</p>
            </div>
          </div>
          <div class="bottom clearfix">
            <div class="left" style="background: #ee5150">终</div>
            <div class="add" v-html="backridePoint"></div>
          </div>
        </div>
        <div style="width: 100%;height: 4rem;font-size: .3rem;text-align: center;line-height: 4rem" v-show="!positionb">
          系统定位失败了哦！
        </div>
      </div>
      <modal ref="modal" :list="list" @selcetItem="selcet"></modal>
    </div>
  </transition>

</template>
<script type="text/ecmascript-6">
  import modal from 'base/modal/modal'
  import {baseurl} from "common/js/config";
  import http from "api/https"
  import {mapGetters, mapMutations} from 'vuex'
  import store from 'store'

  export default {
    name: "navigation",
    data() {
      return {
        getLng: "",
        getLat: "",
        params: [],
        position: "", //当前定位点
        destination: '珠海航展馆P2停车场',
        ridePoint: "",
        list: [],
        currentIndex: 0,
        transfer: "",
        result: [], //公交导航轨迹
        lastlist: [], //公交数据列表
        swiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 10
        },
        currentcls: 0, //选中车辆颜色
        backridePoint: "",
        positionb: ""


      }
    },
    mounted() {
      //初始化地图
      this.initmap()
      this.initstation()
      //获取所有乘车点

    },
    components: {
      modal
    },
    methods: {
      back() {
        this.$router.push({
          name: 'index'
        })

      },
      change() {
        this.currentIndex = 0;

      },
      change2() {
        this.currentIndex = 1;
        //  this.initializationb();
        this.$nextTick(() => {
          //  this.initc();
        });

      },
      initmap() {
        let _this = this;
        let map = new AMap.Map('img-wrap', {
          center: [113.510306, 22.222376],
          resizeEnable: true,
          zoom: 10,
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
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', function (data) {
            if (data) {
              _this.getLng = data.position.getLng();//当前经纬度
              _this.getLat = data.position.getLat();//当前经纬度
              _this.params.push(JSON.stringify(data.position.getLng()));
              _this.params.push(JSON.stringify(data.position.getLat()));
              //地理编码获取路线
              _this.initialization();
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
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        });
        AMap.plugin('AMap.Transfer', function () {
          _this.transfer = new AMap.Transfer({
            map: _this.map,
            city: '珠海市',
            panel: 'panel',
            // policy: _this.map.TransferPolicy.LEAST_TIME //乘车策略
          });

        });
        _this.map = map


      },
      initialization() {
        let _this = this;
        this.geocoder.getAddress(this.params, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            _this.position = result.regeocode.formattedAddress;
            // if (_this.query.name) {
            if (false) {
              //   _this.getstore()

            } else {
              if (_this.set) {
                //从选选择乘车点进来
                // console.log(_this.user);
                //    let item = _this.user.airRidePoint;
                // debugger
                //_this.search(item);

                // debugger
              } else {
                //  let item = _this.user.airRideQrCode.airRidePoint;
                //  debugger
                //const a=_this.list[0].name;
                //   _this.search(item);
                // debugger

              }
            }
          }
        })

      },
      //获取乘车点信息
      initstation: async function () {
        const _this = this
        const url = `${baseurl}/booking/getAllPoint.do`;
        // const user = this.user.id ? this.user.id : _this.user.airRideQrCode.id
        let par;
        //console.log(user)
        // if (user) {
        //   par = {
        //     qrcodeId: user
        //   };
        //
        // } else {
        //   par = {
        //     qrcodeId: ''
        //   };
        //
        // }
        const res = await http.get(url, par);
        console.log(par);
        console.log(res)
        if (res.data.code === '200') {
          //  debugger
          this.list = this.normallist(res.data.data.allAirRidePoint)
          // if (res.data.data.nowAiRidePoint) {
          //   this.ridePoint = res.data.data.nowAiRidePoint.position;
          // } else {
          //   this.ridePoint = this.list[0].name;
          //   if (!_this.set) {
          //     console.log(_this.user)
          //     // debugger
          //     // this.ridePoint = this.user.ridePoint.name
          //   }
          // }


        }

      },
      drawRoute(route) {
        const _this = this;
        console.log(route);
        // debugger
        let startMarker = new AMap.Marker({
          position: route.segments[0].transit.origin,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          map: _this.map
        });

        let endMarker = new AMap.Marker(
          {
            position: route.segments[route.segments.length - 1].transit.destination,
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            map: _this.map
          });
        let routeLines = []

        for (let i = 0, l = route.segments.length; i < l; i++) {
          let segment = route.segments[i]
          let line = null
          routeLines = []

          // 绘制步行路线
          if (segment.transit_mode === 'BUS') {
            line = new AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: '#ffeeee',
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: '#0091ff',
              lineJoin: 'round',
              strokeStyle: 'solid'
            })
            line.setMap(_this.map)
            routeLines.push(line)
            console.log(routeLines);
            // debugger
          } else if (segment.transit_mode === 'BUS') {
            // line = new AMap.Polyline({
            //   path: segment.transit.path,
            //   isOutline: true,
            //   outlineColor: '#ffeeee',
            //   borderWeight: 2,
            //   strokeWeight: 5,
            //   strokeColor: '#0091ff',
            //   lineJoin: 'round',
            //   strokeStyle: 'solid'
            // })
            //console.log(_this.map);

            // line.setMap(_this.map)
            // routeLines.push(line)
            //console.log(routeLines);
            // debugger
            // console.log(_this.map);

          }

          _this.map.setFitView([startMarker, endMarker].concat(routeLines))

        }

      },
      //序列化乘车点
      normallist(list) {
        const arr = [];
        for (let i = 0; i < list.length; i++) {
          arr.push({
            name: list[i].route + list[i].name + '(' + list[i].city + ')',
            log: list[i].lon,
            lat: list[i].lat,
            id: list[i].id

          })
        }
        //console.log(arr)
        return arr

      },
      selcet(item) {
        this.ridePoint = item.name;
        const _this = this;
        if (this.currentIndex === 0) {
          this.$nextTick(() => {
            _this.search(item)
          });
        } else {
          if (!item) {
            item = this.list[0]
          }
          this.$nextTick(() => {
            _this.item = item
            //  _this.getloadc(item);
            //  _this.searchb()
          });

        }
      },
      showMadal() {
        this.$refs.modal.show()

      },
      search(item, selectindex) {
        const _this = this
        if (!item) {
          item = this.list[0]
        } else {
          let id = item.id;
          let list = this.list;
          for (let i in list) {
            if (list[i].id === id) {
              item = this.list[i];
              break;
            }
          }
        }

        if (!selectindex) {
          selectindex = 0
        }
        //要改
        _this.position = "珠海粤财大厦"
        _this.transfer.clear();
        _this.transfer.search(
          [
            {keyword: _this.position, city: '珠海市'},
            {keyword: _this.ridePoint, city: '珠海市'}
          ],
          function (status, result) {
            if (status === 'complete') {
              //封装步行公交查询
              _this.result.length = 0;
              console.log(result);
              //_this.drawRoute(result.plans[selectindex])
              _this.result = _this.normalstep(result);
              _this.drawRoute(result.plans[0])


              //获取滑动公交车数据
              if (_this.result) {
                _this.selcetCar();
              }
            }
          });


      },
      //获取公交数据
      selcetCar(selectIndex) {
        const _this = this
        let flag = false
        if (typeof selectIndex === 'undefined') {
          this.lastlist = [];
          selectIndex = 0;
          this.lastlist.push(this.result[selectIndex])
          //console.log(this.lastlist);
        } else {
          //if (selectIndex === 0 && !flag) return;
          this.currentcls = selectIndex;
          this.lastlist = [];
          this.lastlist.push(this.result[selectIndex]);
          // debugger
          _this.search('', selectIndex)

          flag = true
        }
      },
      //序列化公交轨迹
      normalstep(result) {
        let arr = [];
        let plans = result.plans;
        for (let p in plans) {
          if (typeof arr[p] === 'undefined') {
            arr[p] = [];
          }
          let plan = plans[p];
          let segments = plan.segments;
          for (let s in segments) {
            arr[p].push(
              {
                instruction: segments[s].instruction,
                transit_mode: segments[s].transit_mode,
                via_stops: segments[s].transit.via_stops ? segments[s].transit.via_stops : null
              },
            );
          }
        }
        console.log(arr);
        return arr
      },
      //获取乘车方式
      getbus() {
        let arr = [];
        this.result.forEach((item, index) => {
          let a = 0;
          for (let c in item) {
            if (item[c].transit_mode === 'BUS') {
              let address = item[c].instruction.substring(2, 6).replace('(', '');
              //  console.log(address);
              if (address.charAt(address.length - 1) !== '路') {
                address = address.substring(0, 2)
              } else {
                address = item[c].instruction.substring(2, 6).replace('(', '')
              }
              arr.push({
                bus: address,
                nub: item[c].via_stops.length
              });
              a++;
              return
            }
          }
        });
        //debugger
        console.log(arr)
        return arr

      },


    },

  }
</script>

<style lang="less">
  .main {
    .amap-logo {
      display: none !important;
    }
    .amap-copyright {
      display: none !important;
    }
    .amap-scalecontrol {
      display: none !important;
    }
    .amap-toolbar {
      display: none !important;
    }
  }
</style>
<style scoped lang="less">
  .navigation {
    .title-wrap {
      position: relative;
      height: 1.04rem;
      background: #fff;
      .img-wrap {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0.7rem;
        background: url("../../assets/images/back-left.png") no-repeat 0.3rem center;
        background-size: 0.32rem 0.32rem;
      }
      span {
        position: absolute;
        top: 0;
        line-height: 1.04rem;
        font-size: .3rem;
        color: #bcbcbc;
        &.go {
          right: 50%;
          margin-right: .32rem;
          text-align: right;
        }
        &.back {
          left: 50%;
          margin-left: .32rem;
          text-align: left;
        }
        &.active {
          color: #1c9ae3;
          font-size: .36rem;
        }
      }
      .icon {
        display: block;
        width: .28rem;
        height: .28rem;
        margin: 0 auto;
        padding-top: .38rem;
      }
    }

    .list-wrap {
      position: relative;
      z-index: 999;
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
          color: #666;
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

    .main {
      background: #fff;

      .map-wrap {
        width: 100%;
        height: 5rem;
        .btn {
          background: #ccc;
          outline: none;
          border: none;
        }
      }

      .bus-wrap {
        padding: .4rem 0 .1rem;
        .tip {
          font-size: .3rem;
          color: #666;
          font-weight: bold;
          line-height: .3rem;
          margin-bottom: .24rem;
          padding: 0 .3rem;
          span {
            font-weight: normal;
            font-size: .26rem;
            color: #ccc;
          }
        }
        .box {
          width: 72% !important;
          /*height: 1.6rem;*/
          min-height: 1.6rem;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: .08rem;
          margin: 0 0 .4rem .3rem !important;
          &:last-child {
            margin-right: .3rem !important;
          }
          &.active {
            border-color: #d9d9d9;
            box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .6);
          }
          .bus {
            box-sizing: border-box;
            padding: .3rem;
            width: 100%;
            /*height: 100%;*/
            p {
              min-height: .5rem;
              line-height: .5rem;
              overflow: hidden;
              font-size: 0;
              span {
                float: left;
                padding-left: .34rem;
                margin-right: .2rem;
                font-size: .3rem;
                color: #666;
                background: url("../../assets/images/bussmall.png") no-repeat left center;
                background-size: .3rem .3rem;
                position: relative;
                padding-right: .3rem;
                &:after {
                  content: "";
                  display: block;
                  position: absolute;
                  right: -.1rem;
                  top: 50%;
                  margin-top: -.1rem;
                  border: .1rem solid transparent;
                  border-left-color: #666;
                }
                &:last-child {
                  padding-right: 0;
                  &:after {
                    display: none;
                  }
                }
              }
              &.sub {
                font-size: .28rem;
                color: #999;
              }
            }
          }
        }
      }

      /*待补充样式*/
      .list {

      }

    }

    .current {
      .main {
        #container-map {
          width: 100%;
          .list {
            font-size: .25rem;
            margin: 0 .3rem;
            padding-bottom: 1rem;
            .title {
              font-size: .25rem;
              .left {
                width: .6rem;
                height: .6rem;
                border-radius: 50%;
                background: #1a9ce3;
                float: left;
                color: #fff;
                text-align: center;
                line-height: .6rem;
                margin-right: .2rem;
              }
              .right {
                float: left;
                line-height: .6rem;
                font-weight: bold;
                font-size: .3rem;
              }
            }
            ul {
              padding: 0 .35rem 0 .3rem;
              margin: .1rem 0;
              background: #f7fbfc;
              .item {
                border-left: 5px solid #1c9ae3;
                padding: .2rem 0;
                .direction {
                  font-size: .25rem;
                  line-height: .5rem;
                  margin-left: .1rem;
                }
              }
            }
            .bottom {
              .left {
                width: .6rem;
                height: .6rem;
                border-radius: 50%;
                background: #ccc;
                float: left;
                color: #fff;
                text-align: center;
                line-height: .6rem;
                margin-right: .2rem;
              }
              .add {
                line-height: .6rem;
                font-weight: bold;
                font-size: .25rem;
                float: left;
              }
            }
            .bus-station {
              margin: 0.1rem 0.35rem 0.1rem 0.3rem;
              border-left: 5px solid #1c9ae3;
              padding: .1rem 0;
              background: #f7fbfc;
              .wrap {
                padding: .35rem;
                .item {
                  line-height: .5rem
                }
              }
            }
          }
        }
      }
    }

    .next {
      .list {
        font-size: .25rem;
        margin: 0 .3rem;
        padding-bottom: 1rem;
        .title {
          font-size: .25rem;
          .left {
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
            background: #1a9ce3;
            float: left;
            color: #fff;
            text-align: center;
            line-height: .6rem;
            margin-right: .2rem;
          }
          .right {
            float: left;
            line-height: .6rem;
            font-weight: bold;
            font-size: .3rem;
          }
        }
        ul {
          padding: 0 .35rem 0 .3rem;
          margin: .1rem 0;
          background: #f7fbfc;
          .item {
            border-left: 5px solid #1c9ae3;
            padding: .2rem 0;
            .direction {
              font-size: .25rem;
              line-height: .5rem;
              margin-left: .1rem;
            }
          }
        }
        .bottom {
          .left {
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
            background: #ccc;
            float: left;
            color: #fff;
            text-align: center;
            line-height: .6rem;
            margin-right: .2rem;
          }
          .add {
            line-height: .6rem;
            font-weight: bold;
            font-size: .3rem;
            float: left;
          }
        }
        .bus-station {
          margin: 0.1rem 0.35rem 0.1rem 0.3rem;
          border-left: 5px solid #1c9ae3;
          padding: .1rem 0;
          background: #f7fbfc;
          .wrap {
            padding: .35rem;
            .item {
              line-height: .5rem
            }
          }
        }
      }
    }
  }

</style>
