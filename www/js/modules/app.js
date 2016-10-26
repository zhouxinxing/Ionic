define(['controllers/app.controller', 'services/app.service', 'directives/app.directives'], function () {
   'use strict';
   var app = angular.module('app', ['ionic', 'oc.lazyLoad', 'app.controller', 'app.service', 'app.directives']);

   app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) { //ionic tabs Android显示在顶部处理

      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');

      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('left');

      $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-back');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');
   });

   app.run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
         if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
         }
         if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
         }
      });
   });
   //全局常量方法
   app.constant('interface', {
      mitInterface: 'http://agenttest.sinosafe.com.cn/mss/xszc/service/ydzyService'
   });
   //启动方法
   app.bootstrap = function () {
      angular.bootstrap(document, ['app']);
   };
   return app;
});
