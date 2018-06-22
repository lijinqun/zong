<template>
  <div class="cart" style="height:100%;background:#F0F0F0;">
    <!-- 头部标题 -->
    <top-header title="福霸家族" class="head"></top-header>
    <div class="content" id='contentdata'>
        <div class="right" id='iright'>
          <div style="padding:44px 10px 10px 10px;" @click='clickgood(merchantList[0].id)'>
            <img style="max-width:100%;" :src="imgserverUrl + merchantList[0].indexImage" alt="">
          </div>
        <div class="scroller">
          <ul class="lright" id='nright'>
            <van-list>
              <li v-for='(item,key) in merchantList' @click='clickgood(item.id)' :key="key" :value="item.id" v-show="key != 0">
                <!-- <img v-bind:src="imgserverUrl+item.indexImage" class="lrightbigimg" onerror="javascript:this.src='http://bpic.588ku.com/element_origin_min_pic/01/47/02/12574338a640011.jpg'"> -->
                <img v-lazy="imgserverUrl+item.indexImage" class="lrightbigimg" :onerror="defaultImg">
                <p class="mdzz" style="-webkit-box-orient: vertical;">{{item.name}}</p>
                <p class="numbersize" v-if="item.id != 4424">￥{{item["discount"]}}
                <p class="numbersize" v-if="item.id == 4424">{{item["discount"]}} 个
                <img src="../../assets/299.png" class="gwcimg" v-if="newmerchantsid=='0'">
                <p class="shopbtn" v-if="newmerchantsid!='0'">{{item.isOnline==1?'上架中':'下架'}}</p>
                <!-- </p> -->
              </li>
            </van-list>
          </ul>
        </div>
        <div style="text-align: center;padding:15px 0;position: fixed;bottom: 0;left: 0;">
          <a @click="specialsupply" style="display: inline-block;width: 30%;text-align: center;"><img src="../../assets/503.png" alt="" style="max-width:95%;"></a>
          <router-link to="/" style="display: inline-block;width: 30%;text-align: center;"><img src="../../assets/504.png" alt="" style="max-width:95%;"></router-link>
          <router-link to="/playqrcode" style="display: inline-block;width: 30%;text-align: center;"><img src="../../assets/505.png" alt="" style="max-width:95%;"></router-link>
        </div>
      </div>
      <!-- 商品列表 -->
      <!-- <goodsList /> -->
    </div>
    <!-- 底部主导航 -->
    <!-- <index-bottom-nav :active="parseInt(bottomNavActive)"></index-bottom-nav> -->
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar } from "vant";
// 引入底部主导航
// import indexBottomNav from './../../components/indexBottomNav'

import { getGoodsList,imgserverUrl ,searchGoodsList,setTitle,getGoodsCategory,updateGoodsonline,merchantData,listingData,getfubaList} from "./../../api";

import goodsList from './../../components/goodsList'
import {shareSmart} from "./../../api";
import { Toast,Dialog } from 'vant';

export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      bottomNavActive: 2,
      imgserverUrl:imgserverUrl,
      checkedGoods: ["1", "2", "3"],
      goods: [],
      merchantList:[{'indexImage':' '}],
      active: 0,
      threshold: 6,
      merchantcat:[],
      newmerchantsid:sessionStorage.getItem("newmerchantsid") || '0',
      clickdata:'0',
      defaultImg: 'this.src="' + require('../../assets/dishe.gif') + '"',
      loading: false,
      finished: false,
      pageNumber:1,
      pageSize:6,
      totalPage:0
    };
  },
  mounted () {
    this.merchantData()
  },
  created () {
    setTitle('从众链商新零售');
    shareSmart('specialsupply','从众链商自营（贵州茅台酒） 福霸家族','一样的感觉，不一样的味道')
    // 默认显示的页面
  },
  methods: {
    specialsupply(){
      Toast.fail('暂没开放');
    },
    overflowheight(){
      setTimeout(function(){
        console.log(document.getElementById('contentdata').offsetHeight)
        if(document.getElementById('contentdata').offsetHeight<document.documentElement.clientHeight){
          document.getElementById('contentdata').style.height = document.documentElement.clientHeight-40+'px';
        }
      },200)
    },
    merchantData(){
      let _this = this;
      let id = _this.$route.params.id;
        getfubaList(609,0,1).then((res) => {
          _this.merchantList = res.data;
          // _this.totalPage = res.data.totalPage;
        }) 
    },
    // onLoad() {
    //   let _this = this;
    //   let id = _this.$route.params.id;
    //   setTimeout(() => {
    //       if(_this.pageNumber < _this.totalPage){
    //           _this.pageNumber++
    //           getGoodsList(this.pageNumber,this.pageSize).then((res) => {
    //             _this.merchantList.push(...res.data.list);
    //             _this.loading = false;
    //           })
    //       }else{
    //         _this.loading = false;
    //         _this.finished = true;
    //       }
    //   }, 500);
    // },
    clickgood(id){
      this.$router.push('/goodsdetails/' + id);
    }
  },
  components: {
    // indexBottomNav,
    goodsList
  }
};
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>
