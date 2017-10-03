<template>
  <section class="information" :style="{marginTop: isIosWebview ? '2.9rem' : '1.9rem'}">

    <div>
      <div>
        <div>{{lotteryObj.next.round ? `${lotteryObj.next.round}期` : `已封盘`}}</div>
        <div>
          <span>余额:</span>
          <span class="balance color_money">{{Number(zMoney).toFixed(2)}}</span>
          <!--<span>开奖时间:</span>
          <span>{{myfilter(endtime,endtime-fentime)}}</span>-->
        </div>
      </div>
      <div :style="{'marginLeft':xgcmager}">
        <div ref="xgcendtime" :style="{'fontSize':bigger}" style="margin-top: 0.1rem;">
          <span style="    margin-left: 0.1rem;">开奖时间:</span>
          <span>{{lotteryObj.next.round ? `${myfilter(endtime, endtime - fentime)}` : `00:00`}}</span>
        </div>
        <div>
          <div>
            <i
              style="font-size: 1.4rem; line-height: 1.2rem;margin-right: 0.25rem;color: #333;margin-top: 0.05rem;">封</i>
            <span v-show="xglhc==true"><span>{{lotteryObj.next.round ? `${h}` : `--`}}</span><i>:</i></span>
            <span>{{lotteryObj.next.round ? `${m}` : `--`}}</span>
            <i>:</i>
            <span>{{lotteryObj.next.round ? `${s}` : `--`}}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="lottory_time" style="margin-top: -1rem;">
        <span>上期开奖</span>
      </div>
      <div class="lotteryOpen">
        <ul>
          <li v-for="(v,i) in lotteryObj.last.number" :class="`color_${v}`">{{v}}</li>
        </ul>
      </div>
      <!--北京PK10-->
      <div class="sxh bjpksxh" v-show="bjpk==true">
        <ul>
          <li style="background-color: #eaeaea;">冠亚和</li>
          <li>{{pkygh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;">1-5球</li>
          <li>{{pkone}}</li>
          <li>{{pktwo}}</li>
          <li>{{pkthree}}</li>
          <li>{{pkfour}}</li>
          <li>{{pkfive}}</li>
        </ul>
      </div>
      <!--重庆时时彩-->
      <div class="sxh cqsscsxh" v-show="cqssc==true">
        <ul>
          <li style="background-color: #eaeaea;">总和</li>
          <li>{{kjzh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;">龙虎</li>
          <li>{{lh}}</li>
        </ul>
      </div>
      <!--广东快乐十分-->
      <div class="sxh gdklsfsxh" v-show="gdklsf==true">
        <ul>
          <li style="background-color: #eaeaea;">总和</li>
          <li>{{kjzh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;">尾大小</li>
          <li>{{wdx}}</li>
          <li style="background-color: #eaeaea;">1-4球</li>
          <li>{{pkone}}</li>
          <li>{{pktwo}}</li>
          <li>{{pkthree}}</li>
          <li>{{pkfour}}</li>
        </ul>
      </div>
      <!--重庆幸运农场-->
      <div class="sxh cqxynsxh" v-show="cqxync==true">
        <ul>
          <li style="background-color: #eaeaea;">总和</li>
          <li>{{kjzh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;">尾大小</li>
          <li>{{wdx}}</li>
          <li style="background-color: #eaeaea;">1-4球</li>
          <li>{{pkone}}</li>
          <li>{{pktwo}}</li>
          <li>{{pkthree}}</li>
          <li>{{pkfour}}</li>
        </ul>
      </div>
      <!--PC蛋蛋-->
      <div class="sxh pcddsxh" v-show="pcdd==true">
        <ul>
          <li style="background-color: #eaeaea;">总和</li>
          <li>{{pcddzh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>


        </ul>
      </div>
      <!--幸运飞艇-->
      <div class="sxh xyftsxh" v-show="xyft==true">
        <ul>
          <li style="background-color: #eaeaea;">冠亚和</li>
          <li>{{pkygh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;">1-5球</li>
          <li>{{pkone}}</li>
          <li>{{pktwo}}</li>
          <li>{{pkthree}}</li>
          <li>{{pkfour}}</li>
          <li>{{pkfive}}</li>
        </ul>
      </div>
      <!--香港彩-->
      <div class="sxh xgcsxh" v-show="xglhc==true">
        <ul>
          <li style="background-color: #eaeaea;">总分</li>
          <li>{{kjzh}}</li>
          <li style="background-color: #eaeaea;">生肖</li>
          <li>{{xgcone}}</li>
          <li>{{xgctwo}}</li>
          <li>{{xgcthree}}</li>
          <li>{{xgcfour}}</li>
          <li>{{xgcfive}}</li>
          <li>{{xgcsix}}</li>
          <li>{{xgcseven}}</li>
        </ul>
      </div>
    </div>

 
  </div>
</section>
</template>
<script>
  export default {
    data() {
      return {
        isIosWebview: isIosWebview,
        h: 0,
        m: 0,
        s: 0,
        lastRound: 0,
        yMoney: 0,
        bjpk: false,
        cqssc: false,
        xyft: false,
        gdklsf: false,
        cqxync: false,
        xglhc: false,
        pcdd: false,
        bigger: '0.6rem',
        xgcmager: '2rem',
        pkygh: '',
        pkyhgdx: '',
        pkyghds: '',
        pkone: '',
        pktwo: '',
        pkthree: '',
        pkfour: '',
        pkfive: '',
        kjzh: '',
        lh: '',
        wdx: '',
        pcddzh: '',
        pcddone: '',
        pcddtwo: '',
        pcddthree: '',
        xgcone: '',
        xgctwo: '',
        xgcthree: '',
        xgcfour: '',
        xgcfive: '',
        xgcsix: '',
        xgcseven: '',

        // round:0,
        // entime:0
      }
    },
    mounted() {


    },
    props: {
      lotteryObj: {
        type: Object
      },
      endtime: {
        type: Number
      },
      fentime: {
        type: Number
      },
      zMoney: {
        type: Number
      },
      gameType: {
        type: String,
        default: "55"
      }

    },
    created(){
      this._getAttrNames();

      // this.endtime = this.lotteryObj.endtime;
    },
    methods: {
      // 获取生肖属性
      _getAttrNames(){
        this.lastRound = (this.lotteryObj.last.round);
				console.log(this.lotteryObj.last.round)
        switch (this.gameType) {
          case '15':

            this.pcdd = true
            this.pcddzh = parseInt(this.lotteryObj.last.number[0]) + parseInt(this.lotteryObj.last.number[1]) + parseInt(this.lotteryObj.last.number[2])

            if (this.pcddzh % 2 == 0) {
              this.pkyghds = '双'
            } else {
              this.pkyghds = '单'
            }

            if (this.pcddzh >= 14) {
              this.pkyhgdx = '大'
            } else {
              this.pkyhgdx = '小'
            }
            break;
          case '20':
            this.xglhc = true;
            this.bigger = "0.65rem"
            this.xgcmager = "-0.2rem"
            this.kjzh = parseInt(this.lotteryObj.last.number[0]) + parseInt(this.lotteryObj.last.number[1]) + parseInt(this.lotteryObj.last.number[2]) + parseInt(this.lotteryObj.last.number[3]) + parseInt(this.lotteryObj.last.number[4]) + parseInt(this.lotteryObj.last.number[5]) + parseInt(this.lotteryObj.last.number[6])
            this.xgcone = this.lotteryObj.last.zodiac[0]
            this.xgctwo = this.lotteryObj.last.zodiac[1]
            this.xgcthree = this.lotteryObj.last.zodiac[2]
            this.xgcfour = this.lotteryObj.last.zodiac[3]
            this.xgcfive = this.lotteryObj.last.zodiac[4]
            this.xgcsix = this.lotteryObj.last.zodiac[5]
            this.xgcseven = this.lotteryObj.last.zodiac[6]
            break;
          case '25':

            this.cqxync = true
            this.kjzh = parseInt(this.lotteryObj.last.number[0]) + parseInt(this.lotteryObj.last.number[1]) + parseInt(this.lotteryObj.last.number[2]) + parseInt(this.lotteryObj.last.number[3]) + parseInt(this.lotteryObj.last.number[4]) + parseInt(this.lotteryObj.last.number[5]) + parseInt(this.lotteryObj.last.number[6]) + parseInt(this.lotteryObj.last.number[7])
            if (this.kjzh >= 85) {
              this.pkyhgdx = '大'
            } else {
              this.pkyhgdx = '小'
            }

            if (this.kjzh % 2 == 0) {
              this.pkyghds = '双'
            } else {
              this.pkyghds = '单'
            }

            if (this.kjzh.toString().substr(this.kjzh.toString().length-1) >= 5) {
              this.wdx = "尾大"
            } else {
              this.wdx = "尾小"
            }

            if (parseInt(this.lotteryObj.last.number[0]) > parseInt(this.lotteryObj.last.number[7])) {
              this.pkone = '龙'
            } else {
              this.pkone = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[1]) > parseInt(this.lotteryObj.last.number[6])) {
              this.pktwo = '龙'
            } else {
              this.pktwo = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[2]) > parseInt(this.lotteryObj.last.number[5])) {
              this.pkthree = '龙'
            } else {
              this.pkthree = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[3]) > parseInt(this.lotteryObj.last.number[4])) {
              this.pkfour = '龙'
            } else {
              this.pkfour = '虎'
            }
            break;
          case '35':
            this.xyft = true

            this.pkygh = parseInt(this.lotteryObj.last.number[1]) + parseInt(this.lotteryObj.last.number[0])
            if (this.pkygh > 11) {
              this.pkyhgdx = '大'
            } else {
              this.pkyhgdx = '小'
            }
            if (this.pkygh % 2 == 0) {
              this.pkyghds = '双'
            } else {
              this.pkyghds = '单'
            }
            if (parseInt(this.lotteryObj.last.number[0]) > parseInt(this.lotteryObj.last.number[9])) {
              this.pkone = '龙'
            } else {
              this.pkone = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[1]) > parseInt(this.lotteryObj.last.number[8])) {
              this.pktwo = '龙'
            } else {
              this.pktwo = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[2]) > parseInt(this.lotteryObj.last.number[7])) {
              this.pkthree = '龙'
            } else {
              this.pkthree = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[3]) > parseInt(this.lotteryObj.last.number[6])) {
              this.pkfour = '龙'
            } else {
              this.pkfour = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[4]) > parseInt(this.lotteryObj.last.number[5])) {
              this.pkfive = '龙'
            } else {
              this.pkfive = '虎'
            }
            break;
          case '30':

            this.gdklsf = true
            this.kjzh = parseInt(this.lotteryObj.last.number[0]) + parseInt(this.lotteryObj.last.number[1]) + parseInt(this.lotteryObj.last.number[2]) + parseInt(this.lotteryObj.last.number[3]) + parseInt(this.lotteryObj.last.number[4]) + parseInt(this.lotteryObj.last.number[5]) + parseInt(this.lotteryObj.last.number[6]) + parseInt(this.lotteryObj.last.number[7])
            if (this.kjzh >= 85) {
              this.pkyhgdx = '大'
            } else {
              this.pkyhgdx = '小'
            }
            if (this.kjzh % 2 == 0) {
              this.pkyghds = '双'
            } else {
              this.pkyghds = '单'
            }
            if (this.kjzh.toString().substr(this.kjzh.toString().length-1) >= 5) {
              this.wdx = "尾大"
            } else {
              this.wdx = "尾小"
            }
            if (parseInt(this.lotteryObj.last.number[0]) > parseInt(this.lotteryObj.last.number[7])) {
              this.pkone = '龙'
            } else {
              this.pkone = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[1]) > parseInt(this.lotteryObj.last.number[6])) {
              this.pktwo = '龙'
            } else {
              this.pktwo = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[2]) > parseInt(this.lotteryObj.last.number[5])) {
              this.pkthree = '龙'
            } else {
              this.pkthree = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[3]) > parseInt(this.lotteryObj.last.number[4])) {
              this.pkfour = '龙'
            } else {
              this.pkfour = '虎'
            }
            break;
          case '35':

            this.xyft = true
            this.pkygh = parseInt(this.lotteryObj.last.number[1]) + parseInt(this.lotteryObj.last.number[0])
            if (this.pkygh > 11) {
              this.pkyhgdx = '大'
            } else {
              this.pkyhgdx = '小'
            }
            if (this.pkygh % 2 == 0) {
              this.pkyghds = '双'
            } else {
              this.pkyghds = '单'
            }
            if (parseInt(this.lotteryObj.last.number[0]) > parseInt(this.lotteryObj.last.number[9])) {
              this.pkone = '龙'
            } else {
              this.pkone = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[1]) > parseInt(this.lotteryObj.last.number[8])) {
              this.pktwo = '龙'
            } else {
              this.pktwo = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[2]) > parseInt(this.lotteryObj.last.number[7])) {
              this.pkthree = '龙'
            } else {
              this.pkthree = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[3]) > parseInt(this.lotteryObj.last.number[6])) {
              this.pkfour = '龙'
            } else {
              this.pkfour = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[4]) > parseInt(this.lotteryObj.last.number[5])) {
              this.pkfive = '龙'
            } else {
              this.pkfive = '虎'
            }
            break;
          case '40':

            this.cqssc = true
            this.kjzh = parseInt(this.lotteryObj.last.number[0]) + parseInt(this.lotteryObj.last.number[1]) + parseInt(this.lotteryObj.last.number[2])
              + parseInt(this.lotteryObj.last.number[3]) + parseInt(this.lotteryObj.last.number[4])

            if (this.kjzh >= 23) {
              this.pkyhgdx = '大'
            } else {
              this.pkyhgdx = '小'
            }
            if (this.kjzh % 2 == 0) {
              this.pkyghds = '双'
            } else {
              this.pkyghds = '单'
            }
            if (parseInt(this.lotteryObj.last.number[0]) > parseInt(this.lotteryObj.last.number[4])) {
              this.lh = '龙'
            } else if (parseInt(this.lotteryObj.last.number[0]) < parseInt(this.lotteryObj.last.number[4])) {
              this.lh = '虎'
            } else {
              this.lh = '和'
            }
            break;
          case '55':
            this.bjpk = true
            this.xhcLeft = '3.2rem'
            this.pkygh = parseInt(this.lotteryObj.last.number[1]) + parseInt(this.lotteryObj.last.number[0])
            if (this.pkygh > 11) {
              this.pkyhgdx = '大'
            } else {
              this.pkyhgdx = '小'
            }
            if (this.pkygh % 2 == 0) {
              this.pkyghds = '双'
            } else {
              this.pkyghds = '单'
            }
            if (parseInt(this.lotteryObj.last.number[0]) > parseInt(this.lotteryObj.last.number[9])) {
              this.pkone = '龙'
            } else {
              this.pkone = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[1]) > parseInt(this.lotteryObj.last.number[8])) {
              this.pktwo = '龙'
            } else {
              this.pktwo = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[2]) > parseInt(this.lotteryObj.last.number[7])) {
              this.pkthree = '龙'
            } else {
              this.pkthree = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[3]) > parseInt(this.lotteryObj.last.number[6])) {
              this.pkfour = '龙'
            } else {
              this.pkfour = '虎'
            }
            if (parseInt(this.lotteryObj.last.number[4]) > parseInt(this.lotteryObj.last.number[5])) {
              this.pkfive = '龙'
            } else {
              this.pkfive = '虎'
            }
            break;

        }
      },
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

      }
    },
    watch: {
      lotteryObj:{
        handler: function()  {
            this._getAttrNames();
        },
        deep:true
      }
    }

  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @blue: #146cdc;
  @font_title: #ffffff;
  @font_round: rgb(0, 0, 0);
  @font_balance: #6993d5;
  .information {
    z-index: 9;
    background: white;
    width: 100%;
    margin-top: 38/20rem;
    .balance {
      color: @font_balance;
      min-width: 50/20rem;
      display: inline-block;
    }
    > div:nth-of-type(1) {
      display: flex;
      height: 120/46.875rem;
      border-bottom: 1px solid #f3f3f3;
      > div:nth-of-type(1) {
        width: 60%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* border-right: 1px solid #f3f3f3;*/
        padding-left: 10/20rem;
        font-size: 12/20rem;
        > div:nth-of-type(1) {
          font-size: 20/20rem;
          color: @font_round;

        }
      }
      > div:nth-of-type(2) {
        width: 38%;
        color: #666666;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        flex-direction: column;
        > div:nth-of-type(1) {
          font-size: 12/20rem;
        }
        > div:nth-of-type(2) {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            display: flex;
            justify-content: center;
            font-size: 19/20rem;
            i {
              display: inline-block;
              margin: 0 1/20rem;
            }
            span {
              > span {
                background: #404040;
                color: @font_title;
                display: inline-block;
                width: 56/46.875rem;
                height: 62/46.875rem;
                border-radius: 3/20rem;
                line-height: 26/20rem;
              }
            }
            > span:nth-of-type(2) {
              background: #404040;
              color: @font_title;
              display: inline-block;
              width: 56/46.875rem;
              height: 62/46.875rem;
              border-radius: 3/20rem;
              line-height: 26/20rem;
            }

            > span:nth-of-type(3) {
              background: #404040;
              color: @font_title;
              display: inline-block;
              width: 56/46.875rem;
              height: 62/46.875rem;
              border-radius: 3/20rem;
              line-height: 26/20rem;
            }
          }
        }
      }
    }
    > div:nth-of-type(2) {
      position: relative;
      height: 100/46.875rem;;
      display: flex;
      align-items: center;
      font-size: 12/20rem;
      z-index: 3;
      > div:nth-of-type(1) {
      /*  width: 65/20rem;*/
        display: flex;
        justify-content: flex-start;
        padding-left: 10/20rem;
      }
      > div:nth-of-type(2) {
        width: auto;
        margin-top: -1rem;
        > ul {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          margin-left: 1/20rem;
          li {
            color: @font_title;
            margin-left: 1.5/20rem;
            width: 45/46.875rem;;
            height: 45/46.875rem;
            text-align: center;
            background: @blue;
            border-radius: 10/20rem;
            border: 1px solid #333;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            margin-left: 0.2rem;
            >i {
              font-size: 14/20rem;
              display: block;
            }
          }
        }
      }
      > .sxh {
        position: absolute;
        left: 0.5rem;
        top: 1.2rem;
        width:;
        /*border: 1px solid red;*/
        > ul {
          overflow: hidden;
          /*  	width: 690/46.875rem;*/
          > li {
            display: inline-block;
            float: left;
            border-right: 1px solid #C0C0C0;
            border-bottom: 1px solid #C0C0C0;
            border-top: 1px solid #C0C0C0;
          }
          > li:nth-child(1) {
            border-left: 1px solid #C0C0C0;
          }
        }
      }
      > .bjpksxh, .xyftsxh {
        > ul {

          > li {
            /*padding: 36/46.875rem 0.32rem;
                  font-size: 24/46.875rem;*/
            /*		display: block;*/
            font-size: 24/46.875rem;
            height: 36/46.875rem;
            padding: 0 0.25rem;
            line-height: 36/46.875rem;
          }
        }
      }
      > .cqsscsxh {
        > ul {

          > li {
            display: block;
            font-size: 24/46.875rem;
            height: 36/46.875rem;
            padding: 0 0.83rem;
            line-height: 36/46.875rem;
          }
        }
      }
      > .gdklsfsxh, .cqxynsxh {
        > ul {
          > li {
            display: block;
            font-size: 24/46.875rem;
            height: 36/46.875rem;
            padding: 0 0.18rem;
            line-height: 36/46.875rem;
          }
        }
      }
      > .pcddsxh {
        > ul {
          > li {
            display: block;
            font-size: 24/46.875rem;
            height: 36/46.875rem;
            padding: 0 1.47rem;
            line-height: 36/46.875rem;
          }
        }
      }
      > .xgcsxh {
        > ul {
          > li {
            display: block;
            font-size: 24/46.875rem;
            height: 36/46.875rem;
            padding: 0 0.35rem;
            line-height: 36/46.875rem;
          }
        }
      }
    }
    .lotteryOpen {
      display: flex;
      ul {
        margin-left: -2/20rem
      }
    }
  }

  .lottory_time {
    display: flex;
    flex-wrap: wrap;
  }

  .game_55 {
    .lotteryOpen {
      > ul {
        > .color_1 {
          background: #fff600 !important;
        }
        > .color_2 {
          background: #008fff !important;
        }
        > .color_3 {
          background: #4b4b4b !important;
        }
        > .color_4 {
          background: #ff7600 !important;
        }
        > .color_5 {
          background: #7cfdff !important;
        }
        > .color_6 {
          background: #5234ff !important;
        }
        > .color_7 {
          background: #e4e4e4 !important;
        }
        > .color_8 {
          background: #ff2600 !important;
        }
        > .color_9 {
          background: #780b00 !important;
        }
        > .color_10 {
          background: #07bf00 !important;
        }
        > li {
          border-radius: 4/20rem !important;
        }
      }
    }
  }

  .game_20 {
    .lotteryOpen {
      > ul {
        .color_1,
        .color_2,
        .color_7,
        .color_8,
        .color_12,
        .color_13,
        .color_18,
        .color_19,
        .color_23,
        .color_24,
        .color_29,
        .color_30,
        .color_34,
        .color_35,
        .color_40,
        .color_45,
        .color_46 {
          background-color: #ff3545 !important;
        }
        .color_3,
        .color_4,
        .color_9,
        .color_10,
        .color_14,
        .color_15,
        .color_20,
        .color_25,
        .color_26,
        .color_31,
        .color_36,
        .color_37,
        .color_41,
        .color_42,
        .color_47,
        .color_48 {
          background-color: #4f57fa !important;
        }
        .color_5,
        .color_6,
        .color_11,
        .color_16,
        .color_17,
        .color_21,
        .color_22,
        .color_27,
        .color_28,
        .color_32,
        .color_33,
        .color_38,
        .color_39,
        .color_43,
        .color_44,
        .color_49 {
          background-color: #22620c !important;
        }
      }
    }
  }

  .game_35 {
    .lotteryOpen {
      > ul {

        > .color_1 {
          background: #fff600 !important;
        }
        > .color_2 {
          background: #008fff !important;
        }
        > .color_3 {
          background: #4b4b4b !important;
        }
        > .color_4 {
          background: #ff7600 !important;
        }
        > .color_5 {
          background: #7cfdff !important;
        }
        > .color_6 {
          background: #5234ff !important;
        }
        > .color_7 {
          background: #e4e4e4 !important;
        }
        > .color_8 {
          background: #ff2600 !important;
        }
        > .color_9 {
          background: #780b00 !important;
        }
        > .color_10 {
          background: #07bf00 !important;
        }
        > li {
          border-radius: 4/20rem !important;
        }
      }
    }
  }

  .game_30 {
    .lotteryOpen {
      > ul {
        > .color_19 {
          background: #df3836 !important;
        }
        > .color_20 {
          background: #df3836 !important;
        }
      }
    }
  }

  .game_30, .game_35, .game_55 {
    .lotteryOpen {
      > ul {
        > li {
          text-shadow: -1px 2px 2px #000000;
        }
      }
    }
  }

  .game_25 {
    .lotteryOpen {
      > ul {
        > li {
          font-size: 0px !important;
          border: none !important;
        }
        > .color_01 {
          background: url(../../static/images/xync_1.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_02 {
          background: url(../../static/images/xync_2.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_03 {
          background: url(../../static/images/xync_3.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_04 {
          background: url(../../static/images/xync_5.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_05 {
          background: url(../../static/images/xync_5.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_06 {
          background: url(../../static/images/xync_6.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_07 {
          background: url(../../static/images/xync_7.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_08 {
          background: url(../../static/images/xync_8.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_09 {
          background: url(../../static/images/xync_9.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_10 {
          background: url(../../static/images/xync_10.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_11 {
          background: url(../../static/images/xync_11.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_12 {
          background: url(../../static/images/xync_12.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_13 {
          background: url(../../static/images/xync_13.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_14 {
          background: url(../../static/images/xync_14.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_15 {
          background: url(../../static/images/xync_15.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_16 {
          background: url(../../static/images/xync_16.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_17 {
          background: url(../../static/images/xync_17.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_18 {
          background: url(../../static/images/xync_18.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_19 {
          background: url(../../static/images/xync_19.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
        > .color_20 {
          background: url(../../static/images/xync_20.png) no-repeat !important;
          background-size: 100% 100% !important;
        }
      }
    }
  }
</style>
