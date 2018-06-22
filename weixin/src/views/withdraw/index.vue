<template>
  <div class="withdraw">

    
    <div>
      <top-header title="珠宝提现"></top-header>
      <!-- <header class="top-title">
        <a class="back-off" href="javascript:history.go(-1);location.reload()">
          <van-icon name="arrow-left" />
        </a>
        <span>珠宝提现</span>
      </header> -->
      <div class="content">
          <div class="card">
              <div class="header">
                  <div class="row">
                      <p>收益珠宝提现到余额</p>
                  </div>
                  <!-- <div class="info">T+1工作日到账，6%手续费</div> -->
              </div>
              <div class="withdraw-wrapper">
                  <p>提现收益珠宝</p>
                  <van-field type="number" class="money" v-model="money" placeholder="请输入提现数目" />
              </div>
              <div class="balance">收益珠宝：{{userInfo.incomeCoin || 0}}，提现需6%手续费。</div>
              <div class="next" @click="clickmoney()">
                  <van-button size="large" type="primary">下一步</van-button>
              </div>
          </div>
      </div>
    </div>
    <van-dialog v-model="showmoney" show-cancel-button='true' @confirm="onConfirm">
      <div class="dialoghead">温馨提示</div>
      <div class="dialogcontent">您正在申请操作珠宝(<span class="redtxt">{{money}}</span>个)提现到余额功能，平台需要收取6%的手续费，一旦提现成功，余额将增加<span class="redtxt">{{(parseFloat(money)*parseFloat(zhubao)*0.94).toFixed(2)}}</span>，余额是没有增值收益的喔~你确认要提交吗？</div>
    </van-dialog>
    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="clickwithdraw"></paypassword>
    </div>
  </div>
</template>

<script>
import { gowithdraw,getLatestPrice } from "./../../api";
import { Toast,Dialog } from 'vant';
import paypassword from "./../paypassword";
export default {
  name: "withdraw",
  components: {
    paypassword
  },
  data() {
    return {
      money: '',
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      showmoney:false,
      zhubao:0,
      passwordbox:false
    };
  },
  created () {
    getLatestPrice().then(response => {
      if (response.code=='200') {
        this.zhubao = response.data.price
      }else{
        Dialog.alert({
          title: '温馨提示',
          message: response.message
        });
      }
    })
  },
  methods: {
    clickmoney(){
      if(this.money % 100 !== 0){
        Dialog.alert({
          title: '温馨提示',
          message: '提现数目必须是100的整倍数'
        });
        return
      }
      if(this.money>0){
        this.showmoney=true;
      }else{
        Dialog.alert({
          title: '温馨提示',
          message: '请输入正确数目'
        });
      }     
    },
    
    clickwithdraw(tradePassword) {
      let zhethis=this;
      let params={};
      params.memberId=this.userInfo.id;
      params.amount=this.money;
      params.tradePassword = tradePassword
      gowithdraw(params).then(response => {
          if(response.code=="200"){
            Toast.success('提现成功');
            setTimeout(function() {
              zhethis.$router.push("/balance")
            },1000)
            // Dialog.alert({
            //     // title: '温馨提示',
            //     message: '提现成功'
            //   }).then(() => {
            //     zhethis.$router.push("/balance")
            //   });
          }else{
            Dialog.alert({
                title: '温馨提示',
                message: response.message
              }).then(() => {
                // on close
              });
          }
      })
      this.passwordbox = false
    },
    onConfirm(){
      // this.clickwithdraw();
      this.passwordbox = true
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
