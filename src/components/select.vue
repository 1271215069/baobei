<template>
    <div class="select_components" v-if="moduleName">
        <flexbox class="select-flexbox" v-if="type != 'select'">
            <flexbox-item>
                <x-input label-width="100px"
                         :title="title"
                         :placeholder="placeholder"
                         :value="airforce[moduleName][name]"
                         @on-change="airforce.change.set($event,name,moduleName)"
                >
                </x-input>
            </flexbox-item>
            <flexbox-item span="90">
                <cell :class="`select-cell ${(airforce[moduleName][name+'_SelectTxt'])? 'select-cell-txt':''}`" is-link @click.native="select" :value="(airforce[moduleName][name+'_SelectTxt'])? airforce[moduleName][name+'_SelectTxt'] : selectPlaceholder" arrow-direction="down"></cell>
            </flexbox-item>
        </flexbox>
        <flexbox class="select-flexbox" v-else>
            <flexbox-item class="select-flexbox-item" :span="labelWidth || $parent.labelWidth || labelWidthComputed ">
                <div class="vux-x-input weui-cell">
                    <div class="weui-cell__hd">
                        <slot name="label">
                            <!--width: labelWidth || $parent.labelWidth || labelWidthComputed,-->
                            <label class="weui-label" :style="{ textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}" v-if="title" v-html="title"></label>
                        </slot>
                    </div>
                </div>
            </flexbox-item>
            <flexbox-item class="select-flexbox-item-right">
                <cell :value-align="valueAlign" :class="`select-cell ${(airforce[moduleName][name+'_SelectTxt'])? 'select-cell-txt':''}`" is-link @click.native="select" :value="(airforce[moduleName][name+'_SelectTxt'])? airforce[moduleName][name+'_SelectTxt'] : selectPlaceholder" arrow-direction="down"></cell>
            </flexbox-item>
        </flexbox>
        <popup-picker hidden @on-change="selectChange" :value="airforce[moduleName][name+'_SelectVal']" :columns="1" :data="data" :show="selectShow" @on-hide="selectHide"></popup-picker>
    </div>
</template>

<script>
    import { Cell, PopupPicker, Flexbox, FlexboxItem, XInput, Group } from "vux"
    import { mapGetters, mapActions } from "vuex"
    export default {
        name: "select-picker",
        components:{
            Cell, PopupPicker, Flexbox, FlexboxItem, XInput, Group
        },
        props:{
            data:{
              type:Array,
              default:function () {
                  return [];
              },
            },
            selectPlaceholder:{
              type:String,
              default:'请选择',
            },
            placeholder:{
              type:String,
              default:'',
            },
            title:{
              type:String,
              default:'',
            },
            type:{
              type:String,
              default:null
            },
            name:{
              type:String,
              default:'',
              required: true
            },
            moduleName:{
              type:String,
              default:null,
              required: true
            },
            valueAlign:{
              type:String,
              default:"left",
            },
            labelWidth: String,
        },
        data(){
          return {
              selectShow:false,
          }
        },
        methods:{
            ...mapActions(["action"]),
            select(){
                this.selectShow = true;
            },
            selectHide(e){
                this.selectShow = false;
            },
            selectChange(e){
                let findObj = _.find(this.data,o=>{
                    return o.value == e[0];
                });
                this.action({
                    moduleName:this.moduleName,
                    goods:_.set({},`${this.name}_Select`,findObj)
                    // goods:{
                    //     Authentication_pickerDataSlect:findObj,
                    // }
                });
                this.action({
                    moduleName:this.moduleName,
                    //airforce[moduleName][name+'_SlectTxt']
                    goods:_.set({},`${this.name}_SelectVal`,[findObj.value])
                });
                this.action({
                    moduleName:this.moduleName,
                    goods:_.set({},`${this.name}_SelectTxt`,findObj.name)
                });
            }
        },
        created(){
        },
        computed:{
            ...mapGetters(['airforce']),
            labelWidthComputed () {
                const width = this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
                if (width < 10) {
                    return width + 'em'
                }
            },
        }
    }
</script>

<style scoped lang="less">
.select_components{
    .select-flexbox{
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
        .select-flexbox-item{
            padding-right: 15px;
            .weui-cell{
                padding-right: 0;
            }
        }
        .select-flexbox-item-right{
            margin: 0 !important;
        }
    }
    &/deep/ .select-cell{
        padding-left: 0;
        &.select-cell-txt{
            .vux-cell-arrow-down{
                color: #000;
            }
        }
    }

}
</style>