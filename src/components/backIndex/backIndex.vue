<template>
  <div class="backIndex">
    <div class="main">
      <div class="addWrap">
        <div class="wrap">
          <div class="icon" @click="back">
          </div>
        </div>
        <div class="txtcon">
          <div class="txt" v-text="result.pointName"></div>
          <!--<div class="local" v-text="result.position"></div>-->
          <div class="cont">
            <ul>
              <li>
                <span><em v-text="result.readyStartCarSum"></em> 辆</span>
                <span>等待发车</span>
              </li>
              <li>
                <span><em v-text="result.ridingCarSum"></em> 辆</span>
                <span>已发车</span>
              </li>
              <li>
                <span><em v-text="result.arriveCarSum"></em> 辆</span>
                <span>已到达</span>
              </li>
              <li>
                <span><em v-text="result.returnedCarSum"></em> 辆</span>
                <span>已返程</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mainCenter">
        <vueSeamless :data="newsList" :class-option="optionLeft" class="seamless-warp2">
          <ul class="item">
            <li v-for="(item,index) in newsList" :key="index" @click="loadDeatal">
              {{item.title}}
            </li>
          </ul>
        </vueSeamless>

        <div class="tipbox">
          <span>报送记录</span>
          <a href="javascript:;" @click="addQuesion">问题反馈 ></a>
        </div>

        <div class="list">
          <ul>
            <li v-for="(item,index) in result.messages" :class="getclass(item)">
              <em></em>
              <p v-text="newtext(item)"></p>
              <span v-text="item.feedbackDate.substring(10,16)"></span>
            </li>
          </ul>
        </div>
      </div>

      <div class="btn-wrap" @click="submitted">
        <span>信息报送</span>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vueSeamless from './seamless-scroll'
  import http from "api/https"
  import {baseurl} from "common/js/config";

  export default {
    name: 'backIndex',
    data() {
      return {
        result: '',
        newsList: [
          {
            'title': '请各乘车点负责人每半小时报送一次候车人数。'
          }
        ]
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      optionLeft() {
        return {
          step: 0.5,
          direction: 2,
          limitMoveNum: 1,
          openTouch: false
        }
      }
    },
    methods: {
      getclass(item) {
        const reg = /粤/;
        const type = item.type;
        //报送信息
        if (type === 4) {
          if (reg.test(item.note)) {
            return 'blue'
          }
          else {
            return 'orange'
          }
        }
        //问题反馈
        if (type === 1 || type === 2) {
          return 'red'
        }
      },
      newtext(item) {
        const pointname = item.airRidePoint.name;
        const type = item.type;
        const title = item.title;
        const note = item.note;
        //报送信息
        if (type === 4) {
          return note.replace(pointname, "").replace(",", "，")
        }
        //问题反馈
        if (type === 1 || type === 2) {
          return title + '，' + note
        }
      },
      getData: async function () {
        const _this = this
        const url = `${baseurl}/worker/index.do`;
        let params = {};
        const res = await http.get(url, params);
        if (res.data.code === "200") {
          this.result = res.data.data;
          setInterval(() => {
            // _this.init()
          }, 3000);
          console.log(res)
        }
      },
      loadDeatal() {
        this.$router.push({
          name: 'workmsg'
        })
      },
      init() {
        const _this = this;
        _this.getData()

        setInterval(() => {
          _this.getData()
          console.log(1);
        }, 10000)
      },
      back() {
        this.$router.push({
          name: 'login'
        })
      },
      submitted() {
        this.$router.push({
          name: 'submitted'
        })
      },
      addQuesion() {
        this.$router.push({
          name: 'feedback'
        })
      }
    },
    components: {
      vueSeamless
    }
  }
</script>

<style scoped lang="less">
  .main {
    .addWrap {
      height: 3.1rem;
      width: 100%;
      background-image: linear-gradient(-135deg, #42ade4, #1791de);
      .wrap {
        height: 1.18rem;
        width: 100%;
        font-size: 0.36rem;
        position: relative;
        .icon {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0.7rem;
          background: url("../../assets/images/back02.png") no-repeat 0.3rem center;
          background-size: 0.32rem 0.32rem;
        }
      }
      .txtcon {
        .txt {
          color: #fff;
          font-size: .48rem;
          line-height: 1.1;
          margin: 0 .3rem .22rem;
          text-shadow: 0 2px 0 rgba(0, 0, 0, .1);
        }
        .cont {
          margin: 0 .3rem;
          height: 1.8rem;
          padding: .3rem;
          box-sizing: border-box;
          background: #fff;
          box-shadow: 0 .12rem .27rem rgba(0, 0, 0, .08);
          border-radius: .08rem;
          ul {
            width: 100%;
            padding-top: .16rem;
            display: flex;
            flex-direction: row;
            li {
              flex: 1;
              text-align: center;
              span {
                display: block;
                line-height: .4rem;
                font-size: .28rem;
                color: #808080;
                &:first-child {
                  line-height: .5rem;
                  font-size: .3rem;
                  color: #333;
                  em {
                    font-size: .48rem;
                    color: #1c9ae3;
                  }
                }
              }
            }
          }
        }
      }
    }

    .mainCenter {
      padding-top: 1rem;

      .seamless-warp2 {
        overflow: hidden;
        background: #fff7ea;
        border-radius: .5rem;
        margin: 0 .3rem .2rem;
        height: .96rem;
        ul.item {
          white-space: nowrap;
          li {
            vertical-align: top;
            display: inline-block;
            background: url("../../assets/images/click.png") no-repeat .2rem center;
            background-size: .4rem;
            height: .96rem;
            line-height: .96rem;
            padding: 0 .5rem 0 .7rem;
            color: #d09b44;
            font-size: .3rem;
          }
        }
      }

      .tipbox {
        height: .7rem;
        padding: 0 .3rem;
        line-height: .7rem;
        font-size: .32rem;
        span {
          color: #666;
        }
        a {
          float: right;
          color: #1c9ae3;
          text-decoration: none;
        }
      }

      .list {
        position: fixed;
        top: 6.05rem;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        overflow-y: auto;
        padding: .4rem .3rem;
        background: #f9f9f9;
        ul {
          li {
            margin: 0 0 0 .2rem;
            padding: 0 .3rem .4rem .3rem;
            border-left: .08rem solid #e1e8ec;
            font-size: 0;
            position: relative;
            & > em {
              position: absolute;
              left: -.1rem;
              top: .1rem;
              width: .12rem;
              height: .12rem;
              background: #fff;
              border-radius: .1rem;
              box-shadow: 0 0 0 .05rem #f39700, 0 0 0 .1rem #fff, 0 .05rem .05rem .1rem rgba(0, 0, 0, .06);
            }
            &.orange > em {
              box-shadow: 0 0 0 .05rem #f39700, 0 0 0 .1rem #fff, 0 .05rem .05rem .1rem rgba(0, 0, 0, .06);
            }
            &.blue > em {
              box-shadow: 0 0 0 .05rem #1c9ae3, 0 0 0 .1rem #fff, 0 .05rem .05rem .1rem rgba(0, 0, 0, .06);
            }
            &.red > em {
              box-shadow: 0 0 0 .05rem #dc5443, 0 0 0 .1rem #fff, 0 .05rem .05rem .1rem rgba(0, 0, 0, .06);
            }
            &.green > em {
              box-shadow: 0 0 0 .05rem #35b748, 0 0 0 .1rem #fff, 0 .05rem .05rem .1rem rgba(0, 0, 0, .06);
            }
            & > p {
              line-height: .4rem;
              font-size: .32rem;
              color: #333;
              margin-bottom: .1rem;
              span {
                color: #1c9ae3;
                padding-right: .06rem;
              }
            }
            & > span {
              line-height: .3rem;
              font-size: .28rem;
              color: #a5a5a5;
            }
          }
        }
      }
    }

    .btn-wrap {
      position: fixed;
      right: .3rem;
      bottom: .46rem;
      z-index: 999;
      height: 1.06rem;
      font-size: 0;
      text-align: center;
      padding: 0 .3rem;
      border-radius: .53rem;
      background-image: linear-gradient(-135deg, #46d3fb, #1c9ae3);
      box-shadow: 0 .1rem .4rem rgba(23, 145, 222, .4);
      span {
        color: #fff;
        font-size: .4rem;
        line-height: 1.06rem;
        text-shadow: 0 .02rem 0 rgba(0, 0, 0, .12);
      }
    }

  }
</style>
