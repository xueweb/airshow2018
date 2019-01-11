<template>
  <div class="modal" v-show="flag">
    <div class="model-wrap" @click.stop="toggleModal"></div>
    <scroll class="box" :style="style" :data="list" ref="scroll">
      <div>
        <div v-show="list.length">
          <ul>
            <li v-for="item of list" @click="selectItem(item)">
              {{item.name}}<span v-if="item.city">({{item.city}})</span></li>
          </ul>
        </div>
        <div style="padding: .4rem .3rem;line-height: .86rem;color: #666;font-size: .3rem;" v-show="!list.length">
          数据加载中……
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from 'base/scroll/scroll'

  export default {
    name: 'modal',
    data() {
      return {
        flag: false
      }
    },
    components: {
      scroll
    },
    computed: {
      style() {
        if (this.list.length > 9) {
          // debugger
//          return 'height:7rem; overflow: hidden;'
        };
      }
    },
    created() {
      console.log(this.list)
    },
    methods: {
      refresh() {
        console.log(this.$refs.scroll)
        this.$refs.scroll.refresh();
      },
      selectItem(item) {
        const _this = this
        this.$emit("selcetItem", item);
        this.hide();
        setTimeout(() => {
          _this.$refs.scroll.refresh();
        }, 200);
        //this.refresh()
      },
      toggleModal() {
        this.flag = !this.flag
      },
      show() {
        this.flag = true
      },
      hide() {
        this.flag = false
      }
    },
    props: {
      list: {
        type: Array,
        require: true,
        default: () => {
          return []
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .modal {
    z-index: 999999 !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .model-wrap {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #414c53;
      opacity: .5;
    }
    .box {
      position: absolute;
      left: .6rem;
      right: .6rem;
      top: 50%;
      transform: translate(0, -50%);
      background: #fff;
      box-shadow: 0 .23rem .8rem rgba(25, 27, 28, .2);
      border-radius: .08rem;
      z-index: 999 !important;
      max-height: 90%;
      overflow: hidden;
      overflow-y: auto;
      ul {
        padding: .4rem .3rem;
        li {
          line-height: .86rem;
          color: #333;
          font-size: .3rem;
        }
      }

    }
  }

</style>
