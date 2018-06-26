<template>
    <div class="order">
        <div v-if="notOrder" class="notOrder ">
            <div class="iconfont">&#xe644;</div>
            <div class="txt">暂无订单</div>
        </div>
        <div v-else>
            <card v-for="(item,index) in orderlist" :key="index" :class="`orderCard animated ${(index > 6) ? 'fadeInUp' : ''}`">
                <div slot="header" class="orderCardHeader" @click="selectOrder(item)">
                    <flexbox>
                        <flexbox-item>
                            <div class="left">
                                <span  class="iconfont">&#xe62b;</span>
                                {{item.plate}}
                            </div>
                        </flexbox-item>
                        <flexbox-item align="right">
                            <div :class="item.status | orderStatus">{{item.title}}</div>
                        </flexbox-item>
                    </flexbox>
                </div>
                <div slot="content" class="orderCardContent">
                    <div @click="selectOrder(item)">
                        <div>车主姓名：{{item.name}}</div>
                        <div>申请时间：{{ item.createtime | dateFormat('YYYY.MM.DD',true)}}</div>
                        <div>分期总金额：{{item.amount}}</div>
                    </div>
                    <flexbox class="HomeXbuttonBox">
                        <flexbox-item @click.native="selectOrder(item)">期数：{{item.periods}}</flexbox-item>
                        <flexbox-item>
                            <x-button @click.native="delOrder(item)" mini class="HomeXbutton" v-if="item.status == '0'">删除</x-button>
                        </flexbox-item>
                    </flexbox>
                </div>
                <div slot="footer" class="orderCardFooter" @click="selectOrder(item)">
                    查看更多
                </div>
            </card>
            <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
            <span slot="no-more">
              <divider>我是有底线的</divider>
            </span>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
    import { Card, Flexbox, FlexboxItem, Divider, XButton } from  "vux"
    import  { mapActions, mapGetters } from "vuex"
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: "order",
        components:{
          Card, Flexbox, FlexboxItem, Divider, InfiniteLoading, XButton
        },
        data(){
            return {
                notOrder:false,
                list:[],
                page:1,
                pagesize:15,
                orderlist:[]
            }
        },
        methods:{
            ...mapActions(['action']),
            infiniteHandler($state) {
                setTimeout(()=>{
                    this.action({
                        moduleName:'orderlist_post',
                        method:'post',
                        url:"app/order/orderlist",
                        isFormData:true,
                        data:{
                            uid:this.airforce.login_post.data.uid,
                            token:this.airforce.login_post.data.token,
                            page:this.page,
                            pagesize:this.pagesize,
                        },
                    }).then(res=>{
                        if (res.code != 200) {
                            this.$vux.toast.text(res.message);
                            return;
                        };
                        if (res.data &&  res.data.length == 0) {
                            this.notOrder = true;
                        }else {
                            this.notOrder = false;
                        };
                        this.page += 1;
                        if($state){
                            $state.loaded();
                        }
                        if(res.data){
                            if(res.data.length > 0){
                                this.orderlist = this.orderlist.concat(this.airforce.orderlist_post.data);
                            }else {
                                if($state){
                                    $state.complete();
                                }
                            }
                        }else {
                            if($state){
                                $state.complete();
                            }
                        };
                    }).catch(err=>{
                        this.$vux.toast.text(err);
                        if($state){
                            $state.loaded();
                            $state.complete();
                        }
                    });
                },500);
            },
            selectOrder(selectOrderObj){
                this.action({
                    moduleName:'selectOrder',
                    goods:selectOrderObj
                });
                if(selectOrderObj.status != '0'){
                    this.$router.push("/app/HomeLayout/orderdetails");
                }else {
                    //清除缓存图片
                    this.action({
                        moduleName:'homeSubmit',
                        goods:{
                            upload_bank_card:null,
                            upload_idcard_back:null,
                            upload_idcard_front:null,
                            upload_payment_slip:null,
                            upload_safe_no:null,
                            upload_vehicle_license:null,
                            upload_payment_slip1:null,
                            upload_payment_slip2:null,
                            upload_payment_slip3:null,
                            upload_payment_slip4:null,
                            upload_payment_slip5:null,
                            upload_payment_slip6:null,
                            upload_payment_slip7:null,
                            upload_payment_slip8:null,
                            upload_payment_slip9:null,
                            upload_vehicle_license1:null,
                            upload_vehicle_license2:null,
                            upload_vehicle_license3:null,
                            upload_vehicle_license4:null,
                            upload_vehicle_license5:null,
                            upload_vehicle_license6:null,
                            upload_vehicle_license7:null,
                            upload_vehicle_license8:null,
                            upload_vehicle_license9:null,
                        }
                    });
                    this.$router.push("/app/HomeLayout/selectType?editor=true");
                };
            },
            delOrder(e){
                this.$vux.confirm.show({
                    title:"温馨提示",
                    content:"确定删除该订单吗？",
                    onConfirm:()=>{
                        this.action({
                            moduleName:'orderdel_post',
                            method:'post',
                            url:"app/order/orderdel",
                            isFormData:true,
                            data:{
                                uid:this.airforce.login_post.data.uid,
                                token:this.airforce.login_post.data.token,
                                orderid:e.orderid,
                            },
                        }).then(res=>{
                            if (res.code != 200) {
                                this.$vux.toast.text(res.message);
                                return;
                            };
                            this.$vux.toast.text("删除成功");
                            this.page = 1;
                            this.orderlist = [];
                            this.infiniteHandler();
                        }).catch(err=>{
                            this.$vux.toast.text(err);
                        });
                    }
                });
            }
        },
        computed:{
            ...mapGetters(['airforce'])
        },
        mounted(){
            // this.infiniteHandler();
        }
    }
</script>

<style scoped lang="less">
.order{
    .notOrder{
        text-align: center;
        position: absolute;
        left: 0;
        top: 40%;
        top: calc((100% - 120px ) / 2);
        width: 100%;
        .iconfont{
            display: inline-block;
            color: #ffffff;
            width: 80px;
            height: 80px;
            border-radius: 100%;
            background-color:#fbe9da;
            text-align: center;
            line-height: 80px;
            font-size: 60px;
        }
        .txt{
            color: #999;
            font-size: 12px;
            line-height: 40px;
        }
    }
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
        }
        .orderCardFooter{
            text-align: center;
            padding: 0 15px;
            line-height: 40px;
            color: #999;
        }
    }
    .HomeXbuttonBox{
        margin-bottom: 15px;
    }
    .HomeXbutton{
        border: none !important;
        border-radius: 10px !important;
        overflow: hidden !important;
        background-color: #f19820 !important;
        color: #fff !important;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.09) !important;
        float: right !important;
        margin: 0 !important;
        width: auto !important;
        &:active {
            border-color: rgba(241, 152, 32, 0.6) !important;
            background-color: rgba(241, 152, 32, 0.6) !important;
        }
        &:after{
            border: none !important;
        }
    }
}
</style>