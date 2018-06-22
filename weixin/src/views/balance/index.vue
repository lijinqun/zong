<template>
  <div class="balance">
    <!-- 头部 -->
    <top-header title="余额">
      <span class="right-btn" @click="$router.push('/recordcontent/1')" slot="rightSide">余额明细</span>
    </top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/accountCenter">
        <van-icon name="arrow-left" />
      </a>
      <span>余&nbsp;额</span>
      <span class="right-btn" @click="$router.push('/recordcontent/1')">余额明细</span>
    </header> -->

    <div class="content">
        <img src="../../assets/gold.png" alt="金币">
        <p class="title">我的余额</p>
        <div class="money">￥{{userInfo.balance || 0}}</div>
        <van-button size="large" type="primary" tag="a" href="#/recharge">充值</van-button>
        <div class="whiteSpace"></div>
        <van-button size="large" tag="a" href="#/withdrawal">提现</van-button>
        <p class="info">如何获得珠宝增值收益 ></p>
        <p class="question">常见问题</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "balance",
  data() {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
