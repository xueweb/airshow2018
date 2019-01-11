<template>
  <div class="trafficpolice reservations">

    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">珠海交警公众号</div>
      </div>
    </div>
    <div class="wrap">

      <div class="section">
        <h3 style="margin-top: .5rem">请关注“珠海交警”公众号</h3>
        <div class="img-wrap" style="text-align: center;width: 100%;margin: .5rem 0">
          <img src="../../assets/images/WechatIMG249.png" alt="" width="300">
        </div>
      </div>
    </div>

  </div>


</template>

<script>
  export default {
    name: "trafficpolice",
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="less">
  .reservations {
    .fix-wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      .title-wrap {
        height: 1.18rem;
        width: 100%;
        font-size: .36rem;
        background-image: -webkit-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -moz-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -o-linear-gradient(135deg, #42ade4, #1791de);
        background-image: linear-gradient(-135deg, #42ade4, #1791de);
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
    .wrap {
      padding: 1.78rem .4rem 0;
      h2 {
        font-size: .48rem;
        color: #1c9ae3;
        line-height: 1.1;
        margin-bottom: .6rem;
      }
      .section {
        overflow: hidden;
        margin-bottom: .5rem;
        h3 {
          font-size: .36rem;
          color: #333;
          line-height: 1.1;
          margin-bottom: .3rem;
          font-weight: bold;
        }
        & > p {
          line-height: .54rem;
          color: #666666;
          font-size: .3rem;
          margin-bottom: .3rem;
        }
        & > img {
          width: 100%;
          border-radius: .08rem;
          margin-bottom: .3rem;
        }
        & > em {
          display: block;
          text-align: center;
          font-size: .26rem;
          line-height: 1.1;
          color: #bcbcbc;
          margin-bottom: .3rem;
        }
        ul {
          margin-bottom: .3rem;
          li {
            line-height: .54rem;
            color: #666;
            font-size: .3rem;
          }
          &.main-ul {
            li {
              span {
                float: left;
              }
            }
          }
          &.main2-ul {
            li {
              margin-bottom: .4rem;
            }
          }
          &.ticket-ul {
            li {
              margin-bottom: .2rem;
            }
          }
          &.code-ul {
            overflow: hidden;
            li {
              float: left;
              width: 52%;
              margin-bottom: .2rem;
              img {
                width: 2.4rem;
              }
              &:first-child {
                width: 48%;
              }
            }
          }
        }
        table {
          width: 100%;
          border-left: 1px solid #d2d2d2;
          border-top: 1px solid #d2d2d2;
          margin-bottom: .2rem;
        }
        table th {
          line-height: .4rem;
          font-size: .3rem;
          color: #333;
          font-weight: bold;
          background: #ebf0f1;
          padding: .2rem .08rem;
          border-right: 1px solid #d2d2d2;
          border-bottom: 1px solid #d2d2d2;
        }
        table td {
          line-height: .4rem;
          font-size: .3rem;
          color: #666666;
          background: #fff;
          padding: .2rem .08rem;
          border-right: 1px solid #d2d2d2;
          border-bottom: 1px solid #d2d2d2;
        }
        .main {
          color: #1c9ae3;
          font-weight: bold;
        }
        .link {
          color: #1c9ae3;
          text-decoration: underline;
        }
      }
    }
  }

</style>
