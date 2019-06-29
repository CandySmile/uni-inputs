const interfaces = {
	upLoadImg: '', // 服务器地址(上传图片)
};

const inputCustomTapFc = function(customId) { //inputTap custom类型触发的函数, 必须return一个Promise对象, 可以resolve数据给相应的input赋值
	return new Promise((resolve, reject) => {
		switch (customId) {
			case '自定义id':
				break;
			default:
				uni.scanCode({	//示例, 扫码后赋值
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						resolve(res.result);
					}
				});
				break;
		}
	})
}

const inputCustomTapCatchFc = function(customId, e) { // inputTap custom类型触发的函数异常时触发的函数, 必须return一个Promise对象, 可以resolve数据给相应的input赋值
	return new Promise((resolve, reject) => {
		switch (customId) {
			case '自定义id':
				break;
			default:

				break;
		}
	})
}

const UpLoadFile = function(customId, filePath) { // 上传文件方法: (自定义上传标识, 文件路径)
	let _this = this;
	let url = '';
	let formData = {};
	let name = '';
	switch (customId) { //判断该项pics类型自带的UpLoadFileType, 根据此值来确定不同的url、formData、name
		case 'UpLoadImage_1': //自定义的标识
			url = '';
			formData = {};
			name = '';
			break;
		default: //若无判断需求可直接写在这里
			url = interfaces.upLoadImg;
			formData = {};
			name = '';
			break;
	}
	if (!url) {
		_this.showToast('上传文件的url不能为空');
		return new Promise((rs, rj) => {
			rj('上传文件的url不能为空');
		});
	}
	if (!filePath) {
		_this.showToast('上传文件的filePath不能为空');
		return new Promise((rs, rj) => {
			rj('上传文件的filePath不能为空');
		});
	}
	return new Promise((reslove, reject) => {
		_this.showLoading('上传文件中');
		uni.uploadFile({
			url,
			formData,
			name,
			filePath,
			success(res) {
				console.log('进入UpLoadFile方法的success回调')
				_this.hideLoading();
				reslove(res)
			},
			fail(err) {
				console.log('进入UpLoadFile方法的fail回调')
				console.log(JSON.stringify(err))
				_this.hideLoading();
				reject();
			}
		})
	})
}

const pics_splice = function(vals, val) { // 拼接图片上传返回后的数据, vals是拼接后的数据， val是新添项
	if (typeof(vals) !== 'string') // 第一次传进来是一个数组
		vals = val || '|'; // 可更改分隔符
	else
		vals += val ? '|' + val : '|';
	return vals; // 必须return vals
}


const filterTypeObj = { // 内置过滤函数，可根据需求自行添加拓展
	twoDecimalPlaces(value) { // 必须接受一个参数
		value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
		value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
		value = value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入1个小数 
		if (value == '') value = null;
		if (value !== '0' && value !== '0.') value = parseFloat(value);
		return value; // 必须return
	}
};

const sendSMS = function(customId, phone) { // 发送验证码方法, 需返回生成的验证码
	let code = ''; // 生成验证码
	switch (customId) { // 判断自定义标识
		case '1':
			code = '';
			break;
		default: //若无判断需求可直接写在这里
			code = '123456';
			break;
	}
	//发送验证码
	this.showToast(`发送验证码给${phone}成功,请注意查收`);
	return code; // 必须return生成的验证码
}






/*
 *	一下代码尽量不要动他
 */
/*
 *	一下代码尽量不要动他
 */
/*
 *	一下代码尽量不要动他
 */


const dateTime = 'picker-dateTime';
const date = 'picker-date';
const time = 'picker-time';
const pickerChoosedType = {
	pickerChoosedType_date: {
		name: 'date',
		value: 'p_date_choosed_'
	},
	pickerChoosedType_city: {
		name: 'city',
		value: 'p_city_choosed_'
	},
	pickerChoosedType_custom: {
		name: 'custom',
		value: 'p_custom_choosed_'
	},
	pickerChoosedType_custom2: {
		name: 'custom2',
		value: 'p_custom2_choosed_'
	},
	pickerChoosedType_provincialStreet: {
		name: 'provincialStreet',
		value: 'p_custom_provincialStreet_'
	}
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

const eventNames = {
	inputsChange: 'inputsChange',
	inputTap: 'inputTap'
};

const setValueType = {
	inputsObj: {
		name: 'inputsObj',
		itemName: ''
	},
	focusObj: {
		name: 'focusObj',
		itemName: 'focus'
	}
};
const filterParamsArrayType = {
	setInputsValueFc: 'setInputsValueFc'
};

const _app = {
	eventNames, // inputs内所有类型变更时的emit事件名称
	picker_date_obj: {
		dateTime,
		date,
		time
	},
	pickerChoosedType,
	setValueType,
	filterParamsArrayType,
	verifyTypeObj, // 内置正则验证
	filterTypeObj, // 内置过滤函数
	inputCustomTapFc,
	inputCustomTapCatchFc,
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
	UpLoadFile,
	pics_splice,
	sendSMS,
	previewImage(imgPath, currentIndex) {
		if (!(imgPath instanceof Array))
			imgPath = [imgPath];
		uni.previewImage({
			urls: imgPath,
			current: currentIndex||0
		})
	},
	countDays(Y, M, val, mode) {
		let days = new Date(Y, M + 1, 0).getDate();
		if (mode != time)
			if (val) {
				val[2] = val[2] < days - 1 ? val[2] : days - 1;
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
		for (let i = 0; i < data.length; i++) {
			if (data[i] || data[i] === 0) data[i] = true;
			else data[i] = false;
		}
		return data;
	},
	regTest(name, val) {
		return verifyTypeObj[name].reg.test(val);
	},
	isNumber(param) {
		return typeof(param) === 'number';
	},
	filterParams(params, type) {
		if (params.length === 0)
			return false;
		if (params.length > 1) {
			let arr = getParamsArray(type);
			let o = {};
			Object.keys(params).forEach((item, index) => {
				o[arr[index]] = params[index];
			})
			return o;
		} else {
			return params[0];
		}
	}
}
export default _app;

function getParamsArray(type) {
	let arr;
	switch (type) {
		case filterParamsArrayType.setInputsValueFc:
			arr = ['param', 'value', 'fail', 'isVariableName'];
			break;
		default:
			arr = [];
			break;
	}
	return arr;
}
