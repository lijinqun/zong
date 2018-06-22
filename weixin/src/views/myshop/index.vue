<template>
  <div class="myshop">
    <!-- 头部 -->
    <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <!-- 搜索框 -->
      <div class="search-box">
        <van-icon class="icon" name="search" @click="searchbtn(0)" />
        <input type="text" v-model="searchdata" placeholder="">
      </div>
      <div class="headertop">
        <a href="#/myshopsetting">
          <van-icon name="setting" />
        </a>
      </div>
    </header>
    <div class="myshopcss">
      <!-- <img v-if="shoplogo==''" class="logo" src="./../../assets/115.jpg"> -->
      <div v-if="shoplogo==''" class="noneshoplogo"></div>
      <img v-if="shoplogo!=''" class="logo" :src="shoplogo">
      <div class="shopdata">
        <p class="shopname">{{shopname}}</p>
        <ul class="tablist">
          <li class="flex1-5"><img :src="logo"></li>
          <li>
            <p>{{goodsnumber}}</p>
            <p class="tabtxt">全部商品</p>
          </li>
          <li>
            <van-icon class="icon" name="wap-nav" />
            <p class="tabtxt">店长推荐</p>
          </li>
          <li>
            <van-icon class="icon" name="like" />
            <p class="tabtxt">收藏本店</p>
          </li>
          <li @click="getImg()">
            <van-icon name="qr" />
            <p class="tabtxt">二维码</p>
          </li>
        </ul>
      </div>

      <!-- 商品列表 -->
      <div class="goodsdataheight" id="iddataheight">
        <goodsList />
      </div>
    </div>

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
  </div>
</template>

<script>
import { getGoodsList,getshopdata,imgserverUrl,getServerUrl,getJssdk, getAppID ,setTitle ,getShopManagerSummary,getUserInfoByNo} from "./../../api";
import goodsList from './../../components/goodsList';
import html2canvas from 'html2canvas'
import tools from './../../utils'
export default {
  name: 'myshop',
  components: {
    goodsList
  },
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      noticedata:'',
      searchdata:'',
      goodsnumber:0,
      shopdata:[],
      shopname:'',
      logo:'',
      shoplogo:'',
      introduction: '',

      // 二维码
      childListLength: 0,
      QRCodeshow: false,
      haibao: false,
      photoBox: '',
      QRCode: null,
      QRCodeBig: null,
      parentName: '无',


      // 分享
      noncestr: '',
      ticket: '',
      timestamp: '',

      tomemberNo:'',
      toinfo:'',
      wechatShareOr: false
    }
  },
  created () {
    this.getGoods();
    this.geturlcommunity();
  },
  mounted () {
    this.$nextTick(() => {
      this.overflowheight();
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
    });
  },
  methods: {
    // 判断是否为分享
    geturlcommunity(){
      // 先判断自己是否为店长
      getShopManagerSummary(this.userInfo.id).then(response => {
        if (response.data) {
          this.getshop(this.userInfo.id)
        } else {
          // 若否，在判断是否存在推荐人memberNo
          if (tools.getQueryParams().community) {
            // 通过memberNo获取推荐人的id
            console.log('----communtiy----',tools.getQueryParams().community)
            getUserInfoByNo(tools.getQueryParams().community).then(res => {
              if (res.data) {
                this.getshop(res.data.id)
              }
            })
          }
        }
      })

      // let zhethis=this;
      // if(tools.getQueryParams().community){
      //   this.tomemberNo=tools.getQueryParams().community;
      //   getShopManagerSummary(tools.getQueryParams().community).then(response => {
      //     zhethis.toinfo=response.data;
      //     // 判断是否为店长
      //     getShopManagerSummary(zhethis.toinfo.id).then(response => {
      //       if (response.data) {
      //         zhethis.getshop(zhethis.toinfo);
      //       } else {
      //         zhethis.$router.push('/')
      //       }
      //     })
      //   })
      // }else{
      //   zhethis.getshop(zhethis.userInfo);
      // }
    },
    wechatShare() {
      getJssdk().then(response => {
        this.noncestr = response.data[0].noncestr
        this.ticket = response.data[0].ticket
        this.timestamp = response.data[0].timestamp
        // 启动微信设置
        tools.settingWechat(getAppID(), this.noncestr, this.ticket, this.timestamp, () => {
          // 添加微信朋友分享
          tools.menuShareAppMessage(this.shopname || '从众链商新零售', this.introduction || '链接世界  共享未来 链接世界  愿天下没有销不出去的好产品', getServerUrl() + '/zouwei/order/index.html?community=' + this.userInfo.memberNo + '#/myshop', getServerUrl() + '/zouwei/order/icon.jpg', () => {})
          // 添加微信朋友圈分享
          tools.menuShareTimeline(this.shopname || '从众链商新零售', getServerUrl() + '/zouwei/order/index.html?community=' + this.userInfo.memberNo + '#/myshop', getServerUrl() + '/zouwei/order/icon.jpg', () => {})
        })
      })
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
    getGoods() {
      let zhethis=this;
      
      getGoodsList().then(response => {
        zhethis.goodsnumber = response.data.length;
      })
    },
    getshop(infodata) {
      let zhethis=this;
      let params={};
      // params.memberId=infodata.id;
      params.memberId=infodata;
      getshopdata(params).then(response => {
        zhethis.shopdata = response.data;
        if(zhethis.shopdata==null){
          zhethis.shopname=this.userInfo.username+'的小店';
          zhethis.logo=this.userInfo.image;
          zhethis.shoplogo='';
        }else{
          if(zhethis.shopdata.name!=null&&zhethis.shopdata.name!=undefined&&zhethis.shopdata.name!=""){
              zhethis.shopname=zhethis.shopdata.name;
          }else{
            zhethis.shopname=this.userInfo.username+'的小店';
          }
          
          if(zhethis.shopdata.logo!=null&&zhethis.shopdata.logo!=undefined&&zhethis.shopdata.logo!=""){
            zhethis.logo=imgserverUrl+zhethis.shopdata.logo;
          }else{
            zhethis.logo=this.userInfo.image;
          }
          if(zhethis.shopdata.shopLogo!=null&&zhethis.shopdata.shopLogo!=undefined&&zhethis.shopdata.shopLogo!=""){
              zhethis.shoplogo=imgserverUrl+zhethis.shopdata.shopLogo;
          }else{
            zhethis.shoplogo='';
          }
          zhethis.introduction = response.data.introduction
        }
        setTitle(zhethis.shopname);
        if (!this.wechatShareOr) {
          this.wechatShare()
        }
        this.wechatShareOr = true
      })
    },
    overflowheight(){
      document.getElementById('iddataheight').style.height=document.documentElement.clientHeight-253+'px';
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
