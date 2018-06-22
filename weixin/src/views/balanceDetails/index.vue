<template>
  <div class="sweep-history">
      <!-- 头部 -->
    <top-header :title="titel[$route.params.id - 1]">
    </top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>{{titel[$route.params.id - 1]}}</span>
    </header> -->

    <div class="hidetab" ref="hidetab">
        <div class="overheight">
          <div class="nonelist" v-if="info.length<1">暂无记录</div>
          <van-list v-model="loading" :finished="finished" @load="getinfo($route.params.id)" :offset="offsetheight">
            <ul>
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
                      <p v-if="moneydata==1">提现  - </p>
                      <p v-if="item.otherMemberId"> - {{item.otherMemberName}}</p>
                      <!-- <p v-else> - {{item.memberName}}</p> -->
                      <p v-if="moneydata==1" class="redtxt"> {{item.status=='0'?'审核中':item.status=='1'?'成功提现':item.status=='2'?'提现失败':''}}</p>
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
import { balanceDetails,getbalancerecord } from "./../../api";
export default {
  name: 'sweep-history',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      info: [
        {
          otherMemberNo:'123',
          amount:'1233',
          name:'1234',
          otherMemberName:'12345',
          recordTime:'123466',
        }
      ],
      titel:['余额明细','充值明细','提现明细'],
      loading: false,
      finished: false,
      offsetheight:20,
      pageNumber:1,
      pageSize:10,
      totalPage:1,
      moneydata:0,
    }
  },
  created () {
    let zhethis =this;
    this.info=[];
    this.getinfo(this.$route.params.id);
  },
  mounted () {
    this.$refs.hidetab.style.height=document.documentElement.clientHeight-40+'px';
  },
  methods: {
    getinfo(fromid){
      console.log(fromid)
      this.loading = true;
      let zhethis=this;
      switch (fromid) {
        case '1': //余额明细
           zhethis.getbalanceDetails();
          break;
        case '2': //充值明细
            zhethis.getbalanceDetails(["1","7"]);
          break;
        case '3': //提现明细
            zhethis.getbalancedata();
          break;
      }
    },
    getbalanceDetails(type){
      let zhethis=this;
      balanceDetails(this.userInfo.id, this.pageNumber, this.pageSize,type).then(response => {
        zhethis.loading = false
        zhethis.info = zhethis.info.concat(response.data.list)
        zhethis.pageNumber++
        if (zhethis.info.length >= response.data.totalRow) {
          zhethis.finished = true;
        }
      })
    },
    
    getbalancedata(){
      let zhethis=this;
      this.moneydata=1;
      let params={};
      params.memberId=this.userInfo.id;
      params.pageNumber=this.pageNumber;
      params.pageSize=this.pageSize;
      params.orderBy='createdTime desc';
      params.columns = 'type,status,memberId,id,amount,createdTime as recordTime,member.memberNo as memberNo,member.image as memberimage';
      getbalancerecord(params).then(response => {
        zhethis.loading = false
        zhethis.info = zhethis.info.concat(response.data.list)
        zhethis.pageNumber++
        if (zhethis.info.length >= response.data.totalRow) {
          zhethis.finished = true;
        }
      })
    },
    // onLoad(){
    //   let zhethis = this;
    //   setTimeout(() => {
    //     if(zhethis.pageNumber<zhethis.totalPage){
    //       zhethis.pageNumber++;
    //       balanceDetails(this.userInfo.id,zhethis.pageNumber,zhethis.pageSize).then(response => {
    //         zhethis.info.push(...response.data.list);
    //         zhethis.loading = false;
    //       })
    //     }else{
    //       zhethis.loading = false;
    //       zhethis.finished = true;
    //     }
    //   }, 500);
    // },
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
