<template>
  <div class="goods-info">
    <div v-if="editaddress==false&&editaddress2==false">
      <!-- 头部标题 -->
      <!-- <header class="top-title">
        <a class="back-off" href="javascript:history.go(-1);location.reload()">
          <van-icon name="arrow-left" />
        </a>
        <span>地址</span>
      </header> -->
      <top-header title="地址"></top-header>
      <van-address-list v-model="chosenAddressId" :list="addresslist" @select="addressdefault"  @add="onAdd" @edit="onEdit" />
    </div>

    
    <div v-show="editaddress">
      <header class="top-title">
        <a class="back-off" href="javascript:void(0)" @click="editaddress=false">
          <van-icon name="arrow-left" />
        </a>
        <span>新增地址</span>
      </header>
      <van-cell-group>
        <van-field label="收货人" v-model="message.name" placeholder="请输入收货人"/>
        <van-field label="联系电话" v-model="message.tel" placeholder="手机或固定电话"/>
        <van-cell is-link @click="getarea(1),showarea=true">
          <template slot="title">
            <span class="van-cell-text">收件地区</span>
            <span v-text="fullarea" style="margin-left:29px;"></span>
          </template>
        </van-cell>
        <van-field label="详细地址" v-model="message.address_detail" placeholder="如街道、小区、门牌号" />
        <van-field label="邮政编码" v-model="message.postal_code" placeholder="邮政编码" />
      </van-cell-group>

      <!-- <van-address-edit
        :area-list="areaList"
        show-postal
        show-search-result
        :search-result="searchResult"
        @change-area="changearea"
        @save="onSave"
        @change-detail="onChangeDetail"
      /> -->
      
      <div class="savebtn" @click="onSave()">保存</div>
    </div>

    <div v-show="editaddress2">
      <header class="top-title">
        <a class="back-off" href="javascript:void(0)" @click="editaddress2=false">
          <van-icon name="arrow-left" />
        </a>
        <span>修改地址</span>
      </header>
      <!-- <van-address-edit
        :address-info="editaddressdata"
        :area-list="areaList"
        show-postal
        show-search-result
        :search-result="searchResult"
        @change-area="changearea"
        @save="onupdate"
      /> -->
      <van-cell-group>
        <van-field label="收货人" v-model="messagedata.name" placeholder="请输入收货人"/>
        <van-field label="联系电话" v-model="messagedata.tel" placeholder="手机或固定电话"/>
        <van-cell is-link @click="getarea(1),showarea=true">
          <template slot="title">
            <span class="van-cell-text">收件地区</span>
            <span v-text="fullarea" style="margin-left:29px;"></span>
          </template>
        </van-cell>
        <van-field label="详细地址" v-model="messagedata.address_detail" placeholder="如街道、小区、门牌号" />
        <van-field label="邮政编码" v-model="messagedata.postal_code" placeholder="邮政编码" />
      </van-cell-group>

      <div class="savebtn" @click="onupdate()">保存</div>
      <div class="delbtn" @click="onremoveid()">删除</div>

    </div>

    <van-popup v-model="showarea" position="bottom">
      <van-picker show-toolbar :columns="areacolumns" @change="onChange" @cancel="showarea=false" @confirm="confirmbtn" ref='areapicker' />
    </van-popup>
    <!-- <div class="gocartcss" @click="gocartbtn()" v-if="editaddress==false&&editaddress2==false"><van-icon class="lefticon" name="cart" />返回购物车<van-icon class="righticon" name="arrow" /></div> -->
    <div class="footerbtn" v-if="editaddress==false&&editaddress2==false">
      <p class="gocartbtncss" @click="gocartbtn()">返回购物车</p>
      <p class="goaddbtncss" @click="onAdd()">新增收货地址</p>
    </div>

  </div>  
</template>

<script>
import { getaddress ,saveaddress , getareadata ,updataddress,updataddress2 ,removeaddress} from "./../../api";
// import areadatajson from './../../../static/area.json'
import { Toast,Dialog } from 'vant';
export default {
  name: 'goods-info',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      editaddress:false,
      editaddress2:false,
      chosenAddressId: '',
      addresslist: [],
      // areaList:{},
      searchResult: [],
      editaddressdata:{},
      addresslistdata:[],
      delid:'',
      // 修改地址
      messagedata:{},
      // 新增地址
      message:{},
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
      area1idbox:[],
      area2idbox:[],
      area3idbox:[],
      area1id:'',
      area2id:'',
      area3id:'',
      areaIdLevel1:null,
      areaIdLevel2:null,
      areaIdLevel3:null,
      fullarea:'',
      dizhi:'10'
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
    // this.getarea(1);
    this.getaddresslist();
  },
  computed: {
    
  },
  methods: {
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
    },
    getaddresslist() {
      let zhethis=this;
      this.addresslist=[];
      getaddress(this.userInfo.id).then(response => {
        let addressdata = response.data;
        zhethis.addresslistdata=addressdata;
        for (var i = 0; i < addressdata.length; i++) {
          if(addressdata[i].defaultCheck){
            zhethis.chosenAddressId=addressdata[i].id;
          }
          let fullAddress = ''
          let params = {};
          params.level = 1;
          // 修改地址
          // getareadata(params).then(res => {
          //   addressdata[i]['fullAddress']+= response.data.find((id)=> {
          //     return id.id == addressdata[i]['areaIdLevel1']
          //   }).area; 
          //     let params = {};
          //     params.level = 1;
          //     getareadata(params).then(res=>{
          //         addressdata[i]['fullAddress']+= response.data.find((id)=> {
          //           return id.id == addressdata[i]['areaIdLevel2']
          //         }).area;
          //         getareadata(params).then(res=>{
          //             addressdata[i]['fullAddress']+= response.data.find((id)=> {
          //               return id.id == addressdata[i]['areaIdLevel3']
          //             }).area;
          //         })
          //     })

          // })
          // 修改地址
          zhethis.addresslist.push({
            id: addressdata[i].id,
            name: addressdata[i].consignee,
            tel: addressdata[i].mobile,
            address: addressdata[i]['fullAddress'],
            // 地区的ID
            areaIdLevel1:addressdata[i]['areaIdLevel1'],
            areaIdLevel2:addressdata[i]['areaIdLevel2'],
            areaIdLevel3:addressdata[i]['areaIdLevel3'],
            fullAddress:addressdata[i]['address'],
          })
          console.log(addressdata) 
        }
      })
    },
    onAdd(){
      this.editaddress=true;
      let zhethis=this;
      zhethis.fullarea = '';
      console.log(this.areaIdLevel1,this.areaIdLevel2,this.areaIdLevel3)
      // this.areaList=areadatajson;
      // let params={'level':'1'}
      // getareadata(params).then(response => {
      //   zhethis.areaList.province_lis=response.data;
      // })

    },
    changearea(){

    },
    onEdit(item, index){
      let zhethis=this;
      this.delid=item.id;
      var dizhi = '';  
      // 获取地区
      if(item.areaIdLevel1){
        let params = {};
        params.level = 1;

        for (var i = 0; i < this.addresslistdata.length; i++) {
            if(this.addresslistdata[i].id==this.delid){
                zhethis.messagedata.name=zhethis.addresslistdata[i].consignee
                zhethis.messagedata.tel=zhethis.addresslistdata[i].mobile;
                // zhethis.fullarea=zhethis.addresslistdata[i]['fullAddress'];
                zhethis.messagedata.address_detail=zhethis.addresslistdata[i].address;
                // zhethis.fullarea = dizhi;
                zhethis.areaIdLevel1= item.areaIdLevel1;
                // zhethis.areaIdLevel2= item.areaIdLevel2;
                // zhethis.areaIdLevel3= item.areaIdLevel3;
                // zhethis.areaIdLevel2= zhethis.addresslistdata[i].areaIdLevel2;
                // zhethis.areaIdLevel3= zhethis.addresslistdata[i].areaIdLevel3;
                // zhethis.messagedata.area_code=this.addresslistdata[i].areaIdLevel5;
                zhethis.messagedata.postal_code=zhethis.addresslistdata[i].zipNo;
                zhethis.messagedata.is_default=zhethis.addresslistdata[i].defaultCheck;
                console.log(zhethis.messagedata)
            }
          }

        getareadata(params).then(response => {
           dizhi+= response.data.find((id)=> {
            return id.id == item.areaIdLevel1
          }).area;  
          // 当只有一级城市的时候
          for (var i = 0; i < this.addresslistdata.length; i++) {
                if(this.addresslistdata[i].id==this.delid){
                    // zhethis.messagedata.name=zhethis.addresslistdata[i].consignee
                    // zhethis.messagedata.tel=zhethis.addresslistdata[i].mobile;
                    // zhethis.fullarea=zhethis.addresslistdata[i]['fullAddress'];
                    // zhethis.messagedata.address_detail=zhethis.addresslistdata[i].fullAddress;
                    zhethis.fullarea = dizhi;
                    zhethis.areaIdLevel1= item.areaIdLevel1;
                    // zhethis.areaIdLevel2= item.areaIdLevel2;
                    // zhethis.areaIdLevel3= item.areaIdLevel3;
                    // zhethis.areaIdLevel2= zhethis.addresslistdata[i].areaIdLevel2;
                    // zhethis.areaIdLevel3= zhethis.addresslistdata[i].areaIdLevel3;
                    // zhethis.messagedata.area_code=this.addresslistdata[i].areaIdLevel5;
                    zhethis.messagedata.postal_code=zhethis.addresslistdata[i].zipNo;
                    zhethis.messagedata.is_default=zhethis.addresslistdata[i].defaultCheck;
                    console.log(zhethis.messagedata)
                }
              }
          if(item.areaIdLevel2){
            let params = {};
            params.level = 2;
            getareadata(params).then(response => {
              dizhi+=response.data.find((id)=> {
                return id.id == item.areaIdLevel2
              }).area;
              // 当有两级城市的时候
              for (var i = 0; i < this.addresslistdata.length; i++) {
                if(this.addresslistdata[i].id==this.delid){
                    // zhethis.messagedata.name=zhethis.addresslistdata[i].consignee
                    // zhethis.messagedata.tel=zhethis.addresslistdata[i].mobile;
                    // zhethis.fullarea=zhethis.addresslistdata[i]['fullAddress'];
                    // zhethis.messagedata.address_detail=zhethis.addresslistdata[i].address;
                    zhethis.messagedata.address_detail=zhethis.addresslistdata[i].address;
                    zhethis.fullarea = dizhi;
                    // zhethis.areaIdLevel1= item.areaIdLevel1;
                    zhethis.areaIdLevel2= item.areaIdLevel2;
                    // zhethis.areaIdLevel3= item.areaIdLevel3;
                    // zhethis.areaIdLevel2= zhethis.addresslistdata[i].areaIdLevel2;
                    // zhethis.areaIdLevel3= zhethis.addresslistdata[i].areaIdLevel3;
                    // zhethis.messagedata.area_code=this.addresslistdata[i].areaIdLevel5;
                    // zhethis.messagedata.postal_code=zhethis.addresslistdata[i].zipNo;
                    // zhethis.messagedata.is_default=zhethis.addresslistdata[i].defaultCheck;
                    console.log(zhethis.messagedata)
                }
              }
              if(item.areaIdLevel3){
                let params = {};
                params.level = 3;
                getareadata(params).then(response => {
                  dizhi+=response.data.find((id)=> {
                    return id.id == item.areaIdLevel3
                  }).area;
                  // 当有三级城市的时候
                  for (var i = 0; i < this.addresslistdata.length; i++) {
                    if(this.addresslistdata[i].id==this.delid){
                        // zhethis.messagedata.name=zhethis.addresslistdata[i].consignee
                        // zhethis.messagedata.tel=zhethis.addresslistdata[i].mobile;
                        // zhethis.fullarea=zhethis.addresslistdata[i]['fullAddress'];
                        // zhethis.messagedata.address_detail=zhethis.addresslistdata[i].address;
                        zhethis.messagedata.address_detail=zhethis.addresslistdata[i].address;
                        zhethis.fullarea = dizhi;
                        // zhethis.areaIdLevel1= item.areaIdLevel1;
                        // zhethis.areaIdLevel2= item.areaIdLevel2;
                        zhethis.areaIdLevel3= item.areaIdLevel3;
                        // zhethis.areaIdLevel2= zhethis.addresslistdata[i].areaIdLevel2;
                        // zhethis.areaIdLevel3= zhethis.addresslistdata[i].areaIdLevel3;
                        // zhethis.messagedata.area_code=this.addresslistdata[i].areaIdLevel5;
                        // zhethis.messagedata.postal_code=zhethis.addresslistdata[i].zipNo;
                        // zhethis.messagedata.is_default=zhethis.addresslistdata[i].defaultCheck;
                        console.log(zhethis.messagedata)
                    }
                  }
                  // alert(dizhi)
                })
              }
            })
          }
        })
      }
      console.log(item)
      // for (var i = 0; i < this.addresslistdata.length; i++) {
      //   if(this.addresslistdata[i].id==this.delid){

      //       zhethis.messagedata.name=zhethis.addresslistdata[i].consignee
      //       zhethis.messagedata.tel=zhethis.addresslistdata[i].mobile;
      //       // zhethis.fullarea=zhethis.addresslistdata[i]['fullAddress'];
      //       // zhethis.messagedata.address_detail=zhethis.addresslistdata[i].address;
      //       // zhethis.fullarea = '';
      //       zhethis.areaIdLevel1= null;
      //       // zhethis.areaIdLevel2= zhethis.addresslistdata[i].areaIdLevel2;
      //       // zhethis.areaIdLevel3= zhethis.addresslistdata[i].areaIdLevel3;
      //       // zhethis.messagedata.area_code=this.addresslistdata[i].areaIdLevel5;
      //       zhethis.messagedata.postal_code=zhethis.addresslistdata[i].zipNo;
      //       zhethis.messagedata.is_default=zhethis.addresslistdata[i].defaultCheck;
      //       console.log(zhethis.messagedata)
      //   }
      // }
      // this.areaList=areadatajson;
      
      this.editaddress2=true;
    },
    onSave(data) {
      let zhethis = this;
      console.log(this.message.name, this.message.tel ,this.message.address_detail ,this.areaIdLevel1)
      if (this.message.name == undefined || this.message.tel == undefined || this.message.address_detail == undefined || this.areaIdLevel1 == null) {
       Toast('请输入地址!');
        return;
      }
     
      let params={};
      params.member_id=this.userInfo.id;
      params.open_id=this.userInfo.open_id;

      params.consignee=this.message.name;
      params.mobile=this.message.tel;
      params.areaIdLevel1= this.areaIdLevel1;
      params.areaIdLevel2= this.areaIdLevel2;
      params.areaIdLevel3= this.areaIdLevel3;
      params.fullAddress=this.fullarea+this.message.address_detail;
      params.address=this.message.address_detail;
      // params.areaIdLevel5=this.messagedata.area_code;
      params.zipNo=this.message.postal_code;
      // params.defaultCheck=this.messagedata.is_default;
      saveaddress(params).then(response => {
        if(response.code=="200"){
          zhethis.editaddress=false;
          zhethis.getaddresslist();
          // 保存成功之后初始化地址
          zhethis.areaIdLevel1 = null;
        }else{
          alert(response.message)
        }
      }) 
    },
    onupdate(data){
      console.log(this.areaIdLevel1)
      if (this.messagedata.name == '' || this.messagedata.tel == '' || this.messagedata.address_detail == null || this.areaIdLevel1 == null) {
        Toast('请输入地址!');
        return;
      }
      let zhethis = this;
      let params={};
      params.id=this.delid;
      params.consignee=this.messagedata.name;
      params.mobile=this.messagedata.tel;
      params.areaIdLevel1= this.areaIdLevel1;
      params.areaIdLevel2= this.areaIdLevel2;
      params.areaIdLevel3= this.areaIdLevel3;
      params.fullAddress=this.fullarea+this.messagedata.address_detail;
      params.address=this.messagedata.address_detail;
      // params.areaIdLevel5=this.messagedata.area_code;
      params.zipNo=this.messagedata.postal_code;
      params.defaultCheck=this.messagedata.is_default;
      updataddress(params).then(response => {
        if(response.code=="200"){
          zhethis.editaddress2=false;
          zhethis.getaddresslist();
          zhethis.areaIdLevel1 = null;
        }else{
          alert(response.message)
        }
      })
    },
    addressdefault(data){
      // let ids=[];
      let params={};
      let zhethis=this;
      params.id=data.id;
      params.defaultCheck=1;
      // for (var i = 0; i < this.addresslist.length; i++) {
      //   ids.push()
      // }
      updataddress2(params).then(response => {
        if(response.code=="200"){
          zhethis.getaddresslist();
        }else{
          alert(response.message)
        }
      })
    },
    onDelete() {
      Toast('delete');
    },
    onremoveid(){
      let zhethis=this;
      Dialog.confirm({
        title: '温馨提示',
        message: '确认删除'
      }).then(() => {
        removeaddress(this.delid).then(response => {
          if(response.code=="200"){
            zhethis.editaddress2=false;
            zhethis.getaddresslist();
          }else{
            alert(response.message)
          }
        })
      }).catch(() => {
        // on cancel
      });
      
    },
    onChangeDetail(val) {
      // if (val) {
      //   this.searchResult = [{
      //     name: '黄龙万科中心',
      //     address: '杭州市西湖区'
      //   }];
      // } else {
      //   this.searchResult = [];
      // }
    },
    gocartbtn(){
      this.$router.push("/payorder");
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
