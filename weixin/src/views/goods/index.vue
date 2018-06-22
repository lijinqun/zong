<template>
  <div class="cart">
    <!-- 头部标题 -->
    <top-header title="商品列表" class="head"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/shoppingMail">
        <van-icon name="arrow-left" />
      </a>
      <span>商品列表</span>
      <span class="edit">编辑</span>
    </header> -->
    
    <div class="content" id='contentdata'>
      <!-- 空购物车 -->
      <!-- <div v-if="goods.length === 0" class="empty"> -->
        <!-- <div class="img-box">
          <img src="../../assets/91.png" alt="购物车">
        </div>
        <p>一家有态度的严选商城</p>
        <p>即将努力为您呈现</p>
        <p class="gray mb-20">坚持你所相信的 相信你所坚持的</p>
        <span class="find gray">
          去发现
        </span>
      </div> -->
          
      <div class="fixed">
        <van-tabs class="posfixed" :active="active" :swipe-threshold="threshold" @click="clicktab">
          <van-tab class="navbar-item" v-for="(navitem,key) in merchantcat" :title="navitem.name" :key="key" >
        </van-tab>
      </van-tabs>
      </div>
      <!-- 购物车 -->
        <div class="right" id='iright'>
        <div class="scroller">
          <ul class="lright" id='nright'>
            <li v-for='item in merchantList' @click='clickgood(item.id,item.isOnline)' :key="item.id" :value="item.id">
              <!-- <img v-bind:src="imgserverUrl+item.indexImage" class="lrightbigimg" onerror="javascript:this.src='http://bpic.588ku.com/element_origin_min_pic/01/47/02/12574338a640011.jpg'"> -->
              <img v-lazy="imgserverUrl+item.indexImage" class="lrightbigimg" :onerror="defaultImg">
              <p class="mdzz" style="-webkit-box-orient: vertical;">{{item.name}}</p>
              <p class="numbersize" v-if="item.id != 4424">￥{{item["discount"]}}
              <p class="numbersize" v-if="item.id == 4424">{{item["discount"]}}个
              <img src="../../assets/299.png" class="gwcimg" v-if="newmerchantsid=='0'" />
              <p class="shopbtn" v-if="newmerchantsid!='0'">{{item.isOnline==1?'上架中':'下架'}}</p>
              <!-- </p> -->
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品列表 -->
      <!-- <goodsList /> -->

    </div>
    

    <!-- 底部主导航 -->
    <index-bottom-nav :active="parseInt(bottomNavActive)"></index-bottom-nav>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar } from "vant";
// 引入底部主导航
import indexBottomNav from './../../components/indexBottomNav'

import { getGoodsList,imgserverUrl ,searchGoodsList,setTitle,getGoodsCategory,updateGoodsonline} from "./../../api";

import goodsList from './../../components/goodsList'
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
      defaultImg: 'this.src="' + require('../../assets/dishe.gif') + '"'
    };
  },
  mounted () {
    this.gettab();
    this.getlidata();
  },
  created () {
    setTitle('从众链商新零售');
    // 默认显示的页面
    this.title()
  },
  methods: {
    title(){
        let zhethis = this;
        zhethis.$nextTick(() => {
          // 获取当前的下标
          let subscript = sessionStorage.getItem("subscript");
        zhethis.active = subscript;
      })
    },
    overflowheight(){
      
      setTimeout(function(){
        console.log(document.getElementById('contentdata').offsetHeight)
        if(document.getElementById('contentdata').offsetHeight<document.documentElement.clientHeight){
          document.getElementById('contentdata').style.height = document.documentElement.clientHeight-40+'px';
        }
      },200)
      
      
    },
    clicktab(data){
      let zhethis=this;
      let isonline='1';
      this.clickdata=data;
      if(this.newmerchantsid!='0'){
        isonline='';
      }
      getGoodsList(this.merchantcat[data].id,this.newmerchantsid,isonline).then(response => {
          zhethis.merchantList = response.data;
          zhethis.overflowheight();
        })
    },
    gettab(data){
      let clickparent= sessionStorage.getItem("setgoodsparentId") || '';
      // this.newmerchantsid= sessionStorage.getItem("newmerchantsid") || '';
      let zhethis=this;
      let goodsid=this.$route.params.id || sessionStorage.getItem("goodsiddata");
      let searchgoodstxt=sessionStorage.getItem("searchgoodstxt");
      if(goodsid == '0'){
          getGoodsCategory('3','',this.newmerchantsid,searchgoodstxt).then(response => {
          zhethis.merchantcat =[];
        
          // for (var i = 0; i < response.data.list.length; i++) {
          //   if(clickparent!=''){
          //     if(response.data.list[i].parentId==clickparent){
          //       zhethis.merchantcat.push(response.data.list[i])
          //     }
          //   }else{
          //     zhethis.merchantcat.push(response.data.list[i])
          //   }
          // }
          zhethis.merchantcat = response.data.list;
        })
      }else{
          getGoodsCategory('3','',this.newmerchantsid,'').then(response => {
          zhethis.merchantcat =[];
        
          for (var i = 0; i < response.data.list.length; i++) {
            if(clickparent!=''){
              if(response.data.list[i].parentId==clickparent){
                zhethis.merchantcat.push(response.data.list[i])
              }
            }else{
              zhethis.merchantcat.push(response.data.list[i])
            }
          }
        })
      }
    },
    getlidata(){
      let zhethis=this;
      let goodsid=this.$route.params.id || sessionStorage.getItem("goodsiddata");
      let isonline='1';
      if(this.newmerchantsid!='0'){
        isonline='';
      }
      if(goodsid=='0'){
        let searchgoodstxt=sessionStorage.getItem("searchgoodstxt");
        searchGoodsList(searchgoodstxt).then(response => {
          zhethis.merchantList = response.data;
          zhethis.overflowheight();
        })
      }else{
        getGoodsList(goodsid,this.newmerchantsid,isonline).then(response => {
          zhethis.merchantList = response.data;
          zhethis.overflowheight();
        })
      }
    },
    submitBarText() {
      const count = this.checkedGoods.length;
      return "结算" + (count ? `(${count})` : "");
    },
    totalPrice() {
      return this.goods.reduce(
        (total, item) =>
          total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.discount : 0),
        0
      );
    },
    clickgood(id,online){
      if(this.newmerchantsid!='0'){
        let thisonline=online=='1'?'0':'1';
        // Dialog.alert({
        //   title: '温馨提示',
        //   message: ''
        // }).then(() => {
        //     
        // });
        updateGoodsonline(id,thisonline).then(response => {
          this.clicktab(this.clickdata);
        })
      }else{
        sessionStorage.setItem("goodsiddata",this.$route.params.id);
        this.$router.push('/goodsdetails/' + id);
      }
    },
  },
  components: {
    indexBottomNav,
    goodsList
  }
};
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>
