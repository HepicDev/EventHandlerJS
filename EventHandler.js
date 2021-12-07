"use strict"

Array.prototype.remove = function(value) {
    for (var i = this.length; i--; )
    {
        if (this[i] === value) {
            this.splice(i, 1);
        }
    }
}


class EventHandler {

    #events;

    constructor() {
        this.#events = {};
    }

    ensureEventArrays(name) {
        if (!this.#events[name]) this.#events[name] = { on: [], once: [] };
    }

    on(name, listener) {
        this.ensureEventArrays(name)
        this.#events[name].on.push(listener);
    }

    once(name, listener) {
        this.ensureEventArrays(name)
        this.#events[name].once.push(listener);
    }

    off(name, listener, onceToo) {
        if (this.#events[name]) {
            this.#events[name].on.remove(listener);
            if (onceToo) this.#events[name].once.remove(listener);
        }
    }

    emit(name, ...args) {
        this.#events[name].on.forEach(listener => listener(...args));
        this.#events[name].once.forEach(listener => listener(...args));
        this.#events[name].once = [];
    }

}

