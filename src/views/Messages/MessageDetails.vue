<template>
    <div class="MessageDetails">
        <h4 class="header">{{airforce.selectMessages.title}}</h4>
        <div class="content">{{airforce.selectMessages.content}}</div>
        <div class="footer">{{airforce.selectMessages.time | dateFormat("YYYY年MM月DD日",true)}}</div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex"
    export default {
        name: "message-details",
        components:{
        },
        data(){
            return {
            }
        },
        methods:{
            ...mapActions(['action']),
        },
        computed:{
            ...mapGetters(['airforce']),
        }
    }
</script>

<style scoped lang="less">
.MessageDetails{
    padding: 40px 30px;
    .header{
        text-align: center;
        margin-bottom: 15px;
    }
    .content{

    }
    .footer{
        text-align: right;
        margin-top: 15px;
    }
}
</style>