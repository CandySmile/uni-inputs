<template>
	<view class="width100 overflow_x_hidden">
		<view class="width100 box-sizing-border-box" :class="[item.animationType||animationType||'']" :style="{'padding': windowHeight*.02 + 'px ' + windowWidth*.03 + 'px', 'animation-duration': (index+1)*(item.animationDuration||animationDuration||.2) + 's'}"
		 v-for="(item, index) in inputsArray" :key="item.title||index">
			<!-- segmentationTitle -->
			<view class="width100 flex_row view_Title_Left" :style="{'font-size': windowHeight*.024+'px', 'padding': windowHeight*.015+'px '+ windowWidth*.03+'px'}"
			 v-if="item.segmentationTitle">
				{{item.segmentationTitle}}
			</view>
			<view class="flex_row" :style="{'padding-bottom': item.border_bottom?windowHeight*.015+'px':'none','border-bottom': item.border_bottom||'none', 'padding-top':item.border_top?windowHeight*.015+'px':'none','border-top': item.border_top||'none'}">
				<!-- title -->
				<view class="input_title flex_row_e_c" :style="{'fontSize': (titleFontSize||windowHeight*scale_one) + 'px', 'color': titleFontColor}">
					<view class="width100 word_wrap flex_row_e_c">
						<view class="fontColorF1505C" v-if="item.type!='pics'&&!item.ignore&&item.title">*</view>{{item.title?item.title + ':':''}}
					</view>
				</view>
				<!-- pics -->
				<view class="width75 box-sizing-border-box" v-if="item.type&&item.type=='pics'" :style="{'padding': windowHeight*.01 + 'px 0px'}">
					<view class="flex_row_e_c width100" :class="item.cssMode||cssMode||'wrap'">
						<view class="flex_column_c_c box-sizing-border-box" :style="{'padding': windowHeight*.01 + 'px'}" v-for="(picsItem, picsIndex) in item.itemArray"
						 :key="picsIndex">
							<view class="flex_row_c_c border1pxf2f2f2" :style="{'position': 'relative', 'height': windowHeight*.07+'px', 'width': windowWidth*.2+'px'}"
							 @tap="!picsObj[onLoadData + index + onLoadData + picsIndex]?chooseImg(index, picsIndex): ''">
								<image :src="picsObj[onLoadData + index + onLoadData + picsIndex]" mode="aspectFill" :style="{'height': windowHeight*.07+'px', 'width': windowWidth*.2+'px'}"
								 v-if="picsObj[onLoadData + index + onLoadData + picsIndex]" @tap="showImg(picsObj[onLoadData + index + onLoadData + picsIndex])"></image>
								<view class="fontColorADADAD" :style="{'fontSize': (contentFontSize||windowHeight*scale_two) + 'px'}" v-else>+</view>
								<view :style="{'position': 'absolute', 'top': 0-windowHeight*.03+'px', 'right': 0-windowHeight*.025+'px', 'padding': windowHeight*.01+'px'}"
								 v-if="picsObj[onLoadData + index + onLoadData + picsIndex]" @tap.stop.prevent="clearPic(index, picsIndex)">
									<uni-icon type="clear" color="#f5105c" :pxSize="windowHeight*.03" />
								</view>
							</view>
							<view class="flex_row_c_c fontColorADADAD" :style="{'fontSize': (contentFontSize||windowHeight*scale_two) + 'px', 'width': windowWidth*.2+'px', 'margin-top': windowHeight*.01+'px'}"
							 v-if="picsItem.title">
								<view class="fontColorF1505C" v-if="!picsItem.ignore">*</view>{{picsItem.title}}
							</view>
						</view>
					</view>
				</view>
				<!-- switch -->
				<view class="width75 flex_row_e_c" v-else-if="item.type&&item.type=='switch'">
					<switch :checked="inputsObj[onLoadData+index]" :disabled="item.disabled" :type="item.mode||'switch'" :color="item.color"
					 @change="inputs_change($event, index)" />
				</view>
				<!-- slider -->
				<view class="width75" v-else-if="item.type&&item.type=='slider'">
					<slider @change="inputs_change($event, index)" :min="item.min||0" :max="item.max||100" :step="item.step||1"
					 :disabled="item.disabled" :value="inputsObj[onLoadData+index]" :color="item.color" :selected-color="item.selected_color"
					 :activeColor="item.activeColor" :backgroundColor="item.backgroundColor" :block-size="item.block_size"
					 :block-color="item.block_color" :show-value="item.show_value" />
				</view>
				<!-- radio -->
				<view class="width75" v-else-if="item.type&&item.type=='radio'">
					<radio-group @change="inputs_change($event, index)" class="width100 flex_row_e_c" :class="item.cssMode||cssMode||'wrap'">
						<label class="fontColor666666 flex_row_none_c box-sizing-border-box" :style="{'fontSize': (contentFontSize||windowHeight*scale_two) + 'px', 'padding': windowHeight*.01 + 'px', 'margin-right': windowWidth*.02+'px'}"
						 v-for="(radioItem, radioIndex) in item.itemArray" :key="radioIndex">
							<radio :value="radioItem.value" :checked="inputsObj[onLoadData+index]==radioItem.value" :disabled="radioItem.disabled"
							 :color="radioItem.color||item.color" />
							<view class="flex_row_none_c" :style="{'width': cssMode=='scrollX'||item.cssMode=='scrollX'?windowWidth*.15 + 'px': ''}">{{radioItem.name}}</view>
						</label>
					</radio-group>
				</view>
				<!-- checkbox -->
				<view class="width75" v-else-if="item.type&&item.type=='checkbox'">
					<checkbox-group @change="checkbox_change($event, index)" class="width100 flex_row_e_c" :class="item.cssMode||cssMode||'wrap'">
						<label class="fontColor666666 flex_row_none_c box-sizing-border-box" :style="{'fontSize': (contentFontSize||windowHeight*scale_two) + 'px', 'padding': windowHeight*.01 + 'px', 'margin-right': windowWidth*.02+'px'}"
						 v-for="(checkboxItem, checkboxIndex) in item.itemArray" :key="checkboxIndex">
							<checkbox :value="checkboxItem.value" :checked="inputsObj[onLoadData+index][checkboxIndex]" :disabled="checkboxItem.disabled"
							 :color="checkboxItem.color||item.color" />
							<view class="flex_row_none_c" :style="{'width': cssMode=='scrollX'||item.cssMode=='scrollX'?windowWidth*.15 + 'px': ''}">{{checkboxItem.name}}</view>
						</label>
					</checkbox-group>
				</view>
				<!-- textarea -->
				<view class="width75" v-else-if="item.type&&item.type=='textarea'">
					<textarea :value="inputsObj[onLoadData+index]||item.defaultValue" :placeholder="item.placeholder||'请输入' + item.title"
					 :placeholder-style="item.placeholder_style" :placeholder-class="item.placeholder_class" :style="{'font-size': (contentFontSize||windowHeight*scale_two) + 'px', 'height': !item.auto_height?(item.height||windowHeight*.1)+'px':''}"
					 class="border1pxf2f2f2 width100" :disabled="item.disabled" :maxlength="item.maxlength||140" :focus="item.focus"
					 :auto-height="item.auto_height" :fixed="item.fixed" :cursor-spacing="item.cursor_spacing" :cursor="item.cursor"
					 :show-confirm-bar="item.show_confirm_bar" :selection-start="item.selection_start" :selection-end="item.selection_end"
					 :adjust-position="item.adjust_position" @input="inputs_change($event, index)" />
					</view>
				<!-- picker-date -->
				<view class="width75 flex_row_e_c" :style="{'padding': '0 ' + windowWidth*.03+'px'}" v-else-if="item.type&&item.type=='picker-date'">
					<view class="flex_row_none_c" v-if="pickerObj[onLoadData+index]">
						<view class="fontColor666666" :style="{'fontSize': (contentFontSize||windowHeight*scale_two) + 'px'}">
							{{pickerObj[onLoadData+index]}}
						</view>
						<button type="primary" @tap="showPicker(item, index)" size="mini" :style="{'margin-left': windowWidth*.03+'px'}">{{item.editorName||'更改'}}</button>
					</view>
					<view class="flex_row_e_c" v-else>
						<button type="primary" @tap="showPicker(item, index)" size="mini">{{item.chooseName||'选择日期'}}</button>
					</view>
				</view>
				<!-- picker-city -->
				<view class="width75 flex_row_e_c" :style="{'padding': '0 ' + windowWidth*.03+'px'}" v-else-if="item.type&&item.type=='picker-city'">
					<view class="flex_row_none_c" v-if="pickerObj[onLoadData+index]">
						<view class="fontColor666666" :style="{'fontSize': (contentFontSize||windowHeight*scale_two) + 'px'}">
							{{pickerObj[onLoadData+index].label}}
						</view>
						<button type="primary" @tap="showPicker(item, index)" size="mini" :style="{'margin-left': windowWidth*.03+'px'}">{{item.editorName||'更改'}}</button>
					</view>
					<view class="flex_row_e_c" v-else>
						<button type="primary" @tap="showPicker(item, index)" size="mini">{{item.chooseName||'选择城市'}}</button>
					</view>
				</view>
				<!-- picker-custom -->
				<view class="width75 flex_row_e_c" :style="{'padding': '0 ' + windowWidth*.03+'px'}" v-else-if="item.type&&item.type=='picker-custom'">
					<view class="flex_row_none_c" v-if="pickerObj[onLoadData+index]">
						<block v-if="item.linkage">
							<view class="fontColor666666" :style="{'fontSize': (contentFontSize||windowHeight*scale_two) + 'px'}">
								{{item.linkageNum==2?pickerObj[onLoadData+index].result.steps1[item.steps.steps_1_value]+'-'+(item.steps.steps_2_value?pickerObj[onLoadData+index].result.steps2[item.steps.steps_2_value]:pickerObj[onLoadData+index].result.steps2):item.linkageNum==3?pickerObj[onLoadData+index].result.steps1[item.steps.steps_1_value]+'-'+pickerObj[onLoadData+index].result.steps2[item.steps.steps_2_value]+'-'+(item.steps.steps_3_value?pickerObj[onLoadData+index].result.steps3[item.steps.steps_3_value]:pickerObj[onLoadData+index].result.steps3):'不在范围中'}}
							</view>
						</block>
						<block v-else>
							<view class="flex_row_c_c fontColor666666" :style="{'fontSize': (contentFontSize||windowHeight*scale_two) + 'px'}">
								<view v-for="(i, d) in pickerObj[onLoadData+index].result" :key="d">
									{{d==0?(item.steps?item.steps.steps_1_value?i[item.steps.steps_1_value]:i:i):'-' + (item.steps?item.steps.steps_1_value?i[item.steps.steps_1_value]:i:i)}}
								</view>
							</view>
						</block>
						<button type="primary" @tap="showPicker(item, index)" size="mini" :style="{'margin-left': windowWidth*.03+'px'}">{{item.editorName||'更改'}}</button>
					</view>
					<view class="flex_row_e_c" v-else>
						<button type="primary" @tap="showPicker(item, index)" size="mini">{{item.chooseName||'选择'}}</button>
					</view>
				</view>
				<!-- input -->
				<view class="flex_row_none_c width75" v-else>
					<view :class="item.tapClear&&item.password?'width70':item.tapClear||item.password?'width85':'width100'" class="flex_row_none_c borderBottom1pxf2f2f2">
						<view class="width15" v-if="item.icon">
							<view class="flex_row_c_c width100">
								<uni-icon :type="item.icon" :pxSize="contentFontSize||windowHeight*scale_two+8" :color="item.iconColor||'#999999'"></uni-icon>
							</view>
						</view>
						<input :type="item.inputType||'text'" :value="inputsObj[onLoadData+index]" @input="inputs_change($event, index, item.filterFc)" :placeholder="item.placeholder||'请输入' + item.title"
						 :password="inputsObj[onLoadData+index+'password']" :placeholder-style="item.placeholder_style" :placeholder-class="item.placeholder_class"
						 :maxlength="item.maxlength||140" :cursor-spacing="item.cursor_spacing" :focus="item.focus"
						 :confirm-type="item.confirm_type" :confirm-hold="item.confirm_hold" :selection-start="item.selection_start" :selection-end="item.selection_end"
						 :cursor="item.cursor" :adjust-position="item.adjust_position" :class="item.icon?'width85':'width100'" :disabled="item.disabled" :style="{'fontSize': (titleFontSize||windowHeight*scale_one) + 'px'}" />
					</view>
					<view class="width15" v-if="item.password">
						<view class="flex_row_c_c width100" @tap.prevent.stop="inputTap('passwordSwitch', index)">
							<uni-icon type="eye" :pxSize="contentFontSize||windowHeight*scale_two+8" :color="inputsObj[onLoadData+index+'password']?'#999999':item.iconColor||'#33cc33'"></uni-icon>
						</view>
					</view>
					<view class="width15" v-if="item.tapClear">
						<view class="flex_row_c_c width100" v-if="inputsObj[onLoadData+index]!=''" @tap.prevent.stop="inputTap('clear', index)">
							<uni-icon type="clear" :pxSize="contentFontSize||windowHeight*scale_two+8" color="#999999"></uni-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 验证码 -->
		<view class="flex_row width100 box-sizing-border-box"  :class="[animationType||'']" :style="{'padding': windowHeight*.02 + 'px ' + windowWidth*.03 + 'px', 'animation-duration': (inputsArray.length+1)*(animationDuration||.2) + 's'}"
		 v-if="ifCode">
			<view class="flex_row_e_c input_title" :style="{'fontSize': (titleFontSize||windowHeight*scale_one) + 'px', 'color': titleFontColor}">
				<view class="fontColorF1505C">*</view>验证码:
			</view>
			<view class="width75">
				<input type="text" value="" v-model="userCode" placeholder="请输入验证码" class="width100 borderBottom1pxf2f2f2" :style="{'fontSize': (titleFontSize||windowHeight*scale_one) + 'px'}" />
			</view>
		</view>
		<!-- rule -->
		<view class="flex_row_between_c box-sizing-border-box"  :class="[animationType||'']" :style="{'padding': windowHeight*.01 + 'px ' + windowWidth*.03 + 'px', 'animation-duration': (inputsArray.length+1)*(animationDuration||.2) + 's'}">
			<view class="flex_row_c_c fontColor666666" :style="{'fontSize': (contentFontSize||windowHeight*scale_two) + 'px'}"
			 v-if="ifRule">
				<label class="flex_row_c_c">
					<switch :checked="Igree" @change="IgreeFc" type="checkbox" />我已阅读并同意</label>
				<view class="fontColor007AFF" @tap="openRuleFc(ruleItem.value)" v-for="(ruleItem, ruleIndex) in ruleArray" :key="ruleIndex">{{ruleIndex==0?ruleItem.name:'、' + ruleItem.name}}</view>
			</view>
			<button type="primary" size="mini" v-if="ifCode" :disabled="startCode" @tap="!startCode?getCode():''">{{startCode?codeCount + 's后重新获取':'获取验证码'}}</button>
		</view>
		<!-- 主按钮 -->
		<button type="primary" @tap="activeFc" :class="[animationType||'']" :style="{'margin': windowHeight*.02 + 'px ' + windowHeight*.03 + 'px', 'animation-duration': (ifRule||ifCode?inputsArray.length+2:inputsArray.length+1)*(animationDuration||.2) + 's'}">{{activeName}}</button>
		<!-- mask -->
		<view class="mask" @touchmove.prevent.stop="picker_hideFc" @tap.prevent.stop="picker_hideFc" v-show="maskShow"></view>
		<!-- 日期选择 -->
		<view class="flex_row_c_c picker_view" v-if="pickerDateShow">
			<pickers-date class="width100" :startYear="P_data.startYear" :endYear="P_data.endYear" :defaultDate="P_data.defaultValue" @getDate="pickerChange($event)" 
			:mode="P_data.mode" :windowHeight="windowHeight" :indicatorStyle="P_data.indicatorStyle" :height="P_data.height" 
			:fontSize="contentFontSize||windowHeight*scale_two" :confirmName="P_data.confirmName" 
			:index="P_data.index"/>
		</view>
		<!-- 城市选择 -->
		<view class="flex_row_c_c picker_view" v-if="pickerCityShow">
			<pickers-city class="width100" :indicatorStyle="P_data.indicatorStyle" :height="P_data.height" :windowHeight="windowHeight" 
			:fontSize="contentFontSize||windowHeight*scale_two" @getCity="pickerChange($event)" 
			:pickerValueDefault="P_data.defaultValue" :confirmName="P_data.confirmName" :index="P_data.index"/>
		</view>
		<!-- picker自定义 -->
		<view class="flex_row_c_c picker_view" v-if="pickerCustomShow">
			<picker-custom class="width100" :itemArray="P_data.itemArray" :linkage="P_data.linkage" :linkageNum="P_data.linkageNum" :steps="P_data.steps" :indicatorStyle="P_data.indicatorStyle" :height="P_data.height" :windowHeight="windowHeight" 
			:fontSize="contentFontSize||windowHeight*scale_two" @getCustom="pickerChange($event)" 
			:pickerValueDefault="P_data.defaultValue" :confirmName="P_data.confirmName" :index="P_data.index"/>
		</view>
	</view>
</template>

<script>
	import _app from './app.js';
	import uniIcon from './uni-icon.vue';
	import pickersDate from './pickers-date.vue';
	import pickersCity from './mpvue-citypicker/picker-city.vue';
	import pickerCustom from './picker-custom.vue';
	
	export default {
		props: {
			inputsArray: { //用户自定义的输入类型
				type: Array,
				default () {
					return [];
				}
			},
			titleFontSize: { //title的font-size
				type: Number,
				default: 0
			},
			titleFontColor: { //title的color
				type: String,
				default: '#666666'
			},
			contentFontSize: { //inputs的font-size
				type: Number,
				default: 0
			},
			ruleArray: { //需用户同意的规则或协议
				type: Array,
				default () {
					return [];
				}
			},
			activeName: { //发送按钮的名字
				type: String,
				default: '发送'
			},
			ifCode: { //是否需要验证码
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
			cssMode: { //拥有子数组序列类型的布局方式
				type: String,
				default: 'wrap'
			},
			submitReSet: { //提交后重置
				type: Boolean,
				default: false
			},
			animationType: { //动画类型
				type: String,
				default: ''
			},
			animationDuration: { //动画时长系数
				type: Number,
				default: .2
			}
		},
		data() {
			return {
				code: '', //本地验证码
				userCode: '', //用户输入的验证码
				Igree: false, //用户是否同意规则或协议
				codeCount: 90, //获取验证码后倒计时时间
				startCode: false, //获取验证码状态
				picsObj: {}, //pics类型存储值
				scale_one: .021, //title(左边)字体大小系数
				scale_two: .018, //content(右边)字体大小系数
				default_titleFs: 12, //默认title(左边)字体大小
				default_contentFs: 10, //默认content(右边)字体大小
				windowHeight: 0, //屏幕高度
				windowWidth: 0, //屏幕宽度
				maskShow: false, //遮罩层是否显示
				pickerDateShow: false, //picker-date组件是否显示
				pickerCityShow: false, //picker-city组件是否显示
				pickerCustomShow: false, //picker-custom组件是否显示
				P_data: {}, //picker类型显示对象暂存
				pickerObj: {}, //picker类型视图对象暂存
				inputsObj: {} //inputsArray除特有暂存对象外的各类型视图暂存对象
			};
		},
		watch: {
			'inputsArray'(n, o) { //父级传入的inputsArray改变时自动初始化默认数据
				if (n) this.init();
			}
		},
		created() {
			// 获取系统信息并记录屏幕宽高来确定布局样式
			const system = uni.getSystemInfoSync();
			this.windowHeight = system.windowHeight;
			this.windowWidth = system.windowWidth;
			this.init();
		},
		methods: {
			init() { // 初始化默认数据
				let _this = this;
				//console.log('初始化inputs');
				let data = _this.inputsArray;
				for (let i = 0; i < data.length; i++) {
					let item = data[i];
					let itemVariableName = _this.onLoadData + i;
					switch (item.type) {
						case 'radio':
							let data;
							for (let j = 0; j < item.itemArray.length; j++) {
								if (item.itemArray[j].defaultValue) {
									data = item.itemArray[j].value;
									break;
								}
							}
							if(data) {
								_this[itemVariableName] = data;
								_this.$set(_this.inputsObj, itemVariableName, data);
							}else{
								_this[itemVariableName] = '';
								_this.$set(_this.inputsObj, itemVariableName, '');
							}
							break;
						case 'checkbox':
							let value = [];
							let status = [];
							for (let j = 0; j < item.itemArray.length; j++) {
								if (item.itemArray[j].defaultValue) {
									let d = item.itemArray[j].value;
									status.push(d)
									value.push(d);
								}else{
									status.push('');
								}
							}
							_this[itemVariableName] = {value, status: this.checkbox_status(status)};
							_this.$set(_this.inputsObj, itemVariableName, value);
							break;
						case 'pics':
							for (let j = 0; j < item.itemArray.length; j++) {
								if (item.itemArray[j].defaultValue) {
									_this.$set(_this.picsObj, itemVariableName + _this.onLoadData + j, item.itemArray[j].defaultValue);
								}else{
									_this.$set(_this.picsObj, itemVariableName + _this.onLoadData + j, '');
								}
							}
							break;
						case 'picker-date':
							if(item.onceShowDefaultValue) {
								let defaultDate;
								if(item.defaultValue) defaultDate = new Date(item.defaultValue); else defaultDate = new Date();
								let data = '',Y, M,D,defaultEndY = new Date().getFullYear() + 5;
								if(defaultDate.getFullYear() > (item.endYear||defaultEndY)) {
									Y = item.endYear || defaultEndY;
									M = 12;
									D = _app.countDays(Y,M-1).days.pop();
								}else {
									Y = defaultDate.getFullYear();
									M = defaultDate.getMonth()+1;
									D = defaultDate.getDate();
								}
								switch (item.mode){
									case 'picker-date':
										data = `${Y}-${M}-${D}`;
										break;
									case 'picker-time':
										data = `${defaultDate.getHours()}:${defaultDate.getMinutes()}:${defaultDate.getSeconds()}`;
										break;
									default:
										data = `${Y}-${M}-${D} ${defaultDate.getHours()}:${defaultDate.getMinutes()}:${defaultDate.getSeconds()}`;
										break;
								}
								_this[itemVariableName] = data;
								_this.$set(_this.pickerObj, itemVariableName, data);
								this[_app.pickerChoosedType.pickerChoosedType_date.value + i] = ''; //初始化时清空记忆数据
							}else{
								_this[itemVariableName] = '';
								_this.$set(_this.pickerObj, itemVariableName, '');
								this[_app.pickerChoosedType.pickerChoosedType_date.value + i] = ''; //初始化时清空记忆数据
							}
							break;
						case 'picker-city':
							if(item.onceShowDefaultValue) {
								let defaultValue = item.defaultValue||[0,0,0];
								let provinceDataList = require('./mpvue-citypicker/city-data/province.js').default;
								let cityDataList =  require('./mpvue-citypicker/city-data/city.js').default[defaultValue[0]];
								let areaDataList =  require('./mpvue-citypicker/city-data/area.js').default[defaultValue[0]][defaultValue[1]];
								let pcikerLabel =
									provinceDataList[defaultValue[0]].label +
									'-' +
									cityDataList[defaultValue[1]].label +
									'-' +
									areaDataList[defaultValue[2]].label;
								let data = {
									label: pcikerLabel,
									value: defaultValue,
									cityCode: areaDataList[defaultValue[2]].value
								};
								_this[itemVariableName] = data;
								_this.$set(_this.pickerObj, itemVariableName, data);
								this[_app.pickerChoosedType.pickerChoosedType_city.value + i] = null; //初始化时清空记忆数据
							}else{
								_this[itemVariableName] = null;
								_this.$set(_this.pickerObj, itemVariableName, null);
								this[_app.pickerChoosedType.pickerChoosedType_city.value + i] = null; //初始化时清空记忆数据
							}
							break;
						case 'picker-custom':
							if(item.onceShowDefaultValue) {
								let datas = item.itemArray;
								let v = [];
								if(item.defaultValue)
									v = item.defaultValue;
								else{
									if(item.linkage)
										for(let i = 0; i < item.linkageNum; i++) {
											v.push(0);
										}
									else
										item.itemArray.forEach(item=>{
											v.push(0);
										});
								}
								let data = {result:{}, value:v};
								let steps = item.steps;
								if(item.linkage&&!steps){
									_app.showToast('未设置steps');
									return;
								}
								if(item.linkage) {
									if(item.linkageNum == 2) {
										data.result.steps1 = datas[v[0]]
										if(!data.result.steps1)
											_app.showToast('第一列中不存在第'+v[0]+'项');
										data.result.steps2 = datas[v[0]][steps.steps_2_item][v[1]];
										if(!data.result.steps2)
											_app.showToast('第二列中不存在第'+v[1]+'项');
									}else if(item.linkageNum == 3) {
										data.result.steps1 = datas[v[0]];
										if(!data.result.steps1)
											_app.showToast('第一列中不存在第'+v[0]+'项');
										data.result.steps2 = data.result.steps1[steps.steps_2_item][v[1]];
										if(!data.result.steps2)
											_app.showToast('第二列中不存在第'+v[1]+'项');
										data.result.steps3 = data.result.steps2[steps.steps_3_item][v[2]];
										if(!data.result.steps3)
											_app.showToast('第三列中不存在第'+v[2]+'项');
									}else{
										_app.showToast('不在指定范围中');
									}
								}else{
									data.result = [];
									for(let i = 0; i < datas.length; i++) {
										let d = datas[i];
										data.result.push(d[v[i]]);
									}
								}
								_this[itemVariableName] = data;
								_this.$set(_this.pickerObj, itemVariableName, data);
								this[_app.pickerChoosedType.pickerChoosedType_custom.value + i] = null;
							}else{
								_this[itemVariableName] = '';
								_this.$set(_this.pickerObj, itemVariableName, '');
								this[_app.pickerChoosedType.pickerChoosedType_custom.value + i] = null;
							}
							break;
						case 'switch':
							_this[itemVariableName] = item.defaultValue || false;
							_this.$set(_this.inputsObj, itemVariableName, item.defaultValue || false);
							break;
						case 'slider':
							_this[itemVariableName] = item.defaultValue || item.min || 0;
							_this.$set(_this.inputsObj, itemVariableName, item.defaultValue || item.min || 0);
							break;
						default:
							if(item.defaultValue) {
								_this[itemVariableName] = item.defaultValue;
								_this.$set(_this.inputsObj, itemVariableName, item.defaultValue);
							}else{
								_this[itemVariableName] = '';
								_this.$set(_this.inputsObj, itemVariableName, '');
							}
							if(item.password) {
								_this.$set(_this.inputsObj, itemVariableName+'password', item.password);
							}
							break;
					}
				}
			},
			showPicker(obj, index) { //显示相对应的picker
				//console.log(JSON.stringify(obj));
				let _this = this;
				obj.index = index;
				_this.maskShow = true;
				if (obj && obj.type)
					switch (obj.type) {
						case 'picker-date':
							//记忆数据优先
							if(this[_app.pickerChoosedType.pickerChoosedType_date.value + index]) obj.defaultValue = this[_app.pickerChoosedType.pickerChoosedType_date.value + index];
							_this.P_data = obj;
							_this.pickerDateShow = true;
							break;
						case 'picker-city':
							//记忆数据优先
							if(this[_app.pickerChoosedType.pickerChoosedType_city.value + index]) obj.defaultValue = this[_app.pickerChoosedType.pickerChoosedType_city.value + index];
							_this.P_data = obj;
							_this.pickerCityShow = true;
							break;
						case 'picker-custom':
							//记忆数据优先
							if(this[_app.pickerChoosedType.pickerChoosedType_custom.value + index]) obj.defaultValue = this[_app.pickerChoosedType.pickerChoosedType_custom.value + index];
							_this.P_data = obj;
							_this.pickerCustomShow = true;
							break;
						default:
							_app.showToast('缺少必要参数-type');
							break;
					}
				else
					_app.showToast('picker参数错误');
			},
			IgreeFc(e) { // 用户是否同意规则
				this.Igree = e.detail.value;
			},
			openRuleFc(value) { // 打开规则页面的父级方法
				this.$emit('chaildOpenEvent', value);
			},
			checkbox_change(e, index) { //checkbox赋值方法
				let _this = this;
				let data = e.detail.value;
				let checkboxArray = _this.inputsArray[index].itemArray;
				let newArray = [];
				let oldArray = [];
				if(checkboxArray.length>0&&data.length>0) {
					checkboxArray.forEach(item=>{
						newArray.push('');
						oldArray.push(item.value);
					});
					data.forEach(item=>{
						let num = oldArray.indexOf(item);
						if(num>=0)
							newArray[num] = item;
					});
					_this.inputsObj[_this.onLoadData + index] = newArray; //视图暂存
				}
				_this[_this.onLoadData + index] = {value:e.detail.value, status: this.checkbox_status(newArray)};
			},
			checkbox_status(data) {
				for(let i = 0; i < data.length; i++) {
					if(data[i]) data[i] = true; else data[i] = false;
				}
				return data;
			},
			inputs_change(e, index, filterFc) { // 用户输入时，根据index赋值
				//console.log(e.detail.value);
				let _this = this;
				let val = e.detail.value;
				if(filterFc&&typeof(filterFc)=='function') {
					val = filterFc(val);
					if(val !== e.detail.value) {
						let voidPromise = new Promise((reslove,reject)=>{
							_this.$delete(_this.inputsObj, _this.onLoadData + index);
							reslove();
						})
						voidPromise.then(()=>{
							_this.$set(_this.inputsObj, _this.onLoadData + index, val);
							_this[_this.onLoadData + index] = val;
						})
					}else{
						_this.$set(_this.inputsObj, _this.onLoadData + index, val);
						_this[_this.onLoadData + index] = val;
					}
				}else{
					_this.$set(_this.inputsObj, _this.onLoadData + index, val);
					_this[_this.onLoadData + index] = val;
				}
			},
			pickerChange(res) { //picker类型选择后赋值 
				//console.log('pickerValue：' + JSON.stringify(res));
				this.pickerObj[this.onLoadData + res.index] = res.data;
				this[this.onLoadData + res.index] = res.data;
				switch (res.type){		// 该项picker的value记忆
					case _app.pickerChoosedType.pickerChoosedType_date.name:
						this[_app.pickerChoosedType.pickerChoosedType_date.value+res.index] = res.data;
						break;
					case _app.pickerChoosedType.pickerChoosedType_city.name:
						this[_app.pickerChoosedType.pickerChoosedType_city.value+res.index] = res.data.value;
						break;
					case _app.pickerChoosedType.pickerChoosedType_custom.name:
						this[_app.pickerChoosedType.pickerChoosedType_custom.value+res.index] = res.data.value;
						break;
					default:
						break;
				}
				this.picker_hideFc();
			},
			inputTap(type, index) { //input点击事件
				switch (type){
					case 'passwordSwitch':	//密码显隐
						this.$set(this.inputsObj, this.onLoadData+index+'password', !this.inputsObj[this.onLoadData+index+'password']);
						break;
					case 'clear':	//一键清除
						this.$set(this.inputsObj, this.onLoadData + index, '');
						this[this.onLoadData + index] = '';
						break;
					default:
						_app.showToast('inputTap类型错误');
						break;
				}
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
			sendSMS(phone) { // 生成验证码并发送给手机的方法
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
					let variableName = d[i].variableName || onLoadData;
					switch (d[i].type) {
						case 'pics':
							for (let j = 0; j < d[i].itemArray.length; j++) {
								let pic = _this.picsObj[onLoadData + _this.onLoadData + j];
								if (pic) {
									if (!inputsDataObj[onLoadData]&&!inputsDataObj[variableName])
										inputsDataObj[variableName] = [];
									inputsDataObj[variableName].push(pic);
								} else {
									if (d[i].itemArray[j].ignore) {
										if (!inputsDataObj[onLoadData]&&!inputsDataObj[variableName])
											inputsDataObj[variableName] = [];
										inputsDataObj[variableName].push('');
									} else {
										_app.showToast(d[i].itemArray[j].nullErr || d[i].itemArray[j].title + '不能为空');
										return;
									}
								}
							}
							break;
						case 'switch':
							inputsDataObj[variableName] = _this[onLoadData]?true:false;
							break;
						case 'slider':
							inputsDataObj[variableName] = _this[onLoadData];
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
					let variableName = d[i].variableName || onLoadData;
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
							let variableName = d[res[i].index1].variableName || onLoadData; // 自定义变量名或默认变量名
							if (typeof(inputsDataObj[variableName]) != 'string')
								inputsDataObj[variableName] = res[i].data || '|';
							else
								inputsDataObj[variableName] += res[i].data ? '|' + res[i].data : '|';
						}
					_this.$emit('activeFc', inputsDataObj); // 把用户输入数据封装成对象输出给父级
					_this.inputs_reSet(); //提交后重置
				});
			},
			inputs_reSet() {
				//提交后重置验证码
				this.code = '';
				this.userCode = '';
				this.Igree = false;
				//若submit为true，重置表单为初始化
				if(this.submitReSet) this.init();
			},
			chooseImg(index, picsIndex) { //选择图片
				let _this = this
				uni.chooseImage({
					success: function(res) {
						// console.log(res.tempFilePaths[0]);
						_this.$set(_this.picsObj, _this.onLoadData + index + _this.onLoadData + picsIndex, res.tempFilePaths[0]);
					}
				})
			},
			clearPic(index, picsIndex) { //清除图片
				this.picsObj[this.onLoadData + index + this.onLoadData + picsIndex] = '';
			},
			showImg(imgPath) { //大图预览选中的图片
				_app.previewImage(imgPath);
			},
			picker_hideFc() { //picker类型全部隐藏
				this.pickerDateShow = false;
				this.pickerCityShow = false;
				this.pickerCustomShow = false;
				this.maskShow = false;
				this.P_data = {};
			}
		},
		components: {
			uniIcon,
			pickersDate,
			pickersCity,
			pickerCustom
		}
	}
</script>

<style scoped>
	.overflow_x_hidden{
		overflow-x: hidden;
	}
	.input_title {
		width: 20%;
		margin-right: 5%;
	}

	.width75 {
		width: 75%;
	}
	.width70 {
		width: 70%;
	}
	.width25 {
		width: 25%;
	}
	.width15 {
		width: 15%;
	}
	.width85 {
		width: 85%;
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

	.mask {
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .6);
		z-index: 999;
	}

	.picker_view {
		width: 70%;
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 1000;
		transform: translate(-50%, -70%);
	}
	.view_Title_Left {
		font-weight: bold;
		padding: 1.5vh 3vw;
		box-sizing: border-box;
	}
	/* 新增 */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(.8);
		}
		
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
		
	@keyframes refadeIn {
		from {
			transform: scale(1.2);
			opacity: 0;
		}
		
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
	@keyframes slide-left {
		from {
			transform: translateX(-100%);
		}
		
		to {
			transform: translateX(0);
		}
	}
	@keyframes slide-fade-left {
		from {
			transform: translateX(-100%);
			opacity: 0;
		}
		
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
	@keyframes slide-right {
		from {
			transform: translateX(100%);
		}
		
		to {
			transform: translateX(0);
		}
	}
	@keyframes slide-fade-right {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
	@keyframes slide-fade-bottom {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
	@keyframes rotate3d-fade {
		from {
			transform: rotate3d(10,10,10,360deg);
			opacity: 0;
		}
		
		to {
			transform: rotate3d(10,10,10,0deg);
			opacity: 1;
		}
	}
	.fadIn {
		animation: fadeIn;
	}
		
	.refadIn {
		animation: refadeIn;
	}
	.slide-left{
		animation: slide-left;
	}
	.slide-fade-left{
		animation: slide-fade-left;
	}
	.slide-right{
		animation: slide-right;
	}
	.slide-fade-right{
		animation: slide-fade-right;
	}
	.slide-fade-bottom{
		animation: slide-fade-bottom;
	}
	.rotate3d-fade{
		animation: rotate3d-fade;
	}
</style>
