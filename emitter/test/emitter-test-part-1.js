const assert = require('assert');
const EventEmitter = require('../emitter-part1.js');

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