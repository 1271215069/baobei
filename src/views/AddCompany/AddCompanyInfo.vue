<template>
    <div class="AddCompanyInfo">
        <group>
            <x-input label-width="100px" title="企业名称" placeholder="请输入企业名称" :value="airforce.AddCompanyInfo.cname" @on-change="airforce.change.set($event,'cname','AddCompanyInfo')"></x-input>
            <x-input label-width="100px" title="法人代表" placeholder="请输入企业法人姓名" :value="airforce.AddCompanyInfo.name" @on-change="airforce.change.set($event,'name','AddCompanyInfo')"></x-input>
            <x-input label-width="100px" title="手机号码" type="number" placeholder="请输入银行卡绑定的手机号" :value="airforce.AddCompanyInfo.phone" @on-change="airforce.change.set($event,'phone','AddCompanyInfo')"></x-input>
            <!--<x-input label-width="100px" title="紧急联系人1" placeholder="请输入联系人姓名" :value="airforce.AddCompanyInfo.role_name" @on-change="airforce.change.set($event,'role_name','AddCompanyInfo')"></x-input>-->
            <select-picker :data="selectData"
                           title="紧急联系人1"
                           placeholder="请输入联系人姓名"
                           selectPlaceholder="关系"
                           name="role_name"
                           moduleName="AddCompanyInfo"
            >
            </select-picker>
            <x-input label-width="100px" title="手机号1" type="number" placeholder="请输入联系人手机" :value="airforce.AddCompanyInfo.jjphone" @on-change="airforce.change.set($event,'jjphone','AddCompanyInfo')"></x-input>
            <select-picker :data="selectData2"
                           title="紧急联系人2"
                           placeholder="请输入联系人姓名"
                           selectPlaceholder="关系"
                           name="role_2_name"
                           moduleName="AddCompanyInfo"
            >
            </select-picker>
            <!--<x-input label-width="100px" title="紧急联系人2" placeholder="请输入联系人姓名" :value="airforce.AddCompanyInfo.role_2_name" @on-change="airforce.change.set($event,'role_2_name','AddCompanyInfo')"></x-input>-->
            <x-input label-width="100px" title="手机号2" type="number" placeholder="请输入联系人手机" :value="airforce.AddCompanyInfo.jjphone_2" @on-change="airforce.change.set($event,'jjphone_2','AddCompanyInfo')"></x-input>
            <x-img ref="img_1" class="AddCompanyInfo-img" :src="airforce.homeSubmit.AddCompany_bank_card.base64Url"></x-img>
            <x-input label-width="100px" title="银行卡卡号" type="number" placeholder="请输入车主银行卡号" :value="airforce.AddCompanyInfo.cardno" @on-change="airforce.change.set($event,'cardno','AddCompanyInfo')"></x-input>
            <x-img ref="img_" class="AddCompanyInfo-img" :src="airforce.homeSubmit.AddCompany_idcard_front.base64Url"></x-img>
            <x-input label-width="100px" title="身份证号码" placeholder="请输入车主身份证号码" :value="airforce.AddCompanyInfo.idcard" @on-change="airforce.change.set($event,'idcard','AddCompanyInfo')"></x-input>
        </group>
        <box>
            <x-button type="primary" class="HomeXbutton"  @click.native="addCompanyNext">确认</x-button>
        </box>
    </div>
</template>

<script>
    import { XInput, Group, Box, XButton, XImg } from "vux"
    import { mapActions, mapGetters } from "vuex"
    import Utils from "@/utils/utils.js"
    import SelectPicker from "@/components/select.vue"
    export default {
        name: "add-company-info",
        components:{
            XInput, Group, Box, XButton, XImg, SelectPicker
        },
        data(){
            return {
                selectData:[
                    {
                        name: '父亲',
                        value: '1',
                    },
                    {
                        name: '母亲',
                        value: '2',
                    },
                    {
                        name: '配偶',
                        value: '3',
                    },
                    {
                        name: '子女',
                        value: '4',
                    },
                ],
                selectData2:[
                    {
                        name: '同事电话',
                        value: '1',
                    },
                    {
                        name: '单位座机',
                        value: '2',
                    },
                ]
            }
        },
        methods:{
            ...mapActions(['action']),
            addCompanyNext(){
                if(!this.airforce.AddCompanyInfo.cname || this.airforce.AddCompanyInfo.cname.length == 0){
                    this.$vux.toast.text("【企业名称】<br>不能为空");
                    return
                }
                if(!this.airforce.AddCompanyInfo.name || this.airforce.AddCompanyInfo.name.length == 0){
                    this.$vux.toast.text("【法人代表】<br>不能为空");
                    return
                }
                if(!/^[\u4E00-\u9FA5]{2,}$/.test(this.airforce.AddCompanyInfo.name)){
                    this.$vux.toast.text("【法人代表】<br>至少2个中文字符");
                    return
                }
                if(!this.airforce.AddCompanyInfo.phone || this.airforce.AddCompanyInfo.phone.length == 0){
                    this.$vux.toast.text("【手机号码】<br>不能为空");
                    return
                }
                if(!Utils.isPhone(this.airforce.AddCompanyInfo.phone)){
                    this.$vux.toast.text("请输入正确的<br>【手机号码】");
                    return
                }
                if(!this.airforce.AddCompanyInfo.role_name || this.airforce.AddCompanyInfo.role_name.length == 0){
                    this.$vux.toast.text("【紧急联系人1】<br>不能为空");
                    return
                }
                if(!/^[\u4E00-\u9FA5]{2,}$/.test(this.airforce.AddCompanyInfo.role_name)){
                    this.$vux.toast.text("【紧急联系人1】<br>至少2个中文字符");
                    return
                }

                if(!this.airforce.AddCompanyInfo.role_name_SelectTxt){
                    this.$vux.toast.text("请选择【紧急联系人1】关系");
                    return
                }
                if(!this.airforce.AddCompanyInfo.jjphone || this.airforce.AddCompanyInfo.jjphone.length == 0){
                    this.$vux.toast.text("【手机号1】<br>不能为空");
                    return
                }
                if(!Utils.isPhone(this.airforce.AddCompanyInfo.jjphone)){
                    this.$vux.toast.text("请输入正确的<br>【手机号1】");
                    return
                }
                if(!this.airforce.AddCompanyInfo.role_2_name || this.airforce.AddCompanyInfo.role_2_name.length == 0){
                    this.$vux.toast.text("【紧急联系人2】<br>不能为空");
                    return
                }
                if(!/^[\u4E00-\u9FA5]{2,}$/.test(this.airforce.AddCompanyInfo.role_2_name)){
                    this.$vux.toast.text("【紧急联系人2】<br>至少2个中文字符");
                    return
                }
                if(!this.airforce.AddCompanyInfo.role_2_name_SelectTxt){
                    this.$vux.toast.text("请选择【紧急联系人1】关系");
                    return
                }
                if(!this.airforce.AddCompanyInfo.jjphone_2 || this.airforce.AddCompanyInfo.jjphone_2.length == 0){
                    this.$vux.toast.text("【手机号2】<br>不能为空");
                    return
                }
                if(!Utils.isPhone(this.airforce.AddCompanyInfo.jjphone_2)){
                    this.$vux.toast.text("请输入正确的<br>【手机号2】");
                    return
                }
                if(!this.airforce.AddCompanyInfo.cardno || this.airforce.AddCompanyInfo.cardno.length == 0){
                    this.$vux.toast.text("【银行卡卡号】<br>不能为空");
                    return
                }
                if(this.airforce.AddCompanyInfo.cardno.length < 16){
                    this.$vux.toast.text("请输入正确的<br>【银行卡卡号】");
                    return
                }
                if(!this.airforce.AddCompanyInfo.idcard || this.airforce.AddCompanyInfo.idcard.length == 0){
                    this.$vux.toast.text("【身份证号码】<br>不能为空");
                    return
                }
                if(!Utils.isIdCard(this.airforce.AddCompanyInfo.idcard)){
                    this.$vux.toast.text("请输入正确的<br>【身份证号码】");
                    return
                }
                this.$store.commit('updateLoadingStatus', {isLoading: true})
                this.action({
                    moduleName:'AddCompanyInfo_post',
                    method:"POST",
                    isFormData:true,
                    url:'app/Truck/huoche_certification',
                    data:_.merge({
                        uid:this.airforce.login_post.data.uid,
                        token:this.airforce.login_post.data.token,
                        order_no:this.airforce.getOrderNo.data.order_no,
                        role:this.airforce.AddCompanyInfo.role_name_SelectTxt,
                        role_2:this.airforce.AddCompanyInfo.role_2_name_SelectTxt,
                    },this.airforce.AddCompanyInfo)
                }).then(res=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    }
                    this.$vux.toast.text("添加成功");
                    setTimeout(()=>{
                        this.$router.push('/app/HomeLayout/home');
                    },500);
                }).catch(err=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                    this.$vux.toast.text(err);
                });
            }
        },
        computed:{
            ...mapGetters(['airforce'])
        }
    }
</script>

<style scoped lang="less">
.AddCompanyInfo{
    .AddCompanyInfo-img{
        width: 80%;
        display: block;
        margin: auto;
    }
}
</style>