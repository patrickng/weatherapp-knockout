define(['knockout', 'HourlyEntry', 'TenDayEntry'], function(ko, HourlyEntry, TenDayEntry){

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
	};

	Location.prototype = {
		loadData: function() {

			var self = this;

			var endpointURLs = {
				hourlyForecast: 'http://api.wunderground.com/api/420cc13d75d8f243/hourly/q/'+this.state()+'/'+this.city()+'.json?callback=?',
				tenDayForecast: 'http://api.wunderground.com/api/420cc13d75d8f243/forecast10day/q/'+this.state()+'/'+this.city()+'.json?callback=?'
				// hourlyForecast: '/js/hourly.json',
				// tenDayForecast: '/js/10day.json'
			};

			// console.log(this);
			// (this) context is the object it was called on - Location
			$.getJSON(endpointURLs.hourlyForecast, function(data){
				// console.log(this); 
				// (this) context changes to the json object
				ko.utils.arrayMap(data.hourly_forecast, function(item) {
					// console.log(this);
					// (this) context changes to window. we want (this) to refer to the object it was called on so we do "var self = this;" on line 20
					self.hourlyForecast.push(
						new HourlyEntry(
							item.FCTTIME, 
							item.temp.english + 'F', 
							item.humidity + '%',
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
							item.high.fahrenheit + 'F',
							item.low.fahrenheit + 'F', 
							item.conditions,
							item.icon_url
						)
					);
				});
			});
		}
	}

	return Location;

});
// ko.applyBindings(new AppViewModel());