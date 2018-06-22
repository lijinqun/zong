<template>
    <div>
        <row>
            <card>
                 <p slot="title">
                    <icon type="ios-list"></icon>订单管理
                </p>
                <div class="sreach">
                    <div class="sreach-page">
                           <div class="sreach-box sreach-box4">
                            <span>商品名称:</span>
                            <i-input v-model="commodity" placeholder="请输入商品名称...."  style="width:300px;"></i-input>
                        </div>
                       <div class="sreach-box" style="margin-left:-200px">
                            <span>时间:</span>
                            <Row>
                                <Col span="11">
                                    <DatePicker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="needDateFrom"></DatePicker>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <DatePicker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="needDateTo"></DatePicker>
                                </Col>
                            </Row>              
                        </div>
                     
                    </div>
                    <div class="sreach-page">
              
                       <div class="sreach-box"><span>订单状态:</span>
                           <div style="padding-top:5px">
                                <Checkbox
                                    :indeterminate="indeterminate"
                                    :value="checkAll"
                                    @click.prevent.native="handleCheckAll"
                                    >全选</Checkbox>
                            </div>
                            <CheckboxGroup v-model="orderstatuslist"  @on-change="checkAllGroupChange">
                                <Checkbox v-for="item in ordertypedata" :value="item.id" :key="item.id" :label-in-value = "false" v-bind:label="item.id">{{item.name}}</Checkbox>
                            </CheckboxGroup>
                        </div>
                    </div>
                    <div class="sreach-page">
                         <div class="sreach-box sreach-box2" style="text-align: right;">
                            <i-button type="info" icon="ios-search" @click="getdetailslist()">搜索</i-button> 
                <i-button type="info" @click="printdetails()">导出订单</i-button>
                        </div>
                        <div class="sreach-box linenumcss">
                            <p>总共 <span>{{pageCount}}</span> 条记录</p>
                            <p>共 <span>{{totalPages}}</span> 页</p>
                            <p>每页
                                <i-input v-model="pagesizes" number="" style="width:45px;" placeholder=""></i-input> 条</p>
                        </div>
                    </div>
                </div>
                <i-table :columns="tableColumns" height="600" :loading="tableloading" :data="tableData" ref="tableCsv" width="120%"  @on-selection-change="" ></i-table>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" :current="pageNumber" show-elevator="" show-total="" @on-change="getdetailslist"></page>
                </div>
            </card>
        </row>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import {
        closeorder,bindingcourierandorder,orderupdate,getcouriercompany,getorder, orderupdate2,updatanewstatus,verificationNotice,orderrefundAmount,getmatchingArea4,getmatchingStage,updatamatchingArea4,getareabox,operatorupdateapi,getoperatorlist,sendmessagelog,getmatchingoperName,getoperatordata,updataAddress,updataorderArea4,updateconfirmoreder,getmerchantlist,getdetailslist,printdetails,apiServer,
    }
    from "./../../api/api.js";
    export default {
        name: "extension",
        data() {
            return {
                ordertime:[],
                courierId:'',
                couriercompanyBox:false,
                couriercompanyid:'',
                address: '',
                ordertype: '1',
                ordertypelist:['1'],
                sendmessagenumber:'', //发早晚短信
                sendmessageday:'',
                sendmessageshow:false,
                merchnatlist:'',
                merchantlistdata:[],
                operNameshowdata:false,
                OperatorUpdateshow:false,
                OperatorNo:'',
                Operatordata:[],
                area4show:false,
                stageshowdata:false,
                housearray:[],
                houseorderids:[],
                housearray2:[],
                areaarray:[],
                areaarraydata:[],
                areaIdArray:[],
                stagearray:[],
                stagearray2:[],
                opernamearray:[],
                orderidarray:[],
                orderrefund:false,
                orderrefundnum:'',
                maxorderNeedPaidAmount:'',
                maxorderRefundAmount:'',
                orderstatusis:'',
                orderstatusisarray:[],
                needDateFrom: '',
                needDateTo: '',
                tableloading:false,
                orderIds: "",
                usernames: "",
                userphones: "",
                innname: "",
                orderstatus: "2",
                orderstatuslist:['1','2','3','4','7'],
                ordertypes: "",
                goodstypes: "",
                difference: "",
                pageCount: 0,
                totalPages: 0,
                pagesizes: 20,
                pageNumber:1,
                batchUpdateBox: false,
                choiceid: 0,
                ids: "",
                addressids:[],
                idsarray:[],
                operarray:[],
                orderhousedata:"",
                bindingStagenum:0,
                notbindingStagenum:0,
                pdbindingStage:"",
                orderarea2:'',
                orderarea3:'',
                orderarea4:'',
                orderarea2data:[],
                orderarea3data:[],
                orderarea4data:[],
                couriercompanylist:[],
                selectOperName:'',
                selectOperName:[],
                pdbindingoperName:'',
                pdbindingsalesPromoter:'',
                 indeterminate: true,
                checkAll: false,
                checkAllGroup: [],
                orderdatalist:[],
                statusarray:['1','2','3','4','7'],
                order_status:[],
                a:'',
                b:'',
                tableCsv:'',
                commodity:'',
                pdbindingoperNamedata:[
                    {
                        id:"1",
                        name:"已绑定"
                    },
                    {
                        id:"2",
                        name:"未绑定"
                    }
                ],
                pdbindingsalesPromoterdata:[
                    {
                        id:"1",
                        name:"已绑定"
                    },
                    {
                        id:"2",
                        name:"未绑定"
                    }
                ],
                pdbindingStagedata:[
                    {
                        id:"1",
                        name:"已绑定"
                    },
                    {
                        id:"2",
                        name:"未绑定"
                    }
                ],
                ordertypedata:[
                    // {
                    //     id:"0",
                    //     name:"未付款"
                    // },
                
                    // {
                    //     id:"2",
                    //     name:"待发货"
                    // },
                    {
                        id:"2",
                        name:"待确认"
                    },
                      {
                        id:"7",
                        name:"已确认"
                    },
                    {
                        id:"3",
                        name :"待收货"
                    },
                    // {
                    //     id:"5",
                    //     name:"已取消"
                    {
                        id:"4",
                        name:"问题件"
                    },    
                    {
                        id:'1',
                        name:"已完成"
                    },

                ],
                orderstatedata:[
                    {
                        id:"1",
                        name:"普通订单"
                    },
                    {
                        id:"2",
                        name:"T+N订单"
                    }
                ],
                orderreceiptdata:[
                    {
                        id:"0",
                        name:"未收货"
                    },
                    {
                        id:"1",
                        name:"已收货"
                    }
                ],
                ordertypedata2:[
                    {
                        id:"1",
                        name:"普通"
                    },
                    {
                        id:"2",
                        name:"升级会员"
                    },
                    {
                        id:"3",
                        name:"购买积分"
                    },
                    {
                        id:"4",
                        name:"充值"
                    },
                    {
                        id:"5",
                        name:"OSO"
                    },
                    {
                        id:'6',
                        name:'认领'
                    },
                    {
                        id:'7',
                        name:"已过期"
                    },
                    {
                        id:'8',
                        name : '出让'
                    }
                ],
                differencedata:[
                    {
                        id:"0",
                        name:"显示全部"
                    },
                    {
                        id:"1",
                        name:"地址有误"
                    }
                ],
                tableColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, 
                // {
                //     title : 'ID',
                //     key : "id",
                //     width :50,
                //      render: (h, params) => {
                //        return h('div', [h('p',params.row.ids)]);
                //     },
                // },
                {
                    title: '订单日期',
                    key: 'ord.create_date',
                    width:150,
                    align: 'left',
                       render: (h, params) => {
                        return h('div', [h('p',params.row['date(ord.create_date)']),h('p',params.row['ord.order_no'])]);
                    },
                }, 
                {
                    title: '供应商',
                    key: 'supplier.name',
                    width: 100,
                    align: 'center'
                },  
                {
                    title:'地址',
                    width:200,
                    key:'ord.fullAddress',
                    algin:'center',
                        render: (h, params) => {
                        return h('div', [h('div',params.row['ord.consignee']+" "+params.row['ord.mobile']),h('div',params.row['ord.fullAddress'])]);
                    },
                },
                {
                    title:'商品名称',
                    width:300,
                    key:'goods.name',
                    algin:'left',
                        render: (h, params) => {
                        return h('div', [h('p',params.row['goods.name'])]);
                    },
                },
                {
                    title:'规格',
                    key:'specValueNames',
                    width:150,
                    algin:"center", 

                },
                 {   
                    title: '数量',
                    width:100,
                    key: 'quantity',
                    //width:270,
                    align: 'center',
                },
                {
                    title: '供货单价',
                    width:100,
                    key: "supplierPrice",
                    algin: 'center',
                },
                    {
                    title: '供货金额',
                    width:100,
                    key: "supplierAmount",
                    algin: 'center',
                },
                {
                    title: '销售单价',
                    width:100,
                    key: "price",
                    algin: 'center',
                },
                {
                    title: '销售金额',
                    width:100,
                    key: 'amount',
                    align: 'left',
                },
                {
                    title: '货物状态',
                    key: 'ord.order_status',
                    align: 'left',
                    width:100,
                    render: (h, params) => {
                        return h('div', [h('p', params.row['ord.order_status'] == 0 ? '未付款' : params.row['ord.order_status'] == 1 ? '已完成' : params.row['ord.order_status'] == 2 ? '待发货': params.row['ord.order_status'] == 3 
                        ? '待收货' : params.row['ord.order_status'] == 4 ? '问题件' : params.row['ord.order_status'] == 5 ? '已取消' : params.row['ord.order_status'] == 7 ? '已确认' : '')]);
                    },
                },
                // {
                //     title:'快递公司',
                //     key:'express.expressName',
                //     align:'left',
                //     width:150,
                //      render: (h, params) => {
                //         return h('div', [h('p',params.row['express.expressName']),h('div',params.row['ordExpress.expressNo'])]);
                //     },
                // },
//                 {
//                     title: '详情',
//                     key: 'action',
//                     width:120,
//                     render: (h, params) => {
//                         return h('div', [
//                          h('Button',{
//                              props: {
//                                  type: 'info',
//                                  size: 'small'
//                              },
//                              on: {
//                                     click: () => {
//                                         let argu = { id: params.row.ids };
//                                         util.openNewPage(this, 'orderdetails', argu);
//                                         this.$router.push({
//                                             name: 'orderdetails',
//                                             params: argu
//                                         });
//                                     }
//                                 }
//                          },'详情')
// //                           h('Button',{
// //                              props: {
// //                                  type: 'error',
// //                                  size: 'small'
// //                              },
// //                              on: {
// //                                     click: () => {
// //                                 
// //                                     }
// //                                 },
// //                              style: {
// //                                  marginLeft: '5px'
// //                              }
// //                          },'退款')
//                         ])
//                     }
//                 }
                
                ],
                tableData: [],

                operNameColumns:[{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }, 
                    {
                        title: '用户地址',
                        key: 'userhouse',
                        width:150,
                        align: 'left',
                        render: (h, params) => {
                            return h('div', [h('span', this.housearray2[params.row.index] != "" ? decodeURI(decodeURI(this.housearray2[params.row.index])) : '')]);
                        },
                    },
                    {
                        title: '默认分拣人员',
                        key: 'userhouse',
                        width:110,
                        align: 'left',
                        render: (h, params) => {
                            return h('div', [h('span', this.opernamearray[params.row.index] != "" ? this.opernamearray[params.row.index] : '没分拣')]);
                        },
                    },
                    {
                        title: '匹配地址',
                        key: 'fullName',
                        width:150,
                        align: 'left'
                    },
                    {
                        title: '匹配分拣人员',
                        key: 'oper.operName',
                        width:110,
                        align: 'left'
                    },
                    {
                    title: '操作',
                    width:130,
                    key: 'ctrl',
                    render: (h, params) => {
                        return h('div', [
                         h('Button',{
                             props: {
                                 type: 'info',
                                 size: 'small'
                             },
                             on: {
                                    click: () => {

                                        operatorupdateapi(this.orderidarray[params.row.index], params.row.operNo,params.row["oper.operName"],params.row["oper.operMobile"]).then(response => {
                                                if (response.success) {
                                                    this.$Message.success("修改成功");
                                                    // this.opernamearray[params.row.index]
                                                } else {
                                                    this.$Message.error("修改失败");
                                                }

                                            })
                                    }
                                }
                         },'更新')
                        ])
                    }
                    }
                ],
                operNameData:[]
            };
        },
        mounted() {

            //获取订单详情
            this.getdetailslist();
            if(sessionStorage.getItem("orderneedDateFroms")){
                console.log(sessionStorage.getItem("orderneedDateFroms"))
                console.log(sessionStorage.getItem("orderneedDateTos"))
                this.needDateFrom=sessionStorage.getItem("orderneedDateFroms");
                this.needDateTo=sessionStorage.getItem("orderneedDateTos");
            
            }
            if (sessionStorage.getItem("orderpeoplelists")) {
                // this.list = JSON.parse(sessionStorage.getItem("orderpeoplelists"));
                this.pageCount = Number(sessionStorage.getItem("peoplepageCounts"));
                this.linebox = Number(sessionStorage.getItem("peoplelineboxs"));
                this.pageSizes = this.linebox;
                this.totalPages = Number(sessionStorage.getItem("peopletotalPages"));
                this.pageNumber = 1;
                this.getdetailslist(this.pageNumber,this.pageSizes);
                console.log("执行1");
            }else{
                var zhethis=this;
                this.tableloading = true;
                let tomorrowtime = new Date(Date.parse(new Date()+86400000))
                let tomorrowneedDateFrom=tomorrowtime.getFullYear()+'-'+(tomorrowtime.getMonth()+1)+'-'+tomorrowtime.getDate();
                let tomorrowneedDateTo=tomorrowneedDateFrom;
//              this.needDateFrom=tomorrowneedDateFrom;
//              this.needDateTo=tomorrowneedDateFrom;
                
                getdetailslist(this.pageNumber,this.needDateFrom,this.needDateTo,this.orderstatus,this.commodity).then(response => {
                    console.log("执行2"+this.pageNumber);

                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    // this.orderstatus =1;
                    this.tableloading = false;
                })
            }
        },
        methods: {

          
                printdetails(){
                    
                     // 转时间格式
                    if(this.needDateFrom!=''){
                         sessionStorage.setItem("orderneedDateFroms",this.needDateFrom);
                        var datapdxg=sessionStorage.getItem("orderneedDateFroms");
                        if(datapdxg.indexOf("-")<0){
                            this.needDateFrom=this.needDateFrom.getFullYear()+'-'+(this.needDateFrom.getMonth()+1)+'-'+this.needDateFrom.getDate();
                            this.needDateTo=this.needDateTo.getFullYear()+'-'+(this.needDateTo.getMonth()+1)+'-'+this.needDateTo.getDate();
                              sessionStorage.setItem("orderneedDateFrom",this.needDateFrom);
                              sessionStorage.setItem("orderneedDateTo",this.needDateTo);
                        }
           
                    }

                    this.orderneedDateFrom = sessionStorage.getItem("orderneedDateFrom");
                    this.orderneedDateTo= sessionStorage.getItem("orderneedDateTo");
                    if( this.orderneedDateFrom == null || this.orderneedDateFrom == ''){
                        this.orderneedDateFrom = '';
                    } else {
                        this.orderneedDateFrom += ' 00:00:00'
                    }
                    if(this.orderneedDateTo == null || this.orderneedDateTo == '') {
                        this.orderneedDateTo = '';
                    } else {
                        this.orderneedDateTo += ' 23:59:59';
                    }
                    if(this.orderstatus==''){
                        this.orderstatus ='1,2,3,4,7';
                    }
                    
                   printdetails(this.orderneedDateFrom,this.orderneedDateTo,this.orderstatus,this.commodity);
                    sessionStorage.setItem("orderneedDateFrom",'');
                    sessionStorage.setItem("orderneedDateTo",'');
                   

            },
              handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.orderstatuslist = this.statusarray;
                } else {
                    this.orderstatuslist = [];
                }
            },
            checkAllGroupChange (data) {
                console.log("选择的值:"+this.orderstatuslist);
                if (data.length === 6) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
            decodeUTF8(data){
                data.replace()
             },
        
              getdetailslist(val,pagesizenum){
                console.log(val);
                 sessionStorage.setItem("orderpageNumber",val)
                 if(this.orderstatuslist.length){
                    console.log("list:"+ this.orderstatuslist);
                        for(var i=0;i< this.orderstatuslist.length;i++){
                            if(i ==0){
                                this.orderstatus= this.orderstatuslist[0];
                            }else{
                                this.orderstatus= this.orderstatus+','+this.orderstatuslist[i];
                            }
                        }
                    }else{
                        this.orderstatus='';
                    }
                 console.log("status:"+this.orderstatus);
                this.loading = true;
                this.tableloading = true;
                var zhethis=this;

                if (zhethis.orderIds) {
                            sessionStorage.setItem("orderIds", zhethis.orderIds);
                        }
                sessionStorage.setItem("orderpageNumber",val);
                 if((this.needDateFrom!=''&&this.needDateTo=='')||(this.needDateFrom==''&&this.needDateTo!='')){
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请选择时间'
                    });
                }else{
                     // 转时间格式
                    if(this.needDateFrom!=''){
                        

                        var datapdxg=sessionStorage.getItem("orderneedDateFroms");
                
                            this.needDateFrom=this.needDateFrom.getFullYear()+'-'+(this.needDateFrom.getMonth()+1)+'-'+this.needDateFrom.getDate();
                            this.needDateTo=this.needDateTo.getFullYear()+'-'+(this.needDateTo.getMonth()+1)+'-'+this.needDateTo.getDate();
                            sessionStorage.setItem("orderneedDateFroms",this.needDateFrom);
                            sessionStorage.setItem("orderneedDateTos",this.needDateTo);
                    
                    };      
                }
                 if(this.ordertypelist.length){
                    for(var i=0;i< this.ordertypelist.length;i++){
                        if(i ==0){

                            this.ordertype= this.ordertypelist[0];
                        }else{
                            this.ordertype= this.ordertype+','+this.ordertypelist[i];
                        }
                    }
                }else{
                    this.ordertype='';
                }
                if(this.orderstatus==''){
                    this.orderstatus = '1,2,3,4,7';
                }

                if( this.needDateFrom == null || this.needDateFrom == ''){
                        this.needDateFrom = '';
                    } else {
                        this.needDateFrom += '';
                    }
                    if(this.needDateTo == null || this.needDateTo == '') {
                        this.needDateTo = '';
                    } else {
                        this.needDateTo += '';
                    }
                    if(this.orderstatus==''){
                        this.orderstatus ='1,2,3,4,7';
                    }
                    
                getdetailslist(val,this.needDateFrom,this.needDateTo,this.orderstatus,this.commodity).then( response => {
                sessionStorage.setItem("orderneedDateFroms",'');
                sessionStorage.setItem("orderneedDateTos",'');
                        this.tableData = response.data.list;
                        if(response.data.list==""){
                            this.$Notice.warning({
                                title: '暂无搜索结果，请核对后查询',
                                desc: true ? '' : '暂无搜索结果，请核对后查询'
                            });
                        }
                    this.pageNumber = response.data.pageNumber;
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    // this.orderstatus =1;
                    this.tableloading = false;
                    zhethis.pageNumber = response.data.pageNumber;
                    zhethis.pageCount = response.data.totalRow;
                    zhethis.totalPages = response.data.totalPage;
                    zhethis.pagesizes = response.data.pageSize;
                    sessionStorage.removeItem("orderneedDateFroms");
                    sessionStorage.removeItem("orderneedDateTos");
                    sessionStorage.removeItem("orderpeoplelists");
                    sessionStorage.removeItem("peoplepageCounts");
                    sessionStorage.removeItem("orderIds");
                    sessionStorage.removeItem("orderusernames");
                    sessionStorage.removeItem("orderuserphones");
                    sessionStorage.removeItem("orderinnname");
                    sessionStorage.removeItem("orderstatus");
                    sessionStorage.removeItem("ordertypes");
                    sessionStorage.removeItem("ordergoodstypes");
                    sessionStorage.removeItem("peoplelineboxs");
                    sessionStorage.removeItem("orderdifference");
                    sessionStorage.removeItem("orderhousedata");
                    sessionStorage.removeItem("peopletotalPages");
                    sessionStorage.removeItem("orderSelectArea2");
                    sessionStorage.removeItem("orderSelectArea3");
                    sessionStorage.removeItem("orderSelectArea4");
                    sessionStorage.removeItem("orderpdbindingStage");
                    sessionStorage.removeItem("orderpdbindingoperName");
                    sessionStorage.removeItem("orderpdbindingsalesPromoter");
                    sessionStorage.removeItem("orderselectOperName");
                    var listjson = JSON.stringify(response.data.list);
                    sessionStorage.setItem("orderpeoplelists", listjson);
                    sessionStorage.setItem("peoplelineboxs", zhethis.pagesizes);
                    sessionStorage.setItem("peopletotalPages", zhethis.totalPages);
                    sessionStorage.setItem("peoplepageCounts", response.data.totalRow);
                    if(zhethis.needDateFrom){
                        sessionStorage.setItem("orderneedDateFroms",zhethis.needDateFrom);
                        var datapdxg=sessionStorage.getItem("orderneedDateFroms");
                        if(datapdxg.indexOf("-")>0){
                            sessionStorage.setItem("orderneedDateFroms",zhethis.needDateFrom);
                            sessionStorage.setItem("orderneedDateTos",zhethis.needDateTo);
                        }else{
                            sessionStorage.setItem("orderneedDateFroms",zhethis.needDateFrom.getFullYear()+'-'+(zhethis.needDateFrom.getMonth()+1)+'-'+zhethis.needDateFrom.getDate());
                            sessionStorage.setItem("orderneedDateTos",zhethis.needDateTo.getFullYear()+'-'+(zhethis.needDateTo.getMonth()+1)+'-'+zhethis.needDateTo.getDate());
                        }
                    }
                })
             },
         

            // selectIds(selection) {
            //     selection.forEach((item, index) => {
            //         if (index == 0) {
            //             this.ids = item.id;

            //             this.orderstatusis = item.order_status;
            //         } else {
            //             this.ids = this.ids + ',' + item.id;
            //         }
            //     })
            //     this.orderstatusisarray=[];
            //     this.housearray = [];
            //     this.houseorderids=[];
            //     this.housearray2 = [];
            //     this.areaIdArray=[];
            //     this.stagearray2 = [];
            //     this.opernamearray=[];
            //     if (selection.length == 0) {
            //         this.ids = '';
            //         this.addressids = [];
            //         this.housearray = [];
            //         this.opernamearray=[];
            //         this.idsarray=[];
            //         this.operarray=[];
            //     }

            //     selection.forEach((item, index) => {
            //         if (index == 0) {
            //             this.ids = item.id;
            //             this.housearray.push(item.house);
            //             this.houseorderids.push(item.id);

            //             var zhehousedata = item['area4.area']+decodeURI(decodeURI(item.house));
            //             var zhestagedata = decodeURI(decodeURI(item.house));
            //             if(item['salesPartner.stage']!=''&&item['salesPartner.stage']!=null){
            //                 zhestagedata+=item['salesPartner.stage'];
            //             }
            //             this.housearray2.push(zhehousedata);
            //             this.stagearray2.push(zhestagedata);
            //         } else {
            //             this.ids = this.ids + ',' + item.id;
                        
            //             this.housearray.push(item.house);
            //             this.houseorderids.push(item.id);
            //             var zhehousedata = item['area4.area']+decodeURI(decodeURI(item.house));
            //             var zhestagedata = decodeURI(decodeURI(item.house));
            //             if(item['salesPartner.stage']!=''&&item['salesPartner.stage']!=null){
            //                 zhestagedata+=item['salesPartner.stage'];
            //             }
            //             this.housearray2.push(zhehousedata);
            //             this.stagearray2.push(zhestagedata);
            //         }
            //         console.log(item)
            //         this.orderstatusisarray.push(item.order_status);
            //         this.idsarray.push(item.id);
            //         this.operarray.push(item.oper_no);
            //         this.addressids.push(item.address_id);
            //         this.opernamearray.push(item.operName);
            //         this.orderidarray.push(item.id);
            //         var houses = decodeURI(item.house);
            //         sessionStorage.setItem("bindingorderhousedata", houses);
            //     })
            // },
            getcouriercompanylist(){
                 getcouriercompany().then(response => {
                    this.couriercompanylist = response.data;
                    })
            },
        }
    };
</script>
<style lang="less" scoped>
    .ivu-card-head{
        bordre-bottom:0px;
        padding:0px;
    }
    .ivu-checkbox-group{
        padding-top:5px;
    }
    .advanced-router {
        height: 240px !important;
        &-tip-p {
            padding: 10px 0;
        }
    }
    
    .sreach {
        padding: 0.6rem 1rem;
        margin-bottom: 1.5rem;
        background-color: #f8f8f9;
        > .sreach-page {
            display: flex;
            > .sreach-box {
                flex: 2;
                display: flex;
                margin-left: 2rem;
                line-height:20px;
                > span {
                    white-space: nowrap;
                    line-height: 32px;
                    margin-right: 1rem;
                }
                > button {
                    margin-left: 1rem;
                }
            }
            > .sreach-box4{
                    flex:4;
                }
            > .sreach-box button:first-child {
                margin-left: 0rem;
            }
            > .sreach-box2 {
                flex: 1;
            }
        }
        > .sreach-page + .sreach-page {
            margin-top: 1.5rem;
        }
    }
    
    .sreach .sreach-page .linenumcss {
        justify-content: flex-end;
        flex: 1;
        > p {
            text-align: right;
            line-height: 30px;
            padding-right: 10px;
            > span {
                color: #ff0000;
            }
        }
    }

    .showpflex{
        display: flex;
        > span{
            flex:1;
        }
        .flex1{
            flex:1;
        }
        .flex2{
            flex: 2;
        }
    }
    .area4updatabtn{
        flex: 1;
        display: inline-block;
        width: 40px;
        height: 20px;
        font-size: 10px;
        padding: 0;
        margin-bottom: 5px;
    }

</style>