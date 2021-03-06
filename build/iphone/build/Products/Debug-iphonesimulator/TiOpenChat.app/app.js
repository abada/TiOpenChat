var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.appOnline = true;

Alloy.Globals.appStartProcess = true;

var Parse, dump, __slice = [].slice;

Alloy.Globals.dump = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return Ti.API.debug(JSON.stringify(args, void 0, 2));
};

Parse = require("ti-parse")({
    applicationId: Ti.App.Properties.getString("Parse_AppId"),
    javaScriptKey: Ti.App.Properties.getString("Parse_JsKey")
});

Alloy.Globals.currentLanguage = Titanium.Locale.getCurrentLanguage().toLowerCase().substr(0, 2) || "en";

Alloy.Globals.moment = require("momentExtend");

Alloy.Globals.moment.lang(Alloy.Globals.currentLanguage);

Alloy.Globals.Q = require("q");

Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.stopWaiting = function() {
    Alloy.Globals.loading.hide();
};

Alloy.Globals.startWaiting = function(msg) {
    var defaultLoadingMsg = L("c_waitingMsgDefault");
    var loadingMessage = L(msg) || defaultLoadingMsg;
    Alloy.Globals.loading.show(loadingMessage, false);
};

var toast = Alloy.createWidget("nl.fokkezb.toast", "global", {});

Alloy.Globals.toast = function(msg) {
    var defaultToastMsg = L("c_waitingMsgDefault");
    var toastMessage = L(msg) || defaultToastMsg;
    toast.show(toastMessage);
};

Alloy.Globals.error = function(msg) {
    var defaultToastMsg = L("c_waitingMsgDefault");
    var toastMessage = L(msg) || defaultToastMsg;
    toast.error(toastMessage);
};

Alloy.Globals.settings = Alloy.Models.instance("settings");

Alloy.Globals.settings.fetch();

Ti.UI.backgroundColor = "#8B61FF";

Alloy.Globals.DATE_FORMAT = "YYYY/MM/DD HH:mm:ss.SSS";

Alloy.Globals.ImageWidth = 1080;

Alloy.Globals.ImageQuality = .8;

Alloy.Globals.thumbWidth = 576;

Alloy.Globals.inputLimit = {
    name: 10,
    comment: 30
};

Ti.App.addEventListener("changeBadge", function(e) {
    Ti.UI.iPhone.setAppBadge(e.number);
});

!function() {
    var platformVersionInt = parseInt(Ti.Platform.version, 10);
    var platformHeight = Ti.Platform.displayCaps.platformHeight;
    Alloy.Globals.is = {
        iOS7: true && 7 == platformVersionInt,
        iOS8: true && platformVersionInt >= 8,
        talliPhone: true && 568 == platformHeight,
        iPhone6: true && 667 == platformHeight,
        iPhone6Plus: true && 736 == platformHeight,
        shortPhone: 568 > platformHeight
    };
}();

!function() {
    var winStack = [];
    Alloy.Globals.openWindow = function(controller, args) {
        "string" == typeof controller && (controller = Alloy.createController(controller));
        var win = controller.getView();
        Alloy.Globals.currentWindow = win;
        winStack.push(win);
        win.addEventListener("close", function() {
            Alloy.Globals.currentWindow = null;
            winStack = _.without(winStack, win);
            Ti.API.debug(arguments.callee);
            win.removeEventListener("close", arguments.callee);
        });
        Alloy.Globals.navigation.openWindow(win, args);
    };
    Alloy.Globals.closeAllWindow = function() {
        for (var i = winStack.length - 1; i >= 0; i--) winStack[i].close();
    };
}();

Alloy.Globals.util = {
    zeroPad: function(n, width, z) {
        "string" == typeof n && (n = parseInt(n));
        z = z || "0";
        n += "";
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    },
    notExist: function(o) {
        return _.isUndefined(o) || _.isNull(o) || _.isNaN(o) ? true : false;
    },
    exist: function(o) {
        return !this.notExist(o);
    },
    getNumberOnly: function(val) {
        val = new String(val);
        var regex = /[^0-9]/g;
        val = val.replace(regex, "");
        return val;
    }
};

Alloy.Globals.alert = function(msg) {
    var msg = L(msg) || L("c_alertMsgDefault");
    alert(msg);
    Alloy.Globals.stopWaiting();
};

Alloy.createController("index");