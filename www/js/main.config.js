'use strict';
var Controller = (function (controller) {
  controller.Constant = {
    base: '../',
    libBase: '../lib/'
  };
  return controller;
})(Controller || {});
require.config({
  paths: {
    /***源库 全文必须依赖***/
    cordova: Controller.Constant.base + 'cordova',
    uiRouter:Controller.Constant.libBase + 'ionic/js/angular-ui/angular-ui-router', //路由
    oclazyload: Controller.Constant.libBase + 'vendor/oclazyload/ocLazyLoad.require.min', //懒加载
    modalSelect:Controller.Constant.libBase + 'vendor/ionic-modal-select/js/ionic-modal-select',
    css: Controller.Constant.libBase + 'vendor/require/require.css.min',
    /***按需加载 插件库***/
    mobiscroll: Controller.Constant.libBase + 'vendor/mobiscroll/js/mobiscroll-2.13.2.full',
    /***工具库***/
    utils: Controller.Constant.base + 'js/handles/app.handles'
  },
  shim: {
    mobiscroll: {
      deps: ['css!' + Controller.Constant.libBase + 'vendor/mobiscroll/css/mobiscroll.2.13.2.css']
    }
  },
  urlArgs: "version=_VERSION_",
  waitSeconds: 15
});
require(['cordova','oclazyload','utils'], function () {
  //入口-》动态加载路由入口
  if ($U.isPathName('index.html')) {
    require(['views/app.view.configure'], function (app) {
      app.bootstrap();
    });
  }
  else if($U.isPathName('index-iv-page.html')){ //车险销售
    require(['views/app.view.iv.configure'], function (app) {
      app.bootstrap();
    });
  }
});
