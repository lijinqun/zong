webpackJsonp([14,33],{565:function(e,t,s){s(629);var a=s(32)(s(624),s(631),null,null);a.options.__file="D:\\Develop\\ZhidanCode\\chuangshi\\web\\src\\views\\cccec\\people.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] people.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},572:function(e,t,s){s(747);var a=s(32)(s(642),s(818),"data-v-77fc8c8a",null);a.options.__file="D:\\Develop\\ZhidanCode\\chuangshi\\web\\src\\views\\cccec\\community\\shopTransfer.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] shopTransfer.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},624:function(e,t,s){Object.defineProperty(t,"__esModule",{value:!0});var a=s(47),i=(function(e){e&&e.__esModule}(a),s(77));t.default={name:"extension",props:["bingdingid"],data:function(){return{usernames:"",pageCount:0,totalPages:0,pagesizes:20,pageNumber:1,choiceid:0,ids:"",tableColumns:[{type:"selection",width:60,align:"center"},{title:"用户名",key:"operName",align:"center"},{title:"帐号",key:"operNo",align:"center"},{title:"权限",key:"cnNames",align:"center"}],tableData:[],saveuserBox:!1,saveusername:"",saveuserNo:"",saveuserpw:"",roleName:[],roledata:[],bingdingrole:!1}},mounted:function(){sessionStorage.getItem("peoplelists")&&(this.list=JSON.parse(sessionStorage.getItem("peoplelists")),this.pageCount=Number(sessionStorage.getItem("peoplepageCounts")),this.linebox=Number(sessionStorage.getItem("peoplelineboxs")),this.pageSizes=this.linebox,this.totalPages=Number(sessionStorage.getItem("peopletotalPages"))),sessionStorage.getItem("usernames")&&(this.usernames=sessionStorage.getItem("usernames"))},created:function(){this.init(),this.getrole()},watch:{},methods:{init:function(){var e=this;(0,i.getuser)().then(function(t){e.tableData=t.data.list,e.pageCount=t.data.totalRow,e.totalPages=t.data.totalPage,e.pagesizes=t.data.pageSize})},getpeopleList:function(e){var t=this;this.loading=!0,console.log(this.usernames);(0,i.getuser)(e,this.pagesizes,this.usernames).then(function(e){console.log(e),t.tableData=e.data.list,t.pageCount=e.data.totalRow,t.totalPages=e.data.totalPage,t.pagesizes=e.data.pageSize,t.pageNumber=e.data.pageNumber,sessionStorage.removeItem("peoplelists"),sessionStorage.removeItem("peoplepageCounts"),sessionStorage.removeItem("usernames"),sessionStorage.removeItem("peoplelineboxs"),sessionStorage.removeItem("peopletotalPages");var s=JSON.stringify(e.data.list);sessionStorage.setItem("peoplelists",s),sessionStorage.setItem("peoplelineboxs",t.pagesizes),sessionStorage.setItem("peopletotalPages",t.totalPages),sessionStorage.setItem("peoplepageCounts",e.data.totalRow),t.usernames&&sessionStorage.setItem("usernames",t.usernames),t.loading=!1})},bindinguserbtn:function(){var e=this;console.log(this.bingdingid),this.loading=!0,this.bingdingid&&(0,i.bindingoperNo)(this.bingdingid,this.ids).then(function(t){e.loading=!1,"200"==t.code?(e.$Modal.success({title:"温馨提示",content:"绑定成功"}),setTimeout(function(e){e.$emit("clickuser",!1)},1e3,e)):e.$Modal.error({title:"温馨提示",content:t.message})})},getrole:function(){var e=this;(0,i.getrolelist)().then(function(t){e.roledata=t.data})},saveuserbtn:function(){this.saveuserBox=!0},saveuser:function(){var e=this,t={};t.operName=this.saveusername,t.operNo=this.saveuserNo,t.password=this.saveuserpw,(0,i.saveoperator)(t).then(function(t){"200"==t.code?e.$Modal.success({title:"温馨提示",content:"新增成功"}):e.$Modal.error({title:"温馨提示",content:t.message}),e.saveuserBox=!1,e.getpeopleList(e.pageNumber)})},saverolebtn:function(){""==this.ids?this.$Notice.warning({title:"请选择需要绑定的用户",desc:""}):this.bingdingrole=!0},roleUpdate:function(){var e=this;if(this.roleName){var t={};t.operNo=this.ids,t.roleNames=this.roleName.join(","),(0,i.saveoperatorrole)(t).then(function(t){"200"==t.code?e.$Modal.success({title:"温馨提示",content:"绑定成功"}):e.$Modal.error({title:"温馨提示",content:t.message}),e.getpeopleList(e.pageNumber),e.bingdingrole=!1})}},selectIds:function(e){var t=this;e.forEach(function(e,s){t.ids=0==s?e.operNo:t.operNo+","+e.operNo})}}}},629:function(e,t){},631:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("row",[s("card",[s("p",{attrs:{slot:"title"},slot:"title"},[s("Icon",{attrs:{type:"ios-list"}}),e._v(" "),s("span",[e._v("用户")])],1),e._v(" "),s("div",{staticClass:"sreach"},[s("div",{staticClass:"sreach-page"},[s("div",{staticClass:"sreach-box"},[s("span",[e._v("昵称:")]),e._v(" "),s("i-input",{attrs:{placeholder:"请输入推荐人..."},model:{value:e.usernames,callback:function(t){e.usernames=t},expression:"usernames"}})],1),e._v(" "),s("div",{staticClass:"sreach-box"},[s("div",{staticClass:"sreach-box sreach-box2",staticStyle:{"text-align":"right"}},[s("i-button",{attrs:{type:"info",icon:"ios-search"},on:{click:function(t){e.getpeopleList(1)}}},[e._v("搜索")]),e._v(" "),e.bingdingid?s("i-button",{attrs:{type:"warning"},on:{click:function(t){e.bindinguserbtn()}}},[e._v("绑定用户")]):e._e(),e._v(" "),null==e.bingdingid?s("i-button",{attrs:{type:"warning"},on:{click:function(t){e.saveuserbtn()}}},[e._v("新增商家")]):e._e(),e._v(" "),null==e.bingdingid?s("i-button",{attrs:{type:"warning"},on:{click:function(t){e.saverolebtn()}}},[e._v("绑定权限")]):e._e()],1)]),e._v(" "),s("div",{staticClass:"sreach-box linenumcss"},[s("p",[e._v("总共 "),s("span",[e._v(e._s(e.pageCount))]),e._v(" 条记录")]),e._v(" "),s("p",[e._v("共 "),s("span",[e._v(e._s(e.totalPages))]),e._v(" 页")]),e._v(" "),s("p",[e._v("每页\n                                "),s("i-input",{staticStyle:{width:"45px"},attrs:{number:"",placeholder:""},model:{value:e.pagesizes,callback:function(t){e.pagesizes=t},expression:"pagesizes"}}),e._v(" 条")],1)])]),e._v(" "),s("div",{staticClass:"sreach-page"})]),e._v(" "),s("i-table",{staticStyle:{width:"100%"},attrs:{columns:e.tableColumns,data:e.tableData},on:{"on-selection-change":e.selectIds}}),e._v(" "),s("div",{staticClass:"page-box",staticStyle:{"text-align":"right","margin-top":"15px"}},[s("page",{attrs:{total:e.pageCount,"page-size":e.pagesizes,"show-elevator":"","show-total":""},on:{"on-change":e.getpeopleList}})],1)],1)],1),e._v(" "),s("modal",{attrs:{width:"450"},model:{value:e.saveuserBox,callback:function(t){e.saveuserBox=t},expression:"saveuserBox"}},[s("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[s("span",[e._v("新增用户")])]),e._v(" "),s("div",{staticClass:"flexbox"},[s("div",{staticClass:"flex1 headertxt"},[e._v("用户名：")]),e._v(" "),s("div",{staticClass:"flex5"},[s("i-input",{attrs:{placeholder:"请输入"},model:{value:e.saveusername,callback:function(t){e.saveusername=t},expression:"saveusername"}})],1)]),e._v(" "),s("div",{staticClass:"flexbox"},[s("div",{staticClass:"flex1 headertxt"},[e._v("帐号：")]),e._v(" "),s("div",{staticClass:"flex5"},[s("i-input",{attrs:{placeholder:"请输入"},model:{value:e.saveuserNo,callback:function(t){e.saveuserNo=t},expression:"saveuserNo"}})],1)]),e._v(" "),s("div",{staticClass:"flexbox"},[s("div",{staticClass:"flex1 headertxt"},[e._v("密码：")]),e._v(" "),s("div",{staticClass:"flex5"},[s("i-input",{attrs:{placeholder:"请输入"},model:{value:e.saveuserpw,callback:function(t){e.saveuserpw=t},expression:"saveuserpw"}})],1)]),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("i-button",{attrs:{type:"primary",size:"large",long:""},on:{click:function(t){e.saveuser()}}},[e._v("确认提交")])],1)]),e._v(" "),s("modal",{attrs:{width:"360"},model:{value:e.bingdingrole,callback:function(t){e.bingdingrole=t},expression:"bingdingrole"}},[s("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[s("icon",{attrs:{type:"information-circled"}}),s("span",[e._v("请选择")])],1),e._v(" "),s("div",[s("i-select",{attrs:{multiple:"",clearable:"",placeholder:"请选择"},model:{value:e.roleName,callback:function(t){e.roleName=t},expression:"roleName"}},e._l(e.roledata,function(t){return s("i-option",{key:t.name,attrs:{value:t.name}},[e._v(e._s(t.cnName))])}))],1),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("i-button",{attrs:{type:"primary",size:"large",long:""},on:{click:function(t){e.roleUpdate()}}},[e._v("确认提交")])],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},642:function(e,t,s){function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}Object.defineProperty(t,"__esModule",{value:!0});var o=s(47),n=(a(o),s(565)),r=a(n),l=s(77);t.default={components:{userpage:r.default},name:"extension",data:function(){var e;return e={shopName:"",username:"",tradeType:"",tradeTyperef:"",tradeTypeable:"",tradeStatusref:"",tradeStatusable:"",tradeStatus:"",tradetypelist:[{id:"0",name:"公开"},{id:"1",name:"私密"}],tradeStatuslist:[{id:"0",name:"待审核"},{id:"1",name:"出让中"},{id:"2",name:"关闭交易"}],showuser:!1,bingdingid:"",catIddata:[]},i(e,"shopName",""),i(e,"clickcatId",""),i(e,"pageCount",0),i(e,"totalPages",0),i(e,"pagesizes",20),i(e,"choiceid",0),i(e,"pageNumber",1),i(e,"ids",""),i(e,"status",""),i(e,"needDateFrom",""),i(e,"needDateTo",""),i(e,"phone",""),i(e,"shopstatusqury",""),i(e,"account",""),i(e,"acountable",!1),i(e,"accountstatus",[{id:1,name:"已绑定"},{id:0,name:"没绑定"}]),i(e,"shopstatusdata",[{id:"1",name:"待入驻"},{id:"2",name:"辅导期"},{id:"3",name:"已入驻"}]),i(e,"statusdata",[{id:"0",name:"未审核"},{id:"1",name:"通过"},{id:"2",name:"不通过"}]),i(e,"tableColumns",[{type:"selection",width:60,align:"center"},{title:"交易时间",key:"createdTime",width:200,align:"left",render:function(e,t){return e("div",[e("p",t.row.createdTime),e("p",t.row.expiredTime)])}},{title:"商品名称",key:"goodsName",width:130,align:"center"},{title:"转让人",key:"member.username",width:100,align:"center",render:function(e,t){return e("div",[e("p",t.row["member.username"])])}},{title:"省",width:200,key:"area1.area"},{title:"市",width:200,key:"area2.area"},{title:"区",width:200,key:"area3.area"},{title:"数量",key:"totalQuantity",width:100,align:"center"},{title:"交易数量",key:"tradedQuantity",width:100,align:"center"},{title:"单价",key:"price",width:100,align:"center"},{title:"总价",key:"goodsAmount",width:100,align:"center",render:function(e,t){return e("div",[e("p",Number(t.row.totalQuantity)*Number(t.row.price))])}},{title:"当前进度",key:"",align:"center",width:100,render:function(e,t){return e("div",[e("p",parseInt(t.row.tradedQuantity/t.row.totalQuantity*100)+"%")])}},{title:"交易类型",key:"tradetype",align:"center",width:100,render:function(e,t){return e("div",[e("p",0==t.row.tradetype?"公开":1==t.row.tradetype?"私密":"")])}},{title:"状态",key:"tradeStatus",align:"center",width:100,render:function(e,t){return e("div",[e("p",0==t.row.tradeStatus?"待审核":1==t.row.tradeStatus?"出让中":2==t.row.tradeStatus?"关闭交易":"")])}}]),i(e,"tableData",[]),i(e,"batchUpdateBox",!1),i(e,"updateShopStatusBox",!1),i(e,"saveuserBox",!1),i(e,"statesbox",[{id:1,name:"通过"},{id:2,name:"不通过"}]),i(e,"shopStatusSel",""),i(e,"shopstatesbox",[{id:1,name:"待入驻"},{id:2,name:"辅导期"},{id:3,name:"已入驻"}]),i(e,"province",""),i(e,"queryproince",""),i(e,"provincelist",[]),i(e,"provinceable",!1),i(e,"city",""),i(e,"querycity",""),i(e,"citylist",[]),i(e,"cityable",!1),i(e,"town",""),i(e,"querytown",""),i(e,"townlist",[]),i(e,"townable",!1),i(e,"provinceName",""),i(e,"cityName",""),i(e,"townName",""),e},mounted:function(){sessionStorage.getItem("shoplists")&&(this.list=JSON.parse(sessionStorage.getItem("shoplists")),this.pageCount=Number(sessionStorage.getItem("shoppageCounts")),this.linebox=Number(sessionStorage.getItem("shoplineboxs")),this.pageSizes=this.linebox,this.totalPages=Number(sessionStorage.getItem("shoptotalPages"))),sessionStorage.getItem("shopName")&&(this.shopName=sessionStorage.getItem("shopName"))},created:function(){this.getcatId(),this.init()},watch:{},methods:{init:function(){var e=this;(0,l.gettransferlist)().then(function(t){e.tableData=t.data.list,e.pageCount=t.data.totalRow,e.totalPages=t.data.totalPage,e.pagesizes=t.data.pageSize}),(0,l.getarealevel)(1,0).then(function(t){e.provincelist=t.data})},getcatId:function(){var e=this;(0,l.gettransferlist)().then(function(t){e.catIddata=t.data})},optionbtns:function(e){var t=this;if(this.shopstatusqury="",this.shopStatus="",console.log("下标值:"+e),void 0==e){this.pageNumber="",this.pageSizes="";this.shopstatusqury="",this.shopStatus=0,this.shopName="",this.clickcatId="",this.phone="",this.account="",this.province="",this.city="",this.town="",this.status=""}else 0==e?this.status="0":1==e?this.status=e:2==e?(this.status=1,this.shopstatusqury=1):3==e?(this.status=1,this.shopstatusqury=2):4==e&&(this.status=1,this.shopstatusqury=3);(0,l.gettransferlist)(this.pageNumber,this.shopName,this.username,this.tradeType,this.tradeStatus,this.province,this.city,this.town).then(function(e){t.tableData=e.data.list,t.pageCount=e.data.totalRow,t.totalPages=e.data.totalPage,t.pagesizes=e.data.pageSize,t.pageNumber=e.data.pageNumber})},gettransferlist:function(e){var t=this;console.log("val:"+e),this.loading=!0;(0,l.gettransferlist)(e,this.shopName,this.username,this.tradeType,this.tradeStatus,this.province,this.city,this.town).then(function(e){t.shopName="",t.username="",console.log(e),t.tableData=e.data.list,t.pageCount=e.data.totalRow,t.totalPages=e.data.totalPage,t.pagesizes=e.data.pageSize,t.pageNumber=e.data.pageNumber,sessionStorage.removeItem("shoplists"),sessionStorage.removeItem("shoppageCounts"),sessionStorage.removeItem("shopName"),sessionStorage.removeItem("shoplineboxs"),sessionStorage.removeItem("shoptotalPages");var s=JSON.stringify(e.data.list);sessionStorage.setItem("shoplists",s),sessionStorage.setItem("shoplineboxs",t.pagesizes),sessionStorage.setItem("shoptotalPages",t.totalPages),sessionStorage.setItem("shoppageCounts",e.data.totalRow),t.shopName&&sessionStorage.setItem("shopName",t.shopName),t.loading=!1})},timestampToTime:function(e){var t=e.getFullYear(),s=e.getMonth()+1;s=s<10?"0"+s:s;var a=e.getDate();return a=a<10?"0"+a:a,t+"-"+s+"-"+a},clickexamine:function(){""==this.ids?this.$Notice.warning({title:"请选择需要审核的用户",desc:""}):this.batchUpdateBox=!0},upBatchUpdate:function(){var e=this;(0,l.updateshop)(this.ids,this.choiceid).then(function(t){"200"==t.code?(e.$Modal.success({title:"温馨提示",content:"<p>审核成功</p>"}),e.gettransferlist(e.pageNumber),e.ids="",e.batchUpdateBox=!1):(e.$Modal.error({title:"温馨提示",content:"<p>"+t.message+"</p>"}),e.gettransferlist(e.pageNumber),e.ids="",e.batchUpdateBox=!1)})},updateShopStatus:function(){var e=this;console.log("shopStatus:"+this.shopStatusSel),(0,l.updateshopstatus)(this.ids,this.shopStatusSel).then(function(t){"200"==t.code?(e.$Modal.success({title:"温馨提示",content:"<p>更新状态成功</p>"}),e.gettransferlist(e.pageNumber),e.ids="",e.updateShopStatusBox=!1):e.$Modal.error({title:"温馨提示",content:"<p>"+t.message+"</p>"})})},clickuser:function(e){this.gettransferlist(this.pageNumber),this.showuser=e},selectIds:function(e){var t=this;e.forEach(function(e,s){t.ids=0==s?e.id:t.ids+","+e.id})},selectProvince:function(e){var t=this;(0,l.getarealevel)(2,this.province).then(function(e){t.town="",t.citylist=e.data,console.log("city:"+t.citylist)})},selectCity:function(e){var t=this;(0,l.getarealevel)(3,this.city).then(function(e){t.townlist=e.data,console.log(t.townlist)})},selectTown:function(e){console.log("town:"+this.town)},updateProvince:function(e){var t=this;(0,l.getarealevel)(2,this.queryproince).then(function(e){t.town="",t.citylist=e.data,console.log("city:"+t.citylist)})},updateCity:function(e){var t=this;(0,l.getarealevel)(3,this.querycity).then(function(e){t.townlist=e.data})},updateTown:function(e){console.log("town:"+this.town)}}}},747:function(e,t){},818:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("row",[s("card",[s("div",{staticClass:"sreach"},[s("div",{staticClass:"sreach-page"},[s("div",{staticClass:"box"},[s("span",[e._v("商品名称:")]),e._v(" "),s("i-input",{staticClass:"fixedwidth-10",attrs:{placeholder:"请输入商品名称"},model:{value:e.shopName,callback:function(t){e.shopName=t},expression:"shopName"}})],1),e._v(" "),s("div",{staticClass:"box"},[s("span",[e._v("转让人:")]),e._v(" "),s("i-input",{staticClass:"fixedwidth-10",attrs:{placeholder:"请输入转让人名称"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})],1),e._v(" "),s("div",{staticClass:"box"},[s("span",[e._v("交易类型:")]),e._v(" "),s("i-select",{ref:"tradeTyperef",staticClass:"fixedwidth-10",attrs:{clearable:"",filterable:""},model:{value:e.tradeType,callback:function(t){e.tradeType=t},expression:"tradeType"}},e._l(e.tradetypelist,function(t){return s("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])}))],1),e._v(" "),s("div",{staticClass:"box"},[s("span",[e._v("状态:")]),e._v(" "),s("i-select",{ref:"tradeStatusref",staticClass:"fixedwidth-10",attrs:{clearable:"",filterable:""},model:{value:e.tradeStatus,callback:function(t){e.tradeStatus=t},expression:"tradeStatus"}},e._l(e.tradeStatuslist,function(t){return s("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])}))],1)]),e._v(" "),s("div",{staticClass:"sreach-page"},[s("div",{staticClass:"box"},[s("span",[e._v("省:")]),e._v(" "),s("i-select",{ref:"provinceref",staticClass:"fixedwidth-6",attrs:{clearable:"",filterable:"",disabled:e.provinceable},on:{"on-change":e.selectProvince},model:{value:e.province,callback:function(t){e.province=t},expression:"province"}},e._l(e.provincelist,function(t){return s("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.area))])}))],1),e._v(" "),s("div",{staticClass:"box"},[s("span",[e._v("市:")]),e._v(" "),s("i-select",{ref:"cityref",staticClass:"fixedwidth-6",attrs:{clearable:"",filterable:"",disabled:e.cityable},on:{"on-change":e.selectCity},model:{value:e.city,callback:function(t){e.city=t},expression:"city"}},e._l(e.citylist,function(t){return s("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.area))])}))],1),e._v(" "),s("div",{staticClass:"box"},[s("span",[e._v("区:")]),e._v(" "),s("i-select",{ref:"townref",staticClass:"fixedwidth-6",attrs:{clearable:"",filterable:"",disabled:e.townable},model:{value:e.town,callback:function(t){e.town=t},expression:"town"}},e._l(e.townlist,function(t){return s("i-option",{key:t.id,attrs:{value:t.id},on:{"on-change":e.selectTown}},[e._v(e._s(t.area))])}))],1)]),e._v(" "),s("div",{staticClass:"sreach-page"},[s("div",{staticClass:"sreach-box sreach-box2",staticStyle:{"text-align":"right"}},[s("i-button",{attrs:{type:"info"},on:{click:function(t){e.gettransferlist(1)}}},[e._v("搜索")])],1),e._v(" "),s("div",{staticClass:"sreach-box linenumcss"},[s("p",[e._v("总共 "),s("span",[e._v(e._s(e.pageCount))]),e._v(" 条记录")]),e._v(" "),s("p",[e._v("共 "),s("span",[e._v(e._s(e.totalPages))]),e._v(" 页")]),e._v(" "),s("p",[e._v("每页\n                            "),s("i-input",{staticStyle:{width:"45px"},attrs:{number:"",placeholder:""},model:{value:e.pagesizes,callback:function(t){e.pagesizes=t},expression:"pagesizes"}}),e._v(" 条")],1)])])]),e._v(" "),s("i-table",{ref:"table",staticStyle:{width:"100%"},attrs:{columns:e.tableColumns,data:e.tableData,height:"500"},on:{"on-selection-change":e.selectIds}}),e._v(" "),s("div",{staticClass:"page-box",staticStyle:{"text-align":"right","margin-top":"15px"}},[s("page",{attrs:{total:e.pageCount,"page-size":e.pagesizes,"show-elevator":"","show-total":""},on:{"on-change":e.gettransferlist}})],1)],1)],1),e._v(" "),s("modal",{attrs:{width:"360"},model:{value:e.batchUpdateBox,callback:function(t){e.batchUpdateBox=t},expression:"batchUpdateBox"}},[s("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[s("icon",{attrs:{type:"information-circled"}}),s("span",[e._v("请选择")])],1),e._v(" "),s("div",[s("i-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.choiceid,callback:function(t){e.choiceid=t},expression:"choiceid"}},e._l(e.statesbox,function(t){return s("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])}))],1),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("i-button",{attrs:{type:"primary",size:"large",long:""},on:{click:e.upBatchUpdate}},[e._v("确认提交")])],1)]),e._v(" "),s("modal",{attrs:{width:"360"},model:{value:e.updateShopStatusBox,callback:function(t){e.updateShopStatusBox=t},expression:"updateShopStatusBox"}},[s("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[s("icon",{attrs:{type:"information-circled"}}),s("span",[e._v("请选择")])],1),e._v(" "),s("div",[s("i-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.shopStatusSel,callback:function(t){e.shopStatusSel=t},expression:"shopStatusSel"}},e._l(e.shopstatesbox,function(t){return s("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])}))],1),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("i-button",{attrs:{type:"primary",size:"large",long:""},on:{click:e.updateShopStatus}},[e._v("确认提交")])],1)]),e._v(" "),s("modal",{attrs:{width:"450"},model:{value:e.saveuserBox,callback:function(t){e.saveuserBox=t},expression:"saveuserBox"}},[s("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[s("span",[e._v("修改商铺地区")])]),e._v(" "),s("div",{staticClass:"flexbox"},[s("div",{staticClass:"flex1 headertxt"},[e._v("省：")]),e._v(" "),s("div",{staticClass:"flex5"},[s("i-select",{ref:"provinceref",attrs:{clearable:"",filterable:"",disabled:e.provinceable},on:{"on-change":e.updateProvince},model:{value:e.queryproince,callback:function(t){e.queryproince=t},expression:"queryproince"}},e._l(e.provincelist,function(t){return s("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.area))])}))],1)]),e._v(" "),s("div",{staticClass:"flexbox"},[s("div",{staticClass:"flex1 headertxt"},[e._v("市：")]),e._v(" "),s("div",{staticClass:"flex5"},[s("i-select",{ref:"cityref",attrs:{clearable:"",filterable:"",disabled:e.cityable},on:{"on-change":e.updateCity},model:{value:e.querycity,callback:function(t){e.querycity=t},expression:"querycity"}},e._l(e.citylist,function(t){return s("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.area))])}))],1)]),e._v(" "),s("div",{staticClass:"flexbox"},[s("div",{staticClass:"flex1 headertxt"},[e._v("区：")]),e._v(" "),s("div",{staticClass:"flex5"},[s("i-select",{ref:"townref",attrs:{clearable:"",filterable:"",disabled:e.townable},on:{"on-change":e.updateTown},model:{value:e.querytown,callback:function(t){e.querytown=t},expression:"querytown"}},e._l(e.townlist,function(t){return s("i-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.area))])}))],1)]),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("i-button",{attrs:{type:"primary",size:"large",long:""},on:{click:function(t){e.updateShopArea()}}},[e._v("确认提交")])],1)]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showuser,expression:"showuser"}],staticClass:"userdata"},[s("userpage",{attrs:{bingdingid:e.bingdingid},on:{clickuser:e.clickuser}})],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});