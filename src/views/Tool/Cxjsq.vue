<template>
	<div class="wrapper">
		<div class="wrappermain">
			<div class="cx">
				<span class="title">车型选择</span>
				<checker v-model="fintype" radio-required selected-item-class="active" disabled-item-class="oldtype" class="cartype">
					<checker-item class="cartype-item" :value="item" v-for="(item, index) in xx" :key="index" @on-item-click="getcx">{{item.value}}</checker-item>
				</checker>
			</div>
			<div class="amount">
				<span class="title">分期总金额</span>
				<input id="cxje" type="text" v-model="cxinfo" placeholder="请输入分期总金额（元）" />
			</div>
			<div class="procedures">
				<span class="title">分期手续费费率</span>
				<checker v-model="sxinfo" radio-required selected-item-class="active" class="stage-procedures">
					<checker-item class="cartype-item" :value="item" v-for="(item, index) in rate" :key="index" @on-item-click="getsx"><span>{{item.stages}}期</span><span>{{item.proportion}}手续费</span></checker-item>
				</checker>
			</div>
			<span class="attention">提示：计量单位以元为单位，四舍五入至小数点后两位</span>
			<div class="count">
				<button id="cxjs" @click.prevent="eval">开始计算</button>
			</div>
			<div class="result">
				<p>
					<span>月还款本息：</span><span>{{prial}}</span>
				</p>
				<p>
					<span>月均手续费：</span><span>{{produ}}</span>
				</p>
				<p>
					<span>手续费总额：</span><span>{{allprodu}}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Group, Cell, CellBox, ColorPicker, Radio, Checker, CheckerItem } from 'vux'
	import { mapActions, mapGetters } from 'vuex'

	var cxje;
	export default {
		name: 'cxjsq',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '车险分期计算器',
				cxinfo: cxje,
				sxinfo: {
					stages: 3,
					procedures: 0.06,
					proportion:"6%"
				},
				xx: [{
					key: 1,
					value: "小型汽车",
					state: [{
						stages: 3,
						procedures: 0.06,
						proportion:"6%"
					}, {
						stages: 6,
						procedures: 0.10,
						proportion:"10%"
					}, {
						stages: 10,
						procedures: 0.15,
						proportion:"15%"
					}]
				}, {
					key: 2,
					value: "货车",
					state: [{
						stages: 3,
						procedures: 0.04,
						proportion:"4%"
					}, {
						stages: 6,
						procedures: 0.06,
						proportion:"6%"
					}, {
						stages: 10,
						procedures: 0.1,
						proportion:"10%"
					}]
				}],
				fintype: {
					key: 1,
					value: "小型汽车",
					state: [{
						stages: 3,
						procedures: 0.06,
						proportion:"6%"
					}, {
						stages: 6,
						procedures: 0.10,
						proportion:"10%"
					}, {
						stages: 10,
						procedures: 0.15,
						proportion:"15%"
					}]
				},
				rate: [{
					stages: 3,
					procedures: 0.06,
					proportion:"6%"
				}, {
					stages: 6,
					procedures: 0.10,
					proportion:"10%"
				}, {
					stages: 10,
					procedures: 0.15,
					proportion:"15%"
				}],
				finprocedures: {
					stages: 3,
					procedures: 0.04,
					proportion:"4%"
				},
				produ: 0,
				allprodu: 0,
				prial: 0,

			}

		},
		methods: {
			...mapActions(['action']),
			eval() {
				if(this.cxinfo) {
					this.allprodu = (this.cxinfo * this.sxinfo.procedures).toFixed(2);
					this.produ = (this.allprodu / this.sxinfo.stages).toFixed(2);
					this.prial = (this.cxinfo / this.sxinfo.stages + parseFloat(this.produ)).toFixed(2);
				}

			},
			getcx(itemValue, itemDisabled) {
				this.rate = itemValue.state;
				this.sxinfo = this.rate[0];
			},
			getsx(itemValue, itemDisabled) {
				this.sxinfo = itemValue;
				console.log(this.sxinfo)
			},
			toPoint(data) {
				var strData = parseFloat(data) * 100;
				var ret = strData.toString() + "%";
				return ret;
			}

		},
		components: {
			Checker,
			CheckerItem,
			ColorPicker,
			Group,
			Cell,
			CellBox,
			XHeader,
			Actionsheet,
			ButtonTab,
			ButtonTabItem,
			Radio,
			Checker,
			CheckerItem
		},
	}
</script>

<style scoped lang="less">
	.active {
		box-sizing: border-box;
		float: left;
		border-radius: 5px;
	/*	border: 2px solid #f3981e;*/
		color: #f3981e;
		padding: 0 5px;
		border-color: #f3981e;
	}
	
	.oldtype {
		float: left;
		border-radius: 5px;
		box-sizing: border-box;
		border: 2px solid #c3c3c3;
		color: #c3c3c3;
		line-height: 35px;
		margin-right: 5%;
		padding: 0 5px;
	}
	/** {
		margin: 0;
		padding: 0;
	}*/
	
	a {
		color: #000000;
		text-decoration: none;
	}
	
	.wrapper {
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
		font-size: 14px;
		font-family: "微软雅黑";
		background: #f7f6f5;
		.header {
			width: 100%;
			min-width: 320px;
			max-width: 640px;
			position: fixed;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			background: #ff7200;
			overflow: hidden;
			text-align: center;
			z-index: 1000;
			padding: 0;
			&/deep/ .vux-header-left {
				.left-arrow {
					&:before {
						content: '';
						border-color: white;
					}
				}
			}
		}
		.wrappermain {
			margin-top: 40px;
			padding: 10px 5%;
			div {
				line-height: 50px;
				.title {
					width: 35%;
					float: left;
					font-size: 16px;
				}
			}
			.cx {
				overflow: hidden;
				line-height: 35px;
				padding: 10px 0;
				.cartype {
					float: left;
					font-size: 16px;
					line-height: 35px;
					overflow: hidden;
					width: 60%;
					color: #c3c3c3;
					/*&/deep/ .active {
						float: left;
						border-radius: 5px;
						border: 2px solid #f3981e;
						margin-right: 5%;
						padding: 0 5px;
					}*/
					.cartype-item {
						float: left;
						border-radius: 5px;
						box-sizing: border-box;
						margin-right: 5%;
						padding: 0 5px;
						border: 2px solid #c3c3c3;
					}
				}
			}
			.amount {
				input {
					border: none;
					line-height: 35px;
					font-size: 16px;
					padding: 0 3px;
				}
				input:focus {
					outline: none;
				}
			}
			.procedures {
				border-bottom: 1px solid black;
				overflow: hidden;
				.title {
					width: 100%;
					display: block;
				}
				.stage-procedures {
					display: flex;
					justify-content: space-around;
					padding-bottom: 20px;
					width: 100%;
					color: #c3c3c3;
					.cartype-item {
						float: left;
						width: 30%;
						border-radius: 5px;
						box-sizing: border-box;
						border: 2px solid #c3c3c3;
						/*height: 35px;
						margin: auto 0;*/
						line-height: 25px;
						
						padding: 0 5px;
						span {
							display: block;
							text-align: center;
						}
					}
				}
			}
			.attention {
				font-size: 12px;
				color: #a5a5a5;
				line-height: 35px;
			}
			.count {
				overflow: hidden;
				padding: 20px 0;
				button {
					float: right;
					background: #fe7f19;
					width: 45%;
					line-height: 45px;
					font-size: 20px;
					color: white;
					border: none;
				}
			}
			.result {
				background: white;
				box-sizing: border-box;
				padding: 10px 5%;
				p {
					font-size: 16px;
					span:nth-of-type(2) {
						color: #fe7f19;
					}
				}
			}
		}
	}
</style>