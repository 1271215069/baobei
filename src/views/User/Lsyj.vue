<template>
	<div class="wrapper">
		<div class="wrapperMain">
			<div class="yj-collect">
				<x-circle :percent="percent" :stroke-width="4" stroke-color="#fe7f19" class="circular">
			        <span>历史累计佣金</span>
			        <span class="num">￥{{all}}</span>
			    </x-circle>
			</div>
			<div class="yhyj">
				<group gutter="0" class="menu">
					<cell-box class="option animated flipInX">
						<i style="color: #258ecb;" class="iconfont">&#xe6f2;</i>
						<span class="title">A级成员总累计赚取</span>
						<span class="cynum">￥{{ayh}}</span>
					</cell-box>
					<cell-box class="option animated flipInX">
						<i style="color: #f3981e;" class="iconfont">&#xe6f2;</i>
						<span class="title">B级成员总累计赚取</span>
						<span class="cynum">￥{{byh}}</span>
					</cell-box>
					<cell-box class="option animated flipInX">
						<i style="color: #91c43d;" class="iconfont">&#xe6f2;</i>
						<span class="title">C级成员总累计赚取</span>
						<span class="cynum">￥{{cyh}}</span>
					</cell-box>
				</group>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem ,XCircle} from 'vux'
	import { Group, Cell, CellBox } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	var all=5000.00;
	export default {
		name: 'lsyj',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg:'我的佣金',
				all:all,
				ayh:2000,
				byh:1500,
				cyh:1500,
				percent:0
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
		    ButtonTabItem,
		    XCircle
		},
		created() {
		    let e = this.airforce.login_post;
            this.action({
                method: "post",
                url: "app/Commission/getcommission",
                isFormData: true,
                data: {
                    uid: e.data.uid,
                    token: e.data.token
                }
            }).then(res => {
                if(res.code != 200){
                    this.$vux.toast.text(res.message);
                    return;
				}
                this.all=this.$route.query.history;
                this.ayh=res.data.amoney;
                this.byh=res.data.bmoney;
                this.cyh=res.data.cmoney;
            }).catch(err => {
                this.$vux.toast.text(err);
            })
			var time = setInterval(()=>{
			    if(this.percent == 100){
			        clearInterval(time);
				}else {
			        this.percent += 1;
				};
			},10)
		}
	}
</script>

<style scoped lang="less">
	@font-face {
		font-family: 'iconfont';
		/* project id 590408 */
		src: url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.eot');
		src: url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.woff') format('woff'), url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.ttf') format('truetype'), url('https://at.alicdn.com/t/font_590408_pl1w0nv12v9m5cdi.svg#iconfont') format('svg');
	}
	
	.iconfont {
		font-family: "iconfont";
		font-size: 18px;
		font-style: normal;
	}
	
	.active {
		color: #ff7300;
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
		min-width: 320px;
		max-width: 640px;
		margin: 0 auto;
		font-size: 14px;
		font-family: "微软雅黑";
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
		}
		.wrapperMain{
			margin-top: 40px;
			.yj-collect{
				width:200px;
				height:200px;
				margin:0 auto;
				padding:30px 0 30px 0;
				.circular{
					span{
						display: block;
						line-height: 30px;
						font-size: 16px;
					}
					.num{
						font-size: 24px;
					}
				}
			}
			.yhyj{
				.menu{
					.option{
						i{
							font-size: 14px;
						}
						.cynum{
							position: absolute;
							right: 5%;
							color: #e53e1c;
						}
						.title{
							padding-left: 5px;
						}
						span{
							font-size: 16px;
						}
					}
				}
			}
		}
	}
</style>