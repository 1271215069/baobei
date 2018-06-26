<template>
	<div class="wrapper">

		<div class="wrappermain">

			<iframe src="http://fq.egretloan.com/index.php?g=App&m=Html&a=look&id=4" frameborder=0 seamless="seamless" scrolling="no"></iframe>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'czlc',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '操作流程',

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
		},
		created() {
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

		.wrappermain{
			padding: 20px;
			margin-top: 40px;
			/*img{
				width: 100%;
				display: block;
				margin: 10px 0;
			}
			p{
				margin: 20px 0;
			}*/
			iframe{
				width: 100%;
				height: 1500px;
			}
		}
	}
</style>