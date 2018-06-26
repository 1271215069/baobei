<template>
    <div class="loginModule" :style="{backgroundImage:`url(${login_bj})`}">
        <img :src="xiaosanyuan" class="headImg"/>
        <group class="loginXinput loginXinput2">
            <x-input label-width="30px"  title="&#xe638;" :value="airforce.login.phone" @on-change="airforce.change.set($event,'phone','login')" placeholder="输入您的登陆账号" class="iconfont"></x-input>
        </group>
        <group class="loginXinput loginXinput2">
            <x-input  type="password" label-width="30px"  title="&#xe62d;"  :value="airforce.login.password" @on-change="airforce.change.set($event,'password','login')" placeholder="输入您的6位以上密码" class="iconfont"></x-input>
        </group>
        <box>
            <x-button type="primary" class="loginXbutton loginXbutton2" @click.native="login">登陆</x-button>
        </box>
        <flexbox class="loginFlexbox loginFlexbox2">
            <flexbox-item><div class="loginFlexboxTxt left" @click="ForgetPwd">忘记密码?</div></flexbox-item>
            <flexbox-item><div class="loginFlexboxTxt" @click="register">新用户注册</div></flexbox-item>
        </flexbox>
        <img :src="min_logo" class="min_logo">
    </div>
</template>

<script>
    import {XInput, Group, XButton, Box, Flexbox, FlexboxItem, XImg } from "vux"
    import { mapActions, mapGetters } from 'vuex'
    import Utils from "@/utils/utils.js"
    export default {
        name: "login",
        data(){
            return {
                login_bj:require("@/assets/img/login/login_bj1.png"),
                xiaosanyuan:require("@/assets/img/login/xiaosanyuan.png"),
                min_logo:require("@/assets/img/login/min-logo.png"),
            }
        },
        methods: {
            ...mapActions(['action']),
            login(){
                if(!this.airforce.login.phone){
                    this.$vux.toast.text("手机号不能为空")
                    return
                }else
                if(!Utils.isPhone(this.airforce.login.phone)){
                    this.$vux.toast.text("请输入正确的手机号码")
                    return
                }else
                if(!this.airforce.login.password){
                    this.$vux.toast.text("密码不能为空")
                    return;
                }else
                if(this.airforce.login.password.length < 6){
                    this.$vux.toast.text("密码长度不能低于6位")
                    return;
                }
                this.$store.commit('updateLoadingStatus', {isLoading: true})
                this.action({
                    moduleName:'login_post',
                    method:"POST",
                    url:"app/Login/login",
                    data:this.airforce.login,
                    isFormData:true,
                }).then(e=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                    if(e.code != 200){
                        this.$vux.toast.text(e.message);
                        return;
                    }
                    localStorage.login_post = JSON.stringify(this.airforce.login_post);
                    this.$router.push("/app/HomeLayout/home");
                }).catch(e=>{
                    this.$store.commit('updateLoadingStatus', {isLoading: false})
                    this.$vux.toast.text(e);
                });
            },
            register(){
                this.$router.push("/app/register")
            },
            ForgetPwd(){
                this.$router.push("/app/forgetPwd")
            }
        },
        mounted(){
            //13757478025
            //ok6520814
        },
        components:{
            XInput,
            Group,
            XButton,
            Box,
            Flexbox,
            FlexboxItem,
            XImg,
        },
        computed: mapGetters({
            airforce: 'airforce'
        }),
    }
</script>

<style lang="less" scoped>

.loginModule{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size:100%;
    background-repeat: no-repeat;
    @media (min-height: 737px) {
        background-size:100% 812px;
    }
    .headImg{
        width: 30%;
        margin: auto;
        display: block;
        margin-top: 50px;
        margin-bottom: 50px;
        //iPhone 6/7/8 Plus
        @media (min-height: 700px) {
            margin-top: 80px;
        }
        //iPhoneX
        @media (min-height: 800px) {
            margin-top: 100px;
        }
    }
    .loginXinput{
        width: 80%;
        margin: auto;
        &/deep/ .weui-cells{
            border-radius: 15px;
            overflow: hidden;
            .weui-label{
                color: #f64400;
                text-align: center;
            }
        }
    }
    .loginXbutton{
        .loginXinput;
        border: none;
        border-radius: 10px;
        overflow: hidden;
        background-color: #f19820;
        color: #fff;
        margin-top: 40px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.09);
        &:active {
            border-color: rgba(241, 152, 32, 0.6) !important;
            background-color: rgba(241, 152, 32, 0.6) !important;
        }
        &:after{
            border: none;
        }
    }
    .loginFlexbox{
        .loginXinput;
        margin-top: 50px;
        .loginFlexboxTxt{
            text-align: center;
            color: #ffffff;
            &.left{
                height: 25px;
                position: relative;
                &:before{
                    content: '';
                    width: 1px;
                    height: 100%;
                    position: absolute;
                    right: -1px;
                    top: 0;
                    background-color: #825012;
                }
                &:after{
                    content: '';
                    width: 1px;
                    height: 100%;
                    position: absolute;
                    right: 0;
                    top: 0;
                    background-color: #f19820;
                }
            }
        }
    }
}
</style>