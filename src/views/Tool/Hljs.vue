<template>
	<div class="wrapper">
		<div class="wrappermain">
			<div to="selectrate" class="sr">
                <div class="event" @click="selectrate(SrData)"></div>
				<i><img :src="SrData.img"/></i>
				<span>
					{{SrData.name}} {{SrData.en}}
				</span>
				<input v-model="num" v-on:input="chamoney" type="text" placeholder="请输入当前货币金额"/>
			</div>
			<div to="selectrate" class="sc" @click="selectrate(ScData)">
				<i><img :src="ScData.img"/></i>
				<span>
					{{ScData.name}} {{ScData.en}}
				</span>
				<span>{{result}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, XInput } from 'vux'
	import { Group, Cell, CellBox } from 'vux'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'hljs',
		data() {
			return {
				result:0,
				paramater:{},
                num:null
			}
		},
		methods: {
			...mapActions(['action']),
			chamoney(){
                let e = this.airforce.login_post;
                this.action({
                    moduleName:'exchangemoney_post',
                    method:'post',
                    url:'app/Truck/exchangemoney',
                    isFormData: true,
                    data:{
                        uid: e.data.uid,
                        token: e.data.token,
                        tomoney:this.SrData.en,
                        frommoney:this.ScData.en,
                        num:this.num
                    }
                }).then(d=>{
                    if(d.code != 200){
                        this.num = null;
                        this.result = 0;
                        this.$vux.toast.text(d.message);
                    };
                    if(d.data &&  d.data.result ){
                        this.result=d.data.result;
                    };
                }).catch(err=>{
                    this.$vux.toast.text(err);
                })
			},
            selectrate(selectrateObj){
                this.action({
                    moduleName:'Tool',
                    goods:{
                         selectrate:selectrateObj
                    }
                });
                this.$router.push('/app/HomeLayout/selectrate')
            }
		}, 
		components: {
			Group,
			Cell,
			CellBox,
			XHeader,
		    Actionsheet,
		    ButtonTab,
		    ButtonTabItem,
            XInput
		},
        computed: {
            ...mapGetters({
                airforce: 'airforce'
            }),
            ScData(){
                if(this.airforce.Tool.ScData){
                    return this.airforce.Tool.ScData;
                }
                return {
                    name:'人民币',
                    en:'CNY',
                    img:`${$$rootUrl}/data/money/CNY.png`,
                    type:'ScData'
                }
            },
            SrData(){
                if(this.airforce.Tool.SrData){
                    return this.airforce.Tool.SrData;
                }
                return {
                    name:'美元',
                    en:'USD',
                    img:`${$$rootUrl}/data/money/USD.png`,
                    type:'SrData'
                }
            }
        },
	}
	
</script>

<style scoped lang="less">
	@font-face {
		font-family: 'iconfont';  /* project id 590408 */
  src: url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.eot');
  src: url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.woff') format('woff'),
  url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.svg#iconfont') format('svg');
	}
	
	.iconfont {
		font-family: "iconfont";
		font-size: 18px;
		font-style: normal;
	}
	
	.active {
		color: #ff7300;
	}
	
	/** {
		margin: 0;
		padding: 0;
	}*/
	
	ol,
	ul,
	li {
		list-style: none;
	}
	input:focus{
		outline: none;
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
			.back{
				position: absolute;
				display: block;
				width: 30px;
				height: 30px;
				top: 9px;
				
				left:13px;
			}
			.back:after{
				content: "";
				display: block;
				position: absolute;
				width: 12px;
				height: 12px;
				transform:rotate(315deg);
				border:1px solid white;
				border-width:1px 0 0 1px;
				top: 8px;
				left:7px;
			}
			&/deep/ .vux-header-left {
				.left-arrow {
					width: 0;
					height: 0;
					
					&:before {
						width: 0;
					height: 0;
						border: none;
					}
				}
			}
		}
		.wrappermain{
			margin-top: 40px;
			.sr{
				display: block;
				padding:10px 15px;
				border-top:1px solid #D9D9D9;
				border-bottom:1px solid #D9D9D9;
				position:relative;
				margin-bottom:5px;
				i{
					width: 20px;
					height: 20px;
					display: inline-block;
					float: left;
					line-height: 30px;
					img{
						width: 100%;
					}
				}
				span{
					line-height: 30px;
					font-size: 18px;
					padding-left:5%;
				}
				input{
					display: block;
					line-height: 30px;
					width: 40%;
					margin: 10px 0 0 45%;
					padding: 0 3px;
                    position: relative;
                    z-index: 2;
				}
                .event{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                }
			}
			.sr:after{
				content: "";
				display: inline-block;
				height: 6px;
				width: 6px;
				border-width: 2px 2px 0 0;
				border-color: #D9D9D9;
				border-style: solid;
				transform:matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
				position: absolute;
				top: 50%;
				margin-top: -4px;
				right: 17px;
			}
			
			
			.sc{
				display: block;
				padding:10px 15px;
				border-top:1px solid #D9D9D9;
				border-bottom:1px solid #D9D9D9;
				position:relative;
				i{
					width: 20px;
					height: 20px;
					display: inline-block;
					float: left;
					line-height: 30px;
					img{
						width: 100%;
					}
				}
				i+span{
					line-height: 30px;
					font-size: 18px;
					padding-left:5%;
				}
				i+span+span{
					display: block;
					line-height: 30px;
					
					margin: 10px 0 0 75%;
					color: #fe7f19;
					font-size: 18px;
				}
			}
			.sc:after{
				content: "";
				display: inline-block;
				height: 6px;
				width: 6px;
				border-width: 2px 2px 0 0;
				border-color: #D9D9D9;
				border-style: solid;
				transform:matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
				position: absolute;
				top: 50%;
				margin-top: -4px;
				right: 17px;
			}
			
		}
	}
</style>