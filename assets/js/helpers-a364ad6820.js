"use strict";
!function(e) {
    var s = window.NP;
    s.sendGaEvent = function(e, t, n, o) {
        if (void 0 !== e && void 0 !== t && void 0 !== n && "undefined" != typeof gtag) {
            var r = {
                event_category: t,
                event_label: n
            };
            o && (r.value = o),
            gtag("event", e, r)
        }
    }
    ,
    s.fbSettings = {
        appId: "916895771682278",
        autoLogAppEvents: !0,
        cookie: !0,
        xfbml: !0,
        version: "v6.0"
    },
    s.loadFbSdkScript = function() {
        var e, t, n, o, r;
        e = document,
        t = "script",
        n = "facebook-jssdk",
        o = void 0,
        r = e.getElementsByTagName(t)[0],
        e.getElementById(n) || ((o = e.createElement(t)).id = n,
        o.src = "https://connect.facebook.net/en_US/sdk.js",
        r.parentNode.insertBefore(o, r))
    }
    ,
    s.fbInit = function(t) {
        window.fbAsyncInit = function() {
            "undefined" != typeof FB && (FB.init(s.fbSettings),
            t && FB.getLoginStatus(function(e) {
                t(e)
            }))
        }
        ,
        s.loadFbSdkScript()
    }
    ,
    s.ajaxGet = function(e, t, n) {
        var o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null
          , r = s.toQueryString(t)
          , a = "" !== r ? e + "?" + r : e
          , i = new XMLHttpRequest;
        return i.open("GET", a, !0),
        i.onload = function() {
            200 <= i.status && i.status < 400 ? n(i.responseText) : o && o(i)
        }
        ,
        i.onerror = function(e) {
            o && o(e)
        }
        ,
        i.send(),
        i
    }
    ,
    s.parseJsonString = function(e) {
        try {
            return JSON.parse(e)
        } catch (e) {
            return !1
        }
    }
    ,
    s.toQueryString = function(t) {
        return "string" == typeof t ? t : Object.keys(t).map(function(e) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(t[e])
        }).join("&")
    }
    ,
    s.loadScript = function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null
          , n = "string" == typeof e ? e.split() : e
          , o = 0
          , r = n.length;
        function a() {
            (o += 1) === r && t && t()
        }
        n.forEach(function(e) {
            var t = -1 === e.indexOf("//") ? s.getHashedFileName(e) : e;
            s.loadJs(t, a)
        })
    }
    ,
    s.getHashedFileName = function(e) {
        return s.revManifest[e] ? s.assetsJsPath + "/" + s.revManifest[e] : e
    }
    ,
    s.loadJs = function(e, t) {
        var n = document.getElementsByTagName("script")[0]
          , o = document.createElement("script");
        return o.src = e,
        o.async = !0,
        n.parentNode.insertBefore(o, n),
        t && "function" == typeof t && (o.onload = t),
        o
    }
    ,
    s.getElementPosition = function(e) {
        for (var t = e, n = 0; t; )
            n += t.offsetTop + t.clientTop,
            t = t.offsetParent;
        return n
    }
    ,
    s.scrollToElem = function(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0
          , n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "smooth"
          , o = {
            top: s.getElementPosition(e) - t,
            left: 0,
            behavior: n
        };
        window.scrollTo(o)
    }
    ,
    s.sortByNameAcs = function(e, r) {
        return e.sort(function(e, t) {
            var n = e[r].toLowerCase()
              , o = t[r].toLowerCase();
            return n < o ? -1 : o < n ? 1 : 0
        })
    }
    ,
    s.removeElem = function(e) {
        e instanceof HTMLElement && e.parentNode.removeChild(e)
    }
    ,
    s.truncate = function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ""
          , t = arguments[1];
        return e.length > t ? e.slice(0, t - 1) + "..." : e
    }
    ,
    s.addLeadingZero = function(e) {
        return e < 10 ? "0" + e : e
    }
    ,
    s.formatDateString = function(e) {
        var t = e.substr(0, 4)
          , n = parseInt("0" === e.substr(5, 1) ? e.substr(6, 1) : e.substr(5, 2)) - 1
          , o = e.substr(8, 2)
          , r = e.substr(11, 2)
          , a = e.substr(14, 2)
          , i = e.substr(17, 2)
          , s = Date.UTC(t, n, o, r, a, i);
        return new Date(s)
    }
    ,
    s.getTime = function(e) {
        var t = e ? s.formatDateString(e) : new Date;
        return t.getFullYear() + "-" + s.addLeadingZero(t.getMonth() + 1) + "-" + s.addLeadingZero(t.getDate()) + " " + (s.addLeadingZero(t.getHours()) + ":" + s.addLeadingZero(t.getMinutes()) + ":" + s.addLeadingZero(t.getSeconds()))
    }
    ,
    s.checkImageUrl = function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
        return null !== e.match(/\.(jpeg|jpg|gif|svg|png)$/) ? e : ""
    }
    ;
    var r = document.querySelectorAll(".js-custom-toggle")
      , a = function(e) {
        var t = e.value
          , n = e.checked
          , o = document.querySelector("[data-custom-toggle=" + t + "]");
        o && o.classList[n ? "remove" : "add"]("is-hidden")
    }
      , t = function(e) {
        var t = e.target
          , n = t.type
          , o = t.name;
        "radio" === n ? Array.prototype.slice.call(r).filter(function(e) {
            return e.name === o
        }).forEach(function(e) {
            a(e)
        }) : a(t)
    };
    r.length && r.forEach(function(e) {
        e.addEventListener("change", t)
    })
}();
