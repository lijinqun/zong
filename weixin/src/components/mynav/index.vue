<template>
  <div class="index-bottom-nav">
    <van-tabbar class="tabbarbgcss" v-model="tActive">
      <van-tabbar-item icon="shop" class="tabbartxtbgcss" to="/my" style="font-size:10px;padding-top:8px;">
        <template slot="icon" slot-scope="props">
          <img v-if="tActive==0" src="./../../assets/424.gif" style="width:60px;height:50px;"/>
          <img v-else src="./../../assets/425.gif" style="width:60px;height:50px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="chat" class="tabbartxtbgcss" to="/newsnoticeDetails/11" style="font-size:10px;padding-top:8px;">
        <template slot="icon" slot-scope="props">
          <img v-if="tActive==1" src="./../../assets/426.gif" style="width:60px;height:50px;"/>
          <img v-else src="./../../assets/427.gif" style="width:60px;height:50px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="records" class="tabbartxtbgcss" to="/personalcenter" style="font-size:10px;padding-top:8px;">
        <template slot="icon" slot-scope="props">
          <img v-if="tActive==2" src="./../../assets/428.gif" style="width:70px;height:50px;"/>
          <img v-else src="./../../assets/429.gif" style="width:70px;height:50px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="gold-coin" class="tabbartxtbgcss" to="/immediately" style="font-size:10px;padding-top:8px;">
        <template slot="icon" slot-scope="props">
          <img v-if="tActive==3" src="./../../assets/430.gif" style="width:60px;height:50px;"/>
          <img v-else src="./../../assets/431.gif" style="width:60px;height:50px;"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'my-nav',
  data () {
    return {
      tActive: this.active
    }
  },
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
  
</style>
