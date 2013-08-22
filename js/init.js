

require(['vendor/knockout-2.3.0', 'app/AppViewModel'], function(ko, AppViewModel) {
    ko.applyBindings(new AppViewModel());
});