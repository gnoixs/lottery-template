<template>
<div class="box">
  <i-header title="资金管理"></i-header>
  <div class="title">
    <span class="fffhui" @click='hui'></span>
    <h3>{{titleH}}</h3>
  </div>
  <div class="pay_header">
    <div></div>
    <div><img :src="pay_img_url"/></div>
    <div></div>
  </div>
  <!--<div class="aisle">
    <div v-for = "(j,i) in aliPayId" @click.stop= "payonline(j,i)" :class="`${(navIndex == i)?'active':''}`">
      <span>通道{{i+1}}</span>
    </div>
  </div>-->
  <div class="seach" v-if="isShowBank">
    <span>请选择银行：</span>
    <div>
      <select v-model="bankName">
        <option v-for="option in options" v-bind:value="option">
          {{option}}
        </option>
      </select>
    </div>
  </div>
  	<!--<iframe ref="kefu" src=""></iframe>-->
	  <form ref="formPay" method="post" target="_blank" onsubmit="return false">
	    <div class="content">
	      <ul>
	        <li v-for='item in data' @click='dianji(item)'>{{item}}</li>
	      </ul>
	      <p>单笔下限<span class="color_money">{{moneyMin}}.00</span>,单笔上限<span class="color_money">{{moneyMax}}.00</span></p>
	      <label>
	        <div>金额:</div>
	        <input type="number" name=""  placeholder="请输入充值金额" v-model="shu" onkeyup="this.value=this.value.replace(/\D/g,'')">
	      </label>
	    </div>
	  </form>
  <div class="submit_div_a">
    <button class="color1" @click.prevent.stop="submitM" :disabled="!isBlue">确认充值</button>
    <!--<button class="color_money" @click.stop='chongzhi'>重置充值</button>-->
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
//import {
//  getOid,
//  getUrl
//} from '../../api'
import iHeader from '../../components/j-header'

export default {
  components: {
    iHeader
  },
  data() {
    return {
    	is_gd_ali: is_gd_ali(),
      alipaymin:0,
      moneyMin:0,
      moneyMax:0,
      arrayMap:["22","55","166"],
      options:["农业银行","中国银行","招商银行","建设银行","交通银行","工商银行","渤海银行","光大银行","兴业银行","民生银行" ,"中信银行" ,"广发银行" ,"华夏银行" ,"平安银行" ,"邮政储蓄银行" ,"浦发银行" ,"中国银行" ,"华夏银行" ,"北京农商" ,"上海银行" ,"银联支付"],
      bankName:"工商银行",
      titleH:"",
      isBlue:false,
      isKindShow:false,
      isEnd: false,
      blank: "",
      aliPayId: [],
      data: [100, 200, 300, 500, 800, 1000, 2000, 3000],
      shu: '',
      payUrl: '',
      isHao: false,
      title: "",
      urlId:"",
      pay_img_url:"",
      paramsL:"",
      navIndex:0,
      isShowBank:false,
      canSubmit: true,
      canSubmitMax: true
    }
  },

  methods: {
payonline(j,i){
    if(i == undefined){
        i = 0
    }
  this.navIndex = i;
  this.isShowBank = Number(j.split("isShowBank=")[1]);
  this.paramsL = j;
},

    submitM() {

 console.log(this.shu,this.moneyMin,this.moneyMax);

    if(this.isShowBank){
    	if(Number(this.shu)<Number(this.moneyMin)){
				this.title = `存款金额不能少于${this.moneyMin}`
		    this.isHao = true
		    this.canSumbit=false
		    setTimeout(() =>{
		      this.isHao = false
		      return
		    }, 1200)
			}else{
				 this.canSumbit=true
			};
			if(Number(this.shu)>Number(this.moneyMax)){
				this.canSubmitMax=false
				this.title = `存款金额不能大于${this.moneyMax}`
		    this.isHao = true
		    setTimeout(() =>{
		      this.isHao = false
		      return
		    }, 1200)
			}else{
				 this.canSubmitMax=true
			}
      if (this.shu < this.alipaymin){
        this.title = `取款金额不能少于${this.alipaymin}`
        this.isHao = true
        setTimeout(() => {
          this.isHao = false
          return
        }, 1200)
      }else if (this.isEnd == false) {
        this.title = "支付信息获取中"
        this.isHao = true
        setTimeout(() => {
          this.isHao = false
          return
        }, 600)
        return
      } else if (this.shu >= this.alipaymin && this.isEnd == true){
        let t = this.paramsL;
        this.payUrl = `${t}&money=${this.shu}`
        let payUrl = `${getUrl()}/user/payTheTransfer2?transfer=${this.payUrl}&PayID=${this.bankName}`
      this.$refs.formPay.setAttribute("action",payUrl);
//				sessionStorage.setItem('payUrl',payUrl);
        if(this.canSumbit==true&&this.canSubmitMax==true){
      	this.$refs.formPay.submit();
//					this.$router.push("/zf")
        }
      }else {
        this.title = "操作异常，请重试"
        this.isHao = true
        setTimeout(() => {
          this.isHao = false
          return
        }, 600)
        return
      }
    }else{
    	if(Number(this.shu)<Number(this.moneyMin)){
				this.title = `存款金额不能少于${this.moneyMin}`
		    this.isHao = true
		    this.canSumbit=false
		    setTimeout(() =>{
		      this.isHao = false
		      return
		    }, 1200)
			}else{
				 this.canSumbit=true
			}

			if(Number(this.shu)>Number(this.moneyMax)){
				this.canSubmitMax=false
				this.title = `存款金额不能大于${this.moneyMax}`
		    this.isHao = true
		    setTimeout(() =>{
		      this.isHao = false
		      return
		    }, 1200)
			}else{
				 this.canSubmitMax=true
			}

      if(this.shu < this.alipaymin){
        this.title = `取款金额不能少于${this.alipaymin}`
        this.isHao = true
        setTimeout(() => {
          this.isHao = false
          return
        }, 1200)
      }else if (this.isEnd == false){
        this.title = "支付信息获取中"
        this.isHao = true
        setTimeout(() => {
          this.isHao = false
          return
        }, 600)
        return
      }else if (this.shu >= this.alipaymin && this.isEnd == true) {
        let t = this.paramsL;
        this.payUrl = `${t}&money=${this.shu}`
        let payUrl = `${getUrl()}/user/payTheTransfer2?transfer=${this.payUrl}`
       this.$refs.formPay.setAttribute("action",payUrl);

//				sessionStorage.setItem('payUrl',payUrl);
			 if(this.canSumbit==true&&this.canSubmitMax==true){
         this.$refs.formPay.submit();
         //this.$router.push("/zf")
       }
      }else{
        this.title = "操作异常，请重试"
        this.isHao = true
        setTimeout(() =>{
          this.isHao = false
          return
        }, 600)
        return
      }
    }
    },
    dianji(item) {
      this.shu = item;

    },
    chongzhi() {
      this.shu = '';
    },
    hui() {
      this.$router.push({
        path: '/order:0'
      })
    }
  },

  created() {
    this.urlId = this.$route.params.id.split(':')[1];
    this.pay_img_url=`../../../static/images/pay_${this.urlId}.png`


    let urlId = "";
    switch (this.urlId) {
      case '55':
        urlId = 'online_bankU';
        this.titleH="在线支付"
        break;
      case '66':
        urlId = 'online_wechatU';
        this.titleH="微信支付"
        break;
      case '77':
        urlId = 'online_alipayU';
        this.titleH="支付宝支付"
        break;
      case '88':
        urlId = 'online_cftU';
        this.titleH="财付通支付"

        break;
      default:

    }
    let params = {};
    let userOid = getOid();
    params.oid = userOid;
    this.$http.post(`${getUrl()}/user/payin`, JSON.stringify(params)).then(res => {


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
       switch (this.urlId) {
		      case '55':
		      	this.moneyMin=res.data.moneylimit.bankmin;
      			this.moneyMax=res.data.moneylimit.bankmax;
		        break;
		      case '66':
		      	this.moneyMin=res.data.moneylimit.wechatmin;
      			this.moneyMax=res.data.moneylimit.wechatmax;

		        break;
		      case '77':
		      	this.moneyMin=res.data.moneylimit.alipaymin;
      			this.moneyMax=res.data.moneylimit.alipaymax;
		        break;
		      case '88':
						this.moneyMin=res.data.moneylimit.cftpaymin;
      			this.moneyMax=res.data.moneylimit.cftpaymax;
		        break;
		      default:
		    };
        this.aliPayId = res.data[urlId];
        this.payonline(this.aliPayId[0])

        this.isBlue = true;
        this.isEnd = true;
//      this.alipaymin = res.data.moneylimit.alipaymin;
      }

    })

  }
}
</script>


<style  lang='less' ref="stylesheet/less" scoped>
.box {
    background-color: #e5e5e5;
    height: 100%;
}
.title {
    height: 85/40rem;
    line-height: 85/40rem;
    background: #fff;
    span {
        background: url("../../../static/images/fanhui.png") no-repeat;
        background-size: 40/40rem 40/40rem;
        width: 55/40rem;
        height: 45/40rem;
        float: left;
        margin-top: 20/40rem;
        margin-right: 20/40rem;
        margin-left: 20/40rem;
        border-right: 1px solid #dfdfdf;
    }
    h3 {
        margin: 0;
        float: left;
        font-weight: normal;
        color: #272526;
    }
}
.content {
    padding-top: 13/40rem;
    padding-right: 24/40rem;
    padding-left: 24/40rem;
    background: #e5e5e5;
    text-align: center;
  label{
    background-color: #b4b4b4;
    box-shadow: 0 0 2/20rem #b3b3b3;
    height: 72/40rem;
    display: inline-block;
    border-radius: 10/40rem;
    >div{
      display: inline-block;
      width: 78/20rem;
      color: white;
    }
  }
    input {
        width: 128/20rem;
        height: 72/40rem;
        border: none;
        outline: none;
        background-color: #f0f0f0;
        border-radius: 0 10/40rem 10/40rem 0;
        padding-left: 10/40rem;
        background-size: 40/40rem 40/40rem;
    }
    ul {
        padding-bottom: 3/40rem;
        li {
            display: inline-block;
            width: 135/40rem;
            height: 50/40rem;
            line-height: 50/40rem;
            border-radius: 10/40rem;
            background-color: #fff;
            margin: 5/20rem 3/20rem;
            text-align: center;
            color: #939a3c;
            font-weight: 600;
        }
    }
}

p {
    line-height: 81/40rem;
    padding: 0 27/40rem;
    color: #000;
    span {
        color: #002ed5;
        font-family: arial;
    }
}
.biao {
    width: 100%;
    text-align: center;
}
button {
    width: 450/40rem;
    height: 76/40rem;
    border: none;
    outline: none;
    margin: 0 auto 22/40rem;
    border-radius: 10/40rem;
}
button:nth-child(1) {
    background: #0857d8;
    color: #fff;
    box-shadow: 1px 2px 1px rgba(0,0,0,0.3);
}
button:nth-child(2) {
    color: #0857d8;
    background: #fff;
    box-shadow: 1px 2px 1px rgba(0,0,0,0.3);
}
/*.modal_box_feedback_regist {*/
    /*z-index: 99999;*/
    /*position: fixed;*/
    /*top: 0;*/
    /*height: 100vh;*/
    /*width: 100%;*/
    /*text-align: center;*/
    /*> div {*/
        /*background: rgba(0,0,0,0.5);*/
        /*color: white;*/
        /*padding: 10px 40px;*/
        /*border-radius: 4px;*/
        /*width: 70%;*/
    /*}*/
/*}*/
.submit_div_a {
    text-align: center;
    margin-top: 14/20rem;
}
.zzc{
    position:fixed;
    top:0;
    bottom:0;
    height:100%;
    width:100%;
    background:rgba(9,9,9,0.1);
}
.contain_m{
    background:#aaa;
    border-radius:5px;
    height:9.5rem;
    width:8rem;
    margin:10rem auto;
    text-align:center;
    padding:.3rem .5rem;
}
.contain_m p{
    color:#2E6EC9;
    font-size:.75rem;
}
.contain_m div{
    color:#fff;
    border-bottom:1px solid #ddd;
    padding:.5rem;
    font-size:.75rem;
}
.pay_header {
  font-size: 0;
  background-color: white;
  height: 50/20rem;
  border-top: 4/20rem solid #c7c7c7;
  >div{
    float: left;
  }
  > div:nth-of-type(1){
    width: 30%;
    border-bottom: 1px solid #c3c3c3;
    height: 25/20rem;
  }
  > div:nth-of-type(3){
    width: 30%;
    border-bottom: 1px solid #c3c3c3;
    height: 25/20rem;

  }
  > div:nth-of-type(2){
    width: 40%;
    border-bottom: 0;
    height: 46/20rem;
    text-align: center;
    img{
      width: 120/20rem;
      padding-top: 4/20rem;

    }
  }
}
.aisle{
  font-size: 0;
  margin-top: 12/20rem;
  >div{
    height: 29/20rem;
    background-image: url(../../../static/images/pay_aisle.png);
    background-color: white;
    box-shadow: 0 1/20rem 2/20rem #a0a0a0;
    background-repeat: no-repeat;
    background-size: 32/20rem;
    margin-left: 8/20rem;
    margin-top: 6/20rem;
    display: inline-block;
    font-size: 14/20rem;
    width: 95/20rem;
    border-radius: 3/20rem 3/20rem 3/20rem 3/20rem;
    padding: 4/20rem 0 0 40/20rem;
    color: #939a3c;
    font-weight: 600;
  }
  .active{
    background-color: #449df7;
    color: white;
    background-image: url(../../../static/images/pay_aisle_active.png);

  }
}
.seach{
  text-align: center;
  margin-top: 12/20rem;
  >*{
    display: inline-block;
  }
  select{
    border: 0;
  }
}

</style>
