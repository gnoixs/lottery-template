// 主页
<template>
  <div>
    <!--位置-->

    <header class="color1">

      <h1 class="logo"></h1>

      <div v-if="title_control" class="header_login">
        <div>
          <span class="username">{{(username=="demo")?"游客":username}}</span>
          <i style="font-size:16px" class="icon iconfont icon-hanbaobao" @click="isShow"></i>

          <ul @click="mask=false;isOpen=false" class="alert_right"  v-show="isOpen">
            <li class="odd"> 您好，{{username}}</li>
            <li class="money" @click=''> 账户余额<span class="odd">￥{{money}}</span></li>
            <li @click='gotoAddress("/Order")'> 资金管理</li>
            <li @click='gotoAddress("/myHistroy")'> 下注记录</li>
            <li @click='gotoAddress("/my")'> 个人资料</li>
            <li @click="open_serviec"> 联系我们</li>
            <li @click='exit'> 退出</li>
          </ul>
        </div>
      </div>

      <div v-if="!title_control" class="header_login ">
        <button class="login_b wo_de" @click='gotoAddress("/login")'>
          <div>
            <span>
              登录
            </span>
            <span>
              注册
            </span>
          </div>
        </button>
        <button class="test game_login" @click='isShiwan'>
          <span>
          试玩
          </span>
        </button>

        <div style="clear: both"></div>
      </div>
    </header>

    <div class="mask" @click="mask=false;isOpen=false" v-show="mask">
    </div>

    <div class="swiper_group">

      <div style="height:160px" class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for='(item,i) in msgs.data' :key='i'>
            <a :href="item.href">
              <img :src="item.pic" class="banner-item" :alt="item.name">
            </a>
          </swiper-slide>
          <div v-if='msgs' class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <div class="announcement" style="padding-right:1rem">
        <div class="im">
          <img src="../../../static/images/g6.png" alt="">
        </div>
        <div>
          <marquee scrollamount="4">
            {{an_announcement}}
          </marquee>
        </div>
      </div>
    </div>

    <div class="recommend_nav">
      <div style="height:80/20rem" class="swiper-box">

        <swiper :options="swiperOption_b">
          <swiper-slide class="nav_list_group" >
            <div @click='gotoAddress("/game_55")' class="nav_list" >
              <img src="../../../static/images/T1.png" class="banner-item" >
              <span>北京PK10</span>
            </div>
            <div @click='gotoAddress("/game_40")' class="nav_list" >
              <img src="../../../static/images/T2.png" class="banner-item" >
              <span>重庆时时彩</span>
            </div>
            <div @click='gotoAddress("/game_35")' class="nav_list" >
              <img src="../../../static/images/T5.png" class="banner-item" >
              <span>幸运飞艇</span>
            </div>
            <div @click='gotoAddress("/game_30")' class="nav_list" >
              <img src="../../../static/images/T4.png" class="banner-item" >
              <span>广东快乐十分</span>
            </div>
          </swiper-slide>

          <swiper-slide class="nav_list_group" >
            <div @click='gotoAddress("/game_25")' class="nav_list" >
              <img src="../../../static/images/T6.png" class="banner-item" >
              <span>重庆幸运农场</span>
            </div>
            <div @click='gotoAddress("/game_20")' class="nav_list" >
              <img src="../../../static/images/T3.png" class="banner-item" >
              <span>香港六合彩</span>
            </div>
            <div @click='gotoAddress("/game_15")' class="nav_list" >
              <img src="../../../static/images/T7.png" class="banner-item" >
              <span>PC蛋蛋</span>
            </div>
            <div class="nav_list" >
              <div>
                <a :href="appdown">
                  <img src="../../../static/images/T8.png" class="banner-item" >
                  <span>app下载</span>
                </a>
              </div>
            </div>
          </swiper-slide>
          <div v-if='msgs' class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="gameClass inde_bg">
      <div>
        <div>

          <div>
            <a class="game_55" @click='gotoAddress("/game_55")'>
              <!-- <img src="../../../static/images/1.png" alt=""> -->
              <div class="gametitle">
                <div class="border_left" ><span>北京赛车PK拾</span><span>第{{roundBj}}期</span></div>
                <div class="color_money" >上期: <span class="color_money" v-for="i in numbeYs(indexList0)">{{i}}</span></div>
              </div>
              <div class="open_lottery">
                <span class="run_lottery_b">开奖时间</span>
                <span class="color1">{{myfilter(timeBj)}}</span>
              </div>
            </a>
          </div>

          <div class="cqssc">
            <a class="game_40" @click='gotoAddress("/game_40")'>
              <!-- <img src="../../../static/images/1.png" alt=""> -->
              <div class="gametitle">
                <div class="border_left" ><span style="width: 3.8rem">重庆时时彩</span><span>第{{roundCq}}期</span></div>
                <div class="color_money" >上期: <span class="color_money" v-for="i in numbeYs(indexList4)">{{i}}</span></div>
              </div>
              <div class="open_lottery">
                <span class="run_lottery_b">开奖时间</span>
                <span class="color1">{{timeCq>0?myfilter(timeCq):"-:-"}}</span>
              </div>
            </a>
          </div>

          <div>
            <a class="game_20" @click='gotoAddress("/game_20")'>
              <!-- <img src="../../../static/images/1.png" alt=""> -->
              <div class="gametitle">
                <div class="border_left" ><span>香港六合彩</span><span>第{{roundXg}}期</span></div>
                <div class="color_money" >上期: <span class="color_money" v-for="i in numbeYs(indexList6)">{{i}}</span></div>
              </div>
              <div class="open_lottery">
                <span class="run_lottery_b">开奖时间</span>
                <span class="color1">{{timeXg>0?myfilter(timeXg):'-:-'}}</span>
              </div>
            </a>
          </div>

          <div>
            <a class="game_35" @click='gotoAddress("/game_35")'>
              <!-- <img src="../../../static/images/1.png" alt=""> -->
              <div class="gametitle">
                <div class="border_left" ><span>幸运飞艇</span><span>第{{roundXy}}期</span></div>
                <div class="color_money" >上期: <span class="color_money" v-for="i in numbeYs(indexList1)">{{i}}</span></div>
              </div>
              <div class="open_lottery">
                <span class="run_lottery_b">开奖时间</span>
                <span class="color1">{{timeXy?myfilter(timeXy):"-:-"}}</span>
              </div>
            </a>
          </div>

          <div>
            <a class="game_30" @click='gotoAddress("/game_30")'>
              <!-- <img src="../../../static/images/1.png" alt=""> -->
              <div class="gametitle">
                <div class="border_left" ><span>广东快乐十分</span><span>第{{roundGd}}期</span></div>
                <div class="color_money" >上期: <span class="color_money" v-for="i in numbeYs(indexList2)">{{i}}</span></div>
              </div>
              <div class="open_lottery">
                <span class="run_lottery_b">开奖时间</span>
                <span class="color1">{{timeGd>0?myfilter(timeGd):"-:-"}}</span>
              </div>
            </a>
          </div>

          <div>
            <a class="game_25" @click='gotoAddress("/game_25")'>
              <!-- <img src="../../../static/images/1.png" alt=""> -->
              <div class="gametitle">
                <div class="border_left" ><span>重庆幸运农场</span><span>第{{roundNc}}期</span></div>
                <div class="color_money" >上期: <span class="color_money" v-for="i in numbeYs(indexList3)">{{i}}</span></div>
              </div>
              <div class="open_lottery">
                <span class="run_lottery_b">开奖时间</span>
                <span class="color1">{{timeNc>0?myfilter(timeNc):"-:-"}}</span>
              </div>
            </a>
          </div>

          <div>
            <a class="game_15" @click='gotoAddress("/game_15")'>
              <!-- <img src="../../../static/images/1.png" alt=""> -->
              <div class="gametitle">
                <div class="border_left" ><span>PC蛋蛋</span><span>第{{round28}}期</span></div>
                <div class="color_money" >上期: <span class="color_money" v-for="i in numbeYs(indexList5)">{{i}}</span></div>
              </div>
              <div class="open_lottery">
                <span class="run_lottery_b">开奖时间</span>
                <span class="color1">{{time28>0?myfilter(time28):"-:-"}}</span>
              </div>
            </a>
          </div>
          <div>
            <ul class="headList">
              <li class="inde_bg">
                <div class="ali_pc "></div>
                <a class="inde_co" v-bind:href="pcUrl">
                  跳转到电脑版
                </a>
              </li>
            </ul>
          </div>


        </div>



      </div>

    </div>
    <div v-show="isHao">
      <div class="modal_box_feedback_regist">
        <div>{{title}}</div>
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
  /*import {
    getUrl,
    getAndroid,
    getIos
  } from '../../api'*/
  export default {
    data() {
      return {
        roundBj:"",
        roundCq:"",
        roundXg:"",
        roundXy:"",
        roundGd:"",
        roundNc:"",
        round28:"",
        timeBj: 0,
        timeCq: 0,
        timeXg: 0,
        timeXy: 0,
        timeGd: 0,
        timeNc: 0,
        time28: 0,
        isOpen: false,
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
                name: "幸运28",
                router: "/game_15"
              },
              {
                url: "../../../static/images/H01.png",
                name: "app下载",
                router: "app"
              }
            ]
          ]
        },
        swiperOption_b: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop: true,
          autoplayDisableOnInteraction: false
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
        msgs: {
          data: []
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
        money:"",
        mask:false,
        _window:{}

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
          this.logout=!this.logout
      },
      isShow() {
          this.money=sessionStorage.getItem("im_money")
        this.isOpen = !this.isOpen;
        this.mask = !this.mask;
      },
      isShiwan() {

          this.isOpen=false
        this.$http.post(`${getUrl()}/user/signdemo`).then(res => {
          if (res.data.oid) {
            this.title = "试玩账号登陆成功"
            this.isHao = true
            setTimeout(()=>{
              this.isHao=false
            },1200);
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
      gotoAddress(path) {
          if(path=="app"){
            this._window.location.href = this.appdown ;
          }
          else {
              if(!sessionStorage.getItem("im_token")){

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
        this.mask=false;
      },
      open_serviec() {

        this.$http.post(`${getUrl()}/user/getCustomerService`, "").then(res => {
          if (res.data.kefu) {
            this._window.location.href = res.data.kefu;
          } else {
            this.title = "网络请求失败，请稍后再试"
            this.isHao = true
            setTimeout(() => {
              this.isHao = false
              return
            }, 1200)
          }
        })


      }
    },
    components: {
      footGuide,
      swiper,
      swiperSlide
    },
    beforeCreate() {
        this._window=window;
    },
    created() {
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
            //          获取轮播图
            let img_url = res.data.rotations;
            for (let i = 0; i < img_url.length; i++) {
              let url = {
                pic: img_url[i]
              }
              this.msgs.data.push(url)
            }
            sessionStorage.setItem('swiper', JSON.stringify(this.msgs.data))
            //          获取公告
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
    },
    watch: {
      timeBj: function() {
        if (this.timeBj == 0 || this.timeCq == 0 || this.timeXg == 0 || this.timeXy == 0 || this.timeXy == 0 || this.timeGd == 0 || this.time28 == 0 || this.timeNc == 0) {

          this.$http.post(`${getUrl()}/systems/getgameclosetime`).then(res => {
            this.indexList = res.data.timeStamp;

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
        height: 160px;
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
    margin-top: 40/20rem;
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
    width: 32px;
    height: 40/47rem;
    > img {
        margin-top: 3/20rem;
        width: 50%;
        height: 40/47rem;
        margin-left: 4/20rem;
    }
}
.announcement {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 1;
    // box-shadow:0 0.1rem 32px 0px #aaa;
    color: #fff;
    background: rgba(0,0,0,0.5);

    > div:nth-of-type(2) {
        padding: 0.2rem 0 2/20rem;
        width: 90%;
        overflow: hidden;
        display: flex;
        align-items: center;
        p {
            white-space: nowrap;
        }
    }
}
.juzho{
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
  .ali_pc{
    width: 30/20rem;
    background-repeat: no-repeat;
    height: 20/20rem;
    background-size: 20/20rem 20/20rem;

  }
     >li{
       display: flex;
       justify-content: center;
       align-items: center;
       background-color: #d6e0ea;
       padding: 5/20rem;
       >a{
         color: #245da0;
       }
     }
}
.gameClass {
    padding-top: 5/20rem;
    padding-left:0.2rem;
    padding-right:0.2rem;
    padding-bottom:5/20rem;
    background-color: #dbe2ea;

    > div {
        border-radius: 0.5rem 0.5rem 0 0;
        overflow: hidden;
        border-top: 0.5rem solid #f8f9fb;

        > div {
            margin-top: -0.5rem;
            >div:nth-last-of-type(1){
              >ul{
                border-bottom-left-radius: 11/20rem;
                border-bottom-right-radius: 11/20rem;
              }

            }

            > div {
                // border-radius:0.5rem 0.5rem 0 0;
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
                                width:4.1rem;
                            }
                            span:nth-child(2) {
                                font-size: 22/47rem;
                                text-align:left;
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
        margin: 0 6/20rem;
      }
      button:nth-of-type(2) {
        height: 32/20rem;
        float: right;

      }
      button {
        border-radius: 0.3rem;
        text-align: center;
        padding: 0;
        width: 56/20rem;
        outline: none;
        border: 0px ;
        outline: none;
        font-size: 14/20rem;
        color: #3a3a3a;
        background-color: white;
        >div{
          width: 40/20rem;
          > span:nth-of-type(2) {
            font-size: 10/20rem;
            display: block;
          }
          > span:nth-of-type(1) {
            display: block;
          }
        }
      }
      img {
        width: 20/20rem;
        margin-right: 3/20rem;
        height: 24/20rem;
      }
      .username {
        font-size: 14/20rem;
        width: 68/20rem;
        text-overflow: ellipsis;
        overflow: hidden;
        background-image: url(../../../static/images/user.png);
        background-repeat: no-repeat;
        background-size: 20/20rem;
        padding-left: 20/20rem;
      }
      .test{
        padding-left: 16/20rem;
        background-size: 20/20rem;
        background-repeat: no-repeat;
        background-position:0 4/20rem ;
      }
      .login_b{
        background-size: 20/20rem;
        background-repeat: no-repeat;
        background-position:1/20rem 4/20rem ;
        >div{
          transform: translateX(16/20rem);
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
    background: rgba(0,0,0,0.5);
    top: 0;
    height: 100%;
    position: absolute;
    width: 100%;
}
.recommend_nav{

  .swiper-box{
    margin-top: 12/20rem;
    >div{
      height: 76/20rem;
    }
  }

  .nav_list_group{
    font-size: 0;
  }

  .nav_list{
    font-size: 12/20rem;
    display: inline-block;
    width: 24.5%;
    text-align: center;
    span{
      display: block;
    }
    >div{
      >a{
        >img{
          height: auto;
        }
        span{
          color: #333;
        }
      }
    }
  }

  img{
    width: 40/20rem;
  }

  .swiper-pagination{
    margin-bottom: -7/20rem;
  }
}

.alert_right{
  position: absolute;
    right: .2rem;
    top: 2.2rem;
    // padding: 0.25rem 0.25rem;
    background:#fff;
    color: #151515;
    border-radius: 0.2rem;

    li{
      width: 8.5rem;
      text-align:left;
      line-height: 1.8rem;
      font-size:12/20rem;
      border-bottom: 1px solid #ccc;
      padding-left:1.8rem;
    }

  .money{
    display: flex;
    justify-content: space-between;
    padding-right: 3/20rem;
  }
}
.alert_right{
    >li:nth-of-type(1){
      border-bottom:1px solid #999999;
      padding-left:0.5rem;
       font-size: 14/20rem;
      color: #385efd;
    }

    >li:nth-of-type(2){
      background: url(../../../static/images/qiandai.png)  no-repeat 0.3rem 0.3rem ;
      background-size:1.2rem 1.2rem;
      span{
        color: #385efd;
      }
    }
    >li:nth-child(3){
      background: url(../../../static/images/czhi.png)  no-repeat 0.3rem 0.3rem ;
      background-size:1.2rem 1.2rem;
    }
    >li:nth-child(4){
      background: url(../../../static/images/xzhu.png)  no-repeat 0.3rem 0.3rem ;
      background-size:1.2rem 1.2rem;
    }
     >li:nth-child(5){
      background: url(../../../static/images/gren.png)  no-repeat 0.3rem 0.3rem ;
      background-size:1.2rem 1.2rem;
    }
     >li:nth-child(6){
      background: url(../../../static/images/lxi.png)  no-repeat 0.3rem 0.3rem ;
      background-size:1.2rem 1.2rem;
    }
     >li:nth-child(7){
      background: url(../../../static/images/tchu.png)  no-repeat 0.3rem 0.3rem ;
      background-size:1.2rem 1.2rem;
      border:none;
    }
}

.alert_right:before{
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

  .mask{
    position: fixed;
    width: 100%;
    background: rgba(0,0,0,0.4);
    height: 100vh;
    z-index: 9;
  }

.modal_box_feedback_regist {
  z-index: 99999;
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    background: rgba(0,0,0,0.5);
    color: white;
    padding: 10px 40px;
    border-radius: 4px;
  }
}

.open_lottery{
  width: 74/20rem;
}
.game_55{
  .border_left{
    >span:nth-of-type(1){
      width: 88/20rem!important;
    }
  }
}
.game_40{
  .border_left{
    >span:nth-of-type(1){
      width: 70/20rem!important;
    }
  }
}
.game_35{
  .border_left{
    >span:nth-of-type(1){
      width: 70/20rem!important;
    }
  }
}
.game_30{
  .border_left{
    >span:nth-of-type(1){
      margin-right: 0!important;
    }
  }
}
.game_25{
  .border_left{
    >span:nth-of-type(1){
      margin-right: 1/20rem!important;
    }
  }
}

</style>
