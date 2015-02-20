'use strict';

suite('contract > ', function() {

  setup(function() {
    this.sinon = sinon.sandbox.create();
  });

  teardown(function() {
    this.sinon.restore();
  });

  suite('validates context > ', function() {
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

    test('valid context', function(done) {
      pipe.request('getAll').then(results => {
        assert.equal(results.length, 3);
        done();
      });
    });

    test('invalid context', function(done) {
      try {
        pipe.request('INVALIDMETHOD').then(() => {});
      } catch(e) {
        // Should throw an error
        done();
      }
    });
  });

  suite('validates params', function() {
    setup(function() {
    });

    teardown(function() {
    });

    test('invalid params', function(done) {
      done();
    });

    test('valid params', function(done) {
      done();
    });
  });
});