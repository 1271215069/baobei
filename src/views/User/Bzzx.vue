<template>
	<div class="wrapper">

		<div class="wrappermain">
			<div class="ewm">
				<img src="@/assets/img/user/ewm.png"/>
				<span>扫描二维码，关注保呗微信公众号</span>
			</div>
			<group class="menulist">
				<cell-box is-link link="/app/HomeLayout/yhxz" class="yhxz">
					<span style="color: #0ba2f0;" class="iconfont">&#xe643;</span>
					<span>用户须知</span>
				</cell-box>
				<cell-box is-link link='/app/HomeLayout/zcdyhk' class="zcdyhk"><span style="color: #ff3f00;" class="iconfont">&#xe76a;</span><span>支持的银行卡</span></cell-box>
				<cell-box is-link link='/app/HomeLayout/czlc' class="czlc"><span style="color: #70c438;" class="iconfont">&#xe662;</span><span>操作流程</span></cell-box>
				<cell-box is-link link='/app/HomeLayout/rzlc' class="rzlc"><span style="color: #ffae00;" class="iconfont">&#xe716;</span><span>保险渠道入住流程</span></cell-box>
				<cell-box is-link link='/app/HomeLayout/lxkf' class="lxkf"><span style="color: #e72480;" class="iconfont">&#xe616;</span><span>联系客服</span></cell-box>
			</group>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Group, Cell, CellBox } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'bzzx',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data(){
			return {
				msg: '帮助中心',
				bzurl:{
					yhxz:"http://fq.egretloan.com/index.php?g=App&m=Html&a=look&id=1",
					zcdyhk:'http://fq.egretloan.com/index.php?g=App&m=Html&a=look&id=2',
					czlc:'http://fq.egretloan.com/index.php?g=App&m=Html&a=look&id=4'
				}
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

			
		}
	}
</script>

<style scoped lang="less">

	.wrapper{
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
		font-size: 14px;
		font-family: "微软雅黑";
		background: #f8f8f8;

		.wrappermain{
			margin-top: 40px;
			padding: 15px 0;
			.ewm{
				text-align: center;
				img{
					width: 30%;
					display: block;
					margin: 0 auto;
				}
				span{
					line-height: 34px;
				}
			}
			.menulist {
				padding-bottom: 140px;
				i {
					font-size: 14px;
				}
				span {
					font-size: 16px;
					padding-left: 5px;
				}
			}
		}
	}
</style>