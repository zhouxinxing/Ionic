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
   app.filter('sum', function () {
      return function (input,lenght,param) {
         try {
            if(typeof param === 'object'){
               var _sum = 0;
               angular.forEach(param, function (item,index,array) {
                  _sum+=window.parseFloat(item+'');
               });
               return _sum.toFixed(lenght);
            }
            return '';
         }
         catch (ex){
            return input;
         }
      }
   });
   return app;
});