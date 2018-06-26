<template>
    <div class="HomeLayout">
            <layout-header></layout-header>
                <div class="homeMain">
                    <!--<transition-->
                            <!--v-on:before-enter="beforeEnter"-->
                            <!--v-on:enter="enter"-->
                            <!--v-on:leave="leave"-->
                            <!--v-bind:css="false"-->
                    <!--&gt;-->
                        <router-view :class="`animated homeMainView ${airforce.layout.animatedName}`"></router-view>
                    <!--</transition>-->
                </div>
            <layout-footer></layout-footer>
    </div>
</template>

<script>
    import LayoutHeader from './LayoutHeader'
    import LayoutFooter from './LayoutFooter'
    // import Velocity from 'velocity-animate'
    import { mapGetters } from "vuex"
    export default {
        name: "home-layout",
        components:{
            LayoutHeader, LayoutFooter
        },
        computed:{
            ...mapGetters(['airforce'])
        },
        methods:{
            // beforeEnter: function (el) {
            //     el.style.opacity = 0
            //     el.style.transformOrigin = 'left'
            // },
            // enter: function (el, done) {
            //     Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
            //     Velocity(el, { fontSize: '1em' }, { complete: done })
            // },
            // leave: function (el, done) {
            //     Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
            //     Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
            //     Velocity(el, {
            //         rotateZ: '45deg',
            //         translateY: '30px',
            //         translateX: '30px',
            //         opacity: 0
            //     }, { complete: done })
            // }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="less">
.HomeLayout{
    .homeMain{
        padding-bottom: 50px;
    }
}

</style>