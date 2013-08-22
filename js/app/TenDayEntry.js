define(['vendor/knockout-2.3.0'], function(ko){

	function TenDayEntry(time, high, low, condition, condition_icon_url) {
		var self = this;
		self.time = ko.observable(time);
		self.high = ko.observable(high);
		self.low = ko.observable(low);
		self.condition = ko.observable(condition);
		self.condition_url = ko.observable(condition_icon_url);
	};
	return TenDayEntry;

});