<template>
  <div id="app">
      <!--引导页-->
      <swiper class="guidePage" v-if="guidePageShow" :list="banners" :show-desc-mask="false"></swiper>

      <div id="appView" ref="appView">
          <loading v-model="isLoading"></loading>
          <router-view/>
          <check-update :update="update"></check-update>
      </div>
      <previewer ref="previewer" :list="imgList" @on-close="closePreviewer"></previewer>
  </div>
</template>

<script>
import { Loading, Previewer, Swiper } from 'vux'
import Hammer from 'hammerjs'
import { mapState, mapActions, mapGetters } from 'vuex'
import CheckUpdate from '@/components/CheckUpdate.vue'
export default {
  name: 'App',
  data(){
    return {
        update:false,
        banners:[],
        confirmBack:0,
        imgList:[],
        path:null,
        isClosePreviewer:false,
        guidePageShow:false,
        banners:[
            {
                url: 'javascript:',
                img: require('@/assets/img/banner/banner1.png'),
                title: ''
            },
            {
                url: 'javascript:',
                img: require('@/assets/img/banner/banner1.png'),
                title: ''
            },
            {
                url: 'javascript:',
                img: require('@/assets/img/banner/banner1.png'),
                title: ''
            },
        ],
    }
  },
  components: {
      Loading, CheckUpdate, Previewer, Swiper
  },
  computed: {
      ...mapGetters(['airforce']),
      ...mapState({
          isLoading: state => state.vux.isLoading,
      })
  },
  methods:{
      ...mapActions(['action']),
      //路由返回处理
      notWhiteListBack(event){
          var  callback = new Function();
          if(typeof event == "function"){
              callback = event;
          };
          //白名单
          const whiteList = ["车险分期","分期订单","工具","我的","登录"];
          if(!whiteList.some(title=>{return title == this.airforce.layout.title; })){
              if(this.isClosePreviewer){
                  this.$refs.previewer.close();
                  return;
              }
              this.$router.back();
          }else {
              callback();
          };
      },
      //获取所有ref节点
      getRefsAll(refs,children){
          try {
              children = children || this.$children;
              var refs = refs || [this.$refs];
              children.forEach((el)=>{
                  refs.push(el.$refs);
                  if(el.$children.length > 0){
                      this.getRefsAll(refs,el.$children);
                  };
              });
              return refs;
          }catch (e){
              return [];
          }
      },
      closePreviewer(){
          this.isClosePreviewer = false;
      },
      //图片放大查看
      imgZoomIn(prefix){
          prefix = prefix || "img_";
          if(this.$router.currentRoute.path != this.path){
              try {
                  this.getRefsAll().forEach((ref)=>{
                      for(let key in ref){
                          if(key.indexOf(prefix) > -1){
                              let el = ref[key].$el || ref[key];
                              el.addEventListener("click",()=>{
                                  this.imgList = [
                                      {
                                          src:el.src
                                      }
                                  ];
                                  setTimeout(()=>{
                                      this.$refs.previewer.show(0);
                                      this.isClosePreviewer = true;
                                  },30);
                              });
                          };
                      };
                  });
              }catch (e){}
              this.path = this.$router.currentRoute.path;
          }
      },
  },
  mounted(){
      var time = setInterval(()=>{
          //检测版本更新
          if(window.checkUpdate){
              window.checkUpdate({
                  bool:true,
                  callback:()=>{
                      this.action({
                          moduleName:"app_info",
                          goods:{
                              isNewV:true,
                          }
                      });
                      this.$vux.confirm.show({
                          title:"软件更新提示",
                          content:"【更新】优化了一些细节",
                          confirmText:"马上更新",
                          cancelText:"稍后更新",
                          onCancel:()=>{
                          },
                          onConfirm:()=> {
                              this.update = true;
                              setTimeout(()=>{
                                  this.update = false;
                              },500);
                          }
                      })
                  }
              });
              //监听安卓返回键
              if(window.backListener && window.backListener.start){
                  window.backListener.start(()=> {
                      this.notWhiteListBack(()=>{
                          if(this.confirmBack > 0){
                              plus.runtime.quit();
                              return;
                          };
                          this.$vux.toast.show({
                              text:"再次点击退出",
                              type:"text",
                              width:"auto",
                              position:"bottom",
                          });
                          this.confirmBack += 1;
                          setTimeout(()=>{
                              this.confirmBack = 0;
                          },2500);
                      });
                  });
              };
              clearInterval(time);
          }
      },200);
      setTimeout(()=>{
          clearInterval(time);
      },10000);

      //滑动返回上一页
      var h = new Hammer(this.$refs.appView);
      h.on('swiperight',(e) =>{
          this.notWhiteListBack(e);
      });
      //图片缩放查看
      this.imgZoomIn();
  },
  updated(){
      //图片缩放查看
      this.imgZoomIn();
  }
}
</script>

<style lang="less">
    #appView{
        min-height: 100%;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }
  @import '~vux/src/styles/reset.less';
  @import './assets/css/animate.min.css';
  @import './assets/css/publicCeset.less';
  //*
  @font-face {
    font-family: 'iconfont';
    src: url('./assets/fonts/iconfont.eot');
    src: url('./assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/iconfont.woff') format('woff'),
    url('./assets/fonts/iconfont.ttf') format('truetype'),
    url('./assets/fonts/iconfont.svg#iconfont') format('svg');
  }
  //*/
  /*
  @Nb:"font_590408_fgip3g4snd5z5mi";
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/@{Nb}.eot');
    src: url('//at.alicdn.com/t/@{Nb}.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/@{Nb}.woff') format('woff'),
    url('//at.alicdn.com/t/@{Nb}.ttf') format('truetype'),
    url('//at.alicdn.com/t/@{Nb}.svg#iconfont') format('svg');
  }
  //*/
  .iconfont{
    font-family: 'iconfont';
  }
  body{
    background-color: #f7f6f5;
  }
  .vux-confirm{}
  .HomeXbutton{
    width: 80% !important;
    border: none !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    background-color: #f19820 !important;
    color: #fff !important;
    margin-top: 40px !important;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.09) !important;
    margin-bottom: 100px !important;
    &:active {
      border-color: rgba(241, 152, 32, 0.6) !important;
      background-color: rgba(241, 152, 32, 0.6) !important;
    }
    &:after{
      border: none !important;
    }
  }
  #app{
      .guidePage{
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          background-color: #ffffff;
          .vux-swiper{
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%  !important;
              z-index: 1000;
              .vux-swiper-item{
                  a{
                      .vux-img{
                          background-size: 100% 100%;
                      }
                  }
              }
          }
          .vux-indicator-right{
              position: fixed;
              z-index: 1001;
              width: 80%;
              right: 10%;
              text-align: center;
              a{
                  float: none;
              }
          }
      }
  }

</style>
