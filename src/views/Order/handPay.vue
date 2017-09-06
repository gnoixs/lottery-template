<template>
  <div class="" style="height:100%">
    <i-header title="资金管理"></i-header>

    <div class="title">
      <span class="fffhui" @click='hui'></span>
      <h3>线下充值</h3>
    </div>
    <div class="list_1">
      <span>收款人</span>
      <span>{{resDate.bank_user}}</span>
    </div>
    <div class="list_1" style="border-bottom:none;">
      <span>{{(resDate.id==70)?'账号':"账号"}}</span>
      <span>{{resDate.bank_account}}</span>
    </div>

    <div class="m11">
      <div class="yhk">
        <div v-for="(k,j) in resDateS" v-bind:class="{active:active_pay==j}"  v-if="k.length!=0" @click="changeUrl(k,j)">
          <button type="button" name="button">
            <img :src="`../../../static/images/${j}.png`"/>
          </button>
        </div>
      </div>

      <div style="margin-top:1rem;">
        <div class="hand_pay_from">
          <div class="ewm1" v-if = "resDate.bank_image_url">
            <span>扫描右侧二维码</span>
            <img :src="resDate.bank_image_url" alt="">
          </div>
          <div class="m1">
            <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
            <input type="" name="" placeholder="请输入中文账户姓名" v-model="payUer"/>
          </div>
          <div class="m1">
            <span>金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额:</span>
            <input type="" name="" placeholder="请输入充值金额" v-model="payMoney" onkeyup="this.value=this.value.replace(/\D/g,'')" >
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

    <button type="button" class="btn1 color1" name="button" @click="subMit">确认存款</button>
    <div v-show="isHao">
      <div class="modal_box_feedback_login">
        <div>{{title}}</div>
      </div>
    </div>

  </div>
</template>
<script>
  import iHeader from '../../components/j-header'
 /* import {
    getOid,
    getUrl
  } from '../../api'*/
  export default {
    components: {
      iHeader
    },
    data() {
      return {
        a:{},
        b:{},
        c:{},
        d:{},
        resDateS: {},
        resDate: {},
        bankName: "",
        amoutF: "",
        payUer: "",
        payRea:"",
        payMoney: "",
        timeDay: "",
        paykind: "银行",
        isHao: false,
        title: "",
        active_pay:"bankpay_array"
      }
    },
    beforeCreate() {
      let params = {};
      let userOid = getOid();
      params.oid = userOid;
      console.log(params);
      this.$http.post(`${getUrl()}/user/payin`, JSON.stringify(params)).then(res => {
        // console.log(timeStamp);
        if (res.data.msg == "4001") {
          // let timeStamp = res.data.next.timestap;
          console.log("das"); //  1未登陆
          this.$router.push({
            path: '/login'
          }) // 跳转到登陆
        } else {
          this.a = res.data.bankpay_array[0];
          this.b = res.data.alipay_array[0];
          this.c = res.data.wechat_array[0];
          this.d = res.data.quickpay_array[0];
          this.resDate = res.data.bankpay_array[0];
          this.resDateS = res.data.linedown;
          console.log(res.data.linedown)
          for(var key in this.resDateS){
            if (this.resDateS[key].length>0) {
            }
          }
        }

      })
    },
    methods: {
      changeUrl(payType,j){
        this.resDate = payType[0];
        this.active_pay=j
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
        if (this.payMoney < 100) {
          this.title = "金额最少100元"
          this.isHao = true
          setTimeout(() => {
            this.isHao = false
          }, 1200)
        } else if (this.payMoney >= 100) {
          let realName = /^[\u4E00-\u9FA5]{2,}$/.test(this.payUer)

          let payMoney = /^[0-9]*[1-9][0-9]*$/.test(this.payMoney)

          let amoutF = /[a-zA-Z0-9]{4}/.test(this.amoutF)
          let amouRea = this.payRea;
          console.log(amoutF, 1111)
          if (realName && payMoney && amoutF) {
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
            params.way = this.paykind;
            this.$http.post(`${getUrl()}/user/offline_pay`, JSON.stringify(params)).then(res => {
              // console.log(timeStamp);
              if (res.data.msg == "4001") {
                // let timeStamp = res.data.next.timestap;
                console.log("das"); //  1未登陆
                this.$router.push({
                  path: '/login'
                }) // 跳转到登陆
              } else {
                //xiaosi

                if (res.data.msg == 5007) {
                  this.title = "正在审核"
                  this.isHao = true
                  setTimeout(() => {
                    this.isHao = false
                  }, 1200)
                } else if (res.data.msg == 2006) {
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

                  this.$router.push({
                    path: '/确实'
                  }) // 跳转到登陆

                }
                console.log(res.data);
              }
            })
          } else {
            this.title = "提交信息不符合规范"
            this.isHao = true
            setTimeout(() => {
              this.isHao = false
            }, 1200);
          }
        }
      },
      hui() {
        this.$router.push({
          path: '/order'
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
      width:50/20rem;
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
    display:inherit;
    border-radius:5px;
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
