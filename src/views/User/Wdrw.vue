<template>
	<div class="wrapper">
		<div class="wrapperMain">
			<img :src="bj" />
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'wdrw',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '详情',
				bj:require("@/assets/img/user/wdrw.png")
			}
		},
		methods: {
			...mapActions(['action']),
		},
		components: {
			XHeader,
			Actionsheet,
			ButtonTab,
			ButtonTabItem
		}
	}
</script>

<style scoped lang="less">
	@font-face {
		font-family: 'iconfont';
		/* project id 590408 */
		src: url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.eot');
		src: url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.woff') format('woff'), url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.ttf') format('truetype'), url('https://at.alicdn.com/t/font_590408_zasoa4yz6te53ik9.svg#iconfont') format('svg');
	}
	
	.iconfont {
		font-family: "iconfont";
		font-size: 18px;
		font-style: normal;
	}
	
	.active {
		color: #ff7300;
	}
	
	* {
		margin: 0;
		padding: 0;
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
	
	.wrapper {
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
			color: white;
			&/deep/ .vux-header-left {
				.left-arrow{
					&:before {
						content: '';
						border-color:white;
					}
				}
			}
			div {
				a {
					color: white;
				}
			}
			a {
				float: left;
				line-height: 48px;
				color: white;
				font-size: 24px;
				position: absolute;
				top: 0;
				left: 5%;
			}
			span {
				font-size: 18px;
				font-weight: 400;
				text-align: center;
				color: white;
				line-height: 48px;
			}
		}
		.wrapperMain {
			margin-top: 40px;
			img {
				width: 100%;
				display: block;
			}
		}
	}
	/*&/deep/.vux-header */
</style>