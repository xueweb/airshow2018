<template>
  <div class="login">

    <div class="title-wrap">
      <div class="icon" @click="back">
      </div>
      <div class="txt">登录</div>
    </div>

    <div class="wrap">
      <h1>站场工作人员登录</h1>
      <div class="cont">
        <form>
          <div>
            <span class="space">账号:</span>
            <input type="text" v-model="username" placeholder="请输入账号" class="username">
          </div>
          <div>
            <span class="space">密码:</span>
            <input type="password" v-model="userpas" placeholder="请输入密码" class="username">
          </div>
        </form>
      </div>
      <div class="btn-wrap">
        <p class="error-tip" v-html="txt"></p>
        <button type="button" class="btn" @click="login">开始工作</button>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import http from "api/https"
  import {baseurl} from "common/js/config";

  export default {
    name: 'login',
    data() {
      return {
        // username: 'myadmin',
        //userpas: 'admin',
        username: '',
        userpas: '',
        txt: ""
      }
    },
    methods: {

      getData: async function () {
        const url = `${baseurl}/worker/login.do`;
        let params = {
          username: this.username,
          password: this.userpas
        };
        const res = await http.post(url, params);
        console.log(res);
        if (res.data.code === "200") {
          if (res.data.data === 'vip') {
            this.$router.push({
              //todo 根据登录账号的权限不同，跳转至对应的页面，backIndex是普通工作人员的界面，backIndexSup是超级工作人员的界面
              //  name: 'backIndex'
              name: 'backIndexSup'
            });

          } else {
            this.$router.push({
              //todo 根据登录账号的权限不同，跳转至对应的页面，backIndex是普通工作人员的界面，backIndexSup是超级工作人员的界面
              name: 'backIndex'
            });

          }
        } else {
          const that = this
          this.txt = "账号或密码错误";
          setTimeout(() => {
            that.txt = ""
          }, 2000)
        }
      },
      back() {
        this.$router.push({
          name: 'index'
        })
      },
      login() {
        // console.log(this.userpas);
        // console.log(this.password);
        if (!this.username || !this.userpas) {
          const that = this;
          this.txt = "账号、密码不能为空";
          setTimeout(() => {
            that.txt = ""
          }, 2000)
        } else {
          this.getData()
        }

      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .login {
    .title-wrap {
      height: 1.18rem;
      background-image: -webkit-linear-gradient(135deg, #42ade4, #1791de);
      background-image: -moz-linear-gradient(135deg, #42ade4, #1791de);
      background-image: -o-linear-gradient(135deg, #42ade4, #1791de);
      background-image: linear-gradient(-135deg, #42ade4, #1791de);
      width: 100%;
      font-size: 0.36rem;
      position: relative;
      .icon {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0.7rem;
        background: url("../../assets/images/back02.png") no-repeat 0.3rem center;
        background-size: 0.32rem 0.32rem;
      }
      .txt {
        text-align: center;
        line-height: 1.2rem;
        color: #fff;
        font-size: 0.4rem;
      }
    }
    .wrap {
      padding-top: .8rem;
      h1 {
        line-height: .8rem;
        font-size: .5rem;
        color: #1c9ae3;
        margin: 0 .3rem .5rem;
      }
      .cont {
        margin-bottom: .3rem;
        form {
          div {
            padding: 0 0.3rem;
            font-size: 0;
            span {
              display: block;
              color: #a5a5a5;
              font-size: .28rem;
              line-height: 1.1;
              margin-bottom: .04rem;
            }
            input {
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
        }
      }
      .btn-wrap {
        text-align: center;
        font-size: 0;
        margin: 0 .3rem .3rem;
        .error-tip {
          text-align: center;
          color: #dc4444;
          font-size: 0.3rem;
          line-height: 0.7rem;
          height: 0.7rem;
        }
        .btn {
          width: 100%;
          height: 0.86rem;
          background: #1c9ce3;
          outline: none;
          border: none;
          border-radius: 0.08rem;
          color: #fff;
          font-size: 0.32rem;
        }
      }
    }
  }
</style>
