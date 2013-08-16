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
		if ((time.hour == "23") || (time.hour == "0")) {
			return true;
		}
	});
}

function TenDayEntry(time, high, low, condition, condition_icon_url) {
	var self = this;
	self.time = ko.observable(time);
	self.high = ko.observable(high);
	self.low = ko.observable(low);
	self.condition = ko.observable(condition);
	self.condition_url = ko.observable(condition_icon_url);
}

function Location(name) {
	var self = this;

	self.name = name;
	self.hourlyForecast = ko.observableArray();
	self.tenDayForecast = ko.observableArray();
	self.city = function() {
		return self.name.split(',')[0].replace(/\s+/g, '_');
	};
	self.state = function() {
		return self.name.split(',')[1].replace(/\s+/g, '');
	};
	self.loadData = function() {
		var endpointURLs = {
			// hourlyForecast: "http://api.wunderground.com/api/420cc13d75d8f243/hourly/q/"+self.state()+"/"+self.city()+".json?callback=?",
			// tenDayForecast: "http://api.wunderground.com/api/420cc13d75d8f243/forecast10day/q/"+self.state()+"/"+self.city()+".json?callback=?"
			hourlyForecast: "/js/hourly.json",
			tenDayForecast: "/js/10day.json"
		};

		$.getJSON(endpointURLs.hourlyForecast, function(data){
			ko.utils.arrayMap(data.hourly_forecast, function(item) {
				self.hourlyForecast.push(
					new HourlyEntry(
						item.FCTTIME, 
						item.temp.english + "F", 
						item.humidity + "%",
						item.condition, 
						item.icon_url
					)
				);
			});
		});

		$.getJSON(endpointURLs.tenDayForecast, function(data){
			ko.utils.arrayMap(data.forecast.simpleforecast.forecastday, function(item) {
				self.tenDayForecast.push(
					new TenDayEntry(
						item.date.pretty, 
						item.high.fahrenheit + "F",
						item.low.fahrenheit + "F", 
						item.conditions,
						item.icon_url
					)
				);
			});
		});
	};
}

function DetailedLocationViewModel(location) {
	var self = this;
	self.newLocation = location;
	self.newLocation.loadData();
	self.displayType = ko.observable();
}

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

ko.applyBindings(new AppViewModel());