<template>
  <div class="customer-introduce">
    <!-- 头部标题 -->
    <top-header title="会员权益"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/myself">
        <van-icon name="arrow-left" />
      </a>
      <span>会员权益</span>
    </header> -->
    <!-- 会员分类 -->
    <div class="swiper-container customer-type">
      <div class="swiper-wrapper">
        <div :class="{'active':active === index ? true : false,'page swiper-slide': true}" v-for="(item, index) in list" :key="index" @click="active = index">
          <div class="photo" v-show="index == 0 || index == 1 || index == 2 || index == 3">
            <img :src="item.img" alt="">
          </div>
          <!-- <p v-show="index == 0 || index == 1 || index == 2 || index == 3">{{ (userInfo.memberType - 1) === index ? item.activeTitle : item.title}}</p> -->
          <p v-show="index == 0 || index == 1 || index == 2 || index == 3">{{ (userInfo.memberType - 1) === index ? item.activeTitle : item.title}}</p>
        </div>
      </div>
      <!-- Add Pagination -->
      <!-- <div class="swiper-pagination"></div> -->
    </div>
      <!-- <div class="customer-type">
        
      </div> -->
    <!-- 会员简介 -->
    <div class="customer-itd">
      <div class="page" v-show="active == 0">
        <p style="font-size:14px;margin-top:10px;">升级店长您将获赠价值399元莱颜-胶原多肽修复面膜一盒（5片+原生态竹琨纤维面巾）2018年7月5日前完成发货</p>
      </div>
      <div class="page" v-show="active == 1">
        <p style="font-size:14px;margin-top:10px;">获赠价值399元莱颜-胶原多肽修复面膜一盒（5片+原生态竹琨纤维面巾）2018年7月5日前完成发货</p>
      </div>
      <div class="page">
        <h3>会员权益</h3>
        <p v-for="(item,index) in list[active].text.pageOne" :key="index" v-if="list[active].text.pageOne.length !== 0">{{index+1}}.{{item}}</p>
        <p v-if="list[active].text.pageOne.length === 0">无</p>
      </div>
      <div class="page">
        <h3>推荐奖励</h3>
        <p v-for="(item,index) in list[active].text.pageTwo" :key="index" v-if="list[active].text.pageTwo.length !== 0">{{index+1}}.{{item}}</p>
        <p v-if="list[active].text.pageTwo.length === 0">无</p>
      </div>
      <div class="page">
        <h3>分享我的小店</h3>
        <p v-for="(item,index) in list[active].text.pageThree" :key="index" v-if="list[active].text.pageThree.length !== 0">{{index+1}}.{{item}}</p>
        <p v-if="list[active].text.pageThree.length === 0">无</p>
      </div>
      <div class="page">
        <h3>开通{{active < 2 ? 'OSO商家' : list[active].title}}</h3>
        <p v-for="(item,index) in list[active].text.pageFour" :key="index" v-if="list[active].text.pageFour.length !== 0">{{index+1}}.{{item}}</p>
        <p v-if="list[active].text.pageFour.length === 0">无</p>
      </div>
      <div class="page">
        <h3>智能云柜收益</h3>
        <p v-for="(item,index) in list[active].text.pageCloud" :key="index" v-if="list[active].text.pageCloud.length !== 0">{{index+1}}.{{item}}</p>
        <p v-if="list[active].text.pageCloud.length === 0">无</p>
      </div>
      <div class="page" v-show="userInfo.memberType < 2 && active < 1">
        <router-link to="/goodsdetails/5187">购买莱颜面膜升级店长 </router-link>
      </div>
      <!-- <div class="page" v-show="userInfo.memberType < 3 && active == 2">
        <router-link to="/">开通商家资格 </router-link>
      </div> -->
      <div class="page" v-show="active == 3">
        <router-link to="/goodsdetails/4888">拥有自己的智能云柜 </router-link>
      </div>
      <!-- <div class="page" style="padding: 20px 0;min-height: 80px;">
        <van-radio-group v-model="radioType" >
          <van-radio style="margin-bottom: 1rem;width:50%;float: left;" name="1" :disabled="userInfo.memberType != 1" v-show="userInfo.memberType <= 1">店长</van-radio>
          <van-radio style="margin-bottom: 1rem;width:50%;float: left;" name="2" :disabled="userInfo.memberType != 2" v-show="userInfo.memberType <= 2">普通商家</van-radio>
          <van-radio style="margin-bottom: 1rem;width:50%;float: left;" name="3" :disabled="userInfo.memberType != 3" v-show="userInfo.memberType <= 3">银牌商家</van-radio>
          <van-radio style="margin-bottom: 1rem;width:50%;float: left;" name="4" :disabled="userInfo.memberType != 4" v-show="userInfo.memberType <= 4">金牌商家</van-radio>
          <van-radio style="margin-bottom: 1rem;width:50%;float: left;" name="5" :disabled="userInfo.memberType != 5" v-show="userInfo.memberType <= 5">钻石商家</van-radio>
        </van-radio-group>
      </div> -->
      <!-- 收货地址 -->
      <van-popup v-model="showAddress" position="bottom">
          <div class="dizhi van-hairline--bottom">确认地址</div>
          <div class="addressList">
            <div class="address" style="z-index: 100;display: flex; background:#fff;" v-if="defaultAdress!=''" @click="choseAdress('address')">
              <div>
              </div>
              <div style="flex:1;display: block;">
                  <p style="padding-left: 5px;text-align: left;margin:5px 0;">{{decodeURI(decodeURI(defaultAdress.consignee))}}
                    <span style=";padding-left: 5%;" v-text='defaultAdress.mobile'></span>
                  </p>
                  <h6 style="padding-left: 5px;text-align: left;color: #9d9d9d;margin:5px 0;">
                      {{defaultAdress['fullAddress']}}
                  </h6>
                </div>
              <span style="padding: 15px 10px 0px 10px;color: #ccc;"><img src="../../assets/rightjt2.png" style="width:8px;height:15px;display: block;"></span>
            </div>
            <div v-else='defaultAdress==""' @click="choseAdress('createAddress')" class="address" style="line-height:40px;font-size:14px;z-index: 99;padding:0 1rem;">
              <van-cell-group>
                <van-cell title="点击此处新增地址" icon="location"  is-link />
              </van-cell-group>
            </div>
            <div><img src="../../assets/7.png" style="width:100%;height:3px;display: block;margin-bottom:5px;"></div>
          </div>
          <div class="btnConfirm"><button @click="showPayBox(active)">确认</button></div>
      </van-popup>
      <!-- 收货地址 -->
      <div class="btn" @click="confirm(2)" v-if="userInfo.memberType < 2 && active < 2">
        <span>立即升级店长</span>
      </div>
      <div class="btn" @click="confirm(1)" v-if="userInfo.memberType === 2 && active >= 1">
        <span>开通普通商家资格</span>
      </div>
      <div class="btn" @click="confirm(1)" v-if="userInfo.memberType === 3 && active == 2">
        <span>开通银牌商家资格</span>
      </div>
      <div class="btn" @click="confirm(1)" v-if="userInfo.memberType === 4 && active == 2">
        <span>开通金牌商家资格</span>
      </div>
      <div class="btn" @click="confirm(1)" v-if="userInfo.memberType === 5 && active == 2">
        <span>开通钻石商家资格</span>
      </div>
      <div class="level" v-show="userInfo.memberType >= 3 && active == 2">
        <p>您当前商家等级：{{ userInfo.memberType == 3 ? '普通' : userInfo.memberType == 4 ? '银牌' : userInfo.memberType == 5 ? '金牌' : userInfo.memberType == 6 ? '钻石' : ''}}</p>
        <p :class="{decoration:userInfo.memberType >= 3}">【】普通商家</p>
        <p :class="{decoration:userInfo.memberType >= 4}">【】银牌商家</p>
        <p :class="{decoration:userInfo.memberType >= 5}">【】金牌商家</p>
        <p :class="{decoration:userInfo.memberType >= 6}">【】钻石商家</p>
      </div>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="rightPayBox" position="bottom">
      <div class="single-info">
        <div class="top-info">
          <p class="top-info-header">确认付款</p>
           <van-icon name="close" class="closebtn" @click="rightPayBox=false" />
        </div>
        <div class="content">
          <p class="title" v-if="userInfo.memberType < 3">￥{{(price).toFixed(2)}}</p>
          <p class="title" v-if="!(userInfo.memberType < 3)">￥{{(balanceAmount).toFixed(2) || 0}}</p>
          <div class="paymode">
            <van-checkbox-group v-model="result" :max="2"  @change="ifcheckbox">
              <van-checkbox name="0" style="margin-bottom: 1rem;" v-if="userInfo.memberType < 3 && payWechat">
                <span style="width:4rem;display:inline-block;">微信支付</span>
              </van-checkbox>
              <van-checkbox name="1" style="margin-bottom: 1rem" v-if="userInfo.memberType < 3 ">
                <span style="width:4rem;display:inline-block;">余额</span>
                <span style="color: #aaa;padding-left: 1rem;">({{userInfo.balance || 0}}元)</span>
              </van-checkbox>
              <van-checkbox name="2" style="margin-bottom: 1rem">
                <span style="width:4rem;display:inline-block;">收益珠宝</span>
                <span style="color: #aaa;padding-left: 1rem;">({{userInfo.incomeCoin || 0}}个)</span>
              </van-checkbox>
            </van-checkbox-group>
            <van-radio name="1" v-model="radio" disabled v-if="userInfo.memberType < 3 && payWechat ">不足部分微信支付</van-radio>
          </div>
        </div>
        <p class="paybtn" v-if="openpaypassword==false" @click="showAfter = true">确认支付</p>
        <p class="paybtn" v-if="openpaypassword==true" @click="ifpassword()">确认支付</p>
      </div>
    </van-popup>
    <van-dialog :lockScroll="false" v-model="showAfter" @confirm="ifpaybtn" @cancel="showAfter = false" :title="'确认支付'" :confirm-button-text="'确认支付'" :cancel-button-text="'取消'" :show-cancel-button="true">
    <!-- <van-dialog v-model="showAfter" @confirm="gopay" @cancel="showAfter = false" :title="'确认支付'" :confirm-button-text="'确认支付'" :cancel-button-text="'取消'" :show-cancel-button="true"> -->
      <div style="width:80%; margin: 0 auto; padding: 1rem 0;">
        <van-checkbox-group v-model="result" :max="2">
          <van-checkbox name="0" style="margin-bottom: 1rem" disabled v-if="userInfo.memberType < 3 && payWechat">
            <span style="width:4rem;display:inline-block;">微信支付</span>
          </van-checkbox>
          <van-checkbox name="1" style="margin-bottom: 1rem" disabled v-if="userInfo.memberType < 3 ">
            <span style="width:4rem;display:inline-block;">余额</span>
            <span style="color: #aaa;padding-left: 1rem;">({{result[0] === '1' ? ((price)).toFixed(2) > userInfo.balance ? userInfo.balance : ((price)).toFixed(2) : 0}}元)</span>
          </van-checkbox>
          <van-checkbox name="2" style="margin-bottom: 1rem" disabled>
            <span style="width:4rem;display:inline-block;">收益珠宝</span>
            <span style="color: #aaa;padding-left: 1rem;">({{result[0] === '2' ? coinAmount > userInfo.incomeCoin ? userInfo.incomeCoin.toFixed(2) : coinAmount.toFixed(2) : 0}}个)</span>
          </van-checkbox>
        </van-checkbox-group>
        <van-radio name="1" v-model="radio" disabled v-if="userInfo.memberType < 3 && payWechat ">不足部分微信支付</van-radio>
      </div>
    </van-dialog>
    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="gopaypassword"></paypassword>
    </div>
  </div>
</template>

<script>
import { upgrade, getUserInfo, showpassword, getLatestPrice, getUpgradeAmount,getaddress} from "./../../api";
import tools from "./../../utils";
import paypassword from "./../paypassword";
import { Toast, Dialog } from 'vant';
export default {
  name: 'customerIntroduce',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      list: [
        {
          title: '会员',
          activeTitle: '您当前为普通会员',
          price: 138,
          btn: '立即升级',
          img: require('./../../assets/126.png'),
          text: {
            pageOne: ['消费者获得链豆奖励', '收益珠宝自由置换', '享受公平的商城政策'],
            pageTwo: [],
            pageThree: [],
            pageFour: [],
            pageCloud:[]
          }
        },
        {
          title: '店长',
          activeTitle: '您当前为店长',
          price: 138,
          btn: '立即升级店长',
          img: require('./../../assets/125.png'),
          text: {
            pageOne: ['消费获赠链豆', '收益珠宝自由置换', '享受公平的商城政策'],
            pageTwo: ['推荐店长获赠180链豆', '推荐商家获赠60余额', '推荐会员消费获赠4%链豆','推荐商家平台服务费获赠4%链豆','加入星级店长计划'],
            pageThree: ['拥有推广二维码/海报', '拥有共享供应链的网络小店'],
            pageFour: [],
            pageCloud:[]
          }
        },
        {
          title: '商家',
          activeTitle: '您当前为普通商家',
          price: 999,
          btn: '立即开通普通商家',
          img: require('./../../assets/127.png'),
          text: {
            pageOne: ['消费获赠链豆', '收益珠宝自由置换', '享受公平的商城政策'],
            pageTwo: ['推荐店长获赠180链豆', '推荐商家获赠60余额', '推荐会员消费获赠4%链豆','推荐商家平台服务费获赠4%链豆','加入星级店长计划'],
            pageThree: ['拥有推广二维码/海报', '拥有共享供应链的网络小店'],
            pageFour: ['实现实体店线上线下互联销售，获得同城线上订单/二维码当面付/线下销售','获得链商信用（9月）开通资格'],
            pageCloud:[]
          }
        },
        {
          title: '柜主',
          activeTitle: '柜主',
          price: 999,
          btn: '立即开通普通商家',
          img: require('./../../assets/497.png'),
          text: {
            pageOne: ['消费获赠链豆', '收益珠宝自由置换', '享受公平的商城政策'],
            pageTwo: ['推荐店长获赠180链豆', '推荐商家获赠60余额', '推荐会员消费获赠4%链豆','推荐商家平台服务费获赠4%链豆','加入星级店长计划'],
            pageThree: ['拥有推广二维码/海报', '拥有共享供应链的网络小店'],
            pageFour: ['实现实体店线上线下互联销售，获得同城线上订单/二维码当面付/线下销售','获得链商信用（9月）开通资格'],
            pageCloud:['拥有自己的共享智能云柜，拥有专属付款二维码，锁定流量入口','获得云柜销售额5%收益','获得云柜广告额20%收益（2019年）']
          }
        }
        // {
        //   title: '银牌商家',
        //   activeTitle: '您当前为银牌商家',
        //   price: 4999,
        //   btn: '立即开通银牌商家',
        //   img: require('./../../assets/128.png'),
        //   text: {
        //     pageOne: ['消费获赠链豆', '收益珠宝自由置换', '享受公平的商城政策'],
        //     pageTwo: ['推荐店长获赠180链豆', '推荐商家获赠60余额', '推荐会员消费获赠4%链豆','推荐商家平台服务费获赠4%链豆','加入星级店长计划'],
        //     pageThree: ['拥有推广二维码/海报', '拥有共享供应链的网络小店'],
        //     pageFour: ['实现实体店线上线下互联销售，获得同城线上订单/二维码当面付/线下销售','获得链商信用（9月）开通资格'],
        //     pageCloud:[]
        //   },
        // },
        // {
        //   title: '金牌商家',
        //   activeTitle: '您当前为金牌商家',
        //   price: 9999,
        //   btn: '立即开通商家',
        //   img: require('./../../assets/130.png'),
        //   text: {
        //     pageOne: ['消费获赠链豆', '收益珠宝自由置换', '享受公平的商城政策'],
        //     pageTwo: ['推荐店长获赠180链豆', '推荐商家获赠60余额', '推荐会员消费获赠4%链豆','推荐商家平台服务费获赠4%链豆','加入星级店长计划'],
        //     pageThree: ['拥有推广二维码/海报', '拥有共享供应链的网络小店'],
        //     pageFour: ['实现实体店线上线下互联销售，获得同城线上订单/二维码当面付/线下销售','获得链商信用（9月）开通资格'],
        //     pageCloud:[]
        //   },
        // },
        // {
        //   title: '钻石商家',
        //   activeTitle: '您当前为钻石商家',
        //   price: 0,
        //   btn: '立即开通钻石商家',
        //   img: require('./../../assets/129.png'),
        //   text: {
        //     pageOne: ['消费获赠链豆', '收益珠宝自由置换', '享受公平的商城政策'],
        //     pageTwo: ['推荐店长获赠180链豆', '推荐商家获赠60余额', '推荐会员消费获赠4%链豆','推荐商家平台服务费获赠4%链豆','加入星级店长计划'],
        //     pageThree: ['拥有推广二维码/海报', '拥有共享供应链的网络小店'],
        //     pageFour: ['实现实体店线上线下互联销售，获得同城线上订单/二维码当面付/线下销售','获得链商信用（9月）开通资格'],
        //     pageCloud:[]
        //   },
        // }
      ],
      active: 0,
      rightPayBox: false,
      result: [],
      type: null,
      price: 0,
      openpaypassword: true,
      radio: '1',
      zhubao: 0,
      showAfter: false,
      tradePassword: '',
      swiper: null,
      coinAmount: 0,
      balanceAmount: 0,
      passwordbox:false,
      radioType:'',
      defaultAdress:[],
      showAddress:false,
      addressId:0
    }
  },
  created () {
    this.radioType = this.userInfo.memberType.toString()
    this.$nextTick(() => {
      if( this.userInfo.memberType <= 3 ){
        this.active = this.userInfo.memberType -1
      }else{
        this.active = 2
      }

    })
    getLatestPrice().then(response => {
      if (response.data) {
        this.zhubao = response.data.price;
      }
    })
    this.getaddresslist()
    // 不同的商家显示不同的优惠条件
    this.according()
    
  },
  mounted () {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  },
  methods: {
    according(){
      // 不同的商家显示不同的优惠条件
      if( this.userInfo.memberType == 4 ){
        this.list[2] =  {
            title: '银牌商家',
            activeTitle: '您当前为银牌商家',
            price: 4999,
            btn: '立即开通银牌商家',
            img: require('./../../assets/128.png'),
            text: {
              pageOne: ['消费获赠链豆', '收益珠宝自由置换', '享受公平的商城政策'],
              pageTwo: ['推荐店长获赠180链豆', '推荐商家获赠60余额', '推荐会员消费获赠4%链豆','推荐商家平台服务费获赠4%链豆','加入星级店长计划'],
              pageThree: ['拥有推广二维码/海报', '拥有共享供应链的网络小店'],
              pageFour: ['实现实体店线上线下互联销售，获得同城线上订单/二维码当面付/线下销售','获得链商信用（9月）开通资格'],
              pageCloud:[]
            },
          }
      }else if(this.userInfo.memberType == 5){
        this.list[2] = {
            title: '金牌商家',
            activeTitle: '您当前为金牌商家',
            price: 9999,
            btn: '立即开通商家',
            img: require('./../../assets/130.png'),
            text: {
              pageOne: ['消费获赠链豆', '收益珠宝自由置换', '享受公平的商城政策'],
              pageTwo: ['推荐店长获赠180链豆', '推荐商家获赠60余额', '推荐会员消费获赠4%链豆','推荐商家平台服务费获赠4%链豆','加入星级店长计划'],
              pageThree: ['拥有推广二维码/海报', '拥有共享供应链的网络小店'],
              pageFour: ['实现实体店线上线下互联销售，获得同城线上订单/二维码当面付/线下销售','获得链商信用（9月）开通资格'],
              pageCloud:[]
            },
          }
      }else if(this.userInfo.memberType == 6){
        this.list[2] = {
            title: '钻石商家',
            activeTitle: '您当前为钻石商家',
            price: 0,
            btn: '立即开通钻石商家',
            img: require('./../../assets/129.png'),
            text: {
              pageOne: ['消费获赠链豆', '收益珠宝自由置换', '享受公平的商城政策'],
              pageTwo: ['推荐店长获赠180链豆', '推荐商家获赠60余额', '推荐会员消费获赠4%链豆','推荐商家平台服务费获赠4%链豆','加入星级店长计划'],
              pageThree: ['拥有推广二维码/海报', '拥有共享供应链的网络小店'],
              pageFour: ['实现实体店线上线下互联销售，获得同城线上订单/二维码当面付/线下销售','获得链商信用（9月）开通资格'],
              pageCloud:[]
            },
          }
      }
      this.$forceUpdate()
    },
    confirm(id){
      if( id == 2){
          this.showAddress = true
      }else{
        this.showPayBox(this.active)
      }
    },
    choseAdress(){
      this.$router.push("/address")
    },
    // 获取收货地址
    getaddresslist() {
      let zhethis=this;
      this.defaultAdress=[];
      getaddress(this.userInfo.id).then(response => {
        let addressdata = response.data;
        for (var i = 0; i < addressdata.length; i++) {
          if(addressdata[i].defaultCheck){
            zhethis.defaultAdress=addressdata[i];
            this.addressId = addressdata[i].id
          }
        }
        console.log(zhethis.defaultAdress)
      })
    },
    showpasswordbox(){
      if(this.result.length>0&&this.result[0]>0){
        this.rightPayBox = false
        this.show=false;
        this.passwordbox=true;
      }else{
        this.sendUpgrade(this.type)
      }
    },
    ifpaybtn(){
      if (this.coinAmount > this.userInfo.incomeCoin && this.result[0] === '2') {
        alert('余额不足，无法支付。')
        return
      }
      if(this.openpaypassword){
        this.showpasswordbox();
      }else{
        this.sendUpgrade(this.type)
      }
    },
    gopaypassword(data){
      // console.log(data)
      this.passwordbox=false;
      this.tradePassword = data
      this.sendUpgrade(this.type)
      // this.gopay(data);
      this.showloading=true;
    },
    ifpassword(){
      // this.showAfter = true;
      let zhethis=this;
      if(this.result[0]>0){
       showpassword(this.userInfo.id).then(response => {
          if(response.data&&response.data.tradePassword){
            
            zhethis.showAfter = true;
          }else{
            Dialog.alert({
              title: '温馨提示',
              message: '您还没有设置交易密码，请设置交易密码'
            }).then(() => {
                sessionStorage.setItem('goindex','/customerItd');
                this.$router.push('/updatepaypassword');
            });
            zhethis.$router.push('/updatepaypassword')
          }
        })
      }else{
        // getUpgradeAmount(this.userInfo.id, this.userInfo.memberType + 1).then(res => {
        //   this.coinAmount = res.data.coinAmount
        //   this.balanceAmount = res.data.balanceAmount
          this.showAfter = true;
        // })
      }
    },
    ifcheckbox(data){
      if(data.length>1){
        this.result=[];
        this.result.push(data[1]);
      }
    },
    showPayBox (active) {
      if( active == 0 ){
        if(this.defaultAdress=='' || this.defaultAdress['fullAddress'] == null || this.defaultAdress['fullAddress'] == '' ){
        Dialog.alert({
          title: '温馨提示',
          message: '请补充完整收货地址'
        }).then(() => {
          // on close
        });
        return 
      }
      }
      getUpgradeAmount(this.userInfo.id, this.userInfo.memberType + 1).then(res => {
        this.coinAmount = res.data.coinAmount;
        this.balanceAmount = res.data.balanceAmount;
        if( this.userInfo.memberType < 3){
          this.price = this.list[this.userInfo.memberType-1].price
        }
        this.type = this.userInfo.memberType + 1
        this.rightPayBox = true
        this.showAddress = false
      })
    },
    sendUpgrade (type) {
      let _type = 1
      const mamberType = type
      const _that = this
      if (this.result[0] === '0') {
        _type = 1
      } else if (this.result[0] === '1') {
        _type = 2
      } else if (this.result[0] === '2') {
        _type = 3
      } else if (this.result[0] === '3') {
        _type = 4
      }
      // upgrade(this.userInfo.id, mamberType, _type, this.tradePassword).then(response => {

      // })
      // if (this.result[0] !== '0') {
        let _this = this;
        if( mamberType == 2){
            getaddress(this.userInfo.id).then(response => {
            let addressdata = response.data;
            for (var i = 0; i < addressdata.length; i++) {
              if(addressdata[i].defaultCheck){
                  upgrade(this.userInfo.id, mamberType, _type, this.tradePassword,addressdata[i].id).then(response => {
                    if(response.code=="200" && response.data.appId){
                      if(_this.payWechat != false){
                          tools.wechatPay(response.data.appId, response.data.timeStamp, response.data.nonceStr, response.data.package, response.data.signType, response.data.paySign, (res) => {
                            if (res.err_msg === 'get_brand_wcpay_request:ok') {
                              this.showAfter = false
                              Toast.success('支付成功!');
                              getUserInfo(this.userInfo.open_id).then(response => {
                                this.userInfo = response.data
                                sessionStorage.setItem('userInfo', JSON.stringify(response.data))
                                this.according()
                              })
                              // zhethis.$router.push("/orderList/2");
                            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                              this.showAfter = false
                              Toast.fail('用户取消支付!');
                              // zhethis.$router.push("/orderList/0");
                            } else {
                              this.showAfter = false
                              Toast.fail('支付失败!');
                                  // zhethis.$router.push("/orderList/0");
                            }
                          })
                      }else{
                        Toast.fail("余额不足！");
                      }
                    }else{
                      if(response.code=="200" && (response.data.appId==undefined||response.data.appId==null||response.data.appId=="")){
                        this.showAfter = false
                        Toast.success('支付成功!');
                        getUserInfo(this.userInfo.open_id).then(response => {
                          this.userInfo = response.data
                          sessionStorage.setItem('userInfo', JSON.stringify(response.data))
                          this.according()
                        })
                        // zhethis.$router.push("/orderList/2");
                      } else {
                        this.showAfter = false
                        Toast.fail('支付失败!');
                      }
                    }
                  })
              }
            }
          })
        }else{
          upgrade(this.userInfo.id, mamberType, _type, this.tradePassword).then(response => {
            if(response.code=="200" && response.data.appId){
              if(_this.payWechat != false){
                  tools.wechatPay(response.data.appId, response.data.timeStamp, response.data.nonceStr, response.data.package, response.data.signType, response.data.paySign, (res) => {
                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                      this.showAfter = false
                      Toast.success('支付成功!');
                      getUserInfo(this.userInfo.open_id).then(response => {
                        this.userInfo = response.data
                        sessionStorage.setItem('userInfo', JSON.stringify(response.data))
                        this.according()
                      })
                      // zhethis.$router.push("/orderList/2");
                    } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                      this.showAfter = false
                      Toast.fail('用户取消支付!');
                      // zhethis.$router.push("/orderList/0");
                    } else {
                      this.showAfter = false
                      Toast.fail('支付失败!');
                          // zhethis.$router.push("/orderList/0");
                    }
                  })
              }else{
                Toast.fail("余额不足！");
              }
            }else{
              if(response.code=="200" && (response.data.appId==undefined||response.data.appId==null||response.data.appId=="")){
                this.showAfter = false
                Toast.success('支付成功!');
                getUserInfo(this.userInfo.open_id).then(response => {
                  this.userInfo = response.data
                  sessionStorage.setItem('userInfo', JSON.stringify(response.data))
                  this.according()
                })
                // zhethis.$router.push("/orderList/2");
              } else {
                this.showAfter = false
                Toast.fail('支付失败!');
              }
            }
          })
        }
        

        // upgrade(this.userInfo.id, mamberType, _type, this.tradePassword).then(response => {
        //   if(response.code=="200" && response.data.appId){
        //     if(_this.payWechat != false){
        //         tools.wechatPay(response.data.appId, response.data.timeStamp, response.data.nonceStr, response.data.package, response.data.signType, response.data.paySign, (res) => {
        //           if (res.err_msg === 'get_brand_wcpay_request:ok') {
        //             this.showAfter = false
        //             Toast.success('支付成功!');
        //             getUserInfo(this.userInfo.open_id).then(response => {
        //               this.userInfo = response.data
        //               sessionStorage.setItem('userInfo', JSON.stringify(response.data))
        //             })
        //             // zhethis.$router.push("/orderList/2");
        //           } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
        //             this.showAfter = false
        //             Toast.fail('用户取消支付!');
        //             // zhethis.$router.push("/orderList/0");
        //           } else {
        //             this.showAfter = false
        //             Toast.fail('支付失败!');
        //                 // zhethis.$router.push("/orderList/0");
        //           }
        //         })
        //     }else{
        //       Toast.fail("余额不足！");
        //     }
        //   }else{
        //     if(response.code=="200" && (response.data.appId==undefined||response.data.appId==null||response.data.appId=="")){
        //       this.showAfter = false
        //       Toast.success('支付成功!');
        //       getUserInfo(this.userInfo.open_id).then(response => {
        //         this.userInfo = response.data
        //         sessionStorage.setItem('userInfo', JSON.stringify(response.data))
        //       })
        //       // zhethis.$router.push("/orderList/2");
        //     } else {
        //       this.showAfter = false
        //       Toast.fail('支付失败!');
        //     }
        //   }
        // })
      // } else {

      // }
      
    }
  },
  components: {
    paypassword
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
