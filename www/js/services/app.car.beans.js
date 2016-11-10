/***
 * 车险字段Bean
 ***/
define(function () {
   'use strict';
   var app = angular.module('app.car.beans', []).factory('$carBeansService', ['$rootScope', function ($rootScope) {

      var Handle = (function (handle) {
         handle.recNexDate = function () {
            var nex = new Date();
            nex.setDate(nex.getDate() + 1);
            return nex.format('yyyy-MM-dd 00:00');
         };
         handle.recNexYear = function () {
            var nex = new Date();
            nex.setFullYear(nex.getFullYear() + 1);
            return nex.format('yyyy-MM-dd 59:59');
         };
         return handle;
      })(Handle || {});

      //Token 临时
      $rootScope.TOKEN = '9A44FE5A41714D6DB037ED742AD05F8D';

      $rootScope.BASE_BEAN = {
         //第三者责任险保额对象
         LIABILITY_INS: [5, 10, 15, 20, 30, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
         //司机座位险
         DRIVER_SEAT: [1, 2, 3, 4, 5, 10, 15, 20],
         //乘客座位险
         PASSENGER_SEAT: [1, 2, 3, 4, 5, 10, 15, 20],
         //刮痕险
         SCRATCH_INS: [{"CODE": "365001", "AMT": 0.2}, {"CODE": "365002", "AMT": 0.5}, {
            "CODE": "365003",
            "AMT": 1
         }, {"CODE": "365004", "AMT": 2}],
         SCRATCH_INS_VAL: {"365001": 2000, "365002": 5000, "365003": 10000, "365004": 20000}
      };

      $rootScope.CAR_BEANS = {
         //--------------------------------------begin 续保信息--------------------------------------/
         /** 续保查询保单号 */
         XB_QUERY_PLY_NO: "",
         /** 续保查询车牌号 */
         XB_QUERY_ECHILE_NO: "",
         /** 续保查询车架号 */
         XB_QUERY_VIN_NO: "",
         //--------------------------------------end   续保信息--------------------------------------/

         //--------------------------------------begin 个代信息--------------------------------------/
         //是否选择个贷
         IS_CMPNY_AGT: false,
         /** 代理人工号*/
         CMPNY_AGT_CDE: "",
         /** 代理人名称*/
         CMPNY_AGT_NME: "",
         //--------------------------------------end   个代信息--------------------------------------/

         //--------------------------------------begin 车主信息--------------------------------------/
         /** 车主姓名 */
         DRV_OWNER: "王涛",
         /** 车主证件类型 */
         CERTI_TYPE: "120001",
         /** 车主证件号码 */
         CERTI_CODE: "420626199310064532",
         /** 车主电话号码 */
         CERTI_TEL: "18026905016",
         /** 车主邮箱 */
         OWER_EMAIL: "",
         /** 1.投保人同车主 2.被保人同车主 3投被保人都不同车主 4投保人被保人都同车主*/
         VISIBLE_NO: "4",
         //--------------------------------------end   车主信息--------------------------------------/

         //--------------------------------------begin 投保人信息--------------------------------------/
         /** 投保人姓名 */
         APP_NME: "",
         /** 投保人证件类型 */
         APP_CERT_TYPE: "",
         /** 投保人证件号码 */
         APP_CERT_NO: "",
         /** 投保人联系人电话 */
         APP_TEL: "",
         /** 投保人地址 */
         APP_ADDR: "",
         /** 投保人邮箱 */
         EMAIL_APP: "",
         //--------------------------------------end  投保人信息--------------------------------------/

         //--------------------------------------begin 被保人信息--------------------------------------/
         /** 被保险人姓名 */
         INSRNT_CNM: "",
         /** 被保人证件类型 */
         BIZ_CERT_TYPE: "",
         /** 被保人证件号码 */
         BIZ_CERT_NO: "",
         /** 被保险人电话 */
         INSRNT_TEL: "",
         /** 被保险人地址 */
         INSRNT_ADDR: "",
         /** 被保险人邮箱*/
         EMAIL: "",
         //--------------------------------------end  被保人信息--------------------------------------/

         //--------------------------------------begin  投保人被保人车主关系信息--------------------------------------/
         /**投保人同车主    */
         APP_SAME_CHECK: true,
         appIsDrvOwner: "1",
         /**被保人同车主    */
         REC_SAME_CHECK: true,
         insrntIsDrvOwner: "1",
         //--------------------------------------end  投保人被保人车主关系信息--------------------------------------/

         //--------------------------------------begin  业务员信息--------------------------------------/
         SLS_CDE: "105026943",
         //--------------------------------------end    业务员信息--------------------------------------/

         //--------------------------------------begin  车辆信息--------------------------------------/
         /** 车牌号码 如:粤B60260 */
         LCN_NO: "",
         /** 发动机号 如：6026989632*/
         ENG_NO: "",
         /** 车架号/VIN码  如:LSVAM4187C2184847*/
         VHL_FRM: "",
         /**车型代码  如:LYD1032SHD*/
         BRND_CDE: "",
         /**   打印厂牌车型 */
         BRND_NME_OTHER: "",
         /** 初次登记日期 */
         REGISTER_DATE: "",
         /** 过户车标志 */
         CHGOWNERFLAG: "0",
         /** 转移登记日期 */
         TRANSFERDATE: "",
         /** 玻璃类型 */
         GLASS_TYPE: "303011001",
         //--------------------------------------end  车辆信息--------------------------------------/


         //--------------------------------------begin 保险起止期--------------------------------------/
         /** 商业险保险起止期 */
         INSRNC_BGN_TM: Handle.recNexDate(),
         INSRNC_END_TM: Handle.recNexYear(),
         /** 交强险保险起止期 */
         INSRNC_BGN_TM_JQ: Handle.recNexDate(),
         INSRNC_END_TM_JQ: Handle.recNexYear(),
         /** 商业险既时生效  */
         SY_IS_IMMEFC: "0",
         /** 交强险既时生效  */
         JQ_IS_IMMEFC: "0",
         //--------------------------------------end   保险起止期--------------------------------------/


         //--------------------------------------begin  报价信息--------------------------------------/
         /** 是否计算车船税 */
         TAX_FLAG: "0",
         /** 新车购置价 */
         VHL_VAL: "920500",
         /** 新车购置价浮动值 */
         VHL_VAL_FLOAT: "990500",
         /** 验车情况*/
         CHK_CDE: "305005003",
         /**  核定载客数*/
         SET_NUM: "5",
         /**是否购买商业险*/
         SY_ORIG_FLG: true,
         /**是否购买较强险*/
         JQ_ORIG_FLG: false,
         /** 险种集合 */
         CVRG_LIST: [
            //1.车辆损失险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "0",
               /** 车损绝对免赔额 */
               C_YL15: ""
            },
            //2.第三者责任险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "50000",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: ""
            },
            //3.全车盗抢险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: ""
            },
            //4.司机座位险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "10000",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: ""
            },
            //5.乘客座位险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "10000",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: ""
            },
            //6.玻璃单独破碎险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
               /** 防弹玻璃(0 否,1 是) */
               BULLET_GLASS: "0"
            },
            //7.自燃损失险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            },
            //8.新增设备损失险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            },
            //9.车身划痕损失险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "365001",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "0",
            },
            //10.发动机涉水损失险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            },
            //11.修理期间费用补偿险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            },
            //12.车上货物责任险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            },
            //13.精神损害抚慰金责任险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            },
            //14.车辆损失保险无法找到第三方特约险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            },
            //15.指定修理厂险
            {
               //购买标记
               PURCHASE_FLAG: false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            },
            //16.交强险
            {
               //购买标记
               PURCHASE_FLAG: true,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            }
         ],
         /** 车型数据*/
         VHL_DATA: {
            /** 车型代码 */
            MODEL_CODE: "",
            /** 车型名称 */
            MODEL_NAME: "",
            /** 车型分类 */
            CAR_SORT: "",
            /** 进口/国产 */
            CAR_STYLE: "",
            /** 制造厂商 */
            CAR_MAKER: "",
            /** 吨位 */
            TONNAGE: "",
            /** 座位数 */
            SET_NUM: "",
            /** 排量 */
            DISPLACEMENT: "",
            /** 整备质量 */
            QUALITY: "",
            /** 车辆年份 */
            MARKET_YEAR: "",
            /** 新车购置价 */
            CAR_PRICE: "",
            /** 描述 */
            CAR_REMARK: "",
            /** 风险类型 */
            RISK_NAME: "",
            /** 车船税减免标志 */
            FUELFLAG: "",
            /** 新能源标志 */
            NEW_ENERGY_FLAG: "",
            /** 车型(传平台) */
            MODEL: "",
            /** 车型描述 */
            DESCRIBE: "",
            /**item是否选择 */
            ischecked: "",
            /** 开具税务机关 */
            PAYTAX_REVENUE: "",
            /** 减免标志 */
            TAX_TYPE: "",
            /** 能源种类 */
            FUEL_TYPE: "",
            /** 减免税原因 */
            DEDUE_CDE: "",
            /** 减免税方案*/
            DEDUE_TYP: "",
            /** 减免税比例*/
            DEDUE_RATE: "",
            /** 减免税凭证*/
            PAYTAX_VOU: ""
         },
         //--------------------------------------end  报价信息--------------------------------------/

         /** 退回修改标志 **/
         BU: "N",
         /**  车辆来历凭证种类  */
         CERTIFICATE_TYPE: "01",
         /** 保存草稿箱时间   */
         insertTime: "2016-11-04 12:50:05",
         /**  影像补传标志  */
         IS_IMAGE: "0",
         /**  是否传二类专修厂特约  */
         REFLAG: "0"
      };


      //保费计算 返回数据结构
      $rootScope.CALCOST_RESULT = {
         CALCOST_FLAG: false,
         SY_BASE: { //商业险
            //保额合计
            AMOUNT: "0",
            //保费合计
            PREMIUM: "0",
            //报价单号
            CAL_APP_NO: ""
         },
         JQ_BASE: { //交强险
            //保额合计
            AMOUNT: "0",
            //保费合计
            PREMIUM: "0",
            //报价单号
            CAL_APP_NO: ""
         },
         VHLTAX: { //车船税
            //上年应缴
            FORMER_TAX: "0",
            //当年应缴
            CURRENT_TAX: "0",
            //减免金额
            MINUS_TAX_AMT: "0",
            //合计
            SUM_UP_TAX: "0"
         },
         //保费明细
         CVRG_DETAIL: {}
      };

      //提交核保 数据对象
      $rootScope.SUB_CH_DATA = {
         //投保人名称
         APP_NME: "",
         //付款人姓名
         PAY_PRSN_NME: "",
         //报价单号
         CAL_APP_NO: "",
         //投保人证件类型
         APP_CERT_TYPE: "",
         //投保人证件号码
         APP_CERT_NO: "",
         //投保人联系人电话
         APP_TEL: "",
         //被保险人姓名
         INSRNT_CNM: "",
         //被保人证件类型
         BIZ_CERT_TYPE: "",
         //被保人证件号码
         BIZ_CERT_NO: "",
         //被保险人电话
         INSRNT_TEL: "",
         //业务员工号
         HAND_PER: "",
         //投保人地址
         APP_ADDR: "",
         //被保人地址
         INSRNT_ADDR: "",
         //续保标志
         ORIG_FLG: "",
         //上年商业险保单号
         ORIG_PLY_NO_SY: "",
         //上年交强险保单号
         ORIG_PLY_NO_JQ: ""
      };
      return {};
   }]);
});