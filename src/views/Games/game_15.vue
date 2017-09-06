pc_timepc_time// 主页
<template>
<div>


  <dailog-q :type_code="type_code" :game_code="game_code" :money="money_s" :round="round" :lotteryM="objects" v-if="showDailogQ" v-on:listenToChildEvent="showMsgFromChild"></dailog-q>


  <lotteryHeader :title="title" :game_code="game_code" @regulation_click="regulation_control=true" ></lotteryHeader>
  <!-- <drawer v-show="showDrawer"></drawer> -->

  <!-- <dailog-q v-if="showDailogQ" :titleDate="titleDate" v-on:listenToChildEvent="changeDate"></dailog-q> -->

  <lotteryArea :lotteryObj="body"  :zMoney= "zMoney" :endtime="endtime" :fentime="fentime" v-if="isOk"></lotteryArea>

  <div class="lottery_nav_bar">
    <ul>
      <button class="trapezoid color1" v-for="(item,i) in shuju" :class="{active8:item.isCheck}" @click="changeDate(item,i)">
        <span>{{item.name}}</span>
      </button>
    </ul>
  </div>

  <section class='bet pcdd pcdd_hh' ref="seller">
    <!--<button @click="submite()" type="button">tijiao</button>-->
    <ul>
      <li v-for="(item,j) in lotteryList.body">
        <span class="colortitle">{{item._name}}</span>
        <ul>
          <li v-for="(item,i) in item.list">

            <button class="color4" :class="{active3:item.isCheck}" @click="isCheck(j,i,item)" :disabled="fengpan||round=='loading'">
              <span>{{item.name}}</span>
              <span class="odd">{{(fengpan||round=='loading')?"封盘":item.odds}}</span>
              </button>
          </li>
        </ul>
      </li>
    </ul>

  </section>
    <section class="bet_bar">
     <div>
        <i class=" iconfont_reset"></i>
        <span class="qin" @click="qingkong">重置</span>
      </div>
      <div><input type="number" v-model="money_s" placeholder="输入金额" @input="changes_m()" min="1"/></div>
      <div><button  :class="{color1:isBlue}" type="button" :disabled="!isBlue" @click="subMit">确认下注</button><span class="color_shuzi" v-show="xshuzi>0">{{xshuzi}}</span></div>

    </section>

  <!-- <foot-guide></foot-guide> -->
  <div :style='de?"display:block":"display:none"' style="position: fixed;top:0;left:0;background:#000;opacity:.8;width:100%;height:100%;z-index:6">
    <div style='position: fixed;top:50%;left:50%;width:40px;height:40px;margin:-20px 0 0 -20px;'>
      <mu-circular-progress style="" :size="40" />
    </div>
  </div>

    <div v-show="regulation_control" class="regulation">
      <div>
        <div class="header_regu">
          <div></div>
          <h5>PC蛋蛋</h5>
          <div></div>
        </div>
        <div>
          <p>以下所有投注皆含本金。</p>
        </div>
        <div>
          <p>「PC蛋蛋（幸运28）」按北京快乐8的开奖结果为基础</p>
        </div>
        <div>
          <p>北京快乐8开奖结果，每日179期，每天9:00 - 23:55，每5分钟公布一次北京快乐8开奖结果。</p>
        </div>
        <div>
          <p>排序后,分别按号码第 1~6 , 7~12 , 13~18 分为【1】【2】【3】三个区；</p>
        </div>
        <div>
          <p>「把每个区的数字分别相加：三个数值相加求余即为幸运28最终的开奖结果。</p>
        </div>
        <div>
          <p>例如北京快乐8开奖结果为：01,02,04,08,15,16, 25,31,40,41,43,47, 55,56,59,66,69,74, 78,79</p>
        </div>
        <div>
          <p>开奖结果即为：6,7,9;</p>
        </div>
        <div>
          <p>每个号码详细计算步骤：</p>
        </div>
        <div>
          <p>第一个号码：1+2+4+8+15+16 = 46%10 = 6</p>
        </div>
        <div>
          <p>第二个号码：25+31+40+41+43+47 = 227%10 = 7</p>
        </div>
        <div>
          <p>第三个号码： 55+56+59+66+69+74 = 379%10 = 9</p>
        </div>
        <div>
          <p>具体游戏规则如下：</p>
        </div>
        <div>
          <p>大：三个位置的数值相加和大于等于14,15,16,17,18,19,20,21,22,23,24,25,26,27为大。</p>
        </div>
        <div>
          <p>小：三个位置的数值相加和小于等于00,01,02,03,04,05,06,07,08,09,10,11,12,13为小。</p>
        </div>
        <div>
          <p>单：三个位置的数值相加和为单就为单。</p>
        </div>
        <div>
          <p>双：三个位置的数值相加和为双就为双。</p>
        </div>
        <div>
          <p>大单（三个数值和）：15,17,19,21,23,25,27为大单。</p>
        </div>
        <div>
          <p>小单（三个数值和）：01,03,05,07,09,11,13为小单。</p>
        </div>
        <div>
          <p>大双（三个数值和）：14,16,18,20,22,24,26为大双。</p>
        </div>
        <div>
          <p>小双（三个数值和）：00,02,04,06,08,10,12为小双。</p>
        </div>
        <div>
          <p>极大（三个数值和）：23,24,25,26,27为极大。</p>
        </div>
        <div>
          <p>极小（三个数值和）：00,01,02,03,04为极小。</p>
        </div>
        <div>
          <p>红波（三个数值和）：03,06,09,12,15,18,21,24为红波。</p>
        </div>
        <div>
          <p>绿波（三个数值和）：01,04,07,10,16,19,22,25为绿波。</p>
        </div>
        <div>
          <p>蓝波（三个数值和）：02,05,08,11,17,20,23,26为蓝波。</p>
        </div>
        <div>
          <p>注:当开奖结果为：0,13,14,27(所有买的波色皆输)视为全部不中奖！</p>
        </div>
        <div>
          <p>豹子：當期開出三個數字相同即為豹子</p>
        </div>
        <div>
          <p>特码（三个数值和）：單選取一個數字投注。</p>
        </div>
      </div>
      <i @click="regulation_control=false" class="icon-guanbi iconfont"></i>
    </div>

</div>
</template>
<script>
import {
  mapGetters,
  mutations
} from 'vuex'
// import footGuide from '../../components/footer/footGuide'
import lotteryHeader from '../../components/header/lotteryHeader'
import lotteryArea from '../../components/lottery-area'
import dailogQ from '../../components/dailogQ.vue'
import dailogS from '../../components/dailogQ.vue'
//import BScroll from 'better-scroll'

/*import {

  getOid,
  getPcdd,
  getUrl
} from '../../api'*/
// import drawer from '../../components/drawer'

export default {
  data() {
    return {
      roundCha:null,
      xshuzi:0,
      zMoney:0,
      fentime:30,
      game_code: 160,
      type_code: 0,
      title: "幸运28",
      shuju: {},
      isBlue: false,
      demo: 0,
      body: {},
      seen: false,
      de: false,
      loading: false,
      // hotmsgs: {},
      oid_info: 0,
      isOk: false,
      endtime: 0,
      isOpen: true,
      lotteryList: {},
      numberList: [],
      dialog: false,
      codeMessage: '',
      keyValue: null,
      setTime: null,
      fengpan: false,
      object: {},
      objects: [],
      money_s: null,
      round: 0,
      n_1: false,
      dadiao: "hh",
      regulation_control:false
      // pcznavc_a:1//二級選項卡，默認顯示兩面盤
    }
  },

  methods: {
    showMsgFromChild(data){
      if (data===true) {
        this.qingkong();
      let oidInfo = getOid();
      let prams = {
        oid : oidInfo
      }

        this.$http.post(`${getUrl()}/getinfo/money`,JSON.stringify(prams)).then(res => {


          if (res.data.msg == "4001") {

            this.$router.push({
              path: '/login'
            }) // 跳转到登陆
          } else {
          this.zMoney = res.data.money
          sessionStorage.setItem('im_money', JSON.stringify(res.data.money))
            this.xshuzi = 0;

          }

        })
      }
    },

    changes_m() {

      if (!this.isEmptyObject(this.object) && this.money_s > 0) {
        this.isBlue = true;
      } else {
        this.isBlue = false
      }
    },
    isEmptyObject(e) {

      for (let t in e)
        return !1;
      return !0
    },
    qingkong() {
      this.isBlue = false;
      this.money_s = null;
      this.xshuzi = 0;
      // this.money_s = null;
      this.lotteryList = getPcdd()[this.dadiao];
      this.object = {}
      if (this.dadiao == "tm") {
        this.$refs.seller.className = "pcdd bet";
      } else {
        this.$refs.seller.className = "pcdd_hh bet pcdd";
      }
      this.object = {}
    },
    subMit() {
      // this.seen=!this.seen
      this.objects = [];
      for (let i in this.object) {
        this.objects.push(this.object[i])

      }

      this.$store.dispatch('showDailogQ')

    },
    isCheck(j, i, item) {
      let n = `l${j}${i}`;

      item.isCheck = !item.isCheck;
      if (item.isCheck === true) {
        this.object[n] = item;

      } else {
        delete this.object[n]
      }

      if (!this.isEmptyObject(this.object) && this.money_s > 0) {
        this.isBlue = true;
      } else {
        this.isBlue = false
      }
      let s = 0;
      for(let i in this.object){
                s++;
           }
           this.xshuzi=s
    },

    changeDate(item, i) {
      this.shuju.hh.isCheck = false;
      this.shuju.tm.isCheck = false;
      this.xshuzi = 0;
      // this.shuju.yzw.isCheck = false;
      // this.shuju.lzs.isCheck = false;
      item.isCheck = true;
      this.object = {};
      this.lotteryList = getPcdd()[i];
      this.dadiao = i;

      if (this.dadiao == "tm") {
        this.$refs.seller.className = "pcdd bet";
      } else {
        this.$refs.seller.className = "pcdd_hh bet pcdd";
      }

      // this.dailogIs = !this.dailogIs;
    },

    // subMit() {
    //   this.oid_info = getOid();
    //   let lottry_s = document.getElementsByClassName("input_a")
    //   let string = '';
    //   let money = 0;
    //   for (let i = 0; i < lottry_s.length; i++) {
    //     if (lottry_s[i].value > 0) {
    //       string = `${string}&${lottry_s[i].name}=${lottry_s[i].value}`;
    //       money = money + parseInt(lottry_s[i].value);
    //     }
    //   }
    //   this.type_code = this.lotteryList.code
    //   string = `game_code=${this.game_code}&type_code=${this.type_code}&round=${this.round}&oid=${this.oid_info}${string}`
    //   let headers = new Headers();

    //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //   this.$http.post('http://jmyl888.com/newapi/InOrder', encodeURI(string), {
    //     headers: headers
    //   }).then(res => {
    //     if (res.data.error_no == 505) {
    //       //未登陆

    //
    //       this.$router.push({
    //         path: '/login'
    //       }) //跳转到登陆
    //     } else {
    //       this.codeMessage = money
    //       this.dialog = true
    //       this.dialog = ''
    //     }
    //   })
    // },

  },
  computed: mapGetters([
    'showDailogQ'
  ]),
  //初始化
  created() {
    this.de = true;
    let newTime = Date.parse(new Date()) / 1000;
    let oldTime = localStorage.getItem('pc_time');

    let roundCha = localStorage.getItem('pc_roundCha')
    if (oldTime && newTime <= oldTime && roundCha == 1) {

      this.shuju = getPcdd();
      this.lotteryList = getPcdd().hh;
      this.shuju.hh.isCheck = true;
      let bodyS = localStorage.getItem('pc_body');
      let oldTime = localStorage.getItem('pc_time');
      let moneyX=   sessionStorage.getItem('im_money');
      (JSON.parse(bodyS).next.isclose)?this.fengpan=true:this.fengpan=false;
      this.zMoney = parseFloat(moneyX)
      this.isOk = true;
      this.endtime = oldTime - newTime;
      this.body = JSON.parse(bodyS)
      this.round = this.body.next.round;
      this.de = false;
    } else {
      this.lotteryList = getPcdd().hh;
      let oidInfo = getOid();
      this.oid_info = oidInfo;
      let params = {
        params: {
          game_code: 160, //  登录账号
          // type_code: 0, //  登录密码
          oid: oidInfo
        }
      } // 获取token配置
      this.$http.post(`${getUrl()}/getinfo/game`, JSON.stringify(params.params),{timeout: 15000}).then(res => {

        this.de = false;
        this.isOk = true;

        if (res.data.msg == "4001") {
          // let timeStamp = res.data.next.timestap;

          this.$router.push({
            path: '/login'


          }) // 跳转到登陆
        } else {

          let moneyX=   sessionStorage.getItem('im_money')

          this.zMoney = parseFloat(moneyX)
          this.shuju = getPcdd();
          this.lotteryList = getPcdd().hh;
          this.shuju.hh.isCheck = true;
          let timeStamp = res.data.next.timestap;
          this.fengpan = res.data.next.isclose;
          this.body = res.data;
          this.endtime = res.data.next.endtime - timeStamp;
          this.round = res.data.next.round;
          let loaclTime = this.endtime + newTime;

          // localStorage.setItem('pc_time', res.data.next.endtime)
          localStorage.setItem('pc_time', loaclTime)
          localStorage.setItem('pc_body', JSON.stringify(res.data))
          this.lotteryList = getPcdd().hh;
          this.numberList = res.data.last.number;
          this.round = res.data.next.round;
          this.roundCha = Number(res.data.next.round) - Number(res.data.last.round);
          localStorage.setItem('pc_roundCha', JSON.stringify(this.roundCha))
        }

      }).catch(function(){
        this.$router.push({
          path: '/login'
        }) // 跳转到登陆
      })
    }

  },
  reddy() {},
  mounted() {
    setInterval(() => {
      if (this.endtime <= 0) {
        this.isOpen = false;
        return
      } else {
        this.endtime--;
        let timeStamp = Date.parse(new Date()) / 1000;

      }
    }, 1000)
  },
  watch: {
    endtime: function() {
      if (this.endtime == 0||this.endtime ==200||this.endtime ==210||this.endtime ==190) {
        let newTime = Date.parse(new Date()) / 1000;
        this.fengpan = false;
        let oidInfo = getOid();
        this.oid_info = oidInfo;

        let params = {
          params: {
            game_code: 160,
            // type_code: 0,
            oid: oidInfo
          }
        }
        this.$http.post(`${getUrl()}/getinfo/game`, JSON.stringify(params.params)).then(res => {
          this.de = false;
          this.isOk = true;
          let timeStamp = res.data.next.timestap;

          if (res.data.msg == 4001) { //  1未登陆
            this.$router.push({
              path: '/login'
            }) // 跳转到登陆
          } else {
            // this.shuju = getPcdd();
            // this.lotteryList = getPcdd().hh;
            // this.shuju.hh.isCheck = true;
            let timeStamp = res.data.next.timestap;
            this.body = res.data;
            this.endtime = res.data.next.endtime - timeStamp;
            this.round = res.data.next.round;
            let loaclTime = this.endtime + newTime;

            // localStorage.setItem('pc_time', res.data.next.endtime)
            localStorage.setItem('pc_time', loaclTime)
            localStorage.setItem('pc_body', JSON.stringify(res.data))
            // this.lotteryList = getPcdd().hh;
            // this.$refs.seller.className = "pcdd_hh bet pcdd";
            this.numberList = res.data.last.number;
            this.round = res.data.next.round;
          }

        })


      } else if (this.endtime <= 30 && this.endtime > 0) {

        this.qingkong();
        this.fengpan = true;

      }
    },
    $route() {

    }
  },
  components: {

    lotteryArea,
    lotteryHeader,
    dailogQ,
    dailogS
    // 'ex-simple': model,

  }
}
</script>


<style lang="less" rel="stylesheet/less" scoped>

.pcdd{
  >ul{
    flex-direction: column;
    >li{
      width: 100%!important;
      >ul{
        padding: 0 10/20rem;
        width: 100%;
        text-align: center;
        >li{
          display: inline-block;
          margin: 0 2/20rem;
        }
        button{
          display: inline-block;
          width: 69/20rem!important;
          height: 2.05rem!important;
          justify-content: space-around;
        }


      }
    }
  }
}


.pcdd_hh{
  >ul{

    >li{

      >ul{


        >li:nth-last-of-type(1){
          button{
            width: 95/20rem!important;
          }
        }
        >li:nth-last-of-type(2){
          button{
            width: 95/20rem!important;
          }
        }
        >li:nth-last-of-type(3){
          button{
            width: 95/20rem!important;
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
/* .fade-leave-active in <2.1.8 */
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.fp {
    width: 100%;
    height: 40/20rem;
    position: fixed;
    bottom: 0;
    background: rgba(0,0,0,0);
    display: flex;
    justify-content: center;
    color: white;
    font-size: 30/20rem;
    text-shadow: -2px 1px 1px rgba(0,0,0,0.6);
    align-items: center;
    letter-spacing: 15/20rem;
    box-sizing: border-box;
    z-index: 1000;
}

.mu-appbar {
    position: fixed;
    top: 0;
    left: 0;
    background: #146cdc;
    color: #fff;
    height: 44px;
}

.jtcaizg {
    background: #fff;
    clear: both;
    height: auto;
    overflow: hidden;
    padding: 10px;
    margin-top: 44px;
}
.indexkjdt {
    height: auto;
    clear: both;
}
.indexkjdt h3 {
    font-size: 14px;
    height: 29px;
    line-height: 25px;
    margin: 0;
}
.indexkjdt img {
    width: 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}
.spaninri a {
    float: right;
    color: #fff;
    padding: 0 10px;
    margin-right: 10px;
    font-size: 12px;
    height: 21px;
    line-height: 21px;
    font-weight: 500;
    background: #f00;
    -webkit-border-radius: 18px;
    -moz-border-radius: 18px;
    border-radius: 18px;
}
.indexkjdt p span {
    color: #f00;
}
.indexkjdc {
    display: flex;
    height: 27/20rem;
}
.font_s {
    width: 42/20rem;
}
.indexkjdc .title {
    height: 29/20rem;
}
.indexkjdc i {
    float: right;
}
.indexkjdc i a {
    padding: 2px 6px;
    color: #fff;
    background: #36aafb;
    font-size: 12px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}
.pcznavc {
    clear: both;
    background: white;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e67074;
    padding: 5/20rem;
}
.pcznavc a {
    padding: 0 11px;
    font-size: 12px;
    background: #fff;
    color: #333;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    border: 1px solid #36aafb;
}
.pcznavc .a {
    background: #36aafb;
    color: #fff;
}
.pcznavc i {
    border-right: 1px solid #e67074;
}
.form {
    display: block;
    margin-top: 0;
}
.font_b {
    width: 52/20rem;
    display: inline-block;
}
.pptitle {
    clear: both;
    font-size: 16px;
    font-weight: 600;
}
.title_b {
    width: 51/20rem;
    display: inline-block;
    color: rgb(54, 170, 251);
}

.form {
    > ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 100%;
        background: #fff;
        padding-bottom: 110/20rem;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.4);

        > h3 {
            width: 100%;
            padding: 5/20rem;
            margin-top: 5/20rem;
            margin-bottom: 5/20rem;
            color: #d1506d;
            background: -webkit-linear-gradient(right, rgba(255,255,255,1) 0%,#FFE8E8 100%);
            /* Chrome10-25,Safari5.1-6 */
        }
        > li {
            width: 50%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 3/20rem;
            input {
                width: 40%;
            }
            > span:nth-of-type(1) {
                width: 22/20rem;
            }
        }
        span {
            font-size: 16/20rem;
            display: inline-block;
        }

    }

}
.odds_class {
    color: #c35f62;
}
.bet_bar {
    width: 100%;
    z-index: 999;
    position: fixed;
    bottom: 52px;
    display: flex;
    justify-content: space-around;
    height: 55/20rem;
    padding: 9/20rem;
    background: -webkit-linear-gradient(top, #e67074 0%,#e67074 24%,#e67074 44%,#e67074 100%);
    /* Chrome10-25,Safari5.1-6 */
    font-size: 16/20rem;
    input {
        outline: 0;
        background: rgba(255,255,255,0.9);
        border: 0;
        margin-right: 10/20rem;
        line-height:1.25rem;
    }
    button {
        border: 0;
        border-radius: 2px;
    }
    button:nth-of-type(1) {
        color: white;
        background: rgba(0,0,0,0.5);
        margin-right: 7/20rem;
    }
    button:nth-of-type(2) {
        color: white;
        background: #78c401;
    }
    .disable {
        background: #376cd4;
    }
    >div:nth-of-type(3){
      position: relative;
      font-size: 15/20rem;
      >span{
        font-size: 12/20rem;
        position: absolute;
        top:-11/20rem;
        left: -7/20rem;
        color: #fff;
        width: 20/20rem;
        height: 20/20rem;
        border-radius: 10/20rem;
        background: red;
        box-shadow: 0 2/20rem 1/20rem rgba(0,0,0,0.5)
      }
    }

}
.header_bar {
    z-index: 990;
    background: #146cdc;
    color: #fff;
    font-size: 16/20rem;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5/20rem;
    height: 38/20rem;
    box-shadow: 0 0.06rem 0.6rem rgba(0, 0, 0, 0.3);
    .header_title {
        display: flex;
        align-items: center;
    }
    .back {
        padding: 4/20rem;
    }
}

.jtc_titl {
    display: flex;
    flex-direction: row;
    align-items: center;
    > div:nth-of-type(1) {
        width: 15%;
    }
    > div:nth-of-type(2) {
        > div:nth-of-type(2) {
            font-size: 12/20rem;
        }
    }
    .font_b {
        width: 30/20rem;
    }
    .font_a {
        display: inline-block;
        width: 55/20rem;
    }
}
.indexkjdc {
    margin-top: 5/20rem;
}

.bet {
    margin-bottom: 39/20rem;
    background:#dde5ec;
    > ul {
        display: flex;
        flex-wrap: wrap;

        > li {
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #dde5ec;
            > span {
                display: block;
                background: red;
                width: 100%;
                height: 1.5rem;
                line-height:1.5rem;
                font-size:12/20rem;
                text-align: center;
                border: 1px solid #fff;
                // border-left: 2/20rem solid #8c8c8c;
                // border-right: 2/20rem solid #d9d9d9;
                // border-bottom: 2/20rem solid #595959;
                // border-top: 2/20rem solid #636363;
                background: -webkit-radial-gradient(#555, #2a2926);
                color: #fcfcfc;
            }
            > ul {
                button {
                    outline: 0;
                    border: 1/20rem solid #eaeaea;
                    // display: flex;
                    // justify-content: space-around;
                    // flex-direction: column;
                    width: 2.85rem;
                    height: 41/20rem;
                    padding:0;
                    align-items: center;
                    margin-top: 4/20rem;
                    position: relative;
                    background: #fff;
                    border-radius: 3/20rem;
                    > span:nth-of-type(2) {
                        color: #5084e2;
                        font-size:12/20rem;
                        font-family: Arial!important;
                        display:block;
                        width: 100%;
                        height: 40%;
                        line-height:0.9rem;
                        background:linear-gradient(#eef1f5, #fff);
                        background: -webkit-linear-gradient(#eef1f5, #fff)
                    }
                    > span:nth-of-type(1) {
                      line-height:1.5;
                       height:60%;
                       display:block;
                       font-size:32/40rem;
                       // margin-top:10/20rem;
                    }
                }
                > li:nth-last-of-type(1) {
                    margin-bottom: 9/20rem;
                }

                .active {
                    border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                }
            }
        }

    }
}

.bet_bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    height: 39/20rem;
    background: white;
    align-items: center;
    padding:0;
    box-shadow: 0 0.06rem 1rem rgba(0, 0, 0, .5);
    > div {
        width: 33.33%;
        text-align: center;
        input {
          width: 86/20rem;
          padding:0;
          margin:0;
          height: 30/20rem;
          line-height: 25/20rem;
          border-radius: 3/20rem;
          border: 1/20rem solid #f0f0f0;
          box-shadow: 0 0 5/20rem #eeeeee inset;
          text-align: center;
      }
    }
     >div:nth-of-type(1){
      width: 140/40rem;
      // background-color: red;

    }
    >div:nth-of-type(2){
      width: 270/40rem;
      // background-color: red;
      input{
        width: 100%;
        padding:0rem;
        margin: 0;
        text-align:right;
        border: 1px solid #dedede;
        border-radius:5/20rem;
      }

    }
     >div:nth-of-type(3){
      width: 30%;

    }
    button {
        display: block;
        width: 100%;
        height: 39/20rem;
        border: 0;
        background: #177bdd;
        color: white;
    }

}
.iconfont_reset {
  width: 1rem;
  height: 1rem;
  display:inline-block;
  vertical-align: middle;
  margin-right:0.3rem;
  margin-top:-2px;
    background:url(../../../static/images/resx.png) no-repeat;
    background-size: 100% 100%;

}

.lottery_nav_bar {
  width: 320/20rem;
  z-index: 1;
  ul {
    height: 30/20rem;
    color: white;
    box-sizing: border-box;
    font-size: 0;
    button {
      font-size: 14/20rem;
      width: 50%;
      text-align:center;
      padding:0;
      z-index: 0;
      background: #1366dc;
      border: 0;
      outline: 0;
      color: white;
      padding: 8/20rem 0;
    }

    .active {
      background: #1f97f6;
    }
  }
}

.icon-lajitong {
    font-size: 25/20rem;
}
.qin{
  margin-left:-8px;
}
.lajiton-active {
    color: #36aafb;
}
button{
  outline: none;
}

.regulation{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(7,17,27,0.8);
  z-index: 999;
  top: 0;
  color: white;
  font-size: 12/20rem;
  overflow-y: scroll;
  >div{
    display: flex;
    flex-direction: column;
    width: 100%;
    >div{
      padding-left: 15/20rem;
      padding-right: 15/20rem;
      margin-top: 5/20rem;
      margin-bottom: 5/20rem;
    }
  }
  h5{
    font-size: 14/20rem;
  }
  .header_regu{
    display: flex;
    justify-content: space-between;
    margin-top: 20/20rem;

    padding-left: 0;
    h5{
      margin: 0;
    }
    >div:nth-of-type(1){
      border-bottom: 1/20rem solid white;
      width: 80/20rem;
      transform: translate(29/20rem,-9/20rem);
    }
    >div:nth-last-of-type(1){
      border-bottom: 1/20rem solid white;
      width: 80/20rem;
      transform: translate(-29/20rem,-9/20rem);
    }
  }
  .icon-guanbi{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 26/20rem;
  }
}
</style>
