
<template>
    <div>
        <row>
            <card>
                <div class="sreach">
                    <div class="sreach-page">
                        
                        <div class="box"><span>商品名称:</span>
                            <i-input class="fixedwidth-10" v-model="shopName" placeholder="请输入商品名称" ></i-input>
                        </div> 
                        <div class="box"><span>转让人:</span>
                            <i-input class="fixedwidth-10" v-model="username" placeholder="请输入转让人名称"></i-input>
                        </div>  
                        <div class="box"><span>交易类型:</span>
                            <i-select  v-model="tradeType" class="fixedwidth-10" clearable="" filterable=""  ref="tradeTyperef">
                                <i-option v-for="item in tradetypelist" :key="item.id" :value="item.id">{{item.name}}</i-option>
                            </i-select>
                        </div> 
                        <div class="box"><span>状态:</span>
                             <i-select v-model="tradeStatus" class="fixedwidth-10" clearable=""  filterable=""  ref="tradeStatusref">
                                <i-option v-for="item in tradeStatuslist" :key="item.id" :value="item.id">{{item.name}}</i-option>
                            </i-select>
                        </div>     
                    </div>
                    <div class="sreach-page">
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
                        <div class="sreach-box sreach-box2" style="text-align: right;">
                            <i-button @click="gettransferlist(1)" type="info">搜索</i-button>
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
                    <page :total="pageCount" :page-size="pagesizes" show-elevator="" show-total="" @on-change="gettransferlist"></page>
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
        getshop,updateshop,getshopcatId,updateshopstatus,updateshoparea,getarealevel,gettransferlist,
    }
    from "./../../api/api.js";
    export default {
        components: {
            userpage
          },
        name: "extension",
        data() {
            return {
                 shopName:'',
                username:'',
                tradeType:'',
                tradeTyperef:'',
                tradeTypeable:'',
                tradeStatusref:'',
                tradeStatusable:'',
                tradeStatus:'',
                tradetypelist:[
                    {
                        id:'0',
                        name:"公开"
                    },
                    {
                         id:'1',
                        name:"私密"
                    }
                ],
                tradeStatuslist:[
                    {
                        id: '0',
                        name:'待审核'
                    },
                    {
                         id: '1',
                        name:'出让中'
                    },
                    {
                         id: '2',
                        name:'关闭交易'
                    }
                ],
                showuser:false,
                bingdingid:'',
                catIddata:[],
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
                    title: '交易时间',
                    key: 'createdTime',
                    width:200,
                    align: 'left',
                       render: (h, params) => {
                        return h('div',[h('p', params.row.createdTime),h('p',params.row.expiredTime)]);
                    }
                }, 
                {
                    title: '商品名称',
                    key: 'goodsName',
                    width: 130,
                    align: 'center',
                }, 
                {
                    title: '转让人',
                    key : 'member.username',
                    width:100,
                    align: 'center',
                        render: (h, params) => {
                        return h('div',[h('p', params.row['member.username'])]);
                    }
                },
                {
                    title:'省',
                    width:200,
                    key:'area1.area',
                },
                {
                    title:'市',
                    width:200,
                    key:'area2.area',
                },
                {
                    title:'区',
                    width:200,
                    key:'area3.area',
                },
                // {
                //     title:'地址',
                //     key:'fullAddress'
                // },
                {
                    title: '数量',
                    key: 'totalQuantity',
                    width:100,
                    align: 'center',
                    // render: (h, params) => {
                    //     return h('div',[h('p', params.row.amount != null ? params.row.amount:''),h('p', params.row.refundAmount>0 ? '退:'+params.row.refundAmount:'')]);
                    // }
                },
                {
                    title: '交易数量',
                    key  :"tradedQuantity",
                    width:100,
                    align:'center'
                },
                {
                    title:'单价',
                    key: 'price',
                    width:100,
                    align:'center'
                },
                {   
                    title: '总价',
                    key:'goodsAmount',
                    width:100,
                    align: 'center',
                     render: (h, params) => {
                        return h('div', [h('p', Number(params.row.totalQuantity)*Number(params.row.price))]);
                    }, 
                },
                {
                    title: '当前进度',
                    key: '',
                    align: 'center',
                    width:100,
                     render: (h, params) => {
                        return h('div', [h('p', parseInt((params.row.tradedQuantity / params.row.totalQuantity) *100) +"%" ) ]);
                    },
         
                },
                {
                    title:'交易类型',
                    key:'tradetype',
                    align:'center',
                    width:100,
                    render: (h, params) => {
                        return h('div', [h('p', params.row.tradetype == 0 ? '公开' : params.row.tradetype == 1 ? '私密' :'')]);
                    },
                },
                {
                    title: '状态',
                    key: 'tradeStatus',
                    align: 'center',
                    width:100,
                    render: (h, params) => {
                        return h('div', [h('p', params.row.tradeStatus == 0 ? '待审核' : params.row.tradeStatus == 1 ? '出让中' : params.row.tradeStatus == 2 ? '关闭交易':'')]);
                    },
                },
//                 {
//                     title: '详情',
//                     key: 'action',
//                     width:120,
//                     render: (h, params) => {
//                         return h('div', [
//                          h('Button',{
//                              props: {
//                                  type: 'info',
//                                  size: 'small'
//                              },
//                              on: {
//                                     click: () => {
//                                         let argu = { id: params.row.id };
//                                         util.openNewPage(this, 'orderdetails', argu);
//                                         this.$router.push({
//                                             name: 'orderdetails',
//                                             params: argu
//                                         });
//                                     }
//                                 }
//                          },'详情')
// //                           h('Button',{
// //                              props: {
// //                                  type: 'error',
// //                                  size: 'small'
// //                              },
// //                              on: {
// //                                     click: () => {
// //                                 
// //                                     }
// //                                 },
// //                              style: {
// //                                  marginLeft: '5px'
// //                              }
// //                          },'退款')
//                         ])
//                     }
//                 }
                
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
                gettransferlist().then(response => {
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
                gettransferlist().then(response => {
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
                gettransferlist(this.pageNumber,this.shopName,this.username,this.tradeType,this.tradeStatus,this.province,this.city,this.town).then(response =>{
                    this.tableData = response.data.list;
                    this.pageCount = response.data.totalRow;
                    this.totalPages = response.data.totalPage;
                    this.pagesizes = response.data.pageSize;
                    this.pageNumber = response.data.pageNumber;
                     
                });
               
            },
            gettransferlist(val) {
                console.log("val:"+ val);
                this.loading = true;
                var sorts = "";
                // if((this.needDateFrom!=''&&this.needDateTo=='')||(this.needDateFrom==''&&this.needDateTo!='')){
                //     this.$Modal.warning({
                //         title: '温馨提示',
                //         content: '请选择需求时间'
                //     });
                // }
                // // 转时间格式)
                // if(this.needDateFrom!='' && this.needDateTo!=''){
                //     this.needDateFrom = this.timestampToTime(this.needDateFrom);
                //     this.needDateTo = this.timestampToTime(this.needDateTo);
                // }
                
                gettransferlist(val,this.shopName,this.username,this.tradeType,this.tradeStatus,this.province,this.city,this.town).then(response => {
                    this.shopName ='';
                    this.username ='';

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
                        zhethis.gettransferlist(zhethis.pageNumber);
                        zhethis.ids="";
                        zhethis.batchUpdateBox=false;
                    }else{
                        zhethis.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                        zhethis.gettransferlist(zhethis.pageNumber);
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
                        zhethis.gettransferlist(zhethis.pageNumber);
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
          
            clickuser(data){
                this.gettransferlist(this.pageNumber);
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