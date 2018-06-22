<template>
  <div class="page">
        <top-header title="社区保障置换" style="width: 100%;position: fixed;top: 0;z-index: 100;"></top-header>
        <router-link to="/myself" class="myself"></router-link>
        <!-- <router-link to="/discipline" class="my">我的记录</router-link> -->
        <div class="navigation">
            <div style="width: 100%;position: fixed;top:39px;z-index: 100;background:#ffffff;padding-top:11px;">
                <!-- <van-tabs type="card" @click="community" v-model="active">
                    <van-tab v-for="(index,key) in list" :title=" index.title" :key="key">
                        <p class="nav"><span class="zonghe">综合</span><span>数量</span></p>
                    </van-tab>
                </van-tabs> -->
                <div class="vantab">
                    <router-link to="/community">出让中</router-link>
                    <router-link to="/communityto">认领中</router-link>
                </div>
                <p class="nav"><span class="zonghe">综合</span><span>数量</span></p>
            </div>
            <ul class="datalist">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    >
                    <li v-for="(index,key) in listData" :key="key" class="van-hairline--bottom" v-show="index.totalQuantity != index.tradedQuantity" @click="details(index.id)">
                        <div class="img van-hairline--surround">
                            <!-- <img src="../../assets/362.png" alt=""> -->
                            <img v-lazy="imgserverUrl + index.goodsImage " alt="">
                        </div>
                        <div class="date">
                            <p class="date_title">{{index.goodsName}}</p>
                            <p>单价：<span class="price">￥{{index.price}}</span></p>
                            <p>时间：{{index.createdTime}}</p>
                        </div>
                        <div class="number">
                            <p class="number_title">{{index.totalQuantity}} <span v-show="index.memberId == userInfo.id" style="float:right;"><img src="../../assets/384.gif" alt=""></span></p>
                            <p><van-progress :percentage="Number((index.tradedQuantity / index.totalQuantity * 100).toFixed(0))" color="#DDBF63"/></p>
                            <!-- <p>{{((index.tradedQuantity / index.totalQuantity)).toFixed(3) * 100}}</p> -->
                            <p><a :href="'#' + href + index.id">{{index.memberId == userInfo.id ? '关闭' : '我要认领'}}</a></p>
                        </div>
                    </li>
                </van-list>
            </ul>
        </div>
        <div>
            <!-- <router-link to="/community" style="background:#DCBF63;">社区</router-link>
            <router-link to="/replacement" style="background:#ffffff;color:#DCBF63;">我的</router-link> -->
            <replacement-nav :active='active'></replacement-nav>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { transferList,imgserverUrl } from "./../../api";
// 引入底部主导航
import replacementNav from './../../components/replacementNav'
export default {
  components: {
      replacementNav
  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        active:1,
        list:[
            {title:'出让中'},
            {title:'认领中'}
        ],
        imgserverUrl:imgserverUrl,
        listData:[
            // {
            //     name:'苹果',
            //     price:'300',
            //     date:'2018-04-20 12:00:00'
            // },
            // {
            //     name:'苹果',
            //     price:'300',
            //     date:'2018-04-20 12:00:00'
            // },
            // {
            //     name:'苹果',
            //     price:'300',
            //     date:'2018-04-20 12:00:00'
            // },
            // {
            //     name:'苹果',
            //     price:'300',
            //     date:'2018-04-20 12:00:00'
            // },
        ],
        transfer:"去认领",
        type:1,
        href:'/details/',
        show:false,
        loading: false,
        finished: false,
        pageNumber:1,
        pageSize:6,
        totalPage:0,
        index:0,
        expiredTime_gt:''
    }
  },
  created () {
    //防止页面一加载就出现上滑
    document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.transferData()
  },
  mounted () {

  },
  methods: {
        details(id){
            this.$router.push('/details/' + id)  
        },
        onLoad() {
            let _this = this;
            setTimeout(() => {  
                if(_this.index == 0){
                    transferList( this.type,this.pageNumber,this.pageSize,this.userInfo.id,'','',this.expiredTime_gt).then((res)=>{
                        _this.index = 1;
                        _this.totalPage = res.data.totalPage;
                        if(_this.pageNumber < _this.totalPage){
                            _this.pageNumber++
                            transferList( this.type,this.pageNumber,this.pageSize,this.userInfo.id,'','',this.expiredTime_gt).then((res)=>{
                                _this.listData.push(...res.data.list);
                                _this.totalPage = res.data.totalPage;
                                _this.loading = false;
                            })
                        }else{
                            _this.finished = true;
                            _this.loading = false;
                        }
                    })
                }else{
                    if(_this.pageNumber < _this.totalPage){
                        _this.pageNumber++
                        transferList( this.type,this.pageNumber,this.pageSize,this.userInfo.id,'','',this.expiredTime_gt).then((res)=>{
                            _this.listData.push(...res.data.list);
                            _this.totalPage = res.data.totalPage;
                            _this.loading = false;
                        })
                    }else{
                        _this.finished = true;
                        _this.loading = false;
                    }
                }

            }, 500);
        },
        transferData(){
            // 当前未过期时间
            let date = new Date();
            var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            hour = hour < 10 ? '0' + hour : hour;
            minute = minute < 10 ? '0' + minute : minute;
            second = second < 10 ? '0' + second : second;
            this.expiredTime_gt = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
            let _this = this;
            transferList( this.type,this.pageNumber,this.pageSize,this.userInfo.id,'','',this.expiredTime_gt).then((res)=>{
                _this.listData = res.data.list;
                _this.totalPage = res.data.totalPage;
            })
        },
  },
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
