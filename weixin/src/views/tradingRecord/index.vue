<template>
  <div class="trading-record">
    <!-- 头部 -->
    <top-header title="交易记录"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/">
        <van-icon name="arrow-left" />
      </a>
      <span>交易记录</span>
    </header> -->

    <div class="content">
      <van-cell-group>
        <van-cell class="user">
          <div class="img-box">
            <img src="./../../assets/9.png" alt="头像">
          </div>
          <div class="name">Id232552</div>
        </van-cell>
      </van-cell-group>

      <div class="whiteSpace"></div>

      <van-cell-group class="record">
        <van-cell title="收款金额">
          <span class="money">￥5399.00</span>
        </van-cell>

        <van-cell>
          <div class="row">
            <span>当前状态</span>
            <span>支付成功</span>
          </div>
          <div class="row">
            <span>订单描述</span>
            <span>苹果手机256G金色</span>
          </div>
          <div class="row">
            <span>订单类型</span>
            <span>OSO订单</span>
          </div>
          <div class="row">
            <span>支付时间</span>
            <span>2018-02-20 21:37:30</span>
          </div>
          <div class="row">
            <span>支付方式</span>
            <span>珠宝支付</span>
          </div>
          <div class="row">
            <span>交易单号</span>
            <span>42000052201802205572554</span>
          </div>
        </van-cell>
      </van-cell-group>

      <div class="whiteSpace"></div>
      
      <van-cell-group>
        <van-cell value="联系用户" is-link/>
        <van-cell value="查看与此用户的交易记录" is-link/>
      </van-cell-group>

      <div class="whiteSpace"></div>

      <van-cell-group>
        <van-cell value="常见问题" is-link/>
      </van-cell-group>

      <div class="whiteSpace"></div>

      <van-cell-group>
        <van-cell value="投诉" is-link/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "trading-record",
  data() {
    return {
      
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
