<template>

	<div class="wrapper">
		<group class="wrappermain">
			<cell-box is-link link="/app/HomeLayout/xgnc" class="list">
				<span class="title">名字</span>
				<span class="val">{{username}}</span>
			</cell-box>
			<cell-box is-link link="/app/HomeLayout/ylsjh" class="list">
				<span class="title">预留手机号</span>
				<span class="val">{{usertell}}</span>
			</cell-box>
			<cell-box is-link link="/app/HomeLayout/ylwxh" class="list">
				<span class="title">预留微信号</span>
				<span class="val">{{userwx}}</span>
			</cell-box>
			<span class="care">
				注：预留联系方式，将及时收到最新活动消息和返现提醒！
			</span>
		</group>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Group, Cell, CellBox } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'user',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce',
			
		}),
		data() {
			return {
				msg: '修改资料',
				username:'',
				usertell:'',
				userwx:''
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
		    let e=this.airforce.login_post;
            this.username=e.data.nick_name;
            this.usertell=e.data.yphone;
            this.userwx=e.data.ywxno;
		}
	}
</script>

<style scoped lang="less">

	.wrapper{

		font-size: 14px;
		font-family: "微软雅黑";

		.wrappermain{
			margin-top: 40px;
			.list{
				display: block;
				overflow: hidden;
				font-size:16px;
				line-height:30px;
				.title{
					float: left;
				}
				.val{
					float: right;
					margin-right: 5%;
				}
				
			}
			.care{
				color: #ff0000;
				display: block;
				padding: 15px;
			}
		}
	}
</style>