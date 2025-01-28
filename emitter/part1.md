In this exercise we'll explore some design patterns in JavaScript.

In our first exercise you will be implementing an EventEmitter object with two methods.

### on

     .on(eventName, handler);
     
 - `eventName` string specifying the event name.
 - `handler` a function to be called whenever the event is triggered. Accepts a single `data` parameter.

### trigger

    .trigger(eventName, data);
    
 - `eventName` a string specifying the name of the event sent.
 - `data` the data to pass to receivers of the event.

For example:
```js
    var eventEmitter = new EventEmitter();
    eventEmitter.on("Hello", function(data) {
      alert(data);
    });

    // The handler will be called and an `alert` prompt will be shown with `world`.
    eventEmitter.trigger("Hello", "World");
```

For convenience, here are some unit tests for our `EventEmitter` in order to clarify its behavior.

### running tests
Name your file `Emitter.ts` and export your class/constructor as `EventEmitter`. After you `npm i` you can execute `npm run test:emitter:part1`.

**we __encourage__ to run the tests**
