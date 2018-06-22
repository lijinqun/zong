<template>
  <div class="cart">
    <!-- 头部标题 -->
    <header class="top-title">
      <van-icon name="arrow-left" @click="go"/>
      <span>购物车</span>
      <span class="edit" v-if="goodsdata.length > 0" @click="clickedit()">{{clickedittxt}}</span>
    </header>
    <!-- <top-header title="购物车"></top-header>
    <span class="edit" v-if="goodsdata.length > 0" @click="clickedit()">{{clickedittxt}}</span> -->
    
    <div class="content" id="content">
      <!-- 空购物车 -->
      <div v-if="goodsdata.length === 0" class="empty" @click="turnRouter">
        <!-- <div class="img-box">
          <img src="../../assets/91.png" alt="购物车">
        </div>
        <p>一家有态度的严选商城</p>
        <p>即将努力为您呈现</p>
        <p class="gray mb-20">坚持你所相信的 相信你所坚持的</p>
        <span class="find gray">
          去发现
        </span> -->
        <img src="../../assets/cart.jpg">
      </div>
      
      <!-- 购物车 -->
      <!-- <div v-for="item in goodsdata" class="goodsdatacss">
        <van-checkbox-group class="card-goods" v-model="checkedGoods">
          <van-checkbox class="card-goods__item goodscheckboxcss" :key="item.id" :name="item.id">
              <van-card class="goodsdatacss" :title="item['goods.name']" :desc="item.desc"  :price="item['goodsSpec.price']" :thumb="imgserverUrl+item['goods.indexImage']">
              </van-card>
          </van-checkbox>
        </van-checkbox-group>
        <div class="footerstepper">
          <van-stepper @change="clickquantity(item.id,item.quantity)" v-model="item.quantity" />
        </div>
      </div> -->


  <!--     <van-checkbox-group v-model="checkedGoods">
        <van-cell-group>
          <van-cell v-for="(item, index) in goodsdata" :key="item.id">
            <van-checkbox :name="item">复选框复选框复选框复选框复选框复选框复选框复选框 {{ item.id }}</van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>

      <van-cell v-for="(item, index) in list" :key="item" :value="item.id">
        <van-checkbox :name="item">复选框 {{ item.id }}</van-checkbox>
      </van-cell>

    <van-cell-group>
  <van-cell value="内容" />
</van-cell-group> -->

      <ul class="goodsul" id="goodsdataheight">
        <li class="goodsdatacss" v-for="tabs in goodsdata">
          <div class="merchantname">{{tabs.merchantName}}</div>
          <div v-for="item in tabs.cartItems" class="posrelative">
            <div @click="clickcheckbox(item.id)">
              <van-icon name="checked" v-if="checkedGoods.indexOf(item.id)>-1" style="color:#06bf04;font-size:1.25rem;" />
              <van-icon name="check" v-if="checkedGoods.indexOf(item.id)<0" style="color:#aaaaaa;font-size:1.25rem;" />
              <div class="goodswidth">
                <van-row>
                  <van-col span="8"><img class="goodsimgcss" v-lazy="imgserverUrl+item['goods.indexImage']" :onerror="defaultImg"></van-col>
                  <van-col span="16">
                    <p class="goodstitle">{{item['goods.name']}}</p>
                    <p class="goodsspec">{{item['goodsSpec.valueNames']}}</p>
                    <p class="goodsprice" v-if="item.goodId != 4424">￥{{item['goodsSpec.discount']}}</p>
                    <p class="goodsprice" v-if="item.goodId == 4424">{{item['goodsSpec.discount']}}个</p>
                  </van-col>
                </van-row>
              </div>
            </div>
            <div class="footerstepper">
              <van-stepper ref="stepperwidthcss" @change="clickquantity(item.id,item.quantity)" :disabled="item.machineId != null"  v-model="item.quantity" />
            </div>
          </div>
        </li>
      </ul>
      

      <div class="footer" v-if="goodsdata.length > 0">
        <ul class="cartfooterbtn" ref="footerbtn">
          <li class="leftbtn" v-if="clickeditnum=='1'">
            <p class="allcheckbox" @click="clickallcheck()">
              <van-icon name="checked" v-show="allchecked" style="color:#06bf04;font-size:1.25rem;" />
              <van-icon name="check" v-show="allchecked==false" style="color:#aaaaaa;font-size:1.25rem;" />
              <span>全选</span>
            </p>
            <p class="footernum">总计￥{{totalPrice}}</p>
          </li>
          <li class="leftbtn" v-if="clickeditnum=='2'">
            <p class="allcheckbox" @click="clickallcheck()">
              <van-icon name="checked" v-show="allchecked" style="color:#06bf04;font-size:1.25rem;" />
              <van-icon name="check" v-show="allchecked==false" style="color:#aaaaaa;font-size:1.25rem;" />
              <span>全选</span>
            </p>
          </li>
          <li class="rightbtn" @click="clickfooterbtn()">{{clickeditbtntxt}}</li>
        </ul>
      </div>


    </div>

    <!-- 底部主导航 -->
    <index-bottom-nav :active="parseInt(bottomNavActive)"></index-bottom-nav>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar , Toast } from "vant";
// 引入底部主导航
import indexBottomNav from './../../components/indexBottomNav'

import { imgserverUrl,getGoodCart,removeGoodCart,updateGoodCart } from "./../../api";

export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      imgserverUrl:imgserverUrl,
      clickedittxt:'编辑',
      clickeditbtntxt:'去结算',
      clickeditnum:1,
      bottomNavActive: 3,
      checkedGoods: [],
      totalPrice:0,
      goodsdata: [],
      goodsnumber:1,
      allchecked:true,
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      defaultImg: 'this.src="' + require('../../assets/dishe.gif') + '"' ,
      consistent:true
    };
  },
  methods: {
    // formatPrice(price) {
    //   return (price).toFixed(2);
    // }
  },
  watch: {
    checkedGoods: function(newValue, oldValue) {
      this.checkedGoods=newValue;
      this.checkgoodiddata();
      let goodslength=0;
      for (var i = 0; i < this.goodsdata.length; i++) {
        goodslength+=this.goodsdata[i].cartItems.length;
      }
      if(this.checkedGoods.length==goodslength){
        this.allchecked=true;
      }else{
        this.allchecked=false;
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.getGoodCartfunction();
      
    })
  },
  mounted(){
    
  },
  methods: {
    go(){
      // this.$router.go(-1)
        const routerHistory = sessionStorage.getItem('routerHistory') ? JSON.parse(sessionStorage.getItem('routerHistory')) : ['/']
        console.log(routerHistory[routerHistory.length - 2])
        if(routerHistory[routerHistory.length - 2] != undefined){
            this.$router.push(routerHistory[routerHistory.length - 2])
        }else{
            this.$router.push('/')
        }
    },
    overflowheight(){
      setTimeout(function(){
        if(document.getElementById('goodsdataheight').clientHeight<document.documentElement.clientHeight-175){
          document.getElementById('goodsdataheight').style.height=document.documentElement.clientHeight-175+'px';
        }
      },300)
      
    },
    clickallcheck(){
      if(this.allchecked){
        this.allchecked=false;
        this.checkedGoods=[];
      }else{
        this.allchecked=true;
        this.checkedGoods=[];
        for(let i=0;i<this.goodsdata.length;i++){
          for(let h=0;h<this.goodsdata[i].cartItems.length;h++){
            this.checkedGoods.push(this.goodsdata[i].cartItems[h].id);
          }
        }
      }
    },
    checkgoodiddata(){
      this.totalPrice=0;
      if(this.checkedGoods.length=='0'){
        this.totalPrice=0;
        return
      }
      
      for(let i=0;i<this.checkedGoods.length;i++){
        for(let k=0;k<this.goodsdata.length;k++){
          for(let j=0;j<this.goodsdata[k].cartItems.length;j++){
            if(this.checkedGoods[i]==this.goodsdata[k].cartItems[j].id){
              this.totalPrice+=this.goodsdata[k].cartItems[j]["goodsSpec.discount"]*this.goodsdata[k].cartItems[j].quantity;
            }
          }
        }
      }
      this.totalPrice=this.totalPrice.toFixed(2);
    },
    getGoodCartfunctionNonecheced(){
      let zhethis=this;
      getGoodCart(this.userInfo.id).then(response => {
        zhethis.goodsdata = response.data;
        zhethis.overflowheight();
      })
    },
    getGoodCartfunction(){
      let zhethis=this;
      zhethis.checkedGoods=[];
      getGoodCart(this.userInfo.id).then(response => {
        zhethis.goodsdata = response.data;
        zhethis.allchecedbtn(zhethis);
        zhethis.overflowheight();
      })
    },
    allchecedbtn(zhethis){
      for(let i=0;i<zhethis.goodsdata.length;i++){
        for(let h=0;h<zhethis.goodsdata[i].cartItems.length;h++){
          zhethis.checkedGoods.push(zhethis.goodsdata[i].cartItems[h].id);
        }
      }
    },
    clickedit:function(){
      let zhethis=this;
      this.$refs.footerbtn.className +=' animationclass';
      setTimeout(function(){
        if(zhethis.clickeditnum==1){
          zhethis.clickedittxt='完成';
          zhethis.clickeditbtntxt='删除';
          zhethis.clickeditnum=2;
          zhethis.checkedGoods=[];
        }else{
          zhethis.clickedittxt='编辑';
          zhethis.clickeditbtntxt='去结算';
          zhethis.clickeditnum=1;
          zhethis.checkedGoods=[];
          zhethis.allchecedbtn(zhethis);
        }
      },200)
      setTimeout(function(){
        zhethis.$refs.footerbtn.className ='cartfooterbtn';
      },400)
    },
    clickfooterbtn: function(){
      let zhethis=this;
      let isSinglePaymentMode = []
      if(this.clickeditnum==1){
        getGoodCart(this.userInfo.id).then(response => {
          let goodsdata = response.data;
          for(let i=0;i<goodsdata.length;i++){
            for(let k=0;k<goodsdata[i].cartItems.length;k++){
              for(let v=0;v<zhethis.checkedGoods.length;v++){
                if(zhethis.checkedGoods[v] == goodsdata[i].cartItems[k].id){
                  isSinglePaymentMode.push(goodsdata[i].cartItems[k]['goodsSpec.isSinglePaymentMode'])
                }
              }
            }
          }
          console.log("isSinglePaymentMode")
          console.log(isSinglePaymentMode)
          // goodsSpec.isSinglePaymentMode = 0 数组
          let isSinglePaymentMode_0 = []
          // goodsSpec.isSinglePaymentMode = 0 数组
          let isSinglePaymentMode_1 = []
          for(let c=0;c<isSinglePaymentMode.length;c++){
            if(isSinglePaymentMode[c] == 0){
              isSinglePaymentMode_0.push(isSinglePaymentMode[c])
            }else if(isSinglePaymentMode[c] == 1){
              isSinglePaymentMode_1.push(isSinglePaymentMode[c])
            }
          }
          if(isSinglePaymentMode_0.length != 0 && isSinglePaymentMode_1 != 0){
            console.log("goodsdata")
            
              for(let p=0;p<this.goodsdata[0].cartItems.length;p++){
                  if(this.goodsdata[0].cartItems[p]['goodsSpec.isSinglePaymentMode'] == 1){
                    Toast.fail(this.goodsdata[0].cartItems[p]['goods.name'] + '商品只能单独提交！');
                    return
                  }
              }
            return
          }
          if(isSinglePaymentMode_0.length == 0 && isSinglePaymentMode_1.length > 1){
            Toast.fail('商品goodsSpec.isSinglePaymentMode只能选一个');
            return
          }

          if(isSinglePaymentMode_0.length != 0 && isSinglePaymentMode_1.length == 0){
            sessionStorage.setItem('isSinglePaymentMode',isSinglePaymentMode_0[0]);
          }else if(isSinglePaymentMode_0.length == 0 && isSinglePaymentMode_1.length != 0){
            sessionStorage.setItem('isSinglePaymentMode',isSinglePaymentMode_1[0]);
          }
          sessionStorage.setItem('goodslist',this.checkedGoods.join(','));
          this.$router.push("/payorder");
        })
        // sessionStorage.setItem('goodslist',this.checkedGoods.join(','));
        // this.$router.push("/payorder");
      }else{
        removeGoodCart(this.userInfo.id,this.checkedGoods.join(',')).then(response => {
          console.log(response)
          if (response.code === '200') {
            Toast.success('删除成功');
            zhethis.getGoodCartfunctionNonecheced();
          }
        })
      }
    },
    clickquantity(id,data){
      let zhethis=this;
      updateGoodCart(this.userInfo.id,id,data).then(response => {
        zhethis.getGoodCartfunctionNonecheced();
      })
      this.checkgoodiddata();
    },
    clickcheckbox(id){
      if(this.checkedGoods.indexOf(id)<0){
        this.checkedGoods.push(id)
      }else{
        this.checkedGoods.splice(this.checkedGoods.indexOf(id),1)
      }
    },
    turnRouter() {
      this.$router.push('/shoppingMail')
    }
  },
  computed: {
    
    submitBarText() {
      const count = this.checkedGoods.length;
      return "结算" + (count ? `(${count})` : "");
    },
    // totalPrice() {
    //   return this.goodsdata.reduce(
    //     (total, item) =>
    //       total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0),
    //     0
    //   );
    // }
  },
  components: {
    indexBottomNav
  }
};
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>