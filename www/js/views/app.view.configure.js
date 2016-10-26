'use strict';
define(['modules/app'], function (app) {
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
        /***路由分为 微信路由 和 展业路由***/
        /***
         * 1.展业路由
         ***/
        $urlRouterProvider.otherwise('/menu/form'); //otherwise()定义了当应用找不到指定路由的时候跳转的路由
        $stateProvider.state('index', {
            url: '/index',
            //abstract: true,// abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活
            templateUrl: 'templates/ionic-native/menu.html'
        });
        $stateProvider.state('menu.form', {
            url: '/form',
            views: { //多视图配置
                'viewContent': {  //viewContent- 》路由名称 可自定义
                    templateUrl: 'templates/ionic-native/ionic-form.html',
                    controller: 'formHandleController'
                }
            },
            resolve: resovleDep({
                name: 'formHandleController'
            })
        });

        /***
         * 2.微信路由
         ****/
    }]);
    return app;
});
