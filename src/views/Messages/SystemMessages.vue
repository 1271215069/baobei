<template>
    <div class="SystemMessages">
        <card v-for="(item, index) in list" :class="(item.is_look == '0')? 'is_look' : ''" :key="index" :header="{title:`<span class='iconfont'>${icon}</span>${item.title}`}" :footer="{title:dateFormatFn(item.time,'YYYY-MM-DD HH:mm:ss')}"  @click.native="goLink(item,item.link)">
            <div slot="content" class="cardContent">{{item.content}}</div>
        </card>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex"
    import { Card, dateFormat } from  "vux"
    export default {
        name: "system-messages",
        components:{
            Card
        },
        data(){
            return {
                icon:"&#xe647",
                list:[],
            }
        },
        methods:{
            ...mapActions(['action']),
            goLink(item,link){
                this.action({
                    moduleName:'selectMessages',
                    goods:item
                });
                this.$router.push('/app/HomeLayout/MessageDetails')
            },
            dateFormatFn(val,str){
                var d = new Date();
                d.setTime(val);
                return dateFormat(d,str);
            }
        },
        computed:{
            ...mapGetters(['airforce']),
        },
        mounted(){
            this.action({
                moduleName:'SystemMessagesList',
                method:'post',
                url:"app/message/messagelist",
                isFormData:true,
                data:{
                    uid:this.airforce.login_post.data.uid,
                    token:this.airforce.login_post.data.token,
                    type:1
                }
            }).then(res=>{
                if(res.code != 200){
                    this.$vux.toast.text(res.message);
                    return;
                }
                if(res.data){
                    this.list = res.data;
                }
            }).catch(err=>{
                this.$vux.toast.text(err);
            });
        }
    }
</script>

<style scoped lang="less">
.SystemMessages{
    .cardContent{
        padding:0 15px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .abcs{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    /deep/ .weui-panel__hd{
        color: #f3981e;
        .abcs;
        &:after{
            content: '';
            border: none;
        }
        .iconfont{
            background-color: #f3981e;
            @index:20px;
            width: @index;
            height: @index;
            display: inline-block;
            color: #ffffff;
            font-size: 16px;
            border-radius: 4px;
            line-height: @index;
            text-align: center;
            margin-right: 5px;
        }
    }
    /deep/ .weui-panel__ft{
       text-align: right;
        .abcs;
        .weui-cell{
            &:before{
                content: '';
                border: none;
            }
        }
    }
    .is_look{
        .cardContent{
            font-weight: bold;
        }
        /deep/ .weui-panel__hd{
            .cardContent;
        }

    }
}
</style>