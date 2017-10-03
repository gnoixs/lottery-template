<template>
  <div>
    <div>
      <i-header title="我的密码"></i-header>
    </div>
    <div class="header1">
      <div class="return1">

        <span>设置密码</span>
      </div>

    </div>
    <div class="middle2">
      <p>请为您的账号设置一个新的登录密码</p>
    </div>
    <div class="middle2" style="margin-top:0.8rem">
      <input v-model="old_password" type="password" placeholder="请输入旧的登录密码" onkeyup="value=value.replace(/[^\a-z0-9]/g,'')" maxlength="16"/>
    </div>
    <div class="middle2" style="margin-top:0.8rem">
      <input type="password" v-model="new_password"  placeholder="请输入新的登录密码" onkeyup="value=value.replace(/[^\a-z0-9]/g,'')" maxlength="16"/>
    </div>
    <div class="middle2" >
      <input style="border-top:none" v-model="new_password_again"  type="password" placeholder="请再次确认新的登录密码" onkeyup="value=value.replace(/[^\a-z0-9]/g,'')" maxlength="16"/>
    </div>
    <div class="btn1">
      <button @click="submit" class="color1">确认修改</button>
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
  import iHeader from '../../components/i-header'
//  import {getOid,getUrl} from '../../api'
  export default {
    data() {
      return {
        old_password:"",
        new_password:"",
        new_password_again:"",
        title:"",
        isHao:false
      }
    },
    methods: {
      submit(){
        let prams={};
        prams.oid=getOid();
        prams.password=this.new_password;
        prams.oldpassword=this.old_password;
        let pwtest=/^\w+$/.test(this.new_password);

        if(this.new_password_again==this.new_password && pwtest && prams.oldpassword.length >= 6 && prams.password.length >= 6){

          this.$http.post(`${getUrl()}/user/info`,JSON.stringify(prams)).then(res => {

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
           }else if(res.data.msg == "3003"){
              this.title="缺失必填项"
              this.isHao=true
              setTimeout(()=>{
                this.isHao=false
              },1200);
            }
            else if(res.data.msg == "2006"){
              this.title="修改成功"
              this.isHao=true
              setTimeout(()=>{
                this.isHao=false
                this.$router.push({
                  path: '/login'
                }) // 跳转到登陆
              },1200);
            }
            else if(res.data.msg == "2001"){
              this.title="原始密码输入错误"
              this.isHao=true
              setTimeout(()=>{
                this.isHao=false
              },1200);
            }
          })
        }
        else {
          this.title="新密码两次输入不相同或不符合规范"
          this.isHao=true
          setTimeout(()=>{
            this.isHao=false
          },1200);
        }
      }
    },
    created() {

    },
    components: {
      iHeader
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .header1{
    height:46px;
    line-height:46px;
    border-bottom:1px solid #ECECEC;
  }
  .header1 > span{
    font-size:18px;
    text-align:center;
    display:block;
  }
  .middle2{
    height:45px;
    background:#fff;
  }
  .middle2 input{
    height:45px;
    width:100%;
    border-left:none;
    border-right:none;
    border-top:1px solid #E9E9EB;
    border-bottom:1px solid #E9E9EB;
    outline:none;
    padding-left:15px;
    font-size:16px;
    color:#8B8B8B;
  }

  .middle2 p{
    padding-top:12px;
    font-size:16px;
    font-weight: 500;
    text-align:left;
    padding-left:17px;
    color:#777777;
  }
  .btn{
    margin:40px auto;
    width:90%;
  }
  .btn button{
    text-align:center;
    border:1px solid #DDDDDD;
    background:#dddddd;
    height:1.8rem;
    border-radius:5px;
    line-height:1.8rem;
    width:100%;
    color:#BEBEBE;
    font-size:0.7rem;
    outline: none;;
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
  .return1{
    text-align: center;
  }
</style>
