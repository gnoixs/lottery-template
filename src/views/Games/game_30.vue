gd_time// 主页
<template>
<div>


  <dailog-q :type_code="type_code" :game_code="game_code" :money="money_s" :round="round" :lotteryM="objects" v-if="showDailogQ" v-on:listenToChildEvent="showMsgFromChild"></dailog-q>
  <dailog-s :type_code="type_code" :game_code="game_code" :money="money_s" :round="round" :lotteryM="objects" :typecode=lianxu.keys v-if="showDailogS" v-on:listenToChildEvent="showMsgFromChild"></dailog-s>


  <lotteryHeader :title="title" :game_code="game_code" @regulation_click="regulation_control=true" ></lotteryHeader>
  <!-- <drawer v-show="showDrawer"></drawer> -->
  <!-- <dailog-q v-if="showDailogQ" :titleDate="titleDate" v-on:listenToChildEvent="changeDate"></dailog-q> -->
  <!--<div class="game_main">-->
    <lotteryArea class="game_30" :lotteryObj="body" :zMoney="zMoney" :endtime="endtime" :fentime="fentime" v-if="isOk"  gameType="30"></lotteryArea>

    <div class="lottery_nav_bar">
      <ul>
        <button class="trapezoid color1" v-for="(item,i) in shuju" :class="{active8:item.isCheck}" @click="changeDate(item,i)">
          <span>{{item.name}}</span>
        </button>
      </ul>
    </div>
    <div style="padding-top:0.1rem" v-if="shuju.lim.isCheck">
      <h3>投注方式</h3>
      <ul class="cqList">
        <li v-for='(item,index) in datas'>
          <div v-bind:class="{active3:item.isCheck}" @click='one(item,index)'>
            <strong>{{item._name}}</strong>
            <span class="color_money">{{item.odds}}</span>
          </div>
        </li>
      </ul>
    </div>
    <section class='bet cqnc_lmp' ref="seller">
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

  <!--</div>-->

  <section class="bet_bar">
   <div>
     <!-- <i class=" iconfont_reset"></i>-->
      <span  class="qin" @click="qingkong">重置</span>
    </div>
    <div><span  style="color:#FFFFFF"  v-show="xshuzi>0">{{xshuzi}}</span><input pattern="[0-9]*" v-model="money_s" placeholder="输入金额" @input="changes_m()" min="1"/></div>
    <div><button class="gdcolor"  :class="{color1:isBlue}" type="button" :disabled="!isBlue" @click="subMit">确认下注</button></div>
  </section>

  <div v-if="isShowS">
    <div class="modal_box_feedback">
         <div class="modal_div">
        		<div class="modal_header color1">
        			<span>通知</span>
        			<i></i>
        		</div>
        		<div class="modal_foot">
        			<div ref="rscenter"></div>
        			<p>{{wenzi}}</p>
        		</div>
        </div>
      </div>
  </div>
  <!-- <foot-guide></foot-guide> -->
  <div :style='de?"display:block":"display:none"' style="position: fixed;top:0;left:0;background:#000;opacity:.8;width:100%;height:100%;z-index:6">
    <div style='position: fixed;top:50%;left:50%;width:40px;height:40px;margin:-20px 0 0 -20px;'>
      <mu-circular-progress style="" :size="40" />
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
//  loginTrue,
//  getOid,
//  getKlsf,
//  getUrl
//} from '../../api'
// import drawer from '../../components/drawer'

export default {
  data() {
    return {
      roundCha:null,
      xshuzi: 0,
      zMoney: 0,
      fentime: 60,
      wenzi: "",
      isShowS: false,
      regulation_control:false,
      lianxu: {
        keys: 2032,
        index: 2
      },
      zhanshi: false,
      datas: [{
          isCheck: true,
          _name: '任选二',
          odds: '6.5',
          key_s: 2032,
          inde: 2
        },
        {
          isCheck: false,
          _name: '任选三',
          odds: '19.6',
          key_s: 2035,
          inde: 3
        },
        {
          isCheck: false,
          _name: '任选四',
          odds: '60',
          key_s: 2038,
          inde: 4
        },
        {
          isCheck: false,
          _name: '任选五',
          odds: '250',
          key_s: 2039,
          inde: 5
        }
      ],
      game_code: 3,
      type_code: 0,
      title: "广东快乐十分",
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
      isHao : false,
      dadiao: "lmp"
      // pcznavc_a:1//二級選項卡，默認顯示兩面盤
    }
  },

  methods: {
    showMsgFromChild(data) {
      if (data === true) {
        this.qingkong();
        let oidInfo = getOid();
        let prams = {
          oid: oidInfo
        }

        this.$http.post(`${getUrl()}/getinfo/money`, JSON.stringify(prams)).then(res => {


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
            this.zMoney = res.data.money;
            sessionStorage.setItem('im_money', JSON.stringify(res.data.money))
              this.xshuzi = 0;
          }

        })
      }
    },
    one(item, j) {
      // item.isCheck=false
      this.datas.forEach(function(key) {
        key.isCheck = false
      })
      this.lotteryList = getKlsf().lim
      this.object={};
      this.xshuzi = 0;
      item.isCheck = true;
      this.lianxu.index = item.inde;
      this.lianxu.keys = item.key_s;
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
      this.lotteryList = getKlsf()[this.dadiao];
      this.object = {}
      if (this.dadiao == "lmp") {
        this.$refs.seller.className = "cqnc_lmp bet";
        this.zhanshi = false;

      } else if (this.dadiao == 'yds' || this.dadiao == 'wdb') {

        this.zhanshi = false;
        this.$refs.seller.className = "cqnc_ys bet";

      } else {
        this.zhanshi = true;
        this.$refs.seller.className = "cqList1";

        // this.$refs.seller.className
      }
      this.object = {}
    },
    subMit() {
      // this.seen=!this.seen
      this.objects = [];
      for (let i in this.object) {
        this.objects.push(this.object[i])

      }

      if (this.shuju.lim.isCheck == true) {

        if(this.lianxu.index<4){
          if (this.objects.length < this.lianxu.index || this.objects.length > 8) {
            this.objects.length > 8 ? this.wenzi = "最多投8个球" : this.wenzi = `不能少于${this.lianxu.index}`
            this.isShowS = true;
            this.objects = [];

            setTimeout(this.isSHowff, 1200)
            return
          }

          this.$store.dispatch('showDailogS')

          return
        }
        else if (this.lianxu.index>=4) {
          if (this.objects.length < this.lianxu.index || this.objects.length > 6) {
            this.objects.length > 6 ? this.wenzi = "最多投6个球" : this.wenzi = `不能少于${this.lianxu.index}`
            this.isShowS = true;
            this.objects = [];

            setTimeout(this.isSHowff, 1200)
            return
          }
          this.$store.dispatch('showDailogS')

          return
        }

      }
      this.$store.dispatch('showDailogQ')

    },
    isSHowff() {
      this.isShowS = false
    },
    kadun(m, s) {

      function factorial(n) {
        return (n <= 1) ? 1 : n * factorial(n - 1);
      }
      return factorial(m) / factorial(m - s) / factorial(s)

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
      for (let i in this.object) {
        s++;
      }
      if (this.shuju.lim.isCheck) {
        switch (this.lianxu.keys) {
          case 2032:
            this.xshuzi = parseInt(this.kadun(s, 2))
            break;
          case 2035:
            this.xshuzi = parseInt(this.kadun(s, 3))
            break;
          case 2038:
            this.xshuzi = parseInt(this.kadun(s, 4))
            break;
          case 2039:
            this.xshuzi = parseInt(this.kadun(s, 5))
            break;
        }
      } else {
        this.xshuzi = s
      }




    },

    changeDate(item, i) {
      this.shuju.lmp.isCheck = false;
      this.shuju.yds.isCheck = false;
      this.shuju.wdb.isCheck = false;
      this.shuju.lim.isCheck = false;
      this.xshuzi = 0;
      item.isCheck = true;
      this.object = {};
      this.lotteryList = getKlsf()[i];
      this.dadiao = i;

      switch (i) {
        case "lmp":
          this.$refs.seller.className = "cqnc_lmp bet";
          this.zhanshi = false;
          this.type_code = 0;
          break;
        case "yds":
          this.zhanshi = false;
          this.$refs.seller.className = "cqnc_ys bet";
          this.type_code = 10
          break;
        case "wdb":
          this.$refs.seller.className = "cqnc_ys bet";
          this.type_code = 10
          this.type_code = 11
          break;
        default:
          this.zhanshi = true;
          this.$refs.seller.className = "cqList1";
          this.type_code = 9
      }
      // this.dailogIs = !this.dailogIs;
    },

  },
  computed: mapGetters([
    'showDailogQ',
    'showDailogS'
  ]),
  //初始化
  created() {
    this.de = true;
    let newTime = Date.parse(new Date()) / 1000;
    let oldTime = localStorage.getItem('gd_time');
    let roundCha = localStorage.getItem('gd_roundCha')
    if (oldTime && newTime <= oldTime && roundCha==1) {
      this.shuju = getKlsf();
      this.lotteryList = getKlsf().lmp;
      this.shuju.lmp.isCheck = true;
      let bodyS = localStorage.getItem('gd_body');
      let oldTime = localStorage.getItem('gd_time');
      let moneyX = sessionStorage.getItem('im_money');
      (JSON.parse(bodyS).next.isclose)?this.fengpan=true:this.fengpan=false;
      this.zMoney = parseFloat(moneyX)
      this.isOk = true;
      this.endtime = oldTime - newTime;
      this.body = JSON.parse(bodyS)
      this.round = this.body.next.round;
      this.de = false;
    } else {
      this.shuju = getKlsf();
      this.shuju.lmp.isCheck = true;
      this.lotteryList = getKlsf().lmp;
      this.shuju.lmp.isCheck = true;

      let oidInfo = getOid();
      this.oid_info = oidInfo;
      let params = {
        params: {
          game_code: 3, //  登录账号
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
          let moneyX = sessionStorage.getItem('im_money')

          this.zMoney = parseFloat(moneyX)
          this.shuju = getKlsf();
          this.lotteryList = getKlsf().lmp;
          this.shuju.lmp.isCheck = true;
          let timeStamp = res.data.next.timestap;
          this.body = res.data;
          this.endtime = res.data.next.endtime - timeStamp;
          this.round = res.data.next.round;
          let loaclTime = this.endtime + newTime;
          this.fengpan = res.data.next.isclose;
          // localStorage.setItem('gd_time', res.data.next.endtime)
          localStorage.setItem('gd_time', loaclTime)
          localStorage.setItem('gd_body', JSON.stringify(res.data))
          this.lotteryList = getKlsf().lmp;
          this.numberList = res.data.last.number;
          this.zMoney = res.data.lcurrency;
          sessionStorage.setItem('im_money', JSON.stringify(res.data.lcurrency))

          this.round = res.data.next.round;
          this.roundCha = Number(res.data.next.round.split("-")[1]) - Number(res.data.last.round.split("-")[1]);
          localStorage.setItem('gd_roundCha', JSON.stringify(this.roundCha))
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
      if (this.endtime == 0||this.endtime ==540||this.endtime ==440||this.endtime ==450||this.endtime ==550||this.endtime==530||this.endtime==500||this.endtime ==560||this.endtime ==570||this.endtime ==580) {
        let newTime = Date.parse(new Date()) / 1000;
        this.fengpan = false;
        let oidInfo = getOid();
        this.oid_info = oidInfo;

        let params = {
          params: {
            game_code: 3,
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
            // this.shuju = getKlsf();
            // this.lotteryList = getKlsf().lmp;
            // this.lotteryList.isCheck = true;

            let timeStamp = res.data.next.timestap;
            this.body = res.data;
            this.endtime = res.data.next.endtime - timeStamp;
            this.round = res.data.next.round;
            let loaclTime = this.endtime + newTime;
            // localStorage.setItem('gd_time', res.data.next.endtime)
            localStorage.setItem('gd_time', loaclTime)
            localStorage.setItem('gd_body', JSON.stringify(res.data))
            // this.lotteryList = getKlsf().lmp;
            // this.$refs.seller.className = "cqnc_lmp bet";
            this.numberList = res.data.last.number;
            this.zMoney = res.data.lcurrency;
            sessionStorage.setItem('im_money', JSON.stringify(res.data.lcurrency))

            this.round = res.data.next.round;
            this.roundCha = Number(res.data.next.round.split("-")[1]) - Number(res.data.last.round.split("-")[1]);
            localStorage.setItem('gd_roundCha', JSON.stringify(this.roundCha))

          }
          let moneyX=   sessionStorage.getItem('im_money')
          this.zMoney = parseFloat(moneyX)
        })


      } else if (this.endtime <= 60 && this.endtime > 0) {

        this.qingkong();
        this.xshuzi = 0;
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
button{
  outline: none;
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
h3 {
     display: block;
                background: red;
                width: 100%;
                height: 1.5rem;
                line-height:1.5rem;
                font-size:12/20rem;
                margin:0;
                text-align: center;
                border: 1px solid #fff;
                // border-left: 2/20rem solid #8c8c8c;
                // border-right: 2/20rem solid #d9d9d9;
                // border-bottom: 2/20rem solid #595959;
                // border-top: 2/20rem solid #636363;
                background: -webkit-radial-gradient(#555, #2a2926);
                color: #fcfcfc;
}
.cqList {
    display: flex;
    flex-flow: row wrap;
    background:#dde5ec;
    li {
        width: 180/45rem;
        div {
            text-align: center;
            width: 3.5rem;
            height: 89/45rem;
            border: 1px solid #e5e5e5;
            margin: 18/45rem auto;
            background: #fff;
            line-height: 40/45rem;
            border-radius: 3/20rem;
            span {
               color: #5084e2;
                        font-size:14/40rem;
                        font-family: Arial!important;
                        display:block;
                        width: 100%;
                        height: 40%;
                        line-height:0.9rem;
                        background:linear-gradient(#eef1f5, #fff);
                        background: -webkit-linear-gradient(#eef1f5, #fff)
            }

            strong {
                line-height:1.5;
                       height:60%;
                       display:block;
                       font-size:32/40rem;
                       font-weight: normal;
                       // margin-top:10/20rem;
            }
        }
        .active {
           border: 1/20rem solid #156bda;
                    span:nth-of-type(1){
                      background: red;
                      color: #fff;
                    }
        }
        .isred {
            border:1/20rem solid #156bda;
            box-sizing: border-box;
            span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
        }
    }

}
.cqList1 {
    background: #dde5ec;
    height: 320/20rem;
    li {
        width: 100%;
        text-align: center;
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
        ul {

            li {
                display: inline-block;
                width: 3.75rem;
                button {
                    position: relative;

                    outline: 0;
                    text-align: center;
                    width:3.5rem;
                    margin: 0 auto;
                    height: 89/45rem;
                    padding:0;
                    border: 1px solid #e5e5e5;
                    margin: 18/45rem auto 0;
                    background: #fff;
                    line-height: 40/45rem;
                    border-radius: 3/20rem;
                    > span:nth-child(2) {
                       color: #5084e2;
                        font-size:14/40rem;
                        font-family: Arial!important;
                        display:block;
                        width: 100%;
                        height: 40%;
                        line-height:0.9rem;
                         background:linear-gradient(#eef1f5, #fff);
                        background: -webkit-linear-gradient(#eef1f5, #fff)
                    }
                    > span:nth-child(1) {
                       line-height:1.5;
                       height:60%;
                       display:block;
                       font-size:32/40rem;
                       // margin-top:10/20rem;
                    }
                }
                .active {
                    border: 2px solid #1366dc;
                    box-sizing: border-box;
                    // background:#fff url(../../../static/images/sj.png) no-repeat;
                    background-size: 16/45rem 16/45rem;
                }
                // .active:after {
                //   content: "";
                //   background:url(../../../static/images/blue11.png) no-repeat;
                //   background-size:0.65rem 0.65rem;
                //   position: absolute;
                //   left: -1px;
                //   top: -1px;
                //   width: 0.65rem;
                //   height: 0.65rem;
                // }
                .active {
                   border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                }
                .isred {
                    border: 2px solid #ff2312;
                    box-sizing: border-box;
                }
            }

        }
    }

}
.cqList {
    > li {
        .active {
            border: 1/20rem solid red;
            position: relative;
            border-radius: 3/20rem;
        }
        // .active:after {
        //   content: "";
        //   background:url(../../../static/images/red1.png) no-repeat;
        //   background-size:0.65rem 0.65rem;
        //   position: absolute;
        //   left: -1px;
        //   top: -1px;
        //   width: 0.65rem;
        //   height: 0.65rem;
        // }
    }
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

        > li {
            width: 20%;
            display: inline-block;
            flex-direction: column;
            align-items: center;
            text-align: center;
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
      width: 25%;
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

.gyh {
    > ul {
        flex-direction: column;
        > li {
            width: 100%;
            > ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: 0 10/20rem;
                justify-content: space-between;
                > li {
                    width: 63/20rem;
                    height: 50/20rem;
                    margin: 5/20rem;
                }
                 > li:nth-last-of-type(1),
                 > li:nth-last-of-type(3),
                 > li:nth-last-of-type(4),
                 > li:nth-last-of-type(5),
                > li:nth-last-of-type(2) {
                    width: 50/20rem;
                    height: 50/20rem;
                }
            }
        }
        > li:nth-of-type(2) {
            > ul {
                > li {
                    width: 63/20rem;
                    height: 50/20rem;
                    margin: 5/20rem;
                }
            }
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

.cqnc_lmp {
    > ul {
        > li {
            // background: white!important;
            width: 25%;
            > ul {

                > li {
                    > button {
                       width: 3.5rem;
                    }
                }
            }
        }
        > li:nth-of-type(1) {
            width: 100%;
            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: 0 7/20rem;
                justify-content: space-between;
                > li {
                  display: inline-block;
                  margin: 0 3/20rem;
                    button {
                        width: 70/20rem;
                        height: 45/20rem;
                    }
                }
            }
        }
    }
}
.cqnc_ys {
    > ul {
        > li {
            width: 25%;
            button {
                width:3.5rem!important;
            }
        }
    }
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

.game_main{
  height: 568/20rem;
  overflow: scroll;
}

</style>
