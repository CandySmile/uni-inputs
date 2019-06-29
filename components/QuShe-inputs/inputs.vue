<template>
	<view class="width100 overflow_x_hidden" v-show="onReady">
		<view class="width100 transition_border_point6s border_radius_4px" :class="[item.animationType||animationType||'']"
		 :style="classObj.padding2_3 + 'animation-duration:' + (index+1)*(item.animationDuration||animationDuration||.2) + 's;' + 'border: 1px solid ' + (verifyStatusObj[(item.variableName)||(onLoadData + index)]||'rgba(0,0,0,0)') + ';'"
		 v-for="(item, index) in inputsArray" :key="item.title" :id="'Id_' + (item.variableName||index)" v-show="!item.hide">
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
				<view class="width20 marginRight5 flex_row_e_c" :style="classObj.titleColor + classObj.titleFontSize" v-if="!titleHide&&item.type!=='editor'">
					<view class="width100 word_wrap" :class="classObj.titleLayout">
						<view class="fontColorF1505C" v-if="item.type!='pics'&&!item.ignore&&item.title&&(otherSet.requiredFieldsSet?!otherSet.requiredFieldsSet.hideRequiredFields:true)">{{otherSet.requiredFieldsSet?otherSet.requiredFieldsSet.requiredFieldsFlag||'*':'*'}}</view>{{item.title?item.title:''}}
					</view>
				</view>
				<view :class="[(item.type==='editor'?'width100':classObj.contentsWidth), classObj.contentsLayout]">
					<!-- pics -->
					<view v-if="item.type&&item.type=='pics'" :style="classObj.padding1_0 + classObj.contentWidth">
						<view class="width100 wrap" :class="[classObj.contentLayout]">
							<view class="flex_column_c_c border_radius_4px transition_border_point6s" v-for="(picsItem, picsIndex) in item.itemArray"
							 :key="picsIndex" :style="classObj.paddingPoint5 + 'border: 1px solid ' + (verifyStatusObj[item.variableName?(item.variableName + picsIndex):(onLoadData + index + onLoadData + picsIndex)]||'rgba(0,0,0,0)') + ';'">
								<view class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px backgrounColor_f8f8f8" :style="classObj.picsBox"
								 @tap="chooseImg(item.variableName||index, picsIndex)">
									<image :src="picsObj[item.variableName?(item.variableName + picsIndex):(onLoadData + index + onLoadData + picsIndex)]"
									 class="border_radius_4px box_shadow_2px_2px_5px_ADADAD" mode="aspectFill" :style="classObj.picsBox" v-if="picsObj[item.variableName?(item.variableName + picsIndex):(onLoadData + index + onLoadData + picsIndex)]"
									 @tap="showImg(picsObj[item.variableName?(item.variableName + picsIndex):(onLoadData + index + onLoadData + picsIndex)])">
									</image>
									<view v-else>
										<uni-icon type="image" :pxSize="classObj.size6wW" color="#999999" />
									</view>
									<view class="picsClear" v-if="picsObj[item.variableName?(item.variableName + picsIndex):(onLoadData + index + onLoadData + picsIndex)]"
									 @tap.stop.prevent="clearPic(item.variableName||index, picsIndex)">
										<uni-icon type="clear" :color="item.clearColor||'#f5105c'" :pxSize="classObj.size4wW" />
									</view>
								</view>
								<view class="flex_row_c_c fontColorADADAD" :style="classObj.picsTitle + classObj.contentFontSize" v-if="picsItem.title">
									<view class="fontColorF1505C" v-if="!picsItem.ignore">*</view>{{picsItem.title}}
								</view>
							</view>
						</view>
					</view>
					<!-- infinitePics -->
					<view v-else-if="item.type&&item.type=='infinitePics'" :style="classObj.padding1_0 + classObj.contentWidth">
						<view class="width100 wrap" :class="[classObj.contentLayout]">
							<view class="flex_column_c_c border_radius_4px transition_border_point6s" v-for="(picsItem, picsIndex) in infinitePicsObj[infinitePicsName + (item.variableName||index)]"
							 :key="picsIndex" :style="classObj.paddingPoint5">
								<view class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px backgrounColor_f8f8f8" :style="classObj.picsBox">
									<image :src="picsItem.path" class="border_radius_4px box_shadow_2px_2px_5px_ADADAD" mode="aspectFill" :style="classObj.picsBox"
									 @tap="infinitePicsShowImg(item.variableName||index, picsIndex)">
									</image>
									<view class="picsClear" @tap.stop.prevent="clearPic(item.variableName||index, picsIndex, true)">
										<uni-icon type="clear" :color="item.clearColor||'#f5105c'" :pxSize="classObj.size4wW" />
									</view>
								</view>
							</view>
							<view class="flex_column_c_c border_radius_4px transition_border_point6s" :style="classObj.paddingPoint5" v-if="item.max?(infinitePicsObj[infinitePicsName + (item.variableName||index)]?infinitePicsObj[infinitePicsName + (item.variableName||index)].length>=item.max?false:true:true):true">
								<view class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px backgrounColor_f8f8f8 box_shadow_2px_2px_5px_ADADAD"
								 :style="classObj.picsBox" @tap="chooseImg(item.variableName||index, index, true)">
									<uni-icon type="image" :pxSize="classObj.size6wW" color="#999999" />
								</view>
							</view>
						</view>
					</view>
					<!-- switch -->
					<view :class="[classObj.contentLayout]" :style="classObj.contentWidth" v-else-if="item.type&&item.type=='switch'">
						<view class="position_relative">
							<switch :checked="inputsObj[item.variableName||(onLoadData+index)]" :disabled="item.disabled" :type="item.mode||'switch'"
							 :color="item.color" @change="inputs_change($event, item.variableName||index)" :style="'transform: scale(' + (item.scale||'.8') + ');'" />
						</view>
					</view>
					<!-- slider -->
					<view :style="classObj.contentWidth" v-else-if="item.type&&item.type=='slider'">
						<slider @change="inputs_change($event, item.variableName||index)" :min="item.min||0" :max="item.max||100" :step="item.step||1"
						 :disabled="item.disabled" :value="inputsObj[item.variableName||(onLoadData+index)]" :color="item.color"
						 :selected-color="item.selected_color" :activeColor="item.activeColor" :backgroundColor="item.backgroundColor"
						 :block-size="item.block_size" :block-color="item.block_color" :show-value="item.show_value" />
					</view>
					<!-- radio -->
					<view :style="classObj.contentWidth" v-else-if="item.type&&item.type=='radio'">
						<radio-group @change="inputs_change($event, item.variableName||index)" class="width100 wrap" :class="[classObj.contentLayout]">
							<label class="fontColor666666 flex_row_none_c" :style="classObj.contentFontSize + classObj.padding1 + classObj.marginRight2"
							 v-for="(radioItem, radioIndex) in item.itemArray" :key="radioIndex">
								<radio :value="radioItem.value" :checked="inputsObj[item.variableName||(onLoadData+index)]==radioItem.value"
								 :disabled="radioItem.disabled" :color="radioItem.color||item.color" :style="'transform: scale(' + (item.scale||'.8') + ');'" />
								<view class="flex_row_none_c">{{radioItem.name}}</view>
							</label>
						</radio-group>
					</view>
					<!-- checkbox -->
					<view :style="classObj.contentWidth" v-else-if="item.type&&item.type=='checkbox'">
						<checkbox-group @change="checkbox_change($event, item.variableName||index)" class="width100 wrap" :class="[classObj.contentLayout]">
							<label class="fontColor666666 flex_row_none_c" :style="classObj.contentFontSize + classObj.padding1 + classObj.marginRight2"
							 v-for="(checkboxItem, checkboxIndex) in item.itemArray" :key="checkboxIndex">
								<checkbox :value="checkboxItem.value" :checked="inputsObj[item.variableName||(onLoadData+index)]&&inputsObj[item.variableName||(onLoadData+index)].status&&inputsObj[item.variableName||(onLoadData+index)].status[checkboxIndex]"
								 :disabled="checkboxItem.disabled" :color="checkboxItem.color||item.color" :style="'transform: scale(' + (item.scale||'.8') + ');'" />
								<view class="flex_row_none_c">{{checkboxItem.name}}</view>
							</label>
						</checkbox-group>
					</view>
					<!-- textarea -->
					<view :class="[classObj.contentLayout]" :style="classObj.contentWidth" v-else-if="item.type&&item.type=='textarea'">
						<textarea :value="inputsObj[item.variableName||(onLoadData+index)]" :placeholder="item.placeholder||'请输入' + item.title"
						 :placeholder-style="('font-size:' + classObj.contentSize + 'px;') + item.placeholder_style" :placeholder-class="item.placeholder_class"
						 :style="{
						'font-size': classObj.contentSize + 'px', 
						'height': ((item.height||.1)*wH)+'px', 
						'width': (item.width||'60') + '%', 
						'background-color': item.backgroundColor||'#F8F8F8', 
						'color': item.color||'#666666', 
						'border': '1px solid ' + (focusObj[(item.variableName||(onLoadData+index))]?(item.focusBorderStyle||focusStyle.focusBorderStyle||'#999999'):(item.blurBorderStyle||focusStyle.blurBorderStyle||'#f8f8f8'))}"
						 class="width100 border_radius_4px padding8px transition_point6s" :disabled="item.disabled" :maxlength="item.maxlength||140"
						 :focus="focusObj[(item.variableName||(onLoadData+index))]" :auto-height="item.auto_height" :fixed="item.fixed"
						 :cursor-spacing="item.cursor_spacing" :cursor="item.cursor" :show-confirm-bar="item.show_confirm_bar"
						 :selection-start="item.selection_start" :selection-end="item.selection_end" :adjust-position="item.adjust_position"
						 @input="inputs_change($event, item.variableName||index, item.filterFc, true)" @focus="focusChange(item.variableName||index)"
						 @blur="blurChange(item.variableName||index)" />
						</view>
					<!-- picker-date -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-date'">
						<view class="flex_row_none_c width100" v-if="inputsObj[item.variableName||(onLoadData+index)]">
							<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.contentFontSize">
								{{inputsObj[item.variableName||(onLoadData+index)]}}
							</view>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini" class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择日期'}}
							</button>
						</view>
					</view>
					<!-- picker-city -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-city'">
						<view class="flex_row_none_c width100" v-if="inputsObj[item.variableName||(onLoadData+index)]">
							<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.contentFontSize">
								{{inputsObj[item.variableName||(onLoadData+index)].label}}
							</view>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini"  class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择城市'}}
							</button>
						</view>
					</view>
					<!-- picker-custom -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-custom'">
						<view class="flex_row_none_c width100" v-if="inputsObj[item.variableName||(onLoadData+index)]">
							<block v-if="item.linkage">
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.contentFontSize">
									{{item.linkageNum==2?inputsObj[item.variableName||(onLoadData+index)].result.steps1[item.steps.steps_1_value]+'-'+(item.steps.steps_2_value?inputsObj[item.variableName||(onLoadData+index)].result.steps2[item.steps.steps_2_value]:inputsObj[item.variableName||(onLoadData+index)].result.steps2):item.linkageNum==3?inputsObj[item.variableName||(onLoadData+index)].result.steps1[item.steps.steps_1_value]+'-'+inputsObj[item.variableName||(onLoadData+index)].result.steps2[item.steps.steps_2_value]+'-'+(item.steps.steps_3_value?inputsObj[item.variableName||(onLoadData+index)].result.steps3[item.steps.steps_3_value]:inputsObj[item.variableName||(onLoadData+index)].result.steps3):'不在范围中'}}
								</view>
							</block>
							<block v-else>
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.contentFontSize">
									<view v-for="(i, d) in inputsObj[item.variableName||(onLoadData+index)].result" :key="d">
										{{d==0?(item.steps?item.steps.steps_1_value?i[item.steps.steps_1_value]:i:i):'-' + (item.steps?item.steps.steps_1_value?i[item.steps.steps_1_value]:i:i)}}
									</view>
								</view>
							</block>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini"  class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择'}}
							</button>
						</view>
					</view>
					<!-- picker-custom2 -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-custom2'">
						<view class="flex_row_none_c width100" v-if="inputsObj[item.variableName||(onLoadData+index)]">
							<block v-if="item.linkage">
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.contentFontSize" v-if="item.linkageNum==2">
									{{(item.steps&&item.steps.step_1_value?inputsObj[item.variableName||(onLoadData+index)].result.steps1[item.steps.step_1_value]:inputsObj[item.variableName||(onLoadData+index)].result.steps1) + '-' + (item.steps&&item.steps.step_2_value?inputsObj[item.variableName||(onLoadData+index)].result.steps2[item.steps.step_2_value]:inputsObj[item.variableName||(onLoadData+index)].result.steps2)}}
								</view>
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.contentFontSize" v-else-if="item.linkageNum==3">
									{{(item.steps&&item.steps.step_1_value?inputsObj[item.variableName||(onLoadData+index)].result.steps1[item.steps.step_1_value]:inputsObj[item.variableName||(onLoadData+index)].result.steps1) + '-' + (item.steps&&item.steps.step_2_value?inputsObj[item.variableName||(onLoadData+index)].result.steps2[item.steps.step_2_value]:inputsObj[item.variableName||(onLoadData+index)].result.steps2) + '-' + (item.steps&&item.steps.step_3_value?inputsObj[item.variableName||(onLoadData+index)].result.steps3[item.steps.step_3_value]:inputsObj[item.variableName||(onLoadData+index)].result.steps3)}}
								</view>
							</block>
							<block v-else>
								<view class="flex_row_e_c width70 fontColor666666 word_wrap" :style="classObj.contentFontSize">
									<view v-for="(i, d) in inputsObj[item.variableName||(onLoadData+index)].result" :key="d">
										{{d==0?(item.steps?item.steps.step_1_value?i[item.steps.step_1_value]:i:i):'-' + (item.steps?item.steps.step_1_value?i[item.steps.step_1_value]:i:i)}}
									</view>
								</view>
							</block>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini"  class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择'}}
							</button>
						</view>
					</view>
					<!-- picker-provincialStreet -->
					<view :class="[classObj.contentLayout]" :style="classObj.padding0_3 + classObj.contentWidth" v-else-if="item.type&&item.type=='picker-provincialStreet'">
						<view class="flex_row_none_c width100" v-if="inputsObj[item.variableName||(onLoadData+index)]">
							<view class="flex_row_e_c fontColor666666 width70 word_wrap" :style="classObj.contentFontSize">
								{{inputsObj[item.variableName||(onLoadData+index)].label}}
							</view>
							<view class="flex_row_e_c width30">
								<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini"  class="pickerBtn"
								:style="classObj.marginLeft3 + classObj.changeButton">
								{{item.editorName||'更改'}}
								</button>
							</view>
						</view>
						<view class="flex_row_e_c" v-else>
							<button type="primary" @tap="showPicker(item, item.variableName||index)" size="mini"  class="pickerBtn"
							:style="classObj.selectButton">
							{{item.chooseName||'选择街道'}}
							</button>
						</view>
					</view>
					<!-- text -->
					<view :class="[classObj.contentLayout]" :style="classObj.contentWidth"
					 v-else-if="item.type&&item.type=='text'">
						<view class="width100 flex_row_between_c" :style="classObj.padding0_3">
							<view class="fontColor666666" :style="(item.titleStyle||classObj.contentFontSize)">
								{{titleHide?item.title:''}}
							</view>
							<view class="fontColorADADAD" :class="item.ellipsis?'text_overflow_ellipsis':''" :style="classObj.contentFontSize + item.contentStyle">
								{{item.content}}
							</view>
						</view>
					</view>
					<!-- editor -->
					<view class="width100" :style="classObj.padding2_3" v-else-if="item.type&&item.type=='editor'">
						<!-- #ifdef APP-PLUS || MP-WEIXIN -->
						<block v-if="usingComponents">
							<view class='toolbar' @tap="format">
								<view :class="formats.bold ? 'ql-active' : ''" class="editor_iconfont icon-zitijiacu" data-name="bold"></view>
								<view :class="formats.italic ? 'ql-active' : ''" class="editor_iconfont icon-zitixieti" data-name="italic"></view>
								<view :class="formats.underline ? 'ql-active' : ''" class="editor_iconfont icon-zitixiahuaxian" data-name="underline"></view>
								<view :class="formats.strike ? 'ql-active' : ''" class="editor_iconfont icon-zitishanchuxian" data-name="strike"></view>
								<view :class="formats.align === 'left' ? 'ql-active' : ''" class="editor_iconfont icon-zuoduiqi" data-name="align"
								 data-value="left"></view>
								<view :class="formats.align === 'center' ? 'ql-active' : ''" class="editor_iconfont icon-juzhongduiqi" data-name="align"
								 data-value="center"></view>
								<view :class="formats.align === 'right' ? 'ql-active' : ''" class="editor_iconfont icon-youduiqi" data-name="align"
								 data-value="right"></view>
								<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="editor_iconfont icon-zuoyouduiqi" data-name="align"
								 data-value="justify"></view>
								<view :class="formats.lineHeight ? 'ql-active' : ''" class="editor_iconfont icon-line-height" data-name="lineHeight"
								 data-value="2"></view>
								<view :class="formats.letterSpacing ? 'ql-active' : ''" class="editor_iconfont icon-Character-Spacing" data-name="letterSpacing"
								 data-value="2em"></view>
								<view :class="formats.marginTop ? 'ql-active' : ''" class="editor_iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
								 data-value="20px"></view>
								<view :class="formats.micon-previewarginBottom ? 'ql-active' : ''" class="editor_iconfont icon-723bianjiqi_duanhouju"
								 data-name="marginBottom" data-value="20px"></view>
								<view class="editor_iconfont icon-clearedformat" @tap="removeFormat"></view>
								<view :class="formats.fontFamily ? 'ql-active' : ''" class="editor_iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
								<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="editor_iconfont icon-fontsize" data-name="fontSize"
								 data-value="24px"></view>
				
								<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="editor_iconfont icon-text_color" data-name="color"
								 data-value="#0000ff"></view>
								<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="editor_iconfont icon-fontbgcolor"
								 data-name="backgroundColor" data-value="#00ff00"></view>
				
								<view class="editor_iconfont icon-date" @tap="insertDate"></view>
								<view class="editor_iconfont icon--checklist" data-name="list" data-value="check"></view>
								<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="editor_iconfont icon-youxupailie" data-name="list"
								 data-value="ordered"></view>
								<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="editor_iconfont icon-wuxupailie" data-name="list"
								 data-value="bullet"></view>
								<view class="editor_iconfont icon-undo" @tap="editorUndo"></view>
								<view class="editor_iconfont icon-redo" @tap="editorUndo"></view>
				
								<view class="editor_iconfont icon-outdent" data-name="indent" data-value="-1"></view>
								<view class="editor_iconfont icon-indent" data-name="indent" data-value="+1"></view>
								<view class="editor_iconfont icon-fengexian" @tap="insertDivider"></view>
								<view class="editor_iconfont icon-charutupian" @tap="insertImage"></view>
								<view :class="formats.header === 1 ? 'ql-active' : ''" class="editor_iconfont icon-format-header-1" data-name="header"
								 :data-value="1"></view>
								<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="editor_iconfont icon-zitixiabiao" data-name="script"
								 data-value="sub"></view>
								<view :class="formats.script === 'super' ? 'ql-active' : ''" class="editor_iconfont icon-zitishangbiao" data-name="script"
								 data-value="super"></view>
								<view class="editor_iconfont icon-shanchu" @tap="editorClear"></view>
								<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="editor_iconfont icon-direction-rtl" data-name="direction"
								 data-value="rtl"></view>
							</view>
							
							<editor 
							id="editor" 
							class="ql-container border1pxf2f2f2" 
							:style="'height:' + (item.height||.3)*wH + 'px;min-height:' + wH*.3 + 'px;'"
							:placeholder="item.placeholder||'开始输入...'" 
							:showImgSize="item.showImgSize" 
							:showImgToolbar="item.showImgToolbar" 
							:showImgResize="item.showImgResize"
							@statuschange="onStatusChange" 
							:read-only="readOnly" 
							@ready="onEditorReady(item.variableName||index)">
							</editor>
						</block>
						<!-- #endif -->
					</view>
					<!-- input -->
					<view class="flex_row_none_c transition_point6s" :style="classObj.contentWidth + 'border-bottom: 1px solid ' + (focusObj[(item.variableName||(onLoadData+index))]?(item.focusBorderStyle||focusStyle.focusBorderStyle||'#999999'):(item.blurBorderStyle||focusStyle.blurBorderStyle||'#f2f2f2')) + ';'" v-else>
						<view class="flex_row_none_c Flex5">
							<view class="Flex1" v-if="item.icon">
								<view class="flex_row_c_c width100">
									<uni-icon :type="item.icon" :pxSize="classObj.iconSize" :color="item.iconColor||'#999999'"></uni-icon>
								</view>
							</view>
							<input :type="item.inputType||'text'" :value="inputsObj[(item.variableName||(onLoadData+index))]" @input="inputs_change($event, item.variableName||index, item.filterFc, item.filterType, true)" :placeholder="item.placeholder||'请输入' + item.title"
							 :password="passwordObj[(item.variableName||(onLoadData+index))+'password']" :placeholder-style="item.placeholder_style" :placeholder-class="item.placeholder_class"
							 :maxlength="item.maxlength||140" :cursor-spacing="item.cursor_spacing" :focus="focusObj[(item.variableName||(onLoadData+index))]"
							 :confirm-type="item.confirm_type" :confirm-hold="item.confirm_hold" :selection-start="item.selection_start" :selection-end="item.selection_end"
							 :cursor="item.cursor" :adjust-position="item.adjust_position" :disabled="item.disabled" 
							 :style="classObj.contentFontSize" class="fontColor666666 Flex5" @focus="focusChange(item.variableName||index)" @blur="blurChange(item.variableName||index)"/>
						</view>
						<view class="Flex1" v-if="item.password">
							<view class="flex_row_c_c width100" @tap.prevent.stop="inputTap('passwordSwitch', item.variableName||index, item.customId)">
								<uni-icon type="eye" :pxSize="classObj.iconSize" :color="passwordObj[(item.variableName||(onLoadData+index))+'password']?'#999999':item.iconColor||'#33cc33'"></uni-icon>
							</view>
						</view>
						<view class="Flex1" v-if="item.tapClear">
							<view class="flex_row_c_c width100" v-if="inputsObj[(item.variableName||(onLoadData+index))]!=''" @tap.prevent.stop="inputTap('clear', item.variableName||index, item.customId)">
								<uni-icon type="clear" :pxSize="classObj.iconSize" color="#999999"></uni-icon>
							</view>
						</view>
						<view class="Flex1" v-if="item.customTap">
							<view class="flex_row_c_c width100" @tap.prevent.stop="inputTap('custom', item.variableName||index, item.customId)">
								<uni-icon :type="item.customTapIcon" :pxSize="classObj.iconSize" color="#999999"></uni-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 验证码 -->
		<view class="flex_row width100"  :class="[animationType||'']" :style="classObj.padding2_3 + classObj.animationDuration1"
		 v-if="ifCode">
			<view class="width20 marginRight5" :class="classObj.titleLayout" :style="classObj.titleFontSize + classObj.titleColor" v-if="!titleHide">
				<view class="fontColorF1505C" v-if="(otherSet.requiredFieldsSet?!otherSet.requiredFieldsSet.hideRequiredFields:true)">{{otherSet.requiredFieldsSet?otherSet.requiredFieldsSet.requiredFieldsFlag||'*':'*'}}</view>验证码
			</view>
			<view :class="[classObj.contentsWidth, classObj.contentsLayout]">
				<view class="flex_row" :style="classObj.contentWidth">
					<view class="width45">
						<input type="text" :value="userCode" :placeholder="otherSet.getCodeSet?otherSet.getCodeSet.securityCodePlaceholder||'请输入验证码':'请输入验证码'" class="width100 borderBottom1pxf2f2f2" :style="classObj.contentFontSize" @input="code_change($event)"/>
					</view>
					<view class="flex_row_e_c width55" :style="classObj.padding0_3">
						<button type="primary" size="mini" v-if="ifCode" :disabled="startCode" @tap="getCode()" class="pickerBtn" :style="classObj.getcodeButton">{{startCode?codeCount + 's':'获取验证码'}}</button>
					</view>
				</view>
			</view>
		</view>
		<!-- rule -->
		<view class="flex_row_c_c fontColor666666"  :class="[animationType||'']" :style="classObj.padding1_3 + classObj.animationDuration1 + classObj.contentFontSize" v-if="ifRule">
			<label class="flex_row_c_c">
				<switch :checked="Igree" @change="IgreeFc" type="checkbox" :color="ruleSet.checkbox_color"/>{{ruleSet.rulePreText||'我已阅读并同意'}}
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
	import pickersDate from './picker-date.vue';
	import pickersCity from './mpvue-citypicker/picker-city.vue';
	import pickerCustom from './picker-custom.vue';
	import pickerCustom2 from './picker-custom2.vue';
	import pickerProvincialStreet from './mpvue-citypicker/picker-provincialStreet.vue';
	
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
						errNullColor: 'rgba(245,16,92,.7)',
						verifyErrorColor: 'rgba(255,255,0,.7)'
					};
				} 
			},
			usingComponents: {
				type: Boolean,
				default: false
			},
			otherSet: {
				type: Object,
				default() {
					return {};
				}
			},
			inputsId: {
				type: String,
				default: ''
			}
		},
		data() {
			// 获取系统信息并记录屏幕宽高来确定布局样式
			const systemData = uni.getSystemInfoSync();
			const wH = systemData.screenHeight;
			const wW = systemData.screenWidth;
			const f = this.fontSizeScaleSet;
			const scale_one = f.titleScale||f.allScale||.028; //title(左边)字体大小系数
			const scale_two = f.contentScale||f.allScale||.028; //contentFontSize(右边)字体大小系数
			return {
				onReady: false,
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
					titleFontSize: 'font-size:' + (this.titleSet.size||wW*scale_one) + 'px;',
					titleColor: 'color:' + (this.titleSet.color||'#666666') + ';',
					contentFontSize: 'font-size:' + (this.contentSet.size||wW*scale_two) + 'px;',
					contentWidth: 'width:' + (this.titleHide?this.contentSet.width:'100') + '%;',
					contentsLayout: this.titleHide?this.contentSet.layout=='left'?'flex_row_none_c':this.contentSet.layout=='center'?'flex_row_c_c':'flex_row_e_c':'flex_row_e_c',
					contentLayout: this.contentSet.layout=='left'?'flex_row_none_c':this.contentSet.layout=='center'?'flex_row_c_c':'flex_row_e_c',
					titleLayout: this.titleSet.layout=='left'?'flex_row_none_c':this.titleSet.layout=='center'?'flex_row_c_c':'flex_row_e_c',
					contentsWidth:  this.titleHide?'width100':'width75',
					contentSize: this.contentSet.size||wW*scale_two, //number
					iconSize: (this.contentSet.size||wW*scale_two) + 8, //number
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
					size6wW: wW*.06,
					size4wW: wW*.04
					
				},
				formats: {},
				editorLoadedFontFace: false,
				infinitePicsObj: {},
				infinitePicsName: 'infinitePics'
			};
		},
		watch: {
			'inputsArray'(n, o) { //父级传入的inputsArray改变时自动初始化默认数据
				this.inputsArrayLengthChange(n, o);
			}
		},
		created() {
			this.init(false, true); //初始化
			// #ifdef H5
			this.onReady = true;
			// #endif
		},
		// #ifndef H5
		onReady() {
			this.onReady = true;
		},
		// #endif
		methods: {
			init(fixedVariableNamePattern, launch) { // 初始化默认数据 param{是否是固定变量名模式初始化, 是否是首次初始化}
				let _this = this;
				console.log(`初始化inputs${launch?'':fixedVariableNamePattern?'-固定变量名模式':'-非固定变量名模式'}`);
				let data = _this.inputsArray;
				_this.$set(_this, 'verifyStatusObj', {});
				if(_this.phoneIndex!=='') _this.phoneIndex = '';
				for (let i = 0; i < data.length; i++) { //循环inputsArray，对 相应类型相应初始化默认值
					let item = data[i];
					let itemVariableName = item.variableName || (_this.onLoadData + i);
					if(_this.inputsObj[itemVariableName]!==undefined&&_this.inputsObj[itemVariableName]!==null&&fixedVariableNamePattern&&item.type!=='pics'&&item.type!=='infinitePics') {	//固定变量名模式下有值的项跳过初始化
						continue;
					}
					if(item.phone)
						if(!_this.phoneIndex) _this.phoneIndex = item.variableName || i;
					switch (item.type) {
						case 'radio':
							let data;
							for (let j = 0; j < item.itemArray.length; j++) {
								if (item.itemArray[j].defaultValue) {
									data = item.itemArray[j].value;
									break;
								}
							}
							
							if(data)
								_this.$set(_this.inputsObj, itemVariableName, data);
							else
								_this.$set(_this.inputsObj, itemVariableName, '');
								
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
							_this.$set(_this.inputsObj, itemVariableName, {value, status: _app.checkbox_status(status)});
							break;
						case 'pics':
							for (let j = 0; j < item.itemArray.length; j++) {
								let picVbNmae;
								if(item.variableName)
									picVbNmae = itemVariableName + j;
								else
									picVbNmae = itemVariableName + _this.onLoadData + j;
								if(fixedVariableNamePattern) {	//固定变量名模式下有值的项跳过初始化
									if(_this.picsObj[picVbNmae]) { 
										continue;
									}
								}
								if (item.itemArray[j].defaultValue) {
									_this.$set(_this.picsObj, picVbNmae, item.itemArray[j].defaultValue);
								}else{
									_this.$set(_this.picsObj, picVbNmae, '');
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
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_date.value + i] = ''; //初始化时清空记忆数据
							}else{
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
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value + i] = null; //初始化时清空记忆数据
							}else{
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
								let data = {result:{}, value:v};
								let steps = item.steps;
								if(item.linkage&&!steps){
									_app.showToast('未设置steps');
									return;
								}
								if(item.linkage) {
									for(let i = 0; i < item.linkageNum; i++) {
										if(!v[i]) v[i] = 0;
									}
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
										data.result.push(d[v[i]||0]);
									}
								}
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom.value + i] = null;
							}else{
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
								let data = {result:{}, value:v};
								let steps = item.steps;
								if(item.linkage&&!steps){
									_app.showToast('未设置steps');
									return;
								}
								if(item.linkage) {
									for(let i = 0; i < item.linkageNum; i++) {
										if(!v[i]) v[i] = 0;
									}
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
										data.result.push(d[v[i]||0]);
									}
								}
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom2.value + i] = null;
							}else{
								_this.$set(_this.inputsObj, itemVariableName, '');
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom2.value + i] = null;
							}
							break;
						case 'switch':
							_this.$set(_this.inputsObj, itemVariableName, item.defaultValue || false);
							break;
						case 'slider':
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
								_this.$set(_this.inputsObj, itemVariableName, data);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value + i] = null; //初始化时清空记忆数据
							}else{
								_this.$set(_this.inputsObj, itemVariableName, null);
								_this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value + i] = null; //初始化时清空记忆数据
							}
							break;
						case 'text':
							break;
						case 'editor':
							// #ifdef APP-PLUS || MP-WEIXIN
							if(this.usingComponents&&!this.editorLoadedFontFace) {
								console.log('editor 初始化')
								uni.loadFontFace({
									family: 'Pacifico',
									source: 'url("https://sungd.github.io/Pacifico.ttf")'
								})
								this.editorLoadedFontFace = true;
								if(item.defaultValue) {
									if(this.editorCtx) {
										this.setEditorContent(item.defaultValue, item.defaultValueType);
									}else{
										this.editorDefault = {defaultValue: item.defaultValue, defaultValueType: item.defaultValueType};
									}
								}
							}
							// #endif
							break;
						case 'infinitePics':
							if(fixedVariableNamePattern) continue;
							const vbName = _this.infinitePicsName + (item.variableName||i);
							_this.$set(_this.infinitePicsObj, vbName, []);
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
								_this.$set(_this.focusObj, itemVariableName, item.focus);
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
				if (obj && obj.type) {
					let pickerValue;
					switch (obj.type) {
						case 'picker-date':
							//记忆数据优先
							pickerValue = _app.pickerChoosedType.pickerChoosedType_date.value + index;
							if(_this.pickerObj[pickerValue]) obj.defaultValue = _this.pickerObj[pickerValue];
							_this.P_data = obj;
							_this.pickerDateShow = true;
							break;
						case 'picker-city':
							//记忆数据优先
							pickerValue = _app.pickerChoosedType.pickerChoosedType_city.value + index;
							if(_this.pickerObj[pickerValue]) obj.defaultValue = _this.pickerObj[pickerValue];
							_this.P_data = obj;
							_this.pickerCityShow = true;
							break;
						case 'picker-custom':
							//记忆数据优先
							pickerValue = _app.pickerChoosedType.pickerChoosedType_custom.value + index;
							if(_this.pickerObj[pickerValue]) obj.defaultValue = _this.pickerObj[pickerValue];
							_this.P_data = obj;
							_this.pickerCustomShow = true;
							break;
						case 'picker-custom2':
							//记忆数据优先
							pickerValue = _app.pickerChoosedType.pickerChoosedType_custom2.value + index;
							if(_this.pickerObj[pickerValue]) obj.defaultValue = _this.pickerObj[pickerValue];
							_this.P_data = obj;
							_this.pickerCustom2Show = true;
							break;
						case 'picker-provincialStreet':
							//记忆数据优先
							pickerValue = _app.pickerChoosedType.pickerChoosedType_provincialStreet.value + index;
							if(_this.pickerObj[pickerValue]) obj.defaultValue = _this.pickerObj[pickerValue];
							_this.P_data = obj;
							_this.pickerProvincialStreetShow = true;
							break;
						default:
							_app.showToast('缺少必要参数-type');
							break;
					}
				}else {
					_app.showToast('picker参数类型错误');
				}
			},
			IgreeFc({detail: {value}}) { // 用户是否同意规则
				this.Igree = value;
			},
			openRuleFc(value) { // 打开规则页面的父级方法
				this.$emit('chaildOpenEvent', value);
			},
			checkbox_change({detail: {value}}, index) { //checkbox赋值方法
				let cbObj;
				let vbName;
				if(_app.regTest('Int', index)) {
					cbObj = this.inputsArray[index];
					vbName = this.onLoadData + index;
				}else{
					cbObj = this.inputsArray.find(item=>item.variableName===index);
					vbName = index;
				}
				let checkboxArray = cbObj.itemArray;
				let oldData = this.inputsObj[vbName];
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
				let newData = {value, status: _app.checkbox_status(newArray)};
				this.$set(this.inputsObj, vbName, newData);
				this._emitEvent(_app.eventNames.inputsChange, {newData, oldData, index});
			},
			inputs_change({detail: {value}}, index, filterFc, filterType, isInput) { // 用户输入时，根据index赋值
				//console.log(e.detail.value);
				console.log(index);
				if(this.inputDebounceSet.openInputDebounce&&isInput) {
					if(inputDebounce[debounceName+index]) clearTimeout(inputDebounce[debounceName+index]);
					if(inputDebounce[debounceTimeName+index]&&new Date().getTime()-inputDebounce[debounceTimeName+index]<(this.inputDebounceSet.delay||500)) {
						console.log('防抖冲突,立即执行')
						this.inputs_changeFc(value, index, filterFc, filterType, true);
					}else{
						inputDebounce[debounceName+index] = setTimeout(()=>{
							console.log('防抖')
							this.inputs_changeFc(value, index, filterFc, filterType);
						}, this.inputDebounceSet.delay||500);
					}
				}else{
					console.log('无防抖')
					this.inputs_changeFc(value, index, filterFc, filterType);
				}
			},
			inputs_changeFc(value, index, filterFc, filterType, clash) {
				if(this.inputDebounceSet.openInputDebounce) {
					if(clash)
						inputDebounce[debounceTimeName+index] = 0;
					else
						inputDebounce[debounceTimeName+index] = new Date().getTime();
				}
				if(filterFc&&typeof(filterFc)=='function') {	//有filterFc则过滤
					this.input_filter_change(value, index, filterFc);
				}else{
					if(filterType&&_app.filterTypeObj[filterType]&&typeof(_app.filterTypeObj[filterType])=='function') {
						this.input_filter_change(value, index, _app.filterTypeObj[filterType]);
					}else{
						let vbName;
						if(_app.regTest('Int', index))
							vbName = this.onLoadData + index;
						else
							vbName = index;
						let oldData = this.inputsObj[vbName];
						this.$set(this.inputsObj, vbName, value);
						this._emitEvent(_app.eventNames.inputsChange, {newData: value, oldData, index});
					}
				}
			},
			input_filter_change(value, index, filterFc) {
				let val = filterFc(value);
				let vbName;
				if(_app.regTest('Int', index))
					vbName = this.onLoadData + index;
				else
					vbName = index;
				let oldData = this.inputsObj[vbName];
				if(val != value) {
					new Promise((reslove,reject)=>{
						this.$delete(this.inputsObj, vbName);
						reslove();
					})
					.then(()=>{
						this.$set(this.inputsObj, vbName, val);
						this._emitEvent(_app.eventNames.inputsChange, {newData: val, oldData, index});
					})
				}else{
					this.$set(this.inputsObj, vbName, val);
					this._emitEvent(_app.eventNames.inputsChange, {newData: val, oldData, index});
				}
			},
			picker_change(res) { //picker类型选择后赋值 
				let vbName = res.index;
				if(_app.regTest('Int', res.index))
					vbName = this.onLoadData + res.index;
					
				res.oldData = this.inputsObj[vbName];
				console.log('pickerValue：' + JSON.stringify(res));
				this.inputsObj[vbName] = res.newData;
				switch (res.type){		// 该项picker的value记忆
					case _app.pickerChoosedType.pickerChoosedType_date.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_date.value+res.index] = res.newData;
						break;
					case _app.pickerChoosedType.pickerChoosedType_city.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_city.value+res.index] = res.newData.value;
						break;
					case _app.pickerChoosedType.pickerChoosedType_custom.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom.value+res.index] = res.newData.value;
						break;
					case _app.pickerChoosedType.pickerChoosedType_custom2.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_custom2.value+res.index] = res.newData.value;
						break;
					case _app.pickerChoosedType.pickerChoosedType_provincialStreet.name:
						this.pickerObj[_app.pickerChoosedType.pickerChoosedType_provincialStreet.value+res.index] = res.newData.value;
						break;
					default:
						break;
				}
				this.picker_hideFc();
				this._emitEvent(_app.eventNames.inputsChange, res);
			},
			inputTap(type, index, customId) { //input点击事件
				let vbName;
				if(_app.regTest('Int', index))
					vbName = this.onLoadData + index;
				else
					vbName = index;
				switch (type){
					case 'passwordSwitch':	//密码显隐
						let vn = vbName+'password';
						this.$set(this.passwordObj, vn, !this.passwordObj[vn]);
						break;
					case 'clear':	//一键清除
						this.$set(this.inputsObj, vbName, '');
						break;
					case 'custom':
						this.inputCustomTapFc(index, customId, vbName);
						break;
					default:
						_app.showToast('inputTap类型错误');
						break;
				}
				this._emitEvent(_app.eventNames.inputTap, {type, index, customId});
			},
			async inputCustomTapFc(index, customId, vbName) {
				try{
					const data = await _app.inputCustomTapFc(customId);
					if(data!==undefined&&data!==null)
						this.$set(this.inputsObj, vbName, data);
				}catch(e){
					//TODO handle the exception
					const data = await _app.inputCustomTapCatchFc(customId, e);
					if(data!==undefined&&data!==null)
						this.$set(this.inputsObj, vbName, data);
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
				let phone;
				let customId;
				if(_this.otherSet&&_this.otherSet.getCodeSet&&_this.otherSet.getCodeSet.phoneNum) {
					phone = _this.otherSet.getCodeSet.phoneNum;
					customId = _this.otherSet.getCodeSet.customId;
				}else{
					let d = _this.inputsArray;
					let pIndex = _this.phoneIndex;
					let pVbName;
					let obj;
					if(!pIndex&&pIndex!==0) {
						let o = _this.inputsArray.find(item=>item.phone);
						if(o !== undefined && o !== null) {
							if(o.variableName) {
								pIndex = o.variableName;
							}else{
								pIndex = _this.inputsArray.findIndex(item=>item.phone);
								if(pIndex < 0) {
									_app.showToast('找不到phone属性为true的inputsArray下标');
									return;
								}
							}
						}else{
							_app.showToast('找不到phone属性为true的inputsArray项');
							return;
						}
					}
					if(_app.regTest('Int', pIndex)) {
						pVbName = _this.onLoadData + pIndex ;
						obj = _this.inputsArray[pIndex];
					}else{
						pVbName = pIndex;
						obj = _this.inputsArray.find(item=>item.variableName===pIndex);
					}
					if(!pVbName||pVbName==='') {
						_app.showToast('判断phone属性时出错');
						return;
					}
					phone = _this.inputsObj[pVbName];
					customId = obj.customId;
				}
				if (_app.regTest('Tel', phone)) { //正则判断
					_this.code = _app.sendSMS(customId, phone);
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
			async activeFc() { // 主功能按钮方法
				let _this = this;
				let d = _this.inputsArray;
				let inputsDataObj = {};
				// 先判断 inputs 的值是否为空, 后判断该值是否忽略
				let ifUsePics = []; //记录使用图片类型的index
				let ifInfinitePics = [];
				for (let i = 0; i < d.length; i++) {
					let onLoadData = _this.onLoadData + i;
					let variableName = d[i].variableName || onLoadData;
					switch (d[i].type) {
						case 'pics':
							ifUsePics.push(i); //记录使用图片类型的index
							for (let j = 0; j < d[i].itemArray.length; j++) {
								let picvbName;
								if(d[i].variableName) 
									picvbName = d[i].variableName + j;
								else
									picvbName = onLoadData + _this.onLoadData + j;
								let pic = _this.picsObj[picvbName];
								let notHave;
								if(d[i].variableName){
									notHave = !inputsDataObj[variableName];
								}else{
									notHave = !inputsDataObj[onLoadData]&&!inputsDataObj[variableName];
								}
								if (notHave) {
									inputsDataObj[variableName] = [];
								}
								if (pic) {
									_this.change_verifyStatus(i, 0, j);
									inputsDataObj[variableName].push(pic);
								} else {
									if (d[i].itemArray[j].ignore || (d[i].hide&&d[i].ignore!==false)) {
										_this.change_verifyStatus(i, 0, j);
										inputsDataObj[variableName].push('');
									} else {
										_this.change_verifyStatus(i, 2, j);
										_app.showToast(d[i].itemArray[j].nullErr || (d[i].itemArray[j].title + '不能为空'));
										return;
									}
								}
							}
							break;
						case 'infinitePics':
							const vbName = this.infinitePicsName + (d[i].variableName || i);
							const infiniteItem = this.infinitePicsObj[vbName];
							if(!infiniteItem||infiniteItem.length===0) {
								if(d[i].ignore || (d[i].hide&&d[i].ignore!==false)) {
									ifInfinitePics.push({infiniteItem, index: i});
								}else{
									_this.change_verifyStatus(i, 2);
									_app.showToast(d[i].nullErr || (d[i].title + '不能为空'));
									return;
								}
							}else{
								ifInfinitePics.push({infiniteItem, index: i});
							}
							break;
						case 'switch':
							inputsDataObj[variableName] = _this.inputsObj[variableName]?true:false;
							break;
						case 'slider':
							inputsDataObj[variableName] = _this.inputsObj[variableName];
							break;
						case 'text':
							break;
						case 'checkbox':
							if ((!_this.inputsObj[variableName].value||_this.inputsObj[variableName].value.length===0) && d[i].ignore!==false && !d[i].hide) {
								_this.change_verifyStatus(i, 2);
								_app.showToast(d[i].nullErr || ((d[i].title||'第' + i + '项') + '不能为空'));
								return;
							}
							_this.change_verifyStatus(i, 0);
							inputsDataObj[variableName] = _this.inputsObj[variableName];
							break;
							case 'editor':
								// #ifdef APP-PLUS || MP-WEIXIN
								try{
									inputsDataObj[variableName] = await this.getEditorContent();
								}catch(e){
									//TODO handle the exception
									console.log('editor取值异常:' + JSON.stringify(e));
									inputsDataObj[variableName] = {};
								}
								// #endif
								// #ifndef APP-PLUS || MP-WEIXIN
									inputsDataObj[variableName] = {};
								// #endif
								break;
						default:
							if (!_this.inputsObj[variableName]) {
								if (d[i].ignore || (d[i].hide&&d[i].ignore!==false)) {
									_this.change_verifyStatus(i, 0);
									inputsDataObj[variableName] = '';
								} else {
									_this.change_verifyStatus(i, 2);
									_app.showToast(d[i].nullErr || ((d[i].title||'第' + i + '项') + '不能为空'));
									return;
								}
							} else {
								if(d[i].verifyType&&_app.verifyTypeObj[d[i].verifyType])
									if(!_app.verifyTypeObj[d[i].verifyType].reg.test(_this.inputsObj[variableName])) {
										_this.change_verifyStatus(i, 1);
										_app.showToast(d[i].verifyErr || ((d[i].title||'第' + i + '项') + _app.verifyTypeObj[d[i].verifyType].name +  '格式校验错误'))
										return;
									}
								let verifyFc = d[i].verifyFc;
								if(verifyFc&&typeof(verifyFc)== 'function')
									if(!verifyFc(_this.inputsObj[variableName])) {
										_this.change_verifyStatus(i, 1);
										_app.showToast(d[i].verifyErr || ((d[i].title||'第' + i + '项') + '格式校验错误'))
										return;
									}
								_this.change_verifyStatus(i, 0);
								inputsDataObj[variableName] = _this.inputsObj[variableName];
							}
							break;
					}
				}
				// 判断是否需要同意规则
				if (_this.ifRule)
					if (!_this.Igree) {
						let ruleErrToast = '';
						if(_this.ruleSet.ruleErr) {
							ruleErrToast = _this.ruleSet.ruleErr;
						}else{
							let rules = _this.ruleSet.itemArray;
							for (let i = 0; i < rules.length; i++) {
								ruleErrToast += i == 0 ? rules[i].name : '、' + rules[i].name;
							}
							ruleErrToast = '请先阅读并勾选' + ruleErrToast;
						}
						_app.showToast(ruleErrToast);
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
				const pic_promise = [];
				if(ifUsePics.length > 0) {
					for (let i = 0; i < ifUsePics.length; i++) {
						let index = ifUsePics[i];
						let onLoadData = _this.onLoadData + index;
						let variableName = d[index].variableName || onLoadData;
						if (d[index].type && d[index].type == 'pics') {
							for (let j = 0; j < d[index].itemArray.length; j++) {
								let picsObj = inputsDataObj[variableName][j];
								if (picsObj) {
									pic_promise.push(new Promise(function(reslove, reject) {
										// push Promise 上传图片到服务器并返回图片在服务器的地址并拼接的方法
										_app.UpLoadFile(d[index].customId, picsObj).then((res)=>{
											reslove({
												index1: index,
												index2: j,
												data: res.data
											})
										}).catch((err)=>{
											reject(err||((d[index].itemArray[j].title||((d[index].title)||(d[index].variableName)||('第' + index + '的') + '第' + j + '项')) + '上传失败'));
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
				// 无限上传图片类型
				const infinitePic_promise = [];
				if(ifInfinitePics.length > 0) {
					for(let i = 0; i < ifInfinitePics.length; i++) {
						const item = ifInfinitePics[i];
						const index = item.index;
						if(item.infiniteItem) {
							const infiniteItem = item.infiniteItem;
							for(let j = 0; j < infiniteItem.length; j++) {
								if(infiniteItem[j].path) {
									infinitePic_promise.push(new Promise(function(reslove, reject) {
										// push Promise 上传图片到服务器并返回图片在服务器的地址并拼接的方法
										_app.UpLoadFile(d[index].customId, infiniteItem[j].path).then((res)=>{
											reslove({
												index1: index,
												index2: j,
												data: res.data
											})
										}).catch((err)=>{
											reject(err||(''));
										});
									}));
								}else{
									console.log('not find infiniteItem path');
								}
							}
						}else{
							console.log('not find infiniteItem');
						}
					}
				}
				const picArr = pic_promise.concat(infinitePic_promise);
				Promise.all(picArr).then(res => { // Promise返回一个图片的数组, 根据res.index1 给 inputsDataObj[_this.onLoadData + res[i].index1] 赋值
					for (let i = 0; i < res.length; i++) { // 注: 此处根据自己的需求拼接数据   (在下返回数据后的拼接是以 ‘|’ 分隔)
						const onLoadData = _this.onLoadData + res[i].index1;
						const variableName = d[res[i].index1].variableName || onLoadData; // 自定义变量名或默认变量名
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
			chooseImg(index, picsIndex, infinite) { //选择图片
				let vbName;
				let oldData;
				if(infinite) {
					vbName = this.infinitePicsName + index;
				}else {
					if(_app.regTest('Int', index)) {
						vbName = this.onLoadData + index + this.onLoadData + picsIndex;
					}else{
						vbName = index + picsIndex;
					}
					if(this.picsObj[vbName]) return;
					oldData = this.picsObj[vbName];
				}
				uni.chooseImage({
					success: res => {
						if(infinite) {
							const infinitePicsObj = {...this.infinitePicsObj};
							if(!infinitePicsObj[vbName])
								infinitePicsObj[vbName] = [];
							const tempFilePaths = res.tempFilePaths;
							const inputsArrayItem = this.inputsArray[picsIndex];
							const oldInfiniteLength = this.infinitePicsObj[vbName]?this.infinitePicsObj[vbName].length:0;
							tempFilePaths.forEach((item, pathIndex)=>{
								if(inputsArrayItem.max) {
									if((oldInfiniteLength + (pathIndex + 1)) <= inputsArrayItem.max) {
										infinitePicsObj[vbName].push({path: item});
									}
								}else{
									infinitePicsObj[vbName].push({path: item});
								}
							})
							this.$set(this.infinitePicsObj, vbName, infinitePicsObj[vbName]);
						}else{
							const newData = res.tempFilePaths[0];
							this.$set(this.picsObj, vbName, newData);
							this._emitEvent(_app.eventNames.inputsChange, {newData, oldData, index, picsIndex});
						}
					}
				})
			},
			clearPic(index, picsIndex, infinite) { //清除图片
			let vbName;
			let oldData;
			if(infinite) {
				vbName = this.infinitePicsName + index;
				const infinitePicsObj = {...this.infinitePicsObj};
				infinitePicsObj[vbName].splice(picsIndex, 1);
				this.$set(this.infinitePicsObj, vbName, infinitePicsObj[vbName]);
			}else {
				if(_app.regTest('Int', index)) {
					vbName = this.onLoadData + index + this.onLoadData + picsIndex;
				}else{
					vbName = index + picsIndex;
				}
				oldData = this.picsObj[vbName];
				this.picsObj[vbName] = '';
				this._emitEvent(_app.eventNames.inputsChange, {newData: '', oldData, index, picsIndex});
			}
			},
			showImg(imgPath) { //大图预览选中的图片
				_app.previewImage(imgPath);
			},
			infinitePicsShowImg(index, currentIndex) {
				const vbName = this.infinitePicsName + index;
				const infiniteItem = this.infinitePicsObj[vbName];
				const imgArr = [];
				infiniteItem.forEach(item=>{
					if(item.path)
						imgArr.push(item.path)
				})
				_app.previewImage(imgArr, currentIndex);
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
				let vbName;
				if(typeof index === 'string')
					vbName = index;
				else
					vbName = this.onLoadData + index;
				let o = {};
				o[vbName] = true;
				this.$set(this, 'focusObj', o);
			},
			blurChange(index) {
				let o = {};
				this.$set(this, 'focusObj', o);
			},
			change_verifyStatus(index, status, index2) { //0:none, 1:error, 2:warning
				let verifyStatusSet = this.verifyStatusSet;
				if(!verifyStatusSet.openVerifyStatus) return;
				let c = '';
				let ifnotSuccess = false;
				switch (status){
					case 0: c = 'rgba(0,0,0,0)'; break;
					case 1: c = verifyStatusSet.verifyErrorColor||'rgba(255,255,0,.7)'; ifnotSuccess = true; break;
					case 2: c = verifyStatusSet.errNullColor||'rgba(245,16,92,.7)'; ifnotSuccess = true; break;
					default: c = 'rgba(0,0,0,0)'; break;
				}
				let ifVariableName = false;
				let vbName = this.inputsArray[index].variableName;
				let inputId;
				if(vbName) {
					ifVariableName = true;
					inputId = vbName;
				}else{
					vbName = this.onLoadData + index;
					inputId = index
				}
				if(verifyStatusSet.openChangeBorderColor)
					this.$set(this.verifyStatusObj, vbName + (typeof(index2)=='number'&&index2>=0?ifVariableName?index2:this.onLoadData + index2:''), c); // 校验失败时, 改变边框颜色
				if(verifyStatusSet.openScroll&&ifnotSuccess) {
					let view;
					// #ifdef H5
					view = document.getElementById(`Id_${inputId}`);
					uni.pageScrollTo({
						scrollTop:view.offsetTop - 100,
						duration: 300
					})
					// #endif
					// #ifndef H5
					if(this.usingComponents) {
						if(!this.inputsId) { console.log('找不到inputsId, 请在inputs中传此参数'); return; }
						view = uni.createSelectorQuery().select(`#${this.inputsId} >>> #Id_${inputId}`);
					}else {
						view = uni.createSelectorQuery().select(`#Id_${inputId}`);
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
								this.retryScroll(verifyStatusSet, inputId);
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
			retryScroll(verifyStatusSet, inputId) {	//切换参数重试滚动
				let view;
				if(this.usingComponents) {
					view = uni.createSelectorQuery().select(`#Id_${inputId}`);
				}else{
					if(!this.inputsId) { console.log('找不到inputsId, 请在inputs中传此参数'); return; }
					view = uni.createSelectorQuery().select(`#${this.inputsId} >>> #Id_${inputId}`);
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
			},
			setFocus() {
				this.setInputsValueFc(_app.setValueType.focusObj, arguments);
			},
			setInputsValue() {// 能够筛选出index的title或者function或者number， 值， 错误回调
				this.setInputsValueFc(_app.setValueType.inputsObj, arguments);
			},
			setInputsValueFc(obj, params) {
				let { param, value, fail, isVariableName } = _app.filterParams(params, _app.filterParamsArrayType.setInputsValueFc);
				let i;
				switch (typeof(param)){
					case 'string':
						i = isVariableName?param:this.inputsArray.findIndex(item=>item.title === param);
						break;
					case 'number':
						i = param;
						break;
					case 'function':
						i = param(this.inputsArray);
						break;
					default:
						console.log('setFocus方法传入的参数不正确');
						if(fcb&&typeof(fcb)==='function') fcb();
						return;
						break;
				}
				
				let isNumber = _app.isNumber(i);
				if((isNumber?i<0:i==='')) {
					if(fail&&typeof(fail)==='function') fail(isNumber?'下标小于零':'匹配标识不能为空');
				}else {
					this.$set(this[obj.name], (isNumber?(this.onLoadData + i):i) + obj.itemName, value); 
				}
			},
			_emitEvent(name, obj) {	//绑定的inputsChange回调
				switch (name){
					case _app.eventNames.inputsChange:	//inputsChange回调
						let { index } = obj;
						let itemObj;
						if(_app.regTest('Int', index))
							itemObj = this.inputsArray[index];
						else
							itemObj = this.inputsArray.find(item=>item.variableName===index);
						obj = {
							...obj,
							type: (obj.type?obj.type:itemObj.type)||'input',
							title: itemObj.title,
							customId: itemObj.customId
						}
						break;
					default:
						break;
				}
				this.$emit(name, obj)
			},
			inputsArrayLengthChange(n, o) {	//switch监听inputsArray变化时触发的方法
				let oSet = new Set();
				for(let i = 0; i < o.length; i++) {
					if(o[i].variableName) {
						oSet.add(o[i].variableName);
					}else {
						console.log('旧数组中' + (o[i].title||('第' + i + '项')) + '没有variableName属性，执行初始化函数');
						this.init();
						return;
					}
				}
				let nSet = new Set();
				for(let i = 0; i < n.length; i++) {
					if(n[i].variableName) {
						nSet.add(n[i].variableName);
					}else {
						console.log('新数组中' + (n[i].title||('第' + i + '项')) + '没有variableName属性，执行初始化函数');
						this.init();
						return;
					}
				}
				if(oSet.size !== o.length || nSet.size !== n.length) {
					console.log('检查结果-不符合固定变量名模式, 执行初始化函数');
					this.init();
				}else{
					console.log('检查结果-符合固定变量名模式，执行初始化函数时跳过已有值的项');
					if(nSet.size < oSet.size) {	//新数组长度小于旧数组长度，去除多余无用变量
						console.log('新数组长度小于旧数组长度，准备去除多余无用变量')
						let oArr = Array.from(oSet);
						for (let i = 0; i < oArr.length; i++) {
							if(!nSet.has(oArr[i])) {
								let vbName = oArr[i];
								console.log('发现多余项:' + vbName);
								if(vbName) {
									let obj = o.find(item=>item.variableName===vbName);
									let pickerValue;
									switch (obj.type){
										case 'pics':
											if(obj.itemArray) {
												for(let i = 0; i < obj.itemArray.length; i++) {
													let picVbName = vbName + i;
													console.log('去除picsObj变量:' + picVbName + ', 值为:' + this.picsObj[picVbName]);
													this.$delete(this.picsObj, picVbName);
												}
											}
											break;
										case 'picker-date':
											pickerValue = _app.pickerChoosedType.pickerChoosedType_date.value + vbName;
											console.log('去除inputsObj变量:' + vbName + ', 值为:' + this.inputsObj[vbName]);
											console.log('去除pickerObj变量:' + pickerValue + ', 值为:' + this.pickerObj[pickerValue]);
											this.$delete(this.inputsObj, vbName);
											this.$delete(this.pickerObj, pickerValue);
											break;
										case 'picker-city':
											pickerValue = _app.pickerChoosedType.pickerChoosedType_city.value + vbName;
											console.log('去除inputsObj变量:' + vbName + ', 值为:' + this.inputsObj[vbName]);
											console.log('去除pickerObj变量:' + pickerValue + ', 值为:' + this.pickerObj[pickerValue]);
											this.$delete(this.inputsObj, vbName);
											this.$delete(this.pickerObj, pickerValue);
											break;
										case 'picker-custom':
											pickerValue = _app.pickerChoosedType.pickerChoosedType_custom.value + vbName;
											console.log('去除inputsObj变量:' + vbName + ', 值为:' + this.inputsObj[vbName]);
											console.log('去除pickerObj变量:' + pickerValue + ', 值为:' + this.pickerObj[pickerValue]);
											this.$delete(this.inputsObj, vbName);
											this.$delete(this.pickerObj, pickerValue);
											break;
										case 'picker-custom2':
											pickerValue = _app.pickerChoosedType.pickerChoosedType_custom2.value + vbName;
											console.log('去除inputsObj变量:' + vbName + ', 值为:' + this.inputsObj[vbName]);
											console.log('去除pickerObj变量:' + pickerValue + ', 值为:' + this.pickerObj[pickerValue]);
											this.$delete(this.inputsObj, vbName);
											this.$delete(this.pickerObj, pickerValue);
											break;
										case 'picker-provincialStreet':
											pickerValue = _app.pickerChoosedType.pickerChoosedType_provincialStreet.value + vbName;
											console.log('去除inputsObj变量:' + vbName + ', 值为:' + this.inputsObj[vbName]);
											console.log('去除pickerObj变量:' + pickerValue + ', 值为:' + this.pickerObj[pickerValue]);
											this.$delete(this.inputsObj, vbName);
											this.$delete(this.pickerObj, pickerValue);
											break;
										case 'infinitePics':
											console.log('去除infinitePicsObj变量:' + vbName + ', 值为:' + this.infinitePicsObj[this.infinitePicsName + vbName]);
											this.$delete(this.infinitePicsObj, this.infinitePicsName + vbName);
											break;
										default:
											console.log('去除inputsObj变量:' + vbName + ', 值为:' + this.inputsObj[vbName]);
											this.$delete(this.inputsObj, vbName);
											break;
									}
								}
							}
						}
					}else{
						console.log('长度没有变化, 若确定改变了inputsArray的长度，请检查是否在模板模式下使用了unshift、splice等方法，建议模板模式下对inputsArray重新赋值');
					}
					this.init(true);
				}
			},
			// #ifdef APP-PLUS || MP-WEIXIN
			readOnlyChange() {
				console.log('editor readOnly');
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				console.log('editor onEditorReady');
				if(this.inputsId)
					uni.createSelectorQuery().select(`#${this.inputsId} >>> #editor`).context((res) => {
						this.editorCtx = res.context
						if(this.editorDefault) {
							const editorDefault = this.editorDefault;
							this.setEditorContent(editorDefault.defaultValue, editorDefault.defaultValueType);
						}
					}).exec()
				else
					console.log('找不到inputsId, 请在inputs中传入')
			},
			setEditorContent(val, valType) {
				let obj = {};
				obj[valType||'delta'] = val;
				this.editorCtx.setContents({
					...obj,
					success(res) {
						console.log('设置editor内容成功:' + JSON.stringify(res));
					},
					fail(err) {
						console.log('设置editor内容失败:' + JSON.stringify(err));
					}
				})
			},
			getEditorContent() {
				return new Promise((rs, rj)=>{
					if(this.editorCtx) {
						this.editorCtx.getContents({
							success(res) {
								rs(res);
							},
							fail(err) {
								rj(err);
							}
						})
					}else{
						rs('')
					}
				})
			},
			editorUndo() {
				this.editorCtx.undo()
			},
			editorRedo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			editorClear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
			// #endif
		}
	}
</script>

<style scoped>
	@import './inputs.css';
	/* #ifdef APP-PLUS || MP-WEIXIN */
	@import "./editor-icon.css";
	.editor_iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}
	
	.toolbar {
		width: 100%;
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}
	
	
	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		background: #fff;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}
	
	.ql-active {
		color: #06c;
	}
	/* #endif */
</style>
