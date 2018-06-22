
<template>
    <div >
        <row>
            <card v-show="!showuser">
                <Menu mode="horizontal"  active-name="1">
                    <MenuItem name="1">
                       <div @click="optionbtns()">所有商铺</div>
                    </MenuItem>
                    <MenuItem name="2">
                        <div @click="optionbtns(0)">待审资料</div>
                    </MenuItem>

                    <MenuItem name="3">
                        <div @click="optionbtns(1)">已审资料</div>
                        
                    </MenuItem>
                    <MenuItem name="4">
                        <div @click="optionbtns(2)">待入驻</div>
                        
                    </MenuItem>
                    <MenuItem name="5">
                        <div @click="optionbtns(3)">辅导期</div>
                        
                    </MenuItem>
                    <MenuItem name="6">
                        <div @click="optionbtns(4)">已入驻</div>
                    </MenuItem>
                </Menu>
                <div class="sreach">
                    <div class="sreach-page">
                         <div class="box"><span>查询账号:</span>
                            <i-select class="fixedwidth-6" v-model="account" clearable="" ref="account" :disabled="acountable" filterable="" >
                                <i-option  v-for="item in accountstatus" :value="item.id" :key='item.id'>{{item.name}}</i-option>
                            </i-select>
                        </div>
                        <div class="box">
                            <span>查询昵称:</span>
                             <i-input class="fixedwidth-10" v-model="username" placeholder="请输入昵称..." ></i-input>
                        </div>
                        <div class="box"><span>手机号码:</span>
                            <i-input class="fixedwidth-10" v-model="phone" placeholder="请输入手机号码..." ></i-input>
                        </div> 
                        <div class="box"><span>省:</span>
                             <i-select class="fixedwidth-6" v-model="province" clearable="" ref="provinceref" filterable="" :disabled="provinceable" @on-change="selectProvince">
                                <i-option  v-for="item in provincelist" :value="item.id"  :key="item.id" >{{ item.area }}</i-option>  
                            </i-select>
                            
                        </div>
                        <div class="box"><span>市:</span>
                             <i-select class="fixedwidth-6" v-model="city" clearable="" ref="cityref"  filterable="" :disabled="cityable" @on-change="selectCity">
                                 <i-option v-for="item in citylist" :value="item.id" :key="item.id">{{ item.area }}</i-option>
                             </i-select>

                        </div>
                        <div class="box"><span>区:</span>
                                <i-select  class="fixedwidth-6" v-model="town"  clearable="" ref="townref"  filterable=""  :disabled="townable">
                                    <i-option v-for="item in townlist" :value="item.id"  :key="item.id" @on-change="selectTown">{{ item.area }}</i-option>
                                </i-select>
                        </div>
                           
                    </div>
                 
                    <div class="sreach-page">
                        <div class="box"><span>&nbsp;&nbsp;&nbsp;ID查询:</span>
                            <i-input class="fixedwidth-6" v-model="memberId" placeholder="请输入ID"></i-input>
                        </div>
                        <div class="box"><span>商铺名称:</span>
                            <i-input class="fixedwidth-10" v-model="shopName" placeholder="请输入商铺名称"></i-input>
                        </div>
                        <div class="box" v-show="this.status==''"><span>商铺状态:</span>
                            <i-select class="fixedwidth-6" v-model="shopstatusqury" clearable="" filterable="">
                                <i-option v-for="item in shopstatusdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                            </i-select>
                        </div>
                        <div class="box" v-show="this.status==''"><span>审核状态:</span>
                            <i-select class="fixedwidth-6" v-model="status" clearable="" filterable="">
                                <i-option v-for="item in statusdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                            </i-select>
                        </div>
                        <div class="box"><span>产品类型:</span>
                            <i-select class="fixedwidth-6" v-model="clickcatId" clearable="" filterable="">
                                <i-option  v-for="item in catIddata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                            </i-select>
                        </div>
                        
                        
                        
                    </div>
                    <div class="sreach-page">
                        <div class="sreach-box sreach-box2" style="text-align: right;">
                                <i-button type="info" icon="ios-search" @click="getShop(1)">搜索</i-button>
                                <i-button type="warning" @click="clickexamine()" v-show="this.status== 0 || this.status == ''">审核</i-button>
                                <i-button type="warning" @click="clickpduser()" v-show="this.status >= 1  || this.status ==''">绑定帐号</i-button>
                                <i-button type="warning" @click="clickstatus()"  v-show="this.status == 1 || this.status == ''">更新商铺状态</i-button>
                                <i-button type="warning" @click="clickarea()" v-show="this.status== 0 || this.status == ''">更新地区</i-button>
                                <!-- <Button type="primary"  @click="exportData"><Icon type="ios-download-outline"></Icon> 导出表格</Button> -->
                                <i-button type="error">修改密码</i-button>
                            </div>
                    	<div class="sreach-box linenumcss">
                            <p>总共 <span>{{pageCount}}</span> 条记录</p>
                            <p>共 <span>{{totalPages}}</span> 页</p>
                            <p>每页
                                <i-input v-model="pagesizes" number="" style="width:45px;" placeholder=""></i-input> 条</p>
                        </div>
                    </div>
                </div>
                <i-table :columns="tableColumns" :data="tableData" height="500" style="width: 100%;" ref='table' @on-selection-change="selectIds"></i-table>
                <div class="page-box" style="text-align:right;margin-top:15px;">
                    <page :total="pageCount" :page-size="pagesizes" show-elevator="" show-total="" @on-change="getShop"></page>
                </div>

            </card>
        </row>
        <modal v-model="batchUpdateBox" width="360" >
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请选择</span></p>
            <div>
                <i-select v-model="choiceid" clearable="" placeholder="请选择">
                    <i-option v-for="item in statesbox" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                </i-select>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="upBatchUpdate">确认提交</i-button>
            </div>
        </modal>
        <modal v-model="updateShopStatusBox" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请选择</span></p>
            <div>
                <i-select v-model="shopStatusSel" clearable="" placeholder="请选择">
                    <i-option v-for="item in shopstatesbox" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                </i-select>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="updateShopStatus">确认提交</i-button>
            </div>
        </modal>
        <modal v-model="saveuserBox" width="450">
            <p slot="header" style="text-align:center">
                <span>修改商铺地区</span>
            </p>
            <div class="flexbox">
                <div class="flex1 headertxt">省：</div>
                <div class='flex5'>
                    <i-select v-model="queryproince" clearable="" ref="provinceref" filterable="" :disabled="provinceable" @on-change="updateProvince">
                        <i-option v-for="item in provincelist" :value="item.id" :key="item.id">{{ item.area }}</i-option>
                    </i-select>

                </div>
            </div>
            <div class="flexbox">
                <div class="flex1 headertxt">市：</div>
                <div class='flex5'>
                    <i-select v-model="querycity" clearable="" ref="cityref"  filterable="" :disabled="cityable" @on-change="updateCity">
                        <i-option v-for="item in citylist" :value="item.id" :key="item.id">{{ item.area }}</i-option>
                    </i-select>
                </div>
            </div>
            <div class="flexbox">
                <div class="flex1 headertxt">区：</div>
                <div class='flex5'>
                    <i-select v-model="querytown" clearable="" ref="townref"  filterable=""  :disabled="townable" @on-change="updateTown">
                    <i-option v-for="item in townlist" :value="item.id" :key="item.id">{{ item.area }}</i-option>
                </i-select>
                </div>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="updateShopArea()">确认提交</i-button>
            </div>
        </modal>
        <div class="userdata" v-show="showuser">
            <userpage :bingdingid='bingdingid' @clickuser='clickuser'></userpage>
        </div>
    </div>
</template>
<script>
    import util from "@/libs/util";
    import userpage from "../people.vue";
    import {
        getshop,updateshop,getshopcatId,updateshopstatus,updateshoparea,getarealevel
    }
    from "./../../api/api.js";
    export default {
        components: {
            userpage
          },
        name: "extension",
        data() {
            return {
                showuser:false,
                bingdingid:'',
                memberId:'',
                catIddata:[],
                username:'',
                shopName: "",
                clickcatId:'',
                pageCount: 0,
                totalPages: 0,
                pagesizes: 20,
                choiceid: 0,
                pageNumber:1,
                ids: "",
                status: '',
                needDateFrom: '',
                needDateTo: '',
                phone:'',               
                shopstatusqury: '',
                account:'',
                acountable:false,
                accountstatus:[
                    {
                        id: 1,
                        name:'已绑定'
                    },
                    {
                        id: 0,
                        name:'没绑定'
                    }
                ],
                shopstatusdata:[
                    {
                        id:'1',
                        name:"待入驻"
                    },
                    {
                        id:'2',
                        name:"辅导期"
                    },
                    {
                        id:'3',
                        name:"已入驻"
                    }
                ],
                statusdata:[
                    {
                        id:'0',
                        name:"未审核"
                    },
                    {
                        id:'1',
                        name:"通过"
                    },
                    {
                        id:'2',
                        name:"不通过"
                    }
                ],
                tableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }, 
                    {
                        title: '省',
                        width:100,
                        key: 'area1.area',
                        align: 'center'
                    },
                    {
                        title: '市',
                        width:100,
                        key: 'area2.area',
                        align: 'center'
                    },
                    {
                        title: '区',
                        width:100,
                        key: 'area3.area',
                        align: 'center'
                    }, 
                    {
                        title: '类型',
                        width:150,
                        key: 'cat.name',
                        align: 'center',
                    }, 
                    {
                        title: '商铺名称',
                        width:250,
                        key: 'shopName',
                        align: 'float'
                    }, {
                        title: '用户类型',
                        key: 'member.memberType',
                        align: 'center',
                        width:100,
                        render: (h, params) => {
                            var str = '';
                            //1：普通会员，2：店长，3： 普通商家，4：银牌商家，5：金牌商家，6：钻石商家，9：区域管理员
                            switch(params.row["member.memberType"]) {
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
                    },  {
                        title: '昵称',
                        width:300,
                        align: 'left',
                        render: (h, params) => {
                            return h('div', [h('p',params.row['member.username']),h('p','ID:'+(params.row.memberId ==''? '':params.row.memberId))]);
                        }
                    }, {
                        title: '联系电话',
                        width:150,
                        key: 'phone',
                        align: 'center'
                    }, {
                        title: '登陆账号',
                        width:150,
                        key: 'oper.operName',
                        align: 'center'
                    }, {
                        title: '状态',
                        width:100,
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [h('span', params.row.status == 0 ? '未审核' : params.row.status == 1 ? '通过' : '不通过')]);
                        }
                    }, 
                    {
                        title: '商铺状态',
                        width:100,
                        key: 'shopStatus',
                        align: 'center',
                        render: (h, params) => {
                            var str = '';
                            // '店铺状态，1：待入驻，2：辅导期，3：已入驻';
                            switch(params.row.shopStatus) {
                                case 1:
                                    str = '待入驻';
                                    break;
                                case 2:
                                    str = '辅导期';
                                    break;
                                case 3:
                                    str = '已入驻';
                                    break;
                            }
                            return h('div', [h('div', str)]);
                        }
                    },
                    {
                        title: '操作',
                        width:100,
                        align: 'center',
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
                                            util.openNewPage(this, 'shopdetails', argu);
                                            this.$router.push({
                                                name: 'shopdetails',
                                                params: argu
                                            });
                                        }
                                    }
                             },'详情')
                            ])
                        }
                    }
                ],
                tableData: [],
                batchUpdateBox:false,
                updateShopStatusBox:false,
                saveuserBox:false,
                statesbox: [
                    {
                        id: 1,
                        name: "通过"
                    }, {
                        id: 2,
                        name: "不通过"
                    }
                ],
                shopStatusSel:'',
                // '店铺状态，1：待入驻，2：辅导期，3：已入驻';
                shopstatesbox: [
                    {
                        id: 1,
                        name: "待入驻"
                    }, {
                        id: 2,
                        name: "辅导期"
                    }, {
                        id: 3,
                        name: "已入驻"
                    }
                ],
                province:'',
                queryproince:'', 
                provincelist:[],
                provinceable: false,
                city:'',
                querycity:'',
                citylist:[],
                cityable: false,
                town:'',
                querytown:'',
                townlist:[],
                townable: false,
                provinceName:'',
                cityName:'',
                townName:''
            };
        },
        mounted() {
            if (sessionStorage.getItem("shoplists")) {
                this.list = JSON.parse(sessionStorage.getItem("shoplists"));
                this.pageCount = Number(sessionStorage.getItem("shoppageCounts"));
                this.linebox = Number(sessionStorage.getItem("shoplineboxs"));
                this.pageSizes = this.linebox;
                this.totalPages = Number(sessionStorage.getItem("shoptotalPages"));
            }
            if (sessionStorage.getItem("shopName")) {
                this.shopName = sessionStorage.getItem("shopName");
            }
        },
        created() {
            this.getcatId();
            this.init();
        },
        watch: {
            // '$route' () {
            //     this.init();
            // }
        },
        methods: {
            init(){
                getshop().then(response => {
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                })
                getarealevel(1, 0).then(response => {
                    this.provincelist=response.data;
                })
            },
            getcatId(){
                let zhethis=this;
                getshopcatId().then(response => {
                    zhethis.catIddata = response.data;
                })
            },
            optionbtns(status_index){
                this.shopstatusqury = '';
                this.shopStatus = '';
                console.log("下标值:"+status_index);
                if(status_index == undefined){
                    this.pageNumber ='';
                    this.pageSizes  ='';
                    var sorts ='';
                    this.shopstatusqury = '';
                    this.shopStatus = 0;
                    this.shopName = '';
                    this.clickcatId = '';
                    this.phone = '';
                    this.account = '';
                    this.province = '';
                    this.city ='';
                    this.town ='';
                    this.status ='';
                }else if(status_index == 0){
                    this.status = '0';
                }else if(status_index == 1){
                   this.status = status_index;
                }else if(status_index == 2){
                    this.status = 1;
                    this.shopstatusqury = 1;
                }else if(status_index == 3){
                    this.status = 1;
                    this.shopstatusqury = 2;
                }else if(status_index == 4){
                     this.status = 1;
                    this.shopstatusqury = 3;
                }
                getshop(this.pageNumber,'','','',this.status,'','',this.shopstatusqury,'','','').then(response =>{
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    this.pageNumber = response.data.pageNumber;
                     
                });
               
            },
            getShop(val) {
                this.loading = true;
                var sorts = "";
                if((this.needDateFrom!=''&&this.needDateTo=='')||(this.needDateFrom==''&&this.needDateTo!='')){
                    this.$Modal.warning({
                        title: '温馨提示',
                        content: '请选择需求时间'
                    });
                }
                // 转时间格式)
                if(this.needDateFrom!='' && this.needDateTo!=''){
                	this.needDateFrom = this.timestampToTime(this.needDateFrom);
               		this.needDateTo = this.timestampToTime(this.needDateTo);
                }
                
                getshop(val, this.pagesizes, sorts,this.shopName,this.status,this.clickcatId, this.phone, this.shopstatusqury,this.account,this.province,this.city,this.town,this.memberId,this.username).then(response => {
                    console.log(response);
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    this.pageNumber = response.data.pageNumber;
                    sessionStorage.removeItem("shoplists");
                    sessionStorage.removeItem("shoppageCounts");
                    sessionStorage.removeItem("shopName");
                    sessionStorage.removeItem("shoplineboxs");
                    sessionStorage.removeItem("shoptotalPages");
                    var listjson = JSON.stringify(response.data.list);
                    sessionStorage.setItem("shoplists", listjson);
                    sessionStorage.setItem("shoplineboxs", this.pagesizes);
                    sessionStorage.setItem("shoptotalPages", this.totalPages);
                    sessionStorage.setItem("shoppageCounts", response.data.totalRow);
                    if (this.shopName) {
                        sessionStorage.setItem("shopName", this.shopName);
                    }
                    this.loading = false;
                })
            },
             timestampToTime(timeStamp) {
			    var y = timeStamp.getFullYear();      
			    var m = timeStamp.getMonth() + 1;      
			    m = m < 10 ? ('0' + m) : m;      
			    var d = timeStamp.getDate();      
			    d = d < 10 ? ('0' + d) : d;   
			    return y + '-' + m + '-' + d;      
		    },
            clickexamine(){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要审核的用户',
                        desc: true ? '' : '请选择需要审核的用户 '
                    });
                }else{
                    this.batchUpdateBox=true;
                }
            },
            upBatchUpdate(){
                var zhethis=this;
                updateshop(this.ids,this.choiceid).then(response => {
                    if(response.code=="200"){
                        zhethis.$Modal.success({
                            title: '温馨提示',
                            content: '<p>审核成功</p>'
                        });
                        zhethis.getShop(zhethis.pageNumber);
                        zhethis.ids="";
                        zhethis.batchUpdateBox=false;
                    }else{
                        zhethis.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                        zhethis.getShop(zhethis.pageNumber);
                        zhethis.ids="";
                        zhethis.batchUpdateBox=false;
                    }
                })
            },
            updateShopStatus(){
                var zhethis=this;
                console.log('shopStatus:' + this.shopStatusSel);
                updateshopstatus(this.ids,this.shopStatusSel).then(response => {
                    if(response.code=="200"){
                        zhethis.$Modal.success({
                            title: '温馨提示',
                            content: '<p>更新状态成功</p>'
                        });
                        zhethis.getShop(zhethis.pageNumber);
                        zhethis.ids="";
                        zhethis.updateShopStatusBox=false;
                    }else{
                        zhethis.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                    }
                })
            },
            updateShopArea(){
                var zhethis=this;
                updateshoparea(this.ids, this.queryproince, this.querycity, this.querytown).then(response => {
                    if(response.code=="200"){
                        zhethis.$Modal.success({
                            title: '温馨提示',
                            content: '<p>更新成功</p>'
                        });
                        zhethis.getShop(zhethis.pageNumber);
                        zhethis.ids="";
                        zhethis.saveuserBox=false;
                    }else{
                        zhethis.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                    }
                })
            },
            clickpduser(){
                 if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要绑定的用户',
                        desc: true ? '' : '请选择需要绑定的用户 '
                    });
                }else{
                    this.bingdingid=this.ids;
                    this.showuser=true;
                }
            },
            clickuser(data){
                this.getShop(this.pageNumber);
                this.showuser=data;
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
            clickstatus(){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要更新状态的用户',
                        desc: true ? '' : '请选择需要更新状态的用户 '
                    });
                }else{
                    this.updateShopStatusBox=true;
                }
            },
            clickarea(){
                if(this.ids==""){
                    this.$Notice.warning({
                        title: '请选择需要更新地区的用户',
                        desc: true ? '' : '请选择需要更新地区的用户 '
                    });
                }else{
                    this.saveuserBox=true;
                }
            },
            selectProvince(selection) {
                getarealevel(2, this.province).then(response => {
                    this.town = '';
                    this.citylist = response.data;
                    console.log("city:"+this.citylist);
                })
            },
            selectCity(selection) {
                getarealevel(3, this.city).then(response => {
                    this.townlist = response.data; 
                    console.log(this.townlist); 
                })
            },
            selectTown(selection) {
                 console.log('town:'+this.town);
            },
             updateProvince(selection) {
                getarealevel(2, this.queryproince).then(response => {
                    this.town = '';
                    this.citylist = response.data;
                    console.log("city:"+this.citylist);
                })
            },
            updateCity(selection) {
                getarealevel(3, this.querycity).then(response => {

                    this.townlist = response.data; 
                })
            },
            updateTown(selection) {
                 console.log('town:'+this.town);
            },
        }
    };
</script>
<style lang="less" scoped>
    .advanced-router {
        height: 240px !important;
        &-tip-p {
            padding: 10px 0;
        }
    }
    .fixedwidth-6{
        width:6rem;
    }
    .fixedwidth-10{
        width:10rem;
    }
    .box{

        margin-left:2rem;
    }
    .box span{
        margin-right:0.7rem;
    }
 
</style>