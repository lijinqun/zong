<template>
  <div class="page">
      <top-header title="忘记密码" style="width: 100%;position: fixed;top: 0;z-index: 100;"></top-header>
        <div class="password">
            <p class="prompt">为了您的账户安全,请输入短信验证码，验证身份</p>
            <p class="code van-hairline--surround" style="margin-top:10px;"><span>短信验证码</span> <input v-model="Verificationcode" type="text" placeholder="6位数字验证码"/><button @click="send" v-bind:class="{ active: isActive }">{{sendtxt}}</button></p>
            <p class="code van-hairline--surround"><span>新密码</span> <input v-model="password" type="text" placeholder="6位数密码"/></p>
            <p class="code van-hairline--surround"><span>确认密码</span> <input v-model="newpassword" type="text" placeholder="6位数密码"/></p>
            
            <p class="phone" v-show="show">短信已发送至{{phone}},请查收</p>
            <div>
                <button @click="sendpassword">确定</button>
            </div>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { forgetTradePassword,resetTradePassword} from "./../../api";
import { Toast, Dialog } from 'vant';
export default {
  components: {

  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        Verificationcode:'',
        password:'',
        newpassword:'',
        phone:'',
        numtxt:59,
        sendtxt:'发送验证码',
        clickbtn:true,
        timenum:'',
        show:false,
        isActive:true
    }
  },
  created () {
    
    var str=(this.userInfo.mobile).toString();  
    this.phone = str.substr(0,3)+"****"+str.substr(7);  
  },
  mounted () {

  },
  methods: {
    send(){
      let _this = this;
      // let mobile = this.userInfo.mobile;
      // this.phone = '13434450121'.slice(0,3) + '*****' + '13434450121'.slice(8,3)
      // this.phone = (this.userInfo.mobile).substr(0, 3) + '****' + (this.userInfo.mobile).substr(7);  
      if(_this.clickbtn == true){
        _this.clickbtn = false;
          forgetTradePassword(_this.userInfo.id).then(res=>{
            if(res.code == 200){
              _this.numtxt=59;
                  _this.sendtxt=_this.numtxt;
                  _this.isActive = false
                  _this.timenum=setInterval(function() {
                    _this.numtxt--;
                    _this.sendtxt=_this.numtxt;
                    if(_this.numtxt<1){
                      _this.sendtxt='发送验证码';
                      _this.isActive = true
                      _this.clickbtn=true;
                      clearInterval(_this.timenum);
                    }
                  },1000)
              Toast.success('发送成功!');
              _this.show = true;
            }else{
              Toast.fail(res.message);
            }
          })
      }
    },
    sendpassword(){
      var reg = new RegExp(/^\d{6}$/);
      if(this.Verificationcode == ''){
        Toast.fail('验证码不能为空!')
        return
      }
      if(this.password == '' || this.newpassword == ''){
        Toast.fail('密码不能为空!')
        return
      }
      if(!(reg.test(this.password))){
        Toast.fail('密码必须是6位数字!')
        return
      }
      if(!(reg.test(this.newpassword))){
        Toast.fail('密码必须是6位数字!')
        return
      }
      let _this = this;
      resetTradePassword(_this.userInfo.id,_this.Verificationcode,_this.password,_this.newpassword).then(res=>{
          if(res.code == 200){
              Toast.success('修改成功!');
              _this.$router.go(-1)
          }else{
              Toast.fail(res.message);
          }
      })
    }
  },
}
</script>

<style scoped lang="scss">
.page{
  background: #F0F0F0;
  padding-top:50px;
  height: 95%;
  .password{
    > .prompt{
      font-size:10px;
      color:#666666;
      text-align: center;
    }
    > .code{
      background: #ffffff;
      // margin-top: 20px;
      height: 50px;
      width: 100%;
      padding: 5px 0;
      > .active{
        background: #4b0;
        border: 1px solid #4b0;
      }
      > span{
        // display: inline-block;
        width: 20%;
        font-size:0.7rem;
        color: #666666;
        height: 50px;
        line-height: 50px;
        margin-left: 5%;
        float: left;
      }
      > input{
        width: 45%;
        outline: none;
        border:0;
        float: left;
        height: 48px;
        line-height: 45px;
        font-size: 0.9rem;
      }
      > button{
        width: 25%;
        font-size:0.7rem;
        height: 25px;
        position: relative;
        top: 12.5px;
        border-radius: 12.5px;
        outline: none;
        background:#ddd;
        border: 1px solid #ddd;
        color: #ffffff;
        float: left;
      }
    }
    > .phone{
      font-size:10px;
      padding-left: 5%;
      line-height: 30px;
    }
    > div{
      text-align: center;
      padding: 20px 0;
      > button{
        height: 40px;
        width: 45%;
        outline: none;
        border-radius: 30px;
        border:1px solid #4b0;
        background:#4b0;
        color:#ffffff;
        font-size:14px;
      }
    }
  }
}

</style>
