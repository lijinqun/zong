<template>
  <div class="page">
      <top-header title=""></top-header>
      <div class="successful">
          <p><img src="" alt=""></p>
          <p class="succ">付款成功</p>
          <router-link to="/community">完成</router-link>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

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
.successful{
    padding: 20% 10px 10px 10px;
    p{
        text-align: center;
        width:calc( 100% - 20px);
        font-size: 14px;
    }
    > .succ{
        line-height: 35px;
    }
    > a{
            display: inline-block;
            width:calc(100% - 20px);
            height:35px;
            line-height: 35px;
            text-align: center;
            line-height: 30px;
            color: #ffffff;
            font-size: 14px;
            background: #DDBF63;
            margin-top: 50%;
        }
}
</style>
