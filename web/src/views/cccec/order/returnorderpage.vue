<template>
    <div>
        <row>
            <card>
                <p slot="title"><Icon type="ios-list"></Icon>
                    <span>退货管理</span>
                </p>
                <div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box"><span>订单单号:</span>
                            <i-input v-model="ordernumber" placeholder="请输入订单单号..."></i-input>
                        </div>
                        <div class="sreach-box"><span>订单名称:</span>
                            <i-input v-model="ordername" placeholder="请输入订单名称..."></i-input>
                        </div>
                        <div class="sreach-box"><span>订单状态:</span>
                           <i-select v-model="status" clearable="" placeholder="请选择">
			                    <i-option v-for="item in statesbox" :value="item.id" :key="item.id">{{ item.name }}</i-option>
			                </i-select>
                        </div>
                         <div class="sreach-box">
                         	<div class="sreach-box sreach-box2" style="text-align: right;">
	                            <i-button type="info" icon="ios-search" @click="getBalance(1)">搜索</i-button>
                                <!--<i-button type="warning" @click="clickexamine()">审核</i-button>-->
	                        </div>
                        </div>
                    </div>
                    <div class="sreach-page">
                        <div class="sreach-box sreach-box4">
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
        getreturnorderpage,checkreturnorder,returnordermon
    }
    from "./../../api/api.js";
    export default {
        name: "returnorderpage",
        data() {
        	let self = this;
            return {
            	returnmonid:'',
            	orderId:'',
            	ordernumber:'',
                ordername:'',
                pageCount: 0,
                totalPages: 0,
                pagesizes: 20,
                choiceid: 0,
                pageNumber:1,
                ids: "",
                status: '',
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
                    },{
                        title: '订单单号',
                        key: 'ord.order_no',
                        align: 'center',
                        width: 180,
                    } ,{
                        title: '商品名称',
                        key: 'goods.name',
                        align: 'center'
                    },{
                        title: '申请日期',
                        key: 'requestTime',
                        align: 'center',
                        width: 160,
//                      render: (h, params) => {
//                          return h('div', [h('span', params.row.createdTime.split(' ')[0])]);
//                      }
                   }, {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('span', params.row.status=='1' ?　'待审核':params.row.status=='2' ?　'审批通过':
                            					params.row.status=='3' ?　'审批不通过':params.row.status=='4' ?　'已发货':
                            					params.row.status=='5' ?　'退货完成':'已取消'
                            )]);
                        }
                    }, {
                    title: '审核',
                    key: 'action',
                    width: 80,
                    align: 'center',
                        render: (h, params) => {
					        return h('div', [
					            h('Button', {
					                props: {
					                    type: 'info',
					                    size: 'small'
					                },
					                style: {
					                    marginRight: '5px'
					                },
					                on: {
					                    click: () => {
					                    	self.batchUpdateBox = true;
					                    	self.orderId = params.row.id;
//					                    	let argu = { id: params.row.id};
//					                    	console.log(argu)
//                                      util.openNewPage(this, 'editcategorydetails', argu);
//                                      this.$router.push({
//                                          name: 'editcategorydetails',
//                                          params: argu
//                                      });
					                    }
					                }
					            }, '审核')
					        ]);
					    }
                },
                 {
                    title: '退款',
                    key: 'action',
                    width: 80,
                    align: 'center',
                        render: (h, params) => {
					        return h('div', [
					            h('Button', {
					                props: {
					                    type: 'error',
					                    size: 'small'
					                },
					                style: {
					                    marginRight: '5px'
					                },
					                on: {
					                    click: () => {
					                    	if(params.row.status!=2){
					                    		self.$Message.error('审批未通过，不能退款！');return;
					                    	}
					                    	//self.batchUpdateBox = true;
					                    	self.returnmonid = params.row.id;
					                    	self.returnmon(params.row.id);
//					                    	let argu = { id: params.row.id};
//					                    	console.log(argu)
//                                      util.openNewPage(this, 'editcategorydetails', argu);
//                                      this.$router.push({
//                                          name: 'editcategorydetails',
//                                          params: argu
//                                      });
					                    }
					                }
					            }, '退款')
					        ]);
					    }
                }],
                tableData: [],
                batchUpdateBox:false,
                statesbox: [
                    {
                        id: 1,
                        name: "待审核"
                    }, {
                        id: 2,
                        name: "审批通过"
                    }, {
                        id: 3,
                        name: "审批不通过"
                    }, {
                        id: 4,
                        name: "已发货"
                    }, {
                        id: 5,
                        name: "退货完成"
                    }, {
                        id: 6,
                        name: "已取消"
                    }
                ],
            };
        },
        mounted() {
        	getreturnorderpage().then(response => {
                	console.log(111);
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                })
        },
        created() {
            
        },
        watch: {
            // '$route' () {
            //     this.init();
            // }
        },
        methods: {
        	returnmon(idnum){
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '<p>确认退款</p>',
                    onOk: () => {
                        returnordermon(idnum).then(response => {
                            console.log(response);
                            if (response.success) {
                                this.$Message.success("退款成功");
                                // this.getListData(1);
                            } else {
                                this.$Message.error(response.message);
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('已取消');
                    }
                });
	        	
        	},
            init(){
                
            },
            getBalance(val) {
                this.loading = true;
                var sorts = "";
                if((this.needDateFrom!=''&&this.needDateTo=='')||(this.needDateFrom==''&&this.needDateTo!='')){
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请选择退货时间'
                    });
                }
                // 转时间格式)
                if(this.needDateFrom!='' && this.needDateTo!=''){
                	this.needDateFrom = this.timestampToTime(this.needDateFrom);
               		this.needDateTo = this.timestampToTime(this.needDateTo);
                }
                
                getreturnorderpage(val, this.pagesizes, this.ordernumber,this.ordername,this.needDateFrom,this.needDateTo,this.status).then(response => {
                    console.log(response);
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    this.pageNumber = response.data.pageNumber;
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
            upBatchUpdate(){
                var zhethis=this;
                if(!this.choiceid){
                	this.$Message.success('请选择状态');return;
                }
                checkreturnorder(this.orderId,this.choiceid,'admin').then(response => {
                    if(response.code=="200"){
                        zhethis.$Modal.success({
                            title: '温馨提示',
                            content: '<p>审核成功</p>'
                        });
                        zhethis.getBalance(zhethis.pageNumber);
                        zhethis.choiceid="";
                        zhethis.batchUpdateBox=false;
                    }else{
                        zhethis.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                        zhethis.getBalance(zhethis.pageNumber);
                        zhethis.choiceid="";
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