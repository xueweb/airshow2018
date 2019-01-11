<template>
  <div class="list">
    <ul>
      <li v-for="item in list" @click="selectItem(item)">{{item.title}}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'list',
    methods:{
      selectItem(item){
        this.$emit("query",item)
      }
    },
    props: {
      list: {
        type: Array,
        default: function () {
          return []
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .list {
    z-index: 9999;
    font-size: .3rem;
    position: absolute;
    left: .6rem;
    right: .6rem;
    top: 50%;
    transform:translate(0,-50%);
    ul {
      background: #fff;
      padding: .4rem .3rem;
      border-radius: .08rem;
      box-shadow: 0 .23rem .8rem rgba(25,27,28,.2);
    }
    li {
      line-height: .86rem;
      color: #333;
      font-size: .3rem;
    }
  }

</style>
