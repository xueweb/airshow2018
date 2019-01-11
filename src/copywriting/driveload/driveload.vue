<template>
  <div class="driveload">
    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">自驾指引</div>
      </div>
    </div>
    <viewer>
    <div class="wrap">
      <h2>自驾指引</h2>
      <div class="section">
        <h3>交通管制</h3>
        <p>
          航展公众日期间（11.9-11.11），金海岸大道以南区域、机场东路的金湾立交以南路段将实施交通管制，禁止自驾小汽车驶入，珠海大桥实行车牌单双号限行，自驾观众只能在外围换乘航展接驳专线前往。届时，交警部门将启动电子警察查处违规占道行驶车辆，请您尽量选择搭乘公共交通工具前往观展。<br/>
          市内免费专线指引请
          <a href="javascript:;" class="link" @click="next">点此查看</a>
          ，跨市专线指引请
          <a href="javascript:;" class="link" @click="crosscity">点此查看</a>。
        </p>
        <img src="../../assets/images/control_img.jpg" alt="" />
        <em>图1 小汽车禁行区域</em>
      </div>
      <div class="section">
        <h3>停车场说明</h3>
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
      <div class="section">
        <h3>自驾线路</h3>
        <p>
          航展期间，交通部门将与高德地图、百度地图对接，导航软件将根据航展期间的交通管控措施优化前往展区的导航线路，为方便使用建议您提前下载。
        </p>
      </div>
      <div class="section">
        <h3>寻车指引</h3>
        <p>
          由于本届航展的外围停车场较为分散，为便于观众在返程时可快速定位自己的车辆设置了寻车导航功能。请在您停稳车辆后，确保您已启用地图定位服务授权，并
          <a href="http://wx.zhcgs.gov.cn/Query/FindCar/Index" class="link" >点此进入</a>
          停车换乘服务，记录您的停车位置及停车场信息，在返程时选择“返回停车点”，系统将自动为您生成导航线路及寻车指引。
        </p>
      </div>
    </div>
    </viewer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'driveload',
    methods: {
      back() {
//        this.$router.push({
//          name: "index"
//        })
        this.$router.back()
      },
      next() {
        this.$router.push({
          name: "reservations"
        })
      },
      loading(){
        this.$router.push({
          name:"bus"
        })
      },
      city(){
        this.$router.push({
          name:"reservations"
        })
      },
      map(){
        this.$router.push({
          name:"usermap"
        })
      },
      parking(){
        this.$router.push({
          name:"parking"
        })
      },
      driveload(){
        this.$router.push({
          name:'driveload'
        })
      },
      program(){
        this.$router.push({
          name:'program'
        })
      },
      parkingdec(){
        this.$router.push({
          name:'parkingdec'
        })
      },
      crosscity(){
        this.$router.push({
          name:'crosscity'
        })
      },
    }
  }
</script>
<style scoped lang="less">
  .driveload {
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
        &>em{
            display: block;
            text-align: center;
            font-size: .26rem;
            line-height: 1.1;
            color: #bcbcbc;
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
              margin-bottom: .3rem;
            }
          }
          &.ticket-ul{
            li{
              margin-bottom: .2rem;
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
