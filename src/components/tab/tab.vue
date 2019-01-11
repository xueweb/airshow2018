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
  import {mapMutations, mapGetters} from 'vuex'
  import store from 'store'

  export default {
    name: 'tab',
    data() {
      return {
        a: {id: 1}
      }
    },
    computed: {
      ...mapGetters(['setaddress'])
    },
    methods: {
      ...mapMutations({
        getid: 'GET_GITID',
        setquery: "SET_QUERY",
        set: "set",

      }),
      selectItem(item) {
        if (item.id === 1) {
          this.$router.push({
            name: "bus"
          })
        } else if (item.id === 2) {
          this.$router.push({
            name: "navigation"
          })
          store.remove('user');
          this.setquery(1)
          this.getid(this.a);
          this.set(true)

          // alert(1)
          //debugger
        } else if (item.id === 3) {
          // store.remove('result')
          const result = this.setaddress;
          console.log(result)
          //debugger
          if (result.id) {
           // alert(1)
           // console.log(result);
            this.$router.push({
              name:"packing-detail"
            })

          } else {
            this.$router.push({
              name: "parking"
            })

          }
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
        default: ''
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
          /*background: url("../../assets/images/bigicon_32.png") no-repeat center center;*/
          background-size: cover;
        }
        :nth-child(2) {
          background-size: cover;
          margin-right: 0;
          visibility: hidden;
        }
      }
    }

  }

</style>
