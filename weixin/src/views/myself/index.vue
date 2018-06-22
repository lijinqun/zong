<template>
  <div class="myself">
    <header class="top-title">
      <!-- <a class="back-off" href="#/">
        <van-icon name="arrow-left" />
      </a> -->
      <span>我的</span>
      <div class="headertop">
        <a href="#/selfSetting">
          <van-icon name="setting" />
        </a>
        <a href="javascript:;" @click="QRCodeshow = true;">
          <van-icon name="qr" />
        </a>
      </div>
    </header>
    <!-- 头部信息 -->
    <header class="self-head">
      <!-- <div class="top">
        <a href="#/selfSetting">
          <van-icon name="setting" />
        </a>
        <a href="javascript:;" @click="QRCodeshow = true">
          <van-icon name="qr" />
        </a>
      </div> -->
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
    <!-- 链商订单 -->
    <div class="all-order">
      <div class="title">
        <i></i>
        <span>我的钱包</span>
        <!-- <a href="javascript:;" class="link">查看全部</a> -->
        <div class="integral">
          <div class="inventory" @click="recordcontent">
            <p>{{userInfo.point.toFixed(3) || 0}}</p>
            <p>库存链豆</p>
          </div>
          <div class="wealth" @click="accountCenter">
            <p><img src="../../assets/310.png" alt=""></p>
            <p>结算中心</p>
          </div>
        </div>
      </div>
      <!-- <van-tabbar v-model="tActive" style="position: relative;">
        <van-tabbar-item icon="shop" to="/orderList/0">待付款
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/23.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="chat" to="/orderList/2">待发货
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/24.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="records" to="/orderList/3">待收货
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/25.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="gold-coin" to="/orderList/4">问题件
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/26.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="gold-coin" to="/orderList/1">已完成
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/27.png" />
          </template>
        </van-tabbar-item>
      </van-tabbar> -->
    </div>
    <!-- 链豆报表 -->
    <!-- <div class="integral-number">
      <div class="number-box">
        <a class="page" href="#/balance">
          <p>{{userInfo.balance || 0}}</p>
          <p>余额</p>
        </a>
        <a class="page" href="#/recordcontent/2">
          <p>{{userInfo.point.toFixed(3) || 0}}</p>
          <p>库存链豆</p>
        </a>
        <div class="page">
          <p>{{(userInfo.point / 1000).toFixed(3) || 0 }}</p>
          <p>待奖励链豆</p>
        </div>
      </div>
      <div class="number-box">
        <a class="page" href="#/recordcontent/3">
          <p>{{userInfo.incomeCoin.toFixed(3) || 0}}</p>
          <p>收益珠宝</p>
        </a>
        <a class="page" href="#/recordcontent/4">
          <p>{{userInfo.consumeCoin.toFixed(3) || 0}}</p>
          <p>消费珠宝</p>
        </a>
        <div class="page">
          <p>{{zhubao.toFixed(3) || 0}}</p>
          <p>珠宝价值</p>
        </div>
      </div>
      <echart-page></echart-page> 
    </div> -->
    <!-- 充值功能 -->
    <div class="other-fn">
      <!-- <van-tabbar v-model="tActive" style="position: relative;">
        <van-tabbar-item icon="shop">众付
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/28.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="chat" to="/sweepCode">收款
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/29.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="records" to="/transferBefore">转账
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/30.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="gold-coin"  to="/recharge">充值
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/31.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="gold-coin" to="/withdrawbalance">提现
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/32.png" />
          </template>
        </van-tabbar-item>
      </van-tabbar> -->
      <ul>
        <li>
          <a href="#/sweepCode">
            <span><img src="../../assets/203.png" alt=""></span>
            <p>收款</p>
          </a>
        </li>
        <li>
          <a href="#/transferBefore">
            <span><img src="../../assets/201.png" alt=""></span>
            <p>转账</p>
          </a>
        </li>
        <li>
          <a href="#/recharge">
            <span><img src="../../assets/202.png" alt=""></span>
            <p>充值</p>
          </a>
        </li>
        <li>
          <a href="#/withdrawal">
            <span><img src="../../assets/204.png" alt=""></span>
            <p>提现</p>
          </a>
        </li>
      </ul>
    </div>
    <!-- 我是店长 -->
    <div class="shop-manager">
      <div class="title">
        <i></i>
        <span @click="goshopCenter()">我的等级</span>
        <!-- <a href="#/customerItd" class="not" v-if="userInfo.memberType < 2">未升级</a>
          <a class="link" href="#/shopCenterHistory/1">
          <a class="link">
          累计奖励：
          <span>{{shopManager.totalComissionAmount || 0}}</span>
        </a> -->
      </div>
      <div class="number-box">
        <a class="page" @click="turnRouter('/shopCenter')">
          <!-- <p>{{childListLength || 0}}</p> -->
          <p><img src="../../assets/205.png" alt=""></p>
          <p>店长</p>
        </a>
        <a class="page" @click="turnRouter('/merchantCenter')">
           <p><img src="../../assets/206.png" alt=""></p>
          <p>商家</p>
        </a> 
        <a class="page" href="#/my">
           <p><img src="../../assets/497.png" alt=""></p>
          <p>柜主</p>
        </a>
        <div class="page" @click="customerItd">
           <p><img src="../../assets/207.png" alt=""></p>
          <p>我要升级</p>
        </div>
        <!-- <div>
          <a href="#">
            <p></p>
            <p>店长</p>
          </a>
        </div>
        <div>
          <a href="#">
            <p></p>
            <p>商家</p>
          </a>
        </div>
        <div>
          <a href="#">
            <p></p>
            <p>我要升级</p>
          </a>
        </div> -->
      </div>
    </div>
    <!-- 我是商家 -->
    <div class="merchant">
      <div class="title">
        <i></i>
        <span @click="gomerchantCenter()">从众服务</span>
        <!-- <a href="#/customerItd" class="not" v-if="userInfo.memberType < 3">未开通</a> -->
        <!-- <a class="link" href="#/shopCenterHistory/7"> -->
        <!-- <a class="link">
          累计销售：
          <span>{{merchant.totalSalesAmount || 0}}</span>
        </a> -->
      </div>
      <!-- <div class="number-box"> -->
        <!-- <a class="page" href="#/shopCenterHistory/8"> -->
        <!-- <a class="page">
          <p>{{merchant.thisMonthSalesAmount || 0}}</p>
          <p>当月销售额</p>
        </a>
        <a class="page">
          <p>0</p>
          <p>当月订单</p>
        </a>
        <a class="page">
          <p>{{merchant.thisMonthPointAmount || 0}}</p>
          <p>当月奖励</p>
        </a>
      </div> -->
      <!-- <van-tabbar v-model="tActive" style="position: relative;"> -->
        <!-- <van-tabbar-item icon="shop"  to="/shopSetting">店铺设置 -->
        <!-- <van-tabbar-item icon="shop"  to="/shopSetting">店铺设置
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/33.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="chat">商品管理
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/34.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="records" to="/offlineOrder">线下销售
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/35.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="gold-coin">订单管理
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/36.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="gold-coin">财务管理
          <template slot="icon" slot-scope="props">
            <img src="./../../assets/37.png" />
          </template>
        </van-tabbar-item>
      </van-tabbar> -->
    </div>
    <!-- 更多板块 -->
    <div class="more-page">
      <a class="page" href="#/sign">
        <img src="./../../assets/208.png" alt="">
        <p>签到有礼</p>
      </a>
      <a class="page" href="#/orderList/0">
        <img src="./../../assets/326.png" alt="">
        <p>我的订单</p>
      </a> 
      <a class="page" @click="turnRouter('/merchantorderList/2')">
        <img src="./../../assets/325.png" alt="">
        <p>商家订单</p>
      </a>
      <a class="page" href="#/playqrcode">
        <img src="./../../assets/495.png" alt="">
        <p>从众游戏</p>
      </a>
      <a class="page" @click="turnRouter('/businesslevel')">
        <img src="./../../assets/494.png" alt="">
        <p>成长轨迹</p>
      </a> 
      <a class="page" href="#/myshop">
        <img src="./../../assets/496.png" alt="">
        <p>分享小店</p>
      </a>
      <a class="page">
        <img src="./../../assets/301.png" alt="">
        <p>认证中心</p>
      </a>
      <!-- <a class="page">
        <img src="./../../assets/42.png" alt="">
        <p>我的收藏</p>
      </a> -->
      <!-- <a class="page" href="javascript:void(0)" @click="getifshop()">
        <img src="./../../assets/97.png" alt="">
        <p>我的小店</p>
      </a> -->
      <!-- <a class="page" href="#/customerItd">
        <img src="./../../assets/44.png" alt="">
        <p>我要升级</p>
      </a> -->
      <!-- <a class="page" href="#/accountCenter">
        <img src="./../../assets/46.png" alt="">
        <p>结算中心</p>
      </a> -->
      <a class="page" href="#/credit">
        <img src="./../../assets/302.png" alt="">
        <p>链商信用</p>
      </a>
      <!-- <a class="page" href="#/newsnotice/2"> -->
      <a class="page" href="#/community">
        <img src="./../../assets/303.png" alt="">
        <p>社区置换</p>
      </a>
      <a class="page" href="#/newsnotice/3">
        <img src="./../../assets/304.png" alt="">
        <p>爱心帮扶</p>
      </a>
      <a class="page" @click="QRCodeshow = true;">
        <img src="./../../assets/209.png" alt="">
        <p>推广海报</p>
      </a>
      <a class="page" href="#/allcoupons">
        <img src="./../../assets/300.png" alt="">
        <p>优惠券</p>
      </a>
      <a class="page" href="#/newsnotice/7">
        <img src="./../../assets/305.png" alt="">
        <p>招商入驻</p>
      </a>
      <a class="page" href="#/newsnotice/8">
        <img src="./../../assets/306.png" alt="">
        <p>帮助中心</p>
      </a>
      <a class="page" href="#/newsnoticeDetails/11">
        <img src="./../../assets/307.png" alt="">
        <p>联系客服</p>
      </a>
    </div>
    <!-- 底部主导航 -->
    <index-bottom-nav :active="parseInt(bottomNavActive)"></index-bottom-nav>
    <!-- 分享二维码 -->
    <div class="qcode-box" v-show="QRCodeshow || haibao">
      <div id="img-box">
        <img class="img" src="./../../assets/361.jpg" alt="" v-show="haibao">
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
              <p>{{parentName || '无' }}<van-icon name="edit" v-show="parentName == null" @click="editor" style="margin-left:10px;"/></p>
              <p>我的老师</p>
              <span @click="getImg()" v-show="QRCodeshow">下载推荐海报</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg" @click="QRCodeshow = false; haibao = false"></div>
    </div>
    <van-dialog v-model="showText" showCancelButton @confirm="getToUser">
      <p style="height:30px;"></p>
      <van-field
        v-model="value"
        label="老师的ID"
        placeholder="请输入..."
      />
    </van-dialog>
  </div>
</template>

<script>
// 引入底部主导航
import indexBottomNav from './../../components/indexBottomNav'
import { themember,getUserInfoByNo,getAllChildren, getUserInfo, getServerUrl, getMerchantSummary, getShopManagerSummary, getUserInfoById, getLatestPrice,register,getAppID,getAllChildrenCount} from "./../../api";
import tools from '../../utils'
import html2canvas from 'html2canvas'
import echartPage from './../echartPage'
import { Toast, Dialog,Button} from 'vant';
export default {
  name: 'myself',
  data () {
    return {
      // 判断用户是否填写手机号
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      bottomNavActive: 4,
      tActive: 0,
      childListLength: 0,
      memberNoBox: false,
      memberNo: '',
      QRCodeshow: false,
      haibao: false,
      photoBox: '',
      QRCode: null,
      QRCodeBig: null,
      parentName: null,
      merchant: {},
      shopManager: {},
      zhubao: 0,
      showText:false,
      value:null,
      errorMsg:'',
    }
  },
  created () {
    // this.getphonedata();
    this.$nextTick(() => {
      // getUserInfo(this.userInfo.open_id).then(response => {
      //   register(response.data.open_id, response.data.nickname, response.data.image).then(_response => {
      //   })
      // })
      getAllChildrenCount(this.userInfo.id).then(response => {
        this.childListLength = response.data.childCount
      })
      getUserInfoById(this.userInfo.parent_Id).then(reseponse => {
        if (reseponse.data) {
          this.parentName = reseponse.data.username;
        }
      })
      getMerchantSummary(this.userInfo.id).then(response => {
        if (response.data) {
          this.merchant = response.data
        }
      })
      getShopManagerSummary(this.userInfo.id).then(response => {
        if (response.data) {
          this.shopManager = response.data;
          
        }
      })
      // getLatestPrice().then(response => {
      //   if (response.data) {
      //     this.zhubao = response.data.price
      //   }
      // })
    })
  },
  mounted () {
    this.$nextTick(() => {
      let _this =this ;
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
  },
  methods: {
    getToUser() {
      if (this.value === '' || this.value === null) {
        // this.errorMsg = '请输入用户ID';
        Toast.fail('请输入老师的ID');
        this.showText = true
      } else if (this.value.length === 9){
        getUserInfoByNo(this.value).then(response => {
          if (response.data) {
            // this.toUser = response.data
            // this.errorMsg = response.data.username;
            Dialog.confirm({
              title: '您需要绑定的老师的昵称为',
              message: response.data.username
            }).then(() => {
              // this.showText = false;
              themember(this.userInfo.id,this.value).then(res=>{
                if(res.code == 200){
                  this.parentName = response.data.username;
                  Toast.success('修改老师成功!');
                }else{
                  Toast.fail(res.message);
                }
              })

            }).catch(() => {
              // on cancel
            });
          } else {
            // this.errorMsg = '暂无该用户信息'
            Toast.fail('暂无该老师的信息');
            this.showText = true
          }
        })
      } else {
        // this.errorMsg = '请输入正确的用户ID'
        Toast.fail('请输入正确的老师的ID');
        this.showText = true
      }
    },
    editor(){
      this.showText = true;
    },
    // 判断是否为店家商家在判断跳转的URL
    turnRouter (link) {
      if (link === '/merchantCenter' ) {
        getMerchantSummary(this.userInfo.id).then(response => {
          if (response.data) {
            this.$router.push(link)
          } else {
            this.$router.push('/customerItd')
          }
        })
      } else if (link === '/shopCenter' || link === '/businesslevel' ) {
        getShopManagerSummary(this.userInfo.id).then(response => {
          if (response.data) {
            this.$router.push(link)
          } else {
            this.$router.push('/customerItd')
          }
        })
      } else if (link === '/merchantorderList/2') {
        getMerchantSummary(this.userInfo.id).then(response => {
          if (response.data) {
            this.$router.push(link)
          } else {
            this.$router.push('/customerItd')
          }
        })
      }
      // else {
      //   this.$router.push(link)
      // }
    },
    recordcontent(){
      this.$router.push('/recordcontent/2')
    },
    customerItd(){
      this.$router.push('/customerItd')
    },
    accountCenter(){
      this.$router.push('/accountCenter')
    },
    getifshop(){
      let zhethis=this;
      getShopManagerSummary(this.userInfo.id).then(response => {
        if (response.data) {
          zhethis.$router.push('/myshop')
        } else {
          zhethis.$router.push('/customerItd')
        }
      })
    },
    nowTime() {
      return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    },
    getImg() {
      this.haibao = true
      this.QRCodeshow = false
      this.$nextTick(() => {
        html2canvas(document.getElementById("img-box")).then((canvas) => {
          this.photoBox = canvas.toDataURL("image/png")
        });
      })
    },
    goshopCenter(){
      let zhethis=this;
      getShopManagerSummary(this.userInfo.id).then(response => {
          if (response.data) {
            zhethis.$router.push('/shopCenter')
          } else {
            zhethis.$router.push('/customerItd')
          }
        })
    },
    gomerchantCenter(){
      let zhethis=this;
      getMerchantSummary(this.userInfo.id).then(response => {
          if (response.data) {
            zhethis.$router.push('/merchantCenter')
          } else {
            zhethis.$router.push('/customerItd')
          }
        })
    }
  },
  components: {
    indexBottomNav,
    echartPage
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
