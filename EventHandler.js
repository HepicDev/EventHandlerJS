"use strict"

Array.prototype.remove = function(value, onlyFirst) {
    var success = false
    for (var i = this.length; i--; ) {
        if (this[i] === value) {
            this.splice(i, 1);
            success = true
            if (onlyFirst) return success
        }
    }

    return success
}
class EventHandler {

    #events;

    constructor() {
        this.#events = {};
        this.initAliases()
    }

    initAliases() {
        this.addListener = this.on;
        this.removeListener = this.off
        this.removeAllListeners = this.offAll
    }

    ensureEventArrays(name) {
        if (!this.#events[name]) this.#events[name] = { on: [], once: [] };
    }

    on(name, listener) {
        this.emit("newListener", name, listener)
        this.ensureEventArrays(name);
        this.#events[name].on.push(listener);
        return this
    }

    
    once(name, listener) {
        this.emit("newListener", name, listener)
        this.ensureEventArrays(name);
        this.#events[name].once.push(listener);
        return this
    }

    off(name, listener) {
        this.ensureEventArrays(name)
        var removed = this.#events[name].once.remove(listener, true);
        if (!removed) removed = this.#events[name].on.remove(listener, true);
        if (removed) this.emit("removeListener", name, listener)
        return this
    }

    
    offAll(name) {
        this.#events[name].on = []
        this.#events[name].once = []
        return this
    }


    emit(name, ...args) {
        var success = false
        this.ensureEventArrays(name);
        if (this.#events[name].once.length > 0) {
            this.#events[name].once.forEach(listener => listener(...args));
            success = true
        }

        this.#events[name].once = [];
        if (this.#events[name].on.length > 0) {
            this.#events[name].on.forEach(listener => listener(...args));
            success = true
        }
        return success
    }

    eventNames() {
        return Object.keys(this.#events);
    }

}


