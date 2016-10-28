define(function () {
   'use strict';
   return angular.module('app.handle.service', ['ionic']).factory('$handleService', ['$ionicLoading', '$http', function ($ionicLoading, $http) {
      var HandleService = {
         logger     : function (level, message) {
            /**
             * 日志分为四种 分别为：
             * 1.log   普通日志
             * 2.info  提示信息日志
             * 3.error 错误日志
             * 4.warn  警告日志
             * **/
            var logtimer  = new Date().format('yyyy-MM-dd hh:mm:ss'),
               logheader = ' [',
               logfooter = '] ',
               message   = typeof message === 'object' ? JSON.stringify(message) : message;
            switch (level) {
               case 'log':
                  console.log(logtimer + logheader + message + logfooter);
                  break;
               case  'info':
                  console.info(logtimer + logheader + message + logfooter);
                  break;
               case 'error':
                  console.error(logtimer + logheader + message + logfooter);
                  break;
               case 'warn':
                  console.warn(logtimer + logheader + message + logfooter);
                  break;
            }
         },
         showLoading: function (show) {
            if (show == 'show') {
               $ionicLoading.show({
                  templateUrl: 'templates/common/loading.html'
               });
            }
            else {
               $ionicLoading.hide();
            }
         },
         http       : function (opts) {
            var options = {
               url            : '', //请求路径
               method         : 'POST', //请求方式
               params         : {},//用于设置URL参数的对象
               data           : {}, //请求发送的数据
               headers        : {}, //请求头设置
               timeout        : 60000, //超时范围
               withCredentials: false, //是否为XHR对象添加withCredentials属性（在跨域请求时提供凭据）
               success        : function (data) {
               },
               error          : function (ex) {
               }
            };
            HandleService.showLoading('show');
            //执行数据请求
            $http(angular.extend(options, opts)).success(function (data) {
               options.success(data);
               HandleService.showLoading('hide');
            }).error(function (ex) {
               options.error(ex);
               HandleService.showLoading('hide');
            });
         }
      };
      return HandleService;
   }]);
});
