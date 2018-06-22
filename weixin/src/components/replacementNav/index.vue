<template>
  <div class="page">
        <div class="btn">
            <ul>
                <li>
                    <router-link to="/">
                        <p>
                            <img src="../../assets/378.gif" alt="">
                        </p>
                        <p style="color:#B89F57;">首页</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/community">
                        <p>
                            <img v-if="tActive == 1" src="../../assets/380.gif" alt="">
                            <img v-else src="../../assets/381.gif" alt="">
                        </p>
                        <p v-if="tActive == 1" style="color:#ffffff;">社区</p>
                        <p v-else style="color:#B89F57;">社区</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/replacement">
                        <p>
                            <img v-if="tActive == 2" src="../../assets/382.gif" alt="">
                            <img v-else src="../../assets/383.gif" alt="">
                        </p>
                        <p v-if="tActive == 2" style="color:#ffffff;">我的</p>
                        <p v-else style="color:#B89F57;">我的</p>
                    </router-link>
                </li>
            </ul>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data() {
    return {
        tActive:this.active
    }
  },
  props: {
    active: {
      type: Number,
      default: 0
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
    .btn{
        height: 50px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        > ul{
            height: 50px;
            background: #000000;
            > li{
                width: 33.33%;
                float: left;
                text-align: center;
                height: 50px;
                > a{
                    display: inline-block;
                    height: 50px;
                    width: 100%;
                    > p{
                        font-size:12px;
                        line-height: 20px;
                        height: 25px;
                        color: #ffffff;
                        > img{
                            width: 16px;
                            height:16px;
                            position: relative;
                            top:4.5px;
                        }
                    }
                }
            }
        }
    }
</style>

