<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>
                    商品标签列表
                </p>
                </p>
                <!--搜索框-->
                <div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box">
                            <span>级别:</span>
                            <i-input v-model="grade" placeholder="请输入级别..."></i-input>
                        </div>
                        <div class="sreach-box"><span>上级名称:</span>
                            <i-input v-model="parname" placeholder="请输入上级名称..."></i-input>
                        </div>
                        <div class="sreach-box"><span>名称:</span>
                            <i-input v-model="name" placeholder="请输入名称..."></i-input>
                        </div>
                         <div class="sreach-box">
                         	<div class="sreach-box sreach-box2" style="text-align: right;">
	                            <i-button type="info" icon="ios-search" @click="getTableList(1)">搜索</i-button>
	                            <i-button type="info" icon="" @click="updateLists">保存</i-button>
                    			<i-button type="info" icon="" @click="visible = true">新增</i-button>
	                            <!--<i-button type="info" icon="" @click="reset">重置</i-button>-->
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
                    <can-edit-table
                            class="table" 
                            refs="tableExcel"
                            v-model="tableData"
                            :editIncell="true"
                            :columns-list="tableColumns"
                    ></can-edit-table>
                </div>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" :current="pageNumber" show-elevator="" show-total=""
                          @on-change="getTableList"></page>
                </div>  
            </card>
        </row>
        <modal title="新增标签" v-model="visible" :loading="loading" @on-ok="insert" :closable="false">
        <div class="informationbox"><span>级别:</span>
        <i-input v-model="insertgrade" placeholder="请输入级别" @on-change="getpar"></i-input>
        </div>
        <br>
        <div class="informationbox"><span>上级名称:</span>
        	<i-select v-model="parentId" clearable="" filterable="">
                <i-option v-for="item in parentdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
            </i-select>
        </div>
        <br>
    	<div class="informationbox"><span>名称:</span>
        	<i-input v-model="insertname" placeholder="请输入名称"></i-input>
        </div>
        <br>
        <div class="informationbox"><span>序号:</span>
        	<i-input v-model="insertsort" placeholder="请输入序号"></i-input>
        </div>
        <br>
        <div class="informationbox">
                <span><b>是否上线主页</b>: </span>
                <div class="ivu-input-wrapper"><i-switch v-model="isIndexOnline" ></i-switch></div>
        </div>
    	</modal>
    	
    	<modal title="新增子类" v-model="visible2" @on-ok="insert2" :closable="false">
    	<div class="informationbox"><span>名称:</span>
        	<i-input v-model="insertname2" placeholder="请输入名称"></i-input>
        </div>
        <br>
        <div class="informationbox"><span>序号:</span>
        	<i-input v-model="insertsort2" placeholder="请输入序号"></i-input>
        </div>
        <br>
        <div class="informationbox">
                <span><b>是否上线主页</b>: </span>
                <div class="ivu-input-wrapper"><i-switch v-model="isIndexOnline2" ></i-switch></div>
        </div>
    	</modal>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import {
    	getlabellist,updatelabellist,insertlabel,dellabelid
    }
        from "./../api/api.js";
    import canEditTable from './components/canEditTable.vue';
    import Bus from './bus.js';
    export default {
        name: "categorypage",
        components: {
            'can-edit-table': canEditTable
        },
        data() {
        	let self = this
            return {
            	insertgrade2:'',
            	parentId2:'',
            	insertname2:'',
            	insertsort2:'',
            	isIndexOnline2:false,
            	selectedIdList: '',
            	parentdata: [],
            	parentId: '0',
            	insertsort: '',
            	isIndexOnline: false,
            	insertname: '',
            	insertgrade: '',
            	loading: false,
            	visible: false,
            	visible2: false,
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
                    title: '级别',
                    key: 'grade',
                    width: 80,
                    align: 'left'
                }, {
                    title: '上级名称',
                    key: 'parent.name',
                    width: 100,
                    align: 'left'
                }, {
                    title: '名称',
                    key: 'name',
                    align: 'left',
                    editable: true
                }, {
                    title: '排序',
                    key: 'sort',
                    align: 'left',
                    width: 150,
                    editable: true
                }, {
                    title: '新增子类',
                    key: 'action',
                    width: 100,
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
					                    	self.visible2 = true;
					                    	self.parentId2 = params.row.id;
					                    	self.insertgrade2 = params.row.grade + 1;
//					                    	let argu = { id: params.row.id};
//					                    	console.log(argu)
//                                      util.openNewPage(this, 'editcategorydetails', argu);
//                                      this.$router.push({
//                                          name: 'editcategorydetails',
//                                          params: argu
//                                      });
					                    }
					                }
					            }, '新增')
					        ]);
					    }
                },{
                    title: '详情',
                    key: 'action',
                    width: 100,
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
					                    	console.log(argu)
                                        util.openNewPage(this, 'editlabeldetails', argu);
                                        this.$router.push({
                                            name: 'editlabeldetails',
                                            params: argu
                                        });
					                    }
					                }
					            }, '详情')
					        ]);
					    }
                }, {
				    title: '删除',
				    align: 'center',
				    key: 'handle',
				    width: 100,
				    handle: ['delete']
				}],
                ids: "",
                tableData: [],
                selectList: [],
            };
        },
        mounted() {
        	var that = this;
            Bus.$off('selectdelectList');
            Bus.$off('delete');
            getlabellist(this.pageNumber, this.pagesizes, this.grade, this.name, this.parname).then(response => {
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
            	dellabelid(param).then(response => {
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
        	getpar () {
        		if(!this.insertgrade){return;}
        		let par = this.insertgrade - 1;
        			getlabellist('','',par).then(response => {
                	this.parentdata = response.data.list;
                	console.log(this.parentdata);
            })
        		
        	},
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
                                    sort: row.sort,
                                    name: row.name
                                });
                            }
                        }
                    }
                    console.log('data')
                    console.log(data)
                    param.batchUpdateColumnsList = data;
                    updatelabellist(param).then(response => {
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
                getlabellist(val, this.pagesizes, this.grade, this.name, this.parname).then(response => {
                    console.log(response);
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                });
            },
            reset() {
            	this.name = "";
            	this.parname = "";
            	this.grade = "";
            },
            insert() {
            	if(this.insertgrade&&this.parentId&&this.insertname&&this.insertsort&&this.isIndexOnline){
            		var param = {
						grade : this.insertgrade,
						parentId : this.parentId,
						name : this.insertname,
						isIndexOnline : this.isIndexOnline == true ? 1 : 0 ,
						sort : this.insertsort
            		};
            		insertlabel(param).then(response => {
                        if (response.success) {
                            this.$Message.success('新增成功');
                            // 获取当前table页
                            this.getTableList(this.pageNumber);
                             this.insertgrade = '';
                            this.parentId = '';
                            this.insertname = '';
                             this.isIndexOnline = false;
                              this.insertsort = '';
                            //this.$refs.currentRowTable.clearCurrentRow();
                        } else {
                            this.$Message.error(response.message);
                        }
                    });
            	}else{
            		this.$Modal.error({
                        title: "提示",
                        content: '<p>请填写完整信息</p>'
                    });
            		
            	}
            },
            insert2() {
            	if(this.insertgrade2&&this.parentId2&&this.insertname2&&this.insertsort2&&this.isIndexOnline2){
            		var param = {
						grade : this.insertgrade2,
						parentId : this.parentId2,
						name : this.insertname2,
						isIndexOnline : this.isIndexOnline2 == true ? 1 : 0 ,
						sort : this.insertsort2
            		};
            		console.log(param);
            		insertlabel(param).then(response => {
                        if (response.success) {
                            this.$Message.success('新增成功');
                            // 获取当前table页
                            this.getTableList(this.pageNumber);
                            //this.$refs.currentRowTable.clearCurrentRow();
                            this.insertname2 = '';
                            this.insertsort2 = '';
                            this.isIndexOnline2 = false;
                        } else {
                            this.$Message.error(response.message);
                        }
                    });
            	}else{
            		this.$Modal.error({
                        title: "提示",
                        content: '<p>请填写完整信息</p>'
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
