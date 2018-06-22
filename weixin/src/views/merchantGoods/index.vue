<template>
  <div class="cart">
    <!-- 头部标题 -->
    <top-header title="商品列表"></top-header>
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
          
      <van-tabs class="posfixed" :active="active" :swipe-threshold="threshold" @click="clicktab">
        <van-tab class="navbar-item" v-for="(navitem,key) in merchantcat" :title="navitem.name" :key="key">

        <!-- 购物车 -->
        <div class="right" id='iright'>
        <div class="scroller">
          <ul class="lright" id='nright'>
            <li v-for='item in goodsList' @click='clickgood(item.id,item.isOnline)' :key="item.id" :value="item.id">
              <img v-bind:src="imgserverUrl+item.indexImage" class="lrightbigimg" onerror="javascript:this.src='http://bpic.588ku.com/element_origin_min_pic/01/47/02/12574338a640011.jpg'">
              <p class="mdzz" style="-webkit-box-orient: vertical;">{{item.name}}</p>
              <p class="numbersize">￥{{item["discount"]}}
              <img src="../../assets/299.png" class="gwcimg" v-if="newmerchantsid=='0'">
              <p class="shopbtn" v-if="newmerchantsid!='0'">{{item.isOnline==1?'上架中':'下架'}}</p>
              </p>
            </li>
          </ul>

        </div>
      </div>

      </van-tab>
    </van-tabs>

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

import { getGoodsList,imgserverUrl ,searchGoodsList,setTitle,getGoodsCategory,updateGoodsonline, listGroupByCat, getGoodsAllByGrup} from "./../../api";

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
      goodsList: []
    };
  },
  mounted () {
    this.getList();
    this.$nextTick(() => {
      this.overflowheight();
    })
    // this.getlidata();
  },
  created () {
    setTitle('从众链商新零售');
  },
  methods: {
    overflowheight(){
      setTimeout(function(){
        console.log(document.getElementById('contentdata').offsetHeight)
        if(document.getElementById('contentdata').offsetHeight<document.documentElement.clientHeight){
          document.getElementById('contentdata').style.height = document.documentElement.clientHeight-40+'px';
        }
      },200)
      
      
    },
    clicktab(index, title){
      getGoodsAllByGrup(this.merchantcat[index].id, this.$route.params.id).then(_res => {
        this.goodsList = _res.data
      })
    },
    getList (){
      getGoodsCategory('1', '', this.$route.params.id).then(res => {
        this.merchantcat = res.data.list
        if (res.data.list.length > 0) {
          getGoodsAllByGrup(res.data.list[0].id, this.$route.params.id).then(_res => {
            this.goodsList = _res.data
          })
        }
      })
      // listGroupByCat(this.$route.params.id).then(res => {
      //   this.merchantcat = res.data
      // })
    },
    // getlidata(){
    //   let zhethis=this;
    //   let goodsid=this.$route.params.id || sessionStorage.getItem("goodsiddata");
    //   let isonline='1';
    //   if(this.newmerchantsid!='0'){
    //     isonline='';
    //   }
    //   if(goodsid=='0'){
    //     let searchgoodstxt=sessionStorage.getItem("searchgoodstxt");
    //     searchGoodsList(searchgoodstxt).then(response => {
    //       zhethis.merchantList = response.data;
    //       zhethis.overflowheight();
    //     })
    //   }else{
    //     getGoodsList(goodsid,this.newmerchantsid,isonline).then(response => {
    //       zhethis.merchantList = response.data;
    //       zhethis.overflowheight();
    //     })
    //   }
    // },
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
    // indexBottomNav,
    // goodsList
  }
};
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>
