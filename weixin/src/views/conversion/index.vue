<template>
  <div class="page">
      <top-header title="出让"></top-header>
      <div class="receive">
          <p class="van-hairline--bottom"><span>出让物品：</span><span>{{data.goodsName}}</span></p>
          <p class="van-hairline--bottom">
              <span class="van-cell-text">出让地址：</span>
              <span v-text="data.fullAddress"></span>
          </p>
          <p class="van-hairline--bottom"><span>出让价格：</span><span>￥{{data.price}}</span></p>
          <p class="box van-hairline--bottom"><span>出让数量：</span><input type="text" class="van-hairline--surround" :placeholder="'剩余出让数量为' + data.remainingQuantity" v-model="quantity"></p>
          <p class="confirm"><button @click="transfer">立即出让</button></p>
          <!-- <p class="agreement"><span>认领既代表同意</span><a class="xieyi">《***协议》</a></p> -->
      </div>
      <van-popup v-model="showarea" position="bottom">
        <van-picker show-toolbar :columns="areacolumns" @change="onChange" @cancel="showarea=false" @confirm="confirmbtn" ref='areapicker' />
      </van-popup>
      <div class="passwordbox" v-if="passwordbox">
        <paypassword @gopaypassword="gopaypassword"></paypassword>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getareadata,claimList,claimPay,sendPhoneCode,transfer,showpassword} from "./../../api";
import paypassword from "./../paypassword";
import { Toast,Dialog } from 'vant';
export default {
  components: {
    paypassword
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
      passwordbox:false,
      mobile:'',
      quantity:'',
      
    }
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
  created () {
    // 获取出让数据
    this.claimData()
  },
  mounted () {

  },
  methods: {
    transfer(){
      let _this = this;
      if(this.quantity == ''){
        Toast.success('请输入出让数量');
        return
      }
      if(this.quantity > this.data.remainingQuantity){
        Toast.success('出让数量不能大于剩余出让数量！');
        return
      }
      if(this.quantity < 1){
        Toast.success('出让数量不能小于1！');
        return
      }
      if(this.quantity % 1 !== 0){
        Toast.success('出让数量必须为整数');
        return
      }
      let id = _this.$route.params.id
      showpassword(this.userInfo.id).then(response => {
        if(response.data&&response.data.tradePassword){
          _this.passwordbox = true;
        }else{
              Dialog.alert({
                title: '温馨提示',
                message: '您还没有设置交易密码，请设置交易密码'
              }).then(() => {
                  sessionStorage.setItem('goindex','/conversion/'+ id );
                  _this.$router.push('/updatepaypassword');
              });
              _this.$router.push('/updatepaypassword')
            }
      })
    },
    gopaypassword(data){
      // console.log(data)
      this.passwordbox=false;
      this.gopay(data);
      this.showloading=true;
    },
    gopay(password){
      let _this = this
      transfer(this.$route.params.id,this.userInfo.id,this.quantity,password).then((res)=>{
          if(res.code == 200){
              sessionStorage.setItem("isClose", "1"); 
              _this.$router.push('/discipline')
              Toast.success('出让成功！');
          }else{
              Toast.success(res.message);
          }
      })
    },
     // 获取出让数据
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
