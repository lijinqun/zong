<template>
    <div class="container" :style="{height:clientHeight + 'px'}">
        <div class="decoration"></div>
        <div class="lucky-wheel">
            <div class="lucky-title"></div>
            <div class="wheel-main">
                <div class="wheel-pointer-box">
                    <div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
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
        </div>
        <div class="bg">
          <div class="main" style="">
              <div class="leftimg" id="leftimg" @click="doLeftImg"></div>
              <div class="rightimg1" id="rightimg" @click="doRightImg"></div>
              <div class="content" style="display:none">
                  <div class="lottery_ticket" style="display:none">今日免费抽奖次数： {{ lottery_ticket}}</div>
              </div>

              <div class="Top_Record">
                  <div class="topRec_List">
                      <div class="maquee" id="maquee">
                          <ul>
                              <li>
                                  <div><img src='http://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLBM70q6kGtVmHYGupav1LjDg0lJicWcEWrTeGgEZicuBpzdrNib4KEOaRtvkrJwUpm6kIDJY6AD2iboeg/132' style="width:16px;height:16px;vertical-align:middle"/></div>
                                  <div>王**</div>
                                  <div>来一口</div>
                                  <div>2018/06/03 14:20</div>
                              </li> 
                          </ul>
                      </div>
                    </div>
              </div> 
          </div>
        </div>
        <div class="btnContainer" style="margin-top:5px">
          <div class="firstBtn" @click="doTalk()"></div>
          <div class="secondBtn" @click="doHome()"></div>
          <div class="thirdBtn" @click="doFamily()"></div>
        </div>
        <div class="toast" v-show="toast_control">
            <div class="toast-container">
                <img :src="toast_pictrue" class="toast-picture">
                <div class="close" @click="close_toast()"></div>
                <div class="toast-title">
                    {{toast_title}}
                </div>
                <div class="toast-btn">
                    <div class="toast-cancel"  @click="close_toast">关闭</div>
                </div>
            </div>
        </div>
        <div class="toast-mask" v-show="toast_control"></div>
        <div class="record" @click="record"><img src="../../assets/img/123.png" alt=""></div>
    </div>
</template>
<script>
import { savegame, getgamelatestlist, getgametoplist, shareSmart } from "./../../api";
import { Toast, Dialog,Button} from 'vant';
import router from '../../router';
//import jQuery from '../../../static/js/jquery-2.2.4.min.js';

    // autoScroll = function(obj) {  
    //   alert('d');
    //   jQuery(obj).find("ul").animate({  
    //     marginTop : "-39px"  
    //   },500,function(){  
    //     jQuery(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
    //   })  
    // } 

    jQuery(document).ready(function() {
      //setInterval(autoScroll(".maquee"), 3000);
      //setInterval(autoScroll(".apple"), 2000);
      
      // autoScroll = function(obj) {  
      //   jQuery(obj).find("ul").animate({  
      //     marginTop : "-39px"  
      //   },500,function(){  
      //     jQuery(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
      //   })  
      // }

      // function autoScroll(obj) {  
      //   jQuery(obj).find("ul").animate({  
      //     marginTop : "-39px"  
      //   },500,function(){  
      //     jQuery(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
      //   })  
      // }
      
    });

export default {
  data() {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      easejoy_bean: 0, //金豆
      lottery_ticket: 0, //抽奖次数
      prize_list: [
        {
          icon: require("./../../assets/img/bean_500.png"), // 奖品图片
          count: 0, // 奖品数量
          name: "来一口", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          icon: require("./../../assets/img/bean_five.png"),
          count: 5,
          name: "别人喝",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/bean_one.png"),
          count: 10,
          name: "整两支",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/point_five.png"),
          count: 5,
          name: "不用喝",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/point_ten.png"),
          count: 10,
          name: "一口闷",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/bean_500.png"),
          count: 10,
          name: "来二口",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/point_ten.png"),
          count: 10,
          name: "来半支",
          isPrize: 1
        },
        {
          icon: require("./../../assets/img/bean_500.png"),
          count: 10,
          name: "来三口",
          isPrize: 1
        },
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
      i: 0, //测试使用,
      listType:0, //0latest 1top
      prize:'',
      clientHeight:0
    };
  },
  created() {
    //初始化分享
    shareSmart('playqrcode', '喝酒小游戏', '我刚被罚酒整支一口闷，快来试试你的运气');

    document.title = '喝酒小游戏';
    this.init_prize_list();
    this.doLatestList();
    setInterval(this.doList, 8000);  // fetch data every 3 second
    //setInterval(this.autoScroll('.maquee'), 3000);
    //setInterval(this.autoScroll('.apple'), 2000);

    this.clientHeight = document.documentElement.clientHeight;
  },
  computed: {
    toast_title() {
      console.log('this.i:' + this.i + this.prize_list[this.i].name);
      return this.prize_list[this.i].name;
      // return this.hasPrize
      //   ? "恭喜您，获得" +this.prize_list[this.i].count + ' ' + this.prize_list[this.i].name
      //   : "未中奖";
    },
    toast_pictrue() {
      return this.hasPrize
        ? require("../../assets/img/congratulation.png")
        : require("../../assets/img/sorry.png");
    }
  },
  methods: {
    moment(context){
      //console.log(context)
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var month = day * 30;
      var now = new Date().getTime();
      function getDateDiff(dateTimeStamp) {
        // console.log(dateTimeStamp);
        var diffValue = now - dateTimeStamp;
        // console.log(new Date(dateTimeStamp).toLocaleDateString())
        // console.log(diffValue)
        if (diffValue < 0) {
          var result = new Date(dateTimeStamp).toLocaleDateString();
        }
        var yearComment = diffValue /(month * 12)
        var monthComment = diffValue / month;
        var weekComment = diffValue / (7 * day);
        var dayComment = diffValue / day;
        var hourComment = diffValue / hour;
        var minComment = diffValue / minute;
        //console.log(yearComment);
        if(yearComment >= 1){
          result = parseInt(yearComment) + "年前";
        } else if (monthComment < 4 && monthComment >= 1) {
          result = parseInt(monthComment) + "个月前";
        } else if (weekComment >= 1) {
          result = parseInt(weekComment) + "周前";
        } else if (dayComment >= 1) {
          result = parseInt(dayComment) + "天前";
        } else if (hourComment >= 1) {
          result = parseInt(hourComment) + "小时前";
        } else if (minComment >= 1) {
          result = parseInt(minComment) + "分钟前";
        } else if(minComment < 0){
            result = "刚刚"
        } else
          result = "刚刚";
        return result;
      }
      var date = new Date(Date.parse(context.replace(/-/g,   "/")));
      //alert(context + '    ' +date);
      return getDateDiff(date.getTime());
    },
    record(){
      this.$router.push('/record')
    },
    //此方法为处理奖品数据
    init_prize_list(list) {},
    rotate_handle() {
      // alert('clicked');
      this.rotating();
      // this.i = this.i + 2;
    },
    rotating(index) {
      if (!this.click_flag) return;
      var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 5; // 默认为1s
      var random = Math.floor(Math.random() * 7);
      var result_index = index || random; // 最终要旋转到哪一块，对应prize_list的下标
      this.i = result_index;
      var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
      // var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5]; //最终会旋转到下标的位置所需要的度数
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
      this.hasPrize = this.prize_list[this.i].isPrize;
      var obj = this.prize_list[this.i];
      // alert(obj.name);
      this.prize = obj.name;
      console.log('selected index:' + this.i);
      this.doSave(this.i);
    },
    //关闭弹窗
    close_toast() {
      this.toast_control = false;
    },
    doTalk() {
      console.log('doTalk...');
      Toast.fail('暂没开放');
    },
    doHome() {
      console.log('doHome...');
      //Toast.fail('暂没开放');
      router.push('/');
    },
    doFamily() {
      // console.log('doFamily...');
      // Toast.fail('暂没开放');
      this.$router.push('/specialsupply')
    },
    doSave(gameResult) {
      let memberId = this.userInfo.id;
      savegame(memberId, gameResult).then(response => {
        if (response.code == 200) {
          //Toast.success('发送成功');
          this.doList();
        }
      })
    },
    doList() {
      if (this.listType == 0) {
        this.doLatestList();
      } else {
        this.doTopList();
      }
      //初始化分享
      //shareSmart('playqrcode', '喝酒小游戏', '我刚被罚酒整支一口闷，快来试试你的运气');
    },
    doLatestList() {
      let _this = this;
      getgamelatestlist(200).then(response => {
        if (response.code == 200) {
          // console.log(response.data);
          var list = response.data;
          var divObj = jQuery('#maquee');
          divObj.html('');
          // var ulObj = jQuery('scrolldelay="90"><ul></ul></marguee>');
          var ulObj = jQuery('<ul></ul>');
          for (var i = 0; i < list.length; i ++) {
            var obj = list[i];
            obj.createdTime = _this.moment(obj.createdTime)
            var liObj = jQuery('<li style="width:100%; height:30px; line-height:30px; text-align:center; font-size:12px; "></li>');
            liObj.append('<div style="float:left;width:10%;overflow:hidden;"><img src="' + obj.image + '" style="width:20px;height:20px;vertical-align:middle;border-radius: 50%;"/></div>');
            liObj.append('<div style="float:left;width:30%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">' + obj.userName + '</div>');
            var price = this.prize_list[obj.gameResult];
            liObj.append('<div style="float:left;width:20%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">' + price.name + '</div>');
            liObj.append('<div style="float:left;width:40%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">' + obj.createdTime + '</div>');
            ulObj.append(liObj);
          }
          divObj.append(ulObj);
        }
      })
    },
    doTopList() {
      let _this = this;
      getgametoplist(200).then(response => {
        if (response.code == 200) {
          // console.log(response.data);
          var list = response.data;
          var divObj = jQuery('#maquee');
          divObj.html('');
          var ulObj = jQuery('<ul></ul>');
          for (var i = 0; i < list.length; i ++) {
            var obj = list[i];
            
            var liObj = jQuery('<li style="width:100%; height:30px; line-height:30px; text-align:center; font-size:12px; "></li>');
            liObj.append('<div style="float:left;width:10%;overflow:hidden;"><img src="' + obj.image + '" style="width:20px;height:20px;vertical-align:middle;border-radius: 50%;"/></div>');
            liObj.append('<div style="float:left;width:30%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">' + obj.userName + '</div>');
            liObj.append('<div style="float:left;width:20%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">' + obj.count + '次</div>');
            var time = obj.updatedTime == null? obj.createdTime: obj.updatedTime;
            var ftime = _this.moment(time)
            liObj.append('<div style="float:left;width:40%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">' + ftime + '</div>');
            ulObj.append(liObj);
          }
          divObj.append(ulObj);
        }
      })
    },
    autoScroll(obj) {  
      console.log('aotoscroll');
      jQuery(obj).find("ul").animate({  
        marginTop : "-39px"  
      },500,function(){  
        jQuery(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
      })  
    },
    doLeftImg() {
      this.listType = 0;
      this.doLatestList();
      var leftImg = jQuery('#leftimg');
      console.log('doLeftImg:' + leftImg);
      // leftImg.css({'background': 'url("../../assets/img/leftimg.png") no-repeat center top', 'height':'2.3rem', 'width':'35%', 'float': 'left'});
      leftImg.attr('class', 'leftimg');
      var rightImg = jQuery('#rightimg');
      // rightImg.css({'background': 'url("../../assets/img/rightimg1.png") no-repeat center top', 'height':'2.3rem', 'width':'35%', 'float': 'right'});
      rightImg.attr('class', 'rightimg1');
    },
    doRightImg() {
      this.listType = 1;
      this.doTopList();
      var leftImg = jQuery('#leftimg');
      console.log('doRightImg:' + leftImg);
      // leftImg.css({'background': 'url("../../assets/img/leftimg1.png") no-repeat center top', 'height':'2.3rem', 'width':'35%', 'float': 'left'});
      leftImg.attr('class', 'leftimg1');
      var rightImg = jQuery('#rightimg');
      // rightImg.css({'background': 'url("../../assets/img/rightimg.png") no-repeat center top', 'height':'2.3rem', 'width':'35%', 'float': 'right'});
      rightImg.attr('class', 'rightimg');
    },
  }
};
</script>
<style scoped>
.bg{
  background: url(./../../assets/img/bg.jpg);
}
.record{
  width: 100px;
  height: 30px;
  position: absolute;
  top: 11px;
  right: 2%;
}
.record img{
  max-width: 100%;
}
.container {
  background: url(./../../assets/img/bg.png) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100% 100%;
  /* min-height: 100%; */
}
.decoration2 {
  background: url(./../../assets/img/decoration.png) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: 100%;
  height: 40rem;
  width: 100%;
  float: left;
  position: relative;
}
.lucky-wheel {
  width: 100%;
  background-size: 100%;
  padding-top: 1.0625rem;
}
.lucky-title {
  height: 6.425rem;
  background: url("./../../assets/img/lucky_title.png") no-repeat center top;
  background-size: 76%;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
}
.wheel-main {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top:-10px;
}
.wheel-bg {
  width: 16.4375rem;
  height: 16.4375rem;
  background: url("./../../assets/img/draw_wheel.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: transform 3s ease;
}
.btnContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  height: 3rem;
  width: 100%;
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
  min-height: 8.25rem;
  background: rgb(246, 78, 103);
  margin-left: 1rem;
  margin-right: 1rem;
  align-items: top;
  padding-bottom: 16%;
  /* height: calc( 100% - 500px); */
}
.leftimg {
  background: url("./../../assets/img/leftimg.png") no-repeat center top;
  background-size: 100% 100%;
  height:2.3rem;
  width:35%;
  float: left;
  position: relative;
  left:-3%;
}
.leftimg1 {
  background: url("./../../assets/img/leftimg1.png") no-repeat center top;
  background-size: 100% 100%;
  height:2.3rem;
  width:35%;
  float: left;
  position: relative;
  right: 3.5%;
}
.rightimg {
  background: url("./../../assets/img/rightimg.png") no-repeat center top;
  background-size: 100% 100%;
  height:2.3rem;
  width:35%;
  float: right;
  position: relative;
  right: -3.5%;
}
.rightimg1 {
  background: url("./../../assets/img/rightimg1.png") no-repeat center top;
  background-size: 100% 100%;
  height:2.3rem;
  width:35%;
  float: right;
  position: relative;
  right: -3.5%;
}
.main-bg {
  width: 100%;
  height: 6.5625rem;
  position: absolute;
  top: -3.4375rem;
  left: 0;
  background: url("./../../assets/img/luck_bg.png") no-repeat center top;
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
  font-size: 1rem;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 0.3125rem 0.625rem;
}
.tip-content {
  padding: 1.5625rem 0.625rem;
  font-size: 0.875rem;
  color: #fff8c5;
  line-height: 1.5;
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

.firstBtn {
  background: url("./../../assets/img/firstBtn.png") no-repeat center top;
  width: 28%;
  min-height: 3rem;
  background-size:100%;
  margin-left:0.3rem;
}

.secondBtn {
  background: url("./../../assets/img/secondbtn.png") no-repeat center top;
  width: 30%;
  min-height: 3rem;
  background-size:100%;
  margin-left:0.3rem;
}

.thirdBtn {
  background: url("./../../assets/img/thirdBtn.png") no-repeat center top;
  width: 30%;
  min-height: 3rem;
  background-size:100%;
  margin-left:0.3rem;
}

/* author lyc */

*{ margin:0px; padding:0px; font-family:'微软雅黑'; -webkit-tap-highlight-color:rgba(0,0,0,0);  }
li{ list-style:none }
img{ border:none}
a{text-decoration:none;} 



/* -------------------------摇奖排行榜-----------------------------------  */
/* .Top_Record{height: 100%;} */
/* .topRec_List{height: 100%;} */
/* .maquee{height: calc( 100% - 45px);} */

.record_Top{width:90%; height:50px;  background-size:contain; text-align:center; line-height:45px; margin:30px auto 0px; color:#fff;}


.topRec_List dl,.maquee{ width:90%; overflow:hidden; margin:0 auto; color:#fff}
.topRec_List dd{ float:left; text-align:center; border-bottom:0px solid #1B96EE; color:#fff;}
.topRec_List dl dd:nth-child(1){ width:17%; height:40px; line-height:40px; }
.topRec_List dl dd:nth-child(2){ width:18%; height:40px; line-height:40px; }
.topRec_List dl dd:nth-child(3){ width:25%; height:40px; line-height:40px; }
.topRec_List dl dd:nth-child(4){ width:40%; height:40px; line-height:40px; }
/* .maquee{ height:160px;} */
.topRec_List ul{ width:100%; height:195px;}
.topRec_List li{ width:100%; height:30px; line-height:30px; text-align:center; font-size:12px; border-bottom: 0px dashed #fff;}
/*.topRec_List li:nth-child(2n){ background:#077cd0}*/
.topRec_List li div{ float:left;}
.topRec_List li div:nth-child(1){ width:17%;}
.topRec_List li div:nth-child(2){ width:18%;}
.topRec_List li div:nth-child(3){ width:25%;}
.topRec_List li div:nth-child(4){ width:40%;}

.apple a{display:block; text-decoration:none;}

.apple,.aa{ width:90%; height:50px; overflow:hidden; margin:30px auto; border:1px solid #fff;}
.apple a,.aa a{ width:100%; height:50px; line-height:50px; text-indent:20px; color:#fff;}
.aa {word-wrap:break-word;line-height:50px;  color:#fff;}
</style>

