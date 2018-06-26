<template>
	<div class="wrapper">
		<div action="" class="wrappermain">
			<form action="">
				<router-link to="xzzh" class="con-top">
					<div class="title">到账银行卡</div>
					<div>
						<span v-if="!yhkh" class="choose">
	 					请选择到账账户
	 					</span>
						<span v-if="yhkh">
	 						{{yhkxx.bank}}
	 					</span>
						<span class="yhkh" v-if="yhkh">（{{yhkxx.num}}）</span>
					</div>
				</router-link>
				<cell-box class="con-mid">
					<span>提现金额</span> ￥ <input type="number" name="" id="" value="" v-model="cash" />
				</cell-box>
				<cell-box class="con-bottom">
					佣金余额￥{{balance}}， <span @click="txall">全部提现</span>
				</cell-box>
				<button type="submit" @click.prevent="confirm">确认提现</button>
				<toast v-model="alt.show" type="text" :text="alt.val"></toast>
			</form>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Group, Cell, CellBox, Toast } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	var cash
	export default {
		name: 'wdewm',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '佣金提现',
				yhkh: false,
				yhkxx: {},
				balance: 0,
				cash: cash,
				alt: {
					show: false,
					val: ''
				}
			}
		},
		methods: {
			...mapActions(['action']),
			confirm() {
				let e = this.airforce.login_post
				this.action({
					method: 'post',
					url: 'app/Commission/cash',
					isFormData: true,
					data: {
						uid: e.data.uid,
						token: e.data.token,
						money: this.cash,
						cid: this.yhkxx.id
					}
				}).then(res => {
					if(res.code == 200) {
						this.alt.show = true
						this.alt.val = res.message
						setTimeout(function() {
							that.$router.push({
								path: '/app/HomeLayout/xgzl'
							})
						}, 2000)
					} else if(this.cash == undefined) {
						this.alt.show = true
						this.alt.val = '请输入提现金额'
					} else {
						this.alt.show = true
						this.alt.val = res.message
					}
				}).catch(d => {
					this.alt.show = true
					this.alt.val = d.message
				})
			},
			txall() {
				this.cash = parseFloat(this.balance)
			}
		},
		components: {
			Toast,
			Group,
			Cell,
			CellBox,
			XHeader,
			Actionsheet,
			ButtonTab,
			ButtonTabItem
		},
		created() {
			

			let e = this.airforce.login_post
			this.action({ // 获取到可提现的金额（佣金余额）
				method: 'post',
				url: 'app/Commission/commission',
				isFormData: true,
				data: {
					uid: e.data.uid,
					token: e.data.token
				}
			}).then(res => {
				this.balance = res.data.commission
			}).catch(error => {
				this.alt.show = true
				this.alt.val = e.message
			})
			
			if(this.$route.query.yhkid) {
				this.yhkh = true;
				this.yhkxx.id = this.$route.query.yhkid;
				this.yhkxx.num = this.$route.query.yhknum;
				this.yhkxx.bank = this.$route.query.bank;
			} else {
				this.action({ // 获取到默认的银行卡信息
					method: 'post',
					url: 'app/Commission/getDefault',
					isFormData: true,
					data: {
						uid: e.data.uid,
						token: e.data.token
					}
				}).then(res => {
					if(res.data) {
						this.yhkxx.bank = res.data.bank
						this.yhkxx.num = res.data.number
						this.yhkxx.id = res.data.id
						this.yhkh = true
					}
				}).catch(error => {
					this.alt.show = true
					this.alt.val = e.message
				})
			}
		}
	}
</script>

<style scoped lang="less">
	a {
		color: #000000;
		text-decoration: none;
	}
	
	.wrapper {
		font-size: 14px;
		font-family: "微软雅黑";
		.wrappermain {
			margin-top: 40px;
			box-sizing: border-box;
			padding: 20px;
			form {
				.con-top {
					display: block;
					padding: 15px;
					background: #f2f2f2;
					overflow: hidden;
					div {
						float: left;
						font-size: 16px;
						span {
							display: block;
						}
					}
					div:nth-of-type(2) {
						font-size: 14px;
						box-sizing: border-box;
						margin-left: 2%;
						box-sizing: none;
						span:nth-of-type(1) {
							width: 100%;
							line-height: 25px;
							color: #258ecb;
							box-sizing: border-box;
							margin-left: 10%;
						}
					}
					/*.title{
						display: block;
						font-size: 16px;
						span{
							display: inline-block;
							width: 50%;
							text-align: center;
							color: #44c2dd;
						}
					}

					.yhkh{
						color: #b2b2b2;
						padding-left: 30%;
					}*/
				}
				.con-mid {
					padding: 15px;
					font-size: 24px;
					display: block;
					background: white;
					span {
						display: block;
						font-size: 16px;
					}
					input {
						height: 50px;
						line-height: 50px;
						font-size: 24px;
						width: 60%;
						border: none;
					}
					input:focus {
						outline: none;
					}
				}
				.con-bottom {
					color: #b2b2b2;
					span {
						color: #258ecb;
					}
				}
				button {
					display: block;
					width: 80%;
					margin: 0 auto;
					border: none;
					border-radius: 8px;
					background: #fe7f19;
					line-height: 30px;
					text-align: center;
					color: white;
					/*		background: #f8f8f8;*/
					font-size: 17px;
					line-height: 40px;
					margin-top: 30px;
				}
			}
		}
	}
</style>