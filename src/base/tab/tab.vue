<template>
  <div class="tab">
    <ul v-for="item in tabData ">
      <li>
        <div class="title">{{item.title}}</div>
        <div class="item">
          <ul>
            <li v-for="itemname in item.data" @click="selectItem(itemname)">
              <img :src="itemname.img" alt="" style="width: 100%;height: 100%">
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  export default {
    name: 'tab',
    data() {
      return {
        a: {id: 1}
      }
    },
    methods: {
      ...mapMutations({
        flag: 'FLAG',
        user: 'SET_USER',
        setquery:"SET_QUERY",
        set:'set',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setposition: 'SETPOSITION'
      }),
      selectItem(item) {
        if (item.id === 1) {
          this.$router.push({
            name: "bus"
          });
          this.flag(true)
        } else if (item.id === 2 || item.id === 3) {
          this.$router.push({
            name: "navigation"
          });
          this.user(this.a)
          this.setquery(1)
          this.set(true)
          this.setposition(null)
          this.setCurrentIndex(0)
        } else if (item.id === 4) {
          this.$router.push({
            name: "parking"
          })
        }
      }
    },
    props: {
      tabData: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ""
      }
    }
  }
</script>
<style scoped lang="less">
  .tab {
    width: 100%;
    margin-bottom: .5rem;
    .title {
      font-size: .34rem;
      color: #666;
      margin-bottom: .3rem;
    }
    .item {
      font-size: .5rem;
      ul {
        display: flex;
        li {
          flex: 1;
          height: 1.85rem;
          margin-right: .3rem;
          border-radius: .08rem;
          /*box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .4);*/
          box-shadow: 0 .1rem .5rem rgba(207, 215, 219, .4);
        }
        :nth-child(1) {
          /*background: url("../../assets/images/bigicon_12.png") no-repeat center center;*/
          background-size: cover;
          /*box-shadow: 0 .1rem .3rem rgba(23, 145, 222, .4);*/
        }
        :nth-child(2) {
          /*background: url("../../assets/images/bigicon_22.png") no-repeat center center;*/
          background-size: cover;
          margin-right: 0;
        }
      }
    }

  }

</style>
