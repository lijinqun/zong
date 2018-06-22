<template>
  <div class="beyond-pay">
    <!-- 头部 -->
    <top-header title="链豆规则"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/sign">
        <van-icon name="arrow-left" />
      </a>
      <span>链豆规则</span>
    </header> -->
    <div class="hiddendiv" id="integralRule"><img src="./../../assets/422.jpeg" alt=""></div>
  </div>
</template>

<script>
export default {
  mounted(){
    document.getElementById('integralRule').style.height=document.documentElement.clientHeight-40+'px';
  },
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
