define(['services/app.service', 'directives/app.directives','filters/app.filters'],function () {
   'use strict';
   var app = angular.module('app.form.controller', ['app.handle.service', 'app.directives','app.filters']);
   //表单控制器
   app.controller('formController', function ($scope, $rootScope, $http, $location, $handleService, $interFace, $compile,$ionicScrollDelegate) {
      //滚动重置
      (function (window) {
         window.setInterval(function () {
            $ionicScrollDelegate.$getByHandle('iselectScroll').resize();
         },1000);
         //解决安卓BUG-》点击checkbox 的时候，焦点总是移动
         angular.element('input[type="checkbox"]').on('change', function () {
            angular.element('input').blur();
         });
      }(window));


      //公共方法
      (function () {
         $scope.validateForm = function (form) {
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
         };
      }());

      //个人代理信息查询方法
      (function () {
         $scope.agentOptions = [];
         $scope.agentSelect = function () {
            $handleService.http({
               url: $interFace.mitMainFace,
               method: 'POST',
               headers: {
                  token: '683AC7EB53C944F6A2CDDC238EC04C92',
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
      }());

      //车型查询-方法
      (function () {
         $scope.CAR_SEARCH_INFO = "奥迪A8";
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
                     token: '4B7B3F4057554C7BA50431CE9806506B',
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
         $scope.checkCarModel = function (VHL) {
            $rootScope.VHL_DATA = VHL;
         };
         $scope.chooseCarModel = function () {
            if ($U.isNotEmpty($scope.VHL_DATA)) {
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
      }());

      //车主信息提交方法
      $scope.owinfoSubmit = function (form) {
         $scope.validateForm.call(this, form);// apply 参数必须是数组  call 任意类型都可以传
         $location.path("tab/carinfo");
         if (form.$valid) {
            //校验通过->1.参数保存 2.路由跳转
            $location.path("tab/carinfo");
         }
      };

      //车辆信息提交方法
      $scope.carinfoSubmit = function (form) {
         $scope.validateForm.call(this, form);// apply 参数必须是数组  call 任意类型都可以传
         $location.path("tab/insuranceSelect");
      };
   });
   return app;
});
