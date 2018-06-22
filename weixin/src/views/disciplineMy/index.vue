<template>
  <div class="page">
        <top-header title="置换记录" style="width: 100%;position: fixed;top: 0;z-index: 100;"></top-header>
        <!-- <router-link to="/community" class="my">我的置换</router-link> -->
        <ul class="datalist">
            <van-list
                 v-model="loading"
                :finished="finished"
                @load="onLoad"
                >
                <li v-for="(index,key) in listData" :key="key" class="van-hairline--bottom">
                    <div class="img van-hairline--surround">
                        <!-- <img src="../../assets/362.png" alt=""> -->
                        <img v-lazy="imgserverUrl + index['goodsImage'] " v-show="index.goodsImage" alt="">
                    </div>
                    <div class="date">
                        <p class="date_title">{{index.goodsName || index['coinTrade.goodsName']}}</p>
                        <p v-show="index.price || index['coinTrade.price']">单价：￥{{index.price || index['coinTrade.price']}}</p>
                        <p>类型：{{(index.orderType == 6) ? '认领' : (index.orderType == 8) ? '出让' : '' || (index.type == 1) ? '出让' : (index.type == 2) ? '认领' : ''}}</p>
                        <p>状态：{{(index.tradeStatus == 0) ? '待审核' : (index.tradeStatus == 1) ? '交易中' : (index.tradeStatus == 2) ? '已关闭' : (index.tradeStatus == 3) ? '未支付' : '' || (index.order_status == 0) ? '等待付款' : (index.order_status == 1) ? '已完成' : (index.order_status == 2) ? '待发货' : (index.order_status == 3) ? '待收货' : (index.order_status == 4) ? '问题件' : (index.order_status == 5) ? '已取消' : (index.order_status == 6) ? '已过期' : (index.order_status == 7) ? '已确认' : ''}}</p>
                        <p>时间：{{index.createdTime || index.create_date}}</p>
                    </div>
                    <div class="number">
                        <p class="number_title">{{index.totalQuantity || index.coinAmount || index.coinAmount}}</p>
                        <p><van-progress :percentage="Number((index.tradedQuantity / index.totalQuantity * 100).toFixed(0)) || Number(list[key])" color="#DDBF63" v-show="show"/></p>
                        <p v-show="show && (index.tradedQuantity != index.totalQuantity) && (index.tradeStatus == 1)"><a @click="down(index.id)">关闭</a></p>
                        <p v-show="!show"><a :href="'#/' + href" class="reaord">{{record}}</a></p>
                    </div>
                </li>
            </van-list>
    </ul>
    <div class="passwordbox" v-if="passwordbox">
        <paypassword @gopaypassword="gopaypassword"></paypassword>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { xzList,imgserverUrl,down,getJewelry} from "./../../api";
import paypassword from "./../paypassword";
import { Toast,Dialog } from 'vant';
export default {
  components: {
      paypassword
  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        active:sessionStorage.getItem("isClose") || 0,
        listData:[],
        imgserverUrl:imgserverUrl,
        pageNumber:1,
        pageSize:10,
        loading: false,
        finished: false,
        type:'',
        totalPage:0,
        passwordbox:false,
        id:'',
        show:true,
        record:'余额明细',
        href:'recordcontent/1',
        index:0,
        list:[]
    }
  },
  created () {
        this.newRecord()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  mounted () {

  },
  methods: {
        // 关闭
        down(id){
            this.id = id;
            if(this.id != ''){
                this.passwordbox = true;
            }
        },
        gopaypassword(data){
            // console.log(data)
            this.passwordbox=false;
            this.gopay(data);
            this.showloading=true;
        },
        gopay(data){
            let _this = this;
            down(this.id,this.userInfo.id,data).then((res)=>{
                if(res.code == 200){
                    _this.$router.push('/discipline')
                    Toast.success('关闭成功！');
                }else{
                    this.$router.push('/discipline')
                    Toast.success(res.message);
                }
            })
        },
        // 新增记录
        newRecord(){
            let _this = this;
            xzList('',this.pageNumber,this.pageSize,this.userInfo.id,'',this.userInfo.id).then((res)=>{
                _this.listData = res.data.list;  
                _this.totalPage = res.data.totalPage;
                for(let i=0;i<res.data.list.length;i++){
                    _this.list.push((res.data.list[i].tradedQuantity / res.data.list[i].totalQuantity * 100).toFixed(0) )
                }
                console.log(_this.list)
            })
        },
        onLoad() {
            let _this = this;
            setTimeout(() => {
                // if(_this.index == 0){
                //     xzList('',_this.pageNumber,_this.pageSize,_this.userInfo.id,'',_this.userInfo.id).then((res)=>{
                //         _this.totalPage = res.data.totalPage;
                //         _this.index = 1;
                //         if(_this.pageNumber <_this.totalPage){
                //             _this.pageNumber++
                //             xzList('',_this.pageNumber,_this.pageSize,_this.userInfo.id,'',_this.userInfo.id).then((res)=>{
                //                 _this.listData.push(...res.data.list); 
                //                 for(let i=0;i<res.data.list.length;i++){
                //                     _this.list.push((res.data.list[i].tradedQuantity / res.data.list[i].totalQuantity * 100).toFixed(0) )
                //                 } 
                //                 _this.loading = false;
                //             })
                //         }else{
                //             _this.finished = true;
                //             _this.loading = false;
                //         }
                //     })
                // }else{
                    if(_this.pageNumber <_this.totalPage){
                        _this.pageNumber++
                        xzList('',_this.pageNumber,_this.pageSize,_this.userInfo.id,'',_this.userInfo.id).then((res)=>{
                            _this.listData.push(...res.data.list);  
                            for(let i=0;i<res.data.list.length;i++){
                                _this.list.push((res.data.list[i].tradedQuantity / res.data.list[i].totalQuantity * 100).toFixed(0) )
                            }
                            _this.loading = false;
                        })
                    }else{
                        _this.finished = true;
                        _this.loading = false;
                    }
                // }
            }, 500);
        }
  },
}
</script>

<style scoped lang="scss">
    .my{
        color: #ffffff;
        font-size: 14px;
        position: fixed;
        top: 10px;
        right: 20px;
        z-index: 150;
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
    .nav{
        position: fixed;
        top: 40px;
        width: 100%;
        z-index: 100;
    }
    .datalist{
        padding: 0 10px;
        padding-bottom: 50px;
        margin-top: 55px;
         li{
            display: flex;
            margin: 10px 0;
            padding: 5px 0;
            > .img{
                flex: 1;
                text-align: center;
                > img{
                    width: 80px;
                    height: 80px;
                }
            }
            > .date{
                flex: 2;
                padding-left: 7px;
                > p{
                    font-size:12px;
                    line-height: 1rem;
                    color: #7E7E7E;
                }
                > .date_title{
                    font-size: 14px;
                    font-weight: 600;
                    padding-bottom:10px;
                    padding-top:5px;
                    color: #000;
                }
            }
            > .number{
                position: relative;
                left: -0.5rem;
                flex: 1;
                > .number_title{
                    font-size:12px;
                    color: red;
                    font-weight: 600;
                }
                > p{
                    text-align: center;
                    margin: 10px 0;
                    > a{
                        display: inline-block;
                        width: 70%;
                        height:25px;
                        line-height: 25px;
                        color: #ffffff;
                        background: #DDBF63;
                        font-size: 12px;
                        border-radius:3px;
                    }
                    > .reaord{
                        border:1px solid #DDBF63;
                        border-radius:12.5px;
                        background:#ffffff;
                        color:#DDBF63;
                    }
                }
            }
        }
    }
</style>
