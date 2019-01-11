<template>
  <div class="buslist">

    <div class="wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="station">{{setstate.carNumber}} 准备发车...</div>
      </div>
    </div>

    <div class="list">
      <p>统计车上人数</p>
      <ul>
        <li v-for="(item,index) in result" :key="index">
          <div class="con-l">
            <label class="my_protocol">
              <input class="input_agreement_protocol"
                     type="radio" v-model="checkedNames"
                     :id="item.id"
                     :value="item.person"/>
              <span></span>
            </label>
          </div>
          <div class="con-r">
            <label :for="item.id">
              <span v-show="index === 0">满座，</span>
              <!--todo 当进行输入时，选中效果消失了，需要保持一直显示-->
              <input class="person" v-model="item.person" :readonly="index === 0" @click="check(item.person)"/>人
            </label>
          </div>
        </li>
      </ul>
    </div>

    <div class="btn-wrap">
      <p class="error-tip" v-text="tip"></p>
      <button type="button" class="btn blue" @click="fetchData">确认发车</button>
    </div>

    <!--汇报成功弹窗-->
    <div class="cacelmodel" v-show="successflag">
      <div class="wrap">
        <div class="img-wrap">
          <img src="../../assets/images/right.png" alt="">
        </div>
        <h4 class="title">发车信息汇报成功！</h4>
        <div class="btn-cont">
          <button class="btn blue" @click="goback" style="margin-right: 0">好的</button>
        </div>
      </div>
      <div class="mode" @click="goback"></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {baseurl} from "common/js/config";
  import http from "api/https"

  export default {
    name: 'buslist',
    data() {
      return {
        tip: '',
        currentId: 2,
        result: [
          //todo 此处应该读取该辆车的座位数，而不是写死50
          {id: 1, person: "50"},
          {id: 2, person: ""}
        ],
        //todo 此处默认值应为该车的座位数
        checkedNames: '50',
        successflag: false
      }
    },
    mounted() {
      console.log(this.setstate);
      console.log(this.setstate.seating);
      this.$nextTick(() => {
        this.$set(this.result[0], "person", this.setstate.seating);
        this.$nextTick(() => {
          this.checkedNames = this.setstate.seating

        })

      })

    },
    watch: {
      result: {
        handler: function (a, b) {
          if (a[1]) {
            this.checkedNames = a[1].person
          }
        },
        deep: true


      }
    },
    computed: {
      ...mapGetters(['setstate']),
      item() {
        return this.result[0].person

      }

    },
    methods: {
      fetchData: async function () {
        const _this = this;
        if (!this.checkedNames) {
          this.tip = '请选择或输入车上人数';
          setTimeout(() => {
            _this.tip = ''
          }, 2000);
          return
        }
        console.log(this.checkedNames);
        const url = `${baseurl}/worker/departure.do`;
        let params = {
          airCarId: this.setstate.id ? this.setstate.id : '',
          sum: this.checkedNames
        };
        const res = await http.post(url, params);
        if (res.data.code === "200") {
          _this.successflag = true;
        }
      },
      back() {
        this.$router.push({
          name: 'submitted'
        })
      },
      goback() {
        this.$router.push({
          name: 'backIndex'
        })
      },
      check(val) {
        this.checkedNames = val
      }
    }
  }
</script>

<style scoped lang="less">
  .buslist {
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
        .station {
          line-height: 1.26rem;
          padding: 1.18rem .3rem 0;
          font-size: .48rem;
          color: #fff;
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
