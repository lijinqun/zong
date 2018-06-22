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
          <li v-for="(item, index) in orderlist" :key="index">
            <div class="lidata" @click="godetails(item.id,item.orderType)">
              <div class="title">
                <div class="txtleft">
                  <img :src="item['member.image']">
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
                  <img :src="imgserverUrl + good['goods.indexImage']" alt="">
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
              <p class="goodprice">共1件，合计：￥<span>{{parseFloat(item.amount).toFixed(2)}}</span><span>(含运费：￥{{item.delivery_cost||0.00}})</span></p>
            </div>
            <div class="btnbox" v-if="item.order_status==2">
              <p class="confirmbtn" @click="clickcancel(item.id)">取消订单</p>
            </div>
            <!-- <div class="btnbox" v-if="item.order_status==3">
              <p class="confirmbtn" @click="clickconfirm(item.id)">确认收货</p>
            </div> -->
          </li>
        </ul>
        </van-list>
</div>
</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getorderdata,imgserverUrl,confirmorder,cancelorder,getMerchantorderdata } from "./../../api";
import { Toast, Dialog } from 'vant';
export default {
  name: 'order-list',
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
    }
  },
  created () {
    this.getorderlist(this.$route.params.id);
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
      // params.member_id=this.userInfo.id;
      if(number){
        params.pageNumber=number;
      }else{
        params.pageNumber=this.pageNumber;
      }
      params.pageSize=this.pageSize;
      params.merchantMemberId=this.userInfo.id;
      params.orderBy='create_date desc';
      params.columns='id,order_status,order_no,orderType,amount,create_date,member.memberNo,member.image,remarks'
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
          // params.member_id=this.userInfo.id;
          params.merchantMemberId=this.userInfo.id;
          params.pageNumber=zhethis.pageNumber;
          params.pageSize=zhethis.pageSize;
          params.orderBy='create_date desc';
          params.columns='id,order_status,order_no,orderType,amount,create_date,member.memberNo,member.image,remarks'
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
      console.log(index)
      let zhethis=this;
      zhethis.loading = false;
      zhethis.finished = false;
      let statusid='';
      zhethis.orderlist=[];
      statusid=this.navList[index].id;
      this.getorderlist(statusid,1);
      this.index=statusid;
      this.$refs.hidetab[index].style.height=document.documentElement.clientHeight-84+'px';
      this.$router.push('/merchantorderList/'+statusid)
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
      // if(orderType==1){
      //   this.$router.push('/orderDetails/' + orderid);
      // }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
