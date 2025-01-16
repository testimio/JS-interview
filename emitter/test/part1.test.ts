// @ts-nocheck
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
        const trackedFunction = vi.fn();
        const trackedFunction1 = vi.fn();

        emitter.on("Hello", trackedFunction);
        emitter.on("Hello", trackedFunction1);
        emitter.trigger("Hello");

        expect(trackedFunction).toHaveBeenCalledTimes(1);
        expect(trackedFunction1).toHaveBeenCalledTimes(1);
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

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction);
        emitter.trigger("Hello");
        emitter.trigger("World");

        expect(trackedFunction).toHaveBeenCalledTimes(2);
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
        const bar = new EventEmitter();
        const trackedFunction = vi.fn();

        emitter.on("Hello", trackedFunction);
        bar.on("World", trackedFunction);

        emitter.trigger("Hello");
        bar.trigger("World");

        expect(trackedFunction).toHaveBeenCalledTimes(2);
    });

    it("does not leak events between emitters", () => {
        const bar = new EventEmitter();
        const trackedFunction = vi.fn();

        emitter.on("Hello", trackedFunction);
        emitter.on("World", trackedFunction);
        emitter.trigger("Hello");

        bar.trigger("World");
        expect(trackedFunction).toHaveBeenCalledTimes(1);
    });
});