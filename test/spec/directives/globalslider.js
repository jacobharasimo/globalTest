'use strict';

describe('Directive: globalSlider', function () {

  // load the directive's module
  beforeEach(module('globalSliderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<global-slider></global-slider>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the globalSlider directive');
  }));
});
