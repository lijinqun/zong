<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getJssdk, getAppID, getUserInfo, getServerUrl } from "./api"
import tools from './utils'
export default {
  name: 'App',
  data () {
    return {
      userId: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : '',
      userInfo: {},
      noncestr: '',
      ticket: '',
      timestamp: '',
      shaValue: '',
      full: ''
    }
  },
  mounted () {
    if (sessionStorage.getItem('user')) {
      let memberNo = ''
      getUserInfo(this.userId.openid).then(response => {
        this.userInfo = response.data
        memberNo = this.userInfo.memberNo
      })
      // getJssdk().then(response => {
      //   this.noncestr = response.data[0].noncestr
      //   this.ticket = response.data[0].ticket
      //   this.timestamp = response.data[0].timestamp
      //   // 启动微信设置
      //   tools.settingWechat(getAppID(), this.noncestr, this.ticket, this.timestamp, () => {
      //     // 添加微信朋友分享
      //     tools.menuShareAppMessage('从众链商', '链接世界  共享未来 链接世界  愿天下没有销不出去的好产品', getServerUrl() + '/zouwei/order/index.html?community=' + this.userInfo.memberNo, getServerUrl() + '/zouwei/order/icon.jpg', () => {})
      //     // 添加微信朋友圈分享
      //     tools.menuShareTimeline('从众链商', getServerUrl() + '/zouwei/order/index.html?community=' + this.userInfo.memberNo, getServerUrl() + '/zouwei/order/icon.jpg', () => {})
      //   })
      // })
    };
    
  }
}
</script>

<style lang="scss">
  html, #app {
    width: 100%;
    max-width: 100%;
  }
  body{
    overflow-x:hidden;
  }
  p {
    padding: 0;
    margin: 0;
  }
  #app {
    // overflow-y: auto;
    // overflow-x: hidden;
    // -webkit-overflow-scrolling : touch;
    height:100%;
    // background:#F2F2F2;
  }
  .van-field__error-message {
    color: blue;
    text-align: right;
  }
  html,body{
    height:100%;
  }
</style>
