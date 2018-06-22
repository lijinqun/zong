<template>
  <div class="top-search">
    <!-- 百度地图实例 -->
    <div id="allmap"></div>
    <van-row>
      <van-col span="8">
        <!-- 定位所在地址 -->
        <div class="location" @click="cityshow=true">
          <img src="./../../assets/new1.png" class="leftimgcss">
          <span class="city" v-text="cityname"></span>
          <img src="./../../assets/new2.png" class="rightimgcss">
        </div>
      </van-col>
      <van-col span="15">
        <!-- 搜索框 -->
        <div class="search-box">
          <van-icon class="icon" name="search" @click="search(name)" />
          <input type="text" v-model="name" placeholder="搜索产品、商家...">
        </div>
      </van-col>
      <van-col span="1">

      </van-col>
    </van-row>
    <!-- 城市列表 -->
    <div class="citycss" v-show="cityshow">
      <city @clickcity='clickcity'></city>
    </div>
  </div>
</template>

<script>
import city from '../../views/city'
// 引入百度地图
import {MP} from '../../api/map.js'
import { getcity,shopName_lk,getJssdk,getAppID,gpsPositioning} from "./../../api";
import tools from './../../utils'
import { Toast,Dialog } from 'vant';
import axios from 'axios'
export default {
  props:{
    message: String
  },
  components: {
    city
  },
  data() {
    return {
      cityshow:false,
      cityid:'全国',
      cityname:sessionStorage.getItem('cityname') ? sessionStorage.getItem('cityname') : '',
      latitude:'',
      longitude:'',
      name:'',
      latitude:'',//经度
      longitud:'',//纬度
      speed:'',//速度
      accuracy:'',//位置精度
    };
  },
  watch:{
    message(val) {  
      if( sessionStorage.getItem('cityname') == null){
        this.cityname = val
      }else{
        this.cityname = sessionStorage.getItem('cityname')
      }
    }  
  },
  created () {
      // getcity().then((res)=>{
      //     let list = res.data;
      //     for(let i=0;i<list.length;i++){
      //       for(let v=0;v<list[i].areas.length;v++){
      //         if(list[i].areas[v].area == '珠海市'){
      //           sessionStorage.setItem('parent_id',list[i].areas[v].parent_id);
      //         }
      //       }
      //     }
      //     console.log(list)
      // })
      // 是否允许公众号获取地理位置是一次性的; 
      // wx.getLocation({
      //       type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //       success: function (res) {
      //           // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //           // var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
      //           // var speed = res.speed; // 速度，以米/每秒计
      //           // var accuracy = res.accuracy; // 位置精度
      //           alert(111)
      //       }
      //   });
      let _this = this;
      // getJssdk().then((res)=>{
      //   let latitude = ''
      //     let noncestr = res.data[0].noncestr
      //     let ticket = res.data[0].ticket
      //     let timestamp = res.data[0].timestamp
      //     tools.settingWechat(getAppID(), noncestr, ticket, timestamp, () => {
      //           wx.getLocation({
      //             type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //             success: function (res) {
      //                 var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //                 var longitude = res.longitude ; // 经度，浮点数，范围为180 ~ -180。
      //                 var speed = res.speed; // 速度，以米/每秒计
      //                 var accuracy = res.accuracy; // 位置精度
      //                 alert("获取地理位置成功");
      //                 alert("经度：" + latitude);
      //                 alert("纬度" + longitude);
      //                 alert("位置精度" + accuracy);
      //                 _this.$nextTick(function () {
      //                     MP("kh5Dmj7X18haPvUkbLokFe28yfbMVQ2t").then( BMap => {
      //                     var map = new BMap.Map("allmap");
      //                     var point = new BMap.Point(longitude,latitude);
      //                     var gc = new BMap.Geocoder();
      //                     setTimeout(function(){
      //                         var convertor = new BMap.Convertor();
      //                         var pointArr = [];
      //                         pointArr.push(point);
      //                         convertor.translate(pointArr, 1, 5,function(){
      //                             gc.getLocation(point, function(rs){
      //                               var addComp = rs.addressComponents;
      //                               // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
      //                               _this.cityname = addComp.city;
      //                               alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
      //                             });
      //                         })
      //                     }, 1000)
      //                   })
      //                 })
      //             },
      //             fail: function (_res) {  
      //                 alert(JSON.stringify(_res))
      //             },
      //             cancel:function(res){
      //               alert("用户拒绝"); 
      //             } 
      //           });  
      //     })
      // })
  },
  methods: {
    search(name){
      this.$emit('search', name)
    },
    clickcity(name,id){
      this.cityname=name;
      this.cityshow=false;
      // this.cityid
      this.$emit('clickcity', name,id)
    },
  },
  mounted(){
      // gpsPositioning((log, lat)=>{
      //   alert(1)
      //    this.$nextTick(function () {
      //     let _this = this;
      //     MP("yNlGG8gD03gixPzzvyHMfNiTOz50mXAl").then( BMap => {
      //       var map = new BMap.Map("allmap");
      //       var ggPoint = new BMap.Point(log,lat);
      //       var gc = new BMap.Geocoder();
      //         // 坐标转换之后的回调函数
      //         alert(1)
      //         var translateCallback = function (data){
      //           alert(1)
      //             if(data.status === 0) {
      //               gc.getLocation(data.points[0], function(rs){
      //                 var addComp = rs.addressComponents;
      //                 //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);//省市区什么路多少号
      //                 _this.cityname = addComp.city;
                      
      //                 //alert(JSON.stringify(data.points[0]))
      //               });
      //             }
      //           }
      //         // 坐标转换
      //         setTimeout(function(){
      //             var convertor = new BMap.Convertor();
      //             var pointArr = [];
      //             pointArr.push(ggPoint);
      //             convertor.translate(pointArr, 1, 5, translateCallback)
      //         }, 500);
      //       })
      //   })
      // })
      // this.$nextTick(function () {
      //   let _this = this;
      //   alert(1)
      //   MP("yNlGG8gD03gixPzzvyHMfNiTOz50mXAl").then( BMap => {
      //     let longitude = sessionStorage.getItem('longitude');
      //     let latitude = sessionStorage.getItem('latitude')
      //       var map = new BMap.Map("allmap");
      //       var ggPoint = new BMap.Point(longitude,latitude);
      //       var gc = new BMap.Geocoder();
      //         // 坐标转换之后的回调函数
      //         alert(2)
      //         var translateCallback = function (data){
      //             if(data.status === 0) {
      //               alert(3)
      //               gc.getLocation(data.points[0], function(rs){
      //                 var addComp = rs.addressComponents;
      //                 alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);//省市区什么路多少号
      //                 _this.cityname = addComp.city;
                      
      //                 //alert(JSON.stringify(data.points[0]))
      //               });
      //             }
      //           }
      //         // 坐标转换
      //         setTimeout(function(){
      //             var convertor = new BMap.Convertor();
      //             var pointArr = [];
      //             pointArr.push(ggPoint);
      //             convertor.translate(pointArr, 1, 5, translateCallback)
      //         }, 100);
      //       })
      // })
  },
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>