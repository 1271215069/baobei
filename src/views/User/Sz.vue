<template>
	<div class="wrapper">
		<div class="wrappermain">
			<group gutter="0">
				<cell-box is-link link='/app/HomeLayout/xgmm'>修改登陆密码</cell-box>
				<cell-box is-link link='/app/HomeLayout/about'>关于</cell-box>
			</group>
			<button v-model="show" @click.prevent="quit" class="quit" >退出登陆</button>
			<actionsheet v-model="show" :menus="menus" show-cancel @on-click-menu="click5"></actionsheet>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Group, Cell, CellBox } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'czlc',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '设置',
				show: false,
				menus:[
                    {
                        label: "确定退出登陆吗？",
                        type: 'info'
                    }, {
                        label: '确定',
                        type: 'warn'
                    }
				]
			}
		},
		methods: {
			...mapActions(['action']),
			click5(key,data) {
			    if(data){
			        switch (data.type){
						case "warn":
                            this.action({
                                moduleName:'login_post',
                                goods:undefined,
                            });
                            delete localStorage.login_post;
                            this.$router.push("/Login");
						    break;
						default:
						    break;
					}
				}
			},
			quit() {
				this.show = true;
			}
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

	.wrapper {

		font-size: 14px;
		font-family: "微软雅黑";

		.wrappermain {
			margin-top: 40px;
			.quit {
				display: block;
				width: 80%;
				margin: 0 auto;
				border-radius: 8px;
				background: #E64340;
				line-height: 30px;
				text-align: center;
				color: white;
				font-size: 17px;
				line-height: 40px;
				margin-top: 30px;
				border: none;
				outline: medium;
			}
		}
	}
</style>