<template>
  <div class="shop-center-history">
      <!-- 头部 -->
    <top-header :title="title[$route.params.type - 1]"></top-header>
    <!-- <header class="top-title">
      <a class="back-off"  href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>{{title[$route.params.type - 1]}}</span>
    </header> -->
    <div class="hidetab" ref="hidetab">
        <div class="overheight">
          <div class="nonelist" v-if="info.length<1">暂无记录</div>
          <van-list v-model="loading" :finished="finished" @load="getInfo($route.params.type,pageNum)" :offset="offsetheight">
            <ul class="recordul">
                <li v-if="info.length > 0" v-for="(item, index) in info" :key="index">
                  <div class="libox">
                    
                    <div class="txtleft">
                      <p v-if="$route.params.type==1">{{'【'+(item["type"]==1?'充值':item["type"]==2?'提现':item["type"]==3?'转账-转出':item["type"]==4?'转账-转入':item["type"]==5?'线下销售':item["type"]==6?'购买商品':item["type"]==7?'收益珠宝提现':item["type"]==8?'支付OSO订单':item["type"]==9?'商家OSO订单收款':item["type"]==10?'同城OSO订单收款':item["type"]==11?'取消商品订单':item["type"]==12?'退货-退回余额':item["type"]==13?'系统操作':item["type"]==18?'出让收入':item["type"]==17?'认领支出':item["type"]==19?'求认领退回':item["type"]==14?'升级会员':item["type"]==15?'退货-扣除商家余额':item["type"]==16?'升级区域奖励':item["type"]==20?'分享奖励':'')+'】'}}</p>
                      <p v-if="$route.params.type==2">{{'【'+(item["type"]==1?'线下销售':item["type"]==2?'分享奖励':item["type"]==3?'转化成珠宝':item["type"]==4?'升级奖励':item["type"]==5?'商家线下销售奖励':item["type"]==6?'购买商品奖励':item["type"]==7?'个人OSO订单奖励':item["type"]==8?'商家OSO订单奖励':item["type"]==9?'同城OSO订单奖励':item["type"]==10?'退货-扣除用户奖励':item["type"]==11?'退货-扣除商家奖励':item["type"]==12?'每日签到奖励':item["type"]==13?'系统操作':item["type"]==18?'出让收入':item["type"]==17?'认领支出':item["type"]==19?'求认领退回':item["type"]==14?'升级会员':item["type"]==15?'退货-扣除商家余额':item["type"]==16?'升级区域奖励':item["type"]==22?'星级奖励':item["type"]==23?'使用链豆抽奖':'')+'】'}}</p>
                      <p v-if="$route.params.type==3||$route.params.type==4">{{'【'+(item["type"]==1?'链豆转化成珠宝':item["type"]==2?'转账-转出':item["type"]==3?'转账-转入':item["type"]==4?'提现':item["type"]==5?'购买商品':item["type"]==6?'线下销售':item["type"]==7?'支付OSO订单':item["type"]==8?'取消商品订单':item["type"]==9?'退货-退回珠宝':item["type"]==10?'升级会员':item["type"]==11?'出让挂单':item["type"]==12?'出让挂单退回':item["type"]==13?'认领':item["type"]==14?'出让':'')+'】'}}</p>
                    </div>
                    <div class="txtright">
                      {{item.amount || 0}}
                    </div>
                  </div>
                  <div class="libox">
                    <div class="txtleft" v-if="item['otherMember.memberNo']">
                      <img v-if='item["type"]== 11 || item["type"]==12 || item["type"]==13 || item["type"]==14 || item["type"]==18 || item["type"]==17 || item["type"]==19' src="../../assets/421.gif" alt="">
                      <img v-else :src="item['otherMember.image']">
                      <span v-if='item["type"]== 11 || item["type"]==12 || item["type"]==13 || item["type"]==14 || item["type"]==18 || item["type"]==17 || item["type"]==19'>匿名ID</span>
                      <span v-else>Id{{item['otherMember.memberNo']}} </span>
                      <!-- <p> {{item['otherMember.username']}}</p> -->
                    </div>
                    <div class="txtleft" v-else>
                      <img v-show="$route.params.type==3" v-if='item["type"]== 11 || item["type"]==12 || item["type"]==13 || item["type"]==14' src="../../assets/421.gif" alt="">
                      <img v-show="$route.params.type==2 || $route.params.type==1" v-if='item["type"]==18 || item["type"]==17 || item["type"]==19' src="../../assets/421.gif" alt="">
                      <img v-else :src="item['member.image']">
                      <span v-show="$route.params.type==3" v-if='item["type"]== 11 || item["type"]==12 || item["type"]==13 || item["type"]==14'>匿名ID</span>
                      <span v-show="$route.params.type==2 || $route.params.type==1" v-if='item["type"]==18 || item["type"]==17 || item["type"]==19'>匿名ID</span>
                      <span v-else>Id{{item['member.memberNo']}} </span>
                      <!-- <p > {{item['member.username']}}</p> -->
                    </div>
                    
                    <div class="txtright">
                      <span class="time">{{item.recordTime}}</span>
                    </div>
                  </div>
                </li>
            </ul>
          </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { balancerecord,pointrecord,coinTypeDetails } from "./../../api";
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
      title: ['余额明细', '链豆明细','收益珠宝','消费珠宝']
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
        case '1': //余额
           balancerecord(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
        case '2': //库存链豆
           pointrecord(this.userInfo.id, val, 10).then(response => {
            this.loading = false
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
          case '3': //收益珠宝
           coinTypeDetails(this.userInfo.id, val, 10,1).then(response => {
            this.loading = false
            this.info = this.info.concat(response.data.list)
            this.pageNum++
            if (this.info.length >= response.data.totalRow) {
              this.finished = true;
            }
          })
          break;
          case '4': //消费珠宝
           coinTypeDetails(this.userInfo.id, val, 10,2).then(response => {
            this.loading = false
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
