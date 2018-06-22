<template>
  <div class="goods-info">
    <!-- 头部标题 -->
    <top-header title="商品详情"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="javascript:void(0)" onClick="javascript :history.back(-1);">
        <van-icon name="arrow-left" />
      </a>
      <span>商品详情</span>
    </header> -->
    <!-- 商品轮播图 -->
    <van-swipe :autoplay="3000" class="goods-banner">
      <van-swipe-item v-for="(item, imgindex) in info.images" :key="imgindex">
        <img class="banner-img" :src="imgserverUrl + item.image" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 商品简介 -->
    <div class="simple-info">
      <div class="countdown" v-show="countdown">
        <div>
          <i>剩余抢购时间：</i>
          <span>{{shi}}</span>:
          <span>{{fen}}</span>:
          <span>{{miao}}</span>
        </div>
      </div>
      <p class="title">{{info.name}}</p>
      <p class="num"><span class="price" v-if="info.id != 4424">¥{{formatDiscount()}}</span><span class="price" v-if="info.id == 4424">{{formatDiscount()}}个</span><span class="marleft">市场价</span><span class="discountcss">¥{{formatPrice()}}</span></p>
      <!-- <p class="discountcss"></p> -->
    </div>
    <!-- 已选 -->
    <div class="clickspecdata" @click="show = true">
      <p class="nowclickcss">已选：<span class="colorback">{{nowclickname}}</span></p>
      <van-icon class="rightclick" name="arrow" />
    </div>
    <!-- 商品详情 -->
    <div class="more-info">
      <p>商品详情</p>
      <div class="content" v-html="info.detail"></div>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="home"  @click="$router.push('/')" text="首页"/>
      <van-goods-action-mini-btn icon="chat" text="客服" @click="$router.push('/newsnoticeDetails/11')"/>
      <!-- <van-goods-action-mini-btn icon="cart" @click="gocart()" text="购物车" :info="cartnumber" /> -->
      <van-goods-action-mini-btn icon="shop" text="店铺" />
      <!-- <van-goods-action-big-btn class="addbtncolor" text="加入购物车" @click="show = true" style="background:#1b1c20;"/> -->
      <van-goods-action-big-btn class="addbtncolor" text="选择规格" @click="show = true"/>
      <!-- <van-goods-action-big-btn text="立即购买" primary /> -->
    </van-goods-action>
    <!-- 商品弹出层 -->
    <van-popup v-model="show" position="bottom">
      <div class="single-info">
        <div class="top-info">
          <img class="topimg" :src="imgserverUrl + info.indexImage" alt="">
          <div class="right-info">
            <!-- <p>{{info.name}}</p> -->
            <p class="redtxt" v-if="info.id != 4424">¥{{nowprice}}</p>
            <p class="redtxt" v-if="info.id == 4424">{{nowprice}}个</p>
            <!-- <p>库存：{{stock || 0}}</p> -->
            <p class="clickspec">已选：{{nowclickname}}</p>
          </div>
          <div class="closebtn"><van-icon @click="show=false" name="close" /></div>
        </div>
        <div class="content" v-for="(item, liindex) in info.specLabel">
          <p class="title">{{item.levelName}}</p>
          <ul>
            <!-- <li v-for="item2 in item.levelList" :class="{'active': activeIndexbox['liactive'+liindex] === item2.id}" :value="item2.id" :key="item2.id" @click="changeType(liindex,item2.id,item2.specLabelId)">{{item2.name}}</li> -->
            <li v-for="item2 in item.levelList" :class="{'active': activeIndexbox[liindex] == item2.id}" :value="item2.id" :key="item2.id" @click="changeType(liindex,item2.id,item2.specLabelId,item2.name)">{{item2.name}}</li>
          </ul>
          <!-- 选择智能云柜对应的属性 -->
          <van-cell-group v-show="dizhi">
            <van-cell :title="choose"  @click="showarea=true" is-link style="font-size:14px;padding:10px 0;" class="van-hairline--bottom van-hairline--top"/>
          </van-cell-group>
          <!-- <p @click="showarea=true" v-show="countdown" style="font-size:14px;padding:10px 0;" class="van-hairline--bottom van-hairline--top">{{choose}}</p> -->
        </div>
        <div class="qty-info">
          <p>数量</p>
          <div>
            <van-stepper v-model="qty" />
          </div>
        </div>
        <!-- <div class="fooderbtn">
          <van-button type="primary" class="addbtn" bottom-action @click="submitCart()">加入购物车</van-button>
        </div> -->
        
        <van-row>
          <van-col span="12">
            <van-button type="primary" class="addbtn" bottom-action :disabled="countdown" @click="submitCart()">确定</van-button>
            <!-- <van-button type="primary" class="addbtn" bottom-action @click="show=false">确定</van-button> -->
          </van-col>
          <van-col span="12">
            <van-button type="primary" bottom-action :disabled="countdown" @click="submitCart(1)">立即购买</van-button>
          </van-col>
        </van-row> 
      </div>
    </van-popup>
    <van-popup v-model="showarea" position="bottom">
      <van-picker :visible-item-count="10" show-toolbar :columns="columns"  @cancel="showarea=false" @confirm="confirmbtn" ref='areapicker' />
    </van-popup>
  </div>  
</template>

<script>
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

import { getpricedata,getGoodsDetails, getServerApiUrl, imgserverUrl, addGood,getGoodCart, getServerUrl, getJssdk, getAppID ,cloudarkList} from "./../../api";
import tools from './../../utils'
import { Toast,Dialog } from 'vant';
export default {
  name: 'goods-info',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      info: {},
      imgserverUrl:imgserverUrl,
      discount: 0,
      stock: 0,
      qty: 1,
      show: false,
      activeIndex: 0,
      activeIndexbox:[],
      cartnumber:'0',
      goodsidurl:'#/goods/'+ sessionStorage.getItem('goodsiddata'),
      noncestr: '',
      ticket: '',
      timestamp: '',
      specbox:{},
      nowprice:0,
      specLabeldata:[],
      liidbox:[],
      linamebox:[],
      nowclickname:'',
      nowstock:0,
      shi:'00',
      fen:'00',
      miao:'00',
      countdown:false,
      spec:[],
      columns: [],
      choose:'请选择云柜地址',
      showarea:false,
      machineId:0,
      addressList:[],
      levelList:[],
      dizhi:false

    }
  },
  created () {
    if( this.$route.params.id == 4888){
      this.countdown = true;
      this.dizhi = true
    }
    let zhethis=this;
    getGoodsDetails(this.$route.params.id).then(response => {
      zhethis.info = response.data
      zhethis.spec = zhethis.info.spec
      // 设置默认的地址
      let name = response.data.specLabel[0].levelList[0].name;
      console.log('zhethis.info.spec')
      console.log(zhethis.info.spec)
      for(let i=0;i<zhethis.info.spec.length;i++){
        if( name == zhethis.info.spec[i].valueNames){
            cloudarkList(zhethis.info.spec[i].id).then((res)=>{
              this.addressList =  res.data.list;
              for(let i=0;i<res.data.list.length;i++){
                zhethis.columns.push(res.data.list[i].shopName)
              }
              console.log("zhethis.columns")
              console.log(zhethis.columns)
            })
        }
      }
      // 设置默认的地址
      zhethis.specLabeldata = response.data.specLabel
      zhethis.nowprice = response.data.defaultSpec.discount;
      zhethis.nowstock=response.data.defaultSpec.stock;
      zhethis.nowclickname=response.data.defaultSpec.valueNames.split("/").join('，');
      zhethis.linamebox=response.data.defaultSpec.valueNames.split("/");
      let arraybox=response.data.defaultSpec.specValueIds.split("/");
      let laberarraybox=response.data.defaultSpec.specLabelIds.split("/");
      for (var i = 0; i < arraybox.length; i++) {
        zhethis.activeIndexbox.push(parseInt(arraybox[i]));
        zhethis.liidbox.push(parseInt(laberarraybox[i]));
      }
      zhethis.specbox=response.data.defaultSpec;
      // 懒加载
      // let str=  String(zhethis.info.detail);
      // let lazy = str.replace(/src/g, "v-lazy");
      // zhethis.lazy = lazy;
      // 懒加载
      zhethis.$nextTick(() => {
        getJssdk().then(response => {
          this.noncestr = response.data[0].noncestr
          this.ticket = response.data[0].ticket
          this.timestamp = response.data[0].timestamp
          // 启动微信设置
          tools.settingWechat(getAppID(), this.noncestr, this.ticket, this.timestamp, () => {
            // 添加微信朋友分享
            tools.menuShareAppMessage( this.info.name || '从众链商新零售', this.info.summary || this.info.name , getServerUrl() + '/zouwei/order/index.html?redFlag=1&community=' + this.userInfo.memberNo + `#/goodsdetails/${this.$route.params.id}`, getServerUrl() + `/chuangshi${this.info.indexImage}`, () => {})
            // 添加微信朋友圈分享
            tools.menuShareTimeline(this.info.name || '从众链商新零售', getServerUrl() + '/zouwei/order/index.html?redFlag=1&community=' + this.userInfo.memberNo + `#/goodsdetails/${this.$route.params.id}`, getServerUrl() + `/chuangshi${this.info.indexImage}`, () => {})
          })
        })
      })
    })
    this.getcartnumber();

    // 倒计时
    let _this = this;
    if( this.$route.params.id == 4888 ){
        setInterval(function(){
          _this.date()
        },1000)
    }

  },
  methods: {
    date(){
      var deadline = (new Date("2018/06/05 10:00:00")).getTime();
      var date = new Date().getTime()
      var remains = new Date(deadline - date);
      
      if( remains <= 0  ){
        this.countdown = false;
      } else {
        var day = remains.Format('dd');
        var hour = remains.Format('hh');
        var minute = remains.Format('mm');
        var second = remains.Format('ss');
        this.shi = parseInt(remains/(1000*3600));
        this.fen = minute;
        this.miao = second;

      }
    },
    formatPrice() {
      return this.info.defaultSpec ? (this.info.defaultSpec.price).toFixed(2) : 0
    },
    formatDiscount() {
      return this.info.defaultSpec ? (this.info.defaultSpec.discount).toFixed(2) : 0
    },
    changeType(liindex,clickid,liid,clickname) {
      // 初始化地址选择
      this.columns = [];
      this.choose = "请选择云柜地址"
      let beiindexbox=this.activeIndexbox;
      let zhethis=this;
      let specValueIds='';
      let specLabelIds='';
      this.activeIndexbox=[];

      beiindexbox[liindex]=clickid;
      this.liidbox[liindex]=liid;
      this.linamebox[liindex]=clickname;
      this.nowclickname='';
      for (var i = 0; i < this.linamebox.length; i++) {
        if(i==0){
          this.nowclickname=this.linamebox[i];
        }else{
          this.nowclickname+=','+this.linamebox[i];
        }
      }
      console.log(beiindexbox)
      this.activeIndexbox=beiindexbox;
      for (let i = 0; i < this.activeIndexbox.length; i++) {
        if(i==0){
          specLabelIds=this.liidbox[i];
          specValueIds=this.activeIndexbox[i];
        }else{
          specLabelIds+='/'+this.liidbox[i];
          specValueIds+='/'+this.activeIndexbox[i];
        }
      }
      getpricedata(specValueIds,specLabelIds).then(response => {
        if(response.code=='200'){
          zhethis.nowstock=response.data.stock;
          zhethis.specbox = response.data;
          zhethis.nowprice = response.data.discount;
          if(response.data.stock>0){
            cloudarkList(response.data.id).then((res)=>{
              this.addressList =  res.data.list;
              for(let i=0;i<res.data.list.length;i++){
                zhethis.columns.push(res.data.list[i].shopName)
              }
            })

            // 智能云柜
          }else{
            Dialog.alert({
              title: '温馨提示',
              message: '选择的商品库存不足，请重新选购'
            })
          }
        }else {
          Dialog.alert({
              title: '温馨提示',
              message: response.message
            })
        }
      })
    },
    confirmbtn(index,val){
      this.choose = index;
      this.machineId = this.addressList[val].id
      this.showarea = false;
    },
    submitCart(data) {
      let zhethis=this;
      if(this.specbox.id==undefined||this.specbox.id==null||this.specbox.id==''){
        Dialog.alert({
            title: '温馨提示',
            message: '请选择规格'
          })
      }
      if(this.qty>this.nowstock){
        Dialog.alert({
            title: '温馨提示',
            message: '库存不足，请重新选购'
          })
      }else{
        if(this.machineId == 0 && this.$route.params.id == 4888){
          Toast.fail('请选择地址');
          return
        }
        addGood(this.userInfo.id, this.info.id, this.specbox.id, this.qty,this.machineId).then(response => {
          if (response.code === '200') {
            Toast.success('添加成功');
            zhethis.show = false
            zhethis.getcartnumber();
            if(data==1){
              zhethis.gocart();
            }
          }else{
            Dialog.alert({
              title: '温馨提示',
              message: response.message
            }).then(() => {
              // on close
            });
          }
        })
      }
      
    },
    getcartnumber(){
      getGoodCart(this.userInfo.id).then(response => {
        this.cartnumber = String(response.data.length);
      })
    },
    gocart(){
      this.$router.push("/cart");
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
