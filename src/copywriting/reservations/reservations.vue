<template>
  <div class="reservations">
    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">航展专线</div>
      </div>
    </div>
    <viewer>
      <div class="wrap">
        <h2>航展专线</h2>
        <div class="section">
          <h3>市内航展专线</h3>
          <p>
            航展公众日期间，开通9条市内免费航展专线，专线中途不设停站点，详细信息如下：
          </p>
          <table>
            <thead>
            <tr>
              <th style="width: 1.3rem">航展专线</th>
              <th style="width: 1.1rem">区域</th>
              <th>路线</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1号</td>
              <td>香洲区</td>
              <td>香洲公交总站—航展馆P2停车场</td>
            </tr>
            <tr>
              <td>2号</td>
              <td>香洲区</td>
              <td>体育中心东门—航展馆P2停车场</td>
            </tr>
            <tr>
              <td>3号</td>
              <td>香洲区-吉大</td>
              <td>九洲城—航展馆P2停车场</td>
            </tr>
            <tr>
              <td>4号</td>
              <td>香洲区-拱北</td>
              <td>九洲港—航展馆P2停车场</td>
            </tr>
            <tr>
              <td>5号</td>
              <td>香洲区-拱北</td>
              <td>城轨珠海站—航展馆P2停车场</td>
            </tr>
            <tr>
              <td>6号</td>
              <td>香洲区-前山</td>
              <td>前山枢纽站—航展馆P2停车场</td>
            </tr>
            <tr>
              <td>7号</td>
              <td>香洲区-南屏</td>
              <td>华发商都—航展馆P2停车场</td>
            </tr>
            <tr>
              <td>8号</td>
              <td>斗门区</td>
              <td>斗门汽车客运站—航展馆P2停车场</td>
            </tr>
            <tr>
              <td>9号</td>
              <td>香洲区-唐家</td>
              <td>珠海国际赛车场停车场—航展馆P2停车场</td>
            </tr>
            </tbody>
          </table>
          <p style="margin-bottom: .1rem">
            注：以上9条专线均可凭票预约免费乘坐市内航展专线，请购票观众提早预约（市内专线预约乘车请
            <a href="javacript:;" class="link" @click.stop.prevent="loading($event)">点此预约</a>）。
          </p>
          <p>
            <span class="main">服务时间：</span><br/>
            去程：6:30-12:00 ， 返程：13:00-19:00 。
          </p>
          <!--<p>-->
            <!--<span class="main">班次：</span><br/>-->
            <!--约2-10分钟（根据实际情况现场调度）。-->
          <!--</p>-->
          <img src="../../assets/images/WechatIMG275.jpeg" alt="" />
          <em>图1 珠海市内专线乘车点分布图</em>
        </div>
        <div class="section">
          <h3>跨市航展专线</h3>
          <p>
            除珠海市区的专线外，航展公众日期间，周边的广州、佛山、惠州、阳江、中山、江门共6个地市将开通跨市航展专线，直达航展馆，跨市专线详细信息如下：
          </p>
          <table>
            <thead>
            <tr>
              <th style="width: 1.12rem">城市</th>
              <th>乘坐地点</th>
              <th style="width: 2.12rem">发车时间</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td rowspan="7">广州市</td>
              <td>广州汽车客运站</td>
              <td>7:00、7:05</td>
            </tr>
            <tr>
              <td>广州南汽车客运站</td>
              <td>7:45</td>
            </tr>
            <tr>
              <td>广州东站汽车客运站</td>
              <td>7:00、7:01、7:02、7:05</td>
            </tr>
            <tr>
              <td>广州东圃汽车客运站</td>
              <td>7:20</td>
            </tr>
            <tr>
              <td>广州滘口汽车客运站</td>
              <td>7:00</td>
            </tr>
            <tr>
              <td>广州芳村汽车客运站</td>
              <td>7:25</td>
            </tr>
            <tr>
              <td>天河汽车客运站</td>
              <td>6:40</td>
            </tr>
            <tr>
              <td rowspan="3">佛山市</td>
              <td>佛山市汽车站</td>
              <td>6:30、6:40、6:50</td>
            </tr>
            <tr>
              <td>三水汽车站</td>
              <td>7:00、7:10</td>
            </tr>
            <tr>
              <td>顺德汽车站城市候机楼</td>
              <td>6:00、7:00、11:00、12:00、16:00、17:00</td>
            </tr>
            <tr>
              <td>惠州市</td>
              <td>惠州市汽车客运南站</td>
              <td>6:15、6:20</td>
            </tr>
            <tr>
              <td rowspan="3">阳江市</td>
              <td>阳江汽车客运站</td>
              <td>6:20、8:20</td>
            </tr>
            <tr>
              <td>阳春汽车客运站</td>
              <td>6:30</td>
            </tr>
            <tr>
              <td>阳西汽车客运站</td>
              <td>7:00</td>
            </tr>
            <tr>
              <td rowspan="2">中山市</td>
              <td>中山市城东车站</td>
              <td>7:30</td>
            </tr>
            <tr>
              <td>中山市小榄车站</td>
              <td>7:30、8:30</td>
            </tr>
            <tr>
              <td rowspan="2">江门市</td>
              <td>江门汽车客运站</td>
              <td>7:00</td>
            </tr>
            <tr>
              <td>开平长沙车站</td>
              <td>8:00</td>
            </tr>
            <tr>
              <td>深圳</td>
              <td colspan="2">加密蛇口港——九洲港快船航班，
                并在九洲港设航展4号线接驳至航展馆。</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="section">
          <h3>酒店专线</h3>
          <p>
            航展公众日期间，珠海市内星程碧海酒店、度假村酒店、北京酒店和横琴湾酒店等将开通往返酒店与航展馆的酒店专线，欢迎住酒店的观众选择乘坐。酒店专线详情如下：
          </p>
          <table>
            <thead>
              <tr>
                <th style="width: 2rem">酒店名称</th>
                <th style="width: .8rem">班次</th>
                <th>服务时间</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2">星程碧海酒店</td>
                <td rowspan="2">5</td>
                <td>去程：7:00-8:00</td>
              </tr>
              <tr>
                <td>返程：15:00-17:00</td>
              </tr>
              <tr>
                <td rowspan="2">度假村酒店</td>
                <td rowspan="2">5</td>
                <td>去程：7:15-8:15</td>
              </tr>
              <tr>
                <td>返程：15:00-17:00</td>
              </tr>
              <tr>
                <td rowspan="2">北京酒店</td>
                <td rowspan="2">5</td>
                <td>去程：7:00-8:00</td>
              </tr>
              <tr>
                <td>返程：15:00-17:00</td>
              </tr>
              <tr>
                <td rowspan="2">横琴湾酒店</td>
                <td rowspan="2">5</td>
                <td>去程：7:00-8:00</td>
              </tr>
              <tr>
                <td>返程：15:00-17:00</td>
              </tr>
            </tbody>
          </table>
          <p>
            预约免费乘坐酒店航展专线，
            <a href="javacript:;" class="link" @click.prevent.stop="loading($event,3)">点此进入预约</a> 。<br/>
            航展专线咨询电话：<a href="tel:12328" class="link">12328</a> 。
          </p>
        </div>
        <div class="section">
          <h3>港珠澳大桥珠海口岸专线</h3>
          <p>
            航展公众日期间，港珠澳大桥珠海口岸将开通直达航展馆的专线，欢迎香港来的观众选择乘坐。
          </p>
          <p>
            专线服务时间为：<br/>
            <span class="main">港珠澳大桥珠海口岸：</span>6:30-12:00<br/>
            <span class="main">航展馆：</span>13:00-19:00<br/>
          </p>
          <p>
            请观展观众凭票预约免费乘坐，
            <a href="javacript:;" class="link" @click.prevent.stop="loading($event,4)">点此进入预约</a> 。
          </p>
        </div>
      </div>
    </viewer>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'reservations',
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
      loading(e, params) {
        // alert(1)
        if (params) {
          //alert()
          this.$router.push({
            name: "bus",
            params: {bustype: params}
          });
          this.setbackindex(0)

        } else {
          this.$router.push({
            name: "bus"
          });
        }
      },
      city() {
        this.$router.push({
          name: "reservations"
        })
      },
      map() {
        this.$router.push({
          name: "usermap"
        })
      },
      parking() {
        this.$router.push({
          name: "parking"
        })
      },
      driveload() {
        this.$router.push({
          name: 'driveload'
        })
      },
      phonedetail() {
        this.$router.push({
          name: 'phonedetail'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .reservations {
    .fix-wrap{
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
              margin-bottom: .4rem;
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
