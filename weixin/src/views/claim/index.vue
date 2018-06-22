<template>
  <div class="page" style="height:100%;">
      <top-header title="认领"></top-header>
      <div class="receive">
          <p class="van-hairline--bottom"><span>认领物品：</span><span>{{data.goodsName}}</span></p>
          <!-- <p @click="go"><span>认领地址：</span><span></span><van-icon name="arrow" class="arrow"/></p> -->
          <p class="van-hairline--bottom">
              <span class="van-cell-text">认领地址：</span>
              <span v-text="data.fullAddress"></span>
              <!-- <van-icon name="arrow" class="arrow"/> -->
          </p>
          <p class="van-hairline--bottom"><span>认领价格：</span><span>￥{{data.price}}</span></p>
          <p class="box van-hairline--bottom"><span>认领数量：</span><input type="text" class="van-hairline--surround" v-model="remainingQuantity" :placeholder="'剩余数量'+ data.remainingQuantity"></p>
          <!-- <p class="btn"><input type="text" placeholder="输入验证码" v-model="codeData"><button @click="code">获取验证码</button></p> -->
          <p class="xieyi"><span>*</span><a>需收1%手续费</a></p>
          <p class="confirm"><button @click="submit">确认</button></p>
          <!-- <p class="agreement"><span>认领既代表同意</span><a class="xieyi">《***协议》</a></p> -->
          <!-- 城市 -->
      </div>
      <van-popup v-model="showarea" position="bottom">
        <van-picker show-toolbar :columns="areacolumns" @change="onChange" @cancel="showarea=false" @confirm="confirmbtn" ref='areapicker' />
      </van-popup>
    <van-popup v-model="show" position="bottom">
      <div class="single-info">
        <div class="top-info">
          <p class="top-info-header">确认付款</p>
           <van-icon name="close" class="closebtn" @click="show=false" />
        </div>
        <div class="content">
          <p class="title">￥{{totalPrice}}<span style="font-size:10px;position:relative;top:-5px;left:3px;">(含1%手续费)</span></p>
          <div class="paymode">
            <van-checkbox-group v-model="paycheckdata" :max="2"  @change="ifcheckbox">
              <van-checkbox name="0" style="margin-bottom: 1rem" v-if="payWechat">
                <span style="width:4rem;display:inline-block;">微信支付</span>
              </van-checkbox>
              <van-checkbox name="1" style="margin-bottom: 1rem">
                <span style="width:4rem;display:inline-block;">余额</span>
                <span style="color: #aaa;padding-left: 1rem;">({{userInfo.balance || 0}}元)</span>
              </van-checkbox>
            </van-checkbox-group>
            <van-checkbox name="1" v-model="radio" disabled v-if="payonemode!=1 && payWechat">不足部分微信支付</van-checkbox>
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
          <van-checkbox name="0" style="margin-bottom: 1rem" disabled v-if="payWechat">
            <span style="width:4rem;display:inline-block;">微信支付</span>
          </van-checkbox>
          <van-checkbox name="1" style="margin-bottom: 1rem" disabled>
            <span style="width:4rem;display:inline-block;">余额</span>
            <span style="color: #aaa;padding-left: 1rem;">({{paycheckdata[0] === '1' ? ((totalPrice)).toFixed(2) > userInfo.balance ? userInfo.balance : ((totalPrice)).toFixed(2) : 0}}元)</span>
          </van-checkbox>
        </van-checkbox-group>
        <van-checkbox name="1" v-model="radio" disabled v-if="payonemode!=1 && payWechat">不足部分微信支付</van-checkbox>
      </div>
    </van-dialog>
    
    <div class="passwordbox" v-if="passwordbox">
      <paypassword @gopaypassword="gopaypassword"></paypassword>
    </div>
    
    <loadingbox  v-show="showloading"></loadingbox>
  </div>
</template>

<script type="text/ecmascript-6">
import {getareadata,claimList,sendPhoneCode,imgserverUrl,getGoodCart,gopayorder,getaddress,getLatestPrice,showpassword,claimPay,paymentOrder} from "./../../api";
import { Toast,Dialog } from 'vant';
import tools from "./../../utils";
import paypassword from "./../paypassword";
import loadingbox from "../../components/showloading";
export default {
  components: {
    paypassword,
    loadingbox
  },
  data() {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      showarea:false,
      fullarea:'选择地址',
      areacolumns:[
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2',
          defaultIndex: 0
        },
        {
          values: [],
          className: 'column3',
          defaultIndex: 0
        }
      ],
      area1id:'',
      area2id:'',
      area3id:'',
      areaIdLevel1:'',
      areaIdLevel2:'',
      areaIdLevel3:'',
      data:{},
      remainingQuantity:'',
      // codeData:'',
      show:false,
      paycheckdata:[],
      radio:'1',
      showAfter: false,
      openpaypassword:true,//支付密码
      payonemode:0,
      passwordbox:false,
      showloading:false,
      totalPrice:0,
      gooddata:[]
    }
  },
  created () {
    this.claimData();
  },
  mounted () {

  },
  watch: {
      area1id(data) {
        this.$refs.areapicker.setColumnValues(2,[]);
        this.getarea(2,this.area1idbox[data]);
      },
      area2id(data) {
        if(data != undefined && this.area2idbox[data] != undefined){
          var v = this.area2idbox[data];
          console.log('area2idbox:' + v);
          this.getarea(3, v);
        }
      }
  },
  methods: {
    gopay(password){
      let zhethis = this;
      // this.showloading=true;
      // this.rightPayBox=false;
      // this.clickloading=true;
      if (this.paycheckdata.length === 0) {
        this.type = 1;
          claimPay(this.userInfo.id,this.$route.params.id,this.type,this.remainingQuantity,'').then((res)=>{
            if(res.code == 200 && res.data.appId){
                  if(zhethis.payWechat != false){
                      tools.wechatPay(res.data.appId, res.data.timeStamp, res.data.nonceStr, res.data.package, res.data.signType, res.data.paySign, (_res) => {
                          zhethis.clickloading=false;
                          if (_res.err_msg === 'get_brand_wcpay_request:ok') {
                              zhethis.$router.push('/discipline')
                              sessionStorage.setItem("isClose", "0"); 
                              Toast.fail("认领成功！");
                            } else if (_res.err_msg === 'get_brand_wcpay_request:cancel') {
                                paymentOrder(res.data.out_trade_no).then((data)=>{
                                  if(data.code == 200){
                                      Toast.fail("取消成功!");
                                  }
                                })
                              // zhethis.$router.push('/claim')
                            } else {
                              paymentOrder(res.data.out_trade_no).then((data)=>{
                                if(data.code == 200){
                                    Toast.fail("取消成功!");
                                }
                              })
                              // zhethis.$router.push('/claim')
                          }
                    })
                  }else{
                    Toast.fail("余额不足！");
                    zhethis.showloading=false;
                  }
            }else{
                if(res.code=="200" && (res.data.appId==undefined||res.data.appId==null||res.data.appId=="")){
                  zhethis.$router.push('/discipline')
                  sessionStorage.setItem("isClose", "0");
                  Toast.fail("认领成功！");
                } else {
                  Toast.fail(res.message);
                }
                zhethis.clickloading=false;
                zhethis.showloading=false;
              }
        })

      } else {
        if (this.paycheckdata[0] === '0') {
          this.type = 1;
          claimPay(this.userInfo.id,this.$route.params.id,this.type,this.remainingQuantity,'').then((res)=>{
              if(res.code == 200 && res.data.appId){
                  if(zhethis.payWechat != false){
                      tools.wechatPay(res.data.appId, res.data.timeStamp, res.data.nonceStr, res.data.package, res.data.signType, res.data.paySign, (_res) => {
                          zhethis.clickloading=false;
                          if (_res.err_msg === 'get_brand_wcpay_request:ok') {
                              zhethis.$router.push('/discipline')
                              sessionStorage.setItem("isClose", "0"); 
                              Toast.fail("认领成功！");
                            } else if (_res.err_msg === 'get_brand_wcpay_request:cancel') {
                                paymentOrder(res.data.out_trade_no).then((data)=>{
                                  if(data.code == 200){
                                      Toast.fail("取消成功!");
                                  }
                                })
                              // zhethis.$router.push('/claim')
                            } else {
                              paymentOrder(res.data.out_trade_no).then((data)=>{
                                if(data.code == 200){
                                    Toast.fail("取消成功!");
                                }
                              })
                              // zhethis.$router.push('/claim')
                          }
                    })
                  }else{
                    Toast.fail("余额不足！");
                    zhethis.showloading=false;
                  }
              }else{
                if(res.code=="200" && (res.data.appId==undefined||res.data.appId==null||res.data.appId=="")){
                  zhethis.$router.push('/discipline')
                  sessionStorage.setItem("isClose", "0");
                  Toast.fail("认领成功！");
                } else {
                  Toast.fail(res.message);
                }
                zhethis.clickloading=false;
                zhethis.showloading=false;
              }
          })
        } else if (this.paycheckdata[0] === '1') {
          this.type = 2;
          claimPay(this.userInfo.id,this.$route.params.id,this.type,this.remainingQuantity,password).then((res)=>{
              if(res.code == 200 && res.data.appId){
                  if(zhethis.payWechat != false){
                      tools.wechatPay(res.data.appId, res.data.timeStamp, res.data.nonceStr, res.data.package, res.data.signType, res.data.paySign, (_res) => {
                          zhethis.clickloading=false;
                          if (_res.err_msg === 'get_brand_wcpay_request:ok') {
                              zhethis.$router.push('/discipline')
                              sessionStorage.setItem("isClose", "0"); 
                              Toast.fail("认领成功！");
                            } else if (_res.err_msg === 'get_brand_wcpay_request:cancel') {
                                paymentOrder(res.data.out_trade_no).then((data)=>{
                                  if(data.code == 200){
                                      Toast.fail("取消成功!");
                                  }
                                })
                              // zhethis.$router.push('/claim')
                            } else {
                              paymentOrder(res.data.out_trade_no).then((data)=>{
                                if(data.code == 200){
                                    Toast.fail("取消成功!");
                                }
                              })
                              // zhethis.$router.push('/claim')
                          }
                    })
                  }else{
                    Toast.fail("余额不足！");
                    zhethis.showloading=false;
                  }
              }else{
                if(res.code=="200" && (res.data.appId==undefined||res.data.appId==null||res.data.appId=="")){
                  zhethis.$router.push('/discipline')
                  sessionStorage.setItem("isClose", "0");
                  Toast.fail("认领成功！");
                } else {
                  Toast.fail(res.message);
                }
                zhethis.clickloading=false;
                zhethis.showloading=false;
              }
          })
        }
      }
    },
    ifpassword(){
      // this.showAfter = true;
      let zhethis=this;
      let id = zhethis.$route.params.id
      if(this.paycheckdata[0]>0){
       showpassword(this.userInfo.id).then(response => {
          if(response.data&&response.data.tradePassword){
            zhethis.showAfter = true;
          }else{
                Dialog.alert({
                  title: '温馨提示',
                  message: '您还没有设置交易密码，请设置交易密码'
                }).then(() => {
                    sessionStorage.setItem('goindex','/claim/'+ id);
                    this.$router.push('/updatepaypassword');
                });
                zhethis.$router.push('/updatepaypassword')
              }
        })
      }else{
        this.showAfter = true;
      }
    },
    gopaypassword(data){
      // console.log(data)
      this.passwordbox=false;
      this.gopay(data);
      this.showloading=true;
    },
    showpasswordbox(){
      if(this.paycheckdata.length>0&&this.paycheckdata[0]>0){
        this.show=false;
        this.passwordbox=true;
      }else{
        this.gopay();
      }
    },
    getcartdata(){
      let zhethis=this;
      this.totalPrice=0;
      this.fixedmoney=0;
      getGoodCart(this.userInfo.id).then(response => {
        let goodlist = response.data;
        let cartlist = sessionStorage.getItem('goodslist');
        cartlist=cartlist.split(',');
        console.log(cartlist)
        
          for(let k=0;k<goodlist.length;k++){
            let newarraygood=[];
            for(let j=0;j<goodlist[k].cartItems.length;j++){
              for(let i=0;i<cartlist.length;i++){
                if(cartlist[i]==goodlist[k].cartItems[j].id){
                  newarraygood.push(goodlist[k].cartItems[j]);
                  zhethis.totalPrice+=parseInt(goodlist[k].cartItems[j]["goodsSpec.discount"]*goodlist[k].cartItems[j].quantity*100);
                  // 判断是否单独支付
                  if(goodlist[k].cartItems[j]["goodsSpec.isSinglePaymentMode"]==1){
                    zhethis.payonemode=1;
                    zhethis.paycheckdata.push('0');
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
                  console.log(newarraygood)
                }
              }
            }
            zhethis.gooddata.push({'cartItems':newarraygood,'merchantId':goodlist[k].merchantId,'merchantName':goodlist[k].merchantName});
          }
        console.log(zhethis.gooddata)
      })
      
    },
    ifpaybtn(){
      if(this.openpaypassword){
        this.showpasswordbox();
      }else{
        this.gopay();
      }
    },
    ifcheckbox(data){
      if(data.length>1){
        this.paycheckdata=[];
        this.paycheckdata.push(data[1]);
      }
    },
    // 提交
    submit(){
      if(this.remainingQuantity == ''){
        Toast.fail('数量不能为空')
        return
      }
      if(this.remainingQuantity < 1){
        Toast.fail('认领最小数量为1')
        return
      }
      if(this.remainingQuantity % 1 !== 0){
        Toast.fail('认领必须为整数')
        return
      }
      if(this.remainingQuantity > this.data.remainingQuantity){
        Toast.fail('认领数量不能大于剩余认领数量！')
        return
      }
      this.show = true;
      this.totalPrice = Number((this.remainingQuantity * this.data.price + (0.01 * ( this.remainingQuantity * this.data.price ))).toFixed(2));

    },
     // 获取认领数据
    claimData(){
      let _this = this;
      claimList(this.$route.params.id).then((res)=>{
        _this.data = res.data; 
        console.log(_this.data)
      })
    },
    getarea(data,parentid){
      console.log(this.$refs.areapicker)
      let zhethis=this;
      let params={};
      let areaarray=[];
      params.level=data;
      if(parentid){
        params.parent_id=parentid;
      }
      zhethis.areacolumns[(data-1)].values=[];
      zhethis['area'+data+'idbox']=[];
      getareadata(params).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          areaarray.push(response.data[i].area);
          zhethis['area'+data+'idbox'].push(response.data[i].id);
        }
        // console.log(response.data)
        if(data==2){
          if(this.area2idbox[0] != undefined){
            zhethis.getarea(3,this.area2idbox[0]);
          }
        }
        zhethis.$refs.areapicker.setColumnValues((data-1),areaarray)
      })
    },
    onChange(picker, values,areacolumn,areaarray) {
      this.area1id=picker.getColumnIndex(0);
      this.area2id=picker.getColumnIndex(1);
      this.area3id=picker.getColumnIndex(2);
    },
    confirmbtn(data,index){
      console.log(data);
      console.log(index)
      this.fullarea="";
      for (var i = 0; i < data.length; i++) {
        if(data[i] != undefined){
          this.fullarea+=data[i];
        }
      }
      if(!this.area1id){
        this.areaIdLevel1= this.area1idbox[0];
      }else{
        this.areaIdLevel1= this.area1idbox[this.area1id];
      }
      if(!this.area2id){
        this.areaIdLevel2= this.area2idbox[0];
      }else{
         this.areaIdLevel2= this.area2idbox[this.area2id];
      }
      if(!this.area3id){
        this.areaIdLevel3= this.area3idbox[0];
      }else{
         this.areaIdLevel3= this.area3idbox[this.area3id];
      }
      this.showarea=false;
    }
  }
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
