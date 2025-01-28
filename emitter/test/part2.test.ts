import { describe, it, beforeEach, expect, vi } from 'vitest';
import EventEmitter from '../Emitter';

describe("Emitter", () => {
    let emitter;
    let tracker;

    beforeEach(() => {
        emitter = new EventEmitter();
        tracker = vi.fn();
    });

    it("can trigger an event", () => {
        const done = vi.fn();
        emitter.on("Hello", done);
        emitter.trigger("Hello");

        expect(done).toHaveBeenCalled();
    });

    it("can trigger an event with data", () => {
        const handler = vi.fn((data) => {
            expect(data).toBe("World");
        });

        emitter.on("Hello", handler);
        emitter.trigger("Hello", "World");

        expect(handler).toHaveBeenCalled();
    });

    it("can trigger an event with no handlers", () => {
        expect(() => emitter.trigger("Hello")).not.toThrow();
    });

    it("only triggers events once", () => {
        const trackedFunction = vi.fn();

        emitter.on("Hello", trackedFunction);
        emitter.trigger("Hello");

        expect(trackedFunction).toHaveBeenCalledTimes(1);
    });

    it("supports several event handlers", () => {
        const trackedFunctionOne = vi.fn();
        const trackedFunctionTwo = vi.fn();

        emitter.on("Hello", trackedFunctionOne);
        emitter.on("Hello", trackedFunctionTwo);

        emitter.trigger("Hello");

        expect(trackedFunctionOne).toHaveBeenCalledTimes(1);
        expect(trackedFunctionTwo).toHaveBeenCalledTimes(1);
    });

    it("supports same function multiple times", () => {
        const trackedFunction = vi.fn();

        emitter.on("Hello", trackedFunction);
        emitter.on("Hello", trackedFunction);

        emitter.trigger("Hello");

        expect(trackedFunction).toHaveBeenCalledTimes(2);
    });

    it("supports multiple event triggers same function", () => {
        const trackedFunction = vi.fn();
        const trackedFunctionNotToBeInvoked = vi.fn();

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction);

        emitter.trigger("Hello");
        emitter.trigger("World");

        expect(trackedFunction).toHaveBeenCalledTimes(2);
        expect(trackedFunctionNotToBeInvoked).toHaveBeenCalledTimes(0);
    });

    it("supports multiple event triggers different function", () => {
        const trackedFunction = vi.fn();
        const trackedFunction1 = vi.fn();

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction1);

        emitter.trigger("Hello");
        emitter.trigger("World");

        expect(trackedFunction).toHaveBeenCalledTimes(1);
        expect(trackedFunction1).toHaveBeenCalledTimes(1);
    });

    it("supports multiple events", () => {
        const otherEventEmitter = new EventEmitter();
        const trackedFunction = vi.fn();

        emitter.on("Hello", trackedFunction);
        otherEventEmitter.on("World", trackedFunction);

        emitter.trigger("Hello");
        otherEventEmitter.trigger("World");

        expect(trackedFunction).toHaveBeenCalledTimes(2);
    });

    it("does not leak events between emitters", () => {
        const otherEventEmitter = new EventEmitter();
        const trackedFunction = vi.fn();

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction);
        emitter.trigger("Hello");

        otherEventEmitter.trigger("World");
        expect(trackedFunction).toHaveBeenCalledTimes(1);
    });
});

describe("Emitter event removal", () => {
    let emitter;
    let tracker;

    beforeEach(() => {
        emitter = new EventEmitter();
        tracker = vi.fn();
    });

    it("can remove an event", () => {
        const trackedFunction = vi.fn();

        const off = emitter.on("inc", trackedFunction);
        emitter.emit("inc");
        off();
        emitter.emit("inc");

        expect(trackedFunction).toHaveBeenCalledTimes(1);
    });

    it("can remove and call off twice", () => {
        const trackedFunction = vi.fn();

        const off = emitter.on("inc", trackedFunction);
        emitter.emit("inc");
        off();
        off();

        expect(trackedFunction).toHaveBeenCalledTimes(1);
    });

    it("removes the relevant event", () => {
        const firstTrackedFunction = vi.fn();
        const secondTrackedFunction = vi.fn();

        const off = emitter.on("inc", firstTrackedFunction);
        emitter.on("inc", secondTrackedFunction);
        emitter.emit("inc");
        off();
        emitter.emit("inc");

        expect(firstTrackedFunction).toHaveBeenCalledTimes(1);
        expect(secondTrackedFunction).toHaveBeenCalledTimes(2);
    });

    it("removes the relevant event even when calling off twice", () => {
        const firstTrackedFunction = vi.fn();
        const secondTrackedFunction = vi.fn();

        const off = emitter.on("inc", firstTrackedFunction);
        emitter.on("inc", secondTrackedFunction);
        emitter.emit("inc");
        off();
        off();
        emitter.emit("inc");

        expect(firstTrackedFunction).toHaveBeenCalledTimes(1);
        expect(secondTrackedFunction).toHaveBeenCalledTimes(2);
    });

    it("removes the relevant event even when calling off twice, and the same handler function was given", () => {
        const trackedFunction = vi.fn();

        const off = emitter.on("inc", trackedFunction);
        emitter.on("inc", trackedFunction);
        emitter.emit("inc");
        off();
        off();
        emitter.emit("inc");

        expect(trackedFunction).toHaveBeenCalledTimes(3);
    });

    it("two offs test", () => {
        const firstTrackedFunction = vi.fn();
        const secondTrackedFunction = vi.fn();

        const off1 = emitter.on("inc", firstTrackedFunction);
        const off2 = emitter.on("inc", secondTrackedFunction);

        emitter.emit("inc");
        off1();
        emitter.emit("inc");
        off2();
        emitter.emit("inc");

        expect(firstTrackedFunction).toHaveBeenCalledTimes(1);
        expect(secondTrackedFunction).toHaveBeenCalledTimes(2);
    });
});
