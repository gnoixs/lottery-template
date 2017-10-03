<template>
  <div class="container" id="contain">

    <div class="title">
      <i @click="goBack()"></i> 敢绑就敢送
    </div>
    <div class="content">
      <div class="time">2017-09-16</div>
      <h2 class="ctitle">绑定手机送18</h2>
      <div>
        <img src="../../assets/images/b3.jpg" width="100%" height="auto"/>
      </div>

      <div style="margin-bottom: 20px">
        <h4>活动说明</h4>
        <p>1.在平台各个绑定手机页面绑定手机号均可获赠18彩金，绑定成功自动赠送到账。</p> <br/>
        <p>2.同一会员账号、手机号只能领取一次，更换或重复绑定无法重复领取本优惠。</p><br/>
        <p>3.【光大彩票】保留随时更改及取消优惠权利。最终解释权归【光大彩票】所有。</p><br/>
        <p>4.<span style="color: red; font-weight: bold;">即将上线,敬请期待。</span></p><br/>
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
