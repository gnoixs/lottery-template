xgl_time// 主页
<template>
<div>


  <dailog-q :type_code="type_code" :game_code="game_code" :money="money_s" :round="round" :lotteryM="objects" v-if="showDailogQ" v-on:listenToChildEvent="showMsgFromChild"></dailog-q>
  <dailog-w :type_code="type_code" :game_code="game_code" :money="money_s" :round="round" :indeT="indexT" :lotteryM="objects" v-if="showDailogW" v-on:listenToChildEvent="showMsgFromChild"></dailog-w>
  <dailog-s :type_code="type_code" :game_code="game_code" :money="money_s" :round="round" :lotteryM="objects" :typecode="typecode" v-if="showDailogS" v-on:listenToChildEvent="showMsgFromChild"></dailog-s>
  <lotteryHeader :title="title" :game_code="game_code" @regulation_click="regulation_control=true" ></lotteryHeader>

  <!--<div class="game_main">-->

  <lotteryArea class="game_20" :zMoney="zMoney" :lotteryObj="body" :endtime="endtime" :fentime="fentime" v-if="isOk"  gameType="20"></lotteryArea>

  <div class="nav_o">

    <ul :class="`${indexF} ${isShowNavf?'isShowNav':''}`" ref="firstNav">
      <li  class="" v-for="(itmek,indexNav) in datas" v-if="indexNav<4" :class="{active8:itmek.isCheck}" @click="changgeNav(itmek,indexNav)">{{itmek.name}}<span v-if="nav_i<4" @click.stop='updown()'></span></li>
    </ul>

    <ul :class="`${indexS} ${isShowNavs?'isShowNav':''}`" ref="secondNav">
      <li  class="" v-for="(itmek,indexNav) in datas" v-if="indexNav>=4&&indexNav<8" :class="{active8 :itmek.isCheck}" @click="changgeNav(itmek,indexNav)">{{itmek.name}}<span v-if="nav_i>=4&&nav_i<8" @click.stop='updown()'></span></li>
    </ul>
    <ul :class="`${indexTh} ${isShowNavt?'isShowNav':''}`" ref="threeNav">
      <li  class="" v-for="(itmek,indexNav) in datas" v-if="indexNav>=8" :class="{active8:itmek.isCheck}" @click="changgeNav(itmek,indexNav)">{{itmek.name}}<span v-if="nav_i>=8" @click.stop='updown()'></span></li>
    </ul>
  </div>
  <section v-for="(itemZ,indexZ) in datas" v-if="nav_i==indexZ" :class="`cqList${indexZ}`">

    <div style="width: 100%;" v-if="indexZ!=3&&indexZ!=5&&indexZ!=6&&indexZ!=7">
      <!--<h3>投注方式</h3>-->
      <ul>
        <li class="li_4" v-for='(item,index) in itemZ.datasT'>
          <button :disabled="item.isCheck" :class="{isred:item.isCheck}" @click="one(item,index,itemZ.datasT)">{{item._name}}</button>
        </li>
      </ul>
    </div>
    <ul>
      <li v-for="(item,j) in lotteryList.body">
      <!--  <span class='o_title'>{{item._name}}</span>-->
        <ul>
          <li v-for="(item,i) in item.list">
            <button :class="{active3:item.isCheck}" @click="isCheck(j,i,item)" :disabled="fengpan">
              <span v-bind:class="item.background">{{item.name}}</span>
              <span class="color_money">{{fengpan?"封盘":item.odds}}</span>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </section>
  <!--</div>-->

  <section class="bet_bar">
  <div>
   <!--   <i class="iconfont_reset"></i>-->
      <span class="qin" @click="qingkong">重置</span>
    </div>
    <div><span  style="color:#FFFFFF"  v-show="xshuzi>0">{{xshuzi}}</span><input  pattern="[0-9]*" v-model="money_s" placeholder="输入金额" @input="changes_m()" min="1" /></div>
    <div><button :class="{color1:isBlue}" class="gdcolor"  type="button" :disabled="!isBlue" @click="subMit">确认下注</button></div>

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
import dailogW from '../../components/dailogW.vue'
import dailogS from '../../components/dailogS.vue'
//import BScroll from 'better-scroll'

//import {
//  loginTrue,
//  getOid,
//  getXglhc,
//  getUrl
//} from '../../api'
// import drawer from '../../components/drawer'
// ,"正码特","正码1-6","过关","连码","半波","一肖\尾数","特码生肖","合肖","生肖连","位数连","全部中"
export default {
  data() {
    return {
      isShowNavf: false,
      isShowNavs: true,
      isShowNavt: true,
      firstNavisCheck: true,
      secondNavisCheck: false,
      threeNavisCheck: false,
      indexF: "nav_o_1",
      indexS: "nav_o_2",
      indexTh: "nav_o_3",
      classIndex: ['nav_o_1', 'nav_o_2', 'nav_o_3'],
      typecode: 617,
      xshuzi: 0,
      zMoney: 0,
      updownB: true,
      nav_i: 0,
      fentime: 60,
      wenzi: "",
      isShowS: false,
      zhanshi: false,
      regulation_control:false,
      isHao:false,

      datas: [{
          // claaName: "cqList1",
          name: "特码",
          isCheck: true,
          datasT: [{
              isCheck: true,
              _name: '特A',
              _index: "tma",
              typecode: 1

            },
            {
              isCheck: false,
              _name: '特B',
              _index: "tmb",
              typecode: 2
            }
          ]
        }, {
          name: "正码",
          isCheck: false,
          datasT: [{
              isCheck: true,
              _name: '正A',
              _index: "zhma",
              typecode: 3
            },
            {
              isCheck: false,
              _name: '正B',
              _index: "zhmb",
              typecode: 4
            }
          ]
        }, {
          isCheck: false,
          name: "正码特",
          datasT: [{
              isCheck: true,
              _name: '正1特',
              _index: "tm1",
              typecode: 5

            },
            {
              isCheck: false,
              _name: '正2特',
              _index: "tm2",
              typecode: 6

            },
            {
              isCheck: false,
              _name: '正3特',
              _index: "tm3",
              typecode: 7

            },
            {
              isCheck: false,
              _name: '正4特',
              _index: "tm4",
              typecode: 8

            },
            {
              isCheck: false,
              _name: '正5特',
              _index: "tm5",
              typecode: 9

            },
            {
              isCheck: false,
              _name: '正6特',
              _index: "tm6",
              typecode: 10
            }
          ]
        }, {
          name: "正码1-6",
          isCheck: false,
          datasT: [{
            isCheck: true,
            _index: "zhydl",
            typecode: 11
          }, ]
        }, {
          name: "连码",
          isCheck: false,
          datasT: [{
            isCheck: true,
            _name: "三全中(670)",
            _index: "lianm",
            typecode: 617,
            inde: 3,
            maxIsCheck:10

          }, {
            isCheck: false,
            _name: '三中二,三(20/110)',
            _index: "lianm",
            typecode: 619,
            inde: 3,
            maxIsCheck:10

          }, {
            isCheck: false,
            _name: "二全中(60)",
            _index: "lianm",
            typecode: 613,
            inde: 2,
            maxIsCheck:10

          }, {
            isCheck: false,
            _name: '二中特,二(25/50)',
            _index: "lianm",
            typecode: 615,
            inde: 2,
            maxIsCheck:10

          }, {
            isCheck: false,
            _name: "特串(150)",
            _index: "lianm",
            typecode: 616,
            inde: 2

          }, {
            isCheck: false,
            _name: '四中一(1.96)',
            _index: "lianm",
            typecode: 808,
            inde: 4,
            maxIsCheck:10

          }]
        }, {
          name: "半波",
          isCheck: false,
          datasT: [{
            isCheck: true,

            _index: "banbo",
            typecode: 14
          }, ]
        }, {
          name: "一肖/尾数",
          isCheck: false,
          datasT: [{
            isCheck: true,

            _index: "yxiao",
            typecode: 15
          }, ]
        }, {
          name: "特码生肖",
          isCheck: false,
          datasT: [{
            isCheck: true,

            _index: "tex",
            typecode: 16
          }, ]
        },
        {
          name: "合肖",
          isCheck: false,
          datasT: [{
              isCheck: true,
              _name: '二肖',
              _index: "hx2",
              typecode: 17,
              inde: 2
            },
            {
              isCheck: false,
              _name: '三肖',
              _index: "hx3",
              typecode: 18,
              inde: 3
            },
            {
              isCheck: false,
              _name: '四肖',
              _index: "hx4",
              typecode: 19,
              inde: 4
            },
            {
              isCheck: false,
              _name: '五肖',
              _index: "hx5",
              typecode: 20,
              inde: 5
            },
            {
              isCheck: false,
              _name: '六肖',
              _index: "hx6",
              typecode: 21,
              inde: 6
            },
          ]
        },
        {
          name: "生肖连",
          isCheck: false,
          datasT: [{
              isCheck: true,
              _name: '二肖连中',
              _index: "sxl2zh",
              typecode: 27,
              inde: 2,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '三肖连中',
              _index: "sxl3zh",
              typecode: 28,
              inde: 3,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '四肖连中',
              _index: "sxl4zh",
              typecode: 29,
              inde: 4,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '五肖连中',
              _index: "sxl5zh",
              typecode: 30,
              inde: 5,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '二肖连不中',
              _index: "sx2bzh",
              typecode: 31,
              inde: 2,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '三肖连不中',
              _index: "sx3bzh",
              typecode: 32,
              inde: 3,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '四肖连不中',
              _index: "sx4bzh",
              typecode: 33,
              inde: 4,
              maxIsCheck:8
            },
          ]
        },
        {
          name: "尾数连",
          isCheck: false,
          datasT: [{
              isCheck: true,
              _name: '二尾连中',
              _index: "wl2zh",
              typecode: 34,
              inde: 2,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '三尾连中',
              _index: "wl3zh",
              typecode: 35,
              inde: 3,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '四尾连中',
              _index: "wl4zh",
              typecode: 36,
              inde: 4,
              maxIsCheck:8
            },

            {
              isCheck: false,
              _name: '二尾连不中',
              _index: "wl2bz",
              typecode: 37,
              inde: 2,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '三尾连不中',
              _index: "wl3bz",
              typecode: 38,
              inde: 3,
              maxIsCheck:8
            },
            {
              isCheck: false,
              _name: '四尾连不中',
              _index: "wl4bz",
              typecode: 39,
              inde: 4,
              maxIsCheck:8
            },
          ]
        },
        {
          name: "全不中",
          isCheck: false,
          datasT: [{
              isCheck: true,
              _name: '五不中',
              _index: "bz5",
              typecode: 40,
              inde: 5
            },
            {
              isCheck: false,
              _name: '六不中',
              _index: "bz6",
              typecode: 41,
              inde: 6
            },
            {
              isCheck: false,
              _name: '七不中',
              _index: "bz7",
              typecode: 42,
              inde: 7
            },

            {
              isCheck: false,
              _name: '八不中',
              _index: "bz8",
              typecode: 43,
              inde: 8
            },
            {
              isCheck: false,
              _name: '九不中',
              _index: "bz9",
              typecode: 44,
              inde: 9
            },
            {
              isCheck: false,
              _name: '十不中',
              _index: "bz10",
              typecode: 45,
              inde: 10
            },
            {
              isCheck: false,
              _name: '十一不中',
              _index: "bz11",
              typecode: 46,
              inde: 11
            },
            {
              isCheck: false,
              _name: '十二不中',
              _index: "bz12",
              typecode: 47,
              inde: 12
            },
          ]
        },

      ],

      game_code: 69,
      type_code: 1,
      title: "香港六合彩",
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
      dadiao: "tma",
      indexT: 2,
      // maxIsCheck:null
      // pcznavc_a:1//二級選項卡，默認顯示兩面盤
    }
  },

  methods: {
    showMsgFromChild(data) {
      if (data === true) {
        let oidInfo = getOid();
        let prams = {
          oid: oidInfo
        }
        this.qingkong();
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
            this.zMoney = res.data.money

            sessionStorage.setItem('im_money', JSON.stringify(res.data.money))
          }

        })
      }
    },
    updown() {
      if (this.$refs.firstNav.className == "nav_o_1 ") {
        this.isShowNavs = !this.isShowNavs;
        this.isShowNavt = !this.isShowNavt;
      } else if (this.$refs.secondNav.className == 'nav_o_1 ') {
        this.isShowNavf = !this.isShowNavf
        this.isShowNavt = !this.isShowNavt;
      } else {
        this.isShowNavf = !this.isShowNavf;
        this.isShowNavs = !this.isShowNavs;
      }

    },


    changgeNav(itmek, index) {

      for (let i = 0; i < this.datas.length; i++) {
        this.datas[i].isCheck = false;
      }
      itmek.isCheck = true;
      if (index < 4) {
        this.indexF = this.classIndex[0];
        this.isShowNavf = false;
        this.isShowNavs = true;
        this.isShowNavt = true;
        this.indexS = this.classIndex[1];
        this.indexTh = this.classIndex[2];
      } else if (index >= 8) {
        this.indexTh = this.classIndex[0];
        this.isShowNavf = true;
        this.isShowNavs = true;
        this.isShowNavt = false;
        this.indexS = this.classIndex[1];
        this.indexF = this.classIndex[2];
      } else {
        this.indexS = this.classIndex[0];
        this.isShowNavf = true;
        this.isShowNavs = false;
        this.isShowNavt = true;
        this.indexTh = this.classIndex[1];
        this.indexF = this.classIndex[2];
      }
      for (let i = 0; i < itmek.datasT.length; i++) {
        if (itmek.datasT[i].isCheck) {
          this.lotteryList = getXglhc()[itmek.datasT[i]._index];
          this.dadiao = itmek.datasT[i]._index;
          if (index == 4) {
            this.type_code = 13;
            this.typecode = itmek.datasT[i].typecode;
            this.indexT = 3;
          } else {
            this.indexT = 2;
            this.type_code = itmek.datasT[i].typecode;
          }

        }
      }
      this.xshuzi = 0;
      this.isBlue = false;
      this.nav_i = index;
      this.object = {};
      if (!this.updownB) {
        this.updownB = !this.updownB;
      }

    },
    one(item, j, k) {

      // item.isCheck=false

      k.forEach(function(key) {
        key.isCheck = false
      })

      k[j].isCheck = true;
      this.indexT = k[j].inde;

      if (this.nav_i == 4) {
        this.typecode = k[j].typecode;
      } else {
        this.type_code = k[j].typecode;
      }

      this.lotteryList = getXglhc()[item._index];
      this.dadiao = item._index;
      this.object = {}
      this.xshuzi = 0;



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

      this.lotteryList = getXglhc()[this.dadiao];
      this.object = {}
    },
    subMit() {
      // this.seen=!this.seen
      this.objects = [];
      for (let i in this.object) {
        this.objects.push(this.object[i])

      }

      if (this.nav_i == 4) {

        if (this.objects.length < this.indexT||this.objects.length>10) {
          this.objects.length < this.indexT?this.wenzi = `至少选择${this.indexT}个号码`:this.wenzi =`最多选择10个号码`
          this.isShowS = true;
          this.objects = [];
          setTimeout(this.isSHowff, 1200)
          return
        } else {

          this.$store.dispatch('showDailogS')
          return
        }

      } else if (this.nav_i == 8) {

        if (this.objects.length != this.indexT) {
          this.wenzi = `请您选${this.indexT}号码`
          this.isShowS = true;
          this.objects = [];
          setTimeout(this.isSHowff, 1200)
          return
        } else {

          this.$store.dispatch('showDailogW')
          return
        }

      } else if (this.nav_i == 11) {
        if (this.indexT == 2) {
          this.indexT = 5
        }
        if (this.indexT == 5||this.indexT == 6||this.indexT == 7||this.indexT == 8){
          if (this.objects.length<this.indexT||this.objects.length>10) {
            this.objects.length < this.indexT ? this.wenzi = `至少选择${this.indexT}个号码`:this.wenzi = `最多选择10个号码`
            this.isShowS = true;
            this.objects = [];
            setTimeout(this.isSHowff, 1200)
            return
          }
        }
        else if (this.indexT == 9) {
          if (this.objects.length<this.indexT||this.objects.length>11) {
            this.objects.length < this.indexT ? this.wenzi = `至少选择${this.indexT}个号码`:this.wenzi = `最多选择11个号码`
            this.isShowS = true;
            this.objects = [];
            setTimeout(this.isSHowff, 1200)
            return
          }
        }
        else if (this.indexT == 10) {
          if (this.objects.length<this.indexT||this.objects.length>12) {
            this.objects.length < this.indexT ? this.wenzi = `至少选择${this.indexT}个号码`:this.wenzi = `最多选择12个号码`
            this.isShowS = true;
            this.objects = [];
            setTimeout(this.isSHowff, 1200)
            return
          }
        }
        else if (this.indexT == 11) {
          if (this.objects.length<this.indexT||this.objects.length>13) {
            this.objects.length < this.indexT ? this.wenzi = `至少选择${this.indexT}个号码`:this.wenzi = `最多选择13个号码`
            this.isShowS = true;
            this.objects = [];
            setTimeout(this.isSHowff, 1200)
            return
          }
        }
        else if (this.indexT == 12) {
          if (this.objects.length<this.indexT||this.objects.length>15) {
            this.objects.length < this.indexT ? this.wenzi = `至少选择${this.indexT}个号码`:this.wenzi = `最多选择15个号码`
            this.isShowS = true;
            this.objects = [];
            setTimeout(this.isSHowff, 1200)
            return
          }
        }
        this.$store.dispatch('showDailogW')
        return
      } else if (this.nav_i > 8) {

        if (this.objects.length < this.indexT) {
          this.wenzi = `至少选择${this.indexT}个号码`
          this.isShowS = true;
          this.objects = [];
          setTimeout(this.isSHowff, 1200)
          return
        } else if (this.objects.length > 8) {
          this.wenzi = `最多选择8个号码`
          this.isShowS = true;
          this.objects = [];
          setTimeout(this.isSHowff, 1200)
          return
        } else {

          this.$store.dispatch('showDailogW')
          return
        }

      }




      // if (this.shuju.lim.isCheck == true) {

      //   if (this.objects.length < this.lianxu.index || this.objects.length > 8) {
      //     this.objects.length > 8 ? this.wenzi = "最多投8个球" : this.wenzi = `不能少于${this.lianxu.index}`
      //     this.isShowS = true;
      //     this.objects = [];

      // setTimeout(this.isSHowff, 1200)
      // return
      //   }

      //   this.$store.dispatch('showDailogS')
      //
      //   return
      // }



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
      this.xshuzi = s


    },


  },
  computed: mapGetters([
    'showDailogQ',
    'showDailogW',
    'showDailogS'
  ]),
  //初始化
  created() {
    this.de = true;
    let newTime = Date.parse(new Date()) / 1000;
    let oldTime = localStorage.getItem('xgl_time');

    if (oldTime && newTime <= oldTime) {

      this.shuju = getXglhc();

      this.lotteryList = getXglhc().tma;
      this.shuju.tma.isCheck = true;

      let bodyS = localStorage.getItem('xgl_body');
      let oldTime = localStorage.getItem('xgl_time');
      let moneyX = sessionStorage.getItem('im_money');
      this.zMoney = parseFloat(moneyX)
      this.isOk = true;
      this.endtime = oldTime - newTime;
      this.body = JSON.parse(bodyS)
      this.round = this.body.next.round;
      this.de = false;

    } else {

      this.shuju = getXglhc();
      this.shuju.tma.isCheck = true;
      this.lotteryList = getXglhc().tma;

      this.shuju.tma.isCheck = true;

      let oidInfo = getOid();
      this.oid_info = oidInfo;
      let params = {
        params: {
          game_code: 69, //  登录账号
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

          this.shuju = getXglhc();
          this.lotteryList = getXglhc().tma;

          this.shuju.tma.isCheck = true;

          let timeStamp = res.data.next.timestap;
          this.body = res.data;
          this.endtime = res.data.next.endtime - timeStamp;
          this.round = res.data.next.round;
          let loaclTime = this.endtime + newTime;
          this.zMoney = res.data.lcurrency;
          sessionStorage.setItem('im_money', JSON.stringify(res.data.lcurrency))

          // localStorage.setItem('xgl_time', res.data.next.endtime)
          localStorage.setItem('xgl_time', loaclTime)
          localStorage.setItem('xgl_body', JSON.stringify(res.data))
          this.lotteryList = getXglhc().tma;
          this.numberList = res.data.last.number;
          this.round = res.data.next.round;
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
            game_code: 69,
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
            let moneyX = sessionStorage.getItem('im_money')

            this.zMoney = parseFloat(moneyX)
            this.shuju = getXglhc();
            this.lotteryList = getXglhc().tma;
            this.lotteryList.isCheck = true;

            let timeStamp = res.data.next.timestap;
            this.body = res.data;
            this.endtime = res.data.next.endtime - timeStamp;
            this.round = res.data.next.round;
            let loaclTime = this.endtime + newTime;
            this.zMoney = res.data.lcurrency;
            sessionStorage.setItem('im_money', JSON.stringify(res.data.lcurrency))


            // localStorage.setItem('xgl_time', res.data.next.endtime)
            localStorage.setItem('xgl_time', loaclTime)
            localStorage.setItem('xgl_body', JSON.stringify(res.data))
            this.lotteryList = getXglhc().tma;
            this.numberList = res.data.last.number;
            this.round = res.data.next.round;
          }

        })


      } else if (this.endtime <= 60 && this.endtime > 0) {

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
    dailogW,
    dailogS
    // 'ex-simple': model,

  }
}
</script>



<style lang="less" rel="stylesheet/less" scoped>


button {
    outline: none;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.cqList4 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    > div {
        width: 100%;

        background: #dde5ec;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
        }
        ul {
            text-align: center;
            width: 100%;
            li {
              display: inline-block;
              margin: 0 2/20rem;
                button {
                    position: relative;
                    width: 5.033333rem;
                    text-align: center;
                    height: 116/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.3rem auto;
                    background: #fff;
                    line-height: 116/60rem;
                    font-size: 8/20rem;
                    border-radius: 3/20rem;
                    padding: 0;
                }
                .isred:before {
                    content: "";
                    background: url("../../../static/images/red1.png") no-repeat;
                    background-size: 0.55rem 0.55rem;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    width: 0.55rem;
                    height: 0.55rem;
                }
                .isred {
                    border: 1px solid #ed0132;
                }
            }
        }
    }
    ul {
        > li {
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
                background: #dde5ec;
                text-align: center;
                li {
                    display: inline-block;
                    width: 3.5rem;
                    margin: 0 4/20rem;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 3.5rem;
                        height: 2rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto 0;
                        background: #fff;
                        line-height: 40/45rem;
                        border-radius: 3/20rem;
                        padding:0;
                        // display: flex;
                        // flex-direction: column;
                        // align-items: center;
                        > span:nth-child(2) {
                            /*height: 38/45rem;*/
                           color: #5084e2;
                          font-size:12/20rem;
                          font-family: Arial!important;
                          display:block;
                          width: 100%;
                          height: 40%;
                          line-height:0.9rem;
                          margin-bottom: -0.1rem;
                          background:linear-gradient(#eef1f5, #fff);
                        background: -webkit-linear-gradient(#eef1f5, #fff)
                        }
                        > span:nth-child(1) {
                             line-height:1.5;
                             text-align:center;
                         height:60%;
                         // display:block;
                         font-size:32/40rem;
                        }
                        .red {
                            /*background: url("../../../static/images/lm_red.png") no-repeat;*/
                            /*border: 1px solid red;*/
                            background: #ff3545;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .blue {
                            background: #4f57fa;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .green {
                            background: #22620c;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                    }

                    .active {
                       border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }
                li:nth-child(45) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
                li:nth-child(45),
                li:nth-child(46),
                li:nth-child(47),
                li:nth-child(48),
                li:nth-child(49) {
                    width: 3.2rem;
                    margin: 0;
                    button {
                        width: 2.8rem;
                    }
                }
            }
        }
        li:nth-child(2) {
            > ul {
                li:nth-child(4) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
            }

        }
    }
}
.cqList0 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    > div {
        /*height: 73/20rem;*/
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        background:#dde5ec;

        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
            /*margin-left: -4px;*/
        }
        ul {
            text-align: center;
            width: 100%;

            li {
                display: inline-block;
                margin: 0 4/20rem;
                button {
                    position: relative;
                    width: 430/60rem;
                    text-align: center;
                    height: 93/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.3rem auto;
                    background: #fff;
                    line-height: 93/60rem;
                    font-size: 38/60rem;
                    border-radius: 3/20rem;
                }
                .isred:before {
                    content: "";
                    background: url("../../../static/images/red1.png") no-repeat;
                    background-size: 0.55rem 0.55rem;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    width: 0.55rem;
                    height: 0.55rem;
                }
                .isred {
                    border: 1px solid #ed0132;
                }
            }
        }
    }
    ul {
        > li {
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

                 background:#dde5ec;
                justify-content: space-around;
                text-align: center;
                li {
                    display: inline-block;
                    width: 180/45rem;
                     button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 3.75rem;
                        height: 2rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto;
                        background: #fff;
                        line-height: 40/45rem;
                        border-radius: 3/20rem;
                        padding:0;
                        > span:nth-child(2) {
                            color: #5084e2;

                              font-family: Arial!important;
                              display:block;
                              width: 100%;
                              height: 40%;
                              margin-bottom: -0.1rem;
                              line-height:0.9rem;
                            background:linear-gradient(#eef1f5, #fff);
                        background: -webkit-linear-gradient(#eef1f5, #fff);
                            font-size: 12/20rem;
                        }
                        > span:nth-child(1) {
                            padding-top: 3px;
                            padding-bottom: 3px;
                            font-size: 14/20rem;
                            height: 21/20rem;
                            display: inline-block;
                            width: 48/20rem;
                            font-weight: normal;
                            font-family: "arial";
                        }

                        .red {
                            /*background: url("../../../static/images/lm_red.png") no-repeat;*/
                            /*border: 1px solid red;*/
                            background: #ff3545;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .blue {
                            background: #4f57fa;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .green {
                            background: #22620c;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }

                    }
                    // .active:before {
                    //     content: "";
                    //     background: url("../../../static/images/blue11.png") no-repeat;
                    //     background-size: 0.55rem 0.55rem;
                    //     position: absolute;
                    //     left: -1px;
                    //     top: -1px;
                    //     width: 0.55rem;
                    //     height: 0.55rem;
                    // }
                    .active {
                         border: 1/20rem solid #156bda;
                          span:nth-of-type(2){
                            background: #3261d8;
                            color: #fff;
                          }
                    }
                }
                li:nth-child(45),
                li:nth-child(65) {
                    > button {
                        margin-bottom: 8/45rem;
                    }
                }
                li:nth-child(45),
                li:nth-child(46),
                li:nth-child(47),
                li:nth-child(48),
                li:nth-child(49) {
                    width: 3.2rem;
                    button {
                        width: 2.8rem;
                    }
                }
            }
        }
        li:nth-child(2) {
            > ul {
                li:nth-child(13) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
                li:nth-child(13),
                li:nth-child(14),
                li:nth-child(15),
                li:nth-child(16),
                li:nth-child(17) {
                    width: 3.2rem;
                    button {
                        width: 2.63333333rem;
                    }
                }
            }

        }
    }
}

.cqList1 {
    padding-bottom: 2.5rem;
    background: #dde5ec;
    > div {
        /*height: 73/20rem;*/
        width: 100%;

         background:#dde5ec;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
            /*margin-left: -4px;*/
        }
        ul {

            width: 100%;
            text-align: center;
            li {
                display: inline-block;
                margin: 0 4/20rem;
                button {
                    position: relative;
                    width: 430/60rem;
                    text-align: center;
                    height: 93/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.3rem auto;
                    background: #fff;
                    line-height: 93/60rem;
                    font-size: 38/60rem;
                    border-radius: 3/20rem;
                }
                .isred:before {
                    content: "";
                    background: url("../../../static/images/red1.png") no-repeat;
                    background-size: 0.55rem 0.55rem;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    width: 0.55rem;
                    height: 0.55rem;
                }
                .isred {
                    border: 1px solid #ed0132;
                }
            }
        }
    }
    ul {
        > li {
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
                 background:#dde5ec;
                 text-align: center;
                li {
                    display: inline-block;
                    width: 180/45rem;
                     button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 3.75rem;
                        height: 2rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto;
                        background: #fff;
                        line-height: 40/45rem;
                        border-radius: 3/20rem;
                        padding:0;
                        > span:nth-child(2) {
                            color: #5084e2;
                              font-family: Arial!important;
                              display:block;
                              width: 100%;
                              height: 40%;
                              line-height:0.9rem;
                              margin-bottom: -0.1rem;
                              background:linear-gradient(#eef1f5, #fff);
                              background: -webkit-linear-gradient(#eef1f5, #fff);
                              font-size: 12/20rem;
                        }
                        > span:nth-child(1) {
                            padding-top: 3px;
                            padding-bottom: 3px;
                            font-size: 14/20rem;
                            height: 21/20rem;
                            display: inline-block;
                            width: 48/20rem;
                            font-weight: normal;
                            font-family: "arial";
                        }

                        .red {
                            /*background: url("../../../static/images/lm_red.png") no-repeat;*/
                            /*border: 1px solid red;*/
                            background: #ff3545;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .blue {
                            background: #4f57fa;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .green {
                            background: #22620c;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }

                    }
                    // .active:before {

                    //     content: "";
                    //     background: url("../../../static/images/blue11.png") no-repeat;
                    //     background-size: 0.55rem 0.55rem;
                    //     position: absolute;
                    //     left: -1px;
                    //     top: -1px;
                    //     width: 0.55rem;
                    //     height: 0.55rem;

                    // }
                    .active {
                        border: 1/20rem solid #156bda;
                      span:nth-of-type(2){
                        background: #3261d8;
                        color: #fff;
                      }
                    }
                }
                li:nth-child(45),
                li:nth-child(65) {
                    > button {
                        margin-bottom: 8/45rem;
                    }
                }
                li:nth-child(45),
                li:nth-child(46),
                li:nth-child(47),
                li:nth-child(48),
                li:nth-child(49) {
                    width: 3.2rem;
                    button {
                        width: 2.8rem;
                    }
                }
            }
        }
        li:nth-child(2) {
            > ul {
                li:nth-child(13) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
                li:nth-child(13),
                li:nth-child(14),
                li:nth-child(15),
                li:nth-child(16),
                li:nth-child(17) {
                    width: 3.2rem;
                    button {
                        width: 2.63333333rem;
                    }
                }
            }

        }
    }
}


.cqList9 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    > div {
        /*height: 73/20rem;*/
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        background:#dde5ec;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
            /*margin-left: -4px;*/
        }
        ul {
            width: 100%;
            text-align: center;
            li {
                display: inline-block;
                width: 240/60rem;
                button {
                    position: relative;
                    width: 225/60rem;
                    margin: 0 auto;
                    text-align: center;
                    height: 116/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.2rem auto;
                    background: #fff;
                    line-height: 116/60rem;
                    font-size: 30/60rem;
                    border-radius: 3/20rem;
                }
                .isred:before {
                    content: "";
                    background: url("../../../static/images/red1.png") no-repeat;
                    background-size: 0.55rem 0.55rem;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    width: 0.55rem;
                    height: 0.55rem;
                }
                .isred {
                    border: 1px solid #ed0132;
                }
            }
            li:nth-child(5),
            li:nth-child(6),
            li:nth-child(7) {
                width: 5rem;
                margin: 0 2/20rem;
                button {
                    width: 100%;
                }
            }
        }
    }

    ul {
        > li {
            /*width: 5.33333333rem;*/
            > span {
                display: block;
                background: red;
                width: 100%;
                height: 1.5rem;
                line-height:1.5rem;
                font-size:12/20rem;
                text-align: center;
                border: 1px solid #fff;

                background: -webkit-radial-gradient(#555, #2a2926);
                color: #fcfcfc;
            }
            > ul {
                background:#dde5ec;
              text-align: center;
                li {
                    display: inline-block;
                    width: 5.33333333rem;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 4rem;
                        margin: 0 auto;
                        height: 160/60rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto 0;
                        background: #fff;
                        border-radius: 3/20rem;
                        padding:0;
                        /*line-height: 159/60rem;*/
                        > span:nth-child(2) {
                                height: 40%;
                                 width: 100%;
                                  display: block;
                              line-height: 1.1rem;
                                  color: rgb(18, 93, 201);
                              font-size:12/20rem;
                                 font-family: arial;
                              background: -webkit-linear-gradient(rgb(238, 241, 245), rgb(255, 255, 255));
                              background: -o-linear-gradient(rgb(238, 241, 245), rgb(255, 255, 255));
                              background: linear-gradient(rgb(238, 241, 245), rgb(255, 255, 255)) ;
                        }
                        > span:nth-child(1) {
                            padding-top: 5/20rem;
                             font-size:32/40rem;
                            height: 60%;
                            display: block;
                            width: 100%;
                            line-height: 80/60rem;
                            font-weight: normal;
                            font-family: "arial";
                        }
                    }

                    .active {
                       border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }
                li:nth-child(12) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
            }
        }
        /*li:nth-child(2){
      ul{
        li{
          width: 3.2rem;
          button{
            width: 2.53333333rem;
          }
        }
      }
    }*/
    }
}
.cqList10 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    > div {
        /*height: 73/20rem;*/
        width: 100%;
        display: flex;
        flex-flow: row wrap;
         background: #dde5ec;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
            /*margin-left: -4px;*/
        }
        ul {
            width: 100%;
            text-align: center;
            li {
                width: 320/60rem;
                display: inline-block;
                align-items: center;
                button {
                    position: relative;
                    width: 280/60rem;
                    text-align: center;
                    height: 116/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.1rem auto;
                    background: #fff;
                    line-height: 116/60rem;
                    font-size: 38/60rem;
                    border-radius: 3/20rem;
                }
                .isred:before {
                    content: "";
                    background: url("../../../static/images/red1.png") no-repeat;
                    background-size: 0.55rem 0.55rem;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    width: 0.55rem;
                    height: 0.55rem;
                }
                .isred {
                    border: 1px solid #ed0132;
                }
            }
        }
    }

    ul {
        > li {
            /*width: 5.33333333rem;*/
            > span {
               display: block;
                background: red;
                width: 100%;
                height: 1.5rem;
                line-height:1.5rem;
                font-size:12/20rem;
                text-align: center;
                border: 1px solid #fff;

                background: -webkit-radial-gradient(#555, #2a2926);
                color: #fcfcfc;
            }
            > ul {
                 background: #dde5ec;
                  text-align: center;
                li {
                    display: inline-block;
                    width: 5.33333333rem;
                    margin: 2/20rem 0;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width:4.8rem;
                        height: 160/60rem;
                        border: 1px solid #e5e5e5;
                        background: #fff;
                        border-radius: 3/20rem;
                        padding:0;
                        > span:nth-child(2) {
                            height: 40%;
                            width: 100%;
                            display: block;
                            line-height: 60/60rem;
                            color: #125dc9;
                            font-size:12/20rem;
                            font-family: "arial";
                            background:linear-gradient(#eef1f5, #fff);
                            background: -webkit-linear-gradient(#eef1f5, #fff)

                        }
                        > span:nth-child(1) {
                            padding-top: 5/20rem;
                           font-size:32/40rem;
                            height: 60%;
                            display: block;
                            width: 100%;
                            line-height: 80/60rem;
                            font-weight: normal;
                            font-family: "arial";
                        }
                    }

                    .active {
                        border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }

                li:nth-child(10),
                li:nth-child(7),
                li:nth-child(8),
                li:nth-child(9) {
                    width: 3.3rem;
                    margin: 0 4/20rem;
                  button{
                    width: 3.5rem;
                  }

                }
            }
        }
        li:nth-child(2) {
            ul {
                li {
                    width: 3.2rem;
                    button {
                        width: 2.53333333rem;
                    }
                }
            }
        }
    }
}
.cqList11 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    > div {
        /*height: 73/20rem;*/
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        background: #dde5ec;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
        }
        ul {
            width: 100%;
            text-align: center;
            li {
                display: inline-block;
                width: 240/60rem;
                button {
                    position: relative;
                    width: 3.43333333rem;
                    margin: 0 auto;
                    text-align: center;
                    height: 93/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.1rem auto;
                    background: #fff;
                    line-height: 93/60rem;
                    font-size: 30/60rem;
                    border-radius: 3/20rem;
                }
                .isred:before {

                    content: "";
                    background: url("../../../static/images/red1.png") no-repeat;
                    background-size: 0.55rem 0.55rem;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    width: 0.55rem;
                    height: 0.55rem;
                }
                .isred {
                    border: 1px solid #ed0132;
                }
            }
        }
    }
    ul {
        > li {
            > span {
                margin: 0;
                width: 100%;
                display: block;
                height: 68/45rem;
                line-height: 68/45rem;
                font-weight: normal;
                box-shadow: inset 1px 2px 1px #fff;
                text-align: center;
                background: #7a7a7a;
                color: #fff;
            }
            > ul {
                text-align: center;
                background: #dde5ec;
                li {
                    display: inline-block;
                    width: 180/45rem;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 3.5rem;
                        margin: 0 auto;
                        height: 89/45rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto 0;
                        background: #fff;
                        line-height: 40/45rem;
                        border-radius: 3/20rem;
                        padding:0;
                        > span:nth-child(2) {
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
                        > span:nth-child(1) {
                            line-height:1.5;
                          height:60%;

                       font-size:28/40rem;
                        }

                        .red {
                            /*background: url("../../../static/images/lm_red.png") no-repeat;*/
                            /*border: 1px solid red;*/
                            background: #ff3545;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .blue {
                            background: #4f57fa;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .green {
                            background: #22620c;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }

                    }

                    .active {
                       border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }
                li:nth-child(45) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
                li:nth-child(45),
                li:nth-child(46),
                li:nth-child(47),
                li:nth-child(48),
                li:nth-child(49) {
                    width: 3.2rem;
                    button {
                        width: 2.8rem;
                    }
                }
            }
        }
    }
}
.cqList8 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    > div {
        /*height: 73/20rem;*/
        width: 100%;
        display: inline-block;
        background: #dde5ec;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
            /*margin-left: -4px;*/
        }
        ul {
            width: 100%;
            text-align: center;
            li {
                width: 192/60rem;
                display: inline-block;
                align-items: center;
                button {
                    position: relative;
                    width: 162/60rem;
                    margin: 0 auto;
                    text-align: center;
                    height: 116/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.3rem auto;
                    background: #fff;
                    line-height: 116/60rem;
                    font-size: 38/60rem;
                    border-radius: 3/20rem;
                }
                .isred:before {
                    content: "";
                    background: url("../../../static/images/red1.png") no-repeat;
                    background-size: 0.55rem 0.55rem;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    width: 0.55rem;
                    height: 0.55rem;
                }
                .isred {
                    border: 1px solid #ed0132;
                }
            }
        }
    }

    ul {
        > li {
            /*width: 5.33333333rem;*/
            > span {
                display: block;
                background: red;
                width: 100%;
                height: 1.5rem;
                line-height:1.5rem;
                font-size:12/20rem;
                text-align: center;
                border: 1px solid #fff;

                background: -webkit-radial-gradient(#555, #2a2926);
                color: #fcfcfc;
            }
            > ul {
                background: #dde5ec;
                text-align: center;
                li {
                    display: inline-block;
                    margin: 0 /20rem;
                    width: 5.33333333rem;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 4rem;
                        margin: 0 auto;
                        height: 160/60rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto 0;
                        background: #fff;
                        padding:0;
                        border-radius: 3/20rem;
                        /*line-height: 159/60rem;*/
                        > span:nth-child(2) {
                            height: 50%;
                            width: 100%;
                            display: block;
                            line-height: 80/60rem;
                            color: #125dc9;
                            font-size:12/20rem;
                            font-family: "arial";
                            background:linear-gradient(#eef1f5, #fff);
                        background: -webkit-linear-gradient(#eef1f5, #fff)
                        }
                        > span:nth-child(1) {
                            padding-top: 3px;
                           font-size:32/40rem;
                            height: 50%;
                            display: block;
                            width: 100%;
                            line-height: 80/60rem;
                            font-weight: normal;
                            font-family: "arial";
                        }
                    }

                    .active {
                       border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }
                li:nth-child(12) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
            }
        }
    }
}
.cqList2 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    > div {
        width: 100%;
        background:#dde5ec;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
        }
        ul {
            text-align: center;
            width: 100%;
            li {
              display: inline-block;
              margin: 0 2/20rem;
                button {
                    position: relative;
                    width: 5rem;
                    margin: 0 auto;
                    padding:0;
                    text-align: center;
                    height: 116/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.1rem auto;
                    background: #fff;
                    line-height: 116/60rem;
                    font-size: 38/60rem;
                    border-radius: 3/20rem;
                }
                .isred:before {
                    content: "";
                    background: url("../../../static/images/red1.png") no-repeat;
                    background-size: 0.55rem 0.55rem;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    width: 0.55rem;
                    height: 0.55rem;
                }
                .isred {
                    border: 1px solid #ed0132;
                }
            }
        }
    }
    ul {
        > li {
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
                 background:#dde5ec;
                  text-align: center;
                li {
                    display: inline-block;
                    width: 180/45rem;
                     button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 3.75rem;
                        height: 2rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto;
                        background: #fff;
                        line-height: 40/45rem;
                        border-radius: 3/20rem;
                        padding:0;
                        > span:nth-child(2) {
                            color: #5084e2;
                              font-size:12/20rem;
                              font-family: Arial!important;
                              display:block;
                              width: 100%;
                              height: 40%;
                              line-height:0.9rem;
                              margin-bottom: -0.1rem;
                            background:linear-gradient(#eef1f5, #fff);
                        background: -webkit-linear-gradient(#eef1f5, #fff);


                            font-family: "arial";
                        }
                        > span:nth-child(1) {
                            padding-top: 3px;
                            padding-bottom: 3px;
                            font-size: 14/20rem;
                            height: 21/20rem;
                            display: inline-block;
                            width: 48/20rem;
                            font-weight: normal;
                            font-family: "arial";
                        }

                        .red {
                            /*background: url("../../../static/images/lm_red.png") no-repeat;*/
                            /*border: 1px solid red;*/
                            background: #ff3545;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .blue {
                            background: #4f57fa;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }
                        .green {
                            background: #22620c;
                            color: white;
                            display: inline-block;
                            width: 21/20rem!important;
                            background-size: contain;
                            background-position: center;
                            border-radius: 25/20rem;
                        }

                    }
                    // .active:before {

                    //     content: "";
                    //     background: url("../../../static/images/blue11.png") no-repeat;
                    //     background-size: 0.55rem 0.55rem;
                    //     position: absolute;
                    //     left: -1px;
                    //     top: -1px;
                    //     width: 0.55rem;
                    //     height: 0.55rem;

                    // }
                    .active {
                        border: 1/20rem solid #156bda;
                      span:nth-of-type(2){
                        background: #3261d8;
                        color: #fff;
                      }
                    }
                }
                li:nth-child(45),
                li:nth-child(65) {
                    > button {
                        margin-bottom: 8/45rem;
                    }
                }
                li:nth-child(45),
                li:nth-child(46),
                li:nth-child(47),
                li:nth-child(48),
                li:nth-child(49) {
                    width: 3.2rem;
                    button {
                        width: 2.8rem;
                    }
                }
            }
        }
        li:nth-child(2) {
            > ul {
                li:nth-child(9) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
                li:nth-child(6),
                li:nth-child(7),
                li:nth-child(8),
                li:nth-child(5),
                li:nth-child(9) {
                    width: 3.2rem;
                    button {
                        width: 2.8rem;
                    }
                }
            }

        }
    }
}
.cqList3 {
    padding-bottom: 2.3rem;
     background: #dde5ec;
    > div {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        // background-color: #fff;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
        }
        ul {
            display: flex;
            width: 100%;
            justify-content: space-around;
            flex-flow: row wrap;

            li {
                button {
                    position: relative;
                    width: 260/60rem;
                    margin: 0 auto;
                    text-align: center;
                    height: 116/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.3rem auto;
                    background: #fff;
                    line-height: 116/60rem;
                    font-size: 38/60rem;
                }
                .isred:before {
                    content: "";
                    background: url("../../../static/images/red1.png") no-repeat;
                    background-size: 0.55rem 0.55rem;
                    position: absolute;
                    left: -1px;
                    top: -1px;
                    width: 0.55rem;
                    height: 0.55rem;
                }
                .isred {
                    border: 1px solid #ed0132;
                }
            }
        }
    }
    ul {


        > li {
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

                // background: #fff;
                 background: red;
                li {
                    display: inline-block;
                    width: 180/45rem;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 146/45rem;

                        height: 89/45rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto 0;
                        background: #fff;
                        line-height: 40/45rem;

                        border-radius: 3/20rem;
                        > span:nth-child(2) {
                           color: #5084e2;
                        font-size:12/20rem;
                        font-family: Arial!important;
                        display:block;
                        width: 100%;
                        height: 40%;
                        margin-bottom: -0.1rem;
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
                        border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }
                li:nth-child(45) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
                li:nth-child(45),
                li:nth-child(46),
                li:nth-child(47),
                li:nth-child(48),
                li:nth-child(49) {
                    width: 3.2rem;
                    button {
                        width: 2.63333333rem;
                    }
                }
            }
        }

    }
}

.cqList7 {
    padding-bottom: 2.3rem;
    background: #dde5ec;

    ul {
        > li {
            /*width: 5.33333333rem;*/
            > span {
                display: block;
                background: red;
                width: 100%;
                height: 1.5rem;
                line-height:1.5rem;
                font-size:12/20rem;
                text-align: center;
                border: 1px solid #fff;
                background: -webkit-radial-gradient(#555, #2a2926);
                color: #fcfcfc;
            }
            > ul {
                  text-align: center;
                 background: #dde5ec;
                li {
                    display: inline-block;
                    width: 5.33333333rem;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 4rem;
                        margin: 0 auto;
                        height: 3.2666667rem;
                        border: 1px solid #e5e5e5;
                        border-radius: 3/20rem;
                        margin: 15/45rem auto 0;
                        background: #fff;
                        padding:0;
                        /*line-height: 159/60rem;*/
                        > span:nth-child(2) {
                            height: 40%;
                            width: 100%;
                            display: block;
                            line-height: 80/60rem;
                            color: #125dc9;
                            font-size:12/20rem;
                            font-family: "arial";
                             background:linear-gradient(#eef1f5, #fff);
                        background: -webkit-linear-gradient(#eef1f5, #fff)
                        }
                        > span:nth-child(1) {

                            font-size:32/40rem;
                            padding-top:8/20rem;
                            height: 60%;
                            display: block;
                            width: 100%;
                            line-height: 90/60rem;
                            font-weight: normal;
                            font-family: "arial";
                        }
                    }

                    .active {
                        border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }
                li:nth-child(12) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }

            }
        }

    }
}
.cqList5 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    > div {
        /*height: 73/20rem;*/
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        background-color: #fff;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            background: #7a7a7a;
            color: #fff;
            /*margin-left: -4px;*/
        }
        ul {
            display: flex;
            width: 100%;
            justify-content: space-around;
            li {
                /*width: 280/45rem;*/
                div {
                    width: 430/60rem;
                    margin: 0 auto;
                    text-align: center;
                    height: 93/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.3rem auto;
                    background: #fff;
                    line-height: 93/60rem;
                    font-size: 38/60rem;
                }
                .isred {
                    border: 1px solid #ff2312;
                    box-sizing: border-box;
                }
            }
        }
    }
    ul {
        > li {
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
                text-align: center;
                background: #dde5ec;
                li {
                    margin: 0 2/20rem;
                    display: inline-block;
                    width: 230/45rem;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 4.5rem;
                        margin: 0 auto;
                        height: 89/45rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto 0;
                        background: #fff;
                        line-height: 40/45rem;
                        border-radius: 3/20rem;
                        padding:0;
                        > span:nth-child(2) {
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
                        > span:nth-child(1) {
                            line-height:1.5;
                       height:60%;
                       display:block;
                       font-size:32/40rem;
                        }
                    }

                    .active {
                         border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }
                li:nth-child(17),
                li:nth-child(18),
                li:nth-child(19),
                li:nth-child(20) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }
            }
        }
    }
}
.qin {
   /* margin-left: -8px;*/
}
.cqList6 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    ul {
        > li {
            > span {
               display: block;
                background: red;
                width: 100%;
                height: 1.5rem;
                line-height:1.5rem;
                font-size:12/20rem;
                text-align: center;
                border: 1px solid #fff;

                background: -webkit-radial-gradient(#555, #2a2926);
                color: #fcfcfc;
            }
            > ul {
                  text-align: center;
                 background:#dde5ec;
                li {
                    display: inline-block;
                    margin: 0 /20rem;
                    width: 180/45rem;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 3.5rem;
                        height: 2.277778rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto 0;
                        background: #fff;
                        line-height: 40/45rem;
                        border-radius: 3/20rem;
                        padding:0;
                        > span:nth-child(2) {
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
                        > span:nth-child(1) {
                            line-height:1.5;
                       height:60%;
                       display:block;
                       font-size:32/40rem;
                        }
                    }
                    .active {
                       border: 1/20rem solid #156bda;
                    span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }
                li:nth-child(12) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }

            }
        }
        li:nth-child(2) {
            ul {
                li {
                    width: 3.2rem;
                    button {
                        width: 2.8rem;
                    }
                }
                li:nth-child(8) {
                    > button {
                        margin-bottom: 8/45rem;
                    }

                }

            }
        }
    }
}
.cqList3 {
    padding-bottom: 2.3rem;
    background: #dde5ec;
    > div {
        /*height: 73/20rem;*/
        width: 100%;
        display: flex;
        flex-flow: row wrap;

        // background-color: #fff;
        h3 {
            margin: 0;
            width: 100%;
            height: 68/45rem;
            line-height: 68/45rem;
            font-weight: normal;
            box-shadow: inset 1px 2px 1px #fff;
            text-align: center;
            // background: #7a7a7a;
            color: #fff;
            /*margin-left: -4px;*/
        }
        ul {
            display: flex;
            width: 100%;
                background: #dde5ec;
            justify-content: space-around;
            li {
                /*width: 280/45rem;*/
                div {
                    width: 430/60rem;
                    margin: 0 auto;
                    text-align: center;
                    height: 93/60rem;
                    border: 1px solid #e5e5e5;
                    margin: 0.3rem auto;
                    background: #fff;
                    line-height: 93/60rem;
                    font-size: 38/60rem;
                }
                .isred {
                    border: 1px solid #ff2312;
                    box-sizing: border-box;
                }
            }
        }
    }

    ul {
        > li {
            width: 320/60rem;
            display: inline-block;
            > span {
                margin: 0;
                width: 100%;
                display: block;
                height: 68/45rem;
                line-height: 68/45rem;
                font-weight: normal;
                box-shadow: inset 1px 2px 1px #fff;
                text-align: center;
                // background: #7a7a7a;
                color: #fff;
            }
            > ul {
                    text-align: center;
                    background: #dde5ec;
                > li {
                    display: inline-block;
                    width: 4.5rem;
                    button {
                        position: relative;
                        outline: 0;
                        text-align: center;
                        width: 100%;
                        margin: 0 auto;
                        height: 89/45rem;
                        border: 1px solid #e5e5e5;
                        margin: 8/45rem auto 0;
                        background: #fff;
                        padding:0;
                        line-height: 40/45rem;
                        > span:nth-child(2) {
                            height: 38/45rem;
                            width: 100%;
                            display: block;
                            color: #125dc9;
                            font-size: 12/20rem;
                            font-family: "arial";
                        }
                        > span:nth-child(1) {
                            padding-top: 3px;
                            font-size: 28/45rem;
                            height: 43/45rem;
                            display: block;
                            width: 100%;
                            font-weight: normal;
                            font-family: "arial";
                        }
                    }
                    // .active:before {

                    //     content: "";
                    //     background: url("../../../static/images/blue11.png") no-repeat;
                    //     background-size: 0.55rem 0.55rem;
                    //     position: absolute;
                    //     left: -1px;
                    //     top: -1px;
                    //     width: 0.55rem;
                    //     height: 0.55rem;
                    // }
                    .active {
                        border: 1/20rem solid #156bda;
                        span:nth-of-type(2){
                      background: #3261d8;
                      color: #fff;
                    }
                    }
                }
                li:nth-child(13) {
                    button {
                        margin-bottom: 8/45rem;
                    }

                }
            }
        }
        li:nth-child(2n) {
            > ul {
                // background: #fff;
            }
        }
    }

}
h3 {
    margin: 0;
    width: 100%;
    height: 68/45rem;
    line-height: 68/45rem;
    font-weight: normal;
    box-shadow: inset 1px 2px 1px #fff;
    text-align: center;
    background: #7a7a7a;
    color: #fff;
    /*margin-left: -4px;*/
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
    display: -webkit-flex;
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
    margin-top: 160/20rem;
    height: 368/20rem;
    overflow-y: auto;
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


.lottery_nav_bar {
  position: fixed;
  width: 320/20rem;
  top: 128/20rem;
  z-index: 1;
  ul {
    display: flex;
    height: 30/20rem;
    color: white;
    button {
      width: 84/20rem;
      position: relative;
      text-align:center;
      padding:0;
      z-index: 0;
      background: #1366dc;
      border: 0;
      outline: 0;
      color: white;
      // border-radius: 5/20rem;
    }

    .active {
      background: #1f97f6;
    }
  }
}


.nav_o {
    height: 30/20rem;
    width: 320/20rem;
    position: relative;
    z-index: 1;
    .nav_o_1 {
        position: absolute;
        top: 0;
        > li {
            // border-radius: 10/45rem;

        }
    }
    .nav_o_2 {
        position: absolute;
        top: 33/20rem;
        margin-top: -4/20rem;
        > li {
            border-radius: 0;
            background: #4c4c4c;
            opacity: 0.9;
        }
    }
    .nav_o_3 {
        position: absolute;
        top: 66/20rem;
        margin-top: -7/20rem;
        > li {
            background: #4c4c4c;
            opacity: 0.9;
            border-radius: 0;
        }
    }
}
.isShowNav {
    display: none!important;
}

.nav_o ul {
    // background: rgba(0,0,0,0.5);
    display: flex;
    flex-flow: row wrap;
    li {
        width: 180/45rem;
        color: #fff;
        text-align: center;
        line-height: 66/45rem;
        height: 66/45rem;
        display: block;

        // border-left: 1px solid rgba(255,255,255,0.5);
        // border-bottom: 1px solid rgba(255,255,255,0.5);
    }
    .active {
        background: #1f97f6;
    }
    li:nth-child(4) {
        position: relative;
        text-align: left;
        text-indent: 28/45rem;
    }
    li:nth-child(4) span {
        width: 0;
        height: 0;
        border-left: 15/45rem solid transparent;
        border-right: 15/45rem solid transparent;
        border-bottom: 30/45rem solid transparent;
        border-top: 15/45rem solid #fff;
        position: absolute;
        right: 3/45rem;
        top: 25/45rem;
    }
    li:nth-child(10),
    li:nth-child(11),
    li:nth-child(12),
    li:nth-child(13),
    li:nth-child(5),
    li:nth-child(6),
    li:nth-child(7),
    li:nth-child(8),
    li:nth-child(9) {
        background: #4c4c4c;
        opacity: 0.9;
    }
}
.lottery_nav_bar {
    position: fixed;
    width: 320/20rem;
    top: 128/20rem;
    z-index: 1;
    ul {
        display: flex;
        height: 30/20rem;
        background: blue;
        color: white;

        li {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 84/20rem;
            position: relative;
            z-index: 0;
            background: #1366dc;

            > span {
                transform: skew(30deg);
            }

        }

        .active {
            background: #1f97f6;
        }
        .active:before {
            background: #1f97f6!important;
        }
        > li:nth-of-type(1):before {
            content: "";
            background: url("../../../static/images/blue11.png") no-repeat;
            background-size: 0.55rem 0.55rem;
            position: absolute;
            left: -1px;
            top: -1px;
            width: 0.55rem;
            height: 0.55rem;
        }
        > li:nth-last-of-type(1):before {
            content: "";
            background: url("../../../static/images/blue11.png") no-repeat;
            background-size: 0.55rem 0.55rem;
            position: absolute;
            left: -1px;
            top: -1px;
            width: 0.55rem;
            height: 0.55rem;
        }

        .trapezoid {
            transform: skew(-30deg);
            background: #1366dc;
            box-shadow: 9px 0 6px #0f52a6;
            position: relative;
            margin-right: 3px;
        }
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

.lajiton-active {
    color: #36aafb;
}

.cqnc_lmp {
    > ul {
        > li {
            background: white!important;
            width: 25%;
            > ul {

                > li {
                    > button {
                        width: 65/20rem;
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
                width: 65/20rem!important;
            }
        }
    }
}

.lhc_nav_bar {
    width: 320/20rem;
    position: fixed;
    overflow-x: scroll;
    z-index: 5;
    background: #fff;
    top: 6.4rem;
    > ul {
        display: flex;
        > li {
            margin-left: 3/20rem;
            > button {
                background: #1366dc;
                border-radius: 3/20rem;
                border: 0;
                color: white;
                width: 80/20rem;
                height: 30/20rem;

            }
            .active {
                background: #009eff;
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
