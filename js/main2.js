var Food = function (name) {
    this.name = name;
};
/*<![CDATA[*/
var BetterListModel = function () {
    this.itemToAdd = ko.observable("");
    this.allItems = ko.observableArray(["Fries", "Eggs Benedict", "Ham", "Cheese"]); // Initial items
    this.selectedItems = ko.observableArray(["Ham"]);                                // Initial selection

    this.addItem = function () {
        if ((this.itemToAdd() != "") && (this.allItems.indexOf(this.itemToAdd()) < 0)) // Prevent blanks and duplicates
            this.allItems.push(this.itemToAdd());
        console.log(this.allItems.indexOf(this.itemToAdd()) < 0);
        this.itemToAdd(""); // Clear the text box
    };

    this.removeSelected = function () {
        this.allItems.removeAll(this.selectedItems());
        this.selectedItems([]); // Clear selection
    };

    this.sortItems = function() {
        this.allItems.sort();
    };
};

ko.applyBindings(new BetterListModel());
/*]]>*/