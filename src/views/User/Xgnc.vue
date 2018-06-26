<template>
	<div class="wrapper">
		<div class="wrappermain">
			<span>修改昵称</span>
			<input type="text" v-model="username" />
			<toast v-model="alt.show" type="text" :text="alt.val"></toast>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Toast } from 'vux'
	import { Group, Cell, CellBox } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'user',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '修改昵称',
				username: "",
				alt: {
					show: false,
					val: ''
				}
			}
		},
		methods: {
			...mapActions(['action']),
			save() {
                let e=this.airforce.login_post;
                this.action({
                    moduleName: 'editNickName',
                    method: "post",
                    url: "app/Member/editNickName",
                    isFormData: true,
                    data: {
                        uid: e.data.uid,
                        token: e.data.token,
                        name: this.username
                    }
                }).then(d => {
                    if(d.code == 200) {
                        this.alt.val = "保存成功";
                        this.alt.show = true;
                        this.action({
                            moduleName:'login_post',
							goods:{
                                data:{
                                    nick_name:this.username,
								}
							}
                        });
                        localStorage.login_post = JSON.stringify(this.airforce.login_post);
                        setTimeout(()=> {
                            this.$router.back();
                        }, 2000)
                    }else{
                        this.alt.val = d.message;
                        this.alt.show = true;
                    }

                })
			}
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
			let e=this.airforce.login_post;
            this.username = e.data.nick_name
		},
		mounted(){
		    this.action({
				moduleName:'layout',
				goods:{
                    clickfn:()=>{
                        this.save();
					}
				}
			})
		}
	}
</script>

<style scoped lang="less">
	input:focus{
		outline: none;
	}
	.wrapper {
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
		font-size: 14px;
		font-family: "微软雅黑";

		.wrappermain {
			margin-top: 40px;
			padding-bottom: 300px;
			background: #f7f6f5;
			span {
				display: block;
				font-size: 16px;
				line-height: 35px;
				padding: 0 5%;
			}
			input {
				width: 100%;
				border: none;
				height: 42px;
				line-height: 42px;
				box-sizing: border-box;
				padding: 0 5%;
			}
		}
	}
</style>