<template>
    <div class="wrapper">
        <div class="wcontent">
            <cell-box link="cxjsq" class="list">车险分期计算器</cell-box>
            <cell-box link="hljs" class="list">汇率计算</cell-box>
            <cell-box is-link link="" class="list" @click.native="alerts">房产分期</cell-box>
        </div>
    </div>

</template>

<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import { Group, Cell, CellBox, XButton } from 'vux'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'user',
  ...mapActions,
  computed: mapGetters({
    airforce: 'airforce'
  }),
  data () {
    return {
      msg: '工具'
    }
  },
  methods: {
    ...mapActions(['action']),
    alerts () {
      this.$vux.toast.text('正在玩命开发中....')
    }
  },
  components: {
    Group,
    Cell,
    CellBox,
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    XButton
  }
}
</script>

<style scoped lang="less">

    /** {
        margin: 0;
        padding: 0;
    }*/
    .wrapper{
        font-family: "微软雅黑";
        .wcontent{
            margin-top: 40px;
            .list{
                line-height: 50px;
                font-size: 16px;
                box-sizing: border-box;
                &:before{
                    position: absolute;
                    left: 0;
                }
            }
        }
    }
</style>
