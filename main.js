import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from '@/store';

import $mAssetsPath from '@/config/assets.config.js';
import $mSettingConfig from '@/config/setting.config.js';
import $mConstDataConfig from '@/config/constData.config.js';
import $mGraceChecker from '@/utils/graceChecker';
import $mFormRule from '@/config/formRule.config.js';
import $mHelper from '@/utils/helper';
import $mRouter from '@/utils/router';

Vue.prototype.$mAssetsPath = $mAssetsPath;
Vue.prototype.$mConstDataConfig = $mConstDataConfig;
Vue.prototype.$mSettingConfig = $mSettingConfig;
Vue.prototype.$mGraceChecker = $mGraceChecker;
Vue.prototype.$mFormRule = $mFormRule;
Vue.prototype.$mHelper = $mHelper;
Vue.prototype.$mRouter = $mRouter;

Vue.prototype.$mStore = store;

Vue.config.productionTip = false
App.mpType = 'app'

// 路由导航
$mRouter.beforeEach((navType, to) => {
	if (to.route === undefined) {
		throw '路由钩子函数中没有找到to对象，路由信息:' + JSON.stringify(to);
	}
	if (to.route === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.reLaunch({
			url: $mHelper.objParseUrlAndParam($mRoutesConfig.main.path)
		});
		return;
	}
	// 过滤需要权限的页面
	if (to.route.requiresAuth) {
		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: $mHelper.objParseUrlAndParam(to.route.path, to.query)
			});
		} else {
			// 登录成功后的重定向地址和参数
			const query = {
				redirectUrl: to.route.path,
				...to.query
			};
			// 没有登录 是否强制登录?
			if (store.state.forcedLogin) {
				uni.redirectTo({
					url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
				});
			} else {
				uni.navigateTo({
					url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
				});
			}
		}
	} else {
		uni[navType]({
			url: $mHelper.objParseUrlAndParam(to.route, to.query)
		});
	}
});


Vue.mixin({
	computed: {
		themeColor: {
			get () {
				return store.getters.themeColor;
			},
			set (val) {
				store.state.themeColor = val;
			}
		}
	}
});

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

// 设置微信小商店【店铺按钮】仅适用于调试库2.25.4以下版本
// // #ifdef MP-WEIXIN
// {
// 	const miniShopPlugin = requirePlugin('mini-shop-plugin');
// 	miniShopPlugin.initApp(getApp(), wx)
// 	if (miniShopPlugin) {
// 		miniShopPlugin.initHomePath('/pages/wxmall/index/index');
// 	}
// }
// // #endif
