<template>
  <div class="recharge">
    <!-- 头部 -->
    <top-header title="余额充值">
        <span class="right-btn" @click="$router.push('/balanceDetails/2')" slot="rightSide">充值明细</span>
    </top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/balance">
        <van-icon name="arrow-left" />
      </a>
      <span>余额充值</span>
      <span class="right-btn" @click="$router.push('/balanceDetails/2')">充值明细</span>
    </header> -->

    <div class="content">
        <div class="card">
            <div class="header">
                <!-- <div class="row">
                    <span class="key">储蓄卡</span>
                    <select>
                        <option value="中国银行">中国银行(4587)</option>
                        <option value="农业银行">农业银行(2327)</option>
                    </select>
                </div> -->
                <!-- <div class="row">
                    <span class="key">收益珠宝</span>
                    <span class="value">({{userInfo.incomeCoin || 0}}个)</span>
                </div> -->
                <van-radio-group v-model="radio">
                    <van-radio name="1" style="position: relative;">
                        <span>微信支付</span>
                        <span style="color: #f00;position: absolute;top: 0;right: 0;line-height: 23px;font-size: .9rem;">0手续费</span>
                    </van-radio>
                    <van-radio name="2" style="margin-top: 1rem;position: relative;">
                        <span>收益珠宝</span>
                        <span style="color: #aaa;padding-left: 1rem;">({{userInfo.incomeCoin || 0}}个)</span>
                        <span style="color: #f00;position: absolute;top: 0;right: 0;line-height: 23px;font-size: .9rem;">6%手续费</span>
                    </van-radio>
                </van-radio-group>
            </div>
            <div class="recharge-wrapper">
                <p>充值金额</p>
                <van-field class="money" v-model="money" placeholder="请输入充值金额" />
            </div>
            <div class="next">
                <van-button size="large" type="primary" @click="topup">下一步</van-button>
            </div>
        </div>
        <p class="info">支付超限了，怎么办？</p>
    </div>
    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="goPay"></paypassword>
    </div>
  </div>
</template>

<script>
import { recharge, coinSell } from "./../../api";
import  tools from './../../utils'
import { Toast } from 'vant';
import paypassword from "./../paypassword";
export default {
  name: "recharge",
  components: {
    paypassword
  },
  data() {
    return {
      money: '',
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      radio: '1',
      money: null,
      passwordbox:false
    };
  },
  methods: {
      topup(){
          let zhethis = this;
          if (this.money <= 0) {
              Toast.fail('请输入充值金额');
              zhethis.money='';
              return
          }
            zhethis.passwordbox = true
      },
        //   判断用户是否填写手机号码
        // getphonedata(){
        //     if(this.userInfo.mobile==null||this.userInfo.mobile=='null'||this.userInfo.mobile==undefined){
        //         // this.$router.push('/phone')
        //     }
        // },
      goPay(tradePassword) {
        var zhethis=this;
          
            if (this.radio === '1') {
                recharge(this.userInfo.id, this.money).then(response => {
                    if (response.code === '200') {
                        tools.wechatPay(response.data.appId, response.data.timeStamp, response.data.nonceStr, response.data.package, response.data.signType, response.data.paySign, (res) => {
                            if (res.err_msg === 'get_brand_wcpay_request:ok') {
                                Toast.success('充值成功');
                                zhethis.money='';
                            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                                Toast.fail('充值失败');
                                zhethis.money='';
                            } else {
                                Toast.fail('充值失败');
                                zhethis.money='';
                            }
                        })
                    } else {
                        Toast.fail(response.message)
                    }
                })
            } else {
                if (this.money < this.userInfo.incomeCoin) {
                    coinSell(this.userInfo.id, this.money,tradePassword).then(response => {
                        if (response.code === '200') {
                            this.userInfo.incomeCoin = response.data.incomeCoin
                            Toast.success('充值成功');
                            zhethis.money='';
                        } else {
                            Toast.fail(response);
                            zhethis.money='';
                        }
                    })
                } else {
                    Toast.fail('收益珠宝不足');
                    zhethis.money='';
                }
            }
            zhethis.passwordbox = false
      }
  },
  created(){
    //   this.getphonedata()
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
