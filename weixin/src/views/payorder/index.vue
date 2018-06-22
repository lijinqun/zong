<template>
  <div class="goods-info">
    <!-- 头部标题 -->
    <top-header title="提交订单"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/cart">
        <van-icon name="arrow-left" />
      </a>
      <span>提交订单</span>
    </header> -->
    <div>
      <div class="address" style="z-index: 100;display: flex; background:#fff;" v-if="defaultAdress!=''" @click="choseAdress('address')">
        <div>
            <!-- <img src="../assets/location2.png" style="width:12px;height:15px;margin: 40px 2px 0px 8px;display: block;"> -->
        </div>
        <div style="flex:1;display: block;">
            <p style="padding-left: 5px;height: 20px;font-size: 14px;font-weight: 500;text-align: left;margin:5px 0;">收货人：{{decodeURI(decodeURI(defaultAdress.consignee))}}
              <span style="float:right;padding-left: 5%;" v-text='defaultAdress.mobile'></span>
            </p>
            <h6 style="padding-left: 5px;font-size: 14px;height:40px; overflow: hidden; text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical; font-weight: 500;text-align: left;color: #0B0B0B;margin:5px 0;">
                <!-- {{(defaultAdress['area3.fullName']||defaultAdress['area2.fullName'])?(defaultAdress['area3.fullName']||defaultAdress['area2.fullName'])+defaultAdress.house:defaultAdress.numberBuildings}} -->
                收货地址：<span style="float:right;display: block;width: 78%;">{{defaultAdress['fullAddress']}}</span>
            </h6>
          </div>
        <span style="padding: 9px 10px 0px 10px;color: #ccc;"><img src="../../assets/rightjt2.png" style="width:8px;height:15px;display: block;"></span>
      </div>
      <div v-else='defaultAdress==""' @click="choseAdress('createAddress')" class="address" style="line-height:40px;font-size:14px;z-index: 99;padding:0 1rem;">
        <van-cell-group>
          <van-cell title="点击此处新增地址" icon="location"  is-link />
        </van-cell-group>
        <!-- <span style="">点击此处新增地址</span><van-icon name="arrow" /> -->
      </div>
      <div><img src="../../assets/7.png" style="width:100%;height:3px;display: block;margin-bottom:5px;"></div>
    </div>
    <!-- 优惠券 -->
    <van-cell-group>
      <!-- <van-cell title="优惠券" is-link :value="couponsval" @click="coupons = true"/> -->
      <van-cell title="优惠券" is-link  @click="coupons = true"/> <span @click="coupons = true" style="position: absolute;top: 14px;right: 35px;color:red;font-size:14px;font-weight: bold;">{{couponsval}}</span>
    </van-cell-group>
    <!-- 优惠券 -->
   <!--  <div>
      <van-card v-for="(item, index) in gooddata" :key="index" :title="item['goods.name']" :desc="item['goodsSpec.valueNames']" :num="item.quantity" :price="item['goodsSpec.discount']" :thumb="imgserverUrl+item['goods.indexImage']"/>
    </div> -->

    <ul class="goodsul">
        <li class="goodsdatacss" v-for="(tabs,key) in gooddata" :key="key">
          <div class="merchantname">{{tabs.merchantName}}</div>
          <div v-for="(item,key) in tabs.cartItems" class="posrelative" :key="key">
            <div>
              <div class="goodswidth">
                <van-row>
                  <van-col span="8"><img class="goodsimgcss" v-lazy="imgserverUrl+item['goods.indexImage']"></van-col>
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
              x{{item.quantity}}
            </div>
          </div>
        </li>
      </ul>
      <!-- 留言 -->
      <div class="message" v-if=" length > 0">
          <p class="van-hairline--bottom message_courier"><span>配送方式</span><span>快递 免邮</span></p>
          <p class="van-hairline--bottom"><span>买家留言:</span><input type="text" v-model="userRemarks" placeholder="选填内容跟买家协商"></p>
          <p style="text-align: rigth;height:40px;"><span style="color:#DB1215;font-weight:bold;font-size:14px;float:right;">￥{{(totalPrice / 100).toFixed(2)}}</span><span style="float:right;">共{{length}}件商品  小计：</span></p>
      </div>
      
    <van-submit-bar :loading="clickloading" :price="totalPrice" button-text="提交订单" @submit="ifgopay()" :disabled="submitbtnable"/>

    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom">
      <div class="single-info">
        <div class="top-info">
          <p class="top-info-header">确认付款</p>
           <van-icon name="close" class="closebtn" @click="ask" />
        </div>
        <div class="content">
          <p class="title" v-if='isSinglePaymentMode == 0'>￥{{(totalPrice/100).toFixed(2)}}</p>
          <p class="title" v-if='isSinglePaymentMode != 0 && machineId == null'>{{totalCoinPrice}}个</p>
          <p class="title" v-if='isSinglePaymentMode != 0 && machineId != null'>￥{{(totalPrice/100).toFixed(2)}}</p>
          <div class="paymode">
            <van-checkbox-group v-model="paycheckdata" :max="2"  @change="ifcheckbox">
              <van-checkbox name="0" style="margin-bottom: 1rem" v-if="isSinglePaymentMode==0 && payWechat && goodId != 2558 && goodId != 4888 && paymentMode.indexOf(1) !== -1">
                <span style="width:4rem;display:inline-block;">微信支付</span>
              </van-checkbox>
              <van-checkbox name="1" style="margin-bottom: 1rem" v-if="isSinglePaymentMode==0 && goodId != 2558 && goodId != 4888 && paymentMode.indexOf(2) !== -1">
                <span style="width:4rem;display:inline-block;">余额</span>
                <span style="color: #aaa;padding-left: 1rem;">({{userInfo.balance || 0}}元)</span>
              </van-checkbox>
              <van-checkbox name="2" style="margin-bottom: 1rem" v-if="payonemode==0 && paymentMode.indexOf(3) !== -1">
                <span style="width:4rem;display:inline-block;">收益珠宝</span>
                <span style="color: #aaa;padding-left: 1rem;">({{userInfo.incomeCoin || 0}}个)</span>
              </van-checkbox>
              <van-checkbox name="3" style="margin-bottom: 1rem" v-if="isSinglePaymentMode==0 && goodId != 2558 && goodId != 4888 && paymentMode.indexOf(4) !== -1" >
                <span style="width:4rem;display:inline-block;">消费珠宝</span>
                <span style="color: #aaa;padding-left: 1rem;">({{userInfo.consumeCoin || 0}}个)</span>
              </van-checkbox>
            </van-checkbox-group>
            <van-checkbox name="1" v-model="radio" disabled v-if="payonemode!=1 && isSinglePaymentMode==0 && payWechat && goodId != 2558 && goodId != 4888">不足部分微信支付</van-checkbox>
          </div>
          <!-- <div class="paytxt" @click="$router.push('/updatepaypassword')">如果您还没有设置支付密码，请点击这里</div> -->
        </div>
        <p class="paybtn" v-if="openpaypassword==false" @click="showAfter = true">确认支付</p>
        <p class="paybtn" v-if="openpaypassword==true" @click="ifpassword()">确认支付</p>
      </div>
    </van-popup>
    <van-dialog :lockScroll="false" v-model="showAfter" @confirm="ifpaybtn" @cancel="showAfter = false" :title="'确认支付'" :confirm-button-text="'确认支付'" :cancel-button-text="'取消'" :show-cancel-button="true">
    <!-- <van-dialog v-model="showAfter" @confirm="gopay" @cancel="showAfter = false" :title="'确认支付'" :confirm-button-text="'确认支付'" :cancel-button-text="'取消'" :show-cancel-button="true"> -->
      <div style="width:80%; margin: 0 auto; padding: 1rem 0;">
        <van-checkbox-group v-model="paycheckdata" :max="2"  @change="ifcheckbox">
          <van-checkbox name="0" style="margin-bottom: 1rem" disabled v-if="payWechat && goodId != 2558 && goodId != 4888">
            <span style="width:4rem;display:inline-block;">微信支付</span>
          </van-checkbox>
          <van-checkbox name="1" style="margin-bottom: 1rem" disabled>
            <span style="width:4rem;display:inline-block;">余额</span>
            <span style="color: #aaa;padding-left: 1rem;">({{paycheckdata[0] === '1' ? ((totalPrice/100)).toFixed(2) > userInfo.balance ? userInfo.balance : ((totalPrice/100)).toFixed(2) : 0}}元)</span>
          </van-checkbox>
          <van-checkbox name="2" style="margin-bottom: 1rem" disabled>
            <span style="width:4rem;display:inline-block;">收益珠宝</span>
            <!-- <span style="color: #aaa;padding-left: 1rem;" v-if="payonemode==0">({{paycheckdata[0] === '2' ? ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) > userInfo.incomeCoin ? userInfo.incomeCoin : ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) : 0}}个)</span> -->
            <span style="color: #aaa;padding-left: 1rem;" v-show="isSinglePaymentMode != 1 && machineId == null"  v-if="payonemode==1&&fixedmoney">({{paycheckdata[0] === '2' ? (((totalPrice/100)/zhubao)+(fixedmoney-(sumfixedmoney/zhubao))).toFixed(3) > userInfo.incomeCoin ? userInfo.incomeCoin : (((totalPrice/100)/zhubao)+(fixedmoney-(sumfixedmoney/zhubao))).toFixed(3) : 0}}个)</span>
            <span style="color: #aaa;padding-left: 1rem;" v-show="isSinglePaymentMode != 1 && machineId == null" v-else>({{paycheckdata[0] === '2' ? ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) > userInfo.incomeCoin ? userInfo.incomeCoin : ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) : 0}}个)</span>
            <span style="color: #aaa;padding-left: 1rem;" v-show="isSinglePaymentMode == 1 && machineId == null">({{totalCoinPrice}}个)</span>
            <span style="color: #aaa;padding-left: 1rem;" v-show="isSinglePaymentMode != 0 && machineId != null">({{((totalPrice/100) / zhubao).toFixed(3)}}个)</span>
          </van-checkbox>
          <van-checkbox name="3" style="margin-bottom: 1rem" disabled v-if="payonemode==0">
            <span style="width:4rem;display:inline-block;">消费珠宝</span>
            <span style="color: #aaa;padding-left: 1rem;">({{paycheckdata[0] === '3' ? ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) > userInfo.consumeCoin ? userInfo.consumeCoin : ((totalPrice/100).toFixed(2)/zhubao).toFixed(3) : 0}}个)</span>
          </van-checkbox>
        </van-checkbox-group>
        <van-checkbox name="1" v-model="radio" disabled v-if="payonemode!=1 && payWechat">不足部分微信支付</van-checkbox>
      </div>
    </van-dialog>
    
    <!-- 优惠券 -->
    <van-popup v-model="coupons" position="bottom">
        <div class="coupons">
            <!-- <p>优惠券<van-icon name="close" class="closebtn" style="position: absolute; top: 20px;right: 35px;" @click="coupons = false" /></p> -->
            <p>优惠券
              <!-- <span class="closebtn">暂不使用</span> -->
              <img src="../../assets/523.png" style="max-width:23%;position: absolute; top: 17px;right: 8px;font-size:12px;font-widtH:400;" @click="useshiyong('暂不使用')" alt="">
            </p>
            <ul>
                <li v-for="(item,key) in couponsData " :key="key">
                    <p class="vouchers_left">
                      <span style="color:#000000;font-weight:600;padding-top:12px;">{{item.couponName}}</span>
                      <span style="font-size:12px;color:#6B6B6B;padding-top:4px;">有效期：{{item.startTime.split(" ")[0]}} 至 {{item.endTime.split(" ")[0]}}</span>
                    </p>
                    <p class="vouchers_right" @click="use(item.amount,item.id)">
                      <span style="padding-top:12px;font-weight: 600;">+{{item.amount}}{{item.unit}}链豆</span>
                      <span style="padding-top:4px;"><img src="../../assets/516.png" alt=""></span>
                    </p>
                </li>
            </ul>
        </div>
    </van-popup>

    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="gopaypassword"></paypassword>
    </div>
    
    <loadingbox  v-show="showloading"></loadingbox>
  </div>  
</template>

<script>
import { imgserverUrl,getGoodCart,saveorder,gopayorder,getaddress,getLatestPrice,showpassword ,couponsList,gtDate} from "./../../api";
import tools from "./../../utils";
import paypassword from "./../paypassword";
import loadingbox from "../../components/showloading";
import { Toast, Dialog } from 'vant';
import config from '../../config'
export default {
  name: 'goods-info',
  components: {
    paypassword,
    loadingbox
  },
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      info: {},
      addresslist: [],
      gooddata:[],
      imgserverUrl:imgserverUrl,
      totalPrice: 0,
      stock: 0,
      qty: 1,
      show: false,
      activeIndex: 0,
      discount:'',
      cartnumber:0,
      radio: '1',
      paycheckdata:[],
      type: 1,
      defaultAdress:[],
      clickloading:false,

      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [{
        name: '张三',
        tel: '13000000000',
        id: 0,
        address:'珠海市'
      }],
      rightPayBox: false,
      zhubao:0,
      showAfter: false,

      payonemode:0,

      sumfixedmoney:0,
      fixedmoney:0,
      passwordbox:false,

      openpaypassword:true,//支付密码

      showloading:false,
      cartlist:[],
      subOrderNo:'',//订单号
      submitbtnable:false,
      isSinglePaymentMode:0,
      totalCoinPrice:0,
      machineId:null,
      goodId:null,
      paymentMode:'',
      coupons:false,
      couponsData:[],
      couponsval:'请选择优惠券',
      memberCouponId:undefined,
      userRemarks:undefined,
      length:0
    }
  },
  created () {
    // this.payWechat = config.payWechat
    // 
    this.isSinglePaymentMode = sessionStorage.getItem('isSinglePaymentMode')
    this.getcartdata();
    this.getaddresslist();
    let zhethis=this;
    getLatestPrice().then(response => {
        if (response.data) {
          zhethis.zhubao = response.data.price;
        }
      })
    //优惠券列表
    this.couponsList()
    // 能使用的优惠券
    this.gtDate()
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }

  },
  methods: {
    gtDate(){
      let _this = this;
      // 时间
        function dateToStr(datetime){
          var year = datetime.getFullYear();
          var month = datetime.getMonth()+1;//js从0开始取 
          var date = datetime.getDate(); 
          var hour = datetime.getHours(); 
          var minutes = datetime.getMinutes(); 
          var second = datetime.getSeconds();

          if(month<10){
          month = "0" + month;
          }
          if(date<10){
          date = "0" + date;
          }
          if(hour <10){
          hour = "0" + hour;
          }
          if(minutes <10){
          minutes = "0" + minutes;
          }
          if(second <10){
          second = "0" + second ;
          }

          var time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second; //2009-06-12 17:18:05
          return time;
        }
      gtDate(this.userInfo.id,dateToStr(new Date())).then(res=>{
         _this.couponsval = res.data[0].childCount + '张可用'
      })
    },
    // 优惠券列表
    couponsList(){
      let _this = this;
      function dateToStr(datetime){
          var year = datetime.getFullYear();
          var month = datetime.getMonth()+1;//js从0开始取 
          var date = datetime.getDate(); 
          var hour = datetime.getHours(); 
          var minutes = datetime.getMinutes(); 
          var second = datetime.getSeconds();

          if(month<10){
          month = "0" + month;
          }
          if(date<10){
          date = "0" + date;
          }
          if(hour <10){
          hour = "0" + hour;
          }
          if(minutes <10){
          minutes = "0" + minutes;
          }
          if(second <10){
          second = "0" + second ;
          }

          var time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second; //2009-06-12 17:18:05
          return time;
        }
      couponsList(this.userInfo.id,dateToStr(new Date())).then(res=>{
        if(res.code == 200){
          // console.log("优惠券")
          // console.log(res.data)
          _this.couponsData = res.data
        }
      })
    },
    // 使用优惠券
    use(val,id){
      this.couponsval = '+' + val + '%' + '链豆';
      this.coupons = false;
      this.memberCouponId = id
    },
    useshiyong(val){
       this.couponsval = val;
      this.coupons = false;
      this.memberCouponId = undefined;
    }, 
    ifpaybtn(){
      if(this.openpaypassword){
        this.showpasswordbox();
      }else{
        this.gopay();
      }
    },
    ifpassword(){
      //alert(this.paycheckdata)
      // this.showAfter = true;
      console.log(this.paycheckdata.length)
      if(this.paycheckdata.length == 0 && this.isSinglePaymentMode == 1){
         Dialog.alert({
            title: '温馨提示',
            message: '请选择支付方式'
          }).then(() => {
              
          });
          return
      }
      let zhethis=this;
      if(this.paycheckdata[0]>0){
       showpassword(this.userInfo.id).then(response => {
          if(response.data&&response.data.tradePassword){
            zhethis.showAfter = true;
          }else{
                Dialog.alert({
                  title: '温馨提示',
                  message: '您还没有设置交易密码，请设置交易密码'
                }).then(() => {
                    sessionStorage.setItem('goindex','/payorder');
                    this.$router.push('/updatepaypassword');
                });
                zhethis.$router.push('/updatepaypassword')
              }
        })
      }else{
        this.showAfter = true;
      }
    },
    showpasswordbox(){
      if(this.paycheckdata.length>0&&this.paycheckdata[0]>0){
        this.show=false;
        this.passwordbox=true;
      }else{
        this.gopay();
      }
    },
    gopaypassword(data){
      // console.log(data)
      this.passwordbox=false;
      this.gopay(data);
      this.showloading=true;
    },
    // 提交订单按钮
    ifgopay(){
      if(this.defaultAdress=='' || this.defaultAdress['fullAddress'] == null || this.defaultAdress['fullAddress'] == '' ){
        
        Dialog.alert({
          title: '温馨提示',
          message: '请补充完整收货地址'
        }).then(() => {
          // on close
        });
      }else{
        if(this.gooddata.length == 0){
          Toast.fail('请选择商品');
          return
        }
        if( this.machineId  != null && this.gooddata[0].cartItems[0].quantity > 1){
            Toast.fail('数量只能为一台!');
            return
        }
        if( this.paymentMode == ''){
          Toast.fail('您提交的订单存在不同的支付方式，请分开支付!');
          return
        }
        this.saveorder()
      }
    },
    // 生产订单
    saveorder(){

      let zhethis = this;
      let orderList=[];
      for(var i=0;i<this.gooddata.length;i++){
        let detailsdata = [];
        let oneorderdetailsdata = [];
        for(var h=0;h<this.gooddata[i].cartItems.length;h++){
          if(this.gooddata[i].cartItems[h]["goodsSpec.isSingleOrder"]==1){
            oneorderdetailsdata.push({"goodsId":this.gooddata[i].cartItems[h].goodId,"goodsSpecificationId": this.gooddata[i].cartItems[h]["goodsSpec.id"],"quantity":this.gooddata[i].cartItems[h].quantity,"machineId":zhethis.machineId});
          }else{
            detailsdata.push({"goodsId":this.gooddata[i].cartItems[h].goodId,"goodsSpecificationId": this.gooddata[i].cartItems[h]["goodsSpec.id"],"quantity":this.gooddata[i].cartItems[h].quantity});
          }
        }
        if(detailsdata.length>0){
          if(this.gooddata[i].merchantId==0){
            orderList.push({"userRemarks":zhethis.userRemarks,"paymentModes":zhethis.paymentMode,'addressId':this.defaultAdress.id,'memberCouponId':this.memberCouponId,'orderType':1,'details':detailsdata})
          }else{
            orderList.push({"userRemarks":zhethis.userRemarks,"paymentModes":zhethis.paymentMode,'addressId':this.defaultAdress.id,'memberCouponId':this.memberCouponId,'orderType':1,'merchantId':this.gooddata[i].merchantId,'details':detailsdata})
          }
        }
        if(oneorderdetailsdata.length>0){
          orderList.push({"userRemarks":zhethis.userRemarks,"paymentModes":zhethis.paymentMode,'addressId':this.defaultAdress.id,'memberCouponId':this.memberCouponId,'orderType':1,'details':oneorderdetailsdata})
        }
      }
      console.log("this.memberCouponId")
      console.log(orderList)
      orderList=JSON.stringify(orderList);
      if(this.isSinglePaymentMode == 1){
          saveorder(this.userInfo.id,orderList,sessionStorage.getItem('goodslist'),this.isSinglePaymentMode,3).then((res)=>{
            if(res.code=="200"){
              // zhethis.gooddata = []
              zhethis.submitbtnable = true;
              zhethis.subOrderNo = res.data.subOrderNo
              zhethis.show = true;
            }else{
              Dialog.alert({
                title: '温馨提示',
                message: res.message
              }).then(() => {
                if(res.message.indexOf('没有设置交易密码')>0){
                  sessionStorage.setItem('goindex','/payorder');
                  zhethis.$router.push('/updatepaypassword')
                }
              });
            }
        })
      }else{
        saveorder(this.userInfo.id,orderList,sessionStorage.getItem('goodslist'),'','').then((res)=>{
            if(res.code=="200"){
              // zhethis.gooddata = []
              zhethis.submitbtnable = true;
              zhethis.subOrderNo = res.data.subOrderNo
              zhethis.show = true;
            }else{
              Dialog.alert({
                title: '温馨提示',
                message: res.message
              }).then(() => {
                if(res.message.indexOf('没有设置交易密码')>0){
                  sessionStorage.setItem('goindex','/payorder');
                  zhethis.$router.push('/updatepaypassword')
                }
              });
            }
        })
      }
      
    },
    ask(){
      let _this = this;
      Dialog.confirm({
        title: '确认离开收银台？',
        message: '请尽快支付！'
      }).then(() => {
        _this.$router.push('orderList/0')
      }).catch(() => {
        // _this.show = false;
        // _this.getcartdata();
      });
    },
    ifcheckbox(data){
      if(data.length>1){
        this.paycheckdata=[];
        this.paycheckdata.push(data[1]);
      }
    },
    getaddresslist() {
      let zhethis=this;
      this.defaultAdress=[];
      getaddress(this.userInfo.id).then(response => {
        let addressdata = response.data;
        for (var i = 0; i < addressdata.length; i++) {
          if(addressdata[i].defaultCheck){
            zhethis.defaultAdress=addressdata[i];
          }
        }
        // console.log(zhethis.defaultAdress)
      })
    },
    formatPrice() {
      return this.info.spec ? (this.info.spec[0].discount).toFixed(2) : 0
    },
    changeType(index) {
      this.discount = this.info.spec[index].discount
      this.stock = this.info.spec[index].stock
      this.activeIndex = index
    },
    getcartdata(){
      let zhethis=this;
      this.totalPrice=0;
      this.totalCoinPrice=0;
      this.fixedmoney=0;
      getGoodCart(this.userInfo.id).then(response => {
        let goodlist = response.data;
        let cartlist = sessionStorage.getItem('goodslist');
        cartlist=cartlist.split(',');
        // console.log(cartlist)
        // console.log("goodlist")
        // console.log(goodlist)
          for(let k=0;k<goodlist.length;k++){
            let newarraygood=[];
            for(let j=0;j<goodlist[k].cartItems.length;j++){
              for(let i=0;i<cartlist.length;i++){
                if(cartlist[i]==goodlist[k].cartItems[j].id){
                  newarraygood.push(goodlist[k].cartItems[j]);
                  zhethis.totalPrice+=parseInt(goodlist[k].cartItems[j]["goodsSpec.discount"]*goodlist[k].cartItems[j].quantity*100);
                  zhethis.totalCoinPrice+=parseInt(goodlist[k].cartItems[j]["goodsSpec.coinPrice"]*goodlist[k].cartItems[j].quantity);
                  // 判断是否单独支付
                  if(goodlist[k].cartItems[j]["goodsSpec.isSinglePaymentMode"]==1){
                    // zhethis.payonemode=1;
                    // zhethis.isSinglePaymentMode = 1
                    
                    // zhethis.paycheckdata.push('0');
                    zhethis.sumfixedmoney+=goodlist[k].cartItems[j]["goodsSpec.discount"];
                    zhethis.fixedmoney+=goodlist[k].cartItems[j]["goodsSpec.coinPrice"];
                  }
                   // 判断是否去掉消费珠宝
                  if(goodlist[k].cartItems[j]["goodsSpec.isSinglePaymentMode"]==3){
                    zhethis.payonemode=3;
                    zhethis.paycheckdata.push('0');
                    zhethis.sumfixedmoney+=goodlist[k].cartItems[j]["goodsSpec.discount"];
                    zhethis.fixedmoney+=goodlist[k].cartItems[j]["goodsSpec.coinPrice"];
                  }
                  // console.log(newarraygood)
                }
              }
            }
            zhethis.gooddata.push({'cartItems':newarraygood,'merchantId':goodlist[k].merchantId,'merchantName':goodlist[k].merchantName});
          }
          
          let gooddata = [];//商品为空的不push到goodata
          for( let i=0;i<zhethis.gooddata.length;i++){
            if( zhethis.gooddata[i].cartItems.length != 0 ){
              gooddata.push(zhethis.gooddata[i])
            }
          }
            zhethis.gooddata = gooddata;
            zhethis.machineId = zhethis.gooddata[0].cartItems[0].machineId;//特殊的云柜
            zhethis.goodId = zhethis.gooddata[0].cartItems[0].goodId;//特殊的商品  面膜
            // console.log("zhethis")
            
            // 计算共计一共有多少商品
            for(let i=0;i<zhethis.gooddata.length;i++){
              zhethis.length+=parseInt(zhethis.gooddata[i].cartItems.length);
            }
            // zhethis.length = parseInt(zhethis.gooddata[0].cartItems.length) + parseInt(zhethis.gooddata[1].cartItems.length)
            // alert(zhethis.length)
            let cartItems = zhethis.gooddata[0].cartItems;
            console.log("zhethis.gooddata")
            console.log(zhethis.gooddata)
            //数组交集函数
            var intersect = function (arr) {
            var result = new Array();
            var obj = {};
            if (arr.length > 1) {
                for (var i = 0; i < arr.length; i++) {
                  for (var j = 0; j < arr[i].length; j++) {
                      var str = arr[i][j];
                      if (!obj[str]) {
                          obj[str] = 1;
                      }
                      else {
                          obj[str]++;
                          if (obj[str] == arr.length)
                          {
                              result.push(str);
                          }
                      }//end else
                  }//end for j
              }//end for i
              return result;
            }else{
              return arr
            }
        }
            // 把所有商品的支付方式q
            let listData = []
            for( let i=0;i<cartItems.length;i++){
              cartItems[i]['goods.paymentModes'] = cartItems[i]['goods.paymentModes'].split(',')
               listData.push(cartItems[i]['goods.paymentModes'])
            }
            // console.log("listData")
            // console.log(intersect(listData))
            // console.log("listData")
            let paymentModes = '';
            for(let l=0;l<intersect(listData).length;l++){
              if( intersect(listData)[l] != intersect(listData)[intersect(listData).length-1]){
                paymentModes += intersect(listData)[l] + ','
              }else{
                paymentModes += intersect(listData)[l]
              }
            }
            this.paymentMode = paymentModes;
      })
      
    },
    gopay(password){
      this.showloading=true;
      this.rightPayBox=false;
      this.clickloading=true;
      if (this.paycheckdata.length === 0) {
        this.type = 1
      } else {
        if (this.paycheckdata[0] === '0') {
          this.type = 1
        } else if (this.paycheckdata[0] === '1') {
          this.type = 2
        } else if (this.paycheckdata[0] === '2') {
          this.type = 3
        } else if (this.paycheckdata[0] === '3') {
          this.type = 4
        }
      }
      let zhethis = this;
          gopayorder(zhethis.userInfo.open_id,zhethis.subOrderNo,this.type,password).then(_res => {
            if(_res.code=="200" && _res.data.appId){
              zhethis.showloading=false;
              if(zhethis.payWechat != false){
                  tools.wechatPay(_res.data.appId, _res.data.timeStamp, _res.data.nonceStr, _res.data.package, _res.data.signType, _res.data.paySign, (res) => {
                    zhethis.clickloading=false;
                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                      zhethis.$router.push("/orderList/2");
                      } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                        zhethis.$router.push("/orderList/0");
                        } else {
                          zhethis.$router.push("/orderList/0");
                    }
                  })
              }else{
                Toast.fail("余额不足！");
              }
                
            }else{
              if(_res.code=="200" && (_res.data.appId==undefined||_res.data.appId==null||_res.data.appId=="")){
                zhethis.$router.push("/orderList/2");
              } else {
                Toast.fail(_res.message);
              }
              zhethis.clickloading=false;
              zhethis.showloading=false;
            }
          })
    },

    submitCart(){
      // console.log(this.paycheckdata)
    },

    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;      
      this.showEdit = true;
      this.editingContact = item;
    },

    // 选中联系人
    onSelect() {
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;
      
      if (this.isEdit) {
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },
    choseAdress(){
      this.$router.push("/address")
    }


  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
