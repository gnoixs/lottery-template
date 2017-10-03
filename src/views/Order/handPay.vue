<template>
  <div class="" style="height:100%">
    <i-header title="资金管理"></i-header>

    <div class="title">
      <span class="fffhui" @click='hui'></span>
      <h3>线下充值</h3>
    </div>
    <div class="list_1" v-if = "activePay=='bankpay_array'">
      <span>开户银行:</span>
      <span>{{resDate.bank_name}}</span>
    </div>
    <div class="list_1" v-if = "activePay=='bankpay_array'">
      <span>银行地址:</span>
      <span>{{resDate.bank_addres}}</span>
    </div>
    <div class="list_1">
      <span>收款人:</span>
      <span>{{resDate.bank_user}}</span>
    </div>
    <div class="list_1" style="border-bottom:none;" v-if = "activePay!='bankpay_array'">
      <span>{{(resDate.id==70)?'账&nbsp;&nbsp;号':"账&nbsp;&nbsp;&nbsp;号"}}:</span>
      <span>{{resDate.bank_account}}</span>
    </div>
    <div class="list_1" style="border-bottom:none;" v-if = "activePay=='bankpay_array'">
      <span>{{(resDate.id==70)?'卡&nbsp;&nbsp;号':"卡&nbsp;&nbsp;&nbsp;号"}}:</span>
      <span>{{resDate.bank_account}}</span>
    </div>

    <div class="m11">
      <div class="yhk"  style="display:none;">
        <div v-for="(k,j) in resDateS" v-bind:class="{active:activePay==j}"   v-if="k.length!=0" @click="changeUrl(k,j)">
          <button type="button" name="button">
            <img :src="`../../../static/images/${j}.png`"/>
          </button>
        </div>
      </div>
			
      <div style="margin-top:1rem;">
        <div class="hand_pay_from">
          <div class="ewm1" v-if="resDate.bank_image_url">
            <span>扫描右侧二维码</span>
            <img :src="resDate.bank_image_url" alt="">
          </div>
          <div class="m1" v-if = "activePay=='bankpay_array'">
            <span>银行名称:</span>

              <select v-model="bankName">
                <option v-for="option in options" v-bind:value="option">
                  {{option}}
                </option>
              </select>
          </div>
          <div class="m1" >
            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
            <input type="" name="" placeholder="请输入账户姓名" v-model="payUer"/>
          </div>
          <div class="m1">
            <span>金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额:</span>
            <input type="" name="" :placeholder="`最低输入${linedownmin}元`" v-model.trim="payMoney" @keyup="show($event)">
          </div>
          <div class="m1">
            <span>交易单号:</span>
            <input type="" name="" placeholder="请输入订单后四位" v-model="amoutF" minlength="4" maxlength="4">
          </div>
          <div class="m1">
            <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</span>
            <input type="" name="" placeholder="可不填" v-model="payRea">
          </div>
        </div>
      </div>
    </div>

    <div class="btn1_group">
      <button type="button" class="btn1 color1" name="button" @click="subMit">确认存款</button>
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
  import iHeader from '../../components/j-header'
//  import {
//    getOid,
//    getUrl
//  } from '../../api'
  export default {
    components: {
      iHeader
    },
    data() {
      return{
      	is_gd_ali: is_gd_ali(),
        options:["工商银行","建设银行","农业银行","招商银行","交通银行","兴业银行","中国银行","广发银行","深发银行","中信银行","光大银行","浦发银行","中国邮政","民生银行","平安银行(原深圳发展银行)","华夏银行"],
        a:{},
        b:{},
        c:{},
        d:{},
        linedownmin:0,
        resDateS: {},
        resDate: {},
        bankName: "",
        amoutF: "",
        payUer: "",
        payRea:"",
        payMoney: null,
        timeDay: "",
        paykind: "银行",
        isHao: false,
        title: "",
        activePay:"bankpay_array"
      }
    },
    beforeCreate() {
  
    	let routezf = this.$route.params.zf.split(':')[1];//order传过来的支付方式的参数
      let params = {};
      let userOid = getOid();
      params.oid = userOid;
    
      this.$http.post(`${getUrl()}/user/payin`, JSON.stringify(params)).then(res => {
       	console.log(res.data);
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
          this.a = res.data.bankpay_array[0];
          this.b = res.data.alipay_array[0];
          this.c = res.data.wechat_array[0];
          this.d = res.data.quickpay_array[0];
          this.resDate = res.data.bankpay_array[0];
          this.resDateS = res.data.linedown;
          this.linedownmin = res.data.moneylimit.linedownmin;
          var _type = res.data[routezf];//支付对象
          this.changeUrl(_type,routezf);//调用点击事件
          for(var key in this.resDateS){
            if (this.resDateS[key].length>0) {
            }
          }
        }

      })
    },
 
    methods: {
      show(t){
        t.target.value = t.target.value.replace(/[^0-9.]/g, "");
		if (!(parseFloat(t.target.value) > 0 &&  (/^\d+\.?\d{0,2}$/.test(t.target.value)) ) ) {
			t.target.value = parseFloat(t.target.value).toFixed(2);
		}
		if ("NaN" == t.target.value) {
			t.target.value="";
		}
      },
      changeUrl(payType,j){
      	console.log(payType,j);
        this.resDate = payType[0];
        this.activePay=j
      }

      ,
      tanBank(){
        this.title = "不支持这种充值方式"
        this.isHao = true

        setTimeout(() => {
          this.isHao = false;
        }, 1200)
        return
      },
      subMit() {
        if (this.payMoney < Number(this.linedownmin)) {
          console.log(this.payMoney);
          this.title = `金额最少${this.linedownmin}元`
          this.isHao = true
          setTimeout(() => {
            this.isHao = false
          }, 1200)
        }
        else if(this.bankName<1&&this.activePay=="bankpay_array"){
          this.title = `请选择银行`
          this.isHao = true
          setTimeout(() => {
            this.isHao = false
          }, 1200)
        }
        else if(!(/^[\u4E00-\u9FA5·a-zA-Z]{2,}$/.test(this.payUer))){
          this.title = `姓名为必填栏，仅限填写中文`
          this.isHao = true
          setTimeout(() => {
            this.isHao = false
          }, 1200)
        }

        else if (this.payMoney >= Number(this.linedownmin)) {
          console.log(22);

          let amoutF = /[a-zA-Z0-9]{4}/.test(this.amoutF)
          let amouRea = this.payRea;
          console.log(amoutF, 1111)
          if (amoutF) {
            console.log(33);
            let params = {};
            let userOid = getOid();
            params.oid = userOid;
            params.realname = sessionStorage.getItem('im_realname');
            console.log(params.realname);
            params.amount = this.payMoney;
            params.orderNo = this.amoutF;
            params.bank_id = this.resDate.id;
            params.typeName = this.payUer;
            params.payReason = this.payRea;
            params.date = '2017-07-02 15:03:00';
            params.bankName = this.bankName;
            params.way = this.paykind;
            this.$http.post(`${getUrl()}/user/offline_pay`, JSON.stringify(params)).then(res => {
              // console.log(timeStamp);
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
                //xiaosi

                if (res.data.msg == 5007) {
                  this.title = "正在审核"
                  this.isHao = true
                  setTimeout(() => {
                    this.isHao = false
                  }, 1200)
                } else if (res.data.msg == 2006) {
                		if(this.is_gd_ali){
					      			this.$refs.rscenter.style.backgroundImage="url('../../../static/images/suuccen.png')"
						      	}else{
						      		this.$refs.rscenter.style.backgroundImage="url('../../../static/images/gdsuuccen.png')"
						      	}
                  this.title = "订单提交成功"
                  this.isHao = true
                  this.payUer = ""
                  this.payMoney = null
                  this.amoutF = ""
                  setTimeout(() => {
                    this.isHao = false
                  }, 1200);
                } else if (res.data.msg == 5006) {
                  this.title = "操作繁忙，请稍后再试"
                  this.isHao = true
                  setTimeout(() => {
                    this.isHao = false
                  }, 1200);
                } else if (res.data.msg == 4001) {
                  this.$router.push({
                    path: '/login'
                  }) // 跳转到登陆
                } else if (res.data.msg == 3003) {
                  this.title = "缺失必填参数,请重试"
                  this.isHao = true
                  setTimeout(() => {
                    this.isHao = false
                  }, 1200);

                }

              }
            })
          } else {
            this.title = "请输入交易单号后四位"
            this.isHao = true
            setTimeout(() => {
              this.isHao = false
            }, 1200);
          }
        }
      },
      hui() {
        this.$router.push({
          path: '/order:0'
        })
      },
    }
  }
</script>
<style lang='less' ref="stylesheet/less" scoped>


  .mu-tab-active{
    background:#fff!important;
    border:1px solid #aaa;
    color:#aaa;
  }
  .mu-tab-link{
    border:1px solid #aaa!important;
    color:#aaa!important;
  }
  .mu-tabs{
    background:#fff;
  }
  .list_1 {
    background:#fff;
    padding:.5rem .2rem .5rem .6rem;
    border-bottom:1px solid #F4F4F6;
    color: #3a3a3a;
    span{
      display:inline-block;
    }
    >span:nth-of-type(1){
      width:60/20rem;
    }
    >span:nth-of-type(2){
      width: 230/20rem;
    }
  }
  .list_1 input{
    outline:none;
    border:#fff;
  }
  .m11{
    margin-top:.5rem;
    background:#fff;
    padding:.3rem;
  }
  .m1{
    padding:.3rem .3rem;
  }
  .m1 span{
    width:4rem;
    display:inline-block;
    color:#A0A0A0;
  }
  .ewm1 span{
    display:inline-block;
    width:5rem;
    padding:1rem;
    color:#B9B9B9;
  }
  .ewm1 img{
    position:relative;
    top:-1rem;
    width:5rem;
    height:4.5rem;
  }
  .btn1{
    background:#0857D8;
    color:#fff;
    text-align:center;
    padding:.3rem 1.8rem;
    outline:none;
    border:1px solid #0857D8;
    margin:1rem auto;
    display:inline-block;
    border-radius:5px;
  }
  .btn1_group{
    text-align: center;
  }
  .yhk{
    overflow:hidden;
  }
  .yhk {
    .active{
      border: 2px solid #767676;
    }
    >div{
      display: inline-block;
      width: 33%;
    }
    button{
      float:left;
      margin-left:.2rem;
      margin-top: 4/20rem;
      background:#fff;
      border:0;
      outline:none;
      padding:0;
      >img{
        width: 100%;
      }
    }
  }
  .title {
    height: 85/40rem;
    line-height: 85/40rem;
    background: #fff;
    border-bottom: 1px solid #dbdbdf;
    margin-top: 43/20rem;
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
  .i-header{
    position: fixed;
    top: 0;
    width: 100%;
  }

  .modal_box_feedback_login {
    z-index: 99999;
    position: fixed;
    top: 0;
    height: 100vh;
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
  .hand_pay_from input{
    border: 0;
  }
</style>
