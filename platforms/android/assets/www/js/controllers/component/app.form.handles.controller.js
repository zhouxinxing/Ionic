define(['mobiscroll', 'modalSelect', 'services/app.handle.service'], function () {

   var app = angular.module('app.form.handle', ['ionic', 'ionic-modal-select', 'app.handle.service']);

   app.controller('formHandleController', function ($scope,$stateParams,$location) {

      //表单校验处理 - 绑定此校验方式，表单必须带有ng-model 属性 否则不生效
      $scope.submit = function (form) {
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


      //时间控件处理
      (function () {
         var settings = {
            theme: 'android-ics light',//样式
            mode: 'scroller',//选择模式  scroller  clickpick  mixed
            display: 'bottom',//指定显示模式
            headerText: '选择日期',//头部提示文字
            showLabel: true,//是否显示labels
            preset: 'date',
            dateFormat: 'yyyy-mm-dd',
            lang: 'zh',
            showNow: false,
            nowText: "今天"
         };
         $.each($('input[datepicker]'), function (index, item) {
            var _self = $(item),
               _init = _self.attr('init-picker'),
               _maxDate = new Date(),
               _minDate = new Date(),
               _options = {
                  fixedWidth: [160, 160, 160],//三组滚动框的宽度
                  labels: ['年', '月', '日'],
                  defaultValue: new Date(),
                  maxDate: new Date('2026'),
                  minDate: new Date('1900')
               };
            if ($U.isNotEmpty(_init)) {
               _init = JSON.parse(_init);
               if ($U.isNotEmpty(_init.maxDate) && $U.isNotEmpty(_init.minDate)) {
                  var maxDateSet = _init.maxDate.split(','),
                     minDateSet = _init.minDate.split(',');
                  if (maxDateSet.length == 3 && minDateSet.length == 3) {
                     //最大日期 设置值
                     _maxDate.setFullYear(_maxDate.getFullYear() + Number(maxDateSet[0]));
                     _maxDate.setMonth(_maxDate.getMonth() + Number(maxDateSet[1]));
                     _maxDate.setDate(_maxDate.getDate() + Number(maxDateSet[2]));
                     //最小日期 设置值
                     _minDate.setFullYear(_minDate.getFullYear() + Number(minDateSet[0]));
                     _minDate.setMonth(_minDate.getMonth() + Number(minDateSet[1]));
                     _minDate.setDate(_minDate.getDate() + Number(minDateSet[2]));
                     //赋值给时间控件参数
                     _options.maxDate = _maxDate;
                     _options.minDate = _minDate;
                  }
               }
            }
            _self.scroller($.extend(settings, _options));
         });
      })();
   });
   return app;
}());
