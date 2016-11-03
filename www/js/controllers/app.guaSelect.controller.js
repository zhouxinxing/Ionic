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
      app.controller('guaSelectController', function ($scope, $rootScope, $http, $location, $handleService, $interFace, $carBeansService) {
         //----------------------------------------begin 报价信息页面----------------------------------------//
         $handleService.initFormApp();
         //监听保险起始日期-计算折旧
         $scope.$watch('CAR_BEANS.INSRNC_BGN_TM', function () {
            $handleService.http({
               url: $interFace.mitMainFace,
               method: 'POST',
               headers: {
                  token: $rootScope.TOKEN,
                  method: 'queryRealValueNewBusiness',
                  encrypt: 'plain',
                  'Accept-Source': 'HWEB'
               },
               data: {
                  INSRNC_BGN_TM: $rootScope.CAR_BEANS.INSRNC_BGN_TM, //保险起期
                  REGISTER_DATE: $rootScope.CAR_BEANS.REGISTER_DATE,//初登日期
                  BRND_CDE: $rootScope.CAR_BEANS.BRND_CDE, //车型行政区域代码
                  VHL_VAL: $rootScope.CAR_BEANS.VHL_VAL, //新车购置价
                  //DEPT_NO:''  //代码
               },
               success: function (data) {
                  //修改车型实际价值
                  if (data.success == "true") {
                     $rootScope.CAR_BEANS.ACT_VALUE = data.ACT_VALUE;
                  }
                  else {
                     $handleService.logger('info', data);
                  }
               },
               error: function (ex) {
                  $handleService.logger('error', ex);
               }
            });
         });

         //监听折旧值-》同时修改 1.车损保额 2.全车盗抢 3.自燃损失
         $scope.$watch('CAR_BEANS.ACT_VALUE', function (value) {
            $rootScope.CAR_BEANS.CVRG_LIST[0].AMT = $rootScope.CAR_BEANS.CVRG_LIST[2].AMT = $rootScope.CAR_BEANS.CVRG_LIST[6].AMT = value;
         });

         //保费计算方法
         $scope.calAmount = function () {
            //1.对参数进行封装 a.筛选已投保的险种
            var _CVRG_LIST = [],_CAR_BEANS=angular.copy($rootScope.CAR_BEANS);
            angular.forEach($rootScope.CAR_BEANS.CVRG_LIST, function (item,index,array) {
               if(item.PURCHASE_FLAG){
                  _CVRG_LIST.push(item);
               }
               if(index+1 == $rootScope.CAR_BEANS.CVRG_LIST.length){
                  _CAR_BEANS.CVRG_LIST=_CVRG_LIST;
               }
            });
            //b.给时间添加尾缀
            _CAR_BEANS.INSRNC_BGN_TM=_CAR_BEANS.INSRNC_BGN_TM+':00';
            _CAR_BEANS.INSRNC_BGN_TM_JQ=_CAR_BEANS.INSRNC_BGN_TM_JQ+':00';
            console.log(_CAR_BEANS);
            //2.提交数据到后台服务
            $handleService.http({
               url: $interFace.mitMainFace,
               method: 'POST',
               headers: {
                  token: $rootScope.TOKEN,
                  method: 'calPremNewBusiness',
                  encrypt: 'plain',
                  'Accept-Source': 'HWEB'
               },
               data: _CAR_BEANS,
               success: function (data) {
                  $handleService.logger('error', data);
               },
               error: function (ex) {
                  $handleService.logger('error', ex);
               }
            });
         };
         //----------------------------------------end   报价信息页面----------------------------------------//
      });
      return app;
   });
