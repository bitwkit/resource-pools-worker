
// Dependencies

const {Worker} = require('worker_threads');
const {readyEventSym, errorEventSym, closeMethodSym} = require('resource-pools');


// Extended Worker object to match ResoursePool requirements

class WorkerResource extends Worker {
    constructor(...args) {
        super(...args);
        this.once('online', () => this.emit(readyEventSym) );
        this.once('error', () => this.emit(errorEventSym) );
        this.on('message', () => this.emit(readyEventSym) );
    }
}

WorkerResource.prototype[closeMethodSym] = function(...args) { this.terminate(...args) };


// Exports

exports.WorkerResource = WorkerResource;
