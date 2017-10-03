<template>
	<!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
	<div>
		<i-header title="下注记录"></i-header>
		<div class="content">
			<div @click='quanbu' :class="{active:isShow}">汇总</div>
			<div @click='weijie' :class="{active:isShow1}">未结 <i v-if="numb>0">{{numb}}</i></div>
			<div @click='yijie(0)' :class="{active:isShow2}">已结</div>
		</div>
		<div class="list3" v-show='isShow4' @click='weijie' v-if="numb>0">
			<div>
				<div>
					<span>{{str}}</span>
					<span class="more" style="background: url(../../../static/images/more003.png) no-repeat;background-size: 100% 100%;"></span>
				</div>
				<div>
					<span>
            <i>投注单数</i>
            <i>{{numb}}</i>
        </span>
					<span>
            <i style="margin-left: 0.4rem;">下注金额</i>
            <i>{{moneyb}}</i>
        </span>
				</div>
				<div>
					<span>
				  <i>可赢金额</i>
				  <i>{{moneyf}}</i>
			  </span>
					<span>
              <i style="margin-left: 0.4rem;">预计退水：</i>
              <i>{{yjts}}</i>
          </span>
				</div>
				<div>
					<span>
              <i>总计：</i>
              <i style="color:red">未结</i>
          </span>
				</div>
			</div>

		</div>
		<div class="list3" v-for="(item,i) in histroy" v-show='isShow4' @click='yijie(i)'>
			<div>
				<div style="background-color:#373737">
					<span>{{item.betTime}}</span>
					<span class="more"  v-if="i===0"></span>
				</div>
				<div>
					<span>
                <i>投注单数</i>
                <i>{{item.allNum}}</i>
            </span>
					<span>
                <i style="margin-left: 0.4rem;">下注金额</i>
                <i style="margin-left: 0.4rem;">{{item.allMoney}}</i>
            </span>
				</div>
				<div>
					<span>
              <i>可赢金额</i>
              <i>{{item.allWin}}</i>
          </span>
					<span style="color:#ff8e00">
               <i style="margin-left: 0.4rem;">退水</i>
              <i style="margin-left: 0.4rem;">{{item.allCut}}</i>
          </span>
				</div>
				<div>
					<span>
            <i>总计：</i>
            <i style="color:#446fd4;">{{item.allTrueWin}}</i>
        </span>

				</div>
			</div>

		</div>
		<div class="zhudan" v-show='isShow3' v-for="groups in finished">
			<div>
				<span>注单号：{{groups.no}}</span>
				<span class="">未结</span>
			</div>
			<ul>
				<li class="clearfix">
					<span>{{groups.game_name}}</span>
					<span>第{{groups.round}}期</span>
				</li>
				<li class="clearfix">
					<span>游戏玩法</span>
					<span>{{groups.detail}}</span>
				</li>
				<li class="clearfix">
					<span>下注时间</span>
					<span>{{groups.time}}</span>
				</li>
				<li class="clearfix">
					<span>下注金额</span>
					<span>{{groups.money}}</span>
				</li>
				<li class="gexian"></li>
				<li class="clearfix">
					<span>可赢金额</span>
					<span>{{groups.win_money}}</span>
				</li>
			</ul>
		</div>
		<div class="zhudan zhudan22" v-show='isShow5' v-for="groups in finished11">
			<div>
				<span>注单号：{{groups.no}}</span>
				<span class="">已结</span>
			</div>
			<ul>
				<li class="clearfix">
					<span>{{groups.game_name}}</span>
					<span>第{{groups.round}}期</span>
				</li>
				<li class="clearfix">
					<span>游戏玩法</span>
					<span>{{groups.detail}}</span>
				</li>
				<li class="clearfix">
					<span>下注时间</span>
					<span>{{groups.time}}</span>
				</li>
				<li class="clearfix">
					<span>下注金额</span>
					<span>{{groups.money}}</span>
				</li>
				<li class="gexian"></li>
				<li class="clearfix">
					<span>输赢结果</span>
					<span style="color:#446fd4;">{{groups.win_money}}</span>
				</li>
				<li class="clearfix">
					<span>下注退水</span>
					<span>0.00</span>
				</li>
				<!--<li class="clearfix">
					<span>最后金额</span>
					<span style="color:#446fd4;">0.00</span>
				</li>-->
			</ul>
		</div>
		
		<div v-show="isHao">
      <div class="modal_box_feedback">
         <div class="modal_div">
        		<div class="modal_header color1">
        			<span>通知</span>
        			<i></i>
        		</div>
        		<div class="modal_foot">
        			<div ref="rscenter"></div>
        			<p>{{title}}</p>
        		</div>	
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	import iHeader from '../../components/i-header'
	export default {

		data() {
			return {
				moneyb: null,
				moneyf: null,

				str: "",
				datas: ['未结', '已结'],
				isCheck: false,
				histroy: [],
				isShow: false,
				isShow1: false,
				isShow2: false,
				isShow3: false,
				isShow4: false,
				isShow5: false,
				finished: [],
				finished11: [],
				numb: '',
				isHao:false,
				title:'',
				isWan:'',
				yjts:''
			}
		},
		props: {
			zMoney: {
				type: Number
			}
		},
		methods: {
			weijie() {
				
				let prams = {};
				let oidinfo = getOid();
				prams.oid = oidinfo;
				this.$http.post(`${getUrl()}/getinfo/bet`, JSON.stringify(prams)).then(res => {
				
					if(res.data.msg == 4001) {
//						window.location.href = sessionStorage.getItem("im_sportsurl");
							sessionStorage.clear();
							this.isHao = true;
	          	this.title = "您的账户已失效，请重新登录";
	            setTimeout(() => {
		          	this.isHao = false;
		          	this.$router.push({
		            	path: '/login'
		          	})
		          },1000)
					}
					this.finished = res.data[0].res;
					this.moneyf = Number(res.data[0].allBet.win_money);
					this.moneyb = Number(res.data[0].allBet.all_money);
					this.numb = Number(res.data[0].allBet.unSettlement);
				})
				this.isShow3 = true;
				this.isShow1 = true;
				this.isShow = false;
				this.isShow2 = false;
				this.isShow4 = false;
				this.isShow5 = false;
				// this.num=this.finished
			},

			quanbu() {
				let params = {}
				params.oid = getOid()
				this.$http.post(`${getUrl()}/getinfo/getBettingHistory`, JSON.stringify(params)).then(res => {
					if(res.data.msg == 4001) {
						sessionStorage.clear();
						this.isHao = true;
          	this.title = "您的账户已失效，请重新登录";
            setTimeout(() => {
	          	this.isHao = false;
	          	this.$router.push({
	            	path: '/login'
	          	})
	          },1000)
					} else {
						this.histroy = res.data.two_week_history
					}
					console.log(this.histroy)
				})
				this.isShow2 = false;
				this.isShow = true;
				this.isShow3 = false;
				this.isShow4 = true;
				this.isShow1 = false;
				this.isShow5 = false;
			},
			yijie(i){
				if(i==0){
					let prams = {};
					let oidinfo = getOid();
					prams.oid = oidinfo;
					this.$http.post(`${getUrl()}/getinfo/het`, JSON.stringify(prams)).then(res => {
						if(res.data.msg == 4001) {
						sessionStorage.clear();
						this.isHao = true;
			          	this.title = "您的账户已失效，请重新登录";
			            setTimeout(() => {
				          	this.isHao = false;
				          	this.$router.push({
				            	path: '/login'
				          	})
				          },1000)
						}
						this.finished11 = res.data[0].res

					})
					this.isShow = false;
					this.isShow2 = true;
					this.isShow4 = false;
					this.isShow1 = false;
					this.isShow3 = false;
					this.isShow5 = true;
				 
			}else{
				return
			}
				}
		},
		created() {

			let d = new Date();
			this.str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
			this.weijie();
			this.isShow3 = false;
			this.isShow1 = false;
			this.isShow = true;
			this.isShow4 = true;
			let params = {}
			params.oid = getOid()
			this.$http.post(`${getUrl()}/getinfo/getBettingHistory`, JSON.stringify(params)).then(res => {
				if(res.data.msg == 4001) {
					sessionStorage.clear();
						this.isHao = true;
          	this.title = "您的账户已失效，请重新登录";
            setTimeout(() => {
	          	this.isHao = false;
	          	this.$router.push({
	            	path: '/login'
	          	})
	          },1000)
				} else {
					this.histroy = res.data.two_week_history
				}
				console.log(this.histroy)
			})
			
			this.$http.post(`${getUrl()}/getinfo/getSummaryBet`, JSON.stringify(params)).then(res => {
				
					this.moneyf = Number(res.data.summary.unSettlement[0].allWinMoney);
					this.moneyb = Number(res.data.summary.unSettlement[0].allMoney);
					
					//this.isWan=sessionStorage.getItem('im_username')
					
					this.numb = Number(res.data.summary.unSettlement[0].allNum);
					
					
					this.yjts = Number(res.data.summary.unSettlement[0].allCut);
//					console.log(Number(res.data.summary.unSettlement[0].allcut))
			})

		},
		components: {
			iHeader
		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.content {
		border-bottom: 1px solid #cccccc;
		height: 90/40rem;
		background: #fff;
		margin-bottom: 20/40rem;
		>div {
			float: left;
			line-height: 86/40rem;
			width: 100/40rem;
			text-align: center;
			font-size: 32/40rem;
			color: #7c7c7c;
		}
		>div:nth-child(2) {
			position: relative;
			>i {
				position: absolute;
				// top: -0.2rem;
				font-size: 16/40rem;
				width: 30/40rem;
				height: 30/40rem;
				line-height: 30/40rem;
				background: red;
				color: #fff;
				border-radius: 50%;
			}
		}
		.active {
			color: #393939;
			border-bottom: 2px solid #146cdc;
		}
	}
	
	.list3 {
		margin-bottom: 0.5rem;
		>div {
			>div {
				height: 60/40rem;
				padding: 0 20/40rem;
				line-height: 60/40rem;
				background: #fff;
				border-bottom: 1px solid #E3E3E3;
				>span {
					float: left;
					width: 50%;
					>i:nth-child(1) {
						color: #989898;
					}
					>i:nth-child(2) {
						color: #363636;
					}
				}
				>span:nth-child(1) {
					float: left;
					width: 50%;
					border-right: 1px solid #E3E3E3;
					>i:nth-child(1) {
						color: #989898;
					}
					>i:nth-child(2) {
						color: #363636;
					}
				}
				>span:nth-child(2) {
					float: right;
				}
			}
			>div:nth-child(1) {
				width: 100%;
				background: #ff9201;
				>span:nth-child(1) {
					color: #fff;
					border: none;
				}
				>span:nth-child(2) {
					width: 40/40rem;
					height: 40/40rem;
					background: url('../../../static/images/more002.png') no-repeat;
					background-size: 100% 100%;
					float: right;
					margin-top: 10/40rem;
				}
			}
		}
	}
	
	.clearfix:after {
		display: block;
		content: '';
		clear: both;
	}
	
	.zhudan {
		>div {
			width: 100%;
			background: #ff9201;
			height: 60/40rem;
			padding: 0 20/40rem;
			line-height: 60/40rem;
			margin-top: 20/40rem;
			>span:nth-child(1) {
				color: #fff;
			}
			>span:nth-child(2) {
				background-size: 100% 100%;
				float: right;
				color: #fff;
				// margin-top:12/40rem;
			}
		}
		>ul {
			padding: 0 20/40rem;
			background: #fff;
			color: #666;
			li {
				// height: 60/40rem;
				line-height: 60/40rem;
				>span {
					float: left;
				}
				>span:nth-child(1) {
					width: 25%;
				}
				>span:nth-child(2) {
					text-align: right;
					width: 75%;
					float: right;
				}
			}
			>.gexian {
				height: 1px;
				width: 109%;
				background-color: #C0C0C0;
				/* padding: 0; */
				margin-left: -5%;
			}
		}
	}
	
	.zhudan22 {
		>div {
			background: #373737;
		}
	}
</style>