export class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(eventName, handler) {
        if (!this.events[eventName]) this.events[eventName] = []
        this.events[eventName].push(handler)
    }

    trigger(eventName, data) {
        if (!this.events[eventName]) return
        this.events[eventName].forEach(callback => {
            callback(data)
        })
    }
}

