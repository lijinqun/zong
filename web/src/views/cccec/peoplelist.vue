<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>人员管理</p>
                <div class="sreach">
                    <div class="sreach-page">
                        <div class="sreach-box"><span>用户昵称:</span>
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
                        </div>
                    </div>
                    <div class="sreach-page">
                        <div class="sreach-box box2flex3">
                            <div class="sreach-box sreach-box2" style="text-align: right;">
                                <i-button type="info" icon="ios-search" @click="getpeoplememberList(1)">搜索</i-button>
                            </div>
                            <div class="sreach-box sreach-box2 " style="margin-left: 1rem;">
                                <i-button type="warning" @click="peopleczBox(1)">充值余额</i-button>
                                <i-button type="warning" @click="peopleczBox(2)">充值积分</i-button>
                                <i-button type="warning" @click="updatepeopletype()">修改用户类型</i-button>
                                <i-button type="warning" @click="gobdparentpeople()">修改父级人员</i-button>
                                <i-button type="warning" @click="updatepeoplenumber()">修改用户编号</i-button>
                                <i-button type="warning" @click="updatemaxBuyPoint()">修改购买限制</i-button>
                            </div>
                        </div>
                        <div class="sreach-box linenumcss">
                            <p>总共 <span>{{pageCount>0?pageCount:0}}</span> 条记录</p>
                            <p>共 <span>{{totalPages}}</span> 页</p>
                            <p>每页 <i-input v-model="pagesizes" number="" style="width:45px;" placeholder=""></i-input> 条</p>
                        </div>
                    </div>
                </div>
                <i-table :columns="tableColumns" :data="tableData" style="width: 100%;" @on-selection-change="selectIds"></i-table>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount>0?pageCount:0" :page-size="pagesizes" show-elevator="" show-total="" @on-change="getpeoplememberList"></page>
                </div>
            </card>
        </row>
        <modal v-model="peoplecz" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请输入需要充值的数目</span></p>
            <div>
                <span><b>当前<span>{{updatetype}}</span>为</b>: &nbsp; {{money}}</span>
            </div>
            <br>
            <div>
                <span>您现在为&nbsp;<b style="color: red;">{{addname}}</b>&nbsp;用户充值<span style="color: red;">&nbsp;<b>{{updatetype}}</b>&nbsp;</span>：</span>
            </div>
            <br>
            <div>
                <i-input v-model="peoplecznum" Number placeholder="请输入..."></i-input>
            </div>
            <div class="peopleczdatacss">
                <p v-if='focusState==true' class="redtxtts">请输入正确的数目</p>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="clickrefund()" :disabled="refundBtn">确认提交</i-button>
            </div>
        </modal>
        <modal v-model="maxbuy" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请输入需要修改的购买限制</span></p>
            <div>
                <span><b>当前用户的购买限制为</b>: &nbsp; {{maxbuynumber}}</span>
            </div>
            <br>
            <div>
                <span>您现在为&nbsp;<b style="color: red;">{{addname}}</b>&nbsp;用户修改&nbsp;<span style="color: red;"><b>购买限制</b></span>&nbsp;：</span>
            </div>
            <br>
            <div>
                <i-input v-model="maxbuyupdatenum" Number placeholder="请输入..."></i-input>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="clickmaxbuy()">确认提交</i-button>
            </div>
        </modal>
        <modal v-model="peoplenumberxg" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请输入需要修改的用户</span></p>
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
        getpeoplemember,updatepeoplelist,updatpeoplememberid,addBalance,addPoint,updatemaxbuy
    }
    from "./../api/api.js";
    export default {
        name: "extension",
        data() {
            return {
            	maxbuyupdatenum:'',
            	maxbuy:false,
            	maxbuynumber:'',
            	updatetype:'',
            	addname:'',
				money:'',
                peoplecz:false,
                peoplecznum:'',
                peoplecznumtype:0,
                balancenumarray:'',
                pointnumarray:'',
                focusState:'',
                memberType:'',
                refundBtn:false,
                //1：普通会员，2：店长，3： 普通商家，4：银牌商家，5：金牌商家，6：钻石商家，9：区域管理员
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
                        name:"普通商家"
                    },
                    {
                        id:"4",
                        name:"银牌商家"
                    },
                    {
                        id:"5",
                        name:"金牌商家"
                    },
                    {
                        id:"6",
                        name:"钻石商家"
                    },
                    {
                        id:"9",
                        name:"区域管理员"
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
                    title: '用户编号',
                    key: 'memberNo',
                    width: 110,
                    align: 'center'
                },  {
                    title: '头像',
                    key: 'image',
                    width: 68,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                          attrs: {
                            style: 'width: 30px;height: 30px;'
                          },
                        }, [
                            h('img', params.row.image!=null?{
                              props: {
                                type: 'primary',
                                size: 'small'
                              },
                              attrs: {
                                src: params.row.image, style: 'width:30px;height: 30px;border-radius: 2px;'
                              },
                              style: {},
                            }:''),
                          ]);
                      }
                },  {
                    title: '昵称',
                    key: 'username',
                    width: 130,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [h('span', params.row.nickname!=null&&params.row.nickname!='null'&&params.row.nickname!=''?decodeURI(decodeURI(params.row.nickname)):params.row.username)]);
                    }
                }, {
                    title: '用户类型',
                    key: 'memberType',
                    align: 'center',
                    render2: (h, params) => {
                        return h('div', [h('span', params.row.memberType==1?'普通会员':params.row.memberType==2?'店长':params.row.memberType==3?'商家': '')]);
                    },
                    render: (h, params) => {
                            var str = '';
                            //1：普通会员，2：店长，3： 普通商家，4：银牌商家，5：金牌商家，6：钻石商家，9：区域管理员
                            switch(params.row.memberType) {
                                case 1:
                                    str = '普通会员';
                                    break;
                                case 2:
                                    str = '店长';
                                    break;
                                case 3:
                                    str = '普通商家';
                                    break;
                                case 4:
                                    str = '银牌商家';
                                    break;
                                case 5:
                                    str = '金牌商家';
                                    break;
                                case 6:
                                    str = '钻石商家';
                                    break;
                                case 3:
                                    str = '区域管理员';
                                    break;
                            }
                            // return h('div', [h('span', params.row["member.memberType"]==1?'普通会员':params.row["member.memberType"]==2?'店长':params.row["member.memberType"]==3?'商家': '')]);
                            return h('div', [h('span', str)]);
                        }
                }, {
                    title: '父级昵称',
                    key: 'parent.username',
                    width: 130,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [h('span', params.row['parent.nickname']!=null&&params.row['parent.nickname']!='null'&&params.row['parent.nickname']!=''?decodeURI(decodeURI(params.row['parent.nickname'])):params.row['parent.username'])]);
                    }
                },{
                    title: '余额',
                    key: 'balance',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [h('span', params.row.balance==null||params.row.balance==""?'0':params.row.balance)]);
                    }
                } , {
                    title: '库存积分',
                    key: 'point',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [h('span', parseInt(parseFloat(params.row.point)*1000)/1000)]);
                    }
                } , 
//              {
//                  title: '待返积分',
//                  key: 'point',
//                  align: 'center',
//                  render: (h, params) => {
//                      return h('div', [h('span', parseInt(parseFloat(params.row.point)/1000*1000)/1000)]);
//                  }
//              } ,
                {
                    title: '收益珠宝',
                    key: 'incomeCoin',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [h('span', parseInt(parseFloat(params.row.incomeCoin)*1000)/1000)]);
                    }
                } , {
                    title: '消费珠宝',
                    key: 'consumeCoin',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [h('span', parseInt(parseFloat(params.row.consumeCoin)*1000)/1000)]);
                    }
                }
                , {
                    title: '购买限制',
                    key: 'maxBuyPoint',
                    align: 'center'
//                  render: (h, params) => {
//                      return h('div', [h('span', '1')]);
//                  }
                }
                
	            ],
                tableData: []
            };
        },
        mounted() {
            this.peoplename = sessionStorage.setItem("peoplename",'');
            this.peoplemember = sessionStorage.setItem("peoplemember",'');
            this.parentpeoplename = sessionStorage.setItem("parentpeoplename",'');
             this.memberType = sessionStorage.setItem("peoplememberType",'');
            if (sessionStorage.getItem("peoplelists")) {
                this.list = JSON.parse(sessionStorage.getItem("peoplelists"));
                this.pageCount = Number(sessionStorage.getItem("peoplepageCounts"));
                this.linebox = Number(sessionStorage.getItem("peoplelineboxs"));
                this.pageSizes = this.linebox;
                this.totalPages = Number(sessionStorage.getItem("peopletotalPages"));
            }
            if (sessionStorage.getItem("peoplename")) {
                this.peoplename = sessionStorage.getItem("peoplename");
            }
            if (sessionStorage.getItem("peoplemember")) {
                this.peoplemember = sessionStorage.getItem("peoplemember");
            }
            if (sessionStorage.getItem("parentpeoplename")) {
                this.parentpeoplename = sessionStorage.getItem("parentpeoplename");
            }
            if (sessionStorage.getItem("peoplememberType")) {
                this.memberType = sessionStorage.getItem("peoplememberType");
            }
            if (sessionStorage.getItem("peoplelists")) {
                this.pageCount = Number(sessionStorage.getItem("peoplepageCounts"));
                this.linebox = Number(sessionStorage.getItem("peoplelineboxs"));
                this.pageSizes = this.linebox;
                this.totalPages = Number(sessionStorage.getItem("peopletotalPages"));
                this.getpeoplememberList(this.pageNumber,this.pageSizes);
            }else{
                var zhethis=this;
                this.tableloading = true;
                getpeoplemember().then(response => {
                    console.log(response);
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    this.tableloading = false;
                })
            }
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
                getpeoplemember(val, this.pagesizes, sorts, this.peoplename, this.peoplemember, this.memberType,this.parentpeoplename).then(response => {
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
                    // this.peoplename ='';
                    // this.peoplemember ='';
                    // this.parentpeoplename = '';
                    // this.memberType = '';
                    this.loading = false;
                })
            },
            peopleczBox(datatype){
            	if (this.ids !== null && this.ids  !== undefined && this.ids  !== '') {
            		if(typeof(this.ids) == 'number') {
		            	this.peoplecz = true;
		            	this.addname=this.item.username;
		            	this.money = this.item.balance;
		            	this.peoplecznumtype=datatype;
		            	if(datatype ==1){
		            		this.updatetype='余额';
		            		this.money = this.item.balance + '元';
		            	}else if(datatype ==2){
		            		this.updatetype='积分';
		            		this.money = parseInt(parseFloat(this.item.point)*1000)/1000+ '分';
		            	}
		            } else {
		            	this.$Message.error('请选择一位用户');
		            }
                } else {
                    this.$Message.error('请选择需要充值的用户');
                }
//              if(this.ids==""){
//                  this.$Notice.warning({
//                      title: '请选择需要充值的用户',
//                      desc: true ? '' : '请选择需要充值的用户 '
//                  });
//              }else{
//                  let argu = { id: this.ids };
//                  this.peoplecz=true;
//                  this.peoplecznumtype=datatype;
//              }
           },
            clickrefund(){
                if(this.peoplecznum!=""&&this.peoplecznum!=" "&&this.peoplecznum!=null&&this.peoplecznum!=undefined){
                    let balancenum='';
                    let pointnum='';
                    if(this.peoplecznumtype==1){
                        var patrn=/^(-)?[0-9]+(\d{0,20})+(\.\d{1,2})?$/;
                        if (!patrn.exec(this.peoplecznum)){
                            this.peoplecznum='';
                            this.focusState = true;
                            return
                        }
                        balancenum=parseFloat(this.balancenumarray) + parseFloat(this.peoplecznum);

                        this.refundBtn = true;
                        addBalance(this.ids,this.peoplecznum).then(response => {
                            console.log(response);
                            this.refundBtn = false;
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
                    if(this.peoplecznumtype==2){
                        var patrn=/^(-)?[0-9]+(\d{0,20})+(\.\d{1,2})?$/;
                        if (!patrn.exec(this.peoplecznum)){
                            this.peoplecznum='';
                            this.focusState = true;
                            return
                        }
                        pointnum=parseFloat(this.pointnumarray) + parseFloat(this.peoplecznum);
                        pointnum=parseFloat(pointnum).toFixed(3);

                        addPoint(this.ids,this.peoplecznum).then(response => {
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
            updatemaxBuyPoint(){
            	if (this.ids !== null && this.ids  !== undefined && this.ids  !== '') {
            		if(typeof(this.ids) == 'number') {
            			this.maxbuy=true;
            			this.addname = this.item.username;
            			this.maxbuynumber = this.item.maxBuyPoint;
            			this.maxbuyupdatenum = this.item.maxBuyPoint;
		            } else {
		            	this.$Message.error('请选择一位用户');
		            }
                } else {
                    this.$Message.error('请选择需要修改的用户');
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
            clickmaxbuy(){
            	  if(this.maxbuyupdatenum!=""&&this.maxbuyupdatenum!=" "&&this.maxbuyupdatenum!=null&&this.maxbuyupdatenum!=undefined){
                    updatemaxbuy(this.ids,this.maxbuyupdatenum).then(response => {
                        console.log(response);
                        if (response.success) {
                            this.$Message.success("提交成功");
                            this.getpeoplememberList(this.pageNumber,this.pageSizes);
                            this.ids='';
                        } else {
                            this.$Message.error(response.message);
                        }
                        this.maxbuy = false;
                        this.maxbuyupdatenum="";
                        })
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
                        this.item = item;
                    } else {
                        this.ids = this.ids + ',' + item.id;
                    }
                    console.log(item);
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