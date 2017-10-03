pc_timepc_time// 主页
<template>
<div>
  <dailog-q :type_code="type_code" :game_code="game_code" :money="money_s" :round="round" :lotteryM="objects" v-if="showDailogQ" v-on:listenToChildEvent="showMsgFromChild"></dailog-q>
  <lotteryHeader :title="title" :game_code="game_code" @regulation_click="regulation_control=true" ></lotteryHeader>
  <!-- <drawer v-show="showDrawer"></drawer> -->
  <!-- <dailog-q v-if="showDailogQ" :titleDate="titleDate" v-on:listenToChildEvent="changeDate"></dailog-q> -->
  <lotteryArea :lotteryObj="body"  :zMoney= "zMoney" :endtime="endtime" :fentime="fentime" v-if="isOk"  gameType="15"></lotteryArea>

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
       <!-- <i class=" iconfont_reset"></i>-->
        <span class="qin" @click="qingkong">重置</span>
      </div>
      <div><span style="color:#FFFFFF" v-show="xshuzi>0">{{xshuzi}}</span><input pattern="[0-9]*" v-model="money_s" placeholder="输入金额" @input="changes_m()" min="1"/></div>
      <div><button class="gdcolor"  :class="{color1:isBlue}" type="button" :disabled="!isBlue" @click="subMit">确认下注</button></div>

    </section>

  <!-- <foot-guide></foot-guide> -->
  <div :style='de?"display:block":"display:none"' style="position: fixed;top:0;left:0;background:#000;opacity:.8;width:100%;height:100%;z-index:6">
    <div style='position: fixed;top:50%;left:50%;width:40px;height:40px;margin:-20px 0 0 -20px;'>
      <mu-circular-progress style="" :size="40" />
    </div>
  </div>

	<div v-show="isHao">
      <div class="modal_box_feedback">
         <div class="modal_div">
        		<div class="modal_header color1">
        			<span>通知</span>
        			<i></i>
        		</div>
        		<div class="modal_foot">
        			<div ref="rscenter"></div>
        			<p>{{title}}</p>
        		</div>
        </div>
      </div>
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
import dailogS from '../../components/dailogS.vue'
//import BScroll from 'better-scroll'

//import {
//
//  getOid,
//  getPcdd,
//  getUrl
//} from '../../api'
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
      title: "PC蛋蛋",
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
      regulation_control:false,
      isHao:false
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
						sessionStorage.clear();
						this.isHao = true;
          	this.title = "您的账户已失效，请重新登录";
            setTimeout(() => {
	          	this.isHao = false;
	          	this.$router.push({
	            	path: '/login'
	          	})
	          },1000)
          } else {
          	this.zMoney = res.data.money
          	sessionStorage.setItem('im_money', JSON.stringify(res.data.money))
            this.xshuzi = 0;

          }

        })
      }
    },

    changes_m() {

      this.money_s = this.money_s.replace(/[^0-9]/g, "");

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
      switch(item.key_s)
      {
      case 'ip_5021':

       item.isCheck=!item.isCheck;
        delete this.object['l05'];
        delete this.object['l06'];
         delete this.object['l07'];
       this.lotteryList.body[0].list[5].isCheck=false;
       this.lotteryList.body[0].list[6].isCheck=false;
       this.lotteryList.body[0].list[7].isCheck=false;
           break;
    case 'ip_5022':
       item.isCheck=!item.isCheck;
       delete this.object['l04'];
        delete this.object['l06'];
         delete this.object['l07'];
       this.lotteryList.body[0].list[4].isCheck=false;
       this.lotteryList.body[0].list[6].isCheck=false;
       this.lotteryList.body[0].list[7].isCheck=false;
           break;

    case 'ip_5023':
       item.isCheck=!item.isCheck;
        delete this.object['l04'];
        delete this.object['l05'];
         delete this.object['l07'];
       this.lotteryList.body[0].list[4].isCheck=false;
       this.lotteryList.body[0].list[5].isCheck=false;
       this.lotteryList.body[0].list[7].isCheck=false;
           break;
    case 'ip_5024':

       item.isCheck=!item.isCheck;
        delete this.object['l04'];
        delete this.object['l06'];
         delete this.object['l05'];
       this.lotteryList.body[0].list[5].isCheck=false;
       this.lotteryList.body[0].list[6].isCheck=false;
       this.lotteryList.body[0].list[4].isCheck=false;
           break;

    default:
      item.isCheck = !item.isCheck;

}
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
          sessionStorage.clear();
						this.isHao = true;
          	this.title = "您的账户已失效，请重新登录";
            setTimeout(() => {
	          	this.isHao = false;
	          	this.$router.push({
	            	path: '/login'
	          	})
	          },1000)
        } else {

          let moneyX=   sessionStorage.getItem('im_money')

          this.zMoney = parseFloat(moneyX)
          this.shuju = getPcdd();
          this.lotteryList = getPcdd().hh;
          this.shuju.hh.isCheck = true;
          let timeStamp = res.data.next.timestap;
          this.fengpan = res.data.next.isclose;
          this.body = res.data;
          console.log(this.body)
          this.endtime = res.data.next.endtime - timeStamp;
          this.round = res.data.next.round;
          let loaclTime = this.endtime + newTime;
          this.zMoney = res.data.lcurrency;
          sessionStorage.setItem('im_money', JSON.stringify(res.data.lcurrency))

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
      if (this.endtime == 0||this.endtime ==200||this.endtime ==210||this.endtime ==190||this.endtime ==220||this.endtime ==230||this.endtime ==240) {
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
            sessionStorage.clear();
						this.isHao = true;
          	this.title = "您的账户已失效，请重新登录";
            setTimeout(() => {
	          	this.isHao = false;
	          	this.$router.push({
	            	path: '/login'
	          	})
	          },1000)
          } else {
            // this.shuju = getPcdd();
            // this.lotteryList = getPcdd().hh;
            // this.shuju.hh.isCheck = true;
            let timeStamp = res.data.next.timestap;
            this.body = res.data;
            this.endtime = res.data.next.endtime - timeStamp;
            this.round = res.data.next.round;
            let loaclTime = this.endtime + newTime;
            this.zMoney = res.data.lcurrency;
            sessionStorage.setItem('im_money', JSON.stringify(res.data.lcurrency))

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
  height: 371/20rem;
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
        padding: 0;
    }
    button {
        border: 0;
       /* border-radius: 2px;*/
    }
    button:nth-of-type(1) {
        color: white;
        background: #2f64d4;
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
          /*height: 30/20rem;
          line-height: 25/20rem;
          border-radius: 3/20rem;
          border: 1/20rem solid #f0f0f0;
          box-shadow: 0 0 5/20rem #eeeeee inset;*/
          /*text-align: center;*/
      }
    }
     >div:nth-of-type(1){
      width: 130/46.875rem;
      background-color: #eeeeee;
      height: 66/46.875rem;
      line-height: 66/46.875rem;
      border-radius: 10%;
      border: 1px solid #eaeaea;
      box-sizing: border-box;
      text-align: center;
      margin-left: 2%;

    }
    >div:nth-of-type(2){
      width: 382/46.875rem;
     /* line-height:1rem;*/
       border: 1px solid #dedede;
       border-radius:5/20rem;
         >span{
        	width:50/46.875rem;
        	height:45/46.875rem;
        	line-height:1.15rem;
        	margin-right:0.2rem;
        	display: inline-block;
        	background:url(../../../static/images/moneybao.png) no-repeat;
        	background-size: 100% 100%;
        	font-size: 0.5rem;
        }
      // background-color: red;
      input{
        width: 80%;
        padding:0rem;
        margin: 0;
      }

    }
     >div:nth-of-type(3){
      width:180/46.875rem;

    }
    button {
        display: block;
        width: 100%;
        height: 39/20rem;
        border: 0;
        background: #177bdd;
        padding: 0!important;
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
  /*margin-left:-8px;*/
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
  height: 100%;
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
  .icon{
    position: absolute;
    right: 4/20rem;
    top: 0;
    font-size: 26/20rem;
  }
}
</style>
