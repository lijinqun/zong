<template>
  <div class="merchant-center" ref="main">
    <top-header title="商家中心">
      <div class="headertop" slot="rightSide">
        <a href="#/selfSetting">
          <van-icon name="setting" />
        </a>
        <a href="javascript:;" @click="QRCodeshow = true;">
          <van-icon name="qr" />
        </a>
      </div>
    </top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/">
        <van-icon name="arrow-left" />
      </a>
      <span>商家中心</span>
      <div class="headertop">
        <a href="#/selfSetting">
          <van-icon name="setting" />
        </a>
        <a href="javascript:;" @click="QRCodeshow = true;">
          <van-icon name="qr" />
        </a>
      </div>
    </header> -->
    <!-- 头部信息 -->
    <header class="self-head">
      <div class="info-box">
        <div class="photo">
          <img :src="userInfo.image" alt="">
        </div>
        <div class="info">
          <p class="name">
            <span>{{userInfo.username}}</span>
            <img class="idcard" src="./../../assets/10.png" alt="" v-if="userInfo.memberType === 1">
            <img class="idcard" src="./../../assets/11.png" alt="" v-if="userInfo.memberType === 2">
            <img class="idcard" src="./../../assets/12.png" alt="" v-if="userInfo.memberType === 3">
            <!-- <span class="idcard">普通</span> -->
          </p>
          <div class="emblem">
            <img class="idcard" src="./../../assets/18.png" alt="">
            <img class="idcard" src="./../../assets/19.png" alt="">
            <img class="idcard" src="./../../assets/20.png" alt="">
            <img class="idcard" src="./../../assets/16.png" alt="">
            <img class="idcard" src="./../../assets/17.png" alt="">
          </div>
          <p class="time">ID:{{userInfo.memberNo}}</p>
        </div>
        <div class="other-link">
          <a href="#/newsnotice/1">
            <img src="./../../assets/new16.png">
            <!-- <span>链商公告</span>
            <van-icon name="arrow" /> -->
          </a>
          <a href="#/customerItd">
            <img src="./../../assets/new17.png">
            <!-- <span>会员权益</span>
            <van-icon name="arrow" /> -->
          </a>
        </div>
      </div>
    </header>
    <!-- 链豆报表 -->
    <div class="integral-number">
      <div class="number-box">
        <a class="page bigboxcss" href="#/shopCenterHistory/7">
        <!-- <a class="page bigboxcss"> -->
          <p>{{Number(info.totalSalesAmount).toFixed(3) || 0}}</p>
          <p>累计销售</p>
        </a>
        <a class="page bigboxcss" href="#/shopCenterHistory/8">
        <!-- <a class="page bigboxcss"> -->
          <p>{{Number(info.thisMonthSalesAmount).toFixed(3) || 0}}</p>
          <p>今月销售</p>
        </a>
        <a class="page bigboxcss" href="#/shopCenterHistory/9">
        <!-- <a class="page bigboxcss"> -->
          <p>{{info.lastDaySalesAmount || 0}}</p>
          <p>昨日销售</p>
        </a>
      </div>
      <div class="number-box">
        <a class="page bigboxcss" href="#/shopCenterHistory/10">
        <!-- <a class="page bigboxcss"> -->
          <p>{{Number(info.totalPointAmount).toFixed(3) || 0}}</p>
          <p>累计链豆</p>
        </a>
        <a class="page bigboxcss" href="#/shopCenterHistory/11">
        <!-- <a class="page bigboxcss"> -->
          <p>{{info.thisMonthPointAmount || 0}}</p>
          <p>今月链豆</p>
        </a>
        <a class="page bigboxcss" href="#/shopCenterHistory/12">
        <!-- <a class="page bigboxcss"> -->
          <p>{{info.lastDayPointAmount || 0}}</p>
          <p>昨天链豆</p>
        </a>
      </div>
    </div>
    <!-- 多功能板块 -->
    <div class="other-box">
      <a class="page" href="#/merchantorderList/2">
        <div class="img">
          <img src="./../../assets/343.png" alt="">
        </div>
        <p>订单管理</p>
      </a>
      <a class="page" href="#/offlineOrder">
        <div class="img">
          <img src="./../../assets/345.png" alt="">
        </div>
        <p>线下销售</p>
      </a>
      <a class="page">
        <div class="img">
          <img src="./../../assets/346.png" alt="">
        </div>
        <p>财务管理</p>
      </a>
      <a class="page" href="#/shopSetting">
        <div class="img">
          <img src="./../../assets/347.png" alt="">
        </div>
        <p>店铺设置</p>
      </a>
      <a class="page" href="#/manageshop">
      <!-- <a class="page"> -->
        <div class="img">
          <img src="./../../assets/348.png" alt="">
        </div>
        <p>商品管理</p>
      </a>
      <a class="page" href="#/sweepMerchantCode">
        <div class="img">
          <img src="./../../assets/352.png" alt="">
        </div>
        <p>收款二维码</p>
      </a>
      <a class="page">
        <div class="img">
          <img src="./../../assets/349.png" alt="">
        </div>
        <p>爱心帮扶</p>
      </a>
      <a class="page">
        <div class="img">
          <img src="./../../assets/350.png" alt="">
        </div>
        <p>链商信用</p>
      </a>
      <!-- <a class="page" href="#/myself"> -->
      <a class="page" href="#/community">
        <div class="img">
          <img src="./../../assets/351.png" alt="">
        </div>
        <p>社区置换</p>
      </a>
    </div>
    <!-- 分享二维码 -->
    <div class="qcode-box" v-show="QRCodeshow || haibao">
      <div id="img-box">
        <img class="img" src="./../../assets/chat-bg.jpg" alt="" v-show="haibao">
        <!-- <img :src="userInfo.image" alt="" class="touxiang"> -->
        <div id="erweima" v-show="haibao"></div>
        <img :src="userInfo.image" style="margin: 1rem auto;display: block" alt="" v-if="userInfo.memberType === 1&&QRCodeshow">
        <div id="erweima-big" v-show="QRCodeshow && userInfo.memberType > 1"></div>
        <img class="newImg" :src="photoBox" alt="" v-show="haibao">
        <div class="info" v-show="QRCodeshow">
          <p>----- 会员ID：{{userInfo.memberNo}} -----</p>
          <p>昵称：{{userInfo.username}} | 我是<span style="color:#f08519">{{userInfo.memberType === 1?'普通会员':userInfo.memberType === 2 ? '店长':'商家'}}</span></p>
          <p>扫一扫二维码，把花出去的钱赚回来</p>
          <div class="flex-box">
            <div class="page">
              <p>{{childListLength || 0}}</p>
              <p>我的粉丝</p>
              <a href="#/userChild">查看我的粉丝</a>
            </div>
            <div class="page">
              <p>{{parentName || '无'}}</p>
              <p>我的老师</p>
              <span @click="getImg()" v-show="QRCodeshow">下载推荐海报</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg" @click="QRCodeshow = false; haibao = false"></div>
    </div>
    <div ref="placeholder"></div>
  </div>
</template>

<script>
import { getMerchantSummary, getAllChildren, getUserInfoById, getServerUrl } from "./../../api";
import html2canvas from 'html2canvas'
export default {
  name: 'merchant-center',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      info: {},
      childListLength: 0,
      QRCodeshow: false,
      haibao: false,
      photoBox: '',
      QRCode: null,
      QRCodeBig: null,
      parentName: '无',
    }
  },
  created () {
    getMerchantSummary(this.userInfo.id).then(response => {
      if (response.data) {
          this.info = response.data;
      } else {
        this.$router.push('/customerItd')
      }
    })
    
    getAllChildren(this.userInfo.id).then(response => {
      this.childListLength = response.data.length
    })
    getUserInfoById(this.userInfo.parent_Id).then(reseponse => {
      if (reseponse.data) {
        this.parentName = reseponse.data.username
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(function(zhethis) {
        zhethis.QRCode = new QRCode("erweima", {
          text: getServerUrl() + this.dirpath + "/index.html?redFlag=1&community=" + zhethis.userInfo.memberNo,
          width: 85,
          height: 85,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
        });
        zhethis.QRCodeBig = new QRCode("erweima-big", {
          text: getServerUrl() + this.dirpath + "/index.html?redFlag=1&community=" + zhethis.userInfo.memberNo,
          width: 160,
          height: 160,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
        });
      },1000,this)
      
    });
    if(this.$refs.main.offsetHeight<document.documentElement.clientHeight){
      this.$refs.placeholder.style.height=document.documentElement.clientHeight-this.$refs.main.offsetHeight+'px'
    }
    sessionStorage.removeItem("clickmerchantsmemberid");
  },
  methods: {
    getImg() {
      this.haibao = true
      this.QRCodeshow = false
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
