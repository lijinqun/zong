<template>
  <div id="app">
    <!-- <lucky-wheel></lucky-wheel> -->
    <div><img src="../../assets/423.jpg" alt="" style="max-width:100%;"></div>
  </div>
</template>

<script type="text/ecmascript-6">

import LuckyWheel from './luckywheel'


export default {
  components: {
    LuckyWheel
  },
  data() {
    return {

    }
  },
  created () {
  },
  mounted () {

  },
  methods: {

  },
}
</script>

<style scoped lang="scss">
.page{
    margin: 0;
    padding: 0;
    font-size: 0;
    width: 100%;
    height: 100%;
    > img{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
}
</style>