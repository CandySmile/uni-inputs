<template>
  <view>
      <picker-view class="fontColor666666 width100" :indicator-style="indicatorStyle||'height: '+windowHeight*.05+'px;'" :style="{'height': height||windowHeight*.2 + 'px', 'font-size': fontSize+'px'}" :value="pickerValue" @change="pickerChange">
        <block>
          <picker-view-column>
            <view class="flex_row_c_c" v-for="(item,index) in provinceDataList" :key="index">{{item.label}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="flex_row_c_c" v-for="(item,index) in cityDataList" :key="index">{{item.label}}</view>
          </picker-view-column>
          <picker-view-column>
            <view class="flex_row_c_c" v-for="(item,index) in areaDataList" :key="index">{{item.label}}</view>
          </picker-view-column>
        </block>
      </picker-view>
  </view>
</template>

<script>
import provinceData from './city-data/province.js';
import cityData from './city-data/city.js';
import areaData from './city-data/area.js';
export default {
  data() {
    return {
      pickerValue: [0, 0, 0],
      provinceDataList: [],
      cityDataList: [],
      areaDataList: []
    };
  },
  created() {
    this.provinceDataList = provinceData;
    this.cityDataList = cityData[this.pickerValueDefault[0]];
    this.areaDataList =
      areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]];
    this.pickerValue = this.pickerValueDefault;
    this.handPickValueDefault(); // 对 pickerValueDefault 做兼容处理
  },
  props: {
		indicatorStyle: String,
		height: String,
		windowHeight: Number,
    /* 默认值 */
    pickerValueDefault: {
      type: Array,
      default() {
				return [0, 0, 0];
			}
    },
    /* 主题色 */
    themeColor: String,
		fontSize: {
			type: Number,
			default: 10
		}
  },
  methods: {
    handPickValueDefault() {
			let _this = this;
      if (this.pickerValueDefault !== [0, 0, 0]) {
        if (this.pickerValueDefault[0] > provinceData.length - 1) {
          this.pickerValueDefault[0] = provinceData.length - 1;
        }
        if (this.pickerValueDefault[1] > cityData[this.pickerValueDefault[0]].length - 1) {
          this.pickerValueDefault[1] = cityData[this.pickerValueDefault[0]].length - 1;
        }
        if (this.pickerValueDefault[2] > areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1) {
          this.pickerValueDefault[2] = areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1;
        }
				_this.pickerChange(_this.pickerValueDefault, true)
      }else{
				_this.pickerChange([0, 0, 0], true);
			}
    },
    pickerChange(e, init) {
      let changePickerValue = init?e:e.mp.detail.value;
      if (this.pickerValue[0] !== changePickerValue[0]) {
        // 第一级发生滚动
        this.cityDataList = cityData[changePickerValue[0]];
        this.areaDataList = areaData[changePickerValue[0]][0];
        changePickerValue[1] = 0;
        changePickerValue[2] = 0;
      } else if (this.pickerValue[1] !== changePickerValue[1]) {
        // 第二级滚动
        this.areaDataList =
          areaData[changePickerValue[0]][changePickerValue[1]];
        changePickerValue[2] = 0;
      }
      this.pickerValue = changePickerValue;
      this._$emit('onChange');
    },
    _$emit(emitName) {
      let pickObj = {
        label: this._getLabel(),
        value: this.pickerValue,
        cityCode: this._getCityCode()
      };
      this.$emit(emitName, pickObj);
    },
    _getLabel() {
      let pcikerLabel =
        this.provinceDataList[this.pickerValue[0]].label +
        '-' +
        this.cityDataList[this.pickerValue[1]].label +
        '-' +
        this.areaDataList[this.pickerValue[2]].label;
      return pcikerLabel;
    },
    _getCityCode() {
      return this.areaDataList[this.pickerValue[2]].value;
    }
  }
};
</script>

<style scoped>
	.width100 {
		width: 100%;
	}
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.fontColor666666 {
		color: #666666;
	}
</style>
