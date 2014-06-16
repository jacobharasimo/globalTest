'use strict';

describe('Service: electionResults', function () {

  // load the service's module
  beforeEach(module('globalSliderApp'));

  // instantiate service
  var electionResults;
  beforeEach(inject(function (_electionResults_) {
    electionResults = _electionResults_;
  }));

  it('should do something', function () {
    expect(!!electionResults).toBe(true);
  });

});
