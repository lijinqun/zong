<template>
  <div class="merchant-center" ref="main">
    <top-header title="店长中心">
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
      <span>店长中心</span>
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
        <a class="page bigboxcss" href="#/businesslevel">
        <!-- <a class="page bigboxcss"> -->
          <!-- <p>{{info.totalComissionAmount || 0}}</p> -->
         <p> {{ data['member.memberGrade'] == 0 ? '店长' : data['member.memberGrade'] == 1 ? '一星店长' : data['member.memberGrade'] == 2 ? '二星店长' :data['member.memberGrade'] == 3 ? '三星店长' :data['member.memberGrade'] == 4 ? '四星店长' :data['member.memberGrade'] == 5 ? '五星店长' : ''}}</p>
          <p>成长轨迹</p>
        </a>
        <a class="page bigboxcss" href="#/shopCenterHistory/2">
        <!-- <a class="page bigboxcss"> -->
          <p>{{info.thisMonthComissionAmount || 0}}</p>
          <p>今月奖励</p>
        </a>
        <a class="page bigboxcss" href="#/shopCenterHistory/3">
        <!-- <a class="page bigboxcss"> -->
          <p>{{info.lastDayComissionAmount || 0}}</p>
          <p>昨日奖励</p>
        </a>
      </div>
      <div class="number-box">
        <a class="page bigboxcss" href="#/shopCenterHistory/4">
        <!-- <a class="page bigboxcss"> -->
          <p>{{info.totalOrderCount || 0}}</p>
          <p>累计订单</p>
        </a>
        <a class="page bigboxcss" href="#/shopCenterHistory/5">
        <!-- <a class="page bigboxcss"> -->
          <p>{{info.thisMonthOrderCount || 0}}</p>
          <p>今月订单</p>
        </a>
        <a class="page bigboxcss"  href="#/shopCenterHistory/6">
        <!-- <a class="page bigboxcss"> -->
          <p>{{info.lastDayOrderCount || 0}}</p>
          <p>昨天订单</p>
        </a>
      </div>
      <div class="number-box">
        <a class="page bigboxcss">
          <p>{{info.allChildrenCount || 0}}</p>
          <p>我的粉丝</p>
        </a>
        <a class="page bigboxcss" href="#/userChild">
          <p>{{info.childrenCount || 0}}</p>
          <p>我的客户</p>
        </a>
        <a class="page bigboxcss" @click="turnRouter()">
          <div class="img">
            <img src="./../../assets/339.png" alt="">
          </div>
          <p>分享小店</p>
        </a>
      </div>
    </div>
    <!-- 多功能板块 -->
    <div class="other-box">
      <a class="page" href="#/myshopsetting">
        <div class="img">
          <img src="./../../assets/340.png" alt="">
        </div>
        <p>小店装修</p>
      </a>
      <a class="page" href="#/offlineOrder">
        <div class="img">
          <img src="./../../assets/341.png" alt="">
        </div>
        <p>自选产品</p>
      </a>
      <a class="page" href="#/community">
        <div class="img">
          <img src="./../../assets/342.png" alt="">
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
import { getShopManagerSummary, getAllChildren, getUserInfoById, getServerUrl,setTitle ,vipstatistical} from "./../../api";
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
      screenHeight:675,
      data:{}
    }
  },
  created () {
    // 店长等级
    let _this = this;
    vipstatistical(this.userInfo.id).then(_res=>{
        _this.data = _res.data
    })
    setTitle('从众链商');
    getShopManagerSummary(this.userInfo.id).then(response => {
      if (response.data) {
        this.info = response.data
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
      this.QRCode = new QRCode("erweima", {
        text: getServerUrl() + this.dirpath + "/index.html?redFlag=1&community=" + this.userInfo.memberNo,
        width: 85,
        height: 85,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
      this.QRCodeBig = new QRCode("erweima-big", {
        text: getServerUrl() + this.dirpath + "/index.html?redFlag=1&community=" + this.userInfo.memberNo,
        width: 160,
        height: 160,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    })

    if(this.$refs.main.offsetHeight<document.documentElement.clientHeight){
        this.$refs.placeholder.style.height=document.documentElement.clientHeight-this.$refs.main.offsetHeight+'px'
      }
    // const that = this
    // window.onresize = () => {
    //     return (() => {
    //         window.screenHeight = document.body.clientHeight;
    //         that.screenHeight = window.screenHeight;

    //         that.$refs.placeholder.style.height = that.screenHeight;
    //     })()
    // }
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
    },
    turnRouter() {
      this.$router.push('/myshop')
    },
  }
}
</script>

<style lang="scss" scoped>
 @import './index.scss';
</style>
