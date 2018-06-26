<template>
    <div class="OrderDetails">
        <card class="orderCard">
            <div slot="header" class="orderCardHeader">
                <div class="left">
                    <span  class="iconfont">&#xe62b;</span>
                    {{airforce.selectOrder.plate}}</div>
            </div>
            <div slot="content" class="orderCardContent">
                <flexbox>
                    <flexbox-item>
                        <div>车主姓名：{{airforce.selectOrder.name}}</div>
                        <div>分期总金额：{{airforce.selectOrder.amount}}</div>
                    </flexbox-item>
                    <flexbox-item>
                        <div>申请时间：{{airforce.selectOrder.createtime | dateFormat('YYYY.MM.DD',true)}}</div>
                        <div>期数：{{airforce.selectOrder.periods}}</div>
                    </flexbox-item>
                </flexbox>
            </div>
        </card>
        <timeline class="OrderDetails-timeline">
            <timeline-item v-for="(item,i) in log" :key="i">
                <h4 class="recent">【{{item.title}}】{{item.content}}</h4>
                <p class="recent">{{item.createtime| dateFormat('YYYY-MM-DD HH:mm:ss',true)}}</p>
            </timeline-item>
        </timeline>
        <!--<div class="editor">-->
            <!--这里是图文编辑显示区域-->
        <!--</div>-->
        <div class="footerBtns">
            <!--<x-button plain mini v-if="status == '40'" @click.native="toPay">支付手续费</x-button>-->
            <x-button plain mini v-if="status == '20'" @click.native="editor">修改期数</x-button>
            <x-button plain mini v-if="status == '30'" @click.native="editor">去修改</x-button>
            <a href="tel:0574-87919382" class="tel">联系客服</a>
        </div>
    </div>
</template>

<script>
    import { Card, Flexbox, FlexboxItem, Timeline, TimelineItem, XButton } from  "vux"
    import  { mapActions, mapGetters } from "vuex"
    export default {
        name: "order-details",
        components:{
            Card, Flexbox, FlexboxItem, Timeline, TimelineItem, XButton
        },
        data(){
            return {
            }
        },
        methods:{
            ...mapActions(['action']),
            editor(){
                this.$router.push("/app/HomeLayout/selectType?editor=true");
            },
            toPay(){
                this.$router.push("/app/HomeLayout/pay");
            }
        },
        mounted(){
            this.action({
                moduleName:'orderdetail_post',
                method:'post',
                url:"app/order/orderdetail",
                isFormData:true,
                data:{
                    uid:this.airforce.login_post.data.uid,
                    token:this.airforce.login_post.data.token,
                    orderid:this.airforce.selectOrder.orderid,
                },
            }).then(res=>{
                if(res.code != 200){
                    this.$vux.toast.text(res.message);
                    return;
                };
            }).catch(err=>{
                this.$vux.toast.text(err);
            });
        },
        computed:{
            ...mapGetters(['airforce']),
            log(){
                try {
                    if(this.airforce.orderdetail_post.data.log){
                        return this.airforce.orderdetail_post.data.log;
                    }
                }catch (e){}
                return [];
            },
            status(){
                try {
                    if( this.airforce.orderdetail_post.data.status){
                        return this.airforce.orderdetail_post.data.status;
                    }
                }catch (e){}
                return null
            }
        },
    }
</script>

<style scoped lang="less">
    .OrderDetails{
        padding-bottom: 80px;
        .orderCard{
            .orderCardHeader{
                font-size: 18px;
                padding: 0 15px;
                border-bottom: 1px solid #e5e5e5;
                line-height: 40px;
                .left{
                    .iconfont{
                        color: #fb7f1a;
                    }
                }
                .right{
                    color: #fb7f1a;
                    &.success{
                        color: #1aad19;
                    }
                    &.err{
                        color: #f00;
                    }
                }
            }
            .orderCardContent{
                .orderCardHeader;
                font-size: 14px;
                line-height: 30px;
                border: none;
                padding-top: 10px;
                padding-bottom: 20px;
            }
        }
        &/deep/ .OrderDetails-timeline{
            background-color: #ffffff;
            margin-top: 10px;
            padding-bottom: 50px;
            .vux-timeline-item-tail{
                background-color: #f3981e;
            }
            .vux-timeline-item-color{
                .vux-timeline-item-tail;
            }
            .vux-timeline-item-content{
                font-size: 12px;
                h4{
                    color: #f3981e;
                }
                p{
                    color: #f3981e;
                }
            }
        }
        .editor{
            min-height: 50px;
        }
        .footerBtns{
            text-align: right;
            position: fixed;
            right: 0;
            bottom: 0;
            background-color: #ededed;
            width: 100%;
            padding-bottom: 10px;
            z-index: 1000;
            padding-right: 15px;
            .weui-btn_plain-default{
                color: #f3981e;
                border: 1px solid #f3981e;
                margin-left: 15px;
                margin-top: 15px;
            }
            .tel{
                position: relative;
                border-radius: 5px;
                display: inline-block;
                padding: 0 1.32em;
                line-height: 2.3;
                font-size: 13px;
                .weui-btn_plain-default;
                color: #f3981e;
                text-decoration: none;
                outline: medium;
            }
        }
    }
    @media (max-width: 320px) {
        .OrderDetails{
            .orderCard{
                .orderCardContent{
                    font-size: 12px;
                }
            }
        }
    }
</style>