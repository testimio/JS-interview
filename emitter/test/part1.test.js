require('./polyfills.js');
const assert = require('assert');
const EventEmitter = require('../emitter.js');

describe("Emitter", () => {
    let emitter;
    let tracker;
    beforeEach(() => {
        emitter = new EventEmitter();
        tracker = new assert.CallTracker();
    });

    it("can trigger an event", (done) => {   
        emitter.on("Hello", () => done());
        emitter.trigger("Hello");
    });

    it("can trigger an event with data", () => {
        emitter.on("Hello", (data) => {
            assert.equal(data, "World");
        });
        emitter.trigger("Hello", "World");

    });

    it("can trigger a event with no handlers", () => {
        emitter.trigger("Hello");
    });

    it("only triggers events once", () => {
        const trackedFunction = tracker.calls(1);

        emitter.on("Hello", trackedFunction);
        emitter.trigger("Hello");

        tracker.verify();
    });

    it("supports several event handlers", () => {
        const trackedFunction = tracker.calls(1);
        const trackedFunction1 = tracker.calls(1);

        emitter.on("Hello", trackedFunction);
        emitter.on("Hello", trackedFunction1);
        emitter.trigger("Hello");

        tracker.verify();
    });
    
    it("supports same function multiple times", () => {
        const trackedFunction = tracker.calls(2);

        emitter.on("Hello", trackedFunction);
        emitter.on("Hello", trackedFunction);
        emitter.trigger("Hello");

        tracker.verify();
    });

    it("supports multiple event triggers same function", () => {
        const trackedFunction = tracker.calls(2);

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction);
        emitter.trigger("Hello");
        emitter.trigger("World");

        tracker.verify();
    });

    it("supports multiple event triggers different function", () => {
        const trackedFunction = tracker.calls(1);
        const trackedFunction1 = tracker.calls(1);

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction1);
        emitter.trigger("Hello");
        emitter.trigger("World");

        tracker.verify();
    });

    it("supports multiple events", () => {
        const bar = new EventEmitter();
        const trackedFunction = tracker.calls(2);

        emitter.on("Hello", trackedFunction);
        bar.on("World", trackedFunction);
    
        
        emitter.trigger("Hello");
        bar.trigger("World");

        tracker.verify();
    });

    it("does not leak events between emitters", () => {
        const bar = new EventEmitter();
        const trackedFunction = tracker.calls(1);

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction);
        emitter.trigger("Hello");

        bar.trigger("World");
        tracker.verify();
    });
});
