<template>
  <div class="page">
        <van-nav-bar
         title="提交订单"
        />
        <div class="immediately">
            <img src="../../assets/441.png" alt="">
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

    }
  },
  created () {
      shareSmart('immediately','从众链商新零售','从众智能共享云柜')
  },
  mounted () {

  },
  methods: {

  },
}
</script>

<style scoped lang="scss">

.immediately{
    > img{
        max-width: 100%;
    }
}
</style>
