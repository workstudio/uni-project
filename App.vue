<script>
	/*
	 * 追格小程序 v1.4.0
	 * Author: 追格
	 * Help document: https://www.zhuige.com
	 * Copyright © 2021-2022 www.zhuige.com All rights reserved.
	 */
	
	import Vue from 'vue'
	import Util from '@/utils/util';
	import Api from '@/utils/api';
	import Rest from '@/utils/rest';
	
	export default {
		globalData: {
			appName: '',
			appDesc: '',
			appLogo: '',
		},
		
		onLaunch() {
			Rest.post(Api.URL('setting', 'global')).then(res => {
				getApp().globalData.appName = res.data.title;
				getApp().globalData.appDesc = res.data.desc;
				getApp().globalData.appLogo = res.data.logo;
			}, err => {
				console.log(err)
			});
		},
		
		onShow() {
			
		},
		
		onHide() {
			
		}
	}
</script>

<style lang="scss">
// 导入colorUI
@import '/static/css/colorui/main.css';
@import '/static/css/colorui/icon.css';
@import '/static/css/colorui/animation.css';
// 导入阿里巴巴矢量图标库
/*#ifdef MP*/
@import './static/css/iconfont/iconfont.css';
/*#endif*/
/*#ifndef MP*/
@import url('https://at.alicdn.com/t/font_1681579_dwilkcq6mvg.css');
/*#endif*/
@import './static/css/reset.scss';
@import './static/css/uni.scss';

	/*每个页面公共css */
	@import "style/main.css";
	@import "style/list.css";
	
	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}	
	
</style>
