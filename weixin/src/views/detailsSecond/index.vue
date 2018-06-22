<template>
  <div class="page">
        <top-header title="社区" style="width: 100%;position: fixed;top: 0;z-index: 100;"></top-header>
        <div class="head van-hairline--surround">
            <img :src="imgserverUrl + data.goodsImage" alt="">
        </div>
        <div class="information">
            <div class="apple_left">
                <h4>{{data.goodsName}}</h4>
                <p>单价：{{data.price}}</p>
                <p>时间：{{data.createdTime}}</p>
            </div>
            <div class="apple_right">
                <p>{{data.totalQuantity}}</p>
                 <p><van-progress :percentage="Number((data.tradedQuantity / data.totalQuantity * 100).toFixed(0))" :pivot-text="Number((data.tradedQuantity / data.totalQuantity * 100).toFixed(0)) + '%'" color="#DDBF63"/></p>
            </div>
        </div>
        <div class="user">
            <p class="van-hairline--bottom">出让用户信息</p>
            <ul>
                <li class="van-hairline--bottom" v-for="(index,key) in record" :key="key"><b><img src="../../assets/421.gif" alt=""></b><span>匿名ID</span><i>时间：{{index.payment_date}}</i><a>{{index.coinAmount}}</a></li>
            </ul>
        </div>
        <div class="btn">
            <button v-show="data.memberId != userInfo.id" @click="href(route)">出让</button>
            <button v-show="data.memberId == userInfo.id" @click="down">关闭</button>
        </div>
        <div class="passwordbox" v-if="passwordbox">
            <paypassword @gopaypassword="gopaypassword"></paypassword>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { detailsList,imgserverUrl,recordList,down} from "./../../api";
import paypassword from "./../paypassword";
import { Toast,Dialog } from 'vant';
export default {
  components: {
      paypassword
  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        imgserverUrl:imgserverUrl,
        data:{},
        record:[],
        route:'',
        passwordbox:false
    }
  },
  created () {
      this.route = this.$route.params.id;
       this.detailsList()
       this.recordList()
  },
  mounted () {

  },
  methods: {
      // 关闭
        down(){
            this.passwordbox = true;
        },
        gopaypassword(data){
            // console.log(data)
            this.passwordbox=false;
            this.gopay(data);
            this.showloading=true;
        },
        gopay(data){
            let _this = this;
            down(this.route,this.userInfo.id,data).then((res)=>{
                if(res.code == 200){
                    _this.$router.push('/disciplineMy')
                    Toast.success('关闭成功！');
                }else{
                    this.$router.push('/discipline')
                    Toast.success(res.message);
                }
            })
        },
        detailsList(){
            let _this = this;
            detailsList(this.$route.params.id).then(res=>{
                if(res.code == 200){
                    _this.data = res.data
                }
            })
        },
        recordList(){
            let _this = this;
            recordList(this.$route.params.id).then(res=>{
                if(res.code == 200){
                    _this.record = res.data.list
                }
            })
        },
        href(id){
            this.$router.push('/conversion/' + id)
        }

  },
}
</script>

<style scoped lang="scss">
*{
    box-sizing: border-box;
}
.page{
    .passwordbox{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        background: #fff;
        width: 100%;
        height: 100%;
    }
    height:calc(100% - 40px);
    margin-top: 40px;
    .head{
        // height: 50%;
        text-align: center;
        line-height: 100%;
        > img{
            width: 80%;
            display: inline-block; 
            vertical-align: middle;
        }
    }
    > .information{
        padding:0 10px 0 10px;
        margin-top: 5%;
        height: 100px;
        > .apple_left{
            width: 65%;
            float: left;
            > h4{
                margin: 0 0 10px 0;
                padding: 0;
                color: #403A3A;
                font-size:16px;
            }
            > p{
                font-size:12px;
                line-height: 20px;
            }
        }
        > .apple_right{
            width: 30%;
            float: left;
            padding-top: 10px;
            > p{
                line-height: 35px;
                font-size:14px;
            }
        }
    }
    > .user{
        padding-bottom: 70px;
        > p{
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            font-weight: 500;
            padding: 0 10px;
            margin: 0;
            text-align: left;
        }
        > ul{
            > li{
                height: 50px;
                line-height: 50px;
                font-size:10px;
                color: #666666;
                padding: 0 10px;
                > b{
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    position: relative;
                    top: 10.5px;
                    float:left;
                    > img{
                        width: 100%;
                        height:100%;
                        border-radius: 50%;
                    }
                }
                > span{
                    display: inline-block;
                    width: 18%;
                    height: 50px;
                    line-height: 50px;
                    padding-left:10px; 
                    float:left;
                }
                > i{
                    display: inline-block;
                    width: calc(80% - 80px);
                    height: 50px;
                    line-height: 50px;
                    font-style:normal;
                    float:left;
                    float:left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
                }
                > a{
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    line-height: 50px;
                    float:left;
                    text-align: center;
                }
            }
        }
    }
    > .btn{
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        > button{
            outline: none;
            border: 0;
            height: 50px;
            background: #DCBF63;
            color: #ffffff;
            width: 100%;
        }
    }
}
</style>
