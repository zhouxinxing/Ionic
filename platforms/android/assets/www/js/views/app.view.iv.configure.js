define(['modules/app'], function (app) {
   'use strict';
   //基本配置
   app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
      /***
       * angular有“启动”的说法，“启动”发生在domcontentloaded之后,启动之后再想使用controller、deractive等api，会直接报错
       * 所以：利用主模块的provider主动注册controller
       * **/
      app.controller = $controllerProvider.register;
      app.directive = $compileProvider.directive;
      app.filter = $filterProvider.register;
      app.factory = $provide.factory;
      app.service = $provide.service;
      app.constant = $provide.constant;
      app.value = $provide.value;
   }]);

   //延迟加载配置项->根据路由来加载模块需要用到此配置
   app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
      $ocLazyLoadProvider.config({
         debug: false,
         events: true,
         loadedModules: ['app'],
         jsLoader: requirejs, //使用requirejs去加载文件
         modules: [
            {
               name: 'formHandleController',
               files: [
                  'js/controllers/component/app.form.handles.controller.js'
               ]
            }
         ]
      });
   }]);


   //路由配置
   app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      /**
       * 路由切换时调用
       * @param param.file 懒加载文件数组
       * @param tpl 子模块view视图
       * @param module 子模块名
       */
      function resovleDep(opts) { //param, tpl, module
         var lazyDeferred,
            options = {
               name: ''
            };
         $U.extend(options, opts);
         //异步加载-执行按需加载方法
         var resolves = {
            loadMyCtrl: ['$ocLazyLoad', '$templateCache', '$q', function ($ocLazyLoad, $templateCache, $q) {
               lazyDeferred = $q.defer();
               return $ocLazyLoad.load(options.name).then(function () {
                  lazyDeferred.resolve();
               });
            }]
         };
         return resolves;
      };


      //otherwise()定义了当应用找不到指定路由的时候跳转的路由
      $urlRouterProvider.otherwise('/tab/mit-index');
      //底部工具栏
      $stateProvider.state('tab', {
         url: '/tab',
         abstract: true,
         templateUrl: 'templates/iv-pages/mit-tabs.html'
      });
      //展业-首页
      $stateProvider.state('tab.mitIndex', {
         url: '/mit-index',
         views: {
            'indexContent': {
               templateUrl: 'templates/iv-pages/mit-index.html'
            }
         }
      });
      //展业-电子投保
      $stateProvider.state('tab.insurance', {
         url: '/mit-insurance',
         views: {
            'insuranceContent': {
               templateUrl: 'templates/iv-pages/mit-insurance.html'
            }
         }
      });
      //展业-辅助工具
      $stateProvider.state('tab.tools', {
         url: '/mit-tools',
         views: {
            'toolsContent': {
               templateUrl: 'templates/iv-pages/mit-tools.html'
            }
         }
      });
      /*********************begin 车险投保页面***********************/
         //车主信息页面
      $stateProvider.state('tab.owinfo', {
         url: '/owinfo',
         views: {
            'indexContent': {
               templateUrl: 'templates/iv-pages/mit-owinfo.html',
               controller: 'formHandleController'
            }
         },
         resolve: resovleDep({
            name: 'formHandleController'
         })
      });
      //车辆信息页面
      $stateProvider.state('tab.carinfo', {
         url: '/carinfo',
         views: {
            'indexContent':{
               templateUrl: 'templates/iv-pages/mit-carinfo.html',
               controller: 'formHandleController'
            }
         },
         resolve: resovleDep({
            name: 'formHandleController'
         })
      });
      //车型查询页面
      $stateProvider.state('tab.carModelSelect', {
         url: '/carModelSelect',
         views: {
            'indexContent':{
               templateUrl: 'templates/iv-pages/mit-car-model-select.html',
               controller: 'formHandleController'
            }
         },
         resolve: resovleDep({
            name: 'formHandleController'
         })
      });
      //险别选择页面
      $stateProvider.state('tab.insuranceSelect', {
         url: '/insuranceSelect',
         views: {
            'indexContent':{
               templateUrl: 'templates/iv-pages/mit-insurance-select.html',
               controller: 'formHandleController'
            }
         },
         resolve: resovleDep({
            name: 'formHandleController'
         })
      });
      /*********************end   车险投保页面***********************/
   }]);
   return app;
});
