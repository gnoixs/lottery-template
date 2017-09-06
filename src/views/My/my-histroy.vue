<template>
  <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
  <div>
  	<div class="header">
    	<i-header title="下注历史"></i-header>
  	</div>
  	<div class="midd" style="margin-top: 2.05rem">

  		<div v-for="item in histroy" class="cen3">

  			<p class="my_1">{{item.betTime}}</p>

  			<div >
  				<div>
  					<p>注单数：<span>{{item.allNum}}</span></p>
  					<p>下注金额：<span>{{item.allMoney}}</span></p>
  				</div>
  				<div>
  					<p>输赢：<span class="color_money">{{item.allWin}}</span></p>
  					<p>退水：<span>{{item.allCut}}</span></p>
  				</div>
  				<div style="border-bottom:1px solid #EBEBEB;"></div>
  				<div>
  					<p>退水后结果：<span>{{item.allTrueWin}}</span></p>
  				</div>
  			</div>
  		</div>

  	</div>
  </div>
</template>

<script>
  import iHeader from '../../components/i-header'

  /*import {getOid,getUrl} from '../../api'*/
  export default {

    data() {
      return {
          histroy:[]
      }
    },
    methods: {},
    created() {
        let params={}
        params.oid=getOid()
      this.$http.post(`${getUrl()}/getinfo/getBettingHistory`, JSON.stringify(params)).then(res => {
          if(res.data.msg==4001){
            this.$router.push({
              path: '/login'
            }) // 跳转到登陆
          }
          else {
            this.histroy=res.data.two_week_history
          }

      })
    },
    components: {
      iHeader
    }
  }
</script>


<style lang='less' rel="stylesheet/less">
	.midd{
		padding:15px;
    margin-top: 1/20rem;
	}
	.cen3{
		background:#fff;
		border-radius:5px;
		margin-bottom:10px;
    >div{
      color: #354255;
      >div:nth-of-type(1){
        display: flex;
        padding: 10/20rem 0;
        >p:nth-of-type(1){
          width: 45%;
        }
        >p:nth-of-type(2){
          display: flex;
        }
      }
      >div:nth-of-type(2){
        display: flex;
        padding-bottom: 10/20rem ;
        >p:nth-of-type(1){
          width: 45%;
        }
        >p:nth-of-type(2){
          display: flex;
        }
      }
      >div:nth-last-of-type(1){
        display: flex;
        padding: 6/20rem 0;

      }
    }
	}
	.cen3 > p{
		background:url(../../../static/images/blue.png) no-repeat;
		color:#fff;
		height:30/20rem;
		border-radius:5px 5px 0 0;
		padding:6/20rem;
		overflow:hidden;
	}

	.cen3 > div{
		margin-left:15/20rem;
		margin-right:15/20rem;
	}

	.cen3 > div > div:nth-child(2)> p:first-child > span{
		color:#115FDD
	}
  .header{
    position: fixed;
    width: 100%;
    top: 0;
  }
</style>
