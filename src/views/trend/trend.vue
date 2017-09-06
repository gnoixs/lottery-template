<template>
<div>
  <div class="bj">
  <div class="hed color1">
    <i @click="gobackLast"><</i>
    <div>历史走势</div>
  </div>
  <div class="haha">
    <select @change="changUrl($event)" v-model="selectedId" ref="select">
      <option  v-for="(option,index) in urlUrl" >
        {{index}}
        </option>
    </select>
  </div>
  <div class="biao">
    <table width="100%" cellspacing="0">
      <tr>
        <th>开奖时间</th>
        <th>开奖号码</th>
      </tr>
      <tr v-for='item in lotteryList'>
        <td>
          <span>{{item.round}}期</span>

        </td>
        <td class="haom">
          <span class="color1" v-for='i in isNuber(item.number)'>{{i}}</span>
        </td>
      </tr>
    </table>
  </div>
</div>
</div>
</template>

<script>
/*import {
  getUrl
} from '../../api'*/
export default {
  data() {
    return {

      es:"123",
      urlUrl: {
        北京赛车PK拾: 51,
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
  methods: {
    gobackLast(){
      window.history.go(-1)
    },

    isNuber(numberList){
      return numberList.split(',')
    },
    getLocalTime(nS) {
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    changUrl(event) {
     let i = this.$refs.select.selectedIndex
   switch (i) {
     case 0:
     this.urlId = 51
       break;
     case 1:
     this.urlId = 2
       break;
     case 2:
     this.urlId = 171
       break;
     case 3:
     this.urlId = 3
       break;
     case 4:
     this.urlId = 47
       break;
     case 5:
     this.urlId = 69
       break;
     case 6:
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
          this.selectedId = "北京赛车PK拾"
          console.log(this.selectedId,'ocen');
          break;
        case 2:
          this.selectedId = "重庆时时彩";
          console.log("重庆时时彩");
          break;
        case 171:

          this.selectedId = "幸运飞艇"
          console.log(this.selectedId,'ocen');
          break;
        case 3:
          this.selectedId = "广东快乐十分"
          console.log(this.selectedId,'ocen');
          console.log("广东快乐十分");
          break;
        case 47:

          this.selectedId = "重庆幸运农场"
          console.log(this.selectedId,'ocen');
          break;
        case 69:
          this.selectedId = "香港六合彩"
          console.log(this.selectedId,'ocen');
          break;
        case 160:
        console.log(this.selectedId,'ocen');
          this.selectedId = "PC蛋蛋"
          break;

      }
    });




  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.bj{
	background:#dbe2ea;

}
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
      font-size: 1.2rem;
		}
		>div{
			// float: left;
			width: 3rem;
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
			background:blue;
			color: #fff;
			border-radius:50%;
			margin-right:0.1rem;
		}
	}
  .biao{
    height: 24.3rem;
  }
	table{
		// padding:0.5rem;

		width: 95%;
		margin: 0 auto;
		background:#fff;
		// margin-right
		border:1px solid #ccc;
		border-radius:0.5rem;
		 border-collapse: collapse;
		 overflow:hidden;
		tr{
			border:1px solid #ccc;
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
				// width: 33%;
			}
		}
		tr:nth-child(1){
			// border-bottom:1px solid #146cdc;
			height: 1.6rem;
			color: #fff;

			text-align:left;
			background:#449df7;
			th{
				padding-left:0.5rem;
			}
			// margin-bottom:0.5rem;
		}
	}
</style>
