require('./polyfills.js');
const assert = require('assert');
const EventEmitter = require('../emitter.js');


describe("Emitter", function () {
    let emitter;
    let tracker;
    beforeEach(() => {
        emitter = new EventEmitter();
        tracker = new assert.CallTracker();
    });

    it("can trigger an event", function (done) {   
        emitter.on("Hello", () => done());
        emitter.trigger("Hello");
    });
    it("can trigger an event with data", function () {
        emitter.on("Hello", (data) => {
            assert.equal(data, "World");
        });
        emitter.trigger("Hello", "World");

    });
    it("Can trigger a event with no handlers", function () {
        emitter.trigger("Hello");
    });
    it("only triggers events once", function () {
        const trackedFunction = tracker.calls(1);

        emitter.on("Hello", trackedFunction);
        emitter.trigger("Hello");

        tracker.verify();
    });

    it("supports several event handlers", function () {
        const trackedFunction = tracker.calls(1);
        const trackedFunction1 = tracker.calls(1);

        emitter.on("Hello", trackedFunction);
        emitter.on("Hello", trackedFunction1);
        emitter.trigger("Hello");

        tracker.verify();
    });
    
    it("supports same function multiple times", function () {
        const trackedFunction = tracker.calls(2);

        emitter.on("Hello", trackedFunction);
        emitter.on("Hello", trackedFunction);
        emitter.trigger("Hello");

        tracker.verify();
    });

    it("Supports multiple event triggers same function", function () {
        const trackedFunction = tracker.calls(2);

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction);
        emitter.trigger("Hello");
        emitter.trigger("World");

        tracker.verify();
    });

    it("Supports multiple event triggers different function", function () {
        const trackedFunction = tracker.calls(1);
        const trackedFunction1 = tracker.calls(1);

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction1);
        emitter.trigger("Hello");
        emitter.trigger("World");

        tracker.verify();
    });

    it("Supports multiple events", function () {
        const bar = new EventEmitter();
        const trackedFunction = tracker.calls(2);

        emitter.on("Hello", trackedFunction);
        bar.on("World", trackedFunction);
    
        
        emitter.trigger("Hello");
        bar.trigger("World");

        tracker.verify();
    });
    it("Does not leak events between emitters", function () {
        const bar = new EventEmitter();
        const trackedFunction = tracker.calls(1);

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction);
        emitter.trigger("Hello");

        bar.trigger("World");
        tracker.verify();
    });
});

describe("Emitter event removal", function () {
    let emitter;
    let tracker;
    beforeEach(() => {
        emitter = new EventEmitter();
        tracker = new assert.CallTracker();
    });
    it("can remove an event", function () {
        const trackedFunction = tracker.calls(1);

        const off = emitter.on("inc", trackedFunction);
        emitter.trigger("inc");
        off();
        emitter.trigger("inc");

        tracker.verify();
    });
    it("can remove and call off twice", function () {
        const trackedFunction = tracker.calls(1);

        const off = emitter.on("inc", trackedFunction);
        emitter.trigger("inc");
        off();
        off();

        tracker.verify();
    });
    it("it removes the relevant event", function () {
        const trackedFunction = tracker.calls(1);
        const trackedFunction1 = tracker.calls(2);

        const off = emitter.on("inc", trackedFunction);
        emitter.on("inc", trackedFunction1);
        emitter.trigger("inc");
        off();
        emitter.trigger("inc");
        
        tracker.verify();
    });
    it("it removes the relevant event even when calling off twice", function () {
        const trackedFunction = tracker.calls(1);
        const trackedFunction1 = tracker.calls(2);

        const off = emitter.on("inc", trackedFunction);
        emitter.on("inc", trackedFunction1);
        emitter.trigger("inc");
        off();
        off();
        emitter.trigger("inc");

        tracker.verify();
    });

    it("it removes the relevant event even when calling off twice, and the same handler function was given", function () {
        const trackedFunction = tracker.calls(3);

        const off = emitter.on("inc", trackedFunction);
        emitter.on("inc", trackedFunction);
        emitter.trigger("inc");
        off();
        off();
        emitter.trigger("inc");

        tracker.verify();
    });

    it("two offs test", function () {
        const trackedFunction = tracker.calls(1);
        const trackedFunction1 = tracker.calls(2);

        const off1 = emitter.on("inc", trackedFunction);
        const off2 = emitter.on("inc", trackedFunction1);

        emitter.trigger("inc");
        off1();
        emitter.trigger("inc");       
        off2();
        emitter.trigger("inc");     

        tracker.verify();
    });
});
