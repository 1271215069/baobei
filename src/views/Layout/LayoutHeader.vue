<template>
    <div class="layout-header">
        <div class="layoutXHeaderBox">
            <x-header class="layoutXHeader" :left-options="{backText: airforce.layout.backText,showBack: airforce.layout.showBack}">
                {{airforce.layout.title}}
                <div slot="right" v-if="airforce.layout.head_type == 1" :class="`iconfont layoutXHeaderRight ${(airforce.layout.infoSelect)?'infoSelect':''}`" @click="iconGo">
                    &#xe600;
                </div>
                <div slot="right" v-if="airforce.layout.head_type == 2" class="layoutXHeaderRight layoutXHeaderRight_txt" @click="iconGo">
                        {{airforce.layout.head_txt}}
                </div>
            </x-header>
            <flexbox class="layoutFlexbox" v-if="airforce.layout.marquee">
                <flexbox-item span="30px" class="iconfont">&#xe647;</flexbox-item>
                <flexbox-item class="marquee">&nbsp;<marquee behavior="" direction="left">{{airforce.layout.marquee}}</marquee></flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
    import { XHeader, Flexbox, FlexboxItem } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "layout-header",
        components:{
            XHeader, Flexbox, FlexboxItem
        },
        computed: mapGetters({
            airforce: 'airforce'
        }),
        methods: {
            ...mapActions(['action']),
            iconGo(){
                try {
                    if(this.airforce.layout && this.airforce.layout.click){
                        this.airforce.layout.clickfn();
                    }
                    if(this.airforce.layout && this.airforce.layout.icon_url){
                        this.$router.push(this.airforce.layout.icon_url);
                    }
                }catch (e){ }
            }
        },
    }
</script>

<style scoped lang="less">
.layout-header{
    .layoutXHeaderBox{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1000;
        .layoutXHeader{
            background-color: #f38431;
            width: 100%;
            &/deep/ .vux-header-left{
                .left-arrow{
                    &:before{
                        border-color: #ffffff;
                    }
                }
            }
            .layoutXHeaderRight{
                color: #ffffff;
                font-size: 25px;
                position: relative;
                &.infoSelect{
                    &:before{
                        content: '';
                        position: absolute;
                        right: 5px;
                        top: -2px;
                        width: 8px;
                        height: 8px;
                        border-radius: 100%;
                        background-color:#f00;
                    }
                }
                &.layoutXHeaderRight_txt{
                    color: #ffffff;
                    font-size: 16px;
                }
            }
        }
        .layoutFlexbox{
            background-color: #fbf2dd;
            line-height: 40px;
            padding: 0 15px;
            color: #f38431;
            .iconfont{
                font-size: 25px;
            }
            .marquee{
                position: relative;
                marquee{
                    position: absolute;
                    left: 0;
                    top: 0;
                    padding-right: 50px;
                }
            }
        }
    }
}
</style>