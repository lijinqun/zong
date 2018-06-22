<template>
  <div class="page">
        <van-nav-bar
         title="智能云柜"
        />
        <div>
            <van-tabs @click="add" v-model="active">
                <van-tab v-for="(index,key) in list" :title="index.title" :key="key">
                </van-tab>
            </van-tabs>
        </div>
        <div class="game">
            <img src="../../assets/438.png" alt="">
        </div>
        <my-nav :active="3"></my-nav>
  </div>
</template>

<script type="text/ecmascript-6">
// 引入底部主导航
import myNav from './../../components/mynav'
import {shareSmart} from "./../../api";
export default {
  components: {
      myNav
  },
  data() {
    return {
        active:2,
        list:[
            {
                title:'购买',
                url:'/'
            },
            {
                title:'到柜自提',
                url:'/'
            },
            {
                title:'游戏',
                url:'/'
            },
            {
                title:'商城',
                url:'/'
            }
        ],
    }
  },
  created () {
        shareSmart('game','从众链商新零售','从众智能共享云柜')
  },
  mounted () {

  },
  methods: {
        add(index,vale){
            if(index == 0){
                this.$router.push('/my')
            }else if(index == 1){
                this.$router.push('/buynow')
            }else if(index == 2){
                this.$router.push('/game')
            }else if(index == 3){
                this.$router.push('/')
            }
        },
  },
}
</script>

<style scoped lang="scss">
.page{
    > .game {
        font-size: 0;
        > img{
            max-width: 100%;
            margin: 0;
            padding:0;
        }
    }
}
</style>
