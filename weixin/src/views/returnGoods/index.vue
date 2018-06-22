<template>
  <div class="return-goods">
    <!-- 头部 -->
    <top-header title="申请退货"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>申请退货</span>
    </header> -->
    <van-cell-group>
        <van-field label="收货人" v-model="name" placeholder="请输入收货人"/>
        <van-field label="联系电话" v-model="phone" placeholder="联系电话" />
        <van-field label="问题描述" v-model="question" type="textarea" placeholder="问题描述" rows="3" autosize />
      </van-cell-group>
      <!-- <div class="photo-box">
        <div class="single-photo" v-for="item in clickFileurl">
          <img class="imgbox" :src="item" alt="">
        </div>
        <div class="single-photo" v-if="clickFileurl.length<5">
          <label>
              <div class="box"></div>
              <input type="file" style="display:none;" ref="ImageFile" @change="preview()">
          </label>
        </div>
      </div> -->
    <div><p class="clickbtn" @click="clickrefundsgoods()">申请退货</p></div>
  </div>
</template>

<script>
import { refundsgoods } from "./../../api";
import { Toast, Dialog } from 'vant';
export default {
  name: 'return-goods',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      
      name:'',
      phone:'',
      question:'',
      clickFileurl:[],
      ImageFilebox:[],
    }
  },
  created () {
    
  },
  methods: {
    clickrefundsgoods(){
      if(this.name == ''){
        Toast.fail('请填写收货人!');
        return
      }
      if(this.phone == ''){
        Toast.fail('请填写联系电话!');
        return
      }
      let params={};
      params.memberId=this.userInfo.id;
      params.orderDetailId=this.$route.params.id;
      if(this.question){
        params.problemDesc=this.question;
      }
      params.contactName=this.name;
      params.contactNumber=this.phone;
      // if(this.ImageFilebox.length>0){
      //   for(var i = 0; i < this.ImageFilebox.length; i++){
      //     params["problemImage"+(i+1)+"_file"]=this.ImageFilebox[i];
      //   }
      // }
      console.log(params)
      refundsgoods(params).then(response => {
          if(response.code=='200'){
            Dialog.alert({
              title: '温馨提示',
              message: '申请成功'
            }).then(() => {
              this.$router.push('/orderDetails/'+response.data.orderId);
            });
          }else{
            Dialog.alert({
            title: '温馨提示',
              message: response.message
            }).then(() => {
              this.$router.push('/orderDetails/'+response.data.orderId);
            });
          }
      })
    },
    preview(){
        let file = this.$refs.ImageFile.files[0];
        let zhethis=this;
        if (file) {
          zhethis.ImageFilebox.push(zhethis.$refs.ImageFile.files[0])
          var reader = new FileReader();
          reader.onload = function(evt) {
            zhethis.clickFileurl.push(evt.target.result);
          }
          reader.readAsDataURL(file);
        }
        console.log(zhethis.clickFileurl)
    },
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
