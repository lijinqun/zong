<template>
  <div class="merchant-code-pay">
      <!-- 头部标题 -->
    <top-header title="众付/扫码付"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/merchantCenter">
        <van-icon name="arrow-left" />
      </a>
      <span>众付/扫码付</span>
    </header> -->
    <img src="./../../assets/77.png" alt="">
    <p>{{info.shopName || ''}} <span @click="path">进入首页</span></p>
    <p class="topline">地址：{{info.address || ''}}</p>
    <p>电话：{{info.phone || ''}}</p>
    <div class="pay-page">
        <input type="text" placeholder="支付订单金额" v-model="money">
      <van-checkbox-group v-model="result" :max="2" @change="ifcheckbox">
        <van-checkbox name="1" style="margin-bottom: 1rem" v-if="payWechat">
          <span>微信支付</span>
        </van-checkbox>
        <van-checkbox name="2" style="margin-bottom: 1rem">
          <span>余额</span>
          <span style="color: #aaa;padding-left: 1rem;">({{userInfo.balance || 0}}元)</span>
        </van-checkbox>
        <van-checkbox name="3" style="margin-bottom: 1rem">
          <span>收益珠宝</span>
          <span style="color: #aaa;padding-left: 1rem;">({{userInfo.incomeCoin || 0}}个)</span>
        </van-checkbox>
        <van-checkbox name="4" style="margin-bottom: 1rem" v-show="privilege">
          <span>消费珠宝</span>
          <span style="color: #aaa;padding-left: 1rem;">({{userInfo.consumeCoin || 0}}个)</span>
        </van-checkbox>
      </van-checkbox-group>
      <van-radio name="1" v-model="radio" disabled v-if="payWechat">不足部分微信支付</van-radio>
      <p class="btn" @click="rightPay">确认支付</p>
      <a href="#/beyondPay" class="warning">支付超限了，请点击这里</a>
    </div>
    <!-- 确认支付弹窗 -->
    <div class="right-pay" v-if="rightPayBox">
      <div class="box">
        <img :src="info['member.image']" alt="">
        <p>{{info.shopName||''}}(ID：{{info['member.memberNo']}})</p>
        <p class="warning">请核对客户的资料，无误后确认</p>
        <van-checkbox-group v-model="result" :max="2" @change="ifcheckbox">
          <van-checkbox name="1" style="margin-bottom: 1rem" v-if="payWechat">
            <span>微信支付</span>
          </van-checkbox>
          <van-checkbox name="2" style="margin-bottom: 1rem">
            <span>金额:</span>
            <span style="color: #aaa;padding-left: 1rem;">({{yue || 0}})</span>
          </van-checkbox>
          <van-checkbox name="3" disabled style="margin-bottom: 1rem">
            <span>收益珠宝</span>
            <span style="color: #aaa;padding-left: 1rem;">({{zhubao || 0}}个)</span>
          </van-checkbox>
          <van-checkbox name="4" disabled style="margin-bottom: 1rem" v-show="privilege">
            <span>消费珠宝</span>
            <span style="color: #aaa;padding-left: 1rem;">({{consumption || 0}}个)</span>
          </van-checkbox>
        </van-checkbox-group>
        <van-radio name="1" v-model="radio" disabled v-if="payWechat">不足部分微信支付</van-radio>
        <div class="btn-box">
          <span @click="rightPayBox = false">上一步</span>
          <span v-if="openpaypassword==true" @click="ifpaypassword()">再次确认</span>
          <span v-if="openpaypassword==false" @click="toPay()">再次确认</span>
        </div>
      </div>
    </div>

    <div class="success" v-if="successBox">
      <div class="top">
        <img src="./../../assets/112.png" alt="">
        <p>支付成功</p>
      </div>
      <p>您已成功支付给：</p>
      <p class="info">商家名称:{{info.shopName || ''}}</p>
      <p class="info">ID:{{info['member.memberNo'] || ''}}</p>
      <p class="info">支付时间:{{date}}</p>
      <p class="info"><span>订单金额：</span>{{money || 0}}</p>
      <span @click="clicksuccess()">完成</span>
    </div>
    
    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="gopaypassword"></paypassword>
    </div>

    <loadingbox v-show="showloading"></loadingbox>
  </div>
</template>

<script>
import { getMerchantInfo, payOsoOrder, getUserInfo,showpassword, getLatestPrice } from "./../../api";
import tools from "./../../utils";
import paypassword from "./../paypassword";
import loadingbox from "../../components/showloading";
import { Toast,Dialog } from 'vant';
export default {
    name: 'meerchant-code-pay',
    components: {
      paypassword,
      loadingbox
    },
    data () {
        return {
            userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
            info: {},
            money: '',
            result: [],
            radio: '1',
            yue:'',
            zhubao: '',
            successBox: false,
            rightPayBox: false,
             passwordbox:false,

            openpaypassword:true,//支付密码

            showloading:false,
            privilege: false,
            consumption:'',
            lastPrice: 0,
            couponGame:'',
            date:''
        }
    },
    created () {
        this.getmemberdata();
        getLatestPrice().then(res => {
          this.lastPrice = res.data.price
        })
    },
    methods: {
      dateData(){
          var myDate = new Date();
          myDate.getYear(); //获取当前年份(2位)
          myDate.getFullYear(); //获取完整的年份(4位,1970-????)
          myDate.getMonth(); //获取当前月份(0-11,0代表1月)
          myDate.getDate(); //获取当前日(1-31)
          myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
          myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
          myDate.getHours(); //获取当前小时数(0-23)
          myDate.getMinutes(); //获取当前分钟数(0-59)
          myDate.getSeconds(); //获取当前秒数(0-59)
          myDate.getMilliseconds(); //获取当前毫秒数(0-999)
          myDate.toLocaleDateString(); //获取当前日期
          var mytime=myDate.toLocaleTimeString(); //获取当前时间
          myDate.toLocaleString( ); //获取日期与时间
          this.date =myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();//拼写
      },
      path(){
        this.$router.push('/')
      },
      ifpassword(){
        // this.showAfter = true;
        let zhethis=this;
        if(this.result.length>0&&this.result[0]>1){
          let id = this.$route.params.id;
         showpassword(this.userInfo.id).then(response => {
            if(response.data&&response.data.tradePassword){
              zhethis.rightPayBox = true;
            }else{
                  Dialog.alert({
                    title: '温馨提示',
                    message: '您还没有设置交易密码，请设置交易密码'
                  }).then(() => {
                      sessionStorage.setItem('goindex','/merchantCodePay/'+ id);
                      zhethis.$router.push('/updatepaypassword');
                  });
                  zhethis.$router.push('/updatepaypassword');
                }
          })
        }else{
          this.rightPayBox = true;
        }
      },
      ifpaypassword(){
        if(this.openpaypassword==true&&this.result.length>0&&this.result[0]>1){
          this.showpasswordbox();
        }else{
          this.toPay();
        }
      },
      showpasswordbox(){
        this.rightPayBox=false;
        this.passwordbox=true;
      },
      gopaypassword(data){
        this.passwordbox=false;
        this.toPay(data);
      },
      ifcheckbox(data){
        if(data.length>1){
          this.result=[];
          this.result.push(data[1]);
        }
      },
      getmemberdata(){
        let zhethis=this;
        zhethis.info={};
        getMerchantInfo(this.$route.params.id).then(response => {
            zhethis.info = response.data;
            if(response.data.allowCoin == 1){
              zhethis.privilege = true
            }
            // if(response.data.memberId == 2988 || response.data.memberId == 164 || response.data.memberId == 21857 || response.data.memberId == 32639 || response.data.memberId == 79390 || response.data.memberId == 5761){
            //     zhethis.privilege = true
            // }
        })
      },
      clicksuccess(){
        this.getmemberdata();
        this.yue=0;
        this.zhubao=0;
        this.money='';
        this.consumption = 0;
        this.result=[];
        this.successBox = false;
        this.$router.push('/couponGame/' + this.couponGame)
      },
      rightPay() {
      if (this.info['member.memberNo']!=this.userInfo.memberNo) {
          if( this.money <= 0 || this.money == ''){
            Dialog.alert({
                title: '温馨提示',
                message: '转账金额必须大于0，请重新输入'
            }).then(() => {
                
            });
            return
          }
          if (this.result[0]==='2') {
            this.yue=this.money;
            this.zhubao="";
            this.consumption = ''
          } else if (this.result[0]==='3') {
            this.zhubao=(this.money/this.lastPrice).toFixed(2);
            this.yue="";
            this.consumption = '';
          } else if (this.result[0]==='4'){
            this.consumption = (this.money/this.lastPrice).toFixed(2);
            this.yue = '';
            this.zhubao = '';
          }

          if(this.openpaypassword){
            this.ifpassword();
          }else{
            this.rightPayBox = true;
          }
      }else {
        Dialog.alert({
          title: '温馨提示',
          message: '不能给自己转账，请重新输入'
        }).then(() => {
          
        });
      }
    },
        toPay(password) {
          this.showloading=true;
          let zhethis=this;
            if (this.money > 0) {
                payOsoOrder(this.userInfo.id, this.info.memberId, this.money, this.result[0] || 1,password).then(response => {
                    if(response.code=="200" && response.data.appId){
                      if(zhethis.payWechat != false){
                            zhethis.showloading=false;
                            tools.wechatPay(response.data.appId, response.data.timeStamp, response.data.nonceStr, response.data.package, response.data.signType, response.data.paySign, (res) => {
                                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                                    getUserInfo(zhethis.userInfo.open_id).then(_res => {
                                        zhethis.userInfo = _res.data;
                                    })
                                    zhethis.rightPayBox = false;
                                    zhethis.successBox=true;
                                    zhethis.couponGame = response.data.id;
                                    // 支付时间
                                    zhethis.dateData()
                                } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                                    Toast.fail('支付失败');
                                } else {
                                    Toast.fail('支付失败');
                                }
                            })
                      }else{
                        Toast.fail("余额不足！");
                      }
                       
                    }else if(response.code=="200" && !response.data.appId){
                        getUserInfo(zhethis.userInfo.open_id).then(_res => {
                              zhethis.userInfo = _res.data;
                              // 支付时间
                              zhethis.dateData()
                          })
                        zhethis.showloading=false;
                        zhethis.rightPayBox = false;
                        zhethis.successBox=true;
                        zhethis.couponGame = response.data.id;
                    } else {
                      zhethis.showloading=false;
                        Dialog.alert({
                          title: '温馨提示',
                          message: response.message
                        }).then(() => {
                          if(response.message.indexOf('没有设置交易密码')>0){
                            sessionStorage.setItem('goindex','/merchantCodePay/'+zhethis.$route.params.id);
                            zhethis.$router.push('/updatepaypassword')
                          }
                        });
                    }
                })
            } else {
              zhethis.showloading=false;
                Dialog.alert({
                  title: '请输入支付金额',
                  message: response.message
                }).then(() => {
                  
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './index.scss';
</style>
