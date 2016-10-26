define(function () {
    'use strict';
    var app = angular.module('app.controller', []);
    app.controller('formController', function ($scope,$rootScope ,$http, $location,$handleService) {
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
        })();

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
