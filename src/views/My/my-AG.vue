<template>
<div class="box">
  <i-header title="真人视讯"></i-header>
  	<div style="height:26.7rem;position: relative;overflow: hidden;">
		<iframe ref="paysan" :src="agUrl" height="100%" width="100%"></iframe>
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
	 			agUrl:""
    }

  },
  methods:{


//	this.$router.push('/zf')
  },

  created() {
  	this.agUrl=sessionStorage.getItem('agUrl');
//	console.log(this.payUrl);
// 	this.$refs.paysan.setAttribute("src",this.payUrl);
  }
}
</script>


<style  lang='less' ref="stylesheet/less" scoped>

</style>
