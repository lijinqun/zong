<template>
  <div class="page">
        <top-header title="确认信息并支付"></top-header>
        <div class="nav">
            <p><img src="" alt="图片"></p>
            <p>订单提交成功</p>
        </div>
        <ul>
            <li>订单编号：123456789zxcvb</li>
            <li>订单价格：10000</li>
            <li>下单时间：2018-04-12 12:02:31</li>
            <li>订单类型：认领</li>
            <li>手续费用：xxx</li>
        </ul>
        <p class="btn"><button>确认认领</button></p>
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
        background: #ffffff;
        > .nav{
            padding-top: 20%;
            > p{
                text-align: center;
                color: #030303;
                font-size: 14px;
                line-height: 30px;
                font-weight: 600;
            }
        }
        > ul{
            padding: 0 20px;
            margin-top: 10%;
            > li{
                font-size: 14px;
                color: #6A6A6A;
                line-height: 25px;
            }
        }
        > .btn{
            height: 40px;
            padding: 0 20px;
            text-align: center;
            margin-top: 10%;
            > button{
                width: calc( 100% - 20px);
                height: 40px;
                outline: none;
                border: 1px solid #DDBF63;
                background: #DDBF63;
                color: #ffffff;       
            }
        }
    }
</style>
