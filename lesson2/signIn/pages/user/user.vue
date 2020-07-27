<template>
	<view class="main">
		<!-- 如果只是展示用户头像昵称，可以使用 <open-data /> 组件 -->
		<text v-if="nickName">Hello: {{nickName}}</text>
		<button v-if="!nickName" open-type="getUserInfo" @getuserinfo="getUserInfo" bindgetuserinfo="getUserInfo">授权登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: null
			}
		},
		methods: {
			getUserInfo() {
				let _this = this
				// 查看是否授权
				wx.getSetting({
					success (res){
						if (res.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							wx.getUserInfo({
								success: (res) => {
									console.log(res)
									if(res.userInfo)
										_this.nickName = res.userInfo.nickName
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.main{
		padding-top: 140px;
		text-align: center;
	}
</style>
