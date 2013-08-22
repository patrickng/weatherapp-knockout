require.config({
	baseUrl: "/js",
	paths: {
		jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
		knockout: 'vendor/knockout-2.3.0',
		Location: 'app/Location',
		HourlyEntry: 'app/HourlyEntry',
		TenDayEntry: 'app/TenDayEntry',
		DetailedLocationViewModel: 'app/DetailedLocationViewModel',
		AppViewModel: 'app/AppViewModel'
	}
});

require(['jquery', 'knockout', 'AppViewModel'], function($, ko, AppViewModel) {
    ko.applyBindings(new AppViewModel());
});