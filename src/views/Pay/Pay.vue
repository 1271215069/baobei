<template>
    <div class="pay">
        <group class="payGroup">
            <cell title="订单编号" :value="orderid"></cell>
            <cell title="支付金额" :value="amount" class="money"></cell>
        </group>
        <group>
            <cell title="支付方式"></cell>
            <radio :options="radio003" @on-change="change" :value="airforce.Order_pay"></radio>
        </group>
        <box>
            <x-button type="primary" class="HomeXbutton"  @click.native="toPay">确认支付</x-button>
        </box>
    </div>
</template>

<script>
    import { Group, Cell, Radio, Box, XButton } from "vux"
    import { mapActions, mapGetters } from "vuex"
    export default {
        name: "pay",
        components:{
            Group, Cell, Radio, Box, XButton
        },
        data(){
            return {
                radio003: [{
                    icon: require("@/assets/img/pay/zfb.png"),
                    key: 'alipay',
                    value: '支付宝'
                }, {
                    icon: require("@/assets/img/pay/wx.png"),
                    key: 'wxpay',
                    value: '微信'
                }],
                channel:null,
                w:null,
                PAYSERVER:'http://demo.dcloud.net.cn/payment/?payid=',
            }
        },
        methods:{
            ...mapActions(["action"]),
            change (value, label) {
                this.action({
                    moduleName:'Order_pay',
                    goods:value
                });
            },
            toPay() {
                let id = this.airforce.Order_pay;

                if(this.w){return;}//检查是否请求订单中
                var url=this.PAYSERVER;
                if(id=='alipay'||id=='wxpay'){
                    url+=id;
                }else{
                    plus.nativeUI.alert('当前环境不支持此支付通道！', null, '');
                    return;
                }
                var appid=plus.runtime.appid;
                if(navigator.userAgent.indexOf('StreamApp')>=0){
                    appid='Stream';
                }
                url+='&appid='+appid+'&total=';

                this.w=plus.nativeUI.showWaiting();
                // 请求支付订单
                var amount = "1";
                var xhr=new XMLHttpRequest();
                xhr.onreadystatechange=()=>{
                    switch(xhr.readyState){
                        case 4:
                            this.w.close();this.w=null;
                            if(xhr.status==200){
                                var order=xhr.responseText;
                                plus.payment.request(this.pays[id],order,(result)=>{
                                    plus.nativeUI.alert('支付成功。',function(){
                                        back();
                                    });
                                },function(e){
                                    plus.nativeUI.alert('请再次尝试，或联系客服', null, '支付失败：'+e.code);
                                });
                            }else{
                                plus.nativeUI.alert('获取订单信息失败！', null, '捐赠');
                            }
                            break;
                        default:
                            break;
                    }
                }
                xhr.open('GET',url+amount);
                xhr.send();
            }
        },
        computed:{
            ...mapGetters(['airforce']),
            pays(){
                return pays;
            },
            orderid(){
                try {
                    if(this.airforce.selectOrder.orderid){
                        return this.airforce.selectOrder.orderid;
                    }
                }catch (e){}
                return "-"
            },
            amount(){
                try {
                    if(this.airforce.selectOrder.amount){
                        return "￥"+this.airforce.selectOrder.amount;
                    }
                }catch (e){}
                return "￥0.00"
            }
        },
        mounted(){
            if(!this.airforce.Order_pay){
                this.action({
                    moduleName:'Order_pay',
                    goods:'alipay'
                })
            };
        }
    }
</script>

<style scoped lang="less">
.pay{
    &/deep/ .payGroup{
        .money{
            .weui-cell__ft{
                color: #f00;
            }
        }
    }
    .HomeXbutton{
        width: 80%;
        border: none;
        border-radius: 10px;
        overflow: hidden;
        background-color: #f19820;
        color: #fff;
        margin-top: 40px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.09);
        margin-bottom: 100px;
        &:active {
            border-color: rgba(241, 152, 32, 0.6) !important;
            background-color: rgba(241, 152, 32, 0.6) !important;
        }
        &:after{
            border: none;
        }
    }
}
</style>