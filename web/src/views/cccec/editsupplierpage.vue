<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>
                    商品供应商列表
                </p>
                </p>
                <!--搜索框-->
                <div class="sreach">
                    <div class="sreach-page">
                    	<div class="sreach-box"><span>ID:</span>
                            <i-input v-model="id" placeholder="请输入ID..."></i-input>
                        </div>
                        <div class="sreach-box"><span>名称:</span>
                            <i-input v-model="name" placeholder="请输入名称..."></i-input>
                        </div>
                        <div class="sreach-box"><span>供应商:</span>
                            <i-select v-model="isdel" clearable="" filterable="">
                                <i-option v-for="item in dellist" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                            </i-select>
                        </div>
                         <div class="sreach-box">
                         	<div class="sreach-box sreach-box2" style="text-align: right;">
	                            <i-button type="info" icon="ios-search" @click="getTableList(1)">搜索</i-button>
	                            &nbsp;
	                            <i-button type="info" icon="" @click="updateLists">保存</i-button>
                    			&nbsp;
                    			<i-button type="info" icon="" @click="visible = true">新增</i-button>
	                        </div>
                        </div>
                    </div>
                    <div class="sreach-page">
                        <div class="sreach-box linenumcss">
                            <p>总共 <span>{{pageCount}}</span> 条记录</p>
                            <p>共 <span>{{totalPages}}</span> 页</p>
                        </div>
                    </div>
                </div>
           		<div class="tableContainer">
                    <!--<Table class="table" :columns="tableColumns" :data="tableData" ref="tableExcel"
                           :loading="tableloading"
                           @on-selection-change="selectedIds" highlight-row></Table>-->
                    <can-edit-table v-show="this.status =='0'"
                            class="table" 
                            refs="tableExcel"
                            v-model="tableData"
                            :editIncell="true"
                            :columns-list="tableColumns"
                    ></can-edit-table>
                    <can-edit-table v-show="this.status=='1'"
                            class="table" 
                            refs="tableExcel"
                            v-model="tableData"
                            :editIncell="true"
                            :columns-list="tableColumns2"
                    ></can-edit-table>
                </div>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" :current="pageNumber" show-elevator="" show-total=""
                          @on-change="getTableList"></page>
                </div>  
            </card>
        </row>
        <modal title="新增供应商" v-model="visible" :loading="loading" @on-ok="insert" :closable="false">
    	<div class="informationbox"><span>名称:</span>
        	<i-input v-model="insertname" placeholder="请输入名称"></i-input>
        </div>
        <br>
    	</modal>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import {
    	getsupplierlist,updatesupplier,insertsupplier,delsupplierid,regainsupplier
    }
        from "./../api/api.js";
    import canEditTable from './components/canEditTable.vue';
    import Bus from './bus.js';
    export default {
        name: "supplierpage",
        components: {
            'can-edit-table': canEditTable
        },
        data() {
        	let self = this
            return {
                isdel:'0',
                status:'0',
                dellist:[
                    {
                        id:'0',
                        name:'未删除'
                    },
                    {
                        id:'1',
                        name:'已删除'
                    }
                ],
            	selectedIdList: '',
            	parentdata: [],
            	parentId: '0',
            	insertsort: '',
            	isIndexOnline: false,
            	insertname: '',
            	insertgrade: '',
            	loading: false,
            	visible: false,
            	parname: '',
            	name: '',
            	grade: '',
                id: "",
                tableloading: false,
                pageNumber:1,
                pageCount: 0,
                totalPages: 0,
                pagesizes: 20,
                tableColumns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: 'ID',
                    key: 'id',
                    align: 'left',
                }, {
                    title: '名称',
                    key: 'name',
                    align: 'left',
                    editable: true
                },
                {
				    title: '删除',
				    align: 'center',
				    key: 'handle',
				    width: 100,
				    handle: ['delete']
				}
                ],
                tableColumns2: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: 'ID',
                    key: 'id',
                    align: 'left',
                }, {
                    title: '名称',
                    key: 'name',
                    align: 'left',
                    editable: true
                },
                {
                    title: '恢复',
                    align: 'center',
                    key: 'handle',
                    width: 100,
                    render: (h,params) =>{
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
                                        click: function(){
                                           
                                            var regainId = params.row.id
                                            console.log("数据"+regainId);
                                            regainsupplier(regainId).then(response =>{
                                              location.reload(false);

                        
                                            })
                                        }
                                    }
                                }, '恢复')
                            ]);
                    }
                }
                ],
                ids: "",
                tableData: [],
                selectList: [],
            };
                
        },
        mounted() {
        	var that = this;
            Bus.$off('selectdelectList');
            Bus.$off('delete');
            Bus.$off('regain');
            getsupplierlist(this.pageNumber, this.pagesizes, this.id, this.name,this.isdel).then(response => {
                console.log(response);
                this.tableData = response.data.list;
                this.pageCount = response.data.totalRow;
                this.totalPages = response.data.totalPage;
                this.pagesizes = response.data.pageSize;
            })
        	
            // 选项检验
            Bus.$on('selectdelectList', function (ids) {
                // 1为有选项，2为无选项
                that.selectedIdList = ids;
                var data = '';
                if (that.selectedIdList !== null && that.selectedIdList !== undefined && that.selectedIdList !== '') {
                    data = 1;
                } else {
                    data = 2;
                }
            });
            //删除
            Bus.$on('delete', function (deleteId) {
            	console.log(deleteId);
            	var param = {
            		id : deleteId
            	};
            	delsupplierid(param).then(response => {
                        if (response.success) {
                            that.$Message.success('删除成功');
                        } else {
                            console.log(response.message);
                            that.$Message.error(response.message);
                        }
                    });
            });
        
        },
        watch: {
//			this.$store.state.goods: function() {  
//			                console.log(aaaa ); 
//			            }  
        },
        methods: {
        	//更新保存
        	updateLists () {
        		if (this.selectedIdList !== null && this.selectedIdList !== undefined && this.selectedIdList !== '') {
                    var list = this.selectedIdList.split(',');
                    var param = {};
                    var data = [];
                    for (let i of list) {
                        for (let row of this.$store.state.goods.cacheGoodsTable) {
                            if (row.id == i) {
                                data.push({
                                    id: row.id,
                                    name: row.name
                                });
                            }
                        }
                    }
                    console.log('data')
                    console.log(data)
                    param.batchUpdateColumnsList = data
                    updatesupplier(param).then(response => {
                        if (response.success) {
                            this.$Message.success('修改成功');
                            // 获取当前table页
                            this.getTableList(this.pageNumber);
                            //this.$refs.currentRowTable.clearCurrentRow();
                        } else {
                            console.log(response.message);
                            this.$Message.error(response.message);
                        }
                    });
                } else {
                    this.$Message.error('请选择选项');
                }
        		
        	},
            // 获取列表方法
            getTableList(val) {
            	this.pageNumber = val;
                getsupplierlist(val, this.pagesizes, this.id, this.name,this.isdel).then(response => {
                    console.log("数据"+this.isdel);
                    this.status = this.isdel;
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                });
            },
            insert() {
            	if(this.insertname){
     				var param = {
						name : this.insertname
            		};
	     			insertsupplier(param).then(response => {
	     				if(response.code=="200"){
		                    this.$Modal.success({
		                        title: "温馨提示",
		                        content: '<p>新建成功</p>'
		                    });
		                    this.getTableList(this.pageNumber);
		                }else{
		                    this.$Modal.error({
		                        title: "温馨提示",
		                        content: response.message
		                    });
		                }
	                })
     				this.insertname = '';
     				this.visible = false;
        		}else{
        			this.$Modal.error({
                        title: "提示",
                        content: '<p>请输入所要创建的供应商</p>'
                    });
        		}
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
