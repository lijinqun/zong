<template>
  <div class="sweep-history">
      <!-- 头部 -->
      <top-header title="收款记录"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/sweepCode">
        <van-icon name="arrow-left" />
      </a>
      <span>收款记录</span>
    </header> -->
    <ul>
        <li v-if="info.length > 0" v-for="(item, index) in info" :key="index">
          <div class="img">
            <img :src="item.image" alt="">
          </div>
          <div class="info">
              <p class="title">{{item.name}}-{{item.otherMemberName}}</p>
              <p>余额：<span class="b">{{item.amount || 0}}</span>，珠宝：<span class="b">{{item.zhubao || 0}}</span> <span class="time">{{item.recordTime}}</span></p>
          </div>
        </li>
    </ul>
  </div>
</template>

<script>
import { balanceRecord } from "./../../api";
export default {
  name: 'sweep-history',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      info: []
    }
  },
  created () {
    balanceRecord(this.userInfo.id).then(response => {
      this.info = response.data.list
    })
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
