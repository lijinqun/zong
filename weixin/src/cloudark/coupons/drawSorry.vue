<template>
    <div class="page">
        <top-header title="抽奖"></top-header>
        <div class="drawSorry">
            <div class="title_img" ><img src="../../assets/512.png" style="max-width:100%;" alt=""></div>
            <div class="sorry"><img src="../../assets/520.png" alt="" style="max-width:40%;"></div>
            <div>您未获得链豆，再接再厉哦</div>
            <div class="chainbean">
                <img src="../../assets/521.png" alt=""><img @click="$router.push('/couponGame/-1')" src="../../assets/522.png" style="position: absolute;bottom: 22px; max-width:15%;right:41%;" alt="">
            </div>
            <div style="margin-top:5%;">
                <button>已有{{userInfo.point.toFixed(3) || 0}}链豆</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {

  },
  data() {
    return {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
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
    > .drawSorry{
        > .title_img{
            >　img{
                max-width: 100%;
            }
        }
        > .sorry{
            text-align: center;
            margin-top: 15px;
            > img{
                max-width: 50%;
            }
        }
        > div{
            text-align: center;
            font-size: 15px;
            color: #D91316;
            font-weight: 600;
            > button{
                outline: none;
                border: 1px solid #DEBF64;
                background: #DEBF64;
                width: 220px;
                height: 35px;
                color: #000000;
                font-size: 14px;
                font-weight: 600;
                border-radius: 5px;
            }
        }
        > .chainbean{
            position: relative;
            top: 15px;
            left: 0;
            > img{
                max-width: 50%;
            }
        }
    }
}
</style>
