<template>
  <div class="qrcode">
    <div class="showimgdata">
      <div class="closebtn" @click="closebtn()">
        <van-icon name="close" />
      </div>
      <div class="imgdata">
        <img src="../../assets/qrcode.jpg">
      </div>
      <div class="abouttxt margintop">请识别以上二维码</div>
      <div class="abouttxt">进入公众号了解更多</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qrcode',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    closebtn(){
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
