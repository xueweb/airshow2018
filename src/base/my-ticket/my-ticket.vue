<template>
    <ul class="my-ticket">
      <li v-for="item in result">
        <span>{{item.ticketDate}}</span>
        <span>单人票-1人</span>
        <em>ID:{{item.ticketNumber}}</em>
      </li>
    </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'my-ticket',
    created(){
      console.log(this.result)
    },
    props: {
      result: {
        type: Array,
        default: (() => {
          return []
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .my-ticket{
    padding: 1.68rem 0 .3rem;
    li{
      margin: 0 .3rem .3rem;
      border-left: .1rem solid #1c9ae3;
      background: #fff;
      box-shadow: 0 .1rem .4rem rgba(207,215,219,.4);
      padding: .3rem;
      span{
        display: block;
        line-height: .5rem;
        color: #333;
        font-size: .32rem;
      }
      em{
        display: block;
        padding-top: .4rem;
        font-size: .3rem;
        color: #a5a5a5;
        line-height: 1.1;
      }
    }
  }

</style>
