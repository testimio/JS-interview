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

    var f = new EventEmitter();
    f.on("Hello", function(data){
      alert(data);
    });
    // the handler will be called and an `alert` prompt will be shown with `world`
    f.trigger("Hello", "World"); 
    
For convenience, here are some unit tests for our `EventEmitter` in order to clarify its behavior.

### running tests
Name your file `emitter-part-1.js` and export your class/constructor as `EventEmitter`. After you `npm i` you can execute `npm run test`.

**we __encourage__ to run the tests**
    
    describe("Emitter", function () {
         let emitter;
         beforeEach(function () {
             emitter = new EventEmitter();
         });
         it("can trigger an event", function (done) {        
             emitter.on("Hello", function () {
                 done();
             });
             emitter.trigger("Hello");
         });
         it("can trigger an event with data", function (done) {
             emitter.on("Hello", function (data) {
                 assert.equal(data, "World");
                 done();
             });
             emitter.trigger("Hello", "World");

         });
         it("only triggers events once", function (done) {
             let triggered = false;
             emitter.on("Hello", function () {
                 if (triggered) throw new Error("Multiple triggers");
                 triggered = true;
                 setTimeout(done, 1);
             });
             emitter.trigger("Hello");
         });

         it("supports several event handlers", function (done) {
             let counter = 0;
             emitter.on("Hello", byOne);
             emitter.on("Hello", byOne);
             function byOne() {
                 counter++;
                 if (counter === 2) {
                     done();
                 }
             }
             emitter.trigger("Hello");
         });

         it("Supports multiple events", function (done) {
             let counter = 0;
             emitter.on("Hello", byOne);
             emitter.on("World", byOne);
             function byOne() {
                 counter++;
                 if (counter === 2) {
                     done();
                 }
             }
             emitter.trigger("Hello");
             emitter.trigger("World");
         });
         it("Supports multiple events", function (done) {
             let bar = new EventEmitter(), counter = 0;
             emitter.on("Hello", byOne);
             bar.on("World", byOne);
             function byOne() {
                 counter++;
                 if (counter === 2) {
                     done();
                 }
             }
             emitter.trigger("Hello");
             bar.trigger("World");
         });
         it("Does not leak events between emitters", function (done) {
             let bar = new EventEmitter(), counter = 0;
             emitter.on("Hello", byOne);
             emitter.on("World", byOne);
             function byOne() {
                 counter++;
                 if (counter === 2) {
                     assert.fail();
                 }
             }
             emitter.trigger("Hello");
             bar.trigger("World");
             setTimeout(done, 5);
         });
    });