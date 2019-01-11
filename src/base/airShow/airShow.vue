<template>
  <div class="airShow">
    <div class="title">航展问问</div>
    <div class="list-wrap clearfix">
      <ul class="clearfix">
        <li v-for="item of mydata" class="item" @click="selectItem(item)">
          <div class="icon">
            <img :src="item.icon" alt="">
          </div>
          <div class="txt">{{item.txt}}</div>
        </li>
      </ul>
      <ul class="clearfix list2">
        <li v-for="item of mydata2" class="item" @click="selectItem(item)">
          <div class="icon">
            <img :src="item.icon" alt="">
          </div>
          <div class="txt">{{item.txt}}</div>
        </li>
      </ul>
      <ul class="clearfix need">
        <li v-for="item of mydata3" class="item" @click="selectItem(item)">
          <div class="icon">
            <img :src="item.icon" alt="">
          </div>
          <div class="txt">{{item.txt}}</div>
        </li>
      </ul>
      <ul class="clearfix " id="pos">
        <li v-for="item of mydata4" class="item" @click="selectItem(item)">
          <div class="icon" v-if="item.icon">
            <img :src="item.icon" alt="">
          </div>
          <div class="txt">{{item.txt}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {baseurl} from "common/js/config";
  import http from "api/https"

  export default {
    name: 'airShow',
    data() {
      return {
        mydata: [
          {
            icon: require("../../assets/images/coloricon_1.png"),
            txt: "航展简介",
            id: 1
          },
          {
            icon: require("../../assets/images/coloricon_2.png"),
            txt: "交通攻略",
            id: 2
          },
          {
            icon: require("../../assets/images/coloricon_3.png"),
            txt: "馆内导航",
            id: 3
          },
        ],
        mydata2: [
          {
            icon: require("../../assets/images/coloricon_4.png"),
            txt: "交通指引",
            id: 4
          },
          {
            icon: require("../../assets/images/coloricon_5.png"),
            txt: "航展专线",
            id: 6
          },
          {
            icon: require("../../assets/images/coloricon_6.png"),
            txt: "自驾指引",
            id: 5
          },

        ],
        mydata3: [
          {
            icon: require("../../assets/images/coloricon_7.png"),
            txt: "实时路况",
            id: 9
          },
          {
            icon: require("../../assets/images/coloricon_8.png"),
            txt: "咨询电话",
            id: 7
          },
          {
            icon: require("../../assets/images/coloricon_9.png"),
            txt: "问问客服",
            id: 8
          },

        ],
        mydata4: [
          {
            icon: require("../../assets/images/showicon_zhjj.jpeg"),
            txt: "珠海交警公众号",
            id: 10
          },
          {
            icon: require("../../assets/images/showicon_zghz.jpeg"),
            txt: "中国航展公众号",
            id: 11
          },
          {

            id: 2
          },

        ]
      }
    },
    methods: {

      //交警
      getData: async function () {
        const url = `${baseurl}/booking/whereUser.do`;
        let params = {};
        const res = await http.get(url, params);
        if (res.data.code === "200") {
         // console.log(res);
          window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5ODcyNDQxNg==&scene=124#wechat_redirect'

        } else if (res.data.code === "500") {
          this.$router.push({
            name: 'trafficpolice'
          })

        }
      },
      featchData: async function () {
        const url = `${baseurl}/booking/whereUser.do`;
        let params = {};
        const res = await http.get(url, params);
        if (res.data.code === "200") {
         // console.log(res);
          window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3MjgwOTgxMA==&scene=124#wechat_redirect'

        } else if (res.data.code === "500") {
          this.$router.push({
            name: 'airshow'

          })


        }
      },
      selectItem(item) {
        //参观流程
        if (item.id === 1) {
          this.$router.push({
            name: 'introduction'
          })
        }
        //预约乘车
        if (item.id === 2) {
          this.$router.push({
            name: 'visit'
          })
        }
        //航展地图
        if (item.id === 3) {
          this.$router.push({
            name: 'usermap'
          })
        }
        //节目表
        if (item.id === 4) {
          this.$router.push({
            name: 'program'
          })
        }
        //自驾路线
        if (item.id === 5) {
          this.$router.push({
            name: 'driveload'
          })
        }
        // 航展交通指南
        if (item.id === 6) {
          this.$router.push({
            name: 'reservations'
          })
        }
        //咨询电话
        if (item.id === 7) {
          this.$router.push({
            name: "phonedetail"
          });
          //客服问问
        }
        if (item.id === 8) {
          this.$router.push({
            name: 'question'
          })
        }
        if (item.id === 9) {
          window.location.href = 'http://wx.zhcgs.gov.cn/Query/LKNew/Index?type=4'

        }
        if (item.id === 10) {
          this.getData()

        }
        if (item.id === 11) {
          this.featchData()

        }
      }
    }
  }
</script>
<style scoped lang="less">
  .airShow {
    padding: 0 .3rem;
    .title {
      font-size: .34rem;
      margin-bottom: .3rem;
      color: #666;
    }
    .list-wrap {
      width: 100%;

      #pos li:nth-child(3) {
        visibility: hidden;
        //  display: none;

      }
      ul {
        display: flex;
      }
      .need2 li:nth-child(3) {
        visibility: hidden;
      }

      li {
        font-size: .3rem;
        flex: 1;
        text-align: center;
        /*padding: .1rem;*/
        background: #fff;
        border-radius: .08rem;
        box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .4);
        height: 2rem;
        margin-right: .3rem;
        margin-bottom: .3rem;
        .icon {
          margin-top: .4rem;
          img {
            width: .52rem;
            height: .52rem;
          }
        }
        .txt {
          font-size: .3rem;
          color: #333;
          margin: .15rem auto 0;
          line-height: .35rem;
          height: .7rem;
          display: -webkit-box;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
        }
        .txt:nth-of-type(2) {
          width: 4.6em;
        }
      }

      li:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

</style>
