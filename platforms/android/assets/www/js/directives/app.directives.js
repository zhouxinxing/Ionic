'use strict';
define(function () {
    'use strict';
    var app = angular.module('app.directives', ['ionic', 'ngAnimate']);
    //1.显示影藏的动画
    app.animation(".animate-fade", ["$animateCss", function ($animateCss) {
        return {
            enter: function (element) {
                return $animateCss(element, {
                    from: {opacity: 0},
                    to: {opacity: 1},
                    duration: 0.5
                })
            },
            leave: function (element) {
                return $animateCss(element, {
                    from: {opacity: 1},
                    to: {opacity: 0},
                    duration: 0.5
                });
            }
        }
    }]);
    //让路由变成可标记性
   app.directive('hideTabs', function($rootScope) {
      return {
         restrict: 'A',
         link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
               scope.$watch(attributes.hideTabs, function(value){
                  $rootScope.hideTabs = value;
               });
            });
            scope.$on('$ionicView.beforeLeave', function() {
               $rootScope.hideTabs = false;
            });
         }
      };
   });
    return app;
});
