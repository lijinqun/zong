<template>
  <div class="sign">
    <!-- 头部 -->
    <top-header title="签到"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/myself" >
        <van-icon name="arrow-left" />
      </a>
      <span>签到</span>
    </header> -->
    <!-- 内容 -->
    <div class="content">
      <van-row>
        <van-col span="12" class="signheight signlineheight rightborder">
          <span class="signnum">{{sumsign||0}}</span> 
          <span class="signsmalltxt">链豆</span>
        </van-col>
        <van-col span="12" class="signheight contentright" :class="{ activebtn: clickshow }" >
          <div @click='clicksign()'>
            <van-icon name="completed" class="contentimg"/>
            <p class="contentrighttxt" v-text="signtxt"></p>
          </div>
          <div class="ruledata" @click="$router.push('/integralRule')">链豆规则</div>
        </van-col>
      </van-row>
    </div>

    <div class="lately">链豆明细</div>
    <div class="hidetab" ref="hidetab">
        <div class="overheight">
          <div class="nonelist" v-if="info.length<1">暂无记录</div>
          <van-list v-model="loading" :finished="finished" @load="getinfo()" :offset="offsetheight">
            <ul class="recordul">
                <li v-if="info.length > 0" v-for="(item, index) in info" :key="index">
                  <div class="libox">
                    <div class="txtleft">
                      <img :src="item.otherimage" v-if="item.otherMemberId">
                      <img :src="item.memberimage" v-else>
                      <span v-if="item.otherMemberId">Id{{item.otherMemberNo}} </span>
                      <span v-else>Id{{item.memberNo}} </span>
                    </div>
                    <div class="txtright">
                      {{item.amount || 0}}
                    </div>
                  </div>
                  <div class="libox">
                    <div class="txtleft">
                      <p>{{item.name}}</p>
                      <p v-if="item.otherMemberId"> - {{item.otherMemberName}}</p>
                      <!-- <p v-else> - {{item.memberName}}</p> -->
                    </div>
                    <div class="txtright">
                      <span class="time">{{item.recordTime}}</span>
                    </div>
                  </div>
                </li>
            </ul>
          </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { pointrecordPage,isSigned,getsign,getsumsign } from "./../../api";
import { Toast, Dialog } from 'vant';
export default {
  name: 'sign',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      memberNo: '',
      info:[],
      loading: false,
      finished: false,
      offsetheight:20,
      pageNumber:1,
      pageSize:10,
      totalPage:1,
      clickshow:false,
      sumsign:0,
      signtxt:'每日签到领链豆'
    }
  },
  created () {
    let zhethis =this;
    this.info=[];
    this.getinfo();
    this.getsumsign();
    this.checkupsign();
  },
  mounted () {
    this.$refs.hidetab.style.height=document.documentElement.clientHeight-196+'px';
  },
  methods: {
    clicksign(){
      let zhethis=this;
      if(zhethis.clickshow==false){
        getsign(this.userInfo.id).then(response => {
          if(response.code==200){
            zhethis.checkupsign();
            zhethis.getinfo();
          }else{
            Dialog.alert({
              title: '温馨提示',
              message: response.message
            }).then(() => {
              // on close
            });
          }
        })
      }
      
    },
    checkupsign(){
      let zhethis=this;
      isSigned(this.userInfo.id).then(response => {
        if(response.code==200){
          if(response.data.isSigned){
            zhethis.signtxt='已签到';
          }else{
            zhethis.signtxt='每日签到领链豆';
          }
          zhethis.clickshow=response.data.isSigned;
          zhethis.getsumsign();
        }else{
          Dialog.alert({
            title: '温馨提示',
            message: response.message
          }).then(() => {
            // on close
          });
        }
      })
    },
    getsumsign(){
      let zhethis=this;
      let params={};
      params.memberId=this.userInfo.id;
      params.type='12';
      params.columns='sum(t.amount) as sumsign';
      getsumsign(params).then(response => {
        zhethis.sumsign=response.data.sumsign;
      })
    },
    getinfo(){
      this.loading = true;
      let zhethis=this;
      zhethis.info=[];
      zhethis.getDetails();
    },
    getDetails(){
      let zhethis=this;
      let params={};
      params.memberId=this.userInfo.id;
      params.type='12';
      params.orderBy='createdTime desc';
      params.columns = 'id,amount,createdTime,recordTime,memberId,name,member.memberNo as memberNo,member.image as memberimage,member.username as memberName'
      pointrecordPage(params).then(response => {
        zhethis.loading = false;
        zhethis.info = zhethis.info.concat(response.data.list);
        zhethis.pageNumber++;
        if (zhethis.info.length >= response.data.totalRow) {
          zhethis.finished = true;
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
