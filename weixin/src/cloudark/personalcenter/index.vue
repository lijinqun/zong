<template>
  <div class="page">
      <div class="personalcenter">
          <img src="../../assets/440.png" alt="">
      </div>
      <my-nav :active="2"></my-nav>
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
      shareSmart('personalcenter','从众链商新零售','从众智能共享云柜')
  },
  mounted () {

  },
  methods: {

  },
}
</script>

<style scoped lang="scss">
.page{
    height: 100%;
    width: 100%;
    > .personalcenter{
        height: calc(100% - 40px);
        > img{
            width: 100%;
            height: 80%;
        }
    }
}
</style>
