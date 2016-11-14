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
         //提交参数封装
         var Handle = (function (handle) {
            handle.paramHandle = function (beanObject, parObject, calObject) {
               //1.投保人 被保人信息
               angular.forEach(parObject, function (ptem, pdex, parray) {
                  angular.forEach(beanObject, function (btem, bdex, barray) {
                     if (pdex == bdex) {
                        parObject[pdex] = btem;
                     }
                  });
               });
               //2.付款人姓名
               parObject.PAY_PRSN_NME = beanObject.APP_NME;
               //3.报价单号
               parObject.CAL_APP_NO = calObject.SY_BASE.CAL_APP_NO || calObject.JQ_BASE.CAL_APP_NO;
               return parObject;
            };

            //发起支付 方法
            handle.paymentHandle = function (param) {
               var PAY_PARAM = {SLS_CDE:$rootScope.CAR_BEANS.SLS_CDE,APP_INFO: []};
               //交强险 投保
               if ($U.isNotEmpty(param.JQ_BASE)) {
                  PAY_PARAM.APP_INFO.push({
                     APPLICANTNO: param.JQ_BASE.PLY_APP_NO, //投保单号
                     AMOUNT: param.JQ_BASE.PREMIUM, //合计保费
                     APPLICANTNAME: param.JQ_BASE.INSRNT_CNM,  //投保人姓名
                     APP_TM: param.JQ_BASE.OPER_DATE,  //投保日期
                     INSRNC_BGN_TM:$rootScope.CAR_BEANS.INSRNC_BGN_TM_JQ+':00'  //保险起期
                  });
               }
               //商业险 投保
               if ($U.isNotEmpty(param.SY_BASE)) {
                  PAY_PARAM.APP_INFO.push({
                     APPLICANTNO: param.SY_BASE.PLY_APP_NO,
                     AMOUNT: param.SY_BASE.PREMIUM,
                     APPLICANTNAME: param.SY_BASE.INSRNT_CNM,
                     APP_TM: param.SY_BASE.OPER_DATE,
                     INSRNC_BGN_TM:$rootScope.CAR_BEANS.INSRNC_BGN_TM+':00'
                  });
               }
               $handleService.logger('log', PAY_PARAM);
               $handleService.http({
                     url: $interFace.mitMainFace,
                     method: 'POST',
                     headers: {
                        token: $rootScope.TOKEN,
                        method: 'zfsqNewBusiness',
                        encrypt: 'plain',
                        'Accept-Source': 'HWEB'
                     },
                     data: PAY_PARAM,
                     success: function (data) {
                        if (data.success == "true") {
                           if(data.BASE){
                              window.location.href= data.BASE.PAYADDRESS;
                           }
                           $handleService.logger('info', data);
                        }
                        else {
                           $U.showToast(data.msg);
                        }
                     },
                     error: function (ex) {
                        $handleService.logger('error', ex);
                     }
                  }
               );
            };
            return handle;
         })(Handle || {});

         //提交核保 方法
         $scope.checkOrder = function (form) {
            var reqModel = Handle.paramHandle($rootScope.CAR_BEANS, $rootScope.SUB_CH_DATA, $rootScope.CALCOST_RESULT);
            console.log(reqModel);
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
                  data: reqModel,
                  success: function (data) {
                     if (data.success == "true") {
                        $handleService.logger('info', data);
                        Handle.paymentHandle(data);
                     }
                     else {
                        $U.showToast(data.msg);
                     }
                  },
                  error: function (ex) {
                     $handleService.logger('error', ex);
                  }
               });
            }
         };

         //城市组件 确认回调
         $scope.selCHandle = function () {
            $scope.$apply();
         };
      })
      ;
      return app;
   })
;
