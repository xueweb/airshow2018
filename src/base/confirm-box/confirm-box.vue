<template>
  <div class="mode" v-show="showFlag">
    <div class="conttxt" ref="conttxt" style="z-index: 99">
      <div class="air-wrap">
        <img src="../../assets/images/air.png" alt="">
      </div>
      <p class="title">{{$t("msg.ticketid")}}</p>
      <div class="txt">
        <p>{{$t("msg.dec1")}}</p>
        <p v-html="tipmsg" v-show="langflag"></p>
      </div>
      <div class="selcet-wrap">
        <div class="selcet-title" @click="selectId">
          <span>{{itemname}}</span>
          <i class="fa fa-caret-down icon">▼</i>
        </div>
        <input type="text" :placeholder="placeholder" class="input" v-model="idCard" :style="style">
      </div>
      <div class="btn-wrap">
        <button type="button" class="btn" @click="addTicket">{{$t("msg.addticket")}}</button>
      </div>
      <p class="error-tip" v-text="tip"></p>
    </div>
    <list :list="list" v-show="listFlag" @query="query" v-if="list.length"></list>
    <div class="mode-wrap" @click.stop="closeSelcetId" v-show="listFlag" style="z-index: 999"></div>
    <div class="mode-wrap" @click.stop="selcet" v-show="showFlag" style="z-index: 9"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import list from 'base/list/list'
  import {addClass, removeClass} from "common/js/dom";

  export default {
    name: 'confirm-box',
    data() {
      return {
        tip: '',
        showFlag: false,
        listFlag: false,
        item: "",
        idCard: '',
        placeholder: "请输入证件号码",
        tipmsg: "实物票用户请输入票面的预约乘车码",
        list: [
          // {title: "身份证", id: 0},
          // {title: "回乡证", id: 1},
          // {title: "台胞证", id: 2},
          // {title: "外国人护照", id: 3},
          // {title: '实物票', id: 4}
        ]
      }
    },

    computed: {
      itemname() {
        if (this.$i18n.locale === "CN") {
          return this.item.title ? this.item.title : "身份证"
          // return true
        } else {
          return this.item.title ? this.item.title : "ID card"

          //  return false
        }
      },
      langflag() {
        if (this.$i18n.locale === "CN") {
          return true
        } else {
          return false
        }
      },

      getIdType() {
        return this.item.id ? this.item.id : 0
      },
      style() {
        if (this.item.id === 4) {
          return "width:2.5rem"
        }
        // if (this.$i18n.locale === "EN") {
        //   return "font-size:.2rem"
        // }
      }
    },
    created() {
      this.newlist()
    },
    components: {
      list
    },
    methods: {
      newlist() {
        if (this.$i18n.locale === "CN") {
          let a = [
            {title: "身份证", id: 0},
            {title: "回乡证", id: 1},
            {title: "台胞证", id: 2},
            {title: "外国人护照", id: 3},
            {title: '实物票', id: 4}
          ]
          this.list = a
          return a
        } else {
          this.placeholder = "enter your ID card number"
          let enarr = [
            {title: "ID card", id: 0},
            // {title: "回乡证", id: 1},
            // {title: "Mainland Travel Permit for Taiwan Residents", id: 2},
            {title: "Passport", id: 3},
            {title: 'Paper ticket', id: 4}

          ];
          this.list = enarr
          //return enarr
        }
      },

      selcet() {
        this.hide();
        this.$emit('select');
      },
      query(item) {
        const txt = this.$refs.conttxt;
        this.item = item;
        this.listFlag = false;
        if (this.$i18n.locale === "CN") {
          if (item.id === 4) {
            this.placeholder = '请输入预约乘车码(5位英文字母)'
            //  this.tipmsg='实物票用户请输入票面的预约乘车码(5位英文字母)'

          } else {

            this.placeholder = '请输入证件号码'
            // this.tipmsg='实物票用户请输入票面左下角的流水号'

          }
          removeClass(txt, "opacity")

        } else {
          this.placeholder = 'enter your ID card number'

        }

      },
      selectId() {
        const txt = this.$refs.conttxt;
        this.listFlag = true;
//        addClass(txt, "opacity")
      },
      closeSelcetId() {
//        this.show();
        this.listFlag = false;
      },
      addTicket() {
        if (!this.idCard) {
          const _this = this;
          console.log(_this.item);
          if (_this.item.id === 4) {
            this.tip = '请输入预约乘车码';

          } else {
            this.tip = '请输入证件号码';
            //this.tip = '请输入预约乘车码';
          }
          setTimeout(() => {
            _this.tip = '';
          }, 2000);
        } else {
          this.$emit("add", this.getIdType, this.idCard)
        }

      },
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },

    }
  }
</script>

<style scoped lang="less">
  .mode {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    .conttxt {
      animation: scale .2s;
      position: relative;
      z-index: 99;
      flex: 1;
      background: #fff;
      box-shadow: 0 .23rem .8rem rgba(25, 27, 28, .2);
      border-radius: .08rem;
      margin: 0 .6rem;
      padding: 1.16rem 0 .1rem;
      .air-wrap {
        position: absolute;
        top: -.66rem;
        left: 50%;
        width: 1.32rem;
        height: 1.32rem;
        margin-left: -.66rem;
        background-image: -webkit-linear-gradient(135deg, #46d3fb, #1c9ae3);
        background-image: -moz-linear-gradient(135deg, #46d3fb, #1c9ae3);
        background-image: -o-linear-gradient(135deg, #46d3fb, #1c9ae3);
        background-image: linear-gradient(-135deg, #46d3fb, #1c9ae3);
        border-radius: 50%;
        box-shadow: 0 .1rem .3rem rgba(23, 145, 222, .4);
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
        font-size: .36rem;
        text-align: center;
        line-height: .36rem;
        color: #333;
        font-weight: bold;
        margin-bottom: .16rem;
      }
      .txt {
        font-size: .28rem;
        color: #a5a5a5;
        line-height: .46rem;
        margin-bottom: .3rem;
        text-align: center;
      }
      .selcet-wrap {
        display: flex;
        flex-direction: row;
        margin: 0 .3rem;
        border: 1px solid #c8cfd4;
        height: .84rem;
        border-radius: .08rem;
        overflow: hidden;
        .selcet-title {
          float: left;
          text-align: center;
          line-height: .84rem;
          font-size: .3rem;
          color: #666;
          padding: 0 .32rem 0 .1rem;
          position: relative;
          white-space: nowrap;
          span {
            line-height: .84rem;
          }
          .icon {
            position: absolute;
            right: 0;
            top: 0;
            color: #666;
            font-size: .2rem;
          }
        }
        .input {
          flex: 1;
          display: inline-block;
          outline: none;
          border: none;
          line-height: .84rem;
          height: .84rem;
          font-size: .31rem;
          color: #333;
          vertical-align: center;
          padding: 0 .1rem;
          &::-webkit-input-placeholder {
            color: #bcbcbc;
            font-size: .28rem;
          }
        }
      }
      .error-tip {
        text-align: center;
        color: #dc4444;
        font-size: .3rem;
        line-height: .5rem;
        padding: .14rem 0;
      }
      .btn-wrap {
        height: .86rem;
        margin: .4rem .3rem 0;
        text-align: center;
        position: relative;
        .btn {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          line-height: .86rem;
          background: #1c9ae4;
          outline: none;
          border: none;
          border-radius: .08rem;
          color: #fff;
          font-size: .32rem;
        }
      }

    }
    .opacity {
      display: none;
    }
    .mode-wrap {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #414c53;
      opacity: .5;
    }

  }

</style>
