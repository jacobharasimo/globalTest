'use strict';

angular.module('globalSliderApp')
  .factory('electionResults', function ($resource) {
//http://static.globalnews.ca/content/test/results-2011.js
        return $resource('http://static.globalnews.ca/content/test/results-2011.js', {},
            {
                list: {
                    method: 'JSONP',
                    params: { callback: 'gNews_getRidingDetailsCallback' }
                }
            }
        );
  });
