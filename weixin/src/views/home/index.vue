<template>
  <!-- 首页组件 -->
  <div class="home" ref="box">
    <!-- 头顶搜索 -->
    <div class="top-search" :class="{ active: isActive }">
      <van-row>
        <van-col span="6">
          <!-- 定位所在地址 -->
          <div class="location">
            <img src="./../../assets/new1.png" class="leftimgcss">
            <span>珠海市</span>
            <img src="./../../assets/new2.png" class="rightimgcss">
            <!-- <van-icon name="location" /> -->
          </div>
        </van-col>
        <van-col span="18">
          <!-- 搜索框 -->
          <div class="search-box">
            <van-icon class="icon" name="search" @click="searchbtn(0)" />
            <input type="text" v-model="searchdata" placeholder="搜索产品...">
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 首页轮播图 -->
    <div class="home-swipe">
      <van-swipe :autoplay="4000">
        <van-swipe-item v-for="(image, index) in topimgdata" :key="index">
          <a :href="image.link">
            <img :src="imgserverUrl+image.image" :alt="image.name"/>
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 链接中心 -->
    <div class="center-link">
      <van-row>
        <van-col span="4" :offset="index === 0 ? 0 : 1" v-for="(item, index) in centerLink" :key="index" v-if="index < 5">
          <a @click="turnRouter(item.link)">
            <img :src="item.img" :alt="item.title">
            <p>{{item.title}}</p>
          </a>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="4" :offset="index === 5 ? 0 : 1" v-for="(item, index) in centerLink" :key="index" v-if="index > 4">
          <a :href="item.link">
            <img :src="item.img" :alt="item.title">
            <p>{{item.title}}</p>
          </a>
        </van-col>
      </van-row>
    </div>
    <!-- 公告栏 -->
    <!-- <van-notice-bar text="从众链商内测中。" :left-icon="require('./../../assets/118.png')" /> -->
    <div class="noticedata">
      <van-row class="rowcss">
        <van-col span="4" class="imgcss">
          <a href="#/newsnotice/1">
            <img class="noticeimg" src="./../../assets/360.png">
          </a>
        </van-col>
        <van-col span="20" class="txtcss">
          <ul id="notice_ul" ref="notice_ul" class="noticeulcss">
            <li class="noticetxt" v-for="item in noticedata">{{item.title}}</li>
          </ul>
        </van-col>
      </van-row>
    </div>
    <!-- 横幅 -->
    <div class="home-swipe">
      <van-swipe :autoplay="6000">
        <van-swipe-item v-for="(image, index) in centerimgdata" :key="index">
        <a :href="image.link">
          <img :src="imgserverUrl+image.image" :alt="image.name"/>
        </a>
      </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 排行榜 -->
    <div class="sorting">
      <ul>
        <li>
          <router-link to="/selling/1" class="van-hairline--right van-hairline--bottom">
            <img src="../../assets/358.png" alt="">
          </router-link>
        </li>
        <li>
          <router-link to="/product/2" class="van-hairline--bottom">
            <img src="../../assets/357.png" alt="">
          </router-link>
        </li>
        <li>
          <router-link to="/product/1" class="van-hairline--right">
            <img src="../../assets/359.png" alt="">
          </router-link>
        </li>
        <li>
          <router-link to="/product/2" >
            <img src="../../assets/356.png" alt="">
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 超值热卖 -->
    <div v-if="bottomimgdatashow==true">
      <p class="hotredtxt">超值热卖</p>
      <ul class="hotshow">
        <li v-for="item in bottomimgdata">
          <a :href="'#/' + item.link" class="van-hairline--right">
            <img v-lazy="imgserverUrl+item.image">
          </a>
        </li>
      </ul>
    </div>

    <!-- 排行榜 -->
    <!-- <div class="goodsranking">
      <p class="rankingtxt">{{labelList.length>0?labelList[0].name:'排行榜'}}</p>
      <ul class="lright" id='nright'>
        <li v-for='item in rankingList' @click='addCart(item.id)' :key="item.id" :value="item.id">          -->
          <!-- <img v-bind:src="imgserverUrl+item.indexImage" class="lrightbigimg" onerror="javascript:this.src='http://bpic.588ku.com/element_origin_min_pic/01/47/02/12574338a640011.jpg'"> -->
          <!-- <img v-lazy="imgserverUrl+item.indexImage" class="lrightbigimg" :onerror="defaultImg"> -->
          <!-- <p class="mdzz" style="-webkit-box-orient: vertical;">{{item.name}}</p> -->
          <!-- <p class="numbersize">￥{{item["price"]}} -->
          <!-- <img src="../../assets/cartcheck.png" class="gwcimg">  -->
          <!-- <img src="../../assets/299.png" class="gwcimg"> 
          </p>
        </li>
      </ul>
    </div> -->
    <div class="goodsranking" v-for='(item,key) in rankingList' :key="key">
      <p class="rankingtxt" @click="details(item.id)">{{(item.id == 10) ? '数码产品' + '热销排行' : '' || (item.id == 47) ? '家用电器' + '热销排行' : '' || (item.id == 48) ? '食品生鲜' + '热销排行' : '' || (item.id == 49) ? '酒水茶饮' + '热销排行' : '' || (item.id == 45) ? '美妆个护' + '热销排行': '' || (item.id == 44) ? '箱包皮具' + '热销排行' : '' || (item.id == 56) ? '家居日用' + '热销排行' : '' || (item.id == 46) ? '男装女装' + '热销排行' : '' || (item.id == 25) ? '男鞋女鞋' + '热销排行' : '' || (item.id == 50) ? '母婴儿童' + '热销排行' : ''}}<van-icon name="arrow" class="arrow" /></p>
      <div class="body">
        <ul class="lright" id='nright' v-for="(val,ket) in item.goodsSpecList" :ket="ket">
          <li @click='addCart(val["goodsId"])' :key="item.id" :value="item.id">         
            <img v-lazy="imgserverUrl+val['goods.indexImage']" class="lrightbigimg">
            <p class="mdzz" style="-webkit-box-orient: vertical;">{{val['goods.name']}}</p>
            <p class="numbersize">￥{{val["discount"]}}        
            <img src="../../assets/299.png" class="gwcimg"> 
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部主导航 -->
    <index-bottom-nav :active="parseInt(bottomNavActive)"></index-bottom-nav>


    <!-- 判断是否关注 -->
    <div class="qrcode" v-show="showqrcode" @click="goqrcode()">
      <img src="../../assets/120.png" alt="">
      <span> 从众链商</span>
      <p>关注公众号</p>
    </div>
    <!-- 返回顶部 -->
    <!-- <div class="return" v-show="rolling" @click="subscribe">
      <img src="../../assets/329.png" alt="">
    </div> -->
      <return-nav :active="rolling"></return-nav>
  </div>
</template>

<script>
// 引入底部主导航
import indexBottomNav from './../../components/indexBottomNav'
// 引入返回顶部按钮
import returnNav from './../../components/return'
import { getMerchantSummary, getShopManagerSummary,getimglist,imgserverUrl,getrankingList,getlabellist,getnoticedata,getsubscribe,sellingData} from "./../../api";
import tools from '../../utils'
import config from '../../config'
export default {
  name: 'home',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      bottomNavActive: 0,
      imgserverUrl:imgserverUrl,
      images: [
        require('./../../assets/113.jpg'),
        require('./../../assets/114.jpg'),
        require('./../../assets/115.jpg')
      ],
      imagesOne: [
        require('./../../assets/119.jpg')
      ],
      centerLink: [
        {
          img: require('./../../assets/66.png'),
          title: '店长',
          link: '/shopCenter'
        },
        {
          img: require('./../../assets/67.png'),
          title: '商家',
          link: '/merchantCenter'
        },
        {
          img: require('./../../assets/68.png'),
          title: '结算中心',
          link: '/accountCenter'
        },
        {
          img: require('./../../assets/387.png'),
          title: '乐分享',
          link: '/share'
        },
        {
          img: require('./../../assets/70.png'),
          title: '帮扶',
          link: '/newsnotice/3'
        },
        {
          img: require('./../../assets/71.png'),
          title: '分类',
          link: '#/shoppingMail'
        },
        {
          img: require('./../../assets/72.png'),
          title: '走味果仓',
          link: '#/img'
        },
        {
          img: require('./../../assets/73.png'),
          title: '产业邦',
          link: '#/newsnotice/4'
        },
        {
          img: require('./../../assets/117.png'),
          title: '智能云柜',
          link: '#/my'
        },
        {
          img: require('./../../assets/75.png'),
          title: '商学院',
          link: '#/newsnotice/6'
        }
      ],
      noticedata:[],
      news_move:[],
      li_height:'18',
      labelList:[],
      topimgdata:[],
      centerimgdata:[],
      bottomimgdata:[],
      rankingList:[],
      disabled: false,
      searchdata:'',
      bottomimgdatashow:false,
      showqrcode:true,
      rankingListData:[],//排行榜
      isActive:true,
      rolling:false,
      payWechat:false
    }
  },
  created () {
    this.payWechat = config.payWechat
    // this.getphonedata();
    this.getlabel();
    this.getnoticelist();
    this.getlogodata();
    this.getlogodata2();
    this.getlogodata3();
    // this.getranking();
    this.getsubscribedata();
    this.sellingData()
    tools.clientHeight(this) //滑动到底部显示返回顶部按钮
  },
  mounted(){
    //调用滚动条函数的界面
    this.notice("#notice_ul");
  },
  watch:{
  },
  methods: {
    // getphonedata(){
    //   if(this.userInfo.mobile==null||this.userInfo.mobile=='null'||this.userInfo.mobile==undefined){
    //     // this.$router.push('/phone')
    //   }
    // },
    getsubscribedata(){
      let zhethis=this;
      getsubscribe(this.userInfo.open_id).then(response => {
          if(response.data.subscribe=='1'){
            zhethis.showqrcode=false;
            zhethis.isActive = false;
          }
      })
    },
    goqrcode(){
      this.$router.push('/qrcode')
    },
    turnRouter (link) {
      if (link === '/merchantCenter') {
        getMerchantSummary(this.userInfo.id).then(response => {
          if (response.data) {
            this.$router.push(link)
          } else {
            this.$router.push('/customerItd')
          }
        })
      } else if (link === '/shopCenter') {
        getShopManagerSummary(this.userInfo.id).then(response => {
          if (response.data) {
            this.$router.push(link)
          } else {
            this.$router.push('/customerItd')
          }
        })
      } else {
        this.$router.push(link)
      }
    },
    searchbtn(id){
      if(this.searchdata!=''){
        sessionStorage.setItem("searchgoodstxt",this.searchdata);
        this.$router.push('/goods/' + id);
      }
    },
    addCart(id){
      this.$router.push('/goodsdetails/' + id);
    },
    getnoticelist() {
      let zhethis=this;
      let params={};
      params.status='1';
      params.sortId='1';
      params.orderBy='updatedTime desc';
      getnoticedata(params).then(response => {
          zhethis.noticedata=response.data;
      })
    },
    getlogodata(){
      let zhethis=this;
      getimglist('1').then(response => {
          zhethis.topimgdata=response.data;
      })
    },
    getlogodata2(){
      let zhethis=this;
      getimglist('2').then(response => {
          zhethis.centerimgdata=response.data;
      })
    },
    getlogodata3(){
      let zhethis=this;
      getimglist('3').then(response => {
          zhethis.bottomimgdata=response.data;
          if(zhethis.bottomimgdata.length>0){
            zhethis.bottomimgdatashow=true;
          }
      })
    },
    // getranking(){
    //   let zhethis=this;
    //   let tableid=this.labelList.length>0&&this.labelList[0].id!=undefined&&this.labelList[0].id!='undefined'&&this.labelList[0].id!=""?this.labelList[0].id:'1';
    //   getrankingList(tableid).then(response => {
    //       zhethis.rankingList = response.data;
    //   })
    sellingData(){
      let _this = this;
      sellingData().then(res => {
        _this.rankingList = res.data;
      })
    },
    getlabel(){
      let zhethis=this;
      getlabellist().then(response => {
          zhethis.labelList = response.data;
      })
    },

    /*移除过渡*/
    removeMove(){
        this.news_move.style.transition = "";
        this.news_move.style.webkitTransition = "";
    },
    /*设置位移*/
    setMove(index){
      this.news_move.style.transform = "translateY("+(index*this.li_height )+"px)";
      this.news_move.style.webkitTransform = "translateY("+(index*this.li_height )+"px)";
    } ,
    /*添加过渡*/
    addMove(){
      this.news_move.style.transition = "all 1s ease-out";
      this.news_move.style.webkitTransition = "all 1s ease-out";
    },


    notice(node,num){
      //信息滚动，获取ul的dom元素
      // this.news_move = document.querySelector(node);
      this.news_move = this.$refs.notice_ul;
      let zhethis=this;
      //获取li的高度
      this.li_height = 18;
      var index = 0;           
          /*定时器*/
      var timer= setInterval(function(){
        zhethis.addMove();
        // (index++ > zhethis.news_move.length-1)?index=0:index;
        index++;
        if(index>(parseInt(zhethis.noticedata.length)-1)){
          index=0;
          zhethis.removeMove();
          zhethis.setMove(-index);
        }
        zhethis.setMove(-index);
      },3000);
    },
    details(index){
      this.$router.push('/selling/' + index)
    }


  },
  components: {
    indexBottomNav,
    returnNav
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
