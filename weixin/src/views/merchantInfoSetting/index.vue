<template>
  <div class="merchant-info-setting">
    <!-- 头部标题 -->
    <top-header title="商家信息"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/sweepMerchantCode">
        <van-icon name="arrow-left" />
      </a>
      <span>商家信息</span>
    </header> -->
    <van-cell-group>
        <van-field
            v-model="info.shopName"
            label="店铺名称"
            placeholder="请输入店铺名称"
            required
        />
        <van-field
            v-model="info.phone"
            label="联系电话"
            placeholder="请输入联系电话"
            required
        />
        <!-- <van-field
            v-model="info.businessTypeName"
            label="经营类别"
            placeholder="请输入经营类别"
            required
        /> -->
        <div class="choosebox">
          <p><span class="headtxt">经营类别</span><span class="datatxt" v-text="catIdname" @click='catIdshow=true'></span></p>
        </div>
        <van-field
            v-model="info.shortDesc"
            label="留言"
            type="textarea"
            placeholder="请输入简短描述"
            rows="3"
            autosize
        />
        <van-field
            v-model="info.address"
            label="详细地址"
            type="textarea"
            placeholder="请输入详细地址"
            rows="3"
            autosize
        />
    </van-cell-group>
    <van-button type="primary" bottom-action @click="saveInfo">确认保存</van-button>

    <!-- 经营类别 -->
    <van-popup v-model="catIdshow" position="bottom">
      <div class="popupheader">
        <p @click="catIdshow=false">取消</p>
        <p class="rightbtn" @click="catIdconfirm()">确认</p>
      </div>
      <van-picker :columns="catIdcolumns" @change="onChangecatId" />
    </van-popup>
  </div>
</template>

<script>
import { getMerchantInfo, updateMerchantInfo, saveMerchantInfo,getMerchantcatlist } from "./../../api";
import { Toast } from 'vant';
export default {
    name: 'merchant-inf-setting',
    data () {
        return {
            userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
            info: {
                shopName: '',
                phone: '',
                // businessTypeName: '',
                shortDesc: '',
                address: '',
            },
            create: false,

            catIdshow:false,
            catIdnum:'',
            catIdname:'请选择',
            catIdcolumns: [],

        }
    },
    created () {
        getMerchantInfo(this.userInfo.id).then(response => {
            if (response.code === '200' && response.data) {
                this.info = response.data;
            } else {
                this.create = true
            }
        })
        this.getMerchantcat();
    },
    methods: {
        saveInfo() {
            if (this.create) {
                this.info.memberId = this.userInfo.id
                saveMerchantInfo(this.info).then(response =>{
                    if (response.code === '200') {
                        this.$router.push('/sweepMerchantCode')
                    } else {
                        Toast.fail(response.message);
                    }
                })
            } else {
                updateMerchantInfo(this.info).then(response =>{
                    if (response.code === '200') {
                        this.$router.push('/sweepMerchantCode')
                    } else {
                        Toast.fail(response.message);
                    }
                })
            }
        },
        getMerchantcat(){
          let zhethis=this;
          getMerchantcatlist().then(response => {
            zhethis.merchantcat = response.data;
            for(let i = 0;i < zhethis.merchantcat.length; i++){
              zhethis.catIdcolumns.push(zhethis.merchantcat[i].name)
              if(this.info.catId==zhethis.merchantcat[i].id){
                zhethis.catIdname=zhethis.merchantcat[i].name;
              }
            }
          })
        },
        onChangecatId(picker, value, index) {
          this.catIdnum=this.merchantcat[index].id;
          this.catIdname=this.merchantcat[index].name;
        },
        catIdconfirm(){
          this.catIdshow=false;
          if(this.catIdnum==""){
            this.catIdnum=this.merchantcat[0].id;
            this.catIdname=this.merchantcat[0].name;
          }
          this.info.catId = this.catIdnum;
        },
    }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
