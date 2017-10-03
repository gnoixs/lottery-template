<template>
	<!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
	<div>
		<div ref="headerHeight">
			<i-header title="客服中心"></i-header>
		</div>
		<div>
			<div :style="{'height':kefuHeight}" style="position: relative;overflow: hidden;">
				<iframe ref="kefu" src="" style="margin-top: -1.8rem;" height="109%" width="100%"></iframe>
			</div>
			<!--<p style="margin: 5%;line-height: 1rem;text-align: justify;">{{annousments[routeZindex]}}</p>-->
		</div>
	</div>
</template>
<script>
	import iHeader from '../../components/i-header'
	export default {
		components: {
			iHeader
		},
		data: function() {
			return {
				kufuUrl: '',
				kefuHeight: ''
			}
		},
		created() {
			this.$http.post(`${getUrl()}/user/getCustomerService`, "").then(res => {
				console.log(res.data.kefu);
				this.kefuUrl = res.data.kefu;
				this.$refs.kefu.src = this.kefuUrl

			})
		},
		mounted() {
			this.kefuHeight = window.document.documentElement.clientHeight - this.$refs.headerHeight.offsetHeight+'px';
			console.log(window.document.documentElement.clientHeight)
			console.log(this.$refs.headerHeight.offsetHeight)
			console.log(this.kefuHeight);
		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	/*.noticeCenter{
	width:90%;
	margin:0 auto;
	padding-top:30/46.875rem;
	padding-bottom:15/46.875rem;
	border-bottom: 1px solid #e5e5e5;
	>span{
		color: #b6b6b6;
	}
	>i{
		background-color: #ef9836;
		color: #FFFFFF;
		border-radius:0.1rem;
		width: 70/46.875rem;
		height: 35/46.875rem;
		font-size: 12px;
		display: inline-block;
		text-align: center;
		margin-left: 15/46.875rem;
	}
	>H3{
		margin: 0;
		margin-top: 0.2rem;
	}
}*/
	
	iframe {
		/*position: absolute;
		left: 0;
		top: -47px;
		height: 28.6rem;
		border: none;*/
	/*	margin-top: -rem;*/
	}
</style>