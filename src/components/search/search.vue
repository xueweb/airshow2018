<template>
  <transition name="slide" mode="in-out">
    <div>
      <div class="search">
        <div class="title">
          <div class="back" @click="back">
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入实际出发地" class="txt" v-model="query">
          </div>
        </div>
        <p class="tip">
          本系统将根据您选择的出发地，自动为您推荐距离最近的市内专线乘车点。
        </p>
        <ul class="list">
          <li v-for="item in list" @click="next(item)">
            <p>{{item.name}}</p>
            <p class="add">{{item.address}}</p>
          </li>
        </ul>
      </div>
      <div id="img-wrap" style="display: none"></div>
      <div id="panel" style="display: none"></div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

  export default {
    name: 'search',
    data() {
      return {
        map: '',
        placeSearch: "",
        list: "",
        query: ""
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      query(newquery) {
        if (typeof newquery === "string" && newquery) {
          const _this = this;
          this.placeSearch.search(newquery, function (a, data) {
            console.log(data)
            _this.list = _this.normalist(data.poiList.pois);
          });
        }
      }
    },
    methods: {
      ...mapMutations({
        setuser: 'SET_USER',
        flag:'FLAG'
      }),
      back() {
        this.$router.push({
          name: "bus"
        });
      },
      next(item) {
        this.$router.push({
          name: "bus"
        });
        this.setuser(item)
        this.flag(false)
      },
      normalist(list) {
        console.log(list);
        let arr = [];
        for (let i in list) {
          arr.push({
            address: list[i].address,
            name: list[i].name,
            M:list[i].location.lat,
            O:list[i].location.lng
          })
        }
        console.log(arr)
        return arr
      },
      init() {
        let _this = this;
        _this.map = new AMap.Map('img-wrap', {
          center: [113.510306, 22.222376],
          resizeEnable: true,
          zoom: 10,
          lang: "zh"
        });
        AMap.plugin("AMap.PlaceSearch", function () {
          _this.placeSearch = new AMap.PlaceSearch({
            pageSize: 20, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: "0756", // 兴趣点城市
            citylimit: false,  //是否强制限制在设置的城市内搜索
            map: _this.map, // 展现结果的地图实例
            panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });
          //关键字查询
        });

      },

    }
  }
</script>
<style scoped lang="less">
  /*.slide-enter-active {*/
    /*transition: all 0.3s*/
  /*}*/

  /*.slide-enter {*/
    /*transform: translate3d(100%, 0, 0)*/
  /*}*/

  .search {
    .title {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #fff;
      box-shadow: 0 .1rem .4rem rgba(207,215,219,.4);
      height: 1.18rem;
      .back{
        float: left;
        width: .9rem;
        height: 100%;
        background: url("../../assets/images/back-left.png") no-repeat .3rem center;
        background-size: .32rem .32rem;
      }
      .search-box{
        margin-left: .9rem;
        padding: .2rem .3rem .2rem 0;
        box-sizing: border-box;
        height:  100%;
        font-size: 0;
        .txt{
          width: 100%;
          height: 100%;
          border: 0;
          outline: none;
          border-radius: .08rem;
          background: #f9f9f9 url("../../assets/images/search.png") no-repeat .2rem center;
          background-size: .34rem .34rem;
          line-height: .78rem;
          font-size: .3rem;
          color: #333;
          padding-left: .7rem;
          box-sizing: border-box;
          /*&::-webkit-input-placeholder{*/
          /*color: #bcbcbc;*/
          /*}*/
        }
      }
      .text-wrap {
        display: inline
      }
    }
    .tip{
      margin: 1.48rem .3rem 0;
      background: #fff7ea;
      border-radius: .1rem;
      padding: .18rem .26rem;
      font-size: .28rem;
      color: #d19b46;
      line-height: .4rem;
    }
    .list {
      margin:0 .3rem .3rem;
      li {
        background: url("../../assets/images/location_icon_black.png") no-repeat 0 center;
        background-size: .3rem .36rem;
        padding: .2rem 0 0 .6rem;
        p{
          display: block;
          line-height: .5rem;
          font-size: .3rem;
          color: #333;
          &.add {
            line-height: .4rem;
            font-size: .28rem;
            color: #a5a5a5;
            padding-bottom: .16rem;
            border-bottom: 1px solid #d9d9d9;
          }
        }
        &.current{
           background: url("../../assets/images/location_icon_blue.png") no-repeat 0 center;
           background-size: .3rem .36rem;
         }
      }
    }
  }
</style>
