<template>
  <div class="msgdetai">

    <div class="icon-wrap" @click="back">
      <div class="back"></div><span style="font-size: .4rem">返回</span>

    </div>
    <div class="list">
      <!--<div class="title" style="text-align: center;">消息推送</div>-->
      <ul>
        <li v-for="item  in list" v-html="item.content" style="font-size: .3rem" class="item"></li>
      </ul>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import http from "api/https"
  import {baseurl} from "common/js/config";

  export default {
    name: "msgdetai",
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getmsg()

    },
    methods: {
      back(){
        this.$router.push({
          name:"index"
        })
      },
      getmsg: async function () {
        const url = `${baseurl}/booking/getMessage.do`;
        let params = {};
        const res = await http.get(url, params)
        if (res.data.code === "200") {
          this.list=res.data.data
          console.log(this.list);

        }
        console.log(res);


      },

    }
  }
</script>

<style scoped lang="less">
  .list{
    margin: .3rem;

  }
  .msgdetai{
  }
  .item{
    line-height: .5rem;
    margin-bottom: .5rem;
  }
  .icon-wrap{
    width: 100%;
    line-height: 1.2rem;
  }
  .back{
    float: left;
    width: .9rem;
    height: 1rem;
    background: url("../../assets/images/back-left.png") no-repeat .5rem .65rem;
    background-size: .32rem .32rem;
    margin-bottom: 1rem;
    font-size: .3rem;
    line-height: .6rem;
  }


</style>
