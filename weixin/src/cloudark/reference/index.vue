<template>
  <div class="page">
        <top-header title="店长等级"></top-header>
        <div class="container" v-show="false">
            <p>店长等级对照表</p>
            <h6>店长等级达到相对应升级数据，则立刻升级</h6>
            <div>
                <table cellspacing="0">
                    <tr>
                        <td style="background:#F2F2F2;" class="van-hairline--right van-hairline--bottom">等级</td>
                        <td style="background:#F2F2F2;" class="van-hairline--right van-hairline--bottom">直推人数</td>
                        <td style="background:#F2F2F2;" class="van-hairline--right van-hairline--bottom">直推店长数</td>
                        <td style="background:#F2F2F2;" class="van-hairline--right van-hairline--bottom">自消费金额</td>
                        <td style="background:#F2F2F2;" class="van-hairline--right van-hairline--bottom">团队培养</td>
                    </tr>
                    <tr v-for="(item,key) in list" :key="key">
                        <td class="van-hairline--right van-hairline--bottom" style="background:#F2F2F2;">{{item.memberGrade == 1 ? '一星店长' : item.memberGrade == 2 ? '二星店长' : item.memberGrade == 3 ? '三星店长' : item.memberGrade == 4 ? '四星店长' : item.memberGrade == 5 ? '五星店长' : ''}}</td>
                        <td class="van-hairline--right van-hairline--bottom">{{item.childCount}}</td>
                        <td class="van-hairline--right van-hairline--bottom">{{item.childManagerCount}}</td>
                        <td class="van-hairline--right van-hairline--bottom">{{item.orderAmount}}</td>
                        <td class="van-hairline--right van-hairline--bottom">{{item.memberGrade == 1 ? 'X' : item.memberGrade == 2 ? 'X' : item.memberGrade == 3 ? item.childGrade1Count + '个一星店长' : item.memberGrade == 4 ? item.childGrade2Count + '个二星店长' : item.memberGrade == 5 ? item.childGrade3Count + '个三星店长' : ''}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div>
            <img src="../../assets/511.png" alt="" style="max-width:100%;">
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
 import {definition} from "./../../api";
export default {
  components: {

  },
  data() {
    return {
        list:[]
    }
  },
  beforeCreate(){
        // let _this = this;
        // definition().then(res=>{
        //     _this.list = res.data;
        //     console.log(_this.list)
        // })
  },
  created () {
      let _this = this;
      definition().then(res=>{
          _this.list = res.data;
          console.log(_this.list)
      })
  },
  mounted () {

  },
  methods: {

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
    height: 100%;
    background: #ffffff;
    > .container{
        > p{
            padding:0 10px;
            font-size: 15px;
            margin-top: 10px;
            height: 30px;
            line-height: 30px;
            font-weight: 600;
        }
        > h6{
            font-size: 12px;
            padding: 0 10px;
            color: #666;
            margin: 0;
            height: 30px;
            // line-height: 30px;
            font-weight: 400;
        }
        > div{
            height: 300px;
            background: url(../../assets/492.gif) no-repeat;
            background-size: 100% 100%;
            margin-top: 10%;
            padding:38% 7% 0 7%;
            font-size: 10px;
            > table{
                width: 100%;
                border: 1px solid #ffffff;
                border-radius: 10px;
                > tr{
                    > td{
                        text-align: center;
                        line-height: 23px;
                        font-size: 7px;
                    }
                }
            }
        }
    }
}
</style>
