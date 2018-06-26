<template>
	<div class="about">
		<x-img :src="logo" class="logo"></x-img>
		<div class="version">版本号 {{(airforce.app_info.version)? airforce.app_info.version : '0.0.1'}}</div>
		<group gutter="0">
			<cell-box is-link @click.native="goAbout">检测更新 <badge v-if="this.airforce.app_info.isNewV" text="new" class="aboutBadge"></badge></cell-box>
		</group>
        <check-update :update="update"></check-update>
	</div>
</template>

<script>
	import { Group, Cell, CellBox, XImg, Badge } from 'vux'
	import CheckUpdate from '@/components/CheckUpdate.vue'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'about',
		...mapActions,
		computed: mapGetters({
			airforce: 'airforce'
		}),
		data() {
			return {
				logo:require("@/assets/img/logo.png"),
                update:false,
			}
		},
		methods: {
			...mapActions(['action']),
            goAbout(){
                this.update = true;
                setTimeout(()=>{
                    this.update = false;
                },500)
			}
		},
		components: {
			Group,
			Cell,
			CellBox,
            XImg,
            Badge,
            CheckUpdate
		},
		mounted() {
			if(window.plus && window.getWgtVer){
                window.getWgtVer((info) => {
					this.action({
						moduleName:'app_info',
						goods:info,
					})
                })
			}
		}
	}
</script>

<style scoped lang="less">
	.about{
		padding-top: 50px;
		.logo{
			width: 50px;
			margin: auto;
			display: block;
			margin-bottom: 10px;
		}
		.version{
			text-align: center;
			margin-bottom: 30px;
		}
        .aboutBadge{
            margin-left: 10px;
        }
	}
</style>