<template>
	<div class="wrapper">

		<div class="wrappermain">
			<h3>客服电话</h3>
			<a href="tel://0574-87919382">{{phone}}</a>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'lxkf',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '联系客服',
				phone:""
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
                moduleName:'getPhone',
                method:'post',
                url:'app/public/getRandomPhoneNo',

            }).then(d=>{
                if(d.code==200){
                    this.phone=d.data.phone_no
                }
            })
		}
	}
</script>

<style scoped lang="less">

	.wrapper{

		font-size: 14px;
		font-family: "微软雅黑";
		

		.wrappermain{
			margin-top: 40px;
			font-size: 18px;
			h3{
				padding-left: 5%;
				line-height: 55px;
			}
			a{
				background: #f8f8f8;
				display: block;
				padding-left: 5%;
				color: rgba(117,117,117,0.6);
				line-height: 75px;
			}
		}
	}
</style>