"use strict";
!function(e) {
    var n = window.NP;
    "scrollBehavior"in document.documentElement.style || n.loadScript("vendor/smooth-scroll.js"),
    document.getElementById("name-picker") && n.loadScript("name-picker.js", function() {
        window.Namepicker = new NamePicker
    }),
    document.getElementById("team-generator") && n.loadScript("team-generator.js", function() {
        window.TeamGenerator = new TeamGenerator
    }),
    document.getElementById("name-generator") && n.loadScript("name-generator.js", function() {
        window.NameGenerator = new NameGenerator
    });
    document.getElementById("dice-roller") && n.loadScript("dice-roller.js", function() {
        window.DiceRoller = new DiceRoller
    }),
    document.getElementById("flip-coin") && n.loadScript("flip-coin.js", function() {
        window.FlipCoin = new FlipCoin
    }),
    document.getElementById("character-counter") && n.loadScript("character-counter.js", function() {
        window.CharacterCounter = new CharacterCounter
    })
}();
