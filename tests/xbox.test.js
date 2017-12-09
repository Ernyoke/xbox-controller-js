
describe("Xbox controller tests", function() {

    var gamepad;
    var xboxController;

    beforeEach(function () {
        gamepad = {
            id: "Xbox 360 Controller (XInput STANDARD GAMEPAD)",
            axes: [0, 0, 0, 0],
            buttons: [
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
                {pressed: false, value: 0},
            ],
            connected: true,
            mapping: "standard",
            timestamp: 145
        };

        xboxController = new XboxController(gamepad.index);
    });

    it("controller is connected", function() {
        var mock = sinon.mock(xboxController);
        mock.expects("__getGamepad").once().returns(gamepad);

        expect(xboxController.isControllerConnected()).toBe(true);

        mock.verify();
    })

    it("controller is disconnected", function() {
        var mock = sinon.mock(xboxController);
        mock.expects("__getGamepad").once().returns(null);

        expect(xboxController.isControllerConnected()).toBe(false);

        mock.verify();
    })

});