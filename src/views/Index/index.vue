<template>
  <div>
    <div v-if="closeGG" class="ggHeader">
      <div>
        <div @click="closeGb"><img src="../../../static/images/headerOut.png"/></div>
        <div class="headerLogo"></div>
        <div>
          <p>{{is_gd_ali ? '打开新版阿理APP' : '打开新版光大APP'}}</p>
      <!--    <p>新人领18元红包</p>-->
        </div>
      </div>
      <div @click='gotoAddress("app")' class="gdcolor">立即下载</div>
    </div>
    <!--位置-->
    <header class="color1" :style="{'top': isIosWebview ? 40/40+'rem':headerTop}">
      <h1 class="logo"></h1>
      <div v-if="title_control" class="header_login">
        <div :style="{'padding-top': '0.25rem'}">
          <i style="width: 1rem;height: 1rem;font-size:16px;margin: 0.2rem 0.4rem;float: right;" class=""
             @click="isShow">
            <img style="width: 1rem; height: 0.75rem; margin-top: -0.3rem;" src="../../../static/images/menumoney.png"
                 alt=""/>
          </i>
          <span class="username gdusername" @click="gotoMy">
          	<img src="../../../static/images/indexuser.png" alt=""/>
          	<i style="float: right;margin-top: -0.2rem;;">{{(username == "demo") ? "游客" : username}}</i>
          </span>
          <span class="username gdusername" style="line-height: 0.658rem;float: right;margin-left: 0.2rem;"
                v-if="logoxian==true" @click.prevent="gotoPayAddressone">注册</span>

          <ul @click="mask=false;isOpen=false" class="alert_right" v-show="isOpen">
            <!--<li class="odd"> 您好，{{username}}</li> -->
            <li @click='gotoAddress("/my")'>个人中心<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li class="money" @click=''> 账户余额<span style="color:#0b76fa;">￥{{Number(money).toFixed(2)}}</span></li>
            <li @click='gotoAddress("/Order:0")'>我要充值<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='gotoAddress("/Order:1")'>我要提现<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='gotoAddress("/myHistroy")'>下注记录<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='gotoAddress("/trend:51")'>开奖记录<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='gotoAddress("/todayRule")'>游戏规则<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click="gotoPayAddress()"> 联系我们<img src="../../../static/images/jiantou.png" alt=""/></li>
            <li @click='exit'>退出</li>
          </ul>
        </div>
      </div>
      <div v-if="!title_control" class="header_login ">
        <button class="test login_border login" @click='isShiwan'>
          <span>
          试玩
          </span>
        </button>

        <button class="login_b login_border login" @click='gotoAddress("/login")'>
          <div>
            <span>
              登录注册
            </span>
          </div>
        </button>

        <div style="clear: both"></div>
      </div>
    </header>
    <div class="mask" @click="mask=false;isOpen=false" v-show="mask">
    </div>
    <div class="swiper_group" :style="{'marginTop': swiperMajgin}">
      <div style="height:150px" class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for='(item,i) in msgs.data' :key='i'>
            <a :href="item.href">
              <img :src="item.pic" class="banner-item" :alt="item.name">
              <span>asdf</span>
            </a>
          </swiper-slide>
          <div v-if='msgs' class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="announcement" @click='gotoAddress("/noticeCenter")'>
      <div class="im">
        <img src="../../../static/images/g6.png" alt="">
      </div>
      <div>
        <marquee scrollamount="3" class="text" ref="txt">
          {{an_announcement}}
        </marquee>
        <a class="manly"></a>
      </div>
    </div>
    <div class="gameClass inde_bg">
      <div>
        <div>
          <ul class="game_list">
            <li>
              <button @click='gotoAddress("/game_55")'>
                <img src="../../../static/images/game_55_icon.png"/>
                <h5>北京PK拾</h5>
              </button>
            </li>
            <li>
              <button @click='gotoAddress("/game_40")'>
                <img src="../../../static/images/game_40_icon.png" style="height: 2.74rem;"/>
                <h5>重庆时时彩</h5>
              </button>
            </li>
            <li>
              <button @click='gotoAddress("/game_20")'>
                <img src="../../../static/images/game_20_icon.png"/>
                <h5>香港六合彩</h5>
              </button>
            </li>
            <li>
              <button @click='gotoAddress("/game_35")'>
                <img src="../../../static/images/game_35_icon.png"/>
                <h5>幸运飞艇</h5>
              </button>
            </li>

            <li>
              <button @click='gotoAddress("/game_15")'>
                <img src="../../../static/images/game_15_icon.png"/>
                <h5>PC蛋蛋</h5>
              </button>
            </li>
            <li>
              <button @click='gotoAddress("/game_30")'>
                <img src="../../../static/images/game_30_icon.png"/>
                <h5>广东快乐十分</h5>
              </button>
            </li>

            <li>
              <button @click='gotoAddress("/game_25")'>
                <img src="../../../static/images/game_25_icon.png"/>
                <h5>重庆幸运农场</h5>
              </button>
            </li>
            <li>
              <button @click="expectation=true">
                <img src="../../../static/images/ag_icon.png"/>
                <h5>真人视讯</h5>
              </button>
            </li>
            <li>
              <!--<a @click='gotoAddress("app")'>
                <button >
                  <img src="../../../static/images/app_download.png"/>
                  <h5>APP下载</h5>
                </button>
              </a>-->
              <a @click='gotoPayAddress'>
                <button>
                  <img src="../../../static/images/server_a.png"/>
                  <h5>在线客服</h5>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="foot_swiper">
      <h4>
        优惠活动
        <i style="float: right;margin-right: 0.5rem;color: #666666;font-size:0.5rem;margin-top:0.2rem;">更多<img
          src="../../../static/images/moneyindex.png" alt=""
          style="width: 0.5rem;height: 0.5rem;margin-top: -0.2rem;margin-left: 0.2rem;"/></i>
      </h4>

      <div style="height:160px" class="swiper-box swiper-box_b ">
        <swiper :options="swiperOption_b">
          <swiper-slide class="twoswiper">
            <a @click='gotoAddress(`activity${indexNav_i}`)'>
              <div class="img_swiper ali_activey_a">
              </div>
              <span style="color: #333333!important;">礼惠国庆情满中秋</span>
            </a>
          </swiper-slide>

          <swiper-slide class="twoswiper">
            <a @click='gotoAddress(`activity${indexNav_i+1}`)'>
              <div class="img_swiper  ali_activey_c">
              </div>
              <span style="color: #333333!important;">签到送豪礼</span>
            </a>
          </swiper-slide>

          <swiper-slide class="twoswiper">
            <a @click='gotoAddress(`activity${indexNav_i+2}`)'>
              <div class="img_swiper ali_activey_b">
              </div>
              <span style="color: #333333!important;">{{indexNav_i > 2 ? "敢绑就敢送" : "登陆送豪礼"}}</span>
            </a>
          </swiper-slide>

        </swiper>
      </div>
      <!--选择版面-->
      <div class="chooseBan">
        <a @click='gotoAddress("app")'>APP下载</a>
        <a class="gdcolor1">触屏版</a>
        <a :href="is_gd_ali? 'https://www.alcp77.com/login' : 'https://www.gdcp77.com/login'">电脑版</a>
      </div>
      <!--尾巴\-->
      <div class="footView">
        <div>
          <img src="../../../static/images/footerImg.png" alt=""/>
        </div>
        <div>
          <p>COPYRLGHT © 2012-2017</p>
          <p>ALL RLGHTS RESEVERD</p>
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
            <p>{{title}}</p>
          </div>
        </div>
      </div>
    </div>

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
    <!--弹出框-->
    <div v-show="expectation" class="jin_qin_qi_dai">
      <div>
        <img @click="expectation=false" src="../../../static/images/guan_bi.png"/>
        <span>即将推出,敬请期待...</span>
        <button @click="expectation=false">确认</button>
      </div>
    </div>

  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  import footGuide from '../../components/footer/footGuide'
  import {
    setStore
  } from '../../utils/mUtils.js'
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  //  import {
  //    getUrl,
  //    getAndroid,
  //    getIos
  //  } from '../../api'
  export default {
    data() {
      return {
        is_gd_ali: is_gd_ali(),
        isIosWebview: isIosWebview,
        interval: "",
        isWan: "",
        roundBj: "",
        roundCq: "",
        roundXg: "",
        roundXy: "",
        roundGd: "",
        roundNc: "",
        round28: "",
        timeBj: 0,
        timeCq: 0,
        timeXg: 0,
        timeXy: 0,
        timeGd: 0,
        timeNc: 0,
        time28: 0,
        closeGG: 'true',
        headerTop: '2.1rem',
        swiperMajgin: '4rem',
        url: '',
        isOpen: false,
        logoxian: false,
        msgs_nav: {
          data: [
            [{
              url: "../../../static/images/T1.png",
              name: "北京PK10",
              router: "/game_55"
            },
              {
                url: "../../../static/images/T2.png",
                name: "重庆时时彩",
                router: "/game_40"
              },
              {
                url: "../../../static/images/T5.png",
                name: "幸运飞艇",
                router: "/game_35"
              },
              {
                url: "../../../static/images/T4.png",
                name: "广东快乐十分",
                router: "/game_30"
              }
            ],
            [
              {
                url: "../../../static/images/T6.png",
                name: "重庆幸运农场",
                router: "/game_25"
              },
              {
                url: "../../../static/images/T3.png",
                name: "香港六合彩",
                router: "/game_20"
              },
              {
                url: "../../../static/images/T7.png",
                name: "PC蛋蛋",
                router: "/game_15"
              },
              {
                url: "../../../static/images/T8.png",
                name: "app下载",
                router: "app"
              }
            ]
          ]
        },

        indexList0: "- - - - - - - - -",
        indexList1: "- - - - ",
        indexList2: "- - - - - - -",
        indexList3: "- - - - - - - - - -",
        indexList4: "- - - - - - - - - -",
        indexList5: "- - - - - - - - - -",
        indexList6: "- - -",

        // 轮播图
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 4000,
          autoplayDisableOnInteraction: false,
          loop: true
        },
        // 轮播图
        swiperOption_b: {
          pagination: '.swiper-pagination_b',
          slidesPerView: 2,
          paginationClickable: true,
          spaceBetween: 0,
          freeMode: true
        },
        msgs: {
          data: []
        },
        msgs_b: {
          data: [
            {
              img: "../../../static/images/guo_qing.jpg",
              name: "礼惠国庆情满中秋"
            },
            {
              img: "../../../static/images/qian_dao.jpg",
              name: "签到送豪礼"
            },
            {
              img: "../../../static/images/login_hao_li.jpg",
              name: "登陆送豪礼"
            }
          ]
        },

        hotmsgs: {},
        title_control: false,
        dialog: false,
        title: "",
        an_announcement: "",
        isHao: false,
        pcUrl: "",
        appdown: "",
        logout: false,
        money: "",
        mask: false,
        expectation: false,
        _window: {},
        indexNav_i: null

      }
    },
    mounted() {
      setInterval(() => {
        if (this.timeBj <= 0) {
          return
        } else {
          this.timeBj--;
        }
      }, 1000)
      setInterval(() => {
        if (this.timeCq <= 0) {
          return
        } else {
          this.timeCq--;
        }
      }, 1000)
      setInterval(() => {
        if (this.timeXg <= 0) {
          return
        } else {
          this.timeXg--;
        }
      }, 1000)
      setInterval(() => {
        if (this.timeXy <= 0) {
          return
        } else {
          this.timeXy--;
        }
      }, 1000)
      setInterval(() => {
        if (this.timeGd <= 0) {
          return
        } else {
          this.timeGd--;
        }
      }, 1000)
      setInterval(() => {
        if (this.timeNc <= 0) {
          return
        } else {
          this.timeNc--;
        }
      }, 1000)
      setInterval(() => {
        if (this.time28 <= 0) {
          return
        } else {
          this.time28--;
        }
      }, 1000)
    },
    methods: {
      p(s) {
        if (s <= 0) {
          return `00`
        } else if (s > 0 && s < 10) {
          return `0${s}`
        } else {
          return s
        }
      },
      //过滤分秒
      myfilter(second_time, second_endtime) {
        let time = parseInt(second_time);
        let timeE = parseInt(second_endtime);
        let second = second_time % 60;
        let secondE = second_endtime % 60;
        this.s = this.p(secondE);
        let min = Math.floor(second_time / 60) % 60;
        let minE = Math.floor(second_endtime / 60) % 60;
        this.m = this.p(minE);
        let hour = Math.floor(second_time / 3600);
        let hourE = Math.floor(second_endtime / 3600);
        this.h = this.p(hourE);
        if (hour) {
          time = this.p(hour) + ":" + this.p(min) + ":" + this.p(second);
          return time;
        } else {
          time = this.p(min) + ":" + this.p(second);
          return time;
        }
      },
      numbeYs(numberList) {
        return numberList.split(' ')
      },
      exit(){
        this.logout = !this.logout
      },
      isShow() {
        this.isOpen = !this.isOpen;
        this.mask = !this.mask;
        this.money = JSON.parse(sessionStorage.getItem('im_money'));

      },
      isShiwan() {
        this.logoxian = true
        this.isOpen = false
        this.$http.post(`${getUrl()}/user/signdemo`).then(res => {

          if (res.data.oid) {
            if (this.is_gd_ali) {
              this.$refs.rscenter.style.backgroundImage = "url('../../../static/images/suuccen.png')"
            } else {
              this.$refs.rscenter.style.backgroundImage = "url('../../../static/images/gdsuuccen.png')"
            }
            this.title = "试玩账号登陆成功"
            this.isHao = true
            setTimeout(() => {
              this.isHao = false
            }, 1200);
            sessionStorage.setItem('im_token', JSON.stringify(res.data.oid))
            sessionStorage.setItem('im_money', JSON.stringify(res.data.money))
            sessionStorage.setItem('im_username', res.data.username)
            sessionStorage.setItem('im_realname', res.data.realname)
            setTimeout(() => {
              if (sessionStorage.getItem("im_username")) {
                this.title_control = true;
                this.username = sessionStorage.getItem("im_username")
              } else {
                this.title_control = false;
              }
            }, 0);
          } else {
            this.title = "登录失败"
            this.isHao = true
            setTimeout(() => {
              this.isHao = false
            }, 600);
          }
        })
      },
      gotoAddress(path){
        //试玩账号权限限制
        this.isWan = sessionStorage.getItem('im_username')
        if (this.isWan == 'demo') {
          if (/^\/Order*/.test(path) || /^\/myHistroy*/.test(path)) {
            this.title = "请登录正式会员账号!"
            this.isHao = true
            setTimeout(() => {
              this.isHao = false
            }, 600);
            return
          }
        }

        console.log(this.isWan)
        if (path == "app") {
          console.log(1)
          this._window.location.href = this.appdown;
        } else if (/activity*/.test(path)) {
          console.log(2)
          this.$router.push(path)

        } else {
          if (!sessionStorage.getItem("im_token")) {
            console.log(3)
            this.$router.push("/login")
          }
          else {

            this.$router.push(path)
          }
        }
      },
      log_out() {
        sessionStorage.clear();
        this.logout = false;
        this.title_control = false;
        this.mask = false;
        this.$router.push('/index')
      },
      gotoPayAddress(){
        this.$router.push('/kefu')
      },
      gotoPayAddressone(){
        this.$router.push('/regist')
      },
      gotoMy(){
        if (this.title_control) {
          this.$router.push('/my')
        }
      },
      closeGb(){
        this.closeGG = false
        this.headerTop = '0'
        this.swiperMajgin = '1.95rem'
        console.log(11)

      },
      inArray1(needle, array, bool){
        if (typeof needle == "string" || typeof needle == "number") {
          for (let i in array) {
            if (needle === array[i]) {
              if (bool) {
                return i;
              }
              return true;
            }
          }
          return false;
        }
      }

    },
    props: {},
    components: {
      footGuide,
      swiper,
      swiperSlide
    },
    beforeCreate() {
      this._window = window;
    },
    created(){
      if (sessionStorage.getItem('im_username') == 'demo') {
        this.logoxian = true
      };
      is_gd_ali() ? this.indexNav_i = 1 : this.indexNav_i = 4;
      this.$http.post(`${getUrl()}/systems/getgameclosetime`).then(res => {
        this.roundBj = res.data.timeStamp[0].round;
        this.roundXy = res.data.timeStamp[1].round;
        this.roundGd = res.data.timeStamp[2].round;
        this.roundNc = res.data.timeStamp[3].round;
        this.roundCq = res.data.timeStamp[4].round;
        this.round28 = res.data.timeStamp[5].round;
        this.roundXg = res.data.timeStamp[6].round;
        this.indexList0 = res.data.timeStamp[0].result;
        this.indexList1 = res.data.timeStamp[1].result;
        this.indexList2 = res.data.timeStamp[2].result;
        this.indexList3 = res.data.timeStamp[3].result;
        this.indexList4 = res.data.timeStamp[4].result;
        this.indexList5 = res.data.timeStamp[5].result;
        this.indexList6 = res.data.timeStamp[6].result;
        this.timeBj = res.data.timeStamp[0].time - res.data.timeStamp[0].serverTime;
        this.timeXy = res.data.timeStamp[1].time - res.data.timeStamp[1].serverTime;
        this.timeGd = res.data.timeStamp[2].time - res.data.timeStamp[2].serverTime;
        this.timeNc = res.data.timeStamp[3].time - res.data.timeStamp[3].serverTime;
        this.timeCq = res.data.timeStamp[4].time - res.data.timeStamp[4].serverTime;
        this.time28 = res.data.timeStamp[5].time - res.data.timeStamp[5].serverTime;
        this.timeXg = res.data.timeStamp[6].time - res.data.timeStamp[6].serverTime;
      });

      //判断用户是IOS还是安卓
      let u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

      if (isiOS) {
        this.appdown = getIos()
      } else {
        this.appdown = getAndroid()
      }

      //    截取电脑端链接
      this.pcUrl = `//${getUrl().substring(6)}/login`


      //       验证用户是否登录
      if (sessionStorage.getItem("im_username")) {
        this.title_control = true;
        this.username = sessionStorage.getItem("im_username")
      } else {
        this.title_control = false;
      }

      //获取轮播图和公告（图片地址)

      let swiper = JSON.parse(sessionStorage.getItem("swiper"))
      let an_announcement = JSON.parse(sessionStorage.getItem("an_announcement"))

      if (swiper) {

        this.msgs.data = swiper
        this.an_announcement = an_announcement
      } else {
        this.$http.post(`${getUrl()}/user/getPicturesAndAnnouncements`).then(res => {
          if (res.data.code == 200) {
            //获取轮播图
            let img_url = res.data.rotations;
            for (let i = 0; i < img_url.length; i++) {
              let url = {
                pic: img_url[i]
              }
              this.msgs.data.push(url)
            }
            sessionStorage.setItem('swiper', JSON.stringify(this.msgs.data))
            //获取公告
            let announcement = res.data.pageShow;
            for (let i = 0; i < announcement.length; i++) {
              this.an_announcement = `${this.an_announcement}${announcement[i]}`
            }
            sessionStorage.setItem('an_announcement', JSON.stringify(this.an_announcement))

          } else {
            this.title = "首页轮播图请求失败，请刷新"
            this.isHao = true
            setTimeout(() => {
              this.isHao = false
            }, 1200);
          }
        })
      }

      let oidInfo = getOid();
      let odd = {};
      odd.oid = oidInfo;
      this.$http.post(`${getUrl()}/getinfo/money`, JSON.stringify(odd)).then(res => {
        this.money = res.data.money
      })
    },
    watch: {
      timeBj: function () {
        let arry_time = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290];
        if (arry_time.indexOf(this.timeBj) != -1 || this.timeCq == 0 || this.timeXg == 0 || this.timeXy == 0 || this.timeXy == 0 || this.timeGd == 0 || this.time28 == 0 || this.timeNc == 0) {
          this.$http.post(`${getUrl()}/systems/getgameclosetime`).then(res => {
            this.roundBj = res.data.timeStamp[0].round;
            this.roundXy = res.data.timeStamp[1].round;
            this.roundGd = res.data.timeStamp[2].round;
            this.roundNc = res.data.timeStamp[3].round;
            this.roundCq = res.data.timeStamp[4].round;
            this.round28 = res.data.timeStamp[5].round;
            this.roundXg = res.data.timeStamp[6].round;
            this.indexList0 = res.data.timeStamp[0].result;
            this.indexList1 = res.data.timeStamp[1].result;
            this.indexList2 = res.data.timeStamp[2].result;
            this.indexList3 = res.data.timeStamp[3].result;
            this.indexList4 = res.data.timeStamp[4].result;
            this.indexList5 = res.data.timeStamp[5].result;
            this.indexList6 = res.data.timeStamp[6].result;
            this.timeBj = res.data.timeStamp[0].time - res.data.timeStamp[0].serverTime;
            this.timeXy = res.data.timeStamp[1].time - res.data.timeStamp[1].serverTime;
            this.timeGd = res.data.timeStamp[2].time - res.data.timeStamp[2].serverTime;
            this.timeNc = res.data.timeStamp[3].time - res.data.timeStamp[3].serverTime;
            this.timeCq = res.data.timeStamp[4].time - res.data.timeStamp[4].serverTime;
            this.time28 = res.data.timeStamp[5].time - res.data.timeStamp[5].serverTime;
            this.timeXg = res.data.timeStamp[6].time - res.data.timeStamp[6].serverTime;
          });


        }
      }

    },
    destroyed(){
      clearInterval(this.interval);
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  @import "../../icon/iconfont.css";

  .icon-hanbaobao {
    font-size: 18/20rem;
    margin-right: 4/20rem;
  }

  .swiper-box {
    a {
      display: block;
      height: 150px;
      img {
        height: 100%;
      }
    }
  }

  .login {
    height: 1.6rem;
    text-align: right;
    padding: 0.3rem 10/20rem;
    background: #fff;
    position: relative;
    z-index: 10;
    margin-top: 40/20rem;
    box-shadow: 0 12px 43px -15px #aaa;
    > a {
      text-decoration: none;
      > button {
        padding: 0.2rem;
        border-radius: 0.6rem;
        background: none;
        text-align: center;
        width: 3rem;
        border: 1px solid #fff;
        height: 1.1rem;
        box-shadow: 0 6px 23px -4px #aaa;
        outline: none;
        /*behavior: url(../../../static/images/ie-css3.htc);*/
      }
    }
    img {
      width: 24/20rem;
    }
  }

  .swiper_group {
    width: 100%;
    position: relative;

    .banner-item {
      width: 100%;
    }
  }

  @color: #d1506d;
  .mu-appbar {
    position: fixed;
    top: 0;
    background: url("../../../static/images/blue.png");
    color: #fff;
    height: 2rem;
    text-align: center;
    z-index: 12;
    > p {
      display: inline-block;
      text-align: center;
      font-weight: 100;

    }
  }

  .mu-appbar img {
    float: right;
    width: 1rem;
    height: 0.8rem;
    margin-top: -1.4rem;
  }

  .view-tabs {
    background-color: rgb(247, 247, 247); // background-color: #fff;
    color: rgba(0, 0, 0, .87);
    height: 46px;
    display: flex;
    > .mu-tab-link {
      color: rgba(102, 102, 102, 1);
      flex: 1;
      width: 20%;
    }
    > .mu-tab-active {
      color: @color;
    }
  }

  .im {
    width: 20/20rem;
    height: 100%;

    > img {
      margin-top: 8/20rem;

      width: 27/46.875rem;
      margin-left: 30/46.875rem;
    }
  }

  .announcement {
    height: 30/20rem;
    /*position: absolute;
    left: 0;
    bottom: 0;*/
    display: flex;
    z-index: 1;
    // box-shadow:0 0.1rem 32px 0px #aaa;
    color: #000;
    background: #F2F2F2;

    > div:nth-of-type(2) {
      /* padding: 0.2rem 0 2/20rem;*/
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      p {
        white-space: nowrap;
      }
    }
  }

  .announcement .text {
    width: 270/20rem;
    margin-left: 0.5rem;
    font-size: 12/20rem;
  }

  .announcement .manly {
    width: 0.5rem;
    height: 0.5rem;
    border-bottom: 1px solid #a39898;
    border-left: 1px solid #a39898;
    transform: rotate(-135deg);
    /*	margin-top: 0.1rem;*/
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

  .headList {
    text-align: center;
    padding: 0 3/20rem 3/20rem 3/20rem;
    .ali_pc {
      width: 30/20rem;
      background-repeat: no-repeat;
      height: 20/20rem;
      background-size: 20/20rem 20/20rem;
    }
    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #d6e0ea;
      padding: 5/20rem;
      > a {
        color: #245da0;
      }
    }
  }

  .gameClass {
    background-color: #f2f2f2;
    .game_list {
      font-size: 0;
      /* padding-top: 20/40rem;*/
      height: 284/20rem;
      h5 {
        font-size: 10/20rem;
        font-weight: 100;
        margin: 4/20rem 0 4/20rem 0;
      }
      button {
        margin: 0;
        background-color: rgba(0, 0, 0, 0);
        outline: 0;
        margin-top: 0.6rem;
      }
      > li:nth-of-type(1),
      > li:nth-of-type(2),
      > li:nth-of-type(3) {
        border-top: 1px solid #d3d3d3;
      }
      li:nth-of-type(2) {
        img {
          height: 55.44/20rem;
        }
      }
      > li {
        background-color: #ffffff;
        /*  padding-top: 15/20rem;*/
        height: 220/46.875rem;
        font-size: 12/20rem;
        float: left;
        text-align: center;
        border-right: 1px solid #d3d3d3;
        border-bottom: 1px solid #d3d3d3;
        width: 33.2%;
        box-sizing: border-box;
        img {
          width: 110/40rem;
        }
      }
    }

    > div {
      > div {
        > div:nth-last-of-type(1) {
          > ul {
            border-bottom-left-radius: 11/20rem;
            border-bottom-right-radius: 11/20rem;
          }
        }
        > div {
          background: #f8f9fb;

          > a {
            width: 100%;
            // height:2rem;
            display: inline-block;
            padding-top: 36/47rem;
            padding-bottom: 25/47rem;
            border-bottom: 1px solid #eee;
            .gametitle {
              float: left;
              padding-left: 26/47rem;
              div:nth-child(1) {
                height: 31/47rem;
                line-height: 31/47rem;
                margin-bottom: 15/47rem;
                margin-top: 1/20rem;
                border-left: 10/47rem solid #439df3;
                span:nth-child(1) {
                  display: inline-block;
                  font-weight: bold;
                  height: 100%;
                  margin: 0 25/47rem 0 15/47rem;
                  font-size: 30/47rem;
                  width: 4.1rem;
                }
                span:nth-child(2) {
                  font-size: 22/47rem;
                  text-align: left;
                }
              }
              div:nth-child(2) {
                line-height: 41/47rem;
                font-size: 25/47rem;
                font-weight: bold;
                color: #2967d8;
                > span {
                  margin-left: 15/47rem;
                }
              }
            }
            > div {
              float: right;
              color: #272727;
              font-size: 12px;
              border-radius: 10/47rem 0 0 10/47rem;
              overflow: hidden;

              > span {
                display: block;
                color: #fff;
                text-align: center;
                padding: 3/20rem 18/47rem;

              }
              > span:nth-child(1) {
                background: #449df7;
                line-height: 27/47rem;
              }
              > span:nth-child(2) {
                background: #2f64d4;
                line-height: 27/47rem;
                font-size: 32/47rem;
              }
              // margin-top:0.45rem;
            }
          }
        }
      }
    }
  }

  header {
    //  justify-content: center;
    position: fixed;
    padding-left: 18/20rem;
    color: white;
    z-index: 99;
    width: 100%;
    height: 39/20rem;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
    h1 {
      float: left;
      margin: 0;
      font-size: 20/20rem;
      color: white;
      font-weight: 100;
      img {
        width: 138/20rem;
      }
    }
    .header_login {
      padding: 3/20rem 0;
      text-align: right;
      button:nth-of-type(1) {
        float: right;
        height: 32/20rem;
        margin: 1/20rem 6/20rem 0 6/20rem;
      }
      button:nth-of-type(2) {
        height: 32/20rem;
        float: right;
        margin-top: 1/20rem;
      }
      button {
        border-radius: 0.3rem;
        text-align: center;
        padding: 0 8/20rem;
        outline: none;
        border: 1px solid #2754b2;
        outline: none;
        font-size: 14/20rem;
        color: white;
        background-color: #2b5cc3;
        > div {
          > span:nth-of-type(2) {
          }
          > span:nth-of-type(1) {
          }
        }
      }
      img {
        /*width: 20/20rem;
        margin-right: 3/20rem;
        height: 24/20rem;*/
      }
      .username {
        font-size: 14/20rem;
        /*  width: 150/46.875rem;*/
        height: 60/46.875rem;

        text-overflow: ellipsis;
        display: inline-block;
        overflow: hidden;
        background-color: #2B5DC4;
        border-radius: 0.2rem;
        border: 2/20rem solid #2858b7;
        padding: 0.3rem;
        > img {
          width: 0.85rem;
          height: 19/20rem;
          margin-top: -0.6rem;
          margin-right: 0.2rem;

        }
      }

    }
    .header_login {
      > * {
        display: inline-block;
      }
    }
  }

  .zzc {
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 99;
  }

  .recommend_nav {

    .swiper-box {
      margin-top: 12/20rem;

      > div {
        height: 89/20rem;
      }
    }

    .nav_list_group {
      font-size: 0;
    }

    .nav_list {
      font-size: 12/20rem;
      display: inline-block;
      width: 24.5%;
      text-align: center;
      span {
        display: block;
        position: relative;
      }
      h6 {
        width: 50px;
        height: 50px;
        margin: 0;
        display: inline-block;
        background-size: 100% 100%;
        background-position: center;
      }
      > div {
        > a {
          > img {
            height: auto;
          }
          span {
            color: #333;
          }
        }
      }
    }

    img {
      width: 40/20rem;
    }

    .swiper-pagination {
      margin-bottom: -9/20rem;
    }
  }

  .alert_right {
    position: absolute;
    right: .2rem;
    top: 2.2rem;
    // padding: 0.25rem 0.25rem;
    background: #fff;
    color: #151515;
    border-radius: 0.2rem;

    li {
      width: 8.5rem;
      text-align: left;
      line-height: 1.5rem;
      font-size: 12/20rem;
      border-bottom: 1px solid #ccc;
      padding-left: 1.5rem;
      > img {
        margin-right: 0.5rem;
        width: 0.4rem;
        float: right;
        margin-top: 0.4rem;
      }
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

  .mask {
    position: fixed;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    height: 100vh;
    z-index: 9;
  }

  .open_lottery {
    width: 74/20rem;
  }

  button {
    border: 0;
    background-color: none;
  }

  .jin_qin_qi_dai {
    z-index: 9;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    > div {
      background-color: #2f64d4;
      color: white;
      width: 80%;
      margin-top: 50%;
      height: 100/20rem;
      border-radius: 4/20rem;
      position: relative;
      text-align: center;
      box-shadow: 2/20rem 2/20rem 3/20rem rgba(0, 0, 0, 0.6);
      img {
        position: absolute;
        top: -35/20rem;
        right: 0;
        width: 30/20rem;
        cursor: pointer;
      }
      > span {
        font-size: 16/20rem;
        display: block;
        margin-top: 14/20rem;
      }
      > button {
        color: white;
        background-color: #3981e7;
        box-shadow: 2/20rem 2/20rem 3/20rem #284faa;
        border-radius: 4/20rem;
        font-size: 14/20rem;
        margin-top: 20/20rem;
        padding: 8/20rem 28/20rem;
      }
    }
  }

  .foot_swiper {

    /*  margin-bottom: 30/20rem;*/
    > h4 {
      font-size: 32/46.875rem;
      margin-top: 10/46.875rem;
      margin-bottom: 6/20rem;
      padding-left: 10/20rem;
    }
    .swiper_activey {
      overflow-x: scroll;
    }
    ul {
      display: flex;
      > li {
        display: inline-block;
        text-align: center;
      }
    }
  }

  .swiper-box_b {
    margin-bottom: 20/20rem;
    padding-left: 10/20rem;
    height: 100/20rem !important;
    .img_swiper {
      /*width: 140/20rem;
      height: 98/20rem;*/
      width: 330/46.875rem;
      height: 220/46.875rem;
      background-size: contain;
      border-top-left-radius: 5/20rem;
      border-top-right-radius: 5/20rem;
      z-index: 0 !important;
      background-repeat: no-repeat;
    }
    span {
      display: block;
      /*padding: 4/20rem 0;*/
      width: 140/20rem;
      height: 40/46.875rem;
      font-size: 25/46.875rem;
      /*margin-top: -20/20rem;*/
      text-align: center;
      color: black !important;
      background-color: #e4e4e4;
      border-bottom-left-radius: 5/20rem;
      border-bottom-right-radius: 5/20rem;
      border: 1px solid #cccccc;
      border-top: none;
    }
  }

  .logo {
    margin-top: 2/20rem;
    margin-left: -10/20rem;
  }

  .twoswiper {
    width: 174/23.475rem !important;
  }

  .footView {
    width: 100%;
    height: 130/23.4375rem;
    /*background-color: #2a2a2a;*/
    /*	margin-top: 1.2rem;*/
    > div:nth-child(1) {
      text-align: center;
      padding-top: 52/46.875rem;
      > img {
        width: 664/46.875rem;
      }
    }
    > div:nth-child(2) {
      width: 100%;
      margin-top: 0.8rem;
      > p {
        text-align: center;
        font-size: 24/46.875rem;
        color: #7c7c7c;
      }
    }

  }

  .chooseBan {
    width: 100%;
    height: 70/46.875rem;
    background-color: #f2f2f2;
    line-height: 70/46.875rem;
    > a {
      display: inline-block;

      color: #ACACAC;
      font-size: 0.5rem;
    }
    > a:nth-child(1) {
      margin-left: 3rem;
    }
    a:nth-child(2) {
      color: black;
      margin-left: 2rem;
    }
    a:nth-child(3) {
      margin-left: 2rem;

    }
  }

  .ggHeader {
    height: 100/46.875rem;
    width: 100%;
    position: fixed;
    z-index: 100000;
    > div {
      float: left;

    }
    > div:nth-child(1) {
      height: 100%;
      width: 515/46.875rem;
      background-color: #282828;
      div {
        float: left;
      }
      > div:nth-child(1) {
        width: 33/46.875rem;
        height: 33/46.875rem;
        margin-left: 0.5rem;
        line-height: 100/46.875rem;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      > div:nth-child(2) {
        width: 75/46.875rem;
        height: 79/46.875rem;
        margin-left: 0.8rem;

        margin-top: 0.3rem;
        /*margin-top: -0.4rem;*/
      }
      > div:nth-child(3) {
        // 		width:228/46.875rem;
        width: 6.864rem;
        line-height:100/46.875rem;
        margin-left: 0.5rem;
        > p:nth-child(1) {
     /*     margin-top: 0.2rem;*/
          color: #FFFFFF;
          font-size: 12/20rem;
        }
        > p:nth-child(2) {
          color: #C0C0C0;
          font-size: 8/20rem;
        }
      }
    }
    div:nth-child(2) {
      height: 100%;
      width: 235/46.875rem;
      background-color: #0b76fa;
      text-align: center;
      color: #FFFFFF;
      line-height: 100/46.875rem;
      font-size: 14/20rem;
      /*line-height:100/46.875rem;*/
    }
  }

</style>
