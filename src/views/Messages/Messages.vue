<template>
    <div class="Messages">
        <panel :list="list" type="5" class="MessagesPanel"></panel>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex"
    import { Panel, Badge } from "vux"
    export default {
        name: "messages",
        data(){
            return {
                // list: [{
                //     src: require("@/assets/img/Messages/icon1.png"),
                //     title: '订单审核消息',
                //     desc: '',
                //     url: '/app/HomeLayout/orderMessages'
                // }, {
                //     src: require("@/assets/img/Messages/icon2.png"),
                //     title: '系统更新消息',
                //     desc: '',
                //     url: '/app/HomeLayout/systemMessages'
                // }],
            }
        },
        components:{
            Panel, Badge
        },
        methods:{
            ...mapActions(['action'])
        },
        computed:{
            ...mapGetters(['airforce']),
            list(){
                try {
                    if(this.airforce.messagetype_post){
                        return this.airforce.messagetype_post.data.map(e=>{
                            switch (e.type){
                                case '1':
                                    e = _.merge(e,{
                                        src: require("@/assets/img/Messages/icon2.png"),
                                        title: `系统更新消息<span class="vux-badge ${(e.unread == '0')? 'notMessages':''}">${e.unread}</span>`,
                                        desc: '',
                                        url: '/app/HomeLayout/systemMessages'
                                    });
                                    break;
                                case '2':
                                    e = _.merge(e,{
                                            src: require("@/assets/img/Messages/icon1.png"),
                                            title: `订单审核消息<span class="vux-badge ${(e.unread == '0')? 'notMessages':''}">${e.unread}</span>`,
                                            desc: '',
                                            url: '/app/HomeLayout/orderMessages'
                                        });
                                    break;
                                default:
                                    break
                            }
                            return e;
                        });
                    }
                }catch(e) {}
                return [];
            }
        },
        mounted(){
           this.action({
               moduleName:"messagetype_post",
               method:'post',
               isFormData:true,
               url:'app/message/messagetype',
               data:{
                   uid:this.airforce.login_post.data.uid,
                   token:this.airforce.login_post.data.token,
               }
           }).then(res=>{
               if(res.code != 200){
                   this.$vux.toast.text(res.message);
                   return;
               }
           }).catch(err=>{
               this.$vux.toast.text(err);
           });
        }
    }
</script>

<style scoped lang="less">
.Messages{
    &/deep/ .MessagesPanel{
        .weui-media-box__desc{
            display: none;
        }
        .weui-media-box__info{
            .weui-media-box__desc;
        }
        .vux-badge{
            margin-left: 10px;
            &.notMessages{
                display: none;
            }
        }
    }
}
</style>