<template>
  <div class="parkingdec">
    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">停车场说明</div>
      </div>
    </div>
    <div class="wrap">
      <h2>停车场说明</h2>
      <div class="section">
        <p>
          航展核心区仅设公共交通停车场，自驾车辆请停放在外围接驳停车场并换乘接驳巴士前往观展。外围接驳停车场P6、P7、P8、P9，距离航展馆分别约为17公里、24.5公里、26公里、38公里，均为临时搭建，设施简陋车位有限，需收取停车费用，请您尽量避免自驾出行。
        </p>
      </div>
      <div class="section">
        <h3>自驾换乘专线表</h3>
        <table>
          <thead>
          <tr>
            <th style="width: 1.2rem">航展接驳专线</th>
            <th>停车场</th>
            <th style="width: 2.3rem">换乘线路</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>11号</td>
            <td>P6（银隆公司）机场北路交金湖路</td>
            <td>P6-P1（航展馆）</td>
          </tr>
          <tr>
            <td>12号</td>
            <td>P7（西部新城B片区）珠海大道进入机场北路约300米处</td>
            <td>P7-P2（航展馆）</td>
          </tr>
          <tr>
            <td>13号</td>
            <td>P8（乾务镇）机场高速乾务出口直行约300米</td>
            <td>P8-P2（航展馆）</td>
          </tr>
          <tr>
            <td>14号</td>
            <td>P9（金台寺）黄杨大道进入温泉旅游大道约400米处</td>
            <td>P9-P2（航展馆）</td>
          </tr>
          </tbody>
        </table>
        <p>
          <span class="main">服务时间：</span><br/>
          去程：8:00-12:00 ， 返程：13:00-19:00 。
        </p>
        <!--<p>-->
          <!--<span class="main">班次：</span><br/>-->
          <!--约2-10分钟（根据实际情况现场调度）。-->
        <!--</p>-->
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'parkingdec',
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="less">
  .parkingdec {
    .fix-wrap{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
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
    .wrap {
      padding: 1.78rem .4rem 0;
      h2{
        font-size: .48rem;
        color: #1c9ae3;
        line-height: 1.1;
        margin-bottom: .6rem;
      }
      .section{
        overflow: hidden;
        margin-bottom: .5rem;
        h3{
          font-size: .36rem;
          color: #333;
          line-height: 1.1;
          margin-bottom: .3rem;
          font-weight: bold;
        }
        &>p{
            line-height: .54rem;
            color: #666666;
            font-size: .3rem;
            margin-bottom: .3rem;
          }
        &>img{
            width: 100%;
            border-radius: .08rem;
            margin-bottom: .3rem;
          }
        ul{
          margin-bottom: .3rem;
          li{
            line-height: .54rem;
            color: #666;
            font-size: .3rem;
          }
          &.main-ul{
            li{
              span{
                float: left;
              }
            }
          }
          &.main2-ul{
            li{
              margin-bottom: .4rem;
            }
          }
          &.code-ul{
             overflow: hidden;
            li{
              float: left;
              width: 52%;
              margin-bottom: .2rem;
              img{
                width: 2.4rem;
              }
              &:first-child{
                 width:48%;
               }
            }
          }
        }
        table{
          width: 100%;
          border-left: 1px solid #d2d2d2;
          border-top: 1px solid #d2d2d2;
          margin-bottom: .2rem;
        }
        table th{
          line-height: .4rem;
          font-size: .3rem;
          color: #333;
          font-weight: bold;
          background: #ebf0f1;
          padding: .2rem .08rem;
          border-right: 1px solid #d2d2d2;
          border-bottom: 1px solid #d2d2d2;
        }
        table td{
          line-height: .4rem;
          font-size: .3rem;
          color: #666666;
          background: #fff;
          padding: .2rem .08rem;
          border-right: 1px solid #d2d2d2;
          border-bottom: 1px solid #d2d2d2;
        }
        .main{
          color: #1c9ae3;
          font-weight: bold;
        }
        .link{
          color: #1c9ae3;
          text-decoration: underline;
        }
      }
    }
  }


</style>
