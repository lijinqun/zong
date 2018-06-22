<template>
  <div class="page">
      <top-header title="店长等级"></top-header>
      <div class="level">
        <div class="level_nav">
          <div>
            <p style="" >
              <img v-if="memberGrade == 0 " class="mmopen_image"  src="../../assets/490.gif" alt="">
              <img v-else-if="memberGrade == 1" class="mmopen_image"  src="../../assets/476.gif" alt="">
              <img v-else-if="memberGrade == 2" class="mmopen_image"  src="../../assets/477.gif" alt="">
              <img v-else-if="memberGrade == 3" class="mmopen_image"  src="../../assets/478.gif" alt="">
              <img v-else-if="memberGrade == 4" class="mmopen_image"  src="../../assets/479.gif" alt="">
              <img v-else class="mmopen_image"  src="../../assets/480.gif" alt="">
            </p>
            <p class="image"><img style="width:40px;height:40px;" :src="userInfo.image" alt=""></p>
            <p style="padding-bottom: 2px;margin-top:1%;">{{userInfo.username}}</p>
            <p class="honor" style=""  @click="$router.push('/shopCenterHistory/1')"><span>团队荣誉</span><img v-show="message"  src="../../assets/481.gif" alt=""><img v-show="message" src="../../assets/482.gif" alt=""><img v-show="message" src="../../assets/483.gif" alt="">
            <span style="font-size:12px;position: relative;left:2px;top:1px;">{{sun}}</span><img  src="../../assets/481.gif" alt=""><span style="font-size:12px;position: relative;left:1px;top:1px;">{{moon}}</span><img src="../../assets/482.gif" alt="" v-show="!message"><span style="font-size:12px;position: relative;left:1px;top:1px;">{{stars}}</span><img src="../../assets/483.gif" alt="" v-show="!message"><img v-show=" !message && teamPerformance < 1000000" src="../../assets/491.gif" alt=""></p>
          </div>
          <router-link to="/reference">星级规则</router-link>
        </div>
        <div class="chartSettings">
          <h6 v-show="!message">成长轨迹</h6>
          <h6 v-show="message">暂无数据</h6>
          <!-- <div class="prompt">
            <p>本图作为示范示例</p>
            <p>具体数据以个人为准</p>
          </div> -->
          <!-- <div class="ve-histogram">
              <ve-histogram :data="chartData" height="300px" :settings="chartSettings"></ve-histogram>
          </div> -->
          <div class="chart">
              <div class="chart_title">
                  <p>五星</p>
                  <p>四星</p>
                  <p>三星</p>
                  <p>二星</p>
                  <p>一星</p>
              </div>
              <div class="chart_img">
                  <div style="left:2px;" :style="{height:height + 'px'}" v-show="!message">
                      {{list[memberGrade].childCount - data.childCount > 0 ? list[memberGrade].childCount - data.childCount : ''}}
                      <!-- <p :class="{achieve:(list[memberGrade].childCount - data.childCount) <= 0}" :style="{height:data.childCount > list[4].childCount ? 5 * 37.5 + 'px'  : data.childCount / childCount * height + 'px'}">{{data.childCount > 0 ? data.childCount : ''}}</p> -->
                      <p :class="{achieve:(list[memberGrade].childCount - data.childCount) <= 0}" :style="{height:data.childCount >= childCount ? height + 'px' : data.childCount / childCount * 37.5 + 'px'}">{{data.childCount > 0 ? (data.childCount < 10000 ? data.childCount : (data.childCount / 10000).toFixed(0) + 'w') : ''}}</p>
                      <!-- <p :class="{achieve:(list[memberGrade].childCount - data.childCount) <= 0}" :style="{height:data.childCount > list[4].childCount ? 5 * 37.5 + 'px' : data.childCount / 800 * 5 * 37.5 + 'px'}">{{data.childCount > 0 ? data.childCount : ''}}</p>    -->
                  </div>
                  <div style="left:14%;" :style="{height:height + 'px'}" v-show="!message">
                    {{list[memberGrade].childManagerCount - data.childManagerCount > 0 ? list[memberGrade].childManagerCount - data.childManagerCount : ''}}
                      <!-- <p :class="{achieve:(list[memberGrade].childManagerCount - data.childManagerCount) <= 0}" :style="{height:data.childManagerCount > list[4].childManagerCount ? 5 * 37.5 + 'px'  : data.childManagerCount / childManagerCount * height  + 'px'}">{{data.childManagerCount >0 ? data.childManagerCount : ''}}</p> -->
                      <p :class="{achieve:(list[memberGrade].childManagerCount - data.childManagerCount) <= 0}" :style="{height:data.childManagerCount >= childManagerCount ? height  + 'px' : data.childManagerCount / childManagerCount * 37.5  + 'px'}">{{data.childManagerCount >0 ? data.childManagerCount : ''}}</p>
                  </div>
                  <div style="left:27%;" :style="{height:height + 'px'}" v-show="!message">
                      <!-- {{ (list[memberGrade].orderAmount - data.orderAmount < 10000000) ? (list[memberGrade].orderAmount - data.orderAmount) / 10000 + '万' : (list[memberGrade].orderAmount - data.orderAmount < 10000000 && list[memberGrade].orderAmount - data.orderAmount > 1000000) ? (list[memberGrade].orderAmount - data.orderAmount) / 10000000 + '千万' : (list[memberGrade].orderAmount - data.orderAmount >= 100000000) ? (list[memberGrade].orderAmount - data.orderAmount) / 100000000 + '亿' : ''}} -->
                      <!-- <p :style="{height:data.orderAmount > list[4].orderAmount ? 5 * height + 'px'  : data.orderAmount / orderAmount * height  + 'px'}">{{ (data.orderAmount < 1000000) ? data.orderAmount / 10000 + '万' : (data.orderAmount > 1000000 && data.orderAmount < 100000000) ? data.orderAmount / 10000000 + '千万' :  (data.orderAmount >= 100000000) ? data.orderAmount / 10000000 + '亿' : ''}}</p> -->
                      {{list[memberGrade].orderAmount - data.orderAmount > 0 ? (list[memberGrade].orderAmount - data.orderAmount) : ''}}
                      <!-- <p :class="{achieve:(list[memberGrade].orderAmount - data.orderAmount) <= 0}" :style="{height:data.orderAmount > list[4].orderAmount ? 5 * 37.5 + 'px'  : data.orderAmount / orderAmount * 37.5  + 'px'}">{{ data.orderAmount < list[4].orderAmount ? data.orderAmount : ''}}</p> -->
                      <p :class="{achieve:(list[memberGrade].orderAmount - data.orderAmount) <= 0}" :style="{height:data.orderAmount >= orderAmount ? height + 'px'  : data.orderAmount / orderAmount * 37.5  + 'px'}">{{ Number(data.orderAmount).toFixed(0) < 10000 ? Number(data.orderAmount).toFixed(0) : Number(data.orderAmount / 10000 ).toFixed(0) + 'w'}}</p>
                  </div>
                  <div :style="{background:data.childGrade1Count <= 0 ? '#fff' : '#D986FC',height:37.5 + 'px'}" style="left:48%;width:6%">
                    <span style="position:absolute;font-size:7px;width:100%;top:-15px;left:0;">{{data.childGrade1Count > 0 ? data.childGrade1Count : ''}}</span>
                  </div>
                  <div :style="{background:data.childGrade2Count <= 0 ? '#fff' : '#FF9900',height: 2 * 37.5 + 'px'}" style="left:57%;width:6%">
                    <span style="position:absolute;font-size:7px;width:100%;top:-15px;left:0;">{{data.childGrade2Count > 0 ? data.childGrade2Count : ''}}</span>
                  </div>
                  <div :style="{background:data.childGrade3Count <= 0 ? '#fff' : '#FFCC36',height:3 * 37.5 + 'px'}" style="left:66%;width:6%">
                    <span style="position:absolute;font-size:7px;width:100%;top:-15px;left:0;">{{data.childGrade3Count > 0 ? data.childGrade3Count : ''}}</span>
                  </div>
                  <!-- <div :style="{background:data.childGrade4Count <= 0 ? '#fff' : '#FF9900',height: 4 * 37.5 + 'px'}" style="left:75%;width:6%">
                    <span style="position:absolute;font-size:7px;width:100%;top:-15px;left:0;">{{data.childGrade4Count}}</span>
                  </div>
                  <div :style="{background:data.childGrade5Count <= 0 ? '#fff' : '#FFCC36',height:5 * 37.5 + 'px'}" style="left:84%;width:6%">
                    <span style="position:absolute;font-size:7px;width:100%;top:-15px;left:0;">{{data.childGrade5Count}}</span>
                  </div> -->
                  
              </div>
          </div>
          <div class="chart-nav" v-show="!message"> 
            <span>团队人数</span>
            <span>直推店长</span>
            <span>库存链豆</span>
            <span style="width:58%;">团队</span>
          </div>
          <div style="width:100%;padding:5px 10px;" class="chart_title">
              <p><i></i><span>当前等级数据</span><b></b><span>达到升级条件</span></p>
              <p><a></a><span>升级所需数据</span><b style="background:#D986FC;"></b><span>一星店长人数</span></p>
              <p><a style="background:#FF9900;"></a><span>二星店长人数</span><b style="background:#FFCC36;"></b><span>三星店长人数</span></p>
              <p><a style="background:#CCCC36;"></a><span>四星店长人数</span><b style="background:#ED7080;"></b><span>五星店长人数</span></p>
              <p></p>
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
 import {definition,vipstatistical} from "./../../api";
export default {
  components: {

  },
  data() {
    return {
      list:[
        {"childManagerCount":null,"childGrade1Count":null,"childGrade3Count":null,"orderAmount":null,"memberGrade":2,"childGrade2Count":null,"childCount":null},
        // {"childManagerCount":40,"childGrade1Count":10,"childGrade3Count":0,"orderAmount":500000.0000,"memberGrade":3,"childGrade2Count":0,"childCount":200},
        // {"childManagerCount":80,"childGrade1Count":0,"childGrade3Count":0,"orderAmount":1000000.0000,"memberGrade":4,"childGrade2Count":10,"childCount":400},
        // {"childManagerCount":160,"childGrade1Count":0,"childGrade3Count":10,"orderAmount":2000000.0000,"memberGrade":5,"childGrade2Count":0,"childCount":800},
        // {"childManagerCount":100,"childGrade1Count":1,"childGrade3Count":1,"orderAmount":1000.0000,"memberGrade":0,"childGrade2Count":1,"childCount":0}
       ],
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      memberGrade:0,//当前店长等级
      childCount:0,//当前会员升级需要直推的人数
      childManagerCount:0,//当前会员直推店长
      orderAmount:0,//当前会员自消费金额
      data:{
        'childCount':null,
        'childGrade1Count':0,
        'childGrade2Count':0,
        'childGrade3Count':0,
        'childManagerCount':null,
        'member.memberGrade':null,
        'orderAmount':null,
        'teamPerformance':null
      },
      height:0,
      childGradeNumber:0,
      teamPerformance:0,
      sun:0,//太阳
      moon:0,//月亮
      stars:0,//星星
      message:false

    }
  },
  created () {
    let _this = this;
    _this.definition()
    setTimeout(function(){
      _this.definition()
    },2000)
    setTimeout(function(){
      _this.definition()
    },5000)
    setTimeout(function(){
      _this.definition()
    },7000)
    setTimeout(function(){
      _this.definition()
    },10000)
    // this.vipstatistical()
  },
  beforeCreate(){
      // let _this = this;
      // definition().then(res=>{
      //     _this.list = res.data;
      //     vipstatistical(this.userInfo.id).then(_res=>{
      //       if(_res.data != null){
      //         _this.memberGrade = _res.data['member.memberGrade'] //会员的会员星级
      //         if( _this.memberGrade == 5){
      //             _this.height = _this.memberGrade * 37.5 + _this.memberGrade;//满级了
      //         }else{
      //             _this.height = (_this.memberGrade + 1 ) * 37.5 + _this.memberGrade; //升上一级的高度
      //         }    
      //         _this.childCount =  _this.list[_this.memberGrade].childCount   //当前会员升级需要直推的人数
      //         _this.childManagerCount =  _this.list[_this.memberGrade].childManagerCount   //当前会员直推店长
      //         _this.orderAmount =  _this.list[_this.memberGrade].orderAmount   //当前会员自消费金额
      //         console.log("升级所需要的：" + _this.memberGrade + '..' + _this.childCount + '..' + _this.childManagerCount + '.. ' + _this.orderAmount)
      //         _this.data = _res.data;
      //         let childList = [];
      //         _this.teamPerformance = _res.data.teamPerformance;//团队总业绩
      //         _this.sun = parseInt(_this.teamPerformance/100000000);
      //         _this.moon = parseInt((_this.teamPerformance % 100000000)/10000000);
      //         _this.stars = parseInt((_this.teamPerformance % 10000000)/1000000);
      //         _this.childGradeNumber = childList[childList.length - 1] //培养最多人数的星级店
      //       }else{
      //         _this.message = true
      //       }
      //     })
      // })
  },
  mounted () {

  },
  methods: {
    definition(){
      let _this = this;
      definition().then(res=>{
          _this.list = res.data;
          vipstatistical(this.userInfo.id).then(_res=>{
            if(_res.data != null){
              _this.memberGrade = _res.data['member.memberGrade'] //会员的会员星级
              if( _this.memberGrade == 5){
                  _this.height = _this.memberGrade * 37.5 + _this.memberGrade;//满级了
              }else{
                  _this.height = (_this.memberGrade + 1 ) * 37.5 + _this.memberGrade; //升上一级的高度
              }    
              _this.childCount =  _this.list[_this.memberGrade].childCount   //当前会员升级需要直推的人数
              _this.childManagerCount =  _this.list[_this.memberGrade].childManagerCount   //当前会员直推店长
              _this.orderAmount =  _this.list[_this.memberGrade].orderAmount   //当前会员自消费金额
              console.log("升级所需要的：" + _this.memberGrade + '..' + _this.childCount + '..' + _this.childManagerCount + '.. ' + _this.orderAmount)
              _this.data = _res.data;
              let childList = [];
              _this.teamPerformance = _res.data.teamPerformance;//团队总业绩
              _this.sun = parseInt(_this.teamPerformance/100000000);
              _this.moon = parseInt((_this.teamPerformance % 100000000)/10000000);
              _this.stars = parseInt((_this.teamPerformance % 10000000)/1000000);
              _this.childGradeNumber = childList[childList.length - 1] //培养最多人数的星级店
            }else{
              _this.message = true
            }
          })
      })
    }
  },
}
</script>

<style scoped lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.page{
  background: #ffffff;
  height: 100%;
  .level{
    width: 100%;
    > .level_nav{
      height:170px;
      background: url(../../assets/475.gif) no-repeat;
      background-size: 100% 100%;
      position: relative;
      width: 100%;
      > div{
        padding: 10px 0;
        > p{
          text-align: center;
          color: #ffffff;
          font-size:14px;
          > .mmopen_image{
            max-width: 25%;
          }
        }
        > .honor{
          padding-bottom: 5px;
          position: relative;
          z-index: 9999;
          > span{
            margin-right: 5px;
            // margin-left: 20px;
          }
          > img{
            max-width: 4%;
            vertical-align:middle;
            margin-right: 7px;
          }
        }
        > .image{
          width: 100%;
          height: 40px;
          // position: absolute;
          // top:49%;
          // left: 27%;
          > img{
            border-radius: 50%;
          }
        }
      }
      > a{
        position: absolute;
        top: 20px;
        right: 20px;
        font-size:14px;
        color: #ffffff;
      }
    }
    > .chartSettings{
      // margin-top: 15px;
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      > h6{
        text-align: center;
        font-size: 15px;
        font-weight: 600;
        line-height: 30px;
        height: 30px;
      }
      > .prompt{
        font-size: 10px;
        color: #DB1215;
        width: 120px;
        position: absolute;
        top: 20px;
        right: 0;
      }
      > .ve-histogram{
        margin-top: 30px;
        height: 250px;
      }
      > .chart{
        height: 200px;
        width: 100%;
        > .chart_title{
          width: 10%;
          float: left;
          height: 200px;
          background:#fff;
          > p{
            height: 40px;
            font-size: 12px;
            color: #000;
            font-weight: 600;
            text-align: center;
          }
        }
        > .chart_img{
          position: relative;
          top: 0;
          left: 0;
          width: 90%;
          float: left;
          height: 200px;
          background: url(../../assets/486.png) no-repeat;
          background-size: 100% 100%;
          > div{
            width: 10%;
            float: left;
            background: #E4E4E4;
            // height: 200px;
            // margin-right: 10%;
            position: absolute;
            bottom: 2px;
            text-align: center;
            font-size: 10px;
            color: #666;
            > .achieve{
              background:#63B1DD;
            }
            > p{
              font-size: 10px;
              color: #666;
              width: 100%;
              position: absolute;
              bottom: 0;
              text-align: center;
              background: #DDBF63;
              // height: 50%;
            }
          }
        }
      }
      > .chart-nav{
        width: 90%;
        float: right;
        > span{
          font-size:7px;
          text-align: center;
          display: inline-block;
          width: 12%;
          line-height: 25px;
        }
      }
      > .chart_title{
        > p{
          margin-top: 7px;
          float: left;
          text-align: center;
          width: 100%;
          > i{
            display: inline-block;
            width: 13px;
            height: 13px;
            background: #DDBF63;
          }
          > b{
            display: inline-block;
            width: 13px;
            height: 13px;
            background: #63B1DD;
          }
          > a{
            display: inline-block;
            width: 13px;
            height: 13px;
            background: #E4E4E4;
          }
          span{
            font-size: 12px;
            color: #000;
            margin-right: 10px;
            margin-left: 7px;
            position: relative;
            top: -2px;
          }
        }
      }
    }
  }
}
</style>
