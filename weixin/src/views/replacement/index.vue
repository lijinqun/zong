<template>
  <div class="page" style="height:100%;">
      <top-header title="社区保障置换" style="width: 100%;position: fixed;top: 0;z-index: 100;"></top-header>
      <div class="my" style="height:calc(100% - 40px)">
            <div class="quantity">
                <p>总数量</p>
                <p class="number">{{userInfo.incomeCoin.toFixed(3) || 0}}</p>
                <p class="detail"><router-link to="/recordcontent/3">珠宝明细</router-link><router-link to="/discipline">交易记录</router-link></p>
                <p class="" style="padding:10px 0 18px 0;"><router-link to="/recordcontent/1">余额明细</router-link><router-link to="/disciplineMy">我的置换</router-link></p>
            </div>
            <div class="href">
                <router-link to="/newclaim">去出让</router-link><router-link to="/new">去认领</router-link>
            </div>
            <div class="community">
                <div @click="href">
                    <img src="../../assets/368.gif" alt="">
                </div>
            </div>
            <div>
                <!-- <router-link to="/community">社区</router-link>
                <router-link to="/replacement">我的</router-link> -->
                <replacement-nav :active='active'></replacement-nav>
            </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
// 引入底部主导航
import replacementNav from './../../components/replacementNav'
export default {
  components: {
      replacementNav
  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        active:2
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
      href(){
          this.$router.push('/community')
      }
  },
}
</script>

<style scoped lang="scss">
    .page{
        box-sizing: border-box;
        padding-top: 40px;
        > .my{
            > .quantity{
                background: #DCBF63;
                padding-top: 10%;
                // height: 25%;
                > .number{
                    font-size:30px;
                    font-weight: 400;
                }
                > p{
                    text-align: center;
                    color: #ffffff;
                    font-size: 16px;
                    > a{
                        display: inline-block;
                        width: 50%;
                        text-align: center;
                        color: #ffffff;
                        height: 25px;
                        line-height: 25px;
                        font-size: 14px;
                    }
                    > a:first-child{
                        border-right:1px solid #ffffff;
                        width: calc(50% - 1px);
                    }
                }
                > .detail{
                    margin-top: 5%;
                    margin-bottom: 3px;
                }
            }
            > .href{
                height: 30px;
                line-height: 30px;
                padding: 5px 0;
                > a{
                    display: inline-block;
                    width: 50%;
                    text-align: center;
                    line-height: 25px;
                    color: #524E4D;
                    font-size:14px;
                }
                > a:first-child{
                    border-right:1px solid #EEEEEE;
                    width: calc(50% - 1px);
                }
            }
            > .community{
                height:calc(80% - 67px - 50px);
                background: #EEEEEE;
                > div{
                    padding-top: 25%;
                    text-align: center;
                    > img{
                        max-width:50%;
                    }
                }
            }
            > .button{
                box-sizing: border-box;
                height: 50px;
                margin: 0;
                padding: 0;
                > a{
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    display: inline-block;
                    width: calc(50% - 2px);
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    background:#DCBF63;
                    color: #ffffff;
                }
                > a:first-child{
                    background: #ffffff;
                    color: #DCBF63;
                    width: calc(50% - 4px)
                }
            }
        }
    }
</style>
