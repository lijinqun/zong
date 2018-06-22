<template>
  <div class="cart">
    <!-- 头部标题 -->
    <!-- <header class="top-title"> -->
      <!-- <span>商城</span> -->
      <!-- <span class="edit">编辑</span> -->
    <!-- </header> -->
    
    <div class="content">
      <!-- 搜索 -->
      <div class="search-box">
        <van-icon class="icon" name="search" @click="searchgoods(0)" />
        <input type="text" v-model="searchtext" placeholder="请输入商品名称...">
      </div>

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
      
      <!-- 购物车 -->
      <!-- <div v-else class="goods">
        <van-checkbox-group class="card-goods" v-model="checkedGoods">
          <van-checkbox class="card-goods__item" v-for="item in goods" :key="item.id" :name="item.id">
            <van-card :title="item.title" :desc="item.desc" :num="item.num" :price="formatPrice(item.price)" :thumb="item.thumb" />
          </van-checkbox>
        </van-checkbox-group>
        <van-submit-bar :price="totalPrice" :disabled="!checkedGoods.length" :button-text="submitBarText" />
      </div> -->

      <!-- 商品列表 -->
      <div class="goodsdataheight" id="iddataheight">
        <goodsList />
      </div>
    </div>
    

    <!-- 底部主导航 -->
    <index-bottom-nav :active="parseInt(bottomNavActive)"></index-bottom-nav>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar } from "vant";
// 引入底部主导航
import indexBottomNav from './../../components/indexBottomNav'

import goodsList from './../../components/goodsList'
import tools from '../../utils'
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
      searchtext:'',
      checkedGoods: ["1", "2", "3"],
      goods: [
        // {
        //   id: "1",
        //   title: "进口香蕉",
        //   desc: "约250g，2根",
        //   price: 200,
        //   num: 1,
        //   thumb:
        //     "https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg"
        // },
        // {
        //   id: "2",
        //   title: "陕西蜜梨",
        //   desc: "约600g",
        //   price: 690,
        //   num: 1,
        //   thumb:
        //     "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        // },
        // {
        //   id: "3",
        //   title: "美国伽力果",
        //   desc: "约680g/3个",
        //   price: 2680,
        //   num: 1,
        //   thumb:
        //     "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
        // }
      ]
    };
  },
  created(){
  },
  methods: {
    // formatPrice(price) {
    //   return (price / 100).toFixed(2);
    // }
    searchgoods(id){
      if(this.searchtext!=''){
        sessionStorage.setItem("searchgoodstxt",this.searchtext);
        this.$router.push('/goods/' + id);
      }
    },
    overflowheight(){
      document.getElementById('iddataheight').style.height=document.documentElement.clientHeight-105+'px';
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.overflowheight();
      sessionStorage.removeItem("newmerchantsid");
    });
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return "结算" + (count ? `(${count})` : "");
    },
    totalPrice() {
      return this.goods.reduce(
        (total, item) =>
          total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0),
        0
      );
    },
    
  },
  components: {
    indexBottomNav,
    goodsList,
  }
};
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>
