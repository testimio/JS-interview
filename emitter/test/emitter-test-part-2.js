const assert = require('assert');
const EventEmitter = require('../emitter-part2.js');


describe("Emitter", function () {
    let emitter;
    beforeEach(function () {
        emitter = new EventEmitter();
    });
    it("can trigger an event", function (done) {
        emitter.on("Hello", function () {
            done();
        });
        emitter.trigger("Hello");
    });
    it("can trigger an event with data", function (done) {
        emitter.on("Hello", function (data) {
            assert.equal(data, "World");
            done();
        });
        emitter.trigger("Hello", "World");

    });
    it("only triggers events once", function (done) {
        let triggered = false;
        emitter.on("Hello", function () {
            if (triggered) throw new Error("Multiple triggers");
            triggered = true;
            setTimeout(done, 1);
        });
        emitter.trigger("Hello");
    });

    it("supports several event handlers", function (done) {
        let counter = 0;
        emitter.on("Hello", byOne);
        emitter.on("Hello", byOne);
        function byOne() {
            counter++;
            if (counter === 2) {
                done();
            }
        }
        emitter.trigger("Hello");
    });

    it("Supports multiple events", function (done) {
        let counter = 0;
        emitter.on("Hello", byOne);
        emitter.on("World", byOne);
        function byOne() {
            counter++;
            if (counter === 2) {
                done();
            }
        }
        emitter.trigger("Hello");
        emitter.trigger("World");
    });
    it("Supports multiple events", function (done) {
        let bar = new EventEmitter(), counter = 0;
        emitter.on("Hello", byOne);
        bar.on("World", byOne);
        function byOne() {
            counter++;
            if (counter === 2) {
                done();
            }
        }
        emitter.trigger("Hello");
        bar.trigger("World");
    });
    it("Does not leak events between emitters", function (done) {
        let bar = new EventEmitter(), counter = 0;
        emitter.on("Hello", byOne);
        emitter.on("World", byOne);
        function byOne() {
            counter++;
            if (counter === 2) {
                assert.fail();
            }
        }
        emitter.trigger("Hello");
        bar.trigger("World");
        setTimeout(done, 5);
    });
});

describe("Emitter event removal", function () {
    let emitter;
    beforeEach(function () {
        emitter = new EventEmitter();
    });
    it("can remove an event", function (done) {
        let i = 0;
        let off = emitter.on("inc", function () {
            i++;
            done();
        });
        emitter.trigger("inc");
        off();
        emitter.trigger("inc");
        Assert.equal(i, 1);
    });
    it("can remove and call off twice", function () {
        let i = 0;
        let off = emitter.on("inc", function () {
            i++;
        });
        emitter.trigger("inc");
        off();
        assert.equal(i, 1);
        off();
    });
    it("it removes the relevant event (1)", function () {
        let i = 0;
        let off = emitter.on("inc", function () {
            i++;
        });
        emitter.on("inc", function () {
            i++;
        });
        emitter.trigger("inc");
        off();
        emitter.trigger("inc");
        assert.equal(i, 3);
    });
    it("it removes the relevant event (2) even when calling off twice (2)", function () {
        let i = 0;
        let off = emitter.on("inc", function () {
            i++;
        });
        emitter.on("inc", function () {
            i += 2;
        });
        emitter.trigger("inc");
        off();
        off();
        emitter.trigger("inc");
        assert.equal(i, 5);
    });

    it("it removes the relevant event (3) even when calling off twice, and the same handler function was given", function () {
        let i = 0;
        const handler = function () {
            i++;
        };
        let off = emitter.on("inc", handler);
        emitter.on("inc", handler);
        emitter.trigger("inc");
        off();
        off();
        emitter.trigger("inc");
        assert.equal(i, 3);
    });
});