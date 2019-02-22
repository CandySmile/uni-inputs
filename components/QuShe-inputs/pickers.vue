<template>
	<view class="width100">
		<picker-view class="fontSize1Point8vh fontColor666666 width100" :indicator-style="indicatorStyle" :value="dateVlue"
		 @change="bindPickerViewChange($event)" :style="{'height': height + 'vh'}">
			<picker-view-column>
				<view class="flex_row_c_c" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view>
			</picker-view-column>
			<picker-view-column>
				<view class="flex_row_c_c" v-for="(picker_item,picker_index) in months" :key="picker_index">{{picker_item}}月</view>
			</picker-view-column>
			<picker-view-column>
				<view class="flex_row_c_c" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		props: {
			years: {
				type: Array,
				default: null
			},
			indicatorStyle: {
				type: String,
				default: `height: 5vh;`
			},
			height: {
				type: String,
				default: '20'
			},
			defaultDate: {
				type: Object,
				default: new Date()
			}
		},
		data() {
			let _this = this;
			let months = [];
			for (let i = 1; i <= 12; i++) {
				months.push(i);
			}
			let thisYear = _this.years;
			let endYear = thisYear[thisYear.length-1];
			let defaultYear = _this.defaultDate.getFullYear();
			let defaultMonth = _this.defaultDate.getMonth() + 1;
			let defaultDay = _this.defaultDate.getDate();
			let year = endYear>defaultYear?defaultYear:endYear;
			let month = endYear>defaultYear?defaultMonth:months[11];
			let days = _this.changeDays(year, month, false, endYear>defaultYear, defaultDay);
			let day = endYear>defaultYear?defaultDay:days[days.length-1];
			let dateVlue = [];
			for(let i = 0; i < thisYear.length; i++) {
				if(year==thisYear[i]) {
					dateVlue[0] = i;
				}
			}
			dateVlue[1] = month-1;
			dateVlue[2] = day-1;
			return {
				months,
				days,
				dateVlue
			}
		},
		methods: {
			bindPickerViewChange: function(e) {
				const val = e.detail.value
				this.changeDays(this.years[val[0]], this.months[val[1]], val);
			},
			changeDays(Y, M, val, compare, defaultDay) {
				let _this = this;
				const date = new Date();
				date.setFullYear(Y);
				date.setMonth(M);
				date.setDate(0);
				let days = [];	
				for(let i = 1; i <= date.getDate(); i++) {
					days.push(i);
				}
				_this.days = days;
				if(val) {
					let commitDay = null;
					if(val[2] + 1 < days[days.length-1]) {
						commitDay = val[2] + 1;
					}else{
						commitDay = days[days.length-1];
					}
					_this.$emit('getDate', `${Y}-${M}-${commitDay}`);
				}else{
					_this.$emit('getDate', `${Y}-${M}-${compare?defaultDay:days[days.length-1]}`);
				}
				return days;
			}
		},
	}
</script>

<style>
</style>
