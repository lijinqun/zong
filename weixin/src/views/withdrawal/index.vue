<template>
  <div class="page">
    <top-header title="提现">
        <span class="right-btn" @click="$router.push('/balanceDetails/3')" slot="rightSide">提现明细</span>
    </top-header>
    <div class="user">
        <!-- <div>
            <p class="van-hairline--bottom"><span>姓名</span><input type="text" v-model="username" placeholder="收款人姓名"></p>
            <p class="van-hairline--bottom"><span>卡号</span><input type="text" v-model="Bankno" placeholder="收款人储蓄卡号"></p>
            <p class="van-hairline--bottom"><span>银行</span><input type="text" v-model="bank" placeholder="银行名称"></p>
        </div> -->
        <div class="amount">
            <p><span>金额</span><input type="text" v-model="money" placeholder="提现金额"></p>
        </div>
        <div class="prompt">
            金额{{userInfo.balance || 0}}，提现需高于100元，T+1工作日到账
        </div>
    </div>
    <div class="btn"><button @click="next">下一步</button></div>
    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="clickwithdraw"></paypassword>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { gowithdrawbalance } from "./../../api";
import { Toast,Dialog } from 'vant';
import paypassword from "./../paypassword";
export default {
  components: {
      paypassword
  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        money:'',
        bank:'',
        username:'',
        Bankno:'',
        passwordbox:false,

    }
  },
  created () {
      this.getphonedata()
  },
  mounted () {

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
            if( this.money % 100 !== 0){
                Dialog.alert({
                    title: '温馨提示',
                    message: '提现数目必须是100的整倍数'
                    });
                return
            }
            // if(this.bank == '' || this.username == '' || this.Bankno == ''){
            //     Dialog.alert({
            //     title: '温馨提示',
            //     message: '输入不能为空！'
            //     }).then(() => {
            //     // on close
            //     });
            //     return
            // }
            this.passwordbox = true;
        },
        clickwithdraw(tradePassword) {
            let zhethis=this;
            let params={};
            params.memberId=this.userInfo.id;
            params.amount=this.money;
            params.tradePassword = tradePassword;
            // params.bankName = this.bank;
            // params.bankUsername = this.username;
            // params.bankAccount = this.Bankno;
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
        getphonedata(){
            if(this.userInfo.mobile==null||this.userInfo.mobile=='null'||this.userInfo.mobile==undefined || this.userInfo.mobile==''){
                this.$router.push('/phone')
            }
        },
  }
}
</script>

<style scoped lang="scss">
.page{
    height: 100%;
    .right-btn {
        position: absolute;
        top: 0;
        right: 10px;
        color: #eee;
        font-size: 14px;
        width: 60px;
    }
    > .user{
        background:#f2f2f2;
        padding-top: 15px;
        > div{
            padding: 0 10px;
            background: #ffffff;
            > p{
                height: 40px;
                line-height: 40px;
                > span{
                    display: block;
                    width: 35px;
                    font-size: 14px;
                    text-align: center;
                    float: left;
                }
                > input{
                    width: calc( 100% - 70px);
                    float: left;
                    height: 32px;
                    line-height: 32px;
                    outline: none;
                    border: 0;
                    font-size: 14px;
                    padding-left: 14px; 
                }
            }
        }
        > .amount{
            margin-top: 15px;
        }
        >.prompt{
            background: #f2f2f2;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            color: #666666;
        }
    }
    > .btn{
        width: 100%;
        margin-top: 20%;
        > button{
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            background: #DDBF63;
            outline: none;
            border: 1px solid #DDBF63;
        }
    }
    > .passwordbox{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        background: #fff;
        width: 100%;
        height: 100%;
  }
}
</style>
