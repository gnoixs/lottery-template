<template>
  <div class="all1" :style="{'top': isIosWebview ? 40/40+'rem': 0}">
    <div class="login_back color1">
      <a  @click="back_index" href="javascript:;">
        <img src="../../../static/images/backing_out.png" alt=""/>
      </a>
      <span test="test">用户登录</span>
    </div>


    <div class="container" >
      <div>
        <div class="logo logoali"></div>
      </div>
      <div class="input2">
        <div>
           <span class="zhanhao"></span><input  type="text" @blur="verification_1(userName)" v-model="userName" placeholder="用户账号"/>
        </div>
        <div>
          <span class="loc"></span>
          <input type="password" v-model="passWord" placeholder="登陆密码" ref="passwordInput"/>
          <i @click="changePasswordType" :class="`${ispassWord?'openEyes':'closeEyes'}`"></i>
        </div>
				
          <p style="margin-top: 0.5rem;">
          	
          	<label style="color:#146cdc;"><input type="checkbox"  class="checkbox" v-model="rememberpassword"/><i class="checkboxinput"></i>记住密码</label>
          	<a @click='isShiwan' style="float: right;color:#146cdc;margin-right:0.5rem;">免费试玩</a>
          </p>
        
        <!--<input type="text" placeholder="验证码"/>-->
        <!--<input type="text" style="background:#9EABBC"/>-->
        <!--<a href="">-->
          <!--<p class="ty">忘记密码?</p>-->
        <!--</a>-->
        <div id="btn">
          <a @click.prevent="subMit">
            <button class="color1" style="color:#fff">确认登录</button>
          </a>
          <a @click.prevent="gotoAddress('/regist')">
            <button class="gdcolor" style="color:#fff;background:#459df7;">立即注册</button>
          </a>
        </div>
          <!--<div style="margin-top: 0.5rem">
       		 <a  @click='isShiwan'style="float: left;color:#146cdc;">找回密码</a>
	         <a @click='isShiwan' style="float: right;color:#146cdc;margin-right:0.5rem;">免费试玩</a>
        </div>-->
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

  </div>
</template>

<script>
  // base 64
  import base64 from 'js-base64'
  //  md5
//  import md5 from 'blueimp-md5'
//  import { getUrl} from '../../api'
  export default {
    data() {
      return {
        is_gd_ali: is_gd_ali(),
        isIosWebview: isIosWebview,
        ispassWord:false,
        userName: '',
        passWord: '',
        isHao: false,
        title:"",
        logoxian:false,
        isOpen:false,
        rememberpassword:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).rember : false,
        from:{
          input1:false,
          input2:false
        },
        test1:"http://www.baidu.com",
        user:{
        	userName:'',
        	passWord:'',
        	rember:''
        }
      }
    },
    methods: {
      changePasswordType(){

          (this.ispassWord = !this.ispassWord)?this.$refs.passwordInput.type = "text":this.$refs.passwordInput.type = "password"
          console.log(this.ispassWord)
      },
      gotoAddress(path) {
        this.$router.push(path)
      },
      verification_1(userName){
        //长度在6~16之间
        if (!(/\w{6,14}$/.test(userName))) {
          this.from.input1=true
        }
        else {
          this.from.input1=false
        }
      },
      verification_2(passWord){
        //长度在6~16之间
        if (!(/\w{6,14}$/.test(passWord))) {
          this.from.input1=true
        }
        else {
          this.from.input1=false
        }
      },
      subMit(){
        //判定填写表单符合验证标准，且不为空
        if(this.userName.length>5 && this.passWord.length>5){
          let params = {};
          params.username = this.userName;
          params.password = this.passWord;
          this.$http.post(`${getUrl()}/user/signin`,JSON.stringify(params)).then(res => {
          	console.log(res.data)
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
            		if(this.rememberpassword){
            			this.user.userName=" "+this.userName
            			this.user.passWord=" "+this.passWord
            			this.user.rember=this.rememberpassword
            			localStorage.setItem('user',JSON.stringify(this.user))
            			
            		}else{
									localStorage.removeItem('user')
            		}
            	  this.isHao=true
            	if(this.is_gd_ali){
			      			this.$refs.rscenter.style.backgroundImage="url('../../../static/images/suuccen.png')"
				      	}else{
				      		this.$refs.rscenter.style.backgroundImage="url('../../../static/images/gdsuuccen.png')"
				      	}
              this.title="登陆成功"
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
        }
        else {
          this.title="账号或密码输入不正确"
          this.isHao=true
          setTimeout(()=>{
            this.isHao=false
          },600);
        }
      },
      isShiwan() {
					this.logoxian=true
          this.isOpen=false
        	this.$http.post(`${getUrl()}/user/signdemo`).then(res => {
        		
          if (res.data.oid) {
          	if(this.is_gd_ali){
          			this.$refs.rscenter.style.backgroundImage="url('../../../static/images/suuccen.png')"
          	}else{
          			this.$refs.rscenter.style.backgroundImage="url('../../../static/images/gdsuuccen.png')"
          	}
          	
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
             setTimeout(()=>{
                this.isHao=false
                this.$router.push('/index')
              },600);
          } else {
            this.title = "登录失败"
            this.isHao = true
            setTimeout(() => {
              this.isHao = false
            }, 600);
          }
        })
      },
      back_index(){
        this.$router.push("/index")
      }
    }
    ,
    beforeCreate(){
    	

      sessionStorage.clear();
    },
    created(){
    	
      if(localStorage.getItem('user')){
      	 this.userName = JSON.parse(localStorage.getItem('user')).userName.trim() 
      	 this.passWord = JSON.parse(localStorage.getItem('user')).passWord.trim()
     		 this.rememberpassword=JSON.parse(localStorage.getItem('user')).rember 
      }else{
      	
      }
    },
//   rememberpassword(){
//  	console.log(1111)
//  },
    watch: {
		  '$route' (to, from) {
		  }
		},
		
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  /*登录页*/

  .container {
    // padding:2rem;
    .logo {
      width: 600/47rem;
      height: 206/47rem;
      // background: url(../../../static/images/login-logo.png) no-repeat;

      margin:3rem auto 2rem;
    }
    .login-ul {

      >li {
        margin-bottom: .44rem;
        position: relative;
      } // 错误提示
      .hint {
        color: #ff4081;
      }
    }
  }
  .all1{
    width:100%;
    height:100%;
    background: #fff;
    // background-image:url(../../../static/images/Layer5.png) ;
    background-repeat: no-repeat;
    background-size: 100vw 100vh;
    overflow: hidden;
  }
  .tel {
    border: 0;
    padding-left: 10px;
    font-size: 16px;
  }

  .messagenum {
    border: 0;
    padding-left: 10px;
    font-size: 16px;
    /*width: 50%;*/
  }

  .getnum {
    border: 0;
    border: 1px solid #e66280;
    background: #fff;
    padding: 3px;
    color: #e66280;
    border-radius: 5px;
    position: absolute;
    right: 0px;
  }

  .login-ok {
    width: 100%;
    background: #d1506d;
    border: 0;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    border-radius: 7px;
    color: #fff;
  }

  .inv {
    margin-top: 10px;
    color: #e66280;
    text-decoration: underline;
  }

  .ty {
    display:inline-block;
    float:left;
    margin:0.5rem 0;

  }

  .return>i {
    width: 20px;
    height: 30px;
    display: inline-block;
    /*background: url(../../../static/return.png) no-repeat;*/
    background-size: 70%;
    position: absolute;
    left: 0;
    top: 10px;
  }
  .input2{
    padding:0.5rem;
    // text-align:center;
    span{
      display:inline-block;
      width: 1.3rem;
      height: 1.3rem;
      background:red;
      vertical-align:middle;
    }
  }
    .input2{
       >div:nth-child(1){
          border-bottom: 1px solid #cccccc;
         line-height:2.8rem;
         >input{
          padding:0;
          width: 12rem;
          height:1.5rem;
          background-color: #fff;
          padding-left:1rem;
          border:none;
          margin: 0;
          outline:none;
         }
       }
       >div:nth-child(2){
          border-bottom: 1px solid #cccccc;
         line-height:2.8rem;
         position:relative;
         >input{
          padding:0;
          width: 12rem;
          height:1.5rem;
          padding-left:1rem;
           background-color: #fff !important;
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
    }

  ::-webkit-input-placeholder{
    color:#D1D5DF;
  }
  .input2 a{
    text-decoration:none;
    >p{
      color:#1A447C;
    }
  }
  .input2 input:nth-child(3){
    width:7rem;
    float:left;
  }
  .input2 input:nth-child(4){
    width:3.5rem;
    float:right;
  }
  button{
    outline:none;
  }
  #btn{
   /* margin:1rem auto;*/
    text-align:center;
  }
  #btn a{
    text-decoration:none;
  }
  #btn a button{
    border-radius:0.2rem;
    height:2rem;
    line-height:2rem;
    width:100%;
    margin-top:1rem;
    border:none;
    font-size:0.6rem;
  }
  #btn a button:nth-child(1){
    color:#B6C3DA;
    background:#3369C6;
  }

  .login_back{
    padding: 0.4rem 0.8rem;
    margin-bottom: -0.8rem;
    height: 1.95rem;
    box-sizing: border-box;
    line-height: 0.95rem;
    width: 100%;
    position: fixed;
    z-index: 10000000000;
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
.checkbox{
 position: absolute; top: -9999px;
}
 .checkboxinput{
    display: inline-block;
    width: 17px; height: 17px;
    margin-right: 5px;
    background: url(../../../static/images/radio_simulation.png) no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
}
input:checked+i{
    background: url(../../../static/images/radio_simulation_check1.png) no-repeat;
    background-size: 100% 100%;
}

</style>
