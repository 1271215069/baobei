<template>
	<div class="wrapper">

		<div class="wrappermain">
			<iframe src="http://fq.egretloan.com/index.php?g=App&m=Html&a=look&id=2" frameborder=0 scrolling="no" seamless="seamless"></iframe>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,XTable } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'yhxz',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data(){
			return {
				msg: '支持的银行卡',
			}
		},
		methods: {
			...mapActions(['action']),
		},
		components: {
			XHeader,
		    Actionsheet,
		    ButtonTab,
		    ButtonTabItem,
		    XTable
		},
		created(){
			this.action({
				moduleName: "s",
				goods: "1212"
			})
		}
	}
</script>

<style scoped lang="less">

	.wrapper{

		font-size: 14px;
		font-family: "微软雅黑";
		.header{
			width: 100%;
			min-width: 320px;
			max-width: 640px;
			position: fixed;
			top: 0;
			left: 50%;
			transform:translateX(-50%);
			background: #ff7200;
			overflow: hidden;
			text-align: center;
			z-index:1000;
			padding: 0;
			&/deep/ .vux-header-left {
				.left-arrow{
					&:before {
						content: '';
						border-color:white;
					}
				}
			}

		}
		.wrappermain{
			margin-top: 40px;

			iframe{
				width: 100%;
				height: 800px;
			}
		}
	}
</style>