<template>
  <div class="question">
    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">问问客服</div>
      </div>
    </div>
    <div class="wrap">
      <ul class="chat-list">
        <li class="left white">
          <div class="box">
            <p style="margin-bottom: .2rem">您是不是想问：</p>
            <a href="javascript:;" v-for="(item,index) in list" @click="select(item,index)" :class="{ac:index===0}">{{item.name}}</a>
          </div>
        </li>

        <li class="right blue" v-show="currentIndex===0">
          <div class="box">
            <p>今年航展有哪些看点？</p>
          </div>
        </li>
        <li class="left white" v-show="currentIndex===0">
          <div class="box">
            <p>
              第十二届中国航展恰逢改革开放40周年，将突出展示“一带一路”建设及军民融合发展成果。空中飞行表演和地面动态演示交相辉映，航展“陆空一体”大演示格局基本成型。届时，中国人民解放军空军“八一”飞行表演队和航空大学“红鹰”飞行表演队将前来参展。此外，沙特阿拉伯皇家空军“沙特之鹰”飞行表演队也将携9架Hawk
              MK 65A式教练机首次参展，为广大观众呈献精彩绝伦的飞行表演。同时，在本届航展上，ARJ21先进支线客机、波音787宽体客机等国内外明星机型也将进行性能示范飞行。本届航展精彩纷呈，值得期待！</p>
            <p>详情请点击以下链接查阅，祝您观展愉快~</p>
            <a href="javascript:;" @click="introduction">《航展简介》</a>
          </div>
        </li>

        <li class="right blue" v-show="currentIndex===1">
          <div class="box">
            <p>航展公众日门票如何购买？</p>
          </div>
        </li>
        <li class="left white" v-show="currentIndex===1">
          <div class="box">
            <p>
              本届航展公众日门票包含身份证件票和实物票，公众日门票每天8万张限量发售且展区现场不设售票点，请您提前购买。<br/>
              展票更多信息请点击：
            </p>
            <a href="javascript:;" @click="introduction">《航展简介》</a>
          </div>
        </li>

        <li class="right blue" v-show="currentIndex===2">
          <div class="box">
            <p>怎么去航展馆？</p>
          </div>
        </li>
        <li class="left white" v-show="currentIndex===2">
          <div class="box">
            <p>根据您当前定位，建议您乘坐免费专线巴士前往，请点击以下链接前往预约~</p>
            <a href="javascript:;" @click="loading">凭票免费预约 >></a>
            <p>为了您的观展便利，请您尽量避免自驾出行，选择搭乘便捷、快速的公共交通工具前往观展。根据不同的地市安排及交通工具，本届航展交通指引信息如下：</p>
            <a href="javascript:;" @click="program">《航展交通指引》</a>
          </div>
        </li>

        <li class="right blue" v-show="currentIndex===3">
          <div class="box">
            <p>珠海市内的免费专线在哪里乘坐？</p>
          </div>
        </li>
        <li class="left white" v-show="currentIndex===3">
          <div class="box">
            <p>
              航展公众日期间，珠海市开通了9条市内专线线路，包含：1香洲公交总站、2体育中心东门、3九洲城、4九洲港、5城轨珠海站、6前山枢纽站、7华发商都、8斗门汽车客运站、9珠海国际赛车场停车场。<br/>
              市内专线具体信息请点击：
            </p>
            <a href="javascript:;" @click="city">《航展专线》</a>
            <p>
              市内专线对观展观众免费开放，请凭购票信息预约乘车，并在乘车时出示预约二维码。预约请点击：
            </p>
            <a href="javascript:;" @click="loading">《预约乘车》</a>
          </div>
        </li>

        <li class="right blue" v-show="currentIndex===4">
          <div class="box">
            <p>看完航展怎么返程？</p>
          </div>
        </li>
        <li class="left white" v-show="currentIndex===4">
          <div class="box">
            <p>根据您当前定位，已为您制定了返程路线，请点击以下链接查看~</p>
            <a href="javascript:;" @click="navigation">返程引导 >></a>
          </div>
        </li>

        <li class="right blue" v-show="currentIndex===5">
          <div class="box">
            <p>想要搭乘市内专线，应该怎么预约？</p>
          </div>
        </li>
        <li class="left white" v-show="currentIndex===5">
          <div class="box">
            <p>乘公共交通，观展更轻松！欢迎您乘坐航展市内专线前往观展，查看预约乘车的操作指引及乘车票的使用说明请点击以下链接查看，祝您观展愉快！</p>
            <a href="javascript:;" @click="howto">《预约攻略》</a>
          </div>
        </li>

        <li class="right blue" v-show="currentIndex===6">
          <div class="box">
            <p>预约乘车后，我的电子乘车票应该怎么使用？</p>
          </div>
        </li>
        <li class="left white" v-show="currentIndex===6">
          <div class="box">
            <p>感谢您预约航展市内专线，请您提前保存电子乘车票的页面截图，并在乘车时出示二维码页面进行扫码乘车。点击以下链接查看乘车攻略，祝您观展愉快！</p>
            <a href="javascript:;" @click="howto">《电子票使用指南》</a>
          </div>
        </li>
        <li class="right blue" v-show="currentIndex===7">
          <div class="box">
            <p>本届航展自驾前往应如何停车？</p>
          </div>
        </li>
        <li class="left white" v-show="currentIndex===7">
          <div class="box">
            <p>
              本届航展核心区禁止自驾小汽车驶入，外围接驳停车场的位置和相关信息请您<a href="javascript:;" style="display: inline" @click="loadmsg">点击链接查看</a>。
            </p>
            <!--<a href="javascript:;" @click="howto">《电子票使用指南》</a>-->
          </div>
        </li>
        <ul>
          <li v-for="item in listb.slice(0,1)" style="float: right;text-align:center;font-size: .3rem;min-width: 2rem;margin-right: .5rem;background: #1c9ae3;color: #fff;line-height: .6rem;border-radius: 5px">{{item.name}}</li>
        </ul>

        <li class="left white" v-show="currentIndex===8">
          <div class="box">
            <p>
              本届航展核心区禁止自驾小汽车驶入，外围接驳停车场的位置和相关信息请您<a href="javascript:;" style="display: inline" @click="loadmsg">点击链接查看</a>。
            </p>
            <!--<a href="javascript:;" @click="howto">《电子票使用指南》</a>-->
          </div>
        </li>
        <!--<li>-->
        <!--<p></p>-->
        <!--</li>-->

      </ul>

    </div>
    <div class="search-wrap">
      <input type="text" class="search-box" placeholder="请输入搜索内容" v-model="query">
    </div>
    <div class="btn-wrap" style="text-align: center">
      <button type="button" @click="search" style="background: #1c9ae3;color: #FFF;width: 5rem;height: .8rem;text-align: center;outline: none;border: none;font-size: .3rem;margin-bottom: 1rem">
        发送
      </button>

    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import {mapMutations} from "vuex"

  export default {
    name: 'question',
    data() {
      return {
        currentIndex: "",
        a: {id: 1},
        query: "",
        listb: [],
        list: [
          {name: '今年航展有哪些看点？'},
          {name: '航展公众日门票如何购买？'},
          {name: '怎么去航展馆？'},
          {name: '珠海市内的免费专线在哪里乘坐？'},
          {name: '看完航展怎么返程？'},
          {name: '想要搭乘市内专线，应该怎么预约？'},
          {name: '预约乘车后，我的电子乘车票应该怎么使用？'},
          {name: "本届航展自驾前往应如何停车？"}
        ]
      }
    },
    watch: {},
    methods: {
      ...mapMutations({
        user: 'SET_USER',
        setquery: "SET_QUERY",
        set: 'set'
      }),
      search() {
        this.listb.push({
          name: this.query
        });
        this.currentIndex = 8
      },
      loadmsg() {
        this.$router.push({
          name: "parkingdec"
        })

      },
      select(item, index) {
        this.currentIndex = index
      },
      visit() {
        this.$router.push({
          name: 'visit'
        })
      },
      back() {
        this.$router.push({
          name: "index"
        })
      },
      next() {
        this.$router.push({
          name: "reservations"
        })
      },
      loading() {
        this.$router.push({
          name: "bus"
        })
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
      navigation() {
        this.$router.push({
          name: "navigation"
        })
        this.user(this.a)
        this.setquery(1)
        this.set(true)


      },
      introduction() {
        this.$router.push({
          name: "introduction"
        })
      },
      program() {
        this.$router.push({
          name: "program"
        })
      },
      howto() {
        this.$router.push({
          name: "howto"
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .question {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f9f9f9;
    overflow: hidden;
    overflow-y: auto;

    .fix-wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 99;

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
      padding: 1.58rem 0 .6rem;

      .chat-list {
        li {
          margin-bottom: .4rem;

          &:after {
            display: block;
            content: "";
            clear: both;
          }

          .box {
            padding: .3rem;
            max-width: 4.8rem;
            font-size: .3rem;
            line-height: .48rem;
            border-radius: .3rem;
            background: #fff;

            p {
              color: #808080;
            }

            a {
              display: block;
              color: #1c9ae3;
              line-height: .7rem;
              text-decoration: underline;
            }
          }

          &.left .box {
            float: left;
            margin-left: .3rem;
            border-top-left-radius: 0;
            min-width: 3rem;
          }

          &.white .box {
            background: #fff;
            box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .4);

            p {
              color: #333;
            }
          }

          &.right .box {
            float: right;
            margin-right: .3rem;
            border-top-right-radius: 0;
          }

          &.blue .box {
            background: #42a5e4;

            p {
              color: #fff;
            }
          }

          &:first-child {
            .box {
              a {
                line-height: .4rem;
                margin-bottom: .3rem;
              }
            }
          }
        }
      }
    }

    .search-wrap {
      /*position: fixed;*/
      /*bottom: 2rem;*/
      display: flex;
      text-align: center;
      width: 100%;


      .search-box {
        flex: 1;
        height: .6rem;
        border: 1px solid #1c9ae3;
        outline: none;
        margin: 20px 20px 0px 20px;
        border-radius: 2px;
        padding-left: 5px;

      }
    }
  }
</style>
