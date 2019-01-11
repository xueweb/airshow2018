<template>
    <div class="workmsg">
      <div class="msg">

        <div class="title-wrap">
          <div class="icon" @click="back">
          </div>
          <div class="txt">消息推送</div>
        </div>
        <div class="main">
          <p>消息列表</p>
          <ul>
            <li v-for="(item,index) of result">
              <div>
                <span>
                  {{item.type===1?"温馨提醒":item.type===2?"航展事务":item.type===3?"交通信息":item.type===4?"严重事项":"站点信息"}}
                </span>
                <em>{{item.sendDate.substring(5)}}</em>
              </div>
              <p> {{item.content}}</p>
            </li>
          </ul>
        </div>

      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {baseurl} from "common/js/config";
  import http from "api/https"

  export default {
    name: 'workmsg',
    data() {
      return {
        result: []
      }
    },
    mounted() {
      this.feathData()
    },
    methods: {
      back() {
        this.$router.push({
          name: "backIndex"
        })
      },
      feathData: async function () {
        const url = `${baseurl}/worker/message.do`
        let params = {};
        const res = await http.get(url, params);
        if (res.data.code === "200") {
          this.result = res.data.data;
          console.log(res)
        }

      }
    }
  }
</script>

<style scoped lang="less">

  .workmsg {
    .title-wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 99;
      height: 1.18rem;
      background-image: -webkit-linear-gradient(135deg, #42ade4, #1791de);
      background-image: -moz-linear-gradient(135deg, #42ade4, #1791de);
      background-image: -o-linear-gradient(135deg, #42ade4, #1791de);
      background-image: linear-gradient(-135deg, #42ade4, #1791de);
      width: 100%;
      font-size: .36rem;
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
        line-height: 1.2rem;
        color: #fff;
        font-size: .4rem;
      }
    }
    .main {
      padding: 1.58rem 0 0;
      font-size: 0;
      &>p{
        line-height: 1.1;
        font-size: .28rem;
        color: #a5a5a5;
        padding: 0 .3rem;
      }
      ul{
        padding: .3rem 0 .5rem;
        li{
          margin: 0 .3rem .3rem;
          padding: .3rem;
          background: #fff;
          box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .4);
          div{
            height: .36rem;
            padding-bottom: .14rem;
            line-height: .36rem;
            span{
              float: left;
              font-size: .32rem;
              color: #1c9ae3;
            }
            em{
              float: right;
              font-size: .28rem;
              color: #a5a5a5;
            }
          }
          p{
            line-height: .42rem;
            font-size: .3rem;
            color: #333;
            word-break:break-all;
          }
        }
      }
    }
  }
</style>
