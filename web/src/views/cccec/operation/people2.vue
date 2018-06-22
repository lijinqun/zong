<template>
    <div>
        <row>
            <card>
                <p slot="title"><Icon type="ios-list"></Icon>
                    <span>用户</span>
                </p>
                <div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box"><span>昵称:</span>
                            <i-input v-model="usernames" placeholder="请输入推荐人..."></i-input>
                        </div>
                         <div class="sreach-box">
                         	<div class="sreach-box sreach-box2" style="text-align: right;">
	                            <i-button type="info" icon="ios-search" @click="getpeopleList(1)">搜索</i-button>
                                <i-button type="warning" v-if="bingdingid" @click="bindinguserbtn()">绑定用户</i-button>
                                <i-button type="warning" v-if="bingdingid==null" @click="saveuserbtn()">新增用户</i-button>
                                <i-button type="warning" v-if="bingdingid==null" @click="saverolebtn()">绑定权限</i-button>
	                        </div>
                        </div>
                        <div class="sreach-box linenumcss">
                            <p>总共 <span>{{pageCount}}</span> 条记录</p>
                            <p>共 <span>{{totalPages}}</span> 页</p>
                            <p>每页
                                <i-input v-model="pagesizes" number="" style="width:45px;" placeholder=""></i-input> 条</p>
                        </div>
                    </div>
                    <div class="sreach-page">
                    </div>
                </div>
                <i-table :columns="tableColumns" :data="tableData" style="width: 100%;" @on-selection-change="selectIds"></i-table>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" show-elevator="" show-total="" @on-change="getpeopleList"></page>
                </div>
            </card>
        </row>
        <modal v-model="saveuserBox" width="450">
            <p slot="header" style="text-align:center">
                <span>新增用户</span>
            </p>
            <div class="flexbox">
                <div class="flex1 headertxt">用户名：</div>
                <div class='flex5'>
                    <i-input v-model="saveusername" placeholder="请输入"></i-input>
                </div>
            </div>
            <div class="flexbox">
                <div class="flex1 headertxt">帐号：</div>
                <div class='flex5'>
                    <i-input v-model="saveuserNo" placeholder="请输入"></i-input>
                </div>
            </div>
            <div class="flexbox">
                <div class="flex1 headertxt">密码：</div>
                <div class='flex5'>
                    <i-input v-model="saveuserpw" placeholder="请输入"></i-input>
                </div>
            </div>
            
                    
            <!-- <div class="flexbox">
                <div class="flex1 headertxt">权限：</div>
                <div class='flex5'>
                    <i-select v-model="roleName" clearable="" placeholder="请选择">
                        <i-option v-for="item in roledata" :value="item.name" :key="item.name">{{ item.cnName }}</i-option>
                    </i-select>
                </div>
            </div> -->
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="saveuser()">确认提交</i-button>
            </div>
        </modal>
        <modal v-model="bingdingrole" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请选择</span></p>
            <div>
                <i-select v-model="roleName" multiple clearable="" placeholder="请选择">
                    <i-option v-for="item in roledata" :value="item.name" :key="item.name">{{ item.cnName }}</i-option>
                </i-select>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="roleUpdate()">确认提交</i-button>
            </div>
        </modal>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import {
        getuser,bindingoperNo,getrolelist,saveoperator,saveoperatorrole
    }
    from "../../api/api.js";
    export default {
        name: "extension",
        props: ['bingdingid'],
        data() {
            return {
                usernames: "",
                pageCount: 0,
                totalPages: 0,
                pagesizes: 20,
                pageNumber:1,
                choiceid: 0,
                ids: "",
                tableColumns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户名',
                    key: 'operName',
                    align: 'center'
                },{
                    title: '帐号',
                    key: 'operNo',
                    align: 'center'
                },
                {
                    title: '权限',
                    key: 'cnNames',
                    align: 'center'
                },
                
                ],
                tableData: [],
                saveuserBox:false,
                saveusername:'',
                saveuserNo:'',
                saveuserpw:'',
                roleName:[],
                roledata:[],
                bingdingrole:false,
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
            this.getrole();
        },
        watch: {
            // '$route' () {
            //     this.init();
            // }
        },
        methods: {
            init(){
                getuser().then(response => {
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                })
            },
            getpeopleList(val) {
                this.loading = true;
                console.log(this.usernames)
                var sorts = "";
                getuser(val, this.pagesizes,this.usernames).then(response => {
                    console.log(response);
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
            bindinguserbtn(){
                console.log(this.bingdingid)
                this.loading = true
                if(this.bingdingid){
                    bindingoperNo(this.bingdingid,this.ids).then(response => {
                        this.loading = false;
                        if(response.code=='200'){
                            this.$Modal.success({
                                title: "温馨提示",
                                content: '绑定成功',
                            });
                            setTimeout(function(zhege){
                                zhege.$emit('clickuser', false)
                            },1000,this)
                        }else{
                            this.$Modal.error({
                                title: "温馨提示",
                                content: response.message
                            });
                        }
                        
                    })
                }
            },
            getrole(){
                getrolelist().then(response => {
                    this.roledata=response.data;  
                })
            },
            saveuserbtn(){
                this.saveuserBox=true;
            },
            saveuser(){
                let params={};
                params.operName=this.saveusername;
                params.operNo=this.saveuserNo;
                params.password=this.saveuserpw;
                // params.roleName=this.roleName;
                saveoperator(params).then(response => {
                    if(response.code=='200'){
                        this.$Modal.success({
                            title: "温馨提示",
                            content: '新增成功',
                        });
                    }else{
                        this.$Modal.error({
                            title: "温馨提示",
                            content: response.message
                        });
                    }
                    this.saveuserBox=false;
                    this.getpeopleList(this.pageNumber)
                })
            },
            saverolebtn(){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要绑定的用户',
                        desc: true ? '' : '请选择需要绑定的用户 '
                    });
                }else{
                    this.bingdingrole=true;
                }
                
            },
            roleUpdate(){
                if(this.roleName){
                    let params={};
                    params.operNo=this.ids;
                    params.roleNames=(this.roleName).join(',');
                    saveoperatorrole(params).then(response => {
                        if(response.code=='200'){
                            this.$Modal.success({
                                title: "温馨提示",
                                content: '绑定成功',
                            });
                        }else{
                            this.$Modal.error({
                                title: "温馨提示",
                                content: response.message
                            });
                        }
                        this.getpeopleList(this.pageNumber)
                        this.bingdingrole=false;
                    })
                }
            },
             selectIds(selection) {
                selection.forEach((item, index) => {
                    if (index == 0) {
                        this.ids = item.operNo;
                    } else {
                        this.ids = this.operNo + ',' + item.operNo;
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
    .disinline width80{
        display: inline-block;
    }
    .width80{
        width: 80%;
    } 
    .flexbox{
        display: flex;
        margin-bottom: 10px;
        > .flex1 {
            flex: 1;
        }
        > .flex2 {
            flex: 2;
        }
        > .flex3{
            flex: 3;
        }
        > .flex4{
            flex: 4;
        }
        > .flex5{
            flex: 5;
        }
        >.headertxt{
            text-align: center;
            line-height: 30px;
        }
    }
</style>