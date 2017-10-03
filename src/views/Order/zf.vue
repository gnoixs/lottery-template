<template>
<div class="box">
  <i-header title="在线支付"></i-header>

  <!--<div class="title">
    <span class="fffhui" @click='hui'></span>
    <h3>{{titleH}}</h3>
  </div>-->
  	<div style="height:26.7rem;position: relative;overflow: hidden;">
  			<iframe ref="paysan" :src="payUrl" height="100%" width="100%"></iframe>
		</div>
</div>
</template>
<script>
//import {
//  getOid,
//  getUrl
//} from '../../api'
import iHeader from '../../components/j-header'

export default {
  components: {
    iHeader
  },
  data() {
    return {
	 			payUrl:""
    }

  },
  methods:{


//	this.$router.push('/zf')
  },

  created() {
  	this.payUrl=sessionStorage.getItem('payUrl');
//	console.log(this.payUrl);
// 	this.$refs.paysan.setAttribute("src",this.payUrl);
  }
}
</script>


<style  lang='less' ref="stylesheet/less" scoped>

</style>
