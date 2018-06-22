<template>
  <div class="index-bottom-nav">
    <van-tabbar class="tabbarbgcss" v-model="tActive">
      <van-tabbar-item icon="shop" class="tabbartxtbgcss" to="/" style="font-size:10px;">首页
        <template slot="icon" slot-scope="props">
          <img v-if="tActive==0" src="./../../assets/412.png" style="width:22px;height:22px;"/>
          <img v-else src="./../../assets/411.png" style="width:22px;height:22px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="chat" class="tabbartxtbgcss" to="/nearBy" style="font-size:10px;">附近
        <template slot="icon" slot-scope="props">
          <img v-if="tActive==1" src="./../../assets/414.png" style="width:22px;height:22px;"/>
          <img v-else src="./../../assets/413.png" style="width:22px;height:22px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="records" class="tabbartxtbgcss" @click="cleansession()" to="/shoppingMail" style="font-size:10px;">分类
        <template slot="icon" slot-scope="props">
          <img v-if="tActive==2" src="./../../assets/416.png" style="width:22px;height:22px;"/>
          <img v-else src="./../../assets/415.png" style="width:22px;height:22px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="gold-coin" class="tabbartxtbgcss" to="/order" style="font-size:10px;">订单
        <template slot="icon" slot-scope="props">
          <img v-if="tActive==3" src="./../../assets/418.png" style="width:22px;height:22px;"/>
          <img v-else src="./../../assets/417.png" style="width:22px;height:22px;"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="gold-coin" class="tabbartxtbgcss" to="/myself" style="font-size:10px;">我的
        <template slot="icon" slot-scope="props">
          <img v-if="tActive==4" src="./../../assets/420.png" style="width:22px;height:22px;"/>
          <img v-else src="./../../assets/419.png" style="width:22px;height:22px;"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'index-bottom-nav',
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
    cleansession(){
      sessionStorage.removeItem("goodactiveKey");
      sessionStorage.removeItem("goodsdetailid");
      sessionStorage.removeItem("goodsiddata");
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
  
</style>
