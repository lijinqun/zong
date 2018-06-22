<template>
  <div class="page">
      <top-header title="团队业绩"></top-header>
        <div>
            <table class="van-hairline--top van-hairline--left van-hairline--right">
                <thead>
                    <tr>
                        <th class="van-hairline--bottom van-hairline--right">排名</th>
                        <th class="van-hairline--bottom van-hairline--right">战队名称</th>
                        <th class="van-hairline--bottom van-hairline--right">业绩</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,key) in list" :key="key">
                        <td class="van-hairline--bottom van-hairline--right">{{key+1}}</td>
                        <td class="van-hairline--bottom van-hairline--right">{{item.name}}</td>
                        <td class="van-hairline--bottom">{{item.performance}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {teamList} from "./../../api";
export default {
  components: {

  },
  data() {
    return {
        list:[]
    }
  },
  created () {
      let _this = this;
      teamList().then(res=>{
          _this.list  = res.data.list
      })
  },
  mounted () {

  },
  methods: {

  },
}
</script>

<style scoped lang="scss">
.page{
    > div{
        // padding: 0 10px;
        table{
            width: 100%;
            border-collapse:collapse;
            > thead{
                background: #f2f2f2;
                > tr{
                    background: #f2f2f2;
                    > th{
                        font-size: 14px;
                        font-weight: bold;
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                    }
                }
            }
            > tbody{
                > tr{
                    > td{
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }
            }
        }
    }
}
</style>
