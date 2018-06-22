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
      <div class="fixed">
        <van-tabs class="posfixed" :active="active" :swipe-threshold="threshold" @click="clicktabId">
          <van-tab class="navbar-item" v-for="(item,key) in sellinList" :title="item.name" :key="key" >
        </van-tab>
      </van-tabs>
      </div>
      <!-- 购物车 -->
      <div class="right" id='iright'>
        <div class="scroller">
          <ul class="lright" id='nright'>
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              :offset="offsetheight"
            >
              <li v-for='item in sellinListdata' @click='clickgood(item.id,item.isOnline)' :key="item.id" :value="item.id">
                  <img v-lazy="imgserverUrl+item.indexImage" class="lrightbigimg" :onerror="defaultImg">
                <p class="mdzz" style="-webkit-box-orient: vertical;">{{item.name}}</p>
                <p class="numbersize">￥{{item["discount"]}}
                <img src="../../assets/299.png" class="gwcimg" v-if="newmerchantsid=='0'">
                <p class="shopbtn" v-if="newmerchantsid!='0'">{{item.isOnline==1?'上架中':'下架'}}</p>
              </li>
            </van-list>
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

import { getGoodsList,imgserverUrl ,searchGoodsList,setTitle,getGoodsCategory,updateGoodsonline,getGoodsSelling} from "./../../api";

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
      defaultImg: 'this.src="' + require('../../assets/1.jpg') + '"',
      sellinList:[
        {
          name:'数码产品',
          id:'10'
        },
        {
          name:'家用电器',
          id:'47'
        },
        {
          name:'食品生鲜',
          id:'48'
        },
        {
          name:'酒水茶饮',
          id:'49'
        },
        {
          name:'美妆个护',
          id:'45'
        },
        {
          name:'箱包皮具',
          id:'44'
        },
        {
          name:'家居日用',
          id:'56'
        },
        {
          name:'男装女装',
          id:'46'
        },
        {
          name:'男鞋女鞋',
          id:'25'
        },
        {
          name:'母婴儿童',
          id:'50'
        },
      ],//商品title
      sellinListdata:[],
      offsetheight:20,
      loading: false,
      finished: false,
      pageNumber:1,
      pageSize:6,
      totalPage:0,
      index:0,
      parentId:10,
    };
  },
  mounted () {
    // 热门商品类别
    this.merchantcatSelling();
    // this.gettab();
  },
  created () {
    setTitle('从众链商');
    // 默认显示的页面
    this.title();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  methods: {
    // 商品默认显示第一个
    merchantcatSelling(){
      let _this = this;
      // 判断用户是排行榜进来还是首页底部热卖进来的
      if(this.$route.params.id != 1){
          this.parentId = this.$route.params.id;
      }
      getGoodsSelling(this.parentId,this.pageNumber,this.pageSize).then(res => {
          _this.sellinListdata = res.data.list;
          _this.totalPage = res.data.totalPage;
          _this.overflowheight()
      })
    },
    //  // 滚动加载
    onLoad() {
      let _this = this;
        setTimeout(() => { 
            if(_this.index == 0){
            getGoodsSelling(this.parentId,this.pageNumber,this.pageSize).then(res => {
                  _this.totalPage = res.data.totalPage;
                  _this.index = 1;
                  if(_this.pageNumber < _this.totalPage){
                      _this.pageNumber++;
                      getGoodsSelling(_this.parentId,this.pageNumber,this.pageSize).then(res => {
                        _this.sellinListdata.push(...res.data.list)
                        _this.loading = false;
                      })
                  }else{
                    _this.loading = false;
                    _this.finished = true;
                  }
              })
            }else{
                if(_this.pageNumber < _this.totalPage){
                    _this.pageNumber++;
                    getGoodsSelling(_this.parentId,this.pageNumber,this.pageSize).then(res => {
                      _this.sellinListdata.push(...res.data.list)
                      _this.loading = false;
                    })
                }else{
                  _this.loading = false;
                  _this.finished = true;
                }
            }

            
        }, 1); 
    },
    // 点击title 获取对应的数据
    clicktabId(data){
      let _this = this;
       _this.parentId = this.sellinList[data].id;
       _this.pageNumber = 1;
      getGoodsSelling(_this.parentId,_this.pageNumber,_this.pageSize).then(res => {
          _this.sellinListdata = res.data.list;
        })
    },
    title(){
        let _this = this;
        _this.$nextTick(() => {
          // 获取当前的下标
          // let subscript = sessionStorage.getItem("subscript");
        for(let i = 0;i<_this.sellinList.length;i++){
          if(_this.sellinList[i].id == _this.$route.params.id){
              _this.active = i;
          }
        } 
      })
    },
// .......................................................................................................................................................

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
      getGoodsCategory('3','',this.newmerchantsid).then(response => {
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
