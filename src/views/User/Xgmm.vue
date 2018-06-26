<template>
	<div class="wrapper">
		<div class="wrappermain">
			<input type="text" name=""  v-model="oldpwd" placeholder="请输入您的原密码"/>
			<input type="password" name=""  v-model="newpwd" placeholder="请输入您的新密码"/>
			<input type="password" name=""  v-model="agapwd" placeholder="请再次输入您的新密码"/>
			<button type="submit" @click.prevent="ensure">确定修改</button>
			<toast v-model="alt.show" type="text" :text="alt.val"></toast>
		</div>
	</div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Toast } from 'vux'
import { Group, Cell, CellBox } from 'vux'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'user',
  ...mapActions,
  computed: mapGetters({
    airforce: 'airforce'
  }),
  data () {
    return {
      msg: '修改密码',
      oldpwd: '',
      newpwd: '',
      agapwd: '',
      alt: {
        show: false,
        val: ''
      },
      yz: /^[a-zA-Z\d_]{8,}$/
    }
  },
  methods: {
    ...mapActions(['action']),
    ensure () {
      if (!this.yz.test(this.newpwd)) {
        this.alt.show = true
        this.alt.val = '新密码需8位以上字母或数字'
        return false
      }
      if (this.newpwd !== this.agapwd) {
        this.alt.show = true
        this.alt.val = '两次密码输入不一致'
        return false
      }
      let e = this.airforce.login_post
      this.action({
        moduleName: 'editNickName',
        method: 'post',
        url: 'app/Member/resetpassword',
        isFormData: true,
        data: {
          uid: e.data.uid,
          token: e.data.token,
          newpass: this.newpwd,
          newpass2: this.agapwd,
          oldpass: this.oldpwd
        }
      }).then(d => {
        if (d.code == 200) {
          this.alt.val = '修改成功'
          this.alt.show = true
          var that = this
          setTimeout(function () {
            that.$router.push({
              path: '/login'
            })
          }, 2000)
        } else {
          this.alt.val = d.message
          this.alt.show = true
        }
      })
    }

  },
  components: {
    Toast,
    Group,
    Cell,
    CellBox,
    XHeader,
	Actionsheet,
	ButtonTab,
		    ButtonTabItem
  },
  created () {

  }
}
</script>

<style scoped lang="less">
	input:focus{
		outline: none;
	}

	.wrapper{

		font-size: 14px;
		font-family: "微软雅黑";

		.wrappermain{
			margin-top: 40px;
			input{
				display: block;
				width: 100%;
				height: 42px;
				line-height: 42px;
				border: none;
				box-sizing: border-box;
				padding: 0 5%;
			}
			button{
				display: block;
				width: 80%;
				margin: 0 auto;
				border: none;
				border-radius: 8px;
				background: #fe7f19;
				line-height: 30px;
				text-align: center;
				color: white;
		/*		background: #f8f8f8;*/
				font-size: 17px;
				line-height: 40px;
				margin-top: 30px;
			}
		}
	}
</style>
