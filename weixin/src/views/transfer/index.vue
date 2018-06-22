<template>
  <div class="transfer">
    <!-- 头部 -->
    <top-header title="支付/个人转账"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/myself">
        <van-icon name="arrow-left" />
      </a>
      <span>支付/个人转账</span>
    </header> -->
    <!-- 内容 -->
    <div class="info">
      <div class="img-box">
        <img :src="toUser.image" alt="">
      </div>
      <p>{{toUser.username}}</p>
      <p>电话：{{toUser.mobile}}</p>
    </div>
    <div class="number-box">
      <van-checkbox-group v-model="result" :max="2" @change="ifcheckbox">
        <van-checkbox name="1">
          余额转账
          <span style="color: #aaa;padding-left: 1rem;">({{userInfo.balance || 0}}元)</span>
        </van-checkbox>
        <input type="text" v-model="yue" placeholder="请输入转账金额">
        <van-checkbox name="2">
          收益珠宝转账
          <span style="color: #aaa;padding-left: 1rem;">({{userInfo.incomeCoin.toFixed(3) || 0}}个)</span>
        </van-checkbox>
        <input type="text" v-model="zhubao" placeholder="请输入转账数量">
      </van-checkbox-group>
    </div>
    <button class="subtn" @click="rightPay">确认支付</button>
    <p class="remark">*以上两种转账方式可同时或单独使用</p>
    <!-- 确认支付弹窗 -->
    <div class="right-pay" v-if="rightPayBox">
      <div class="box">
        <img :src="toUser.image" alt="">
        <p>{{toUser.username}}(ID：{{toUser.memberNo}})</p>
        <p class="warning">请核对客户的资料，无误后确认</p>
        <van-checkbox-group v-model="result" :max="2" @change="ifcheckbox">
          <van-checkbox name="1" style="margin-bottom: 1rem">
            <span>余额</span>
            <span style="color: #aaa;padding-left: 4rem;">({{yue || 0}}元)</span>
          </van-checkbox>
          <van-checkbox name="2" disabled style="margin-bottom: 1rem">
            <span>收益珠宝</span>
            <span style="color: #aaa;padding-left: 4rem;">({{zhubao || 0}}个)</span>
          </van-checkbox>
        </van-checkbox-group>
        <div class="btn-box">
          <span @click="rightPayBox = false">上一步</span>
          <span v-if="openpaypassword==true" @click="showpasswordbox()">再次确认</span>
          <span v-if="openpaypassword==false" @click="toPay()">再次确认</span>
        </div>
      </div>
    </div>
    <div class="success" v-if="successBox">
      <div class="top">
        <img src="./../../assets/112.png" alt="">
        <p>支付成功</p>
      </div>
      <p>您已成功转账给</p>
      <p class="info">{{toUser.username || ''}}</p>
      <p class="info"><span>余额：</span>{{yue || 0}}元</p>
      <p class="info"><span>珠宝：</span>{{zhubao || 0}}</p>
      <span @click="successBox = false;yue=0;zhubao=0;turnRouter()">完成</span>
    </div>

    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="gopaypassword" :child-msg="show"></paypassword>
    </div>

    <loadingbox  v-show="showloading"></loadingbox>
  </div>
</template>

<script>
import { Toast,Dialog } from 'vant';
import paypassword from "./../paypassword";
import loadingbox from "../../components/showloading";
import { balanceTransfer, coinTransfer, getUserInfoByNo, getUserInfo,showpassword } from "./../../api";
export default {
  name: 'transfer',
  components: {
    paypassword,
    loadingbox
  },
  data () {
    return {
      result: [],
      yue:'',
      zhubao: '',
      toUser: {},
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      successBox: false,
      rightPayBox: false,
      passwordbox:false,

      openpaypassword:true,//支付密码

      showloading:false,
      show:false
    }
  },
  created () {
    getUserInfoByNo(this.$route.params.toId).then(response => {
      this.toUser = response.data
    })
  },
  methods: {
    ifpassword(){
      let zhethis=this;
      let toId = zhethis.$route.params.toId
     showpassword(this.userInfo.id).then(response => {
        if(response.data&&response.data.tradePassword){
          zhethis.rightPayBox = true;
        }else{
              Dialog.alert({
                title: '温馨提示',
                message: '您还没有设置交易密码，请设置交易密码'
              }).then(() => {
                  sessionStorage.setItem('goindex','/transfer/'+ toId);
                  zhethis.$router.push('/updatepaypassword');
              });
              zhethis.$router.push('/updatepaypassword');
            }
      })
    },
    rightPay() {
      if (this.toUser.memberNo!=this.userInfo.memberNo) {
        if (this.result.length === 1) {
          if (this.result[0]==='1') {
              if(this.yue%100 !== 0){
                Toast.fail('转账金额必须是100的整倍数');
                return
              }
            // 保存转账金额
            sessionStorage.setItem("yue",this.yue);
            if(sessionStorage.getItem("zhubao")){
              sessionStorage.removeItem("zhubao")
            }
            if (this.yue <= this.userInfo.balance && this.yue > 0) {
              if(this.openpaypassword){
                this.ifpassword();
              }else{
                this.rightPayBox = true
              }
            } else {
              Toast.fail('请输入正确的转账金额');
            }
          } else {
            if(this.zhubao%100 !== 0){
              Toast.fail('转账数目必须是100的整倍数');
              return
            }
            sessionStorage.setItem("zhubao",this.zhubao);
            if(sessionStorage.getItem("yue")){
              sessionStorage.removeItem("yue")
            }


            if (this.zhubao <= this.userInfo.incomeCoin && this.zhubao > 0) {
              if(this.openpaypassword){
                this.ifpassword();
              }else{
                this.rightPayBox = true
              }
            } else {
              Toast.fail('请输入正确的转账金额');
            }
          }
        } else if (this.result.length === 2) {
          if (this.yue <= this.userInfo.balance && this.yue > 0) {
            if(this.openpaypassword){
                this.ifpassword();
              }else{
                this.rightPayBox = true
              }
          } else {
            Toast.fail('请输入正确的转账金额');
          }
          if (this.zhubao <= this.userInfo.incomeCoin && this.zhubao > 0) {
            if(this.openpaypassword){
                this.ifpassword();
              }else{
                this.rightPayBox = true
              }
          } else {
            Toast.fail('请输入正确的转账金额');
          }
        }
      }else {
        Toast.fail('不能给自己转账，请重新输入');
      }
    },
    showpasswordbox(){
      this.rightPayBox=false;
      this.passwordbox=true;
      this.show = true;
    },
    gopaypassword(data){
      this.passwordbox=false;
      this.toPay(data);
    },
    toPay(password) {
      this.showloading=true;
      // 输入密码之后不显示余额 以及支付金额四个字
      this.show = false;
      if (this.result.length === 1) {
        if (this.result[0]==='1') {
          if (this.yue <= this.userInfo.balance && this.yue > 0) {
            balanceTransfer(this.userInfo.id, this.$route.params.toId, this.yue,password).then(response => {
              if(response.code=='200'){
                getUserInfo(this.userInfo.open_id).then(res => {
                  this.showloading=false;
                  if(res.code==200){
                    this.userInfo = res.data
                    sessionStorage.setItem('userInfo', res.data)
                    Toast.success('转账成功');
                    this.rightPayBox = false
                    this.successBox = true
                  }else{
                    Toast.fail(res.message);
                  }
                })
              }else{
                console.log(1111111)
                this.showloading=false;
                Dialog.alert({
                  title: '温馨提示',
                  message: response.message
                }).then(() => {
                  if(response.message.indexOf('没有设置交易密码')>0){
                    sessionStorage.setItem('goindex','/transfer/'+this.$route.params.toId);
                    this.$router.push('/updatepaypassword')
                  }
                });
              }
            })
          } else {
            this.showloading=false;
            Toast.fail('请输入正确的转账金额');
          }
        } else {
          if (this.zhubao <= this.userInfo.incomeCoin && this.zhubao > 0) {
            coinTransfer(this.userInfo.id, this.$route.params.toId, this.zhubao,password).then(response => {
              if(response.code=='200'){
                getUserInfo(this.userInfo.open_id).then(res => {
                  this.showloading=false;
                  if(res.code==200){
                    this.userInfo = res.data
                    sessionStorage.setItem('userInfo', res.data)
                    Toast.success('转账成功');
                    this.rightPayBox = false
                    this.successBox = true
                  }else{
                    Toast.fail(res.message);
                  }
                })
              }else{
                this.showloading=false;
                Dialog.alert({
                  title: '温馨提示',
                  message: response.message
                }).then(() => {
                  if(response.message.indexOf('没有设置交易密码')>0){
                    sessionStorage.setItem('goindex','/transfer/'+this.$route.params.toId);
                    this.$router.push('/updatepaypassword')
                  }
                });
              }
            })
          } else {
            this.showloading=false;
            Toast.fail('请输入正确的转账金额');
          }
        }
      }
    },
    turnRouter() {
      this.$router.push('/accountCenter')
    },
    ifcheckbox(data){
      if(data.length>1){
        this.result=[];
        this.result.push(data[1]);
      }
    },
  }
}
</script>

<style lang="scss" scpoed>
  @import './index.scss';
</style>
