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

    on(name, listener) {
        if (!this.#events[name]) this.#events[name] = [];
        this.#events[name].push(listener);
    }

    off(name, listener) {
        if (this.#events[name]) this.#events[name].remove(listener);
    }

    emit(name, ...args) {
        this.#events[name].forEach(listener => listener(...args));
    }

}
