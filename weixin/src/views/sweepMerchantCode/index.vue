<template>
  <div class="sweep-code" ref="main">
    <!-- 头部 -->
    <top-header title="二维码收款"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/merchantCenter">
        <van-icon name="arrow-left" />
      </a>
      <span>二维码收款</span>
    </header> -->
    <div class="content-box">
      <div class="top">
        <img src="./../../assets/120.png" alt="">
        <span>OSO商家收款二维码</span>
        <a href="#/sweepCode">
          <img src="./../../assets/473.png" style="width:28px;">
        </a>
      </div>
      <div class="content">
        <p class="name">{{info.shopName}}</p>
        <p class="warning">(付款成功可获得相应链豆)</p>
        <div class="code">
          <!-- <img :src="info.logo" alt="" class="user-img"> -->
          <img :src="userInfo.image" alt="" class="user-img">
          <div id="erweima"></div>
          <div id="erweima2"></div>
        </div>
        <div class="btn-box">
          <a href="javascript:;">设置金额</a>
          <a href="javascript:;" @click="getImg()">保存收款码</a>
        </div>
        <p class="bottom"><a href="#/merchantInfoSetting">设置我的店铺 <span>></span></a></p>
        <p class="bottom"><a href="#/businessHistory">收款小账本<span>></span></a></p>
      </div>
    </div>
    <p>扫一扫二维码，把花出去的钱赚回来</p>
    <div ref="placeholder"></div>
    <!-- 分享二维码 -->
    <div class="qcode-box" v-show="QRCodeshow">
      <div id="img-box">
        <img class="img" src="./../../assets/500.gif" alt="">
        <p class="shopnamecss">{{info.shopName}}</p>
        <img :src="userInfo.image" alt="" class="touxiang">
        <div id="erweima-big"></div>
        <img class="newImg" :src="photoBox" alt="">
      </div>
      <div class="bg" @click="QRCodeshow = false;"></div>
    </div>
  </div>
</template>

<script>
import { getServerUrl, getMerchantInfo } from "./../../api";
import html2canvas from 'html2canvas';
import { Toast,Dialog } from 'vant';
export default {
  name: 'sweep-code',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      QRCode: null,
      info: {},
      QRCodeshow: false,
      photoBox:'',
    }
  },
  created () {
    let zhethis=this;
    getMerchantInfo(this.userInfo.id).then(response => {
      if (response.code === '200' && response.data) {
        this.info = response.data;
        
      } else {
        // this.$router.push('/merchantCenter')
      }
      if(response.data==null||response.data=='null'||response.data.catId==null||response.data.catId=='99'){
          Dialog.alert({
          title: '温馨提示',
            message: '请完善您的店铺设置'
          }).then(() => {
            zhethis.$router.push('/merchantInfoSetting')
          });
        }
    })

  },
  mounted () {
    this.$nextTick(() => {
      this.QRCode = new QRCode("erweima", {
          text: getServerUrl() + this.dirpath + "/index.html" + '?redFlag=1&community=' + this.userInfo.memberNo + "#/merchantCodePay/" + this.userInfo.id,
          width: 150,
          height: 150,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
        });
      this.QRCodeBig = new QRCode("erweima-big", {
        text: getServerUrl() + this.dirpath + "/index.html" + '?redFlag=1&community=' + this.userInfo.memberNo + "#/merchantCodePay/" + this.userInfo.id,
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
      let zhethis=this;
      setTimeout(function() {
          if(zhethis.$refs.main.offsetHeight<document.documentElement.clientHeight){
            zhethis.$refs.placeholder.style.height=document.documentElement.clientHeight-zhethis.$refs.main.offsetHeight+'px'
          }
        },300)
    });
  },
  methods: {
    getImg() {
      this.QRCodeshow = true
      this.$nextTick(() => {
        html2canvas(document.getElementById("img-box")).then((canvas) => {
          this.photoBox = canvas.toDataURL("image/png")
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
