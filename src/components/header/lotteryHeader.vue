<template>
  <div style="position: relative;">
    <!--<div class="topHeader" :style="{'background': is_gd_ali ? '#146cdc': '#e60d39'}" v-if="isIosWebview"></div>-->
    <header class="color1" :style="{'top': isIosWebview ? 40/40+'rem': 0}" ref="headZindex">
      <div @click="goHome">
        <i class="icon iconfont icon-zuo"></i>
      </div>
      <div class="title" @click="hideDailog">
        <span>{{title}}</span>
        <i class="icon iconfont icon-xiangxiajiantou"></i>
      </div>
      <div>
        <i style="width: 1rem;height: 1rem;font-size:16px;margin: 0.2rem 0.4rem;float: right;" class=""
           @click.stop="isShowgame">
          <img style="width: 1rem; height: 0.75rem; margin-top: -0.3rem;" src="../../../static/images/menumoney.png"
               alt=""/>
        </i>
        <ul @click="mask=false;isOpen=false;" class="alert_right" v-show="isOpen">
          <!--<li class="odd"> 您好，{{username}}</li> -->
          <li @click='gotoAddress("/my")'>个人中心<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li class="money" @click=''> 账户余额<span style="color:#0b76fa;">￥{{Number(money).toFixed(2)}}</span></li>
            <li @click='gotoAddress("/Order:0")'>我要充值<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='gotoAddress("/Order:1")'>我要提现<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='gotoAddress("/myHistroy")'>下注记录<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='gotoAddress("/trend:51")'>开奖记录<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='gotoAddress("/todayRule")'>游戏规则<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click="gotoPayAddress()">联系我们<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='exit'>退出</li>
				 </ul>
    </div>
  </header>
<div class="mask" @click="mask=false;isOpen=false" v-show="mask">
    </div>
<transition name="fade">
  <div v-show="isShow" class="header-is-active" @click="hideDailog">
    <div class="header-modal-content">
      <ul>
        <li ref="gamename" @click='gotoAddress(k)' v-for="(v,k) in lotteryGame">{{v}}</li>
      </ul>
      <i class="up"></i>
        </div>
      </div>
    </transition>


    <!--弹出框-->
    <div class="zzc" v-show="logout">
      <div class="juzho">
        <div class="white2">
          <p>确认退出？</p>
          <div>
            <button class="color1" @click='log_out'>确认</button>
            <button @click='logout=false'>取消</button>
          </div>
        </div>
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
            <p>{{titleSw}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isIosWebview: isIosWebview,
      is_gd_ali: window.is_gd_ali(),
      showha:false,
      isShow: false,
      isOpen: false,
      mask:false,
      logout: false,
      username:'',
      isWan:'',
      isHao:false,
      titleSw: "",
      money:'',
      lotteryGame:{game_55:"北京PK拾",game_40:"重庆时时彩",game_20:"香港六合彩",game_35:"幸运飞艇",game_15:"PC蛋蛋",game_30:"广东快乐十分",game_25:"重庆幸运农场"}
    }
  },
  props: {
    game_code:{
      type: Number
    },
    title: {
			type:String
  	},
  },
  created(){
  	this.username = sessionStorage.getItem("im_username")
  	this.money = JSON.parse(sessionStorage.getItem("im_money"))
		switch (this.game_code){
			case 51:
			delete this.lotteryGame.game_55;
			break;
			case 2:
			delete this.lotteryGame.game_40;
			break;
			case 69:
			delete this.lotteryGame.game_20;
			break;
			case 171:
			delete this.lotteryGame.game_35;
			break;
			case 160:
			delete this.lotteryGame.game_15;
			break;
			case 3:
			delete this.lotteryGame.game_30;
			break;
			case 47:
			delete this.lotteryGame.game_25;
			break;


		}

  },
  computed: {

  },
  methods: {

    open(){
      this.showha=!this.showha
    },
    hideDailog(i) {
    	this.mask = false;
    	this.isOpen = false;
      this.isShow = !this.isShow;
      if(this.$refs.headZindex){
      	this.$refs.headZindex.style.zIndex = '100'
      }
    },
    goHome(){
      this.$router.push({
        path: '/index'
      })
      },
      close_showha() {
        this.showha = false
      },
      regulation() {
        this.$emit('regulation_click');
      },
      exit(){
        sessionStorage.clear();
        this.logout = !this.logout;
        this.$router.push('/index')
      },
 		isShowgame() {
 		this.isShow=false;
        this.isOpen = !this.isOpen;
        this.mask = !this.mask;

        if (this.mask) {
          this.$refs.headZindex.style.zIndex = '99999999'
        } else {
          this.$refs.headZindex.style.zIndex = '100'
        }
      this.money = JSON.parse(sessionStorage.getItem('im_money'))
      },
      gotoAddress(path){
        //试玩账号权限限制
        this.isWan = sessionStorage.getItem('im_username')
        if (this.isWan == 'demo') {
          if (/^\/Order*/.test(path) || /^\/myHistroy*/.test(path)) {
            this.titleSw = "试玩账号没有权限"
            this.isHao = true
            setTimeout(() => {
              this.isHao = false
            }, 600);
            return
          }
        }

        if (path == "app") {
          this._window.location.href = this.appdown;
        } else if (/activity*/.test(path)) {
          this.$router.push(path)

        } else {
          if (!sessionStorage.getItem("im_token")) {
            this.$router.push("/login")
          }
          else {

            this.$router.push(path)
          }
        }
      },
       gotoPayAddress(){
       	this.$router.push('/kefu')
    },
    gotoTrendAddress(path) {
      console.log(this.game_code)
      let i = `/trend:${this.game_code}`;

      this.$router.push({path:i})
    },
     log_out() {
        sessionStorage.clear();
        this.logout = false;
        this.mask = false;
      },

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @blue: #146cdc;
  @font_title: #ffffff;
  @font_round: rgb(0, 0, 0);
  @font_balance: #6993d5;
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }

  header {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    align-items: center;
    padding: 0 10/20rem;
    height: 38/20rem;
    background: @blue;
    color: @font_title;
    z-index: 100;
    .icon-zuo {
      font-size: 18/20rem;
    }
    .icon-hanbaobao {
      font-size: 18/20rem;
    }
    .title {
      font-size: 17/20rem;
      padding-left: 1.2rem;
      i {
        font-size: 12/20rem;
      }
    }
    .showha {
      display: none;
    }
    ul {
      position: absolute;
      right: 5/20rem;
      top: 50/20rem;
      padding: 5/20rem 5/20rem;
      background: rgba(65, 65, 65, 0.9);
      border-radius: 0.2rem;

      /*display: none;*/
      /*z-index:10;*/
      li {
        width: 60/20rem;
        /* height: 25/20rem;*/
        line-height: 25/20rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        color: #fff;
        font-size: 14/20rem;
      }
      li:nth-child(1) {
        padding-left: 25/20rem;
        background: url(../../../static/images/gz.png) no-repeat 1/20rem  5/20rem;
        background-size: 17/20rem 17/20rem;
      }
      li:nth-child(2) {
        padding-left: 25/20rem;
        background: url(../../../static/images/history.png) no-repeat 1/20rem  5/20rem;
        background-size: 17/20rem 17/20rem;
      }
      li:nth-child(3) {
        padding-left: 25/20rem;
        background: url(../../../static/images/qs.png) no-repeat 1/20rem  5/20rem;
        background-size: 17/20rem 17/20rem;
        border: none;
      }
    }
    ul:before {
      content: "";
      width: 0;
      height: 0;
      border-bottom: 11/20rem solid rgba(65, 65, 65, 0.9);
      border-right: 11/20rem solid transparent;
      border-left: 11/20rem solid transparent;
      border-top: 11/20rem solid transparent;
      position: absolute;
      right: 10/20rem;
      top: -22/20rem;
    }
  }

  .mask {
    position: fixed;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    height: 100vh;
    z-index: 999999;
  }

  .header-is-active {

    position: fixed;
    /* height: 100vh; */
    /* width: 100%; */
    background-color: rgba(0, 0, 0, 0);
    z-index: 9999;
    margin: 0 auto;
    left: 50%;
    margin-left: -2.825rem;

  }

  .header-modal-content {

    background: #414141;
    opacity: 0.95;
    text-align: center;
    position: relative;
    width: 256/46.875rem;
    margin: 30/20rem auto;
    border-radius: 6/20rem;
    color: white;
    z-index: 101;
    > ul {

      width: 100%;
      text-align: center;

      display: inline-block;
      li{
      	height: 80/46.875rem;
        line-height:80/46.875rem;
        font-size: 14/20rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      }
    }
    > ul:nth-last-of-type(1) {
      border: 0;
    }

  }

  .alert_right {
    position: absolute;
    right: .2rem;
    top: 2.2rem;
    // padding: 0.25rem 0.25rem;
    padding: 0 !important;
    background: #fff;
    color: #151515;
    border-radius: 0.2rem;

    li {
      width: 8.5rem;
      text-align: left;
      line-height: 1.5rem;
      font-size: 12/20rem;
      border-bottom: 1px solid #ccc !important;
      padding-left: 1.5rem !important;
      color: #000 !important;
      > img {
        margin-right: 0.5rem;
        width: 0.4rem;
        float: right;
        margin-top: 0.4rem;
      }
      /* height:0!important;*/
    }

    .money {
      display: flex;
      justify-content: space-between;
      padding-right: 3/20rem;
    }
  }

  .alert_right {

    > li:nth-of-type(1) {
      background: url(../../../static/images/usergr.png) no-repeat 0.5rem 0.45rem;
      background-size: 0.7rem 0.7rem;

      span {
        color: #385efd;
      }
    }
    > li:nth-child(2) {
      background: url(../../../static/images/czhi.png) no-repeat 0.5rem 0.4rem;
      background-size: 0.7rem 0.7rem;
    }
    > li:nth-child(3) {
      background: url(../../../static/images/qu_kuan.png) no-repeat 0.5rem 0.4rem;
      background-size: 0.7rem 0.7rem;
    }
    > li:nth-child(4) {
      background: url(../../../static/images/xzhu.png) no-repeat 0.5rem 0.4rem;
      background-size: 0.7rem 0.7rem;
    }
    > li:nth-child(5) {
      background: url(../../../static/images/xzjjl.png) no-repeat 0.5rem 0.4rem;
      background-size: 0.7rem 0.7rem;
    }
    > li:nth-child(6) {
      background: url(../../../static/images/kjjl.png) no-repeat 0.5rem 0.4rem;
      background-size: 0.7rem 0.7rem;
    }
    > li:nth-child(7) {
      background: url(../../../static/images/grule.png) no-repeat 0.5rem 0.4rem;
      background-size: 0.7rem 0.7rem;
    }
    > li:nth-child(8) {
      background: url(../../../static/images/lxi.png) no-repeat 0.5rem 0.4rem;
      background-size: 0.7rem 0.7rem;
    }
    > li:nth-child(9) {
      background: url(../../../static/images/tchu.png) no-repeat 0.5rem 0.4rem;
      background-size: 0.7rem 0.7rem;
    }
  }

  .alert_right:before {
    content: "";
    width: 0;
    height: 0;
    border-bottom: 0.55rem solid #fff;
    border-right: 0.55rem solid transparent;
    border-left: 0.55rem solid transparent;
    border-top: 0.55rem solid transparent;
    position: absolute;
    right: 0.3rem;
    top: -1.1rem;
  }

  .zzc {
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 99;
  }

  .juzho {
    width: 11rem;
    margin: 10rem auto;

  }

  .white2 {
    background: #fff;
    border-radius: 5px;
    padding: 0.5rem;
    position: relative;
    z-index: 9999;
  }

  .white2 p {
    text-align: center;
    color: #7F7F7F;
    font-size: 0.8rem;
    margin: 0.5rem auto;
  }

  .white2 div {
    border-top: 1px solid #EEEEEE;
    text-align: center;
    margin: 0 -0.5rem;
  }

  .white2 div button {
    border-radius: 5px;
    width: 4.5rem;
    height: 1.5rem;
    border: none;
    margin: 0.5rem auto;
  }

  .white2 div button:first-child {
    background: #0857D8;
    color: #DFDFDF;
  }

  .white2 div button:nth-child(2) {
    color: #D7E4F8;
    background: #707070;
  }
</style>
