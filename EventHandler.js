"use strict"

Array.prototype.remove = function(value, onlyFirst) {
    var success = false
    for (var i = this.length; i--; ) {
        if (this[i] === value) {
            this.splice(i, 1);
            success = true;
            if (onlyFirst) return success;
        }
    }

    return success;
}
class EventHandler {

    #events;

    constructor() {
        try {
            this.#events = {};
            this.initAliases();
        }
        catch(err) {
            this.emit("error", err);
        }
    }

    initAliases() {
        try {
            this.addListener = this.on;
            this.removeListener = this.off;
            this.removeAllListeners = this.offAll;
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    ensureEventArrays(name) {
        try {
            if (!this.#events[name]) this.#events[name] = { on: [], once: [] };
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    on(name, listener) {
        try {
            this.ensureEventArrays(name);
            this.emit("newListener", name, listener);
            this.#events[name].on.push(listener);
            return this;
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    
    once(name, listener) {
        try {
            this.ensureEventArrays(name);
            this.emit("newListener", name, listener);
            this.#events[name].once.push(listener);
            return this;
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    prependListener(name, listener) {
        try {
            this.ensureEventArrays(name);
            this.emit("newListener", name, listener);
            this.#events[name].on.unshift(listener);
            return this;
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    
    prependOnceListener(name, listener) {
        try {
            this.ensureEventArrays(name);
            this.emit("newListener", name, listener);
            this.#events[name].once.unshift(listener);
            return this;
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    off(name, listener) {
        try {
            this.ensureEventArrays(name);
            var removed = this.#events[name].once.remove(listener, true);
            if (!removed) removed = this.#events[name].on.remove(listener, true);
            if (removed) this.emit("removeListener", name, listener);
            return this;
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    
    offAll(name) {
        try {
            this.#events[name].on = [];
            this.#events[name].once = [];
            return this;
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }


    emit(name, ...args) {
        try {
            var success = false;
            this.ensureEventArrays(name);
    
            var len = this.#events[name].once.length;
            if (len > 0) {
                for(var i = 0; i < len; i++) { 
                    this.#events[name].once.shift()(...args);
                }
            }
    
            if (this.#events[name].on.length > 0) {
                this.#events[name].on.forEach(listener => listener(...args));
                success = true;
            }
            return success;
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    eventNames() {
        try {
            return Object.keys(this.#events);
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    listenerCount() {
        try {
            return this.eventNames().length;
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

    listeners(name) {
        try {
            return this.#events[name];
        }
        catch(err) {
            this.emit("error", err);
        }
        
    }

}
