<template>
  <transition name="slide" mode="in-out">
    <div class="navigation">

      <!--顶部-->
      <div class="title-wrap">
        <div class="img-wrap" @click="back">
        </div>
        <span :class="{active:currentIndex===0}" @click.stop="change" class="go">{{ $t("msg.goairshow") }}</span>
        <img src="../../assets/images/change.png" alt="" class="icon"/>
        <span :class="{active:currentIndex===1}" @click.stop="change2" class="back">{{ $t("msg.Backward") }}</span>
      </div>

      <!--s去航展s-->
      <div class="current" v-show="currentIndex===0">

        <!--路线信息-->
        <div class="list-wrap">
          <ul>
            <li class="start" @click="loaddeatal">
              <em></em>
              <div v-html="position"></div>
            </li>
            <li class="by" @click="showMadal">
              <em v-show="initlag()===true">换<br/>乘</em>
              <div v-html="ridePoint"></div>
            </li>
            <li class="end">
              <em></em>
              <div v-text="destination"></div>
            </li>
          </ul>
        </div>

        <div class="main">
          <!--地图展示-->
          <div class="map-wrap" id="img-wrap"></div>
          <div v-show="initlag()===true">
            <!--巴士块-->
            <div class="bus-wrap">
              <p class="tip" v-show="getbus().length">
                推荐公交线路：<span>(其他交通方式请自行选用高德导航)</span>
              </p>
              <swiper :options="swiperOption" ref="mySwiper" v-show="position">
                <swiper-slide class="box" v-for="(item,index) in getbus()" :key="index" :class="{active:currentcls===index}">
                  <div class="bus" @click="selcetCar(index)">
                    <p>
                      <span v-for="a in item" v-if="a.transit_mode != 'WALK'">{{getSiteName(a)}}</span>
                      <span>航展专线巴士</span>
                    </p>
                    <p class="sub">共计 {{getitem()[index]}} 站</p>
                  </div>
                </swiper-slide>
              </swiper>
            </div>

            <!--文字导航-->
            <div class="map-container" id="container-map">
              <div id="container"></div>
              <div id="panel" style="display: none"></div>

              <!--完整版-->
              <div class="steplist" v-show="position&&getbus().length">
                <ul v-for="item in lastlist" class="main-line">
                  <li class="walk start" style="padding-bottom: .05rem;">
                    <em>起</em>
                    <p>我的位置</p>
                  </li>

                  <li v-for="load of item" class="li2" :class="goclass(load)">

                    <!--步行路线-->
                    <p v-show="load.transit_mode==='WALK'&&load.instruction.indexOf('米')>=0">
                      {{load.instruction.substring(0, load.instruction.indexOf("米")+1)}}
                    </p>
                    <span v-show="load.transit_mode==='WALK'&&load.instruction.indexOf('到')>=0">
                    {{getLastName(load)}}
                  </span>

                    <!--公交路线 / 地铁路线-->
                    <ul v-show="load.transit_mode==='BUS' || load.transit_mode==='SUBWAY'" class="sub-line" style="margin-top: 0">
                      <li class="car">
                        <span>{{getSiteName(load)}}</span>
                      </li>
                      <li v-for="object in load.via_stops">
                        <span>{{object.name}}</span>
                      </li>
                      <li>
                        <span>{{getLastName(load)}} 下车</span>
                      </li>
                    </ul>
                    <span v-show="load.transit_mode==='BUS' || load.transit_mode==='SUBWAY'" style="padding: .2rem 0 0">
                    {{getLastName(load)}}
                  </span>

                    <!--快车路线-->
                    <ul v-show="load.transit_mode==='RAILWAY'" class="sub-line" style="margin-top: 0">
                      <li class="car">
                        <span>{{getSiteName(load)}}</span>
                      </li>
                      <li>
                        <span>{{getLastName(load)}} 下车</span>
                      </li>
                    </ul>
                    <span v-show="load.transit_mode==='RAILWAY'" style="padding: .2rem 0 0">
                    {{getLastName(load)}}
                  </span>

                  </li>
                  <li class="bus Transfer">
                    <em>换</em>
                    <p>{{ridePoint.substring(0, ridePoint.indexOf("（"))}} 乘车点</p>
                    <ul class="sub-line">
                      <li class="car">
                        <span>航展专线 - {{ridePoint.substring(0, ridePoint.indexOf("（"))}}</span>
                      </li>
                      <li>
                        <span>{{ridePoint.substring(0, ridePoint.indexOf("（"))}} 上车</span>
                      </li>
                      <li>
                        <span>航展馆P2停车场 下车</span>
                      </li>
                    </ul>
                  </li>
                  <li class="end">
                    <em>终</em>
                    <p>航展馆P2停车场</p>
                  </li>
                </ul>
              </div>

              <!--缩减版-->
              <div class="steplist" style="margin-top: -.4rem;" v-show="infoflag&&!getbus().length">
                <ul class="main-line">
                  <li class="bus start">
                    <em>起</em>
                    <p>我的位置</p>
                    <ul class="sub-line">
                      <li class="car">
                        <span>航展专线 - {{ridePoint.substring(0, ridePoint.indexOf("（"))}}</span>
                      </li>
                      <li>
                        <span>{{ridePoint.substring(0, ridePoint.indexOf("（"))}} 上车</span>
                      </li>
                      <li>
                        <span>航展馆P2停车场 下车</span>
                      </li>
                    </ul>
                  </li>
                  <li class="end">
                    <em>终</em>
                    <p>航展馆P2停车场</p>
                  </li>
                </ul>
              </div>

              <!--无定位提示-->
              <div class="error-tip" v-show="!position">
                系统定位获取中...
              </div>

            </div>

          </div>
        </div>
        <modal ref="modal" :list="list" @selcetItem="selcet"></modal>
      </div>
      <!--e去航展e-->


      <!--s回乘车点s-->
      <div class="next" v-show="currentIndex===1">
        <!--路线信息-->
        <div class="list-wrap">
          <ul>
            <li class="start" @click="loaddeatalb">
              <em></em>
              <div v-html="positionb"></div>
            </li>
            <li class="by">
              <em v-show="initlag()===true">换<br/>乘</em>
              <div v-html="destination"></div>
            </li>
            <li class="end" @click="showMadal">
              <em></em>
              <div v-text="backridePoint"></div>
            </li>
          </ul>
        </div>

        <div class="main">
          <!--地图展示-->
          <div id="wrap3" class="map-wrap"></div>
          <div id="wrap2" style="display: none;"></div>
          <div id="img-wrap2" style="display: none"></div>
          <!--文字导航-->
          <div class="map-container">

            <!--完整版-->
            <div class="steplist" v-show="steplist.length&&positionb&&initlag()===true">
              <ul class="main-line">
                <li class="walk start">
                  <em>起</em>
                  <p>我的位置</p>
                </li>
                <li v-for="item in steplist" class="walk" :class="getclass(item)">
                  <em></em>
                  <p>{{item.instruction}}</p>
                </li>
                <li class="bus Transfer">
                  <em>换</em>
                  <p>航展馆P2停车场</p>
                  <ul class="sub-line">
                    <li class="car">
                      <span>航展专线 - {{backridePoint.substring(0, backridePoint.indexOf("（"))}}</span>
                    </li>
                    <li>
                      <span>航展馆P2停车场 上车</span>
                    </li>
                    <li>
                      <span>{{backridePoint.substring(0, backridePoint.indexOf("（"))}} 下车</span>
                    </li>
                  </ul>
                </li>
                <li class="end">
                  <em>终</em>
                  <p>{{backridePoint}}</p>
                </li>
              </ul>
            </div>

            <!--无定位提示-->
            <div class="error-tip" v-show="!position">
              系统定位获取中...
            </div>

          </div>
        </div>
      </div>
      <!--e回乘车点e-->

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
        infoflag: false,
        getLng: '',
        getLat: '',
        currentcls: 0,
        currentIndex: 0,
        ridePoint: '',
        backridePoint: '',
        result: [],
        params: [],
        geocoder: '',
        position: '',
        positionb: "",
        destination: '航展馆P2停车场',
        map: '',
        mapf: "",
        transfer: '',
        driving: '',
        driving2: "",
        Walking: '',
        steplist: [],
        listresult: [],
        lastlist: [], //公交路线数据
        item: '',
        list: [],
        container: "",
        busstep: "",
        routeLines: [],
        endMarker: "",
        startMarker: "",
        storeitem: "",
        location: require('../../assets/images/456.png'),
        Marker11: "",
        selectflag: false,
        currentitem: "",  //select时候选的车,
        lastpositon: "",
      }
    },
    mounted() {
      this.initlag()
      this.initstation();
      this.initf();
    },
    created() {
      if (this.getcurrentindex === 0) {
        this.currentIndex = 0
      } else if (this.getcurrentindex === 1) {
        this.currentIndex = 1;
        this.$nextTick(() => {
          this.change2()
        })
      }
    },
    computed: {
      ...mapGetters['searchflag'],
      swiper() {
        return this.$refs.mySwiper.swiper
      },
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
      },
      getaddress() {
        return this.$store.state.setmapaddress
      },
      setposition() {
        return this.$store.state.setposition
      }

    },
    components: {
      modal,
    },
    methods: {
      //初始化语言
      initlag() {
        if (this.$i18n.locale === 'EN') {
          this.destination = "P2（Airshow）";
          return false
        } else {
          return true
        }

      },
      //获取站点名称
      getSiteName(item) {
        if (item.transit_mode === "RAILWAY") {
          return item.instruction.substring(2, item.instruction.indexOf("到"));
        }
        else {
          return item.instruction.substring(2, item.instruction.indexOf("("));
        }
      },
      //获取下车点名称
      getLastName(item) {
        if (item.transit_mode === "RAILWAY") {
          return item.instruction.substring(item.instruction.indexOf("到") + 1);
        }
        else {
          return item.instruction.substring(item.instruction.indexOf("达") + 1);
        }
      },
      getstore() {
        let item;
        //从主页进来
        // alert(1)
        //alert(this.ridePoint);
        item = this.list[0];

        if (this.query) {
          let user = store.get('user');
          console.log(user);
          const _this = this;
          if (user) {
            //从二维码哪里进来
            let a = user.airRidePoint
            typeof a === 'undefined' ? a = user.airRideQrCode.airRidePoint : "";
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
        //debugger
        if (this.currentIndex === 0) {
          const _this = this;
          //判断用户是不是先选了地址
          //console.log(_this.setposition);
          //console.log(_this.getaddress.name);
          //  debugger
          if (_this.getaddress.name && !_this.setposition) {
            _this.position = this.query.name;
            _this.ridePoint = this.getaddress.name;
            _this.backridePoint = item.name;
            _this.transfer.clear();
            //debugger
            _this.transfer.search(
              [
                {keyword: _this.position, city: '珠海市'},
                {keyword: _this.ridePoint, city: '珠海市'}
              ],
              function (status, result) {
                if (status === 'complete') {
                  _this.result.length = 0;
                  console.log(result);
                  // console.log(_this.query);
                  if (result.info === 'NO_DATA') {
                    //判断是不是有信息
                    _this.infoflag = true
                    _this.map.clearMap();
                    _this.addmarkerlocation(_this.query.O, _this.query.M);
                    return
                  }
                  console.log(result);
                  _this.result = _this.normalstep(result);
                  _this.busstep = result;
                  //获取滑动公交车数据
                  if (_this.result) {
                    _this.selcetCar();
                  }
                }
              });
            return
          }
          //console.log(_this.setposition);
          //console.log(_this.query.name);
          //alert(11)
          if (_this.setposition.name) {

            let user = store.get('user');
            //  console.log(user);
            //debugger

            _this.ridePoint = `${user.airRidePoint.route}${user.airRidePoint.name}（${user.airRidePoint.city}）`;
            _this.position = _this.lastpositon
          } else {
            _this.position = this.query.name;
            _this.ridePoint = item.name;
            _this.backridePoint = item.name;
            _this.storeitem = item
          }

          // debugger
          //  alert(_this.ridePoint)
          _this.transfer.clear();
          // debugger
          console.log(_this.position);
          console.log(_this.ridePoint);

          _this.transfer.search(
            [
              {keyword: _this.position, city: '珠海市'},
              {keyword: _this.ridePoint, city: '珠海市'}
            ],
            function (status, result) {
              if (status === 'complete') {
                _this.result.length = 0;
                console.log(result);
                if (result.info === 'NO_DATA') {
                  //判断是不是有信息
                  console.log(item);
                  _this.infoflag = true
                  _this.map.clearMap();
                  _this.addmarkerlocation(item.log, item.lat)
                  return
                }
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
          _this.ridePoint = item.name;
          //需要修改
          _this.positionb = this.query.name;
          console.log(_this.query);
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
        setbackindex: 'SET_BACK_INDEX',
        setaddress: 'SET_MAPADDRESS'
      }),
      //序列化乘车点
      normallist(list) {
        const arr = [];
        for (let i = 0; i < list.length; i++) {
          arr.push({
            name: list[i].route + ' ' + list[i].name + '（' + list[i].city + '）',
            log: list[i].lon,
            lat: list[i].lat,
            id: list[i].id
          })
        }
        return arr
      },
      //获取乘车点信息
      initstation: async function () {
        const _this = this;

        const url = `${baseurl}/booking/getAllPoint.do`;
        const user = this.user.id ? this.user.id : _this.user.airRideQrCode.id
        let par;
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
            // this.ridePoint = `${res.data.data.route}${res.data.data.nowAiRidePoint.position}${res.data.data.city}`;
            this.ridePoint = this.list[0].name;
            console.log(res);
            // debugger
          }
          //初始化地图
          this.init();
          //  alert(1)
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
        setTimeout(() => {
          this.init()
        }, 100)

      },
      change2() {
        const _this = this
        this.currentIndex = 1;
        this.initializationb();
        if (!this.query.name) {
          setTimeout(() => {
            _this.initializationb();
          }, 500)
        }

      },
      addmarkerlocation(Lng, Lat) {
        const _this = this;
        if (_this.Marker11) {
          _this.Marker11.setMap(null);
        }
        this.Marker11 = new AMap.Marker({
          icon: _this.location,
          position: [Lng, Lat],
          offset: new AMap.Pixel(-13, -30),
          zIndex: 999
        });
        _this.Marker11.setMap(this.map);

      },
      selcet(item) {
        const _this = this;
        _this.currentitem = item
        this.currentcls = 0;
        this.swiper.slideTo(0, 300);
        if (_this.Marker11) {
          _this.Marker11.setMap(null);
        }
        this.ridePoint = item.name;
        _this.setaddress(item)
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
            _this.lastpositon = result.regeocode.formattedAddress;
            // alert(3)
            if (_this.query.name) {
              _this.getstore()
            } else {
              if (_this.set) {
                //从选选择乘车点进来
                let item = _this.user.airRidePoint;
                console.log(item);
                _this.search(item);
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
        if (!this.geocoder) return
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
              if (_this.storeitem) {
                item = _this.storeitem
              }
              //绘制地图
              _this.getloadc(item);
              console.log(item);
              //生成导航轨迹
              _this.searchb();

            }
          }
        })
      },
      getitem() {
        let arr = []
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
        }
        let c = [];
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
        return c
      },
      //获取乘车方式
      getbus() {
        // console.log(this.result);
        let arr = [];
        for (let i in this.result) {
          if (typeof arr[i] === 'undefined') {
            arr[i] = []
          }
          for (let p in this.result[i]) {
            arr[i].push(this.result[i][p])
          }
        }

        if (!arr.length) this.selectflag = true
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
              _this.$nextTick(() => {
                _this.initialization();
              })
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
        //alert(1)
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
        console.log(_this.query);
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
        // alert(4)
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
        console.log(_this.query.name);
        console.log(_this.ridePoint);
        console.log(_this.container);
        item.getLng = 113.2768480000;
        item.getLat = 23.1815110000;
        _this.transfer.clear();
        //需要改正
        _this.transfer.search(
           new AMap.LngLat(this.query.name ? this.query.O : _this.getLng, this.query.name ? this.query.M : _this.getLat),
         // new AMap.LngLat(113.3548100000, 23.2950000000),
           new AMap.LngLat(item.log, item.lat),
          //new AMap.LngLat(113.3864380000, 23.3499290000),
          function (status, result) {
            console.log(_this.query.name);
            console.log(_this.ridePoint);

            console.log(status);
            console.log(result);

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
        console.log(_this.getLng);
        //要改
        _this.Walking2.search(
          new AMap.LngLat(_this.getLng, _this.getLat),
          //：23.2888780000,113.3010040000
         // new AMap.LngLat(113.3010040000, 23.2888780000),
          new AMap.LngLat(113.395158, 22.022997),
          //new AMap.LngLat(113.3864380000, 23.3499290000),
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
          if (_this.busstep.info === 'NO_DATA') {
            _this.map.clearMap();
            if (_this.currentitem) {
              // console.log(_this.currentitem);
              _this.addmarkerlocation(_this.currentitem.log, _this.currentitem.lat)

            }
            _this.infoflag = true;

            return
          } else {
            _this.drawRoute(_this.busstep.plans[selectIndex])
          }
          console.log(_this.busstep.plan);


        } else {
          this.currentcls = selectIndex;
          this.lastlist = [];
          this.lastlist.push(this.result[selectIndex]);
          flag = true;
          // _this.drawRoute(_this.busstep.plans[selectIndex])
          if (_this.busstep.info === 'NO_DATA') {
            _this.infoflag = true

          } else {
            _this.drawRoute(_this.busstep.plans[selectIndex])

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
      },
      //去程样式
      goclass(item) {
        console.log(item);
        const type = item.transit_mode;
        if (type === "WALK") {
          return 'walk'
        }
        else {
          return 'bus'
        }
      },
      //回程步行导航方向判断
      getclass(item) {
        const direction = item.instruction.substring(item.instruction.indexOf("米") + 1);
        console.log(direction);
        if (direction === "左转") {
          return 'left'
        }
        else if (direction === "右转") {
          return 'right'
        }
        else if (direction === "向左前方行走") {
          return 'lefttop'
        }
        else if (direction === "向右前方行走") {
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
      z-index: 99;
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

    .main {
      background: #fff;
      .map-wrap {
        width: 100%;
        height: 5rem;
      }
      .bus-wrap {
        padding: .4rem 0 0;
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
          min-height: 1.6rem;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: .08rem;
          margin: 0 0 .3rem .3rem !important;
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
                  content: "";
                  display: block;
                  position: absolute;
                  right: -.1rem;
                  top: 50%;
                  margin-top: -.1rem;
                  border: .1rem solid transparent;
                  border-left-color: #333;
                }
                &:last-child {
                  margin-right: 0;
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

      /*定位失败提示*/
      .error-tip {
        padding: .6rem .3rem;
        text-align: center;
        font-size: .32rem;
        color: #808080;
      }

      /*文字轨迹*/
      .steplist {
        padding-top: .3rem;
        .main-line {
          & > li {
            padding: 0 .3rem .4rem 1.1rem;
            position: relative;
            font-size: 0;
            &.li2.walk {
              padding-bottom: .12rem;
            }
            &.li2.bus {
              padding-bottom: .12rem;
            }
            & > em {
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
            & > p {
              font-size: .32rem;
              line-height: .46rem;
              padding: .07rem 0;
              color: #444;
            }
            & > span {
              display: block;
              font-size: .32rem;
              font-weight: bold;
              line-height: .46rem;
              padding: .12rem 0 .07rem;
              color: #444;
            }
            &.walk {
              &:before {
                content: "";
                display: block;
                position: absolute;
                left: .57rem;
                top: 0;
                bottom: 0;
                border-left: .06rem dotted #d9d9d9;
              }
              & > em {
                background-repeat: no-repeat;
                background-position: center center;
                background-size: .4rem .4rem;
              }
              &.go > em {
                background-image: url("../../assets/images/navigation/go_icon.png");
              }
              &.left > em {
                background-image: url("../../assets/images/navigation/turnleft_icon.png");
              }
              &.right > em {
                background-image: url("../../assets/images/navigation/turnright_icon.png");
              }
              &.lefttop > em {
                background-image: url("../../assets/images/navigation/lefttop_icon.png");
              }
              &.righttop > em {
                background-image: url("../../assets/images/navigation/righttop_icon.png");
              }
            }
            &.bus {
              padding-bottom: .3rem;
              &:before {
                content: "";
                display: block;
                position: absolute;
                left: .57rem;
                top: 0;
                bottom: 0;
                border-left: .06rem solid #1c9ae3;
              }
            }
            &.start {
              & > p {
                font-weight: bold;
              }
              & > em {
                background: #1c9ae3 !important;
              }
            }
            &.Transfer {
              & > p {
                font-weight: bold;
              }
              & > em {
                background: #999 !important;
              }
            }
            &.end {
              & > p {
                font-weight: bold;
              }
              & > em {
                background: #ef5151 !important;
              }
            }
          }
        }
        .sub-line {
          margin: .2rem -.3rem 0 -1.2rem;
          padding: .3rem .3rem .3rem 1.2rem;
          background: #f7fbfc;
          li {
            padding-bottom: .1rem;
            font-size: 0;
            span {
              line-height: .36rem;
              font-size: .26rem;
              color: #555;
            }
            &.car {
              margin-bottom: .1rem;
              span {
                display: inline-block;
                line-height: .46rem;
                font-size: .32rem;
                color: #fff;
                background: #1c9ae3;
                padding: 0 .1rem;
                border-radius: .08rem;
              }
            }
            &:last-child {
              padding-bottom: 0;
            }
          }
        }
      }

    }
  }

</style>
