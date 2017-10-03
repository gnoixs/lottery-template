<template>
  <div class="all1" :style="{'top': isIosWebview ? 40/40+'rem': 0}">
    <div class="topHeader" :style="{'background': is_gd_ali ? '#e60d39': '#146cdc'}" v-if="isIosWebview"></div>
   <div class="login_back color1">
      <a  @click="goback" href="javascript:;">
        <img src="../../../static/images/backing_out.png" alt="" />
      </a>
      <span>新用户注册</span>
    </div>
    <div class="cent1">

    <!-- <h3>请填写您的注册信息</h3> -->
    <div>
        <div class="logo logoazhu"></div>
      </div>
    <div class="form">
      <div>
        <span class="zhanhao"></span>
        <input @blur="verification_1(userName)" type="text" v-model="userName" placeholder="用户账号(6-15英文数字)"/>
        <img v-show="from.input1" src="../../../static/images/warning _b.png"/>
      </div>
      <div>
        <span class="loc"></span>
        <input ref="passwordInput" @blur="verification_2(passWord)" type="password" placeholder="登录密码(6-15英文数字)" v-model="passWord"/><i @click="changePasswordType_a" :class="`${ispassword_a?'openEyes':'closeEyes'}`"></i>
        <img v-show="from.input2" src="../../../static/images/warning _b.png"/>
      </div>
      <div>
        <span class="loc"></span>
        <input ref="passwordInput_again" @blur="verification_3(passWordAgain)" type="password" placeholder="确认密码(6-15英文数字)" v-model="passWordAgain"/><i @click="changePasswordType_b"  :class="`${ispassword_b?'openEyes':'closeEyes'}`" ></i>
        <img v-show="from.input3" src="../../../static/images/warning _b.png"/>
      </div>
      <div>
        <span class="zhanhao"></span>
        <input @blur="verification_4(realName)" type="text" placeholder="您的姓名(与提款的银行户名一致)" v-model="realName"/>
        <img v-show="from.input4" src="../../../static/images/warning _b.png"/>
      </div>

      <div class="select_a">
        <span class="loc"></span>
        <div class="input3">
          <select v-model="selected1">
            <option v-for="option in options" v-bind:value="option">
            {{option}}
              </option>
          </select>
          <select v-model="selected2">
            <option v-for="option in options" v-bind:value="option">
            {{option}}
              </option>
          </select>
          <select v-model="selected3">
            <option v-for="option in options" v-bind:value="option">
              {{option}}
              </option>
          </select>
          <select v-model="selected4">
            <option v-for="option in options" v-bind:value="option">
            {{option}}
            </option>
          </select>
          <!-- <select v-model="selected5">
            <option v-for="option in options" v-bind:value="option">
            {{option}}
              </option>
          </select>
          <select v-model="selected6">
            <option v-for="option in options" v-bind:value="option">
              {{option}}
              </option>
          </select> -->
        </div>
        <div>提现密码</div>
      </div>


      <!--<div>-->
        <!--<span class="recommend"></span>-->
        <!--<input type="text" placeholder="便于日后找回密码" v-model="email"/>-->
        <!--<img v-show="from.input5" src="../../../static/images/warning _b.png"/>-->
      <!--</div>-->
      <div class="btn5">
        <button class="color1"  @click="subMit">立即注册</button>
      </div>

			
    </div>
      <div class="back_login"><span>已有账号?</span><a class="color_money" @click='gotoAddress("/login")'>马上登陆</a></div>
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
// base 64
import base64 from 'js-base64'
//  md5
import md5 from 'blueimp-md5'
//import { getUrl} from '../../api'
export default {
  data() {
    return {
    	is_gd_ali: is_gd_ali(),
      isIosWebview: isIosWebview,
      paypasswd:'',
      realName:"",
      passWordAgain:'',
      email:'',
      agname:"",
      options:[0,1,2,3,4,5,6,7,8,9],
      selected1:0,
      selected2:0,
      selected3:0,
      selected4:0,
      // 手机号码
      userName: '',
      // 验证码
      passWord: '',
      passWordE:'',// 验证码错误信息
      // 邀请码
      inviteCode: '',
      //        错误信息
      errormsg: '',
      dialog: false,
      codeMessage: '',//  返回的验证码信息
      from:{
        input1:false,
        input2:false,
        input3:false,
        input4:false,
        input5:false
      },
      isHao:false,
      ispassword_a:false,
      ispassword_b:false,
      title:''
    }
  },

  methods: {
    changePasswordType_a(){
      (this.ispassword_a = !this.ispassword_a)?this.$refs.passwordInput.type = "text":this.$refs.passwordInput.type = "password"
    },

    changePasswordType_b(){
      (this.ispassword_b = !this.ispassword_b)?this.$refs.passwordInput_again.type = "text":this.$refs.passwordInput_again.type = "password"
    },

  subMit(){
      //判定填写表单符合验证标准，且不为空
      if(!this.from.input1 && !this.from.input2 && !this.from.input3 && !this.from.input4 && !this.from.input5 && this.userName.length>0 && this.passWord.length>0 && this.passWordAgain.length>0 && this.realName.length>0 ){
        for (let i = 1; i < 5; i++) {
          let j = `selected${i}`
          let w = this[j]
          this.paypasswd =`${this.paypasswd}${this[j]}`
        }
        let params = {};
        params.username = this.userName;
        params.password = this.passWord;
        params.realname = this.realName;
        params.paypasswd = this.paypasswd;
        params.agname = (this.agname)?this.agname:window.location.href.split("=")[1];

        let href=window.location.href;
        if(href.indexOf("www.") > 0 || href.indexOf("wap.") > 0){
           href=href.split("//")[1];
           href=href.split("/")[0];
          params.domain = href.split("/")[0];
        }
        else {
           href=href.split("//")[1];
          params.domain = href.split("/")[0];
        }
        this.$http.post(`${getUrl()}/user/signup`,JSON.stringify(params)).then(res => {
          if(res.data.msg==2004){
            this.title="账户不符合规范或者已经存在"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
          else if(res.data.msg==2003){

            this.title="注册失败"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
          else if(res.data.msg==2006){
          	console.log(res.data)
            this.title="注册成功"
            this.isHao=true
            this.paypasswd = ''

					this.$http.post(`${getUrl()}/user/signin`,JSON.stringify(params)).then(res => {
            if(res.data.msg==2001){
              this.title="密码错误"
              this.isHao=true
              setTimeout(()=>{
                this.isHao=false
              },600);
            }
            else if(res.data.msg==2002){
              this.title="用户不存在"
              this.isHao=true
              setTimeout(()=>{
                this.isHao=false
              },600);
            }
            else if(res.data.msg==2005){
              this.title="账户被冻结或停用"
              this.isHao=true
              setTimeout(()=>{
                this.isHao=false
              },600);
            }
            else if(res.data.oid){
              this.title="注册成功"
              this.isHao=true
            	if(this.is_gd_ali){
          			this.$refs.rscenter.style.backgroundImage="url('../../../static/images/suuccen.png')"
	          	}else{
	          			this.$refs.rscenter.style.backgroundImage="url('../../../static/images/gdsuuccen.png')"
	          	}
              sessionStorage.setItem('im_token', JSON.stringify(res.data.oid))
              sessionStorage.setItem('im_money', JSON.stringify(res.data.money))
              sessionStorage.setItem('im_username',res.data.username)
              sessionStorage.setItem('im_realname',res.data.realname)
              sessionStorage.setItem('im_email',res.data.qqskype)
              setTimeout(()=>{
                this.isHao=false
                this.$router.push('/index')
              },600);
            }
          })
//          setTimeout(()=>{
//            this.isHao=false
//            this.$router.push({
//              path: '/index'
//            }) // 跳转到登陆
//          },1200);
          }
          else if(res.data.msg==3003){
            this.title="注册失败"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
          else if(res.data.msg==2008){
            this.title="用户名:字母或者数字组合，必须以字母开头，6~15位"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
          else if(res.data.msg==2011){
            this.title="该名字已经被注册过了"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
          else {
            this.title="注册失败,注册信息不符合规范"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
        })
      }
      else {
          if(this.userName.length<=0 || this.passWord.length<=0 || this.passWordAgain.length<=0 || this.realName.length<=0 ){
            this.title="信息填写不完整"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
          else if (this.from.input1) {
            this.title="用户账号已存在或不符合规范,只能输入字母或数字,字符长度为6至15位"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1800);
          }
          else if (this.from.input2) {
            this.title="登录密码,必须混合字母和数字,字符长度为6至15位"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
          else if (this.from.input5) {
            this.title="电子邮件不符合规范"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }

          else if (this.from.input4) {
            this.title="姓名填写不符合规范"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }

          else if (this.passWordAgain != this.passWord) {
            this.title="登录密码与确认密码不同"
            this.isHao=true
            this.paypasswd = ''
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
      }
    },

    verification_1(userName){
      //字母、数字组成，字母开头，6-15位。
      if (!(/^[a-zA-Z0-9]{6,115}$/.test(userName))) {
        this.from.input1=true
      }
      else {
        this.from.input1=false
        let params={}
        params.username=this.userName
        params.password="a123456"
        this.$http.post(`${getUrl()}/user/signin`,JSON.stringify(params)).then(res=>{
          if(res.data.msg!=2002){
            this.from.input1=true
            this.title="用户已存在"
            this.isHao=true
            setTimeout(()=>{
              this.isHao=false
            },1200);
          }
        })
      }
    },
    verification_2(passWord){
      //字母、数字、下划线组成，字母开头，6-15位。
      if (!(/^[a-zA-Z0-9]{6,15}$/.test(passWord))) {
        this.from.input2=true
      }
      else {
        this.from.input2=false
      }
    },
    verification_3(passWord){
      if (!(this.passWord==passWord)) {
        this.from.input3=true
      }
      else {
        this.from.input3=false
      }
    },
    verification_4(realName){
      //两个以上的中文字
      if (!(/^[\u4E00-\u9FA5·]{2,}$/.test(realName))) {
        this.from.input4=true
      }
      else {
        this.from.input4=false
      }
    },
    verification_5(i){
    },
    // 组件方法
    close() {
      this.dialog = false;
    },
    goback() {
      this.$store.dispatch('goBack') // 发送后退的状态
      // 后退
      this.$router.go(-1)

    },
    gotoAddress(path) {
      this.$router.push(path)
    }
    //        验证账号
   }

}
</script>


<style lang="less" rel="stylesheet/less" scoped>

  ::-webkit-input-placeholder {
    font-size:12/20rem;
  }

  /*登录页*/
button{
  outline:none;
}
.container {
}
.all1{
	width:100%;
	height:100%;
  background: #fff;
	// background-image:url(../../../static/images/back.png);
	background-size:100% 100%;
}
.back_login{
  padding-top: 1rem;
  text-align:center;
}
.cent1 > a{
	text-decoration:none;
	margin:0.5rem auto;
	display:inline-block;
	img{
		width:0.5rem;
		height:0.8rem;
	}
}


::-webkit-input-placeholder{
	color:#cbcbcb;
}
.cent1{
		padding:0.5rem 1.5rem;
    .logo {
      width: 200/20rem;
      height: 70/20rem;
      margin:2rem auto 1rem;
    }
	}
	.cent1 h3{
		padding:0;
		margin:0;
		color:#fff;
	}

.form input{
		width:9.7rem;
		height:2rem;
		line-height:2rem;
		border:1px solid #A9ACBC;
		border-radius:10px;
		background:rgba(156,159,176,0.3);
		padding-left:10px;
		margin-top:0.4rem;
    margin-left: 5/20rem;
    outline: 0;
	}

.form span{
		color:#E0E2E7;
		font-size:0.6rem;
	}
	.input3{
    width: 160/20rem;
    margin-left: 4/25rem;
    display: inline-block;
	}

  .select_a{
    height: 48/20rem;
    >span:nth-of-type(1){
      width: 20/20rem;
      margin-right: 10/20rem;
    }
    >div:nth-last-of-type(1){
      display: inline-block;
      width: 62/20rem;
      font-size: 10/20rem;
      padding-top: 6/20rem;
      height: 30/20rem;
      line-height: 20/20rem;
      color: white;
      background-image: url(../../../static/images/cata1.png);
      background-size: 100% 100%;
      text-align:center;
      padding-left:6/20rem;
    }
  }
	.input3 select{
		width:32/20rem;
		height:1.5rem;
		text-align:center;
		outline:none;
		font-size:20px;
		appearance: none;
		-webkit-appearance: none;
		border-radius:5px;
    background: #eeeeee;
    border: 1px solid #e3e3e3;
    padding-left: 4/20rem;
    margin-right: 0/20rem;
	}
	.w{
		color:#fff;
		margin:0.5rem 0 0.5rem 3rem;
	}
	.form .btn5{
		margin:1rem auto;
    border-bottom:none;

	}
	.btn5 button{
		width:100%;
		height:2rem;
		line-height:2rem;
		border-radius:0.2rem;
		background:#3F79CB;
		color:#C6CEDF;
		font-size:0.7rem;
		border:none;
	}
  .form{
    margin-top: 38/20rem;
    span{

      width: 21/20rem;
      height: 21/20rem;
      background:red;
    }
    >div{
          border-bottom: 1px solid #cccccc;
         height: 40/20rem;
         line-height: 40/20rem;
          >span:nth-of-type(1){
            float: left;
            margin-top: 10/20rem;
          }

         >input{
          padding:0;
          width: 220/20rem;
          height:1.5rem;
          background-color: #fff;
          padding-left:13/20rem;
          border:none;
          margin: 0;
          outline:none;
         }
         .closeEyes,.openEyes{
          position:absolute;
          height: 0.5rem;
          width: 0.8rem;
          background: url(../../../static/images/eye1.png) no-repeat ;
          background-size: 100% 100% !important;
          top:1.2rem;
          right:0.5rem;
         }
       }

    >div{

      position: relative;
      >img{
        position: absolute;
        width: 35/20rem;
        right: -25/20rem;
      }
    }
  }
 .login_back{
   padding: 0.275rem 0.8rem;
   margin-bottom: -0.8rem;
   width: 100%;
   height: 1.95rem;
   position: fixed;
    a{

      display: inline-block;
      text-align:left;

      // margin-top:-0.3rem;
      img{
        width: 14/20rem;
      }
    }
    span{
      vertical-align: middle;
      display:inline-block;
      width:90%;
      font-size: 36/40rem;
      text-align:center;
      color: #fff;
    }
  }

</style>
