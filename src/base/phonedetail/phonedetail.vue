<template>
  <transition name="slide" mode="in-out">
    <div class="phonedetail">
      <div class="fix-wrap">
        <div class="title-wrap">
          <div class="icon" @click="back">
          </div>
          <div class="txt">咨询电话</div>
        </div>
      </div>
      <div class="wrap">
        <h2>咨询电话</h2>
        <ul class="phone-list">
          <li>
            <a href="tel:0756-12328">
              <span>交通咨询</span>
              <em>0756-12328</em>
            </a>
          </li>
          <li>
            <a href="javacript:;" @click.prevent="showmodel">
              <span>展区、票务咨询</span>
              <em>400-8800-113 或 0756-3375371</em>
            </a>
          </li>
          <li>
            <a href="tel:0756-12328">
              <span>停车场咨询</span>
              <em>0756-12328</em>
            </a>
          </li>
          <li>
            <a href="tel:110">
              <span>意外报警</span>
              <em>110</em>
            </a>
          </li>
        </ul>
      </div>

      <model :list="list" ref="model" @selcetItem="select"></model>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import model from '../../base/modal/modal'

  export default {
    name: 'phonedetail',
    data() {
      return {
        list: [
          {name: '400-8800-113', id: 1},
          {name: '0756-3375371', id: 2}
        ],
        result: [
          {
            phone: '0756-12328',
            txt: "交通咨询"
          },
          {
            phone: '400-8800-113',
            nub: "0756-3375371",
            txt: "展区、票务咨询"
          },
          {
            phone: '0756-12328',
            txt: "停车场咨询"
          },
          {
            phone: '110',
            txt: "意外报警"
          }
        ]
      }
    },
    components: {
      model
    },
    methods: {
      select(item) {
        if (item.id) {
          window.location.href = `tel:${item.name}`
        }
      },
      showmodel() {
       // alert(1);
        console.log(this.$refs.model)
        this.$refs.model.show()
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>
<style scoped lang="less">

  /*.slide-enter-active, .slide-leave-active {*/
    /*transition: all 0.3s*/
  /*}*/

  /*.slide-enter, .slide-leave-to {*/
    /*transform: translate3d(100%, 0, 0)*/
  /*}*/

  .phonedetail {
    .fix-wrap {
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
      ul{
        li{
          margin-bottom: .3rem;
          a{
            display: block;
            padding: .3rem .3rem .34rem;
            background: #fff;
            border-radius: .08rem;
            box-shadow: 0 .1rem .4rem rgba(207,215,219,.4);
            font-size: 0;
            text-decoration: none;
            position:relative;
            span{
              display: block;
              font-size: .36rem;
              color: #333;
              line-height: .56rem;
            }
            em{
              font-size: .3rem;
              color: #a5a5a5;
              line-height: 1.2;
            }
            &:after{
              content: '';
              display: block;
              position: absolute;
              right: .3rem;
              top:50%;
              transform:translate(0,-50%);
              width: .8rem;
              height: .8rem;
              border: 1px solid #1c9ae3;
              border-radius: 50%;
              background: #fff url("../../assets/images/WechatIMG108.png") no-repeat center center;
              background-size: .38rem .38rem;
             }
          }
        }
      }
    }
  }

</style>
