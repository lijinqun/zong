<template>
  <div class="top-search">
    
    <!-- <div class="search-box">
      <van-icon class="icon" name="search" @click="searchgoods(0)" />
      <input type="text" v-model="searchtext" placeholder="请输入商品名称...">
    </div> -->

    <van-row class="dataheight" v-if="!(goodsCategory.length === 0 && show === false)">
      <van-col span="5" class="height100 ulbg">
        <div class="divoverflow">
          <van-badge-group style="width:100%;background:#f5f5f5;" :active-key="activeKey">
            <van-badge v-for="(list,index) in goodsCategory" :title="list.name" @click="clickgoodsCategory(list.id,index)" :key="index" style="font-size:12px;"/>
          </van-badge-group>
        </div>
      </van-col>
      <van-col span="19" class="height100" style="background:#f2f2f2;">
        <div class="divoverflow">
          <ul class="grade2css">
            <li v-for='item in goodsitem2' :value="item.id" v-if="item.childs&&item.childs!=''">
              <p>{{item.name}}</p>
              <ul class="lright" id='nright'>
                   <li v-for='(ss,key) in item.childs' @click='gogoods(ss.id,ss.parentId,key)' :key="ss.id">
                  <!-- <img :src="imgserverUrl+ss.image" class="lrightbigimg"> -->
                  <img v-lazy="imgserverUrl+ss.image" class="lrightbigimg" :onerror="defaultImg">
                  <!-- <img src="../../static/img/nonestock.png" class="nonestock" v-if="ss['wechatGood.dummyStock']>0&&ss['wechatGood.stock']>=ss['wechatGood.dummyStock']" alt=""> -->
                  <p class="mdzz" style="-webkit-box-orient: vertical;">{{ss.name}}</p>
                  <!-- <p class="numbersize">￥{{ss["price"]}} -->
                  <!-- <img src="../../assets/cartcheck.png" class="gwcimg">  -->
                  <!-- </p> -->
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- <ul class="lright" id='nright'>
          <li v-for='(ss,index) in merchantList' @click='addCart(ss.id)' :key="index">
            <img v-bind:src="imgserverUrl+ss.indexImage" class="lrightbigimg" onerror="javascript:this.src='http://bpic.588ku.com/element_origin_min_pic/01/47/02/12574338a640011.jpg'">
            <!-- <img src="../../static/img/nonestock.png" class="nonestock" v-if="ss['wechatGood.dummyStock']>0&&ss['wechatGood.stock']>=ss['wechatGood.dummyStock']" alt=""> -->
           <!--  <p class="mdzz" style="-webkit-box-orient: vertical;">{{ss.name}}</p>
            <p class="numbersize">￥{{ss["price"]}}
            <img src="../../assets/cartcheck.png" class="gwcimg"> 
            </p>
          </li>
        </ul> -->
      </van-col>
    </van-row>


    <!-- <div style="overflow: hidden">
    <div id="left-pane" >
      <div class="scroller">
        <ul class="left" id='bleft' style="">
          <li  v-for="(dt,index) in dishtype" @click='chooseType(dt.id,index)'  v-bind:class="{'checked':index==idx}">
            <span href="javascript:void(0)" v-text='dt.name' class="la" style="text-decoration: none"></span>
          </li>
        </ul>
        <div style="display: none">{{watch}}</div>
      </div>
    </div>

    <div class="right" id='iright'>
      <div class="scroller">
        <ul class="lright" id='nright'>
          <li v-for='(ss,index) in merchantList' @click='goDetail(index,$event)' >
            <img v-bind:src="$store.state.commenturl.newbaseimgurl+ss.image" alt="" style="width:4.4rem;height:4.4rem;margin-top: 0.5rem;" onerror="javascript:this.src='http://bpic.588ku.com/element_origin_min_pic/01/47/02/12574338a640011.jpg'">
            <img src="../../static/img/nonestock.png" class="nonestock" v-if="ss['wechatGood.dummyStock']>0&&ss['wechatGood.stock']>=ss['wechatGood.dummyStock']" alt="">
            <p class="mdzz" style="-webkit-box-orient: vertical;">{{ss.name}}</p>

            <p style="position: relative;font-size: 0.65rem;color: #ea521f;margin: 0;margin-top: 0.2rem">￥{{ss.amount}}
            <img src="../assets/icon/cartcheck.png" v-if="!(ss['wechatGood.dummyStock']>0&&ss['wechatGood.stock']>=ss['wechatGood.dummyStock'])" class="gwcimg" @click.stop='addCart(index)'> 
            </p>
          </li>
        </ul>

      </div>
    </div>
    <div>
    </div>
  </div> -->


  </div>
</template>

<script>
import { imgserverUrl,getGoodsCategory,getGoodsList } from "./../../api";
export default {
  props: {
    newmerchantsid: {
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeKey: 0,
      imgserverUrl:imgserverUrl,
      goodsitem2:[],
      goodsCategory:[
        // {
        //   id:'2',
        //   name:'苹果手机'
        // }
      ],
      merchantList:[
        // {
        //   id:2,
        //   indexImage:"/upload/goods/2018030491833.jpeg",
        //   name:"iphone8",
        //   'spec.price':6000
        // }
      ],
      searchtext:'',
      defaultImg: 'this.src="' + require('../../assets/dishe.gif') + '"' 
    };
  },
  methods: {
    onClick(key) {
      sessionStorage.setItem("goodactiveKey",key);
      this.activeKey = key;
    }
  },
  created () {
    this.$nextTick(() => {
      let clickactiveKey = 0;
      let zhethis=this;
      if(sessionStorage.getItem("goodactiveKey")&&sessionStorage.getItem("goodactiveKey")!=undefined&&sessionStorage.getItem("goodactiveKey")!='undefined'&&sessionStorage.getItem("goodactiveKey")!=''){
        clickactiveKey=sessionStorage.getItem("goodactiveKey");
      }
      clickactiveKey = parseInt(clickactiveKey);
      setTimeout(function(){
        getGoodsCategory('1','',zhethis.newmerchantsid).then(response => {
          zhethis.goodsCategory = response.data.list;
          zhethis.clickgoodsCategory(zhethis.goodsCategory[clickactiveKey].id,clickactiveKey);
        })
      },200)
    })
  },
  methods: {
    clickgoodsCategory(id,index){
      let zhethis=this;
      let thisdata=[];
      sessionStorage.setItem("goodactiveKey",index);
       this.activeKey = index;
        getGoodsCategory('2',id,this.newmerchantsid).then(response => {
          console.log(response.data)
          thisdata=response.data.list;
          getGoodsCategory('3','',this.newmerchantsid).then(response => {
            console.log(response.data)
            for (var i = 0; i < thisdata.length; i++) {
              for (var k = 0; k < response.data.list.length; k++) {
                if(response.data.list[k].parentId==thisdata[i].id){
                  if(thisdata[i].childs==undefined){
                    thisdata[i].childs=[];
                  }
                  thisdata[i].childs.push(response.data.list[k]);
                }
              }
            }
            zhethis.goodsitem2 = thisdata;
            // zhethis.overflowheight(zhethis);
          })
        })
    },
    gogoods(id,parentId,key){
      //当前点击的下标
      sessionStorage.setItem("subscript",key);
      sessionStorage.setItem("setgoodsparentId",parentId);
      console.log(this.newmerchantsid)
      if(this.newmerchantsid){
        sessionStorage.setItem("newmerchantsid",this.newmerchantsid);
      }
      this.$router.push('/goods/' + id);
      // alert(parentId)
    },
    searchgoods(id){
      if(this.searchtext!=''){
        sessionStorage.setItem("searchgoodstxt",this.searchtext);
        this.$router.push('/goods/' + id);
      }
    },
    overflowheight(){
      document.getElementById('iddataheight').style.height=document.documentElement.clientHeight-145+'px';
    }
    // clickgoodsCategory(id,index){
    //   this.activeKey = index;
    //   getGoodsList(id).then(response => {
    //     console.log(response.data)
    //     this.merchantList = response.data;
    //   })
    // },
    // addCart(id){
    //   this.$router.push('/goodsdetails/' + id);
    // }
  }
};
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>