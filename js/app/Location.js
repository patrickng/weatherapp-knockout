define(['vendor/knockout-2.3.0', 'app/HourlyEntry', 'app/TenDayEntry'], function(ko, HourlyEntry, TenDayEntry){

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
				hourlyForecast: "http://api.wunderground.com/api/420cc13d75d8f243/hourly/q/"+self.state()+"/"+self.city()+".json?callback=?",
				tenDayForecast: "http://api.wunderground.com/api/420cc13d75d8f243/forecast10day/q/"+self.state()+"/"+self.city()+".json?callback=?"
				// hourlyForecast: "/js/hourly.json",
				// tenDayForecast: "/js/10day.json"
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
	};

	return Location;

});
// ko.applyBindings(new AppViewModel());