<template>
  <div class="shop-center-history">
      <!-- 头部 -->
    <header class="top-title">
      <a class="back-off" :href="$route.params.type >6 ? '#/merchantCenter' : $route.params.type == 1 ? '#/businesslevel' : '#/shopCenter'">
        <van-icon name="arrow-left" />
      </a>
      <span>{{title[$route.params.type - 1]}}记录</span>
    </header>
    <div class="hidetab" ref="hidetab">
        <div class="overheight">
          <div class="nonelist" v-if="info.length<1">暂无记录</div>
          <van-list v-model="loading" :finished="finished" @load="getInfo($route.params.type,pageNum)" :offset="offsetheight">
            <ul class="recordul">
                <li v-if="info.length > 0" v-for="(item, index) in info" :key="index">
                  <div class="libox">
                    <div class="txtleft">
                      <!-- <img :src="item.otherimage" v-if="item.otherMemberId">
                      <img :src="item.memberimage" v-else> -->
                      <p>{{item['ord.orderType']?'【'+(item['ord.orderType']==1?'普通订单':item['ord.orderType']==2?'升级会员':item['ord.orderType']==3?'线下销售':item['ord.orderType']==4?'充值':item['ord.orderType']==5?'OSO':'')+'】':''}}</p>
                      <p>{{item["t.type"]?'【'+(item["t.type"]==1?'线下销售':item["t.type"]==2?'分享奖励':item["t.type"]==3?'转化成珠宝':item["t.type"]==4?'升级奖励':item["t.type"]==5?'商家线下销售奖励':item["t.type"]==6?'购买商品奖励':item["t.type"]==7?'个人OSO订单奖励':item["t.type"]==8?'商家OSO订单奖励':item["t.type"]==9?'同城OSO订单奖励':item["t.type"]==10?'退货-扣除用户奖励':item["t.type"]==11?'退货-扣除商家奖励':item["t.type"]==12?'每日签到奖励':item["t.type"]==13?'系统操作':'')+'】':''}}</p>
                      <p v-if="item['ord.order_no']">{{item['ord.order_no']}}</p>
                    </div>
                    <div class="txtright">
                      {{item['amount'] || 0}}
                    </div>
                  </div>
                 <!--  <div class="libox">
                    <div class="txtleft">
                      <p>{{item.orderType?(item.orderType==1?'普通订单':item.orderType==2?'升级会员':item.orderType==3?'线下销售':item.orderType==4?'充值':item.orderType==5?'OSO':''):''}}</p>
                      <p>{{item["t.type"]?(item["t.type"]==1?'线下销售':item["t.type"]==2?'分销提成':item["t.type"]==3?'转化成珠宝':item["t.type"]==4?'升级奖励':item["t.type"]==5?'商家线下销售':item["t.type"]==6?'购买商品':item["t.type"]==7?'支付OSO订单':item["t.type"]==8?'商家OSO订单':item["t.type"]==9?'商家O2O订单':item["t.type"]==10?'退货-扣除用户':item["t.type"]==11?'退货-扣除商家':item["t.type"]==12?'每日签到':''):''}}</p>
                    </div>
                  </div> -->
                  <div class="libox">
                    <div class="txtleft">
                      <img :src="item['otherMember.image']" v-if='item["otherMember.image"]'>
                      <span v-if="item['otherMember.memberNo']">Id{{item['otherMember.memberNo']}} </span>
                    </div>
                    <div class="txtright">
                      <span class="time">{{item.recordTime}}</span>
                      <!-- <span class="time">{{String(item['recordTime']).substring(0,10)}}</span> -->
                    </div>
                  </div>
                  <!-- <div class="libox smallheigt">
                    <div class="txtleft leftposabs">
                      <img :src="item['otherMember.image']" v-if='item["otherMember.image"]'>
                      <span v-if="item['otherMember.memberNo']">Id{{item['otherMember.memberNo']}} </span>
                      <p> {{item['otherMember.username']}}</p>
                    </div>
                    <div class="txtright">
                      <span class="time">{{String(item['recordTime']).substring(10)}}</span>
                    </div>
                  </div> -->
                </li>
            </ul>
          </van-list>
      </div>
    </div>

    <!-- <van-list v-model="loading" :finished="finished" @load="getInfo">
      <ul>
          <li v-if="info.length > 0" v-for="(item, index) in info" :key="index">
            <div class="img" v-if="item.image">
              <img :src="item.image" alt="">
            </div>
            <div class="info">
                <p class="title">{{item.username || item.remarks}}<span class="account">{{item.amount || 0}}</span></p>
                <p><span class="time">{{item.recordTime || item.order_no}}</span></p>
            </div>
          </li>
      </ul>
    </van-list> -->
  </div>
</template>

<script>
import { getAllCommissionPage, getThisMonthCommissionPage, getLastDayCommissionPage, getAllOrderPage, getThisMonthOrderPage, getLastDayOrderPage, getAllSalesPage, getThisMonthSalesPage, getLastDaySalesPage, getAllPointPage, getThisMonthPointPage, getLastDayPointPage  } from "./../../api";
export default {
  name: 'shop-center-history',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      info: [],
      pageNum: 1,
      loading: false,
      finished: false,
      offsetheight:20,
      totalPage:1,
      title: ['累计奖励', '今月奖励', '昨日奖励', '累计订单', '今月订单', '昨天订单', '累计销售', '今月销售', '昨天销售', '累计链豆', '今月链豆', '昨天链豆']
    }
  },
  created () {
    this.getInfo(this.$route.params.type, this.pageNum)
    let zhethis=this;
    setTimeout(function(){
        zhethis.$refs.hidetab.style.height=document.documentElement.clientHeight-40+'px';
    },300)
    
  },
  methods: {
    getInfo(type, val) {
      this.loading = true
      switch (type) {
        case '1': //累计奖励
           getAllCommissionPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '2': //今月奖励
           getThisMonthCommissionPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '3': //昨日奖励
           getLastDayCommissionPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '4': //累计订单
           getAllOrderPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '5': //今月订单
           getThisMonthOrderPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '6': //昨天订单
           getLastDayOrderPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '7': //累计销售
           getAllSalesPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '8': //今月销售
           getThisMonthSalesPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '9': //昨天销售
           getLastDaySalesPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '10': //累计链豆
           getAllPointPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '11': //今月链豆
           getThisMonthPointPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '12': //昨天链豆
           getLastDayPointPage(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            // this.finished = true
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
