webpackJsonp([33],{565:function(e,t,s){s(629);var a=s(32)(s(624),s(631),null,null);a.options.__file="D:\\Develop\\ZhidanCode\\chuangshi\\web\\src\\views\\cccec\\people.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] people.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},624:function(e,t,s){Object.defineProperty(t,"__esModule",{value:!0});var a=s(47),o=(function(e){e&&e.__esModule}(a),s(77));t.default={name:"extension",props:["bingdingid"],data:function(){return{usernames:"",pageCount:0,totalPages:0,pagesizes:20,pageNumber:1,choiceid:0,ids:"",tableColumns:[{type:"selection",width:60,align:"center"},{title:"用户名",key:"operName",align:"center"},{title:"帐号",key:"operNo",align:"center"},{title:"权限",key:"cnNames",align:"center"}],tableData:[],saveuserBox:!1,saveusername:"",saveuserNo:"",saveuserpw:"",roleName:[],roledata:[],bingdingrole:!1}},mounted:function(){sessionStorage.getItem("peoplelists")&&(this.list=JSON.parse(sessionStorage.getItem("peoplelists")),this.pageCount=Number(sessionStorage.getItem("peoplepageCounts")),this.linebox=Number(sessionStorage.getItem("peoplelineboxs")),this.pageSizes=this.linebox,this.totalPages=Number(sessionStorage.getItem("peopletotalPages"))),sessionStorage.getItem("usernames")&&(this.usernames=sessionStorage.getItem("usernames"))},created:function(){this.init(),this.getrole()},watch:{},methods:{init:function(){var e=this;(0,o.getuser)().then(function(t){e.tableData=t.data.list,e.pageCount=t.data.totalRow,e.totalPages=t.data.totalPage,e.pagesizes=t.data.pageSize})},getpeopleList:function(e){var t=this;this.loading=!0,console.log(this.usernames);(0,o.getuser)(e,this.pagesizes,this.usernames).then(function(e){console.log(e),t.tableData=e.data.list,t.pageCount=e.data.totalRow,t.totalPages=e.data.totalPage,t.pagesizes=e.data.pageSize,t.pageNumber=e.data.pageNumber,sessionStorage.removeItem("peoplelists"),sessionStorage.removeItem("peoplepageCounts"),sessionStorage.removeItem("usernames"),sessionStorage.removeItem("peoplelineboxs"),sessionStorage.removeItem("peopletotalPages");var s=JSON.stringify(e.data.list);sessionStorage.setItem("peoplelists",s),sessionStorage.setItem("peoplelineboxs",t.pagesizes),sessionStorage.setItem("peopletotalPages",t.totalPages),sessionStorage.setItem("peoplepageCounts",e.data.totalRow),t.usernames&&sessionStorage.setItem("usernames",t.usernames),t.loading=!1})},bindinguserbtn:function(){var e=this;console.log(this.bingdingid),this.loading=!0,this.bingdingid&&(0,o.bindingoperNo)(this.bingdingid,this.ids).then(function(t){e.loading=!1,"200"==t.code?(e.$Modal.success({title:"温馨提示",content:"绑定成功"}),setTimeout(function(e){e.$emit("clickuser",!1)},1e3,e)):e.$Modal.error({title:"温馨提示",content:t.message})})},getrole:function(){var e=this;(0,o.getrolelist)().then(function(t){e.roledata=t.data})},saveuserbtn:function(){this.saveuserBox=!0},saveuser:function(){var e=this,t={};t.operName=this.saveusername,t.operNo=this.saveuserNo,t.password=this.saveuserpw,(0,o.saveoperator)(t).then(function(t){"200"==t.code?e.$Modal.success({title:"温馨提示",content:"新增成功"}):e.$Modal.error({title:"温馨提示",content:t.message}),e.saveuserBox=!1,e.getpeopleList(e.pageNumber)})},saverolebtn:function(){""==this.ids?this.$Notice.warning({title:"请选择需要绑定的用户",desc:""}):this.bingdingrole=!0},roleUpdate:function(){var e=this;if(this.roleName){var t={};t.operNo=this.ids,t.roleNames=this.roleName.join(","),(0,o.saveoperatorrole)(t).then(function(t){"200"==t.code?e.$Modal.success({title:"温馨提示",content:"绑定成功"}):e.$Modal.error({title:"温馨提示",content:t.message}),e.getpeopleList(e.pageNumber),e.bingdingrole=!1})}},selectIds:function(e){var t=this;e.forEach(function(e,s){t.ids=0==s?e.operNo:t.operNo+","+e.operNo})}}}},629:function(e,t){},631:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("row",[s("card",[s("p",{attrs:{slot:"title"},slot:"title"},[s("Icon",{attrs:{type:"ios-list"}}),e._v(" "),s("span",[e._v("用户")])],1),e._v(" "),s("div",{staticClass:"sreach"},[s("div",{staticClass:"sreach-page"},[s("div",{staticClass:"sreach-box"},[s("span",[e._v("昵称:")]),e._v(" "),s("i-input",{attrs:{placeholder:"请输入推荐人..."},model:{value:e.usernames,callback:function(t){e.usernames=t},expression:"usernames"}})],1),e._v(" "),s("div",{staticClass:"sreach-box"},[s("div",{staticClass:"sreach-box sreach-box2",staticStyle:{"text-align":"right"}},[s("i-button",{attrs:{type:"info",icon:"ios-search"},on:{click:function(t){e.getpeopleList(1)}}},[e._v("搜索")]),e._v(" "),e.bingdingid?s("i-button",{attrs:{type:"warning"},on:{click:function(t){e.bindinguserbtn()}}},[e._v("绑定用户")]):e._e(),e._v(" "),null==e.bingdingid?s("i-button",{attrs:{type:"warning"},on:{click:function(t){e.saveuserbtn()}}},[e._v("新增商家")]):e._e(),e._v(" "),null==e.bingdingid?s("i-button",{attrs:{type:"warning"},on:{click:function(t){e.saverolebtn()}}},[e._v("绑定权限")]):e._e()],1)]),e._v(" "),s("div",{staticClass:"sreach-box linenumcss"},[s("p",[e._v("总共 "),s("span",[e._v(e._s(e.pageCount))]),e._v(" 条记录")]),e._v(" "),s("p",[e._v("共 "),s("span",[e._v(e._s(e.totalPages))]),e._v(" 页")]),e._v(" "),s("p",[e._v("每页\n                                "),s("i-input",{staticStyle:{width:"45px"},attrs:{number:"",placeholder:""},model:{value:e.pagesizes,callback:function(t){e.pagesizes=t},expression:"pagesizes"}}),e._v(" 条")],1)])]),e._v(" "),s("div",{staticClass:"sreach-page"})]),e._v(" "),s("i-table",{staticStyle:{width:"100%"},attrs:{columns:e.tableColumns,data:e.tableData},on:{"on-selection-change":e.selectIds}}),e._v(" "),s("div",{staticClass:"page-box",staticStyle:{"text-align":"right","margin-top":"15px"}},[s("page",{attrs:{total:e.pageCount,"page-size":e.pagesizes,"show-elevator":"","show-total":""},on:{"on-change":e.getpeopleList}})],1)],1)],1),e._v(" "),s("modal",{attrs:{width:"450"},model:{value:e.saveuserBox,callback:function(t){e.saveuserBox=t},expression:"saveuserBox"}},[s("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[s("span",[e._v("新增用户")])]),e._v(" "),s("div",{staticClass:"flexbox"},[s("div",{staticClass:"flex1 headertxt"},[e._v("用户名：")]),e._v(" "),s("div",{staticClass:"flex5"},[s("i-input",{attrs:{placeholder:"请输入"},model:{value:e.saveusername,callback:function(t){e.saveusername=t},expression:"saveusername"}})],1)]),e._v(" "),s("div",{staticClass:"flexbox"},[s("div",{staticClass:"flex1 headertxt"},[e._v("帐号：")]),e._v(" "),s("div",{staticClass:"flex5"},[s("i-input",{attrs:{placeholder:"请输入"},model:{value:e.saveuserNo,callback:function(t){e.saveuserNo=t},expression:"saveuserNo"}})],1)]),e._v(" "),s("div",{staticClass:"flexbox"},[s("div",{staticClass:"flex1 headertxt"},[e._v("密码：")]),e._v(" "),s("div",{staticClass:"flex5"},[s("i-input",{attrs:{placeholder:"请输入"},model:{value:e.saveuserpw,callback:function(t){e.saveuserpw=t},expression:"saveuserpw"}})],1)]),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("i-button",{attrs:{type:"primary",size:"large",long:""},on:{click:function(t){e.saveuser()}}},[e._v("确认提交")])],1)]),e._v(" "),s("modal",{attrs:{width:"360"},model:{value:e.bingdingrole,callback:function(t){e.bingdingrole=t},expression:"bingdingrole"}},[s("p",{staticStyle:{"text-align":"center"},attrs:{slot:"header"},slot:"header"},[s("icon",{attrs:{type:"information-circled"}}),s("span",[e._v("请选择")])],1),e._v(" "),s("div",[s("i-select",{attrs:{multiple:"",clearable:"",placeholder:"请选择"},model:{value:e.roleName,callback:function(t){e.roleName=t},expression:"roleName"}},e._l(e.roledata,function(t){return s("i-option",{key:t.name,attrs:{value:t.name}},[e._v(e._s(t.cnName))])}))],1),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("i-button",{attrs:{type:"primary",size:"large",long:""},on:{click:function(t){e.roleUpdate()}}},[e._v("确认提交")])],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});