window.onload = function() {
    var xboxController = new XboxController();

    xboxController.onControllerConnected(function () {
        console.log("connected");
    });

    xboxController.onControllerDisconnected(function () {
        console.log("disconnected");
    });

    var label = document.getElementById("buttons");

    console.log("LABEL:", label);

    window.setInterval(
        function () {
            //console.log(xboxController.getControllerInput().buttons);
            var buttons = xboxController.getControllerInput().buttons;
            var text = "";
            var i = 0;
            buttons.forEach(function(button) {
               text += i + "." + button.pressed + " ";
               ++i;
            });
            label.innerHTML = "Buttons:" + text;
        }, 500);
};

