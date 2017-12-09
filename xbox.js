//Copyright header goes here

function XboxController(index) {
    if (index) {
        this.index = index;
    }
    else {
        this.index = 0;
    }

    this.buttons = [
        "A",
        "B",
        "X",
        "Y",
        "LB",
        "RB",
        "LT",
        "RT",
        "BACK",
        "START",
        "L_STICK",
        "R_STICK",
        "D_UP",
        "D_DOWN",
        "D_LEFT",
        "D_RIGHT"
    ]
}

XboxController.prototype.__getGamepad = function() {
    var connectedControllers = getAllConnectedControllers();
    if (connectedControllers.length > this.index) {
        return getAllConnectedControllers()[this.index];
    }
    return null;
};

XboxController.prototype.onControllerConnected = function(callback) {
    window.addEventListener("gamepadconnected", function (event) {
        if (this.index === event.gamepad.index) {
            if (callback) {
                callback();
            }
        }
    });
};

XboxController.prototype.onControllerDisconnected = function(callback) {
    window.addEventListener("gamepaddisconnected", function (event) {
        if (this.index === event.gamepad.index) {
            if (callback) {
                callback();
            }
        }
    });
};

XboxController.prototype.isControllerConnected = function() {
    var controller = this.__getGamepad();
    if (controller) {
        return controller.connected;
    }
    return false;
};

XboxController.prototype.getControllerInput = function() {
    var controller = this.__getGamepad();
    var result = {};
    if (controller && controller.buttons) {
        for (var i = 0; i < this.buttons.length; ++i) {
            result[this.buttons[i]] = controller.buttons[i];
        }
    }
    return result;
};

//----------utility functions-----------------
var getAllConnectedControllers = function() {
    return navigator.getGamepads();
};

// Check if the browser has support for the Gamepad API. For more information about compatibility,
// see: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad
var checkBrowserCompatibility = function () {
    return !!getAllConnectedControllers();
};

