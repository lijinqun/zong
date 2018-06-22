<template>
  <div class="nearby">
    <div class="posheader">
      <topSearch @clickcity='clickcity' @search='search' :message="message" />
    </div>
    <!-- <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide box">
          <div class="box-page" v-for="(item, index) in merchantcat" :key="index" v-if="index < 10" @click="clicktab(index)">
            <img src="./../../assets/131.png" alt="">
            <p>{{item.name}}</p>
          </div>
        </div>
        <div class="swiper-slide box">
          <div class="box-page" v-for="(item, index) in merchantcat" :key="index" v-if="index > 10" @click="clicktab(index)">
            <img src="./../../assets/131.png" alt="">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div> -->
    <van-tabs v-model="active" style="margin-top: 40px;" @click="clicktab">
      <van-tab v-for="(item, index) in merchantcat" :title="item.name" :key="index">
       
        <!-- <van-tab class="navbar-item" :title="'美食'"> -->
        <!-- 空购物车 -->
        <!-- <div class="empty" v-if="list.length<1">
          <div class="img-box">
            <img src="../../assets/91.png" alt="购物车">
          </div>
          <p>一家有态度的严选商城</p>
          <p>即将努力为您呈现</p>
          <p class="gray mb-20">坚持你所相信的 相信你所坚持的</p>
          <span class="find gray">
            去发现
          </span>
        </div> -->
        <ul class="list" v-waterfall-lower="loadMoreaa" waterfall-disabled="disabled" waterfall-offset="200">
          <li class="list-item clearfloat" v-for="(item, index) in list" :key="index" @click="clickmerchant(item.memberId)" style="padding:3px 10px 0 10px;">
            <!-- <li class="list-item clearfloat" v-for="item in list"> -->
            <div class="img-box">
              <!-- <img :src="imgserverUrl + item.shopImage1" alt="logo" class="logo"> -->
              <img class="logo imgstyle" :onerror="defaultImg" v-lazy="imgserverUrl + item.shopImage1">
              <!-- <img src="./../../assets/79.png" alt="logo"> -->
            </div>
            <div class="content van-hairline--bottom" style="padding-bottom:25px;">
              <div class="title van-ellipsis">
                {{item.shopName}}
              </div>
              <div class="img">
                <img src="./../../assets/151.png" alt="" v-for="item in 5" :key="item">
              </div>
              <div class="info">
                <p v-show="item.shortDesc != null && item.shortDesc != 'null'">{{item.shortDesc || ''}}</p>
                <p v-show="item.allowCoin == 1" class="van-hairline--surround" style="padding:2px;color:#ff5e52;font-width:300;font-size:10px; border-radius: 3px;width:45px;text-align: center;margin-top:5px;">消费珠宝</p>
                <!-- <p class="address van-ellipsis">
                  {{item.address}}
                </p>
                <p class="type van-ellipsis" v-if="item.phone!=''">
                  电话
                  <span>{{item.phone}}</span>
                </p> -->
                <!-- <p class="type van-ellipsis">
                    {{item.businessTypeName}} <span>{{item.shortDesc}}</span>
                  </p> -->
              </div>
              <!-- <div class="distance">
                  <span>4.3</span> km
                </div> -->
            </div>
            <div class="right-page van-hairline--bottom" style="padding-bottom:25px;">
              <img src="./../../assets/153.png" alt="">
              <p style="font-size:12px;color:#ff5e52;line-height:30px;" v-show="item.meter != null">{{item.meter < 1000 ? item.meter + 'm' : (item.meter / 1000).toFixed(1) + 'km'}}</p>
            </div>
          </li>

          <!-- 固定跳转 -->
          <li class="list-item clearfloat" @click="clickfixedbtn()">
            <div class="img-box">
              <img src="./../../assets/icon003.jpg" alt="logo">
            </div>
            <div class="content">
              <div class="title van-ellipsis" style="color:#ff0000;">
                我也要成为附近商家
              </div>
              <div class="info">
                <p class="address van-ellipsis">
                  从众链商期待您的加入
                </p>
                <p class="type van-ellipsis">
                  电话
                  <span>4006677905</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      <!-- <van-tab :title="'酒店住宿'">

        </van-tab>
        <van-tab :title="'KTV'">
          KTV
        </van-tab>
        <van-tab :title="'生活服务'">
          生活服务
        </van-tab>
        <van-tab :title="'旅游'">
          旅游
        </van-tab> -->
        
      </van-tab>
    </van-tabs>
    <!-- 浮动按钮 -->
    <div class="gobtnfixed" v-show="showfixeddbtn" @click="clickfixedbtn()">
      <img src="./../../assets/icon005.jpg">
    </div>
    <!-- 底部主导航 -->
    <index-bottom-nav :active="parseInt(bottomNavActive)"></index-bottom-nav>
    <return-nav :active="rolling"></return-nav>
  </div>
</template>

<script>
  import {
    Waterfall
  } from "vant";
  // 引入底部主导航
  import indexBottomNav from './../../components/indexBottomNav'

 
  // 引入顶部搜索
  import topSearch from "./../../components/topSearch";
  import returnNav from './../../components/return'
  import tools from '../../utils'
  import {
    getMerchantPage,
    imgserverUrl,
    getMerchantcatlist,
    getMerchantSummary,
    getMerchantInfo,
    shopName_lk,
    gpsPositioning,
    getcity,
    defaultPositioning
  } from "./../../api";
  import {MP} from '../../api/map.js'

  // const initList = [
  //   {
  //     shopName: "珠海市拱北楚原湘菜馆",
  //     address: "珠海市香洲区拱北侨光路18号",
  //     type: "餐饮 主营湖南湘菜",
  //     distance: "4.3",
  //     img: "./../../assets/79.png"
  //   },
  //   {
  //     shopName: "珠海市拱北楚原湘菜馆",
  //     address: "珠海市香洲区拱北侨光路18号",
  //     type: "餐饮 主营湖南湘菜",
  //     distance: "4.3",
  //     img: "./../../assets/79.png"
  //   },
  // ];

  export default {
    components: {
      topSearch,
      indexBottomNav,
      returnNav
    },
    data() {
      return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        bottomNavActive: 1,
        active: 0,
        threshold: 4, // 超过该阈值tab可滚动
        list: [],
        nonelist: [],
        merchantcat: [],
        disabled: false,
        imgserverUrl: imgserverUrl,
        pageNumber: 1,
        pageSize: 5,
        totalPage: 1,
        type: '',
        showfixeddbtn: false,
        fixeddbtntxt: '',
        cityid: null,
        clicktabid: 0,
        swiper: null,
        // defaultImg: 'this.src="' + require('../../assets/dishe.gif') + '"' 
        defaultImg: 'this.src="' + require('../../assets/327.png') + '"',
        rolling:false,
        longitude:sessionStorage.getItem('longitude'),
        latitude:sessionStorage.getItem('latitude'),
        id:'',
        message:''
      };
    },
    created() {
      tools.clientHeight(this) //滑动到底部显示返回顶部按钮
      let _this = this;
      this.$nextTick(() => {
        sessionStorage.removeItem("newmerchantsid");
        sessionStorage.removeItem("clickmerchantsmemberid");
        let zhethis = this;
        getMerchantSummary(this.userInfo.id).then(response => {
          if (response.data) {
            getMerchantInfo(zhethis.userInfo.id).then(response => {
              console.log(response.data)
              if (response.data == null || response.data == 'null' || response.data.isVisiable == '0') {
                zhethis.fixeddbtntxt = '我也要成为附近商家';
                zhethis.showfixeddbtn = true;
              }
            })
          }
        })
      })
      // 如果已经有了定位了就直接获取数据
      if( sessionStorage.getItem('cityname') != null){
        getcity().then((res)=>{
            let list = res.data;
            console.log('list')
            console.log(list)
            console.log('cityname')
            console.log(sessionStorage.getItem('cityname'))
            for(let i=0;i<list.length;i++){
              for(let v=0;v<list[i].areas.length;v++){
                if(list[i].areas[v].area == sessionStorage.getItem('cityname')){
                  _this.id = list[i].areas[v].id
                  // _this.getMerchantcat(list[i].areas[v].id)
                  _this.getMerchantcat()
                }
              }
            }
        })
        _this.getMerchantcat()
      }else{
        //如果还没有定位就从新定位在获取数据
        gpsPositioning(()=>{ //同意共享位置获取的回调函数
          gpsPositioning(()=>{
            getcity().then((res)=>{
              let list = res.data;
              console.log('list')
              console.log(list)
              console.log('cityname')
              console.log(sessionStorage.getItem('cityname'))
              _this.longitude = sessionStorage.getItem('longitude')
              _this.latitude = sessionStorage.getItem('latitude')
              _this.message = sessionStorage.getItem('cityname');
              for(let i=0;i<list.length;i++){
                for(let v=0;v<list[i].areas.length;v++){
                  if(list[i].areas[v].area == sessionStorage.getItem('cityname')){
                    _this.id = list[i].areas[v].id
                    // _this.getMerchantcat(list[i].areas[v].id)
                    _this.getMerchantcat()
                  }
                }
              }
          })
        })
        },()=>{//拒绝共享位置的回调函数
          _this.message = '全国';
          _this.getMerchantcat()
        })
      }
    },
    computed:{
    },
    watch:{
    },
    mounted () {
      this.swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
      })  
    },
    methods: {
      // 搜索
      search(name){
        let _this = this;
        shopName_lk(name).then((res)=>{
          _this.list = res.data.list
        })
      },
      clickmerchant(id) {
        sessionStorage.setItem("clickmerchantsmemberid", id);
        this.$router.push('/merchantshop')
      },
      clickcity(name, id) {
        this.cityid = id;
        this.active = 0;
        sessionStorage.setItem('cityname', name)
        this.pageNumber = 1
        // this.getMerchantcat(id);
        this.getMerchantcat();
      },
      clickfixedbtn() {
        let zhethis = this;
        getMerchantSummary(this.userInfo.id).then(response => {
          if (response.data) {
            zhethis.$router.push('/shopSetting')
            // getMerchantInfo(zhethis.userInfo.id).then(response => {
            //     if (response.data==null||response.data=='null'||response.data.isVisiable=='0') {
            //       zhethis.$router.push('/shopSetting')
            //     }
            //   })
          }
        })
      },
      getMerchantcat(areaIdLevel2) {
        let zhethis = this;
        getMerchantcatlist().then(response => {
          zhethis.merchantcat = response.data;
          // let types = zhethis.type != '' ? zhethis.type : zhethis.merchantcat[0].id;
          zhethis.getlist(zhethis.pageNumber, zhethis.pageSize, '', 1, areaIdLevel2);
          zhethis.merchantcat.unshift({'name':'全部'});
        })
      },
      getlist(pageNumber, pageSize, type, status, areaIdLevel2) {
        let zhethis = this;
        getMerchantPage(pageNumber, pageSize, type, status, areaIdLevel2,this.longitude,this.latitude).then(response => {
            zhethis.list = response.data.list;
            zhethis.pageNumber = response.data.pageNumber;
            zhethis.pageSize = response.data.pageSize;
            zhethis.totalPage = response.data.totalPage;
        })
      },
      loadMoreaa() {
        this.disabled = true;
        let zhethis = this;
        setTimeout(() => {
          if (zhethis.pageNumber < zhethis.totalPage) {
            zhethis.pageNumber++;
            getMerchantPage(zhethis.pageNumber, zhethis.pageSize, zhethis.type, 1, zhethis.city,this.longitude,this.latitude).then(response => {
              zhethis.list.push(...response.data.list);
              zhethis.pageNumber = response.data.pageNumber;
              zhethis.pageSize = response.data.pageSize;
              zhethis.totalPage = response.data.totalPage;
            })
          }
          zhethis.disabled = false;
        }, 200);
      },
      clicktab(index) {
        if(index==0){
          this.type = '';
          // 导航栏全部是现实所有国家的全部
          this.getlist(1, this.pageSize, this.type, 1);
        }else{
          this.type = this.merchantcat[index].id;
          if( this.cityid != null){
            this.getlist(1, this.pageSize, this.type, 1, this.cityid);
          }else{
            this.getlist(1, this.pageSize, this.type, 1, this.id);
          }
        }
      }
    },
    directives: {
      WaterfallLower: Waterfall("lower")
    }
  };

</script>


<style lang="scss" scoped>
  @import "./index.scss";
</style>
