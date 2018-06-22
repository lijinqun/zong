<template>
  <div class="phone">
    <!-- <top-header title="登录"></top-header> -->
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>平台数据迁移通知</span>
    </header> -->
    <div class="data">
      <div class="newstxt"><img src="../../assets/77.png" alt=""></div>
      <div class="picked">
        <input type="radio" id="one" value="0" v-model="picked"><span>中国大陆</span>
        <input type="radio" id="one" value="1" v-model="picked"><span>中国香港</span>
      </div>
      <van-cell-group class="inputdata">
        <van-field label="手机号" v-model="tell" placeholder="手机号码"/>
        <van-field label="密码" type="password" v-model="sms" placeholder="密码"/>
      </van-cell-group>
      <p class="registered"><router-link to="/registered">还没有账号？去注册</router-link><router-link to="/login" class="password">手机验证码登录</router-link></p>
      <div class="savebtn" @click="savebtn()">登录</div>
    </div>
  </div>
</template>

<script>
import { appSendPhoneCode,loginByPassword} from "./../../api";
import { Toast, Dialog,Button} from 'vant';
export default {
  name: 'phone',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      tell:'',
      sms:'',
      sendtxt:'发送验证码',
      numtxt:59,
      timenum:'',
      clickbtn:true,
      picked:0
    }
  },
  created () {
    
  },
  mounted () {
    
  },
  methods: {
    sendout(){
      let zhethis=this;
      if(this.tell){
        if(this.clickbtn==true){
          var tell = this.tell
          if(this.picked == 1){
            tell = '00852' + this.tell
          }
          this.clickbtn=false;
          appSendPhoneCode(tell).then(response => {
            if(response.code==200){
              Toast.success('发送成功');
              zhethis.numtxt=59;
              zhethis.sendtxt=zhethis.numtxt;
              zhethis.timenum=setInterval(function() {
                zhethis.numtxt--;
                zhethis.sendtxt=zhethis.numtxt;
                if(zhethis.numtxt<1){
                  zhethis.sendtxt='发送验证码';
                  zhethis.clickbtn=true;
                  clearInterval(zhethis.timenum);
                }
              },1000)
            }else{
              Dialog.alert({
                title: '温馨提示',
                message: response.message
              }).then(() => {
                // on close
              });
            }
          })
        }
        
      }else{
        Dialog.alert({
          title: '温馨提示',
          message: '请输入手机号码'
        }).then(() => {
          // on close
        });
      }
    },
    savebtn(){
      let zhethis=this;
     // if(this.tell&&this.sms){
     if(this.tell){
       var tell = this.tell
       if(this.picked == 1){
         tell = '00852' + this.tell
       }
          loginByPassword(this.tell,this.sms).then(response => {
            if(response.code==200){
              Toast.success('登录成功！');
              sessionStorage.setItem('userName',JSON.stringify(response.data))
              zhethis.$router.push('/')
            }else{
              Dialog.alert({
                title: '温馨提示',
                message: response.message
              }).then(() => {
                // on close
              });
            }
          })
      }
      
    },
    closebtn(){
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
