<template>
    <div class="page">
        <top-header title="优惠券"></top-header>
        <div class="couponsList">
            <div class="title_img"><img src="../../assets/512.png" alt=""></div>
            <div class="congratulations"><img src="../../assets/513.png" alt=""></div>
            <div style="font-size:14px;font-width:600;">您获得了{{couponsData[0].amount}}%链豆奖励，再接再励哦！</div>
            <div style="margin-top:10px;"><button @click="$router.push('/couponGame/-1')">在抽一次</button></div>
            <div class="vouchers" style="margin-top:20px;" v-for="(item,key) in couponsData" :key="key">
              <p class="vouchers_left">
                <span style="color:#000000;font-weight:600;padding-top:12px;">{{item.couponName}}</span>
                <span style="font-size:12px;color:#6B6B6B;padding-top:2px;">有效期：{{item.startTime.split(" ")[0]}} 至 {{item.endTime.split(" ")[0]}}</span>
              </p>
              <p class="vouchers_right" @click="$router.push('/')">
                <span style="padding-top:12px;font-weight: 600;">+{{item.amount}}{{item.unit}}链豆</span>
                <span style="padding-top:2px;"><img src="../../assets/516.png" alt=""></span>
              </p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { couponsList} from "./../../api";
export default {
  components: {

  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        couponsData:[]
    }
  },
  created () {
    this.couponsList()
  },
  mounted () {

  },
  methods: {
      // 优惠券列表
    couponsList(){
      let _this = this;
      couponsList(this.userInfo.id).then(res=>{
        if(res.code == 200){
          // console.log("优惠券")
          // console.log(res.data)
          _this.couponsData = res.data
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
  .page{
    .couponsList{
      padding-bottom: 30px;
      > .title_img {
        > img{
          max-width: 100%;
        }
      }
      > .congratulations{
          text-align: center;
          > img{
            max-width: 30%;
          }
      }
      > div{
        color: #DD1114;
        font-size:14px;
        text-align: center;
        > button{
          outline: none;
          width: 85px;
          height: 25px;
          border-radius: 12px;
          background: #666666;
          color: #fff;
          border: 1px solid #666666;
        }
      }
      > .vouchers{
        padding: 0 10px;
        margin-top: 15px;
        height: 65px;
        > .vouchers_left{
          width: 75%;
          float: left;
          background: url(../../assets/517.png) no-repeat;
          background-size:100% 100%; 
          height: 65px;
          > span{
            display: inline-block;
            width: 100%;
            text-align: center;
          }
        }
        > .vouchers_right{
          width: 25%;
          float: left;
          background: url(../../assets/518.png) no-repeat;
          background-size:100% 100%; 
          height: 65px;
          > span{
            display: inline-block;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #fff;
            > img{
              max-width: 70%;
            }
          }
        }
      }
    }
  }
</style>
