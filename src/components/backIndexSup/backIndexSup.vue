<template>
  <div class="backIndex">
    <div class="main">
      <div class="addWrap">
        <div class="wrap">
          <div class="icon" @click="back">
          </div>
        </div>
        <div class="txtcon">
          <div class="txt" @click="showModal">
            <span>{{item}}</span>
          </div>
          <div class="cont">
            <ul>
              <li>
                <span><em v-text="txt.readyStartCarSum"></em> 辆</span>
                <span>等待发车</span>
              </li>
              <li>
                <span><em v-text="txt.ridingCarSum"></em> 辆</span>
                <span>已发车</span>
              </li>
              <li>
                <span><em v-text="txt.arriveCarSum"></em> 辆</span>
                <span>已到达</span>
              </li>
              <li>
                <span><em v-text="txt.returnedCarSum"></em> 辆</span>
                <span>已返程</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mainCenter">
        <div class="tipbox">
          <span>报送记录</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item,index) in messages" :class="getclass(item)">
              <em></em>
              <p v-text="newtext(item)"></p>
              <span v-text="item.feedbackDate.substring(10,16)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="model">
      <modal :list="result" ref="modal" @selcetItem="selcetItem"></modal>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import http from "api/https"
  import {baseurl} from "common/js/config"
  import modal from 'base/modal/modal'

  export default {
    name: 'backIndex',
    data() {
      return {
        result: [],
        place: [],
        item: "",
        txt: "",
        messages: [],
        flag: 1,
        id: ""
      }
    },
    mounted() {
      this.init();
//      this.getcailist();

    },
    components: {
      modal
    },
    methods: {
      selcetItem(item) {
        this.item = item.name;
        console.log(item)
        this.id = item.id
        this.getlist(item.id);
      },

      getlist: async function (id) {
        id = this.id ? this.id : this.result[0].id
        // if (!id) {
        //   id = this.result[0].id
        // }
        const url = `${baseurl}/worker/vipIndex.do`
        const params = {
          pointId: id
        };
        const res = await http.get(url, params)
        if (res.data.code === "200") {
          console.log(res);
          this.txt = res.data.data;
          this.messages = res.data.data.messages

        }
      },
      getclass(item) {
        const reg = /粤/;
        const type = item.type;
        //报送信息
        if (type === 4) {
          return 'orange'
        }
        //问题反馈
        if (type === 1 || type === 2) {
          return 'red'
        }
        //车辆转移
        if (type === 3) {
          if (item.note.indexOf("→") < 0) {
            return 'blue'
          }
          else {
            if (item.note.indexOf(item.airRidePoint.name) === 0) {
              return 'green'
            }
            else {
              return 'blue'
            }
          }
        }
      },
      newtext(item) {
        const pointname = item.airRidePoint.name;
        const type = item.type;
        const title = item.title;
        var note = item.note;
        //报送信息
        if (type === 4) {
          return note.replace(pointname, "").replace(",", "，")
        }
        //问题反馈
        if (type === 1 || type === 2) {
          return title + '，' + note
        }
        //车辆转移
        if (type === 3) {
          const car = note.substring(note.indexOf(":") + 1);
//          新增车辆
          if (note.indexOf("→") < 0) {
            return "新增：" + car
          }
          else {
            //转出车辆
            if (note.indexOf(pointname) === 0) {
              const from = note.substring(note.indexOf("→") + 1, note.indexOf("转移"));
              return "转出：" + car + " 到" + from
            }
            //转入车辆
            else {
              const from = note.substring(0, note.indexOf("→"));
              return "新增：" + car + "（从" + from + "转入）"
            }
          }
        }
      },
      getData: async function () {
        const url = `${baseurl}/worker/getRidePoints.do`;
        let params = {};
        const res = await http.get(url, params);
        console.log(res);
        if (res.data.code === "200") {
          let arr = []
          res.data.data.forEach((item) => {
            arr.push({
              name: `${item.route}${item.name}`,
              id: item.id
            })
          });

          this.result = arr;
          console.log(res)
          ///获取站点乘车信息
          this.$nextTick(() => {
            this.getlist()
          });
          this.flag++;
          if (this.flag === 2) {
            this.item = this.result[0].name;

          }
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
          //console.log(1);
        }, 10000)
      },
      back() {
        this.$router.push({
          name: 'login'
        })
      },
      showModal() {
        //todo 选中乘车点后，页面上的数据根据新的乘车点来显示
        const _this = this
        this.$refs.modal.show();
        setTimeout(() => {
          _this.$refs.modal.refresh();
        }, 20);
      },
    },
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
          span {
            display: inline-block;
            padding-right: .4rem;
            position: relative;
            &:after {
              content: "";
              display: block;
              position: absolute;
              right: 0;
              top: .22rem;
              border: .1rem solid transparent;
              border-top-color: #fff;
            }
          }
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
      padding-top: .9rem;

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
        top: 4.8rem;
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
            padding: 0 0 .4rem .3rem;
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
  }
</style>
