<template>
    <div>
        <div v-if="type == 2" class="imagesUploadTitle">{{title}}</div>
        <div class="imagesUpload">
            <flexbox v-if="type != 2">
                <flexbox-item :span="`60px`">
                    <img :src="imgSrcNew" ref="img_" v-if="!off" class="imagesUploadShowImgObj">
                    <img :src="off" ref="img_" v-if="off" class="imagesUploadShowImgObj">
                </flexbox-item>
                <flexbox-item :class="(percentIndex == 100) ? 'imgZoomIn' : ''">
                    <vue-core-image-upload v-if="!off"
                            class="vue-core-image-upload"
                            :crop="false"
                            @imageuploaded="imageuploaded"
                            @imageuploading="imageuploading"
                            @imagechanged="imagechanged"
                            @errorhandle="errorhandle"
                            :data="newData"
                            :max-file-size="maxFileSize"
                            text=""
                            :inputOfFile="inputOfFile"
                            :credentials="credentials"
                            :url="url" >
                    </vue-core-image-upload>
                    <div class="imagesUploadTxt">{{text}}
                        <span  v-if="!off" :class="`${(percentIndex == 100)? 'ok' : ''}`">
                            {{percentIndex}}%
                        </span>
                        <span v-if="off" class="ok">100%</span>
                    </div>
                    <div class="imagesUploadTxt text2" v-if="text2">{{text2}}</div>
                    <x-progress v-if="!off" :percent="percentIndex" :show-cancel="false"></x-progress>
                    <x-progress v-if="off" :percent="100" :show-cancel="false"></x-progress>
                </flexbox-item>
            </flexbox>
            <div v-if="type == 2" class="type2Box">
                <img :src="item"  v-if="isImgs && typeof imgSrcNew == 'object'" v-for="item in imgSrcNew" class="imagesUploadShowImgObj">
                <vue-core-image-upload
                        class="vue-core-image-upload more"
                        :crop="false"
                        @imageuploaded="imageuploaded"
                        @imageuploading="imageuploading"
                        @imagechanged="imagechanged"
                        @errorhandle="errorhandle"
                        :data="newData"
                        :max-file-size="maxFileSize"
                        :multiple="true"
                        :multiple-size="100"
                        text=""
                        :inputOfFile="inputOfFile"
                        :credentials="credentials"
                        :url="url" >
                    <img :src="src" class="imagesUploadShowImgObj">
                </vue-core-image-upload>
            </div>
        </div>
    </div>
</template>

<script>
    import VueCoreImageUpload from 'vue-core-image-upload'
    import { Flexbox, FlexboxItem, XProgress } from 'vux'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "images-upload",
        props:{
           type:{
               type:Number,
               default:0
           },
           title:{
               type:String,
               default:null
           },
           text:{
               type:String,
               default:''
           },
           text2:{
               type:String,
               default:null
           },
            toastText:{
               type:String,
               default:null
           },
            name:{
               type:String,
               default:null
           },
            data:{
               type:Object,
               default:function () {
                   return {}
               }
           },
            maxFileSize:{
               type:Number,
               default:10010485760
           },
            url:{
               type:String,
               default:`${$$rootUrl}app/installment/upfile`
           },
           src:{
               type:String,
               default:require("@/assets/img/home/upload.png")
           },
           imgSrc:{
               type:String,
               default:null
           },
            credentials:{
               type:Boolean,
               default:false
           },
            inputOfFile:{
               type:String,
               default:'file'
           },
            ossUrl:{
               type:String,
               default:`app/installment/upcardphone`
           },
            orderNo:{
               type:String,
               default:null
           },
            prefix:{
               type:String,
               default:"upload_"
           },
            off:{
               type:String,
               default:null
           }
        },
        data(){
            return {
                percentIndex:0,
                time:0,
                base64:null,
                base64Url:null,
                base64Url2:[],
                isImgs:false,
            }
        },
        methods: {
            ...mapActions(['action']),
            imageuploaded(res) {
                clearInterval(this.time);
                if (res.code == 200) {
                    this.base64Url = this.base64;
                    this.base64 = null;
                    this.percentIndex = 100;
                    this.$root.$children[0].imgZoomIn();
                    if(this.toastText){
                        this.$vux.toast.show({
                            text:`【${this.toastText}】上传成功`,
                            type:"text",
                            width:"80%",
                            position:"bottom",
                        });
                    }
                    if(this.type != 2){
                        this.action({
                            moduleName:'homeSubmit',
                            goods:_.set({},this.prefix+this.inputOfFile,{
                                bool:true,
                                base64Url:this.base64Url,
                            })
                        });
                    };
                    if(this.ossUrl){
                        this.action({
                            moduleName:"OSSupcardphone",
                            method:"post",
                            url:this.ossUrl,
                            data:{
                                ...this.newData,
                                type:this.inputOfFile,
                            },
                            isFormData:true,
                        });
                    };
                }else {
                    this.base64Url2.pop();
                    this.percentIndex = 0;
                    if(this.toastText) {
                        this.$vux.toast.show({
                            text: `【${this.toastText}】上传失败<br>${res.message}`,
                            type: "text",
                            width: "80%",
                            position: "bottom",
                        });
                    }
                    if(this.name) {
                        this.action({
                            moduleName: 'homeSubmit',
                            goods: _.set({},this.prefix+this.inputOfFile, undefined)
                        });
                    }
                }
            },
            errorhandle(){
                this.base64Url2.pop();
                clearInterval(this.time);
                this.percentIndex = 0;
                if(this.toastText) {
                    this.$vux.toast.show({
                        text: `【${this.toastText}】上传失败`,
                        type: "text",
                        width: "80%",
                        position: "bottom",
                    });
                }
                if(this.name) {
                    this.action({
                        moduleName: 'homeSubmit',
                        goods: _.set({},this.prefix+this.inputOfFile, undefined)
                    });
                }
            },
            imageuploading(e){
                this.toUrl(e,base64=>{
                    this.base64 = base64;
                });
                let index = 0;
                this.time = setInterval(()=>{
                    if(index < 96){
                        index += 3;
                        this.percentIndex = index;
                    }else {
                        clearInterval(this.time);
                    }
                },100)
            },
            toUrl(e,fn){
                let file = new FileReader();
                file.readAsDataURL(e);
                file.onload = d => {
                    let base64 = d.target.result || d.currentTarget.result || d.srcElement.result;
                    fn(base64);
                };
            },
            imagechanged(e){
                if(this.type == 2){
                    this.isImgs = true;
                    if(!e.length){
                        this.toUrl(e,base64=>{
                            this.base64Url2.push(base64);
                        });
                        this.action({
                            moduleName: 'homeSubmit',
                            goods: _.set({},this.prefix+this.inputOfFile, this.base64Url2)
                        });
                        return;
                    }
                    for(let i = 0 ; i < e.length ; i++){
                        this.toUrl(e[i],base64=>{
                            this.base64Url2.push(base64);
                        });
                    }
                    this.action({
                        moduleName: 'homeSubmit',
                        goods: _.set({},this.prefix+this.inputOfFile, this.base64Url2)
                    });
                }
            }
        },
        computed: {
            ...mapGetters(['airforce']),
            imgSrcNew(){
                if(this.type == 2 && this.base64Url2){
                    return this.base64Url2;
                }
                if(this.base64Url){
                    return this.base64Url;
                }
                if(this.imgSrc){
                    this.percentIndex = 100;
                    return this.imgSrc;
                }
                return this.src;
            },
            newData(){
                let orderid = '';
                try {
                    if(this.$router.currentRoute.query.editor == "true"){
                        orderid = this.airforce.getperiods.data.orderid
                    }else {
                        orderid = this.airforce.home_post.data.orderid;
                    }
                }catch (e){}
               let retData = {};
               try {
                   retData = {
                       uid:this.airforce.login_post.data.uid,
                       token:this.airforce.login_post.data.token,
                   }
                   if(this.orderNo){
                       retData.order_no = this.orderNo;
                   }
                   if(orderid.length > 0){
                       retData.orderid = orderid;
                   }
               } catch (e){}
               for(let i in this.data){
                   retData[i] =this.data[i];
               }
               return retData;
            }
        },
        components:{
            VueCoreImageUpload, Flexbox, FlexboxItem, XProgress
        },
        mounted(){
            try {
                let base64Url = this.airforce.homeSubmit[this.prefix+this.inputOfFile];
                if(base64Url){
                    if(base64Url.base64Url && base64Url.bool){
                        this.base64Url = base64Url.base64Url;
                    }
                    if(this.type == 2){
                        this.isImgs = true;
                        this.base64Url2 = base64Url;
                    }
                    this.percentIndex = 100;
                }
            }catch (e){}
            if(this.off){
                this.action({
                    moduleName:'homeSubmit',
                    goods:_.set({},this.prefix+this.inputOfFile,{
                        bool:true,
                        base64Url:this.off,
                    })
                });
            }
        },
    }
</script>

<style scoped lang="less">
    .imagesUploadTitle{
        padding: 10px 15px;
        color: #666;
    }
    .imagesUpload{
        padding: 10px 15px;
        background-color: #ffffff;
        margin: 5px 0;
        .vux-flexbox{
            position: relative;
            .vux-flexbox-item{
                &.imgZoomIn{
                    position: relative;
                }
                .imagesUploadShowImgObj{
                    width: 100%;
                    display: block;
                    height: 60px;
                }
                .vue-core-image-upload{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }
                .imagesUploadTxt{
                    margin-bottom: 10px;
                    overflow: hidden;
                    color: #666;
                    span{
                        float: right;
                        &.ok{
                            color: #fb7f1a;
                        }
                    }
                    &.text2{
                        color: #fb7f1a;
                    }
                }
                &/deep/ .weui-progress__inner-bar{
                    background-color: #fb7f1a;
                }
            }
        }
        .type2Box{
            .imagesUploadShowImgObj{
                width: 60px;
                height: 60px;
                float: left;
                margin-left: 5px;
            }
            &/deep/ .vue-core-image-upload{
                width: 60px;
                .imagesUploadShowImgObj{
                    width: 60px;
                    height: 60px;
                    float: left;
                }
                &.more{
                    width: auto;
                    display: inline-block;
                    .imagesUploadShowImgObj{
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>