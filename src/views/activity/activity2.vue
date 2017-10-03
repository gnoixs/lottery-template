<template>
  <div class="container" id="contain">

    <div class="title">
      <i @click="goBack()"></i>签到送豪礼
    </div>
    <div class="content">
      <div class="time">2017-09-16</div>
      <h2 class="ctitle">连续签到送豪礼</h2>
      <div>
        <img src="../../assets/images/a2.jpg" width="100%" height="auto"/>
      </div>

      <div>
        <h4>签到活动</h4>
        <p>签到每天送2彩金</p>
        <p>连续签到&nbsp;&nbsp;7天 赠送20彩金</p>
        <p>连续签到14天 赠送30彩金</p>
        <p>连续签到21天 赠送50彩金</p>
        <p>连续签到30天 赠送88彩金</p>
      </div>

      <div style="margin-bottom: 20px">
        <h4>活动说明</h4>
        <p>1.活动仅限APP用户可参与。</p> <br/>
        <p>2.每日05:00重置可签到状态。</p><br/>
        <p>3.中断签到或连续签到满30天后将重置已连续签到天数，重新累计。</p><br/>
        <p>4.若存在任何形式套利，【阿理彩票】有权没收活动所得奖励并取消活动资格。</p><br/>
        <p>5.活动最终解释权归【阿理彩票】所有。</p><br/>
        <p>6.<span style="color: red; font-weight: bold;">即将上线,敬请期待。</span></p><br/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activity2',
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
