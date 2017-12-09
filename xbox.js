//Copyright header goes here

function XboxController(index) {
    if (index) {
        this.index = index;
    }
    else {
        this.index = 0;
    }

    this.buttons = [
        "a",
        "b",
        "x",
        "y",
        "lb",
        "rb",
        "lt",
        "rt",
        "back",
        "start",
        "l_stick",
        "r_stick",
        "d_up",
        "d_down",
        "d_left",
        "d_right"
    ];

    this.sticks = [
        "l_stick",
        "r_stick"
    ]
}

XboxController.prototype.__getGamepad = function() {
    var connectedControllers = getAllConnectedControllers();
    if (connectedControllers.length > this.index) {
        return connectedControllers[this.index];
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
    if (controller) {
        if (controller.buttons) {
            result.buttons = {};
            for (var i = 0; i < this.buttons.length; ++i) {
                result.buttons[this.buttons[i]] = controller.buttons[i].pressed;
            }
        }
        if (controller.axes) {
            result.sticks = {};
            for (var i = 0; i < this.sticks.length; ++i) {
                var j = i * 2;
                result.sticks[this.sticks[i]] = {};
                result.sticks[this.sticks[i]].x = controller.axes[j];
                result.sticks[this.sticks[i]].y = controller.axes[j + 1];
            }
        }
    }
    return result;
};

//----------utility functions-----------------
var getAllConnectedControllers = function() {
    if (navigator.getGamepads) {
        return navigator.getGamepads();
    }
    if (navigator.webkitGetGamepads) {
        return navigator.webkitGetGamepads();
    }
    return null;
};

// Check if the browser has support for the Gamepad API. For more information about compatibility,
// see: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad
var checkBrowserCompatibility = function () {
    return !!getAllConnectedControllers();
};

