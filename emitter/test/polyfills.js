const assert = require('assert');

assert.CallTracker =  assert.CallTracker || class CallTracker {
    constructor() {
        this.id = 0;
        this.expectations = new Map();
        this.counters = new Map();
    }
    calls(count) {
        const id = this.id++;
        this.expectations.set(id, count);
        return () => {
            const prev = this.counters.get(id) || 0;
            this.counters.set(id, prev + 1);
        }
    }
    verify() {
        for (const [key, target] of  this.expectations.entries()) {
            assert.strictEqual(this.counters.get(key), target, 'Function(s) were not called the expected number of times')
        }
    }
}