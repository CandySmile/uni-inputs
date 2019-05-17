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

const verifyTypeObj = {
	Tel: {
		reg: /^[1][3,4,5,7,8][0-9]{9}$/,
		name: '手机号'
	},
	Email: {
		reg: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/,
		name: '电子邮箱'
	},
	idCart: {
		reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
		name: '身份证号'
	},
	NationalNumber: {
		reg: /\d{3}-\d{8}|\d{4}-\d{7}/,
		name: '国内号码'
	},
	QQ: {
		reg: /[1-9][0-9]{4,}/,
		name: 'QQ号'
	},
	PostalCode: {
		reg: /[1-9]\d{5}(?!\d)/,
		name: '邮政编码'
	},
	IpAddress: {
		reg: /\d+\.\d+\.\d+\.\d+/,
		name: 'IP地址'
	},
	Chinese: {
		reg: /[\u4e00-\u9fa5]/,
		name: '中文字符'
	},
	Char: {
		reg: /^[A-Za-z]+$/,
		name: '英文字母'
	},
	Int: {
		reg: /^\d+$/,
		name: '整数'
	},
	Number: {
		reg: /^([1-9]\d*(\.\d+)?)|(\d+(\.\d+))$/,
		name: '数字'
	}
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
	verifyTypeObj, // 内置正则验证
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
		if(!url) {
			_this.showToast('上传文件的url不能为空');
			return;
		}
		if(!filePath) {
			_this.showToast('上传文件的filePath不能为空');
			return;
		}
		_this.showLoading('上传文件中');
		uni.uploadFile({
			url,
			formData: data,
			name,
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
