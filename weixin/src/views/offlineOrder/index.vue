<template>
  <div class="offline-order">
    <!-- 头部 -->
    <top-header title="商家线下销售"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/accountCenter">
        <van-icon name="arrow-left" />
      </a>
      <span>商家线下销售</span>
    </header> -->
    <!-- 信息表单 -->
    <div class="info-form">
      <van-cell-group>
        <van-field v-model="info.text" label="订单描述" placeholder="请填写实际购买商品清单" />
        <van-field v-model="info.point" label="订单金额" placeholder="买家实际支付的金额"/>
        <van-field v-model="money" label="平台服务费" placeholder="卖家需要支付服务费" disabled/>
        <van-field v-model="info.id" label="买家账号" placeholder="请填写买家账号ID"  @change="getToUser"/>
         <!-- :error-message="errorMsg" -->
      </van-cell-group>
      <div style="display:flex;background:#fff;font-size: .7rem;padding: .3rem .5rem;">
        <span class="remark">注：一定要确认买家账户ID,一旦转错责任自负 </span>
        <span style="color:#0000ff;flex:1;text-align:right">{{errorMsg}}</span>
      </div>
    </div>
    <!-- 发票上传 -->
    <div class="bill">
      <div class="top top-boder">
        <span class="title">上传发票凭证</span>
      </div>
      <div class="content">
        <div class="img-box">
          <img src="./../../assets/65.png" alt="">
        </div>
        <div class="r-box">
          <p class="remark"> * 请确保上传图片清晰</p>
          <a href="javascript:;">上传</a>
        </div>
      </div>
    </div>
    <!-- 确认支付 -->
    <div class="pay-page">
      <!-- <van-radio-group v-model="result">
        <van-radio name="2">
          <span>余额</span>
          <span style="color: #aaa;padding-left: 6rem;">({{userInfo.balance || 0}}元)</span>
        </van-radio>
        <van-radio name="3">
          <span>收益珠宝</span>
          <span style="color: #aaa;padding-left: 6rem;">(123个)</span>
        </van-radio>
      </van-radio-group> -->
      <van-checkbox-group v-model="result" :max="2" @change="ifcheckbox">
        <van-checkbox name="1" style="margin-bottom: 1rem" v-if="payWechat">
          <span>微信支付</span>
        </van-checkbox>
        <van-checkbox name="2" style="margin-bottom: 1rem">
          <span>余额</span>
          <span style="color: #aaa;padding-left: 1rem;">({{userInfo.balance || 0}}元)</span>
        </van-checkbox>
        <van-checkbox name="3" style="margin-bottom: 1rem">
          <span>收益珠宝</span>
          <span style="color: #aaa;padding-left: 1rem;">({{userInfo.incomeCoin || 0}}个)</span>
        </van-checkbox>
      </van-checkbox-group>
      <van-checkbox name="1" v-model="radio" disabled v-if="payWechat">不足部分微信支付</van-checkbox>
      <span class="btn" @click="rightPay">确认支付</span>
      <a href="#/beyondPay" class="warning">支付超限了，请点击这里</a>
    </div>
    <!-- 确认支付弹窗 -->
    <div class="right-pay" v-if="rightPayBox">
      <div class="box">
        <img :src="toUser.image" alt="">
        <p>{{toUser.username}}(ID：{{toUser.memberNo}})</p>
        <p class="warning">请核对客户的资料，无误后确认</p>
        <van-checkbox-group v-model="result" :max="2" @change="ifcheckbox">
          <van-checkbox name="1" style="margin-bottom: 1rem" v-if="payWechat">
            <span>微信支付</span>
          </van-checkbox>
          <van-checkbox name="2" style="margin-bottom: 1rem">
            <span>余额</span>
            <span style="color: #aaa;padding-left: 1rem;">({{result[0]=='2' ? newBalance: 0}}元)</span>
          </van-checkbox>
          <van-checkbox name="3" style="margin-bottom: 1rem">
            <span>收益珠宝</span>
            <span style="color: #aaa;padding-left: 1rem;">({{result[0]=='3' ? newIncomeCoin : 0}}个)</span>
          </van-checkbox>
        </van-checkbox-group>
        <van-checkbox name="1" v-model="radio" disabled v-if="payWechat">不足部分微信支付</van-checkbox>
        <div class="btn-box">
          <span @click="rightPayBox = false">上一步</span>
          <span v-if="openpaypassword==true" @click="ifpaypassword()">再次确认</span>
          <span v-if="openpaypassword==false" @click="sendUpgrade()">再次确认</span>
        </div>
      </div>
    </div>
    <!-- 成功支付后弹窗 -->
    <div class="success" v-if="successBox">
      <div class="top">
        <img src="./../../assets/112.png" alt="">
        <p>支付成功</p>
      </div>
      <p>您已成功销售给</p>
      <p class="info">{{toUser.username || ''}}</p>
      <p class="info">ID：{{toUser.memberNo || ''}}</p>
      <p class="info"><span>链豆：</span>{{info.point || 0}}</p>
      <span @click="successBox = false;info.point = '';">完成</span>
    </div>

    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="gopaypassword"></paypassword>
    </div>

    <loadingbox  v-show="showloading"></loadingbox>
  </div>
</template>

<script>
import { buyPoint, getUserInfo, getUserInfoByNo,getLatestPrice,showpassword } from "./../../api";
import { Toast,Dialog } from 'vant';
import paypassword from "./../paypassword";
import loadingbox from "../../components/showloading";
import config from '../../config'
export default {
  name: 'offline-order',
  components: {
    paypassword,
    loadingbox
  },
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      info: {
        id: '',
        point: '',
        text: ''
      },
      value: '',
      result: [],
      list: [
        {
          value: '0',
          label: '余额',
          num: '888元'
        },
        {
          value: '1',
          label: '收益珠宝',
          num: '123个'
        },
        {
          value: '2',
          label: '不足部分微信支付'
        }
      ],
      radio: '1',
      errorMsg: '',
      toUser: null,
      successBox: false,
      rightPayBox: false,
      zhubao:0,
      passwordbox:false,

      openpaypassword:true,//支付密码

      showloading:false,
    }
  },
  created () {
    if (this.userInfo.memberType === 1 || this.userInfo.memberType === 2) {
      this.$router.push('/customerItd')
    };
    let zhethis=this;
    getLatestPrice().then(response => {
        if (response.data) {
          zhethis.zhubao = response.data.price
        }
      })
  },
  computed: {
    money() {
      return (this.info.point / 9).toFixed(2)
    },
    newBalance() {
      if ((this.info.point / 9).toFixed(2) > this.userInfo.balance) {
        return this.userInfo.balance
      } else {
        return(this.info.point / 9).toFixed(2)
      }
    },
    newIncomeCoin() {
      if (((this.info.point / 9)/this.zhubao).toFixed(2) > this.userInfo.incomeCoin) {
        return this.userInfo.incomeCoin
      } else {
        return((this.info.point / 9)/this.zhubao).toFixed(2)
      }
    }
  },
  methods: {
    ifpassword(){
      let zhethis=this;
      if(this.result.length>0&&this.result[0]>1){
          showpassword(this.userInfo.id).then(response => {
            if(response.data&&response.data.tradePassword){
              zhethis.rightPayBox = true;
            }else{
                  Dialog.alert({
                    title: '温馨提示',
                    message: '您还没有设置交易密码，请设置交易密码'
                  }).then(() => {
                      sessionStorage.setItem('goindex','/offlineOrder');
                      zhethis.$router.push('/updatepaypassword');
                  });
                }
          })
       }else{
          this.rightPayBox = true;
       }
    },
    ifpaypassword(){
        if(this.openpaypassword==true&&this.result.length>0&&this.result[0]>1){
          this.showpasswordbox();
        }else{
          this.sendUpgrade();
        }
      },
    showpasswordbox(){
      this.rightPayBox=false;
      this.passwordbox=true;
    },
    gopaypassword(data){
      this.passwordbox=false;
      this.sendUpgrade(data);
    },
    ifcheckbox(data){
      if(data.length>1){
        this.result=[];
        this.result.push(data[1]);
      }
    },
    rightPay() {
      if (this.info.point === 0 || this.info.point === '') {
        Toast.fail("请输入订单金额");
      } else if (this.info.id === '' || this.info.id === this.userInfo.memberNo){
        Toast.fail("请输入买家账号");
      } else if(this.info.id.length === 9){
        if(this.openpaypassword){
          this.ifpassword();
        }else{
          this.rightPayBox = true;
        }
      } else {
        Toast.fail("请填写正确的买家ID");
      }
    },
    sendUpgrade (password) {
      if (this.info.point === 0 || this.info.point === '') {
        Toast.fail("请输入订单金额");
      } else if (this.info.id === '' || this.info.id === this.userInfo.memberNo){
        Toast.fail("请输入买家账号");
      } else {
        this.showloading=true;
        buyPoint(this.userInfo.id, this.info.point, this.info.id, this.result[0],password).then(response => {
          if (response.code === '200') {
            this.showloading=false;
            if (!response.data.appId) {
              this.rightPayBox = false
              this.successBox = true
              getUserInfo(this.userInfo.open_id).then(response => {
                this.info.id = ''
                this.info.text = ''
                this.userInfo = response.data
                sessionStorage.setItem('userInfo', response.data)
              })
            } else {
              let data = response.data
              console.log(response.data)
              // wx.chooseWXPay({
              //   timeStamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              //   nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              //   package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              //   signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              //   paySign: data.paySign, // 支付签名
              //   success: function (res) {
              //     alert('支付成功')
              //   }
              // });
              let that = this
              if(that.payWechat != false){
                  WeixinJSBridge.invoke('getBrandWCPayRequest', {
                      debug: true,
                      appId: data.appId,
                      timeStamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                      nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                      package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                      signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                      paySign: data.paySign, // 支付签名
                  }, function(res) {
                      if (res.err_msg == "get_brand_wcpay_request:ok") {
                        that.rightPayBox = false
                        that.successBox = true
                        getUserInfo(that.userInfo.open_id).then(response => {
                          that.info.id = ''
                          that.info.text = ''
                          that.userInfo = response.data
                          sessionStorage.setItem('userInfo', response.data)
                        })
                      } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                        Toast.fail("用户取消支付");
                      } else {
                        Toast.fail("支付失败");
                      }
                    })
              }else{
                  Toast.fail("余额不足！");
              }
              
            }
          } else {
            // alert('您好，今天的线下销售额超过2万，请明天再来。')
            this.showloading=false;
            Dialog.alert({
              title: '温馨提示',
              message: response.message
            }).then(() => {
              if(response.message.indexOf('没有设置交易密码')>0){
                this.$router.push('/updatepaypassword')
              }
            });
          }
        })
      }
    },
    getToUser() {
      if (this.info.id === '') {
        this.errorMsg = '请输入用户ID'
      } else if (this.info.id.length === 9){
        getUserInfoByNo(this.info.id).then(response => {
          if (response.data) {
            this.toUser = response.data
            this.errorMsg = response.data.username
          } else {
            this.errorMsg = '暂无该用户信息'
          }
        })
      } else {
        this.errorMsg = '请输入正确的用户ID'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
