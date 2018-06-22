<template>
    <div>
        <row>
            <card>
                <p slot="title"><Icon type="ios-list"></Icon>
                    <span>{{pageTitle}}</span>
                </p>
                <div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box">
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
                <i-table :columns="tableColumns" :data="tableData" style="width: 100%;" ></i-table>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" show-elevator="" show-total="" @on-change="getpeopleList"></page>
                </div>
            </card>
        </row>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import {
        getuser,bindingoperNo,getrolelist,saveoperator,saveoperatorrole,getgoodsupplier,getareapartner,getcoinpage
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
                    title: 'Id',
                    key: 'id',
                    align: 'center'
                },
                {
                    title: '金额',
                    key: 'amount',
                    align: 'center'
                },{
                    title: '时间',
                    key: 'recordTime',
                    align: 'center'
                },
                ],
                levelTypelist: [{
                    id: 1,
                    name:'省',
                },
                {
                    id: 2,
                    name:'市'
                },
                {
                    id: 3,
                    name:'区'
                }],
                tableData: [],
                saveuserBox:false,
                saveusername:'',
                saveuserNo:'',
                saveuserpw:'',
                savemobile:'',
                roleName:[],
                roledata:[],
                bingdingrole:false,
                levelType:'',
                supplierIdlist:[],
                province:'',
                provincelist:[],
                provinceable: true,
                city:'',
                citylist:[],
                cityable: true,
                town:'',
                townlist:[],
                townable: true,
                coinType: this.$route.query.coinType,
                pageTitle: '珠宝列表',
            };
        },
        mounted() {
            if (sessionStorage.getItem("peoplelists")) {
                this.list = JSON.parse(sessionStorage.getItem("peoplelists"));
                this.pageCount = Number(sessionStorage.getItem("peoplepageCounts"));
                this.linebox = Number(sessionStorage.getItem("peoplelineboxs"));
                this.pageSizes = this.linebox;
                this.totalPages = Number(sessionStorage.getItem("peopletotalPages"));
                //this.supplierId4.disabledvalue = false;
            }
            if (sessionStorage.getItem("usernames")) {
                this.usernames = sessionStorage.getItem("usernames");
            }
        },
        created() {
            this.init();
            //this.getrole();
            //this.getsupplier();
            //this.getpeopleList();
        },
        beforeRouteEnter (to,from,next){
            next ( vm => {
                //vm.getsupplier();
            })
        },
        watch: {
            // '$route' () {
            //     this.init();
            // }
        },
        methods: {
            init(){
                var memberId = this.$route.query.id;
                var coinType = this.$route.query.coinType;
                console.log('coinType:' + this.coinType);
                if (this.coinType == 1) {
                    this.pageTitle = '收益珠宝列表';
                } else {
                    this.pageTitle = '消费珠宝列表';
                }
                getcoinpage(null, null, memberId, coinType).then(response => {
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
                var memberId = this.$route.query.id;
                var coinType = this.$route.query.coinType;
                getcoinpage(val, this.pagesizes, memberId, coinType).then(response => {
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
</style>