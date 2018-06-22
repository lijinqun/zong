<template>
  <div class="page"> 
        <div id="erweima-big" class="erweima-big">
        </div>
        <p v-show="QRCodeBig != null">长按保存二维码</p>
        <div class="btn"><button @click="erweima" :disabled='disabled'>生成二维码</button></div>
        <!-- <div v-show="QRCodeshow" class="QRCodeshow">
            <div id="img-box">
                <img :src="photoBox" alt="">
            </div>
        </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { getServerUrl} from "./../../api";
import html2canvas from 'html2canvas'
import { Toast,Dialog } from 'vant';
export default {
  components: {

  },
  data() {
    return {
        QRCodeBig:null,
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
        image:false,
        QRCodeshow:false,
        photoBox:'',
        disabled:false
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
      erweima(){
            this.image = true;
            this.QRCodeBig = new QRCode("erweima-big", {
                text: getServerUrl() + this.dirpath +'?redFlag=1&community=' + this.userInfo.memberNo+"#/talkqrcode" ,
                // text:'http://192.168.10.52:8080/#/myself',
                width: 160,
                height: 160,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
            this.disabled = true
        },
        // getImg() {
        //   if(this.QRCodeBig == null){
        //        Toast.fail('请先生成二维码');
        //       return
        //   }
        //     this.QRCodeshow = true
        //     this.$nextTick(() => {
        //         html2canvas(document.getElementById("img-box")).then((canvas) => {
        //             this.photoBox = canvas.toDataURL("image/png")
        //         });
        //     })
        // }
  },
}
</script>

<style scoped lang="scss">
.page{
    > .erweima-big{
        position: relative;
        margin-top: 15%;
        > img{
            width: 25px;
            height: 25px;
            position: absolute;
            top: 44%;
            left: 48%;
        }
    }
    > .btn{
        text-align: center;
        height: 40px;
        position: absolute;
        top: 6
        
        0%;
        width: 100%;
        > button{
            width: 35%;
            height: 40px;
            margin: 0 20px;
            background: #DDBF63;
            color: #ffffff;
            font-size: 14px;
            outline: none;
            border: 1px solid #DDBF63;
            border-radius: 3px;
        }
    }
    > .QRCodeshow{
        width: 160px;
        height: 160px;
        position:fixed;
        top: 50%;
        z-index: 1000;
    }
    > p{
        text-align: center;
        font-size: 12px;
        line-height: 40px;
    }
}
</style>
