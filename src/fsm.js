class FSM {
    constructor(config) {
        this.config = config;
        this.history = [config.initial];
        this.index = 0;
    }

    getState() {
        return this.history[this.index];
    }

    changeState(state){
        if (typeof this.config.states[state] !== "undefined") {
            this.index++;
            this.history[this.index] = state;
            return;
        }
        throw new Error('Error state value');
    }

    trigger(event) {
        var state = this.config.states[this.history[this.index]].transitions[event];
        if(state !== undefined){
            this.history.length = this.index+1;
            this.changeState(state);
            return;
        }
        throw new Error('Error state event');
    }

    reset() {
        this.changeState(this.config.initial);
    }

    getStates(event) {
        let states = [];
        if (event == null) {
            states = Object.keys(this.config.states);
        } else {
            for (let state in this.config.states) {
                for (let transition in this.config.states[state].transitions) {
                    if (transition === event) {
                        states.push(state);
                    }
                }
            }
        }
        return states;
    }

    undo() {
        if (this.index > 0) {
            this.index--;
            return true;
        }
        return false;
    }

    redo() {
        if (this.index < this.history.length-1) {
            this.index++;
            return true;
        }
        return false;
    }

    clearHistory() {
        this.history = [];
        this.index = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka and DenisSoft**/
