webpackJsonp([34],{598:function(e,t,a){a(730);var n=a(32)(a(670),a(798),null,null);n.options.__file="D:\\Develop\\ZhidanCode\\chuangshi\\web\\src\\views\\cccec\\order\\returnorderpage.vue",n.esModule&&Object.keys(n.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),n.options.functional&&console.error("[vue-loader] returnorderpage.vue: functional components are not supported with templates, they should use render functions."),e.exports=n.exports},670:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0});var n=a(47),s=(function(e){e&&e.__esModule}(n),a(77));t.default={name:"returnorderpage",data:function(){var e=this;return{returnmonid:"",orderId:"",ordernumber:"",ordername:"",pageCount:0,totalPages:0,pagesizes:20,choiceid:0,pageNumber:1,ids:"",status:"",needDateFrom:"",needDateTo:"",statusdata:[{id:"0",name:"未审核"},{id:"1",name:"通过"},{id:"2",name:"不通过"}],tableColumns:[{type:"selection",width:60,align:"center"},{title:"订单单号",key:"ord.order_no",align:"center",width:180},{title:"商品名称",key:"goods.name",align:"center"},{title:"申请日期",key:"requestTime",align:"center",width:160},{title:"状态",key:"status",align:"center",render:function(e,t){return e("div",[e("span","1"==t.row.status?"待审核":"2"==t.row.status?"审批通过":"3"==t.row.status?"审批不通过":"4"==t.row.status?"已发货":"5"==t.row.status?"退货完成":"已取消")])}},{title:"审核",key:"action",width:80,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"info",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.batchUpdateBox=!0,e.orderId=a.row.id}}},"审核")])}},{title:"退款",key:"action",width:80,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"error",size:"small"},style:{marginRight:"5px"},on:{click:function(){if(2!=a.row.status)return void e.$Message.error("审批未通过，不能退款！");e.returnmonid=a.row.id,e.returnmon(a.row.id)}}},"退款")])}}],tableData:[],batchUpdateBox:!1,statesbox:[{id:1,name:"待审核"},{id:2,name:"审批通过"},{id:3,name:"审批不通过"},{id:4,name:"已发货"},{id:5,name:"退货完成"},{id:6,name:"已取消"}]}},mounted:function(){var e=this;(0,s.getreturnorderpage)().then(function(t){console.log(111),e.tableData=t.data.list,e.pageCount=t.data.totalRow,e.totalPages=t.data.totalPage,e.pagesizes=t.data.pageSize})},created:function(){},watch:{},methods:{returnmon:function(e){var t=this;this.$Modal.confirm({title:"温馨提示",content:"<p>确认退款</p>",onOk:function(){(0,s.returnordermon)(e).then(function(e){console.log(e),e.success?t.$Message.success("退款成功"):t.$Message.error(e.message)})},onCancel:function(){t.$Message.info("已取消")}})},init:function(){},getBalance:function(e){var t=this;this.loading=!0;(""!=this.needDateFrom&&""==this.needDateTo||""==this.needDateFrom&&""!=this.needDateTo)&&this.$Modal.warning({title:"温馨提示",content:"请选择退货时间"}),""!=this.needDateFrom&&""!=this.needDateTo&&(this.needDateFrom=this.timestampToTime(this.needDateFrom),this.needDateTo=this.timestampToTime(this.needDateTo)),(0,s.getreturnorderpage)(e,this.pagesizes,this.ordernumber,this.ordername,this.needDateFrom,this.needDateTo,this.status).then(function(e){console.log(e),t.tableData=e.data.list,t.pageCount=e.data.totalRow,t.totalPages=e.data.totalPage,t.pagesizes=e.data.pageSize,t.pageNumber=e.data.pageNumber,t.loading=!1})},timestampToTime:function(e){var t=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var n=e.getDate();return n=n<10?"0"+n:n,t+"-"+a+"-"+n},upBatchUpdate:function(){var e=this;if(!this.choiceid)return void this.$Message.success("请选择状态");(0,s.checkreturnorder)(this.orderId,this.choiceid,"admin").then(function(t){"200"==t.code?(e.$Modal.success({title:"温馨提示",content:"<p>审核成功</p>"}),e.getBalance(e.pageNumber),e.choiceid="",e.batchUpdateBox=!1):(e.$Modal.error({title:"温馨提示",content:"<p>"+t.message+"</p>"}),e.getBalance(e.pageNumber),e.choiceid="",e.batchUpdateBox=!1)})},selectIds:function(e){var t=this;e.forEach(function(e,a){t.ids=0==a?e.id:t.ids+","+e.id})}}}},730:function(e,t){},798:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("row",[a("card",[a("p",{attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"ios-list"}}),e._v(" "),a("span",[e._v("退货管理")])],1),e._v(" "),a("div",{staticClass:"sreach"},[a("div",{staticClass:"sreach-page"},[a("div",{staticClass:"sreach-box"},[a("span",[e._v("订单单号:")]),e._v(" "),a("i-input",{attrs:{placeholder:"请输入订单单号..."},model:{value:e.ordernumber,callback:function(t){e.ordernumber=t},expression:"ordernumber"}})],1),e._v(" "),a("div",{staticClass:"sreach-box"},[a("span",[e._v("订单名称:")]),e._v(" "),a("i-input",{attrs:{placeholder:"请输入订单名称..."},model:{value:e.ordername,callback:function(t){e.ordername=t},expression:"ordername"}})],1),e._v(" "),a("div",{staticClass:"sreach-box"},[a("span",[e._v("订单状态:")]),e._v(" "),a("i-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},e._l(e.statesbox,function(t){return a("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("div",{staticClass:"sreach-box"},[a("div",{staticClass:"sreach-box sreach-box2",staticStyle:{"text-align":"right"}},[a("i-button",{attrs:{type:"info",icon:"ios-search"},on:{click:function(t){e.getBalance(1)}}},[e._v("搜索")])],1)])]),e._v(" "),a("div",{staticClass:"sreach-page"},[a("div",{staticClass:"sreach-box sreach-box4"},[a("span",[e._v("时间:")]),e._v(" "),a("Row",[a("Col",{attrs:{span:"11"}},[a("DatePicker",{attrs:{type:"date",format:"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.needDateFrom,callback:function(t){e.needDateFrom=t},expression:"needDateFrom"}})],1),e._v(" "),a("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}},[e._v("-")]),e._v(" "),a("Col",{attrs:{span:"11"}},[a("DatePicker",{attrs:{type:"date",format:"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.needDateTo,callback:function(t){e.needDateTo=t},expression:"needDateTo"}})],1)],1)],1)]),e._v(" "),a("div",{staticClass:"sreach-page"},[a("div",{staticClass:"sreach-box linenumcss"},[a("p",[e._v("总共 "),a("span",[e._v(e._s(e.pageCount))]),e._v(" 条记录")]),e._v(" "),a("p",[e._v("共 "),a("span",[e._v(e._s(e.totalPages))]),e._v(" 页")]),e._v(" "),a("p",[e._v("每页\n                                "),a("i-input",{staticStyle:{width:"45px"},attrs:{number:"",placeholder:""},model:{value:e.pagesizes,callback:function(t){e.pagesizes=t},expression:"pagesizes"}}),e._v(" 条")],1)])])]),e._v(" "),a("i-table",{ref:"table",staticStyle:{width:"100%"},attrs:{columns:e.tableColumns,data:e.tableData},on:{"on-selection-change":e.selectIds}}),e._v(" "),a("div",{staticClass:"page-box",staticStyle:{"text-align":"right","margin-top":"15px"}},[a("page",{attrs:{total:e.pageCount,"page-size":e.pagesizes,"show-elevator":"","show-total":""},on:{"on-change":e.getBalance}})],1)],1)],1),e._v(" "),a("modal",{attrs:{width:"360"},model:{value:e.batchUpdateBox,callback:function(t){e.batchUpdateBox=t},expression:"batchUpdateBox"}},[a("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("icon",{attrs:{type:"information-circled"}}),a("span",[e._v("请选择")])],1),e._v(" "),a("div",[a("i-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.choiceid,callback:function(t){e.choiceid=t},expression:"choiceid"}},e._l(e.statesbox,function(t){return a("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("i-button",{attrs:{type:"primary",size:"large",long:""},on:{click:e.upBatchUpdate}},[e._v("确认提交")])],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});