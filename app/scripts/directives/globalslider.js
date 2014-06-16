'use strict';

angular.module('globalSliderApp')
    .directive('globalSlider', function () {
        return {
            template: '<div class="sliderContainer">' +
                '<ul class="slider" ng-class="direction">' +
                '<li ng-class="{active: $index==activeSlide}" ng-repeat="riding in electionResults" ng-cloak class="slide">' +
                '<div class="story" data-post_id="{{riding.id}}">'+
                '<article>'+
                '<div class="meta-bar">'+
                '<div class="meta-bar-cat"><a href="#">{{riding.name}}</a></div>'+
                '<a href="#" class="meta-share-expand" tabindex="0"><img src="http://s0.wp.com/wp-content/themes/vip/shaw-globalnews/_img/plus.png?m=1391179518g"></a>'+
                '<div class="socialShare meta-share-list" data-socialshare="facebook,twitter,google" data-socialshare-count="false" data-socialshare-collapsable="false" data-socialshare-url="http://globalnews.ca/news/1393936/los-angeles-kings-win-the-stanley-cup-defeat-rangers-3-2-in-double-ot/" data-socialshare-title="Los Angeles Kings win the Stanley Cup; defeat Rangers 3-2 in double OT" data-socialshare-init="true"><ul><li class="facebook" title="Share this item on Facebook"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fglobalnews.ca%2Fnews%2F1393936%2Flos-angeles-kings-win-the-stanley-cup-defeat-rangers-3-2-in-double-ot%2F"><span>&nbsp;</span></a></li><li class="twitter" title="Share this item on Twitter"><a target="_blank" href="https://twitter.com/intent/tweet?text=Los%20Angeles%20Kings%20win%20the%20Stanley%20Cup%3B%20defeat%20Rangers%203-2%20in%20double%20OT http%3A%2F%2Fglobalnews.ca%2Fnews%2F1393936%2Flos-angeles-kings-win-the-stanley-cup-defeat-rangers-3-2-in-double-ot%2F"><span>&nbsp;</span></a></li><li class="google" title="Share this item on Google+"><a target="_blank" href="https://plus.google.com/share?url=http%3A%2F%2Fglobalnews.ca%2Fnews%2F1393936%2Flos-angeles-kings-win-the-stanley-cup-defeat-rangers-3-2-in-double-ot%2F"><span>&nbsp;</span></a></li></ul></div>'+
                '<div class="meta-bar-time-group">' +
                '<span class="meta-bar-date">4 hours ago</span>' +
                '<span class="meta-bar-slide-index"> {{($index+1)}}/{{electionResults.length}}</span>'+
                '</div> <!-- /.meta-bar-time-group -->'+
                '</div>' +
                '<div class="story-content">'+
                '<ol>' +
                '<li ng-repeat="candidate in riding.results" ng-cloak title="{{(candidate.votes/riding.totalVotesCast)*100|number:2}}%">' +
                '<span class="bar" ng-style="{\'width\': \'{{(candidate.votes/riding.totalVotesCast)*100}}%\'}" ng-class="candidate.partyCode"></span>' +
                '<h4 ng-class="{winner: candidate.isElected}">{{candidate.name}} &ndash; ' +
                '{{candidate.votes}} votes &ndash; '+
                '{{(candidate.votes/riding.totalVotesCast)*100|number:2}}%'+
                '</h4>' +
                '</li>' +
                '</ol>' +
                '</div>' +
                '</article>'+
                '</div>'+
                '</li>' +
                '</ul>' +
                '<a href="" ng-hide="activeSlide==0" ng-click="previousSlide()" ng-cloak class="slider-control prev" alt="previous slide"><i class="fa fa-angle-left"></i></a>' +
                '<a href="" ng-hide="activeSlide==(electionResults.length-1)" ng-cloak ng-click="nextSlide()" class="slider-control next" alt="next slide"><i class="fa fa-angle-right"></i></a>' +
                '</div>',
            restrict: 'A',
            controller: function ($scope) {
                /*
                 Angular JS is know to have problems with JSONP access requests when the resulting JSONP is wrapped in anything but JSON_CALLBACK

                 Normally to resolved this i would put CORS on the service as this provides many bennfits over JSONP.
                 Additionally hosting the code/site on the same domain as the service would resolve this problem.

                 A final solution (often used with 3rd party API) is to write a quick 'wrapper' API that is hosted on the same domain as the code
                 thus again removing this problem.

                 For now the work around is to use jQuery to create the jsonP request and assign the result to a scope variable and trigger a digest
                 so angular updates.
                 */
                $.ajax({
                    url: 'http://static.globalnews.ca/content/test/results-2011.js',
                    dataType: 'jsonp',
                    jsonpCallback: 'gNews_getRidingDetailsCallback',
                    success: function (data) {
                        $scope.electionResults = data;
                        for(var i = 0; i<$scope.electionResults.length;++i){
                            var riding = $scope.electionResults[i];
                            var totalVotes = 0;
                            for(var j = 0; j<riding.results.length;++j){
                                var candidate = riding.results[j];
                                totalVotes+=candidate.votes;
                                if(j==(riding.results.length-1)){
                                    //trace(riding.name+": "+totalVotes);
                                    riding.totalVotesCast = totalVotes;
                                }
                            }
                        }
                        $scope.$digest();
                        trace($scope.electionResults)
                    }
                });
            },
            link: function postLink(scope, element, attrs) {
                var animationTime=500;
                scope.activeSlide = 0;

                scope.previousSlide = function(){
                    if(scope.activeSlide>0){
                        scope.direction="swipe-prev";
                        window.setTimeout(function(){
                           var currentSlide = element.find('.active');
                           --scope.activeSlide;
                           currentSlide.prev().addClass('animate-in');
                           currentSlide.addClass('animate-out');
                           window.setTimeout(function(){
                               element.find('.animate-in').removeClass('animate-in');
                               element.find('.animate-out').removeClass('animate-out');
                               scope.direction="";
                               scope.$digest();
                           },animationTime);
                           scope.$digest();
                       },0);
                    }
                };
                scope.nextSlide = function(){
                    if(scope.activeSlide < scope.electionResults.length-1){
                        scope.direction="swipe-next";
                        window.setTimeout(function(){
                            var currentSlide = element.find('.active');
                            ++scope.activeSlide;
                            currentSlide.next().addClass('animate-in');
                            currentSlide.addClass('animate-out')
                            window.setTimeout(function(){
                                element.find('.animate-in').removeClass('animate-in');
                                element.find('.animate-out').removeClass('animate-out');
                                scope.direction="";
                                scope.$digest();
                            },animationTime);
                            scope.$digest();
                        },0);
                    }
                };
            }
        };
    });
