<template>
	<div class="wrapper">

		<div class="wrappermain">
			<iframe src="http://fq.egretloan.com/index.php?g=App&m=Html&a=look&id=1" frameborder=0 scrolling="no" seamless="seamless"></iframe>

		</div>
	</div>
	
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,Badge} from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'yhxz',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data(){
			return {
				msg: '用户须知',
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
		    Badge
		},
		created() {

		}
	}
</script>

<style scoped lang="less">

	.wrapper{

		font-size: 14px;
		font-family: "微软雅黑";
		&/deep/ .vux-header{
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
			padding-top: 0;
			padding-bottom: 0;
			&/deep/ .vux-header-left {
				.left-arrow{
					&:before {
						content: '';
						border-color:white;
					}
				}
			}
			a{
				float: left;
				line-height: 48px;
				color: white;
				font-size: 24px;
				position: absolute;
				top: 0;
				left: 5%;
			}
			span {
				font-size: 16px;
				font-weight: 400;
				text-align: center;
				color: white;
				line-height: 48px;
			}
		}
		.wrappermain{
			margin-top: 60px;
			iframe{
				width: 100%;
				height: 1500px;
			}
			/*.section{
				background:rgba(141,141,141,0.1);
				width:90%;
				margin:15px auto;
				box-sizing:border-box;
				padding:5px 2%;
				.num{
					background: #91c43d;
					float: left;
					margin-right: 5px;
				}
				p{
					line-height: 22px;
					b{
						font-size: 16px;
						line-height: 18px;
						/*font-weight: 600;
					}
				}
				.care{
					color: #ff6000;
				}
				.sample{
					display: block;
					margin: 30px 0 20px 0;
				}
			}*/
		}
	}
</style>