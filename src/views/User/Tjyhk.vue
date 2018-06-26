<template>
	<div class="wrapperr">
		<div class="wrappercontent">
			<cell-box class="title">
				<label>提现到银行卡</label>
				<span>银行卡提现更便捷</span>
			</cell-box>
			<cell-box class="list">
				<label for="yhknum">银行卡号码</label>
				<input type="text" name="" id="yhknum" v-model="yhknumber" value="" placeholder="仅限储蓄卡" />
			</cell-box>
			<cell-box class="list">
				<label for="yhkname">持卡人姓名</label>
				<input type="text" name="" id="yhkname" v-model="yhkname" value="" placeholder="请输入持卡人姓名" />
			</cell-box>
			<button @click.prevent="save">确认提交</button>
			<toast v-model="alt.show" type="text" :text="alt.val"></toast>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Group, Cell, CellBox,Toast } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'user',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '添加银行卡',
				yhknumber: '',
				yhkname: '',
				yz:/^([1-9]{1})(\d{14}|\d{18})$/,
				alt:{
					show:false,
					val:""
				}
			}
		},
		methods: {
			...mapActions(['action']),
			save(){
				if(!this.yz.test(this.yhknumber)){
					this.alt.show=true;
					this.alt.val="请输入正确的银行卡号";
					return false;
				}
                let e = this.airforce.login_post;
                this.action({
                    method: "post",
                    url: "app/Commission/addBankCard",
                    isFormData: true,
                    data: {
                        uid: e.data.uid,
                        token: e.data.token,
                        number: this.yhknumber,
                        name: this.yhkname
                    }
                }).then(res => {
                    console.log(res)
                    if(res.code==200){
                        this.alt.show=true;
                        this.alt.val=res.message;
                        var that=this;
                        setTimeout(function() {
                            that.$router.push({
                                path: '/app/HomeLayout/wdyhk'
                            });
                        }, 2000)
                    }else{
                        this.alt.show=true;
                        this.alt.val=res.message;
                    }

                }).catch(d => {
                    this.alt.show=true;
                    this.alt.val=d;
                })
			},
		},
		components: {
			Toast,
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
	input:focus{
		outline: none;
	}
	.wrapperr {
		font-size: 14px;
		font-family: "微软雅黑";
		.wrappercontent {
			margin-top: 40px;
			.title {
				label{
					font-size: 16px;
					padding-right: 5px;
				}
				span {
					color: #e53e1c;
				}
			}
			.list {
				box-sizing: border-box;
				padding: 0 15px;
				background: white;
				label{
					font-size: 16px;
					width: 30%;
					line-height: 42px;
				}
				input {
					width: 60%;
					height: 42px;
					line-height: 42px;
					border: none;
				}
			}
			button {
				width: 80%;
				display: block;
				margin: 0 auto;
				background: #f3981e;
				border: none;
				font-size: 18px;
				line-height: 35px;
				color: white;
				border-radius: 5px;
				margin-top: 30px;
			}
		}
	}
</style>