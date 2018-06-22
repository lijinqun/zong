<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>图片管理</p>
                <div class="sreach">
                    <div class="sreach-page">
                        <!-- <div class="sreach-box"><span>用户昵称:</span>
                            <i-input v-model="peoplename" placeholder="请输入用户昵称..."></i-input>
                        </div>
                        <div class="sreach-box"><span>用户编号:</span>
                            <i-input v-model="peoplemember" placeholder="请输入用户编号..."></i-input>
                        </div>
                        <div class="sreach-box"><span>父级昵称:</span>
                            <i-input v-model="parentpeoplename" placeholder="请输入用户昵称..."></i-input>
                        </div>
                        <div class="sreach-box"><span>用户类型:</span>
                            <i-select v-model="memberType" clearable="" filterable="">
                                <i-option v-for="item in memberTypedata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                            </i-select>
                        </div> -->
                    </div>
                    <div class="sreach-page">
                        <!-- <div class="sreach-box box2flex3">
                            <div class="sreach-box sreach-box2" style="text-align: right;">
                                <i-button type="info" icon="ios-search" @click="getpeoplememberList(1)">搜索</i-button>
                            </div>
                            <div class="sreach-box sreach-box2 " style="margin-left: 1rem;">
                                <i-button type="warning" @click="peopleczBox(1)">充值余额</i-button>
                                <i-button type="warning" @click="peopleczBox(2)">充值积分</i-button>
                                <i-button type="warning" @click="updatepeopletype()">修改用户类型</i-button>
                                <i-button type="warning" @click="gobdparentpeople()">修改父级人员</i-button>
                                <i-button type="warning" @click="updatepeoplenumber()">修改用户编号</i-button>
                            </div>
                        </div> -->
                        <!-- <div class="sreach-box linenumcss">
                            <p>总共 <span>{{pageCount>0?pageCount:0}}</span> 条记录</p>
                            <p>共 <span>{{totalPages}}</span> 页</p>
                            <p>每页 <i-input v-model="pagesizes" number="" style="width:45px;" placeholder=""></i-input> 条</p>
                        </div> -->
                    </div>
                </div>
                <i-table :columns="tableColumns" :data="tableData" style="width: 100%;" @on-selection-change="selectIds"></i-table>
                <!-- <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount>0?pageCount:0" :page-size="pagesizes" show-elevator="" show-total="" @on-change="getpeoplememberList"></page>
                </div> -->
            </card>
        </row>
        <modal v-model="peoplecz" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请输入需要充值的数目</span></p>
            <div>
                <i-input v-model="peoplecznum" Number placeholder="请输入..."></i-input>
            </div>
            <div class="peopleczdatacss">
                <p v-if='focusState==true' class="redtxtts">请输入正确的数目</p>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="clickrefund()">确认提交</i-button>
            </div>
        </modal>
        <modal v-model="peoplenumberxg" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请输入需要充值的数目</span></p>
            <div>
                <i-input v-model="updatapeoplenumber" Number placeholder="请输入..."></i-input>
            </div>
            <!-- <div class="peopleczdatacss">
                <p v-if='focusState==true' class="redtxtts">请输入正确的数目</p>
            </div> -->
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="clickeoplenumber()">确认提交</i-button>
            </div>
        </modal>
        <modal v-model="peopletypeUpdateBox" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请选择</span></p>
            <div>
                <i-select v-model="peopletype" clearable="" placeholder="请选择">
                    <i-option v-for="item in peopletypedata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
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
        getpeoplemember,updatepeoplelist,updatpeoplememberid
    }
    from "./../api/api.js";
    export default {
        name: "extension",
        data() {
            return {

                peoplecz:false,
                peoplecznum:'',
                peoplecznumtype:0,
                balancenumarray:'',
                pointnumarray:'',
                focusState:'',
                memberType:'',
                memberTypedata:[
                    {
                        id:"1",
                        name:"普通会员"
                    },
                    {
                        id:"2",
                        name:"店长"
                    },
                    {
                        id:"3",
                        name:"商家"
                    }
                ],
                peopletypeUpdateBox:false,
                peopletype:'',
                peopletypedata:[
                    {
                        id:"1",
                        name:"普通会员"
                    },
                    {
                        id:"2",
                        name:"店长"
                    },
                    {
                        id:"3",
                        name:"商家"
                    }
                ],
                peoplenumberxg:false,
                updatapeoplenumber:'',


                peoplename: "",
                peoplemember: "",
                parentpeoplename:'',
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
                    title: 'id',
                    key: 'id',
                    width: 60,
                    align: 'center'
                },  {
                    title: '类型',
                    key: 'type',
                    // width: 110,
                    align: 'center'
                }, 
                //  {
                //     title: '数量',
                //     key: 'number',
                //     // width: 68,
                //     align: 'center',
                // },
                {
                    title: '操作',
                    // width:180,
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
                                        let argu = { id: params.row.id };
                                        util.openNewPage(this, 'setupinformation', argu);
                                        this.$router.push({
                                            name: 'setupinformation',
                                            params: argu
                                        });
                                    }
                                }
                         },'详情')
                        ])
                    }
                }
                
	            ],
                tableData: [
                    {
                        id:'1',
                        type:'滚动图',
                        number:'5'
                    },
                    {
                        id:'2',
                        type:'广告图',
                        number:'5'
                    },
                    {
                        id:'3',
                        type:'热卖图',
                        number:'5'
                    }
                ]
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
            // if (sessionStorage.getItem("peoplename")) {
            //     this.peoplename = sessionStorage.getItem("peoplename");
            // }
            // if (sessionStorage.getItem("peoplemember")) {
            //     this.peoplemember = sessionStorage.getItem("peoplemember");
            // }
            // if (sessionStorage.getItem("parentpeoplename")) {
            //     this.parentpeoplename = sessionStorage.getItem("parentpeoplename");
            // }
            // if (sessionStorage.getItem("peoplememberType")) {
            //     this.memberType = sessionStorage.getItem("peoplememberType");
            // }
            // if (sessionStorage.getItem("peoplelists")) {
            //     this.pageCount = Number(sessionStorage.getItem("peoplepageCounts"));
            //     this.linebox = Number(sessionStorage.getItem("peoplelineboxs"));
            //     this.pageSizes = this.linebox;
            //     this.totalPages = Number(sessionStorage.getItem("peopletotalPages"));
            //     this.getpeoplememberList(this.pageNumber,this.pageSizes);
            // }else{
            //     var zhethis=this;
            //     this.tableloading = true;
            //     getpeoplemember().then(response => {
            //         console.log(response);
            //         this.tableData = response.data.list;
            //         this.pageCount = response.data.totalRow;
            //         this.totalPages = response.data.totalPage;
            //         this.pagesizes = response.data.pageSize;
            //         this.tableloading = false;
            //     })
            // }
        },
        created() {
            // getpeoplemember().then(response => {
            //     console.log(response);
            //     this.tableData = response.data;
            //     // this.pageCount = response.data.totalRow;
            //     this.pageCount = response.data.length;
            //     this.totalPages = response.data.totalPage;
            //     this.pagesizes = response.data.pageSize;
            // })
        },
         watch: {
            '$route' () {
                // this.getpeoplememberList();
            }
        },
        methods: {
            getpeoplememberList(val) {
                this.loading = true;
                var sorts = "";
                getpeoplemember(val, this.pagesizes, sorts, this.peoplename, this.peoplemember, this.memberType,this.parentpeoplename,this.$route.params.id).then(response => {
                    console.log(response);
                    this.tableData = response.data.list;;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    sessionStorage.removeItem("peoplelists");
                    sessionStorage.removeItem("peoplepageCounts");
                    sessionStorage.removeItem("peoplename");
                    sessionStorage.removeItem("peoplemember");
                    sessionStorage.removeItem("parentpeoplename");
                    sessionStorage.removeItem("peoplelineboxs");
                    sessionStorage.removeItem("peopletotalPages");
                    var listjson = JSON.stringify(response.data);
                    sessionStorage.setItem("peoplelists", listjson);
                    sessionStorage.setItem("peoplelineboxs", this.pagesizes);
                    sessionStorage.setItem("peoplememberType", this.memberType);
                    sessionStorage.setItem("peopletotalPages", this.totalPages);
                    sessionStorage.setItem("peoplepageCounts", response.data.totalRow);
                    if (this.peoplename) {
                        sessionStorage.setItem("peoplename", this.peoplename);
                    }
                    if (this.peoplemember) {
                        sessionStorage.setItem("peoplemember", this.peoplemember);
                    }
                    if (this.parentpeoplename) {
                        sessionStorage.setItem("parentpeoplename", this.parentpeoplename);
                    }
                    this.loading = false;
                })
            },
            peopleczBox(datatype){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要充值的用户',
                        desc: true ? '' : '请选择需要充值的用户 '
                    });
                }else{
                    let argu = { id: this.ids };
                    this.peoplecz=true;
                    this.peoplecznumtype=datatype;
                }
            },
            clickrefund(){
                if(this.peoplecznum!=""&&this.peoplecznum!=" "&&this.peoplecznum!=null&&this.peoplecznum!=undefined){
                    let balancenum='';
                    let pointnum='';
                    if(this.peoplecznumtype==1){
                        var patrn=/^[0-9]+(\d{0,20})+(\.\d{1,2})?$/;
                        if (!patrn.exec(this.peoplecznum)){
                            this.peoplecznum='';
                            this.focusState = true;
                            return
                        }
                        balancenum=parseFloat(this.balancenumarray) + parseFloat(this.peoplecznum);
                    }
                    if(this.peoplecznumtype==2){
                        var patrn=/^[0-9]+(\d{0,20})+(\.\d{1,2})?$/;
                        if (!patrn.exec(this.peoplecznum)){
                            this.peoplecznum='';
                            this.focusState = true;
                            return
                        }
                        pointnum=parseFloat(this.pointnumarray) + parseFloat(this.peoplecznum);
                        pointnum=parseFloat(pointnum).toFixed(3);
                    }

                    updatepeoplelist(this.ids,balancenum,pointnum).then(response => {
                        console.log(response);
                        if (response.success) {
                            this.$Message.success("提交成功");
                            this.getpeoplememberList(this.pageNumber,this.pageSizes);
                            this.ids='';
                        } else {
                            this.$Message.error(response.message);
                        }
                        this.peoplecz = false;
                        this.focusState = false;
                        this.peoplecznum="";
                        })
                }
                
             },
             updatepeopletype(datatype){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要修改的用户',
                        desc: true ? '' : '请选择需要修改的用户 '
                    });
                }else{
                    let argu = { id: this.ids };
                    this.peopletypeUpdateBox=true;
                }
            },
            upBatchUpdate() {
                updatepeoplelist(this.ids,'','', this.peopletype).then(response => {
                    if (response.success) {
                        this.$Message.success("修改成功");
                        this.getpeoplememberList(this.pageNumber,this.pageSizes);
                    } else {
                        this.$Message.error("修改失败");
                    }
                    this.peopletypeUpdateBox = false;
                })
            },
            gobdparentpeople(){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要修改的用户',
                        desc: true ? '' : '请选择需要修改的用户 '
                    });
                }else{
                    let argu = { id: this.ids };
                    util.openNewPage(this, 'bindingparentpeople', argu);
                    this.$router.push({
                        name: 'bindingparentpeople',
                        params: argu
                    });
                    this.ids='';
                }
                
            },
            updatepeoplenumber(){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要修改的用户',
                        desc: true ? '' : '请选择需要修改的用户 '
                    });
                }else{
                    let argu = { id: this.ids };
                    this.peoplenumberxg=true;
                }
            },
            clickeoplenumber(){
                if(this.updatapeoplenumber!=""&&this.updatapeoplenumber!=" "&&this.updatapeoplenumber!=null&&this.updatapeoplenumber!=undefined){
                    updatpeoplememberid(this.ids,this.updatapeoplenumber).then(response => {
                        console.log(response);
                        if (response.success) {
                            this.$Message.success("提交成功");
                            this.getpeoplememberList(this.pageNumber,this.pageSizes);
                            this.ids='';
                        } else {
                            this.$Message.error(response.message);
                        }
                        this.peoplenumberxg = false;
                        this.updatapeoplenumber="";
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
                    this.balancenumarray=item.balance==null?'0':item.balance;
                    this.pointnumarray=item.point==null?'0':item.point;
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
            > .box2flex3 {
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

    .peopleczdatacss{
        .redtxtts{
            color: #ff0000;
            padding-top: 5px;
        }
    }
    
</style>