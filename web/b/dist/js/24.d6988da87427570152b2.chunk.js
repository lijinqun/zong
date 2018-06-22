webpackJsonp([24],{613:function(e,t,s){s(759);var o=s(32)(s(695),s(831),null,null);o.options.__file="D:\\Develop\\ZhidanCode\\chuangshi\\web\\src\\views\\own-space\\own-space.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] own-space.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},695:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"own-space",data:function(){var e=this;return{userForm:{name:"",cellphone:"",company:"",department:""},uid:"",securityCode:"",phoneHasChanged:!1,save_loading:!1,identifyError:"",editPasswordModal:!1,savePassLoading:!1,oldPassError:"",identifyCodeRight:!1,hasGetIdentifyCode:!1,canGetIdentifyCode:!1,checkIdentifyCodeLoading:!1,inforValidate:{name:[{required:!0,message:"请输入姓名",trigger:"blur"}],cellphone:[{required:!0,message:"请输入手机号码"},{validator:function(e,t,s){/^1[0-9]{10}$/.test(t)?s():s(new Error("请输入正确格式的手机号"))}}]},editPasswordForm:{oldPass:"",newPass:"",rePass:""},passwordValidate:{oldPass:[{required:!0,message:"请输入原密码",trigger:"blur"}],newPass:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,message:"请至少输入6个字符",trigger:"blur"},{max:32,message:"最多输入32个字符",trigger:"blur"}],rePass:[{required:!0,message:"请再次输入新密码",trigger:"blur"},{validator:function(t,s,o){s!==e.editPasswordForm.newPass?o(new Error("两次输入密码不一致")):o()},trigger:"blur"}]},inputCodeVisible:!1,initPhone:"",gettingIdentifyCodeBtnContent:"获取验证码"}},methods:{getIdentifyCode:function(){var e=this;this.hasGetIdentifyCode=!0,this.$refs.userForm.validate(function(t){if(t){e.canGetIdentifyCode=!0;var s=60,o=setInterval(function(){s>=0?(e.gettingIdentifyCodeBtnContent=s+"秒后重试",s-=1):(clearInterval(o),e.gettingIdentifyCodeBtnContent="获取验证码",e.canGetIdentifyCode=!1)},1e3);e.inputCodeVisible=!0}})},showEditPassword:function(){this.editPasswordModal=!0},cancelEditUserInfor:function(){this.$store.commit("removeTag","ownspace_index"),localStorage.pageOpenedList=JSON.stringify(this.$store.state.pageOpenedList);var e="";e=this.$store.state.pageOpenedList.length>1?this.$store.state.pageOpenedList[1].name:this.$store.state.pageOpenedList[0].name,this.$router.push({name:e})},saveEdit:function(){var e=this;this.$refs.userForm.validate(function(t){t&&(e.phoneHasChanged&&e.userForm.cellphone!==e.initPhone?e.hasGetIdentifyCode?e.identifyCodeRight?e.saveInfoAjax():e.$Message.error("验证码错误，请重新输入"):e.$Message.warning("请先点击获取验证码"):e.saveInfoAjax())})},cancelEditPass:function(){this.editPasswordModal=!1},saveEditPass:function(){var e=this;this.$refs.editPasswordForm.validate(function(t){t&&(e.savePassLoading=!0)})},init:function(){this.userForm.name="Lison",this.userForm.cellphone="17712345678",this.initPhone="17712345678",this.userForm.company="TalkingData",this.userForm.department="可视化部门"},cancelInputCodeBox:function(){this.inputCodeVisible=!1,this.userForm.cellphone=this.initPhone},submitCode:function(){var e=this;this.checkIdentifyCodeLoading=!0,0===this.securityCode.length?this.$Message.error("请填写短信验证码"):setTimeout(function(){e.$Message.success("验证码正确"),e.inputCodeVisible=!1,e.checkIdentifyCodeLoading=!1},1e3)},hasChangePhone:function(){this.phoneHasChanged=!0,this.hasGetIdentifyCode=!1,this.identifyCodeRight=!1},saveInfoAjax:function(){var e=this;this.save_loading=!0,setTimeout(function(){e.$Message.success("保存成功"),e.save_loading=!1},1e3)}},mounted:function(){this.init()}}},759:function(e,t){},831:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("Card",[s("p",{attrs:{slot:"title"},slot:"title"},[s("Icon",{attrs:{type:"person"}}),e._v("\n            个人信息\n        ")],1),e._v(" "),s("div",[s("Form",{ref:"userForm",attrs:{model:e.userForm,"label-width":100,"label-position":"right",rules:e.inforValidate}},[s("FormItem",{attrs:{label:"用户姓名：",prop:"name"}},[s("div",{staticStyle:{display:"inline-block",width:"300px"}},[s("Input",{model:{value:e.userForm.name,callback:function(t){e.$set(e.userForm,"name",t)},expression:"userForm.name"}})],1)]),e._v(" "),s("FormItem",{attrs:{label:"用户手机：",prop:"cellphone"}},[s("div",{staticStyle:{display:"inline-block",width:"204px"}},[s("Input",{on:{"on-keydown":e.hasChangePhone},model:{value:e.userForm.cellphone,callback:function(t){e.$set(e.userForm,"cellphone",t)},expression:"userForm.cellphone"}})],1),e._v(" "),s("div",{staticStyle:{display:"inline-block",position:"relative"}},[s("Button",{attrs:{disabled:e.canGetIdentifyCode},on:{click:e.getIdentifyCode}},[e._v(e._s(e.gettingIdentifyCodeBtnContent))]),e._v(" "),e.inputCodeVisible?s("div",{staticClass:"own-space-input-identifycode-con"},[s("div",{staticStyle:{"background-color":"white","z-index":"110",margin:"10px"}},[s("Input",{attrs:{placeholder:"请填写短信验证码"},model:{value:e.securityCode,callback:function(t){e.securityCode=t},expression:"securityCode"}}),e._v(" "),s("div",{staticStyle:{"margin-top":"10px","text-align":"right"}},[s("Button",{attrs:{type:"ghost"},on:{click:e.cancelInputCodeBox}},[e._v("取消")]),e._v(" "),s("Button",{attrs:{type:"primary",loading:e.checkIdentifyCodeLoading},on:{click:e.submitCode}},[e._v("确定")])],1)],1)]):e._e()],1)]),e._v(" "),s("div",[s("Button",{staticStyle:{width:"100px"},attrs:{type:"text"},on:{click:e.cancelEditUserInfor}},[e._v("取消")]),e._v(" "),s("Button",{staticStyle:{width:"100px"},attrs:{type:"primary",loading:e.save_loading},on:{click:e.saveEdit}},[e._v("保存")])],1)],1)],1)]),e._v(" "),s("Modal",{attrs:{closable:!1,"mask-closable":!1,width:500},model:{value:e.editPasswordModal,callback:function(t){e.editPasswordModal=t},expression:"editPasswordModal"}},[s("h3",{staticStyle:{color:"#2D8CF0"},attrs:{slot:"header"},slot:"header"},[e._v("修改密码")]),e._v(" "),s("Form",{ref:"editPasswordForm",attrs:{model:e.editPasswordForm,"label-width":100,"label-position":"right",rules:e.passwordValidate}},[s("FormItem",{attrs:{label:"原密码",prop:"oldPass",error:e.oldPassError}},[s("Input",{attrs:{placeholder:"请输入现在使用的密码"},model:{value:e.editPasswordForm.oldPass,callback:function(t){e.$set(e.editPasswordForm,"oldPass",t)},expression:"editPasswordForm.oldPass"}})],1),e._v(" "),s("FormItem",{attrs:{label:"新密码",prop:"newPass"}},[s("Input",{attrs:{placeholder:"请输入新密码，至少6位字符"},model:{value:e.editPasswordForm.newPass,callback:function(t){e.$set(e.editPasswordForm,"newPass",t)},expression:"editPasswordForm.newPass"}})],1),e._v(" "),s("FormItem",{attrs:{label:"确认新密码",prop:"rePass"}},[s("Input",{attrs:{placeholder:"请再次输入新密码"},model:{value:e.editPasswordForm.rePass,callback:function(t){e.$set(e.editPasswordForm,"rePass",t)},expression:"editPasswordForm.rePass"}})],1)],1),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("Button",{attrs:{type:"text"},on:{click:e.cancelEditPass}},[e._v("取消")]),e._v(" "),s("Button",{attrs:{type:"primary",loading:e.savePassLoading},on:{click:e.saveEditPass}},[e._v("保存")])],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});