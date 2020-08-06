<template>
	<view class="main">
		<!-- 如果只是展示用户头像昵称，可以使用 <open-data /> 组件 -->
		<button v-if="!nickName" open-type="getUserInfo" @getuserinfo="getUserInfo" bindgetuserinfo="getUserInfo">授权登录</button>
		<view v-if="nickName">
			<view>Hello: {{nickName}}</view>
			<view style="margin-top: 25px;">请选择要签到活动</view>
			<view>
				<view class="act" :key="i" v-for="(act, i) in acts">
					<text>{{act.name}}</text>
					<span v-if="act.signed">已签到</span>
					<span v-else @click="onSign(act.id)">签到</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {post} from '@/api/models.js'
	const QQMapWX = require('../../lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
	let qqmapsdk;
	export default {
		data() {
			return {
				nickName: null,
				acts: []
			}
		},
		onLoad() {
			this.nickName = uni.getStorageSync('nickName')
			this.getUserInfo();
			this.getActs();
			qqmapsdk = new QQMapWX({
				key: '申请的key'
			});
		},
		methods: {
			getUserInfo() {
				let _this = this
				// 查看是否授权
				wx.getSetting({
					success (res){
						console.log('getSetting', res)
						if (res.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							wx.getUserInfo({
								success: (res) => {
									console.log(res)
									if(res.userInfo)
										_this.nickName = res.userInfo.nickName
										post('user/setInfo', res.userInfo, res => {
											console.log(res)
										})
								}
							})
						}
					}
				})
			},
			getActs() {
				post('activities', {}, res => {
					console.log('activities', res)
					this.acts = res.list
				})
			},
			onSign(id) {
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						console.log(res)
						// todo https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/methodReverseGeocoder
						post('sign', {
							id:id,
							lng: res.longitude,
							lat: res.latitude,
							location: '中烟签到中心'
						}, (res)=>{
							uni.showToast({
								title: '签到成功'
							});
							uni.navigateTo({
								url: '/pages/signed/signed'
							})
						})
					},
					fail: () => {
						uni.showToast({
							title: '获取位置信息失败'
						});
					},
					complete: () => {}
				});
				
			}
		}
	}
</script>

<style>
	.main{
		width: 90%;
		margin: 0 auto;
		padding-top: 100px;
		text-align: left;
	}
	.act{
		display: flex;
		flex-direction: row;
		height: 36px;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		
	}
	.act span{
		width: 30%;
		background-color: #4CD964;
		text-align: center;
		height: 36px;
		line-height: 36px;
		border-radius: 5px;
	}
</style>
