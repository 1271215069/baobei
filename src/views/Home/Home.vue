<template>
    <div class="home">
        <swiper :list="banners" auto loop :show-desc-mask="false"></swiper>
        <group class="homeGroup">
            <flexbox>
                <flexbox-item>
                    <x-switch class="homeXSwitch" :inline-desc="fenqicheTypeTxt" title="分期车型" :value="airforce.homeSubmit.fenqicheType" @on-change="airforce.change.set($event,'fenqicheType','homeSubmit')"></x-switch>
                </flexbox-item>
                <flexbox-item>
                    <x-switch class="homeXSwitch" :inline-desc="chepaiTypeTxt" title="车牌情况" :value="airforce.homeSubmit.chepaiType" @on-change="airforce.change.set($event,'chepaiType','homeSubmit')"></x-switch>
                </flexbox-item>
            </flexbox>
            <cell title="隶属公司" :value="companyValue" is-link value-align="left" :class="`homeCell ${(airforce.homeSubmit.company)?'companySelect':''}`" @click.native="companySelect" v-if="airforce.homeSubmit.fenqicheType"></cell>
            <x-input label-width="80px" title="车牌号码" placeholder="输入您的车牌号码" v-if="!airforce.homeSubmit.chepaiType" :value="airforce.homeSubmit.number" @on-change="airforce.change.set($event,'number','homeSubmit')"></x-input>
            <x-input type="number" label-width="80px" title="分期金额" placeholder="输入您要分期的总金额" :value="airforce.homeSubmit.money" @on-change="airforce.change.set($event,'money','homeSubmit')"></x-input>
            <select-picker :data="fenqiType"
                           title="分期险种"
                           selectPlaceholder="选择您分期的险种"
                           name="fenqiType"
                           moduleName="homeSubmit"
                           type="select"
                           label-width="80px"
            >
            </select-picker>
            <select-picker :data="rateList"
                           title="手续费费率"
                           selectPlaceholder="选择手续费费率"
                           name="rate"
                           moduleName="homeSubmit"
                           type="select"
                           label-width="80px"
            >
            </select-picker>
            <x-input label-width="80px" title="业务渠道" placeholder="请输入您投保的保险渠道（选填）" :value="airforce.homeSubmit.channel" @on-change="airforce.change.set($event,'channel','homeSubmit')"></x-input>
            <x-input label-width="80px" title="备注" placeholder="输入您需要备注的内容（选填）" :value="airforce.homeSubmit.remark" @on-change="airforce.change.set($event,'remark','homeSubmit')"></x-input>
        </group>
        <box>
            <x-button type="primary" class="HomeXbutton"  @click.native="homeSubmitNext">下一步</x-button>
        </box>
        <div v-transfer-dom>
            <popup v-model="show1" class="popupEX">
                <group gutter="0">
                    <flexbox>
                        <flexbox-item :span="`50px`">
                            <div class="EnterBtn" @click="companySelectUn">确定</div>
                        </flexbox-item>
                        <flexbox-item>
                            <search :auto-fixed="false" @on-change="search" placeholder="输入公司名称/公司cid"></search>
                        </flexbox-item>
                    </flexbox>
                    <div v-if="optionsCopy.length == 0" class="notData">无结果!</div>
                    <radio :options="optionsCopy" v-model="radioSelect"></radio>
                </group>
            </popup>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { Swiper, XInput, Group, Flexbox, FlexboxItem, Cell, Box, XButton, XSwitch, Selector, PopupHeader, Popup, TransferDom, Radio, Search, PopupPicker  } from 'vux'
    import SelectPicker from "@/components/select.vue"
    export default {
        name: "home",
        directives: {
            TransferDom, SelectPicker
        },
        data(){
            return {
                banners:[
                    {
                        url: 'javascript:',
                        img: require('@/assets/img/banner/banner1.png'),
                        title: ''
                    },
                ],
                show1: false,
                fenqiType:[
                    {name:"商业险",value:"1"},
                    {name:"交强险",value:"2"},
                    {name:"商业险和交强险",value:"3"},
                ],
                rateList:[
                    // {name:"20%",value:1},
                    // {name:"25%",value:2},
                ],
                findOpt:null,
                radioSelect:null,
            }
        },
        methods: {
            ...mapActions(['action']),
            companySelect(){
                this.show1 = true;
            },
            companySelectUn(){
                this.show1 = false;
            },
            homeSubmitNext(){
                if(this.airforce.homeSubmit.fenqicheType && !this.airforce.homeSubmit.company){
                    this.$vux.toast.text("请选择隶属公司");
                    return
                }
                if(typeof this.airforce.homeSubmit.chepaiType == 'undefined' || this.airforce.homeSubmit.chepaiType == false){
                    if(!this.airforce.homeSubmit.number || this.airforce.homeSubmit.number.length == 0){
                        this.$vux.toast.text("车牌号码不能为空");
                        return
                    }
                }
                if(!this.airforce.homeSubmit.money || this.airforce.homeSubmit.money.length == 0){
                    this.$vux.toast.text("分期金额不能为空");
                    return
                }
                if(!this.airforce.homeSubmit.fenqiType_Select){
                    this.$vux.toast.text("请选择分期险种");
                    return
                }
                //不验证以下字段
                // if(!this.airforce.homeSubmit.channel || this.airforce.homeSubmit.channel.length == 0){
                //     this.$vux.toast.text("业务渠道不能为空");
                //     return
                // }
                // if(!this.airforce.homeSubmit.remark || this.airforce.homeSubmit.remark.length == 0){
                //     this.$vux.toast.text("备注不能为空");
                //     return
                // }
                let home_post_data = {
                    uid:this.airforce.login_post.data.uid,
                    token:this.airforce.login_post.data.token,
                    plate:this.airforce.homeSubmit.number,
                    amount:this.airforce.homeSubmit.money,
                    insurance:this.airforce.homeSubmit.fenqiType_SelectTxt,
                    rate_id:this.airforce.homeSubmit.rate_Select.value,
                };
                try {
                    if(this.airforce.homeSubmit.company && this.airforce.homeSubmit.company.cid){
                        home_post_data['cid'] = this.airforce.homeSubmit.company.cid;
                    }
                    if(this.airforce.homeSubmit.channel){
                        home_post_data['channel'] = this.airforce.homeSubmit.channel;
                    }
                    if(this.airforce.homeSubmit.remark){
                        home_post_data['remark'] = this.airforce.homeSubmit.remark;
                    }
                    if(this.airforce.homeSubmit.fenqicheType){
                        home_post_data['cartype'] = 2;
                    }else {
                        home_post_data['cartype'] = 1;
                    };
                    if(this.airforce.homeSubmit.chepaiType){
                        home_post_data['hasplate'] = 0;
                    }else {
                        home_post_data['hasplate'] = 1;
                    };
                }catch (e){}
                this.$store.commit('updateLoadingStatus', {isLoading: true})
                this.action({
                    moduleName:"home_post",
                    method:"post",
                    url:"app/installment/start",
                    data:home_post_data,
                    isFormData:true,
                }).then(e=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false});
                    if(e.code != 200){
                        this.$vux.toast.text(e.message);
                        return;
                    }else {
                        this.$vux.toast.text("提交成功");
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
                    }
                    setTimeout(()=>{
                        this.$router.push("/app/HomeLayout/selectType");
                    },1000);
                }).catch(err=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false});
                    this.$vux.toast.text(err);
                });
            },
            search(e){
                this.findOpt = this.airforce.all_company_post.data.filter(o => {
                    try {
                        return o.value.indexOf(e) > -1 || o.cid.indexOf(e) > -1;
                    }catch (e){}
                });
            }
        },
        computed: {
            ...mapGetters(['airforce']),
            fenqicheTypeTxt(){
                if(this.airforce.homeSubmit.fenqicheType){
                    return "货运车"
                }
                return "乘用车"
            },
            chepaiTypeTxt(){
                if(this.airforce.homeSubmit.chepaiType){
                    return "未上牌"
                }
                return "已上牌"
            },
            options(){
                let d = [];
                for(let i = 0 ; i < 3; i++){
                    d.push({
                        key:i,
                        value:i+"AAA"
                    });
                };
                return d;
            },
            optionsCopy(){
                let data = [];
                try {
                    data = JSON.parse(JSON.stringify(this.airforce.all_company_post.data))
                }catch (e){}
                return this.findOpt || data;
            },
            companyValue(){
                if(this.airforce.homeSubmit.company){
                   return this.airforce.homeSubmit.company.value;
                }
                return "请选择公司名称";
            }
        },
        watch:{
            show1(val){
                var radioSelectObj = _.find(this.airforce.all_company_post.data,o=>{
                    return o.key == this.radioSelect;
                });
                this.action({
                    moduleName:'homeSubmit',
                    goods:{
                        company:radioSelectObj
                    }
                });
                if(val){
                    this.action({
                        moduleName:'layout',
                        goods:{
                            head_type:2,
                            head_txt:"添加公司",
                            click:true,
                            clickfn:()=>{
                                this.$router.push("/app/HomeLayout/addcompany")
                            }
                        }
                    });
                }else {
                    this.action({
                        moduleName:'layout',
                        goods:{
                            head_type:1,
                            click:false,
                            clickfn:null,
                        }
                    });
                }
            },
            radioSelect(){
                this.show1 = false;
            }
        },
        components:{
            SelectPicker,
            Swiper, XInput, Group, Flexbox, FlexboxItem, Cell, Box, XButton, XSwitch, Selector, PopupHeader, Popup, Radio, Search, PopupPicker
        },
        created(){
            this.action({
                moduleName:'all_company_post',
                method:"POST",
                url:"app/truck/all_company",
                data:this.airforce.login_post.data,
                isFormData:true,
            }).then(e=>{
                if(e.code != 200){
                    this.$vux.toast.text(e.message);
                    return;
                }
                this.action({
                    moduleName: 'all_company_post',
                    goods:{
                        data: this.airforce.all_company_post.data.map(d=>{
                            d.key = d.cid;
                            d.value = d.cname;
                            return d;
                        })
                    }
                });

            }).catch(e=>{
                this.$vux.toast.text(e);
            });
            this.action({
                moduleName:'rateList_post',
                isFormData:true,
                method:"POST",
                url:'app/installment/rate',
                data:this.airforce.login_post.data
            }).then(res=>{
                if(res.code != 200){
                    if(res.message){
                        this.$vux.toast.text(res.message);
                    };
                    return;
                }
                if(res.msg){
                    this.rateList = res.msg.map(e=>{
                        e.value = e.id;
                        e.name = parseFloat(e.rate)*100 + "%";
                        return e;
                    });
                }
            }).catch(err=>{
                this.$vux.toast.text(err);
            })
        }
    }
</script>

<style scoped lang="less">
.home{
    .homeGroup{
        &/deep/ .vux-no-group-title{
            margin-top: 0;
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
    .homeCell{
        &/deep/ .vux-label{
            width: 80px;
        }
        &.companySelect{
            &/deep/ .weui-cell__ft{
                color: #000;
            }
        }
    }
    .homePopupPicker{
        &/deep/ .weui-label{
            width: 80px !important;
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
    &/deep/ .vux-cell-value{
        color: #000;
    }
}
.popupEX{
    bottom: initial;
    top: 46px;
    &/deep/ .vux-popup-header{
        background-color: #f38431;
        .vux-popup-header-title{
            color: #ffffff;
        }
    }
    &/deep/ .vux-flexbox{
        background-color: #EFEFF4;
        .weui-search-bar{
            background-color: transparent;
            &:after{
                content: '';
                border: none;
            }
        }
        //#EFEFF4
        .EnterBtn{
            text-align: center;
            color: #f38431;
        }
        .weui-search-bar__cancel-btn{
            color: #f38431;
        }
    }
    .notData{
        text-align:center;
        color: #cccccc;
        line-height: 50px;
    }

}

</style>