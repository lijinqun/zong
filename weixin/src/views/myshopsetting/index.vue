<template>
  <div class="myshopsetting">
    <!-- 头部 -->
    <top-header title="小店设置"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>小店设置</span>
    </header> -->
    <div class="settingcss">
      <van-tabs :active="active">
        <van-tab class="navbar-item" :title="'基本信息'">
          <div class="datacss">
            <span>小店名称</span>
            <input type="text" name="" v-model="shopname">
          </div>
          <div class="datacss bigimg">
            <span>小店头像</span>
            <label>
                <div class="box"></div>
                <input type="file" style="display:none;" ref="logo" @change="preview()">
                <img v-show="clicklogodata" :src="clicklogourl" class="clickimg">
            </label>
          </div>
          <div class="datacss bigimg">
            <span>小店店招</span>
            <label>
                <div class="box"></div>
                <input type="file" style="display:none;" ref="shopLogo" @change="preview2()">
                <img v-show="clickshopLogodata" :src="clickshopLogourl" class="clickimg2">
            </label>
          </div>
          <div class="textareacss">
            <textarea placeholder="小店简介" v-model="shoptxt"></textarea>
          </div>
          <div class="settingbtn" @click="updateshop()">提交</div>
          </van-tab>
          <van-tab :title="'自选商品'">

          </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { updateshopsetting,getshopdata,saveshopdata } from "./../../api";
import { Toast } from 'vant';
export default {
  name: 'myshopsetting',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      shopdata:'',
      active:0,
      shopname:'',
      shopid:'',
      shoptxt:'',
      clicklogodata:false,
      clicklogourl:'',
      clickshopLogodata:false,
      clickshopLogourl:'',
      shopLogo:''
    }
  },
  created () {
    this.getshop();
  },
  methods: {
    preview(){
        let file = this.$refs.logo.files[0];
        let zhethis=this;
        this.clicklogodata=true;
        if (file) {
          var reader = new FileReader();
          reader.onload = function(evt) {
            zhethis.clicklogourl = evt.target.result;
          }
          reader.readAsDataURL(file);
        }
    },
    preview2(){
        let file = this.$refs.shopLogo.files[0];
        let zhethis=this;
        this.clickshopLogodata=true;
        if (file) {
          var reader = new FileReader();
          reader.onload = function(evt) {
            zhethis.clickshopLogourl = evt.target.result;
          }
          reader.readAsDataURL(file);
        }
    },
    updateshop() {
      let zhethis=this;
      let params={};
      params.name=this.shopname;
      params.memberId=zhethis.userInfo.id;
      if(this.$refs.logo.files[0]!=undefined){
        params.logos=this.$refs.logo.files[0];
      }
      if(this.$refs.shopLogo.files[0]!=undefined){
        params.shopLogos=this.$refs.shopLogo.files[0];
      }
      if(this.shoptxt!=""&&this.shoptxt!=undefined&&this.shoptxt!=null){
        params.introduction=this.shoptxt;
      }
      if(zhethis.shopdata==null){
        saveshopdata(params).then(response => {
          if(response.code=='200'){
            Toast.success('修改成功');
            setTimeout(function(){
              zhethis.$router.push("/myshop");
            },500)
          }else{
            Toast.fail(response.message);
          }
        })
      }else{
        params.id=this.shopid;
        updateshopsetting(params).then(response => {
          if(response.code=='200'){
            Toast.success('修改成功');
            setTimeout(function(){
              zhethis.$router.push("/myshop");
            },500)
          }else{
            Toast.fail(response.message);
          }
        })
      }
    },
    getshop(){
      let zhethis=this;
      let params={};
      params.memberId=this.userInfo.id;
      getshopdata(params).then(response => {
          zhethis.shopdata=response.data;
          console.log(zhethis.shopdata)
          if(zhethis.shopdata==null){
            zhethis.shopname=zhethis.userInfo.username+'的小店';
          }else{
            zhethis.shopname=zhethis.shopdata.name;
            zhethis.shopid=zhethis.shopdata.id;
            zhethis.shoptxt=zhethis.shopdata.introduction;
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
