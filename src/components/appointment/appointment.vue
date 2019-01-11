<template>
  <div class="appointment">

    <!--取消预约弹窗-->
    <div class="cacelmodel" v-show="modelflag">
      <div class="wrap">
        <div class="img-wrap">
          <img src="../../assets/images/icon.png" alt="" v-show="btnflag"/>
          <!--<img src="" alt="">-->
          <img src="../../assets/images/fail_icon.png" alt="" v-show="!btnflag"/>

        </div>
        <h4 class="title" v-html="title"></h4>
        <div class="btn-cont" v-show="!btnflag">
          <button class="btn" @click="ok">{{$t("msg.OK")}}</button>
        </div>
        <div class="btn-cont" v-show="btnflag">
          <button class="btn" @click="confirm">{{$t("msg.confirm")}}</button>
          <button class="btn blue" @click="cancleBtn">{{$t("msg.Cancel")}}</button>
        </div>
      </div>
      <div class="mode" @click.stop="confirm"></div>
    </div>

    <!--预约成功弹窗-->
    <div class="cacelmodel" v-show="successflag&&initlag===false">
      <div class="wrap">
        <div class="img-wrap right-img">
          <img src="../../assets/images/right.png" alt="">
        </div>
        <h4 class="title" style="margin-bottom: .3rem;">预约成功！</h4>
        <p>
          <span v-show="bustype === 1">请提前保存预约详情页面截图<br/>以便快速扫码乘车</span>
        </p>
        <div class="btn-cont">
          <button class="btn blue" @click="finish" style="margin-right: 0">{{$t("msg.OK")}}</button>
        </div>
      </div>
      <div class="mode" @click="finish"></div>
    </div>

    <div class="title-wrap">
      <div class="icon" @click="back()">
      </div>
      <div class="txt">{{$t("msg.detal")}}</div>
      <!--<div class="cancel" @click="cancle">取消预约</div>-->
    </div>

    <div class="ticket-detail">
      <div class="bg"></div>
      <div class="ticket-box">
        <div class="btn-box">
          <button type="button" class="btn blue" @click="point" v-if="bustype === 1"><span>{{$t("msg.buspoint")}}</span></button>
          <button type="button" class="btn" @click="cancle"><span>{{$t("msg.Cancel")}}</span></button>
        </div>
        <div class="img-box" v-show="bustype === 1">
          <img :src="imgbg()" alt=""/>
          <p>{{$t("msg.save")}}</p>
        </div>
        <div class="detail-box">
          <ul>
            <li>
              <em>{{$t("msg.Boardingpoint")}}</em>
              <span class="blue">{{init().replace("-1","")}}</span>
            </li>
            <li>
              <em>{{$t("msg.Dropoffpoint")}}</em>
              <span class="blue" v-if="bustype === 1">{{$t("msg.P2")}}</span>
              <span class="blue" v-if="bustype === 0">航展馆</span>
            </li>
          </ul>
          <ul>
            <li>
              <em>{{$t("msg.Noofpassengers")}}</em>
              <span>{{initb()}}<span v-show="initlag()" style="display: inline">人乘车</span></span>
            </li>
            <li>
              <em>{{$t("msg.Charges")}}</em>
              <span class="orange">{{$t("msg.Free")}}</span>
            </li>
            <li>
              <em>{{$t("msg.busdata")}}</em>
              <span>{{initc()}}</span>
            </li>
            <li v-show="bustype === 1">
              <em>{{$t("msg.Boardingtime")}}</em>
              <span>06:30 - 12:00</span>
            </li>
            <li v-show="bustype === 0">
              <em>乘车时段</em>
              <span v-show="checkflag===3"><a href="javascript:;" @click="hotel" style="color: #1c9ae3;">查看详情></a></span>
              <span v-show="checkflag===4">06:30 - 12:00</span>
            </li>
            <li>
              <em>{{$t("msg.Contactnumber")}}</em>
              <span>{{initf()}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-wrap">
        <p class="txt" v-show="initlag()===true">
          注：本届航展实行实名制入场，请持票观众携带展票及有效身份证件观展。
        </p>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import http from "api/https"
  import {mapGetters, mapMutations} from 'vuex'
  import {baseurl, picurl} from "common/js/config";
  import store from 'store'

  export default {
    name: 'appointment',
    data() {
      return {
        arr: [],
        params: '',
        date: '',
        bustype: 1,
        result: {},
        result2: {},
        modelflag: false,
        successflag: false,
        sucessbtn: true,
        checkflag: 3,
        title: "是否确定取消本次预约？",
        btnflag: true
      }
    },
    created() {
      // this.init();
      console.log(this.setuser);
      console.log(this.getid);
      console.log(this.setbackindex);
     // this.initlang()

    },

    mounted() {
      // console.log(this.setuser);
      //console.log(this.set)
      const _this = this;
      _this.initlag()
      setTimeout(() => {
        store.set('user', _this.setuser)
      }, 20)
      //debugger
    },
    computed: {
      ...mapGetters(['setuser', "getid", 'flag', 'set', 'setbackindex']),
    },
    methods: {
      ...mapMutations({
        setquery: 'SET_QUERY',
        setposition: 'SETPOSITION'
      }),
      initlag(){
        if(this.$i18n.locale==="EN"){
          this.title="Confirm cancellation of appointment";
          return false
        }else {
          return true
        }
      },
      ok() {
        this.modelflag = false
      },
      imgbg() {
        //从二维码入口进来
        if (this.set) {
          let pictureurl = this.setuser.pictureUrl;
          if (pictureurl !== undefined && pictureurl !== null && pictureurl !== '') {
            this.bustype = 1;
          } else {
            this.bustype = 0;
          }
          return picurl + this.setuser.pictureUrl;
        } else {
          let pictureurl = this.setuser.airRideQrCode.pictureUrl;
          if (pictureurl !== undefined && pictureurl !== null && pictureurl !== '') {
            this.bustype = 1;
          } else {
            this.bustype = 0;
          }
          //控制成功按钮
          if (this.sucessbtn && this.setbackindex === 0) {
            //debugger
            this.successflag = true
          } else {
            this.successflag = false

          }
          return picurl + this.setuser.airRideQrCode.pictureUrl
        }

      },
      init() {
        let item;
        if (this.set) {
          console.log(this.setuser);
          item = this.setuser.rideType
          if (item >= 3) {
            this.checkflag = item
          }

          //debugger
          return (this.setuser.airRidePoint.route + this.setuser.airRidePoint.name).replace('-1', "")
        } else {
          //debugger
          item = this.setuser.airRideQrCode.rideType
          if (item >= 3) {
            this.checkflag = item
          }
          console.log(this.setuser);
          //this.checekFlag = 4;

          return this.setuser.airRideQrCode.airRidePoint.route + this.setuser.airRideQrCode.airRidePoint.name;

        }

      },
      initb() {
        if (this.set) {
          return this.setuser.rideNo
        } else {
          return this.setuser.airRideQrCode.rideNo;
        }

      },
      initc() {
        if (this.set) {
          return this.setuser.rideDate.substring(5, 10).replace("-", "月").padEnd(6, "日");
        } else {
          return this.setuser.airRideQrCode.rideDate.substring(5, 10).replace("-", "月").padEnd(6, "日");

        }

      },
      initf() {
        if (this.set) {
          return this.setuser.phone
        } else {
          return this.setuser.airRideQrCode.phone
        }


      },
      cancle() {
        //this.cacletick()
        this.modelflag = true

      },
      cancleBtn() {
        this.modelflag = false;
        this.cacletick()
      },
      confirm() {
        this.modelflag = false
      },
      finish() {
        this.sucessbtn = false
      },
      back() {
        //this.cacletick();
        this.$router.push({
          path: "/"
        })
      },
      hotel() {
        this.$router.push({
          name: 'hotel'
        })
      },
      cacletick: async function () {
        const url = `${baseurl}/booking/cancelBooking.do`;
        let par = {
          qrcodeId: this.setuser.id ? this.setuser.id : this.setuser.airRideQrCode.id
        };

        const res = await http.post(url, par);
        if (res.data.code === '200') {
          console.log(res)
          // debugger
          this.$router.push({
            path: '/'
          })

        } else if (res.data.code === "804") {
          this.modelflag = true
          this.btnflag = false
          if(this.$i18n.locale==='EN'){
            this.title = "Tickets are already in use and cannot be cancelled"

          }else {
            this.title = "二维码已使用，无法取消"

          }

        }
        console.log(res);

      },
      point() {
        // this.setquery(null);
        this.setposition({name: 1})
        setTimeout(() => {
          this.$nextTick().then(() => {
            this.$router.push({
              path: "navigation"
            })
          })
        }, 20)


      }
    }
  }
</script>
<style scoped lang="less">
  .appointment {
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
          img {
            display: block;
            width: 4.3rem;
            margin: 0 auto;
          }
          p {
            text-align: center;
            font-size: .26rem;
            color: #ef5151;
            line-height: 1.1;
            margin: -.2rem 0 .4rem;
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
        .btn {
          width: 100%;
          height: 1rem;
          outline: none;
          border: 1px solid #c8ced3;
          background: #fff;
          border-radius: .5rem;
          span {
            display: inline-block;
            padding-left: .66rem;
            font-size: .36rem;
            color: #666666;
            line-height: .98rem;
            background: url("../../assets/images/dh_icon.png") no-repeat left center;
            background-size: .5rem .5rem;
          }
        }
      }
    }
    .cacelmodel {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
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
          padding: 0 .6rem .2rem;
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
