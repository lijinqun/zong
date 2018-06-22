<template>
  <div class="page">
      <top-header title="付款"></top-header>
      <div class="payment">
          <div class="payment_nav">
              <div class="payment_name">
                  <p class="paymentMy">付款给个人</p>
                  <p>昵称：罗记</p>
              </div>
              <div>
                  <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/1FicuI1tGmGYOD9cXCKMVAXvp9fMc5AzSibl333kaxzrs7YTlpJCvfZOzdw41PiaU4T6l7vcRObYCoLgnicbziaMibBw/132" alt="">
              </div>
          </div>
          <div class="payment_amount">
              <div class="payment_money van-hairline--bottom">
                  <p class="money">金额</p>
                  <p><span>￥</span><input type="text" v-model="money"></p>
              </div>
              <div class="btn"><button @click="payment">付款</button></div>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data() {
    return {
        money:''
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
      payment(){
            if(this.money == ''){
                alert('金额不能为空!')
                return
            }
            if(this.money <= 0){
                alert('请输入正确金额!')
                return
            }
            this.$router.push('/merchantCodePay/9')
      }
  },
}
</script>

<style scoped lang="scss">
*{
    box-sizing:border-box;
}
.page{
    height: 100%;
    background: #F2F2F2;
    .payment{
        height: 50%;
        padding: 0 12px;
        > .payment_nav{
            padding-top:10%;
            height: 28%;
            padding-left: 18px;
            padding-right: 18px;
            background: #FBFBFB;
            > .payment_name{
                width: calc(100% - 40px);
                float: left;
                > .paymentMy{
                    font-size: 13px;
                    color: #000000;
                }
                > p{
                    font-size: 12px;
                    color: #9D9D9D;
                    font-weight: 500;
                    line-height: 20px;
                }
            }
            > div{
                float: left;
                width: 40px;
                > img{
                    width: 39px;
                    height: 39px;
                }
            }
        }
        > .payment_amount{
            padding:0 18px;
            height: 70%;
            background:#ffffff;
            > .payment_money{
                height: 50%;
                > .money{
                    font-size: 13px;
                    color: #BABABA;
                    padding-top:10%;
                    margin-bottom: 10px;
                }
                > p{
                    font-size:25px;
                    color: #000000;
                    font-weight: 600;
                    > input{
                        outline: none;
                        width: 70%;
                        border: 0;
                        padding-left: 14px;
                    }
                }
            }
            > .btn{
                padding-top: 20px;
                > button{
                    width: 100%;
                    height: 40px;
                    background: #DDBF63;
                    font-size: 15px;
                    color: #ffffff;
                    border: 1px solid #DDBF63;
                    outline: none;
                    border-radius: 5px;
                }
            }
        }
    }
}

</style>
