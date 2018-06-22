<template>
    <div>
        <row>
            <card>
                <p slot="title"><Icon type="ios-list"></Icon>
                    <span>提现管理</span>
                </p>
                <div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box"><span>用户昵称:</span>
                            <i-input v-model="usernames" placeholder="请输入推荐人..." class="fixedwidth-10"></i-input>
                        </div>
                        <div class="sreach-box"><span>用户编号:</span>
                            <i-input v-model="memberNo" placeholder="请输入推用户编号..." class="fixedwidth-10"></i-input>
                        </div>
                        <div class="sreach-box"><span>审核状态:</span>
                            <i-select v-model="status" clearable="" filterable="" class="fixedwidth-10">
                                <i-option v-for="item in statusdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                            </i-select>
                        </div>
                      
                        
                      
                        <div class="sreach-box"></div>
                    </div>
                    <div class="sreach-page">
                         <div class="sreach-box">
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间:</span>
                            <Row>
                                <Col span="11">
                                    <DatePicker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="needDateFrom" ></DatePicker>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <DatePicker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="needDateTo" ></DatePicker>
                                </Col>
                            </Row>              
                        </div>
                          <div class="sreach-box"><span>提现总额：<span style="font-size:18px;color:red">{{rental}}</span>  元</span>
                           
                        </div>
                    </div>
                    <div class="sreach-page">
                        <div class="sreach-box sreach-box2" style="text-align: right;">
                              <i-button type="info" icon="ios-search" @click="getBalance(1)">搜索</i-button>
                                <i-button type="warning" @click="clickexamine()">审核</i-button>
                                <Button type="primary"  @click="exportData"><Icon type="ios-download-outline"></Icon> 导出表格</Button>
                        </div>
                        <div class="sreach-box linenumcss">
                            <p>总共 <span>{{pageCount}}</span> 条记录</p>
                            <p>共 <span>{{totalPages}}</span> 页</p>
                            <p>每页
                                <i-input v-model="pagesizes" number="" style="width:45px;" placeholder=""></i-input> 条</p>
                        </div>
                    </div>
                </div>
                <i-table :columns="tableColumns" :data="tableData" style="width: 100%;" ref='table' @on-selection-change="selectIds"></i-table>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" show-elevator="" show-total="" @on-change="getBalance"></page>
                </div>

            </card>
        </row>
        <modal v-model="batchUpdateBox" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请选择</span></p>
            <div>
                <i-select v-model="choiceid" clearable="" placeholder="请选择">
                    <i-option v-for="item in statesbox" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                </i-select>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="upBatchUpdate">确认提交</i-button>
            </div>
        </modal>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import {
        getbalancelist,balanceexamine,getrental
    }
    from "./../api/api.js";
    export default {
        name: "extension",
        data() {
            return {
                bankName:'',
                bankusername:'',
                memberNo:'',
                usernames: "",
                pageCount: 0,
                totalPages: 0,
                pagesizes: 20,
                choiceid: 0,
                pageNumber:1,
                ids: "",
                amount:'',
                rental:'',
                status: '0',
                needDateFrom: '',
                needDateTo: '',
                statusdata:[
                    {
                        id:'0',
                        name:"未审核"
                    },
                    {
                        id:'1',
                        name:"通过"
                    },
                    {
                        id:'2',
                        name:"不通过"
                    }
                ],
                tableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }, {
                        title: '提现日期',
                        key: 'createdTime',
                        width:100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('span', params.row.createdTime.split(' ')[0])]);
                        }
                    }, 
                     {
                        title: '状态',
                        key: 'status',
                        width:100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('span', params.row.status == 0 ? '未审核' : params.row.status == 1 ? '通过' : '不通过')]);
                        }
                    },
                     {
                        title: '提现金额',
                        key: 'amount',
                        width:100,
                        align: 'center',
                        render: (h, params) => {
                            return h('strong', params.row.amount,
                            {
                                props:{
                                    type:'html'
                                },
                                style:{
                                
                                }
                            });
                        }
                    }, 
                    {
                        title: '用户ID',
                        key: 'memberId',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title:"用户编号",
                        width:100,
                        key:'member.memberNo',
                        align:'center'
                    },
                     {
                        title: '用户昵称',
                        width:200,
                        key: 'member.username',
                        align: 'center'
                    },
                   
                    // {
                    //     title:'银行卡号',
                    //     key: 'bankAccount',
                    //     width:200,
                    //     align:'left'
                    // },
                     
                     {
                        title: '提现时间',
                        key: 'createdTime',
                        width:100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('span', params.row.createdTime.split(' ')[1])]);
                        }
                    }, {
                        title: '审核时间',
                        key: 'auditTime',
                        width:140,
                        align: 'center'
                    }, {
                        title: '处理人',
                        width:100,
                        key: 'auditBy',
                        align: 'center'
                    },
                      {
                        title:'收款人',
                        key:'bankusername',
                        width:100,
                        align:'center'
                    }, 
                     {
                        title:'银行名称',
                        key:'bankName',
                        width:200,
                        align:'left',
                         render: (h, params) => {
                            return h('div', [h('p', params.row.bankName),h('p',params.row.bankAccount)]);
                        }
                    },
                  
                    // {
                    //     title: '操作',
                    //     // width:180,
                    //     key: 'ctrl',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //          h('Button',{
                    //              props: {
                    //                  type: 'info',
                    //                  size: 'small'
                    //              },
                    //              on: {
                    //                     click: () => {
                    //                         let argu = { id: params.row.id };
                                            
                    //                     }
                    //                 }
                    //          },'审核')
                    //         ])
                    //     }
                    // }
                ],
                tableData: [],
                batchUpdateBox:false,
                statesbox: [
                    {
                        id: 1,
                        name: "通过"
                    }, {
                        id: 2,
                        name: "不通过"
                    }
                ],
            };
        },
        mounted() {
            if (sessionStorage.getItem("peoplelists")) {
                this.list = JSON.parse(sessionStorage.getItem("peoplelists"));
                this.pageCount = Number(sessionStorage.getItem("peoplepageCounts"));
                this.linebox = Number(sessionStorage.getItem("peoplelineboxs"));
                this.pageSizes = this.linebox;
                this.totalPages = Number(sessionStorage.getItem("peopletotalPages"));
            }
            if (sessionStorage.getItem("usernames")) {
                this.usernames = sessionStorage.getItem("usernames");
            }
        },
        created() {
            this.init();
        },
        watch: {
            // '$route' () {
            //     this.init();
            // }
        },
        methods: {
            exportData () {
                    this.$refs.table.exportCsv({
                        filename: '提现表'
                    });
            },
            init(){
                     //   for (var i = 0; i <=this.pageSizes; i++) {
                     //     this.rental =Number(this.rental)+Number(response.data.list[i].amount);
                     // }; 
                getrental('','','',this.status,'','').then(response =>{
                    this.rental = response.data[0].amount;
                    console.log("总价："+this.rental);
                });
                getbalancelist('','','','','',this.status).then(response => {

                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    
                })
            },
            getBalance(val) {
                this.loading = true;
                console.log(this.usernames)
                var sorts = "";
                if((this.needDateFrom!=''&&this.needDateTo=='')||(this.needDateFrom==''&&this.needDateTo!='')){
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请选择需求时间'
                    });
                }
                // 转时间格式)
                if(this.needDateFrom!='' && this.needDateTo!=''){
                    this.needDateFrom = this.timestampToTime(this.needDateFrom);
                    this.needDateTo = this.timestampToTime(this.needDateTo);
                }
                
                getrental(sorts,this.usernames,'',this.status,this.needDateFrom,this.needDateTo,this.memberNo,this.bankName,this.bankusername).then(response =>{
                    this.rental = response.data[0].amount;
                    console.log("总价："+this.rental);
                });
                getbalancelist(val, this.pagesizes, sorts,this.usernames,'',this.status,this.needDateFrom,this.needDateTo,this.memberNo,this.bankName,this.bankusername).then(response => {
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    this.pageNumber = response.data.pageNumber;
                    sessionStorage.removeItem("peoplelists");
                    sessionStorage.removeItem("peoplepageCounts");
                    sessionStorage.removeItem("usernames");
                    sessionStorage.removeItem("peoplelineboxs");
                    sessionStorage.removeItem("peopletotalPages");
                    var listjson = JSON.stringify(response.data.list);
                    sessionStorage.setItem("peoplelists", listjson);
                    sessionStorage.setItem("peoplelineboxs", this.pagesizes);
                    sessionStorage.setItem("peopletotalPages", this.totalPages);
                    sessionStorage.setItem("peoplepageCounts", response.data.totalRow);
                    if (this.usernames) {
                        sessionStorage.setItem("usernames", this.usernames);
                    }
                    this.loading = false;
                })
            },
             timestampToTime(timeStamp) {
                var y = timeStamp.getFullYear();      
                var m = timeStamp.getMonth() + 1;      
                m = m < 10 ? ('0' + m) : m;      
                var d = timeStamp.getDate();      
                d = d < 10 ? ('0' + d) : d;   
                return y + '-' + m + '-' + d;      
            },
            clickexamine(){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要审核的用户',
                        desc: true ? '' : '请选择需要审核的用户 '
                    });
                }else{
                    this.batchUpdateBox=true;
                }
            },
            upBatchUpdate(){
                var zhethis=this;
                balanceexamine(this.ids,this.choiceid).then(response => {
                    if(response.code=="200"){
                        zhethis.$Modal.success({
                            title: '温馨提示',
                            content: '<p>审核成功</p>'
                        });
                        zhethis.getBalance(zhethis.pageNumber);
                        zhethis.ids="";
                        zhethis.batchUpdateBox=false;
                    }else{
                        zhethis.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                        zhethis.getBalance(zhethis.pageNumber);
                        zhethis.ids="";
                        zhethis.batchUpdateBox=false;
                    }
                })
            },
             selectIds(selection) {
                selection.forEach((item, index) => {
                    if (index == 0) {
                        this.ids = item.id;
                    } else {
                        this.ids = this.ids + ',' + item.id;
                    }
                })
            },
        }
    };
</script>
<style lang="less">
    .advanced-router {
        height: 240px !important;
        &-tip-p {
            padding: 10px 0;
        }
    }
    .fixedwidth-6{
        width:6rem;
    }
    .fixedwidth-10{
        width:10rem;
    }
    .box{
        margin-left:2rem;
    }
    .sss{
       color:'red';
    }
    .box span{
        margin-right:0.7rem;
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
                > span {
                    white-space: nowrap;
                    line-height: 32px;
                    margin-right: 1rem;
                }
                > button {
                    margin-left: 1rem;
                }
            }
            > .sreach-box button:first-child {
                margin-left: 0rem;
            }
            > .sreach-box.sreach-box2 {
                flex: 1;
            }
            > .sreach-box.sreach-box4 {
                flex: 1;
            }
            > .sreach-box.sreach-box3{
                flex: 3;
            }
        }
        > .sreach-page + .sreach-page {
            margin-top: 1.5rem;
        }
    }
    
    .sreach .sreach-page .linenumcss {
        justify-content: flex-end;
        flex: 2;
        > p {
            text-align: right;
            line-height: 30px;
            padding-right: 10px;
            > span {
                color: #ff0000;
            }
        }
    }
    i{
        margin-right: 5px;
    }
</style>