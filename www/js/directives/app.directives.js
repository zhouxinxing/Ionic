'use strict';
define(['mobiscroll'],function () {
   'use strict';
   var app = angular.module('app.directives', ['ionic', 'ngAnimate']);
   //1.显示影藏的动画
   app.animation(".animate-fade", ["$animateCss", function ($animateCss) {
      return {
         enter: function (element) {
            return $animateCss(element, {
               from: {opacity: 0},
               to: {opacity: 1},
               duration: 0.5
            })
         },
         leave: function (element) {
            return $animateCss(element, {
               from: {opacity: 1},
               to: {opacity: 0},
               duration: 0.5
            });
         }
      }
   }]);
   //2.显示影藏Tab
   app.directive('hideTabs', function ($rootScope) {
      return {
         restrict: 'A',
         link: function (scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function () {
               scope.$watch(attributes.hideTabs, function (value) {
                  $rootScope.hideTabs = value;
               });
            });
            scope.$on('$ionicView.beforeLeave', function () {
               $rootScope.hideTabs = false;
            });
         }
      };
   });
   //3.日历控件 指令
   app.directive('ngDatePicker', function () {
      return {
         restrict: 'A',
         replace: true,
         link: function (scope, element, attr) {
            var settings = {
               theme: 'android-ics light',//样式
               mode: 'scroller',//选择模式  scroller  clickpick  mixed
               display: 'bottom',//指定显示模式 modal bottom
               //headerText: '选择日期',//头部提示文字
               showLabel: true,//是否显示labels
               preset: 'date',
               dateFormat: 'yyyy-mm-dd',
               lang: 'zh',
               showNow: false,
               nowText: "今天",
               fixedWidth: [160, 160, 160,200,200],//三组滚动框的宽度
               labels: ['年', '月', '日'],
               defaultValue: new Date(),
               maxDate: new Date('2026'),
               minDate: new Date('1900')
            };
            var _init  = attr.initPicker, _maxDate = new Date(), _minDate = new Date();
            if ($U.isNotEmpty(_init)) {
               _init = JSON.parse(_init);
               if ($U.isNotEmpty(_init.maxDate) && $U.isNotEmpty(_init.minDate)) {
                  var maxDateSet = _init.maxDate.split(','),
                     minDateSet = _init.minDate.split(',');
                  if (maxDateSet.length >= 3 && minDateSet.length >= 3) {
                     //最大日期 设置值
                     _maxDate.setFullYear(_maxDate.getFullYear() + Number(maxDateSet[0]));
                     _maxDate.setMonth(_maxDate.getMonth() + Number(maxDateSet[1]));
                     _maxDate.setDate(_maxDate.getDate() + Number(maxDateSet[2]));
                     if($U.isNotEmpty(maxDateSet[3])){
                        _maxDate.setHours(_maxDate.getHours() + Number(maxDateSet[3]));
                     }
                     //最小日期 设置值
                     _minDate.setFullYear(_minDate.getFullYear() + Number(minDateSet[0]));
                     _minDate.setMonth(_minDate.getMonth() + Number(minDateSet[1]));
                     _minDate.setDate(_minDate.getDate() + Number(minDateSet[2]));
                     if($U.isNotEmpty(minDateSet[3])){
                        _minDate.setHours(_minDate.getHours() + Number(minDateSet[3]));
                     }
                     //赋值给时间控件参数
                     settings.maxDate = _maxDate;
                     settings.minDate = _minDate;
                     //初始化值
                     if(_init.initVal === "true"){
                        element.val(new Date().format(settings.minDate.format('yyyy-MM-dd')));
                     }
                  }
               }
            }
            if(attr.ngDatePicker === 'datetime'){
               element.scroller(settings).datetime(settings);
            }
            else{
               element.scroller(settings);
            }
         }
      };
   });
   //4.正方形
   app.directive('ngSquare', function () {
      return {
         restrict: 'A',
         replace: true,
         link: function (scope, element, attr) {
            if($U.isNotEmpty(attr.ngSquare)){
               element.css({
                  width:attr.ngSquare,
                  height:element.width()+'px'
               });
            }
            else {
               element.css({
                  height:element.width()+'px'
               });
            }
         }
      };
   });
   //5.操作属性
   app.directive('ngRequire', [function () {
         return {
            restrict: 'A',
            multiElement: true,
            link: function (scope, element, attr) {
               scope.$watch(attr.ngRequire, function ngRequireWatchAction (value) {
                  if($U.isNotEmpty(attr.ngRequire)){
                     value?element.attr('required',true):element.removeAttr('required');
                  }
               });
            }
         };
      }
   ]);
   return app;
});
