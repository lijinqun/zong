<template>
    <div class="container">
        <div class="query-btn" @click="doQuery()">
          <img src="./../../assets/img/query_btn.png" style="width:100%;height:100%;"/>
        </div>
        <div class="lucky-wheel">
            <div class="lucky-title"></div>
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                     <div class="wheel-pointer" @click="doDraw()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
                </div>               
                <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">                   
                    <!-- <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                            <div class="prize-pic">
                                <img :src="item.icon">
                            </div>
                            <div class="prize-count" v-if="item.count">
                                {{item.count}}
                            </div>
                            <div class="prize-type">
                                {{item.name}}
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="rule-main">
              <div class="rule">
                <div class="tip-content">
                    
                    <div style="margin:0 auto;color:yellow;width:100%;text-align:center;font-size:13px">优惠券使用规则</div>
                    <p>扫码支付OSO订单将免费获得一次抽奖资格；</p>
                    <p> 1.此外10个链豆也可获得一次抽奖资格；</p>
                    <p> 2.此优惠券仅限在从众链商商城中使用；</p>
                    <p> 3.单笔订单仅限使用一张优惠券；</p>
                    <p> 4.单笔订单成交过程中，若交易失败，则自动退回；</p>
                    <p> 5.优惠券仅在有效期内使用，过期无效；</p>
                    <p> 6.优惠券不能用于商家的“线下销售”；</p>
                    <p> 7.优惠券可在“我的—优惠券”中查看；</p>
                    <p> 8.此优惠券可在有效期内仅限本账号使用。</p>
                </div>
              </div>
            </div>
        </div>
        <div class="toast" v-show="toast_control">
            <div class="toast-container">
                <img :src="toast_pictrue" class="toast-picture">
                <div class="close" @click="doClose()"></div>
                <div class="toast-title">
                    {{toast_title}}
                </div>
                <div class="toast-btn">
                    <div class="toast-cancel"  @click="doList()" style="width:90px">去查看</div>
                    <div class="toast-cancel"  @click="doDrawAgain()" style="display:inline;margin-left:8px;width:90px">再抽一次</div>
                </div>
            </div>
        </div>
        <div class="toast-mask" v-show="toast_control"></div>
    </div>
</template>
<script>

import { draw, drawbypoint, shareSmart } from "./../../api";
import { Toast, Dialog,Button} from 'vant';
import router from '../../router';

export default {
  data() {
    return {
      selectedIndex: 0,
      orderId: this.$route.params.id,
      drawMap: {'增加3%链豆奖励':0, '增加5%链豆奖励':1, '增加8%链豆奖励':2, '增加10%链豆奖励':3, '增加15%链豆奖励':4, '增加20%链豆奖励':5, '多谢惠顾':6, '增加1%链豆奖励':7},
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      easejoy_bean: 0, //金豆
      lottery_ticket: 0, //抽奖次数
      prize_list: [
        {
          icon: require("./../../assets/img/bean_500.png"), // 奖品图片
          count: 10, // 奖品数量
          name: "增加3%链豆奖励", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon: require("./../../assets/img/bean_five.png"),
          count: 5,
          name: "增加5%链豆奖励",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/bean_one.png"),
          count: 10,
          name: "增加8%链豆奖励",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/point_five.png"),
          count: 5,
          name: "增加10%链豆奖励",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/point_ten.png"),
          count: 10,
          name: "增加15%链豆奖励",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/bean_500.png"),
          count: 10,
          name: "增加20%链豆奖励",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/give_up.png"),
          count: 0,
          name: "多谢惠顾",
          isPrize: 0
        },
        {
          icon: require("./../../assets/img/bean_500.png"),
          count: 10,
          name: "增加1%链豆奖励",
          isPrize: 1
        }
      ], //奖品列表
      toast_control: false, //抽奖结果弹出框控制器
      hasPrize: false, //是否中奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      i: 0 //测试使用
    };
  },
  created() {
    this.init_prize_list();
  },
  computed: {
    toast_title() {
      var obj = this.prize_list[this.selectedIndex];
      var name = obj.name;
      console.log('toast_title:' + name + ' index:' + this.selectedIndex);
      return obj.isPrize==1 ? "恭喜您，获得"  + name : "未中奖";
    },
    toast_pictrue() {
      return this.hasPrize
        ? require("./../../assets/img/congratulation.png")
        : require("./../../assets/img/sorry.png");
    }
  },
  methods: {
    //此方法为处理奖品数据
    init_prize_list(list) {},
    rotate_handle() {
      //alert('clicked');
      this.rotating(2);
      //this.i = this.i + 2;
    },
    rotating(index) {
      if (!this.click_flag) return;
      var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 5; // 默认为1s
      var random = Math.floor(Math.random() * 7);
      var result_index = index;// || random; // 最终要旋转到哪一块，对应prize_list的下标
      this.i = result_index;
      var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
      var rand_circle = 6; // 附加多转几圈，2-3
      this.click_flag = false; // 旋转结束前，不允许再次触发
      if (type == 0) {
        // 转动盘子
        var rotate_angle =
          this.start_rotating_degree +
          rand_circle * 360 +
          result_angle[result_index] -
          this.start_rotating_degree % 360;
        this.start_rotating_degree = rotate_angle;
        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
        // // //转动指针
        // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
        // this.start_rotating_degree_pointer =360*rand_circle;
        var that = this;
        // 旋转结束后，允许再次触发
        setTimeout(function() {
          that.click_flag = true;
          that.game_over(this.i);
        }, during_time * 1000 + 1500); // 延时，保证转盘转完
      } else {
        //
      }
    },
    game_over() {
      this.toast_control = true;
      this.hasPrize = this.prize_list[this.i].isPrize
    },
    //关闭弹窗
    close_toast() {
      this.toast_control = false;
    },
    //抽奖
    doDraw() {
      
      var memberId = this.userInfo.id;
      var orderId = this.orderId;
      
      if (orderId == null || orderId == '' || orderId == -1 ) {
        Dialog.confirm({
          message: '再抽一次将要扣除10个链豆'
        }).then(() => {
          drawbypoint(memberId).then(response => {
            if (response.code == 200) {
              var isWin = response.data.isWin;  //（是否中奖，0：否，1：是）
              if (isWin == 0) {
                this.selectedIndex = 6;
                console.log('not win index:' + 6 + ' this.selectedIndex:' + this.selectedIndex);
                this.rotating(6);
              } else {
                var prizeName = response.data.prizeName;
                var index = this.drawMap[prizeName];
                this.selectedIndex = index;
                console.log('win prizename:' + prizeName + ' index:' + index + ' this.selectedIndex:' + this.selectedIndex);
                this.rotating(index);
              }
            } else {
              Toast.fail(response.message);
            }
          });
        });
      } else {
        draw(memberId, orderId).then(response => {
          if (response.code == 200) {
            var isWin = response.data.isWin;  //（是否中奖，0：否，1：是）
            if (isWin == 0) {
              this.selectedIndex = 6;
              console.log('not win index:' + 6 + ' this.selectedIndex:' + this.selectedIndex);
              this.rotating(6);
            } else {
              var prizeName = response.data.prizeName;
              var index = this.drawMap[prizeName];
              this.selectedIndex = index;
              console.log('win prizename:' + prizeName + ' index:' + index + ' this.selectedIndex:' + this.selectedIndex);
              this.rotating(index);
            }
          } else {
            Toast.fail(response.message);
          }
        });
      }
    },
    doDrawAgain() {
      this.orderId = -1;
      this.close_toast();
    },
    doList() {
      this.close_toast();
      this.$router.push('/allcoupons');
    },
    doClose() {
      this.orderId = -1;
      this.close_toast();
    },
    doQuery() {
      this.$router.push('/allcoupons');
    }
  }
};
</script>
<style lang="scss" scoped>
.bg {
  background: url(./../../assets/img/cbg.png);
}
.container {
  background: url(./../../assets/img/cbg.png) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% 100%;
  min-height: 100%; 
}
.query-btn {
  position: absolute;
  width: 70px;
  height: 25px;
  float: right;
  top: 15px;
  right: 5px;
}
.lucky-wheel {
  width: 100%;
  /* height: 31.5625rem; */
  background-size: 0;
  padding-top: 1.5625rem;
}
.lucky-title {
  width: 100%;
  height: 5.125rem;
  background: url("./../../assets/img/coupon_title.png") no-repeat center top;
  background-size: 80%;
  margin-top: 1rem;
}
.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.wheel-bg {
  width: 15.4375rem;
  height: 15.4375rem;
  background: url("./../../assets/img/coupon_wheel.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
}
.wheel-pointer-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -60%);
  width: 5.3125rem;
  height: 5.3125rem;
}
.wheel-pointer {
  width: 5.3125rem;
  height: 5.3125rem;
  background: url("./../../assets/img/draw_btn.png") no-repeat center top;
  background-size: 100%;
  transform-origin: center 60%;
}
.wheel-bg div {
  text-align: center;
}

.rule-main {
  width: 100%;
  height: 12rem;
}
.rule {
  width: 71%;
  background-size: 61%;
  background-color: rgba(255, 255, 255, 0.45);
  /* height: 100%; */
  margin: 20px auto 0;
  border: 1px dashed rgba(255, 255, 0, 0.99);
  border-radius: 5px
}


.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.prize-list .prize-item:first-child {
  top: 0;
  left: 8.3125rem;
  transform: rotate(20deg);
}
.prize-list .prize-item:nth-child(2) {
  top: 2.8rem;
  left: 10.8rem;
  transform: rotate(67deg);
}
.prize-list .prize-item:nth-child(3) {
  top: 6.4rem;
  left: 10.6rem;
  transform: rotate(-250deg);
}
.prize-list .prize-item:nth-child(4) {
  top: 9rem;
  left: 8.2125rem;
  transform: rotate(-210deg);
}
.prize-list .prize-item:nth-child(5) {
  top: 9.2125rem;
  left: 4.4rem;
  transform: rotate(-160deg);
}
.prize-list .prize-item:nth-child(6) {
  top: 6.3875rem;
  left: 1.9rem;
  transform: rotate(-111deg);
}
.prize-list .prize-item:nth-child(7) {
  top: 2.8rem;
  left: 1.8125rem;
  transform: rotate(-69deg);
}
.prize-list .prize-item:nth-child(8) {
  top: 0;
  left: 4.5rem;
  transform: rotate(-20deg);
}
.prize-item {
  width: 5.875rem;
  height: 9rem;
}

.prize-pic img {
  width: 4.0625rem;
  height: 2.5rem;
  margin-top: 1.5625rem;
}
.prize-count {
  font-size: 0.875rem;
}
.prize-type {
  font-size: 0.75rem;
}
.main {
  position: relative;
  width: 100%;
  min-height: 14.25rem;
  background: rgb(243, 109, 86);
  padding-bottom: 1.6875rem;
}
.main-bg {
  width: 100%;
  height: 6.5625rem;
  position: absolute;
  top: -3.4375rem;
  left: 0;
  background-size: 100%;
}
.bg-p {
  width: 100%;
  height: 2.95rem;
  background: rgb(252, 207, 133);
}
.content {
  position: absolute;
  top: 0.175rem;
  left: 0;
  background: rgb(243, 109, 86);
  width: 100%;
  height: 5.1875rem;
  font-size: 1.125rem;
  color: #ffeb39;
  padding-left: 6.75rem;
}
.content div {
  text-align: left;
}
.tip {
  position: relative;
  margin: 2.5rem auto 0;
  width: 17.5rem;
  border: 1px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 11px;
  color: #fccc6e;
  background: #f36d56;
  padding: 0.3125rem 0.625rem;
}
.tip-content {
  padding: 0.5625rem 0.625rem;
  font-size: 12px;
  color: #fff;
  line-height: 1.4;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 15.4375rem;
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  background-color: rgb(252, 244, 224);
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -6.5rem;
  left: -1.5rem;
  width: 18.75rem;
  height: 8.5625rem;
}
.toast-pictrue-change {
  position: absolute;
  top: -1.5rem;
  left: -1.375rem;
  width: 17.5rem;
  height: 3.125rem;
}
.toast-title {
  padding: 2.8125rem 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9375rem;
}
.toast-btn div {
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 4.6875rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 1.875rem;
  color: #fff;
}
.close {
  position: absolute;
  top: -0.9375rem;
  right: -0.9375rem;
  width: 2rem;
  height: 2rem;
  background: url("./../../assets/img/close_store.png") no-repeat center top;
  background-size: 100%;
}
</style>

