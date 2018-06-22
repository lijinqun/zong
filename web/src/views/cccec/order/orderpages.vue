<template>
    <div>
        <row>
            <card>
                <Menu mode="horizontal"  active-name="1">
                    <MenuItem name="1">
                        <div @click="getstatus(0)" type='primary'>所有订单</div>
                    </MenuItem>
                    <MenuItem name="2">
                       <div @click="getstatus(2)" >待确认</div>    
                    </MenuItem>
                    <MenuItem name="3">
                        <div @click="getstatus(7)" >待发货</div>
                    </MenuItem>
                    <MenuItem name="4">
                        <div @click="getstatus(3)" >待收货</div>
                    </MenuItem>
                    <MenuItem name="5">
                        <div @click="getstatus(4)" >问题件</div>
                    </MenuItem>
                       <MenuItem name="6">
                        <div @click="getstatus(1)" >已完成</div> 
                    </MenuItem>
                    <MenuItem name="7">
                        <div @click="getstatus(5)" >已取消</div> 
                    </MenuItem>
                    <MenuItem name="8">
                        <div @click="getstatus(6)" >已过期</div> 
                    </MenuItem>
                </Menu>    
                <div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box"><span>订单编号:</span>
                            <i-input v-model="orderIds" placeholder="请输入订单编号..."></i-input>
                        </div>
                        <div class="sreach-box"><span>收货人:</span>
                            <i-input v-model="usernames" placeholder="请输入收货人..."></i-input>
                        </div>
                        <div class="sreach-box"><span>收货人电话:</span>
                            <i-input v-model="userphones" placeholder="请输入收货人电话..."></i-input>
                        </div>
                        <div class="sreach-box"><span>地址:</span>
                            <i-input v-model="address" placeholder="请输入收货人地址..."></i-input>
                        </div>
                    </div>
                    <div class="sreach-page">
                       <div class="sreach-box"><span>订单状态:</span>
                           <div>
                                <Tag v-if="this.orderstatus ==1">已完成</Tag>
                                <Tag v-if="this.orderstatus ==2">待发货</Tag>
                                <Tag v-if="this.orderstatus ==3">待收货</Tag>
                                <Tag v-if="this.orderstatus ==4">问题件</Tag>
                                <Tag v-if="this.orderstatus ==5">已取消</Tag>
                                <Tag v-if="this.orderstatus ==7">已确认</Tag>     
                            </div>
                           <div v-show="isshow">
                               <div style="padding-top:5px">
                                    <Checkbox
                                        :indeterminate="indeterminate"
                                        :value="checkAll"
                                        @click.prevent.native="handleCheckAll"
                                        >全选</Checkbox>
                                </div>

                                    <CheckboxGroup v-model="orderstatuslist"  @on-change="checkAllGroupChange" >
                                        <Checkbox v-for="item in ordertypedata"  :key="item.id"  :label-in-value = "false" v-bind:label="item.id" v-show:false-value='1'>{{item.name}}</Checkbox>
                                    </CheckboxGroup>
                                </div>
                            </div>
                    </div>
                    <div class="sreach-page">
                         <div class="sreach-box sreach-box2" style="text-align: right;">
                            <i-button type="info" icon="ios-search" @click="getorder(1)">搜索</i-button> 
                            <i-button type="warning" @click="confirmoreder()" v-show="this.orderstatus == 2 || this.orderstatus.length >2|| this.orderstatuslist == 0">确认订单</i-button>
                            <i-button type="error" @click="cancelconfirmorder()" v-show="this.orderstatus ==7">取消确认订单</i-button>
                            <i-button type="warning" @click="clickdelivery()" v-show="this.orderstatus == 7 || this.orderstatus.length >2|| this.orderstatuslist == 0">发货</i-button>
                            <i-button type="error" @click="closeoreder()" v-show="this.orderstatus == 1 || this.orderstatus.length >2|| this.orderstatuslist == 0">关闭订单</i-button>
                        </div>
                        <div class="sreach-box linenumcss">
                            <p>总共 <span>{{pageCount}}</span> 条记录</p>
                            <p>共 <span>{{totalPages}}</span> 页</p>
                            <p>每页
                                <i-input v-model="pagesizes" number="" style="width:45px;" placeholder=""></i-input> 条</p>
                        </div>
                    </div>
                </div>
                <i-table :columns="tableColumns" height="600" :loading="tableloading" :data="tableData" style="width: 100%;" @on-selection-change="selectIds"></i-table>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" :current="pageNumber" show-elevator="" show-total="" @on-change="getorder"></page>
                </div>
                <modal v-model="batchUpdateBox" width="360">
                    <p slot="header" style="text-align:center">
                        <icon type="information-circled"></icon><span>请选择</span></p>
                    <div>
                        <i-select v-model="choiceid" clearable="" placeholder="请选择">
                            <i-option v-for="item in ordertypedata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                        </i-select>
                    </div>
                    <div slot="footer">
                        <i-button type="primary" size="large" long="" @click="upBatchUpdate">确认提交</i-button>
                    </div>
                </modal>
                
            <modal v-model="couriercompanyBox">
                <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请选择</span></p>
                <div class="sreach-box"><span><b>快递公司</b>:</span>
                    <i-select v-model="couriercompanyid" clearable="" filterable="">
                        <i-option v-for="item in couriercompanylist" :value="item.id" :key="item.id">{{ item.expressName }}</i-option>
                    </i-select>
                </div>
                <div class="sreach-box"><span><b>快递单号</b>:</span>
                            <i-input v-model="courierId" placeholder="请输入订单编号..."></i-input>
                </div>
                <div slot="footer">
                <i-button type="primary" size="large" long="" @click="updateordercourier">发货</i-button>
                </div>
            </modal>
            </card>
        </row>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import {
        closeorder,bindingcourierandorder,orderupdate,getcouriercompany,getorder, orderupdate2,updatanewstatus,verificationNotice,orderrefundAmount,getmatchingArea4,getmatchingStage,updatamatchingArea4,getareabox,operatorupdateapi,getoperatorlist,sendmessagelog,getmatchingoperName,getoperatordata,updataAddress,updataorderArea4,updateconfirmoreder,getmerchantlist,cancelconfirmorder,
    }
    from "./../../api/api.js";
    export default {
        name: "extension",
        data() {
            return {
                isshow:true,
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
                orderstatus: "",
                orderstatuslist:['0','1','2','3','4','5','6','7'],
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
                statusarray:['0','1','2','3','4','5','7'],
                order_status:[],
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
                    {
                        id:"0",
                        name:"未付款"
                    },
                    {
                        id:"2",
                        name:"待发货"
                    },
                     {
                        id:"7",
                        name:"已确认"
                    },
                    {
                        id:"3",
                        name:"待收货"
                    },
                    {
                        id:"4",
                        name:"问题件"
                    },
                    {
                        id:'1',
                        name:"已完成"
                    },
                    {
                        id:"5",
                        name:"已取消"
                    },
                    {
                        id:'6',
                        name:'已过期'
                    }

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
                tableColumns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, 
                {
                    title: '订单编号',
                    key: 'order_no',
                    width:200,
                    align: 'left',
                       render: (h, params) => {
                        return h('div', [h('p',params.row.order_no),h('div', params.row.create_date != null ?params.row.create_date : '')]);
                    },
                }, 
                  {
                    title:'商品名称',
                    key:'goods.name',
                    width:150,
                    align:'left'
                },
                {
                    title: '头像',
                    key: 'member.image',
                    width: 68,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                          attrs: {
                            style: 'width: 30px;height: 30px;'
                          },
                        }, [
                            h('img', params.row['member.image']!=null?{
                              props: {
                                type: 'primary',
                                size: 'small'
                              },
                              attrs: {
                                src: params.row['member.image'], style: 'width:30px;height: 30px;border-radius: 2px;'
                              },
                              style: {},
                            }:''),
                          ]);
                      }
                },  
                {
                    title: '昵称',
                    key: 'member.username',
                    width: 130,
                    align: 'center',
//                    render: (h, params) => {
//                        return h('div', [h('span', params.row["member.nickname"]!=null&&params.row.["member.nickname"]!='null'&&params.row["member.nickname"]!=''?decodeURI(decodeURI(params.row["member.nickname"])):params.row["member.username"])]);
//                    }
                }, 
//                 {
//                     title: '商家名称',
//                     key: 'merchant.shopName',
//                     width: 130,
//                     align: 'center',
// //                    render: (h, params) => {
// //                        return h('div', [h('span', params.row["member.nickname"]!=null&&params.row.["member.nickname"]!='null'&&params.row["member.nickname"]!=''?decodeURI(decodeURI(params.row["member.nickname"])):params.row["member.username"])]);
// //                    }
//                 },
                {
                    title: '总金额',
                    key: 'amount',
                    width:100,
                    align: 'left',
                    render: (h, params) => {
                        return h('div',[h('p', params.row.amount != null ? params.row.amount:''),h('p', params.row.refundAmount>0 ? '退:'+params.row.refundAmount:'')]);
                    }
                },
                {   
                    title: '收货人',
                    key: 'consignee',
                    width:250,
                    align: 'left',

                      render: (h, params) => {
                        return h('p',[h('div', params.row.consignee != null ?params.row.consignee : ''),h('p',params.row.mobile),h('p',params.row.fullAddress)]);
                    },

                },
              
                {
                    title: '订单类型',
                    key: 'orderType',
                    align: 'left',
                    width:100,
                    render: (h, params) => {
                        return h('div', [h('div', params.row.orderType =='1' ? '普通' : params.row.orderType == '2'? '升级会员' : params.row.orderType =='3' ? '购买积分' : params.row.orderType == '4' ? '充值' : params.row.orderType == '5' ? 'OSO' : '')]);
                    },
                },
                {
                    title: '订单状态',
                    key: 'order_status',
                    align: 'left',
                    width:100,
                    render: (h, params) => {
                        return h('div', [h('p', params.row.order_status == 0 ? '未付款' : params.row.order_status == 1 ? '已完成' : params.row.order_status == 2 ? '待发货': params.row.order_status == 3 
                        ? '待收货' : params.row.order_status == 4 ? '问题件' : params.row.order_status == 5 ? '已取消':params.row.order_status ==6 ? '已过期' : params.row.order_status == 7? '已确认' : ''),h('div', params.row.isClosed ==false ? '未关闭' : '已关闭')]);
                    },
                },
                {
                    title: '详情',
                    key: 'action',
                    width:120,
                    render: (h, params) => {
                        return h('div', [
                         h('Button',{
                             props: {
                                 type: 'info',
                                 size: 'small'
                             },
                             on: {
                                    click: () => {
                                        let argu = { id: params.row.id };
                                        util.openNewPage(this, 'orderdetails', argu);
                                        this.$router.push({
                                            name: 'orderdetails',
                                            params: argu
                                        });
                                    }
                                }
                         },'详情')
//                           h('Button',{
//                              props: {
//                                  type: 'error',
//                                  size: 'small'
//                              },
//                              on: {
//                                     click: () => {
//                                 
//                                     }
//                                 },
//                              style: {
//                                  marginLeft: '5px'
//                              }
//                          },'退款')
                        ])
                    }
                }
                
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
            //获取省市区下拉选项
            this.getarealist();
            this.getcouriercompanylist();
            this.getoperator();
            //this.getmerchants();
            this.needDateFrom = '';
            this.needDateTo = '';
            // if(sessionStorage.getItem("orderneedDateFroms")){
            //     console.log(sessionStorage.getItem("orderneedDateFroms"))
            //     console.log(sessionStorage.getItem("orderneedDateTos"))
            //     this.needDateFrom=sessionStorage.getItem("orderneedDateFroms");
            //     this.needDateTo=sessionStorage.getItem("orderneedDateTos");
            // }


            if (sessionStorage.getItem("orderIds")) {
                this.orderIds = sessionStorage.getItem("orderIds");
            }
            if (sessionStorage.getItem("orderusernames")) {
                this.usernames = sessionStorage.getItem("orderusernames");
            }
            if (sessionStorage.getItem("orderuserphones")) {
                this.userphones = sessionStorage.getItem("orderuserphones");
            }
            if (sessionStorage.getItem("orderinnname")) {
                this.innname = sessionStorage.getItem("orderinnname");
            }
            if (sessionStorage.getItem("orderstatus")) {
                this.orderstatus = sessionStorage.getItem("orderstatus");
            }
            if (sessionStorage.getItem("ordertypes")) {
                this.ordertypes = sessionStorage.getItem("ordertypes");
            }
            if (sessionStorage.getItem("ordergoodstypes")) {
                this.goodstypes = sessionStorage.getItem("ordergoodstypes");
            }
            if (sessionStorage.getItem("orderdifference")) {
                this.difference = sessionStorage.getItem("orderdifference");
            }
            if (sessionStorage.getItem("orderhousedata")) {
                this.orderhousedata = sessionStorage.getItem("orderhousedata");
            }
            if (sessionStorage.getItem("orderpdbindingStage")) {
                this.pdbindingStage = sessionStorage.getItem("orderpdbindingStage");
            }
            if (sessionStorage.getItem("orderpdbindingoperName")) {
                this.pdbindingoperName = sessionStorage.getItem("orderpdbindingoperName");
            }
            if (sessionStorage.getItem("orderpdbindingsalesPromoter")) {
                this.pdbindingsalesPromoter = sessionStorage.getItem("orderpdbindingsalesPromoter");
            }
            if (sessionStorage.getItem("orderselectOperName")) {
                this.selectOperName = sessionStorage.getItem("orderselectOperName");
            }
            if (sessionStorage.getItem("orderSelectArea2")) {
                this.orderarea2 = Number(sessionStorage.getItem("orderSelectArea2"));
            }
            if (sessionStorage.getItem("orderSelectArea3")) {
                this.orderarea3 = Number(sessionStorage.getItem("orderSelectArea3"));
            }
            if (sessionStorage.getItem("orderSelectArea4")) {
                this.orderarea4 = Number(sessionStorage.getItem("orderSelectArea4"));
            }
            if (sessionStorage.getItem("orderpeoplelists")) {
                this.list = JSON.parse(sessionStorage.getItem("orderpeoplelists"));
                this.pageCount = Number(sessionStorage.getItem("peoplepageCounts"));
                this.linebox = Number(sessionStorage.getItem("peoplelineboxs"));
                this.pageSizes = this.linebox;
                this.totalPages = Number(sessionStorage.getItem("peopletotalPages"));
                this.pageNumber = Number(sessionStorage.getItem("orderpageNumber"));
                this.getorder(this.pageNumber,this.pageSizes);
            }else{
                getorder('', '', '', '', '', '', '', '', this.orderstatus,'', '', '','', '', '','', '', '','', '', '','',this.ordertype).then(response => {
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    // this.orderstatus =1;
                    this.tableloading = false;
                })
            }
        },
        watch: {
            '$route' () {
                if(this.pageNumber>0&&this.pageSizes>0){
                    this.getorder(this.pageNumber,this.pageSizes);
                }
            }
        },
        created() {
            //this.getmerchants();
        },
        methods: {

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
                // this.getorder(null, null, null,null,null,null,null,null, this.orderstatus,null,null, null,null,null, null,null, null, null,null,null, null,null,null);
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
             // clickrefund(){
             //    if(this.orderrefundnum!=""&&this.orderrefundnum!=" "&&this.orderrefundnum!=null&&this.orderrefundnum!=undefined){
             //        orderrefundAmount(this.orderrefundids,this.orderrefundnum).then(response => {
             //            console.log(response);
             //            if (response.success) {
             //                this.$Message.success("提交成功");
             //                this.getorder(this.pageNumber,this.pageSizes) 
             //                // this.getorder(1);
             //            } else {
             //                this.$Message.error(response.message);
             //            }
             //            this.orderrefund = false;
             //            this.orderrefundnum="";
             //            })
             //    }
                
             // },
            getorder(val,pagesizenum) {

                this.loading = true;
                this.tableloading = true;
                var zhethis=this;
                var conditions = "";
                var sorts = "";

                if((this.needDateFrom!=''&&this.needDateTo=='')||(this.needDateFrom==''&&this.needDateTo!='')){
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请选择需求时间'
                    });
                }else{
                    // 转时间格式
                    if(this.needDateFrom!=''){
                        sessionStorage.setItem("orderneedDateFroms",this.needDateFrom);
                        var datapdxg=sessionStorage.getItem("orderneedDateFroms");
                        if(datapdxg.indexOf("-")<0){
                            this.needDateFrom=this.needDateFrom.getFullYear()+'-'+(this.needDateFrom.getMonth()+1)+'-'+this.needDateFrom.getDate();
                            this.needDateTo=this.needDateTo.getFullYear()+'-'+(this.needDateTo.getMonth()+1)+'-'+this.needDateTo.getDate();
                        }
                    };
                    var pagesizesnum = this.pagesizes;
                    if(pagesizenum>0){
                        pagesizesnum = pagesizenum;
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
                    
                    if(this.orderstatuslist.length){
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
                  

                    getorder(val, this.pagesizes, conditions, sorts, this.orderIds, this.usernames, this.userphones, this.innname, this.orderstatus, this.ordertypes, this.goodstypes,this.difference,this.needDateFrom,this.needDateTo,this.orderhousedata,this.pdbindingStage,this.orderarea2,this.orderarea3,this.orderarea4,this.pdbindingoperName,this.pdbindingsalesPromoter,this.selectOperName,this.ordertype,this.address, this.merchnatlist).then(response => {
                        // this.tableData = this.decodeUTF8(response.data.list);
                        zhethis.tableData = response.data.list;
                        console.log(this.orderstatuslist);
                        if(response.data.list==""){
                            this.$Notice.warning({
                                title: '暂无搜索结果，请核对后查询',
                                desc: true ? '' : '暂无搜索结果，请核对后查询'
                            });
                        }
                      
                        zhethis.tableloading = false;

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
                        if (zhethis.orderIds) {
                            sessionStorage.setItem("orderIds", zhethis.orderIds);
                        }
                        if (zhethis.usernames) {
                            sessionStorage.setItem("orderusernames", zhethis.usernames);
                        }
                        if (zhethis.userphones) {
                            sessionStorage.setItem("orderuserphones", zhethis.userphones);
                        }
                        if (zhethis.innname) {
                            sessionStorage.setItem("orderinnname", zhethis.innname);
                        }
                        if (zhethis.orderstatus) {
                            sessionStorage.setItem("orderstatus", zhethis.orderstatus);
                        }
                        if (zhethis.ordertypes) {
                            sessionStorage.setItem("ordertypes", zhethis.ordertypes);
                        }
                        if (zhethis.goodstypes) {
                            sessionStorage.setItem("ordergoodstypes", zhethis.goodstypes);
                        }
                        if (zhethis.difference) {
                            sessionStorage.setItem("orderdifference", zhethis.difference);
                        }
                        if (zhethis.orderhousedata) {
                            sessionStorage.setItem("orderhousedata", zhethis.orderhousedata);
                        }
                        if (zhethis.pdbindingStage) {
                            sessionStorage.setItem("orderpdbindingStage", zhethis.pdbindingStage);
                        }
                        if (zhethis.pdbindingoperName) {
                            sessionStorage.setItem("orderpdbindingoperName", zhethis.pdbindingoperName);
                        }
                        if (zhethis.pdbindingsalesPromoter) {
                            sessionStorage.setItem("orderpdbindingsalesPromoter", zhethis.pdbindingsalesPromoter);
                        }
                        if (zhethis.selectOperName) {
                            sessionStorage.setItem("orderselectOperName", zhethis.selectOperName);
                        }
                        if (zhethis.orderarea2) {
                            sessionStorage.setItem("orderSelectArea2", zhethis.orderarea2);
                        };
                        if (zhethis.orderarea3) {
                            sessionStorage.setItem("orderSelectArea3", zhethis.orderarea3);
                        };
                        if (zhethis.orderarea4) {
                            sessionStorage.setItem("orderSelectArea4", zhethis.orderarea4);
                        };
                        zhethis.loading = false;
                    })
                }
            },
            updatestatus(id,status){
                var zhethis=this;
                updatanewstatus(id,status).then(response => {
                        console.log(response);
                        if(response.success){
                            zhethis.$Message.success("修改成功");
                            zhethis.getorder(zhethis.pageNumber,zhethis.pageSizes);
                        }else{
                            zhethis.$Message.error("修改失败");
                        }
                    })
            },

            gobindinginn(){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要绑定的商家',
                        desc: true ? '' : '请选择需要绑定的商家 '
                    });
                }else{
                    let argu = { 
                        id: this.ids
                     };
                    util.openNewPage(this, 'bindinginn', argu);
                    this.ids='';
                    this.$router.push({
                        name: 'bindinginn',
                        params: argu
                    });
                    this.ids='';
                }
                
            }, 
            gonotice(){
                var zhethis=this;
               if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要发送短信的订单',
                        desc: true ? '' : '请选择需要发送短信的订单 '
                    });
                }else{
                    verificationNotice(this.ids).then(response => {
                        console.log(response);
                        zhethis.ids='';
                        if(response.success){
                            this.$Message.success("发送成功");
                        }else{
                            this.$Message.error("发送失败");
                        }
                        zhethis.ids='';
                    })
                } 
            },
            matchingarea4(){

                this.$router.push("/matchingaddress")
            },
            updataArea4(){
                for(var i=0;i<this.ids.length;i++){
                    updatamatchingArea4(this.ids[i]).then(response => {
                        console.log(response.data)
                    })
                }
                this.getorder(this.pageNumber,this.pageSizes);
            },
            // area4showfalse(){
            //     this.area4show=false;
            //     this.housearray=[];
            //     this.ids='';
            //     this.housearray2=[];
            //     this.areaarray=[];
            //     this.getorder(this.pageNumber,this.pageSizes);
            // },
            // 匹配分拣人员
            matchingoperName(){
                var zhethis =this;
                var zheoperNamedata = '';
                zhethis.operNameData=[];
                console.log(this.housearray)
                console.log(this.housearray.length)
                for(var i=0;i<this.housearray.length;i++){
                    var zhehouse=decodeURI(decodeURI(this.housearray[i]));
                    
                    console.log(zhehouse)
                    getmatchingoperName(zhehouse).then(response => {
                        console.log(response.data)
                        console.log(zhehouse)
                        var zhedata={};
                        if(response.data.length==0){
                            zhedata.fullName=" ";
                            zhedata.operNo=" ";
                        }else{
                            zhedata= response.data[0];
                        }
                        zhedata.index=zhethis.operNameData.length;
                        console.log(zhedata)
                        zhethis.operNameData.push(zhedata);
                        console.log(zhethis.operNameData)
                    })
                }
                this.operNameshowdata=true;
            },
            // operNameshowdatafalse(){
            //     this.operNameshowdata=false;
            //     this.getorder(this.pageNumber,this.pageSizes);
            // },
            //匹配驿站
            matchingStage(){
                this.areaarray=[];
                this.stagearray=[];
                var zhethis =this;
                // this.housearray2=[];
                console.log(this.housearray)
                for(var i=0;i<this.housearray.length;i++){
                    console.log(i)
                    console.log(decodeURI(this.housearray[i]))
                    var zhehouse=decodeURI(decodeURI(this.housearray[i]));
                    zhehouse = zhehouse.substr(0,3);
                    console.log(zhehouse)
                    getmatchingStage(zhehouse).then(response => {
                        console.log(response.data)
                        var zhedata='';
                        if(response.data.length==0){
                            zhedata=" ";
                        }else{
                            zhedata= response.data[0].stage;
                        }
                        console.log(zhedata)
                        zhethis.stagearray.push(zhedata);
                    })
                }
                console.log(zhethis.stagearray)
                this.stageshowdata=true;
            },
        
            updataStage(){
                this.getorder(this.pageNumber,this.pageSizes);
            },
            // stageshowdatafalse(){
            //     this.area4show=false;
            //     this.housearray=[];
            //     this.ids='';
            //     this.housearray2=[];
            //     this.areaarray=[];
            //     this.getorder(this.pageNumber,this.pageSizes);
            // },
            // 获取市、区、街道办下拉数据
            getarealist(){
                var zhethis = this;
                getareabox(2).then(response => {
                    zhethis.orderarea2data=response.data;
                });
                getareabox(3).then(response => {
                    zhethis.orderarea3data=response.data;
                });
                getareabox(4).then(response => {
                    zhethis.orderarea4data=response.data;
                });
            },
            getmerchants() {
                console.log('getmerchants.....');
                getmerchantlist().then(response => {
                    console.log(response.data)
                    this.merchantlistdata=response.data;
                });
            },
            // 指定配送员
            // upOperatorUpdate() {
            //     console.log(this.ids)
            //     console.log(this.OperatorNo)
            //     var OperatorNo=this.OperatorNo!=null&&this.OperatorNo!='null'&&this.OperatorNo!=''?this.OperatorNo:'';
            //     var OperatorName="";
            //     var OperatorMobile="";
            //     for(var i=0;i<this.Operatordata.length;i++){
            //         if(this.OperatorNo==this.Operatordata[i].operNo){
            //             OperatorName=this.Operatordata[i].operName!=null&&this.Operatordata[i].operName!='null'&&this.Operatordata[i].operName!=''?this.Operatordata[i].operName:'';
            //             OperatorMobile=this.Operatordata[i].operMobile!=null&&this.Operatordata[i].operMobile!='null'&&this.Operatordata[i].operMobile!=''?this.Operatordata[i].operMobile:'';
            //         }
            //     }
            //     operatorupdateapi(this.ids, OperatorNo,OperatorName,OperatorMobile).then(response => {
            //         if (response.success) {
            //             this.$Message.success("修改成功");
            //             this.getorder(this.pageNumber,this.pageSizes);
            //         } else {
            //             this.$Message.error("修改失败");
            //         }
            //         this.OperatorUpdateshow = false;
            //     })
            // },
            // OperatorUpdatefalse(){
            //     this.OperatorUpdateshow = false;
            // },
            // 获取配送员列表
            getoperator(){
                var zhethis = this;
                getoperatorlist().then(response => {
                    zhethis.Operatordata = response.data;
                })
            },
            bindingoperator(){
                this.getoperator();
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要指定配送员的订单',
                        desc: true ? '' : '请选择需要指定配送员的订单 '
                    });
                }else{
                    this.OperatorUpdateshow = true;
                }
            },
            upBatchUpdate() {
                orderupdate2(this.ids, this.choiceid).then(response => {
                    if (response.success) {
                        this.$Message.success("修改成功");
                        this.getorder(this.pageNumber,this.pageSizes);
                    } else {
                        this.$Message.error("修改失败");
                    }
                    this.batchUpdateBox = false;
                })
            }, 

            // 匹配地址按钮 更新订单用户地址
            area4updatafun(index){
                // this.areaarraydata
                console.log(this.idsarray)
                console.log(this.idsarray[index])
                console.log(this.areaarraydata)
                var zhethis=this;
                var thisids=this.idsarray[index];
                var thisaddressid=this.addressids[index];
                var thisarea2=this.areaarraydata[index][0]["parentArea4.id"];
                var thisarea3=this.areaarraydata[index][0]["parentArea3.id"];
                var thisarea4=this.areaarraydata[index][0]["parentArea2.id"];
                var thisoperNo=this.operarray[index];
                console.log(this.operarray)
                console.log(thisaddressid)
                console.log(this.areaarraydata[index][0])
                getoperatordata(thisoperNo).then(response => {
                    updataorderArea4(thisids,thisarea2,thisarea3,thisarea4,response.data.operNo,response.data.operName,response.data.operMobile).then(response => {
                        if(thisaddressid!=null&&thisaddressid!='null'&&thisaddressid!=''){
                            updataAddress(thisaddressid,thisarea2,thisarea3,thisarea4).then(response => {
                                
                            })
                        }
                        if (response.success) {

                            zhethis.$Message.success("修改成功");
                        } else {
                            zhethis.$Message.error("修改失败");
                        }
                    })
                })
            },
            getstatus(status_index,status_index2){        
                if(status_index == 0){
                    this.isshow= true;
                    this.orderstatuslist = ['0','1','2','3','4','5','6','7'];
                    this.getorder(null, null, null,null,null,null,null,null,this.orderstatus,null,null, null,null,null, null,null, null, null,null,null, null,null,null);
                }else if(status_index!= 0){
                    this.isshow= false;
                    this.orderstatuslist = [];
                    this.orderstatuslist = [status_index,status_index2];

                    let s = status_index + '';
                    let d = status_index2 + '';
                    if(status_index2=='' || status_index2 == undefined){
                             this.orderstatuslist = [s];
                    }else{
                          this.orderstatuslist = [s,d];
                    }

                    this.getorder(null, null, null,null,null,null,null,null,this.orderstatus,null,null, null,null,null, null,null, null, null,null,null, null,null,null);
                }
                this.checkAllGroupChange(this.orderstatuslist);
                console.log("list："+this.orderstatuslist);
            
               
            },

            selectIds(selection) {
                console.log("selection :" + this.selection);
                selection.forEach((item, index) => {
                    if (index == 0) {
                        this.ids = item.id;
                        this.orderstatusis = item.order_status;
                    } else {
                        this.ids = this.ids + ',' + item.id;
                    }
                })
                this.orderstatusisarray=[];
                this.housearray = [];
                this.houseorderids=[];
                this.housearray2 = [];
                this.areaIdArray=[];
                this.stagearray2 = [];
                this.opernamearray=[];
                if (selection.length == 0) {
                    this.ids = '';
                    this.addressids = [];
                    this.housearray = [];
                    this.opernamearray=[];
                    this.idsarray=[];
                    this.operarray=[];
                }

                selection.forEach((item, index) => {
                    if (index == 0) {
                        this.ids = item.id;
                        this.housearray.push(item.house);
                        this.houseorderids.push(item.id);

                        var zhehousedata = item['area4.area']+decodeURI(decodeURI(item.house));
                        var zhestagedata = decodeURI(decodeURI(item.house));
                        if(item['salesPartner.stage']!=''&&item['salesPartner.stage']!=null){
                            zhestagedata+=item['salesPartner.stage'];
                        }
                        this.housearray2.push(zhehousedata);
                        this.stagearray2.push(zhestagedata);
                    } else {
                        this.ids = this.ids + ',' + item.id;
                        
                        this.housearray.push(item.house);
                        this.houseorderids.push(item.id);
                        var zhehousedata = item['area4.area']+decodeURI(decodeURI(item.house));
                        var zhestagedata = decodeURI(decodeURI(item.house));
                        if(item['salesPartner.stage']!=''&&item['salesPartner.stage']!=null){
                            zhestagedata+=item['salesPartner.stage'];
                        }
                        this.housearray2.push(zhehousedata);
                        this.stagearray2.push(zhestagedata);
                    }
                    console.log(item)
                    this.orderstatusisarray.push(item.order_status);
                    this.idsarray.push(item.id);
                    this.operarray.push(item.oper_no);
                    this.addressids.push(item.address_id);
                    this.opernamearray.push(item.operName);
                    this.orderidarray.push(item.id);
                    var houses = decodeURI(item.house);
                    sessionStorage.setItem("bindingorderhousedata", houses);
                })
            },
            getcouriercompanylist(){
                 getcouriercompany().then(response => {
                    this.couriercompanylist = response.data;
                    })
            },
            closeoreder(){
                if (this.ids !== null && this.ids  !== undefined && this.ids  !== '') {
                    if(typeof(this.ids) == 'number') {
                        closeorder(this.ids,'true').then(response => {
                                if(response.code=="200"){
                                    this.$Message.success('关闭成功');
                                    this.getorder(this.pageNumber,this.pageSizes);
                            }else{
                                this.$Modal.error({
                                    title: '温馨提示',
                                    content: '<p>'+response.message+'</p>'
                                });
                                return;
                                }
                          })
                    } else {
                        this.$Message.error('请选择一项');
                    }
                } else {
                    this.$Message.error('请选择选项');
                }
            },
            confirmoreder(){
                if (this.ids !== null && this.ids  !== undefined && this.ids  !== '') {
                    // for (var i = 0; i < this.orderstatusisarray.length; i++) {
                    //     if(this.orderstatusisarray[i]!=2){
                    //         this.$Message.error('订单状态需为待确定状态！');
                    //         return;
                    //     }
                    // }
                    updateconfirmoreder(this.ids).then(response => {
                        if(response.code=="200"){
                            this.$Message.success('确认成功');
                            this.getorder(this.pageNumber,this.pageSizes,null,null,null,null,null,null,this.orderstatus);
                        }else{
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.message
                            });
                            return;
                        }
                    })
                } else {
                    this.$Message.error('请选择选项');
                }
            },
            cancelconfirmorder(){
                  if (this.ids !== null && this.ids  !== undefined && this.ids  !== '') {
                    // for (var i = 0; i < this.orderstatusisarray.length; i++) {
                    //     if(this.orderstatusisarray[i]!=2){
                    //         this.$Message.error('订单状态需为待确定状态！');
                    //         return;
                    //     }
                    // }
                    cancelconfirmorder(this.ids).then(response => {
                        if(response.code=="200"){
                            this.$Message.success('取消成功');
                            this.getorder(this.pageNumber,this.pageSizes,null,null,null,null,null,null,this.orderstatus);
                        }else{
                            this.$Modal.error({
                                title: '温馨提示',
                                content: response.message
                            });
                            return;
                        }
                    })
                } else {
                    this.$Message.error('请选择选项');
                }   
            },
            clickdelivery(){
                if (this.ids !== null && this.ids  !== undefined && this.ids  !== '') {
                    if(typeof(this.ids) == 'number') {
                        // if(this.orderstatusis !=2){
                        // this.$Message.error('订单状态需为待发货状态！');return;
                        // }
                        this.couriercompanyBox = true;
                    } else {
                        this.$Message.error('请选择一项');
                    }
                } else {
                    this.$Message.error('请选择选项');
                }
            },
            updateordercourier(){
                if(this.couriercompanyid == ''||this.courierId ==""){
                    this.$Message.error('信息输入不完整，请重试');return;
                }
                var zhethis=this;
                console.log(this.ids)
                // orderupdate(this.ids,'','','','','3').then(response => {
                //      if(response.code=="200"){
             //        }else{
             //            zhethis.$Modal.error({
             //                title: '温馨提示',
             //                content: '<p>'+response.message+'</p>'
             //            });
             //            return;
             //         }
             //      })
                bindingcourierandorder(this.ids,this.couriercompanyid,this.courierId).then(response => {
                        if(response.code=="200"){
                            this.getorder(this.pageNumber,this.pageSizes);
                            this.$Message.success('发货成功');
                    }else{
                        zhethis.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                        return;
                        }
                  })
                this.couriercompanyid = '';
                this.courierId = '';
                this.couriercompanyBox = false;
                
                
                
                }
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