<template>
  <div class="sweep-code" ref="main">
    <!-- 头部 -->
    <top-header title="二维码收款"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/myself">
        <van-icon name="arrow-left" />
      </a>
      <span>二维码收款</span>
    </header> -->
    <div class="content-box">
      <div class="top">
        <img src="./../../assets/120.png" alt="">
        <span>个人二维码收款</span>
        <span @click="gomerchantCenter()"><img src="./../../assets/473.png" style="width:28px;"></span>
      </div>
      <div class="content">
        <p class="name">{{userInfo.memberNo}}( {{userInfo.username}} )</p>
        <p class="warning">(请核对以上付款用户ID，确认后继续)</p>
        <div class="code">
          <img :src="userInfo.image" alt="" class="user-img">
          <div id="erweima"></div>
        </div>
        <div class="btn-box">
          <a href="javascript:;">设置金额</a>
          <a href="javascript:;" @click="getImg()">保存收款码</a>
        </div>
        <p class="bottom">收款小账本<a href="#/sweepHistory"> > </a></p>
      </div>
    </div>
    <p>扫一扫二维码，用户之间自由转账</p>
    <div ref="placeholder"></div>

    <!-- 分享二维码 -->
    <div class="qcode-box" v-show="QRCodeshow">
      <div id="img-box">
        <img class="img" src="./../../assets/501.png" alt="">
        <p class="shopnamecss">{{userInfo.username}}</p>
        <img :src="userInfo.image" alt="" class="touxiang">
        <div id="erweima-big"></div>
        <img class="newImg" :src="photoBox" alt="">
      </div>
      <div class="bg" @click="QRCodeshow = false;"></div>
    </div>
  </div>
</template>

<script>
import { getServerUrl,getMerchantSummary } from "./../../api";
import html2canvas from 'html2canvas'
export default {
  name: 'sweep-code',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      QRCode: null,
      QRCodeshow: false,
      photoBox:'',
    }
  },
  created () {
    console.log("二维码url：" + getServerUrl() + this.dirpath +'?redFlag=1&community=' + this.userInfo.memberNo+"#/transfer/" + this.userInfo.memberNo)
    let zhethis=this;
    this.$nextTick(() => {
      this.QRCode = new QRCode("erweima", {
        text: getServerUrl() + this.dirpath + '?redFlag=1&community=' + this.userInfo.memberNo+"#/transfer/" + this.userInfo.memberNo,
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
      setTimeout(function() {
        if(zhethis.$refs.main.offsetHeight<document.documentElement.clientHeight){
          zhethis.$refs.placeholder.style.height=document.documentElement.clientHeight-zhethis.$refs.main.offsetHeight+'px'
        }
      },300)
    });
    
  },
  mounted () {
    this.$nextTick(() => {
      this.QRCodeBig = new QRCode("erweima-big", {
        text: getServerUrl() + this.dirpath +'?redFlag=1&community=' + this.userInfo.memberNo+"#/transfer/" + this.userInfo.memberNo,
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
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
    },
    gomerchantCenter(){
      let zhethis=this;
      getMerchantSummary(this.userInfo.id).then(response => {
          if (response.data) {
            zhethis.$router.push('/sweepMerchantCode')
          } else {
            zhethis.$router.push('/customerItd')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
