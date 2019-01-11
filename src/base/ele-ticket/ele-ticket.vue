<template>
  <div class="ele-ticket" v-show="showFlag">
    <div class="mode"></div>
    <div class="cont">
      <div class="img-wrap">
        <img src="../../assets/images/right.png" alt="">
      </div>
      <div class="cont-wrap">
        <h3>{{$t("msg.Successful")}}</h3>
        <p>
          {{$t("msg.Addedtickets")}}：<span><em v-html="mydata.length"></em> <span v-show="initlag">张</span></span>
        </p>
        <p>
          {{$t("msg.Validdate")}}：<span v-for="item in mydata">{{item.time}}. </span>
        </p>
        <div class="btn-wrap">
          <button class="btn" @click="next">{{$t("msg.OK")}}</button>
          <button class="btn blue" @click="add">{{$t("msg.Continueadding")}}</button>
        </div>
      </div>
      <!--<div class="cont-wrap" v-show="dataFlag" style="text-align: center;width: 5rem;color: red;border-radius: .2rem;height: 3rem">-->
      <!--<div style="line-height: 1rem;color: #1c9ae3;font-size: .3rem;font-weight: bold">电子票生成结果</div>-->
      <!--<p style="font-size: .3rem">没有查出相关信息哦！</p>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'ele-ticket',
    props: {
      mydata: {
        type: Array,
        require: true,
        default: (() => {
          return []
        })
      }
    },
    created() {
      //this.initlag()
    },
    data() {
      return {
        dataFlag: false,
        showFlag: false
      }
    },
    computed: {
      initlag() {
        if (this.$i18n.locale === "EN") {
          return false
        } else {
          return true
        }
      }

    },
    methods: {
      add() {
        this.$emit("add")
      },
      show() {
        this.$emit("show");
        this.showFlag = true
      },
      hide() {
        this.$emit("hide");
        this.showFlag = false
      },
      next() {
        this.$emit("next")
      }
    }
  }
</script>
<style scoped lang="less">
  .ele-ticket {
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
    .cont {
      position: relative;
      z-index: 99;
      flex: 1;
      background: #fff;
      box-shadow: 0 .23rem .8rem rgba(25, 27, 28, .2);
      border-radius: .08rem;
      margin: 0 .6rem;
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
        border-radius: 50%;
        box-shadow: 0 .1rem .3rem rgba(18, 213, 160, .4);
        text-align: center;
        line-height: 1.32rem;
        overflow: hidden;
        img {
          float: left;
          width: 100%;
          height: 100%;
        }
      }
      .cont-wrap {
        h3 {
          font-size: .36rem;
          text-align: center;
          line-height: .36rem;
          color: #333;
          font-weight: bold;
          margin-bottom: .4rem;
        }
        p {
          padding: 0 .6rem;
          line-height: .6rem;
          color: #828282;
          font-size: .32rem;
          span {
            color: #1c9ae3;
            /*font-weight: bold;*/
          }
        }
        .btn-wrap {
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
