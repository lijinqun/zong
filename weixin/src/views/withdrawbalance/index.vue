<template>
  <div class="withdraw">

    <div>
      <!-- 头部 -->
      <top-header title="提现">
        <span class="right-btn" @click="$router.push('/balanceDetails/3')" slot="rightSide">提现明细</span>
      </top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>提现</span>
      <span class="right-btn" @click="$router.push('/balanceDetails/3')">提现明细</span>
    </header> -->

      <div class="content">
          <div class="card">
              <div class="header">
                  <div class="row">
                      <span class="key">到账微信</span>
                      <!-- <select>
                          <option value="中国银行">中国银行(4587)</option>
                          <option value="农业银行">农业银行(2327)</option>
                      </select> -->
                      <p class="contenttext">T+1工作日到账</p>
                  </div>
                  <!-- <div class="info">T+1工作日到账</div> -->
              </div>
              <div class="withdraw-wrapper">
                  <p>提现金额</p>
                  <van-field type="number" class="money" v-model="money" placeholder="请输入提现金额" />
              </div>
              <div class="withdraw-wrapper">
                  <p>银行名称</p>
                  <van-field type="number" class="money" v-model="bank" placeholder="请输入银行名称" />
              </div>
              <div class="withdraw-wrapper">
                  <p>收款人姓名</p>
                  <van-field type="number" class="money" v-model="username" placeholder="请输入收款人姓名" />
              </div>
              <div class="withdraw-wrapper">
                  <p>银行卡号</p>
                  <van-field type="number" class="money" v-model="Bankno" placeholder="请输入银行卡号" />
              </div>
              <div class="balance">余额￥{{userInfo.balance || 0}}，提现需高于100元。</div>
              <div class="next" @click="next()">
                  <van-button size="large" type="primary">下一步</van-button>
              </div>
          </div>
      </div>
    </div>
    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="clickwithdraw"></paypassword>
    </div>
  </div>
</template>

<script>
import { gowithdrawbalance } from "./../../api";
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
      passwordbox:false,
      bank:'',
      username:'',
      Bankno:''
    };
  },
  methods: {
    next(){
      if(this.money < 0){
        Dialog.alert({
          title: '温馨提示',
          message: '请输入正确数目'
        });
        return
      }
      if(this.money < 100){
        Dialog.alert({
          title: '温馨提示',
          message: '您的提现金额不足100元，请到达后再来提现'
        }).then(() => {
          // on close
        });
        return
      }
      if(this.bank == '' || this.username == '' || this.Bankno == ''){
        Dialog.alert({
          title: '温馨提示',
          message: '输入不能为空！'
        }).then(() => {
          // on close
        });
        return
      }
      this.passwordbox = true;
    },
    clickwithdraw(tradePassword) {
      let zhethis=this;
        let params={};
        params.memberId=this.userInfo.id;
        params.amount=this.money;
        params.tradePassword = tradePassword;
        params.bankName = this.bank;
        params.bankUsername = this.username;
        params.bankAccount = this.Bankno;
          gowithdrawbalance(params).then(response => {
            if(response.code=="200"){
              Toast.success('提现成功');
              setTimeout(function() {
                zhethis.$router.push("/balance")
              },1500)
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
      this.passwordbox = false;
    },
     //   判断用户是否填写手机号码
      // getphonedata(){
      //     if(this.userInfo.mobile==null||this.userInfo.mobile=='null'||this.userInfo.mobile==undefined){
      //         // this.$router.push('/phone')
      //     }
      // },
  },
  created(){
      // this.getphonedata()
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
