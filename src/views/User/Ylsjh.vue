<template>
	<div class="wrapper">
		<div class="wrappermain">
			<span>预留手机号</span>
			<input type="text" v-model="usertell"/>
		</div>
		<toast v-model="alt.show" type="text" :text="alt.val"></toast>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,Toast } from 'vux'
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
				msg: '预留手机号',
				usertell:'',
				alt:{
					show:false,
					val:""
				},
				yz:/^1[3|4|5|8][0-9]\d{4,8}$/,
				
			}
		},
		methods: {
			...mapActions(['action']),
			save(){
				if(!this.yz.test(this.usertell)){
					this.alt.show=true;
					this.alt.val="不是完整的11位手机号或者正确的手机号前七位";
					return false;
				}
                let e=this.airforce.login_post;
                this.action({
                    moduleName: 'editPhone',
                    method: "post",
                    url: "app/Member/editPhone",
                    isFormData: true,
                    data: {
                        uid: e.data.uid,
                        token: e.data.token,
                        phone:this.usertell
                    }
                }).then(d=>{
                    if(d.code==200){
                        this.alt.val = "保存成功";
                        this.alt.show = true;
                        this.action({
                            moduleName:'login_post',
                            goods:{
                                data:{
                                    yphone:this.usertell,
                                }
                            }
                        });
                        localStorage.login_post = JSON.stringify(this.airforce.login_post);
                        setTimeout(() =>{
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
            this.usertell=e.data.yphone
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

	.wrapper{

		font-size: 14px;
		font-family: "微软雅黑";

		.wrappermain{
			margin-top: 40px;
			padding-bottom: 300px;
			background: #f7f6f5;
			span{
				display: block;
				font-size: 16px;
				line-height: 35px;
				padding: 0 5%;
			}
			input{
				width: 100%;
				border:none;
				height: 42px;
				line-height: 42px;
				box-sizing: border-box;
				padding: 0 5%;
			}
		}
	}
</style>