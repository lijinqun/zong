<template>
  <div class="transfer-before">
    <!-- 头部 -->
    <top-header title="众付/个人转账"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/myself">
        <van-icon name="arrow-left" />
      </a>
      <span>众付/个人转账</span>
    </header> -->
    <!-- 内容 -->
    <div class="content">
      <van-notice-bar text="请核对ID号，并建议找熟人交易，谨防上当受骗！" :left-icon="require('./../../assets/8.png')" />
      <div class="memberNo-input">
        <input type="text" v-model="memberNo" placeholder="请输入正确的ID号">
        <span @click="chackMemberNo">下一步</span>
      </div>
      <ul>
        <li>
          <a href="javascript:;">
            <div class="img-box">
              <img src="./../../assets/93.png" alt="">
            </div>
            <div class="text">
              <p class="title">面对面支付</p>
            </div>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <div class="img-box">
              <img src="./../../assets/94.png" alt="">
            </div>
            <div class="text">
              <p class="title">转给我的粉丝朋友</p>
            </div>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <div class="img-box">
              <img src="./../../assets/95.png" alt="">
            </div>
            <div class="text">
              <p class="title">委托社区矿工交易</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="lately">最近</div>
    <div class="hidetab" ref="hidetab">
        <div class="overheight">
          <div class="nonelist" v-if="info.length<1">暂无记录</div>
          <van-list v-model="loading" :finished="finished" @load="getinfo()" :offset="offsetheight">
            <ul class="recordul">
                <li v-if="info.length > 0" v-for="(item, index) in info" :key="index">
                  <div class="libox">
                    <div class="txtleft">
                      <img :src="item['otherMember.image']" v-if="item.otherMemberId">
                      <img :src="item['member.image']" v-else>
                      <span v-if="item.otherMemberId">Id{{item['otherMember.memberNo']}} </span>
                      <span v-else>Id{{item['member.memberNo']}} </span>
                    </div>
                    <div class="txtright">
                      {{item.amount || 0}}
                    </div>
                  </div>
                  <div class="libox">
                    <div class="txtleft">
                      <p>{{item.name}}</p>
                      <p v-if="item['otherMember.username']"> - {{item['otherMember.username']}}</p>
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
import { getUserInfoByNo,balanceDetails,coinDetails } from "./../../api";
export default {
  name: 'transfer-before',
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
      nowtotalRow1:0,
      nowtotalRow2:0,
      getli1num:0,
      getli2num:0,
    }
  },
  created () {
    let zhethis =this;
    this.info=[];
    this.getinfo(this.$route.params.id);
    this.getphonedata();
  },
  mounted () {
    this.$refs.hidetab.style.height=document.documentElement.clientHeight-363+'px';
  },
  methods: {
    // 判断用户是否填写了手机号码
    getphonedata(){
      if(this.userInfo.mobile==null || this.userInfo.mobile=='null'||this.userInfo.mobile==undefined || this.userInfo.mobile==''){
        this.$router.push('/phone')
      }
    },
    // 根据用户memberNo，查询用户
    chackMemberNo() {
      if (this.memberNo === '') {
        alert('请输入对方ID')
      } else {
        getUserInfoByNo(this.memberNo).then(response => {
          if (response.data) {
            this.$router.push('/transfer/'+this.memberNo)
          } else {
            Toast.fail('暂无该用户信息');
          }
        })
      }
    },
    getinfo(fromid){
      this.loading = true;
      let zhethis=this;
      zhethis.getDetails();
    },
    getDetails(){
      let zhethis=this;
      let type=[3,4];
      let cointype='2,3';

      coinDetails(this.userInfo.id, this.pageNumber, this.pageSize,cointype).then(response => {
        if(zhethis.getli1num < response.data.totalRow){
          zhethis.getli1num+=parseInt(response.data.pageSize);
          zhethis.info = zhethis.info.concat(response.data.list);
        }
        zhethis.nowtotalRow1=response.data.totalRow;
        balanceDetails(zhethis.userInfo.id, zhethis.pageNumber, zhethis.pageSize,type).then(response => {
          zhethis.loading = false;
          if(zhethis.getli2num < response.data.totalRow){
            zhethis.getli2num+=parseInt(response.data.pageSize);
            zhethis.info = zhethis.info.concat(response.data.list);
          }
          zhethis.pageNumber++;
          zhethis.nowtotalRow2=response.data.totalRow;
          if (zhethis.info.length >= (parseInt(zhethis.nowtotalRow1)+parseInt(response.data.totalRow))) {
            zhethis.finished = true;
          }
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
