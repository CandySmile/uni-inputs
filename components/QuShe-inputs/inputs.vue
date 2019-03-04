<template>
	<view class="width100">
		<!-- title -->
		<view :class="item.type=='pics'||item.type=='picker-date'||item.type=='picker-city'?'flex_column':'flex_row'" class="width100 box-sizing-border-box" :style="{'padding': windowHeight*.02 + 'px ' + windowWidth*.03 + 'px'}"
		 v-for="(item, index) in inputsArray" :key="index">
			<view class="input_title flex_row_e_c" :style="{'fontSize': titleFontSize||windowHeight*scale_one + 'px', 'color': titleFontColor}">
				<view class="width100 word_wrap" :class="item.type=='pics'||item.type=='picker-date'||item.type=='picker-city'?'flex_row_none_c':'flex_row_e_c'">
					<view class="fontColorF1505C" v-if="item.type!='pics'&&!item.ignore">*</view>{{item.title?item.title + ':':''}}
				</view>
			</view>
			<!-- pics -->
			<view class="width100 box-sizing-border-box" v-if="item.type&&item.type=='pics'" :style="{'padding': windowHeight*.01 + 'px ' + windowWidth*.03 + 'px'}">
				<view class="flex_row width100" :class="item.cssMode||cssMode||'wrap'">
					<view class="flex_column_c_c box-sizing-border-box" :style="{'padding': windowHeight*.01 + 'px'}" v-for="(picsItem, picsIndex) in item.itemArray" :key="picsIndex">
						<view class="flex_row_c_c border1pxf2f2f2" :style="{'position': 'relative', 'height': windowHeight*.07+'px', 'width': windowWidth*.2+'px'}" 
						@tap="!picsObj[onLoadData + index + onLoadData + picsIndex]?chooseImg(index, picsIndex): ''">
							<image :src="picsObj[onLoadData + index + onLoadData + picsIndex]" mode="aspectFill" :style="{'height': windowHeight*.07+'px', 'width': windowWidth*.2+'px'}" v-if="picsObj[onLoadData + index + onLoadData + picsIndex]" @tap="showImg(picsObj[onLoadData + index + onLoadData + picsIndex])"></image>
							<view class="fontColorADADAD" :style="{'fontSize': contentFontSize||windowHeight*scale_two + 'px'}" v-else>+</view>
							<view :style="{'position': 'absolute', 'top': 0-windowHeight*.03+'px', 'right': 0-windowHeight*.025+'px', 'padding': windowHeight*.01+'px'}" v-if="picsObj[onLoadData + index + onLoadData + picsIndex]" @tap.stop.prevent="clearPic(index, picsIndex)">
								<uni-icon type="clear" color="#f5105c" :pxSize="windowHeight*.03"/>
							</view>
						</view>
						<view class="flex_row_c_c fontColorADADAD"  :style="{'fontSize': contentFontSize||windowHeight*scale_two + 'px', 'width': windowWidth*.2+'px', 'margin-top': windowHeight*.01+'px'}" v-if="picsItem.title">
							<view class="fontColorF1505C" v-if="!picsItem.ignore">*</view>{{picsItem.title}}
						</view>
					</view>
				</view>
			</view>
			<!-- radio -->
			<view class="input_item" v-else-if="item.type&&item.type=='radio'">
				<radio-group @change="inputs_change($event, index)" class="width100 flex_row_none_c" :class="item.cssMode||cssMode||'wrap'">
					<label class="fontColor666666 flex_row_none_c box-sizing-border-box" :style="{'fontSize': contentFontSize||windowHeight*scale_two + 'px', 'padding': windowHeight*.01 + 'px', 'margin-right': windowWidth*.02+'px'}" v-for="(radioItem, radioIndex) in item.itemArray"
					 :key="radioIndex">
						<radio :value="radioItem.value" :checked="radioItem.defaultValue" :color="radioItem.color||item.color"/>
						<view class="flex_row_none_c" :style="{'width': cssMode=='scrollX'||item.cssMode=='scrollX'?windowWidth*.15 + 'px': ''}">{{radioItem.name}}</view>
					</label>
				</radio-group>
			</view>
			<!-- checkbox -->
			<view class="input_item" v-else-if="item.type&&item.type=='checkbox'">
				<checkbox-group @change="inputs_change($event, index)" class="width100 flex_row_none_c" :class="item.cssMode||cssMode||'wrap'">
					<label class="fontColor666666 flex_row_none_c box-sizing-border-box" :style="{'fontSize': contentFontSize||windowHeight*scale_two + 'px', 'padding': windowHeight*.01 + 'px', 'margin-right': windowWidth*.02+'px'}" v-for="(checkboxItem, checkboxIndex) in item.itemArray"
					 :key="checkboxIndex">
						<checkbox :value="checkboxItem.value" :checked="checkboxItem.defaultValue" :color="checkboxItem.color||item.color"/>
						<view class="flex_row_none_c" :style="{'width': cssMode=='scrollX'||item.cssMode=='scrollX'?windowWidth*.15 + 'px': ''}">{{checkboxItem.name}}</view>
					</label>
				</checkbox-group>
			</view>
			<!-- picker-date -->
			<view class="width100" :style="{'margin-top': windowHeight*.02+'px'}" v-else-if="item.type&&item.type=='picker-date'">
				<pickers-date :years="getYearsArray(item.startYear||new Date().getFullYear() - 5, item.endYear||new Date().getFullYear() + 5)" 
				:defaultDate="item.defaultValue||new Date()" v-on:getDate="pickerChange($event, index)"
				:indicatorStyle="item.indicatorStyle" :height="item.height" :windowHeight="windowHeight" :mode="item.mode" :fontSize="contentFontSize||windowHeight*scale_two"/>
			</view>
			<!-- picker-city -->
			<view class="width100" :style="{'margin-top': windowHeight*.02+'px'}" v-else-if="item.type&&item.type=='picker-city'">
				<pickers-city :indicatorStyle="item.indicatorStyle" :height="item.height" 
				:windowHeight="windowHeight" :fontSize="contentFontSize||windowHeight*scale_two" 
				v-on:onChange="pickerChange($event, index)" :pickerValueDefault="item.defaultValue"/>
			</view>
			<!-- input -->
			<view class="input_item" v-else>
				<input :type="item.inputType||'text'" :value="item.defaultValue" @input="inputs_change($event, index)" :placeholder="item.placeholder||'请输入' + item.title"
				 class="width100 borderBottom1pxf2f2f2"  :style="{'fontSize': titleFontSize||windowHeight*scale_one + 'px'}" />
			</view>
		</view>
		<!-- 验证码 -->
		<view class="flex_row width100 box-sizing-border-box" :style="{'padding': windowHeight*.02 + 'px ' + windowWidth*.03 + 'px'}" v-if="ifCode">
			<view class="flex_row_e_c input_title" :style="{'fontSize': titleFontSize||windowHeight*scale_one + 'px', 'color': titleFontColor}">
				<view class="fontColorF1505C">*</view>验证码:
			</view>
			<view class="input_item">
				<input type="text" value="" v-model="userCode" placeholder="请输入验证码" class="width100 borderBottom1pxf2f2f2" :style="{'fontSize': titleFontSize||windowHeight*scale_one + 'px'}" />
			</view>
		</view>
		<!-- rule -->
		<view class="flex_row_between_c box-sizing-border-box" :style="{'padding': windowHeight*.01 + 'px ' + windowWidth*.03 + 'px'}">
			<view class="flex_row_c_c fontColor666666" :style="{'fontSize': contentFontSize||windowHeight*scale_two + 'px'}" v-if="ifRule">
				<label class="flex_row_c_c">
					<switch :checked="Igree" @change="IgreeFc" type="checkbox" />我已阅读并同意</label>
				<view class="fontColor007AFF" @tap="openRuleFc(ruleItem.value)" v-for="(ruleItem, ruleIndex) in ruleArray" :key="ruleIndex">{{ruleIndex==0?ruleItem.name:'、' + ruleItem.name}}</view>
			</view>
			<button type="primary" size="mini" v-if="ifCode" :disabled="startCode" @tap="!startCode?getCode():''">{{startCode?codeCount + 's后重新获取':'获取验证码'}}</button>
		</view>
		<!-- 主按钮 -->
		<button type="primary" @tap="activeFc" :style="{'margin': windowHeight*.02 + 'px ' + windowHeight*.03 + 'px'}">{{activeName}}</button>
	</view>
</template>

<script>
	import _app from './app.js';
	import uniIcon from './uni-icon.vue';
	import pickersDate from './pickers-date.vue';
	import pickersCity from '../mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		props: {
			inputsArray: { // 需循环遍历的input
				type: Array,
				default () {
					return [];
				}
			},
			titleFontSize: { // title 的font-size
				type: Number,
				default: 0
			},
			titleFontColor: { // title 的color
				type: String,
				default: '#666666'
			},
			contentFontSize: { // inputs的font-size
				type: Number,
				default: 0
			},
			ruleArray: {
				type: Array,
				default () {
					return [];
				}
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
			},
			changeReSet: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				code: '',
				userCode: '',
				Igree: false,
				codeCount: 90,
				startCode: false,
				picsObj: {},
				scale_one: .021,
				scale_two: .018,
				default_titleFs: 12,
				default_contentFs: 10,
				windowHeight: 0,
				windowWidth: 0
			};
		},
		computed: {
			getYearsArray() {
				return function(sy, ey) {
					let _this = this;
					let y = [];
					let c = ey - sy;
					for (let i = 0; i <= c; i++) {
						y.push(sy + i);
					}
					return y;
				}
			}
		},
		watch: {
			'inputsArray'(n, o) {
				let _this = this;
				console.log('监听到了inputsArray变化');
				if(_this.changeReSet)
					for(let i = 0; i < o.length; i++) {
						_this[_this.onLoadData+i] = '';
					}
				if(n)
					this.init();
			}
		},
		created() {
			const system = uni.getSystemInfoSync();
			this.windowHeight = system.windowHeight;
			this.windowWidth = system.windowWidth;
			this.init();
		},
		methods: {
			init() { // 初始化默认数据
				let _this = this;
				console.log('初始化inputs');
				let data = _this.inputsArray;
				for(let i = 0; i < data.length; i++) {
					let item = data[i];
					let itemVariableName = _this.onLoadData + i;
					switch (item.type){
						case 'radio':
							for(let j = 0; j < item.itemArray.length; j++) {
								if(item.itemArray[j].defaultValue) {
									_this[itemVariableName] = item.itemArray[j].value;
									break;
								}
							}
							break;
						case 'checkbox':
							let checkboxValue = [];
							for(let j = 0; j < item.itemArray.length; j++) {
								if(item.itemArray[j].defaultValue) {
									checkboxValue.push(item.itemArray[j].value);
								}
							}
							_this[itemVariableName] = checkboxValue||'';
							break;
						case 'pics':
							for(let j = 0; j < item.itemArray.length; j++) {
								if(item.itemArray[j].defaultValue) {
									_this.$set(_this.picsObj, itemVariableName + _this.onLoadData + j, item.itemArray[j].defaultValue);
								}
							}
							break;
						case 'picker-date':
							break;
						case 'picker-city':
							break;
						default:
							_this[itemVariableName] = item.defaultValue || '';
							break;
					}
				}
			},
			IgreeFc(e) { // 用户是否同意规则
				this.Igree = e.detail.value;
			},
			openRuleFc(value) { // 打开规则页面的父级方法
				this.$emit('chaildOpenEvent', value);
			},
			inputs_change(e, index) { // 用户输入时，根据index赋值
				this[this.onLoadData + index] = e.detail.value;
			},
			pickerChange(data, index) {
				console.log('pickerValue：' +  JSON.stringify(data));
				this[this.onLoadData + index] = data;
			},
			getCode() { // 判断是否正确输入手机号后发送验证码并倒计时
				let _this = this;
				let phone = '';
				let d = _this.inputsArray;
				for (let i = 0; i < d.length; i++) {
					if (d[i].phone) {
						phone = _this[_this.onLoadData + i];
						console.log('手机号: ' + phone);
					}
				}
				if (phone && phone.length == 11)
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
				let d = _this.inputsArray;
				let inputsDataObj = {};
				// 先判断 inputs 的值是否为空, 后判断该值是否忽略
				for (let i = 0; i < d.length; i++) {
					let onLoadData = _this.onLoadData + i;
					let variableName = d[i].variableName||onLoadData;
					switch (d[i].type) {
						case 'pics':
							for (let j = 0; j < d[i].itemArray.length; j++) {
								let pic = _this.picsObj[onLoadData + _this.onLoadData + j];
								if (pic) {
									if (!inputsDataObj[onLoadData])
										inputsDataObj[variableName] = [];
									inputsDataObj[variableName].push(pic);
								} else {
									if (d[i].itemArray[j].ignore) {
										if (!inputsDataObj[onLoadData])
											inputsDataObj[variableName] = [];
										inputsDataObj[variableName].push('');
									} else {
										_app.showToast(d[i].itemArray[j].nullErr || d[i].itemArray[j].title + '不能为空');
										return;
									}
								}
							}
							break;
						default:
							if (!_this[onLoadData]) {
								if (d[i].ignore) {
									inputsDataObj[variableName] = '';
								} else {
									_app.showToast(d[i].nullErr || d[i].title + '不能为空');
									return;
								}
							} else {
								inputsDataObj[variableName] = _this[onLoadData];
							}
							break;
					}
				}
				// 判断是否需要同意规则，是否填写验证码并判断是否正确
				if (_this.ifRule)
					if (!_this.Igree) {
						let ruleName = '';
						for (let i = 0; i < _this.ruleArray.length; i++) {
							ruleName += i == 0 ? _this.ruleArray[i].name : '、' + _this.ruleArray[i].name;
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
					let onLoadData = _this.onLoadData + i;
					let variableName = d[i].variableName||onLoadData;
					if (d[i].type && d[i].type == 'pics') {
						for (let j = 0; j < d[i].itemArray.length; j++) {
							if (inputsDataObj[variableName][j]) {
								pic_promise.push(new Promise(function(reslove, reject) {
									// push Promise 上传图片到服务器并返回图片在服务器的地址并拼接的方法
									_app.UpLoadFile(_app.interface.upLoadImg, {}, 'name', inputsDataObj[variableName][j], function(res) {
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
						for (let i = 0; i < res.length; i++) { // 注: 此处根据自己的需求拼接数据   (在下返回数据后的拼接是以 ‘|’ 分隔)
							let onLoadData = _this.onLoadData + res[i].index1;
							let variableName = d[res[i].index1].variableName||onLoadData; // 自定义变量名或默认变量名
							/* if (typeof(inputsDataObj[onLoadData]) != 'string')
								inputsDataObj[variableName] = res[i].data || '|';
							else
								inputsDataObj[variableName] += res[i].data ? '|' + res[i].data : '|'; */
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
						console.log(res.tempFilePaths[0]);
						_this.$set(_this.picsObj, _this.onLoadData + index + _this.onLoadData + picsIndex, res.tempFilePaths[0]);
					}
				})
			},
			clearPic(index, picsIndex) { //清除图片
				this.picsObj[this.onLoadData + index + this.onLoadData + picsIndex] = '';
			},
			showImg(imgPath) { //大图预览选中的图片
				_app.previewImage(imgPath);
			}
		},
		components: {
			uniIcon,
			pickersDate,
			pickersCity
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
	/* 公共样式(可剪切至App.vue) */
	.word_wrap {
		word-wrap: break-word;
		word-break: break-all;
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
	
	.box-sizing-border-box {
		box-sizing: border-box;
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

	.borderBottom1pxf2f2f2 {
		border-bottom: 1px solid #F2F2F2;
	}
	.border1pxf2f2f2 {
		border: 1px solid #f2f2f2;
	}
</style>
