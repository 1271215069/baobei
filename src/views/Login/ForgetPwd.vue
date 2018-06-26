<template>
    <div class="ForgetPwd">
        <layout-header></layout-header>
        <group>
            <x-input :value="airforce.ForgetPwd.phone" @on-change="airforce.change.set($event,'phone','ForgetPwd')" placeholder="请输入手机号"></x-input>
            <flexbox class="ForgetPwdFlexbox">
                <flexbox-item>
                    <x-input :value="airforce.ForgetPwd.code" @on-change="airforce.change.set($event,'code','ForgetPwd')" placeholder="请输入短信验证码"></x-input>
                </flexbox-item>
                <flexbox-item span="120" align="right">
                    <x-button mini plain  type="primary" :disabled="disabled" :class="`weui-btn_plain-primary-Theme ${(disabled)?'disabled':''}`" @click.native="getCode">{{getCodeTxt}}</x-button>
                </flexbox-item>
                <flexbox-item span="15"></flexbox-item>
            </flexbox>
            <x-input type="password" :value="airforce.ForgetPwd.password" @on-change="airforce.change.set($event,'password','ForgetPwd')" placeholder="请设置登陆密码"></x-input>
            <x-input type="password" :value="airforce.ForgetPwd.password2" @on-change="airforce.change.set($event,'password2','ForgetPwd')" placeholder="请再次设置登陆密码"></x-input>
        </group>
        <x-button  type="primary" class="weui-btn_plain-primary-Theme ForgetPwdXbutton" @click.native="ForgetPwdAddUser">立即注册</x-button>
    </div>
</template>

<script>
    import LayoutHeader from '../Layout/LayoutHeader'
    import {XInput, Group, XButton, Box, Flexbox, FlexboxItem, md5 } from "vux"
    import { mapActions, mapGetters } from 'vuex'
    import Utils from '@/utils/utils.js'
    export default {
        name: "ForgetPwd",
        data(){
            return {
                disabled:false,
                getCodeTxt:'获取验证码'
            }
        },
        methods: {
            ...mapActions(['action']),
            initCodeText(){
                if(!this.airforce.ForgetPwd.TimeIndex){
                    this.action({
                        moduleName:"ForgetPwd",
                        goods:{
                            TimeIndex:this.airforce.ForgetPwd.TimeIndexInit,
                        }
                    });
                };
                this.disabled = true;
                this.getCodeTxt = `(${this.airforce.ForgetPwd.TimeIndex}s)后重新获取`;
                const time = setInterval(()=>{
                    this.action({
                        moduleName:"ForgetPwd",
                        goods:{
                            TimeIndex:this.airforce.ForgetPwd.TimeIndex -1,
                        }
                    });
                    this.getCodeTxt = `(${this.airforce.ForgetPwd.TimeIndex}s)后重新获取`;
                    if(this.airforce.ForgetPwd.TimeIndex < 0 ){
                        clearInterval(time);
                        this.disabled = false;
                        this.getCodeTxt = '获取验证码';
                        this.action({
                            moduleName:"ForgetPwd",
                            goods:{
                                TimeIndex:this.airforce.ForgetPwd.TimeIndexInit,
                            }
                        });
                    }
                },1000);
                this.action({
                    moduleName:"ForgetPwd",
                    goods:{
                        Time:time,
                    }
                });
            },
            getCode(){
                if(!this.airforce.ForgetPwd.phone || !Utils.isPhone(this.airforce.ForgetPwd.phone)){
                    this.$vux.toast.text("请输入正确的手机号码")
                    return;
                }
                this.action({
                    moduleName:"getPhoneCode",
                    method:"POST",
                    url:"app/Login/getcode",
                    data:{
                        phone:this.airforce.ForgetPwd.phone,
                        mdphone:md5(this.airforce.ForgetPwd.phone+this.airforce.register.md5),
                    },
                    isFormData:true,
                }).then(d=>{
                    if(d.code == 200){
                        this.$vux.toast.show({
                            text:"亲，短信发送成功",
                            type:"text",
                            width:"auto",
                            position:"bottom",
                        });
                        this.initCodeText();
                    }else {
                        this.$vux.toast.show({
                            text:d.message,
                            type:"text",
                            width:"auto",
                            position:"bottom",
                        });
                    };
                }).catch(d=>{
                    this.$vux.toast.text(d);
                });
            },
            ForgetPwdAddUser(){
                if(!this.airforce.ForgetPwd.phone || !Utils.isPhone(this.airforce.ForgetPwd.phone)){
                    this.$vux.toast.text("请输入正确的手机号码")
                    return;
                }else if(!this.airforce.ForgetPwd.code || this.airforce.ForgetPwd.code.length == 0){
                    this.$vux.toast.text("验证码不能为空")
                    return;
                }else if(!this.airforce.ForgetPwd.password || this.airforce.ForgetPwd.password.length < 6){
                    this.$vux.toast.text("密码长度不能低于6位")
                    return;
                }else if(!this.airforce.ForgetPwd.password2 || this.airforce.ForgetPwd.password != this.airforce.ForgetPwd.password2){
                    this.$vux.toast.text("密码不一致，请确认密码是否一致")
                    return;
                }
                this.action({
                    moduleName:"login_post",
                    method:"POST",
                    url:"app/Login/forgetpassword",
                    isFormData:true,
                    data:this.airforce.ForgetPwd
                }).then(e=>{
                    this.$vux.toast.text(e.message);
                    if(e.code == 200){
                        localStorage.login_post = JSON.stringify(this.airforce.login_post);
                        this.$router.push("/app/HomeLayout/home");
                    };
                }).catch(e=>{
                    this.$vux.toast.text(e);
                })
            }
        },
        mounted(){
            if(this.airforce.ForgetPwd.TimeIndex && this.airforce.ForgetPwd.TimeIndex != 60){
                clearInterval(this.airforce.ForgetPwd.Time);
                this.initCodeText();
            }else {
                this.disabled = false;
                this.getCodeTxt = '获取验证码';
            }
        },
        watch:{

        },
        components:{
            XInput,
            Group,
            XButton,
            Box,
            Flexbox,
            FlexboxItem,
            LayoutHeader,
        },
        computed: mapGetters({
            airforce: 'airforce'
        }),
    }
</script>

<style lang="less" scoped>
    @ThemeColor:#f38431;
    .weui-btn_plain-primary-Theme{
        color: @ThemeColor;
        border: 1px solid @ThemeColor;
        &:not(.weui-btn_plain-disabled):active{
            color: rgba(243, 132, 49, 0.6);
            border-color: rgba(243, 132, 49, 0.6);
        }
        &.disabled{
            color: #999;
            border: 1px solid #999;
            font-size: 12px;
            padding: 0 0.5em;
        }
    }
    .ForgetPwdFlexbox{
        position: relative;
        &:before{
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            left: 15px;
        }
    }
    .ForgetPwdXbutton{
        width: 80%;
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
</style>