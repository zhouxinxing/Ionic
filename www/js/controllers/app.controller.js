define(['services/app.service', 'directives/app.directives','filters/app.filters'],function () {
   'use strict';
   var app = angular.module('app.controller', ['app.handle.service', 'app.directives','app.filters']);

   app.controller('indexController', function ($scope) {
      //首页代码块
      (function (window,app) {
         //图片轮播数据
         $scope.swiperImg =[
            {url:'images/banner/banner-01.png'},
            {url:'images/banner/bannner-02.png'},
            {url:'images/banner/bannner-03.png'}
         ];
      }(window,app));
   });
   return app;
});
