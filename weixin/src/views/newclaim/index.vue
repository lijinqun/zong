<template>
  <div class="page">
      <top-header title="新增出让"></top-header>
      <div class="new">
          <!-- <p><span>出让物品：</span><input type="text" placeholder="施华洛紫水晶" v-model="username"></p> -->
          <p @click="getarea(1),showarea=true" class="van-hairline--bottom">
              <span class="van-cell-text">出让地址：</span>
              <span v-text="fullarea" class="dizhi"></span>
              <van-icon name="arrow" class="arrow"/>
          </p>
          <p class="van-hairline--bottom"><span>出让价格：</span><input type="text" placeholder="请填写出让价格" v-model="price"></p>
          <p class="number van-hairline--bottom"><span>出让数量：</span><input type="text" placeholder="请输入出让数量" v-model="totalQuantity"></p>
          <div class="type van-hairline--bottom">
              <span>交易类型：</span>
              <input type="radio" id="one" value="0" v-model="picked"><i>公开交易</i>
              <input type="radio" id="one" value="1" v-model="picked"><i>秘密交易</i>
          </div>
          <p class="id van-hairline--bottom" v-show="picked == 1"><span>对方ID：</span><input type="text" placeholder="请输入对方id" v-model="toMemberNo"></p>
          <p class="xieyi"><span>*</span><a>需收1%手续费</a></p>
          <p class="queren"><button id="btn" @click="confirmanniu">确认</button></p>
          <!-- <p class="xieyi"><span>认领即代表同意</span><a>《xxx协议》</a></p> -->
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
import {getareadata,newTransfer,sendPhoneCode,showpassword,getUserInfoByNo} from "./../../api";
import paypassword from "./../paypassword";
import { Toast,Dialog } from 'vant';
export default {
  components: {
      paypassword
  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        fullarea:'选择地址',
        showarea:false,
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
      picked:'0',//交易类型
      codeData:'',//手机验证码
      totalQuantity:'',//出让数量
      price:'',//出让单价
      username:'',//出让物品
      passwordbox:false,
      toMemberNo:''
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    code(){
      sendPhoneCode(this.userInfo.mobile).then((res)=>{
          if(res.code == 200){
            Toast.success('发送成功请注意查收');
          }
      })
    },
      gopay(password){
    //   this.showloading=true;
    //   this.rightPayBox=false;
    //   this.clickloading=true;
        let _this = this;
        if(_this.picked == 0){
            newTransfer(1,this.userInfo.id,this.price,this.totalQuantity,this.picked,password,this.areaIdLevel1,this.areaIdLevel2,this.areaIdLevel3,this.fullarea,'','').then((res)=>{
                if(res.code == 200){
                    _this.$router.push('/community')
                    // window.location.reload();
                    Toast.success('新增出让成功!');
                }else{
                    Toast.success(res.message);
                }
            })
        }else{
            newTransfer(1,this.userInfo.id,this.price,this.totalQuantity,this.picked,password,this.areaIdLevel1,this.areaIdLevel2,this.areaIdLevel3,this.fullarea,'',this.toMemberNo).then((res)=>{
                if(res.code == 200){
                    _this.$router.push('/community')
                    Toast.success('出让' + _this.toMemberNo + '成功!');
                }else{
                    Toast.success(res.message);
                }
            })
        }
        
    },
    gopaypassword(data){
      // console.log(data)
      this.passwordbox=false;
      this.gopay(data);
      this.showloading=true;
    },
    //   确定
    confirmanniu(){
        let _this = this;
        if(this.areaIdLevel1 == ''){
            Toast.fail('请选择地址')
            return
        }
        if (this.price == '') {
             Toast.fail('请输入出让单价')
            return
        }
        if (this.totalQuantity == '') {
             Toast.fail('请输入出让数量')
            return
        }
        if (this.totalQuantity < 100) {
             Toast.fail('出让最小数量为100')
            return
        }
        if (this.totalQuantity % 1 !== 0) {
             Toast.fail('出让数量必须为整数！')
            return
        }
        if (this.totalQuantity > 10000) {
            Toast.fail('最大出让数量为10000')
            return
        }
        if(this.picked == 1 && this.toMemberNo == ''){
            Toast.fail('请输入对方ID')
            return
        }

        if(this.picked == 1 && this.toMemberNo != ''){
            if(_this.toMemberNo.length === 9){
                getUserInfoByNo(_this.toMemberNo).then(response => {
                    if (response.data) {
                        showpassword(this.userInfo.id).then(response => {
                            if(response.data&&response.data.tradePassword){
                                _this.passwordbox = true;
                            }else{
                                    Dialog.alert({
                                    title: '温馨提示',
                                    message: '您还没有设置交易密码，请设置交易密码'
                                    }).then(() => {
                                        sessionStorage.setItem('goindex','/newclaim');
                                        _this.$router.push('/updatepaypassword');
                                    });
                                    _this.$router.push('/updatepaypassword')
                                }
                        })
                    } else {
                        Toast.fail('暂无该用户信息!')
                    }
                })
            }else{
                Toast.fail('请输入正确的用户ID!')
            }
        }else{
            showpassword(this.userInfo.id).then(response => {
                if(response.data&&response.data.tradePassword){
                    _this.passwordbox = true;
                }else{
                        Dialog.alert({
                        title: '温馨提示',
                        message: '您还没有设置交易密码，请设置交易密码'
                        }).then(() => {
                            sessionStorage.setItem('goindex','/newclaim');
                            _this.$router.push('/updatepaypassword');
                        });
                        _this.$router.push('/updatepaypassword')
                    }
            }) 
        }  
    },
    getarea(data,parentid){
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
        console.log(data)
        let _this = this;
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
        if(this.area2id != ''){
            this.areaIdLevel2= this.area2idbox[0];
        }else{
            let params={};
            params.level = 2;
            params.parent_id = _this.areaIdLevel1; 
            getareadata(params).then((res)=>{
                _this.areaIdLevel2 = res.data[0].id
            })

            // this.areaIdLevel2= this.area2idbox[this.area2id];
        }
        if(this.area3id != ''){
            this.areaIdLevel3= this.area3idbox[0];
        }else{
            let params={};
            params.level = 3;
            params.parent_id = _this.areaIdLevel2; 
            getareadata(params).then((res)=>{
                _this.areaIdLevel3 = res.data[0].id;
            })
        }

        this.showarea=false;
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
}
</script>

<style scoped lang="scss">
*{
    box-sizing: border-box;
}
.new{
    background:#ffffff;
    > .id{
        background: #ffffff;
        padding-bottom: 45px;
        > input{
            border: 1px solid #C4C4C4;
            height: 30px;
            outline: none;
            border-radius: 3px;
            -webkit-appearance: none;
        }
    }
    > p:first-child{
        margin-top: 0;
    }
    > p{
        // margin: 5px 0;
        // background: #F2F2F2;
        height:40px;
        padding: 2px 10px;
        > .dizhi{
            width: calc( 100% - 100px);
            color:#757575;
        }
        > .arrow{
            position: absolute;
            top:14px;
            right:19px;
        }
        > span{
            display: inline-block;
            color: #000000;
            font-size:14px;
            line-height: 40px;
            // width: 80px;
        }
        > input{
            width: calc( 100% - 140px);
            height: 30px;
            outline: none;
            border: 0;
            background: #ffffff;
            padding-left: 10px;
            color: #000000;
            font-size:13px;
        }
        > #btn{
            width: 100%;
            height: 40px;
            background: #DDBF63;
            color: #ffffff;
            font-size:14px;
            outline: none;
            border: 1px solid #DDBF63;
        }
        > input[type="text"]{
          -webkit-appearance: none;
          border:0;
        }
    }
    > .number{
        background: #ffffff;
        padding-bottom: 46px;
        > span{
            // width: 100px;
            display: inline-block;
            line-height: 50px;
        }
        > input{
            width: calc( 100% - 140px);
            height: 30px;
            padding-left: 10px;
            outline: none;
            border: 1px solid #C4C4C4;
            font-size:13px;
            border-radius: 3px;
            -webkit-appearance: none;
        }
    }
    > .btn{
        height: 50px;
        background: #ffffff;
        > input{
            width: 56%;
            outline: none;
            border: 1px solid #C4C4C4;
            float: left;
            height: 40px;
        }
        >  button{
            outline: none;
            width: 40%;
            border: 1px solid #DDBF63;
            background: #DDBF63;
            color: #ffffff;
            font-size: 14px;
            float: left;
            height: 44px;
        }
    }
    > .queren{
        // margin-top: 20%;
        background: #f2f2f2;
        height: 40px;
        padding-top:10%;
    }
    > .xieyi{
        background: #f2f2f2;
        line-height: 25px;
        height: 25px;
        span{
            display: inline-block;
            font-size: 10px;
            display: inline-block;
            height: 20px;
            line-height: 20px;
            color: #000000;
            float:left;
        }
        a{
         color: #000000;
         font-size: 10px;  
         height: 20px;
         display: inline-block; 
         line-height: 20px;
         margin-left:5px;
         float:left;
        }
    }
    > .type{
        padding: 0 10px;
        line-height: 40px;
        > i{
            font-style: normal ;
            margin-right: 5px;
            margin-left: 5px;
            line-height: 50px;
            display: inline-block;
            font-size:14px;
            color:#757575;
        }
        > span{
            display: inline-block;
            line-height: 50px;
            font-size:14px;
        }
        > input{
            position: relative;
            top:2px;
        }
    }
}
    .passwordbox{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        background: #fff;
        width: 100%;
        height: 100%;
    }
</style>
