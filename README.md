# resource-pools-worker
Extension of a built-in 'worker' class for using as a pooled resource with [**resource-pools** package](https://www.npmjs.com/package/resource-pools).

## note
Pooled workers are supposed to get incoming data to process via an incoming message and return a message with result when done

## usage

Setup worker pool:
```javascript
const {ResourcePool} = require('resource-pools');
const {WorkerResource} = require('resource-pools-worker');

const config = {
    constructor: WorkerResource,
    arguments: [/* path to worker file */],
    maxCount: /* number of maximum pooled workers */
};
const workers = new ResourcePool(config);
```

Run job:
```javascript
workers.allocate().then( worker => {
    worker.once('message', message => { /* process received data from worker when done */ });
    worker.postMessage(/* send data to process to worker */);
});
```