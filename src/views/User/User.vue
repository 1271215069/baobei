<template>
    <div class="wrapper">
        <div class="wrapperMain">
            <div class="user animated flipInX">
                <div class="animated bounceIn">
                    <div class="userhead ">
                        <input type="file" id="pass" @change="upload" ref="aa" />
                        <img :src="userhead" alt="" />
                    </div>
                    <div class="username">
                        <span>{{username}}</span>
                        <router-link class="modify" to="/app/HomeLayout/xgzl">
                            <i class="iconfont">&#xe63a;</i>
                        </router-link>
                    </div>
                </div>
            </div>
            <group gutter="0" class="menu">
                <cell-box is-link link='/app/HomeLayout/wdtd' class="wdtd">
                    <span style="color: #91c43d;" class="iconfont">&#xe6f2;</span>
                    <span>我的团队</span>
                </cell-box>
                <cell-box is-link link='/app/HomeLayout/wdrw' class="wdrw">
                    <span style="color: #ed66b2;" class="iconfont">&#xe684;</span>
                    <span>我的任务</span>
                </cell-box>
                <cell-box is-link link='/app/HomeLayout/wdyj' class="wdyj">
                    <span style="color: #f3981e;" class="iconfont">&#xe626;</span>
                    <span>我的佣金</span>
                </cell-box>
                <cell-box is-link link='/app/HomeLayout/wdyhk' class="wdyhk">
                    <span style="color: #ff3600;" class="iconfont">&#xe680;</span>
                    <span>我的银行卡</span>
                </cell-box>
                <cell-box is-link link='/app/HomeLayout/wdewm' class="wdewm">
                    <span style="color: #0995ee;" class="iconfont">&#xe7dd;</span>
                    <span>我的二维码</span>
                </cell-box>
                <cell-box is-link link='' class="tjghy" @click.native="alerts">
                    <span style="color: #ff6000;" class="iconfont">&#xe635;</span>
                    <span>推荐给好友</span>
                </cell-box>
                <cell-box is-link link='/app/HomeLayout/bzzx' class="bzzx">
                    <span style="color: #9f4ea4;" class="iconfont">&#xe6f2;</span><span>帮助中心</span>
                </cell-box>
            </group>
            <group gutter="30" class="set">
                <cell-box is-link link='/app/HomeLayout/sz' class="sz">
                    <span style="color: #7885a5;" class="iconfont">&#xe622;</span>
                    <span>设置</span>
                </cell-box>
            </group>
        </div>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Group, Cell, CellBox } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    import VueCoreImageUpload from 'vue-core-image-upload';
    // sourcetree提交测试
    var userhead;

    export default {
        name: 'user',
        computed: mapGetters({
            airforce: 'airforce'
        }),
        data() {
            return {
                msg: '我的',
                username: '',
                userhead: userhead,
                showMenus: false,
                show: false,
                fileimg: '',
                data:{},
            }
        },
        methods: {
            ...mapActions(['action']),
            alerts(){
              this.$vux.toast.text("玩命开发中...")
            },
            upload() {
                var fileObj = this.$refs.aa.files[0]; //获取到files的信息
                var reader = new FileReader();
                reader.readAsDataURL(fileObj);
                var that = this;
                reader.onload = function(x){
                    that.data.head_img = this.result;
                    that.action({
                        moduleName: 'editheadimg',
                        method: "post",
                        url: "app/Member/editheadimg",
                        //fullUrl:'https://www.easy-mock.com/mock/5ab89437ade6f916f6ce4661/login',
                        isFormData: true,
                        data: {
                            uid: that.data.uid,
                            token: that.data.token,
                            head_img: that.data.head_img
                        }
                    }).then(res => { //请求成功后返回修改后的图片地址进行拼接
                        if(res.code != 200){
                            that.$vux.toast.text(res.message);
                            return;
                        }
                        that.$vux.toast.text("头像修改成功");
                        that.userhead = res.imagepath + res.data.head_img;
                        that.action({
                            moduleName:"login_post",
                            goods:{
                               data:{
                                   head_img:res.data.head_img
                               }
                            }
                        }).then(()=>{
                            localStorage.login_post = JSON.stringify(that.airforce.login_post);
                        });
                    }).catch(err=>{
                        that.$vux.toast.text(err.message);
                    })
                }
            },

        },
        components: {
            Group,
            Cell,
            CellBox,
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            'vue-core-image-upload': VueCoreImageUpload,
        },
        mounted() {
            let res = this.airforce.login_post;
            //454545
            this.data.uid = res.data.uid;
            this.data.token = res.data.token;
            if(res.code == 200) {
                // 一下判断当用户昵称为空时用用户手机号进行替换，无头像时用默认头像代替
                if(res.data.nick_name == 'undefined' || !res.data.nick_name) {
                    this.username = res.data.yphone;
                } else {
                    this.username = res.data.nick_name;
                }
                if(res.data.head_img == 'undefined' || !res.data.head_img) {
                    this.userhead = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAACeCAMAAAD0W0NJAAAAsVBMVEUAAAD////i4uL////////////////////////////////ExMTExMT////////////////ExMT////////ExMT////////////////////ExMT////////////////////ExMTGxsbExMT////////////ExMTExMTExMTExMTExMTExMT////ExMTIyMjb29vr6+vW1tbx8fH5+fn29vbMzMzk5OTn5+fR0dHz8/Pg4OAhGm10AAAALHRSTlMAGgkOkvHSi+31SfeOdTjiu29oRUUo28us5dL4om4+Lhnf7cS1WMe5sqUqV3bNPAEAAAWsSURBVHjazNjZbuowFIXhnXmQGBQUAiptL4C75UwkFHj/BzsX1VEqStssZ+J7gl9sx9iW7sw4jLzdIVn7vgM4vr9ODjsvCmNTJmauZjsXP3J3s9VUjWZoJ2ghscPRE43XZYDWguWrITT9tj1o+5EKww00bUIZmDVboIPFzJLhGJ6DjhxvqBkbdoAeBPYQgZYXoCeB1/uIIx898iPp0zxBz5J5f3O1MQC7pwmvFhjEYiXdmTYGY5vSUexiQG4snRwdDMo5SgceBueJLmuJESwt0WK4GIVriIb3LUayfRfa3Mdo/LmQ3hyMyHkj6wKMKqD65g5G5syJr8LH6PzW34exxQS2hrRiuZiEa0kbS0xkKS3YmIwtfzpiQkf5QxxgQkEsvzJdTMo1n3XhtVh+K0xuJT+yFuiuyvMK+hbWYKM95beiTpVSGQhtxzuHvus5+yz7VEDfXB5zoedUlZlqdO1z5aEIvCo/Z3Waqu8yaIvkAcsHqyxS9aMzdPlWL3fam/rVx+fkwfPkGyMAKVN/yG7Zpa7rIruCExjdN5Wzau8Gji13jBdwKkVg+16MriuvUJQrGvzqsxxwSsXJ0OA/3hlImeKkJ1Bm8tUCnFOqSCUoC/kiBClXrA9wQmlsQMoUKwNn09QZYF0Gz0Ozt7yCVStWAdKr/LcH6ZQOn7fXn23F513AMnQ3PVzHyJtpP6pcFa0GpXlyse5OA8+S92I2ezKnVLS0Ait8eNJ7mjxb94JWKl4JQnNls3DnafJg0e8q+nk5aKuHu97T5M0enlaeJm8jImvce5q8tYgJDddx8mBKDA1VOk5eLCEo+nkleKFE0HBKdf41eJF4YOjn1dDgyQ68slDj/Ho7OYBV1kpHejmDdZAErFrpovsSflculbb0BM5afJBypS8HZysOSB9KjTZdRwKQzkpfBo4jIHTOK0D619zZLacNA1FYFiQk2JA4MTQ47RTclr9obcs/2Ob9H6wz6QU3oeGsZIXvCc6skLzS7lmuXR68uI1DeTf41shdysMPlsLh1ljgx3LnUN4c/6iVqbtz7xsjJaiJTakwfjMSKk1cGgXyHU5H+XujzhXKiJPM5ykxyEoF88S6CnUZobSFYjAWM8Wh0uiJwmImpGJRoVuWhRRirlhoB8GbI09A/Jt4ygzeC/KAxs9cDorHxKStKwNLGjjPp8dbBhpbWpwB/vSN6ysUk1vTvrMjcHnEGcJlF/z71ig2Y7RohX8+csXmVdroo85bOktaKD6PYMEUPmHaShkwAcvN6N0tU0Z4cLEekpeWyoRfcKsDKK9SJvwQws7qFr3I8+A2G5fyXuAmJVReqQwYM1q8gNTPUN4D3CDnVN4Eby90uLg3A3tW14N9eSNWayuW9hWKy6tnz23Q2c+lhqy2ajBnrhWTe8+e0fpo/4Y2glv6cXX8X9/dwJYhosx6SJafbNlJmrqHZ7NbO2acqqnpc9JDpTCmFqxMxUHTpegGUTg0M4KV3T8/FUJaZ4eiu2idHwZ8G11xzNqUuNRt1nTqE56ZJsSq0R8rQ+P4X5fdkGfhzDVZI9X52V0rGQbYsqnJLvXxwxDezxj24ZwpDj8R/zCGnGSEwS/DjHDreqkJg/8i/sgw/rfUI5ph/Bfegl/f43fSLzx86ERGPaNPQyfwkR1HwuDH72aKDzzJyQHZaeAJNi6mTMkF+WlcDDRsJycnaHU35YwqysgJ6fynYOCtyAmxJ1jIDTlgIwWXgHonEAa8+dQr/pswYh9Tj8R7YYjscYEDKcyJetrBq0i8c50BDKSwRRSTZeJI2CRMyCJJKCwjA58s4QdS2GcZ+HbELcU71ygQEYcjw5XRWRJK0TPR1mcGbhsJFyzDNcGsQ2BVzRVufCBuG1SbOTIKYrqAOIi+bFJ/FO5i/2zQ4l0YffkfHYh9FAa77XqVJD6RnySr9XYXhNFemPMX2KQ57+M3E7UAAAAASUVORK5CYII=";
                } else {
                    this.userhead = res.imagepath + res.data.head_img;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .wrapper {
        margin: 0 auto;
        font-size: 14px;
        font-family: "微软雅黑";
        background: #f8f8f8;
        .wrapperMain {
            margin-bottom: 80px;
            .user {
                background: #f38431;
                .userhead {
                    padding: 50px 0 3px 0;
                    text-align: center;
                    margin: 0 auto;
                    width: 87px;
                    height: 87px;
                    position: relative;
                    input {
                        position: absolute;
                        display: block;
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        top: 50px;
                        left: 0;
                        opacity: 0;
                    }
                    img {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        box-shadow: 0 0 5px 4px rgba(0, 0, 0, 0.2);
                    }
                }
                .username {
                    text-align: center;
                    padding: 10px 0 25px 0;
                    overflow: hidden;
                    span {
                        color: white;
                        line-height: 18px;
                    }
                    .modify {
                        i {
                            color: white;
                        }
                    }
                }
            }
            .menu {
                i {
                    font-size: 14px;
                }
                span {
                    font-size: 16px;
                    padding-left: 5px;
                }
            }
            .set {
                .sz>span {
                    padding-left: 5px;
                }
                .sz>i {
                    font-size: 14px;
                }
            }
        }
    }
</style>