<template>
  <div class="page">
      <top-header title="我的记录"></top-header>
      <div>
          <ul class="record">
              <li v-for="(index,key) in list" :key="key" class="van-hairline--bottom">
                 <span class="img"><img :src="index.image" alt=""></span>
                 <span class="username">{{index.userName}}</span>
                 <span class="gameResult">{{ prize_list[index.gameResult] }}</span>
                 <span class="createdTime">{{index.createdTime}}</span>
              </li>
          </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { record } from "./../../api";
export default {
  components: {

  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        list:[],
        prize_list: ['来一口','别人喝','整两支','不用喝','一口闷','来二口','来半支','来三口']
    }
  },
  created () {
      this.record()
  },
  mounted () {
  },
  methods: {
      record(){
        record(this.userInfo.id).then(res=>{
            if(res.code == 200){
                this.list = res.data
            }
        })
      }
  }
}
</script>

<style scoped lang="scss">
*{
    box-sizing: border-box;
}
.record{
    width: 100%;
    padding: 0 10px;
    > li{
        line-height: 45px;
        height:45px;
        font-size: 13px;
        > .img{
            display: block;
            width: 30px;
            height: 45px;
            float: left;
            > img{
                width: 30px;
                height: 30px;
                position: relative;
                top: 7.5px;
                border-radius: 50%;
            }
        }
        > .username{
            display: block;
            width: 20%;
            text-align: center;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
        }
        > .gameResult{
            display: block;
            width: 70px;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
            text-align: center;
        }
        > .createdTime{
            display: block;
            width: calc( 70% - 104px );
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
            text-align: center;
        }
    }
}
</style>
