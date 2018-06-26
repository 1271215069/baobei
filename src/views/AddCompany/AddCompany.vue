<template>
    <div class="AddCompany">
        <images-upload :prefix="prefix" :orderNo="orderNo" :url="url" :ossUrl="ossUrl" inputOfFile="idcard_front" text="上传企业法人身份证正面照片" toastText="身份证正面"></images-upload>
        <images-upload :prefix="prefix" :orderNo="orderNo" :url="url" :ossUrl="ossUrl" inputOfFile="idcard_back" text="上传企业法人身份证反面照片" toastText="身份证反面"></images-upload>
        <images-upload :prefix="prefix" :orderNo="orderNo" :url="url" :ossUrl="ossUrl" inputOfFile="bank_card" text="上传对公账户的借记卡正面照片" toastText="借记卡正面照片"></images-upload>
        <box>
            <x-button type="primary" class="HomeXbutton"  @click.native="addCompanyNext">下一步</x-button>
        </box>
    </div>
</template>

<script>
    import ImagesUpload from "@/components/ImagesUpload.vue"
    import { mapActions, mapGetters } from "vuex"
    import { Box, XButton } from "vux"
    export default {
        name: "add-company",
        components:{
            ImagesUpload, Box, XButton
        },
        data(){
            return {
                url:`${$$rootUrl}app/Truck/upphoto`,
                orderNo:null,
                prefix:'AddCompany_',
                ossUrl:`app/Truck/upcardphone`
            }
        },
        methods:{
            ...mapActions(['action']),
            addCompanyNext(){
                if(!this.airforce.homeSubmit.AddCompany_idcard_front){
                    this.$vux.toast.text("请先身份证正面");
                    return;
                }
                if(!this.airforce.homeSubmit.AddCompany_idcard_back){
                    this.$vux.toast.text("请先身份证反面");
                    return;
                }
                if(!this.airforce.homeSubmit.AddCompany_bank_card){
                    this.$vux.toast.text("请先借记卡正面照片");
                    return;
                }
                this.$router.push('/app/HomeLayout/addcompanyinfo');
            }
        },
        computed:{
            ...mapGetters(['airforce'])
        },
        mounted(){
            this.action({
                moduleName:"layout",
                goods:{
                    marquee:"上传的证件照必须为原件拍摄，并且真实有效。如有造假，不予通过！"
                }
            });
            this.action({
                moduleName:'getOrderNo',
                method:"POST",
                isFormData:true,
                url:'app/Truck/order_no',
                data:{
                    uid:this.airforce.login_post.data.uid,
                    token:this.airforce.login_post.data.token,
                }
            }).then(res=>{
                if(res.code != 200){
                    this.$vux.toast.text(res.message);
                    return;
                }
                if(res.data && res.data.order_no){
                    this.orderNo = res.data.order_no
                }
            }).catch(err=>{
                this.$vux.toast.text(err);
            })
        }
    }
</script>

<style scoped lang="less">
.AddCompany{

}
</style>