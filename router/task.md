It is often desirable in single page application to have a form of state management.

In this exercise we'll example one such way using routing. You'll be implementing a router that allows clear state management in the application.

**We encourage you to actually run the tests at the end of the file**

Implement a `Router` object with the following methods:

### addRoute

    router.addRoute(routeName, handler)

Adds the given route to the router.
 
 - `routeName` is the name of the route given, for example `/Home`.
 - `handler` is a function to call when routing to the route is done with the below `route` method. For this initial task, the router should receieve one parameter. the paramater is an object with twi properties, url and state. The url property should match the url in the trigger method, and the state property should be the handler object itself.
 
 **Route handlers (i.e. routeName above) should always start with a /. If they do not, throw an exception**

### route

    router.route(routeName);

 - `routeName` is the name of the route given, for example `/Home`.  You may throw an exception if routeName is not a string. Also, if routename does not start with a '/', the router should behave as if it did start with a '/'.

Calling `route` after a call to `addRoute` with the same route should perform the actions in the handler. For example:

    var router = new Router;
    router.addRoute("/Home", function (info) {
        console.log("HI");
    });
    router.route("/Home"); // will log "HI" to the console
    
Once you're done with the basic functionality (you may use your event emitter for this). We'll want to support route parameters.

We'll now be allowing routes to have parameters with the following format:

    router.addRoute("/Home/:name", handler(info,params) {
        console.log(info.url);
        console.log(params.name); 
    });
    router.route("/Home/Gilad"); // params.name is "Gilad" in the handler, info.url is /Home/Gilad.
    
In case two handlers match the same route, an Error should be thrown.

For extra credit (not required) you may want to use the HTML5 history API to change the displayed URL in the address bar to the current route, support the back button and instant routing on navigation. Please do not start on those before you've finished the rest of the exercise.

Here are some tests to get the point across (again, **We encourage you to actually run the tests**):

    describe("The router",function() {
        var router;
        beforeEach(function() {
            router = new Router();
        });
        it("supports adding a route", function(done) {
            router.addRoute("/Home", function() {
            	done();    
            });
            router.route("/Home");
        });
        it("supports adding two routes", function(done) {
            router.addRoute("/Home", function() {
            	done();
            });
            router.addRoute("/Foo", function() {});
            router.route("/Home");
        });
        it("conflicts on two conflicting routes", function(done) {
            router.addRoute("/Home", function() {});
            router.addRoute("/Home", function() {});
            assert.throws(function(){
                router.route("/Home");
            });
            done();
        });
        it("Supports passing a parameter", function(done){
            router.addRoute("/Home/:foo", function(info,params){
            	assert.equal(params.foo, "Bar");
                done();
            });
            router.route("/Home/Bar");
        });
        it("Supports passing two parameter", function(done) {
            router.addRoute("/Home/:foo/:bar", function(info,params) {
            	assert.equal(params.foo,"Bar");
                assert.equal(params.bar,"Baz");
                done();
            });
            router.route("/Home/Bar/Baz");
        });
        it("Supports passing three parameter", function(done) {
            router.addRoute("/Home/:foo/:bar/:baz", function(info,params) {
            	assert.equal(params.foo,"Bar");
                assert.equal(params.bar,"Baz");
                assert.equal(params.baz,"Foo");
                done();
            });
            router.route("/Home/Bar/Baz/Foo");
        });
        it("Contains the URL as params.url", function(done) {
            router.addRoute("/Home/:foo/:bar/:baz", function(info,params) {
            	assert.equal(params.url,"/Home/Bar/Baz/Foo");
                done();
            });
            router.route("/Home/Bar/Baz/Foo");
        });
        it("Stores the handler in the state", function(done) {
            var counter = 0;
            router.addRoute("/Home", function curState(info,params) {
            	if(counter === 1){
                    console.error(info.state);
                    assert.equal(info.state, curState, "not equal");
                    done();
                }
                counter++;
            });
            router.route("/Home");
            router.route("/Home");
        });
        it("supports many calls", function(done) {
            var counter = 1;
            router.addRoute("/Home", function curState(info,params) {
            	if(counter === 12) {
                    done();
                }
                counter++;
            });
            for(var i = 0; i < 120; i++) {
            	router.route("/Home");
            }
        });
        it("supports routes calling each other", function(done) {
            var counter = 1;
            router.addRoute("/Bar", function curState(info,params) {
            	if(counter === 20){
                    done();
                }
                counter++;
                router.route("/Foo");
            });
            router.addRoute("/Foo", function() {
               router.route("/Bar"); 
            });
          	router.route("/Bar");
        });
    });