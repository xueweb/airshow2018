<template>
  <transition name="slide">
    <div class="bus-time">
      <div class="cont">

        <div class="title-wrap">
          <div class="icon" @click="back">
          </div>
          <div class="txt">{{$t("msg.PassengersSelection")}}</div>
        </div>

        <div class="add-ticket" v-show="flag">
          <p class="passenger">{{$t("msg.Passengers")}}</p>
          <div class="ticket-box">
            <p>{{$t("msg.Notickets")}}</p>
            <button class="btn" @click="showTicket">+ {{$t("msg.Taptoaddtickets")}}</button>
          </div>
        </div>

        <confirmBox ref="confirmBox" @add="showAdd" @select="backSelcet"></confirmBox>

        <!--生成电子票-->
        <ticket ref="ticket" @next="select" @add="add" :mydata="mydata"></ticket>

        <div v-show="listFlag&&result.length">
          <div class="main-wrap">
            <div class="title">
              <span>{{$t("msg.ninepepol")}}</span>
              <em @click="showTicket">+{{$t("msg.Addtickets")}} </em>
            </div>
            <ul class="list">
              <li v-for="(item,index) in result">
                <div class="con-l">
                  <label class="my_protocol">
                    <input class="input_agreement_protocol"
                           type="checkbox"
                           v-model="checkedNames"
                           :id="item.id"
                           :value="item"/>
                    <span></span>
                  </label>
                </div>
                <div class="con-r">
                  <label :for="item.id">
                    <p class="time">{{item.ticketDate}}</p>
                    <p class="person">{{$t("msg.Singleticketperson")}}</p>
                    <span>ID：<em>{{item.ticketNumber}}</em></span>
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div class="text">
            <p>{{$t("msg.date")}}</p>
            <div class="data" v-html="data"></div>
            <p>{{$t("msg.tel")}}</p>
            <input class="phone-number" type="text" :placeholder="placeholder" v-model="phone">
          </div>
          <div class="btn-wrap">
            <span class="error-tip" v-text="tip"></span>
            <button type="button" class="btn" @click="loginDetail">确认预约</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import ticket from 'base/ele-ticket/ele-ticket'
  import confirmBox from 'base/confirm-box/confirm-box'
  import {baseurl} from "common/js/config";
  import http from 'api/https'
  import {mapMutations, mapGetters} from "vuex"
  import {isAllEqual} from 'common/js/debounce'

  export default {
    name: 'bus-time',
    data() {
      return {
        mydata: [],
        value: [],
        flag: true,
        secondFlag: false,//第二次弹窗
        listFlag: false,
        result: [],
        checkedNames: [],
        phone: '',
        user: [],
        data: "",
        tip: "",
        currentIndex: 0,
        checklist: [],
        createcodeflag: 1,
        params: this.$route.params.bustype || "",
        placeholder: "请输入电话号码"
      }
    },
    created() {
      this.init();
      this.initlag()
    },
    mounted() {
      console.log(this.getticket);
      console.log(this.params);
    },
    components: {
      ticket,
      confirmBox
    },
    computed: {
      ...mapGetters(['getticket', 'getid']),
    },
    watch: {
      result: function (a) {
        const _this = this;
        if (a) {
          //默认
          _this.checkedNames = [];
          _this.checkedNames.push(a[0]);
        }

      },
      checkedNames: function (newName, b) {
        console.log(b);
        if (newName) {
          this.createcodeflag = 1;
          if (newName[0].ticketDate) {
            // debugger
            console.log(newName[0].ticketDate);
            this.data = newName[0].ticketDate
          }
        }
      }
    },
    methods: {
      initlag() {
        if (this.$i18n.locale === 'EN') {
          this.placeholder = "Please input the telephone"

        }
      },
      gettime() {
        let nowtime = this.checkedNames;
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          //安卓
          if (nowtime[0]) {
            let dependedVal = nowtime[0].ticketDate;
            console.log(dependedVal)
            let regEx = new RegExp("\\-", "gi");
            dependedVal = dependedVal.replace(regEx, "/");
            console.log(dependedVal)
            let milliseconds = Date.parse(dependedVal) + 1000 * 12 * 60 * 60;
            console.log(milliseconds)
            let timestamp = Date.parse(new Date());
            console.log(timestamp);
            return milliseconds - timestamp
          }
        } else {
          let dependedVal = nowtime[0].ticketDate;
          console.log(dependedVal.indexOf("."))
          dependedVal = dependedVal.replace(/\./g, "/");
          let milliseconds = new Date(dependedVal).valueOf() + 1000 * 12 * 60 * 60;
          console.log(milliseconds)
          let timestamp = Date.parse(new Date());
          return milliseconds - timestamp

        }
      },
      backSelcet() {
        if (this.secondFlag === true) {
          this.flag = false
        } else {
          this.flag = true
        }
      },
      init: async function () {
        const url = `${baseurl}/booking/getTickets.do`;
        let params = {};
        const res = await http.get(url, params);
        console.log(res);
        if (res.data.code === "200") {
          const result = res.data.data.tickets;
          if (result.length > 0) {
            // console.log(result);
            this.flag = false;
            this.secondFlag = true
            this.initfn()
          } else {
            this.flag = true
          }
        }
      },
      initfn() {
        //如果用户口已加入了电子票时
        this.$refs.confirmBox.hide();
        this.flag = false;
        this.listFlag = true;
        this.getlist();
        this.$refs.ticket.hide();

      },
      getlist: async function () {
        const url = `${baseurl}/booking/getTickets.do`;
        let params = {};
        const res = await http.get(url, params);
        // console.log(res);
        if (res.data.code === "200") {
          this.result = res.data.data.tickets;
        }
      },
      add() {
        this.$refs.ticket.hide();
        this.$refs.confirmBox.show();

      },
      select() {
        this.flag = false;
        this.$refs.ticket.hide();
        this.listFlag = true;
        //渲染列表
        this.getlist()
      },
      showAdd(type, number) {
        //请求接口
        this.confirm(type, number);
      },
      //序列化数据
      normalLize(list) {
        if (!list) return
        let map = [];
        list.forEach((item, index) => {
          map.push({
            time: item.ticketDate.substring(5),
            len: index + 1
          })
        });
        return map
      },
      confirm: async function (type, number) {
        const url = `${baseurl}/booking/createETicket.do`;
        let params = {
          type,
          number
        };
        const res = await http.post(url, params);
        if (res.data.code === "200") {
          console.log(res);
          let item = this.noarmalchecklist(res.data.data)
          for (let i in item) {
            this.checklist.push(item[i]);
          }
          this.mydata = this.normalLize(res.data.data);
          //  console.log(this.mydata)
          this.$refs.confirmBox.hide();
          this.$refs.ticket.show();
        }
        if (res.data.code === "500") {
          const _this = this;
          if (_this.$i18n.locale === "EN") {
            this.$refs.confirmBox.tip = 'No relevant information was found.';
          } else {
            this.$refs.confirmBox.tip = '没有查到相关信息！';

          }
          setTimeout(() => {
            _this.$refs.confirmBox.tip = ''
          }, 3000)
        }
      },
      noarmalchecklist(list) {
        let arr = []
        for (let i in list) {
          arr.push({
            delFlag: 0,
            id: list[i].id,
            status: list[i].status,
            ticketDate: list[i].ticketDate,
            ticketNumber: list[i].ticketNumber,
            ticketType: list[i].ticketType
          })
        }
        return arr
      },
      showTicket() {
        this.$refs.confirmBox.show();
        this.flag = false
      },
      back() {
        if (this.params) {
          this.$router.push({
            name: "bus",
            params: {bustype: this.params}
          })
        } else {
          this.$router.push({
            name: "bus",
          })
        }

      },
      featchData: async function () {
        //防止重复点击
        //this.createcodeflag++;
        if (this.createcodeflag >= 3) return;
        const arr = [];
        for (let i in this.checkedNames) {
          arr.push(JSON.stringify(this.checkedNames[i].id)); //属性
        }
        const url = `${baseurl}/booking/createQrCode.do`;
        let params = {
          ridePointId: this.getid ? this.getid : this.result[0].id,//
          eTicketsIds: arr, //选中票ID
          bookingDate: this.checkedNames[0].ticketDate.replace("-", ".").replace("-", "."),//订票日期
          phone: this.phone //电话
        };
        console.log(params)
        if (this.checkedNames.length) {
          console.log(this.data);
          for (let i in this.checkedNames) {
            if (this.data !== this.checkedNames[i].ticketDate) {

              if (this.$i18n.locale === "EN") {
                this.tip = 'Please choose the same date';
              } else {
                // this.$refs.confirmBox.tip = '没有查到相关信息！';
                this.tip = '请选择观展日期相同的展票';
              }
              setTimeout(() => {
                this.tip = ''
              }, 2000);
              return
            }
          }
           if (false) {
          //if (this.gettime() <= 0) {

            if (this.$i18n.locale === "EN") {
              this.tip = 'This ticket is overdue and cannot be booked.';
            } else {
              // this.$refs.confirmBox.tip = '没有查到相关信息！';
              //   this.tip = '请选择观展日期相同的展票';
              this.tip = "此票已过期，无法预约";

            }
            setTimeout(() => {
              this.tip = ""
            }, 3000)

          } else {
            const res = await http.post(url, params);
            console.log(res)
            if (res.data.code === "801") {
              const _this = this;
              this.tip = '请选择观展日期相同的展票';
              setTimeout(() => {
                _this.tip = ''
              }, 2000)
            } else if (res.data.code === "200") {
              this.setUser(res.data.data);
              // 请求接口
              this.set(false)
              this.$router.push({
                name: "appointment"
              });
            }
          }
        }


      },
      getDate1() {
        let t = new Date();
        let now = t.toLocaleTimeString().replace(/^\D*/, '')
        let num = now.indexOf(' ');
        let time = now.substring(0, num) + "12:00:00";
        return time;
      },
      dateDiff(date1, date2) {
        let type1 = typeof date1, type2 = typeof date2;
        // debugger
        if (type1 === 'string')
          date1 = this.stringToTime(date1);
        else if (date1.getTime)
          date1 = date1.getTime();
        if (type2 === 'string')
          date2 = this.stringToTime(date2);
        else if (date2.getTime)
          date2 = date2.getTime();
        return (date1 - date2) / 1000;//结果是秒
      },
      stringToTime(string) {
        let f = string.split(' ', 2);
        let d = (f[0] ? f[0] : '').split('//', 3);
        let t = (f[1] ? f[1] : '').split(':', 3);
        return (new Date(
          parseInt(d[0], 10) || null,
          (parseInt(d[1], 10) || 1) - 1,
          parseInt(d[2], 10) || null,
          parseInt(t[0], 10) || null,
          parseInt(t[1], 10) || null,
          parseInt(t[2], 10) || null
        )).getTime();
      },
      loginDetail() {
        //alert(1)
        if (this.checkedNames.length) {
          //判断是不是同一个日期
          if (this.phone) {
            if (this.checkedNames.length) {
              window.localStorage.removeItem('phone');
              window.localStorage.setItem('phone', this.phone);
              this.setbackindex(0)
              this.featchData()
            }
          } else {
            const _this = this;
            if (_this.$i18n.locale === "EN") {
              _this.tip = "Mobile phone number cannot be empty"
            } else {
              this.tip = "手机号码不能为空";

            }

            setTimeout(() => {
              _this.tip = ""
            }, 3000)
          }
        } else {
          if (this.$i18n.locale === "EN") {
            this.tip = "Please add at least one passenger"
          } else {
            this.tip = "请至少添加一名乘车人";

          }
          setTimeout(() => {
            this.tip = ""
          }, 3000)
        }

      },
      ...mapMutations({
        setUser: 'SET_USER',
        set: 'set',
        setbackindex: "SET_BACK_INDEX"


      })
    }
  }
</script>
<style scoped lang="less">
  /*.slide-enter-active, .slide-leave-active {*/
  /*transition: all 0.3s*/
  /*}*/

  /*.slide-enter {*/
  /*transform: translate3d(100%, 0, 0)*/
  /*}*/

  .bus-time {
    .cont {
      width: 100%;
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
      .add-ticket {
        margin: 1.68rem .3rem .3rem;
        .passenger {
          color: #a5a5a5;
          font-size: .28rem;
          line-height: 1.1;
          margin-bottom: .24rem;
        }
        .ticket-box {
          background: #fff;
          box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .4);
          height: 3rem;
          width: 100%;
          text-align: center;
          font-size: .3rem;
          p {
            padding-top: .8rem;
            color: #666;
            font-size: .3rem;
            margin-bottom: .22rem;
          }
          .btn {
            height: .8rem;
            padding: 0 .4rem;
            background-image: -webkit-linear-gradient(135deg, #2eaaf2, #1c9ae3);
            background-image: -moz-linear-gradient(135deg, #2eaaf2, #1c9ae3);
            background-image: -o-linear-gradient(135deg, #2eaaf2, #1c9ae3);
            background-image: linear-gradient(-135deg, #2eaaf2, #1c9ae3);
            box-shadow: 0 .1rem .3rem rgba(23, 145, 222, .4);
            outline: none;
            border: none;
            border-radius: .6rem;
            color: #fff;
            font-size: .3rem;
          }
        }
      }
      .main-wrap {
        margin: 1.68rem .3rem 0;
        .title {
          color: #a5a5a5;
          font-size: .28rem;
          line-height: 1.1;
          margin-bottom: .24rem;
          overflow: hidden;
          span {
            float: left;
          }
          em {
            float: right;
            color: #1c9ae3;
          }
        }
        .list {
          font-size: .3rem;
          margin-bottom: .4rem;
          li {
            display: flex;
            margin-bottom: .3rem;
            background: #fff;
            box-shadow: 0 .1rem .4rem rgba(207, 215, 219, .4);
          }
          .con-l {
            flex: 0 0 1.04rem;
            position: relative;
            border-right: 1px dashed #d0e6f9;
            .my_protocol {
              position: absolute;
              top: 0;
              right: 0;
              left: 0;
              bottom: 0;
              .input_agreement_protocol {
                -webkit-appearance: none;
                outline: none;
                display: none;
                text-align: center;
              }
              span {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: .44rem;
                height: .44rem;
                box-sizing: border-box;
                border: 1px solid #bebebe;
                border-radius: 50%;
                background: #fff;
              }
              .input_agreement_protocol:checked + span {
                border: 1px solid #1c9ae3;
                background: #1c9ae3 url("../../assets/images/gou_icon.png") no-repeat center center;
                background-size: cover;
              }
            }
          }
          .con-r {
            flex: 1;
            label {
              display: block;
              padding: .2rem .3rem;
              line-height: .5rem;
              font-size: .3rem;
              p {
                display: block;
                color: #333;
              }
              span {
                display: block;
                color: #a5a5a5;
              }
            }
          }
        }
      }

      .text {
        padding: .26rem 0.3rem 0;
        font-size: 0;
        p {
          color: #a5a5a5;
          font-size: .28rem;
          line-height: 1.1;
          margin-bottom: .04rem;
        }
        .data {
          width: 100%;
          height: .8rem;
          color: #333;
          font-size: .33rem;
          line-height: .8rem;
          border-bottom: 1px solid #e2e2e2;
          background: #fff;
          margin-bottom: 0.4rem;
        }
        .phone-number {
          width: 100%;
          height: .8rem;
          color: #333;
          font-size: .33rem;
          line-height: .8rem;
          border: none;
          border-bottom: 1px solid #e2e2e2;
          background: #fff;
          margin-bottom: 0.4rem;
          border-radius: 0;
          padding: 0;
        }
      }
      .btn-wrap {
        text-align: center;
        margin: .3rem;
        font-size: 0;
        .btn {
          width: 100%;
          height: .86rem;
          background: #1c9ae3;
          color: #fff;
          font-size: .34rem;
          line-height: .86rem;
          outline: none;
          border: none;
          border-radius: .08rem;
        }
        .error-tip {
          display: block;
          height: .3rem;
          text-align: center;
          color: #dc4444;
          font-size: .3rem;
          line-height: 1.1;
          padding-bottom: 0.3rem;
        }
      }
    }
  }

</style>
