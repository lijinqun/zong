<template>
    <div>
        <row>
        	<Col span="20">
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>
                    商品列表
                </p>
                <div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box"><span>商品ID:</span>
                            <i-input v-model="id" placeholder="请输入商品ID..."></i-input>
                        </div>
                        <div class="sreach-box"><span>商品名称:</span>
                            <i-input v-model="goodname" placeholder="请输入商品名称..."></i-input>
                        </div>
                        <div class="sreach-box"><span>商品类型:</span>
                            <i-input v-model="typename" placeholder="请输入商品类型..."></i-input>
                        </div>
                    </div>
                    <div class="sreach-page">
                    	<div class="sreach-box"><span>供应商名称:</span>
                            <i-input v-model="suppliername" placeholder="请输入供应商名称..."></i-input>
                        </div>
                    	<div class="sreach-box"><span>是否上架:</span>
                            <i-select v-model="isOnline" clearable="" filterable="">
                                <i-option v-for="item in isonlinedata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                            </i-select>
                        </div>
                        <div class="sreach-box" v-if="merchantid == 0"><span>审核状态:</span>
                            <i-select v-model="status" clearable="" filterable="">
                                <i-option v-for="item in statusdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                            </i-select>
                        </div>
                        <div class="sreach-box"><span>商家:</span>
                            <i-select v-model="merchnatlist"  clearable="" filterable="">
                                <i-option v-for="item in merchantlistdata" :value="item.id" :key="item.id">{{ item.shopName }}</i-option>
                            </i-select>
                        </div>
                        <div class="sreach-box">
                         	<div class="sreach-box sreach-box2" style="text-align: right;">
	                            <i-button type="info" icon="ios-search" @click="getTableLists(1)">搜索</i-button>
	                            <!--<i-button type="info" icon="" @click="updateLists">保存</i-button>
	                            <i-button type="warning" @click="clickexamine()">审核</i-button>
	                            <i-button type="error" @click="del()">删除</i-button>-->
	                        </div>
                        </div>
                    </div>	
                    <div class="sreach-page">
                    	<div class="sreach-box sreach-box2" style="text-align: right;">
	                            <i-button type="info" icon="" @click="updateLists">保存</i-button>
	                            <i-button type="warning" @click="clickexamine()" v-if="merchantid == 0">审核</i-button>
	                            <i-button type="error" @click="del()">删除</i-button>
	                    </div>
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
                            :loading="loading"
                            :columns-list="tableColumns"
                    ></can-edit-table>
                </div>
                <!--<i-table :columns="tableColumns" height="600" :data="tableData" :loading="tableloading"style="width: 100%;"
                         @on-selection-change="selectIds"></i-table>-->
                <!--<Col span="12"></Col>-->   
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" show-elevator="" show-total=""
                          @on-change="getTableLists"></page>
                </div>
            </card>
            </Col>
            <Col span="4" class="">
                <div class="">
                    <Card>
                        <p slot="title">
                            <Icon type="navicon-round"></Icon>
                            分类目录
                        </p>
                        <Tabs type="card">
                            <TabPane label="商品分类目录">
                            	<Spin size="large" fix v-if="spinShow"></Spin>
                                <div style="padding-left: 1.5rem;">
                                    <Tree :data="categorylist"  @on-check-change='updatetable1'  :multiple='false' @on-select-change='updatetable'></Tree>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </Col>
        </row>
        <modal v-model="batchUpdateBox" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请选择</span></p>
            <div>
                <i-select v-model="statusid" clearable="" placeholder="请选择">
                    <i-option v-for="item in statusdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                </i-select>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="upBatchUpdate">确认提交</i-button>
            </div>
        </modal>
    </div>
</template>
<script>
//	import goodslistdatas from './goodslistdatas.js';
	import canEditTable from './components/canEditTable.vue';
    import Bus from './bus.js';
    import util from "@/libs/util";
    import {
        getngoodslist,imgurl,updategoodlistsort,batchauditmerchandise,getcategoryIdsdata,deletegood,getmerchantlist
    }
        from "./../api/api.js";
    export default {
        name: "goodList",
        components: {
            'can-edit-table': canEditTable
        },
        data() {
        	let self = this
            return {
            	spinShow:false,
            	loading:false,
                merchantid:'',
            	parent2catid:'',
            	parent1catid:'',
            	catid:'',
            	categorylist: [],
            	idnochange: '',
            	selectedIdList: '',
            	statusid: '',
            	batchUpdateBox: false,
            	tableloading: false,
                id: "",//商品id
                pageNumber:1,
                goodname: "",//商品名
                typename: "",//商品类型名
                suppliername: "",//供应商名
                isOnline: "",//上架状态
                status: "",//审核状态
                pageCount: 0,
                totalPages: 0,
                pagesizes: 20,
                merchnatlist:'',
                merchantlistdata:[],
                ids: "",
                isonlinedata:[
                    {
                        id:'0',
                        name:"未上架"
                    },
                    {
                        id:'1',
                        name:"上架中"
                    }
                ],
                statusdata:[
                    {
                        id:'0',
                        name:"未审核"
                    },
                    {
                        id:'1',
                        name:"已审核"
                    }
                ],
                tableColumns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },  {
                    title: 'ID',
                    key: 'id',
                    width: 80,
                    align: 'left'
                }, {
                    title: '序号',
                    key: 'sort',
                    align: 'left',
                    width: 80,
                    editable: true
                },{
                    title: '店铺名称',
                    key: 'merchant.shopName',
                    width: 130,
                    align: 'center',
//                    render: (h, params) => {
//                        return h('div', [h('span', params.row["member.nickname"]!=null&&params.row.["member.nickname"]!='null'&&params.row["member.nickname"]!=''?decodeURI(decodeURI(params.row["member.nickname"])):params.row["member.username"])]);
//                    }
                },{
                    title: '商品名称',
                    key: 'name',
                    width: 350,
                    align: 'left'
                }, {
                    title: '商品类型',
                    key: 'type.name',
                    width: 100,
                    align: 'left'
                }, {
                    title: '供应商',
                    key: 'supplier.name',
                    width: 90,
                    align: 'left'
                }, {
                    title: '上架状态',
                    key: 'isOnline',
                    align: 'left',
                    width: 90,
                    render: (h, params) => {
						return h('div', [h('p', params.row.isOnline == 0 ? '未上架' : '上架中')]);
    				}
                }, {
                    title: '审核状态',
                    key: 'status',
                    align: 'left',
                    width: 90,
                    render: (h, params) => {
						return h('div', [h('p', params.row.status == 0 ? '未审核' : params.row.status == 1 ? '已审核' : '注销')]);
    				}
                }, {
                    title: '更新时间',
                    key: 'updatedTime',
                    width: 150,
                    align: 'left'
                }, {
                    title: '图片',
                    key: 'indexImage',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
        				return h('div', [
        					h('img', params.row.indexImage!=null?{
                              props: {
                                type: 'primary',
                                size: 'small'
                              },
                              attrs: {
                                src: imgurl+params.row.indexImage, style: 'width:30px;height: 30px;border-radius: 2px;'
                              }
                            }:''),

        				]);
    				}
                }, {
                    title: '详情',
                    key: 'action',
                    width: 120,
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
                                        util.openNewPage(this, 'gooddetails', argu);
                                        this.$router.push({
                                            name: 'gooddetails',
                                            params: argu
                                        });
					                    }
					                }
					            }, '详情')
					        ]);
					    }
                }],
                tableData: []
            };
        },
        mounted() {
        	var that = this;
        	Bus.$off('selectdelectList');
        	Bus.$off('nochangeidList');
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
            
            Bus.$on('nochangeidList', function (idnochange) {
                // 1为有选项，2为无选项
                that.idnochange = idnochange;
            });
            this.getmerchants();
        },
        created() {
        	this.loading = true;
            getngoodslist().then(response => {
                console.log(response);

                this.tableData = response.data.list;
                this.merchantid = this.tableData[0].merchantId;
                this.pageCount = response.data.totalRow;
                this.totalPages = response.data.totalPage;
                this.pagesizes = response.data.pageSize;
                this.loading = false;
            })
            this.spinShow = true;
            getcategoryIdsdata().then(response => {
						this.categorylist = response.data;
						this.spinShow = false;
				           });
        },
        watch: {
        	'$route'(to, from) {
		        if (to.name == 'goodslist') {
		        	this.getTableLists(this.pageNumber);
		           }
		        }    
        },
        methods: {
        	del(){
        		var zhethis=this;
                deletegood(this.selectedIdList,'1').then(response => {
                    if(response.code=="200"){
                        zhethis.$Modal.success({
                            title: '温馨提示',
                            content: '<p>删除成功</p>'
                        });
                        zhethis.getTableLists(zhethis.pageNumber);
                    }else{
                        zhethis.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                    }
                })
        	},
        	updatetable(val){
        		console.log(val);
        		if(val != ''){
        			let grade = val[0].grade;
        			if(grade == '2'){
        				this.parent2catid = val[0].id;
        				this.parent1catid = '';
        				this.catid = '';
        			}else if(grade == '1'){
        				this.parent1catid = val[0].id;
        				this.parent2catid = '';
        				this.catid = '';
        			}else{
        				this.catid = val[0].id;
        				this.parent1catid = '';
        				this.parent2catid = '';
        			}
        		}else{
        			this.catid = '';
        			this.parent1catid = '';
        			this.parent2catid = '';
        		}
        		console.log(this.catid);
        		this.getTableLists(1);
        	},
        	updatetable1(val){
        		console.log(val);
        	},
        	updateLists(){
        		if (this.selectedIdList !== null && this.selectedIdList !== undefined && this.selectedIdList !== '') {
                    var list = this.selectedIdList.split(',');
//                  if(list.length>1){
//                  	this.$Message.error('请选择一项');return;
//                  }
                    var param = {};
                    var data = [];
                    for (let i of list) {
                        for (let row of this.$store.state.goods.cacheGoodsTable) {
                            if (row.id == i) {
                                data.push({
                                    id: row.id,
                                    sort: row.sort,
                                    status: row.status
                                });
                            }
                        }
                    }
//					let dataid = '';
//					let datasort = '';
//                      for (let row of this.$store.state.goods.cacheGoodsTable) {
//                          if (row.id == this.selectedIdList) {
//                                  dataid = row.id;
//                                  datasort =  row.sort;
//                          }
//                      }
					console.log(JSON.stringify(data));
                    param.batchUpdateColumnsList = data;
                    updategoodlistsort(param).then(response => {
                        if (response.success) {
                            this.$Message.success('修改成功');
                            // 获取当前table页
                            this.getTableLists(this.pageNumber);
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
        	upBatchUpdate(){
                var zhethis=this;
                batchauditmerchandise(this.selectedIdList,this.statusid).then(response => {
                    if(response.code=="200"){
                        zhethis.$Modal.success({
                            title: '温馨提示',
                            content: '<p>修改成功</p>'
                        });
                        zhethis.getTableLists(zhethis.pageNumber);
                        //zhethis.ids="";
                        zhethis.batchUpdateBox=false;
                    }else{
                        zhethis.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                        //zhethis.getBalance(zhethis.pageNumber);
                        //zhethis.ids="";
                        zhethis.batchUpdateBox=false;
                    }
                })
            },
        	clickexamine(){
                if(this.selectedIdList==""){
                    this.$Notice.warning({
                        title: '请选择需要审核的用户',
                        desc: true ? '' : '请选择需要审核的用户 '
                    });
                }else{
                    this.batchUpdateBox=true;
                }
            },
            getTableLists(val) {
                this.loading = true;
                setTimeout(() => {
                	getngoodslist(val, this.pagesizes, this.goodname, this.id, this.typename, this.suppliername, this.isOnline, this.status,this.catid,this.parent2catid,this.parent1catid, this.merchnatlist).then(response => {
                    console.log(response);
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    this.loading = false;
                });
            }, 500);
               
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
            getmerchants() {
                //console.log('getmerchants.....');
                getmerchantlist().then(response => {
                    this.merchantlistdata=response.data;
                });
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
