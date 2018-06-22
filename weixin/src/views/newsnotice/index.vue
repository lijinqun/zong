<template>
  <div class="notice-list">
    <!-- 头部 -->
    <top-header :title="headertxt"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>{{headertxt}}</span>
    </header> -->
    <ul class="noticecss">
      <li v-for="item in noticedata" @click="godetails(item.id)">
        <van-row>
          <!-- <van-col span="18"> -->
          <van-col span="24">
            <p class="itemtitle">{{item.title}}</p>
            <p class="itemday">{{item.updatedTime}}</p>
          </van-col>
          <!-- <van-col span="6">
            <img class="itemimg" src="./../../assets/116.png">
          </van-col> -->
        </van-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { getnoticedata ,getarticlesort} from "./../../api";
import tools from './../../utils'
export default {
  name: 'notice-list',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      noticedata:[],
      headertxt:'公告',
    }
  },
  created () {
    this.getheadertxt();
    this.getnoticelist();
    
  },
  methods: {
    getheadertxt(){
      let zhethis=this;
      getarticlesort().then(response => {
        let thisdata=response.data;
        for (var i = 0; i < thisdata.length; i++) {
          if(zhethis.$route.params.id==response.data[i].id){
            zhethis.headertxt=response.data[i].name;
            sessionStorage.setItem('headertxt',zhethis.headertxt)
          }
        }
      })
    },
    getnoticelist() {
      let zhethis=this;
      let params={};
      params.status='1';
      params.sortId=this.$route.params.id;
      params.orderBy='updatedTime desc';
      getnoticedata(params).then(response => {
          zhethis.noticedata=response.data;
      })
    },
    godetails(itemid){
      this.$router.push('/newsnoticeDetails/' + itemid);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
