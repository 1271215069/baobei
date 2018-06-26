<template>
    <div class="Pending">
        <div class="bj"></div>
        <flexbox class="Pending-flexbox">
            <flexbox-item class="left">
                <flexbox>
                    <flexbox-item>
                        分期总金额:
                    </flexbox-item>
                    <flexbox-item class="left_right">
                        ￥{{airforce.Authentication_post.data.amount}}
                    </flexbox-item>
                </flexbox>
            </flexbox-item>
            <flexbox-item align="right" span="130" class="right">
                <div class="title">￥{{airforce.Authentication_post.data.money}}X{{airforce.Authentication_post.data.periods}}期</div>
                <div>({{airforce.Authentication_post.data.percent}}%手续费)</div>
            </flexbox-item>
        </flexbox>
        <x-img class="Pending-Ximg" :src="require('@/assets/img/home/pending.png')"></x-img>
        <div class="Pending-h1">实名认证已提交，请等待客服审核</div>
        <div class="Pending-txt1">审核结果，客服会电话联系<br>您，请耐心等待，谢谢！</div>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, XImg } from "vux"
    import { mapActions, mapGetters } from "vuex"
    export default {
        name: "pending",
        components:{
            Flexbox, FlexboxItem, XImg
        },
        methods:{
            ...mapActions(['action']),
        },
        computed:{
            ...mapGetters(['airforce'])
        },
        mounted(){
            this.$vux.toast.show({
                text:"5秒后自动跳转",
                type:"text",
                width:"auto",
                position:"bottom",
            });
            setTimeout(()=>{
                this.$router.push("/app/HomeLayout/order");
            },5000)
        }
    }
</script>

<style scoped lang="less">
.Pending{
    padding-top: 20px;
    .bj{
        &:before{
            content: '';
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            z-index: -1;
        }
    }
    .Pending-flexbox{
        width: 85%;
        margin: auto;
        background-color: #efefef;
        padding: 15px;
        .left{
            font-weight: 600;
            font-size: 16px;
            .left_right{
                color: #f00;
            }
        }
        .right{
            font-size: 12px;
            .title{
                font-size: 14px;
            }
        }
    }
    .Pending-Ximg{
        width: 100%;
    }
    .Pending-h1{
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }
    .Pending-txt1{
        text-align: center;
    }
}
</style>