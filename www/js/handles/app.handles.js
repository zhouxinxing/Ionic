'use strict';
(function () {
   var pathname = window.location.pathname,
      clientWidth = document.body.clientWidth;
   (function () { //默认初始化执行的方法
      var Controller = {
         initObjectHandle: function () {
            Date.prototype.format = function (format) {
               var o = {
                  "M+": this.getMonth() + 1, //month
                  "d+": this.getDate(), //day
                  "h+": this.getHours(), //hour
                  "m+": this.getMinutes(), //minute
                  "s+": this.getSeconds(), //second
                  "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                  "S": this.getMilliseconds() //millisecond
               }
               if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
               for (var k in o)if (new RegExp("(" + k + ")").test(format))
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
               return format;
            };
         }(),
         initParameter: function () { //1.存储请求参数-》到内存
            var strparam = decodeURIComponent(window.location.search),
               arrparam = [],
               parkeyv = [],
               objparam = {};
            if (strparam != '') {
               arrparam = strparam.split('?')[1].split('&');
               for (var i = 0; i < arrparam.length; i++) {
                  parkeyv = arrparam[i].split('=');
                  objparam[parkeyv[0]] = parkeyv[1];
               }
               window.sessionStorage.setItem('$linkParams', JSON.stringify(objparam));
            }
         }()
      };
   })();
   var Utils = {
      isEmpty: function (object) {
         if ((object == null || typeof(object) == "undefined") || (typeof(object) == "string" && object == "" && object != "undefined") || (typeof (object) == 'array' && object.length == 0)) {
            return true;
         }
         else {
            return false;
         }
      },
      isNotEmpty: function (object) {
         return !this.isEmpty(object);
      },
      logger: function (text) {
         console.log('[' + (new Date).format('yyyy-MM-dd hh:mm:ss') + '] ' + text);
      },
      urlParam: function (name) {
         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
         var r = window.decodeURIComponent(window.location.search).substr(1).match(reg);  //匹配目标参数
         if (r != null) return unescape(r[2]);
         return null; //返回参数值
      },
      randomString: function (length) {
         var length = length || 32,
            chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
            maxPos = chars.length,
            pwd = '';
         for (var i = 0; i < length; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
         }
         return pwd;
      },
      showToast: function (text) {
         var tostId = this.randomString(),
            toast = $('<div id="' + tostId + '" class="app-toast"><a>' + text + '</a></div>').appendTo('body').fadeIn(500);
         window.setTimeout(function () {
            toast.fadeOut(1000);
            window.setTimeout(function () {
               toast.remove();
            }, 1000);
         }, 1800);
      },
      extend: function (options, opts) {
         for (var param in opts) {
            options[param] = opts[param];
         }
      },
      isPathName: function (params) {
         if (this.isNotEmpty(params)) {
            return pathname.indexOf(params) > -1 ? true : false;
         }
         return false;
      }
   };
   window.Utils = window.$U = Utils;
   return Utils;
})();
