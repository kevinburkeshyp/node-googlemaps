var should = require('should');

var GoogleMapsAPI = require('../../lib/googlemaps');


var gmAPI;


describe('GoogleMapsAPI placeSearch', function() {

  before(function() {
    var config = {
      'console-key': 'xxxxxxx',
      'google-client-id':   'test-client-id',
      'stagger-time':       1000,
      'encode-polylines':   false,
      'secure':             true,
      'proxy':              'http://127.0.0.1:9999',
      'google-private-key': 'test-private-key'
    };

    var mockRequest = function(options, callback) {
      var res = {
        statusCode: 200
      };
      var data = JSON.stringify([]);
      return callback(null, res, data);
    };

    gmAPI = new GoogleMapsAPI( config, mockRequest );
  });

  describe('failures', function() {

    var invalidCallback = [null, undefined, false, 0, NaN, '', {}, [], new Object, new Date];

    var calls = invalidCallback.map(
      function(invalid) {
        return function() {
          it('should not accept ' + invalid + ' as callback', function() {
            var validParams = {
              
            };
            (function() { gmAPI.placeSearch( validParams, invalid ) }).should.throw();
          });
        } 
      }
    );

    calls.forEach( function(checkCall){
      checkCall();
    });

    it('should not accept calls without console-key', function(done){
      var config = {
        'google-client-id':   'test-client-id',
        'stagger-time':       1000,
        'encode-polylines':   false,
        'secure':             true,
        'proxy':              'http://127.0.0.1:9999',
        'google-private-key': 'test-private-key'
      };

      var mockRequest = function(options, callback) {
        var res = {
          statusCode: 200
        };
        var data = JSON.stringify([]);
        return callback(null, res, data);
      };

      var customGmAPI = new GoogleMapsAPI( config, mockRequest );

      var params = {};
      customGmAPI.placeSearch( params, function(err, results) {
        should.not.exist(results);
        should.exist(err);
        err.message.should.equal('The placeSearch API requires a console-key. You can add it to the config.');
        done();
      });

    });


    var invalidParams = [null, undefined, false, 0, NaN, '', [], new Date, function() {}];

    var calls = invalidParams.map(
      function(invalid) {
        return function() {
          it('should not accept ' + invalid + ' as params', function(done){
              gmAPI.placeSearch( invalid, function(err, results) {
                should.not.exist(results);
                should.exist(err);
                err.message.should.equal('params must be an object');
                done();
              });
          });
        } 
      }
    );

    calls.forEach( function(checkCall){
      checkCall();
    });

    it('should not accept a call withouth the param location', function(done){
      var params = {
        rankby: 'distance'
      };

      gmAPI.placeSearch( params, function(err, results) {
        should.not.exist(results);
        should.exist(err);
        err.message.should.equal('param.locaiton is required');
        done();
      });      
    });

    it('should not accept rankby distance without one of keyword, name,types params', function(done){

      var params = {
        rankby: 'distance',
        location: 'London'
      };

      gmAPI.placeSearch( params, function(err, results) {
        should.not.exist(results);
        should.exist(err);
        err.message.should.equal('If rankby=distance is specified, then one or more of keyword, name, or types is required.');
        done();
      });
    });

  });

  describe('success', function() {

    it('should return places', function(done){

      var params = {
        location: 'London'
      };

      gmAPI.placeSearch(params, function(err, results){
        should.not.exist(err);
        should.exist(results);
        results.should.be.instanceof(Array);
        done();
      });      

    });

  });

});
