<template>
  <div class="phone">
    <top-header title="支付密码"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>支付密码</span>
    </header> -->
   <div class="password">
      <p class="pay" v-show="childMsg">支付金额</p>
      <div class="amount" v-show="childMsg">{{yue}}</div>
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
      />
      <p class="href"><router-link to="/forgotpassword">忘记密码？</router-link></p>
   </div>
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
export default {
  name: 'phone',
  props: {
    childMsg: Boolean //这样可以指定传入的类型，如果类型不对，会警告
},
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      tell:'',
      value: '',
      showKeyboard: true,
      yue:'',
      show:false
    }
  },
  created () {
    if(sessionStorage.getItem("yue")){
      this.yue = '￥' + sessionStorage.getItem("yue") + '元'
    }else if( sessionStorage.getItem("zhubao") ){
      this.yue = sessionStorage.getItem("zhubao") + '个'
    }
  },
  mounted () {
    
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if(this.value.length==6){
        this.gopaypassword(this.value);
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    gopaypassword(data){
      this.$emit('gopaypassword', data)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
