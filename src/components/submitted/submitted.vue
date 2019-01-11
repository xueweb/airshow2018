<template>
  <div class="submitted">

    <div class="wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">
          <div class="title-txt">
            <span v-for="(item,index) of txt " :key=index @click="selcetTxt(item,index)"
                  :class="{active:currentIndex===index}">{{item.name}}</span>
          </div>
          <div v-show="currentIndex===0" class="station">现场候车人数有.....</div>
          <div class="car-list" v-show="currentIndex===1">
            <input type="text" placeholder="请输入车牌号码" class="query" v-model="keyword">
          </div>
        </div>
      </div>
    </div>

    <div v-show="currentIndex===0">
      <div class="list">
        <p>统计候车人数</p>
        <ul>
          <li v-for="(item,index) in result" :key="item.id">
            <div class="con-l">
              <label class="my_protocol">
                <input class="input_agreement_protocol"
                       type="radio"
                       v-model="checkedNames"
                       :id="item.id"
                       :key="index"
                       :checked="index ===0"
                       :value="item.person"
                />
                <span></span>
              </label>
            </div>
            <div class="con-r">
              <label :for="item.id">
                <!--todo 当进行输入时，选中效果消失了，需要保持一直显示-->
                <input class="person" v-model="item.person" :readonly="index !==0" @click="check(item.person)"/>人
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn-wrap">
        <p class="error-tip" v-text="tip"></p>
        <button type="button" class="btn" @click="checekPerson">确认汇报</button>
      </div>
    </div>

    <scroll v-show="currentIndex===1&&!keyword" class="carlist-wrap" ref="scroll" :data="list">
      <carlist :carlist="list" ref="carlist"></carlist>
    </scroll>

    <div class="search-list" v-show="currentIndex===1&&keyword">
      <div class="title">专线巴士列表</div>
      <ul>
        <li v-for="(item,index) in search" @click="selcetItem(item)" :class="{active:item.status!==1}">
          <p v-text="item.carNumber"></p>
          <span>{{item.seating}}座</span>
          <em>{{item.status===1?"等待发车 >":item.status===2?"已发车":item.status===3?"已到达":item.status===4?"已返程":""}}</em>
        </li>
      </ul>
    </div>

    <!--汇报成功弹窗-->
    <div class="cacelmodel" v-show="successflag">
      <div class="wrap">
        <div class="img-wrap">
          <img src="../../assets/images/right.png" alt="">
        </div>
        <h4 class="title">候车人数汇报成功！</h4>
        <div class="btn-cont">
          <button class="btn blue" @click="back" style="margin-right: 0">好的</button>
        </div>
      </div>
      <div class="mode" @click="back"></div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import scroll from 'base/scroll/scroll'
  import carlist from '../../components/carlist/carlist'
  import http from "api/https"
  import {baseurl} from "common/js/config";
  import {debounce} from 'common/js/debounce'
  import {mapMutations} from 'vuex'

  export default {
    name: 'submitted',
    data() {
      return {
        keyword: '',
        tip: '',
        currentId: 1,
        flag: true,
        list: [],
        search: [],
        currentIndex: 0,
        checkPerson: '',
        successflag: false,
        txt: [
          {name: "候车汇报", id: 1},
          {name: "发车汇报", id: 2}
        ],
        result: [
          {id: 1, person: ''},
          {id: 2, person: 100},
          {id: 3, person: 200},
//          {id: 4, person: 300},
        ],
        checkedNames: ''
      }
    },
    mounted() {
      this.getdata()
    },
    watch:{
      result: {
        handler: function (a, b) {
          if (a[0]) {
            this.checkedNames = a[0].person
          }
        },
        deep: true


      },

    },

    created() {
      const _this = this;
      this.$watch('keyword', () => {
        _this.request()
      });
    },
    methods: {
      ...mapMutations({
        setstate: 'SET_STATE'
      }),
      selcetItem(item) {
        //临时取消状态限定，即所有状态的车辆都可以进行发车汇报
        //if (item.status !== 1) return
        this.$router.push({
          name: 'buslist',
          params: {
            item: item
          }
        });
        this.setstate(item)
      },
      request: async function () {
        const url = `${baseurl}/worker/searchCar.do`;
        let params = {
          carNumber: this.keyword
        };
        const res = await http.get(url, params);
        if (res.data.code === "200") {
          this.search = res.data.data;
          console.log(this.search)
          //debugger
        }
      },
      //候车人数汇报
      checekPerson: async function () {
        const _this = this
        if (!this.checkedNames) {
          this.tip = '请选择或输入候车人数';
          setTimeout(() => {
            _this.tip = ''
          }, 2000);
          return false
        }
        const url = `${baseurl}/worker/waiting.do`;
        let params = {
          sum: this.checkedNames
        };
        const res = await http.post(url, params);
        if (res.data.code === "200") {
          _this.successflag = true;
        }
      },
      selcetTxt(item, index) {
        const _this = this;
        this.currentIndex = index;
        setTimeout(() => {
          _this.$refs.scroll.refresh()
        }, 20);
      },
      getdata: async function () {
        const url = `${baseurl}/worker/getPointAllCar.do`;
        let params = {};
        const res = await http.get(url, params);
        if (res.data.code === "200") {
          this.list = res.data.data;
          console.log(this.list)
        }
      },
      back() {
        this.$router.push({
          name: "backIndex"
        })
      },
      check(val) {
        this.checkedNames = val
      }
    },
    components: {
      scroll,
      carlist
    }
  }
</script>

<style scoped lang="less">
  .submitted {
    .wrap {
      .title-wrap {
        height: 2.44rem;
        background-image: -webkit-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -moz-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -o-linear-gradient(135deg, #42ade4, #1791de);
        background-image: linear-gradient(-135deg, #42ade4, #1791de);
        width: 100%;
        font-size: 0.36rem;
        position: relative;
        .icon {
          position: absolute;
          left: 0;
          top: 0;
          height: 1.18rem;
          width: 0.7rem;
          background: url("../../assets/images/back02.png") no-repeat 0.3rem center;
          background-size: 0.32rem 0.32rem;
        }
        .txt {
          .title-txt {
            text-align: center;
            line-height: 1.18rem;
            color: #c6e4f7;
            font-size: 0.32rem;
            span {
              display: inline-block;
              padding: 0 .15rem;
              &.active {
                color: #fff;
                font-size: .36rem;
              }
            }
          }
          .station {
            line-height: 1.26rem;
            padding: 0 .3rem;
            font-size: .48rem;
            color: #fff;
          }
          .car-list {
            padding: 0 .3rem;
            .query {
              width: 100%;
              height: .88rem;
              box-sizing: border-box;
              border-radius: .08rem;
              outline: none;
              border: none;
              background: #fff url("../../assets/images/search.png") no-repeat 96% center;
              background-size: .34rem .34rem;
              line-height: .88rem;
              padding: 0 .8rem 0 .2rem;
              font-size: .32rem;
              color: #333;
              box-shadow: 0 .1rem .4rem rgba(20, 127, 196, .4);
            }
          }
        }
      }
    }
    .list {
      padding-top: .4rem;
      width: 100%;
      p {
        line-height: 1.1;
        font-size: .28rem;
        color: #a5a5a5;
        padding: 0 .3rem;
      }
      ul {
        padding: .3rem 0 .5rem;
        li {
          display: flex;
          margin: 0 .3rem .3rem;
          background: #fff;
          box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .4);
          .con-l {
            flex: 0 0 1.04rem;
            position: relative;
            border-right: 1px dashed #d0e6f9;
            .my_protocol {
              position: absolute;
              top: 0;
              right: 0;
              left: 0;
              bottom: 0;
              .input_agreement_protocol {
                -webkit-appearance: none;
                outline: none;
                display: none;
                text-align: center;
              }
              span {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: .44rem;
                height: .44rem;
                box-sizing: border-box;
                border: 1px solid #bebebe;
                border-radius: 50%;
                background: #fff;
              }
              .input_agreement_protocol:checked + span {
                border: 1px solid #1c9ae3;
                background: #1c9ae3 url("../../assets/images/gou_icon.png") no-repeat center center;
                background-size: cover;
              }
            }
          }
          .con-r {
            flex: 1;
            label {
              display: block;
              padding: .4rem .3rem;
              line-height: .6rem;
              font-size: .36rem;
              color: #333;
              .person {
                width: 1.34rem;
                border: none;
                border-bottom: 1px solid #a3a3a3;
                margin-right: .2rem;
                line-height: .6rem;
                font-size: .36rem;
                color: #333;
                border-radius: 0;
                padding: 0;
                &[readonly] {
                  width: .7rem;
                  margin-right: 0;
                  border: none;
                  background: #fff;
                }
              }
            }
          }
        }
      }
    }
    .btn-wrap {
      font-size: 0;
      margin: 0 .3rem .3rem;
      .error-tip {
        text-align: center;
        color: #dc4444;
        font-size: 0.3rem;
        line-height: 0.7rem;
        height: 0.7rem;
      }
      .btn {
        width: 100%;
        height: 0.86rem;
        background: #1c9ce3;
        outline: none;
        border: none;
        border-radius: 0.08rem;
        color: #fff;
        font-size: 0.32rem;
      }
    }

    .carlist-wrap {
      position: fixed;
      top: 2.84rem;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
    .search-list {
      position: fixed;
      top: 2.84rem;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      overflow-y: auto;
      .title {
        line-height: 1.1;
        font-size: .28rem;
        color: #a5a5a5;
        padding: 0 .3rem .3rem;
      }
      ul {
        padding-bottom: .3rem;
        li {
          margin: 0 .3rem .3rem;
          padding: .3rem;
          position: relative;
          background: #fff;
          box-shadow: 0 .1rem .4rem rgba(218, 219, 219, .4);
          border-radius: .08rem;
          font-size: 0;
          p {
            font-size: .36rem;
            color: #333;
            line-height: 1.1;
            margin-bottom: .1rem;
          }
          span {
            font-size: .28rem;
            color: #828282;
            line-height: 1.1;
          }
          em {
            position: absolute;
            right: .3rem;
            top: 50%;
            text-align: right;
            transform: translate(0, -50%);
            font-size: .3rem;
            color: #f36707;
          }
          &.active em {
            color: #a5a5a5;
          }
        }
      }
    }

    .cacelmodel {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      .mode {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #414c53;
        opacity: .5;
      }
      .wrap {
        position: relative;
        z-index: 99;
        flex: 1;
        background: #fff;
        box-shadow: 0 .23rem .8rem rgba(25, 27, 28, .2);
        border-radius: .08rem;
        margin: -1rem .6rem 0;
        padding: 1.16rem 0 .3rem;
        .img-wrap {
          position: absolute;
          top: -.66rem;
          left: 50%;
          width: 1.32rem;
          height: 1.32rem;
          margin-left: -.66rem;
          background-image: -webkit-linear-gradient(135deg, #1fecb4, #13c897);
          background-image: -moz-linear-gradient(135deg, #1fecb4, #13c897);
          background-image: -o-linear-gradient(135deg, #1fecb4, #13c897);
          background-image: linear-gradient(-135deg, #1fecb4, #13c897);
          box-shadow: 0 .1rem .3rem rgba(18, 213, 160, .4);
          border-radius: 50%;
          text-align: center;
          line-height: 1.32rem;
          overflow: hidden;
          img {
            float: left;
            width: 100%;
            height: 100%;
          }
        }
        .title {
          font-size: .38rem;
          text-align: center;
          line-height: .38rem;
          color: #333;
          font-weight: bold;
          margin: .2rem 0 .8rem;
        }
        .btn-cont {
          text-align: center;
          margin-top: .5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 .3rem;
          .btn {
            flex: 1;
            line-height: .86rem;
            height: .86rem;
            border: 1px solid #bcbcbc;
            border-radius: .08rem;
            font-size: .32rem;
            color: #828282;
            outline: none;
            background: #fff;
            &:first-child {
              margin-right: .3rem;
            }
          }
          .blue {
            background: #1c9ae3;
            border: 1px solid #1c9ae3;
            color: #fff;
          }
        }
      }
    }
  }
</style>
