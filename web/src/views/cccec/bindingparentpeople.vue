<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>人员管理</p>
                <div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box"><span>用户编号:</span>
                            <i-input v-model="peoplememberNo" placeholder="请输入用户昵称..."></i-input>
                        </div>
                        <div class="sreach-box"><span>用户昵称:</span>
                            <i-input v-model="parentName" placeholder="请输入用户上级昵称..."></i-input>
                        </div>
                         <div class="sreach-box">
                            
                        </div>
                    </div>
                    <div class="sreach-page">
                        <div class="sreach-box">
                            <div class="sreach-box sreach-box2" style="text-align: right;">
                                <i-button type="info" icon="ios-search" @click="getBusinessPlanList(1)">搜索</i-button>
                            </div>
                            <div class="sreach-box sreach-box2" style="margin-left: 1rem;">
                                <i-button type="warning" @click="gobindingparent()">绑定父级人员</i-button>
                            </div>
                        </div>
                        <div class="sreach-box linenumcss">
                            <p>总共 <span>{{pageCount>0?pageCount:0}}</span> 条记录</p>
                            <p>共 <span>{{totalPages}}</span> 页</p>
                            <p>每页
                                <i-input v-model="pagesizes" number="" style="width:45px;" placeholder=""></i-input> 条</p>
                        </div>
                    </div>
                </div>
                <i-table :columns="tableColumns" :data="tableData" style="width: 100%;" @on-selection-change="selectIds"></i-table>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount>0?pageCount:0" :page-size="pagesizes" show-elevator="" show-total="" @on-change="getBusinessPlanList"></page>
                </div>
            </card>
        </row>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import {
        getpeoplemember,updateparentpeople
    }
    from "./../api/api.js";
    export default {
        name: "extension",
        data() {
            return {
                peoplememberNo: "",
                parentName: "",
                pageCount: 0,
                totalPages: 0,
                pagesizes: 20,
                choiceid: 0,
                ids: "",
                tableColumns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '用户编号',
                    key: 'memberNo',
                    align: 'center'
                }, {
                    title: '用户昵称',
                    key: 'username',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [h('span', params.row.nickname!=null&&params.row.nickname!='null'&&params.row.nickname!=''?decodeURI(decodeURI(params.row.nickname)):params.row.username)]);
                    }
                } 
                
	            ],
                tableData: []
            };
        },
        mounted() {
            // if (sessionStorage.getItem("peoplelists")) {
            //     this.list = JSON.parse(sessionStorage.getItem("peoplelists"));
            //     this.pageCount = Number(sessionStorage.getItem("peoplepageCounts"));
            //     this.linebox = Number(sessionStorage.getItem("peoplelineboxs"));
            //     this.pageSizes = this.linebox;
            //     this.totalPages = Number(sessionStorage.getItem("peopletotalPages"));
            // }
            // if (sessionStorage.getItem("peoplememberNo")) {
            //     this.peoplememberNo = sessionStorage.getItem("peoplememberNo");
            // }
            // if (sessionStorage.getItem("parentName")) {
            //     this.parentName = sessionStorage.getItem("parentName");
            // }
        },
        created() {
            getpeoplemember().then(response => {
                console.log(response);
                this.tableData = response.data.list;
                this.pageCount = response.data.totalRow;
                this.totalPages = response.data.totalPage;
                this.pagesizes = response.data.pageSize;
            })
        },
         watch: {
            '$route' () {
                this.getBusinessPlanList();
            }
        },
        methods: {
            getBusinessPlanList(val) {
                this.loading = true;
                var sorts = "";
                getpeoplemember(val, this.pagesizes, sorts, this.parentName, this.peoplememberNo).then(response => {
                    console.log(response);
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    sessionStorage.removeItem("peoplelists");
                    sessionStorage.removeItem("peoplepageCounts");
                    sessionStorage.removeItem("peoplememberNo");
                    sessionStorage.removeItem("parentName");
                    sessionStorage.removeItem("peoplelineboxs");
                    sessionStorage.removeItem("peopletotalPages");
                    var listjson = JSON.stringify(response.data.list);
                    sessionStorage.setItem("peoplelists", listjson);
                    sessionStorage.setItem("peoplelineboxs", this.pagesizes);
                    sessionStorage.setItem("peopletotalPages", this.totalPages);
                    sessionStorage.setItem("peoplepageCounts", response.data.totalRow);
                    if (this.peoplememberNo) {
                        sessionStorage.setItem("peoplememberNo", this.peoplememberNo);
                    }
                    if (this.parentName) {
                        sessionStorage.setItem("parentName", this.parentName);
                    }
                    this.loading = false;
                })
            },
            gobindingparent(){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要绑定的用户',
                        desc: true ? '' : '请选择需要绑定的用户 '
                    });
                }else{
                    this.loading = true;
                    var zhethis=this;
                    updateparentpeople(this.$route.params.id,this.ids).then(response => {
                        this.loading = false;
                        zhethis.$Message.success({
                            content: '绑定成功',
                            duration: 1,
                            closable: true
                        });
                        setTimeout(function(zhege){
                            let argu = {};
                            util.openNewPage(zhege, 'peoplelist', argu);
                            zhege.$router.push({
                                name: 'peoplelist',
                                params: argu
                            });
                            zhege.$store.commit('removeTag', 'bindingparentpeople');
                            zhege.$store.commit('closePage', 'bindingparentpeople');
                            localStorage.pageOpenedList = JSON.stringify(zhege.$store.state.pageOpenedList);
                            if (zhege.currentPageName === 'bindingparentpeople') {
                                let lastPageName = '';
                                if (zhege.$store.state.pageOpenedList.length > 1) {
                                    lastPageName = zhege.$store.state.pageOpenedList[1].name;
                                } else {
                                    lastPageName = zhege.$store.state.pageOpenedList[0].name;
                                }
                                zhege.$router.push({
                                    name: 'peoplelist'
                                });
                            }
                        },1000,this)
                        
                    })
                }
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
</style>