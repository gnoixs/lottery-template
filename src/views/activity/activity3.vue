<template>
  <div class="container" id="contain">

    <div class="title">
      <i @click="goBack()"></i> 每日投注赢大奖
    </div>
    <div class="content">
      <div class="time">2017-09-16</div>
      <h2 class="ctitle">每日投注赢大奖</h2>
      <div>
        <img src="../../assets/images/a1.jpg" width="100%" height="auto"/>
      </div>


      <div>
        <h4>活动形式</h4>
        <p>抽奖活动</p>
      </div>

      <div>
        <h4>奖品</h4>
        <p>2彩金</p>
        <p>8彩金</p>
        <p>38彩金</p>
        <p>88彩金</p>
        <p>188彩金</p>
        <p>588彩金</p>
        <p>Iphone 8</p>
        <p>抽到彩金奖项会自动派奖到会员账户</p>
      </div>


      <div style="margin-bottom: 20px">
        <h4>活动说明</h4>
        <p>1.活动仅限APP用户可参与。</p> <br/>
        <p>2.当天投注100流水以上可参与抽奖，每日一次，中奖几率100%。</p><br/>
        <p>3.每日凌晨5点重置本活动。</p><br/>
        <p>4.奖品iPhone 8 为64G版，颜色随机，奖品将在中奖后两周内送出。</p><br/>
        <p>5.以第三方程序或其他非法手段篡改活动参数，及其他任何形式套利，将没收活动所得奖励并取消活动资格。</p><br/>
        <p>6.活动最终解释权归【阿理彩票】所有。</p><br/>
        <p >7.<span style="color: red; font-weight: bold;">即将上线,敬请期待。</span></p><br/>
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
