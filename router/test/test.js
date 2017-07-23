var assert = require('assert');
var Router = require('../router.js');
describe("The router", function () {
    var router;
    beforeEach(function () {
        router = new Router();
    });
    it("supports adding a route", function (done) {
        router.addRoute("/Home", function () {
            done();
        });
        router.route("/Home");
    });

    it("supports calling a route without an initial dash", function (done) {
        router.addRoute("/Home", function () {
            done();
        });
        router.route("Home");
    });

    it("supports adding two routes", function (done) {
        router.addRoute("/Home", function () {
            done();
        });
        router.addRoute("/Foo", function () { });
        router.route("/Home");
    });
    it("conflicts on two conflicting routes", function () {
        router.addRoute("/Home", function () { });
        router.addRoute("/Home", function () { });
        assert.throws(function () {
            router.route("/Home");
        });
    });
    it("Supports passing a parameter", function (done) {
        router.addRoute("/Home/:foo", function (info,params) {
            assert.equal(params.foo, "Bar");
            done();
        });
        router.route("/Home/Bar");
    });
    it("Supports passing two parameter", function (done) {
        router.addRoute("/Home/:foo/:bar", function (info,params) {
            assert.equal(params.foo, "Bar");
            assert.equal(params.bar, "Baz");
            done();
        });
        router.route("/Home/Bar/Baz");
    });
    it("Supports passing three parameter", function (done) {
        router.addRoute("/Home/:foo/:bar/:baz", function (info,params) {
            assert.equal(params.foo, "Bar");
            assert.equal(params.bar, "Baz");
            assert.equal(params.baz, "Foo");
            done();
        });
        router.route("/Home/Bar/Baz/Foo");
    });
    it("Contains the URL as params.url", function (done) {
        router.addRoute("/Home/:foo/:bar/:baz", function (params) {
            assert.equal(params.url, "/Home/Bar/Baz/Foo");
            done();
        });
        router.route("/Home/Bar/Baz/Foo");
    });
    it("Stores the handler in the state", function (done) {
        var counter = 0;
        router.addRoute("/Home", function curState(info, params) {
            if (counter === 1) {
                assert.equal(info.state, curState, "not equal");
                done();
            }
            counter++;
        });
        router.route("/Home");
        router.route("/Home");
    });
    it("supports many calls", function (done) {
        var counter = 1;
        router.addRoute("/Home", function curState(info, params) {
            if (counter === 12) {
                done();
            }
            counter++;
        });
        for (var i = 0; i < 120; i++) {
            router.route("/Home");
        }
    });
    it("supports routes calling each other", function (done) {
        var counter = 1;
        router.addRoute("/Bar", function curState(info, params) {
            if (counter === 20) {   
                done();
            }
            counter++;
            router.route("/Foo");
        });
        router.addRoute("/Foo", function () {
            router.route("/Bar");
        });
        router.route("/Bar");
    });
});