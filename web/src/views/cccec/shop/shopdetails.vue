
<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    商铺详情
                </p>
                <!-- <div>
                    <i-table :columns="ordergoodsColumns" :loading="tableloading" :data="ordergoodsData" style="width: 100%;"></i-table>
                </div> -->
            </Card>
        </Row>
        <Row>
            <Card>
                <div class="dataheader">
                    <span class="dataheadertxt">商铺信息</span>
                </div>
                <div class="inputbox">
                    <div class="informationbox"><span>商店名称:</span>
                        <i-input v-model="shopdata.shopName" placeholder="请输入名称..."></i-input>
                        <!-- <p>{{shopdata.shopName}}</p> -->
                    </div>
                    <div class="informationbox"><span>联系电话:</span>
                        <i-input v-model="shopdata.phone" placeholder="请输入..."></i-input>
                        <!-- <p>{{order_date}}</p> -->
                    </div>
                </div>

                <div class="inputbox">
                    <div class="informationbox"><span>经营类别:</span>
                        <i-select v-model="shopdata.catId" clearable="" filterable="">
                            <i-option v-for="item in catIdbox" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                        </i-select>
                    </div>
                    <div class="informationbox"><span>简要描述:</span>
                        <i-input v-model="shopdata.shortDesc" placeholder="请输入..."></i-input>
                    </div>
                </div>

                <div class="inputbox">
                	<div class="informationbox"><span>商铺状态:</span>
                        <i-select v-model="shopdata.status" clearable="" filterable="">
                            <i-option v-for="item in shopstatusbox" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                        </i-select>
                    </div>
                    <div class="informationbox">
                        <span>详细地址:</span>
                        <i-input v-model="shopdata.address" placeholder="请输入..."></i-input>
                    </div>
                </div>
                <div class="inputbox">
                    <div class="informationbox">
                        <span>显示在附近:</span>
                        <div class="ivu-input-wrapper"><i-switch v-model="shopdata.isVisiable" ></i-switch></div>
                    </div>
                    <div class="informationbox">
                        <!-- <span>收货状态:</span>
                        <i-select v-model="status" clearable="" filterable="">
                            <i-option v-for="item in statusbox" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                        </i-select> -->
                    </div>
                    
                </div>
                <div class="dataheader">
                    <span class="dataheadertxt">门店照片</span>
                </div>
                <div class="inputbox">
                     <div>
                        <label>
                            <div style="width:100px;height:100px;line-height: 100px;text-align:center; border:1px solid #cccccc;background:#fff;">
                                <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                上传图片
                            </div>
                            <input type="file" style="display:none;" name="" ref="imageList" @change="previewlist()">
                        </label>
                    </div>
                    <div class="imgbox" v-for="(list1,index) in shopImageurl"><img :src="list1.url" @click="imageListView(list1)" style="width:100px;height:100px;"><p class="delbtn" @click="delimg(list1.name,index);shopImageurl.splice(index,1);">删除</p></div>
                </div>

                <div class="dataheader">
                    <span class="dataheadertxt">执照资质</span>
                </div>
                <div class="inputbox">
                    <div class="informationbox"><span>注册号:</span>
                        <i-input v-model="shopdata.registerNumber" placeholder="请输入..."></i-input>
                    </div>
                    <div class="informationbox">
                        <span>执照名称:</span>
                        <i-input v-model="shopdata.licenseName" placeholder="请输入..."></i-input>
                    </div>
                </div>
                <div class="inputbox">
                    <div class="informationbox"><span>执照类型:</span>
                        <p>
                            <CheckboxGroup v-model="businessLicenseType" @on-change="clickbusinessLicenseType">
                                <Checkbox label="1" value="1">个体</Checkbox>
                                <Checkbox label="2" value="2">商家</Checkbox>
                            </CheckboxGroup>
                        </p>
                    </div>
                    <div class="informationbox">
                        <span>营业期限:</span>
                        <p>
                            <CheckboxGroup v-model="businessEndDate" @on-change="clickbusinessEndDate">
                                <Checkbox label="1" value="1">长期有效</Checkbox>
                                <Checkbox label="2" value="2">选择日期</Checkbox>
                            </CheckboxGroup>
                            <DatePicker type="date" placeholder="选择日期" v-if="businessEndDate[0]==2" v-model="EndDateday" style="width: 200px"></DatePicker>
                        </p>
                    </div>
                </div>
                <div class="dataheader">
                    <span class="dataheadertxt">上传营业执照</span>
                </div>
                <!-- <div class="inputbox"><span>上传营业执照</span> </div> -->
                <div class="inputbox">
                     <div class="imgbox">
                        <label>
                            <div v-if="clicklicensedata==false" style="width:200px;height:100px;line-height: 100px;text-align:center; border:1px solid #cccccc;background:#fff;">
                                <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                上传图片
                            </div>
                            <input type="file" style="display:none;" name="" ref="license" @change="clicklicenseimg()">
                            <img :src="clicklicenseurl" v-if="clicklicensedata==true" @click="imageListView(list1)" style="width:200px;height:100px;">
                        </label>
                        <p class="delbtn" v-if="clicklicensedata==true" @click="delimg('businessLicenseImage1',index);clicklicenseurl='';clicklicensedata=false;">删除</p>
                    </div>

                    <div style="margin-left:20px;" class="imgbox">
                        <label>
                            <div v-if="clicklicensedata2==false" style="width:200px;height:100px;line-height: 100px;text-align:center; border:1px solid #cccccc;background:#fff;">
                                <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                上传图片
                            </div>
                            <input type="file" style="display:none;" name="" ref="license2" @change="clicklicenseimg2()">
                            <img :src="clicklicenseurl2" v-if="clicklicensedata2==true" @click="imageListView(list1)" style="width:200px;height:100px;">
                        </label>
                        <p class="delbtn" v-if="clicklicensedata2==true" @click="delimg('businessLicenseImage2',index);clicklicenseurl2='';clicklicensedata2=false;">删除</p>
                    </div>
                </div>

                <div class="dataheader">
                    <span class="dataheadertxt">法人资质</span>
                </div>
                <div class="inputbox">
                    <div class="informationbox"><span>与法人关系:</span>
                        <p>
                            <CheckboxGroup v-model="legelPersonRelationship" @on-change="clicklegelPersonRelationship">
                                <Checkbox label="1" value="1">本人</Checkbox>
                                <Checkbox label="2" value="2">同事</Checkbox>
                                <Checkbox label="3" value="3">其他</Checkbox>
                            </CheckboxGroup>
                        </p>
                    </div>
                    <div class="informationbox">
                        <span>身份证号码:</span>
                        <i-input v-model="shopdata.legalPersonIdCardNum" placeholder="请输入..."></i-input>
                    </div>
                </div>
                <div class="dataheader">
                    <span class="dataheadertxt">上传法人身份证</span>
                </div>
                <!-- <div class="inputbox"><span>上传法人身份证</span> </div> -->
                <div class="inputbox">
                     <div class="imgbox">
                        <label>
                            <div v-if="clickIdCarddata==false" style="width:200px;height:100px;line-height: 100px;text-align:center; border:1px solid #cccccc;background:#fff;">
                                <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                上传图片
                            </div>
                            <input type="file" style="display:none;" name="" ref="IdCard" @change="clickIdCardimg()">
                            <img :src="clickIdCardurl" v-if="clickIdCarddata==true" @click="imageListView(list1)" style="width:200px;height:100px;">
                        </label>
                        <p class="delbtn" v-if="clickIdCarddata==true" @click="delimg('legalPersonIdCardImage1',index);clickIdCardurl='';clickIdCarddata=false;">删除</p>
                    </div>

                    <div style="margin-left:20px;" class="imgbox">
                        <label>
                            <div v-if="clickIdCarddata2==false" style="width:200px;height:100px;line-height: 100px;text-align:center; border:1px solid #cccccc;background:#fff;">
                                <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                上传图片
                            </div>
                            <input type="file" style="display:none;" name="" ref="IdCard2" @change="clickIdCardimg2()">
                            <img :src="clickIdCardurl2" v-if="clickIdCarddata2==true" @click="imageListView(list1)" style="width:200px;height:100px;">
                        </label>
                        <p class="delbtn" v-if="clickIdCarddata2==true" @click="delimg('legalPersonIdCardImage2',index);clickIdCardurl2='';clickIdCarddata2=false;">删除</p>
                    </div>
                </div>


                <!-- <div class="inputbox inputheadborder">
                    <div class="informationbox"><span>订单预收：</span>
                        <p>{{amount}} 元</p>
                    </div>
                    <div class="informationbox">

                    </div>
                </div> -->
                <!-- <div class="inputbox">
                    <div class="informationbox"><span>商品总金额:</span>
                        <i-input v-model="payment_date" placeholder="请输入名称..."></i-input>
                        <p>{{orderdata.goodsAmount!=""&&orderdata.goodsAmount!=null?orderdata.goodsAmount:'0'}} 元</p>
                    </div>
                </div> -->
                <!-- <div class="inputbox">
                    <div class="informationbox">

                    </div>
                </div>

                <div class="inputbox">
                    <div class="informationbox"><span>订单已支付：</span>
                        <p>{{amount}} 元</p>
                    </div>
                    <div class="informationbox">

                    </div>
                </div> -->
                <!-- <div class="dataheader">
                    <span class="dataheadertxt">支付方式</span>
                    <span class="dataheaderdata">{{(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount))>0?(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount)):'0'}} 元</span>
                </div> -->
                <!-- <div class="inputbox">
                    <div class="informationbox"><span>代金券支付:</span>
                        <p>{{orderdata.couponMoney!=""&&orderdata.couponMoney!=null?orderdata.couponMoney:'0'}} 元</p>
                    </div>
                    <div class="informationbox posrelative"><span>微信支付:</span>
                        <p>{{orderdata.needPaidAmount!=""&&orderdata.needPaidAmount!=null?orderdata.needPaidAmount:'0'}} 元</p>
                    </div>
                </div>
                <div class="inputbox">
                    <div class="informationbox posrelative"><span>提成余额支付:</span>
                        <p>{{orderdata.commissionAmount!=""&&orderdata.commissionAmount!=null?orderdata.commissionAmount:'0'}} 元</p>
                    </div>
                    <div class="informationbox posrelative"><span>补充余额支付:</span>
                        <p>{{orderdata.balanceAmount!=""&&orderdata.balanceAmount!=null?orderdata.balanceAmount:'0'}} 元</p>
                    </div>
                </div> -->

                <!-- <div class="inputbox">
                    <div class="informationbox"><span>微信支付:</span>
                        <p>{{}} 元</p>
                    </div>
                    <div class="informationbox">

                    </div>
                </div> -->
                <!-- <div class="dataheader">
                    <span class="dataheadertxt">订单实收</span>
                    <span class="dataheaderdata">{{(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount)-parseFloat(orderdata.diffTotalPrice))>0?(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount)-parseFloat(orderdata.diffTotalPrice)):'0'}} 元</span>
                </div> -->

                
                <Spin size="large" fix v-if="spinShow"></Spin>
                <div class="informationbtn">
                    <i-button type="warning" icon="" @click="goback()">返回</i-button>
                    <i-button type="info" icon="" @click="preservation()">保存</i-button>
                </div>
            </Card>
        </Row>
        <!-- <modal v-model="orderrefund" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请输入退款金额</span></p>
            <div>
                <i-input v-model="orderrefundnum" Number placeholder="请输入退款金额..."></i-input>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="clickrefund()">确认提交</i-button>
            </div>
        </modal> -->
    </div>
</template>

<script>
import util from "@/libs/util";
import {shopdetails,getshopcatId,updateshopdetails,imgurl,dateFormat,getareabox}from "./../../api/api.js";
export default {
    name: 'shopdetails',
    components: {
        
    },
    data () {
        return {
            shopdata:[],

            catIdbox:[],
            shopstatus:'',
            shopstatusbox: [
                {
                    id:0,
                    name:"未审核"
                },
                {
                    id:1,
                    name:"通过"
                },
                {
                    id:2,
                    name:"不通过"
                }
            ],

            shopImageurl:[],
            shopImage:[],
            businessLicenseType:[],
            businessEndDate:[],
            EndDateday:'',

            clicklicensedata:false,
            clicklicenseurl:'',
            clicklicensedata2:false,
            clicklicenseurl2:'',

            clickIdCarddata:false,
            clickIdCardurl:'',
            clickIdCarddata2:false,
            clickIdCardurl2:'',

            legelPersonRelationship:[],

            showInfo: false,
            spinShow: false,
            names:'',
            orderoperNo:'',
            consignee:'',
            area1Address:'',
            area1Addresslist:[],
            area2Address:'',
            area2Addresslist:[],
            area3Address:'',
            area3Addresslist:[],
            area4Address:'',
            area4Addresslist:[],
            orderdetailshouse:'',
            orderdetailsnumberBuildings:'',
            delivery_date:'',
            options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now();
                    }
                },
            mobile:'',
            salesPartnerstage:'',
            payment_date:'',
            orderdata:'',
            status:'',
            region:'', //省市区
            regiondata:[], 
            delivery_date_time:'',

            // 退款
            // orderrefund:false,
            // orderrefundnum:'',
            // orderrefundtypes:'',

            timelist:[
                    {'id':'09:00:00','time': "09:00~10:00"},
                    {'id':'10:00:00','time': "10:00~11:00"},
                    {'id':'11:00:00','time': '11:00~12:00'},
                    {'id':'12:00:00','time': '12:00~13:00'},
                    {'id':'13:00:00','time': '13:00~14:00'},
                    {'id':'14:00:00','time': '14:00~15:00'},
                    {'id':'15:00:00','time': '15:00~16:00'},
                    {'id':'16:00:00','time': '16:00~17:00'},
                    {'id':'17:00:00','time': '17:00~18:00'},
                    {'id':'18:00:00','time': '18:00~19:00'},
                ],
            statusbox:[
                    {
                        id:'0',
                        name:"未收货"
                    },
                    {
                        id:'1',
                        name:"已收货"
                    }
                ],
            
            orderType:'',
            sms_status:"",
            order_date:'',
            order_no:'',
            amount:'',

            tableloading:false,
            
        };
    },
    methods: {
        getcatId(){
            getshopcatId().then(response => {
                this.catIdbox=response.data;
            })
        },
        getarea4(){
            getareabox(4).then(response => {
                this.area4Addresslist=response.data;
            })
        },
        init () {
            var zhethis=this;
            // orderdetailsdata(this.$route.params.id).then(response => {
            //     zhethis.ordergoodsData=response.data;
            // });
            shopdetails(this.$route.params.id).then(response => {
                console.log(response)
                zhethis.shopdata = response.data;
                zhethis.businessLicenseType=[];
                zhethis.legelPersonRelationship=[];
                zhethis.businessLicenseType.push(String(zhethis.shopdata.businessLicenseType));
                zhethis.legelPersonRelationship.push(String(zhethis.shopdata.legelPersonRelationship));
                zhethis.businessEndDate=[];
                zhethis.EndDateday='';
                if(zhethis.shopdata.businessEndDate!=null){
                   zhethis.businessEndDate.push("2");
                   zhethis.EndDateday=zhethis.shopdata.businessEndDate;
                }else{
                    zhethis.businessEndDate.push("1");
                }
                zhethis.shopImageurl=[];
                for (var i = 1; i < 5; i++) {
                    if(response.data['shopImage'+i]!=null){
                        zhethis.shopImageurl.push({name:'shopImage'+i,url:imgurl+response.data['shopImage'+i]});
                    }
                }
                zhethis.clicklicensedata=false;
                zhethis.clicklicensedata2=false;
                zhethis.clickIdCarddata=false;
                zhethis.clickIdCarddata2=false;
                zhethis.clicklicenseurl="";
                zhethis.clicklicenseurl2="";
                zhethis.clickIdCardurl="";
                zhethis.clickIdCardurl2="";
                if(zhethis.shopdata.businessLicenseImage1){
                   zhethis.clicklicensedata=true; 
                   zhethis.clicklicenseurl=imgurl+zhethis.shopdata.businessLicenseImage1;
                }
                if(zhethis.shopdata.businessLicenseImage2){
                   zhethis.clicklicensedata2=true; 
                   zhethis.clicklicenseurl2=imgurl+zhethis.shopdata.businessLicenseImage2;
                }
                
                if(zhethis.shopdata.legalPersonIdCardImage1){
                   zhethis.clickIdCarddata=true; 
                   zhethis.clickIdCardurl=imgurl+zhethis.shopdata.legalPersonIdCardImage1;
                }
                if(zhethis.shopdata.legalPersonIdCardImage2){
                   zhethis.clickIdCarddata2=true; 
                   zhethis.clickIdCardurl2=imgurl+zhethis.shopdata.legalPersonIdCardImage2;
                }
//                 zhethis.consignee = decodeURI(decodeURI(response.data.consignee));
//                 zhethis.order_date = response.data.order_date;
//                 zhethis.area1Address = response.data.area_id_level1;
//                 zhethis.area2Address = response.data.area_id_level2;
//                 zhethis.area3Address = response.data.area_id_level3;
//                 zhethis.area4Address = response.data.area_id_level4;
//                 zhethis.orderdetailshouse = decodeURI(decodeURI(response.data.house));
//                 zhethis.orderdetailsnumberBuildings = decodeURI(decodeURI(response.data.numberBuildings));
// //              zhethis.delivery_date = response.data.delivery_date.substring(0,10);
// //              zhethis.delivery_date_time = response.data.delivery_date.substring(11);
//                 zhethis.mobile = response.data.mobile;
//                 zhethis.payment_date = response.data.payment_date;
//                 zhethis.shopstatus = response.data.order_status;
//                 zhethis.orderType = response.data.orderType;
//                 zhethis.order_no = response.data.order_no;
//                 zhethis.amount = response.data.amount;
//                 zhethis.salesPartnerstage = response.data["salesPartner.stage"];
//                 if(response.data.sms_status=='1'){
//                     zhethis.sms_status = '1';
//                 }else{
//                     zhethis.sms_status = '0';
//                 }
//                 if(response.data.status=='1'){
//                     zhethis.status = '1';
//                 }else{
//                     zhethis.status = '0';
//                 }

            });

            
        },
        goback() {
            let argu = {};
            util.openNewPage(this, 'shoplist', argu);
            this.$router.push({
                name: 'shoplist',
                params: argu
            });
            this.$store.commit('removeTag', 'shopdetails');
            this.$store.commit('closePage', 'shopdetails');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList);
            if (this.currentPageName === 'shopdetails') {
                let lastPageName = '';
                if (this.$store.state.pageOpenedList.length > 1) {
                    lastPageName = this.$store.state.pageOpenedList[1].name;
                } else {
                    lastPageName = this.$store.state.pageOpenedList[0].name;
                }
                this.$router.push({
                    name: 'shoplist'
                });
            }
        },
        preservation() {
            this.spinShow = true;
            var zhethis = this;
            let formdata = new FormData();
            formdata.append('id',zhethis.$route.params.id);
            // formdata.append('memberId',zhethis.shopdata.memberId);
            formdata.append('shopName',zhethis.shopdata.shopName);
            formdata.append('phone',zhethis.shopdata.phone);
            formdata.append('catId',zhethis.shopdata.catId);
            formdata.append('shortDesc',zhethis.shopdata.shortDesc);
            formdata.append('status',zhethis.shopdata.status);
            formdata.append('address',zhethis.shopdata.address);
            formdata.append('isVisiable',zhethis.shopdata.isVisiable==false?'0':'1');

            if(zhethis.shopdata.catId){
               formdata.append('catId',zhethis.shopdata.catId); 
            }


            if(this.shopImage.length>0){
                    for(let i = 0; i < this.shopImage.length; i++){
                        let oneimg=0;
                        for (let kk = 1; kk < 5; kk++) {
                            if(!zhethis.shopdata['shopImage'+kk]&&oneimg==0){
                                zhethis.shopdata['shopImage'+kk]=zhethis.shopImage[i];
                                formdata.append("shopImage"+kk,zhethis.shopImage[i]);
                                oneimg++;
                                console.log(oneimg)
                            }
                        }
                    }
            }

            formdata.append('registerNumber',zhethis.shopdata.registerNumber);
            formdata.append('licenseName',zhethis.shopdata.licenseName);
            formdata.append('businessLicenseType',zhethis.businessLicenseType[0]);

            if(this.businessEndDate[0]==2){
                console.log(dateFormat(this.EndDateday,'yyyy-MM-dd'))
                formdata.append('businessEndDate',dateFormat(this.EndDateday,'yyyy-MM-dd'));
            }else{
                formdata.append('businessEndDate',"");
            }

            formdata.append('businessLicenseImage1',zhethis.shopdata.businessLicenseImage1);
            formdata.append('businessLicenseImage2',zhethis.shopdata.businessLicenseImage2);

            formdata.append('legelPersonRelationship',zhethis.legelPersonRelationship[0]);
            formdata.append('legalPersonIdCardNum',zhethis.shopdata.legalPersonIdCardNum);
            formdata.append('legalPersonIdCardImage1',zhethis.shopdata.legalPersonIdCardImage1);
            formdata.append('legalPersonIdCardImage2',zhethis.shopdata.legalPersonIdCardImage2);

//          if(String(zhethis.delivery_date).indexOf("-")>0){
//              zhetime = zhethis.delivery_date+" "+zhethis.delivery_date_time;
//          }else{
//              let nowdate=zhethis.delivery_date;
//              let nowYeardate=nowdate.getFullYear();
//              // 获取月份
//              let nowMonthdate=((nowdate.getMonth()+1)<10?'0'+(nowdate.getMonth()+1):(nowdate.getMonth()+1));
//              // 获取日期
//              let nowDaydate=(nowdate.getDate()<10?'0'+nowdate.getDate():nowdate.getDate());
//              zhetime=nowYeardate+'-'+nowMonthdate+'-'+nowDaydate+" "+zhethis.delivery_date_time;
//          }
            // var zhetime = zhethis.delivery_date+" "+zhethis.delivery_date_time;
            // getoperatorlist(this.orderoperNo).then(data => {
                updateshopdetails(formdata).then(response => {
                    setTimeout(function(zhege) {
                        zhege.spinShow = false;
                    },1000,zhethis)
                    if(response.code=='200'){
                        zhethis.$Modal.success({
                            title: "温馨提示",
                            content: '<p>保存成功</p>'

                        });
                           this.shopImage = [];
                    }else{
                        zhethis.$Modal.error({
                            title: "温馨提示",
                            content: '<p>'+response.message+'</p>'
                        });
                    }
                    
                })
            // });
            
        },
        previewlist(){
            let file = this.$refs.imageList.files[0];
            let zhethis=this;
            if (file) {
              var reader = new FileReader();
              reader.onload = function(evt) {
                zhethis.shopImageurl.push({url:evt.target.result});
                zhethis.shopImage.push(file);
              }
              reader.readAsDataURL(file);
            }
        },
        imageListView(imgurl){
            // this.visible = true;
            // this.newbigimg=imgurl;
        },

        clickbusinessLicenseType(data){
            if(data.length>1){
                this.businessLicenseType=[];
                this.businessLicenseType.push(data[1]);
            }
        },

        clickbusinessEndDate(data){
            if(data.length>1){
                this.businessEndDate=[];
                this.businessEndDate.push(data[1]);
            }
        },

        clicklicenseimg(){
            let file = this.$refs.license.files[0];
            let zhethis=this;
            if (file) {
              zhethis.shopdata.businessLicenseImage1 = zhethis.$refs.license.files[0];
              var reader = new FileReader();
              reader.onload = function(evt) {
                zhethis.clicklicenseurl = evt.target.result;
                zhethis.clicklicensedata=true;
              }
              reader.readAsDataURL(file);
            }
        },
        clicklicenseimg2(){
            let file = this.$refs.license2.files[0];
            let zhethis=this;
            if (file) {
              zhethis.shopdata.businessLicenseImage2 = zhethis.$refs.license2.files[0];
              var reader = new FileReader();
              reader.onload = function(evt) {
                zhethis.clicklicenseurl2 = evt.target.result;
                zhethis.clicklicensedata2=true;
              }
              reader.readAsDataURL(file);
            }
        },

        clickIdCardimg(){
            let file = this.$refs.IdCard.files[0];
            let zhethis=this;
            if (file) {
              zhethis.shopdata.legalPersonIdCardImage1 = zhethis.$refs.IdCard.files[0];
              var reader = new FileReader();
              reader.onload = function(evt) {
                zhethis.clickIdCardurl = evt.target.result;
                zhethis.clickIdCarddata=true;
              }
              reader.readAsDataURL(file);
            }
        },
        clickIdCardimg2(){
            let file = this.$refs.IdCard2.files[0];
            let zhethis=this;
            if (file) {
              zhethis.shopdata.legalPersonIdCardImage2 = zhethis.$refs.IdCard2.files[0];
              var reader = new FileReader();
              reader.onload = function(evt) {
                zhethis.clickIdCardurl2 = evt.target.result;
                zhethis.clickIdCarddata2=true;
              }
              reader.readAsDataURL(file);
            }
        },


        clicklegelPersonRelationship(data){
            if(data.length>1){
                this.legelPersonRelationship=[];
                this.legelPersonRelationship.push(data[1]);
            }
        },

        delimg(name,index){
            let formdata = new FormData();
            formdata.append('id',this.$route.params.id);
            formdata.append(name,"");
            updateshopdetails(formdata).then(response => {
                    
            })
        },
        // clickshowrefunddata(types){
        //     this.orderrefund=true;
        //     this.orderrefundtypes=types;
        // },
        // clickrefund(){
        //     if(this.orderrefundnum!=""&&this.orderrefundnum!=" "&&this.orderrefundnum!=null&&this.orderrefundnum!=undefined){
        //         orderrefundAmount(this.$route.params.id,this.orderrefundnum,this.orderrefundtypes).then(response => {
        //             console.log(response);
        //             if (response.success) {
        //                 this.$Message.success("提交成功");
        //                 this.getListData(this.pageNumber,this.pageSizes) 
        //                 // this.getListData(1);
        //             } else {
        //                 this.$Message.error(response.message);
        //             }
        //             this.orderrefund = false;
        //             this.orderrefundnum="";
        //             })
        //     }
        // },
    },
    created() {
        
    },
    mounted () {
        // this.getarea4();
        // this.init();
    },
    beforeRouteEnter (to,from,next){
            next ( vm => {
                // vm.getarea4();
                vm.getcatId();
                vm.init();
            })
        },
    watch:{
        // '$route' () {
        //     this.init();
        // },
        // 'area4Address':{
        //     handler:function(curVal,oldVal){
        //         console.log(this.orderoperNo)
        //         console.log(curVal)
        //         var zhethis =this;
        //         orderarea4operNo(curVal).then(response => {
        //             zhethis.orderoperNo=response.data[0].operNo;
        //         })
        //     }
        // }
    }
};
</script>

<style lang="less" scoped>

    .dataheader{
        padding: 20px 10% 5px;
        font-weight: bold;
        font-size: 1rem;
        >.dataheadertxt{
            // width: 110px;
            display: inline-block;
        }
    }

    .inputboxhead{
        padding: 0 10% 26px;
        >span{
            display: inline-block;
        }
        >p{
            display: inline-block;
            padding-left: 5%;
        }
    }
    .inputbox{
         display: flex;
         padding: 5px 0 5px;
         margin: 0 10%;
         background: #f5f5f5;
         > .informationbox{
            flex: 2;
            display: flex;
            margin-left: 0rem;
            padding: 0;
             > span {
                    width: 150px;
                    text-align: right;
                    white-space: nowrap;
                    line-height: 32px;
                    margin-right: 1rem;
                }
            >p{
                display: inline-block;
                width: 100%;
                padding-left: 5px;
                line-height: 32px;
                // border: 1px solid #dddee1;
                cursor:not-allowed; 
            }
            >.posabsolute{
                position: absolute;
                color: #fff;
                background-color: #ed3f14;
                padding: 2px 10px;
                font-size: 0.5rem;
                top: 6px;
                left: 230px;
                border-radius: 3px;
                cursor: pointer;
            }
            .datetimeselect{
                width: 100%;
            }
         }
         > .informationbox:nth-child(2){
            padding: 0 10% 0 0;
            
         }
         > .posrelative{
            position: relative;
         }
    }
    .inputheadborder{
        border-bottom: 1px solid #dddee1;
    }
    .informationbtn{
        text-align: center;
        margin-top: 30px;
        > button {
            margin-left: 1rem;
            width: 110px;
        }
     }
     .disblock{
        display: block;
     }

     .imgbox{
        position: relative;
        height: 100px;
        margin-left: 10px;
        overflow: hidden;
        .delbtn{
            position:absolute;
            width: 100%;
            height:20px;
            bottom:-20px;
            left:0;
            background:rgba(255,0,0,0.6);
            color: #fff;
            text-align: center;
            animation:all 0.5s;
            font-size: 12px;
            line-height: 20px;
            cursor: pointer;
        }
     }
     .imgbox:hover{
        .delbtn{
            bottom:0px;
            animation:all 0.5s;
        }
     }

</style>
