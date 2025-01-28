In this exercise you'll be implementing a router that supports dynamic routing (with params) and error handling.

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

- `routeName` is the name of the route given, for example `/Home`. You may throw an exception if routeName is not a string. Also, if routeName does not start with a '/', the router should behave as if it did start with a '/'.

Calling `route` after a call to `addRoute` with the same route should perform the actions in the handler. For example:

```js
const router = new Router;
const onRouteHandler = () => {
    console.log("HI");
}
router.addRoute("/Home", onRouteHandler);
router.route("/Home"); // will log "HI" to the console
```

Once you're done with the basic functionality, we'll want to support route parameters.

We'll now be allowing routes to have parameters with the following format:

```js
    router.addRoute("/Home/:name", ({url, params}) => {
        console.log(url);
        console.log(params.name);
    });
    router.route("/Home/Ronsho"); // params.name is "Ronsho" in the handler, info.url is /Home/Ronsho.
```

In case two handlers match the same route, an Error should be thrown.

### Running tests

Name your file `Router.ts` and export your class/constructor as the default export. After you installed everything with `npm i` on the root level, you can execute `npm test`.

We provided you with some tests to get the point across, you can find them in the `test` folder in this repository.
