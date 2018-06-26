<template>
	<div class="wrapper">
		<div class="wrapperMain">
			<div class="collect animated flipInY">
				<span>可提现的佣金（元）</span>
				<div>
					<span>￥{{now}}</span>
					<router-link to="tx" class="tx">立即提现</router-link>
				</div>
			</div>
			<group gutter="0" class="menu animated fadeInUp">
				<cell title="历史累计佣金" :value="'￥'+all" is-link :link="'lsyj?history='+now" class="submenu"></cell>
				<cell-box is-link link="wdyhk" class="submenu">
					<span>我的银行卡</span>
				</cell-box>
				<cell-box is-link link="yjjl" class="submenu">
					<span>佣金记录</span>
				</cell-box>
			</group>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Group, Cell, CellBox } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'wdewm',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg:'我的佣金',
				all:0.00,
				now:0.00
			}
		},
		methods: {
			...mapActions(['action']),
		},
		components: {
			Group,
			Cell,
			CellBox,
			XHeader,
		    Actionsheet,
		    ButtonTab,
		    ButtonTabItem
		},
		created() {
		    let e = this.airforce.login_post;
            this.action({
                method: "post",
				moduleName:'commission_post',
                url: "app/Commission/commission",
                isFormData: true,
                data: {
                    uid: e.data.uid,
                    token: e.data.token
                }
            }).then(res => {
                if(res.code != 200){
                    this.$vux.toast.text(res.message);
                    return;
				}
                this.all=res.data.money;
                this.now=res.data.commission;
            }).catch(err => {
                this.$vux.toast.text(err);
            })
		}
	}
</script>

<style scoped lang="less">
	@font-face {
		font-family: 'iconfont';
		/* project id 590408 */
		src: url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.eot');
		src: url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.woff') format('woff'), url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.ttf') format('truetype'), url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.svg#iconfont') format('svg');
	}
	
	.iconfont {
		font-family: "iconfont";
		font-size: 18px;
		font-style: normal;
	}
	
	.active {
		color: #ff7300;
	}
	
	ol,
	ul,
	li {
		list-style: none;
	}
	
	img {
		border: 0;
		vertical-align: middle;
	}
	
	body {
		color: #000000;
		background: #FFF;
		text-align: center;
	}
	
	.clear {
		clear: both;
		height: 1px;
		width: 100%;
		overflow: hidden;
		margin-top: -1px;
	}
	
	a {
		color: #000000;
		text-decoration: none;
	}
	.wrapper{
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
		font-size: 14px;
		font-family: "微软雅黑";
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
		.wrapperMain{
			margin-top: 40px;
			.collect{
				background:#fe7f19;
				color:white;
				box-sizing: border-box;
				padding:10px 20px;
				span{
					display: block;
					margin: 30px 0 10px 0;
				}
				div{
					/*margin-top: 30px;*/
					overflow: hidden;
					vertical-align: auto;
					position: relative;
					span{
						margin: 0;
						font-size: 30px;
						float: left;
					}
					.tx{
						float: right;
						display: block;
						color: white;
						font-size: 14px;
						border: 1px solid white;
						padding: 3px;
						border-radius: 8px;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
			.menu{
				.submenu{
					span{
						font-size: 16px;
					}
					font-size: 16px;
					&/deep/ .weui-cell__ft{
						font-size: 16px;
						color: #e53e1c;
						padding-right: 30px;
					}
				}
			}
		}
	}
</style>