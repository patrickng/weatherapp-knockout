define(['knockout', 'Location', 'DetailedLocationViewModel'], function(ko, Location, DetailedLocationViewModel) {
	function AppViewModel() {
		var self = this;
		var locationExistsInArray = function(name, array) {
			var exists = ko.utils.arrayFirst(array, function(location) {
				return location.name == name;
			});

			return !!exists;
		};

		self.currentSelectedLocation = ko.observable();
		self.locationName = ko.observable();
		self.locations = ko.observableArray([
			new Location("New York, NY"), 
			new Location("San Francisco, CA")
		]);
		self.displayLocationPanel = ko.computed(function() {
			return self.currentSelectedLocation() ? "show" : "hide";
		}, AppViewModel);

		self.addLocation = function() {
			if ((self.locationName() != "") && !locationExistsInArray(self.locationName(), self.locations())) {
				self.locations.push(new Location(self.locationName()));
			}
			self.locationName("");
		};
		self.selectLocation = function(location) {
			self.currentSelectedLocation(new DetailedLocationViewModel(location));
		};
	}

	return AppViewModel;
});