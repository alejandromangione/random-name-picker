"use strict";
var _createClass = function() {
    function s(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1,
            s.configurable = !0,
            "value"in s && (s.writable = !0),
            Object.defineProperty(e, s.key, s)
        }
    }
    return function(e, t, n) {
        return t && s(e.prototype, t),
        n && s(e, n),
        e
    }
}();
function _classCallCheck(e, t) {
    if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
}
var NamePicker = function() {
    function e() {
        _classCallCheck(this, e),
        this.bindFunctions(),
        this.setVariables(),
        this.queryDomElements(),
        this.getDataAttributes(),
        this.addEventListeners(),
        this.constructor.initFacebook()
    }
    return _createClass(e, [{
        key: "queryDomElements",
        value: function() {
            this.namesInput = document.getElementById("names"),
            this.numberOfWinnerOption = document.getElementById("number-of-winners"),
            this.filterSpaceOption = document.getElementById("filter-space"),
            this.filterWinnerOption = document.getElementById("filter-winners"),
            this.filterDuplicatesOption = document.getElementById("filter-duplicates"),
            this.filterRemoveOption = document.getElementById("filter-remove"),
            this.settingsOption = document.getElementById("settings"),
            this.settingsLogoOption = document.getElementById("settings-logo"),
            this.settingsintroOption = document.getElementById("settings-intro"),
            this.settingsTitleOption = document.getElementById("settings-title"),
            this.countElem = document.getElementById("js-count"),
            this.removeNamesButton = document.querySelector(".js-remove-names"),
            this.resultElem = document.getElementById("js-results"),
            this.previousResultElem = document.getElementById("js-previous-results"),
            this.startButton = document.getElementById("js-start"),
            this.resultsHolder = document.querySelector(".js-results-holder"),
            this.resultsHolderTitle = this.resultsHolder.querySelector(".js-result-holder-title"),
            this.previousWinners = [],
            this.currentUrl = location.protocol + "//" + location.host + location.pathname
        }
    }, {
        key: "setVariables",
        value: function() {
            this.names = [],
            this.gaEvent = "name-picker"
        }
    }, {
        key: "getDataAttributes",
        value: function() {
            var e = this.resultsHolder.dataset;
            this.messages = e
        }
    }, {
        key: "bindFunctions",
        value: function() {
            this.namesInputChangeEventHandler = this.namesInputChangeEventHandler.bind(this),
            this.startButtonClickEventHandler = this.startButtonClickEventHandler.bind(this),
            this.resultHolderClickEventHandler = this.resultHolderClickEventHandler.bind(this),
            this.removeNamesButtonClickEventHandler = this.removeNamesButtonClickEventHandler.bind(this)
        }
    }, {
        key: "namesInputChangeEventHandler",
        value: function() {
            var e = this.namesInput.value;
            this.names = this.getArrayOfNames(e),
            this.filterDuplicatesOption.checked && (this.names = this.constructor.filterDuplicates(this.names));
            var t = this.names.length
              , n = 1 < t;
            this.namesInput.classList[n ? "add" : "remove"]("valid"),
            this.startButton.disabled = !n,
            this.countElem.innerText = t
        }
    }, {
        key: "getArrayOfNames",
        value: function(e) {
            if (!e)
                return [];
            this.filterSpaceOption.checked && (e = e.replace(/[ ,]+/g, ","));
            var t = e.replace(/\n/g, ",").split(",");
            return t = (t = (t = t.map(function(e) {
                return e.trim()
            })).filter(Boolean)).filter(function(e) {
                return /\S/.test(e)
            })
        }
    }, {
        key: "startButtonClickEventHandler",
        value: function() {
            for (var e = {
                winners: [],
                date: NP.getTime(),
                count: this.names.length,
                image: NP.checkImageUrl(this.settingsLogoOption.value),
                title: this.settingsTitleOption.value,
                intro: this.settingsintroOption.value
            }, t = Number(this.numberOfWinnerOption.value), n = this.filterWinnerOption.checked, s = this.filterRemoveOption.checked; t !== e.winners.length && (this.names.length !== e.winners.length || n); ) {
                var i = this.names[Math.floor(Math.random() * this.names.length)];
                (n || !n && -1 === e.winners.indexOf(i)) && e.winners.push(i)
            }
            var r = this.settingsOption.checked && e.title;
            this.resultsHolderTitle && this.resultsHolderTitle.classList[r ? "add" : "remove"]("is-hidden"),
            this.resultElem.innerHTML = this.getResultItem(e),
            NP.scrollToElem(this.resultElem, 100),
            s && this.removeWinnersFromList(e.winners),
            NP.sendGaEvent("number_of_names", this.gaEvent, this.names.length),
            NP.sendGaEvent("number_of_winners", this.gaEvent, t),
            NP.sendGaEvent("same_winner_possible", this.gaEvent, n),
            NP.sendGaEvent("remove_from_list", this.gaEvent, s),
            NP.sendGaEvent("split_by_space", this.gaEvent, this.filterSpaceOption.checked),
            NP.sendGaEvent("filter_duplicates", this.gaEvent, this.filterDuplicatesOption.checked),
            this.previousWinners.winners && this.previousWinners.winners.length && (this.previousResultElem.innerHTML = this.getResultItem(this.previousWinners, !0) + this.previousResultElem.innerHTML),
            this.previousWinners = e
        }
    }, {
        key: "getResultItem",
        value: function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1]
              , n = '\n            <div class="results__settings">\n                <div class="results__settings-intro">\n                    ' + (e.title ? '<h2 class="title title--block">' + e.title + "</h2>" : "") + "\n                    " + (e.intro ? "<p>" + e.intro + "</p>" : "") + "\n                </div>\n                " + (e.image ? '<img class="results__settings-image" src="' + e.image + '" alt=""/>' : "") + "\n            </div>\n        ";
            return "\n            " + (this.settingsOption.checked && !t ? n : "") + '\n            <div class="results__item ' + (t ? "results__item--previous" : "results__item--current") + '">\n                <div class="results__item-names">\n                ' + e.winners.map(function(e) {
                return '<span class="' + (t ? "results__previous-winners" : "results__winner") + '">' + e + "</span>"
            }).join("") + '\n                </div>\n                <div class="results__info">\n                    <span class="results__count">' + this.messages.resultsNamesLabel + ": " + e.count + '</span>\n                    <span class="results__date">(' + e.date + ')</span>\n                    <button class="results__share" onclick="window.Namepicker.openFbPopUp(this)" data-winners="' + e.winners.join(", ") + '">' + this.messages.resultsShareLabel + "</button>\n                    " + (t ? '<button class="results__remove js-remove-item" aria-label="' + this.messages.resultsRemoveLabel + '"></button>' : "") + "\n                </div>\n            </div>\n        "
        }
    }, {
        key: "openFbPopUp",
        value: function(e) {
            var t = this;
            "undefined" != typeof FB && FB.ui({
                method: "share",
                quote: this.messages.resultsShareWinnersLabel + ": " + e.getAttribute("data-winners"),
                href: this.currentUrl,
                hashtag: "#namepicker"
            }, function(e) {
                e && !e.error_message ? NP.sendGaEvent("share_winner", t.gaEvent, "shared") : NP.sendGaEvent("share_winner", t.gaEvent, "not_shared")
            })
        }
    }, {
        key: "removeWinnersFromList",
        value: function(t) {
            this.names = this.names.filter(function(e) {
                return !(-1 !== t.indexOf(e))
            }),
            this.namesInput.value = this.names.join("\n"),
            this.namesInputChangeEventHandler()
        }
    }, {
        key: "removeNamesButtonClickEventHandler",
        value: function() {
            this.namesInput.value = "",
            this.namesInputChangeEventHandler()
        }
    }, {
        key: "resultHolderClickEventHandler",
        value: function(e) {
            var t = e.target;
            "BUTTON" === t.nodeName && t.classList.contains("js-remove-item") && NP.removeElem(t.parentNode.parentNode)
        }
    }, {
        key: "addEventListeners",
        value: function() {
            this.namesInput.addEventListener("keyup", this.namesInputChangeEventHandler),
            this.namesInput.addEventListener("change", this.namesInputChangeEventHandler),
            this.filterSpaceOption.addEventListener("change", this.namesInputChangeEventHandler),
            this.filterDuplicatesOption.addEventListener("change", this.namesInputChangeEventHandler),
            this.removeNamesButton.addEventListener("click", this.removeNamesButtonClickEventHandler),
            this.startButton.addEventListener("click", this.startButtonClickEventHandler),
            this.resultsHolder.addEventListener("click", this.resultHolderClickEventHandler)
        }
    }], [{
        key: "filterDuplicates",
        value: function(n) {
            return n.filter(function(e, t) {
                return n.indexOf(e) === t
            })
        }
    }]),
    e
}();
