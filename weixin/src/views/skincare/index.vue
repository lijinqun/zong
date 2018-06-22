<template>
  <div class="skincare">
    <top-header title="从众链商新零售" style="position: fixed;top:0;width:100%;"></top-header>
    <img src="../../assets/506.jpg" alt="">
    <img src="../../assets/507.png" @click="$router.push('/goodsdetails/5187')" style="position: fixed;right:0;top:10%;width:100px;" alt="">
    <img src="../../assets/508.png" @click="$router.push('/')" style="position: fixed;right:0;top:20%;width:100px;" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
import {shareSmart} from "./../../api";
export default {
  components: {

  },
  data() {
    return {

    }
  },
  created () {
    shareSmart('skincare','莱颜胶原多肽修护面膜套装','汲取自然能量，满足肌肤“渴”望；年轻，没有秘密；漂亮，就是简单')
  },
  mounted () {
    shareSmart('skincare','莱颜胶原多肽修护面膜套装','汲取自然能量，满足肌肤“渴”望；年轻，没有秘密；漂亮，就是简单')
  },
  methods: {

  },
}
</script>

<style scoped lang="scss">
.skincare{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    padding-top: 40px;
    > img{
      margin: 0;
      padding: 0;
      max-width: 100%;
    }
}
</style>