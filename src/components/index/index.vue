<template>
  <div class="index">
    <keep-alive>
      <div class="app-wrap">
        <div class="wrap" v-show="flag">
          <div class="mode"></div>
          <div class="content">
            <div class="img-wrap">
            </div>
            <div class="txt">
              <p class="space">因管控区实施交通管制，本届航展禁止小汽车进入，只允许公交车辆、市内航展专线、跨市航展专线大巴车辆、出租车通行。</p>
              <p class="advice">建议尽量采用公共交通工具观展。</p>
            </div>
            <div class="btn-wrap">
              <button type="button" class="btn" @click="hide">好的，我知道了</button>
            </div>
          </div>
        </div>
        <div class="prohibit" @click="show" style="position: fixed;bottom: 2rem;width: 65px;height: 65px;right: .5rem" v-show="initlag()===true">
          <img src="../../assets/images/61542875992_.pic.jpg" alt="">
        </div>
        <div class="prohibit" style="position: fixed;bottom:.5rem;width:65px;height: 65px;right: .5rem" @click="changelang">
          <img src="../../assets/images/331542704188_.pic_hd.jpg" alt="">
        </div>
      </div>
    </keep-alive>
    <header>
      <div class="cont">
        <div class="cont-wrap clearfix">
          <div class="left ">
            <p class="txt">{{getTime}}</p>
            <p class="data" v-html="txt"></p>
          </div>
          <div class="right" @click="loaddetail">
            <p class="txt" v-html="len"></p>
            <p class="data"></p>
          </div>
        </div>
        <div class="imgwrap">
          <div alt="" class="img" v-show="!a.length&&langflag===true" @click="loadingnext"></div>
          <div alt="" class="img2" v-show="!a.length&&langflag===false" @click="loadingnext"></div>
          <swiper :options="swiperOption" ref="mySwiper" v-show="a.length">
            <swiper-slide v-for="(item,index) in a" :key="index" class="content" @click="loadcode(item)">
              <h5 @click="loadcode(item)">{{ $t("msg.Airshowexpressbustickets") }}</h5>
              <p v-if="item.airRidePoint" @click="loadcode(item)">{{item.airRidePoint.name}}</p>
              <div class="txt" @click="loadcode(item)">
                <span>{{item.rideDate.substring(5,10).replace("-","月")}}日</span>&nbsp
                <span v-show="item.rideType === 1">06:30-12:00&nbsp</span>
                <span v-show="item.rideType === 4">06:30-12:00&nbsp</span>
                <span v-show="initlag()===true">共{{item.rideNo}}人乘车</span>
              </div>
              <div class="bottom clearfix" @click="loadcode(item)">
                <p v-show="item.rideType === 1">{{$t("msg.Cliketoscanticketswhileboarding")}}</p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </header>
    <div class="mainCenter">
      <vueSeamless :data="newsList" :class-option="optionLeft" class="seamless-warp2">
        <ul class="item"  @click="loadmesdetal">
          <!--<li>{{ $t("msg.swiper") }}</li>-->
          <li v-for="(item,index) in newsList" :key="index">{{item.title}}</li>
        </ul>
      </vueSeamless>
      <!--中文版本tab-->
      <div class="boxCont" v-show="langflag">
        <tab :tabData="mydata"></tab>
        <tab2 :tabData="mydata2"></tab2>
      </div>
      <div class="boxCont" v-show="!langflag">
        <tab :tabData="mydata3"></tab>
        <tab2 :tabData="mydata4"></tab2>
      </div>
    </div>
    <!--英文版本tab-->
    <div class="airShow-wrap" v-show="langflag">
      <airShow></airShow>
    </div>
    <footer v-show="langflag">
      <mfooter></mfooter>
    </footer>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import tab from 'base/tab/tab'
  import tab2 from '../tab/tab'
  import airShow from 'base/airShow/airShow'
  import mfooter from 'base/m-footer/m-footer'
  import store from 'store'
  import vueSeamless from './seamless-scroll'
  import {baseurl} from "common/js/config";
  import http from "api/https"
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'index',
    data() {
      return {
        swiperOption: {
          slidesPerView: 'auto',
        },
        listFlag: true,
        a: [],
        flag: false,
        len: 0,
        txt: '' || "",
        name: '',  //地点
        rideData: '' || 0, //日期
        rideNo: ' ' || 0, //人数
        newsList: [
          {
            'title': '本届航展实行实名制入场，请持票观众携带展票及有效身份证件观展。'
          },
        ],
        mydata: [
          {
            title: "专线乘车",
            data: [
              {txt: " 预约乘车", id: 1, img: require("../../assets/images/bigicon_12.png")},
              {txt: " 往返乘车", id: 2, img: require("../../assets/images/bigicon_22.png")}
            ]
          }
        ],
        mydata2: [
          {
            title: "其他指引",
            data: [
              {txt: " 公交查询", id: 3, img: require("../../assets/images/bigicon_32.png")},
              {txt: " 停车定位", id: 4}
            ]
          }
        ],
        mydata3: [
          {
            title: "Airshow express guide",
            data: [
              {txt: " 公交查询", id: 1, img: require("../../assets/images/bigicon_en12.jpg")},
              {txt: " 停车定位", id: 2, img: require("../../assets/images/bigicon_22en.jpg")}
            ]
          }
        ],
        mydata4: [
          {
            title: "Self-driving guide",
            data: [
              {txt: " 公交查询", id: 3, img: require("../../assets/images/bigicon_32en.jpg")},
              {txt: " 停车定位", id: 4}
            ]
          }
        ],
      }
    },
    created() {
      //console.log(typeof  this.$i18n.locale);
      this.initlag();
      this.getData();
      store.remove('user')
    },
    mounted() {
      // console.log('this is current swiper instance object', this.swiper);
      this.swiper.slideTo(0, 1000, true)

    },

    methods: {
      ...mapMutations({
        setstate: 'SET_STATE',
        setuser: 'SET_USER',
        allflag: 'FLAG',
        getticket: 'GET_TICKET',
        set: 'set'
      }),
      loadmesdetal(){
          if(this.$i18n.locale==="CN"){
            this.$router.push({
              name:"msgdetai"
            })
          }
      },
      changelang() {
        if (this.$i18n.locale === 'EN') {
          this.$i18n.locale = 'CN';
          this.newsList = [];
          this.newsList.push({
            title: '本届航展实行实名制入场，请持票观众携带展票及有效身份证件观展。'

          });

        } else {
          if (this.$i18n.locale = 'CN') {
            this.newsList = [];
            this.newsList.push(
              {
                title: "Please carry your ID card or passport for exhibition admission and identity check."
              },
            );

            this.$i18n.locale = 'EN'
          }
        }
      },
      initlag() {
        if (this.$i18n.locale === "EN") {
          return false
        } else {
          return true
        }
      },
      getData: async function () {
        const url = `${baseurl}/booking/index.do`;
        let params = {};
        const res = await http.get(url, params);
        if (res.data.code === "200") {
          console.log(res)
          this.txt = res.data.data.dayMsg || '';
          this.a = res.data.data.qrCodeList;//初始化页面，判断用户有是否已经生成二维码
          this.len = res.data.data.ticketCount;
          this.getticket(res.data.data.ticketCount);
        }
      },
      hide() {
        this.flag = false;
        window.scrollTo(0, 0);
      },
      show() {
        this.flag = true;
        window.scrollTo(0, 0);
      },
      loaddetail() {
        this.$router.push({
          name: "tickdetail"
        })
      },
      loadingnext() {
        this.$router.push({
          name: "bus"
        })
      },
      loadcode(item) {
        console.log(item)
        this.setuser(item);
        this.$router.push({
          name: "appointment"
        });
        this.allflag(true)
        this.set(true)

      }
    },
    computed: {
      langflag() {
        if (this.$i18n.locale === "CN") {
          return true
        } else {
          return false
        }
      },
      ...mapGetters([
        'setflag'
      ]),
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      getTime() {
        let date = new Date;
        let month = date.getMonth() + 1;
        let data = date.getDate();
        console.log(typeof  month);
        let nub;
        if (this.$i18n.locale === "EN") {
          if (month === 11) {
            nub = "November"
          } else if (month === 12) {
            nub = "December"
          } else if (month === 1) {
            nub = "January"
          }
          return `${nub} ${data}th`

        } else {
          return `${month}月${data}日`

        }
      },
      optionLeft() {
        return {
          step: 0.5,
          direction: 2,
          limitMoveNum: 1,
          openTouch: false
        }
      }
    },
    watch: {
      locale(val) {
        //this.$i18n.locale = val
        // console.log(this.$i18n.locale);
      }


    },
    components: {
      vueSeamless,
      tab,
      tab2,
      airShow,
      mfooter
    }
  }
</script>
<style scoped lang="less">
  .index {
    .app-wrap {
      .wrap {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        .content {
          position: relative;
          z-index: 9999;
          margin: 0 .6rem;
          background: #fff;
          box-shadow: 0 .23rem .8rem rgba(25, 27, 28, .2);
          border-radius: .08rem;
          overflow: hidden;
          font-size: 0;
          .img-wrap {
            height: 2.3rem;
            margin-bottom: .5rem;
            background: url("../../assets/images/mode_03.jpg") no-repeat center center;
            background-size: cover;
          }
          .txt {
            padding: 0 .3rem;
            margin-bottom: .5rem;
            font-size: .3rem;
            p {
              font-size: .3rem;
              line-height: .5rem;
              color: #333;
            }
            p.advice {
              color: #1c9ce3;
            }
          }
          .btn-wrap {
            text-align: center;
            padding: 0 .3rem .35rem;
          }
          .btn {
            width: 100%;
            height: .86rem;
            background: #1c9ae3;
            outline: none;
            border: none;
            color: #fff;
            font-size: .34rem;
            border-radius: .08rem;
          }
        }
        .mode {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #414c53;
          opacity: .5;
          z-index: 30;
        }
      }
      .prohibit {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 2.2rem;
        height: 2.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    header {
      height: 3.84rem;
      width: 100%;
      /*background: #1892df;*/
      /*background-image:-webkit-linear-gradient(135deg, #42ade4, #1791de);*/
      /*background-image:-moz-linear-gradient(135deg, #42ade4, #1791de);*/
      /*background-image:-o-linear-gradient(135deg, #42ade4, #1791de);*/
      /*background-image: linear-gradient(-135deg,#42ade4,#1791de);*/
      background-image: linear-gradient(-180deg, #42ade4, #1791de);
      .cont {
        margin: 0 .3rem;
        padding-top: .5rem;
        color: #fff;
        .txt {
          font-size: .48rem;
          margin-bottom: .15rem;
          text-shadow: 0 2px 0 rgba(0, 0, 0, .1);
        }
        .data {
          font-size: .3rem;
          color: #c6e4f7;
        }
        .left {
          float: left;
        }
        .right {
          float: right;
          .txt {
            text-align: center;
          }
        }
      }
      .imgwrap {
        text-align: center;
        height: 3.3rem;
        /*padding-top: .38rem;*/
        padding-top: .3rem;
        margin: 0 -0.3rem;
        .img {
          /*width: 100%;*/
          margin: 0 .3rem;
          height: 100%;
          background: url("../../assets/images/banner2.jpg") no-repeat center center;
          background-size: 100% 100%;
          border-radius: .08rem;
          box-shadow: 0 .12rem .27rem rgba(0, 0, 0, .08);
        }
        .img2 {
          /*width: 100%;*/
          margin: 0 .3rem;
          height: 100%;
          background: url("../../assets/images/banner2en.jpg") no-repeat center center;
          background-size: 100% 100%;
          border-radius: .08rem;
          box-shadow: 0 .12rem .27rem rgba(0, 0, 0, .08);

        }

        .content {
          width: 88% !important;
          height: 3.3rem;
          font-size: .3rem;
          background: #fff url("../../assets/images/ticket_bg2.jpg") no-repeat center center;
          background-size: 100% 100%;
          border-radius: .08rem;
          box-shadow: 0 .12rem .27rem rgba(0, 0, 0, .08);
          position: relative;
          margin: 0 0 .4rem .3rem !important;
          text-align: left;
          & > h5 {
            font-size: .36rem;
            line-height: .5rem;
            color: #3d3e8f;
            padding: .38rem 0 0 .3rem;
            /*-webkit-text-fill-color: #3d3e8f; !*文字的填充色*!*/
            /*-webkit-text-stroke: .02rem #fff;*/
            text-shadow: -.02rem .02rem .01rem #d1d1d1;
          }
          & > p {
            color: #3d3e8f;
            text-align: left;
            font-size: .32rem;
            line-height: .64rem;
            font-weight: bold;
            padding-left: .3rem;
            /*padding: .4rem 0 .26rem .3rem;*/
          }
          & > .txt {
            color: #111111;
            font-size: .24rem;
            line-height: .4rem;
            padding-left: .3rem;
            /*padding-bottom: 2rem;*/
          }
          &::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 50%;
            width: .32rem;
            height: .32rem;
            border-radius: 50%;
            margin: -.16rem 0 0 -.16rem;
            background: #1d94dd;
          }
          &::after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 50%;
            width: .32rem;
            height: .32rem;
            border-radius: 50%;
            margin: -.16rem -.16rem 0 0;
            background: #1d94dd;
          }
          .bottom {
            position: absolute;
            bottom: .2rem;
            left: .3rem;
            right: .28rem;
            padding-top: 1.2rem;
            text-align: left;
            p {
              text-align: right;
              color: #333;
              font-size: .24rem;
            }
            .l {
              float: left;
              height: .56rem;
              line-height: .56rem;
              font-size: .26rem;
              color: #b3b3b3;
              img {
                width: .48rem;
                margin-bottom: -0.03rem;
              }
            }
            .r {
              float: right;
              height: .56rem;
              padding: 0 0.2rem 0 .15rem;
              border-radius: .3rem;
              background-image: -webkit-linear-gradient(135deg, #22b6e1, #20a1e6);
              background-image: -moz-linear-gradient(135deg, #22b6e1, #20a1e6);
              background-image: -o-linear-gradient(135deg, #22b6e1, #20a1e6);
              background-image: linear-gradient(-135deg, #22b6e1, #20a1e6);
              img {
                float: left;
                width: .36rem;
                height: .36rem;
                margin-top: .1rem;
                margin-right: .06rem;
              }
              span {
                line-height: .56rem;
                line-height: .56rem;
                font-size: .28rem;
                color: #fff;
              }
            }
          }
        }
        .content:last-child {
          margin-right: .3rem !important;
        }
      }
    }
    .mainCenter {
      padding: 0 .3rem;
      /*margin-top: 1.76rem;*/
      margin-top: 1.6rem;
      .seamless-warp2 {
        overflow: hidden;
        background: #fff7ea;
        border-radius: .5rem;
        height: .96rem;
        ul.item {
          white-space: nowrap;
          li {
            vertical-align: top;
            display: inline-block;
            background: url("../../assets/images/click.png") no-repeat .2rem center;
            background-size: .4rem;
            height: .96rem;
            line-height: .96rem;
            padding: 0 .5rem 0 .7rem;
            color: #d09b44;
            font-size: .3rem;
          }
        }
      }
      .boxCont {
        padding-top: .4rem;
      }
    }

  }

</style>
