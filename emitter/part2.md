We will now improve our previous implementation of the event emitter, and add an option to remove an attached event.

We will change the `on` function. It should return a function that recieves no arguments, and returns nothing, that removes the listener that was added by on.

### on

    .on(eventName, handler)

     
 - `eventName` string specifying the event name.
 - `handler` a function to be called whenever the event is triggered. Accepts a single `data` parameter.
 - returns: a function that receives no arguments, and returns nothing, that removes the listener that was added by on. 
Calling it twice should have the same effect as calling it once.

### running tests

Name your file `Emitter.ts` and export your class/constructor as `EventEmitter`. After you `npm i` you can execute `npm run test:emitter:part1`.

**We __encourage__ you to run the tests**.
