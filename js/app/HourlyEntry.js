define(['knockout'], function(ko){

	function HourlyEntry(time, temperature, humidity, condition, condition_icon_url) {
		var self = this;
		self.time = ko.observable(time.civil);
		self.formattedDate = ko.computed(function() {
			return time.month_name + " " + time.mday;
		});
		self.temperature = ko.observable(temperature);
		self.humidity = ko.observable(humidity);
		self.condition = ko.observable(condition);
		self.condition_url = ko.observable(condition_icon_url);
		self.shouldShowDay = ko.computed(function() {
			if ((time.hour == '23') || (time.hour == '0')) {
				return true;
			}
		});
	};

	return HourlyEntry;

});