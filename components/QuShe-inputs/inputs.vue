<template>
	<view class="width100 overflow_x_hidden">
		<view class="width100 box-sizing-border-box transition_border_point6s border_radius_4px" :class="[item.animationType||animationType||'']"
		 :style="classObj.padding2_3 + 'animation-duration:' + (index+1)*(item.animationDuration||animationDuration||.2) + 's;' + 'border: 1px solid ' + (verifyStatusObj[onLoadData + index]||'rgba(0,0,0,0)') + ';'"
		 v-for="(item, index) in inputsArray" :key="item.title" :id="'Id_' + index">
			<!-- segmentationTitle -->
			<view class="width100 flex_row view_Title_Left" :style="classObj.segmentationTitle" v-if="item.segmentationTitle">
				{{item.segmentationTitle}}
			</view>
			<view class="flex_row" :style="{
			'padding-bottom': item.border_bottom?wH*.015+'px':'none',
			'border-bottom': item.border_bottom||'none', 
			'padding-top':item.border_top?wH*.015+'px':'none',
			'border-top': item.border_top||'none'}">
				<!-- title -->
				<view class="width20 marginRight5 flex_row_e_c" :style="classObj.titleColor + classObj.titleFs" v-if="!titleHide">
					<view class="width100 word_wrap" :class="classObj.titleLayout">
						<view class="fontColorF1505C" v-if="item.type!='pics'&&!item.ignore&&item.title">*</view>{{item.title?item.title:''}}
						<!-- <view class="fontColorF1505C" v-if="item.type!='pics'&&!item.ignore&&item.title">*</view>{{item.title?item.title + ':':''}} -->
					</view>
				</view>
				<view :class="[classObj.contentsWidth, classObj.contentsLayout]">
					<!-- pics -->
					<view class="box-sizing-border-box" v-if="item.type&&item.type=='pics'" :style="classObj.padding1_0 + classObj.contentWidth">
						<view class="width100 wrap" :class="[classObj.contentLayout]">
							<view class="flex_column_c_c box-sizing-border-box border_radius_4px transition_border_point6s" v-for="(picsItem, picsIndex) in item.itemArray"
							 :key="picsIndex" :style="classObj.paddingPoint5 + 'border: 1px solid ' + (verifyStatusObj[onLoadData + index + onLoadData + picsIndex]||'rgba(0,0,0,0)') + ';'">
								<view class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px bacnground_color_f8f8f8" :style="classObj.picsBox"
								 @tap="chooseImg(index, picsIndex)">
									<image :src="picsObj[onLoadData + index + onLoadData + picsIndex]" class="border_radius_4px box_shadow_2px_2px_5px_ADADAD"
									 mode="aspectFill" :style="classObj.picsBox" v-if="picsObj[onLoadData + index + onLoadData + picsIndex]" @tap="showImg(picsObj[onLoadData + index + onLoadData + picsIndex])">
									</image>
									<view v-else>
										<uni-icon type="image" :pxSize="wH*.05" color="#999999" />
									</view>
									<view class="picsClear" v-if="picsObj[onLoadData + index + onLoadData + picsIndex]" @tap.stop.prevent="clearPic(index, picsIndex)">
										<uni-icon type="clear" :color="item.clearColor||'#f5105c'" :pxSize="wH*.03" />
									</view>
								</view>
								<view class="flex_row_c_c fontColorADADAD" :style="classObj.picsTitle + classObj.content" v-if="picsItem.title">
									<view class="fontColorF1505C" v-if="!picsItem.ignore">*</view>{{picsItem.title}}
								</view>
							</view>
						</view>
					</view>
					<!-- switch -->
					<view :class="[classObj.contentLayout]" :style="classObj.contentWidth" v-else-if="item.type&&item.type=='switch'">
						<view class="position_relative">
							<switch :checked="inputsObj[onLoadData+index]" :disabled="item.disabled" :type="item.mode||'switch'" :color="item.color"
							 @change="inputs_change($event, index)" :style="'transform: scale(' + (item.scale||'.8') + ');'" />
						</view>
					</view>
					<!-- slider -->
					<view :style="classObj.contentWidth" v-else-if="item.type&&item.type=='slider'">
						<slider @change="inputs_change($event, index)" :min="item.min||0" :max="item.max||100" :step="item.step||1"
						 :disabled="item.disabled" :value="inputsObj[onLoadData+index]" :color="item.color" :selected-color="item.selected_color"
						 :activeColor="item.activeColor" :backgroundColor="item.backgroundColor" :block-size="item.block_size"
						 :block-color="item.block_color" :show-value="item.show_value" />
					</view>
					<!-- radio -->
					<view :style="classObj.contentWidth" v-else-if="item.type&&item.type=='radio'">
						<radio-group @change="inputs_change($event, index)" class="width100 wrap" :class="[classObj.contentLayout]">
							<label class="fontColor666666 flex_row_none_c box-sizing-border-box" :style="classObj.content + classObj.padding1 + classObj.marginRight2"
							 v-for="(radioItem, radioIndex) in item.itemArray" :key="radioIndex">
								<radio :value="radioItem.value" :checked="inputsObj[onLoadData+index]==radioItem.value" :disabled="radioItem.disabled"
								 :color="radioItem.color||item.color" :style="'transform: scale(' + (item.scale||'.8') + ');'" />
								<view class="flex_row_none_c">{{radioItem.name}}</view>
							</label>
						</radio-group>
					</view>
					<!-- checkbox -->
					<view :style="classObj.contentWidth" v-else-if="item.type&&item.type=='checkbox'">
						<checkbox-group @change="checkbox_change($event, index)" class="width100 wrap" :class="[classObj.contentLayout]">
							<label class="fontColor666666 flex_row_none_c box-sizing-border-box" :style="classObj.content + classObj.padding1 + classObj.marginRight2"
							 v-for="(checkboxItem, checkboxIndex) in item.itemArray" :key="checkboxIndex">
								<checkbox :value="checkboxItem.value" :checked="inputsObj[onLoadData+index]&&inputsObj[onLoadData+index].status&&inputsObj[onLoadData+index].status[checkboxIndex]" :disabled="checkboxItem.disabled"
								 :color="checkboxItem.color||item.color" :style="'transform: scale(' + (item.scale||'.8') + ');'" />
								<view class="flex_row_none_c">{{checkboxItem.name}}</view>
							</label>
						</checkbox-group>
					</view>
					<!-- textarea -->
					<view :class="[classObj.contentLayout]" :style="classObj.contentWidth" v-else-if="item.type&&item.type=='textarea'">
						<textarea :value="inputsObj[onLoadData+index]" :placeholder="item.placeholder||'请输入' + item.title"
						 :placeholder-style="item.placeholder_style" :placeholder-class="item.placeholder_class" :style="{
						'font-size': classObj.contentSize + 'px', 
						'height': !item.auto_height?(item.height||wH*.1)+'px':'', 
						'width': item.width||'60%', 'background-color': item.backgroundColor||'#F8F8F8', 
						'color': item.color||'#666666', 
						'border': '1px solid ' + (focusObj[onLoadData+index+'focus']?(item.focusBorderStyle||focusStyle.focusBorderStyle||'#999999'):(item.blurBorderStyle||focusStyle.blurBorderStyle||'#f8f8f8'))}"
						 class="width100 border_radius_4px padding8px transition_point6s" :disabled="item.disabled" :maxlength="item.maxlength||140"
						 :focus="focusObj[onLoadData+index+'focus']" :auto-height="item.auto_height" :fixed="item.fixed" :cursor-spacing="item.cursor_spacing"
						 :cursor="item.cursor" :show-confirm-bar="item.show_confirm_bar" :selection-start="item.selection_start"
						 :selection-end="item.selection_end" :adjust-position="item.adjust_position" @input="inputs_change($event, index, item.filterFc, true)"
						 @focus="focusChange(index)" @blur="blurChange(index)" />
						</view>
					<!-- picker-date -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-date'">
						<view class="flex_row_none_c width100" v-if="inputsObj[onLoadData+index]">
							<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.content">
								{{inputsObj[onLoadData+index]}}
							</view>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, index)" size="mini" class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择日期'}}
							</button>
						</view>
					</view>
					<!-- picker-city -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-city'">
						<view class="flex_row_none_c width100" v-if="inputsObj[onLoadData+index]">
							<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.content">
								{{inputsObj[onLoadData+index].label}}
							</view>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, index)" size="mini"  class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择城市'}}
							</button>
						</view>
					</view>
					<!-- picker-custom -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-custom'">
						<view class="flex_row_none_c width100" v-if="inputsObj[onLoadData+index]">
							<block v-if="item.linkage">
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.content">
									{{item.linkageNum==2?inputsObj[onLoadData+index].result.steps1[item.steps.steps_1_value]+'-'+(item.steps.steps_2_value?inputsObj[onLoadData+index].result.steps2[item.steps.steps_2_value]:inputsObj[onLoadData+index].result.steps2):item.linkageNum==3?inputsObj[onLoadData+index].result.steps1[item.steps.steps_1_value]+'-'+inputsObj[onLoadData+index].result.steps2[item.steps.steps_2_value]+'-'+(item.steps.steps_3_value?inputsObj[onLoadData+index].result.steps3[item.steps.steps_3_value]:inputsObj[onLoadData+index].result.steps3):'不在范围中'}}
								</view>
							</block>
							<block v-else>
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.content">
									<view v-for="(i, d) in inputsObj[onLoadData+index].result" :key="d">
										{{d==0?(item.steps?item.steps.steps_1_value?i[item.steps.steps_1_value]:i:i):'-' + (item.steps?item.steps.steps_1_value?i[item.steps.steps_1_value]:i:i)}}
									</view>
								</view>
							</block>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, index)" size="mini"  class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择'}}
							</button>
						</view>
					</view>
					<!-- picker-custom2 -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-custom2'">
						<view class="flex_row_none_c width100" v-if="inputsObj[onLoadData+index]">
							<block v-if="item.linkage">
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.content" v-if="item.linkageNum==2">
									{{(item.steps&&item.steps.step_1_value?inputsObj[onLoadData+index].result.steps1[item.steps.step_1_value]:inputsObj[onLoadData+index].result.steps1) + '-' + (item.steps&&item.steps.step_2_value?inputsObj[onLoadData+index].result.steps2[item.steps.step_2_value]:inputsObj[onLoadData+index].result.steps2)}}
								</view>
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.content" v-else-if="item.linkageNum==3">
									{{(item.steps&&item.steps.step_1_value?inputsObj[onLoadData+index].result.steps1[item.steps.step_1_value]:inputsObj[onLoadData+index].result.steps1) + '-' + (item.steps&&item.steps.step_2_value?inputsObj[onLoadData+index].result.steps2[item.steps.step_2_value]:inputsObj[onLoadData+index].result.steps2) + '-' + (item.steps&&item.steps.step_3_value?inputsObj[onLoadData+index].result.steps3[item.steps.step_3_value]:inputsObj[onLoadData+index].result.steps3)}}
								</view>
							</block>
							<block v-else>
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.content">
									<view v-for="(i, d) in inputsObj[onLoadData+index].result" :key="d">
										{{d==0?(item.steps?item.steps.step_1_value?i[item.steps.step_1_value]:i:i):'-' + (item.steps?item.steps.step_1_value?i[item.steps.step_1_value]:i:i)}}
									</view>
								</view>
							</block>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, index)" size="mini"  class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择'}}
							</button>
						</view>
					</view>
					<!-- picker-provincialStreet -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-provincialStreet'">
						<view class="flex_row_none_c width100" v-if="inputsObj[onLoadData+index]">
							<view class="flex_row_e_c fontColor666666 width70 word_wrap" :style="classObj.content">
								{{inputsObj[onLoadData+index].label}}
							</view>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, index)" size="mini"  class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择街道'}}
							</button>
						</view>
					</view>
					<!-- text -->
					<view :class="[classObj.contentLayout]" :style="classObj.contentWidth"
					 v-else-if="item.type&&item.type=='text'">
						<view class="width100 flex_row_between_c" :style="classObj.padding0_3">
							<view class="fontColor666666" :style="(item.titleStyle||classObj.content)">
								{{titleHide?item.title:''}}
							</view>
							<view class="fontColorADADAD" :class="item.ellipsis?'text_overflow_ellipsis':''" :style="classObj.content + item.contentStyle">
								{{item.content}}
							</view>
						</view>
					</view>
					<!-- input -->
					<view class="flex_row_none_c transition_point6s" :style="classObj.contentWidth + 'border-bottom: 1px solid ' + (focusObj[onLoadData+index+'focus']?(item.focusBorderStyle||focusStyle.focusBorderStyle||'#999999'):(item.blurBorderStyle||focusStyle.blurBorderStyle||'#f2f2f2')) + ';'" v-else>
						<view :class="item.tapClear&&item.password?'width70':item.tapClear||item.password?'width85':'width100'" class="flex_row_none_c">
							<view class="width15" v-if="item.icon">
								<view class="flex_row_c_c width100">
									<uni-icon :type="item.icon" :pxSize="classObj.iconSize" :color="item.iconColor||'#999999'"></uni-icon>
								</view>
							</view>
							<input :type="item.inputType||'text'" :value="inputsObj[onLoadData+index]" @input="inputs_change($event, index, item.filterFc, true)" :placeholder="item.placeholder||'请输入' + item.title"
							 :password="passwordObj[onLoadData+index+'password']" :placeholder-style="item.placeholder_style" :placeholder-class="item.placeholder_class"
							 :maxlength="item.maxlength||140" :cursor-spacing="item.cursor_spacing" :focus="focusObj[onLoadData+index+'focus']"
							 :confirm-type="item.confirm_type" :confirm-hold="item.confirm_hold" :selection-start="item.selection_start" :selection-end="item.selection_end"
							 :cursor="item.cursor" :adjust-position="item.adjust_position" :class="item.icon?'width85':'width100'" :disabled="item.disabled" 
							 :style="classObj.content" class="fontColor666666" @focus="focusChange(index)" @blur="blurChange(index)"/>
						</view>
						<view class="width15" v-if="item.password">
							<view class="flex_row_c_c width100" @tap.prevent.stop="inputTap('passwordSwitch', index)">
								<uni-icon type="eye" :pxSize="classObj.iconSize" :color="passwordObj[onLoadData+index+'password']?'#999999':item.iconColor||'#33cc33'"></uni-icon>
							</view>
						</view>
						<view class="width15" v-if="item.tapClear">
							<view class="flex_row_c_c width100" v-if="inputsObj[onLoadData+index]!=''" @tap.prevent.stop="inputTap('clear', index)">
								<uni-icon type="clear" :pxSize="classObj.iconSize" color="#999999"></uni-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 验证码 -->
		<view class="flex_row width100 box-sizing-border-box"  :class="[animationType||'']" :style="classObj.padding2_3 + classObj.animationDuration1"
		 v-if="ifCode">
			<view class="width20 marginRight5" :class="classObj.titleLayout" :style="classObj.titleFs + classObj.titleColor" v-if="!titleHide">
				<view class="fontColorF1505C">*</view>验证码
			</view>
			<view :class="[classObj.contentsWidth, classObj.contentsLayout]">
				<view class="flex_row" :style="classObj.contentWidth">
					<view class="width45">
						<input type="text" :value="userCode" placeholder="请输入验证码" class="width100 borderBottom1pxf2f2f2" :style="classObj.content" @input="code_change($event)"/>
					</view>
					<view class="flex_row_e_c width55" :style="classObj.padding0_3">
						<button type="primary" size="mini" v-if="ifCode" :disabled="startCode" @tap="getCode()" class="pickerBtn" :style="classObj.getcodeButton">{{startCode?codeCount + 's':'获取验证码'}}</button>
					</view>
				</view>
			</view>
		</view>
		<!-- rule -->
		<view class="flex_row_c_c box-sizing-border-box fontColor666666"  :class="[animationType||'']" :style="classObj.padding1_3 + classObj.animationDuration1 + classObj.content" v-if="ifRule">
			<label class="flex_row_c_c">
				<switch :checked="Igree" @change="IgreeFc" type="checkbox" :color="ruleSet.checkbox_color"/>我已阅读并同意
			</label>
			<view :style="'color:' + (ruleItem.color||ruleSet.color||'#007AFF') + ';'" @tap="openRuleFc(ruleItem.value)" v-for="(ruleItem, ruleIndex) in ruleSet.itemArray" :key="ruleIndex">{{ruleIndex==0?ruleItem.name:'、' + ruleItem.name}}</view>
		</view>
		<!-- 主按钮 -->
		<button v-if="inputsArray&&inputsArray.length>0&&activeName" type="primary" @tap="activeFc" :class="[animationType||'']" :style="classObj.margin2_3 + classObj.animationDuration2 + classObj.activeButton">{{activeName}}</button>
		<!-- mask -->
		<view class="mask" @touchmove.prevent.stop="picker_hideFc" @tap.prevent.stop="picker_hideFc" v-show="maskShow"></view>
		<!-- 日期选择 -->
		<view class="flex_row_c_c picker_view" v-if="pickerDateShow">
			<pickers-date class="width100" :startYear="P_data.startYear" :endYear="P_data.endYear" :defaultDate="P_data.defaultValue" @getDate="picker_change($event)" 
			:mode="P_data.mode" :wH="wH" :indicatorStyle="P_data.indicatorStyle" :height="P_data.height" 
			:fontSize="classObj.contentSize" :confirmName="P_data.confirmName" 
			:index="P_data.index" :confirmStyle="classObj.confirmButton"/>
		</view>
		<!-- 城市选择 -->
		<view class="flex_row_c_c picker_view" v-else-if="pickerCityShow">
			<pickers-city class="width100" :indicatorStyle="P_data.indicatorStyle" :height="P_data.height" :wH="wH" 
			:fontSize="classObj.contentSize" @getCity="picker_change($event)" 
			:pickerValueDefault="P_data.defaultValue" :confirmName="P_data.confirmName" :index="P_data.index" :confirmStyle="classObj.confirmButton"/>
		</view>
		<!-- picker自定义 -->
		<view class="flex_row_c_c picker_view" v-else-if="pickerCustomShow">
			<picker-custom class="width100" :itemArray="P_data.itemArray" :linkage="P_data.linkage" :linkageNum="P_data.linkageNum" :steps="P_data.steps" :indicatorStyle="P_data.indicatorStyle" :height="P_data.height" :wH="wH" 
			:fontSize="classObj.contentSize" @getCustom="picker_change($event)" 
			:pickerValueDefault="P_data.defaultValue" :confirmName="P_data.confirmName" :index="P_data.index" :confirmStyle="classObj.confirmButton"/>
		</view>
		<!-- picker自定义2 -->
		<view class="flex_row_c_c picker_view" v-else-if="pickerCustom2Show">
			<picker-custom2 class="width100" :itemArray="P_data.itemArray" :itemObject="P_data.itemObject" :linkage="P_data.linkage" :linkageNum="P_data.linkageNum" :steps="P_data.steps" :indicatorStyle="P_data.indicatorStyle" :height="P_data.height" :wH="wH" 
			:fontSize="classObj.contentSize" @getCustom="picker_change($event)" 
			:pickerValueDefault="P_data.defaultValue" :confirmName="P_data.confirmName" :index="P_data.index" :confirmStyle="classObj.confirmButton"/>
		</view>
		<!-- 省市区街道四级联动 -->
		<view class="flex_row_c_c picker_view" v-else-if="pickerProvincialStreetShow">
			<picker-provincialStreet class="width100" :indicatorStyle="P_data.indicatorStyle" :height="P_data.height" :wH="wH" 
			:fontSize="classObj.contentSize" @getProvincialStreet="picker_change($event)" 
			:pickerValueDefault="P_data.defaultValue" :confirmName="P_data.confirmName" :index="P_data.index" :confirmStyle="classObj.confirmButton"/>
		</view>
	</view>
</template>

<script>
	import _app from './app.js';
	import uniIcon from './uni-icon.vue';
	import pickersDate from './pickers-date.vue';
	import pickersCity from './mpvue-citypicker/picker-city.vue';
	import pickerCustom from './picker-custom.vue';
	import pickerCustom2 from './picker-custom2.vue';
	import pickerProvincialStreet from './mpvue-citypicker/picker-provincialStreet.vue';
	
	// const inputsObj = {};
	const debounceName = 'inputdebounce_';
	const debounceTimeName = 'inputdebounce_time_';
	const inputDebounce = {};
	
	var inputCodeDebounce;	//验证码输入防抖
	var inputCodeDebounceTime;	//验证码输入防抖间隔记录时间戳
	
	export default {
		name: 'inputs',
		components: {
			uniIcon,
			pickersDate,
			pickersCity,
			pickerCustom,
			pickerCustom2,
			pickerProvincialStreet
		},
		props: {
			inputsArray: { //需循环的输入数组
				type: Array,
				default () {
					return [];
				}
			},
			titleSet: { //title(左边)设置
				type: Object,
				default() {
					return {size:0, color: '#666666', layout: 'right'};
				}
			},
			contentSet: { //comtent(右边)设置
				type: Object,
				default() {
					return {size:0, width: 100,layout: 'right'};
				}
			},
			ruleSet: { //需用户同意的规则或协议
				type: Object,
				default () {
					return {color: '#007aff', checkbox_color: '#007aff', itemArray: []};
				}
			},
			activeName: { //主按钮名字
				type: String,
				default: ''
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
			},
			buttonStyle: { //按钮样式设置
				type:Object,
				default() {
					return {
						activeButton: '',
						changeButton: '',
						selectButton: '',
						confirmButton: '',
						getcodeButton: '',
					}
				}
			},
			titleHide: { //是否隐藏title
				type: Boolean,
				default: false
			},
			inputDebounceSet: { //input、textarea防抖设置, 可以直接这里设置为true, 外面就不用设置了
				type: Object,
				default() {
					return {
						openInputDebounce: true,
						delay: 500
					}
				}
			},
			focusStyle: { //input、textarea类型focus时的边框样式
				type: Object,
				default() {
					return {
						onFocusBorderStyle: '#999999',
						offFocusBorderStyle: '#f8f8f8'
					}
				}
			},
			fontSizeScaleSet: { //字体大小系数控制
				type: Object,
				default() {
					return {};
				}
			},
			verifyStatusSet: {
				type: Object,
				default() {
					return {
						openVerifyStatus: false,
						openScroll: false,
						openChangeBorderColor: false,
						inputsId: '',
						errNullColor: 'rgba(245,16,92,.7)',
						verifyErrorColor: 'rgba(255,255,0,.7)'
					};
				}
			},
			usingComponents: {
				type: Boolean,
				default: false
			}
		},
		data() {
			// 获取系统信息并记录屏幕宽高来确定布局样式
			const systemData = uni.getSystemInfoSync();
			const wH = systemData.screenHeight;
			const wW = systemData.screenWidth;
			const f = this.fontSizeScaleSet;
			const scale_one = f.titleScale||f.allScale||.018; //title(左边)字体大小系数
			const scale_two = f.contentScale||f.allScale||.017; //content(右边)字体大小系数
			return {
				code: '', //本地验证码
				phoneIndex: -1, //记录inputsArray项内属性phone为true的下标，获取验证码时就不用循环判断了
				userCode: '', //用户输入的验证码
				Igree: false, //用户是否同意规则或协议
				codeCount: 90, //获取验证码后倒计时时间
				startCode: false, //获取验证码状态
				picsObj: {}, //pics类型存储值
				wH, //屏幕高度
				maskShow: false, //遮罩层是否显示
				pickerDateShow: false, //picker-date组件是否显示
				pickerCityShow: false, //picker-city组件是否显示
				pickerCustomShow: false, //picker-custom组件是否显示
				pickerCustom2Show: false, //picker-custom2组件是否显示
				pickerProvincialStreetShow: false, //picker-provincialStreetShow组件是否显示
				P_data: {}, //picker类型显示对象暂存
				pickerObj: {}, //picker类型视图对象暂存
				inputsObj: {} , //inputsArray除特有对象外的各类型视图对象
				passwordObj: {}, //input password视图暂存
				focusObj:{}, //input、textarea视图暂存
				verifyStatusObj: {}, //校验边框颜色
				classObj: { //拼接页面需用的样式
					segmentationTitle: 'font-size:' + wH*.024 + 'px;padding:' + wH*.015+'px '+ wW*.03+'px;',
					titleFs: 'font-size:' + (this.titleSet.size||wH*scale_one) + 'px;',
					titleColor: 'color:' + (this.titleSet.color||'#666666') + ';',
					content: 'font-size:' + (this.contentSet.size||wH*scale_two) + 'px;',
					contentWidth: 'width:' + (this.titleHide?this.contentSet.width:'100') + '%;',
					contentsLayout: this.titleHide?this.contentSet.layout=='left'?'flex_row_none_c':this.contentSet.layout=='center'?'flex_row_c_c':'flex_row_e_c':'flex_row_e_c',
					contentLayout: this.contentSet.layout=='left'?'flex_row_none_c':this.contentSet.layout=='center'?'flex_row_c_c':'flex_row_e_c',
					titleLayout: this.titleSet.layout=='left'?'flex_row_none_c':this.titleSet.layout=='center'?'flex_row_c_c':'flex_row_e_c',
					contentsWidth:  this.titleHide?'width100':'width75',
					contentSize: this.contentSet.size||wH*scale_two, //number
					iconSize: (this.contentSet.size||wH*scale_two) + 8, //number
					padding1_0: 'padding:' + wH*.01 + 'px 0;',
					padding1: 'padding:' + wH*.01 + 'px;',
					paddingPoint5: 'padding:' + wH*.005 + 'px;',
					padding0_3: 'padding:' +  '0 ' + wW*.03+'px;',
					padding2_3: 'padding:' + wH*.02 + 'px ' + wW*.03 + 'px;',
					padding1_3: 'padding:' + wH*.01 + 'px ' + wW*.03 + 'px;',
					margin2_3: 'margin:' + wH*.02 + 'px ' + wH*.03 + 'px;',
					margin0_15: 'margin: 0 ' + wH*.015 + 'px;',
					margin0_1: 'margin: 0 ' + wH*.01 + 'px;',
					picsBox: 'height:' + wW*.14+'px;width:' + wW*.17+'px;',
					picsTitle:'width:' + wW*.2+'px;margin-top:' + wH*.01+'px;',
					marginRight2: 'margin-right:' + wW*.02+'px;',
					marginLeft3: 'margin-left:' + wW*.03+'px;',
					animationDuration1: 'animation-duration:' + (this.inputsArray.length+1)*(this.animationDuration||.2) + 's;',
					animationDuration2: 'animation-duration:' + (this.ifRule||this.ifCode?this.inputsArray.length+2:this.inputsArray.length+1)*(this.animationDuration||.2) + 's;',
					activeButton: this.buttonStyle.activeButton||'',
					changeButton: this.buttonStyle.changeButton||'',
					selectButton: this.buttonStyle.selectButton||'',
					confirmButton: this.buttonStyle.confirmButton||'',
					getcodeButton: this.buttonStyle.getcodeButton||'',
				}
			};
		},
		watch: {
			'inputsArray'(n, o) { //父级传入的inputsArray改变时自动初始化默认数据
				// console.log('inputsArray变化了:' + JSON.stringify(n));
				if (n) this.init();
			}
		},
		created() {
			this.init(); //初始化
		},
		methods: {
			init() { // 初始化默认数据
				let _this = this;
				//console.log('初始化inputs');
				let data = _this.inputsArray;
				_this.$set(_this, 'verifyStatusObj', {});
				if(_this.phoneIndex >= 0) _this.phoneIndex = -1;
				for (let i = 0; i < data.length; i++) { //循环inputsArray，对 相应类型相应初始化默认值
					let item = data[i];
					let itemVariableName = _this.onLoadData + i;
					if(item.phone)
						if(!_this.phoneIndex) _this.phoneIndex = i;
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
								// inputsObj[itemVariableName] = data;
								_this.$set(_this.inputsObj, itemVariableName, data);
							}else{
								// inputsObj[itemVariableName] = '';
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
							// inputsObj[itemVariableName] = {value, status: _app.checkbox_status(status)};
							_this.$set(_this.inputsObj, itemVariableName, {value, status: _app.checkbox_status(status)});
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
										data = `${Y}/${M}/${D}`;
										break;
									case 'picker-time':
										data = `${defaultDate.getHours()}:${defaultDate.getMinutes()}:${defaultDate.getSeconds()}`;
										break;
									default:
										data = `${Y}/${M}/${D} ${defaultDate.getHours()}:${defaultDate.getMinutes()}:${defaultDate.getSeconds()}`;
										break;
								}
								// inputsObj[itemVariableName] = data;
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_date.value + i] = ''; //初始化时清空记忆数据
							}else{
								// inputsObj[itemVariableName] = '';
								_this.$set(_this.inputsObj, itemVariableName, '');
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_date.value + i] = ''; //初始化时清空记忆数据
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
								// inputsObj[itemVariableName] = data;
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value + i] = null; //初始化时清空记忆数据
							}else{
								// inputsObj[itemVariableName] = null;
								_this.$set(_this.inputsObj, itemVariableName, null);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value + i] = null; //初始化时清空记忆数据
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
								// inputsObj[itemVariableName] = data;
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom.value + i] = null;
							}else{
								// inputsObj[itemVariableName] = '';
								_this.$set(_this.inputsObj, itemVariableName, '');
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom.value + i] = null;
							}
							break;
						case 'picker-custom2':
							if(item.onceShowDefaultValue) {
								let datas = item.linkage?item.itemObject:item.itemArray;
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
										data.result.steps1 = datas.step_1[v[0]];
										if(!data.result.steps1)
											_app.showToast('第一列中不存在第'+v[0]+'项');
										data.result.steps2 = datas.step_2[v[0]][v[1]];
										if(!data.result.steps2)
											_app.showToast('第二列中不存在第'+v[1]+'项');
									}else if(item.linkageNum == 3) {
										data.result.steps1 = datas.step_1[v[0]];
										if(!data.result.steps1)
											_app.showToast('第一列中不存在第'+v[0]+'项');
										data.result.steps2 = datas.step_2[v[0]][v[1]];
										if(!data.result.steps2)
											_app.showToast('第二列中不存在第'+v[1]+'项');
										data.result.steps3 = datas.step_3[v[0]][v[1]][v[2]];
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
								// inputsObj[itemVariableName] = data;
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom2.value + i] = null;
							}else{
								// inputsObj[itemVariableName] = '';
								_this.$set(_this.inputsObj, itemVariableName, '');
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom2.value + i] = null;
							}
							break;
						case 'switch':
							// inputsObj[itemVariableName] = item.defaultValue || false;
							_this.$set(_this.inputsObj, itemVariableName, item.defaultValue || false);
							break;
						case 'slider':
							// inputsObj[itemVariableName] = item.defaultValue || item.min || 0;
							_this.$set(_this.inputsObj, itemVariableName, item.defaultValue || item.min || 0);
							break;
						case 'picker-provincialStreet':
							if(item.onceShowDefaultValue) {
								let defaultValue = item.defaultValue||[0,0,0,0];
								let provinceDataList = require('./mpvue-citypicker/city-data/province.js').default;
								let cityDataList =  require('./mpvue-citypicker/city-data/city.js').default[defaultValue[0]];
								let areaDataList =  require('./mpvue-citypicker/city-data/area.js').default[defaultValue[0]][defaultValue[1]];
								let streetDataList =  require('./mpvue-citypicker/city-data/streets.js').default[defaultValue[0]][defaultValue[1]][defaultValue[2]];
								let pcikerLabel =
									provinceDataList[defaultValue[0]].label +
									'-' +
									cityDataList[defaultValue[1]].label +
									'-' +
									areaDataList[defaultValue[2]].label +
									'-' +
									streetDataList[defaultValue[3]];
								let data = {
									label: pcikerLabel,
									value: defaultValue,
									cityCode: areaDataList[defaultValue[2]].value
								};
								// inputsObj[itemVariableName] = data;
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value + i] = null; //初始化时清空记忆数据
							}else{
								// inputsObj[itemVariableName] = null;
								_this.$set(_this.inputsObj, itemVariableName, null);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value + i] = null; //初始化时清空记忆数据
							}
							break;
						case 'text':
							break;
						default:
							if(item.defaultValue) {
								_this.$set(_this.inputsObj, itemVariableName, item.defaultValue);
							}else{
								_this.$set(_this.inputsObj, itemVariableName, '');
							}
							if(item.password) {
								_this.$set(_this.passwordObj, itemVariableName+'password', item.password);
							}
							if(item.focus) {
								_this.$set(_this.focusObj, itemVariableName+'focus', item.focus);
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
							if(_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_date.value + index]) obj.defaultValue = _this.pickerObj[_app.pickerChoosedType.pickerChoosedType_date.value + index];
							_this.P_data = obj;
							_this.pickerDateShow = true;
							break;
						case 'picker-city':
							//记忆数据优先
							if(_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value + index]) obj.defaultValue = _this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value + index];
							_this.P_data = obj;
							_this.pickerCityShow = true;
							break;
						case 'picker-custom':
							//记忆数据优先
							if(_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom.value + index]) obj.defaultValue = _this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom.value + index];
							_this.P_data = obj;
							_this.pickerCustomShow = true;
							break;
						case 'picker-custom2':
							//记忆数据优先
							if(_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom2.value + index]) obj.defaultValue = _this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom2.value + index];
							_this.P_data = obj;
							_this.pickerCustom2Show = true;
							break;
						case 'picker-provincialStreet':
							//记忆数据优先
							if(_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_provincialStreet.value + index]) obj.defaultValue = _this.pickerObj[_app.pickerChoosedType.pickerChoosedType_provincialStreet.value + index];
							_this.P_data = obj;
							_this.pickerProvincialStreetShow = true;
							break;
						default:
							_app.showToast('缺少必要参数-type');
							break;
					}
				else
					_app.showToast('picker参数错误');
			},
			IgreeFc({detail: {value}}) { // 用户是否同意规则
				this.Igree = value;
			},
			openRuleFc(value) { // 打开规则页面的父级方法
				this.$emit('chaildOpenEvent', value);
			},
			checkbox_change({detail: {value}}, index) { //checkbox赋值方法
				let _this = this;
				let checkboxArray = _this.inputsArray[index].itemArray;
				let newArray = [];
				let oldArray = [];
				if(checkboxArray.length>0&&value.length>0) {
					checkboxArray.forEach(item=>{
						newArray.push('');
						oldArray.push(item.value);
					});
					value.forEach(item=>{
						let num = oldArray.indexOf(item);
						if(num>=0)
							newArray[num] = item;
					});
				}
				_this.$set(_this.inputsObj, _this.onLoadData + index, {value, status: _app.checkbox_status(newArray)})
			},
			inputs_change({detail: {value}}, index, filterFc, isInput) { // 用户输入时，根据index赋值
				//console.log(e.detail.value);
				if(this.inputDebounceSet.openInputDebounce&&isInput) {
					if(inputDebounce[debounceName+index]) clearTimeout(inputDebounce[debounceName+index]);
					if(inputDebounce[debounceTimeName+index]&&new Date().getTime()-inputDebounce[debounceTimeName+index]<(this.inputDebounceSet.delay||500)) {
						console.log('防抖冲突,立即执行')
						this.inputs_changeFc(value, index, filterFc, true);
					}else{
						inputDebounce[debounceName+index] = setTimeout(()=>{
							console.log('防抖')
							this.inputs_changeFc(value, index, filterFc);
						}, this.inputDebounceSet.delay||500);
					}
				}else{
					console.log('无防抖')
					this.inputs_changeFc(value, index, filterFc);
				}
			},
			inputs_changeFc(value, index, filterFc, clash) {
				if(this.inputDebounceSet.openInputDebounce) {
					if(clash)
						inputDebounce[debounceTimeName+index] = 0;
					else
						inputDebounce[debounceTimeName+index] = new Date().getTime();
				}
				if(filterFc&&typeof(filterFc)=='function') {	//有filterFc则过滤
					this.input_filter_change(value, index, filterFc);
				}else{
					let d = this.inputsArray;
					if(d[index].filterType&&_app.filterTypeObj[d[index].filterType]&&typeof(_app.filterTypeObj[d[index].filterType])=='function') {
						this.input_filter_change(value, index, _app.filterTypeObj[d[index].filterType]);
					}else{
						this.$set(this.inputsObj, this.onLoadData + index, value);
					}
				}
			},
			input_filter_change(value, index, filterFc) {
				let val = filterFc(value);
				if(val != value) {
					new Promise((reslove,reject)=>{
						this.$delete(this.inputsObj, this.onLoadData + index);
						reslove();
					})
					.then(()=>{
						this.$set(this.inputsObj, this.onLoadData + index, val);
					})
				}else{
					this.$set(this.inputsObj, this.onLoadData + index, val);
				}
			},
			picker_change(res) { //picker类型选择后赋值 
				console.log('pickerValue：' + JSON.stringify(res));
				this.inputsObj[this.onLoadData + res.index] = res.data;
				switch (res.type){		// 该项picker的value记忆
					case _app.pickerChoosedType.pickerChoosedType_date.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_date.value+res.index] = res.data;
						break;
					case _app.pickerChoosedType.pickerChoosedType_city.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value+res.index] = res.data.value;
						break;
					case _app.pickerChoosedType.pickerChoosedType_custom.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom.value+res.index] = res.data.value;
						break;
					case _app.pickerChoosedType.pickerChoosedType_custom2.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom2.value+res.index] = res.data.value;
						break;
					case _app.pickerChoosedType.pickerChoosedType_provincialStreet.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_provincialStreet.value+res.index] = res.data.value;
						break;
					default:
						break;
				}
				this.picker_hideFc();
			},
			inputTap(type, index) { //input点击事件
				switch (type){
					case 'passwordSwitch':	//密码显隐
						this.$set(this.passwordObj, this.onLoadData+index+'password', !this.passwordObj[this.onLoadData+index+'password']);
						break;
					case 'clear':	//一键清除
						this.$set(this.inputsObj, this.onLoadData + index, '');
						break;
					default:
						_app.showToast('inputTap类型错误');
						break;
				}
			},
			code_change({detail: {value}}) { //验证码防抖输入
				if(inputCodeDebounce) clearTimeout(inputCodeDebounce);
				if(inputCodeDebounceTime&&new Date().getTime()-inputCodeDebounceTime<500) {
					console.log('防抖冲突,立即执行')
					this.code_changeFc(value, true);
				}else{
					inputCodeDebounce = setTimeout(()=>{
						console.log('防抖')
						this.code_changeFc(value);
					}, 500);
				}
			},
			code_changeFc(value, clash) { //验证码防抖输入
				if(clash)
					inputCodeDebounceTime = 0;
				else
					inputCodeDebounceTime = new Date().getTime();
				this.$set(this, 'userCode', value);
			},
			getCode() { // 判断是否正确输入手机号后发送验证码并倒计时
				let _this = this;
				if(_this.startCode) return;
				let index;
				let d = _this.inputsArray;
				let pIndex = _this.phoneIndex;
				if(typeof(pIndex)==='number'&&pIndex>=0) {
					index = pIndex;
				}else{
					for (let i = 0; i < d.length; i++) {
						if (d[i].phone) index = i;
					}
				}
				if(!typeof(index)==='number' || index < 0) {
					_app.showToast('判断phone属性时出错');
					return;
				}
				let phone = _this.inputsObj[_this.onLoadData + index];
				if (/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) { //正则判断
					this.code = _app.sendSMS(d[index].customId, phone);
				} else {
					_app.showToast('请正确输入11位手机号');
					return;
				}

				let setInterValFunc = setInterval(() => { //定时器
					if (_this.codeCount > 0)
						--_this.codeCount;
					else {
						_this.startCode = false;
						clearInterval(setInterValFunc);
						_this.code = '';
						_this.codeCount = 90;
					}
				}, 1000)
				_this.startCode = true;
			},
			activeFc() { // 主功能按钮方法
				let _this = this;
				let d = _this.inputsArray;
				let inputsDataObj = {};
				// 先判断 inputs 的值是否为空, 后判断该值是否忽略
				let ifUsePics = []; //记录使用图片类型的index
				for (let i = 0; i < d.length; i++) {
					let onLoadData = _this.onLoadData + i;
					let variableName = d[i].variableName || onLoadData;
					switch (d[i].type) {
						case 'pics':
							ifUsePics.push(i); //记录使用图片类型的index
							for (let j = 0; j < d[i].itemArray.length; j++) {
								let pic = _this.picsObj[onLoadData + _this.onLoadData + j];
								if (pic) {
									_this.change_verifyStatus(i, 0, j);
									if (!inputsDataObj[onLoadData]&&!inputsDataObj[variableName])
										inputsDataObj[variableName] = [];
									inputsDataObj[variableName].push(pic);
								} else {
									if (d[i].itemArray[j].ignore) {
										_this.change_verifyStatus(i, 0, j);
										if (!inputsDataObj[onLoadData]&&!inputsDataObj[variableName])
											inputsDataObj[variableName] = [];
										inputsDataObj[variableName].push('');
									} else {
										_this.change_verifyStatus(i, 2, j);
										_app.showToast(d[i].itemArray[j].nullErr || (d[i].itemArray[j].title + '不能为空'));
										return;
									}
								}
							}
							break;
						case 'switch':
							inputsDataObj[variableName] = _this.inputsObj[onLoadData]?true:false;
							break;
						case 'slider':
							inputsDataObj[variableName] = _this.inputsObj[onLoadData];
							break;
						case 'text':
							break;
						case 'checkbox':
							if ((!_this.inputsObj[onLoadData].value||_this.inputsObj[onLoadData].value.length===0) && !d[i].ignore) {
								_this.change_verifyStatus(i, 2);
								_app.showToast(d[i].nullErr || ((d[i].title||'第' + i + '项') + '不能为空'));
								return;
							}
							_this.change_verifyStatus(i, 0);
							inputsDataObj[variableName] = _this.inputsObj[onLoadData];
							break;
						default:
							if (!_this.inputsObj[onLoadData]) {
								if (d[i].ignore) {
									_this.change_verifyStatus(i, 0);
									inputsDataObj[variableName] = '';
								} else {
									_this.change_verifyStatus(i, 2);
									_app.showToast(d[i].nullErr || ((d[i].title||'第' + i + '项') + '不能为空'));
									return;
								}
							} else {
								if(d[i].verifyType&&_app.verifyTypeObj[d[i].verifyType])
									if(!_app.verifyTypeObj[d[i].verifyType].reg.test(_this.inputsObj[onLoadData])) {
										_this.change_verifyStatus(i, 1);
										_app.showToast(d[i].verifyErr || ((d[i].title||'第' + i + '项') + _app.verifyTypeObj[d[i].verifyType].name +  '格式校验错误'))
										return;
									}
								let verifyFc = d[i].verifyFc;
								if(verifyFc&&typeof(verifyFc)== 'function')
									if(!verifyFc(_this.inputsObj[onLoadData])) {
										_this.change_verifyStatus(i, 1);
										_app.showToast(d[i].verifyErr || ((d[i].title||'第' + i + '项') + '格式校验错误'))
										return;
									}
								_this.change_verifyStatus(i, 0);
								inputsDataObj[variableName] = _this.inputsObj[onLoadData];
							}
							break;
					}
				}
				// 判断是否需要同意规则
				if (_this.ifRule)
					if (!_this.Igree) {
						let ruleName = '';
						let rules = _this.ruleSet.itemArray;
						for (let i = 0; i < rules.length; i++) {
							ruleName += i == 0 ? rules[i].name : '、' + rules[i].name;
						}
						_app.showToast('请先阅读并勾选' + ruleName);
						return;
					}
				// 判断是否填写验证码并判断是否正确
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
				if(ifUsePics.length > 0) {
					for (let i = 0; i < ifUsePics.length; i++) {
						let index = ifUsePics[i];
						let onLoadData = _this.onLoadData + index;
						let variableName = d[index].variableName || onLoadData;
						if (d[index].type && d[index].type == 'pics') {
							for (let j = 0; j < d[index].itemArray.length; j++) {
								if (inputsDataObj[variableName][j]) {
									pic_promise.push(new Promise(function(reslove, reject) {
										// push Promise 上传图片到服务器并返回图片在服务器的地址并拼接的方法
										_app.UpLoadFile(d[index].customId, inputsDataObj[variableName][j]).then((res)=>{
											reslove({
												index1: index,
												index2: j,
												data: res.data
											})
										}).catch((err)=>{
											reject(err||(d[index].itemArray[j].title||((d[index].title)||('第' + index + '的') + '第' + j + '项') + '上传失败'));
										});
									}));
								} else {
									pic_promise.push(new Promise(function(reslove, reject) { // 若用户未填此数据并忽略此数据时传空以记录此次数据
										reslove({
											index1: index,
											index2: j,
											data: ''
										}); // index2 基本无用， 若无需求可删
									}));
								}
							}
						}
					}
				}
				Promise.all(pic_promise).then(res => { // Promise返回一个图片的数组, 根据res.index1 给 inputsDataObj[_this.onLoadData + res[i].index1] 赋值
					if (res.length > 0)
						for (let i = 0; i < res.length; i++) { // 注: 此处根据自己的需求拼接数据   (在下返回数据后的拼接是以 ‘|’ 分隔)
							let onLoadData = _this.onLoadData + res[i].index1;
							let variableName = d[res[i].index1].variableName || onLoadData; // 自定义变量名或默认变量名
							inputsDataObj[variableName] = _app.pics_splice(inputsDataObj[variableName], res[i].data);
						}
					_this.$emit('activeFc', inputsDataObj); // 把用户输入数据对象输出给父级
					_this.inputs_reSet(); //提交后重置
				}).catch((err)=>{
					console.log(err);
					_app.showToast(err);
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
				if(this.picsObj[this.onLoadData + index + this.onLoadData + picsIndex]) return;
				uni.chooseImage({
					success: res => {
						// console.log(res.tempFilePaths[0]);
						this.$set(this.picsObj, this.onLoadData + index + this.onLoadData + picsIndex, res.tempFilePaths[0]);
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
				this.pickerCustom2Show = false;
				this.pickerProvincialStreetShow = false;
				this.maskShow = false;
				this.P_data = {};
			},
			focusChange(index) {
				let o = {};
				o[this.onLoadData + index + 'focus'] = true;
				this.$set(this, 'focusObj', o);
			},
			blurChange(index) {
				let o = {};
				this.$set(this, 'focusObj', o);
			},
			setFocus(param, val) {
				let i;
				switch (typeof(param)){
					case 'number':
						i = param;
						break;
					case 'function':
						i = param(this.inputsArray);
						break;
					default:
						console.log('setFocus方法传入的参数不正确');
						return;
						break;
				}
				
				if(typeof(i)=='number'&&i>=0) this.$set(this.focusObj, this.onLoadData + i + 'focus', val); else console.log('setFocus方法参数找不到或错误')
			},
			change_verifyStatus(index, statu, index2) { //0:none, 1:error, 2:warning
				let verifyStatusSet = this.verifyStatusSet;
				if(!verifyStatusSet.openVerifyStatus) return;
				let c = '';
				let ifnotSuccess = false;
				switch (statu){
					case 0: c = 'rgba(0,0,0,0)'; break;
					case 1: c = verifyStatusSet.verifyErrorColor||'rgba(255,255,0,.7)'; ifnotSuccess = true; break;
					case 2: c = verifyStatusSet.errNullColor||'rgba(245,16,92,.7)'; ifnotSuccess = true; break;
					default: c = 'rgba(0,0,0,0)'; break;
				}
				if(verifyStatusSet.openChangeBorderColor)
					this.$set(this.verifyStatusObj, this.onLoadData + index + (typeof(index2)=='number'&&index2>=0?this.onLoadData + index2:''), c); // 校验失败时, 改变边框颜色
				if(verifyStatusSet.openScroll&&ifnotSuccess) {
					let view;
					// #ifdef H5
					view = document.getElementById(`Id_${index}`);
					uni.pageScrollTo({
						scrollTop:view.offsetTop - 100,
						duration: 300
					})
					// #endif
					// #ifndef H5
					if(this.usingComponents) {
						if(!verifyStatusSet.inputsId) { console.log('找不到inputsId, 请在verifyStatusSet中传此参数'); return; }
						view = uni.createSelectorQuery().select(`#${verifyStatusSet.inputsId} >>> #Id_${index}`);
					}else {
						view = uni.createSelectorQuery().select(`#Id_${index}`);
					}
					let p1 = new Promise((rs, rj)=>{ view.fields({ rect: true }, data => { if(data) rs(data); else rj(1); }).exec(); })
					let p2 = new Promise((rs, rj)=>{ uni.createSelectorQuery().selectViewport().scrollOffset(res => {  if(res) rs(res); else rj(2); }).exec(); })
					Promise.all([p1, p2]).then(([{top}, {scrollTop}])=>{
						let t = (scrollTop + top) - 100;
						uni.pageScrollTo({
							scrollTop:t < 0?0:t,
							duration: 300
						})
					}).catch((err)=>{
						switch (err){
							case 1:
								console.log('首次滚动失败, 正在尝试切换参数后重试滚动, 注意: 注意自己的编译模式, 若为自定义组件模式, 请传参数usingComponents为true, 详见v6.1更新说明 http://ext.dcloud.net.cn/plugin?id=149');
								this.retryScroll(verifyStatusSet, index);
								break;
							case 2:
								console.log('获取滚动条位置信息失败');
								break;
							default:
								break;
						}
					})
					// #endif
				}
			},
			retryScroll(verifyStatusSet, index) {	//切换参数重试滚动
				let view;
				if(this.usingComponents) {
					view = uni.createSelectorQuery().select(`#Id_${index}`);
				}else{
					if(!verifyStatusSet.inputsId) { console.log('找不到inputsId, 请在verifyStatusSet中传此参数'); return; }
					view = uni.createSelectorQuery().select(`#${verifyStatusSet.inputsId} >>> #Id_${index}`);
				}
				let p1 = new Promise((rs, rj)=>{ view.fields({ rect: true }, data => { if(data) rs(data); else rj('重试滚动失败, 获取节点信息失败'); }).exec(); })
				let p2 = new Promise((rs, rj)=>{ uni.createSelectorQuery().selectViewport().scrollOffset(res => {  if(res) rs(res); else rj('获取滚动条位置信息失败'); }).exec(); })
				Promise.all([p1, p2]).then(([{top}, {scrollTop}])=>{
					let t = (scrollTop + top) - 100;
					uni.pageScrollTo({
						scrollTop:t < 0?0:t,
						duration: 300
					})
					console.log('重试滚动成功, 请注意自己的编译模式, 若为自定义组件模式, 则传usingComponents为true, 可免去此次重复操作, 详见v6.1更新说明 http://ext.dcloud.net.cn/plugin?id=149')
				}).catch((err)=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped>
	.pickerBtn{
		font-size: 60%;
	}
	.transition_point6s{
		transition: all .6s;
	}
	.transition_border_point6s {
		transition: border-color .6s;
	}
	view,button, textarea, input, picker, picker-view, picker-view-column, uni-icon, text{
		box-sizing: border-box;
	}
	button{
		margin: 0;
	}
	button::after {
		border: none;
	}
	.text_overflow_ellipsis{
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	.overflow_x_hidden{
		overflow-x: hidden;
	}
	.marginRight5{
		margin-right: 5%;
	}
	.position_relative{
		position: relative;
	}
	.position_absolute{
		position: absolute;
	}
	.width20{
		width: 20%;
	}
	.width30{
		width: 30%;;
	}
	.width40{
		width: 40%;
	}
	.width45{
		width: 45%;
	}
	.width55{
		width: 55%;
	}
	.width60{
		width: 60%;
	}
	.width65{
		width: 65%;
	}

	.width75 {
		width: 75%;
	}
	.width70 {
		width: 70%;
	}
	.width50{
		width: 50%;
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
	.width100 {
		width: 100%;
	}
	.height100{
		height: 100%;
	}

	.word_wrap {
		word-wrap: break-word;
		word-break: break-all;
	}

	.wrap {
		flex-wrap: wrap;
	}
	.flex-basis50{
		flex-basis: 50%;
	}
	.flex-shrink0{
		flex-shrink: 0;
	}
	.flex-shrink1{
		flex-shrink: 1;
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
	.bacnground_color_f8f8f8{
		background-color: #f8f8f8;
	}
	
	.border_radius_4px{
		border-radius: 4px;
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
	
	.padding8px{
		padding: 8px;
	}
	
	.picsClear{
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}
	
	.box_shadow_2px_2px_5px_ADADAD{
		box-shadow: 2px 2px 5px #ADADAD;
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
