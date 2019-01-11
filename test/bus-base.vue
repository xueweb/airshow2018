<template>
  <transition name="slide" mode="in-out">
    <div class="bus">
      <div class="cont">
        <div class="title-wrap">
          <div class="icon" @click="back">
            <img src="../../assets/images/back02.png" alt="" width="20">
          </div>
          <div class="txt">选择乘车点</div>
        </div>
      </div>
      <div class="map-wrap">
        <div class="img-wrap" id="img-wrap" style="width:100%; height:6rem;">
          <div id="tip"></div>
          <div id="a"></div>
        </div>
        <div class="list-wrap">
          <ul>
            <li v-for="item in result">
              <p class="txt">{{item.size}}</p>
              <div class="city" v-html="item.add" @click="showModal(item)"></div>
              <!--<input class="city" type="text" :value="item.add" :disabled="item.disabled">-->
            </li>
          </ul>
          <p style="font-size:.3rem;color: red;height: .6rem;margin-top:.5rem;line-height: .6rem;text-align: center" ref="tip" v-html="tip"></p>
          <div class="btn-wrap">
            <button type="button" class="btn" @click="next">下一步</button>
          </div>
        </div>
      </div>
      <!--<img src="../../assets/images/ball1.png" alt="">-->
      <div class="model">
        <modal :list="list" ref="modal1" @selcetItem="selectmap"></modal>
        <modal :list="place" ref="modal2" @selcetItem="selcetItem"></modal>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import http from 'api/https'
  import {baseurl} from "common/js/config";
  import modal from 'base/modal/modal'
  import {mapMutations, mapGetters} from "vuex"

  export default {
    name: 'bus',
    data() {
      return {
        position: '',
        len: '',
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
        checekFlag: false,
        place: [],
        map: "",
        paramslist: {},
        params: [],
        getLng: -20,
        getLat: -10,
        tip:"",
        icon: require('../../assets/images/963.png'),
        location: require('../../assets/images/456.png'),
        ac: require('../../assets/images/789.png'),
        Destination: "",
        list: [{name: '珠海市(9个乘车点)'}, {name: '江门市(2个乘车点)'}, {name: '中山市(2个乘车点)'}, {name: '顺德市(1个乘车点)'}, {name: '广州市区(3个乘车点)'}, {name: '深圳市(3个乘车点)'},],
        result: [
          {size: "乘车城市", city: "珠海市", add: "珠海市", id: 3},
          {size: "实际出发地(系统将为你推荐最近乘车点)", city: "珠海市", add: "", id: 1},
          {size: "乘车点", city: "", add: "", id: 2}
        ]
      }
    },
    components: {
      modal
    },
    computed: {
      ...mapGetters(['setuser']),
    },
    created() {
      console.log(this.setuser);
    },
    mounted() {
      //初始化地图获取经纬
      this.init();
    },
    methods: {
      ...mapMutations({
        getid: "GET_GITID",
        getticket: 'GET_TICKET',
      }),
      selectmap() {
        this.$router.push({
          name: 'reservations'
        });
        window.scrollTo(0, 800)
      },
      selcetItem(item) {
        window.scrollTo(0, 0);
        this.$set(this.result[2], 'add', item.name);
        this.getid(item.id);
        // console.log(item.id)
        // debugger
      },
      showModal(item) {
        window.scrollTo(0, 0);
        if (item.id === 3) {
          this.$refs.modal1.show();
        }
        if (item.id === 2) {
          this.$refs.modal2.show()
        }
        if (item.id === 1) {
          this.$router.push({
            name: "search"
          })
        }
      },
      initposition: async function (params) {
        const url = `${baseurl}/booking/getRidePoints.do`;
        const res = await http.get(url, params);
        if (res.data.code = '200') {
          console.log(res);
          this.place = res.data.data.nowCityRidePoint;
          this.$set(this.result[2], 'add', res.data.data.nearRidePoint.name);
          this.getid(res.data.data.nearRidePoint.id);
          this.addMarkerAC(res.data.data.nearRidePoint.lon, res.data.data.nearRidePoint.lat);

        }
      },
      initialization() {
        let _this = this;
        //alert(2)
        this.geocoder.getAddress(this.params, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            //  alert(1)
            if (_this.setuser.address) {
             // alert(result);
              _this.result[1].add = _this.setuser.address;
              const paramslist = {
                lon: _this.setuser.O || '',
                lat: _this.setuser.M || ''
              };
              _this.$nextTick(() => {
                _this.initposition(paramslist)
              })
            } else {
              _this.result[1].add = result.regeocode.formattedAddress
            }
          }
        })
      },
      //初始化地图
      init() {
        let _this = this;
        _this.map = new AMap.Map('img-wrap', {
          center: [113.510306, 22.222376],
          resizeEnable: true,
          zoom: 10,
          lang: "zh"
        });

        _this.map.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          });
          _this.map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', function (data) {
            if (data) {
              const paramslist = {
                lon: data.position.getLng() || '',
                lat: data.position.getLat() || ''
              };
              _this.params.push(JSON.stringify(data.position.getLng()));
              _this.params.push(JSON.stringify(data.position.getLat()));
              //地理编码
              _this.getLng = data.position.getLng();
              _this.getLat = data.position.getLat();
              // alert(data);
              _this.initialization();
              _this.initposition(paramslist)
              _this.map.clearMap();
              _this.addMarker();
            }
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', _this.onError);      //返回定位出错信息
        });
        _this.map.plugin('AMap.Geocoder', function () {
          let geocoder = new AMap.Geocoder({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          });

          // geocoder.getCurrentPosition();
          //  AMap.event.addListener(geocoder, 'error',_this.onError)
          //AMap.event.addListener(geocoder, 'complete',function(data){
          //console.log(data);
        });
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          _this.map.addControl(new AMap.ToolBar({
            ruler: false
          }));
          _this.map.addControl(new AMap.Scale());
        });

      },
      initRidePoints() {
        const _this = this
        _this.Marker1 = new AMap.Marker({
          icon: _this.icon,
          position: [113.308536, 22.228074],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker2 = new AMap.Marker({
          icon: _this.icon,
          position: [113.539925, 22.273998],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker3 = new AMap.Marker({
          icon: _this.icon,
          position: [113.52585, 22.234298],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker4 = new AMap.Marker({
          icon: _this.icon,
          position: [113.566132, 22.27882],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker5 = new AMap.Marker({
          icon: _this.icon,
          position: [113.579257, 22.257308],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker6 = new AMap.Marker({
          icon: _this.icon,
          position: [113.592672, 22.238492],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker7 = new AMap.Marker({
          icon: _this.icon,
          position: [113.588117, 22.232644],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker8 = new AMap.Marker({
          icon: _this.icon,
          position: [113.549641, 22.215396],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker9 = new AMap.Marker({
          icon: _this.icon,
          position: [113.510891, 22.224599],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker1.setMap(_this.map);
        _this.Marker2.setMap(_this.map);
        _this.Marker3.setMap(_this.map);
        _this.Marker4.setMap(_this.map);
        _this.Marker5.setMap(_this.map);
        _this.Marker6.setMap(_this.map);
        _this.Marker7.setMap(_this.map);
        _this.Marker8.setMap(_this.map);
        _this.Marker9.setMap(_this.map);
        _this.Marker10.setMap(this.map);

      },
      addMarker() {
        const _this = this;
        if (_this.Marker10) {
          _this.Marker10.setMap(null);
        };
        this.Marker10 = new AMap.Marker({
          icon: _this.location,
          position: [_this.getLng, _this.getLat],
          offset: new AMap.Pixel(10, 20)
        });
        _this.initRidePoints();

      },
      addMarkerAC(Lng, Lat) {
        const _this = this;
        if (_this.Marker11) {
          _this.Marker11.setMap(null);
        }
        this.Marker11 = new AMap.Marker({
          icon: _this.ac,
          position: [Lng, Lat],
          offset: new AMap.Pixel(-13, -30)
        });
        _this.Marker11.setMap(this.map);
      },
      //解析定位错误信息
      onError(data) {
        console.log(data);
        // alert(data)
        if (data) {
          //alert(data)
          this.checekFlag = true
        }
        // document.getElementById('tip').innerHTML = '定位失败';
      },
      back() {
        this.$router.push({
          name: "index"
        })
      },
      next() {
        this.$router.push({
          name: "bus-time"
        })
        /*
                this.$nextTick(() => {
                  //alert(this.checekFlag)
                  if (this.checekFlag && !this.place.length) {
                    //alert(555)
                    const list = [
                      {name: "斗门客运站", log: 113.308536, lat: 22.228074},
                      {name: "体育中心", log: 113.539925, lat: 22.273998},
                      {name: "前山站", log: 113.52585, lat: 22.234298},
                      {name: "香洲总站", log: 113.566132, lat: 22.27882},
                      {name: "九洲城", log: 113.579257, lat: 22.257308},
                      {name: "九洲港", log: 113.592672, lat: 22.238492},
                      {name: "人工岛", log: 113.588117, lat: 22.232644},
                      {name: "珠海站", log: 113.549641, lat: 22.215396},
                      {name: "华发商都", log: 113.510891, lat: 22.224599}
                    ];
                    this.place = list;
                    //alert(this.place)
                    debugger
                    if (this.place) {
                      this.$set(this.result[2], 'add', this.place[0].name);
                      this.$refs.tip='你确认了选择改乘车点吗？';
                      this.$router.push({
                        name: "bus-time"
                      })
                    }

                  } else {
                    this.$router.push({
                      name: "bus-time"
                    })
                  }

                })
                */

      }
    }
  }
</script>

<style scoped lang="less">
  .slide-enter-active {
    transition: all 0.3s
  }

  .slide-enter {
    transform: translate3d(100%, 0, 0)
  }

  .bus {
    .cont {
      width: 100%;
      background: #ccc;
      .title-wrap {
        height: 1.18rem;
        width: 100%;
        font-size: .36rem;
        background-image: -webkit-linear-gradient(#1791de, #42ade4);
        position: relative;
        .icon {
          position: absolute;
          left: .3rem;
          top: .35rem;
          color: #ccc;
          font-size: .4rem;
        }
        .txt {
          text-align: center;
          line-height: 1.18rem;
          color: #fefefe;
          font-size: .36rem;
        }
      }
    }
    .img-wrap {
      width: 100%;
      position: relative;
      .select-wrap {
        position: absolute;
        left: 2.5rem;
        top: .5rem;
        width: 3.3rem;
        height: .8rem;
        background: #fff;
        z-index: 100;
        border-radius: .3rem;
        font-size: .3rem;
        line-height: .8rem;
        text-align: center;
        color: #bcbcbc;
        span {
          font-weight: bold;
          color: black;
        }
      }
    }
    .map-wrap {
      .list-wrap {
        margin: 0 .3rem;
        li {
          font-size: .3rem;
          border-bottom: 1px solid #e2e2e2;
          padding-bottom: .22rem;
          .txt {
            color: #bcbcbc;
            margin-top: .54rem;
            font-size: .3rem;
            margin-bottom: .2rem;
          }
          .city {
            font-size: .25rem;
            line-height: .5rem;
            height: .5rem;
            color: #666;
            border: none;
            outline: none;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*background: #fff;*/

          }
        }
        .btn-wrap {
          text-align: center;
          margin: 0.5rem 0 .3rem 0;
          .btn {
            width: 100%;
            height: .86rem;
            margin: .3rem 0 .5rem 0;
            background: #1c9ce3;
            outline: none;
            border: none;
            border-radius: .1rem;
            color: #fff;
            font-size: .32rem;

          }
        }

      }
    }
  }

</style>
