<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello!'
			}
		},
		onLoad() {
			this.doLogin()
		},
		onShow() {
			console.log('on show')
		},
		methods: {
			doLogin() {
				uni.login({
					provider: 'weixin',
					success: res => {
						console.log(res)
						if(res.code) {
							uni.request({
								url: 'http://127.0.0.1:8899/api/login',
								method: 'POST',
								data: {
									code: res.code
								},
								success: res1 => {
									console.log(res1)
									if(res1.data.code !== 0){
										return uni.showToast({
											title: res1.data.msg
										});
									}
									let data = res1.data.data
									if(data.openid) {
										uni.setStorageSync('openid', data.openid)
										uni.navigateTo({
											url: '/pages/user/user'
										})
									}
								},
								fail: () => {},
								complete: () => {}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
