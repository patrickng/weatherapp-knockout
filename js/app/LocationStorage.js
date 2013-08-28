define(function() {
	var STORAGE_ID = 'locations-knockoutjs';

	return {
		get: function() {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		set: function(locations) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(locations))
		}
	}
});