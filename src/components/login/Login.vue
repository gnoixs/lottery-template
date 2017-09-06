<template>
  <div class="all1">

    <div class="login_back color1">
      <a  @click="back_index" href="javascript:;">
        <img src="../../../static/images/backing_out.png" alt="" />
      </a>
      <span>用户登录</span>
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

        <!--<input type="text" placeholder="验证码"/>-->
        <!--<input type="text" style="background:#9EABBC"/>-->
        <!--<a href="">-->
          <!--<p class="ty">忘记密码?</p>-->
        <!--</a>-->
        <div id="btn">
          <a @click="subMit">
            <button class="color1" style="color:#fff">确认登录</button>
          </a>
          <a @click="gotoAddress('/regist')">
            <button style="color:#3178CA;background:#CACDD6;">立即注册</button>
          </a>
        </div>
      </div>
    </div>

    <div v-show="isHao">
      <div class="modal_box_feedback_login">
        <div>{{title}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  // base 64
  import base64 from 'js-base64'
  //  md5
//  import md5 from 'blueimp-md5'
  //import { getUrl} from '../../api'
  export default {
    data() {
      return {
        ispassWord:false,
        userName: '',
        passWord: '',
        isHao: false,
        title:"",
        from:{
          input1:false,
          input2:false
        },
        test1:"http://www.baidu.com"
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
              this.title="登陆成功"
              this.isHao=true

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
      back_index(){
        this.$router.push("/index")
      }
    }
    ,
    beforeCreate(){
      sessionStorage.removeItem("im_token");
    },
    watch: {
  '$route' (to, from) {
  }
  }
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
      width: 1.2rem;
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
    margin:1rem auto;
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
  .modal_box_feedback_login {
    z-index: 99999;
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    display:-webkit-flex;
    justify-content: center;
    align-items: center;
    > div {
      background: rgba(0,0,0,0.5);
      color: white;
      padding: 10px 40px;
      border-radius: 4px;
    }
  }
  .login_back{

    padding: 10/20rem 16/20rem;
    margin-bottom: -16/20rem;
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
