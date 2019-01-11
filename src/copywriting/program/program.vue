<template>
  <div class="program" @click.stop>
    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">交通指引</div>
      </div>
    </div>
    <div class="wrap">
      <h2>交通指引</h2>
      <div class="section">
        <p>
          航展期间，设置航展公交专用道和管制区禁止自驾车通行，珠海大桥实行车牌单双号限行，为了您的观展便利，请您尽量避免自驾出行，选择搭乘便捷、快速的公共交通工具前往。根据不同的地市安排及交通工具，本届航展交通指引信息如下：
        </p>
      </div>
      <div class="section">
        <h3>乘坐珠海市内公共交通前往航展馆</h3>
        <p>
          1. 市内出租车可直达展馆。<br/>
          2. 开设航展专线大巴往返展馆和市区主要港口码头、口岸、城轨站、客运汽车站和商业区。观众可自由选择合适的公共交通工具前往航展馆，市内航展专线的地点、服务时间请
          <a href="javacript:;" class="link" @click="next">点此查看</a>
          ，搭乘市内专线请您
          <a href="javacript:;" class="link" @click.stop.prevent="loading($event)">点此预约</a>
          ，预约流程的操作说明请
          <a href="javacript:;" class="link" @click="howto">点此查看</a> 。
        </p>
      </div>
      <div class="section">
        <h3>乘坐跨市专线前往航展馆</h3>
        <p>
          航展公众日期间在多个地市开通跨市航展专线直达展馆，包含：广州、中山、江门、佛山、惠州、阳江等。跨市航展专线具体信息请
          <a href="javacript:;" class="link" @click="crosscity">点此查看</a>。
        </p>
      </div>
      <div class="section">
        <h3>从周边机场前往航展馆</h3>
        <p>
          <span class="main">珠海机场：</span>选择步行或坐车到达航展馆。<br/>
          <span class="main">广州新白云机场：</span>在候机楼乘坐机场快巴到珠海拱北站，凭航展票预约免费乘坐航展5号专线：城轨珠海站-P2（航展馆）前往观展。<br/>
          <span class="main">深圳机场：</span>可在候机楼坐车或去深圳蛇口港坐快船到珠海九洲港码头，并凭航展票预约免费乘坐航展4号专线：九洲港—P2（航展馆）前往观展。<br/>
          <span class="main">香港机场：</span>坐船到珠海九洲港码头，凭航展票预约免费乘坐航展4号专线：九洲港—P2（航展馆）前往观展。<br/>
          <span class="main">澳门机场：</span>经过拱北口岸，在城轨珠海站凭航展票预约免费乘坐航展5号专线：城轨珠海站-P2（航展馆）前往观展。<br/>
          （市内航展专线详情请 <a href="javacript:;" class="link" @click="next">点此查看</a>
          ，搭乘市内专线请您 <a href="javacript:;" class="link" @click.stop.prevent="loading($event)">点此预约</a>
          ，预约流程的操作说明请 <a href="javacript:;" class="link" @click="howto">点此查看</a> ）。
        </p>
      </div>
      <div class="section">
        <h3>乘坐火车或高铁到达广州后前往航展馆</h3>
        <p>
          外省市观众搭乘火车或高铁到达广州，可在广州南站转乘广珠城轨前往珠海城轨拱北站，并免费乘坐航展5号专线：城轨珠海站—P2（航展馆）前往观展（市内专线预约乘车请
          <a href="javacript:;" class="link" @click.stop.prevent="loading($event)">点此预约</a>
          ，预约流程的操作说明请 <a href="javacript:;" class="link" @click="howto">点此查看</a>）。<br/>
          或者，在广州各区汽车客运站乘坐跨市航展专线到达前往观展（跨市专线详情请
          <a href="javacript:;" class="link" @click="crosscity">点此查看</a>）。
        </p>
      </div>
      <div class="section">
        <h3>从深圳市前往航展馆</h3>
        <p>
          航展期间深圳蛇口快船航班将加密，深圳的观众可搭乘客船到达珠海九洲港码头，并免费乘坐航展4号专线：九洲港—P2（航展馆）前往观展（市内专线预约乘车请
          <a href="javacript:;" class="link"@click.stop.prevent="loading($event)">点此预约</a>
          ，预约流程的操作说明请 <a href="javacript:;" class="link" @click="howto">点此查看</a>）。
        </p>
      </div>
      <div class="section" @click.stop.prevent>
        <h3>香港观众观展</h3>
        <p>
          香港观众请选择港珠澳大桥专线（专线预约乘车请
          <a href="javacript:;" class="link" @click.stop.prevent="loading($event,4)">点此预约</a>
          ）。或者，也可选择搭乘客船到达珠海九洲港码头，并免费乘坐航展4号专线：九洲港—P2（航展馆）前往观展（市内专线预约乘车请
          <a href="javacript:;" class="link" @click.stop.prevent="loading($event)">点此预约</a>
          ，预约流程的操作说明请 <a href="javacript:;" class="link" @click="howto">点此查看</a>）。
        </p>
      </div>
      <div class="section">
        <h3>澳门观众观展</h3>
        <p>
          澳门观众从拱北口岸过关后，可在城轨珠海站搭乘航展5号专线：城轨珠海站—P2（航展馆）前往观展（市内专线预约乘车请
          <a href="javacript:;" class="link"@click.stop.prevent="loading($event)">点此预约</a>
          ，预约流程的操作说明请 <a href="javacript:;" class="link" @click="howto">点此查看</a>）。
        </p>
      </div>
      <div class="section">
        <h3>自驾前往观展</h3>
        <p>
          本届航展核心区道路实行交通管制严禁自驾游小汽车进入，自驾观众请在外围停车场停车并换乘接驳巴士前往观展，外围停车场为临时搭建，户外设施简陋且需现场付费，请您尽量避免自驾出行。自驾观展指南请
          <a href="javacript:;" class="link" @click="driveload">点此查看</a>）。
        </p>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  //交通指南
  export default {
    name: 'program',
    methods: {
      ...mapMutations({
        setbackindex: "SET_BACK_INDEX"
      }),

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
      loading(e,params) {
       // e.stopPropagation()
        if (params) {
          this.$router.push({
            name: "bus",
            params: { bustype: 4 }
          });
          this.setbackindex(0)
          // debugger
        } else {
         // debugger
          this.$router.push({
            name: "bus"
          });
        }
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
      crosscity(){
        this.$router.push({
          name:'crosscity'
        })
      },
      howto(){
        this.$router.push({
          name:"howto"
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .program {
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
