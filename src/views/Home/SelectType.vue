<template>
    <div class="SelectType">
        <div class="bj"></div>
        <img :src="banner" class="banner">
        <div class="SelectTypeCard">
            <div class="header">分期总金额：￥{{amount}}</div>
            <flexbox>
                <flexbox-item v-for="(item,index) in instalment" :key="index" :class="(item.select)?'select':''" @click.native="SelectTypeCardObj(item,index)">
                    <div class="flex-demo-top">
                        ￥{{item.money}}X{{item.periods}}期
                    </div>
                    <div class="flex-demo-bottom">
                        （{{item.percent}}%手续费）
                    </div>
                    <span class="iconfont" v-if="item.select">&#xe717;</span>
                </flexbox-item>
            </flexbox>
        </div>
        <img :src="renzheng" class="renzheng animated fadeInUp" @click="homeSubmitNext">
    </div>
</template>

<script>
    import { FormPreview, Flexbox, FlexboxItem } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "select-type",
        data(){
            return {
                banner:require('@/assets/img/home/img_fenqi_bg.png'),
                renzheng:require('@/assets/img/home/renzheng.png'),
                SelectType:null
            }
        },
        created(){
           this.action({
               moduleName:"bodyStyle",
               goods:{

               }
           });
        },
        methods: {
            ...mapActions(['action']),
            SelectTypeCardObj(e,i){
                let SelectTypeCopy = JSON.parse(JSON.stringify(this.instalment));
                let SelectTypeCopy2 = SelectTypeCopy.map(j=>{
                    j.select = false;
                    return j;
                });
                SelectTypeCopy2[i].select = true;
                e.select = true;
                this.SelectType = SelectTypeCopy2;
                this.action({
                    moduleName:"homeSubmit",
                    goods:{
                        SelectType:e,
                    }
                });
            },
            homeSubmitNext(){
                let orderid = '';
                if(this.$router.currentRoute.query.editor == "true"){
                    orderid = this.airforce.getperiods.data.orderid
                }else {
                    orderid = this.airforce.home_post.data.orderid;
                }
                this.$store.commit('updateLoadingStatus', {isLoading: true})
                this.action({
                    moduleName:"SelectType_post",
                    method:"post",
                    url:"app/installment/periods",
                    data:{
                        uid:this.airforce.login_post.data.uid,
                        token:this.airforce.login_post.data.token,
                        orderid:orderid,
                        periods:this.airforce.homeSubmit.SelectType.periods,
                    },
                    isFormData:true,
                }).then(r=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                    if(r.code != 200){
                        this.$vux.toast.text(e.message);
                        return;
                    }else {
                        this.$vux.toast.text("保存成功");
                        if(this.$router.currentRoute.query.editor == "true"){
                            this.$router.push("/app/HomeLayout/upload?editor="+this.$router.currentRoute.query.editor);
                            return;
                        }
                        this.$router.push("/app/HomeLayout/upload");
                    }
                }).catch(r=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false});
                    this.$vux.toast.text(r);
                })
            }
        },
        computed: {
            ...mapGetters(['airforce']),
            amount(){
                try {
                    if(this.$router.currentRoute.query.editor == "true"){
                        return this.airforce.selectOrder.amount
                    }
                    if(this.airforce.home_post.data.amount){
                        return this.airforce.home_post.data.amount;
                    }
                }catch (e){
                    return 0;
                }
                return 0;
            },
            instalmentData(){
                try {
                    if(this.$router.currentRoute.query.editor == "true"){
                        return this.airforce.getperiods.data.instalment
                    };
                    return this.airforce.home_post.data.instalment
                }catch (e){
                    return [];
                }
            },
            instalment(){
                try {
                    if(this.SelectType){
                        return this.SelectType;
                    }
                    if(this.instalmentData){
                        const instalmentData = JSON.parse(JSON.stringify(this.instalmentData));
                        return instalmentData.map((e,i)=>{
                            e.select = false;
                            if(i == 0){
                                e.select = true;
                                this.action({
                                    moduleName:"homeSubmit",
                                    goods:{
                                        SelectType:e,
                                    }
                                });
                            }
                            return e;
                        });
                    }
                }catch (e){
                    return [];
                }
                return [];
            }
        },
        mounted(){
            if(this.$router.currentRoute.query.editor == "true"){
                this.action({
                    moduleName:"getperiods",
                    method:"post",
                    url:"app/installment/getperiods",
                    data:{
                        uid:this.airforce.login_post.data.uid,
                        token:this.airforce.login_post.data.token,
                        orderid:this.airforce.selectOrder.orderid,
                    },
                    isFormData:true,
                }).then(res=>{
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    }
                    try {
                        var fenqicheType = false;
                        if(res.data.cartype == '2'){
                            fenqicheType = true;
                        };
                        this.action({
                            moduleName:"homeSubmit",
                            goods:{
                                fenqicheType:fenqicheType
                            }
                        })
                    }catch (e){}
                }).catch(err=>{
                    this.$vux.toast.text(err);
                })
            };
        },
        components:{
            FormPreview, Flexbox, FlexboxItem
        }
    }
</script>
<style scoped lang="less">
    .SelectType{
        .bj{
            &:before{
                content: '';
                position: fixed;
                width: 100%;
                height: 100%;
                background-color: #fb7f1a;
                z-index: -1;
            }
        }
        .banner{
            width: 100%;
        }
        .SelectTypeCard{
            width: 92%;
            margin: auto;
            background-color: rgba(255,255,255,0.3);
            padding: 0 5px 20px 5px;
            .header{
                width: 90%;
                margin: auto;
                border-bottom: 1px solid #fff;
                line-height: 40px;
                color: #ffffff;
                margin-bottom: 20px;
            }
            .vux-flexbox{
                .vux-flexbox-item{
                    background-color: #ffffff;
                    text-align: center;
                    padding:20px 5px;
                    .flex-demo-top{
                        font-size: 0.8em;
                    }
                    .flex-demo-bottom{
                        font-size: 0.01em;
                    }
                    &.select{
                        border:1px solid #c27423;
                        position: relative;
                        .iconfont{
                            color: #c27423;
                            font-size: 30px;
                            position: absolute;
                            right: 0;
                            bottom: 39px;
                            width: 30px;
                            height: 0;
                            display: block;
                            text-align: right;
                        }
                    }
                }
            }

        }
        .renzheng{
            width: 50%;
            margin: auto;
            display: block;
            margin-top: 20px;
            margin-bottom: 50px;
        }
    }
</style>