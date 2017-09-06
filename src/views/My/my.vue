<template>
  <!--个人中心-->
  <div class="myCenter" style="height:100%;background:#dbe2ea;">
    <!--头部-->
    <header class="tohop_head container color1">
      <div class="text-center">
      	<span  @click="goback" >
      		<img src="../../../static/images/backing_out.png" alt="" />
      	</span>
        <span>我的</span>
      </div>
    </header>

    <div class="my_header">
      <div>

      </div>
      <div>
        晚上好,{{im_username}}
      </div>
      <div>
        用户余额: <i>￥{{im_money}}</i>
        <img @click="refresh_money" src="../../../static/images/refresh.png"/>
      </div>
    </div>


    <div class="my_main">
      <ul>
        <li  @click='gotoAddress("/myInfo")'>
          <div class="sm_avatar">
          </div>
          <span>个人资料</span>
        </li>
        <li  @click="gotoAddress('/passwordD')">
          <div class="lock_my">
          </div>
          <span>修改登录密码</span>
        </li>
        <li @click='gotoAddress("/todayBuyColor")'>
          <div class="note_my" >
          </div>
          <span>未结明细</span>
        </li>
        <li @click="gotoAddress('/Order')">
          <div class="money_my">
          </div>
          <span>资金管理</span>
        </li>
        <li  @click="gotoAddress('/passwordZ')">
          <div class="lock_money" >
          </div>
          <span>修改取款密码</span>
        </li>
        <li  @click='gotoAddress("/myHistroy")' >
          <div class="note_my" >
          </div>
          <span>下注记录</span>
        </li>

        <li @click='gotoAddress("/todayWinning")'>
          <div class="hook" >
          </div>
          <span>今日已结</span>
        </li>
        <li @click='open_serviec' >
          <div class="service_my" >
          </div>
          <span>客服中心</span>
        </li>
        <li  @click='logout=true'>
          <div class="hook" >
          </div>
          <span>登出</span>
        </li>
      </ul>
    </div>

    <!--弹出框-->
    <div class="zzc"  v-show="logout" >
    	<div class="white2">
    			<p>确认退出？</p>
    			<div>
    				<button class="color1" @click='log_out()'>确认</button>
    				<button @click='quxiao()'>取消</button>
    			</div>
    	</div>
    </div>

    <div v-show="isHao">
      <div class="modal_box_feedback_regist">
        <div>{{title}}</div>
      </div>
    </div>

  </div>
</template>


<script>

 /* import {
    getUrl,
    getOid
  } from '../../api'*/

export default {

  data() {
    return {
      isHao:false,
      im_username:"",
      im_money:"",
      logout:false,
      serviec_url:"",
      window:null,
      title:""
    }
  },

  methods: {
    gotoAddress(path) {
      this.$router.push(path)
    },
    refresh_money(){
      let oidInfo = getOid();
      let odd={};
      odd.oid = oidInfo;
      this.im_money=""
      this.$http.post(`${getUrl()}/getinfo/money`,JSON.stringify(odd)).then(res => {
        this.im_money=res.data.money
      })
    },
    quxiao(){
      this.logout = false;
    },
    goback() {
      this.$store.dispatch('goBack') // 发送后退的状态
      // 后退
      this.$router.go(-1)
    },
    log_out(){
      sessionStorage.clear()
      this.$router.push("/index")
    },
    open_serviec(){
      this.window=window.open();
      this.$http.post(`${getUrl()}/user/getCustomerService`,"").then(res => {
        if(res.data.kefu){
          this.window.location.href=res.data.kefu;
        }
        else {
          this.title = "网络请求失败，请稍后再试"
          this.isHao = true
          setTimeout(() => {
            this.isHao = false
            return
          },1200)

        }
      })
    }
  },


  created(){
    if(sessionStorage.getItem('im_money')){
      this.im_username=sessionStorage.getItem('im_username')
      this.im_money=sessionStorage.getItem('im_money')
    }
    else {
      this.$router.push("/login")
    }
  }


}

</script>



<style lang="less" rel="stylesheet/less" scoped>
button{
  outline: none;
}
.myCenter {
  /*头部*/
  >header {
    background:url(../../../static/images/blue.png)no-repeat;
    background-size:100% 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: .9rem;
    >div {
      height: 100%;
      color: #FFFFFF;
    }
  }
  .text-center span:first-child{
      	position: absolute;
      	left:15px;
      	>img{
      		width:13px;
      		height:20px;
      		margin-top:-5px;
      		margin-left:9px;
      	}
      }
  /*登陆注册*/
  .person_img {
    margin-top: 40/20rem;
    .login-msg {
        background:url(../../../static/images/blue1.png)no-repeat;
        background-size:100% 100%;
      padding: .8rem 1.4em;
      border-bottom: 1px solid #ccc;
      a {
        display: block;
        /*color: #333;*/
      }
      // 头像
      .head {
        width: 2.8rem;
        height: 2.8rem;
        background-color: #eeeeee;
        float: left;
        border-radius:10px;
        >img {
          width: 100%;
          border-radius:10px;
        }
      } // 点击登陆
      .clickLogin {
       position:relative;
       top:0.5rem;
       left:0.8rem;
       color:#9AB4ED;
        >p:nth-of-type(1){
          font-size: 18/20rem;
        }

        .username {
          line-height: 2.8rem;
        }
        >a {
          display: inline;
          padding: .4rem;
        }
        .loging {
          margin-left: .4rem;
          >p:first-child {
            margin: .4rem 0rem;
          }
        }
        .sign {
          border: 0;
          background: #fff;
          border: 1px solid #e97194;
          border-radius: 3px;
          color: #333;
          padding-left: 5px;
          padding-right: 5px;
          font-size: 12px;
        }
      } // 账号管理
      .account {
        line-height: 2.8rem;
        a {
          display: inline;
        }
        >span {
          padding: 0 .3rem;
        }
      }
    }
    /*优惠*/
    .person_in {
      display: flex;
      padding: 10px 0;
      background:#fff;
      border-bottom:1px solid #EEEEEE;
      a{
        color: #585858;
      }
      >div {
        flex: 1;
        text-align: center;
        >div {
            text-align: center;
            margin:5px auto;
          >a {
            display: inline-block;
            position: relative;
            width: 80px;
            img {
              width: 40%;
            }
            p {
              color: #585858;
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              font-size:0.7rem;
              font-weight:600;
            }
            >span{
            	position:relative;
            	left:2rem;
            	top:-0.5rem;
            	>span{
            		position:absolute;
            		left:0.2rem;
            		color:#fff;
            	}
            	>img{
            		width:1rem;
            		height:0.7rem;
            	}
            }
          }
        }
      }
    }
  }
  /*订单*/
  .person_order {
    margin-top: 10px;
    background: #fff; //全部订单
    .person_ordin {
      padding: 15px;
    }
    .person_order_in {
      display: flex;
      >div {
        flex: 1;
        text-align: center;
        p {
          margin-top: 5px;
        }
        img {
          width: 40%;
        }
      }
    }
  } // 箭头
  .arrow {
    background: url(../../../static/images/cou_r.png) no-repeat;
    width: 12px;
    height: 10px;
    display: inline-block;
    background-size: 50%;
    margin-left: 5px;
    margin-top: 5px;
  }
}

.person_ordin>span {
  font-size: 16px;
  color: #000;
}

.person_ordin>i {
  color: #999;
}

.person_order_in {
  background: #fff;
  padding-top: 10px;
  padding-bottom: 5px;
  border-top: 1px solid #ccc;
}

.person_order_in ul li {
  width: 24%;
}

.person_order_in ul li img {
  width: 40%;
  margin-bottom: 5px;
}

.person_my {
  background: #fff;
  margin-top: 0.8rem;
  border-top:1px solid #EEEEEE;
}

.person_my>ul>li {
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
  height: 45px;
}

.person_my>ul>li i {
  font-size: 0.58rem;
  color: #999;
  margin-left: 0.2rem;
}

.person_my>ul>li img {
  width: 6%;
}

.person_order_in>ul>li {
  position: relative;
}

.order-num {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
  right: 20px;
  border: 1px solid red;
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
  background: red;
}

.sign-yes {
  border: 0;
  background: #fff;
  border: 1px solid #e97194;
  border-radius: 3px;
  color: #333;
  padding-left: 5px;
  padding-right: 5px;
  position: absolute;
  left: 90px;
  top: 35px;
  font-size: 12px;
}
.zzc{
	background:rgba(0,0,0,0.5);
	top:0;
	height:100%;
	position:absolute;
	width:100%;
}
.white2{
	margin:10rem auto;
	width:11rem;
	background:#fff;
	border-radius:5px;
	padding:0.5rem;
}
.white2 p{
	text-align:center;
	color:#7F7F7F;
	font-size:0.8rem;
	margin:0.5rem auto;
}
.white2 div{
	border-top:1px solid #EEEEEE;
	text-align: center;
	margin:0 -0.5rem;
}
.white2 div button{
	border-radius:5px;
	width:4.5rem;
	height:1.5rem;
	border:none;
	margin:0.5rem auto;;
}
.white2 div button:first-child{
		background:#0857D8;
	color:#DFDFDF;
}
.white2 div button:nth-child(2){

	color:#D7E4F8;
  background:#707070;
}

.modal_box_feedback_regist {
  z-index: 99999;
  position: fixed;
  top: 0;
  height: 100%;
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

.my_main{
  background-color: white;
  >ul{
    font-size: 0;
    >li{
      display: inline-block;
      width: 33.33%;
      text-align: center;
      font-size: 12/20rem;
      height: 100/20rem;
      border-right: 1px solid #e0e1e5;
      border-bottom: 1px solid #e0e1e5;

      >div{
        height: 70/20rem;
        background-position: center;
        background-size: 40%;
      }
    }
    >li:nth-of-type(3),li:nth-of-type(6),li:nth-of-type(9){
      border-right: 0;
    }
    >li:nth-of-type(7),li:nth-of-type(8),li:nth-of-type(9){
      border-bottom: 0;
    }

  }
}
.tohop_head{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}

.my_header{
  background-image: url(../../../static/images/avatar_bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  color: #9ac5f2;
  margin-top: 40/20rem;
  padding-top: 7/20rem;
  >div:nth-of-type(1){
    background-image: url(../../../static/images/avatar.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 26%;
    height: 90/20rem;
  }
  >div:nth-of-type(3){
    padding: 0/20rem 0 10/20rem 10/20rem;
    >i{
      color: white;
    }
    >img{
      width: 24/20rem;
      margin-left: 10/20rem;
    }
  }
}




</style>
