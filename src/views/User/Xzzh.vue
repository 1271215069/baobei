<template>
	<div class="wrapper">
		<div class="wrappermain">
			<router-link class="yhklist" :to="{path:'tx',query:{yhkid:item.id,yhknum:item.number,bank:item.bank}}" v-for="(item,key) in yhk" :key="key">
				<span>{{item.bank}}</span>
				<span>({{item.number}})</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Group, Cell, CellBox,ColorPicker, Radio, Checker,CheckerItem } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'user',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data(){
			return {
				msg: '选择账户',
				yhk:[]
			}
		},
		methods:{
			...mapActions(['action']),
		},
		components: {
			ColorPicker,
			Group,
			Cell,
			CellBox,
			XHeader,
		    Actionsheet,
		    ButtonTab,
		    ButtonTabItem,
		    Radio,
		    Checker,
		    CheckerItem
		},
		created(){
		    let e = this.airforce.login_post;
            this.action({
                moduleName:'yhkList',
                method:'post',
                url:'app/Commission/bankCardList',
                isFormData: true,
                data:{
                    uid: e.data.uid,
                    token: e.data.token
                }
            }).then(d=>{
                this.yhk=d.data
            })
		}
	}
</script>

<style scoped lang="less">
	a {
		color: #000000;
		text-decoration: none;
	}
	.wrapper{
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
			.manage{
				position: absolute;
				right: 5%;
				font-size: 16px;
				color: white;
			}
		}
		.wrappermain{
			margin-top: 40px;
			padding-top: 30px;
			background: #f7f6f5;
			padding-bottom: 500px;
			.yhklist{
				background: white;
				display: block;
				box-sizing: border-box;
				padding: 10px 5%;
				border-bottom: 1px solid #d5d5d5;
				span{
					font-size: 16px;
				}
			}
		}
	}
</style>