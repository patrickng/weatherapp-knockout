define(['knockout', 'Location', 'DetailedLocationViewModel', 'LocationStorage'], function(ko, Location, DetailedLocationViewModel, locationStorage) {
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

		var stripLocationNames = function(locations) {
			var tempLocationArray = [];
			ko.utils.arrayForEach(locations, function(location) {
				var obj = { "name": location.name };
				tempLocationArray.push(obj);
			});
			return tempLocationArray;
		};

		if ((locationStorage.get() == null) || (locationStorage.get() == undefined) || (locationStorage.get() == "")) {
			self.locations = ko.observableArray([
				new Location("New York, NY"), 
				new Location("San Francisco, CA")
			]);
			locationStorage.set(stripLocationNames(self.locations()));
		} else {
			self.locations = ko.observableArray();
			ko.utils.arrayForEach(locationStorage.get(), function(location) {
				self.locations.push(new Location(location.name));
			});
		}

		self.displayLocationPanel = ko.computed(function() {
			return self.currentSelectedLocation() ? "show" : "hide";
		}, AppViewModel);

		self.addLocation = function() {
			if ((self.locationName() != "") && !locationExistsInArray(self.locationName(), self.locations())) {
				self.locations.push(new Location(self.locationName()));
				locationStorage.set(stripLocationNames(self.locations()));
			}
			self.locationName("");
		};
		self.selectLocation = function(location) {
			self.currentSelectedLocation(new DetailedLocationViewModel(location));
		};
		self.removeLocation = function(location) {
			self.locations.remove(location);
			locationStorage.set(stripLocationNames(self.locations()));
		};
	}

	return AppViewModel;
});