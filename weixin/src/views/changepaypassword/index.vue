<template>
  <div class="phone">
    <top-header title="修改交易密码"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>交易密码</span>
    </header> -->
    <!-- <van-password-input
      :value="value"
      info="密码为 6 位数字"
      @focus="showKeyboard = true"
    /> -->
    <!-- <van-cell-group> -->
      <!-- <van-field label="原密码" v-model="oldTradePassword" placeholder="请输入..." @click='showKeyboard=true'/> -->
      <!-- <van-field label="新密码" v-model="newTradePassword" placeholder="请输入..."  @click='showKeyboard2=true;documentblur()'/>
      <van-field label="确认密码" v-model="confirmedNewTradePassword" placeholder="请输入..." @click='showKeyboard3=true;documentblur()'/>
    </van-cell-group> -->
    <!-- <div class="pwbox">
      <p><span class="headtxt">原密码</span><span class="datatxt" v-text="oldTradePassword" @click='showKeyboard=true'></span></p>
    </div> -->
    <div class="pwbox pwbox-top">
      <p class="prompt">密码为6位数字</p>
      <p><span class="headtxt">旧密码</span>
        <span class="datatxt" type="password" v-text="newTradePassword" @click='showKeyboard2=true'></span>
      </p>
    </div>
    <div class="pwbox">
      <p><span class="headtxt">新密码</span>
        <span class="datatxt" type="password" v-text="confirmedNewTradePassword" @click='showKeyboard3=true'></span>
      </p>
    </div>
    <div class="pwbox">
      <p><span class="headtxt">确认密码</span>
        <span class="datatxt" type="password" v-text="tradePassword" @click='showKeyboard4=true'></span>
      </p>
    </div>
    <span class="btn" @click="btnfun">确认</span>
    <!-- <div class="paytxt">如果没有设置过原始密码，可以留空</div> -->
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />

    <van-number-keyboard
      :show="showKeyboard2"
      @input="onInput2"
      @delete="onDelete2"
      @blur="showKeyboard2 = false"
    />

    <van-number-keyboard
      :show="showKeyboard3"
      @input="onInput3"
      @delete="onDelete3"
      @blur="showKeyboard3 = false"
    />
    <van-number-keyboard
      :show="showKeyboard4"
      @input="onInput4"
      @delete="onDelete4"
      @blur="showKeyboard4 = false"
    />
    <van-loading color="white" v-if="showloading"/>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import {updatepasswork } from "./../../api";
export default {
  name: 'phone',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      tell:'',
      value: '',
      showloading:true,
      showKeyboard: false,
      showKeyboard2: true,
      showKeyboard3: false,
      showKeyboard4:false,
      oldTradePassword:'',
      newTradePassword:'',
      confirmedNewTradePassword:'',
      tradePassword:'',
      inputfocus1:true,
      inputfocus2:false,
      datafocus:false
    }
  },
  created () {
  },
  mounted () {
    
  },
  watch: {
        // 'confirmedNewTradePassword' () {
        //     if(this.confirmedNewTradePassword.length==6){
        //       this.inputfocus1=false;
        //       this.inputfocus2=false;
        //       this.datafocus=true;
        //         let params={};
        //         params.id=this.userInfo.id;
        //         // params.oldTradePassword=this.oldTradePassword;
        //         params.newTradePassword=this.newTradePassword;
        //         params.confirmedNewTradePassword=this.confirmedNewTradePassword;
        //         updatepasswork(params).then(response => {
        //           if(response.code==200){
        //               Toast.success('保存成功');
        //               if(sessionStorage.getItem('goindex')){
        //                 zhethis.$router.push(sessionStorage.getItem('goindex'))
        //               }else{
        //                 zhethis.$router.push('/myself')
        //               }
        //             }else{
        //               Dialog.alert({
        //                 title: '温馨提示',
        //                 message: response.message
        //               }).then(() => {
        //                 // on close
        //               });
        //             }
        //         })
        //     }
        // }
    },
  methods: {
    documentblur(){
      document.activeElement.blur();
    },

    onInput(key) {
      this.oldTradePassword = (this.oldTradePassword + key).slice(0, 6);
    },
    onDelete() {
      this.oldTradePassword = this.oldTradePassword.slice(0, this.oldTradePassword.length - 1);
    },
    onInput2(key) {
      this.newTradePassword = (this.newTradePassword + key).slice(0, 6);
    },
    onDelete2() {
      this.newTradePassword = this.newTradePassword.slice(0, this.newTradePassword.length - 1);
    },
    onInput3(key) {
      let zhethis=this;
      this.confirmedNewTradePassword = (this.confirmedNewTradePassword + key).slice(0, 6);
      console.log(this.confirmedNewTradePassword)
      
    },
    onDelete3() {
      this.confirmedNewTradePassword = this.confirmedNewTradePassword.slice(0, this.confirmedNewTradePassword.length - 1);
    },
    onInput4(key) {
      let zhethis=this;
      this.tradePassword = (this.tradePassword + key).slice(0, 6);
      console.log(this.tradePassword)
      
    },
    onDelete4() {
      this.tradePassword = this.tradePassword.slice(0, this.tradePassword.length - 1);
    },


    btnfun(){
        let zhethis=this;
        if(this.newTradePassword==''){
          Dialog.alert({
            title: '温馨提示',
            message: '旧密码不能为空'
          }).then(() => {
            // on close
          });
          return
        }
        // if(this.confirmedNewTradePassword==''){
        //   Dialog.alert({
        //     title: '温馨提示',
        //     message: '两次输入密码不一致'
        //   }).then(() => {
        //     // on close
        //   });
        //   return
        // }
      // if(this.confirmedNewTradePassword.length==6){
        let params={};
        params.id=this.userInfo.id;
        // params.oldTradePassword=this.oldTradePassword;
        params.oldTradePassword=this.newTradePassword
        params.newTradePassword=this.confirmedNewTradePassword;
        params.confirmedNewTradePassword=this.tradePassword;
        updatepasswork(params).then(response => {
          if(response.code==200){
              Toast.success('修改成功！');
              if(sessionStorage.getItem('goindex')){
                zhethis.$router.push(sessionStorage.getItem('goindex'))
              }else{
                zhethis.$router.push('/myself')
              }
            }else{
              Dialog.alert({
                title: '温馨提示',
                message: response.message
              }).then(() => {
                // on close
              });
            }
        })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
