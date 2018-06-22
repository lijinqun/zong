<template>
  <div class="order-list">
    <!-- 头部 -->
    <top-header title="订单管理"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/myself">
        <van-icon name="arrow-left" />
      </a>
      <span>订单管理</span> -->
    </header>
    <van-tabs :active="active" :swipe-threshold="5" @click="clicktab">
      <van-tab v-for="(item, index) in navList" :title="item.value" :key="index">
        <div class="hidetab" ref="hidetab">
        <div class="overheight">
        <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="offsetheight">
        <ul class="list-ul">
          <li v-for="(item, index) in orderlist" :key="index" v-show="item.orderType == 1">
            <div class="lidata" @click="godetails(item.id,item.orderType)">
              <div class="title">
                <div class="txtleft">
                  <img v-lazy="item['member.image']" :onerror="defaultImg">
                  <span>Id{{item['member.memberNo']}} </span>
                  <span class="daysmall">{{item.create_date}}</span>
                </div>
                <div class="txtright">
                  <span class="status" v-if="item.order_status==0">等待付款</span>
                  <span class="status" v-if="item.order_status==1">已完成</span>
                  <span class="status" v-if="item.order_status==2">待发货</span>
                  <span class="status" v-if="item.order_status==3">待收货</span>
                  <span class="status" v-if="item.order_status==4">问题件</span>
                  <span class="status" v-if="item.order_status==5">已取消</span>
                  <span class="status" v-if="item.order_status==6">已过期</span>
                  <span class="status" v-if="item.order_status==7">已确认</span>
                  <!-- 20180329113016304 -->
                </div>
              </div>
              <div class="info" v-for="good in item.details">
                <div class="img">
                  <img v-lazy="imgserverUrl + good['goods.indexImage']" :onerror="defaultImg">
                </div>
                <div class="rightinfo">
                  <p class="nametxt">{{good['goods.name']}}</p>
                  <p class="speccss">{{good['specification.valueNames']}}</p>
                  <p class="smalltxt inbottom"> x {{good.quantity}}</p>
                  <div class="pricebox">¥{{parseFloat(good.price).toFixed(2)}}</div>
                </div>
              </div>
              <div class="info" v-if="item.orderType=='3'||item.orderType=='4'||item.orderType=='5'">
                <div class="img">
                  <img src="./../../assets/orderimg.png" alt="" v-if="item.orderType=='2'||item.orderType=='3'||item.orderType=='4'">
                  <img src="./../../assets/osoimg.png" alt="" v-if="item.orderType=='5'">
                </div>
                <div class="rightinfo">
                  <p>{{item.orderType=='2'?'[线下销售]':item.orderType=='3'?'[线下销售]':item.orderType=='4'?'[线下销售]':item.orderType=='5'?'[OSO订单]':''}}</p>
                  <p class="smalltxt inbottom"> x 1</p>
                  <div class="pricebox">¥{{parseFloat(item.amount).toFixed(2)}}</div>
                </div>
              </div>
              <p class="goodprice">共1件，合计：￥<span>{{parseFloat(item.amount).toFixed(2)}}</span><span>(含运费：￥{{item.delivery_cost||0.00}})</span><span style="margin-left:6px;" v-show=" item['memberCoupon.couponName'] != null">{{item['memberCoupon.couponName']}}</span></p>
            </div>
            <div class="btnbox" v-if="item.order_status==2 || item.order_status==0">
              <p class="confirmbtn" @click="clickcancel(item.id)" v-if="item.order_status==2">取消订单</p>
              <p class="btnbox-confirmbtn" @click="confirmbtn(item.id)" v-if="item.order_status==0">取消订单</p>
              <p class="confirmbtn" v-if="item.order_status==0" @click="ifgopay(parseFloat(item.amount).toFixed(2),item.order_no,item.isSinglePaymentMode,item.coinAmount,item.paymentModes)">去支付</p>
            </div>
            <div class="btnbox" v-if="item.order_status==3">
              <p class="confirmbtn" @click="clickconfirm(item.id)">确认收货</p>
              <p class="btnbox-confirmbtn" @click="courier(item.id)">查看物流</p>
            </div>
          </li>
        </ul>
        </van-list>
</div>
</div>
      </van-tab>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom">
      <div class="single-info">
        <div class="top-info">
          <p class="top-info-header">确认付款</p>
           <!-- <van-icon name="close" class="closebtn" @click="ask" /> -->
        </div>
        <div class="content">
          <p class="title" v-if="isSinglePaymentMode == 0">￥{{(totalPrice/100).toFixed(2)}}</p>
          <p class="title" v-if="isSinglePaymentMode == 1">{{totalCoinPrice}}个</p>
          <div class="paymode">
            <van-checkbox-group v-model="paycheckdata" :max="2"  @change="ifcheckbox">
              <van-checkbox name="0" style="margin-bottom: 1rem" v-if="isSinglePaymentMode == 0 && payWechat && paymentMode.indexOf(1) !== -1">
                <span style="width:4rem;display:inline-block;">微信支付</span>
              </van-checkbox>
              <van-checkbox name="1" style="margin-bottom: 1rem" v-if="isSinglePaymentMode == 0 && paymentMode.indexOf(2) !== -1">
                <span style="width:4rem;display:inline-block;">余额</span>
                <span style="color: #aaa;padding-left: 1rem;">({{userInfo.balance || 0}}元)</span>
              </van-checkbox>
              <van-checkbox name="2" style="margin-bottom: 1rem" v-if="payonemode==0 && paymentMode.indexOf(3) !== -1">
                <span style="width:4rem;display:inline-block;">收益珠宝</span>
                <span style="color: #aaa;padding-left: 1rem;">({{userInfo.incomeCoin || 0}}个)</span>
              </van-checkbox>
              <van-checkbox name="3" style="margin-bottom: 1rem" v-if="isSinglePaymentMode == 0 && paymentMode.indexOf(4) !== -1">
                <span style="width:4rem;display:inline-block;">消费珠宝</span>
                <span style="color: #aaa;padding-left: 1rem;">({{userInfo.consumeCoin || 0}}个)</span>
              </van-checkbox>
            </van-checkbox-group>
            <van-checkbox name="1" v-model="radio" disabled v-if="payonemode!=1 && isSinglePaymentMode == 0 && payWechat">不足部分微信支付</van-checkbox>
          </div>
          <!-- <div class="paytxt" @click="$router.push('/updatepaypassword')">如果您还没有设置支付密码，请点击这里</div> -->
        </div>
        <p class="paybtn" v-if="openpaypassword==false" @click="showAfter = true">确认支付</p>
        <p class="paybtn" v-if="openpaypassword==true" @click="ifpassword()">确认支付</p>
      </div>
    </van-popup>
    <van-dialog :lockScroll="false" v-model="showAfter" @confirm="ifpaybtn" @cancel="showAfter = false" :title="'确认支付'" :confirm-button-text="'确认支付'" :cancel-button-text="'取消'" :show-cancel-button="true">
    <!-- <van-dialog v-model="showAfter" @confirm="gopay" @cancel="showAfter = false" :title="'确认支付'" :confirm-button-text="'确认支付'" :cancel-button-text="'取消'" :show-cancel-button="true"> -->
      <div style="width:80%; margin: 0 auto; padding: 1rem 0;">
        <van-checkbox-group v-model="paycheckdata" :max="2"  @change="ifcheckbox">
          <van-checkbox name="0" style="margin-bottom: 1rem" disabled v-if="payWechat">
            <span style="width:4rem;display:inline-block;">微信支付</span>
          </van-checkbox>
          <van-checkbox name="1" style="margin-bottom: 1rem" disabled>
            <span style="width:4rem;display:inline-block;">余额</span>
            <span style="color: #aaa;padding-left: 1rem;">({{paycheckdata[0] === '1' ? ((totalPrice/100)).toFixed(2) > userInfo.balance ? userInfo.balance : ((totalPrice/100)).toFixed(2) : 0}}元)</span>
          </van-checkbox>
          <van-checkbox name="2" style="margin-bottom: 1rem" disabled>
            <span style="width:4rem;display:inline-block;">收益珠宝</span>
            <!-- <span style="color: #aaa;padding-left: 1rem;" v-if="payonemode==0">({{paycheckdata[0] === '2' ? ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) > userInfo.incomeCoin ? userInfo.incomeCoin : ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) : 0}}个)</span> -->
            <span style="color: #aaa;padding-left: 1rem;" v-show="isSinglePaymentMode == 0 " v-if="payonemode==1&&fixedmoney">({{paycheckdata[0] === '2' ? (((totalPrice/100)/zhubao)+(fixedmoney-(sumfixedmoney/zhubao))).toFixed(3) > userInfo.incomeCoin ? userInfo.incomeCoin : (((totalPrice/100)/zhubao)+(fixedmoney-(sumfixedmoney/zhubao))).toFixed(3) : 0}}个)</span>
            <span style="color: #aaa;padding-left: 1rem;" v-show="isSinglePaymentMode == 0 " v-else>({{paycheckdata[0] === '2' ? ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) > userInfo.incomeCoin ? userInfo.incomeCoin : ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) : 0}}个)</span>
            <span style="color: #aaa;padding-left: 1rem;" v-show="isSinglePaymentMode == 1 ">({{totalCoinPrice}}个)</span>
          </van-checkbox>
          <van-checkbox name="3" style="margin-bottom: 1rem" disabled v-if="payonemode==0">
            <span style="width:4rem;display:inline-block;">消费珠宝</span>
            <span style="color: #aaa;padding-left: 1rem;">({{paycheckdata[0] === '3' ? ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) > userInfo.consumeCoin ? userInfo.consumeCoin : ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) : 0}}个)</span>
          </van-checkbox>
        </van-checkbox-group>
        <van-checkbox name="1" v-model="radio" disabled v-if="payonemode!=1 && payWechat">不足部分微信支付</van-checkbox>
      </div>
    </van-dialog>


    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="gopaypassword"></paypassword>
    </div>
  </div>
</template>

<script>
import { getorderdata,imgserverUrl,confirmorder,cancelorder,getLatestPrice,showpassword,gopayorder,paySingleOrder,courier,updateOrder} from "./../../api";
import { Toast, Dialog } from 'vant';
import paypassword from "./../paypassword";
import tools from "./../../utils";
import loadingbox from "../../components/showloading";
import config from '../../config'
export default {
  name: 'order-list',
  components: {
    paypassword,
    loadingbox
  },
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      imgserverUrl:imgserverUrl,
      active:0,
      index:0,
      navList: [
        {
          value: '待付款',
          id:'0'
        },
        {
          value: '待发货',
          id:'2'
        },
        {
          value: '待收货',
          id:'3'
        },
        {
          value: '问题件',
          id:'4'
        },
        {
          value: '已完成',
          id:'1'
        }
      ],
      orderlist:[
        // {
        //   order:{
        //     id:123,
        //     orderType:1
        //   }
        // },
        // {
        //   order:{
            
        //   }
        // }
      ],
      loading: false,
      finished: false,
      offsetheight:20,
      pageNumber:1,
      pageSize:5,
      totalPage:1,
      defaultImg: 'this.src="' + require('../../assets/dishe.gif') + '"',
      passwordbox:false,
      showloading:false,
      show: false,
      totalPrice:0,
      showAfter: false,
      openpaypassword:true,//支付密码
      paycheckdata:[],
      payonemode:0,
      radio: '1',
      // zhubao:0,
      order_no:null,
      type:'',
      isSinglePaymentMode:0,
      totalCoinPrice:0,
      paymentMode:''//支付方式列表
    }
  },
  created () {
    let zhethis = this;
    this.getorderlist(this.$route.params.id);
    //去支付
    getLatestPrice().then(response => {
      // 获取最新珠宝价格
        if (response.data) {
          zhethis.zhubao = response.data.price;
        }
      })
  },
  watch: {
     
    },
  mounted () {
    for (var i = 0; i < this.navList.length; i++) {
      if(this.$route.params.id==this.navList[i].id){
        this.active=i;
        this.$refs.hidetab[i].style.height=document.documentElement.clientHeight-84+'px';
      }
    }
    
  },
  methods: {
    showpasswordbox(){
      if(this.paycheckdata.length>0&&this.paycheckdata[0]>0){
        this.show=false;
        this.passwordbox=true;
      }else{
        this.gopay();
      }
    },
    ifpassword(){
      // this.showAfter = true;
      if(this.paycheckdata.length == 0 && this.isSinglePaymentMode == 1){
         Dialog.alert({
            title: '温馨提示',
            message: '请选择支付方式'
          }).then(() => {
              
          });
          return
      }
      let zhethis=this;
      if(this.paycheckdata[0]>0){
       showpassword(this.userInfo.id).then(response => {
          if(response.data&&response.data.tradePassword){
            zhethis.showAfter = true;
          }else{
                Dialog.alert({
                  title: '温馨提示',
                  message: '您还没有设置交易密码，请设置交易密码'
                }).then(() => {
                    sessionStorage.setItem('goindex','/payorder');
                    this.$router.push('/updatepaypassword');
                });
                zhethis.$router.push('/updatepaypassword')
              }
        })
      }else{
        this.showAfter = true;
      }
    },
    ifpaybtn(){
      if(this.openpaypassword){
        this.showpasswordbox();
      }else{
        this.gopay();
      }
    },
    ifcheckbox(data){
      if(data.length>1){
        this.paycheckdata=[];
        this.paycheckdata.push(data[1]);
      }
    },
    // 待付款取消订单
    updateOrder(id){
      updateOrder(id).then((res)=>{
        if(res.code == 200){
          alert("取消成功!")
        }
      })
    },
     // 查看物流
    courier(id){
      courier(id).then((res)=>{
        if(res.code == 200){
          if(res.code == 200){
            Dialog.alert({
              title:'物流信息',
              message: '快递公司：' + res.data['express.expressName'] + '</br>' + '   ' + '快递单号：' + res.data.expressNo
            }).then(() => {
              // on close
            });
          }
        }
      })
    },    
    // 去支付
    gopay(password){
      this.showloading=true;
      this.rightPayBox=false;
      this.clickloading=true;
      let zhethis = this;
      if (this.paycheckdata.length === 0) {
        this.type = 1
      } else {
        if (this.paycheckdata[0] === '0') {
          this.type = 1
        } else if (this.paycheckdata[0] === '1') {
          this.type = 2
        } else if (this.paycheckdata[0] === '2') {
          this.type = 3
        } else if (this.paycheckdata[0] === '3') {
          this.type = 4
        }
      }
        // 付钱
            paySingleOrder(this.order_no,this.userInfo.open_id,password,this.type).then((res)=>{

              if(res.code=="200" && res.data.appId){
                zhethis.showloading=false;
                if(zhethis.payWechat != false){
                    tools.wechatPay(res.data.appId, res.data.timeStamp, res.data.nonceStr, res.data.package, res.data.signType, res.data.paySign, (_res) => {
                      zhethis.clickloading=false;
                      if (_res.err_msg === 'get_brand_wcpay_request:ok') {
                        zhethis.clicktab(1);
                        zhethis.active = 1;
                        Toast.fail("支付成功!");
                        } else if (_res.err_msg === 'get_brand_wcpay_request:cancel') {
                          Toast.fail("取消成功！");
                          } else {
                            // alert("失败")
                      }
                    })
                }else{
                  Toast.fail("余额不足！");
                }
              }else{
                if(res.code=="200" && (res.data.appId==undefined||res.data.appId==null||res.data.appId=="")){
                  zhethis.clicktab(1);
                  zhethis.active = 1;
                  Toast.fail("支付成功!");
                } else {
                  Toast.fail(res.message);
                }
                zhethis.clickloading=false;
                zhethis.showloading=false;
              }
            })
    },
    gopaypassword(data){
      // console.log(data)
      this.passwordbox=false;
      this.gopay(data);
      this.showloading=true;
    },
    ifgopay(amount,order_no,isSinglePaymentMode,totalCoinPrice,paymentModes){
        this.order_no = order_no;
        this.totalPrice = amount * 100
        // this.passwordbox = true
        this.isSinglePaymentMode = isSinglePaymentMode;
        this.totalCoinPrice = totalCoinPrice
        this.show = true;
        this.paymentMode = paymentModes;
    },
    // 付支付
    getorderlist(index,number) {
      let zhethis=this;
      let params={};
      if(index!=undefined&&index!=""){
        if(index==2){
          params.order_status_in='2,7';
        }else{
          params.order_status=index;
        }
        zhethis.index=index;
      }
      params.member_id=this.userInfo.id;
      if(number){
        params.pageNumber=number;
      }else{
        params.pageNumber=this.pageNumber;
      }
      params.pageSize=this.pageSize;
      params.orderBy='create_date desc';
      params.columns='id,order_status,order_no,orderType,amount,create_date,member.memberNo,member.image,remarks,isSinglePaymentMode,coinAmount,paymentModes,memberCoupon.couponName'
      getorderdata(params).then(response => {
          zhethis.orderlist=response.data.list;
          zhethis.pageNumber=response.data.pageNumber;
          zhethis.pageSize=response.data.pageSize;
          zhethis.totalPage=response.data.totalPage;
      })
    },
    onLoad(){
      let zhethis = this;
      setTimeout(() => {
        if(zhethis.pageNumber<zhethis.totalPage){
          zhethis.pageNumber++;
          let params={};
          if(zhethis.index!=undefined&&zhethis.index!=""){
            params.order_status=zhethis.index;
          }
          params.member_id=this.userInfo.id;
          params.pageNumber=zhethis.pageNumber;
          params.pageSize=zhethis.pageSize;
          params.orderBy='create_date desc';
          params.columns='id,order_status,order_no,orderType,amount,create_date,member.memberNo,member.image,remarks,isSinglePaymentMode,coinAmount,paymentModes,memberCoupon.couponName'
          getorderdata(params).then(response => {
            zhethis.orderlist.push(...response.data.list);
            zhethis.loading = false;
          })
        }else{
          zhethis.loading = false;
          zhethis.finished = true;
        }
      }, 500);
    },
    clicktab(index){
      this.active = index;
      console.log(index)
      let zhethis=this;
      zhethis.loading = false;
      zhethis.finished = false;
      let statusid='';
      zhethis.orderlist=[];
      statusid=this.navList[index].id;
      // alert(statusid)
      this.getorderlist(statusid,1);
      this.index=statusid;
      this.$refs.hidetab[index].style.height=document.documentElement.clientHeight-84+'px';
      this.$router.push('/orderList/'+statusid)
    },
    clickconfirm(id){
      let zhethis=this;
      let params={'id':id}
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认收货'
      }).then(() => {
        confirmorder(params).then(response => {
          if(response.code==200){
            setTimeout(function(){
              zhethis.active=4;
              Toast.success('收货成功');
              zhethis.clicktab(4);
            },300)
          }
        })
      }).catch(() => {
        // on cancel
      });
      
    },
    confirmbtn(id){
      let zhethis=this;
      let params={'id':id}
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消订单'
      }).then(() => {
        cancelorder(params).then(response => {
          if(response.code==200){
            zhethis.orderlist=[];
            setTimeout(function(){
              Toast.success('取消成功');
              zhethis.clicktab(0);
            },300)
          }
        })
      }).catch(() => {
        // on cancel
      });
      
    },
    clickcancel(id){
      let zhethis=this;
      let params={'id':id}
      Dialog.confirm({
        title: '温馨提示',
        message: '是否确认取消订单'
      }).then(() => {
        cancelorder(params).then(response => {
          if(response.code==200){
            zhethis.orderlist=[];
            setTimeout(function(){
              Toast.success('取消成功');
              zhethis.clicktab(1);
            },300)
          }
        })
      }).catch(() => {
        // on cancel
      });
      
    },
    godetails(orderid,orderType){
      if(orderType==1){
        this.$router.push('/orderDetails/' + orderid);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
