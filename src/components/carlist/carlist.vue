<template>
  <div class="list-center " ref="carlist">
    <div class="title">专线巴士列表</div>
    <ul>
      <li @click="selcetItem(item)" v-for="item in carlist" :class="{active:item.status!==1}">
        <p>{{item.carNumber}}</p>
        <span>{{item.seating}}座</span>
        <em>{{item.status===1?"等待发车 >":item.status===2?"已发车":item.status===3?"已到达":"已返程"}}</em>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

  export default {
    name: 'carlist',
    components: {
      scroll
    },
    props: {
      carlist: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    computed: {
      listItem() {
        let arr = [];
        this.carlist.forEach((item, index) => {

        })
      }
    },
    methods: {
      ...mapMutations({
        setstate: 'SET_STATE'
      }),
      selcetItem(item) {
        //临时取消状态限定，即所有状态的车辆都可以进行发车汇报
        //if (item.status !== 1) return
        this.$router.push({
          name: 'buslist'
        });
        this.setstate(item)
      },
      back() {
        this.$router.push({
          name: 'backIndex'
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .list-center {
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
        box-shadow: 0 .1rem .4rem rgba(218,219,219,.4);
        border-radius: .08rem;
        font-size: 0;
        p{
          font-size: .36rem;
          color: #333;
          line-height: 1.1;
          margin-bottom: .1rem;
        }
        span{
          font-size: .28rem;
          color: #828282;
          line-height: 1.1;
        }
        em{
          position: absolute;
          right: .3rem;
          top: 50%;
          text-align: right;
          transform: translate(0,-50%);
          font-size: .3rem;
          color: #f36707;
        }
        &.active em{
          color: #a5a5a5;
        }
      }
    }
  }
</style>
