<template>
  <transition name="slide" mode="in-out">
    <div class="answer">
      <div class="title-wrap">
        <div class="img-wrap" @click="back">
          <img src="../../assets/images/back02.png" alt="" width="20">
        </div>
        <div class="txt-wrap">
          <div class="txt">航展问问</div>
        </div>
      </div>
      <div class="main">
        <h4>标题标题标题标题</h4>
        <p class="txt">我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字</p>
        <h3>1.流程1</h3>
        <p class="txt">流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1流程1</p>
        <img src="../../assets/images/map_03.png" alt="">
        <h3>2.流程2</h3>
        <p class="txt">流程2流程2流程2流程2流程2流程2流程2流程2流程2流程2流程2流程2流程2流程2流程2流程2流程2</p>
        <img src="../../assets/images/map_03.png" alt="">
        <h3>3.流程3</h3>
        <p class="txt">流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3流程3</p>
        <img src="../../assets/images/map_03.png" alt="" style="margin-bottom: 1rem;width: 100%">
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'answer',
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>
<style scoped lang="less">
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
  .answer {
    .title-wrap {
      position: relative;
      height: 1.2rem;
      background: #1691df;
      .img-wrap {
        line-height: 1.2rem;
        position: absolute;
        left: .3rem;
        top: -.2rem;
        .icon {
          font-size: .4rem;
          color: #ccc;
        }
      }
      .txt-wrap {
        text-align: center;
        .txt {
          line-height: 1.2rem;
          font-size: .35rem;
          color: #fff;
          font-weight: bold;
        }
      }
    }
    .main {
      margin: 0 .5rem;
      img {
        width: 100%
      }
      h4 {
        font-size: .45rem;
        color: #1c99e3;
        line-height: 2rem;
        font-weight: bold;
      }
      .txt {
        font-size: .4rem;
        color: #a1a1a1;
        line-height: .5rem;
      }
      h3 {
        font-size: .45rem;
        color: #1c99e3;
        line-height: 1rem;
        font-weight: bold;
      }
      .txt {
        font-size: .3rem;
        margin-bottom: .2rem;
      }
    }
  }

</style>
