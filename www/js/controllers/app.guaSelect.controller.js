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
         var Handle = (function (handle) {
            //计算结果 数据组建拼装方法
            handle.resultHandle = function (data, object) {
               angular.extend(object, data);
               angular.forEach(data.CVRG_LIST, function (item, index, array) {
                  object.CVRG_DETAIL[item.INSRNC_CDE] = item;
               });
               $rootScope.CALCOST_RESULT.CALCOST_FLAG = true; //计算标识
               $scope.REL_CALCOST_FLAG = false; //需要重新计算
               $scope.INSRNC_BGN_TM_CHANGE = false;  //商业险起期修改标识
               $scope.INSRNC_BGN_TM_JQ_CHANGE = false; //交强险起期修改标识
               $scope.SZ_CHANGE_FLAG = false; //三者保额修改标识
               $scope.SJZW_CHANGE_FLAG = false; //司机座位险保额修改标识
               $scope.CKZW_CHANGE_FLAG = false; //乘客座位险保额修改标识
               $scope.BLPS_CHANGE_FLAG = false; //玻璃破碎保额修改标识
               $scope.CSGH_CHANGE_FLAG = false; //车身刮痕保额修改标识
            };
            return handle;
         })(Handle || {});
         //----------------------------------------begin 报价信息页面----------------------------------------//
         $handleService.initFormApp();
         //-------------------------------------------------------------------------------------------------//
         //---------------------------------------begin 监听方法---------------------------------------------//
         //-------------------------------------------------------------------------------------------------//
         //监听-商业险保险起始日期-计算折旧
         $scope.$watch('CAR_BEANS.INSRNC_BGN_TM', function () {
            //修改标识
            $scope.INSRNC_BGN_TM_CHANGE = true;
            //重新计算标识
            $scope.REL_CALCOST_FLAG = true;
            //请求 折旧
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

         //监听-》交强险保险起期 -》影像车船税
         $scope.$watch('CAR_BEANS.INSRNC_BGN_TM_JQ', function (value) {
            $scope.INSRNC_BGN_TM_JQ_CHANGE = true; //交强险起期变更标识
            $scope.REL_CALCOST_FLAG = true;//重新计算标识
         });

         //监听折旧值-》同时修改 1.车损保额 2.全车盗抢 3.自燃损失
         $scope.$watch('CAR_BEANS.ACT_VALUE', function (value) {
            $rootScope.CAR_BEANS.CVRG_LIST[0].AMT = $rootScope.CAR_BEANS.CVRG_LIST[2].AMT = $rootScope.CAR_BEANS.CVRG_LIST[6].AMT = value;
         });

         $scope.$watch('CAR_BEANS.CVRG_LIST[1].AMT', function (value) {
            $scope.SZ_CHANGE_FLAG = true; //三者保额修改标识
            $scope.REL_CALCOST_FLAG = true;//重新计算标识
         });
         $scope.$watch('CAR_BEANS.CVRG_LIST[3].AMT', function (value) {
            $scope.SJZW_CHANGE_FLAG = true; //司机座位险保额修改标识
            $scope.REL_CALCOST_FLAG = true;//重新计算标识
         });
         $scope.$watch('CAR_BEANS.CVRG_LIST[4].AMT', function (value) {
            $scope.CKZW_CHANGE_FLAG = true; //乘客座位险保额修改标识
            $scope.REL_CALCOST_FLAG = true;//重新计算标识
         });
         $scope.$watch('CAR_BEANS.CVRG_LIST[5].BULLET_GLASS', function (value) {
            $scope.BLPS_CHANGE_FLAG = true; //玻璃破碎保额修改标识
            $scope.REL_CALCOST_FLAG = true;//重新计算标识
         });
         $scope.$watch('CAR_BEANS.CVRG_LIST[8].AMT', function (value) {
            $scope.CSGH_CHANGE_FLAG = true; //车身刮痕保额修改标识
            $scope.REL_CALCOST_FLAG = true;//重新计算标识
         });

         //重新计算 - 次数标识
         $scope.$watch('REL_CALCOST_FLAG', function (value) {
            if (!value) {
               $scope.REL_CALCOST_TRIMER = true;
            }
         });

         $scope.$watch('CAR_BEANS.SY_ORIG_FLG', function (value) { //是否购买商业险
            $scope.REL_CALCOST_FLAG = true;//重新计算标识
         });

         $scope.$watch('CAR_BEANS.JQ_ORIG_FLG', function (value) { //是否购买交强险
            $scope.REL_CALCOST_FLAG = true;//重新计算标识
         });

         //监听所有选择框 有变化 就需要重新计算
         angular.forEach($rootScope.CAR_BEANS.CVRG_LIST, function (item, index, array) {
            $scope.$watch('CAR_BEANS.CVRG_LIST[' + index + '].PURCHASE_FLAG', function (value) {
               $scope.REL_CALCOST_FLAG = true;//重新计算标识
            });
            $scope.$watch('CAR_BEANS.CVRG_LIST[' + index + '].FRANCHISE_FLAG', function (value) {
               $scope.REL_CALCOST_FLAG = true;//重新计算标识
            });
         });
         //-------------------------------------------------------------------------------------------------//
         //---------------------------------------end 监听方法---------------------------------------------//
         //-------------------------------------------------------------------------------------------------//

         //保费计算方法
         $scope.calAmount = function () {
            var _CVRG_LIST = [], _CAR_BEANS = angular.copy($rootScope.CAR_BEANS);
            (function (window) {
               //1.对参数进行封装
               //a.*****************************筛选已投保的险种*****************************
               angular.forEach($rootScope.CAR_BEANS.CVRG_LIST, function (item, index, array) {
                  //商业险数据
                  if (item.PURCHASE_FLAG) {
                     if (item.INSRNC_CDE != "0357") {
                        $rootScope.CAR_BEANS.SY_ORIG_FLG ? _CVRG_LIST.push(item) : '';
                     }
                     else {
                        $rootScope.CAR_BEANS.JQ_ORIG_FLG ? _CVRG_LIST.push(item) : '';
                     }
                  }
                  if (index + 1 == $rootScope.CAR_BEANS.CVRG_LIST.length) {
                     _CAR_BEANS.CVRG_LIST = _CVRG_LIST;
                  }
               });
               //b.*****************************给时间添加尾缀*****************************
               _CAR_BEANS.INSRNC_BGN_TM = _CAR_BEANS.INSRNC_BGN_TM + ':00';
               _CAR_BEANS.INSRNC_BGN_TM_JQ = _CAR_BEANS.INSRNC_BGN_TM_JQ + ':00';
               //c.*****************************去掉空字段*****************************
               if(!_CAR_BEANS.IS_CMPNY_AGT){
                  delete _CAR_BEANS.CMPNY_AGT_CDE;
                  delete _CAR_BEANS.CMPNY_AGT_NME;
               }
            }(window));
            console.log(_CAR_BEANS);
            //2.提交数据到后台服务
            $handleService.http({
               url: $interFace.mitMainFace,
               //url: 'data/result.json',
               method: 'POST',
               headers: {
                  token: $rootScope.TOKEN,
                  method: 'calPremNewBusiness',
                  encrypt: 'plain',
                  'Accept-Source': 'HWEB'
               },
               data: _CAR_BEANS,
               success: function (data) {
                  $handleService.logger('info', data);
                  if ($U.isNotEmpty(data)) {
                     if(data.success == "false" || ($U.isNotEmpty(data.head)&&data.head.success==false)){
                        $U.showToast(data.msg || '服务器繁忙');
                     }
                     else {
                        Handle.resultHandle(data, $rootScope.CALCOST_RESULT);
                     }
                  }
                  else {

                  }
               },
               error: function (ex) {
                  $handleService.logger('error', ex);
               }
            });
         };
         //提交订单方法
         $scope.checkHandle = function () {
            //跳转到-》信息确认页面
            $location.path("tab/owConfirm");
         };
         //----------------------------------------end   报价信息页面----------------------------------------//
      });
      return app;
   });
