We will now improve our previous implementation of the event emitter, and add an option to remove an attached event.

We will change the on function. It should return a function that recieves no arguments, and returns nothing, that removes the listener that was added by on.

###on

    .on(eventName, handler)
     
 - `eventName` string specifying the event name.
 - `handler` a function to be called whenever the event is triggered. Accepts a single `data` parameter.
 - returns: a function that recieves no arguments, and returns nothing, that removes the listener that was added by on. 
    Calling it twice should have the same effect as calling it once.

Here are some tests that check the behavior. **We __encourage__ you to run the tests**.
  
      describe("Emitter event removal", function () {
        let emitter;
        beforeEach(function () {
            emitter = new EventEmitter();
        });
        it("can remove an event", function (done) {
            let i = 0;
            let off = emitter.on("inc", function () {
                i++;
                done();
            });
            emitter.trigger("inc");
            off();
            emitter.trigger("inc");
            Assert.equal(i, 1);
        });
        it("can remove and call off twice", function () {
            let i = 0;
            let off = emitter.on("inc", function () {
                i++;           
            });
            emitter.trigger("inc");
            off();
            assert.equal(i, 1);
            off();        
        });
        it("it removes the relevant event (1)", function () {
            let i = 0;
            let off = emitter.on("inc", function () {
                i++;
            });
            emitter.on("inc", function () {
                i++;
            });
            emitter.trigger("inc");
            off();
            emitter.trigger("inc");
            assert.equal(i, 3);
        });
        it("it removes the relevant event (2) even when calling off twice", function () {
            let i = 0;
            let off = emitter.on("inc", function () {
                i++;
            });
            emitter.on("inc", function () {
                i += 2;
            });
            emitter.trigger("inc");
            off();
            off();
            emitter.trigger("inc");
            assert.equal(i, 5);
        });

        it("it removes the relevant event (3) even when calling off twice, and the same handler function was given", function () {
            let i = 0;
            const handler = function () {
                i++;
            };
            let off = emitter.on("inc", handler);
            emitter.on("inc", handler);
            emitter.trigger("inc");
            off();
            off();
            emitter.trigger("inc");
            assert.equal(i, 3);
        });
    });