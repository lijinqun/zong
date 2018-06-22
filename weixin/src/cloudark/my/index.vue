<template>
  <div class="page">
        <div>
            <van-nav-bar
                title="智能云柜"
                />
            <van-tabs @click="add" v-model="active">
                <van-tab v-for="(index,key) in list" :title="index.title" :key="key">
                </van-tab>
            </van-tabs>
            <div class="assets" v-show="my">
                <img v-if="index == 0" src="../../assets/432.png" alt="">
                <img v-else-if="index == 1" src="../../assets/432.png" alt="">
                <img v-else src="../../assets/432.png" alt="">
            </div>
            <div class="my" v-show="!my">
                <van-row>
                    <van-col span="5">
                        <!-- 定位所在地址 -->
                        <div class="location">
                            <img src="./../../assets/new1.png" class="leftimgcss">
                            <span>珠海市</span>
                            <img src="./../../assets/new2.png" class="rightimgcss">
                            <!-- <van-icon name="location" /> -->
                        </div>
                    </van-col>
                    <van-col span="16">
                            <van-search placeholder="搜索店铺" v-model="value" style="background-color:#ffffff;"/>
                    </van-col>
                </van-row>
                <div class="browse">
                    <div class="recently">
                        <van-cell-group>
                            <van-cell style="background: #F3F3F3;" title="最近一次购买的商铺" icon="shop" />
                        </van-cell-group>
                        <ul>
                            <li v-for="(index,key) in describeList" :key="key" class="van-hairline--bottom" @click="buy">
                                <div class="img"><img src="../../assets/439.png" alt=""></div>
                                <div class="describe">
                                    <p class="title">{{index.title}}</p>
                                    <p>{{index.address}}</p>
                                    <p>距离{{index.distance}} | 月售{{index.number}}单</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="recently">
                        <van-cell-group>
                            <van-cell style="background: #F3F3F3;" title="附近的店铺" icon="shop" />
                        </van-cell-group>
                        <ul>
                            <li v-for="(index,key) in recentlyList" :key="key" class="van-hairline--bottom" @click="buy">
                                <div class="img"><img src="../../assets/439.png" alt=""></div>
                                <div class="describe">
                                    <p class="title">{{index.title}}</p>
                                    <p>{{index.address}}</p>
                                    <p>距离{{index.distance}} | 月售{{index.number}}单</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <p class="go"><router-link to="/goodsdetails/4888"><img src="../../assets/474.png" alt=""></router-link></p>
        <my-nav :active="0"></my-nav>
  </div>
</template>

<script type="text/ecmascript-6">
// 引入底部主导航
import myNav from './../../components/mynav'
import {shareSmart} from "./../../api";
import tools from './../../utils'
export default {
  components: {
      myNav
  },
  data() {
    return {
        active:0,
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        list:[
             {
                title:'购买',
                url:'/'
            },
            {
                title:'到柜自提',
                url:'/'
            },
            {
                title:'游戏',
                url:'/'
            },
            {
                title:'商城',
                url:'/'
            }
        ],
        index:0,
        my:false,
        value:'',
        describeList:[
            {
                img:'',
                title:'(015-85468)时代LOFT',
                address:'珠海吉大时代',
                distance:'6m',
                number:'560'
            }
        ],
        recentlyList:[
            {
                img:'',
                title:'(015-57268)华发商都',
                address:'珠海市香洲区南坪镇',
                distance:'8km',
                number:'559'
            },
            {
                img:'',
                title:'(015-95203)金嘉5栋',
                address:'金嘉创意谷5栋一楼',
                distance:'100m',
                number:'406'
            },
            {
                img:'',
                title:'(015-85446)金湾航空城规划展览厅',
                address:'金湾航空城',
                distance:'300m',
                number:'563'
            },
            {
                img:'',
                title:'(015-456789)时代LOFT',
                address:'珠海吉大时代',
                distance:'6m',
                number:'560'
            },
            {
                img:'',
                title:'(015-85468)时代LOFT',
                address:'珠海吉大时代',
                distance:'6m',
                number:'560'
            }
        ]
    }
  },
  created () {
       shareSmart('my','从众链商新零售','从众智能共享云柜')
  },
  mounted () {

  },
  methods: {
        add(index,vale){
            if(index == 0){
                this.$router.push('/my')
            }else if(index == 1){
                this.$router.push('/buynow')
            }else if(index == 2){
                this.$router.push('/game')
            }else if(index == 3){
                this.$router.push('/')
            }
        },
        buy(){
            this.$router.push('/buynow')
        }
  },
}
</script>

<style scoped lang="scss">
$fontColor: #d9ba4f;
.page{
    // height: 100%;
    background: #ffffff;
    width: 100%;
    > .go{
        position: fixed;
        top: 25%;
        right: 0;
        z-index:999;
        > a{
            display: inline-block;
            width: 100px;
            > img{
                max-width: 100%;
            }
        }
    }
    > div{
        > .assets{
            height: calc(100% - 150px);
            > img{
                width: 100%;
                height: 100%;
            }
        }
        // ...
        > .my {
            .location {
                // text-align: center;
                padding-left: 28px;
                line-height: 40px;
                font-size: .8rem;
                color: $fontColor;
                vertical-align: middle;
                position: relative;
                >.leftimgcss{
                    width: 0.6rem;
                    position: absolute;
                    top: 14px;
                    left: 13px;
                }
                >.rightimgcss{
                    width: 0.7rem;
                    position: absolute;
                    top: 18px;
                    left: 70px;
                }
            }
            > .browse{
                padding-bottom: 50px;
                > .recently{
                    > ul{
                        padding: 0 10px;
                        > li{
                            background: #ffffff;
                            height: 100px;
                            padding: 5px 0;
                            > .img{
                                width: 50px;
                                // height: 75px;
                                float: left;
                                padding: 12.5px 0;
                                > img{
                                    width: 50px;
                                    height: 75px;
                                }
                            }
                            > .describe{
                                width: calc(100% - 50px);
                                float: right;
                                padding-top:15px;
                                > p{
                                    font-size: 14px;
                                    line-height: 25px;
                                    color: #6E6E6E;
                                    padding-left:15px; 
                                }
                                > .title{
                                    color: #000;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
