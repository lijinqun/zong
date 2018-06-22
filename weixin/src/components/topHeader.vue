<template>
  <!-- 头部 -->
    <header class="top-title">
      <a class="back-off" :href="back" v-if="back !== ''">
        <van-icon name="arrow-left" />
      </a>
      <a class="back-off" @click="backFun" v-if="back === ''">
        <van-icon name="arrow-left" />
      </a>
      <span>{{title}}</span>
      <div class="right-side">
          <slot name="rightSide"></slot>
          <!-- app分享 -->
          <van-icon class="share" name="share" v-if="share" @click="shareApp"/>
      </div>
    </header>
</template>

<script>
import { getServerUrl } from "./../api";
export default {
    name: 'top-title',
    props: {
        title: {
            default: '',
            type: String
        },
        back: {
            default: '',
            type: String
        },
        share: {
            default: false,
            type: Boolean
        },
        shareLink: {
            default: '',
            type: String
        }
    },
    methods: {
        shareApp () {
            window.WebViewJavascriptBridge.callHandler('shareWebPage', {
                'title': '从众链商新零售',
                'description': '从众链商新零售',
                'webPageUrl': this.shareLink,
                'thumbBitmapUrl': `${getServerUrl()}/zouwei/order/icon.jpg`
            })
        },
        backFun () {
            const routerHistory = sessionStorage.getItem('routerHistory') ? JSON.parse(sessionStorage.getItem('routerHistory')) : ['/']
            // console.log(routerHistory[routerHistory.length - 2])
            if(routerHistory[routerHistory.length - 2] != undefined){
                this.$router.push(routerHistory[routerHistory.length - 2])
            }else{
                this.$router.push('/')
            }
            // this.$router.back(-1)
            // console.log(routerHistory)
            // this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .top-title {
        position: relative;
        height: 40px;
        text-align: center;
        background-color: #332c2b;
        color: #e0bf63;
        line-height: 40px;
        > .back-off {
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 40px;
            color: #e0bf63;
        }
        // > .share, .right-btn {
        //     position: absolute;
        //     top: 0;
        //     right: 0;
        //     width: 50px;
        //     height: 40px;
        //     color: #e0bf63;
        // }
        > .right-side {
            position: absolute;
            top: 0;
            right: 0;
            height: 40px;
            color: #e0bf63;
            line-height: inherit;
            > i {
                line-height: inherit;
                padding: 0 8px;
            }
            > span {
                min-width: 60px;
            }
        }
    }
</style>
