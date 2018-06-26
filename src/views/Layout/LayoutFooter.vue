<template>
    <div class="LayoutFooter">
        <tabbar :class="`homeTabbar ${(!airforce.layout.navShow)? 'hide':''}`">
            <tabbar-item @on-item-click="tabMenuNav" class="homeTabbarItem" v-for="(item,index) in airforce.homeTabbar" :key="index" :selected="item.selected">
                <div slot="icon" v-if="!item.iconSelectBool" class="iconfont" v-html="item.icons"></div>
                <div slot="icon" v-else class="iconfont" v-html="item.iconsSelect"></div>
                <span slot="label" :ref="'LayoutFooterhomeTabbarItem'+index">{{item.txt}}</span>
            </tabbar-item>
        </tabbar>
        <div style="display: none">{{watchObj}}</div>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "layout-footer",
        components:{
            Tabbar, TabbarItem,
        },
        methods: {
            ...mapActions(['action']),
            tabMenuNav(e){
                const homeTabbar = JSON.parse(JSON.stringify(this.airforce.homeTabbar));
                for(let i in homeTabbar){
                    homeTabbar[i].iconSelectBool = false;
                }
                homeTabbar[e].iconSelectBool = true;
                this.action({
                    moduleName:'homeTabbar',
                    goods:homeTabbar
                });
                try {
                    for(let i in this.$refs){
                        this.$refs[i][0].className = "";
                    }
                    this.$refs['LayoutFooterhomeTabbarItem'+e][0].className = "selectObj"
                }catch (e){}
                this.$router.push(homeTabbar[e].link)
            }
        },
        computed:{
            ...mapGetters({
               airforce: 'airforce'
           }),
           watchObj(){
                if(typeof this.airforce.layout.homeTabbarIndex == 'number'){
                    this.tabMenuNav(this.airforce.layout.homeTabbarIndex)
                }
           }
        } ,
    }
</script>

<style scoped lang="less">
.LayoutFooter{
    &/deep/ .homeTabbar{
        position: fixed;
        .homeTabbarItem{
            .weui-tabbar__label{
                color: #999999;
            }
            &.weui-tabbar__item{
                text-decoration: none;
                outline: medium;
            }
            .iconfont{
                color: #999999;
                height: 27px;
                font-size: 27px;
                line-height: 27px;
            }
            &.weui-bar__item_on{
                .weui-tabbar__icon{
                    .iconfont{
                        color: #f38431;
                    }
                }
                .weui-tabbar__label{
                    span{
                        color: #f38431;
                    }
                }
            }
        }
        &.hide{
            display: none;
        }
    }
}
</style>