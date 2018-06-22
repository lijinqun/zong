<template>
  <div class="notice-list">
    <!-- 头部 -->
    <top-header :title="headertxt"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>公告</span>
    </header> -->
    <div class="noticecss">
      <!-- <p class="itemauthor">By:{{noticedata.author}}</p> -->
      <!-- <p class="itemtitle2" v-if="(noticedata.title).length<16">{{noticedata.title}}</p>
      <p class="itemtitle" v-else>{{noticedata.title}}</p> -->
      <p class="itemtitle2">{{noticedata.title}}</p>
      <div class="itemhtmlcss" v-html="noticedata.content"></div>
      <p class="itemday">{{noticedata.updatedTime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作者:{{noticedata.author}}</p>
    </div>
  </div>
</template>

<script>
import { getnoticetxt, getServerUrl, getJssdk, getAppID } from "./../../api";
import tools from './../../utils'
export default {
  name: 'notice-list',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      noticedata:'',
      headertxt:''
    }
  },
  created () {
    let zhethis = this;
    getJssdk().then(res => {     
      zhethis.noncestr = res.data[0].noncestr
      zhethis.ticket = res.data[0].ticket
      zhethis.timestamp = res.data[0].timestamp
      // 启动微信设置
      tools.settingWechat(getAppID(), zhethis.noncestr, zhethis.ticket, zhethis.timestamp, () => {
        // 添加微信朋友分享
        tools.menuShareAppMessage( zhethis.noticedata.title || '从众链商新零售', zhethis.noticedata.subhead || zhethis.noticedata.title , getServerUrl() + '/zouwei/order/index.html?community=' + zhethis.userInfo.memberNo + `#/newsnoticeDetails/${zhethis.$route.params.id}`, zhethis.noticedata.icon ? getServerUrl() + `/chuangshi${zhethis.noticedata.icon}` : getServerUrl() + '/zouwei/order/icon.jpg', () => {})
        // 添加微信朋友圈分享
        tools.menuShareTimeline(zhethis.noticedata.title || '从众链商新零售', getServerUrl() + '/zouwei/order/index.html?community=' + zhethis.userInfo.memberNo + `#/newsnoticeDetails/${zhethis.$route.params.id}`, zhethis.noticedata.icon ? getServerUrl() + `/chuangshi${zhethis.noticedata.icon}` : getServerUrl() + '/zouwei/order/icon.jpg', () => {})
      })
    })
    this.getnoticelist();
    this.headertxt = sessionStorage.getItem('headertxt')
  },
  methods: {
    getnoticelist() {
      let zhethis=this;
      let params={};
      params.id=this.$route.params.id;
      getnoticetxt(params).then(response => {
          zhethis.noticedata=response.data;
          //
        zhethis.$nextTick(() => {
            getJssdk().then(res => {
              zhethis.noncestr = res.data[0].noncestr
              zhethis.ticket = res.data[0].ticket
              zhethis.timestamp = res.data[0].timestamp
              // 启动微信设置
              tools.settingWechat(getAppID(), zhethis.noncestr, zhethis.ticket, zhethis.timestamp, () => {
                // 添加微信朋友分享
                tools.menuShareAppMessage( zhethis.noticedata.title || '从众链商新零售', zhethis.noticedata.subhead || zhethis.noticedata.title , getServerUrl() + '/zouwei/order/index.html?community=' + zhethis.userInfo.memberNo + `#/newsnoticeDetails/${zhethis.$route.params.id}`, zhethis.noticedata.icon ? getServerUrl() + `/chuangshi${zhethis.noticedata.icon}` : getServerUrl() + '/zouwei/order/icon.jpg', () => {})
                // 添加微信朋友圈分享
                tools.menuShareTimeline(zhethis.noticedata.title || '从众链商新零售', getServerUrl() + '/zouwei/order/index.html?community=' + zhethis.userInfo.memberNo + `#/newsnoticeDetails/${zhethis.$route.params.id}`, zhethis.noticedata.icon ? getServerUrl() + `/chuangshi${zhethis.noticedata.icon}` : getServerUrl() + '/zouwei/order/icon.jpg', () => {})
              })
            })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
