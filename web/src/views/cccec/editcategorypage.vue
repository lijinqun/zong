<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>
                    商品类别列表
                </p>
                </p>
                <!--搜索框-->
                <div class="sreach">
                    <div class="sreach-page">
                        <!--<div class="sreach-box">
                            <span>级别:</span>
                            <i-input v-model="grade" placeholder="请输入级别..."></i-input>
                        </div>-->
                        <!--<div class="sreach-box"><span>上级名称:</span>
                            <i-input v-model="parname" placeholder="请输入上级名称..."></i-input>
                        </div>-->
                        <!--<div class="sreach-box"><span>名称:</span>
                            <i-input v-model="name" placeholder="请输入名称..."></i-input>
                        </div>
                         <div class="sreach-box">
                         	<div class="sreach-box sreach-box2" style="text-align: right;">
	                            <i-button type="info" icon="ios-search" @click="getTableList(1)">搜索</i-button>
	                            <i-button type="info" icon="" @click="reset">重置</i-button>
	                        </div>
                        </div>-->
                    </div>
                    <div class="sreach-page">
                    	<i-button type="info" icon="" @click="updateLists">保存</i-button>
                    	&nbsp;
                    	<i-button type="info" icon="" @click="visible = true">新增</i-button>
                    	&nbsp;
                    	<i-button type="info" icon="" @click="returnparent">返回</i-button>
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
        <modal title="新增类别" v-model="visible" :loading="loading" @on-ok="insert" :closable="false">
        <div class="informationbox"><span>级别:</span>
        <i-input v-model="insertgrade" placeholder="请输入级别" @on-change="getpar"></i-input>
        </div>
        <br>
        <div class="informationbox"><span>上级名称:</span>
            <i-select v-model="parentId" clearable="" filterable="" id="grade1">
                <i-option v-for="item in parentdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
            </i-select>
            <i-select v-model="parentId" clearable="" filterable="" id="grade2">
                <i-option v-for="item in parentdata" :value="item.id" :key="item.id">{{item['parent.name']}}/{{ item.name }}</i-option>
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
                <span><b>是否上架</b>: </span>
                <div class="ivu-input-wrapper"><i-switch v-model="isOnline" ></i-switch></div>
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
                <span><b>是否上架</b>: </span>
                <div class="ivu-input-wrapper"><i-switch v-model="isOnline2" ></i-switch></div>
        </div>
    	</modal>
    	
    	<modal title="转移类别" v-model="visible3"  @on-ok="updategrade" :closable="false">
        <!--<div class="informationbox"><span>目标级别:</span>
        <i-input v-model="insertgrade3" placeholder="请输入级别" @on-change="getpar2"></i-input>
        </div>
        <br>-->
        <div class="informationbox"><span>目标类别分类上层:</span>
            <i-select v-model="parentId4" v-if="grade3" clearable="" filterable="" >
                <i-option v-for="item in parentdata2" :value="item.id" :key="item.id">{{ item.name }}</i-option>
            </i-select>
            <!--<i-select v-model="parentId4" v-if="grade4" clearable="" filterable="" >
                <i-option v-for="item in parentdata2" :value="item.id" :key="item.id">{{item['parent.name']}}/{{ item.name }}</i-option>
            </i-select>-->
        </div>
    	</modal>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import {
    	updatecategorychi,getcategorylist,updatecategorylist,insertcategorypar,imgurl,delcategoryid,getcategorygrade
    }
        from "./../api/api.js";
    import canEditTable from './components/canEditTable.vue';
	import "../../../static/js/jquery-2.0.0.min.js";
    import Bus from './bus.js';
    export default {
        name: "categorypage",
        components: {
            'can-edit-table': canEditTable
        },
        data() {
        	let self = this
            return {
            	idd:'',
            	parentdata2:[],
            	parentId4:'',
            	grade3:true,
            	grade4:false,
            	insertgrade3:'',
            	visible3:false,
            	returnId:'',
            	parentId3:'',
            	selectedIdList: '',
            	parentdatanull: [],
            	parentdata: [],
            	parentId: '',
            	parentId2: '',
            	insertsort: '',
            	insertsort2: '',
            	isOnline: false,
            	isOnline2: false,
            	insertname: '',
            	insertgrade: '',
            	insertname2: '',
            	insertgrade2: '',
            	loading: false,
            	visible: false,
            	visible2: false,
            	parname: '',
            	name: '',
            	grade: '1',
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
                    align: 'left',
                    render: (h, params) => {
                        return h('div', [h('p', params.row.grade =='1' ? '一级': params.row.grade =='2'? '二级':'三级' )]);
                    }
                }, 
//              {
//                  title: '上级名称',
//                  key: 'parent.name',
//                  width: 100,
//                  align: 'left'
//              },
                {
                    title: '分类名称',
                    key: 'name',
                    align: 'left',
                    editable: true
                }, {
                    title: '图片',
                    key: 'image',
                    align: 'center',
                    render: (h, params) => {
        				return h('div', [
        					h('img', params.row.image!=null?{
                              props: {
                                type: 'primary',
                                size: 'small'
                              },
                              attrs: {
                                src: imgurl+params.row.image, style: 'width:30px;height: 30px;border-radius: 2px;'
                              }
                            }:''),

        				]);
    				}
                }, {
                    title: '排序',
                    key: 'sort',
                    align: 'left',
                    width: 80,
                    editable: true
                }, {
                    title: '设置',
                    key: 'action',
                    width: 260,
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
					            }, '新增下级'),
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
					                    	self.grade = params.row.grade + 1;
					                    	self.parentId3 = params.row.id;
                                            self.grade2 = params.row.grade;
					                    	self.getTableList(1);
					                    	if(self.grade ==2){
					                    		sessionStorage.setItem("parent",self.parentId3);
					                    	}
					                    	if(self.grade==3){
					                    		sessionStorage.setItem("parent2",self.parentId3);
					                    	}
					                    	//self.parentId3 = '';
//					                    	self.visible2 = true;
//					                    	self.parentId2 = params.row.id;
//					                    	self.insertgrade2 = params.row.grade + 1;
//					                    	let argu = { id: params.row.id};
//					                    	console.log(argu)
//                                      util.openNewPage(this, 'editcategorydetails', argu);
//                                      this.$router.push({
//                                          name: 'editcategorydetails',
//                                          params: argu
//                                      });
					                    }
					                }
					            }, '查看下级'),
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
					                    	self.visible3 = true;
					                    	self.idd = params.row.id;
                                          				                    	//self.parentId2 = params.row.id;
					                    	//self.insertgrade2 = params.row.grade + 1;
//					                    	let argu = { id: params.row.id};
//					                    	console.log(argu)
//                                      util.openNewPage(this, 'editcategorydetails', argu);
//                                      this.$router.push({
//                                          name: 'editcategorydetails',
//                                          params: argu
//                                      });
					                    }
					                }
					            }, '转移类别')
					        ]);
					    }
                },{
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
					                    	let argu = { 
                                                id: params.row.id,
                                                grade: params.row.grade,
                                                parentId : params.row.parentId
                                            };
					                    	console.log(argu)
                                        util.openNewPage(this, 'editcategorydetails', argu);
                                        this.$router.push({
                                            name: 'editcategorydetails',
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
				    width: 80,
				    handle: ['delete']
				}],
                ids: "",
                tableData: [],
                selectList: [],
            };
        },
        mounted() {
          
            if(this.$route.params.grade == undefined){
                  this.grade = 1;
            }else{
                this.grade = this.$route.params.grade;
            }
            this.parentId3 = this.$route.params.parent;
            console.log("取值是"+this.grade);
        	$('#grade1').hide();
        	var that = this;
            Bus.$off('selectdelectList');
            Bus.$off('delete');
            getcategorylist(this.pageNumber, this.pagesizes, this.grade, this.name, this.parname,this.parentId3).then(response => {
                console.log(response);
                this.tableData = response.data.list;
                this.pageCount = response.data.totalRow;
                this.totalPages = response.data.totalPage;
                this.pagesizes = response.data.pageSize;
            })
        	this.getpar2();
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
            	delcategoryid(param).then(response => {
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
        	returnparent (){
        		if(this.grade == 1){return;}
        		this.grade = this.grade-1;
        		if(this.grade ==2){
        			 this.parentId3 = sessionStorage.getItem("parent");
        		}else if(this.grade ==3){
        			this.parentId3 = sessionStorage.getItem("parent2");
        		}
				if(this.grade ==1){this.parentId3 = '0';}
				this.getTableList(1);
			//	this.returnId = '';
        	},
        	getpar2(){
//      		if(par == 3){
//      			this.grade3=false;
//      			this.grade4=true;
//      		}else if (par < 3){
//      			this.grade3=true;
//      			this.grade4=false;
//      		}
        			getcategorygrade().then(response => {
                	this.parentdata2= response.data;
           	 })
        	},
        	getpar () {
        		if(!this.insertgrade){return;}
        		let par = this.insertgrade ;
        		if(par == 3){
        			$('#grade1').hide();$('#grade2').show();
        		}else if (par < 3){
        			$('#grade2').hide();$('#grade1').show();
        		}
        			getcategorygrade(par-1).then(response => {
                	this.parentdata = response.data;
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
                    updatecategorylist(param).then(response => {
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
                getcategorylist(val, this.pagesizes, this.grade, this.name, this.parname,this.parentId3,this.returnId).then(response => {
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
            	console.log(this.parentId);
            	if(this.insertgrade&&this.parentId&&this.insertname&&this.insertsort&&this.isOnline){
            		var param = {
						grade : this.insertgrade,
						parentId : this.parentId,
						name : this.insertname,
						isOnline : this.isOnline == true ? 1 : 0 ,
						sort : this.insertsort
            		};
            		insertcategorypar(param).then(response => {
                        if (response.success) {
                            this.$Message.success('新增成功');
                            // 获取当前table页
                            this.getTableList(this.pageNumber);
                             this.insertgrade = '';
                            this.parentId = '';
                            this.insertname = '';
                             this.isOnline = false;
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
            	if(this.insertgrade2&&this.parentId2&&this.insertname2&&this.insertsort2&&this.isOnline2){
            		var param = {
						grade : this.insertgrade2,
						parentId : this.parentId2,
						name : this.insertname2,
						isOnline : this.isOnline2 == true ? 1 : 0 ,
						sort : this.insertsort2
            		};
            		console.log(param);
            		insertcategorypar(param).then(response => {
                        if (response.success) {
                            this.$Message.success('新增成功');
                            // 获取当前table页
                            this.getTableList(this.pageNumber);
                            //this.$refs.currentRowTable.clearCurrentRow();
                            this.insertname2 = '';
                            this.insertsort2 = '';
                            this.isOnline2 = false;
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
            updategrade(){
            	if(this.parentId4){
            		let formdata = new FormData();
//          		if(this.insertgrade3 == '1'){
//          			this.parentId4 = '0';
//          		}
        			formdata.append('id',this.idd);
        			formdata.append('parentId',this.parentId4);
            		updatecategorychi(formdata).then(response => {
                        if (response.success) {
                            this.$Message.success('转移成功');
                            // 获取当前table页
                            this.getTableList(this.pageNumber);
                            //this.$refs.currentRowTable.clearCurrentRow();
                            this.insertgrade3 = '';
                            this.parentId4 = '';
                        } else {
                            this.$Message.error(response.message);
                        }
                    });
            	}else{
            		this.$Modal.error({
                        title: "提示",
                        content: '<p>请选择转移类别</p>'
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
