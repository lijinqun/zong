<template>
  <div class="page">
      <!-- 返回顶部 -->
    <div class="return" v-show="active" @click="subscribe">
      <img src="../../assets/329.png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data() {
    return {
        rolling:false
    }
  },
  props: {
    active: {
      type: Boolean,
      rolling: true
    }
  },
  created () {
  
  },
  mounted () {
  },
  methods: {
      subscribe(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // var gotoTop= function(){
        //   var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
        //   currentPosition -= 40;
        //   if (currentPosition > 0) {
        //     window.scrollTo(0, currentPosition);
        //   }
        //   else {
        //     window.scrollTo(0, 0);
        //     clearInterval(timer);
        //     timer = null;
        //   }
        // }
        // var timer=setInterval(gotoTop,1);
    }
  },
}
</script>

<style scoped lang="scss">
.return{
    width: 50px;
    height: 50px;
    position: fixed;
    right: 0;
    bottom: 10%;
    > img{
      width: 100%;
      height: 100%;
    }
  }
</style>
