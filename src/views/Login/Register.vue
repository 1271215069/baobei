<template>
    <div class="register">
        <layout-header></layout-header>
        <group>
            <x-input :value="airforce.register.phone" @on-change="airforce.change.set($event,'phone','register')" placeholder="请输入手机号"></x-input>
            <flexbox class="registerFlexbox">
                <flexbox-item>
                    <x-input :value="airforce.register.code" @on-change="airforce.change.set($event,'code','register')" placeholder="请输入短信验证码"></x-input>
                </flexbox-item>
                <flexbox-item span="120" align="right">
                    <x-button mini plain  type="primary" :disabled="disabled" :class="`weui-btn_plain-primary-Theme ${(disabled)?'disabled':''}`" @click.native="getCode">{{getCodeTxt}}</x-button>
                </flexbox-item>
                <flexbox-item span="15"></flexbox-item>
            </flexbox>
            <x-input type="password" :value="airforce.register.password" @on-change="airforce.change.set($event,'password','register')" placeholder="请设置登陆密码"></x-input>
            <x-input type="password" :value="airforce.register.passwordOld" @on-change="airforce.change.set($event,'passwordOld','register')" placeholder="请再次设置登陆密码"></x-input>
        </group>
        <x-button  type="primary" class="weui-btn_plain-primary-Theme registerXbutton" @click.native="registerAddUser">立即注册</x-button>
    </div>
</template>

<script>
    import LayoutHeader from '../Layout/LayoutHeader'
    import {XInput, Group, XButton, Box, Flexbox, FlexboxItem, md5 } from "vux"
    import { mapActions, mapGetters } from 'vuex'
    import Utils from '@/utils/utils.js'
    export default {
        name: "register",
        data(){
            return {
                disabled:false,
                getCodeTxt:'获取验证码'
            }
        },
        methods: {
            ...mapActions(['action']),
            initCodeText(){
                if(!this.airforce.register.TimeIndex){
                    this.action({
                        moduleName:"register",
                        goods:{
                            TimeIndex:this.airforce.register.TimeIndexInit,
                        }
                    });
                };
                this.disabled = true;
                this.getCodeTxt = `(${this.airforce.register.TimeIndex}s)后重新获取`;
                const time = setInterval(()=>{
                    this.action({
                        moduleName:"register",
                        goods:{
                            TimeIndex:this.airforce.register.TimeIndex -1,
                        }
                    });
                    this.getCodeTxt = `(${this.airforce.register.TimeIndex}s)后重新获取`;
                    if(this.airforce.register.TimeIndex < 0 ){
                        clearInterval(time);
                        this.disabled = false;
                        this.getCodeTxt = '获取验证码';
                        this.action({
                            moduleName:"register",
                            goods:{
                                TimeIndex:this.airforce.register.TimeIndexInit,
                            }
                        });
                    }
                },1000);
                this.action({
                    moduleName:"register",
                    goods:{
                        Time:time,
                    }
                });
            },
            getCode(){
                if(!this.airforce.register.phone || !Utils.isPhone(this.airforce.register.phone)){
                    this.$vux.toast.text("请输入正确的手机号码")
                    return;
                }
                this.action({
                    moduleName:"getPhoneCode",
                    method:"POST",
                    url:"app/Login/getcode",
                    data:{
                        phone:this.airforce.register.phone,
                        mdphone:md5(this.airforce.register.phone+this.airforce.register.md5),
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
            registerAddUser(){
                if(!this.airforce.register.phone || !Utils.isPhone(this.airforce.register.phone)){
                    this.$vux.toast.text("请输入正确的手机号码")
                    return;
                }else if(!this.airforce.register.code || this.airforce.register.code.length == 0){
                    this.$vux.toast.text("验证码不能为空")
                    return;
                }else if(!this.airforce.register.password || this.airforce.register.password.length < 6){
                    this.$vux.toast.text("密码长度不能低于6位")
                    return;
                }else if(!this.airforce.register.passwordOld || this.airforce.register.password != this.airforce.register.passwordOld){
                    this.$vux.toast.text("密码不一致，请确认密码是否一致")
                    return;
                }
                this.action({
                    moduleName:"login_post",
                    method:"POST",
                    url:"app/Login/register",
                    isFormData:true,
                    data:this.airforce.register
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
            if(this.airforce.register.TimeIndex && this.airforce.register.TimeIndex != 60){
                clearInterval(this.airforce.register.Time);
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
    .registerFlexbox{
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
    .registerXbutton{
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