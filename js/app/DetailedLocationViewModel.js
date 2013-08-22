define(['knockout'], function(ko){
	function DetailedLocationViewModel(location) {
		var self = this;
		self.newLocation = location;
		self.newLocation.loadData();
		self.displayType = ko.observable();
	};

	return DetailedLocationViewModel;
});