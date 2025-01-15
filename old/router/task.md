In this exercise you'll be implementing a router that allows clear state management in an application.

Implement a `Router` object with the following methods:

### addRoute

    router.addRoute(routeName, handler)

Adds the given route to the router.
 
 - `routeName` is the name of the route given, for example `/Home`.
 - `handler` is a function to call when routing is done with the below `route` method. For this initial task, the router should receieve one parameter. The paramater is an object with two properties, url and state. The url property should match the url in the trigger method, and the state property should be the handler object itself.
 
 **Route handlers (i.e. routeName above) should always start with a '/'. If they do not, throw an exception**

### route

```js
router.route(routeName);
```

 - `routeName` is the name of the route given, for example `/Home`.  You may throw an exception if routeName is not a string. Also, if routeName does not start with a '/', the router should behave as if it did start with a '/'.

Calling `route` after a call to `addRoute` with the same route should perform the actions in the handler. For example:

```js
var router = new Router;
router.addRoute("/Home", (info) => {
  console.log("HI");
});
router.route("/Home"); // will log "HI" to the console
```    

Once you're done with the basic functionality, we'll want to support route parameters.

We'll now be allowing routes to have parameters with the following format:

    router.addRoute("/Home/:name", (info,params) => {
        console.log(info.url);
        console.log(params.name); 
    });
    router.route("/Home/Ronsho"); // params.name is "Ronsho" in the handler, info.url is /Home/Ronsho.
    
In case two handlers match the same route, an Error should be thrown.


### running tests
Name your file `router.js` and export your class/constructor as the default export. After you `npm i` you can execute `npm run test`.

We provided you with some tests to get the point across, you can find them in the `tests` folder in this repository.
