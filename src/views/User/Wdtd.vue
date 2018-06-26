<template>
	<div class="wrapper">
		<div class="wrapperMain" :style="{backgroundImage:`url(${main_bj})`}">
			<div class="content animated flipInX">
				<div class="khnr tz">
					<p>
						<span>我是团长</span>
					</p>
					<p>个人客户：{{grkh}}人</p>
				</div>

					<img :src="require('@/assets/img/user/wdtd-jt.png')"/>
				<div class="khnr ckxq">
					<p>

						<span>A级客户</span>
					</p>
					<p>{{akh}}人</p>
					<router-link class="tdxq" to="tdxq">查看详情</router-link>
				</div>
				<img :src="require('@/assets/img/user/wdtd-jt.png')"/>
				<div class="khnr">
					<p>

						<span>B级客户</span>
					</p>
					<p>{{bkh}}人</p>
				</div>
				<img :src="require('@/assets/img/user/wdtd-jt.png')"/>
				<div class="khnr">
					<p>

						<span>C级客户</span>
					</p>
					<p>{{ckh}}人</p>
				</div>

			</div>
		</div>
	</div>

</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'wdtd',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '我的客户',
				grkh:0,
				akh:0,
				bkh:0,
				ckh:0,
                main_bj:require("@/assets/img/user/MyTeam_bg_03@3x.png")
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
		mounted() {
		    let  e = this.airforce.login_post;
            this.action({
                moduleName:'getTeam',
                method:'post',
                url:'app/Member/getteam',
                isFormData: true,
                data:{
                    uid: e.data.uid,
                    token: e.data.token
                }
            }).then(d=>{
                this.akh=d.data.acount;
                this.bkh=d.data.bcount;
                this.ckh=d.data.ccount;
                this.grku=this.akh+this.bkh+this.ckh;
            })
		}
	}
</script>

<style scoped lang="less">
	.active{
		color: #ff7300;

	}
	* {
		margin: 0;
		padding: 0;
	}

	ol,
	ul,
	li {
		list-style: none;
	}

	img {
		border: 0;
		vertical-align: middle;
	}

	body {
		color: #000000;
		background: #FFF;
		text-align: center;
	}

	.clear {
		clear: both;
		height: 1px;
		width: 100%;
		overflow: hidden;
		margin-top: -1px;
	}

	a {
		color: #000000;
		text-decoration: none;
	}
	.wrapper{
		margin: 0 auto;
		font-size: 14px;
		font-family: "微软雅黑";
		.header{
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
		.wrapperMain{
			background-repeat: no-repeat;
			background-position:top center;
			background-size: cover;
			padding-bottom: 40px;
			.content{
				padding-top: 350px;
				.khnr{
					background: rgba(0, 0, 0, 0.2);
					width: 55%;
					box-sizing:border-box ;
					padding: 15px 5%;
					margin: 0 auto;
					border-radius: 5px;
					p{
						text-align: center;
						color: white;
					}
					p{
						span:before{
							content: '';
							display: inline-block;
							vertical-align: middle;
							margin-bottom: 4px;
							margin-right: 5px;
							width: 14px;
							height: 14px;
							background: url("../../assets/img/user/wdtd-kh.png") no-repeat;
							background-size: cover;
						}
					}
					p:nth-of-type(2){
						font-size: 18px;
					}
					.tdxq{
						display: block;
						margin: 0 auto;
						width: 60%;
						line-height: 19px;
						text-align: center;
						background: url("../../assets/img/user/wdtd-an.png") no-repeat;
						background-size: 100% 19px;
						margin-top: 5px;
					}
				}
				img{
					width: 6%;
					display: block;
					margin: 20px auto;
				}
				.tz{
					p{
						span:before{
							content: '';
							display: inline-block;
							vertical-align: middle;
							margin-right: 5px;
							width: 14px;
							height: 14px;
							background: url("../../assets/img/user/wdtd-tz.png") no-repeat;
							background-size:  contain;
							background-position: top center;
						}
					}
				}
			}
		}
	}
</style>