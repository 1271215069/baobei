<template>
    <div class="Authentication">
        <group>
            <div class="disabled" v-if="airforce.homeSubmit.fenqicheType"></div>
            <x-input :value="airforce.homeSubmit.auth_name" @on-change="airforce.change.set($event,'auth_name','homeSubmit')" label-width="100px" title="姓名" placeholder="请输入车主姓名"></x-input>
            <x-input :value="airforce.homeSubmit.auth_phone" @on-change="airforce.change.set($event,'auth_phone','homeSubmit')" label-width="100px" title="手机号码" placeholder="请输入车主银行卡绑定手机号"></x-input>
            <select-picker :data="selectData"
                           title="紧急联系人1"
                           placeholder="请输入联系人姓名"
                           selectPlaceholder="关系"
                           name="auth_linkman1"
                           moduleName="homeSubmit"
                           >
            </select-picker>
            <x-input :value="airforce.homeSubmit.auth_linkman1_phone" @on-change="airforce.change.set($event,'auth_linkman1_phone','homeSubmit')" label-width="100px" title="联系人1手机" placeholder="请输入紧急联系人1的手机号"></x-input>
            <select-picker :data="selectData2"
                           title="紧急联系人2"
                           placeholder="请输入联系人姓名"
                           selectPlaceholder="关系"
                           name="auth_linkman2"
                           moduleName="homeSubmit"
            >
            </select-picker>
            <x-input :value="airforce.homeSubmit.auth_linkman2_phone" @on-change="airforce.change.set($event,'auth_linkman2_phone','homeSubmit')" label-width="100px" title="联系人2手机" placeholder="请输入紧急联系人2的手机号"></x-input>
            <x-img class="seeImg" ref="img_1" :src="url + airforce.SelectType_post.data.bank_card"></x-img>
            <x-input type="number" :value="airforce.homeSubmit.auth_bankCode" @on-change="airforce.change.set($event,'auth_bankCode','homeSubmit')" label-width="100px" title="银行卡卡号" placeholder="请输入车主银行卡"></x-input>
            <x-img class="seeImg" ref="img_2" :src="url + airforce.SelectType_post.data.idcard_front"></x-img>
            <x-input :value="airforce.homeSubmit.auth_idCode" @on-change="airforce.change.set($event,'auth_idCode','homeSubmit')" label-width="100px" title="身份证号" placeholder="请输入车主身份证"></x-input>
        </group>
        <box>
            <x-button type="primary" class="HomeXbutton"  @click.native="homeSubmitNext">确认上传</x-button>
        </box>
    </div>
</template>

<script>
    import { XInput,Group,XImg, Box, XButton  } from "vux"
    import SelectPicker from "@/components/select.vue"
    import { mapGetters, mapActions } from "vuex"
    import utils from "@/utils/utils.js"
    export default {
        name: "authentication",
        components:{
            XInput, Group, XImg, Box, XButton, SelectPicker
        },
        data(){
            return {
                url:'http://egretloan.img-cn-qingdao.aliyuncs.com/',
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
            homeSubmitNext(){
                if(!this.airforce.homeSubmit.auth_name || this.airforce.homeSubmit.auth_name.length == 0){
                    this.$vux.toast.text("【姓名】<br>不能为空,请补全公司信息");
                    return
                }
                if(!/^[\u4E00-\u9FA5]{2,}$/.test(this.airforce.homeSubmit.auth_name)){
                    this.$vux.toast.text("【姓名】<br>至少2个中文字符,请补全公司信息");
                    return
                }
                if(!this.airforce.homeSubmit.auth_phone ||
                    this.airforce.homeSubmit.auth_phone.length == 0){
                    this.$vux.toast.text("【手机号码】<br>不能为空,请补全公司信息");
                    return
                }
                if(!utils.isPhone(this.airforce.homeSubmit.auth_phone)){
                    this.$vux.toast.text("请输入正确的<br>【手机号码】,请补全公司信息");
                    return
                }
                if(!this.airforce.homeSubmit.auth_linkman1 ||
                    this.airforce.homeSubmit.auth_linkman1.length == 0){
                    this.$vux.toast.text("【紧急联系人】<br>不能为空,请补全公司信息");
                    return
                }
                if(!/^[\u4E00-\u9FA5]{2,}$/.test(this.airforce.homeSubmit.auth_linkman1)){
                    this.$vux.toast.text("【紧急联系人】<br>至少2个中文字符,请补全公司信息");
                    return
                }
                if(!this.airforce.homeSubmit.auth_linkman1_Select){
                    this.$vux.toast.text("请选择【紧急联系人1】关系,请补全公司信息");
                    return
                }
                if(!this.airforce.homeSubmit.auth_linkman1_phone ||
                    this.airforce.homeSubmit.auth_linkman1_phone.length == 0){
                    this.$vux.toast.text("【联系人1手机】<br>不能为空,请补全公司信息");
                    return
                }
                if(!utils.isPhone(this.airforce.homeSubmit.auth_linkman1_phone)){
                    this.$vux.toast.text("请输入正确的<br>【联系人1手机】,请补全公司信息");
                    return
                }
                if(!this.airforce.homeSubmit.auth_linkman2 ||
                    this.airforce.homeSubmit.auth_linkman2.length == 0){
                    this.$vux.toast.text("【紧急联系人2】<br>不能为空,请补全公司信息");
                    return
                }
                if(!/^[\u4E00-\u9FA5]{2,}$/.test(this.airforce.homeSubmit.auth_linkman2)){
                    this.$vux.toast.text("【紧急联系人2】<br>至少2个中文字符,请补全公司信息");
                    return
                }
                if(!this.airforce.homeSubmit.auth_linkman2_Select){
                    this.$vux.toast.text("请选择【紧急联系人2】关系,请补全公司信息");
                    return
                }
                if(!this.airforce.homeSubmit.auth_linkman2_phone ||
                    this.airforce.homeSubmit.auth_linkman2_phone.length == 0){
                    this.$vux.toast.text("【联系人2手机】<br>不能为空,请补全公司信息");
                    return
                }
                if(!utils.isPhone(this.airforce.homeSubmit.auth_linkman2_phone)){
                    this.$vux.toast.text("请输入正确的<br>【联系人2手机】,请补全公司信息");
                    return
                }
                if(!this.airforce.homeSubmit.auth_bankCode ||
                    this.airforce.homeSubmit.auth_bankCode.length == 0){
                    this.$vux.toast.text("【银行卡卡号】<br>不能为空,请补全公司信息");
                    return
                }
                if(!/^(\d{16}|\d{19})$/.test(this.airforce.homeSubmit.auth_bankCode)){
                    this.$vux.toast.text("请输入正确的<br>【银行卡卡号】,请补全公司信息");
                    return
                }
                if(!this.airforce.homeSubmit.auth_idCode ||
                    this.airforce.homeSubmit.auth_idCode.length == 0){
                    this.$vux.toast.text("【身份证号】<br>不能为空,请补全公司信息");
                    return
                }
                if(!utils.isIdCard(this.airforce.homeSubmit.auth_idCode)){
                    this.$vux.toast.text("请输入正确的<br>【身份证号】,请补全公司信息");
                    return
                }
                let cartype = 1;
                if(this.airforce.homeSubmit.fenqicheType){
                    cartype = 2;
                };
                if(this.$router.currentRoute.query.editor == "true"){
                    cartype = parseInt(this.airforce.selectOrder.cartype);
                }
                let orderid = '';
                if(this.$router.currentRoute.query.editor == "true"){
                    orderid = this.airforce.getperiods.data.orderid
                }else {
                    orderid = this.airforce.home_post.data.orderid;
                }
                this.$store.commit('updateLoadingStatus', {isLoading: true})
                this.action({
                   moduleName:"Authentication_post",
                    method:"post",
                    url:"app/installment/certification",
                    data:{
                        uid:this.airforce.login_post.data.uid,
                        token:this.airforce.login_post.data.token,
                        orderid:orderid,
                        name:this.airforce.homeSubmit.auth_name,
                        phone:this.airforce.homeSubmit.auth_phone,
                        idcard:this.airforce.homeSubmit.auth_idCode,
                        cardno:this.airforce.homeSubmit.auth_bankCode,
                        role_name:this.airforce.homeSubmit.auth_linkman1,
                        role:this.airforce.homeSubmit.auth_linkman1_SelectTxt,
                        jjphone:this.airforce.homeSubmit.auth_linkman1_phone,
                        role_2_name:this.airforce.homeSubmit.auth_linkman2,
                        role_2:this.airforce.homeSubmit.auth_linkman2_SelectTxt,
                        jjphone_2:this.airforce.homeSubmit.auth_linkman2_phone,
                        cartype:cartype,
                    },
                    isFormData:true,
                }).then(res=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    }
                    this.$router.push("/app/HomeLayout/pending");
                }).catch(err=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                    this.$vux.toast.text(err);
                });
            }
        },
        computed:{
            ...mapGetters(['airforce']),
        },
        mounted(){
            let orderid = '';
                try {
                    if(this.$router.currentRoute.query.editor == 'true' && this.airforce.selectOrder && this.airforce.selectOrder.orderid){
                        orderid = this.airforce.selectOrder.orderid;
                    }
                    if(this.airforce.home_post && this.airforce.home_post.data){
                        orderid = this.airforce.home_post.data.orderid;
                    }
                    //
                }catch (e){}
                this.airforce.change.set(null,'auth_name','homeSubmit');
                this.airforce.change.set(null,'auth_phone','homeSubmit');


                this.airforce.change.set(null,'auth_linkman1','homeSubmit');
                this.airforce.change.set(null,'auth_linkman1_phone','homeSubmit');
                try {
                    // this.airforce.change.set(null,'auth_linkman1_SelectTxt','homeSubmit');
                    // this.airforce.change.set(null,'auth_linkman1_SelectVal','homeSubmit');
                    // this.airforce.change.set(null,'auth_linkman1_Select','homeSubmit');
                }catch (e){}




                this.airforce.change.set(null,'auth_linkman2','homeSubmit');
                this.airforce.change.set(null,'auth_linkman2_phone','homeSubmit');
                try {
                    // this.airforce.change.set(null, 'auth_linkman2_SelectTxt', 'homeSubmit');
                    // this.airforce.change.set(null, 'auth_linkman2_SelectVal', 'homeSubmit');
                    // this.airforce.change.set(null, 'auth_linkman2_Select', 'homeSubmit');
                }catch (e){}

                this.airforce.change.set(null,'auth_idCode','homeSubmit');
                this.airforce.change.set(null,'auth_bankCode','homeSubmit');
                this.action({
                    moduleName:"getinfo",
                    method:"post",
                    url:"app/installment/getinfo",
                    data:{
                        uid:this.airforce.login_post.data.uid,
                        token:this.airforce.login_post.data.token,
                        orderid:orderid,
                    },
                    isFormData:true,
                }).then(res=>{
                    if(res.code != 200){
                        this.$vux.toast.text(res.message);
                        return;
                    }
                    if(res.data){
                        this.airforce.change.set(res.data.name,'auth_name','homeSubmit');
                        this.airforce.change.set(res.data.phone,'auth_phone','homeSubmit');


                        this.airforce.change.set(res.data.role_name,'auth_linkman1','homeSubmit');
                        this.airforce.change.set(res.data.jjphone,'auth_linkman1_phone','homeSubmit');
                        try {
                            let  role = _.find(this.selectData,{name:res.data.role})
                            this.airforce.change.set(role.name,'auth_linkman1_SelectTxt','homeSubmit');
                            this.airforce.change.set([role.value],'auth_linkman1_SelectVal','homeSubmit');
                            this.airforce.change.set(role,'auth_linkman1_Select','homeSubmit');
                        }catch (e){}




                        this.airforce.change.set(res.data.role_2_name,'auth_linkman2','homeSubmit');
                        this.airforce.change.set(res.data.jjphone_2,'auth_linkman2_phone','homeSubmit');
                        try {
                            let role2 = _.find(this.selectData2, {name: res.data.role_2});
                            this.airforce.change.set(role2.name, 'auth_linkman2_SelectTxt', 'homeSubmit');
                            this.airforce.change.set([role2.value], 'auth_linkman2_SelectVal', 'homeSubmit');
                            this.airforce.change.set(role2, 'auth_linkman2_Select', 'homeSubmit');
                        }catch (e){}

                        this.airforce.change.set(res.data.idcard,'auth_idCode','homeSubmit');
                        this.airforce.change.set(res.data.cardno,'auth_bankCode','homeSubmit');
                    };
                }).catch(err=>{
                    this.$vux.toast.text(err);
                })
        },

    }
</script>

<style scoped lang="less">
.Authentication{
    .disabled{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    .vux-x-img{
        width: 80%;
        margin: auto;
        display: block;
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
    .seeImg{
        position: relative;
        z-index: 11;
    }
}
</style>