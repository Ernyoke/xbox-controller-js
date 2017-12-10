window.onload = function() {
    var xboxController = new XboxController();

    xboxController.onControllerConnected(function () {
        console.log("connected");
    });

    xboxController.onControllerDisconnected(function () {
        console.log("disconnected");
    });

    var htmlElements = {
        a: document.getElementById("a"),
        b: document.getElementById("b"),
        x: document.getElementById("x"),
        y: document.getElementById("y"),
        lb: document.getElementById("lb"),
        rb: document.getElementById("rb"),
        lt: document.getElementById("lt"),
        rt: document.getElementById("rt"),
        back: document.getElementById("back"),
        start: document.getElementById("start"),
        l_stick: document.getElementById("l_stick"),
        r_stick: document.getElementById("r_stick"),
        d_up: document.getElementById("d_up"),
        d_down: document.getElementById("d_down"),
        d_left: document.getElementById("d_left"),
        d_right: document.getElementById("d_right"),

        l_stick_x: document.getElementById("l_stick_x"),
        l_stick_y: document.getElementById("l_stick_y"),
        r_stick_x: document.getElementById("r_stick_x"),
        r_stick_y: document.getElementById("r_stick_y")

    };

    window.setInterval(
        function () {
            var inputs = xboxController.getControllerInput();
            var buttons = inputs.buttons;
            for (var btn in buttons) {
                if(buttons[btn]) {
                    htmlElements[btn].innerText = "pressed";
                }
                else {
                    htmlElements[btn].innerText = "not pressed";
                }
            }

            var sticks = inputs.sticks;
            htmlElements.l_stick_x.innerText = sticks.l_stick.x;
            htmlElements.l_stick_y.innerText = sticks.l_stick.y;
            htmlElements.r_stick_x.innerText = sticks.r_stick.x;
            htmlElements.r_stick_y.innerText = sticks.r_stick.y;
        }, 500);
};

