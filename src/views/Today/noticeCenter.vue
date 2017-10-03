<template>
  <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
  <div>
  	<div>
    	<i-header title="公告中心"></i-header>
  	</div>
  	<div style="margin-top: 0.4rem;">
  		<div class="noticeCenter" v-for="(item,index) in annousments" @click="gotoAddress(index)" >
  			<span>{{getLocalTime(item.time)}}</span><i v-if="index==0">NEW</i>
  			<p>{{item.content.slice(0,35)}}</p>
  		</div>
  		</div>
  </div>
</template>
<script>
  import iHeader from '../../components/i-header'
  export default {
  	 data: function(){
    		return{

					annousments:'',
					annousmenttime:'',
					
    		}
    },
    components:{
      iHeader
    },
		created(){
	  	 this.$http.post(`${getUrl()}/user/getIndexContent`).then(res => {
	   				this.annousments = res.data.announcements
	   				let announcement = res.data.announcements
	   				console.log(announcement);
	   				sessionStorage.setItem('an_announcements', JSON.stringify(announcement))
	   				console.log(this.annousments);
						
	   		})
		},
		methods:{
			gotoAddress(path){
				let i = `/noticedetails:${path}`;
        this.$router.push(i)
			},
			
      //过滤分秒
     getLocalTime(nS) {
		     let time=new Date(parseInt(nS) * 1000)
		     let year=time.getFullYear();
		     let month=time.getMonth()+1;
		     let date=time.getDate();
		     let time_split=time.toLocaleTimeString().split(":")
		     let time_a=`${time_split[0]}:${time_split[1]}`
		      return `${year}-${month}-${date}`
		},
		}
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
.noticeCenter{
	/*height: 175/46.875rem;*/
	width: 93.5%;
	margin:0 auto;
	padding-top:15/46.875rem;
	padding-bottom:25/46.875rem;
	border-bottom: 1px solid #e5e5e5;
	>span{
		color: #b6b6b6;
		font-size: 13px;
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
		margin-left: 10/46.875rem;
		
	}
	>p{
		width: 100%;
		
		}
}
</style>
