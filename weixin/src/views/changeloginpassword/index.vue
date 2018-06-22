<template>
  <div class="page">
      <top-header :title="title"></top-header>
      <div class="data">
        <div class="newstxt"><img src="../../assets/77.png" alt=""></div>
        <van-cell-group class="inputdata">
          <van-field v-show="this.userName.password" label="旧密码" v-model="oldpassword" placeholder="旧密码"/>
          <van-field label="新密码" type="password" v-model="newpassword" placeholder="新密码"/>
          <van-field label="确认密码" type="password" v-model="confirmpassword" placeholder="确认密码"/>
        </van-cell-group>
        <div class="savebtn" @click="savebtn">确认</div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Toast, Dialog} from 'vant';
export default {
  components: {

  },
  data() {
    return {
      oldpassword:'',
      newpassword:'',
      confirmpassword:'',
      userName:sessionStorage.getItem('userName') ? JSON.parse(sessionStorage.getItem('userName')) : {},
      title:'修改密码'
    }
  },
  created () {
    this.userName.password ? this.title = '修改密码' : this.title = '设置密码'
  },
  mounted () {

  },
  methods: {
    savebtn(){
      if(this.oldpassword == '' || this.newpassword == '' || this.confirmpassword == ''){
          Toast.fail('输入不能为空');
          return
      }
      if( this.newpassword != this.confirmpassword ){
        Toast.fail('新密码跟确认密码不一致！');
        return
      }
    }
  },
}
</script>

<style scoped lang="scss">
.data{
  > .newstxt{
    > img{
      max-width: 100%;
    }
  }
  > .savebtn{
      background: #4b0;
      color: #fff;
      width: calc(100% - 20px);
      height: 45px;
      line-height: 45px;
      margin: 50px 10px 0;
      text-align: center;
      border-radius: 5px;
    }
}
</style>
