"use strict";

!function(e) {
    var n = window.NP;

    document.getElementById("name-picker") && n.loadScript("name-picker.js", function() {
        window.Namepicker = new NamePicker;
    })
}();
