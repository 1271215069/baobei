<template>
    <div class="wrapper">
        <div class="wrappermain">
            <div class="option" v-for="(item,index) in currency" :key="index" @click="selectrate(item)">
                <i>
                    <img :src="item.img" alt="" />
                </i>
                <span>{{item.name}}</span>
                <span>{{item.code}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Group, Cell, CellBox } from 'vux'
    import { mapActions, mapGetters } from 'vuex'

    export default {

        name: 'select-rate',
        ...mapActions,
        computed: mapGetters({
            airforce: 'airforce'
        }),
        data() {
            return {
                msg: '币种切换',
                currency: [],
                paramater:{

                },
            }

        },
        methods: {
            ...mapActions(['action']),
            selectrate(selectrateObj){
                selectrateObj.type = this.airforce.Tool.selectrate.type;
                this.action({
                    moduleName:'Tool',
                    goods:_.set({},selectrateObj.type,selectrateObj)
                });
                this.$router.back();
            }
        },
        components: {
            Group,
            Cell,
            CellBox,
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem
        },
        mounted() {
            let e = this.airforce.login_post;
            this.action({
                moduleName:'exchangeList',
                method:'post',
                url:'app/Truck/exchangeList',
                isFormData: true,
                data:{
                    uid: e.data.uid,
                    token: e.data.token
                }
            }).then(d=>{
                if(d.code != 200){
                    this.$vux.toast.text(d.message);
                    return;
                }
                try {
                    this.currency=d.data.map(obj=>{
                        obj.en = obj.code;
                        return obj;
                    })
                }catch (e){
                    this.currency = [];
                }
            }).catch(err=>{
                this.$vux.toast.text(err);
            });
        }
    }
</script>

<style scoped lang="less">
    @font-face {
        font-family: 'iconfont';
        /* project id 590408 */
        src: url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.eot');
        src: url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.eot?#iefix') format('embedded-opentype'), url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.woff') format('woff'), url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.ttf') format('truetype'), url('https://at.alicdn.com/t/font_590408_ab8lr4tq957y14i.svg#iconfont') format('svg');
    }

    .iconfont {
        font-family: "iconfont";
        font-size: 18px;
        font-style: normal;
    }

    .active {
        color: #ff7300;
    }
    /** {
        margin: 0;
        padding: 0;
    }*/

    ol,
    ul,
    li {
        list-style: none;
    }

    input:focus {
        outline: none;
    }

    img {
        border: 0;
        vertical-align: middle;
    }

    body {
        color: #000000;
        background: #FFF;
        text-align: center;
    }

    .clear {
        clear: both;
        height: 1px;
        width: 100%;
        overflow: hidden;
        margin-top: -1px;
    }

    a {
        color: #000000;
        text-decoration: none;
    }

    .wrapper {
        min-width: 320px;
        max-width: 640px;
        margin: 0 auto;
        font-size: 14px;
        font-family: "微软雅黑";
        .header {
            width: 100%;
            min-width: 320px;
            max-width: 640px;
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            background: #ff7200;
            overflow: hidden;
            text-align: center;
            z-index: 1000;
            padding: 0;
            &/deep/ .vux-header-left {
                .left-arrow {
                    &:before {
                        content: '';
                        border-color: white;
                    }
                }
            }
        }
        .wrappermain {
            padding-top: 20px;
            background: #f7f6f5;
            padding-bottom: 50px;
            .option {
                display: block;
                width: 80%;
                margin: 20px auto;
                box-sizing: border-box;
                padding: 0 5%;
                background: #fff;
                overflow: hidden;
                i {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    float: left;
                    line-height: 33px;
                    img {
                        width: 100%;
                    }
                }
                span {
                    font-size: 16px;
                    display: inline-block;
                    width: 20%;
                    /*padding: 0 10%;*/
                    line-height: 35px;
                    text-align: center;
                }
                span:nth-of-type(1){
                    width: 40%;
                }
            }
        }
    }
</style>