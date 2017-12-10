//Copyright header goes here

var _ = require('lodash');

describe("Xbox controller tests", function() {

    var gamepad;
    var xboxController;
    var mockNavigator;

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
                {pressed: false, value: 0}
            ],
            connected: true,
            mapping: "standard",
            timestamp: 145
        };

        xboxController = new XboxController(gamepad.index);

    });

    afterEach(function() {
        mockNavigator.restore();
    });

    it ("get all gamepads", function() {
        mockNavigator = sinon.mock(navigator);
        mockNavigator.expects("getGamepads").returns([gamepad, null, null, null]);

        var controllers = getAllConnectedControllers();
        expect(controllers).not.toBe(undefined);
        expect(controllers.length).toBe(4);
        expect(controllers[0]).not.toBe(null);

        mockNavigator.verify();
    });


    it("get all connected controllers index and id", function () {
        var gamepad2 = _.cloneDeep(gamepad);
        gamepad2.id = "PLAYSTATION controller";
        var gamepad3 = _.cloneDeep(gamepad);
        gamepad3.id = "UNKNOWN controller";
        mockNavigator = sinon.mock(navigator);
        mockNavigator.expects("getGamepads").returns([gamepad, gamepad2, gamepad3, null]);

        var controllerIDandIdx = getAllConnectedcontrollerIdAndIndex();
        expect(controllerIDandIdx).not.toBe(undefined);
        expect(controllerIDandIdx.length).toBe(3);
        expect(controllerIDandIdx[0].controllerId).toBe("Xbox 360 Controller (XInput STANDARD GAMEPAD)");
        expect(controllerIDandIdx[0].index).toBe(0);
        expect(controllerIDandIdx[1].controllerId).toBe("PLAYSTATION controller");
        expect(controllerIDandIdx[1].index).toBe(1);
        expect(controllerIDandIdx[2].controllerId).toBe("UNKNOWN controller");
        expect(controllerIDandIdx[2].index).toBe(2);

        mockNavigator.verify();
    });

    it("controller is connected", function() {
        mockNavigator = sinon.mock(navigator);
        mockNavigator.expects("getGamepads").returns([gamepad, null, null, null]);

        expect(xboxController.isControllerConnected()).toBe(true);
        mockNavigator.verify();
    })

    it("controller is disconnected", function() {
        mockNavigator = sinon.mock(navigator);
        mockNavigator.expects("getGamepads").returns([null, null, null, null]);

        expect(xboxController.isControllerConnected()).toBe(false);
        mockNavigator.verify();
    })

    it("get controller input no button pressed", function() {
        mockNavigator = sinon.mock(navigator);
        mockNavigator.expects("getGamepads").returns([gamepad, null, null, null]);

        var input = xboxController.getControllerInput();
        expect(input).not.toBe(undefined);
        expect(input.buttons).not.toBe(undefined);
        expect(input.buttons.a).toBe(false);
        expect(input.buttons.b).toBe(false);
        expect(input.buttons.x).toBe(false);
        expect(input.buttons.y).toBe(false);
        expect(input.buttons.lb).toBe(false);
        expect(input.buttons.rb).toBe(false);
        expect(input.buttons.lt).toBe(false);
        expect(input.buttons.rt).toBe(false);
        expect(input.buttons.back).toBe(false);
        expect(input.buttons.start).toBe(false);
        expect(input.buttons.l_stick).toBe(false);
        expect(input.buttons.r_stick).toBe(false);
        expect(input.buttons.d_up).toBe(false);
        expect(input.buttons.d_down).toBe(false);
        expect(input.buttons.d_left).toBe(false);
        expect(input.buttons.d_right).toBe(false);

        mockNavigator.verify();
    });

    it("get controller input x and d_right pressed", function() {
        mockNavigator = sinon.mock(navigator);
        gamepad.buttons[2] = {pressed: true, value: 1},
        gamepad.buttons[15] = {pressed: true, value: 1},
        mockNavigator.expects("getGamepads").returns([gamepad, null, null, null]);

        var input = xboxController.getControllerInput();
        expect(input).not.toBe(undefined);
        expect(input.buttons).not.toBe(undefined);
        expect(input.buttons.a).toBe(false);
        expect(input.buttons.b).toBe(false);
        expect(input.buttons.x).toBe(true);
        expect(input.buttons.y).toBe(false);
        expect(input.buttons.lb).toBe(false);
        expect(input.buttons.rb).toBe(false);
        expect(input.buttons.lt).toBe(false);
        expect(input.buttons.rt).toBe(false);
        expect(input.buttons.back).toBe(false);
        expect(input.buttons.start).toBe(false);
        expect(input.buttons.l_stick).toBe(false);
        expect(input.buttons.r_stick).toBe(false);
        expect(input.buttons.d_up).toBe(false);
        expect(input.buttons.d_down).toBe(false);
        expect(input.buttons.d_left).toBe(false);
        expect(input.buttons.d_right).toBe(true);

        mockNavigator.verify();
    });

    it("get sticks middle position", function() {
        mockNavigator = sinon.mock(navigator);
        mockNavigator.expects("getGamepads").returns([gamepad, null, null, null]);

        var input = xboxController.getControllerInput();
        expect(input).not.toBe(undefined);
        expect(input.sticks).not.toBe(undefined);
        expect(input.sticks.l_stick.x).toBe(0);
        expect(input.sticks.l_stick.y).toBe(0);
        expect(input.sticks.r_stick.x).toBe(0);
        expect(input.sticks.r_stick.y).toBe(0);

        mockNavigator.verify();
    });

});