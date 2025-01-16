import { describe, it, beforeEach, expect, vi } from 'vitest';
import EventEmitter from '../Emitter';

describe('Emitter', () => {
    let emitter;
    let tracker;

    beforeEach(() => {
        emitter = new EventEmitter();
        tracker = vi.fn();
    });

    it('can trigger an event', () => {
        const callback = vi.fn();
        emitter.on('Hello', callback);
        emitter.trigger('Hello');
        expect(callback).toHaveBeenCalled();
    });

    it('can trigger an event with data', () => {
        const callback = vi.fn();
        emitter.on('Hello', callback);
        emitter.trigger('Hello', 'World');
        expect(callback).toHaveBeenCalledWith('World');
    });

    it('can trigger an event with no handlers', () => {
        emitter.trigger('Hello');
    });

    it('only triggers events once', () => {
        const trackedFunction = vi.fn();
        emitter.on('Hello', trackedFunction);
        emitter.trigger('Hello');
        expect(trackedFunction).toHaveBeenCalledTimes(1);
    });

    it('supports several event handlers', () => {
        const trackedFunction = vi.fn();
        const trackedFunction1 = vi.fn();

        emitter.on('Hello', trackedFunction);
        emitter.on('Hello', trackedFunction1);
        emitter.trigger('Hello');

        expect(trackedFunction).toHaveBeenCalledTimes(1);
        expect(trackedFunction1).toHaveBeenCalledTimes(1);
    });

    it('supports the same function multiple times', () => {
        const trackedFunction = vi.fn();

        emitter.on('Hello', trackedFunction);
        emitter.on('Hello', trackedFunction);
        emitter.trigger('Hello');

        expect(trackedFunction).toHaveBeenCalledTimes(2);
    });
});
