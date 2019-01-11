<template>
  <div class="m-footer">
    <div class="link">
      <router-link to="login">
        <img src="../../assets/images/footericon.png" alt="" >站场工作人员入口 >
      </router-link>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: 'm-footer'
  }
</script>

<style scoped lang="less">
  .m-footer {
    text-align: center;
    margin-bottom: .16rem;
    line-height: 1rem;
    .link {
      a {
        display: inline-block;
        color: #808080;
        text-decoration: none;
        font-size: .3rem;
        line-height: 1rem;
        vertical-align: middle;
        img {
          width: .4rem;
          height: .4rem;
          display: inline-block;
          margin: 0 .1rem -0.06rem 0;
        }
      }
    }
  }
</style>
