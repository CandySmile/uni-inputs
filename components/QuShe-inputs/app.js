const dateTime = 'picker-dateTime';
const date = 'picker-date';
const time = 'picker-time';

const pickerChoosedType_date = {
	name: 'date',
	value: 'p_date_choosed_'
};
const pickerChoosedType_city = {
	name: 'city',
	value: 'p_city_choosed_'
};
const pickerChoosedType_custom = {
	name: 'custom',
	value: 'p_custom_choosed_'
};
const pickerChoosedType_custom2 = {
	name: 'custom2',
	value: 'p_custom2_choosed_'
};
const pickerChoosedType_provincialStreet = {
	name: 'provincialStreet',
	value: 'p_custom_provincialStreet_'
};
let _app = {
	picker_date_obj: {
		dateTime,
		date,
		time
	},
	pickerChoosedType: {
		pickerChoosedType_date,
		pickerChoosedType_city,
		pickerChoosedType_custom,
		pickerChoosedType_custom2,
		pickerChoosedType_provincialStreet
	},
	interface: {
		upLoadImg: '', // 服务器地址
	},
	showToast(msg) {
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	},
	showLoading(msg, ifmask) {
		uni.showLoading({
			title: msg,
			mask: ifmask || false
		})
	},
	hideLoading() {
		uni.hideLoading();
	},
	UpLoadFile(url, data, name, filePath, scb, fcb) { // 服务器地址， 携带数据， name， 文件路径， 成功回调函数， 失败回调函数
		let _this = this;
		_this.showLoading('上传文件中');
		uni.uploadFile({
			url,
			formData: data,
			name: name,
			filePath,
			success(res) {
				console.log('上传成功')
				_this.hideLoading();
				if (scb && typeof(scb) == 'function') scb(res);
			},
			fail(err) {
				console.log('上传失败')
				_this.hideLoading();
				if (fcb && typeof(fcb) == 'function') fcb(err);
			}
		})
	},
	previewImage(imgPath) {
		if (typeof(imgPath) != 'array')
			imgPath = [imgPath];
		uni.previewImage({
			urls: imgPath
		})
	},
	countDays(Y, M, val, mode) {
		let days = new Date(Y,M+1,0).getDate();
		if (mode != time)
			if (val) {
				val[2] = val[2] < days - 1? val[2] : days - 1;
			}
		return {
			days,
			val
		};
	},
	countYears(sy, ey) {
		let _this = this;
		let y = [];
		let c = ey - sy;
		for (let i = 0; i <= c; i++) {
			y.push(sy + i);
		}
		return y;
	},
	checkbox_status(data) {
		for(let i = 0; i < data.length; i++) {
			if(data[i]) data[i] = true; else data[i] = false;
		}
		return data;
	}
}
export default _app;
