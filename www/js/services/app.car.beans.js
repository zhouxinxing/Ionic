/***
 * 车险字段Bean
 ***/
define(function () {
   'use strict';
   var app = angular.module('app.car.beans', []).factory('$carBeansService', ['$rootScope', function ($rootScope) {

      //Token 临时
      $rootScope.TOKEN='18C9B20D86E64BCD90147F6669772AEB';

      $rootScope.BASE_BEAN = {
         //第三者责任险保额对象
         LIABILITY_INS: [5, 10, 15, 20, 30, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
         //司机座位险
         DRIVER_SEAT: [1, 2, 3, 4, 5, 10, 15, 20],
         //乘客座位险
         PASSENGER_SEAT: [1, 2, 3, 4, 5, 10, 15, 20],
         //刮痕险
         SCRATCH_INS: [0.2, 0.5, 1, 2]
      };
      $rootScope.CAR_BEANS = {
         /** 续保查询保单号 */
         XB_QUERY_PLY_NO: "",
         /** 续保查询车牌号 */
         XB_QUERY_ECHILE_NO: "",
         /** 续保查询车架号 */
         XB_QUERY_VIN_NO: "",
         /** 商业险保险起期 */
         INSRNC_BGN_TM: new Date(new Date().setDate((new Date().getDate()+1))).format('yyyy-MM-dd 00:00'),
         /** 商业险保险止期 */
         INSRNC_END_TM: "",
         /** 交强险保险起期 */
         INSRNC_BGN_TM_JQ: new Date(new Date().setDate((new Date().getDate()+1))).format('yyyy-MM-dd 00:00'),
         /** 交强险保险止期 */
         INSRNC_END_TM_JQ: "",
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
         /** 付款人姓名 */
         PAY_PRSN_NME: "",
         /** 车牌号码 */
         LCN_NO: "粤B60260",
         /** 发动机号 */
         ENG_NO: "6026989632",
         /** 车架号/VIN码 */
         VHL_FRM: "LSVAM4187C2184847",
         /**车型代码 */
         BRND_CDE: "ADI1230DGA",
         /**   打印厂牌车型 */
         BRND_NME_OTHER: "",
         /**品牌类型 */
         VEHICLE_NAME: "",
         /** 初次登记日期 */
         REGISTER_DATE: "2016-06-08",
         /** 过户车标志 */
         CHGOWNERFLAG: "",
         /** 转移登记日期 */
         TRANSFERDATE: "",
         /** 玻璃类型 */
         GLASS_TYPE: "",
         /** 车主姓名 */
         DRV_OWNER: "王涛",
         /** 车主证件类型 */
         CERTI_TYPE: "",
         /** 车主证件号码 */
         CERTI_CODE: "420626199310064532",
         /** 车主电话号码 */
         CERTI_TEL: 18026905016,
         /** 车主邮箱 */
         OWER_EMAIL: "",
         /** 是否计算车船税 */
         TAX_FLAG: "",
         /** 报价单号 */
         CAL_APP_NO: "",
         /** 新车购置价 */
         VHL_VAL: "920500",
         /** 新车购置价修改后的值 */
         VHL_VAL_FLOAT: "990500",
         /** 实际价值 */
         ACT_VALUE: "",
         /** 折扣系数*/
         APPLY_TOTAL_ADJUST: "",
         /** 验车理由*/
         CHK_RSLT: "",
         /** 验车情况*/
         CHK_CDE: "",
         /** 交强险电子保单样式*/
         ELEC_POLICY_FLAG_JQ: "",
         /** 商业险电子保单样式*/
         ELEC_POLICY_FLAG_SY: "",
         /**  核定载客数*/
         SET_NUM: "",
         /** 险种list */
         CVRG_LIST: [
            //1.车辆损失险
            {
               //购买标记
               PURCHASE_FLAG:true,
               /** 险种序号 */
               SEQ_NO: "",
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 保障天数/人数 */
               NUMBER: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
               /** 车损绝对免赔额 */
               C_YL15: "",
               /** 辅助计算 */
               C_YL11: "",
               /** 防弹玻璃(0 否,1 是) */
               BULLET_GLASS: 0,
               /** 备注 */
               REMARK: "",
               /** 费率 */
               RATE: "",
               /** 保单号 **/
               PLY_NO: "",
               /** 应缴保费(元) **/
               PREMIUM: "",
               /** 投保单号 **/
               PLY_APP_NO: "",
               /** 赔偿限额（元） **/
               RISK_LIMIT_AMT: "",
               /** 折前保费(元) **/
               BEFORE_PREMIUM: "",
               /** 基本保费(元) **/
               BASE_PRM: "",
               /** 发动机特别损失险保险限额 **/
               ENGINE_LMT: "",
               /** 标准保费(元) **/
               NORMAL_PRM: "",
               /** 约定最高赔偿天数 **/
               NUMBER_DAY: "",
               /** 投保座位数 **/
               NUMBER_PER: "",
               /** 不计免赔保费 **/
               N_YL12: ""
            },
            //2.第三者责任险
            {
               //购买标记
               PURCHASE_FLAG:true,
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
               PURCHASE_FLAG:true,
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
               PURCHASE_FLAG:true,
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
               PURCHASE_FLAG:true,
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
               PURCHASE_FLAG:false,
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
               PURCHASE_FLAG:false,
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
               PURCHASE_FLAG:false,
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
               PURCHASE_FLAG:false,
               /** 险种代码 */
               INSRNC_CDE: "",
               /** 保险金额/赔偿限额(元） */
               AMT: "",
               /** 不计免赔(0:否 1：是) */
               FRANCHISE_FLAG: "",
            },
            //10.发动机涉水损失险
            {
               //购买标记
               PURCHASE_FLAG:false,
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
               PURCHASE_FLAG:false,
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
               PURCHASE_FLAG:false,
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
               PURCHASE_FLAG:false,
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
               PURCHASE_FLAG:false,
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
               PURCHASE_FLAG:false,
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
               PURCHASE_FLAG:false,
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
            ///** 车型代码 */
            //MODEL_CODE: "",
            ///** 车型名称 */
            //MODEL_NAME: "",
            ///** 车型分类 */
            //CAR_SORT: "",
            ///** 进口/国产 */
            //CAR_STYLE: "",
            ///** 制造厂商 */
            //CAR_MAKER: "",
            ///** 吨位 */
            //TONNAGE: "",
            ///** 座位数 */
            //SET_NUM: "",
            ///** 排量 */
            //DISPLACEMENT: "",
            ///** 整备质量 */
            //QUALITY: "",
            ///** 车辆年份 */
            //MARKET_YEAR: "",
            ///** 新车购置价 */
            //CAR_PRICE: "",
            ///** 描述 */
            //CAR_REMARK: "",
            ///** 风险类型 */
            //RISK_NAME: "",
            ///** 车船税减免标志 */
            //FUELFLAG: "",
            ///** 新能源标志 */
            //NEW_ENERGY_FLAG: "",
            ///** 车型(传平台) */
            //MODEL: "",
            ///** 车型描述 */
            //DESCRIBE: "",
            ///**item是否选择 */
            //ischecked: "",
            ///** 开具税务机关 */
            //PAYTAX_REVENUE: "",
            ///** 减免标志 */
            //TAX_TYPE: "",
            ///** 能源种类 */
            //FUEL_TYPE: "",
            ///** 减免税原因 */
            //DEDUE_CDE: "",
            ///** 减免税方案*/
            //DEDUE_TYP: "",
            ///** 减免税比例*/
            //DEDUE_RATE: "",
            ///** 减免税凭证*/
            //PAYTAX_VOU: ""
            "BRAND_NAME": "奥迪",
            "CAR_MAKER": "德国奥迪汽车股份有限公司",
            "CAR_PRICE": "920500",
            "CAR_REMARK": "手自一体 舒适型 245kw",
            "CAR_SORT": "轿车类",
            "CAR_STYLE": "进口车",
            "DESCRIBE": "2012款 奥迪 A8 AUDI A8L 50TFSI QUATTRO轿车 手自一体 舒适型 245kw 5座 3.0L",
            "DISPLACEMENT": "2.995",
            "FAMILY_NAME": "A8",
            "FUELFLAG": "0",
            "MARKET_YEAR": "201208",
            "MODEL": "",
            "MODEL_CODE": "ADI1230DGA",
            "MODEL_NAME": "AUDI A8L 50TFSI QUATTRO轿车",
            "NEW_ENERGY_FLAG": "",
            "QUALITY": "2075",
            "RISK_NAME": "正常车型",
            "RUN_NAME": "奥迪A8L 3.0T AT舒适型",
            "SET_NUM": "5",
            "TONNAGE": "",
            "VEHICLE_PRICE": "999200"
         },
         /** 投保人同车主 1，被保人同车主2，投被保人都不同车主3,投保人被保人都同车主4*/
         VISIBLE_NO: "",
         /** 开具税务机关 */
         PAYTAX_REVENUE: "",
         /** 减免税凭证*/
         PAYTAX_VOU: "",//
         //是否选择个贷
         IS_CMPNY_AGT:false,
         /** 代理人工号*/
         CMPNY_AGT_CDE: "",
         /** 代理人名称*/
         CMPNY_AGT_NME: "",
         /** 交强险续保单号*/
         JQ_ORIG_PLY_NO: "",
         /** 交强险标志*/
         JQ_ORIG_FLG: "",
         /** 商业险续保单号*/
         SY_ORIG_PLY_NO: "",
         /** 商业险标志*/
         SY_ORIG_FLG: "",//
         /** 反欺诈答案*/
         ANSWER: "",
         /** 退回修改标志 **/
         BU: "",
         /** 退回修改标志 **/
         TO_WHERE: "",
         /** 商业险基本信息 */
         BASE_SY: {
            /** 被保险人联系人电话 **/
            INSRNT_TEL: "",
            /** 被保人证件类型 **/
            BIZ_CERT_TYPE: "",
            /** 保单号 **/
            PLY_NO: "",
            /** 保险止期 **/
            INSRNC_END_TM: "",
            /** 付款人姓名**/
            INSRNT_CTCT_CNM: "",
            /** 投保人证件类型 **/
            APP_CERT_TYPE: "",
            /** 投保单号 **/
            PLY_APP_NO: "",
            /** 投保人姓名 **/
            APP_NME: "",
            /** 投保人地址 **/
            APP_ADDR: "",
            /** 投保人邮箱 */
            EMAIL_APP: "",
            /** 续保标志 **/
            ORIG_FLG: "",
            /** 保额合计 **/
            AMOUNT: "",
            /** 机构部门 **/
            DPT_CDE: "",
            /** 投保人联系人电话 **/
            APP_TEL: "",
            /** 被保险人地址 **/
            INSRNT_ADDR: "",
            /** 保险起期 **/
            INSRNC_BGN_TM: "",
            /** 保费合计 **/
            PREMIUM: "",
            /** 续保单号 **/
            ORIG_PLY_NO: "",
            /** 投保人证件号码 **/
            APP_CERT_NO: "",
            /** 联系方式 **/
            RELAT_TEL: "",
            /** 被保险人姓名 **/
            INSRNT_CNM: "",
            /** 被保人证件号码 **/
            BIZ_CERT_NO: "",
            /** 被保险人邮箱*/
            EMAIL: "",
            /** 产品编码 **/
            PROD_NO: "",
            /** 商业险续保单号*/
            SY_ORIG_PLY_NO: "",
            /** 商业险标志*/
            SY_ORIG_FLG: "",//
            /**   即时生效 */
            IS_IMMEFC: ""
         },
         /** 交强险基本信息 */
         BASE_JQ: {
            /** 保单号 **/
            PLY_NO: "",
            /** 续保标志 **/
            ORIG_FLG: "",
            /** 保险起期 **/
            INSRNC_BGN_TM: "",
            /** 被保人证件号码 **/
            BIZ_CERT_NO: "",
            /** 续保单号 **/
            ORIG_PLY_NO: "",
            /** 被保人证件类型 **/
            BIZ_CERT_TYPE: "",
            /** 投保人地址 **/
            APP_ADDR: "",
            /** 投保人邮箱 */
            EMAIL_APP: "",
            /** 付款人姓名 **/
            INSRNT_CTCT_CNM: "",
            /** 投保人联系人电话 **/
            APP_TEL: "",
            /** 被保险人姓名 **/
            INSRNT_CNM: "",
            /** 被保险人地址 **/
            INSRNT_ADDR: "",
            /** 被保险人邮箱*/
            EMAIL: "",
            /** 保额合计 **/
            AMOUNT: "",
            /** 投保单号 **/
            PLY_APP_NO: "",
            /** 产品编码 **/
            PROD_NO: "",
            /** 投保人姓名 **/
            APP_NME: "",
            /** 投保人证件类型 **/
            APP_CERT_TYPE: "",
            /** 被保险人联系人电话 **/
            INSRNT_TEL: "",
            /** 投保人证件号码 **/
            APP_CERT_NO: "",
            /** 保险止期 **/
            INSRNC_END_TM: "",
            /** 保费合计 **/
            PREMIUM: "",
            /** 机构部门 **/
            DPT_CDE: "",
            /** 交强险续保单号*/
            JQ_ORIG_PLY_NO: "",
            /** 交强险标志*/
            JQ_ORIG_FLG: "",
            /**   即时生效 */
            IS_IMMEFC: ""
         },
         /** 商业险及时生效   */
         SY_IS_IMMEFC: "",
         /**  交强险及时生效  */
         JQ_IS_IMMEFC: "",
         /**  受益人  */
         CREDIT_BANK: "",
         /** 标的信息 */
         VHL: {
            /** 发动机号 */
            ENG_NO: "",
            /** 车架号/VIN码 */
            VHL_FRM: "",
            /** 厂牌车型名称 */
            BRND_NME: "",
            /** 初次登记日期 */
            FST_REG_DTE: "",
            /** 车辆类型 */
            VHL_TYPE: "",
            /** 行驶证车辆类型 */
            VHL_DESC: "",
            /** 号牌种类 */
            VEHICLE_TYPE: "",
            /** 所属性质 */
            BELONG_TYPE: "",
            /** 使用性质 */
            USE_TYPE: "",
            /** 核定载客数 */
            SET_NUM: "",
            /** 排气量 */
            EXT_MSR: "",
            /** 车身颜色 */
            COLOUR: "",
            /** 吨位数 */
            TONNAGE: "",
            /** 功率 */
            POWER: "",
            /** 转移登记日期 */
            TRANSFERDATE: "",
            /** 车型代码(全国通用) */
            SH_VHL_CODE: "",
            /** 新车购置价 */
            VHL_VAL: "",
            /** 车辆实际价值 */
            ACTUAL_VAL: "",
            /** 行驶证车主 */
            DRV_OWNER: "",
            /** 平台车型代码 */
            MODEL_CODE: ""
         },
         /** 车船税信息 */
         VHLTAX: {
            /** 减免税标志 */
            TAX_TYPE: "",
            /** 车船税车辆分类 */
            TAX_VHL_TYPE: "",
            /** 滞纳金 */
            LATE_FEE: "",
            /** 当年应缴 */
            CURRENT_TAX: "",
            /** 上年应缴 */
            FORMER_TAX: "",
            /** 合计应缴 */
            SUM_UP_TAX: "",
            /** 减免金额 */
            MINUS_TAX_AMT: "",
            /** 新能源车标志 */
            FUEL_TYPE: ""
         },
         /**  车辆来历凭证种类  */
         CERTIFICATE_TYPE: "",
         /**  车辆来历凭证编号  */
         CERTIFICATE_NO: "",
         /**  开具车辆来历凭证所载日期  */
         CERTIFICATE_DATE: "",
         /**投保人通车主    */
         appIsDrvOwner: "",
         /**被保人通车主    */
         insrntIsDrvOwner: "",
         /** 保存草稿箱时间   */
         insertTime: "",
         /**  江苏验证码  */
         CHECK_CODE: "",//
         /**  江苏查询码  */
         CHECK_NO: "",//
         /**  退回修改传的商业险投保单号  */
         OLD_PLY_APP_NO_SY: "",
         /**  退回修改传的交强险投保单号  */
         OLD_PLY_APP_NO_JQ: "",
         /**  交强险续保单号    草稿箱专用*/
         JQ_PLY_APP_NO: "",
         /**  商业险续保单号    草稿箱专用 */
         SY_PLY_APP_NO: "",
         /**  特约描述  */
         APPNT_DESC: "",
         /**  特约特约内容  */
         APPNT_CONTENT: "",//
         /**  浙江机构验车特约  */
         LOSSPART: "",
         /**  影像补传标志  */
         IS_IMAGE: "",
         /**  是否传二类专修厂特约  */
         REFLAG: "",
         /**     退回修改交强险投保单号     */
         TH_JQ_PLY_APP_NO: "",
         /**    退回修改交强险保单号     */
         TH_JQ_PLY_NO: "",
         /**     退回修改商业险投保单号     */
         TH_SY_PLY_APP_NO: "",
         /**     退回修改商业险保单号     */
         TH_SY_PLY_NO: ""
      };
      return {};
   }]);
});