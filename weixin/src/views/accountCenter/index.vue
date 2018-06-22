<template>
  <div class="account-center">
    <!-- 头部 -->
    <top-header title="结算中心"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/myself">
        <van-icon name="arrow-left" />
      </a>
      <span>结算中心</span>
    </header> -->
    <!-- 金额板块 -->
    <div class="account-box">
      <div class="page">
        <div class="img">
          <img src="./../../assets/59.png" alt="">
        </div>
        <p>扫码付</p>
      </div>
      <a class="page" href="#/balance">
        <div class="img">
          <img src="./../../assets/60.png" alt="">
        </div>
        <p>余额</p>
        <p class="balancenumcss">¥{{userInfo.balance || 0}}</p>
      </a>
      <div class="page">
        <div class="img">
          <img src="./../../assets/61.png" alt="">
        </div>
        <p>银行卡</p>
      </div>
    </div>
    <!-- 链豆报表 -->
    <div class="integral-number">
      <div class="number-box">
        <div class="page">
          <p>0</p>
          <p>累积链豆</p>
        </div>
        <div class="page" @click="jump('/recordcontent/2')">
          <p>{{userInfo.point.toFixed(3) || 0}}</p>
          <p>库存链豆</p>
        </div>
        <div class="page">
          <p>{{(userInfo.point / 1000).toFixed(3) || 0}}</p>
          <p>待奖励链豆</p>
        </div>
      </div>
      <div class="number-box">
        <div class="page" @click="jump('/recordcontent/3')">
          <p>{{userInfo.incomeCoin.toFixed(3) || 0}}</p>
          <p>收益珠宝</p>
        </div>
        <div class="page" @click="jump('/recordcontent/4')">
          <p>{{userInfo.consumeCoin.toFixed(3) || 0}}</p>
          <p>消费珠宝</p>
        </div>
        <div class="page">
          <p>{{zhubao || 0}}</p>
          <p>珠宝价值</p>
        </div>
      </div>
    </div>
    <!-- 多功能板块 -->
    <div class="other-box">
      <a class="page" href="#/sweepCode">
        <div class="img">
          <img src="./../../assets/330.png" alt="">
        </div>
        <p>收款</p>
      </a>
      <a class="page" href="#/recharge">
        <div class="img">
          <img src="./../../assets/331.png" alt="">
        </div>
        <p>充值</p>
      </a>
      <a class="page" href="#/transferBefore">
        <div class="img">
          <img src="./../../assets/332.png" alt="">
        </div>
        <p>转账</p>
      </a>
      <a class="page">
        <div class="img">
          <img src="./../../assets/333.png" alt="">
        </div>
        <p>订单管理</p>
      </a>
      <a class="page" href="#/offlineOrder">
        <div class="img">
          <img src="./../../assets/334.png" alt="">
        </div>
        <p>线下销售</p>
      </a>
      <a class="page">
        <div class="img">
          <img src="./../../assets/335.png" alt="">
        </div>
        <p>商品管理</p>
      </a>
      <a class="page" href="#/withdraw">
        <div class="img">
          <img src="./../../assets/336.png" alt="">
        </div>
        <p>珠宝兑换</p>
      </a>
      <a class="page">
        <div class="img">
          <img src="./../../assets/337.png" alt="">
        </div>
        <p>链商信用</p>
      </a>
      <a class="page" href="#/myself">
        <div class="img">
          <img src="./../../assets/338.png" alt="">
        </div>
        <p>更多</p>
      </a>
    </div>
  </div>
</template>

<script>
import { getLatestPrice } from './../../api'

export default {
  name: 'accountCenter',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      zhubao: 0
    }
  },
  created () {
    getLatestPrice().then(response => {
      if (response.data) {
        this.zhubao = response.data.price
      }
    })
    // 判断用户是否填写手机号码
    this.getphonedata()
  },
  methods: {
    jump(index){
      this.$router.push(index)
    },
     //   判断用户是否填写手机号码
      getphonedata(){
          if(this.userInfo.mobile==null||this.userInfo.mobile=='null'||this.userInfo.mobile==undefined || this.userInfo.mobile==''){
              this.$router.push('/phone')
          }
      },
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
