<template>
  <div>
    <h1 class="hello">{{msg}}</h1>
    <group>
      <cell title="title" value="value"></cell>
    </group>
    <x-button>asda</x-button>
    <x-button type="primary" @click.native="goHome()">asda</x-button>
  </div>

</template>

<script>
import { Group, Cell, XButton } from 'vux'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
    ...mapActions,
  computed: mapGetters({
      airforce: 'airforce'
  }),
  data () {
    return {
      msg: '保呗分期App项目'
    }
  },
  methods: {
      ...mapActions(['action']),
      goHome(){
          this.$router.push("/")
      }
  },
  components: {
      Group,
      Cell,
      XButton
  },
  created(){
    this.action({
        moduleName:"s",
        goods:"1212"
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello{
    text-align: center;
  }
</style>
