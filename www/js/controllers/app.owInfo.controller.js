define([
      'services/app.service',
      'directives/app.directives',
      'filters/app.filters',
      'services/app.car.beans',
      'modalSelect'
   ],
   function () {
      'use strict';
      var app = angular.module('app.owInfo.controller', [
         'app.handle.service',
         'app.directives',
         'app.filters',
         'app.car.beans',
         'ionic-modal-select'
      ]);
      //表单控制器
      app.controller('owInfoController', function ($scope, $rootScope, $http, $location, $handleService, $interFace,$carBeansService) {
         //----------------------------------------begin 车主信息页面----------------------------------------//
         $scope.agentOptions = [];
         $handleService.initFormApp();
         //个人代理信息查询方法
         $scope.agentSelect = function () {
            $handleService.http({
               url: $interFace.mitMainFace,
               method: 'POST',
               headers: {
                  token: $rootScope.TOKEN,
                  method: 'queryPersonProxyList',
                  encrypt: 'plain',
                  'Accept-Source': 'HWEB'
               },
               success: function (data) {
                  $scope.agentOptions = data.data;
                  $handleService.logger('info', data);
               },
               error: function (ex) {
                  $handleService.logger('error', ex);
               }
            });
         };
         //车主信息提交方法
         $scope.owinfoSubmit = function (form) {
            //个人代理选择校验
            if ($rootScope.CAR_BEANS.IS_CMPNY_AGT && !$rootScope.CAR_BEANS.CMPNY_AGT_CDE) {
               $U.showToast('请选择个人代理');
               return;
            }
            $handleService.validateForm.call(this, form);// apply 参数必须是数组  call 任意类型都可以传
            if (form.$valid) {
               //校验通过->1.参数保存 2.路由跳转
               $location.path("tab/carinfo");
            }
         };
         //----------------------------------------end   车主信息页面----------------------------------------//
      });
      return app;
   });
