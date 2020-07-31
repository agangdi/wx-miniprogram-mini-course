export const post = function(url, data, success, error) {
	uni.request({
		url: 'http://127.0.0.1:9898/api/' + url,
		method: 'POST',
		header: {
			'X-OPENID': uni.getStorageSync('openid')
		},
		data: data,
		success: res => {
			if(res.data.code == 0){
				success(res.data.data)
			}else{
				uni.showToast({
					title: res.data.msg
				});
			}
		},
		fail: (err) => {
			error(err)
		},
		complete: () => {}
	});
}