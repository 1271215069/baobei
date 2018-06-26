<template>
    <div class="Upload">
        <images-upload inputOfFile="idcard_front" text="上传身份证正面" toastText="身份证正面" :off="idcard_front"></images-upload>
        <images-upload inputOfFile="idcard_back" text="上传身份证反面" toastText="身份证反面" :off="idcard_back"></images-upload>
        <images-upload inputOfFile="vehicle_license" text="上传行驶证正页/购车发票/车辆登记证书" text2="(三选一)" toastText="三选一"></images-upload>
        <images-upload inputOfFile="bank_card" text="上传还款的借记卡" toastText="还款的借记卡" :off="bank_card"></images-upload>
        <images-upload inputOfFile="payment_slip" text="上传投保人变更凭证" toastText="投保人变更凭证"></images-upload>
        <images-upload inputOfFile="safe_no" text="上传保险公司的收款账号" toastText="保险公司的收款账号"></images-upload>
        <x-switch class="homeXSwitch" title="是否上传额外附件" v-model="is_more"></x-switch>
        <div :class="(!is_more) ? 'is_more' : ''">
            <images-upload v-for="i in 9" :key="i" :inputOfFile="'vehicle_license'+i" :text="'额外的行驶证图片'+i" toastText="行驶证图片"></images-upload>
            <images-upload v-for="i in 9" :key="i+'A'" :inputOfFile="'payment_slip'+i" :text="'额外的缴费单'+i" toastText="缴费单"></images-upload>
        </div>
        <!--<images-upload inputOfFile="other_img" :type="2" toastText="其它" :src="require('@/assets/img/home/addUpload.png')" title="其它上传(选填)" name="upload_account"></images-upload>-->
        <box>
            <x-button type="primary" class="HomeXbutton"  @click.native="homeSubmitNext">确认上传</x-button>
        </box>
    </div>
</template>

<script>
    import ImagesUpload from "@/components/ImagesUpload.vue"
    import { mapActions, mapGetters } from 'vuex'
    import {Box, XButton, XSwitch } from 'vux'
    export default {
        name: "upload",
        data(){
            return {
                url:'http://egretloan.img-cn-qingdao.aliyuncs.com/',
                is_more:false,
            }
        },
        methods: {
            ...mapActions(['action']),
            go(){
                if(this.$router.currentRoute.query.editor == "true"){
                    this.$router.push("/app/HomeLayout/authentication?editor="+this.$router.currentRoute.query.editor);
                    return;
                }
                this.$router.push("/app/HomeLayout/authentication")
            },
            homeSubmitNext(){
                if(!this.airforce.homeSubmit.upload_idcard_front ||
                    !this.airforce.homeSubmit.upload_idcard_front.bool ){
                    this.$vux.toast.text("请上传身份证正面");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_idcard_back ||
                    !this.airforce.homeSubmit.upload_idcard_back.bool ){
                    this.$vux.toast.text("请上传身份证反面");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_vehicle_license ||
                    !this.airforce.homeSubmit.upload_vehicle_license.bool ){
                    this.$vux.toast.text("请上传三选一");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_bank_card ||
                    !this.airforce.homeSubmit.upload_bank_card.bool ){
                    this.$vux.toast.text("请上传还款借记卡");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_payment_slip ||
                    !this.airforce.homeSubmit.upload_payment_slip.bool ){
                    this.$vux.toast.text("请上传投保人变更凭证");
                    return;
                }else
                if(!this.airforce.homeSubmit.upload_safe_no ||
                    !this.airforce.homeSubmit.upload_safe_no.bool ){
                    this.$vux.toast.text("请上传保险公司收款账号");
                    return;
                }
                let orderid = '';
                if(this.$router.currentRoute.query.editor == "true"){
                    orderid = this.airforce.getperiods.data.orderid
                }else {
                    orderid = this.airforce.home_post.data.orderid;
                }
                //判断额外图片上传
                if(this.is_more &&
                    (
                        this.airforce.homeSubmit.upload_payment_slip1 ||
                        this.airforce.homeSubmit.upload_payment_slip2 ||
                        this.airforce.homeSubmit.upload_payment_slip3 ||
                        this.airforce.homeSubmit.upload_payment_slip4 ||
                        this.airforce.homeSubmit.upload_payment_slip5 ||
                        this.airforce.homeSubmit.upload_payment_slip6 ||
                        this.airforce.homeSubmit.upload_payment_slip7 ||
                        this.airforce.homeSubmit.upload_payment_slip8 ||
                        this.airforce.homeSubmit.upload_payment_slip9 ||
                        this.airforce.homeSubmit.upload_vehicle_license1 ||
                        this.airforce.homeSubmit.upload_vehicle_license2 ||
                        this.airforce.homeSubmit.upload_vehicle_license3 ||
                        this.airforce.homeSubmit.upload_vehicle_license4 ||
                        this.airforce.homeSubmit.upload_vehicle_license5 ||
                        this.airforce.homeSubmit.upload_vehicle_license6 ||
                        this.airforce.homeSubmit.upload_vehicle_license7 ||
                        this.airforce.homeSubmit.upload_vehicle_license8 ||
                        this.airforce.homeSubmit.upload_vehicle_license9
                    )
                ){
                    this.action({
                        moduleName:'is_more_post',
                        url:'app/installment/is_more',
                        method:'post',
                        isFormData:true,
                        data:{
                            uid:this.airforce.login_post.data.uid,
                            token:this.airforce.login_post.data.token,
                            orderid:orderid,
                            is_more:1
                        },
                    }).then(res=>{
                        if(res.code != 200){
                            this.$vux.toast.text(res.message);
                            return;
                        }
                        this.go();
                    }).catch(err=>{
                        this.$vux.toast.text(err);
                    });
                }else {
                    this.go();
                }
            }
        },
        computed: {
            ...mapGetters(['airforce']),
            uploadOld(){
                try {
                    if(typeof this.airforce.SelectType_post.data == "object"){
                        return this.airforce.SelectType_post.data;
                    }
                }catch (e){}
                return [];
            },
            idcard_front(){
                var data = this.airforce.SelectType_post.data;
                if(data && data.idcard_front && data.cartype == '2'
                ){
                    return  this.url + data.idcard_front;
                };
                return null;
            },
            idcard_back(){
                var data = this.airforce.SelectType_post.data;
                if(data && data.idcard_back && data.cartype == '2'
                ){
                    return  this.url + data.idcard_back;
                };
                return null;
            },
            bank_card(){
                var data = this.airforce.SelectType_post.data;
                if(data && data.bank_card && data.cartype == '2'
                ){
                    return  this.url + data.bank_card;
                };
                return null;
            }
        },
        mounted(){
            this.action({
                moduleName:"layout",
                goods:{
                    marquee:"上传的证件照必须为原件拍摄，并且真实有效。如有造假，不予通过！"
                }
            })
        },
        components:{
            ImagesUpload, Box, XButton, XSwitch
        },
    }
</script>

<style scoped lang="less">
    .Upload{
        padding-top: 1px;
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
        .homeXSwitch{
            &/deep/ .weui-cell__ft{
                position: relative;
                .weui-switch{
                    &:checked{
                        border-color: #f38431;
                        background-color: #f38431;
                    }
                }
            }
        }
        .is_more{
            display: none;
        }
    }
</style>