<template>
  <div class="hotel reservations">
    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">酒店专线</div>
      </div>
    </div>
    <div class="wrap">
      <h2>酒店专线</h2>
      <div class="section">
        <h3>酒店专线</h3>
        <p>
          航展公众日期间，珠海市内星程碧海酒店、度假村酒店、北京酒店和横琴湾酒店等将开通往返酒店与航展馆的酒店专线，欢迎酒店住客选择乘坐。酒店专线详情如下：
        </p>
        <table>
          <thead>
            <tr>
              <th style="width: 2rem">酒店名称</th>
              <th style="width: .8rem">班次</th>
              <th>服务时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="2">星程碧海酒店</td>
              <td rowspan="2">5</td>
              <td>去程：7:00-8:00</td>
            </tr>
            <tr>
              <td>返程：15:00-17:00</td>
            </tr>
            <tr>
              <td rowspan="2">度假村酒店</td>
              <td rowspan="2">5</td>
              <td>去程：7:15-8:15</td>
            </tr>
            <tr>
              <td>返程：15:00-17:00</td>
            </tr>
            <tr>
              <td rowspan="2">北京酒店</td>
              <td rowspan="2">5</td>
              <td>去程：7:00-8:00</td>
            </tr>
            <tr>
              <td>返程：15:00-17:00</td>
            </tr>
            <tr>
              <td rowspan="2">横琴湾酒店</td>
              <td rowspan="2">5</td>
              <td>去程：7:00-8:00</td>
            </tr>
            <tr>
              <td>返程：15:00-17:00</td>
            </tr>
          </tbody>
        </table>
        <p>
          预约免费乘坐酒店航展专线，
          <a href="javacript:;" class="link" @click="loading(3)">点此进入预约</a> 。<br />
          航展专线咨询电话：<a href="tel:12328" class="link">12328</a> 。
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "hotel",
    methods: {
      back() {
//        this.$router.push({
//          name: "index"
//        })
        this.$router.back()
      },
      loading(params) {
        if (params) {
          this.$router.push({
            name: "bus",
            params: { bustype: params }
          });
        } else {
          this.$router.push({
            name: "bus"
          });
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .reservations {
    .fix-wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      .title-wrap {
        height: 1.18rem;
        width: 100%;
        font-size: 0.36rem;
        background-image: -webkit-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -moz-linear-gradient(135deg, #42ade4, #1791de);
        background-image: -o-linear-gradient(135deg, #42ade4, #1791de);
        background-image: linear-gradient(-135deg, #42ade4, #1791de);
        position: relative;
        .icon {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0.7rem;
          background: url("../../assets/images/back02.png") no-repeat 0.3rem
            center;
          background-size: 0.32rem 0.32rem;
        }
        .txt {
          text-align: center;
          line-height: 1.18rem;
          color: #fff;
          font-size: 0.4rem;
        }
      }
    }
    .wrap {
      padding: 1.78rem 0.4rem 0;
      h2 {
        font-size: 0.48rem;
        color: #1c9ae3;
        line-height: 1.1;
        margin-bottom: 0.6rem;
      }
      .section {
        overflow: hidden;
        margin-bottom: 0.5rem;
        h3 {
          font-size: 0.36rem;
          color: #333;
          line-height: 1.1;
          margin-bottom: 0.3rem;
          font-weight: bold;
        }
        & > p {
          line-height: 0.54rem;
          color: #666666;
          font-size: 0.3rem;
          margin-bottom: 0.3rem;
        }
        & > img {
          width: 100%;
          border-radius: 0.08rem;
          margin-bottom: 0.3rem;
        }
        & > em {
          display: block;
          text-align: center;
          font-size: 0.26rem;
          line-height: 1.1;
          color: #bcbcbc;
          margin-bottom: 0.3rem;
        }
        ul {
          margin-bottom: 0.3rem;
          li {
            line-height: 0.54rem;
            color: #666;
            font-size: 0.3rem;
          }
          &.main-ul {
            li {
              span {
                float: left;
              }
            }
          }
          &.main2-ul {
            li {
              margin-bottom: 0.4rem;
            }
          }
          &.ticket-ul {
            li {
              margin-bottom: 0.2rem;
            }
          }
          &.code-ul {
            overflow: hidden;
            li {
              float: left;
              width: 52%;
              margin-bottom: 0.2rem;
              img {
                width: 2.4rem;
              }
              &:first-child {
                width: 48%;
              }
            }
          }
        }
        table {
          width: 100%;
          border-left: 1px solid #d2d2d2;
          border-top: 1px solid #d2d2d2;
          margin-bottom: 0.2rem;
        }
        table th {
          line-height: 0.4rem;
          font-size: 0.3rem;
          color: #333;
          font-weight: bold;
          background: #ebf0f1;
          padding: 0.2rem 0.08rem;
          border-right: 1px solid #d2d2d2;
          border-bottom: 1px solid #d2d2d2;
        }
        table td {
          line-height: 0.4rem;
          font-size: 0.3rem;
          color: #666666;
          background: #fff;
          padding: 0.2rem 0.08rem;
          border-right: 1px solid #d2d2d2;
          border-bottom: 1px solid #d2d2d2;
        }
        .main {
          color: #1c9ae3;
          font-weight: bold;
        }
        .link {
          color: #1c9ae3;
          text-decoration: underline;
        }
      }
    }
  }
</style>
