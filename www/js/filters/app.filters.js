/**
 * Created by zhouxinxing on 2016/8/26.
 */
define(function () {
   'use strict';
   var app = angular.module('app.filters', ['ionic']);
   //去重过滤器
   app.filter('unique', function () {
      return function (collection, keyname) {
         var output = [],keys = [];
         angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
               keys.push(key);
               output.push(item);
            }
         });
         return output;
      }
   });
   return app;
});