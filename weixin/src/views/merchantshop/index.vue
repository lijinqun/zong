<template>
  <div class="myshop">
    <!-- <top-header :title="shopname"></top-header> -->
    <!-- 头部标题 -->
    <header class="top-title">
      <van-icon name="arrow-left" @click="go"/>
      <span>{{shopname}}</span>
    </header>
    <div class="img-box">
      <!-- <img :src="shoplogo" alt=""> -->
      <img v-lazy="shoplogo" :onerror="defaultImg" alt="">
    </div>
    <div class="title">
      <p>{{shopname}}</p>
      <div class="star">
        <img src="./../../assets/151.png" alt="" v-for="item in 5" :key="item">
        <span>5.0分</span>
      </div>
    </div>
    <div class="address">
      <div class="icon">
        <img src="./../../assets/new1.png" alt="">
      </div>
      <div class="info">
        <p>{{shopdata.address}}</p>
      </div>
      <a class="phone" :href="`tel:${shopdata.phone}`">
        <img src="./../../assets/152.png" alt="">
      </a>
    </div>
    <!-- <div class="pay-box">
      <div class="des">
        <p class="title">买单</p>
        <p class="other">
          <span>满100减8元</span>
          <span>(每天00：00 - 24：00)</span>
        </p>
      </div>
      <div class="right">
        <span>买单</span>
        <p>已买100</p>
      </div>
    </div> -->
    <!-- <div class="consumption van-hairline--bottom">
      <span>买单</span>
      <router-link to="/payment">进店消费</router-link>
    </div> -->
    <div class="shopUserInfo">
      <p>商家信息</p>
      <p class="des">商家电话：{{shopdata.phone}}</p>
      <!-- <p class="des">周六，周日10：00-23:00 周一至周五 午市11:00 - 14:30</p> -->
    </div>
    <div class="page" v-for="(item, index) in list" :key="index">
      <!-- <p class="title">{{item.catName}}<a :href="`#/merchantGoods/${merchantsId}`" style="float: right;font-size: .8rem; color: #409EFF">查看更多</a></p> -->
      <ul>
        <li v-for="(_item, _index) in item.goodsList" :key="_index" @click="$router.push('/goodsdetails/' + _item.id);">
          <img :src="imgserverUrl + _item.indexImage" alt="">
          <div class="content">
            <p class="title">{{_item.name}}</p>
            <!-- <p class="des">剁椒鱼头，剁椒鱼头，剁椒鱼头，剁椒鱼头，剁椒鱼头，剁椒鱼头，剁椒鱼头，剁椒鱼头</p>
            <P class="data">周一至周日 | 免预约</P> -->
            <p class="price">
              <span class="new">￥{{_item.discount}}</span>
              <!-- <span class="discount">7.8折</span>
              <span class="sell">已售242</span> -->
            </p>
          </div>
        </li>
      </ul>
    </div>
      <!-- 商品列表 -->
      <!-- <div class="goodsdataheight" id="iddataheight">
        <goodsList v-bind:newmerchantsid='newmerchantsid' :show="false"/>
      </div>-->
  </div>
</template>

<script>
import { getGoodsList,getMerchantInfo,imgserverUrl,getServerUrl,getJssdk, getAppID ,setTitle ,getShopManagerSummary,getUserInfoByNo, listGroupByCat } from "./../../api";
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
      wechatShareOr: false,

      newmerchantsid:'',
      list: [],
      imgserverUrl: imgserverUrl,
      merchantsId: '',
      defaultImg: 'this.src="' + require('../../assets/328.png') + '"' 
    }
  },
  created () {
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
    go(){
      this.$router.go(-1)
    },
    // 判断是否为分享
    geturlcommunity(){
      // 判断是否为点击附近进来
      if(sessionStorage.getItem("clickmerchantsmemberid")){
        this.getshop(sessionStorage.getItem("clickmerchantsmemberid"))
      }else{
        // 先判断自己是否为商家
        getMerchantInfo(this.userInfo.id).then(response => {
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
      }
      

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
    getListGroupByCat (id) {
      listGroupByCat(id).then(res => {
        this.list = res.data
      })
    },
    wechatShare() {
      getJssdk().then(response => {
        this.noncestr = response.data[0].noncestr
        this.ticket = response.data[0].ticket
        this.timestamp = response.data[0].timestamp
        // 启动微信设置
        tools.settingWechat(getAppID(), this.noncestr, this.ticket, this.timestamp, () => {
          // 添加微信朋友分享
          tools.menuShareAppMessage(this.shopname || '从众链商新零售', this.introduction || '链接世界  共享未来 链接世界  愿天下没有销不出去的好产品', getServerUrl() + '/zouwei/order/index.html?community=' + this.userInfo.memberNo + '#/merchantshop', getServerUrl() + '/cccec/order/icon.jpg', () => {})
          // 添加微信朋友圈分享
          tools.menuShareTimeline(this.shopname || '从众链商新零售', getServerUrl() + '/zouwei/order/index.html?community=' + this.userInfo.memberNo + '#/merchantshop', getServerUrl() + '/zouwei/order/icon.jpg', () => {})
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
      getGoodsList('',this.newmerchantsid).then(response => {
        zhethis.goodsnumber = response.data.length;
      })
    },
    getshop(infodata) {
      let zhethis=this;
      getMerchantInfo(infodata).then(response => {
        zhethis.shopdata = response.data;
        zhethis.newmerchantsid=response.data.id;
        this.merchantsId = response.data.id
        this.getListGroupByCat(response.data.id)
        zhethis.getGoods();
        if(zhethis.shopdata==null){
          zhethis.shopname=this.userInfo.username+'的商铺';
          zhethis.logo=this.userInfo.image;
          zhethis.shoplogo='';
        }else{
          // if(zhethis.shopdata.name!=null&&zhethis.shopdata.name!=undefined&&zhethis.shopdata.name!=""){
          //     zhethis.shopname=zhethis.shopdata.name;
          // }else{
          //   zhethis.shopname=this.userInfo.username+'的商铺';
          // }
          
          // if(zhethis.shopdata.logo!=null&&zhethis.shopdata.logo!=undefined&&zhethis.shopdata.logo!=""){
          //   zhethis.logo=imgserverUrl+zhethis.shopdata.logo;
          // }else{
          //   zhethis.logo=this.userInfo.image;
          // }
          zhethis.shopname=response.data['shopName']+'的商铺';
          zhethis.logo=response.data['member.image'];
          if(zhethis.shopdata.shopImage1!=null&&zhethis.shopdata.shopImage1!=undefined&&zhethis.shopdata.shopImage1!=""){
              if( zhethis.shopdata.shopImage2 != null){
                zhethis.shoplogo=imgserverUrl+zhethis.shopdata.shopImage2;
              }else{
                zhethis.shoplogo=imgserverUrl+zhethis.shopdata.shopImage3;
              }
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
