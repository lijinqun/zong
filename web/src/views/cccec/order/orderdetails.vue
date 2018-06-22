
<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    订单详情
                </p>
                <div>
                    <i-table :columns="ordergoodsColumns" :loading="tableloading" :data="ordergoodsData" style="width: 100%;"></i-table>
                </div>
            </Card>
        </Row>
        <Row>
            <Card>
                <div class="dataheader">
                    <span class="dataheadertxt">订单信息</span>
                </div>
                <div class="inputbox">
                    <div class="informationbox"><span>订单号:</span>
                        <!-- <i-input v-model="order_no" disabled placeholder="请输入名称..."></i-input> -->
                        <p>{{order_no}}</p>
                    </div>
                    <div class="informationbox"><span>下单日期:</span>
                        <!-- <i-input v-model="order_date" placeholder="请输入名称..."></i-input> -->
                        <p>{{order_date}}</p>
                    </div>
                </div>

                <div class="inputbox">
                    <div class="informationbox"><span>收货人:</span>
                        <i-input v-model="consignee" placeholder="请输入名称..."></i-input>
                    </div>
                    <div class="informationbox"><span>手机号码:</span>
                        <i-input v-model="mobile" placeholder="请输入名称..."></i-input>
                    </div>
                </div>

                <div class="inputbox">
                	<div class="informationbox">
                        <span>小区名称:</span>
                        <i-input v-model="orderdetailshouse" placeholder="请输入名称..."></i-input>
                    </div>
                    <div class="informationbox">
                        <span>详细地址:</span>
                        <i-input v-model="fullAddress" placeholder="请输入名称..."></i-input>
                    </div>
                </div>
                <div class="inputbox" >
                    <div class="informationbox"><span>订单状态:</span>
                        <!--<i-select v-model="orderstatus" clearable="" filterable="">
                            <i-option v-for="item in orderstatusbox" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                        </i-select>-->
                        <p>{{orderstatusname}}</p>
                    </div>
                    <div class="informationbox"><span>订单是否关闭:</span>
                        <!-- <span>收货状态:</span>
                        <i-select v-model="status" clearable="" filterable="">
                            <i-option v-for="item in statusbox" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                        </i-select> -->
                        <p>{{orderisclose}}</p>
                    </div>
                    
                </div>
                
                <div class="inputbox" id="express">
                    <div class="informationbox"><span>快递公司:</span>
                        <!--<p>{{orderexpress}}</p>-->
                        <i-select v-model="orderexpress" clearable="" filterable="">
                        <i-option v-for="item in couriercompanylist" :value="item.id" :key="item.id">{{ item.expressName }}</i-option>
                    	</i-select>
                    </div>
                    <div class="informationbox"><span>快递单号:</span>
                        <!--<p>{{orderexpressnumber}}</p>-->
                        <i-input v-model="orderexpressnumber" placeholder="请输入单号..."></i-input>
                    </div>
                    
                </div>
                
                <div class="dataheader">
                    <span class="dataheadertxt">订单金额</span>
                    <span class="dataheaderdata">
                        {{(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount))>0?(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount)):'0'}}
     
                    </span>
                </div>
                <!-- <div class="inputbox inputheadborder">
                    <div class="informationbox"><span>订单预收：</span>
                        <p>{{amount}} 元</p>
                    </div>
                    <div class="informationbox">

                    </div>
                </div> -->
                <!-- <div class="inputbox">
                    <div class="informationbox"><span>商品总金额:</span>
                        <i-input v-model="payment_date" placeholder="请输入名称..."></i-input>
                        <p>{{orderdata.goodsAmount!=""&&orderdata.goodsAmount!=null?orderdata.goodsAmount:'0'}} 元</p>
                    </div>
                </div> -->
                <!-- <div class="inputbox">
                    <div class="informationbox">

                    </div>
                </div>

                <div class="inputbox">
                    <div class="informationbox"><span>订单已支付：</span>
                        <p>{{amount}} 元</p>
                    </div>
                    <div class="informationbox">

                    </div>
                </div> -->
                <!-- <div class="dataheader">
                    <span class="dataheadertxt">支付方式</span>
                    <span class="dataheaderdata">{{(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount))>0?(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount)):'0'}} 元</span>
                </div> -->
                <div class="inputbox">
                    <div class="informationbox"><span>收益珠宝:</span>
                        <p>{{orderdata.coinAmount!=""&&orderdata.coinAmount!=null?orderdata.coinAmount:'0'}} 个</p>
                    </div>
                    <div class="informationbox posrelative"><span>消费珠宝:</span>
                        <p>{{orderdata.consumeCoinAmount!=""&&orderdata.consumeCoinAmount!=null?orderdata.consumeCoinAmount:'0'}} 个</p>
                    </div>
                </div>
                <div class="inputbox">
                    <div class="informationbox posrelative"><span>余额支付:</span>
                        <p>{{orderdata.balanceAmount!=""&&orderdata.balanceAmount!=null?orderdata.balanceAmount:'0'}} 元</p>
                    </div>
                    <div class="informationbox posrelative"><span>微信支付:</span>
                        <p>{{orderdata.needPaidAmount!=""&&orderdata.needPaidAmount!=null?orderdata.needPaidAmount:'0'}} 元</p>
                    </div>
                </div>
                
                <div class="dataheader">
                    <span class="dataheadertxt">积分</span>
                    <span class="dataheaderdata">{{bonusPointdata?bonusPointdata:'0'}}</span>
                </div>
                <!-- <div class="inputbox">
                    <div class="informationbox"><span>微信支付:</span>
                        <p>{{}} 元</p>
                    </div>
                    <div class="informationbox">

                    </div>
                </div> -->
                <!-- <div class="dataheader">
                    <span class="dataheadertxt">订单实收</span>
                    <span class="dataheaderdata">{{(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount)-parseFloat(orderdata.diffTotalPrice))>0?(parseFloat(orderdata.goodsAmount)+parseFloat(orderdata.deliveryAmount)+parseFloat(orderdata.packingAmount)-parseFloat(orderdata.diffTotalPrice)):'0'}} 元</span>
                </div> -->

                
                <Spin size="large" fix v-if="spinShow"></Spin>
                <div class="informationbtn">
                    <i-button type="warning" icon="" @click="goback()">返回</i-button>
                    <i-button type="info" icon="" @click="preservation()">保存</i-button>
                    <!-- <i-button type="info" v-if="returnpan" icon="" @click="returnmon()">退款</i-button> -->
                </div>
            </Card>
        </Row>
        <modal v-model="orderrefund" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>请输入退款金额</span></p>
           <!--  <div>
                微信支付 ￥{{maxorderNeedPaidAmount}}，最大可退 ￥{{maxorderNeedPaidAmount}}
                <i-input v-model="orderrefundnum" Number placeholder="请输入退款金额..."></i-input>
            </div> -->
            <div>
                <!-- 菜钱余额支付 ￥{{maxorderRefundAmount}}，最大可退 ￥{{maxorderRefundAmount}} -->
                <i-input v-model="orderrefundnum" Number placeholder="请输入退款金额..."></i-input>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="clickrefund()">确认提交</i-button>
            </div>
        </modal>
         <modal v-model="orderpirce" width="360">
            <p slot="header" style="text-align:center">
                <icon type="information-circled"></icon><span>修改单价</span></p>
            <div>
                <i-input v-model="price" Number placeholder="请输入单价..."></i-input>
            </div>
            <div slot="footer">
                <i-button type="primary" size="large" long="" @click="updateprice()">确认修改</i-button>
            </div>
        </modal>
    </div>
</template>

<script>
import "../../../../static/js/jquery-2.0.0.min.js";
import util from "@/libs/util";
import {updateexpress,getcouriercompany,getexpress,returnordermon,orderdetailslist,orderdetailsdata,orderupdate,province,addressbox,bindingarea,getareabox,getoperatorlist,orderarea4operNo,orderrefundAmount,updateprice}from "./../../api/api.js";
export default {
    name: 'orderdetails',
    components: {
        
    },
    data () {
        return {
        	isexpress:false,
            price:'',
            orderstatus:'',
            orderid:'',
            orderpirce:false,
        	expressdataid:'',
        	couriercompanylist:[],
        	orderexpressnumber:'',
        	orderexpress:'',
        	orderisclose:'',
            fullAddress:'', 
        	returnpan:false,
            showInfo: false,
            spinShow: false,
            names:'',
            orderoperNo:'',
            businessid:'',
            consignee:'',
            area1Address:'',
            area1Addresslist:[],
            area2Address:'',
            area2Addresslist:[],
            area3Address:'',
            area3Addresslist:[],
            area4Address:'',
            area4Addresslist:[],
            orderdetailshouse:'',
            orderdetailsnumberBuildings:'',
            delivery_date:'',
            options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now();
                    }
                },
            mobile:'',
            salesPartnerstage:'',
            payment_date:'',
            orderdata:'',
            status:'',
            region:'', //省市区
            regiondata:[], 
            delivery_date_time:'',

            // 退款
            orderrefund:false,
            orderrefundnum:'',
            orderrefundtypes:'',

            timelist:[
                    {'id':'09:00:00','time': "09:00~10:00"},
                    {'id':'10:00:00','time': "10:00~11:00"},
                    {'id':'11:00:00','time': '11:00~12:00'},
                    {'id':'12:00:00','time': '12:00~13:00'},
                    {'id':'13:00:00','time': '13:00~14:00'},
                    {'id':'14:00:00','time': '14:00~15:00'},
                    {'id':'15:00:00','time': '15:00~16:00'},
                    {'id':'16:00:00','time': '16:00~17:00'},
                    {'id':'17:00:00','time': '17:00~18:00'},
                    {'id':'18:00:00','time': '18:00~19:00'},
                ],
            statusbox:[
                    {
                        id:'0',
                        name:"未收货"
                    },
                    {
                        id:'1',
                        name:"已收货"
                    }
                ],
            orderstatus:'',
            orderstatusname:'',
            orderType:'',
            orderTypebox:[
                    {
                        id:'1',
                        name:"普通订单"
                    },
                    {
                        id:'2',
                        name:"T+N订单"
                    }
                ],
            sms_status:"",
            sms_statusbox:[
                    {
                        id:'0',
                        name:"未发送"
                    },
                    {
                        id:'1',
                        name:"已发送"
                    }
                ],
            order_date:'',
            order_no:'',
            amount:'',

            bonusPointdata:0,

            tableloading:false,
            ordergoodsData:[],
            ordergoodsColumns:[
                {
                    title: '名称',
                    key: 'goods.name',
                    width:300,
                    align: 'left'
                },
                {
                    title: '规格',
                    key: 'specification.valueNames',
                    width:200,
                    align: 'left'
                },
                {
                    title: '总价',
                    key: 'amount',
                    align: 'center',
                },
                {
                    title: '数量',
                    key: 'quantity',
                    align: 'center',
                },
                {
                    title: '单价',
                    key: 'price',
                    width:100,
                    align: 'center'
                },
                {
                title:'操作',
                key:'',
                align:'center',
                 render: (h, params) => {
                        return h('div', [this.orderstatus == 0 ?    
                         h('Button',{
                             props: {
                                 type: 'info',
                                 size: 'small'
                             },
                             on: {
                                    click: () => {
                                        console.log('点击');
                                        this.orderid = params.row.id;
                                        this.orderpirce = true;
                                    }   
                                }
                         },'修改'):''
                        ])
                    }
                }
            ],

            orderstatusbox: [
                {
                    id:0,
                    name:"未付款"
                },
                {
                    id:1,
                    name:"已完成"
                },
                {
                    id:2,
                    name:"待发货"
                },
                {
                    id:3,
                    name:"待收货"
                },
                {
                    id:4,
                    name:"问题件"
                },
                {
                    id:5,
                    name:"已取消"
                }
            ]
        };
    },
    methods: {
        getarea4(){
            
            getareabox(4).then(response => {
                this.area4Addresslist=response.data;
            })
        },
        updateprice(){
            console.log("id值"+ this.orderid);
               console.log("当前状态:"+this.orderstatus);
            updateprice(this.orderid,this.price).then(response =>{
                     if (response.success) {
                        this.$Message.success("修改成功");
                        this.orderpirce = false; 
                        this.price= '';

                        orderdetailsdata(this.$route.params.id).then(response =>{
                            this.ordergoodsData=response.data;
                        });
                         orderdetailslist(this.$route.params.id).then(response => {
                            this.orderdata = response.data;
                         })
                        // this.getListData(1);
                    } else {
                        this.$Message.error(response.message);
                    }

            })
        },
        init () {
        	$('#express').hide();

            var zhethis=this;
    	 	orderdetailsdata(this.$route.params.id).then(response => {
        		zhethis.ordergoodsData=response.data; 
                zhethis.bonusPointdata=0;
                for (let i = 0; i < zhethis.ordergoodsData.length; i++) {
                    zhethis.bonusPointdata+=parseFloat(zhethis.ordergoodsData[i].bonusPoint);
                }
   		 	});
            
            getcouriercompany().then(response => {
            	zhethis.couriercompanylist = response.data;
            	//setTimeout(() => {   
	            		getexpress(this.$route.params.id).then(response => {
	            		if(response.data){$('#express').show();isexpress = true;}else{$('#express').hide();isexpress = false;}	
		                zhethis.orderexpressnumber=response.data.expressNo;
                        zhethis.orderstatus = response.data.order_status;

		                zhethis.expressdataid = response.data.id;
		                for(let row of zhethis.couriercompanylist){
		        			if(row.id == response.data.expressId){
		        				zhethis.orderexpress = row.id;
		        			}
		        		}
		           		 });
           		// }, 500);
		    });        
            orderdetailslist(this.$route.params.id).then(response => {
                console.log(response)
                zhethis.businessid = response.data.id;
                zhethis.orderdata = response.data;
                zhethis.consignee = decodeURI(decodeURI(response.data.consignee));
                zhethis.order_date = response.data.order_date;
                zhethis.area1Address = response.data.area_id_level1;
                zhethis.area2Address = response.data.area_id_level2;
                zhethis.area3Address = response.data.area_id_level3;
                zhethis.area4Address = response.data.area_id_level4;
                zhethis.orderdetailshouse = decodeURI(decodeURI(response.data.house));
                zhethis.fullAddress = decodeURI(decodeURI(response.data.fullAddress));
//              zhethis.delivery_date = response.data.delivery_date.substring(0,10);
//              zhethis.delivery_date_time = response.data.delivery_date.substring(11);
                zhethis.mobile = response.data.mobile;
                zhethis.payment_date = response.data.payment_date;
                zhethis.orderstatus = response.data.order_status;
                //订单状态(0:等待付款,1:已完成,2:待发货,3:待收货,4:问题件,5:已取消,6：已过期,7：已确认)
                //zhethis.orderstatusname = response.data.order_status == 0 ? '未付款' : response.data.order_status == 1 ? '已完成' : response.data.order_status == 2 ? '待发货' : response.data.order_status == 3 ? '待收货' : response.data.order_status == 4 ? '问题件' :'已取消';
                var statusArr = ['等待付款', '已完成', '待发货', '待收货', '问题件', '已取消', '已过期', '已确认'];
                zhethis.orderstatusname = statusArr[response.data.order_status];
                if(response.data.order_status ==1||response.data.order_status ==2||response.data.order_status ==3){
                	zhethis.returnpan =true;
                }
                zhethis.orderisclose = response.data.isClosed ==false?'订单未关闭':'订单已关闭';
                
                zhethis.orderType = response.data.orderType;
                zhethis.order_no = response.data.order_no;
                zhethis.amount = response.data.amount;
                zhethis.salesPartnerstage = response.data["salesPartner.stage"];
                if(response.data.sms_status=='1'){
                    zhethis.sms_status = '1';
                }else{
                    zhethis.sms_status = '0';
                }
                if(response.data.status=='1'){
                    zhethis.status = '1';
                }else{
                    zhethis.status = '0';
                }

            });

            
        },
        returnmon(){
        	returnordermon(this.$route.params.id).then(response => {
                    console.log(response);
                    if (response.success) {
                        this.$Message.success("退款成功");
                        // this.getListData(1);
                    } else {
                        this.$Message.error(response.message);
                    }
                })
        },
        goback() {
            let argu = {};
            // util.openNewPage(this, 'orderpages', argu);
            // this.$router.push({
            //     name: 'orderpages',
            //     params: argu
            // });
            window.history.go(-1);
            this.$store.commit('removeTag', 'orderdetails');
            this.$store.commit('closePage', 'orderdetails');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList);
            if (this.currentPageName === 'orderdetails') {
                let lastPageName = '';
                if (this.$store.state.pageOpenedList.length > 1) {
                    lastPageName = this.$store.state.pageOpenedList[1].name;
                } else {
                    lastPageName = this.$store.state.pageOpenedList[0].name;
                }
                this.$router.push({
                    name: 'orderpages'
                });
            }
        },
        preservation:function() {
            this.spinShow = true;
            var zhethis = this;
            var zhetime="";
            if(isexpress==true){
            	if(this.orderexpress==''||this.orderexpressnumber==""){ this.$Message.error("请输入快递信息"); this.spinShow = false;return;}
	             updateexpress(zhethis.expressdataid,this.orderexpress,this.orderexpressnumber).then(response => {
	                   if (response.success) {
	                   	
	                        } else {
	                            this.$Message.error(response.message);
	                            return;
	                        }
	                })
            }
            
//          if(String(zhethis.delivery_date).indexOf("-")>0){
//              zhetime = zhethis.delivery_date+" "+zhethis.delivery_date_time;
//          }else{
//              let nowdate=zhethis.delivery_date;
//              let nowYeardate=nowdate.getFullYear();
//              // 获取月份
//              let nowMonthdate=((nowdate.getMonth()+1)<10?'0'+(nowdate.getMonth()+1):(nowdate.getMonth()+1));
//              // 获取日期
//              let nowDaydate=(nowdate.getDate()<10?'0'+nowdate.getDate():nowdate.getDate());
//              zhetime=nowYeardate+'-'+nowMonthdate+'-'+nowDaydate+" "+zhethis.delivery_date_time;
//          }
            // var zhetime = zhethis.delivery_date+" "+zhethis.delivery_date_time;
            // getoperatorlist(this.orderoperNo).then(data => {
                orderupdate(zhethis.$route.params.id,this.consignee,this.mobile,this.orderdetailshouse,this.fullAddress,this.orderstatus).then(response => {
                    setTimeout(function(zhgge) {
                        zhgge.spinShow = false;
                    },1000,zhethis)
                    this.$Modal.success({
	                        title: "温馨提示",
	                        content: '<p>保存成功</p>'
	                    });
                })
            // });
            
        },
        clickshowrefunddata(types){
            this.orderrefund=true;
            this.orderrefundtypes=types;
        },
        clickrefund(){
            if(this.orderrefundnum!=""&&this.orderrefundnum!=" "&&this.orderrefundnum!=null&&this.orderrefundnum!=undefined){
                orderrefundAmount(this.$route.params.id,this.orderrefundnum,this.orderrefundtypes).then(response => {
                    console.log(response);
                    if (response.success) {
                        this.$Message.success("提交成功");
                        this.getListData(this.pageNumber,this.pageSizes) 
                        // this.getListData(1);
                    } else {
                        this.$Message.error(response.message);
                    }
                    this.orderrefund = false;
                    this.orderrefundnum="";
                    })
            }
        },
    },
    created() {
        
    },
    mounted () {
        // this.getarea4();
        // this.init();
    },
    beforeRouteEnter (to,from,next){
            next ( vm => {
                // vm.getarea4();
                vm.init();
            })
        },
    watch:{
        '$route'(to, from) {
		        if (to.name == 'orderdetails') {
		        	this.orderexpressnumber='';
		        	this.orderexpress='';
		        	this.returnpan= false;
		        	this.init();
		           }
		        }  
    }
};
</script>

<style lang="less" scoped>

    .dataheader{
        padding: 20px 10% 5px;
        font-weight: bold;
        font-size: 1rem;
        >.dataheadertxt{
            width: 110px;
            display: inline-block;
        }
    }

    .inputboxhead{
        padding: 0 10% 26px;
        >span{
            display: inline-block;
        }
        >p{
            display: inline-block;
            padding-left: 5%;
        }
    }
    .inputbox{
         display: flex;
         padding: 0 0 10px;
         margin: 0 10%;
         background: #f5f5f5;
         > .informationbox{
            flex: 2;
            display: flex;
            margin-left: 0rem;
            padding: 0;
             > span {
                    width: 150px;
                    text-align: right;
                    white-space: nowrap;
                    line-height: 32px;
                    margin-right: 1rem;
                }
            >p{
                display: inline-block;
                width: 100%;
                padding-left: 5px;
                line-height: 32px;
                // border: 1px solid #dddee1;
                cursor:not-allowed; 
            }
            >.posabsolute{
                position: absolute;
                color: #fff;
                background-color: #ed3f14;
                padding: 2px 10px;
                font-size: 0.5rem;
                top: 6px;
                left: 230px;
                border-radius: 3px;
                cursor: pointer;
            }
            .datetimeselect{
                width: 100%;
            }
         }
         > .informationbox:nth-child(2){
            padding: 0 10% 0 0;
            
         }
         > .posrelative{
            position: relative;
         }
    }
    .inputheadborder{
        border-bottom: 1px solid #dddee1;
    }
    .informationbtn{
        text-align: center;
        margin-top: 30px;
        > button {
            margin-left: 1rem;
            width: 110px;
        }
     }

</style>
