define(function () {
   'use strict';
   var app = angular.module('app.controller', []);
   app.controller('formController', function ($scope, $rootScope, $http, $location, $handleService, $interFace,$compile) {
      //个人代理信息查询方法
      (function () {
         $scope.agentOptions = [];
         var url = 'http://10.11.29.12:8080/micro-plat/app/js/basedata.json';
         $scope.agentSelect = function () {
            $handleService.http({
               url: url,
               method: 'POST',
               success: function (data) {
                  $handleService.logger('info', data);
                  $scope.agentOptions = data;
               },
               error: function (ex) {
                  $handleService.logger('error', ex);
               }
            });
         };
      }());

      //车型查询-方法
      (function () {
         $scope.CAR_SEARCH_INFO ="奥迪A8";
         $scope.queryCarModule = function () {
            //判断查询条件 非空再调用接口
            if ($U.isEmpty($scope.CAR_SEARCH_INFO)) {
               $U.showToast('请输入车型名称或者车架号');
               return;
            }
            else {
               $handleService.http({
                  url: $interFace.mitMainFace,
                  method: 'POST',
                  headers: {
                     token: 'F584A4FBD0AA477DB25B314F5EEDE806',
                     method: 'queryNewBusinessCarType',
                     encrypt: 'plain',
                     'Accept-Source': 'HWEB'
                  },
                  data: {
                     RACK_NO: $scope.CAR_SEARCH_INFO,
                     VEHICLE_NAME: $scope.CAR_SEARCH_INFO,
                     REGISTER_DATE: '',
                     VEHICLE_CODE: '',
                     VEHICLE_NO: '*-*',
                     SLS_CDE: '105026943'
                  },
                  success: function (data) {
                     $http.get('templates/iv-pages/tools/model-select-tools.html').success(function (html) {
                        window.setTimeout(function () {
                           $scope.CAR_DATA = data;
                           angular.element('.list-screen-box').empty().append($compile(html)($scope.$new()));
                        },0);
                     });
                     $handleService.logger('info',  data.VHL_LIST);
                  },
                  error: function (ex) {
                     $handleService.logger('error', ex);
                  }
               });
            }
         };
         //数据过滤->传入参数 进行条件过滤
         var carClaprocess = function (opts) {
            var options = {
               VAL_DATA: {},
               BRAND_NAME: '', //品牌
               FAMILY_NAME: '', //车款名称
               DISPLACEMENT: '', //排气量
               CAR_REMARK: '', //手动自动
               MODEL_NAME: ''  //车辆型号
            };
         };
      }());

      //车主信息提交方法
      $scope.owinfoSubmit = function (form) {
         $scope.submit.call(this, form);// apply 参数必须是数组  call 任意类型都可以传
         $location.path("tab/carinfo");
         if (form.$valid) {
            //校验通过->1.参数保存 2.路由跳转
            $location.path("tab/carinfo");
         }
      };
      //车辆信息提交方法
      $scope.carinfoSubmit = function (form) {
         $scope.submit.call(this, form);// apply 参数必须是数组  call 任意类型都可以传
         $location.path("tab/insuranceSelect");
      };
      //险别信息页面
   });
   return app;
});
