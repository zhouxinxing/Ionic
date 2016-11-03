define([
      'services/app.service',
      'directives/app.directives',
      'filters/app.filters',
      'services/app.car.beans',
      'modalSelect'],
   function () {
      'use strict';
      var app = angular.module('app.carInfo.controller', [
         'app.handle.service',
         'app.directives',
         'app.filters',
         'app.car.beans',
         'ionic-modal-select'
      ]);
      //表单控制器
      app.controller('carInfoController', function ($scope,$rootScope, $http, $location, $handleService, $interFace, $compile, $carBeansService) {
         //----------------------------------------begin 车辆信息页面----------------------------------------//
         $scope.CAR_SEARCH_INFO = "奥迪A8";
         $handleService.initFormApp();
         //车型查询-方法
         $scope.queryCarModule = function () {
            //判断查询条件 非空再调用接口
            if ($U.isEmpty($scope.CAR_SEARCH_INFO)) {
               $U.showToast('请输入车型名称或者车架号');
               return;
            }
            else {
               $handleService.http({
                  //url: $interFace.mitMainFace,
                  url: 'data/basedata.json',
                  method: 'POST',
                  headers: {
                     token: $rootScope.TOKEN,
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
                           angular.element('.list-screen-box').empty().append($compile(html)($scope));
                        }, 0);
                     });
                     $handleService.logger('info', '车型查询返回数据成功，共 (' + ($U.isEmpty(data.VHL_LIST) ? 0 : data.VHL_LIST.length) + ') 条');
                  },
                  error: function (ex) {
                     $handleService.logger('error', ex);
                  }
               });
            }
         };
         //车型选择事件
         $scope.checkCarModel = function (VHL) {
            $rootScope.CAR_BEANS.VHL_DATA = VHL;
            //给车型数据 拿出来进行封装
            //1.车型代码
            $rootScope.CAR_BEANS.BRND_CDE = VHL.MODEL_CODE;
            //3.新车购置价
            $rootScope.CAR_BEANS.VHL_VAL = VHL.CAR_PRICE;
            //3.浮动价
            $rootScope.CAR_BEANS.VHL_VAL_FLOAT = VHL.VEHICLE_PRICE;
         };
         //车型选择-确定按钮
         $scope.chooseCarModel = function () {
            if ($U.isNotEmpty($rootScope.CAR_BEANS.VHL_DATA)) {
               $location.path("tab/carinfo");
            }
            else {
               $U.showToast('请选择您的车辆型号');
            }
         };
         //数据过滤->传入参数 进行条件过滤
         $scope.carClaprocess = function () {
            var resultArrayX = [], resultArrayY = [], resultArrayZ = [], resultArrayM = [];
            var carModelListHtml = '<ion-radio ng-repeat="VHL in SCREEN_AFTER.VHL_LIST" ng-value="VHL.MODEL_CODE" ng-click="checkCarModel(VHL);">{{VHL.DESCRIBE+"(参考价:"+VHL.VEHICLE_PRICE+")"}}</ion-radio>';
            var options = {
               VAL_DATA: $scope.CAR_DATA,
               BRAND_NAME: $scope.BRAND_NAME, //品牌
               FAMILY_NAME: $scope.FAMILY_NAME, //车款名称
               DISPLACEMENT: $scope.DISPLACEMENT, //排气量
               CAR_REMARK: $scope.CAR_REMARK //手动自动
            };
            if ($U.isNotEmpty(options.VAL_DATA.VHL_LIST)) {
               angular.forEach(options.VAL_DATA.VHL_LIST, function (xitem, xndex, xrray) {
                  //品牌判断
                  if ($U.isNotEmpty(options.BRAND_NAME)) {
                     if (options.BRAND_NAME == xitem.BRAND_NAME) {
                        resultArrayX.push(xitem);
                     }
                  }
                  else {
                     resultArrayX = options.VAL_DATA.VHL_LIST;
                  }
               });
               //车款判断
               angular.forEach(resultArrayX, function (yitem, yindex, yarray) {
                  if ($U.isNotEmpty(options.FAMILY_NAME)) {
                     if (options.FAMILY_NAME == yitem.FAMILY_NAME) {
                        resultArrayY.push(yitem);
                     }
                  }
                  else {
                     resultArrayY = resultArrayX;
                  }
               });
               //排量判断
               angular.forEach(resultArrayY, function (zitem, zindex, zarray) {
                  if ($U.isNotEmpty(options.DISPLACEMENT)) {
                     if (options.DISPLACEMENT == zitem.DISPLACEMENT) {
                        resultArrayZ.push(zitem);
                     }
                  }
                  else {
                     resultArrayZ = resultArrayY;
                  }
               });
               //手动自动
               angular.forEach(resultArrayZ, function (mitem, mindex, marray) {
                  if ($U.isNotEmpty(options.CAR_REMARK)) {
                     if (options.CAR_REMARK == mitem.CAR_REMARK) {
                        resultArrayM.push(mitem);
                     }
                  }
                  else {
                     resultArrayM = resultArrayZ;
                  }
               });
               //进行车型数据渲染
               $scope.SCREEN_AFTER = {"VHL_LIST": resultArrayM};
               angular.element('.car-module-list div.list').empty().append($compile(carModelListHtml)($scope));
            }
         };

         //车辆信息提交方法
         $scope.carInfoSubmit = function (form) {
            //车型选择校验
            if ($U.isEmpty($rootScope.CAR_BEANS.VHL_DATA.MODEL_CODE)) { //如果车型代码为空 未选择车型
               $U.showToast('请选择品牌型号');
               return;
            }
            $handleService.validateForm.call(this, form);
            if (form.$valid) {
               $location.path("tab/insuranceSelect");
            }
         };
         //----------------------------------------end   车辆信息页面----------------------------------------//
      });
      return app;
   });
