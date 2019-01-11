<template>
  <transition :name="transitionName">
    <div class="feedback">

      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">问题反馈</div>
      </div>

      <div class="cont">
        <div class="iptbox">
          <span>问题类型</span>
          <ul>
            <li v-for="(item,index) in list " :key="index" :class="{active:currentIndex===index}"
                @click="selcet(item,index)">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="iptbox">
          <span>补充说明</span>
          <textarea placeholder="请描述您目前所遇到的问题" rows="5" v-model="msg"></textarea>
        </div>
      </div>

      <div class="btn-wrap">
        <p class="error-tip" v-html="txt"></p>
        <button type="button" class="btn" @click="sendMsg">发送反馈</button>
      </div>

      <!--发送成功弹窗-->
      <div class="cacelmodel" v-show="successflag">
        <div class="wrap">
          <div class="img-wrap">
            <img src="../../assets/images/right.png" alt="">
          </div>
          <h4 class="title">反馈发送成功！</h4>
          <div class="btn-cont">
            <button class="btn" @click="goon">继续反馈</button>
            <button class="btn blue" @click="back">好的</button>
          </div>
        </div>
        <div class="mode" @click="back"></div>
      </div>

    </div>

    <router-view></router-view>

  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from "vuex"
  import http from 'api/https'
  import {baseurl} from "common/js/config";

  export default {
    name: 'feedback',
    data() {
      return {
        txt: '',
        msg: '',
        currentIndex: 0,
        currentType: 5,
        transitionName: "slide",
        successflag: false,
        list: [
          {
            name: '车辆供应不足', id: 1, type: 5
          },
          {
            name: '空闲车辆过多', id: 2, type: 6
          },
          {
            name: '意外事故', id: 4, type: 2
          },
          {
            name: '其他问题', id: 4, type: 7
          }
        ]
      }
    },
    computed: {
      ...mapGetters(["setstate"])
    },
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        console.log(fromDepth)
        this.slide = toDepth < fromDepth ? 'slide' : 'slide'
      }
    },
    methods: {
      sendMsg: async function () {
        const _this = this
//        if (!this.msg) {
//          _this.txt = '请描述您目前所遇到的问题';
//          setTimeout(() => {
//            _this.txt = ''
//          }, 2000);
//          return
//        }
        const url = `${baseurl}/worker/message.do`;
        let params = {
          type: this.currentType,
          message: this.msg
        };
        console.log(params);
        const res = await http.post(url, params);
        if (res.data.code === "200") {
//          _this.txt = '问题反馈成功！';
//          setTimeout(() => {
//            _this.txt = ''
//          }, 2000);
          _this.successflag = true;
          console.log(res)
        }
      },
      selcet(item, index) {
        this.currentIndex = index;
        this.currentType = item.type;
      },
      ...mapMutations({
        setFlag: "SET_STATE"
      }),
      goon() {
        this.currentIndex = 0;
        this.msg = '';
        this.successflag = false
      },
      back() {
        this.$router.push({
          name: "backIndex"
        })
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

  .feedback {

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

    .cont {
      padding: 1.58rem 0 0;
      .iptbox{
        padding: 0 .3rem .3rem;
        span{
          display: block;
          color: #a5a5a5;
          font-size: .28rem;
          line-height: 1.1;
          margin-bottom: .25rem;
        }
        ul{
          margin-left: -.3rem;
          height:3.4rem;
          li{
            float: left;
            width: 50%;
            height: 1.7rem;
            span{
              display: block;
              margin-left: .3rem;
              height: 1.4rem;
              border-radius: .08rem;
              background: #fff;
              line-height: 1.4rem;
              font-size: .34rem;
              color: #333;
              text-align: center;
              box-shadow: 0 .1rem .4rem rgba(218,219,219,.5);
            }
            &.active span{
               color: #fff;
               text-shadow: 0 .02rem 0 rgba(0,0,0,.12);
               background-image: linear-gradient(-135deg, #2eaaf2, #1c9ae3);
               box-shadow: 0 .1rem .3rem rgba(23,145,222,.4);
            }
          }
        }
        textarea{
          width: 100%;
          padding: .1rem .2rem;
          border: 1px solid #c8ced3;
          box-sizing: border-box;
          color: #333;
          font-size: 0.33rem;
          line-height: 0.5rem;
          border-radius: .08rem;
          resize: none;
        }
      }
    }

    .btn-wrap{
      text-align: center;
      font-size: 0;
      margin: 0 .3rem .3rem;
      .error-tip{
        text-align: center;
        color: #dc4444;
        font-size: 0.3rem;
        line-height: 0.7rem;
        height: 0.7rem;
      }
      .btn{
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
          background-image: -webkit-linear-gradient(135deg, #1fecb4, #13c897);
          background-image: -moz-linear-gradient(135deg, #1fecb4, #13c897);
          background-image: -o-linear-gradient(135deg, #1fecb4, #13c897);
          background-image: linear-gradient(-135deg, #1fecb4, #13c897);
          box-shadow: 0 .1rem .3rem rgba(18, 213, 160, .4);
          border-radius: 50%;
          text-align: center;
          line-height: 1.32rem;
          overflow: hidden;
          img {
            float: left;
            width: 100%;
            height: 100%;
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
            color: #828282;
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
