<template>
  <div style="background:#eeeeef;">
    <top-header title="订单"></top-header>
    <!-- 我的订单 -->
    <div class="listOrder">
        <van-cell-group>
            <van-cell title="我的订单" is-link to="/orderList/0" value="全部订单"/>
        </van-cell-group>
        <div class="list">
            <ul>
                <li v-for="(index,key) in list" :key="key">
                    <a :href="index.url">
                        <p class="prompt"><img :src="index.img" alt=""><i v-show="index.totalRow > 0">{{index.totalRow > 99 ? '99+' :index.totalRow}}</i></p>
                        <p>{{index.name}}</p>
                    </a>
                </li>
                <!-- <li>
                    <a href="#/orderList/0">
                        <p class="prompt"><img src="../../assets/312.png" alt=""><i>1</i></p>
                        <p>待付款</p>
                    </a>
                </li>
                <li>
                    <a href="#/orderList/2">
                        <p class="prompt"><img src="../../assets/313.png" alt=""><i>1</i></p>
                        <p>待发货</p>
                    </a>
                </li>
                <li>
                    <a href="#/orderList/3">
                        <p class="prompt"><img src="../../assets/314.png" alt=""><i>1</i></p>
                        <p>待收货</p>
                    </a>
                </li>
                <li>
                    <a href="#/orderList/4">
                        <p class="prompt"><img src="../../assets/315.png" alt=""><i>1</i></p>
                        <p>问题件</p>
                    </a>
                </li>
                <li>
                    <a href="#/orderList/1">
                        <p class="prompt"><img src="../../assets/316.png" alt=""><i>99</i></p>
                        <p>已完成</p>
                    </a>
                </li> -->
            </ul>
        </div>
    </div>
    <!-- 最近订单 -->
    <div class="theOrder" v-show="1 < 0">
        <h5>最近订单</h5>
        <div class="listof">
            <ul>
                <li v-for="(index,key) in orderList" :key="key">
                    <div class="img"><img src="../../assets/317.png" alt=""></div>
                    <div class="describe">
                        <p class="title">{{index.name}}</p>
                        <p>下单时间:{{index.date}}</p>
                        <p>总价:￥{{index.price}}</p>
                    </div>
                    <div class="state">
                        <p>{{index.state}}</p>
                        <p><a href="#">再来一单</a></p>
                    </div>
                </li>
                <!-- <li>
                    <div class="img"><img src="../../assets/317.png" alt=""></div>
                    <div class="describe">
                        <p class="title">散装手工巧克力330g/袋 25/元/一袋</p>
                        <p>下单时间:2018-04-15 12:29</p>
                        <p>总价:￥61.61</p>
                    </div>
                    <div class="state">
                        <p>已完成</p>
                        <p><a href="#">再来一单</a></p>
                    </div>
                </li> -->
            </ul>
            <h1 @click="clickorderList">更多</h1>
        </div>
    </div>
    <!--我的购物车  -->
    <div class="shopping">
        <van-cell-group>
            <van-cell title="我的购物车" is-link to="/cart" value="查看全部" />
        </van-cell-group>
        <div class="shoppingList" v-show="goodsdata.length > 0">
            <ul>
                <li v-for="(index,key) in goodsdata" :key="key">
                    <h1>{{index.merchantName}}</h1>
                    <div class="details" v-for="(item,ket) in index.cartItems" :ket="ket">
                        <div class="img"><img v-lazy="imgserverUrl + item['goods.indexImage']" :onerror="defaultImg"></div>
                        <div class="content">
                            <p class="title">{{item['goods.name']}}</p>
                            <p class="color">{{item['goodsSpec.valueNames']}}</p>
                            <p class="price">￥{{item['goodsSpec.price']}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <h1 v-show="1 < 0">更多</h1>
        </div>
        <div class="show" v-show="goodsdata.length <= 0" @click="turnRouter">
            <img src="../../assets/319.jpg">
        </div>
    </div>
    <!-- 最近浏览 -->
    <div style="padding-bottom:60px;" class="shopping" v-show="1 < 0">
        <van-cell-group>
            <van-cell title="最近浏览" is-link value="查看全部" />
        </van-cell-group>
        <div class="shoppingList" v-show="1 < 0">
            <ul>
                <li v-for="(index,key) in shoppingList" :key="key">
                    <div class="img"><img src="../../assets/318.png" alt=""></div>
                    <div class="content">
                        <p class="title">{{index.name}}</p>
                        <p class="color">{{index.color}}</p>
                        <p class="price">￥{{index.price}}</p>
                    </div>
                </li>
            </ul>
            <h1>更多</h1>
        </div>
        <div class="show">
            <img src="../../assets/319.jpg">
        </div>
    </div>
    <!-- 底部主导航 -->
    <index-bottom-nav :active="parseInt(bottomNavActive)"></index-bottom-nav>
  </div>
</template>

<script type="text/ecmascript-6">
// 引入底部主导航
import indexBottomNav from './../../components/indexBottomNav'
import { getorderdata,getorder,GoodCart,getGoodCart,imgserverUrl } from "./../../api";
export default {
  components: {
      indexBottomNav
  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        bottomNavActive: 3,
        imgserverUrl: imgserverUrl,
        // 类型列表
        list:[
            {
                name:"购物车",
                prompt:'1',
                url:'#/cart',
                totalRow:0,
                img:require('../../assets/311.png'),
            },
            {
                name:"待付款",
                prompt:'1',
                url:'#/orderList/0',
                totalRow:0,
                img:require('../../assets/312.png'),
            },
            {
                name:"待发货",
                prompt:'1',
                url:'#/orderList/2',
                totalRow:0,
                img:require('../../assets/313.png'),
            },
            {
                name:"待收货",
                prompt:'0',
                url:'#/orderList/3',
                totalRow:0,
                img:require('../../assets/314.png'),
            },
            {
                name:"问题件",
                prompt:'100',
                url:'#/orderList/4',
                totalRow:0,
                img:require('../../assets/315.png'),
            },
            {
                name:"已完成",
                prompt:'99',
                url:'#/orderList/1',
                totalRow:0,
                img:require('../../assets/316.png'),
            }
            
        ],
        // 最近订单
        orderList:[
            {
                img:'',
                name:'散装手工巧克力330g/袋 25/元/一袋',
                date:"2018-04-15: 12:29",
                price:'61.60',
                state:'已完成'
            },
            {
                img:'',
                name:'散装手工巧克力330g/袋 25/元/一袋',
                date:"2018-04-15: 12:29",
                price:'61.60',
                state:'已完成'
            }
        ],
        shoppingList:[
            {
                img:'',
                name:'老人头时尚简约牛皮钱包女长款大容量手拿包优雅复古女包紫色',
                color:'紫色',
                price:'136'
            },
            {
                img:'',
                name:'老人头时尚简约牛皮钱包女长款大容量手拿包优雅复古女包紫色',
                color:'紫色',
                price:'136'
            }
        ],
        cartItems:[],
        goodsdata:[],
        defaultImg: 'this.src="' + require('../../assets/dishe.gif') + '"' 

    }
  },
  created () {
    // 判断用户是否填写手机号码
    // this.getphonedata();
    //   
    this.getorderlist();
    // 购物车数量
    this.GoodCartlist()
    // 购物车信息
    this.getGoodCartlist()
  },
  mounted () {

  },
  methods: {
        theOrder(index){
            this.$router.push(index)
        },
        turnRouter() {
            this.$router.push('/shoppingMail')
        },
        //   判断用户是否填写手机号码
        // getphonedata(){
        //     if(this.userInfo.mobile==null||this.userInfo.mobile=='null'||this.userInfo.mobile==undefined){
        //         this.$router.push('/phone')
        //     }
        // },
       clickorderList(){
            let list = {
                img:'',
                name:'散装手工巧克力330g/袋 25/元/一袋',
                date:"2018-04-15: 12:29",
                price:'61.60',
                state:'已完成'
            }
            this.orderList.push(list)
      },
    //   订单列表的数量
    // 代发货
        getorderlist() {
            let zhethis=this;
            let params={};
            //sum(if(order_status = 1, 1, 0)) as notPaidCount,sum(if(order_status = 2, 1, 0)) as paidCount
            //params.order_status_in='2, 1, 0';
            params.member_id=this.userInfo.id;
            // params.pageSize=this.pageSize;
            params.order
            params.orderBy='create_date desc';
            params.orderType=1;
            params.columns='sum(if(order_status = 0, 1, 0)) as notPaidCount0,sum(if(order_status = 1, 1, 0)) as notPaidCount1,sum(if(order_status = 2, 1, 0)) as notPaidCount2,sum(if(order_status = 3, 1, 0)) as notPaidCount3,sum(if(order_status = 4, 1, 0)) as notPaidCount4'
            getorder(params).then(response => {
                zhethis.list[1].totalRow = response.data.notPaidCount0;
                zhethis.list[2].totalRow = response.data.notPaidCount2;
                zhethis.list[3].totalRow = response.data.notPaidCount3;
                zhethis.list[4].totalRow = response.data.notPaidCount4;
                zhethis.list[5].totalRow = response.data.notPaidCount1;
            })
        },
        GoodCartlist(){
            let zhethis=this;
            GoodCart(this.userInfo.id).then(response => {
                zhethis.list[0].totalRow = response.data[0].cartItems[0].totalcount;
            })
        },
        //购物车
        getGoodCartlist(){
            let zhethis = this;
            getGoodCart(this.userInfo.id).then(res=>{
                // console.log("购物车")
                // zhethis.cartItems = res.data[0].cartItems
                zhethis.goodsdata = res.data;
                console.log(zhethis.goodsdata)
                // console.log(zhethis.cartItems)
            })
        }
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
