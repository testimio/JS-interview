import { describe, it, beforeEach, expect, vi } from 'vitest';
import Router from '../Router';

describe('The router', () => {
  let router;

  beforeEach(() => {
    router = new Router();
  });

  it('supports adding a route', () => {
    const callback = ({ url }) => {
      expect(url).toEqual('/Home');
    };

    router.addRoute('/Home', callback);
    router.route('/Home');

    expect(callback).toBeCalledTimes(1);
  });

  it('supports calling a route without an initial dash', () => {
    const callback = ({ url }) => {
      expect(url).toEqual('/Home');
    };

    router.addRoute('/Home', ({ url }) => {
      expect(url).toEqual('/Home');
    });

    router.route('Home');

    expect(callback).toBeCalledTimes(1);
  });

  it('supports adding two routes', () => {
    const callback = ({ url }) => {
      expect(url).toEqual('/Home');
    };

    router.addRoute('/Home', callback);
    router.addRoute('/Foo');
    router.route('/Home');

    expect(callback).toBeCalledTimes(1);
  });

  it('throws on two conflicting routes - part 1', () => {
    router.addRoute('/Home');
    expect(router.addRoute('/Home')).toThrow();
  });

  it('throws on two conflicting routes - part 2', () => {
    router.addRoute('/Home/Home');
    expect(router.addRoute('/Home/:param')).toThrow();
  });

  it('supports passing a parameter', () => {
    const callback = ({ params }) => {
      expect(params.foo).toEqual('Bar');
    };

    router.addRoute('/Home/:foo', callback);
    router.route('/Home/Bar');

    expect(callback).toBeCalledTimes(1);
  });

  it('passes the current url upon routing', () => {
    const route = '/Home/Bar';
    const callback = ({ url }) => {
      expect(url).toEqual(route);
    };

    router.addRoute('/Home/:foo', callback);
    router.route(route);

    expect(callback).toBeCalledTimes(1);
  });

  it('supports passing two parameters', () => {
    const callback = ({ params }) => {
      expect(params.foo).toEqual('Bar');
      expect(params.bar).toEqual('Baz');
    };

    router.addRoute('/Home/:foo/:bar', callback);
    router.route('/Home/Bar/Baz');

    expect(callback).toBeCalledTimes(1);
  });

  it('supports passing three parameters', () => {
    const callback = ({ params }) => {
      expect(params.foo).toEqual('Bar');
      expect(params.bar).toEqual('Baz');
      expect(params.baz).toEqual('Foo');
    };

    router.addRoute('/Home/:foo/:bar/:baz', callback);
    router.route('/Home/Bar/Baz/Foo');

    expect(callback).toBeCalledTimes(1);
  });

  it('contains the URL as params.url', () => {
    const callback = ({ params }) => {
      expect(params.url).toEqual('/Home/Bar/Baz/Foo');
    };

    router.addRoute('/Home/:foo/:bar/:baz', callback);
    router.route('/Home/Bar/Baz/Foo');

    expect(callback).toBeCalledTimes(1);
  });

  it('accepts first as param', () => {
    const callback = ({ params }) => {
      expect(params.url).toEqual('/home');
    };

    router.addRoute('/:onlyParam', callback);
    router.route('/home');

    expect(callback).toBeCalledTimes(1);
  });

  it('accepts first as param 2', () => {
    const callback = ({ params }) => {
      expect(params.url).toEqual('/someParam/Bar');
    };

    router.addRoute('/:onlyParam/Bar', callback);
    router.route('/someParam/Bar');

    expect(callback).toBeCalledTimes(1);
  });

  it('accepts params anywhere', () => {
    const callback = ({ params }) => {
      expect(params.url).toEqual('/Home/Bar/Baz/Foo');
    };

    router.addRoute('/:firstParam/Bar/:otherParam/:baz', callback);
    router.route('/Home/Bar/Baz/Foo');

    expect(callback).toBeCalledTimes(1);
  });

  it('accepts params anywhere 2', () => {
    const callback = ({ params }) => {
      expect(params.url).toEqual('/Home/Bar/Baz/Foo');
    };

    router.addRoute('/Home/Bar/:otherParam/:baz', callback);
    router.route('/Home/Bar/Baz/Foo');

    expect(callback).toBeCalledTimes(1);
  });
});
