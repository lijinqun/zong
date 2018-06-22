<template>
    <div class="page">
        <top-header title="抽奖"></top-header>
        <div class="integralInsufficient">
            <div class="title_img"><img src="../../assets/512.png" alt=""></div>
            <div style="margin-top:20%;">
                <p><img src="../../assets/519.png" alt=""></p>
                <p>抱歉，您的链豆积分不足，</p>
                <p>建议您多使用从众链商，已获得抽奖机会。</p>
            </div>
            <div style="margin-top:25%;"><button @click="$router.push('/')">去发现好货</button></div>
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
.page{
    > .integralInsufficient{
        > div{
            text-align: center;
            > button{
                outline: none;
                height: 40px;
                width: 220px;
                border: 1px solid #DEBF64;
                color: #fff;
                border-radius: 20px;
                background: #DEBF64;
            }
            > img{
                max-width: 100%;
            }
            > p{
                text-align: center;
                color: #010101;
                font-weight: 600;
                > img{
                    max-width: 100%;
                }
            }
        }
    }
}
</style>
