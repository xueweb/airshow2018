<template>
  <div class="introduction">
    <div class="fix-wrap">
      <div class="title-wrap">
        <div class="icon" @click="back">
        </div>
        <div class="txt">航展简介</div>
      </div>
    </div>
    <viewer>
      <div class="wrap">
        <h2>航展简介</h2>
        <div class="section">
          <h3>购票指引</h3>
          <p>
            本届航展公众日门票包含身份证件票和实物票，公众日门票每天8万张限量发售且展区现场不设售票点，请您提前购票并凭票预约乘坐专线大巴观展。航展官方售票链接为：
            <a href="http://piao.airshow.com.cn/" class="link">piao.airshow.com.cn</a>
          </p>
        </div>
        <div class="section">
          <h3>航展介绍</h3>
          <p>
            中国国际航空航天博览会是我国唯一由中央人民政府批准、逢双年在珠海举办的综合性国际航空航天展览，自1996年举办首届以来至今已成功举办了十一届，成为展示我国综合国防实力及军民融合成果的主窗口，促进中外军事交流和军贸合作的大平台，扬我国威、壮我军威和爱国主义教育的国家名片，现已跻身世界五大航展之列。
          </p>
          <p>本届航展启用了20个检票口，采用了人脸识别的检票方式，请您检票时取下帽子眼镜配合检票。</p>
          <img src="../../assets/images/WechatIMG15.png" alt="">
        </div>
        <div class="section">
          <h3>本届看点</h3>
          <p>
            第十二届中国航展恰逢改革开放40周年，将突出展示“一带一路”建设及军民融合发展成果。空中飞行表演和地面动态演示交相辉映，航展“陆空一体”大演示格局基本成型。届时，中国人民解放军空军“八一”飞行表演队和航空大学“红鹰”飞行表演队将前来参展。此外，沙特阿拉伯皇家空军“沙特之鹰”飞行表演队也将携9架Hawk MK 65A式教练机首次参展，为广大观众呈献精彩绝伦的飞行表演。同时，在本届航展上，ARJ21先进支线客机、波音787宽体客机等国内外明星机型也将进行性能示范飞行。本届航展精彩纷呈，值得期待！
          </p>
          <img src="../../assets/images/WechatIMG14.png" alt="">
        </div>
        <div class="section">
          <h3>举办时间</h3>
          <p>
            本届航展将于2018年11月6-11日举行，开放时间为每天9:00-17:00（6日开幕式当天，持单次专业观众证的观众请于13:00后入场）。
          </p>
          <ul class="main-ul">
            <li>
              <span class="main">★专业日：</span>
              <p style="margin-left: 5em">2018年11月6-8日，航空航天专业人士及买家凭专业观众证入场。</p>
            </li>
            <li>
              <span class="main">★公众日：</span>
              <p style="margin-left: 5em">2018年11月9-11日，社会公众凭实物票或证件票入场，门票当日有效。</p>
            </li>
          </ul>
          <p>
            提示：本届航展按日期售票，公众日每天限售8万张，且展区现场不设售票点，无票观众无法进入展区，有意向观展的观众请务必提前购票。
          </p>
        </div>
        <div class="section">
          <h3>航展地点</h3>
          <p>
            珠海国际航展中心——珠海市机场路航展馆（位于珠海机场一侧）
          </p>
        </div>
        <div class="section">
          <h3>重要活动安排</h3>
          <table>
            <thead>
              <tr>
                <th style="min-width: 4em;">时间</th>
                <th>活动名称</th>
                <th>地点</th>
                <th>主办单位</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>11月5日</td>
                <td>第九届中国国际航空航天高峰论坛</td>
                <td>市区酒店</td>
                <td>国防科工局</td>
              </tr>
              <tr>
                <td>11月5日</td>
                <td>2018中国通航发展系列活动--2018中南地区通航发展论坛</td>
                <td>九洲机场</td>
                <td>航展执委会</td>
              </tr>
              <tr>
                <td>11月5日 9:00-11:00</td>
                <td>中国航空工业集团有限公司新闻发布会</td>
                <td>珠海德翰大酒店</td>
                <td>中国航空工业集团有限公司</td>
              </tr>
              <tr>
                <td>11月5日晚</td>
                <td>2018通航之夜</td>
                <td>九洲机场</td>
                <td>广东省通航协会、广东省无人机协会</td>
              </tr>
              <tr>
                <td>11月6日</td>
                <td>第十二届中国国际航空航天博览会开幕式</td>
                <td>航展中心</td>
                <td>航展组委会</td>
              </tr>
              <tr>
                <td>11月6日</td>
                <td>第十二届中国航展重大项目签约仪式</td>
                <td>新闻中心</td>
                <td>航展组委会</td>
              </tr>
              <tr>
                <td>11月6日下午</td>
                <td>2018 中国通航发展系列活动--无人机创新发展研讨会</td>
                <td>新闻中心会议室</td>
                <td>航展组委会</td>
              </tr>
              <tr>
                <td>11月6日 19:30-21:00</td>
                <td>第十三届月桂奖颁奖晚会</td>
                <td>珠海电视台</td>
                <td>中航出版传媒有限责任公司</td>
              </tr>
              <tr>
                <td>11月6-8日</td>
                <td>第十二届中国航展B TO B商洽会</td>
                <td>航展中心航空航天馆202-207</td>
                <td>珠海航展有限公司</td>
              </tr>
              <tr>
                <td>11月7日下午</td>
                <td>粤港澳大湾区公务机构协同发展及运营安全专业论坛</td>
                <td>航天航空馆213室</td>
                <td>珠海航展有限公司<br />珠海机场管理有限公司<br />香港商用航空中心（中国）有限公司</td>
              </tr>
              <tr>
                <td>11月7日晚</td>
                <td>第十二届中国航展参展商联谊会</td>
                <td>珠海国际航海文化中心</td>
                <td>珠海航展有限公司</td>
              </tr>
            </tbody>
          </table>
          <p>
            注：以上信息如有变化，请以当天公布的安排为准。
          </p>
        </div>
        <div class="section">
          <h3>展馆展台</h3>
          <p>本届中国航展设有航空航天馆（1-7号馆）、中国兵器馆（8号馆）两个固定展馆，同时搭建了9号、10号两个临时展馆。航空航天馆序号分为1-7号，展览面积约6.6万平方米。中国民航、航空工业、中国商飞、航天科技、航天科工、电子科技、中国航发、电子信息分别分布在该展馆的1号馆、2号馆、3号馆、4号馆、7号馆。波音、空客等国际知名企业，以及俄罗斯、加拿大等国家展团集中在3号馆、4号馆、5号馆内，航空航天馆集中展示国内外航空航天及防务领域的高、精、尖展品及技术。</p>

          <img src="../../assets/images/21543819718_.pic_hd.jpg" alt="">
          <p>早鸟票开抢时间为：9月13日 10:30</p>
          <p> 非早鸟票本届航展仍实行公众日（11月9、10、11日）每天限售8万张门票的措施，共分两个阶段销售：</p>
          <p> 第一阶段：2018年9月至10月</p>
          <p> 9月上旬首先在官方售票平台上线发售各票种的身份证件票，推出“早鸟票”限量抢购优惠活动；</p>
          <p>9月中旬增加一级代理商全渠道销售身份证件票；</p>
          <p> 10月初全渠道加推各票种实物票上线发售。</p>
          <p>  第二阶段：2018年11月2日至11月11日</p>
          <p> 所有线上售票平台停售实物门票，仅售身份证件票。</p>
          <p>代理商线下实体店可以继续销售实物门票</p>
        </div>
        <div class="section">
          <h3>展票介绍</h3>
          <p style="margin-bottom: .1rem">
            本届航展公众日门票包含实物票及证件票：
          </p>
          <ul class="ticket-ul">
            <li>
              <span class="main">个人票</span>
              <p>实物票550元/张，证件票500元/张；</p>
            </li>
            <li>
              <span class="main">长者学生儿童票</span>
              <p>实物票与证件票同价：350元/张；</p>
            </li>
            <li>
              <span class="main">个人票+地面装备动态演示区套票</span>
              <p>仅设实物票：650元/套；</p>
            </li>
            <li>
              <span class="main">长者学生儿童票+地面装备动态演示区套票</span>
              <p>仅设实物票：450元/套；</p>
            </li>
            <li>
              <span class="main">团体票</span>
              <p>适用于旅行社组织15人以上团队人员使用，限用导游或领队的身份证件按团队人数,统一出票及入场，随旅行团直达航展馆，无需接驳换乘。</p>
            </li>
            <div style="text-align: center">
              <img src="../../assets/images/131543992031_.pic_hd.jpg" alt="" width="330">
            </div>
          </ul>
        </div>
        <div class="section">
          <h3>航展官方售票平台</h3>
          <p>
            1）
            <a href="http://www.airshow.com.cn/" class="link">www.airshow.com.cn</a> 或
            <a href="http://piao.airshow.com.cn" class="link">piao.airshow.com.cn</a> 官网；
            <br />
            2）“珠海航展官方商城”微信小程序；
            <br />
            3）“中国航展”或“珠海航展官方售票平台”微信公众号。
          </p>
          <ul class="code-ul">
            <li>
              <img src="../../assets/images/code_03.png" alt="">
              <p>中国航展官方微信</p>
            </li>
            <li>
              <img src="../../assets/images/code02_03.png" alt="">
              <p>珠海航展官方售票平台</p>
            </li>
          </ul>
        </div>
        <div class="section">
          <h3>票务咨询电话：</h3>
          <p>
            <a href="tel:400-8800-113" class="link">400-8800-113</a> 或
            <a href="tel:0756-3375371" class="link">0756-3375371</a>
          </p>
        </div>
      </div>
    </viewer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'introduction',
    methods: {
      back() {
//        this.$router.push({
//          name: "index"
//        })
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="less">
  .introduction {
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
          background: url("../../assets/images/back02.png") no-repeat 0.3rem center;
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
