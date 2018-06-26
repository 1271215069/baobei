<template>
    <div class="Layout">
        <div :class="`layoutMain ${(airforce.layout.marquee)?'layoutMainMarquee':''}`">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "layout",
        computed: mapGetters({
            airforce: 'airforce'
        }),
    }
</script>

<style scoped lang="less">
    .layoutMain{
        margin-top: 46px;
        &.layoutMainMarquee{
            margin-top: 86px;
        }
    }
</style>