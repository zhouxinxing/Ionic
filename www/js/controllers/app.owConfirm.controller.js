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

      });
      return app;
   });
