<template>
	<div class="wrapper">
		<div class="wrappermain">
			<div class="content">
				<div class="title">
					<img src="@/assets/img/user/default_head.png"/>
					我的二维码
				</div>
				<div class="ewm">
					<img src="@/assets//img/user/ewm.png"/>
				</div>
				<span>推荐给更多好朋友吧</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'wdewm',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '我的二维码',
				
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
			background: #fb8017;
			margin-top: 40px;
			padding: 80px 0 180px 0;
			.content{
				width: 90%;
				margin: 0 auto;
				box-sizing: border-box;
				padding: 30px 7%;
				background:white;
				.title{
					overflow: hidden;
					text-align: center;
					line-height: 50px;
					font-size: 18px;
					img{
						width: 50px;
						height: 50px;
						float: left;
						border-radius: 50%;
					}
					
				}
				.ewm{
					width: 90%;
					margin: 0 auto;
					padding: 10px 0 10px 0;
					img{
						width: 100%;
						display: block;
					}
				}
				span{
					display: block;
					margin: 0 auto;
					text-align: center;
				}
			}
		}
	}
</style>