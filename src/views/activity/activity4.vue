<template>
  <div class="container" id="contain">

    <div class="title">
      <i @click="goBack()"></i> 礼惠国庆情满中秋
    </div>
    <div class="content">
      <div class="time">2017-09-16</div>
      <h2 class="ctitle">庆国庆，迎中秋，双节好礼送不停<br/>
        光大彩票GDCP99.com与你同欢乐，共分享！</h2>
      <div>
        <img src="../../assets/images/b1.jpg" width="100%" height="auto"/>
      </div>

      <div>
        <h4>活动时间:</h4>
        <p>10月1 日至10月9日！当日流水次日可领取！</p>
        <p>（例：10月1日打的流水，10月2日才可领取。）</p>
        <h4>活动要求:</h4>
        <p>打码量：1000  送金额 8元</p>
        <p> 打码量：10,000  送金额 38元</p>
        <p>打码量：100,000  送金额 128元</p>
        <p>打码量：500,000  送金额 388元</p>
        <p>打码量：1,000,000  送金额 888元</p>
        <p>打码量：3,000,000  送金额 1688元</p>
        <p>打码量：5,000,000  送金额 3888元</p>
        <p>打码量：10,000,000  送金额 10888元</p>
        <p>打码量：30,000,000  送金额 38888元</p>
        <p>打码量：100,000,000  送金额 88888元</p>
      </div>

      <div style="margin-bottom: 20px">
        <h4>活动规则</h4>
        <p>1.本次优惠活动2017年10月1号起，优惠活动适用于光大彩票网全体会员。</p> <br/>
        <p>2.所有会员只能拥有一个账号申请该优惠，同一个IP，同一提款卡视为同一客户。（如果发现同一IP，同一提提款卡，重复领取立即冻结该帐号。）</p><br/>
        <p>3.任何滥用优惠，下注套利，非法程序下注的行为，经查实后将取消优惠以及优惠产生的赢利。</p><br/>
        <p>4.游戏过程中，出现对冲或对打投注，将取消优惠以及优惠产生的赢利。（例如在北京赛车同局投注大/小。）</p><br/>
        <p>5.光大彩票网保留所有权利在任何时候可以更改，停止，取消优惠活动并不会做出任何书面解释。</p><br/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activity1',
    mounted(){
      let _w = window.innerWidth;
      let _zoom = _w / 750;
      let ctn = document.getElementById('contain');
      ctn.style.transform ='scale('+ _zoom +')';
      ctn.style.transformOrigin ='0 0 0'
    },
    data(){
      return {}
    },
    methods: {
      goBack(){
        history.go(-1);
      }
    }
  }
</script>

<style scoped type="text/less">
  .container {
    padding: 0;
    width: 750px;
  }

  .title {
    width: 100%;
    height: 90px;
    background: #146cdc;
    display: inline-block;
    line-height: 90px;
    text-align: center;
    font-size: 36px;
    color: #ffffff;
    position: fixed;
  }

  .title i {
    display: inline-block;
    width: 90px;
    height: 90px;
    background: url(../../../static/images/backing_out.png) no-repeat center center;
    position: absolute;
    left: 0;
    top: 0;
  }
  .content p{
    font-size: 28px;
  }
  .content{
    width: 100%;
    padding: 0 20px;
    margin-top:110px;
  }
  .content h2{
    font-size: 32px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    margin-top: 0;
  }
  .content h4 {
    font-size: 30px;
    margin: 20px 0;
  }

  .time{
    font-size: 24px;
    color: #999;
  }
  p {
    font-size: 14px;
  }
</style>
