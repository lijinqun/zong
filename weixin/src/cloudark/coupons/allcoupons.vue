<template>
  <div class="page">
      <top-header title="优惠券"></top-header>
      <div class="allcoupons">
          <ul>
                <li v-for="(item,key) in couponsData " :key="key">
                    <p class="vouchers_left">
                      <span style="color:#000000;font-weight:600;padding-top:12px;">{{item.couponName}}</span>
                      <span style="font-size:12px;color:#6B6B6B;padding-top:4px;">有效期：{{item.startTime.split(" ")[0]}} 至 {{item.endTime.split(" ")[0]}}</span>
                    </p>
                    <p class="vouchers_right" @click="$router.push('/')">
                      <span style="padding-top:12px;font-weight: 600;">+{{item.amount}}{{item.unit}}链豆</span>
                      <span style="padding-top:4px;"><img src="../../assets/516.png" alt=""></span>
                    </p>
                </li>
            </ul>
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
    > .allcoupons{
        padding-top: 15px;
        > ul{
            padding: 0 10px;
            overflow-y: scroll;
            overflow-x: hidden;
            /*解决ios上滑动不流畅*/
            -webkit-overflow-scrolling: touch;
            > li{
            height: 65px;
            font-size: 14px;
            padding-bottom: 10px;
            > .vouchers_left{
                width: 75%;
                float: left;
                height: 65px;
                background: url(../../assets/517.png) no-repeat;
                background-size:100% 100%; 
                > span{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                }
            }
            > .vouchers_right{
                width: 25%;
                float: left;
                height: 65px;
                background: url(../../assets/518.png) no-repeat;
                background-size:100% 100%; 
                > span{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    color: #fff;
                    > img{
                    max-width: 70%;
                    }
                }
            }
            }
        }
    }
}
</style>
