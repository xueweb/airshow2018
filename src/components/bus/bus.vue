<template>
  <transition name="slide" mode="in-out">
    <div class="bus">
      <div class="cont">
        <div class="title-wrap">
          <div class="icon" @click="back">
          </div>
          <div class="txt">{{$t("msg.BoardingPointSelection")}}</div>
        </div>
      </div>
      <div class="map-wrap">
        <div class="img-wrap" id="img-wrap">
          <div id="tip"></div>
        </div>
        <div class="list-wrap">
          <ul>
            <li v-for="(item,key) in result" :key="key" v-if="calbustype(bustype, item.id)">
              <p class="txt">{{item.size}}</p>
              <div class="city" v-html="item.add" @click="showModal(item)"></div>
              <!--<input class="city" type="text" :value="item.add" :disabled="item.disabled">-->
            </li>
            <li style="border-bottom: 0;">
              <p class="txt">
                {{$t("msg.checktxt")}}
                <!--* 根据当前位置选择推荐的乘车点请直接点击下一步-->
              </p>
            </li>
          </ul>
          <p class="error-tip" v-html="tip"></p>
          <div class="btn-wrap">
            <button type="button" class="btn" @click="next"> {{$t("msg.Next")}}</button>
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
  import store from 'store'

  export default {
    name: 'bus',
    data() {
      return {
        mark: {},
        getNearRidePoints: {},
        position: '',
        Marker1: "",
        Marker10: "",
        place: [],
        tip: "",
        placeFlag: false,
        map: "",
        paramslist: {},
        params: [],
        getLng: -20,
        getLat: -10,
        flagnub: 1,
        stationlist: [],
        icon: require('../../assets/images/gray_point.png'),
        location: require('../../assets/images/456.png'),
        ac: require('../../assets/images/blue_point.png'),
        bustype: 1,
        markflag: true,
        list: [
          {name: '珠海市（9个乘车点）', id: 1},
          {name: '广州市（7个乘车点）'},
          {name: '佛山市（3个乘车点）'},
          {name: '惠州市（1个乘车点）'},
          {name: '阳江市（3个乘车点）'},
          {name: '中山市（2个乘车点）'},
          {name: '江门市（2个乘车点）'}
        ],
        result: [
          {size: "乘车城市选择", city: "珠海市", add: "珠海市", id: 3},
//          {size: "实际出发地（自主定位或选择出发点）", city: "珠海市", add: "", id: 1},
          {size: "通过自定义出发点选择乘车点", city: "珠海市", add: "", id: 1},
//          {size: "乘车点选择", city: "", add: "", id: 2}
          {size: "直接选择乘车点", city: "", add: "", id: 2}
        ]
      }
    },
    components: {
      modal
    },
    computed: {
      ...mapGetters(['setuser', 'flag']),
    },
    created() {
      this.initlag()
      console.log(this.setuser);
    },
    mounted() {
      //初始化地图获取经纬
      this.init();
      //根据乘车类型获取所有乘车点
      this.getcailistbytype();
      //获取所以乘车点
      // this.getcailist()
    },
    methods: {
      initlag() {
        //if()
        if (this.$i18n.locale === "EN") {
          this.result = [];
          this.list = [];
          this.result = [
            {size: "City selection", city: "Zhuhai", add: "Zhuhai", id: 3},
            {size: "Boarding point self-selection", city: "Zhuhai", add: "", id: 1},
            {size: "Boarding point recommended", city: "", add: "", id: 2}
          ];
          this.list = [
            {name: 'Zhuhai（9 points）', id: 1},
            {name: 'Guangzhou（7 points）'},
            {name: 'Foshan（3 points）'},
            {name: 'Huizhou（1 points）'},
            {name: 'Yangjiang（3 points）'},
            {name: 'Zhongshan（2 points）'},
            {name: 'Jiangmen（2 points）'}
          ]
        }
      },
      ...mapMutations({
        getid: "GET_GITID",
        getticket: 'GET_TICKET',
      }),
      selectmap(item) {
        if (this.$i18n.locale === 'EN') return
        if (item.id === 1) return;
        this.$router.push({
          name: 'crosscity'
        });
      },
      selcetItem(item) {
        const _this = this
        console.log(item);
        this.$set(this.result[2], 'add', item.name);
        this.getid(item.id);
        for (let i in _this.mark) {
          this.mark[i].setIcon(this.icon)
          this.mark[i].setzIndex(1)
        }
        this.mark[item.id].setIcon(this.ac);
        this.mark[item.id].setzIndex(999);
        this.map.setFitView();
      },
      showModal(item) {
        window.scrollTo(0, 0);
        if (item.id === 3) {
          this.$refs.modal1.show();
        }
        if (item.id === 2) {
          const _this = this
          this.$refs.modal2.show();
          setTimeout(() => {
            _this.$refs.modal2.refresh();
          }, 20)
        }
        if (item.id === 1) {
          if (this.$i18n.locale === 'EN') return
          this.$router.push({
            name: "search"
          })
        }
      },
      initposition: async function (params) {
        const _this = this
        const url = `${baseurl}/booking/getNearRidePoints.do`;
        const res = await http.get(url, params);
        if (res.data.code = '200') {
          console.log(res);
          _this.getNearRidePoints = res.data.data.nearRidePoint;
          for (let i in _this.mark) {
            _this.mark[i].setIcon(_this.icon);
            _this.mark[i].setzIndex(1);
          }
          _this.mark[res.data.data.nearRidePoint.id].setIcon(_this.ac);
          _this.mark[res.data.data.nearRidePoint.id].setzIndex(999);
          _this.mark[res.data.data.nearRidePoint.id].setMap(this.map);
          console.log(res)
          let item = `${res.data.data.nearRidePoint.route > 0 ? res.data.data.nearRidePoint.route : ''} ${res.data.data.nearRidePoint.name}（${res.data.data.nearRidePoint.city}）`
          console.log(item);
          if (res.data.data.nearRidePoint.name === "港珠澳大桥珠海口岸" && res.data.data.nearRidePoint.route > 0) {
            item = `${res.data.data.nearRidePoint.route}${res.data.data.nearRidePoint.name}`
          }
          console.log(item)
          this.$set(this.result[2], 'add', item);
          this.getid(res.data.data.nearRidePoint.id);
          this.addMarkerAC(res.data.data.nearRidePoint.lon, res.data.data.nearRidePoint.lat);
        }
      },
      getcailistbytype: async function () {
        const url = `${baseurl}/booking/HotelPointAndGZABridge.do`;
        // type(3:酒店专线，4:港珠澳大桥专线)
        let par = {
          type: this.bustype
        }
        const res = await http.get(url, par);
        console.log(res);
        if (res.data.code === '200') {
          this.stationlist = res.data.data
          this.$nextTick(() => {
            this.getpoint()
          });
          let arr = [];
          for (let i in res.data.data) {
            if (res.data.data[i].route > -1 && res.data.data[i].city) {
              arr.push({
                name: `${res.data.data[i].route} ${res.data.data[i].name}（${res.data.data[i].city}）`,
                id: res.data.data[i].id
              });
            } else {
              if (`${res.data.data[i].city}` && `${res.data.data[i].city}`.length > 0) {
                arr.push({
                  name: `${res.data.data[i].name}（${res.data.data[i].city}）`,
                  id: res.data.data[i].id
                });
              } else if (res.data.data[i].route > -1) {
                arr.push({
                  name: `${res.data.data[i].route}${res.data.data[i].name}`,
                  id: res.data.data[i].id
                });
              }
            }
            this.place = arr;
          }
          return arr;
        }
      },
      getcailist: async function () {
        const url = `${baseurl}/booking/getRidePoints.do`;
        let par = {};
        const res = await http.get(url, par);
        console.log(res);
        if (res.data.code === '200') {
          this.stationlist = res.data.data
          this.$nextTick(() => {
            this.getpoint()
          });
          let arr = [];
          for (let i in res.data.data) {
            if (res.data.data[i].route > -1) {
              arr.push({
                name: `${res.data.data[i].route} ${res.data.data[i].name}（${res.data.data[i].city}）`,
                id: res.data.data[i].id
              });

            } else {
              arr.push({
                name: `${res.data.data[i].name}`,
                id: res.data.data[i].id
              });
            }
            this.place = arr;
          }
          console.log(this.place)
          return arr;
        }
      },
      point: async function (par) {
        const _this = this;
        const url = `${baseurl}/booking/getNearRidePoints.do`;
        const res = await http.get(url, par);
        if (res.data.code = '200') {
          console.log(res);
          for (let i in _this.mark) {
            _this.mark[i].setIcon(_this.icon);
            _this.mark[i].setzIndex(1);
          }
          _this.mark[res.data.data.nearRidePoint.id].setIcon(_this.ac);
          _this.mark[res.data.data.nearRidePoint.id].setzIndex(999);
        }

      },
      initialization() {
        let _this = this;
        this.geocoder.getAddress(this.params, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (_this.setuser.address && !_this.flag) {
              console.log(_this.flag);
              // debugger
              // _this.address_by = address
              console.log(_this.setuser);
              // arr.push(JSON.stringify(_this.setuser.O));
              // arr.push(JSON.stringify(_this.setuser.M));
              let arr = {lon: JSON.stringify(_this.setuser.O), lat: JSON.stringify(_this.setuser.M)}

              _this.Marker10.setPosition([_this.setuser.O, _this.setuser.M])
              _this.$nextTick(() => {
//                _this.map.setZoom(8)
                _this.map.setFitView()
              });

              _this.point(arr)
              console.log(result);
              _this.result[1].add = _this.setuser.name;
              const paramslist = {
                lon: _this.setuser.O || '',
                lat: _this.setuser.M || '',
                type: _this.bustype
              };
              _this.$nextTick(() => {
                _this.initposition(paramslist)
              })
            } else {
              _this.result[1].add = result.regeocode.formattedAddress
            }
            //设置缩放
            _this.map.setFitView()

          }
        })
      },
      //初始化地图
      init() {
        let _this = this;
        this.bustype = this.$route.params.bustype || 1;
        // debugger
        store.set('bustype', this.bustype);
        // console.log(this.bustype)
        //debugger
        if (_this.flagnub === 3) return
        _this.map = new AMap.Map('img-wrap', {
          center: [113.510306, 22.222376],
          resizeEnable: true,
          zoom: 8,
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
          _this.map.addControl(geolocation);
          geolocation.getCurrentPosition();
          if (AMap.UA.ios && document.location.protocol !== 'https:') {

            //使用远程定位，见 remogeo.js
            let remoGeo = new RemoGeoLocation();
            //替换方法
            navigator.geolocation.getCurrentPosition = function () {
              return remoGeo.getCurrentPosition.apply(remoGeo, arguments);
            };
            //替换方法
            navigator.geolocation.watchPosition = function () {
              return remoGeo.watchPosition.apply(remoGeo, arguments);
            };
          }
          AMap.event.addListener(geolocation, 'complete', function (data) {

            //重新渲染地图，因为高德自带定位图有Bug
            _this.map.clearMap();
            _this.getpoint();
            _this.addMarker();

            if (data) {
              const paramslist = {
                lon: data.position.getLng() || '',
                lat: data.position.getLat() || '',
                type: _this.bustype
              };
              _this.params.push(JSON.stringify(data.position.getLng()));
              _this.params.push(JSON.stringify(data.position.getLat()));
              //地理编码
              _this.getLng = data.position.getLng();
              _this.getLat = data.position.getLat();
              console.log(data);
              if (_this.markflag) {
                _this.markflag = false
                //_this.$set()
                _this.initialization();
                // _this.markflag = true
                _this.addMarker();
              } else {
                _this.Marker10.setPosition([_this.getLng, _this.getLat]);
                _this.result[1].add = data.formattedAddress;
                _this.$nextTick(() => {
//                  _this.map.setZoom(8)
                  _this.map.setFitView()
                })

              }
              _this.initposition(paramslist);
            }
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', function (data) {

            if (data) {
              // a++;
              _this.flagnub++
              //  if (_this.flagnub === 2) ;
              _this.init();
              // return
            }
          });      //返回定位出错信息
        });
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          // _this.map.addControl(new AMap.ToolBar());
          // _this.map.addControl(new AMap.Scale());
        });
        AMap.plugin('AMap.Geocoder', function () {
          _this.geocoder = new AMap.Geocoder({
            city: "0756",
            radius: 1000 //范围，默认：500
          });
        });

      },
      addMarker() {
        const _this = this;
        if (_this.Marker10) _this.Marker10.setMap(null)
        this.Marker10 = new AMap.Marker({
          icon: _this.location,
          position: [_this.getLng, _this.getLat],
          offset: new AMap.Pixel(-13, -30),
          zIndex: 99
        });
        _this.Marker10.setMap(this.map);

      },
      addMarkerAC(Lng, Lat) {
        const _this = this;
        if (_this.Marker11) {
          _this.Marker11.setMap(null);
        }
        this.Marker11 = new AMap.Marker({
          icon: _this.ac,
          position: [Lng, Lat],
          offset: new AMap.Pixel(-13, -30),
          zIndex: 999
        });
        // _this.Marker11.setMap(this.map);
      },
      calbustype: function (bt, id) {
        // bt(3:酒店专线，4:港珠澳大桥专线)
        //id: (3: 乘车城市选择 1:实际出发地(自主定位或选择出发点) 2:乘车点选择)
        if ((bt === 1 && (id === 1 || id === 2 || id === 3)) || ((bt === 3 || bt === 4) && id === 2)) {
          //console.log('true');
          //console.log(bt);
          //console.log(id);
          return true;
        } else {
          //console.log('false');
          //console.log(bt);
          //console.log(id);
          return false;
        }
      },
      //解析定位错误信息
      onError(data) {
        //document.getElementById('tip').innerHTML = '定位失败';
      },
      back() {
        this.$router.push({
          name: "index"
        })
      },
      next() {
        const a = this.result[2].add;
        if (!a) {
          const _this = this;
          let a = 1;
          if (this.place) {
            this.$set(this.result[2], 'add', this.place[0].name);
            this.getid(this.place[0].id);
            this.tip = '请选择乘车点';
            setTimeout(() => {
              _this.tip = ''
            }, 4000);
            if (a >= 2) {
              //还要带参数
              this.$router.push({
                name: "bus-time"
              })
            }
            a++
          }
        } else {
          if (this.bustype) {
            this.$nextTick(() => {
              this.$router.push({
                name: "bus-time",
                params: {bustype: this.bustype}
              })
            })
            //如过页面有参数就把参数传到下一个页面
          } else {
            this.$router.push({
              name: "bus-time",
            })

          }

        }
      },
      getpoint() {
        const _this = this

        for (let i in this.stationlist) {
          let id = this.stationlist[i].id;
          _this.mark[id] = new AMap.Marker({
            icon: _this.icon,
            position: [_this.stationlist[i].lon, _this.stationlist[i].lat],
            offset: new AMap.Pixel(-13, -30),
            zIndex: 1
          });
          _this.mark[id].setMap(this.map);

        }
        console.log(_this.mark)
        console.log(_this.getNearRidePoints);

      }
    }
  }
</script>
<style lang="less">
  .bus {
    .amap-logo {
      display: none !important;
    }
    .amap-copyright {
      display: none !important;
    }
  }
</style>
<style scoped lang="less">
  /*.slide-enter-active {*/
  /*transition: all 0.3s*/
  /*}*/

  /*.slide-enter {*/
  /*transform: translate3d(100%, 0, 0)*/
  /*}*/
  .bus {
    .cont {
      width: 100%;
      .title-wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 99;
        height: 1.18rem;
        background-image: -webkit-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -moz-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -o-linear-gradient(135deg, #42ade4, #1791de);
        background-image: linear-gradient(-135deg, #42ade4, #1791de);
        width: 100%;
        font-size: 0.36rem;
        .icon {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0.7rem;
          background: url("../../assets/images/back02.png") no-repeat 0.3rem center;
          background-size: 0.32rem 0.32rem;
        }
        .txt {
          text-align: center;
          line-height: 1.2rem;
          color: #fff;
          font-size: 0.4rem;
        }
      }
    }

    .map-wrap {
      margin-top: 1.18rem;
      .img-wrap {
        width: 100%;
        height: 4.3rem;
        position: relative;
        .select-wrap {
          position: absolute;
          left: 2.5rem;
          top: 0.5rem;
          width: 3.3rem;
          height: 0.8rem;
          background: #fff;
          z-index: 100;
          border-radius: 0.3rem;
          font-size: 0.3rem;
          line-height: 0.8rem;
          text-align: center;
          color: #bcbcbc;
          span {
            font-weight: bold;
            color: black;
          }
        }
      }
      .list-wrap {
        margin: 0 0.3rem;
        padding-top: 0.54rem;
        font-size: 0;
        li {
          font-size: 0.36rem;
          border-bottom: 1px solid #e2e2e2;
          margin-bottom: 0.4rem;
          .txt {
            color: #a5a5a5;
            font-size: 0.28rem;
            line-height: 1.1;
            margin-bottom: 0.04rem;
          }
          .city {
            width: 100%;
            height: 0.8rem;
            color: #333;
            font-size: 0.33rem;
            line-height: 0.8rem;
            border: none;
            outline: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background: #fff;
            box-sizing: border-box;
            padding-right: 0.6rem;
            position: relative;
            &:after {
              content: "";
              display: block;
              position: absolute;
              right: 0.1rem;
              top: 50%;
              width: 0.24rem;
              height: 0.24rem;
              background: url("../../assets/images/right_icon.png") no-repeat center center;
              background-size: 100% 100%;
              margin-top: -0.12rem;
              opacity: 0.5;
            }
          }
        }
        .error-tip {
          text-align: center;
          color: #dc4444;
          font-size: 0.3rem;
          line-height: 0.7rem;
          margin-top: 1rem;
        }
        .btn-wrap {
          text-align: center;
          margin-bottom: 0.3rem;
          .btn {
            width: 100%;
            height: 0.86rem;
            background: #1c9ce3;
            outline: none;
            border: none;
            border-radius: 0.08rem;
            color: #fff;
            font-size: 0.32rem;
          }
        }
      }
    }
  }
</style>
