class FSM {
    constructor(config) {
        this.config = config;
        this.state = config.initial;
        this.history = [];
        this.canceledHistory = [];
        this.index = 0;
    }

    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    /////////////////////////////////////
    changeStateAlter(state) {
        if (typeof this.config.states[state] !== "undefined") {
            this.history.push(this.state);
            this.state = state;
            return;
        }
        throw new Error('Wrong state value');
    }

        // for (let configuredState in this.config.states) {
        //     if (state === configuredState){
        //         this.history.push(this.state);
        //         this.state = state.toLowerCase();
        //         return;
        //     }
        // }
        // throw new Error('Wrong state value');

//////////////////////////////////////////
    changeState(state){
        this.canceledHistory = [];
        if (typeof this.config.states[state] !== "undefined") {
            this.history.push(this.state);
            this.state = state;
            return;
        }
        throw new Error('Error state value');
    }

    trigger(event) {
        return this.changeState(this.config.states[this.state].transitions[event]);
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

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length > 0) {
            this.canceledHistory.push(this.state);
            this.changeStateAlter(this.history[this.history.length-1]);
            this.history.pop();
            this.history.pop();
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.canceledHistory.length > 0) {
            this.changeStateAlter(this.canceledHistory[this.canceledHistory.length-1]);
            this.canceledHistory.pop();
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.canceledHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
