<template>
<div>
  <div class="bj" @click='hideTitle'>
  <div class="hed color1">
    <i class="icon iconfont icon-zuo" @click="gobackLast"></i>
    <div style="display: inline-block;margin: 0 auto;margin-left: 4rem;" @click.stop="showTitle"><span>{{menu_title}}</span><i class="icon iconfont icon-xiangxiajiantou" style="float: right;margin-left: 0.2rem;"></i></div>
  </div>
  <!--<lotteryHeader :title="title" :game_code="game_code" @regulation_click="regulation_control=true" ></lotteryHeader>-->

   <div class="header-is-active" v-if="show_title">
    <div class="header-modal-content">
      <ul>
        <li v-for="(value,key,index) in urlUrl" @click="changUrl(index,key)">{{key}}</li>
      </ul>
      <i class="up"></i>
    </div>

  </div>

  <div class="biao" v-show="isReady">
    <table width="100%" cellspacing="0">
      <tr>
        <th>开奖期数</th>
        <th>开奖号码</th>
      </tr>
      <tr v-for='item in lotteryList'>
        <td>
          <span>{{item.round}}期</span>
        </td>
        <td class="haom">
          <span  v-for='i in isNuber(item.number)' v-if = "urlId==51||urlId==171" :class="`pk cl_${i}`"></span>
          <span  v-for='i in isNuber(item.number)' v-if = "urlId==3" :class="`clg_${i}`">{{i}}</span>
          <span  v-for='i in isNuber(item.number)' v-if = "urlId==2||urlId==160" class="pcddkj" >{{i}}</span>
          <span  v-for='i in isNuber(item.number)' v-if = "urlId==69" :class="`bgxg_${i}`" >{{i}}</span>
          <span  v-for='i in isNuber(item.number)' v-if = "urlId==47" :class="`xync xync_${i}`"></span>
        </td>
      </tr>
    </table>
  </div>
</div>
</div>
</template>

<script>
//import {
//  getUrl
//} from '../../api'
import lotteryHeader from '../../components/header/lotteryHeader'
export default {
  data() {
    return {
    	show_title: false,		// 显示下拉菜单
    	menu_title: '北京PK拾', // 标题
      isShowColor:false,
      isShowColorG:false,
      isReady: true,
      es:"123",
      urlUrl: {
			      北京PK拾: 51,
			        重庆时时彩:2,
			        幸运飞艇:171,
			        广东快乐十分:3,
			        重庆幸运农场:47,
			        香港六合彩:69,
         PC蛋蛋:160
      },
      lotteryList: [],
      number: 10,
      page: 1,
      urlId: null,
      selectedId:""
    }
  },
  components:{
  	lotteryHeader
  },
  props: {
  	game_code:{
      type: Number
    },
    title: {
			type:String,
			default: '北京PK拾'
  	},
  },
  methods: {
  	// 显示下拉标题
  	showTitle(){
  			this.show_title = !this.show_title;
  	},
  	// 点击任意地方隐藏下拉框
  	hideTitle(){
  		this.show_title = false;
  	},

    gobackLast(){
      window.history.go(-1)
    },

    isNuber(numberList){
      return numberList.split(',')
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    // 切换不同的
    changUrl(index,key) {
      this.isReady = false;
      setTimeout(() => {
          this.isReady = true;
      },250)
    	this.menu_title = key
    	this.show_title = false;
     //let i = this.$refs.select.selectedIndex
     let i = index
   switch (i) {
     case 0:
     this.urlId = 51
     this.isShowColor = true;
     this.isShowColorG = false;
       break;
     case 1:
     this.isShowColorG = false;
     this.isShowColor = false;
     this.urlId = 2
       break;
     case 2:
     this.isShowColor = true;
     this.isShowColorG = false;
     this.urlId = 171
       break;
     case 3:
     this.isShowColorG = true;
     this.isShowColor = false;
     this.urlId = 3
       break;
     case 4:
     this.isShowColorG = true;
     this.isShowColor = false;
     this.urlId = 47
       break;
     case 5:
     this.isShowColorG = false;
     this.isShowColor = false;
     this.urlId = 69
       break;
     case 6:
     this.isShowColorG = false;
     this.isShowColor = false;
     this.urlId = 160
       break;
       default:

   }
     let params = {};
     params.game_code = this.urlId;
     params.number = this.number;
     params.page = this.page;
     this.$http.post(`${getUrl()}/user/getResult`, JSON.stringify(params)).then(res => {
       this.lotteryList = res.data.result;

     })
    }
  },
  created() {

    this.urlId = this.$route.params.id.split(':')[1];

    let params = {};
    params.game_code = this.urlId;
    params.number = this.number;
    params.page = this.page;
    this.$http.post(`${getUrl()}/user/getResult`, JSON.stringify(params)).then(res => {
      this.lotteryList = res.data.result;
      switch (Number(this.urlId)) {
        case 51:
          // this.$refs.select.option.value= "北京赛车PK拾"
          this.selectedId = "北京PK拾";
          this.isShowColor = true;
          this.isShowColorG = false;

          console.log(this.selectedId,'ocen');
          break;
        case 2:
        this.isShowColorG = false;
        this.isShowColor = false;
          this.selectedId = "重庆时时彩";
          console.log("重庆时时彩");
          break;
        case 171:
          this.selectedId = "幸运飞艇"
          this.isShowColor = true;
          this.isShowColorG = false;

          console.log(this.selectedId,'ocen');
          break;
        case 3:
          this.selectedId = "广东快乐十分"
          this.isShowColorG = true;
          this.isShowColor = false;

          console.log("广东快乐十分");
          break;
        case 47:
          this.selectedId = "重庆幸运农场";
          this.isShowColorG = true;
          this.isShowColor = false;

          console.log(this.selectedId,'ocen');
          break;
        case 69:
        this.isShowColorG = false;
        this.isShowColor = false;
          this.selectedId = "香港六合彩"
          console.log(this.selectedId,'ocen');
          break;
        case 160:
        this.isShowColorG = false;
        this.isShowColor = false;
        console.log(this.selectedId,'ocen');
          this.selectedId = "PC蛋蛋"
          break;
      }
    });
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>

	.hed{
		height: 1.9rem;
		line-height:1.9rem;
		background:blue;
		color: #fff;
		padding-left:0.5rem;
		font-size:0.7rem;
		font-weight:bold;
		i{
			float: left;
			margin-right:0.5rem;
      font-size: 18/20rem;
		}
		>div{
			// float: left;
		/*	width: 3rem;*/
			margin:0 auto;
		}
	}
	.haha{

		height: 1.8rem;
		margin-bottom:0.5rem;
		select{
			height: 100%;
			width: 100%;
			// border:1px solid blue;
			border-bottom:none;
			outline:none;
			font-size:0.6rem;
			border:none;
			text-align:center;
			padding-left:0.6rem;
			option{
				width: 100%;
				height: 100%;
				text-align:center;
			}
		}
	}
	.haom{
			// text-align:left;
		span{
			text-align:center;
			// word-spacing: 0.2rem;
			display:inline-block;
			width: 0.75rem;
			height:0.75rem;
			line-height: 0.75rem;
		/*	background:blue;*/
			color: #fff;
			border-radius:50%;
			margin-right:0.1rem;
        /*    text-indent:-999px;*/
		}
	}
  .biao{
    height: 24.3rem;
  }
	table{
		// padding:0.5rem;

		width:100%;
		margin: 0 auto;
		background:#fff;
		// margin-right
		/*border:1px solid #ccc;*/
/*		border-radius:0.5rem;*/
		 border-collapse: collapse;
		 overflow:hidden;
		tr{
			/*border:1px solid #ccc;*/
			height: 1.8rem;
			th{
				// border:1px solid blue;
			}


			td{
				text-align:left;
				padding-left:0.5rem;
				// text-align;
				// border:1px solid blue;
				// width: 30%;
			}
			td:nth-child(1){
			}
		}
		tr:nth-child(1){
			// border-bottom:1px solid #146cdc;
			height: 1.6rem;
			color: #A3A3A3;

			text-align:left;
			background:#F2F2F2;
			th{
				padding-left:0.5rem;
			}
			// margin-bottom:0.5rem;
		}
	}
  .cl_1,
  .cl_2,
  .cl_3,
  .cl_4,
  .cl_5,
  .cl_6,
  .cl_7,
  .cl_8,
  .cl_9,
  .cl_10{
    border-radius: 2/20rem!important;
    text-shadow: 1px 1px 1px rgba(0,0,0,1);
  }
  .header-modal-content {

    background: #414141;
    opacity: 0.95;
    text-align: center;
    position: relative;
    width: 5.65rem;
    margin: 0 auto;
    border-radius: 0.15rem;
    color: white;
    z-index: 101;
    position: fixed;
    left: 50%;
    margin-left: -2.852rem;
    top: 1.6rem;
    > ul{

      width: 100%;
      text-align: center;

      height: 26/20rem;
      display: inline-block;
      li{
        line-height: 26/20rem;
        font-size: 14/20rem;
				 border-bottom: 1px solid rgba(255,255,255,0.6);
      }
    }
    >ul:nth-last-of-type(1){
      border: 0;
    }

}
.sanjiao{
	width: ;
}
</style>
