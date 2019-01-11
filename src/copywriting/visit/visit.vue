<template>
  <div class="visit">
    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">交通攻略</div>
      </div>
    </div>
    <div class="wrap">
      <h2>交通攻略</h2>
      <div class="section">
        <h3>交通攻略</h3>
        <p >
          本届航展实施交通管制，珠海大桥实行单双号限行，公众日期间自驾车禁止进入航展核心区及周边管制道路，请观众尽量避免自驾出行，选择搭乘便捷、快速的公共交通工具前往观展。以下出行攻略，必有一款适合您：
        </p>
        <ul class="main2-ul">
          <li>
            <span class="main2">· 市内航展专线</span>
            <p>
              航展公众日期间，珠海市开通了9条市内专线线路，巴士座位舒适、直达展区、方便快捷，9条线路包含：1香洲公交总站、2体育中心东门、3九洲城、4九洲港、5城轨珠海站、6前山枢纽站、7华发商都、8斗门汽车客运站、9珠海国际赛车场停车场。航展专线具体信息请
              <a href="javacript:;" class="link" @click="city">点此查看</a>。
              市内专线对观展观众免费开放，请凭购票信息预约乘车，并在乘车时出示预约二维码。<br/>
              市内免费专线预约请
              <a href="javacript:;" class="link" @click="loading">点此预约</a>，预约流程的操作说明请
              <a href="javacript:;" class="link" @click="howto">点此查看</a> 。
            </p>
          </li>
          <li>
            <span class="main2">· 跨市航展专线</span>
            <p>
              广州、中山、江门、佛山、惠州、阳江等6个地市开通了航展专线，以上6个地市的观众请在对应的专线乘车点现场购票乘车，跨市专线详情请
              <a href="javacript:;" class="link" @click="crosscity">点此查看</a>。
            </p>
          </li>
          <li>
            <span class="main2">· 酒店专线</span>
            <p>
              大老远来到珠海，当然不可能只看航展，住酒店是必然的，建议您考虑到开设航展专线车的酒店入住并预约免费乘车。查看酒店专线详情请
              <a href="javacript:;" class="link" @click="hotel">点击</a>。
            </p>
          </li>
          <li>
            <span class="main2">· 出租车</span>
            <p>
              航展期间，全市巡游出租车将参与航展交通保障并可走航展专用道，一路飞驰的感觉肯定不一般，从市区到展区大约需人民币150元，需要的朋友可搭乘出租车前往航展核心区或展馆。
            </p>
          </li>
          <li>
            <span class="main2">· 自驾换乘</span>
            <p>
              必须当天来回，所在城市又没有开通跨市专线，常规客运、轨道交通都不便利的，只能选择自驾车了，假如您从粤港澳高速进入珠海，建议您选择在珠海国际赛车场停车场换乘观展（
              <a href="javacript:;" class="link" @click="loading">点此预约</a>
              ）；假如您从广珠西线、江珠、西部沿海高速进入珠海，建议您选择P6、P7、P8、P9停车场换乘，详细信息请
              <a href="javacript:;" class="link" @click="parkingdec">点此查看</a>。
            </p>
          </li>
        </ul>
      </div>
      <div class="section">
        <h3>珠海交通微信号或珠海交通APP·航展交通服务攻略</h3>
        <ul class="main2-ul">
          <li>
            <span class="main2">· 专线乘车导航</span>
            <p>
              对于搭乘航展市内专线前往展馆的观众，我们将根据您的定位及专线乘车点提供定制化的贴心导航，指引您前往航展馆并在观展结束后返程。请确保您已启用地图定位服务授权，并在预约（
              <a href="javacript:;" class="link" @click="loading">点此预约</a>
              ）完成后进入专线导航：
              <a href="javacript:;" class="link" @click="navigation">点我</a> 。
            </p>
          </li>
          <li>
            <span class="main2">· 展馆内导航</span>
            <p>
              航展室内展位面积约十万平方米，室外展览面积约四十万平方米，考虑到您的观展便利，我们联同高德地图提供航展区域内的导航服务，馆内导航请点击：
              <a href="javacript:;" class="link" @click="map">点我</a> 。
            </p>
          </li>
          <li>
            <span class="main2">· 私家车导航</span>
            <p>
              航展期间，交通部门将与高德地图、百度地图对接，导航软件将根据航展期间的交通管控措施优化前往展区的导航线路，为方便使用请您提前下载。此外，我们将根据您的定位提供停车换乘及返程寻车服务，请确保您已启用地图定位服务授权，点击进入：
              <a href="javacript:;" class="link" @click="parking">点我</a> 。
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations}from"vuex"
  export default {
    name: 'visit',
    data(){
      return {
        a: {id: 1}
      }
    },
    methods: {
      ...mapMutations({
        user: 'SET_USER',
        setquery:"SET_QUERY",
        set:'set'
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
      navigation(){
        this.$router.push({
          name:"navigation"
        })
        this.user(this.a)
        this.setquery(1)
        this.set(true)

      },
      introduction(){
        this.$router.push({
          name:"introduction"
        })
      },
      driveload(){
        this.$router.push({
          name:"driveload"
        })
      },
      parkingdec(){
        this.$router.push({
          name:"parkingdec"
        })
      },
      crosscity(){
        this.$router.push({
          name:'crosscity'
        })
      },
      hotel(){
        this.$router.push({
          name:'hotel'
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
  .visit {
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
          line-height: 1.2;
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
        .main2{
          color: #333;
          font-size: .32rem;
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
