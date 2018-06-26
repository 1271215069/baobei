<template>
	<div class="wrapper">

		<div class="wrappermain">
			<tab class="tab-head" bar-active-color="#fe7f19">
				<tab-item class="tab-headitem" selected @on-item-click="onItemClick">佣金赚取</tab-item>
				<tab-item class="tab-headitem" @on-item-click="onItemClick">佣金提现</tab-item>
			</tab>
			<div class="tab-body zq">
				<group gutter="0" class="list">
					<cell-box v-for="(item,index) in zq" :key="index" class="list-item">
						<div>
							赚取佣金 <span>+{{item.money}}</span>
						</div>
						<div>
							<span>{{item.etime}}</span>
							<span>佣金已到账</span>
						</div>
					</cell-box>
				</group>
				<div v-if="zqwhether" class="none">

				</div>
				<span class="load" v-if="!zqwhether" @click.prevent="zqload">{{zqloadtest}}</span>
			</div>
			<div class="tab-body tx nshow">
				<group gutter="0" class="list">
					<cell-box v-for="(item,index) in tx" :key="index" class="list-item">
						<div>
							佣金提现 <span>-{{item.money}}</span>
						</div>
						<div>
							<span>{{item.apply_time}}</span>
							<span :style="'color:'+item.color+';'">{{item.states}}</span>
						</div>
					</cell-box>
				</group>
				<div v-if="txwhether" class="none">

				</div>
				<span class="load" v-if="!txwhether" @click.prevent="txload">{{txloadtest}}</span>
			</div>
			<toast v-model="alt.show" type="text" :text="alt.val"></toast>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Tab, TabItem, Group, Cell, CellBox, Toast } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	var item = document.getElementsByClassName("tab-body");
	export default {
		name: 'user',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '佣金记录',
				tab: true,
				zqwhether: false,
				txwhether: false,
				zqloadtest: '点击加载更多',
				txloadtest: '点击加载更多',
				zqpage: 1,
				txpage: 1,
				alt: {
					show: false,
					val: ""
				},
				zq: [{money:"10.2",etime:"2018-1-1"}],
				tx: [{money:"20.8",apply_time:"2018-1-1",states:"1"}]

			}
		},
		methods: {
			...mapActions(['action']),
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			timeFormat(timestamp) { //时间戳格式转换
				//timestamp是整数，否则要parseInt转换,不会出现少个0的情况
				let time = new Date(timestamp);
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let date = time.getDate();
                let hours = time.getHours();
                let minutes = time.getMinutes();
                let seconds = time.getSeconds();
				return year + '-' + this.add0(month) + '-' + this.add0(date) + ' ' + this.add0(hours) + ':' + this.add0(minutes) + ':' + this.add0(seconds);
			},
			onItemClick(index) {
				console.log('on item click:', index)
				console.log(item)
				for(let i = 0; i < item.length; i++) {
					item[i].classList.add("nshow");
				}
				item[index].classList.remove("nshow");
			},
			zqload() {
				this.zqpage = this.zqpage + 1;
				let d=this.airforce.login_post;
                this.action({
                    method: "post",
                    url: "app/Commission/getcommissionlist",
                    //fullUrl: "https://easy-mock.com/mock/5ab89437ade6f916f6ce4661/yjzq",
                    isFormData: true,
                    data: {
                        uid: d.data.uid,
                        token: d.data.token,
                        page: this.zqpage,
                        pagesize: 15
                    }
                }).then(res => {
                    if(res.code == 200) {
                        if(res.data) {
                            this.zq = this.zq.concat(res.data);
                            console.log(this.zqpage)
                        } else {
                            this.zqloadtest = "没有啦"
                        }
                    }
                    for(let i = 0; i < this.zq.length; i++) {
                        this.zq[i].etime = this.timeFormat(parseInt(this.zq[i].etime));
                        console.log(this.zq[i].etime)
                    }
                }).catch(e => {
                    this.alt.show = true;
                    this.alt.val = e.message;
                })
			},
			txload() {
				this.txpage = this.txpage + 1;
				let d=this.airforce.login_post;
                this.action({
                    method: "post",
                    url: "app/Commission/cashlist",
                    //fullUrl: "https://www.easy-mock.com/mock/5ab89437ade6f916f6ce4661/yjtx",
                    isFormData: true,
                    data: {
                        uid: d.data.uid,
                        token: d.data.token,
                        page: this.txpage,
                        pagesize: 15
                    }
                }).then(res => {
                    if(res.code == 200) {
                        if(!res.data == 'undefined' || res.data) {
                            this.tx = this.tx.concat(res.data);
                            console.log(this.txpage)
                        } else {
                            this.txloadtest = "没有啦"
                        }
                    }
                    for(var i = 0; i < this.tx.length; i++) {
                        this.tx[i].apply_time = this.timeFormat(parseInt(this.tx[i].apply_time));
                        if(this.tx[i].states == 0) {
                            this.tx[i].states = "处理中";
                            this.tx[i].color = '#ff6000';
                        } else if(this.tx[i].states == 1) {
                            this.tx[i].states = "提现成功";
                            this.tx[i].color = '#91c43d';
                        } else if(this.tx[i].states == 2) {
                            this.tx[i].states = "提现失败";
                            this.tx[i].color = '#e53e1c';
                        }
                    }
                }).catch(e => {
                    this.alt.show = true;
                    this.alt.val = e.message;
                })
			}
		},
		components: {
			Toast,
			Group,
			Cell,
			CellBox,
			Tab,
			TabItem,
			XHeader,
			Actionsheet,
			ButtonTab,
			ButtonTabItem
		},
		created() {
			let e=this.airforce.login_post;
            this.action({ //获取佣金列表信息
                method: "post",
                url: "app/Commission/getcommissionlist",
                // fullUrl: "https://easy-mock.com/mock/5ab89437ade6f916f6ce4661/yjzq",
                isFormData: true,
                data: {
                    uid: e.data.uid,
                    token: e.data.token,
                    page: this.zqpage,
                    pagesize: 15
                }
            }).then(res => {
                if(res.code == 200) {
                    if(res.data == 'undefined' || !res.data) {
                        this.zqwhether = true;
                    } else {
                        this.zq = res.data;
                    }

                }
                //下面是获取到数据后对时间戳的转化
                console.log(this.zq)
                for(var i = 0; i < this.zq.length; i++) {
                    this.zq[i].etime = this.timeFormat(parseInt(this.zq[i].etime));
                }

            }).catch(e => {
                this.alt.show = true;
                this.alt.val = e.message;
            })
            //-------------------------------------------------------------------------------------------------------------------
            this.action({ //获取提现列表信息
                method: "post",
                url: "app/Commission/cashlist",
                //fullUrl: "https://www.easy-mock.com/mock/5ab89437ade6f916f6ce4661/yjtx",
                isFormData: true,
                data: {
                    uid: e.data.uid,
                    token: e.data.token,
                    page: this.txpage,
                    pagesize: 15
                }
            }).then(res => {
                if(res.code == 200) {
                    if(res.data == 'undefined' || !res.data) {
                        this.txwhether = true;
                    } else {
                        this.tx = res.data;
                    }
                }
                for(var i = 0; i < this.tx.length; i++) {
                    this.tx[i].apply_time = this.timeFormat(parseInt(this.tx[i].apply_time));
                    if(this.tx[i].states == 0) {
                        this.tx[i].states = "处理中";
                        this.tx[i].color = '#ff6000';
                    } else if(this.tx[i].states == 1) {
                        this.tx[i].states = "提现成功";
                        this.tx[i].color = '#91c43d';
                    } else if(this.tx[i].states == 2) {
                        this.tx[i].states = "提现失败";
                        this.tx[i].color = '#e53e1c';
                    }
                }
            }).catch(e => {
                this.alt.show = true;
                this.alt.val = e.message;
            })
		}
	}
</script>

<style scoped lang="less">


	a {
		color: #000000;
		text-decoration: none;
	}

	.nshow {
		display: none;
	}
	
	.wrapper {

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
		.wrappermain {
			margin-top: 40px;
			.tab-head {
				&/deep/ .vux-tab-item.vux-tab-selected {
					color: #fe7f19;
					border-color: #fe7f19;
				}
			}
			.tab-body {
				padding-top: 10px;
				.none {
					width: 30%;
					margin: 0 auto;
					margin-top: 100px;
					background: url(../../assets/img/user/noyj.png) no-repeat;
					background-position: top center;
					background-size: contain;
					padding-bottom: 140px;
				}
				.load {
					display: block;
					text-align: center;
					font-size: 16px;
					line-height: 40px;
				}
				.list {
					&/deep/ .weui-cells {
						.weui-cell_access:after {
							display: none;
						}
					}
					.list-item {
						padding: 5px 5% 15px 5%;
						display: block;
						div:nth-of-type(1) {
							font-size: 18px;
							overflow: hidden;
							line-height: 40px;
							span {
								float: right;
								font-size: 18px;
								color: #fe7f19;
							}
						}
						div:nth-of-type(2) {
							line-height: 15px;
							color: #999999;
							overflow: hidden;
							font-size: 15px;
							span:nth-of-type(1) {
								float: left;
							}
							span:nth-of-type(2) {
								float: right;
							}
						}
					}
				}
			}
			.tx {
				.list {
					.list-item {
						div:nth-of-type(1) {
							span {
								color: #e53e1a;
							}
						}
						div:nth-of-type(2) {
							span:nth-of-type(2) {
								color: #e53e1a;
							}
						}
					}
				}
			}
		}
	}
</style>