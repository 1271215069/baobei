<template>
	<div class="wrapper">
		<div class="none" v-if="!show"></div>
		<div class="wrappermain" v-if="show">
			<group class="list">
				<cell-box class="yhk" v-for="(item,key) in backList" :key="key">
						<div class="yhk-top">
							{{item.bank}}
							<div class="icon">
								<label  class="radioTest">
									<!--<input type="radio" name="ss" v-on:change="setDafault" :value="item.id" v-model="bancardid"/>-->
									<input v-if="item.default" hidden checked="true" type="radio" name="ss" v-on:change="setDafault($event,item)"/>
									<input v-else type="radio" hidden name="ss" v-on:change="setDafault($event,item)"/>
									<div></div>
									<span>默认银行卡</span>
								</label>
							</div>
						</div>
						<div class="yhk-bottom">
							<span>{{item.number}}</span>
							<!--@click="del(item.id)" @click="shocon"-->
							<div class="icon"  @click="shocon(item.id)">
								<i id="del" class="iconfont">&#xe61c;</i>
								<label name="del">删除</label>
							</div>
						</div>
					</cell-box>
					<confirm v-model="whether" content="确定删除该银行卡？" @on-confirm="del(delid)"></confirm>
			</group>

		</div>
		<router-link  to="/app/HomeLayout/tjyhk" class="bottom">
			添加银行卡
		</router-link>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
	import { Group, Cell, CellBox,ColorPicker, Radio, Checker,CheckerItem,Confirm } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'user',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				msg: '我的银行卡',
				bancardid:'',
				backList:[],
				show:false,
				whether:false,
				delid:'',

			}
		},
		methods:{
			...mapActions(['action']),
			shocon(deid){
				this.whether=true;
				this.delid=deid;
			},
			setDafault(person,data){
                let e = this.airforce.login_post;
                this.action({
                    moduleName: 'byDefault',
                    method: 'post',
                    url: 'app/Commission/byDefault',
                    isFormData: true,
                    data: {
                        uid: e.data.uid,
                        token: e.data.token,
                        id:data.id
                    }
                }).then(d => {
                    if(d.code == 200) {
                        this.$vux.toast.text("设置成功");
                    }
                })
			},


			del(nid){
				var id=parseInt(nid);
                let e = this.airforce.login_post;
                this.action({
                    moduleName: 'delbankCard',
                    method: 'post',
                    url: 'app/Commission/delbankcard',
                    isFormData: true,
                    data: {
                        uid: e.data.uid,
                        token: e.data.token,
                        id:id
                    }
                }).then(d=>{
                    if(d.code==200){//删除成功后更新this.backList的数据，使得页面更新
                        console.log(d)
                        this.action({
                            method: 'post',
                            url: 'app/Commission/bankCardList',
                            isFormData: true,
                            data: {
                                uid: e.data.uid,
                                token: e.data.token,

                            }
                        }).then(s=>{
                            if(s.code == 200) {
                                if(s.data) {
                                    this.show=true;
                                    this.backList = s.data;
                                    for(var i=0;i<this.backList.length;i++){//通过循环把决定是否默认的字段值由0,1改为布尔值
                                        if(this.backList[i].default == 1){
                                            this.backList[i].default=true;

                                        }else{
                                            this.backList[i].default=false;

                                        }
                                    }
                                } else {
                                    this.backList=[];
                                    this.show=false;
                                }
                            }
                        })
                    }
                })
			}
		},
		components: {
			Confirm,
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
		created() {
		    let e = this.airforce.login_post;
            this.action({
                moduleName: 'getbankCard',
                method: 'post',
                url: 'app/Commission/bankCardList',
                isFormData: true,
                data: {
                    uid: e.data.uid,
                    token: e.data.token,
                }
            }).then(d => {
                if(d.code == 200) {
                    if(d.data) {
                        this.show=true;
                        this.backList = d.data;
                        for(var i=0;i<this.backList.length;i++){//通过循环把决定是否默认的字段值由0,1改为布尔值
                            if(this.backList[i].default == 1){
                                this.backList[i].default=true;
                            }else{
                                this.backList[i].default=false;
                            }
                        }
                    } else {
                        this.backList=[];
                        this.show=false;
                    }
                }
            })
		}
	}
</script>

<style scoped lang="less">

	.wrapper{

		font-size: 14px;
		font-family: "微软雅黑";

		.none{
			width: 30%;
			margin: 0 auto;
			margin-top: 140px;
			background: url(../../assets/img/user/noyhk.png) no-repeat;
			background-position: top center;
			background-size:cover;
			padding-bottom:140px;
		}
		.wrappermain{
			margin: 40px 0 50px;
			.list{
				.yhk{
					display: block;
					.yhk-top{

						font-size: 16px;
						overflow:hidden;
						.icon{
							font-size: 14px;
							float:right;

							width: 35%;
							overflow: hidden;

							*{
								float: left;
							}
						}
					}
					.yhk-bottom{

						overflow:hidden;
						padding: 7px 0;
						span{
							float: left;
							font-size:14px ;
							line-height: 25px;
						}
						.icon{
							font-size: 14px;
							float:right;
							width: 25%;
							padding-right: 10%;
							overflow: hidden;
							label{
								padding: 0 5px;
								float: left;
								margin-top: 2px;
							}
							i{
								font-size: 18px;
								float: left;
							}
						}
					}
				}
			}
		}
		.bottom{
			display: block;
			width: 100%;
			min-width: 320px;
			max-width: 640px;
			margin: 0 auto;
			color: white;
			font-size: 16px;
			line-height: 50px;
			text-align: center;
			background: #f3981e;
			position: fixed;
			bottom:0;
		}
	}
	.radioTest{
		color: #000000;
		input+div{
			width: 15px;
			height: 15px;
			margin: 4px 0 ;
			box-sizing: border-box;
			border: 2px solid #000000;
			border-radius: 50%;

		}
		input+div+span{
			padding: 0 5px;
			margin-top: 2px;
		}
		input:checked + div{
			border:none;
			background: url(../../assets/img/user/check.png) no-repeat;
			background-size: cover;

		}
		.active {
			border:none;
			background: url(../../assets/img/user/check.png) no-repeat;
			background-size: cover;
		}
		input:checked + div+span{
			color: #ff6000;
		}
	}
</style>
