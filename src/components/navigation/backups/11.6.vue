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
            <li class="start" @click="loaddeatal">
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
              推荐公交线路：<span>(其他交通方式请自行选用高德导航)</span>
            </p>
            <swiper :options="swiperOption" ref="mySwiper" v-show="position">
              <swiper-slide class="box" v-for="(item,index) in getbus()" :key="index" :class="{active:currentcls===index}">
                <div class="bus" @click="selcetCar(index)">
                  <p>
                    <span v-for="a  in item">
                      <i v-if="a.transit_mode==='BUS'">{{trim(a) }}</i>
                    </span>
                    <!--<i>航展专线巴士</i>-->
                  </p>
                  <div style="line-height: .4rem">
                    <i style="font-size:.28rem;color: #1a9ce3;font-weight: bold">航展专线巴士</i>
                    <span class="sub" style="font-size: .3rem;color: #666">
                      <span >  共计{{getitem()[index]}}站</span>
                      <!--{{getitem()}} -->
                    </span>

                  </div>
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
            <li class="start" @click="loaddeatalb">
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
        <div id="wrap3" style="width: 100%;height: 5rem;position: relative"></div>
        <div id="wrap2" style="display: none;width: 1rem;height: 1rem"></div>
        <div style="width: 100%;height: 6.5rem;position: relative;display: none" id="img-wrap2"></div>
        <div class="list" style="padding-top: .5rem" v-show="steplist.length&&positionb">
          <div class="title clearfix">
            <div class="left">起</div>
            <div class="right">我的位置</div>
          </div>
          <ul>
            <li class="item">
              <ul>
                <li v-for="item in steplist">
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
              <p class="item"><span v-html="backridePoint"></span>下车</p>
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
    name: 'navigation',
    data() {
      return {
        swiperOption: {
          slidesPerView: 'auto',
        },
        getLng: '',
        getLat: '',
        currentcls: 0,
        currentIndex: 0,
        ridePoint: '',
        backridePoint: '',
        result: [],
        params: [],
        busresult: [],
        geocoder: '',
        position: '',
        positionb: "",
        destination: '珠海航展馆P2停车场',
        map: '',
        mapc: "",
        mapf: "",
        transfer: '',
        transfer2: '',
        driving: '',
        driving2: "",
        Walking: '',
        steplist: [],
        listresult: [],
        getstep: [],
        lastlist: [], //公交路线数据
        item: '',
        positionpar: {
          M: 0,
          O: 0
        }, //定位时候参数
        list: [],
        container: "",
        step: "",
        busstep: "",
        line: "",
        routeLines: [],
        endMarker: "",
        startMarker: ""

      }
    },
    mounted() {
      this.initf();
      this.initstation()
    },
    created() {
      if (this.getcurrentindex === 0) {
        this.currentIndex = 0
      } else if (this.getcurrentindex === 1) {
        this.currentIndex = 1
      }
    },
    computed: {
      ...mapGetters['searchflag'],
      setuser() {
        return this.$store.state.setuser.address
      },
      user() {
        return this.$store.state.setuser
      },
      set() {
        return this.$store.state.set
      },
      flag() {
        return this.$store.state.flag
      },
      query() {
        return this.$store.state.setquery
      },
      getid() {
        return this.$store.state.getid
      },
      getcurrentindex() {
        return this.$store.state.currentindex
      }

    },
    components: {
      modal,
    },
    methods: {
      trim(item) {
        let a = item.instruction.substring(2, 6).replace('(', '');
        if (a.charAt(a.length - 1) !== '路') {
          a = a.substring(0, 2)
        }
        // console.log(a)
        return a
      },
      getstore() {
        let item;
        //从主页进来
        item = this.list[0];
        if (this.query) {
          let user = store.get('user');
          const _this = this;
          if (user) {
            //从二维码哪里进来
            let a = user.airRidePoint
            typeof a === 'undefined' ? a = user.airRideQrCode.airRidePoint : "";
            // debugger
            if (a.id) {
              for (let i in _this.list) {
                if (_this.list[i].id === a.id) {
                  item = _this.list[i]
                  break
                }
              }
            }
          }
        }
        //
        if (this.currentIndex === 0) {
          const _this = this;
          console.log(item);
          _this.position = this.query.name;
          _this.ridePoint = item.name;
          _this.backridePoint = item.name
          _this.transfer.clear();
          _this.transfer.search(
            [
              {keyword: _this.position, city: '珠海市'},
              {keyword: _this.ridePoint, city: '珠海市'}
            ],
            function (status, result) {
              // debugger
              if (status === 'complete') {
                _this.result.length = 0;
                _this.result = _this.normalstep(result);
                _this.busstep = result;
                //获取滑动公交车数据
                if (_this.result) {
                  _this.selcetCar();
                }
              }
            });

        } else {
          const _this = this;
          _this.backridePoint = item.name;
          //需要修改
          _this.positionb = this.query.name;
          _this.Walking2.clear();
          _this.Walking2.search(
            new AMap.LngLat(_this.query.O, _this.query.M),
            new AMap.LngLat(113.395158, 22.022997)
            , function (status, result) {
              if (result.info === 'ok') {
                _this.steplist = _this.normalcar(result);
              }
            });
        }
      },
      ...mapMutations({
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setbackindex: 'SET_BACK_INDEX'
      }),
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
        return arr
      },
      //获取乘车点信息
      initstation: async function () {
        const _this = this
        const url = `${baseurl}/booking/getAllPoint.do`;
        const user = this.user.id ? this.user.id : _this.user.airRideQrCode.id
        let par;
        //console.log(user)
        if (user) {
          par = {
            qrcodeId: user
          };

        } else {
          par = {
            qrcodeId: ''
          };
        }
        const res = await http.get(url, par);
        if (res.data.code === '200') {
          this.list = this.normallist(res.data.data.allAirRidePoint)
          if (res.data.data.nowAiRidePoint) {
            this.ridePoint = res.data.data.nowAiRidePoint.position;
          } else {
            this.ridePoint = this.list[0].name;
            if (!_this.set) {
            }
          }
          //初始化地图
          this.init();
        }

      },
      loaddeatal() {
        this.$router.push({
          name: "searchstation"
        });
        this.setCurrentIndex(0);
      },
      loaddeatalb() {
        this.$router.push({
          name: "searchstation"
        });
        this.setCurrentIndex(1);
      },
      change() {
        this.currentIndex = 0;

      },
      change2() {
        this.currentIndex = 1;
        this.initializationb();


      },
      selcet(item) {
        this.ridePoint = item.name;
        const _this = this;
        if (this.currentIndex === 0) {
          this.ridePoint = item.name;
          this.$nextTick(() => {
            _this.search(item)
          });
        } else {
          if (!item) {
            item = this.list[0]
          }
          this.backridePoint = item.name;
          this.$nextTick(() => {
            _this.item = item
            _this.getloadc(item);
            _this.searchb()
          });

        }
      },
      showMadal() {
        this.$refs.modal.show()
      },
      //获取地理位置
      initialization() {
        let _this = this;
        this.geocoder.getAddress(this.params, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            _this.position = result.regeocode.formattedAddress;
            if (_this.query.name) {
              _this.getstore()
            } else {
              if (_this.set) {
                //从选选择乘车点进来
                let item = _this.user.airRidePoint;
                _this.search(item);
                //debugger
              } else {
                // 从首页直接点进来
                let item = _this.user.airRideQrCode.airRidePoint;
                _this.search(item);

              }
            }
          }
        })
      },
      initializationb() {
        let _this = this;
        this.geocoder.getAddress(this.params, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            _this.positionb = result.regeocode.formattedAddress;
            if (_this.positionb) {
              let item = _this.container;
              //绘制地图
              _this.getloadc(item);
              //生成导航轨迹

            } else if (!_this.positionb) {
              _this.positionb = _this.position;
              let item = _this.container;
              //绘制地图
              _this.getloadc(item);
              //生成导航轨迹
              _this.searchb();
            }
          }
        })
      },
      filter(item) {
        console.log(item);
        let arr = []
        let address;
        for (let i in item) {
          console.log(item[i]);
          if (item[i].transit_mode === 'BUS') {
            address = item.instruction.substring(2, 6).replace('(', '');
            if (address.charAt(address.length - 1) !== '路') {
              address = address.substring(0, 2)
            }
            arr.push(address)

          }
          //  console.log(address);

        }
        return address
      },
      getitem() {
        //   console.log(this.lastlist);
        console.log(this.getbus());
        let arr = []
        // this.getbus()
        for (let i in this.getbus()) {
          if (typeof arr[i] === 'undefined') {
            arr[i] = []
          }
          for (let p in this.getbus()[i]) {
            if (this.getbus()[i][p].transit_mode === 'BUS') {
              arr[i].push({
                len: this.getbus()[i][p].via_stops.length
              })
            }

          }
          // console.log(this.getbus()[i]);
          // console.log(arr);
          // let newarr = [];
          // let sum = 0
          // for (let i in arr) {
          //   console.log(arr[i]);
          //   for (let k in arr[i]) {
          //     sum += arr[i][k].len;
          //     newarr.push(sum)
          //
          //   }
          //
          // }
          // console.log(newarr);
          // for (let i  in this.result) {
          //  // console.log(this.lastlist[i]);
          //   for (let k in  this.result[i]) {
          //    // console.log(this.lastlist[i][k]);
          //     if (this.result[i][k].transit_mode === 'BUS') {
          //     //  a++;
          //       console.log(this.result[i][k].via_stops.length);
          //     }
          //   //  console.log(sum);
          //
          //   }


        }
        console.log(arr);
        let c = []
        for (let i in arr) {
          if (arr[i].length > 0) {
            for (let j in arr[i]) {
              if (!c[i]) {
                c[i] = 0
              }
              c[i] += arr[i][j].len + 1
            }

          }

        }
        console.log(c);
        return c
        //  return sum+a
        // let arr = []
        // this.result.forEach((item) => {
        //   for (let c = 0; c < item.length; c++) {
        //     if (item[c].transit_mode === 'BUS') {
        //       let address = item[c].instruction.substring(2, 6).replace('(', '');
        //       if (address.charAt(address.length - 1) !== '路') {
        //         address = address.substring(0, 2)
        //       }
        //       arr.push({
        //         nub: item[c].via_stops.length
        //       });
        //       console.log(item[c].via_stops.length);
        //     }
        //   }
        // });
        // console.log(arr);
        // return arr[index].nub + 1
        //1

      },
      //获取乘车方式
      getbus() {
        let arr = [];
        // this.result.forEach((item) => {
        //   for (let c = 0; c < item.length; c++) {
        //     if (item[c].transit_mode === 'BUS') {
        //       let address = item[c].instruction.substring(2, 6).replace('(', '');
        //       if (address.charAt(address.length - 1) !== '路') {
        //         address = address.substring(0, 2)
        //       }
        //       arr.push({
        //         bus: address,
        //         nub: item[c].via_stops.length
        //       });
        //       return
        //     }
        //   }
        // });
        // console.log(this.result);
        for (let i in this.result) {
          if (typeof arr[i] === 'undefined') {
            arr[i] = []
          }
          for (let p in this.result[i]) {
            arr[i].push(this.result[i][p])

          }

        }
        // console.log(arr);
        return arr
      },
      //currentIndex===0时 地图数据
      init() {
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
              //地理编码
              _this.initialization();
            }
          });//返回定位信息
        });
        AMap.plugin('AMap.Geocoder', function () {
          _this.geocoder = new AMap.Geocoder({
            city: "0756",
            radius: 1000
          });
        });
        AMap.plugin('AMap.Transfer', function () {
          _this.transfer = new AMap.Transfer({
            map: _this.map,
            city: '珠海市',
            panel: 'panel',
            // policy: _this.map.TransferPolicy.LEAST_TIME //乘车策略
          });

        });
        AMap.plugin('AMap.Driving', function () {
          _this.driving = new AMap.Driving({
            map: _this.map,
            panel: "panel",
            city: '珠海市',
          });

        });
        _this.map = map

      },
      //currentIndex===1时 地图数据
      // currentindex===1的获取步行轨迹
      initf() {
        let _this = this;
        let map = new AMap.Map('wrap3', {
          center: [113.510306, 22.222376],
          resizeEnable: true,
          zoom: 14,
          lang: "zh"
        });
        _this.mapf = map;
        AMap.plugin('AMap.Walking', function () {
          _this.Walking2 = new AMap.Walking({
            map: _this.mapf,
            panel: "panel",
            city: '珠海市',
          });
        });
      },
      getloadc(item) {
        const _this = this;
        if (!item) {
          item = _this.list[0]
        } else {
          let id = item.id;
          let list = _this.list;
          for (let i in list) {
            if (list[i].id === id) {
              item = _this.list[i];
              break
            }
          }
        }
        _this.backridePoint = item.name
        _this.driving2.search(
          new AMap.LngLat(_this.getLng, _this.getLat),
          new AMap.LngLat(item.log ? item.log : 113.308536, item.lat ? item.lat : 22.228074),
          function (data, a) {
          });
        //生成导航
        _this.searchb();

      },
      search(item) {
        //汽车轨迹
        //item 当前用户的地理位置
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
        _this.container = item;
        _this.ridePoint = item.name;
        _this.transfer.clear();
        _this.transfer.search(
          new AMap.LngLat(_this.getLng, _this.getLat),
          new AMap.LngLat(item.log, item.lat),
          function (status, result) {
            if (status === 'complete') {
              //封装步行公交查询
              _this.result = _this.normalstep(result);
              _this.busstep = result;
              //获取滑动公交车数据
              if (_this.result) {
                _this.selcetCar();
              }
            }
          });
      },
      searchb() {
        const _this = this;
        _this.Walking2.clear();
        _this.Walking2.search(
          new AMap.LngLat(_this.getLng, _this.getLat),
          new AMap.LngLat(113.395158, 22.022997),
          function (status, result) {
            if (result.info === 'ok') {
              _this.steplist = _this.normalcar(result);
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
          this.lastlist.push(this.result[selectIndex]);
          _this.drawRoute(_this.busstep.plans[selectIndex])

        } else {
          this.currentcls = selectIndex;
          this.lastlist = [];
          this.lastlist.push(this.result[selectIndex]);
          flag = true;
          _this.drawRoute(_this.busstep.plans[selectIndex])
          // _this.getselectindex(selectIndex)
        }
      },
      getselectindex(selectIndex) {
        let arr = []
        for (let i in this.result) {
          if (typeof arr[i] === 'undefined') {
            arr[i] = []
            arr[i].push({})
            console.log(this.result[selectIndex]);
          }

        }
      },
      //画轨迹
      drawRoute(route) {
        const _this = this;
        if (_this.routeLines.length > 0) {
          _this.map.remove(_this.routeLines);
          _this.routeLines = [];
        }
        _this.map.remove(_this.endMarker);
        _this.map.remove(_this.startMarker)

        _this.startMarker = new AMap.Marker({
          position: route.segments[0].transit.origin,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          map: _this.map
        });
        _this.endMarker = new AMap.Marker(
          {
            position: route.segments[route.segments.length - 1].transit.destination,
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            map: _this.map
          });
        for (let i = 0, l = route.segments.length; i < l; i++) {
          let segment = route.segments[i];
          // 绘制步行路线
          if (segment.transit_mode === 'BUS' || segment.transit_mode === 'WALK') {
            let line = new AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: '#ffeeee',
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: '#0091ff',
              lineJoin: 'round',
              strokeStyle: 'solid'
            });
            _this.routeLines.push(line);
          }
        }
        _this.map.add(_this.routeLines);
        _this.map.setFitView([_this.startMarker, _this.endMarker].concat(_this.routeLines))

      },
      //虚列化公交数据
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
        return arr
      },
      //currenindex===1 返回的数据
      normalcar(list) {
        if (typeof  list === 'string') return [];
        if (!list.routes) return;
        let arr = [];
        const item = list.routes[0].steps ? list.routes[0].steps : list.routes;
        if (!item) return;
        for (let i in item) {
          arr.push({instruction: item[i].instruction})
        }
        return arr
      },
      back() {
        this.$router.back()
        this.setbackindex(1)
      }
    }
  }
</script>
<style lang="less">
  .navigation {
    .amap-logo {
      display: none !important;
    }
    .amap-copyright {
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
        color: #808080;
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
          color: #333;
          font-weight: bold;
          line-height: .3rem;
          margin-bottom: .24rem;
          padding: 0 .3rem;
          span {
            font-weight: normal;
            font-size: .28rem;
            color: #a5a5a5;
          }
        }
        .box {
          width: 65% !important;
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
            border-color: #c5c5c5;
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
                color: #333;
                background: url("../../assets/images/bussmall.png") no-repeat left center;
                background-size: .3rem .3rem;
                position: relative;
                padding-right: .3rem;
                &:after {
                  /*content: "";*/
                  /*display: block;*/
                  /*position: absolute;*/
                  /*right: -.1rem;*/
                  /*top: 50%;*/
                  /*margin-top: -.1rem;*/
                  /*border: .1rem solid transparent;*/
                  /*border-left-color: #333;*/
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
                color: #808080;
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
