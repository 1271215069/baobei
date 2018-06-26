<template>
	<div class="wrapper">
		<div class="wrapperMain">
			<cell-box class="allnum">
				<i></i>
				<span>团体客户</span>
				<span>{{allkh}}人</span>
			</cell-box>
			<div class="none" v-if="!whether"></div>
			<div v-if="whether" class="content" id="perfect-scroll-wrapper" ref="scrollWrapper" infinite-wrapper>
				<cell-box class="tdlist" v-for="(item,index) in kh" :key="index">
					<div class="portrait"><img :src="require('@/assets/img/user/default_head.png')" /></div>
					<div class="info">
						<p>{{item.nick_name}}</p>
						<p>{{item.phone}}</p>
					</div>
					<div class="num">个人客户：<span>{{item.acount}}人</span></div>
				</cell-box>
				<span @click.prevent='load' v-if="whether" class="load">{{loadtest}}</span>
				<!--<infinite-loading @infinite="infiniteHandler">
					<span slot="no-more">
					      There is no more Hacker News :(
					    </span>
				</infinite-loading>-->
				<toast v-model="alt.show" type="text" :text="alt.val"></toast>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem,Toast } from 'vux'
	import { Group, Cell, CellBox } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	import InfiniteLoading from 'vue-infinite-loading'
	export default {
		name: 'tdxq',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '我的团队',
				page:1,
				kh: [],
				allkh: '',
				whether: true,
				loadtest:"点击加载更多",
				alt:{
					show:false,
					val:''
				}
			}
		},
		methods: {
			...mapActions(['action']),
			load(){
                let e = this.airforce.login_post;
                this.page=this.page+1;
                this.action({
                    moduleName: 'getateam',
                    method: 'post',
                    url: 'app/Member/getateam',
                    // fullUrl:'https://easy-mock.com/mock/5ab89437ade6f916f6ce4661/tdxq',
                    isFormData: true,
                    data:{
                        uid: e.data.uid,
                        token: e.data.token,
                        page: this.page,
                        pagesize: 15
                    }
                }).then(d => {
                    if(d.code==200){
                        if(d.data){
                            this.kh=this.kh.concat(d.data);
                        }else{
                            this.loadtest="没有啦"
                        }
                    }
                }).catch(err=>{
                    this.alt.show=true;
                    this.alt.val=err;
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
			ButtonTabItem,
			InfiniteLoading
		},
		created() {
		    let e = this.airforce.login_post;
            this.action({
                moduleName: 'getateam',
                method: 'post',
                url: 'app/Member/getateam',
                isFormData: true,
                data:{
                    uid: e.data.uid,
                    token: e.data.token,
                    page: this.page,
                    pagesize: 15
                }
            }).then(d => {
                if(d.code == 200) {
                    if(d.data) {
                        this.whether = true;
                        this.kh = d.data;
                        this.allkh = d.data.length;
                    } else {
                        this.whether = false;
                        this.kh = [];
                        this.allkh = 0;
                    }
                }else{
                    this.alt.show=true;
                    this.alt.val=d.message;
                }
            }).catch(err=>{
                this.alt.show=true;
                this.alt.val=err;
			})
		}
	}
</script>

<style scoped lang="less">
	@font-face {
		font-family: 'iconfont';
		/* project id 590408 */
		src: url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.eot');
		src: url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.woff') format('woff'), url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.ttf') format('truetype'), url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.svg#iconfont') format('svg');
	}
	
	.iconfont {
		font-family: "iconfont";
		font-size: 18px;
		font-style: normal;
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
	
	.wrapper {
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
		.none {
			width: 30%;
			margin: 0 auto;
			margin-top: 100px;
			
			background: url(../../assets/img/user/nokh.png) no-repeat;
			background-position: top center;
			background-size: contain;
			padding-bottom: 140px;
		}
		.wrapperMain {
			margin-top: 40px;
			.allnum {
				display: block;
				i {
					width: 15px;
					height: 15px;
					display: inline-block;
					background: url(../../assets/img/user/tdxq.png) no-repeat;
					background-size: cover;
				}
				i+span {
					font-size: 16px;
					padding-left: 5px;
				}
				i+span+span {
					float: right;
					color: #e53e1c;
				}
			}
			.content {
				.tdlist {
					display: block;
					overflow: hidden;
					div {
						height: 69px;
					}
					.portrait {
						float: left;
						width: 15%;
						img {
							width: 100%;
							display: block;
							margin-top: 10px;
						}
					}
					.info {
						float: left;
						margin: auto 0;
						padding-left: 10px;
						p:nth-of-type(1) {
							margin-top: 13px;
						}
						p {
							font-size: 16px;
						}
					}
					.num {
						float: right;
						line-height: 69px;
						span {
							color: #e53e1c;
						}
					}
				}
				.load{
					display: block;
					text-align: center;
					font-size: 16px;
					line-height: 40px;
				}
			}
		}
	}
</style>