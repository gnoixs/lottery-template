<template>
<div>
	<div>
       <i-header title="添加银行卡"></i-header>
    </div>
	<div>
		<div class="title">为了您的账户安全，真实姓名要与绑定的银行卡姓名一致</div>
		<div>
			<div class="name">
				<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
				<input type="" name="" placeholder="请输入姓名" v-model="userName" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">
			</div>
			<div class="bank">
				<span>银&nbsp;行&nbsp;卡&nbsp;号：</span>
				<input type="" name="" placeholder="请输入银行卡号" v-model="bankCode" minlength="16" maxlength="19" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
			</div>
			<div class="seach">
				<span>请选择银行：</span>
				<div>
					<select v-model="bankName">
						<option v-for="option in options" v-bind:value="option">
							{{option}}
							</option>
					</select>
				</div>
			</div>
			<div class="adrres">
				<span>开&nbsp;户&nbsp;地&nbsp;址：</span>
				<input type="text" name="" placeholder="请输入开户行地址" v-model="bankAdress" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')">
			</div>
			<!-- <div class="adrres">
				<span>支付密码: </span>
				<input type="password" name="" placeholder="请输入支付密码">
			</div> -->
		</div>
		<div class="submit">
			<button class="color1" @click="submitBank">提交</button>
		</div>

    <div v-show="isHao">
      <div class="modal_box_feedback_login">
        <div>{{title}}</div>
      </div>
    </div>
	</div>
</div>
</template>
<script>
import iHeader from '../../components/i-header'
/*import {
  getOid,getUrl
} from '../../api'*/
export default {

    components: {
      iHeader
    },
    data () {
	    return {
				isHao:false,
				title:"",
				bankName:"工商银行",
				bankCode:"",
				userName:"",
				bankAdress:"",
				options:["工商银行","建设银行","农业银行","招商银行","交通银行","兴业银行","中国银行","广发银行","深发银行","中信银行","光大银行","浦发银行","中国邮政","民生银行","平安银行(原深圳发展银行)","华夏银行"],
	      activeTab: 'all'
	    }
	  },
	  methods: {
    submitBank(){
			if (this.bankCode==""||this.bankAdress==""||this.userName=="") {
				this.title = "填写信息不能为空"
				this.isHao = true
				setTimeout(() => {
					this.isHao = false
					return
				},1200)
			}
			else if (this.bankCode.length<16) {
				this.title = "请输入正确的银行卡号"
				this.isHao = true
				setTimeout(() => {
					this.isHao = false
					return
				},1200)
			}
			else {
				let params = {};
				let uerInfo = getOid();
				params.oid = uerInfo;
				params.bank_code = this.bankCode;
				params.bank_name = this.bankName;
				params.bank_address = this.bankAdress;
				this.$http.post(`${getUrl()}/user/info`, JSON.stringify(params)).then(res => {
					if (res.data.msg == "4001") {
						// let timeStamp = res.data.next.timestap;
						this.$router.push({
							path: '/login'
						}) // 跳转到登陆
					} else if(res.data.msg==2006){
						this.title = "操作成功"
						this.isHao = true
						setTimeout(() => {
							 this.$router.push({
											path: '/order'
										})
							this.isHao = false
							return
						},1200)
					}
				})
			}

		}

	  }
}
</script>
<style  lang='less' ref="stylesheet/less" scoped>
	.title{
		line-height: 70/40rem;
		font-size: 23/40rem;
		text-align: center;
		color: #7d7d83;
		border-bottom:1px solid #c3c3c3;
	}
	.name{
		height: 85/40rem;
		line-height:  85/40rem;
		padding-left: 26/40rem;
		background: #fff;
		border-bottom:1px solid #c3c3c3;
		margin-bottom: 10/40rem;
		span{
			font-size: 28/40rem;
			color:#000000;
			margin-right: 20/40rem;
		}
		input{
			border: none;
			margin: 0;
			padding: 0;
			outline: none;
			width: 60%;
		}
	}
	.bank{
		height: 85/40rem;
		line-height:  85/40rem;
		padding-left: 26/40rem;
		background: #fff;
		border-bottom:1px solid #c3c3c3;
		margin-bottom: 10/40rem;
		span{
			font-size: 28/40rem;
			color:#000000;
			margin-right: 20/40rem;
		}
		input{
			border: none;
			margin: 0;
			padding: 0;
			outline: none;
			width: 60%;
		}
	}
	.seach{
		height: 85/40rem;
		line-height:  85/40rem;
		padding-left: 26/40rem;
		background: #fff;
		border-bottom:1px solid #c3c3c3;
		margin-bottom: 10/40rem;
		display: flex;
		span{
			font-size: 28/40rem;
			color:#000000;
			margin-right: 20/40rem;
		}
		div{

			width: 60%;
			text-indent: 20/40rem;
			overflow: hidden;
			select{
				width: 108%;
				border: none;
				margin: 0;
				padding: 0;outline: none;
				float: left;
				position: relative;
				top: .5rem;
			}
		}
		div:after{
			content: '';

		}
	}
	.adrres{
		height: 85/40rem;
		line-height:  85/40rem;
		padding-left: 26/40rem;
		background: #fff;
		border-bottom:1px solid #c3c3c3;
		margin-bottom: 10/40rem;
		span{
			font-size: 28/40rem;
			color:#000000;
			margin-right: 20/40rem;
		}
		input{
			border: none;
			margin: 0;
			padding: 0;
			outline: none;
			width: 60%;
		}
	}
	.submit{
		height: 180/40rem;
		display: flex;
		align-items:center;
		button{
			margin: 0 auto;
			width: 396/40rem;
			height: 69/40rem;
			border-radius: 10/40rem;
			border:none;
			outline: none;
			background: #206edb;
			color: #fff;
		}
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
</style>
