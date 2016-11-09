define([
      'services/app.service',
      'directives/app.directives',
      'filters/app.filters',
      'services/app.car.beans',
      'modalSelect'],
   function () {
      'use strict';
      var app = angular.module('app.guaSelect.controller', [
         'app.handle.service',
         'app.directives',
         'app.filters',
         'app.car.beans',
         'ionic-modal-select'
      ]);
      //表单控制器
      app.controller('owConfirmController', function ($scope, $rootScope, $http, $location, $handleService, $interFace, $carBeansService) {
         //提交核保 方法
         $scope.checkOrder= function (form) {
            console.log($rootScope.SUB_CH_DATA);
            //校验表单准确性
            $handleService.validateForm.call(this, form);
            if (form.$valid) {
               $handleService.http({
                  url: $interFace.mitMainFace,
                  method: 'POST',
                  headers: {
                     token: $rootScope.TOKEN,
                     method: 'tjhbNewBusiness',
                     encrypt: 'plain',
                     'Accept-Source': 'HWEB'
                  },
                  data: $rootScope.SUB_CH_DATA,
                  success: function (data) {
                     $handleService.logger('info', data);
                  },
                  error: function (ex) {
                     $handleService.logger('error', ex);
                  }
               });
            }
         };
      });
      return app;
   });
