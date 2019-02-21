<template>
	<view class="width100">
		<view :class="item.type&&item.type=='pics'?'flex_column':'flex_row'" class="width100 padding2vh3vw box-sizing-border-box"
		 v-for="(item, index) in inputs" :key="index">
			<view :class="item.type&&item.type=='pics'?'flex_row_none_c':item.cssMode=='scrollX'||cssMode=='scrollX'?'flex_row_e_c':'flex_row_c_none'" class="input_title" :style="{'fontSize': fontSize + 'vh', 'color': fontColor}">
				<view class="fontSize1Point8vh fontColorF1505C" v-if="item.type!='pics'&&!item.ignore">*</view>
				<view class="width100 word_wrap">{{item.title || ''}}:</view>
			</view>
			<view class="width100 padding1vh3vw box-sizing-border-box" v-if="item.type&&item.type=='pics'">
				<view class="flex_row width100" :class="item.cssMode||cssMode||'wrap'">
					<view class="flex_column_c_c padding1vh" v-for="(picsItem, picsIndex) in item.picsArray" :key="picsIndex">
						<view class="flex_row_c_c pic_view" @tap="!picsObj[onLoadData + index + onLoadData + picsIndex]?chooseImg(index, picsIndex): ''">
							<image :src="picsObj[onLoadData + index + onLoadData + picsIndex]" mode="aspectFill" class="picsItem_pic" v-if="picsObj[onLoadData + index + onLoadData + picsIndex]"></image>
							<view class="fontSize2Point1vh fontColorADADAD" v-else>+</view>
							<view class="clearView" v-if="picsObj[onLoadData + index + onLoadData + picsIndex]" @tap.stop.prevent="clearPic(index, picsIndex)">
								<uni-icon type="clear" color="#f5105c" size="3" />
							</view>
						</view>
						<view class="flex_row_c_c marginTop1vh picsItem_title" v-if="picsItem.title">
							<view class="fontSize1Point8vh fontColorF1505C" v-if="!picsItem.ignore">*</view>{{picsItem.title}}
						</view>
					</view>
				</view>
			</view>
			<view class="input_item" v-else-if="item.type&&item.type=='radio'">
				<radio-group @change="inputs_change($event, index)" class="width100 flex_row_none_c" :class="item.cssMode||cssMode||'wrap'">
					<label class="marginItemRight2vw fontSize1Point8vh fontColor666666 flex_row_none_c padding1vh" v-for="(radioItem, radioIndex) in item.radioArray"
					 :key="radioIndex">
						<view>
							<radio :value="radioItem.value"/>
						</view>
						<view class="flex_row_none_c radioItem_name">{{radioItem.name}}</view>
					</label>
				</radio-group>
			</view>
			<view class="input_item" v-else-if="item.type&&item.type=='checkbox'">
				<checkbox-group @change="inputs_change($event, index)" class="width100 flex_row_none_c" :class="item.cssMode||cssMode||'wrap'">
					<label class="marginItemRight2vw fontSize1Point8vh fontColor666666 flex_row_none_c padding1vh" v-for="(checkboxItem, checkboxIndex) in item.checkboxArray"
					 :key="checkboxIndex">
						<view>
							<checkbox :value="checkboxItem.value"/>
						</view>
						<view class="flex_row_none_c radioItem_name">{{checkboxItem.name}}</view>
					</label>
				</checkbox-group>
			</view>
			<view class="input_item" v-else>
				<input :type="item.inputType||'text'" value="" @input="inputs_change($event, index)" :placeholder="item.placeholder||'请输入' + item.title"
				 class="width100 borderBottom1pxf2f2f2" :style="{'fontSize': input_fontSize + 'vh'}" />
			</view>
		</view>
		<view class="flex_row width100 padding2vh3vw box-sizing-border-box" v-if="ifCode">
			<view class="flex_row_e_c input_title" :style="{'fontSize': fontSize + 'vh', 'color': fontColor}">
				<view class="fontSize1Point8vh fontColorF1505C">*</view>验证码:
			</view>
			<view class="input_item">
				<input type="text" value="" v-model="userCode" placeholder="请输入验证码" class="width100 borderBottom1pxf2f2f2" :style="{'fontSize': input_fontSize + 'vh'}" />
			</view>
		</view>
		<view class="flex_row_between_c padding1vh3vw box-sizing-border-box">
			<view class="flex_row_c_c fontSize1Point8vh fontColor666666" v-if="ifRule">
				<label class="flex_row_c_c">
					<switch :checked="Igree" @change="IgreeFc" type="checkbox" />我已阅读并同意</label>
				<view class="fontColor007AFF" @tap="openRuleFc(ruleItem.value)" v-for="(ruleItem, ruleIndex) in ruleArray" :key="ruleIndex">{{ruleIndex==0?ruleItem.name:'、' + ruleItem.name}}</view>
			</view>
			<button type="primary" size="mini" v-if="ifCode" :disabled="startCode" @tap="!startCode?getCode():''">{{startCode?codeCount + 's后重新获取':'获取验证码'}}</button>
		</view>
		<button type="primary" class="margin2vh3vw" @tap="activeFc">{{activeName}}</button>
	</view>
</template>

<script>
	import _app from './app.js';
	import uniIcon from './uni-icon.vue';
	export default {
		props: {
			inputs: { // 需循环遍历的input
				type: Array,
				default: null
			},
			fontSize: { // title 的font-size
				type: Number,
				default: 2.1
			},
			fontColor: { // color
				type: String,
				default: '#666666'
			},
			input_fontSize: { // inputs的font-size
				type: Number,
				default: 2.1
			},
			ruleArray: {
				type: Array,
				default: null
			},
			activeName: { // 发送按钮的名字
				type: String,
				default: '发送'
			},
			ifCode: { // 是否需要验证码
				type: Boolean,
				default: false
			},
			ifRule: { // 是否需要规则
				type: Boolean,
				default: false
			},
			onLoadData: { // 数据变量名（+index）
				type: String,
				default: 'data_'
			},
			cssMode: {
				type: String,
				default: 'wrap'
			}
		},
		data() {
			return {
				code: '',
				userCode: '',
				Igree: false,
				codeCount: 90,
				startCode: false,
				picsObj: {}
			};
		},
		methods: {
			IgreeFc(e) { // 用户是否同意规则
				this.Igree = e.detail.value;
			},
			openRuleFc(value) { // 打开规则页面的父级方法
				this.$emit('chaildOpenEvent', value);
			},
			inputs_change(e, index) { // 用户输入时，根据index赋值
				this[this.onLoadData + index] = e.detail.value;
			},
			getCode() { // 判断是否正确输入手机号后发送验证码并倒计时
				let _this = this;
				let phone = '';
				let d = _this.inputs;
				for (let i = 0; i < d.length; i++) {
					if (d[i].phone) {
						phone = _this[_this.onLoadData + i];
					}
				}
				if (phone && phone != null && !isNaN(phone) && phone.length == 11)
					_this.sendSMS(phone);
				else {
					_app.showToast('请正确输入11位手机号');
					return;
				}

				_this.setInterValFunc = setInterval(() => {
					if (_this.codeCount > 0)
						--_this.codeCount;
					else {
						_this.startCode = false;
						clearInterval(_this.setInterValFunc);
						_this.code = '';
						_this.codeCount = 90;
					}
				}, 1000)
				_this.startCode = true;
			},
			sendSMS(phone) { // 生成验证码并发送给手机的方法， 可根据需求在父组件导入(可变通性高)或直接写在此处
				//生成验证码
				this.code = '生成的验证码';
				//发送验证码
				_app.showToast('发送验证码成功')
			},
			activeFc() { // 主功能按钮方法
				let _this = this;
				let d = _this.inputs;
				let inputsDataObj = {};
				// 先判断 inputs 的值是否为空, 后判断该值是否忽略
				for (let i = 0; i < d.length; i++) {
					switch (d[i].type) {
						case 'pics':
							for (let j = 0; j < d[i].picsArray.length; j++) {
								let pic = _this.picsObj[_this.onLoadData + i + _this.onLoadData + j];
								if (pic) {
									if (!inputsDataObj[_this.onLoadData + i])
										inputsDataObj[_this.onLoadData + i] = [];
									inputsDataObj[_this.onLoadData + i].push(pic);
								} else {
									if (d[i].picsArray[j].ignore) {
										if (!inputsDataObj[_this.onLoadData + i])
											inputsDataObj[_this.onLoadData + i] = [];
										inputsDataObj[_this.onLoadData + i].push('');
									} else {
										_app.showToast(d[i].picsArray[j].nullErr || d[i].picsArray[j].title + '不能为空');
										return;
									}
								}
							}
							break;
						default:
							if (!_this[_this.onLoadData + i]) {
								if (d[i].ignore) {
									inputsDataObj[_this.onLoadData + i] = '';
								} else {
									_app.showToast(d[i].nullErr || d[i].title + '不能为空');
									return;
								}
							} else {
								inputsDataObj[_this.onLoadData + i] = _this[_this.onLoadData + i];
							}
							break;
					}
				}
				// 判断是否需要同意规则，是否填写验证码并判断是否正确
				if (_this.ifRule)
					if (!_this.Igree) {
						let ruleName = '';
						for(let i = 0; i < _this.ruleArray.length; i++) {
							ruleName += i==0?_this.ruleArray[i].name:'、' + _this.ruleArray[i].name;
						}
						_app.showToast('请先阅读并勾选' + ruleName);
						return;
					}
				if (_this.ifCode) {
					if (!_this.code) {
						_app.showToast('请先获取验证码');
						return;
					} else if (!_this.userCode) {
						_app.showToast('填写验证码');
						return;
					} else if (_this.userCode !== _this.code) {
						_app.showToast('验证码不正确');
						_this.userCode = '';
						_this.code = '';
						return;
					}
				}
				// 如果用了图片类型， 则上传并返回数据
				let pic_promise = [];
				for (let i = 0; i < d.length; i++) {
					if (d[i].type && d[i].type == 'pics') {
						for (let j = 0; j < d[i].picsArray.length; j++) {
							if (inputsDataObj[_this.onLoadData + i][j]) {
								pic_promise.push(new Promise(function(reslove, reject) {
									// push Promise 上传图片到服务器并返回图片在服务器的地址并拼接的方法
									_app.UpLoadFile(_app.interface.upLoadImg, {}, 'name', inputsDataObj[_this.onLoadData + i][j], function(res) {
										reslove({
											index1: i,
											index2: j,
											data: res.data
										}); // index2 基本无用， 若无需求可删
									});
								}));
							} else {
								pic_promise.push(new Promise(function(reslove, reject) { // 若用户未填此数据并忽略此数据时传空以记录此次数据
									reslove({
										index1: i,
										index2: j,
										data: ''
									}); // index2 基本无用， 若无需求可删
								}));
							}
						}
					}
				}
				Promise.all(pic_promise).then(res => { // Promise返回一个图片的数组, 根据res.index1 给 inputsDataObj[_this.onLoadData + res[i].index1] 赋值
					if (res.length > 0)
						for (let i = 0; i < res.length; i++) { // 注： 此处根据自己的需求拼接数据   (在下返回数据后的拼接是以 ‘|’ 分隔)
							/* if(typeof(inputsDataObj[_this.onLoadData + res[i].index1]) != 'string')
								inputsDataObj[_this.onLoadData + res[i].index1] = res[i].data || '|'; // res[i].data有可能为空
							else
								inputsDataObj[_this.onLoadData + res[i].index1] += res[i].data?'|' + res[i].data : '|'; */
						}
					_this.$emit('activeFc', inputsDataObj); // 把用户输入数据封装成对象输出给父级
					_this.inputs_reSet(); //提交后重置验证码
				})
			},
			inputs_reSet() { //提交后重置验证码
				this.code = '';
				this.userCode = '';
				this.Igree = false;
			},
			chooseImg(index, picsIndex) { //选择图片
				let _this = this
				uni.chooseImage({
					success: function(res) {
						_this.$set(_this.picsObj, _this.onLoadData + index + _this.onLoadData + picsIndex, res.tempFilePaths[0]);
					}
				})
			},
			clearPic(index, picsIndex) { //清除图片
				this.picsObj[this.onLoadData + index + this.onLoadData + picsIndex] = '';
			}
		},
		components: {
			uniIcon
		}
	}
</script>

<style scoped>
	.input_title {
		width: 25%;
		margin-right: 5%;
	}
	
	.input_item {
		width: 75%;
	}

	.pic_view {
		position: relative;
		height: 7vh;
		width: 20vw;
		border: 1px solid #f2f2f2;
	}

	.picsItem_pic {
		height: 7vh;
		width: 20vw;
	}

	/* width值与 .pic_view 相同*/
	.picsItem_title {
		width: 20vw;
		font-size: 1.5vh;
		color: #adadad;
	}

	.clearView {
		position: absolute;
		top: -2vh;
		right: -1.5vh;
		padding: .1vh;
	}

	.radioItem_name {
		width: 15vw;
	}
	
	/* 公共样式(可剪切至App.vue) */
	.word_wrap {
		word-wrap:break-word; 
		word-break:break-all;
	}
	.wrap {
		flex-wrap: wrap;
	}
	.scrollX {
		overflow-x: scroll;
	}
	
	.width100 {
		width: 100%;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}
	.flex_row_e_none {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.flex_column_c_c {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.flex_row_none_c {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.flex_row_e_c {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.flex_row_between_c {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.padding2vh3vw {
		padding: 2vh 3vw;
	}

	.box-sizing-border-box {
		box-sizing: border-box;
	}

	.fontSize1Point8vh {
		font-size: 1.8vh;
	}

	.fontSize2Point1vh {
		font-size: 2.1vh;
	}

	.fontColorF1505C {
		color: #F1505C;
	}

	.fontColorADADAD {
		color: #ADADAD;
	}

	.fontColor666666 {
		color: #666666;
	}

	.fontColor007AFF {
		color: #007AFF;
	}

	.padding1vh3vw {
		padding: 1vh 3vw;
	}

	.padding1vh {
		padding: 1vh;
	}

	.marginTop1vh {
		margin-top: 1vh;
	}

	.borderBottom1pxf2f2f2 {
		border-bottom: 1px solid #F2F2F2;
	}

	.margin2vh3vw {
		margin: 2vh 3vw;
	}
	
	.marginItemRight2vw {
		margin-right: 2vw;
	}
</style>
