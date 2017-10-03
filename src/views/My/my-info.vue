<template>
  <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
  <div >
    <div >
      <i-header class="color1" title="个人资料"></i-header>
    </div>
    <div class="info">
      <div>
        <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：</span>
        <span>{{usename}}</span>
        <!--<input type="text" />-->
      </div>
      <div>
        <span>账户余额：</span>
        <span>{{Number(money).toFixed(2)}}元</span>
        <!--<input type="text" />-->
      </div>
      <div>
        <span>真实姓名：</span>
        <span>{{realname}}</span>
        <!--<input type="text" />-->
      </div>
      <div>
        <span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
        <span>{{email=="null"?'无':email}}</span>
        <!--<input type="text" />-->
      </div>
    </div>
  </div>
</template>


<script>
  import iHeader from '../../components/i-header'
//  import {getOid} from '../../api'
  export default {

    data() {
      return {
        money:"",
        realname:"",
        usename:"",
        email:""

      }
    },
    methods: {},
    created() {
        this.money=JSON.parse(sessionStorage.getItem("im_money"));
        this.realname=sessionStorage.getItem("im_realname");
        this.usename=sessionStorage.getItem("im_username");
        this.email=sessionStorage.getItem("im_email");
    },
    components: {
      iHeader
    }
  }

</script>
<style>
  .info{
    margin-top:10px;
    background:#fff;
  }
  .info div{
    height:2.1rem;
    line-height:2.1rem;
    margin-left:20px;
    font-size:16px;
    color:#B8B8B8;
    border-bottom:1px solid #F5F5F5;
  }
  .info div span{
    display:inline-block;
  }
  .info div input{
    outline:none;
    border:1px solid #fff;
  }
  .btn1{
    margin:3rem auto;
    text-align: center;;
  }
  .btn1 button{
    width:9rem;
    height:1.8rem;
    line-height:1.8rem;
    border-radius:5px;
    background:#166ADE;
    color:#fff;
    font-size:0.7rem;
    border:1px solid #166ADE;
    outline: none;
  }
</style>
