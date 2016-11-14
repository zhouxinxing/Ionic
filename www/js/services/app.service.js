define(function () {
   'use strict';
   return angular.module('app.handle.service', ['ionic']).factory('$handleService', ['$rootScope', '$ionicLoading', '$http', '$ionicScrollDelegate', function ($rootScope, $ionicLoading, $http, $ionicScrollDelegate) {
      var HandleService = {
         initFormApp: function () {
            //滚动重置-修复页面滚动BUG
            window.clearInterval($rootScope.scrollTimer);
            var _handleScroll = angular.element('[delegate-handle=handleScroll]');
            if (_handleScroll.length) {
               $rootScope.scrollTimer = window.setInterval(function () {
                  $ionicScrollDelegate.$getByHandle('handleScroll').resize();
               }, 1200);
            }
            //解决安卓BUG-》点击checkbox 的时候，焦点总是移动
            angular.element('input[type="checkbox"]').on('change', function () {
               angular.element('input').blur();
            });
         },
         logger: function (level, message) {
            /**
             * 日志分为四种 分别为：
             * 1.log   普通日志
             * 2.info  提示信息日志
             * 3.error 错误日志
             * 4.warn  警告日志
             * **/
            var logtimer = new Date().format('yyyy-MM-dd hh:mm:ss'),
               logheader = ' [',
               logfooter = '] ',
               message = typeof message === 'object' ? JSON.stringify(message) : message;
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
         http: function (opts) {
            var options = {
               url: '', //请求路径
               method: 'POST', //请求方式
               params: {},//用于设置URL参数的对象
               data: {}, //请求发送的数据
               headers: {}, //请求头设置
               timeout: 60000, //超时范围
               withCredentials: false, //是否为XHR对象添加withCredentials属性（在跨域请求时提供凭据）
               success: function (data) {
               },
               error: function (ex) {
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
         },
         validateForm: function (form) {
            var error = form.$error,
                elem = angular.element('form'),
                defmsg = '您信息填写不完整或者输入有误',
                msg = '';
            if ($U.isNotEmpty(error.required)) {  //有空值
               msg = elem.find('[name=' + error.required[0].$name + ']').attr('required-msg');
            }
            else if ($U.isNotEmpty(error.pattern)) {  //正则不通过
               msg = elem.find('[name=' + error.pattern[0].$name + ']').attr('pattern-msg');
            }
            else {
               return true;
            }
            $U.showToast($U.isNotEmpty(msg) ? msg : defmsg);
            return false;
         },
         sessionHandle:{
            saveSession: function (key,object) {
               if($U.isNotEmpty(key)&&$U.isNotEmpty(object)){
                  window.sessionStorage.setItem(key,JSON.stringify(object));
               }
            },
            getSession: function (key) {
               if($U.isNotEmpty(key)){
                  var str_object = window.sessionStorage.getItem(key);
                  try {
                     return JSON.parse(str_object);
                  }
                  catch (ex){
                     return str_object;
                  }
               }
            }
         },
      };
      return HandleService;
   }]);
});
