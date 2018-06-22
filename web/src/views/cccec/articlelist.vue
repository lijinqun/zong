<template>
    <div>
        <row>
            <card>
                <p slot="title"><Icon type="ios-list"></Icon>
                    <span>文章管理</span>
                </p>
					<div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box"><span>ID:</span>
                            <i-input v-model="id" placeholder="请输入ID..."></i-input>
                        </div>
                        <div class="sreach-box"><span>标题:</span>
    						<i-input v-model="title" placeholder="请输入文章标题..."></i-input>
                        </div>
                        <div class="sreach-box"><span>类型:</span>
    						<i-input v-model="articletype" placeholder="请输入文章类型..."></i-input>
                        </div>
                        <div class="sreach-box"><span>作者:</span>
    						<i-input v-model="author" placeholder="请输入文章作者..."></i-input>
                        </div>
                         <div class="sreach-box">
                         	<div class="sreach-box sreach-box2" style="text-align: right;">
	                            <i-button type="info" icon="ios-search" @click="getTableLists(1)">搜索</i-button>
	                        </div>
                        </div>
                    </div>
                    <div class="sreach-page">
                    	<div class="sreach-box"><span>文章状态:</span>
                            <i-select v-model="status" clearable="" filterable="">
                                <i-option v-for="item in statusdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                            </i-select>
                        </div>
                        <div class="sreach-box">
                        	<!--<div class="sreach-box sreach-box3">-->
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
                        <!--</div>-->
                        </div>
                        <div class="sreach-box">
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
                <i-table :columns="tableColumns" :loading='tableloading' :data="tableData" style="width: 100%;" ref='table' @on-selection-change="selectIds"></i-table>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" show-elevator="" show-total="" @on-change="getTableLists"></page>
                </div>

            </card>
        </row>
    </div>
</template>
<script>
	import util from "@/libs/util";
    import {
        getarticlelist,delarticle
    }
        from "./../api/api.js";
    export default {
        name: "articlelist",
        data() {
        	let self = this;
            return {
            	needDateFrom:'',
            	needDateTo:'',
            	status: '',
            	articletype: '',
            	id: '',
            	title: '',
            	author: '',
            	pageNumber:1,
            	pageCount: 0,
                totalPages: 0,
                pagesizes: 20,
            	tableloading: false,
            	statusdata:[
                    {
                        id:"0",
                        name:"未上线"
                    },
                    {
                        id:"1",
                        name:"上线中"
                    }
                ],
                tableColumns: [{
                	title: 'ID',
                    key: 'id',
                    align: 'left'
                }, {
                	title: '文章类型',
                    key: 'sort.name',
                    align: 'left'
                }, {
                	title: '标题',
                    key: 'title',
                    align: 'left'
                }, {
                	title: '作者',
                    key: 'author',
                    align: 'left'
                }, 
                {
                	title: '状态',
                    key: 'status',
                    align: 'left',
                    render: (h, params) => {
						return h('div', [h('p', params.row.status == 0 ? '未上线' : '上线中')]);
    				}
                }, {
                	title: '创建时间',
                    key: 'createdTime',
                    align: 'left'
                }, 
                {
                    title: '详情',
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
					                    	let argu = { id: params.row.id};
                                        util.openNewPage(this, 'articledetails', argu);
                                        this.$router.push({
                                            name: 'articledetails',
                                            params: argu
                                        });
					                    }
					                }
					            }, '详情')
					        ]);
					    }
                },
                {
                    title: '删除',
                    key: 'action',
                    width: 80,
                    align: 'center',
                        render: (h, params) => {
					        return h('Poptip', {
					            props: {
					                confirm: true,
					                title: '您确定要删除这条数据吗?',
					                transfer: true
					            },
					            on: {
					                'on-ok': () => {
					                	delarticle(params.row.id).then(response => {
							                if(response.code=="200"){
							                    this.$Modal.success({
							                        title: "温馨提示",
							                        content: '<p>删除成功</p>'
							                    });
							                    self.getTableLists(1);
							                }else{
							                    this.$Modal.error({
							                        title: "温馨提示",
							                        content: response.message
							                    });
							                }
							            })
					                }
					            }
					        }, [
					            h('Button', {
					                style: {
					                    margin: '0 5px'
					                },
					                props: {
					                    type: 'error',
					                    size: 'small'
					                }
					            }, '删除')
					        ]);
					    }
                }],
                tableData: []
            };
        },
        mounted() {
        	this.tableloading = true;
            getarticlelist().then(response => {
                console.log(response);
                this.tableData = response.data.list;
                this.pageCount = response.data.totalRow;
                this.totalPages = response.data.totalPage;
                this.pagesizes = response.data.pageSize;
                this.tableloading = false;
            })
        },
        created() {
        	
        },
        watch: {
            '$route'(to, from) {
		        if (to.name == 'articlelist') {
		            getarticlelist().then(response => {
		                console.log(response);
		                this.tableData = response.data.list;
		                this.pageCount = response.data.totalRow;
		                this.totalPages = response.data.totalPage;
		                this.pagesizes = response.data.pageSize;
            		})
		           }
		        }    
           
        },
        methods: {
            getTableLists(val) {
            	if((this.needDateFrom!=''&&this.needDateTo=='')||(this.needDateFrom==''&&this.needDateTo!='')){
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请选择需求时间'
                    });
                    return;
                }
            	if(this.needDateFrom){
            		this.needDateFrom=this.needDateFrom.getFullYear()+'-'+(this.needDateFrom.getMonth()+1)+'-'+this.needDateFrom.getDate();
               		this.needDateTo=this.needDateTo.getFullYear()+'-'+(this.needDateTo.getMonth()+1)+'-'+this.needDateTo.getDate();
            	}
                this.tableloading = true;
                getarticlelist(val, this.pagesizes, this.id, this.title, this.author,this.articletype,this.status,this.needDateFrom,this.needDateTo).then(response => {
                    console.log(response);
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    this.tableloading = false;
                });
            }, selectIds(selection) {

            }
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
</style>