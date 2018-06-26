<template>
	<div class="wrapper">

		<div class="wrappermain">
			<img src="@/assets/img/user/rzc.png"/>
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
				msg: '保险渠道入住流程',

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

		}
	}
</script>

<style scoped lang="less">

	.wrapper{

		font-size: 14px;
		font-family: "微软雅黑";

		.wrappermain{
			margin-top: 40px;
			img{
				width: 100%;
			}
		}
	}
</style>