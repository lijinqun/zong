<template>
  <div class="sweep-history">
      <!-- 头部 -->
      <top-header title="收款记录"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/sweepMerchantCode">
        <van-icon name="arrow-left" />
      </a>
      <span>收款记录</span>
    </header> -->
    <ul>
        <li v-if="info.length > 0" v-for="(item, index) in info" :key="index">
          <!-- <div class="img">
            <img :src="item.image" alt="">
          </div> -->
          <div class="info">
              <p class="title">OSO订单收款 <span class="floatright">{{item.orderAmount || 0}}元({{item.amount || 0}}元)</span></p>
              <p><span class="floatright">{{item.recordTime}}</span></p>
          </div>
        </li>
    </ul>
  </div>
</template>

<script>
import { businessbalanceRecord } from "./../../api";
export default {
  name: 'sweep-history',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      info: []
    }
  },
  created () {
    businessbalanceRecord(this.userInfo.id).then(response => {
      this.info = response.data
    })
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
