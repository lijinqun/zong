<template>
  <div class="self-setting">
    <!-- 头部 -->
    <top-header title="设置"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/myself">
        <van-icon name="arrow-left" />
      </a>
      <span>设置</span>
    </header> -->
    <div class="self-head">
      <div class="info-box">
        <div class="photo">
          <img :src="userInfo.image" alt="">
        </div>
        <div class="info">
          <div class="name">
            <span>{{userInfo.username}} (ID:{{userInfo.memberNo}})</span>
            <p class="idcard" v-if="userInfo.memberType === 1">普通会员</p>
            <p class="idcard" v-if="userInfo.memberType === 2">店长</p>
            <p class="idcard" v-if="userInfo.memberType === 3">商家</p>
          </div>
        </div>
      </div>
      <van-cell-group>
        <van-cell title="基本资料" is-link to="/baseInfo" />
        <van-cell title="安全设置" is-link />
        <van-cell title="设置交易密码" is-link @click="ifpassword"/>
        <van-cell title="修改交易密码" is-link to="changepaypassword"/>
        <van-cell v-show="payWechat == false " title="修改登录密码" is-link to="/changeloginpassword"/>
        <van-cell title="地址管理" is-link to="/address"/>
        <van-cell title="通用设置" is-link />
      </van-cell-group>
    </div>
    <!-- 第二部分 -->
    <div class="group-type">
      <van-cell-group>
        <van-cell title="店长设置" is-link to="/shopCenter"/>
        <van-cell title="商家设置" is-link to="/merchantCenter" />
        <van-cell title="分享链商" is-link />
      </van-cell-group>
    </div>
    <!-- 第三部分 -->
    <div class="group-type">
      <van-cell-group>
        <van-cell title="意见反馈" is-link />
        <van-cell title="使用帮助" is-link />
      </van-cell-group>
    </div>
    <van-button type="primary" bottom-action @click="exit">退出登录</van-button>
  </div>
</template>
<script>
import config from '../../config'
import {showpassword} from "./../../api";
export default {
  name: 'self-setting',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      payWechat:true
    }
  },
  methods: {
    exit() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push('/');
    },
    ifpassword(){
      // this.showAfter = true;
      let zhethis=this;
       showpassword(this.userInfo.id).then(response => {
          if(response.data&&response.data.tradePassword){
            zhethis.$router.push('/forgotpassword')
          }else{
            zhethis.$router.push('/updatepaypassword')
          }
        })
    },
  },
  created () {
    this.payWechat = config.payWechat
  },
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
