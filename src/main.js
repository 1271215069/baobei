// 入口
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入plus封装
import '@/assets/js/plus.js'
import * as filters from './filters/index'
// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 页面切换loading加载动画
store.registerModule('vux', {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
router.beforeEach(function (to, from, next) {
  // 初始化haeder头部的参数
  store.commit('AIRFORCE_DO', {
    data: {
      moduleName: 'layout',
      goods: _.merge({
          title: to.name,
          marquee: false,
          showBack: true,
          head_type: 0,
          navShow: true,
          icon_url: false,
          click:false,
          clickfn:null,
          homeTabbarIndex:null,
          animatedName:'',
      }, to.meta)
    }
  })
  try {
    // 写入登入数据
    if (!store.state.airforce.login_post && localStorage.login_post) {
      store.commit('AIRFORCE_DO', {
        data: {
          moduleName: 'login_post',
          goods: JSON.parse(localStorage.login_post)
        }
      })
    }
  } catch (e) {}
  // XInput数据双向绑定兼容
  store.commit('AIRFORCE_DO', {
    data: {
      moduleName: 'change',
      goods: {
        set: (e, a, moduleName) => {
          store.commit('AIRFORCE_DO', {
            data: {
              moduleName: moduleName,
              goods: _.set({}, a, e)
            }
          })
        }
      }
    }
  })
  // 显示加载动画
  store.commit('updateLoadingStatus', {isLoading: true})
  // 白名单路由
  const whiteList = ['/Login', '/app/register', '/app/forgetPwd']
  // 判断是否登陆及相关跳转
  if (store.state.airforce.login_post && store.state.airforce.login_post.code == 200) {
    if (to.path === '/Login') { // 已登陆时自动跳转首页
      next('/app/HomeLayout/home')
    } else {
      next() // 直接进入
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/Login') // 否则全部重定向到登录页
    }
  }
})

router.afterEach(function (to) {
  // 隐藏加载动画
  store.commit('updateLoadingStatus', {isLoading: false})
})

Vue.config.productionTip = false
// 弹出层引入
import { AlertPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

/* 实例化 */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
