<template>
  <div class="order-list">
    <!-- 头部 -->
    <top-header title="订单详情"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>订单详情</span>
    </header> -->
    <div class="info" v-for="good in orderdetails">
      <div class="img">
        <img :src="imgserverUrl + good['goods.indexImage']" alt="">
      </div>
      <div class="rightinfo">
        <p class="nametxt">{{good['goods.name']}}</p>
        <p class="speccss">{{good['specification.valueNames']}}</p>
        <p class="smalltxt inbottom"> x {{good.quantity}}</p>
        <div class="pricebox">¥{{parseFloat(good.price).toFixed(2)}}</div>
      </div>
    </div>
    <ul class="orderdata">
      <li><p class="left">订单号</p><p class="right">{{orderdetails[0]['ord.order_no']}}</p></li>
      <li><p class="left">收货人</p><p class="right">{{orderdetails[0]['ord.consignee']}}</p></li>
      <li><p class="left">联系电话</p><p class="right">{{orderdetails[0]['ord.mobile']}}</p></li>
      <li v-show="orderdetails[0]['ord.userRemarks'] != null"><p class="left">买家留言</p><p class="right">{{orderdetails[0]['ord.userRemarks']}}</p></li>
      <li>
        <p class="left">收货地址</p><p class="right">{{(orderdetails[0]['area3.fullName']||orderdetails[0]['area2.fullName'])?(orderdetails[0]['area3.fullName']||orderdetails[0]['area2.fullName'])+orderdetails[0]['ord.house']:orderdetails[0]['ord.numberBuildings']}}</p>
      </li>
      <li><p class="left">下单日期</p><p class="right">{{orderdetails[0]['ord.order_date']}}</p></li>
      <li><p class="left">获得链豆</p><p class="right">{{countbonusPoint}}</p></li>
      <li><p class="left" v-show=" orderdetails[0]['memberCoupon.couponName'] != null">奖励链豆</p><p class="right">{{orderdetails[0]['memberCoupon.couponName']}}</p></li>
    </ul>
    <ul class="orderdata">
      <li><p class="left">订单金额</p><p class="right redtxt">￥{{orderdetails[0]['ord.amount']}}</p></li>
      <li><p class="left disblock">运费</p><p class="right">￥0</p></li>
      <li><p class="left disblock">消费珠宝支付</p><p class="right redtxt">{{countconsumeCoinAmount}}</p></li>
      <li><p class="left disblock">收益珠宝支付</p><p class="right redtxt">{{countincomeCoinAmount}}</p></li>
      <li><p class="left disblock">余额支付</p><p class="right redtxt">￥{{countbalanceAmount}}</p></li>
      <li><p class="left disblock">微信支付</p><p class="right redtxt">￥{{countneedPaidAmount}}</p></li>
      <li class="noneborder"><p class="left"></p><p class="right"><span v-text="orderdetails[0]['ord.order_status']==0?'待付款:':'实付款:'"></span><span class="redtxt">￥{{orderdetails[0]['ord.amount']}}</span></p></li>
    </ul>
    <div v-if="orderdetails[0]['ord.order_status']==3&&orderdetails[0]['afterSaleStatus']==1"><p class="clickbtn" @click="clickrefundsgoods()">申请退货</p></div>
  </div>
</template>

<script>
import { getorderdetails,imgserverUrl } from "./../../api";
export default {
  name: 'order-list',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      imgserverUrl:imgserverUrl,
      orderdetails:{},
      countconsumeCoinAmount:0,
      countincomeCoinAmount:0,
      countbalanceAmount:0,
      countneedPaidAmount:0,
      countbonusPoint:0,
    }
  },
  created () {
    this.getorder();
  },
  methods: {
    getorder() {
      let zhethis=this;
      let params={};
      // params.member_id=this.userInfo.id;
      params.order_id=this.$route.params.id;
      params.columns='id,order_id,ord.amount,ord.order_status,ord.order_no,ord.order_date,ord.userRemarks,amount,ord.mobile,ord.consignee,ord.numberBuildings,goods.name,price,quantity,goods.indexImage,afterSaleStatus,specification.valueNames,area3.fullName,area2.fullName,ord.house,consumeCoinAmount,incomeCoinAmount,balanceAmount,needPaidAmount,bonusPoint,memberCoupon.couponName';
      getorderdetails(params).then(response => {
          zhethis.orderdetails=response.data;
          for (var i = 0; i < zhethis.orderdetails.length; i++) {
            zhethis.countconsumeCoinAmount+=parseFloat(zhethis.orderdetails[i].consumeCoinAmount);
            zhethis.countincomeCoinAmount+=parseFloat(zhethis.orderdetails[i].incomeCoinAmount);
            zhethis.countbalanceAmount+=parseFloat(zhethis.orderdetails[i].balanceAmount);
            zhethis.countneedPaidAmount+=parseFloat(zhethis.orderdetails[i].needPaidAmount);
            zhethis.countbonusPoint+=parseFloat(zhethis.orderdetails[i].bonusPoint);
          }
          zhethis.countconsumeCoinAmount=zhethis.countconsumeCoinAmount>0?zhethis.countconsumeCoinAmount.toFixed(4):0;
          zhethis.countincomeCoinAmount=zhethis.countincomeCoinAmount>0?zhethis.countincomeCoinAmount.toFixed(4):0;
          zhethis.countbalanceAmount=zhethis.countbalanceAmount>0?zhethis.countbalanceAmount.toFixed(2):0;
          zhethis.countneedPaidAmount=zhethis.countneedPaidAmount>0?zhethis.countneedPaidAmount.toFixed(2):0;
      })
    },
    clickrefundsgoods(){
        let id = ''
        for(let i=0;i<this.orderdetails.length;i++){
          if(i<this.orderdetails.length-1){
            id+=this.orderdetails[i].id+','
          }else{
            id+=this.orderdetails[i].id
          }
        }

      this.$router.push('/returnGoods/'+id);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
