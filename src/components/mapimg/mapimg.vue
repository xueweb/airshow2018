<template>
  <div class="mapimg">

    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon"  @click="back">
        </div>
        <div class="txt">展馆平面图</div>
      </div>
    </div>
    <viewer>
    <div class="img-wrap">
      <img src="../../assets/images/WechatIMG277.jpeg" alt="" />
    </div>
    </viewer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'mapimg',
    methods:{
      back(){
//        this.$router.push({
//          path:"usermap"
//        })
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="less">
  .mapimg{
    .fix-wrap{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index:99;
      .title-wrap {
        height: 1.18rem;
        width: 100%;
        font-size: .36rem;
        background-image:-webkit-linear-gradient(135deg, #42ade4, #1791de);
        background-image:-moz-linear-gradient(135deg, #42ade4, #1791de);
        background-image:-o-linear-gradient(135deg, #42ade4, #1791de);
        background-image: linear-gradient(-135deg,#42ade4,#1791de);
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
          line-height: 1.18rem;
          color: #fff;
          font-size: .4rem;
        }
      }
    }
    .img-wrap{
      margin-top: 1.18rem;
      font-size: 0;
      img{
        max-width: 100%;
      }
    }
  }

</style>
