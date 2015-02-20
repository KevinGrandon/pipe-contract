'use strict';

suite('contract > ', function() {

  setup(function() {
    this.sinon = sinon.sandbox.create();
  });

  teardown(function() {
    this.sinon.restore();
  });

  suite('validates method > ', function() {
    var pipe;

    var contract = {
      getAll: {
        context: 'Worker'
      }
    };

    setup(function() {
      pipe = new Pipe({src: '/base/test/worker.js'});
      PipeContract.implement(pipe, contract);
    });

    teardown(function() {
      pipe.terminate();
    });

    test('valid method', function(done) {
      pipe.request('getAll').then(results => {
        assert.equal(results.length, 3);
        done();
      });
    });

    test('invalid method', function(done) {
      try {
        pipe.request('INVALIDMETHOD').then(() => {});
      } catch(e) {
        // Should throw an error
        done();
      }
    });
  });

  suite('validates params', function() {
    var pipe;

    var contract = {
      getAll: {
        args: {
          filter: Object
        },
        context: 'Worker'
      }
    };

    setup(function() {
      pipe = new Pipe({src: '/base/test/worker.js'});
      PipeContract.implement(pipe, contract);
    });

    teardown(function() {
      pipe.terminate();
    });

    test('valid params', function(done) {
      pipe.request('getAll', {filter: {startsWith: 'a'}}).then(results => {
        assert.equal(results.length, 3);
        done();
      });
    });

    test('invalid params', function(done) {
      try {
        pipe.request('getAll', {invalidparam: false}).then(() => {});
      } catch(e) {
        // Should throw an error
        done();
      }
    });
  });
});