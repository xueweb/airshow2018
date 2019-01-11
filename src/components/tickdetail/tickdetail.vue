<template>
  <transition :name="transitionName">
    <div class="cont" v-show="flag">
      <div class="tickdetail">
        <div class="title">
          <div class="icon" @click="back">
          </div>
          <div class="txt" :style="style">{{ $t("msg.airticket") }}</div>
          <div class="add" @click="addTick" >+{{ $t("msg.Addtickets") }}</div>
        </div>
      </div>
      <div class="wrap" ref="wrap" v-show="wrapflag">
        <div class="ticket-box">
          <p>{{ $t("msg.Notickets") }}</p>
          <button class="btn " @click="addTick">+{{ $t("msg.Taptoaddtickets") }}</button>
        </div>
      </div>
      <div class="confirmbox-wrap">
        <!--//确认电子票弹窗-->
        <confirmBox ref="confirmBox" @add="showAdd"></confirmBox>
      </div>
      <div class="ele-wrap">
        <ticket ref="ticket" @next="select" @add="add" :mydata="mydata"></ticket>
      </div>
      <div class="myTicket-wrap" v-show="tickFlag">
        <!--生成电子票-->
        <myTicket :result="result"></myTicket>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import ticket from 'base/ele-ticket/ele-ticket'
  import myTicket from 'base/my-ticket/my-ticket'
  import confirmBox from 'base/confirm-box/confirm-box'
  import {baseurl} from "common/js/config";
  import http from 'api/https'
  import {mapGetters} from 'vuex'

  export default {
    name: 'tickdetail',
    components: {
      ticket,
      myTicket,
      confirmBox
    },
    data() {
      return {
        listresult: [],
        mydata: [],
        showFlag: false,
        tickFlag: false,
        flag: true,
        wrapflag: true,
        transitionName: "slide",
        result: []
      }
    },
    computed: {
      ...mapGetters(['getticket']),
      style() {
        // if()
        if (this.$i18n.locale === "EN") {
          return "font-size:.32rem"
        }
      }
    },
    created() {
      this.init()
    },

    methods: {
      //初始化
      init() {
        if (this.getticket) {
          this.getlist();
          this.tickFlag = true;
          this.wrapflag = false;
        }
      },
      getlist: async function () {
        const url = `${baseurl}/booking/getMyAllTickets.do`;
        let params = {};
        const res = await http.get(url, params);
        console.log(res)
        if (res.data.code === "200") {
          this.result = res.data.data;
          window.localStorage.setItem("length", res.data.data.length);
        }

      },
      showAdd(type, number) {
        //请求接口
        this.confirm(type, number)
      },
      add() {
        this.$refs.ticket.hide();
        this.$refs.confirmBox.show();
      },
      //序列化数据
      normalLize(list) {
        let map = [];
        list.forEach((item, index) => {
          map.push({
            time: item.ticketDate.substring(5),
            len: index + 1
          })
        });
        return map
      },
      confirm: async function (type, number) {
        const url = `${baseurl}/booking/createETicket.do`;
        let params = {
          type,
          number
        };
        console.log(params);
        const res = await http.post(url, params);
        if (res.data.code === "200") {
          this.mydata = this.normalLize(res.data.data)
          this.$refs.confirmBox.hide();
          this.$refs.ticket.show();
          this.wrapflag = false;
        }
        if (res.data.code === "500") {
          const _this = this;
          this.$refs.confirmBox.tip = '没有查到相关信息！';
          setTimeout(() => {
            _this.$refs.confirmBox.tip = ''
          }, 3000)
        }
      },
      select() {
        this.showFlag = true;
        this.tickFlag = true;
        this.$refs.ticket.hide();
        this.wrapflag = false;
        //获取列表
        this.getlist()
      },
      back() {
        this.flag = false;
        this.$router.back();
      },
      addTick() {
        this.$refs.confirmBox.show();
      },
      close() {
        this.showFlag = false
      },
      showTicket() {
        this.close();
        this.$refs.ticket.show()
      }
    }
  }
</script>
<style scoped lang="less">
  /*.slide-enter-active, .slide-leave-active {*/
  /*transition: all 0.3s*/
  /*}*/

  /*.slide-enter, .slide-leave-active {*/
  /*transform: translate3d(100%, 0, 0)*/
  /*}*/

  .cont {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f9f9f9;
    overflow: hidden;
    overflow-y: auto;
    .wrap {
      margin: 1.68rem .3rem .3rem;
      .ticket-box {
        background: #fff;
        box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .4);
        height: 3rem;
        width: 100%;
        text-align: center;
        font-size: .3rem;
        p {
          padding-top: .8rem;
          color: #666;
          font-size: .3rem;
          margin-bottom: .22rem;
        }
        .btn {
          height: .8rem;
          padding: 0 .4rem;
          background-image: -webkit-linear-gradient(135deg, #2eaaf2, #1c9ae3);
          background-image: -moz-linear-gradient(135deg, #2eaaf2, #1c9ae3);
          background-image: -o-linear-gradient(135deg, #2eaaf2, #1c9ae3);
          background-image: linear-gradient(-135deg, #2eaaf2, #1c9ae3);
          box-shadow: 0 .1rem .3rem rgba(23, 145, 222, .4);
          outline: none;
          border: none;
          border-radius: .6rem;
          color: #fff;
          font-size: .3rem;
        }
      }
    }
    .tickdetail {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 99;
      .title {
        height: 1.18rem;
        background-image: -webkit-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -moz-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -o-linear-gradient(135deg, #42ade4, #1791de);
        background-image: linear-gradient(-135deg, #42ade4, #1791de);
        width: 100%;
        font-size: .36rem;
        position: relative;
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
          line-height: 1.2rem;
          color: #fff;
          font-size: .4rem;
        }
        .add {
          position: absolute;
          right: .3rem;
          top: 0rem;
          line-height: 1.2rem;
          font-size: .32rem;
          color: #c6e4f7;
        }
      }
      .box-wrap {
        display: flex;
        margin: .5rem;
        background: #fefefe;
        border-radius: .2rem;
        box-shadow: 0 0 5px 5px #f5f6f8;
        .box {
          transition: scale 2s;
          flex: 1;
          height: 3rem;
          text-align: center;
          font-size: .35rem;
          .txt {
            margin-top: .6rem;
            color: #bebebe;
          }
          .addbox {
            width: 3.5rem;
            height: .8rem;
            background: #1c9ae4;
            margin: .3rem auto;
            line-height: .8rem;
            color: #fff;
            border-radius: .4rem;
            font-size: .3rem;
            span {
              font-size: .4rem;
              display: inline-block;
              width: .3rem;
              height: .1rem;
              margin-right: .1rem;
            }
          }
        }
      }
    }
    .mode {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      .conttxt {
        animation: scale .2s;
        position: relative;
        z-index: 99;
        flex: 1;
        /*height: 5rem;*/
        background: #fff;
        box-shadow: 0 .23rem .8rem rgba(25, 27, 28, .2);
        border-radius: .2rem;
        margin: 0 .6rem;
        .closeincon {
          position: absolute;
          right: -.4rem;
          top: -.6rem;
          font-size: .7rem;
          color: #fff;
        }
        .title {
          font-size: .35rem;
          text-align: center;
          line-height: 1rem;
          color: #666666;
          margin-top: .5rem;
          font-weight: bold;
        }
        .txt {
          font-size: .265rem;
          margin: 0 .5rem;
          color: #c5c5c5;
          line-height: .4rem;
        }
        .selcet-wrap {
          margin-left: .3rem;
          span {
            font-size: .35rem;
            margin-right: .2rem;
          }
          .input {
            width: 3rem;
            height: .6rem;
            padding-left: .3rem;
            outline: none;
            border-radius: .2rem;
            border: none;
            border: 1px solid #ccc;
          }
        }
        .btn {
          width: 80%;
          text-align: center;
          height: .8rem;
          margin: 0 .5rem;
          background: #1c9ae4;
          outline: none;
          border: none;
          border-radius: .2rem;
          color: #fff;
          font-size: .35rem;
        }
      }
      .mode-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #414c53;
        opacity: .5;
      }

    }
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
