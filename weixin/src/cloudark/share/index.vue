<template>
  <div class="page">
      <top-header title="乐分享"></top-header>
      <div>
          <ul>
              <li v-for="(item,key) in noticedata" :key="key">
                <p>{{item[0].createdTime}}</p>
                <div class="article">
                    <p @click="godetails(item[0].id)">
                      <span>{{item[0].title}}</span>
                      <img :src="imgserverUrl + item[0].icon" style="width: 100%" alt="">
                    </p>
                    <div @click="godetails(val.id)" v-if="ket != 0" v-for="(val,ket) in item" :key="ket" class="img van-hairline--bottom"><p>{{val.title}}</p><img :src="imgserverUrl + item[0].icon" alt=""></div>
                </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getnoticedata,imgserverUrl} from "./../../api";
import tools from './../../utils'
export default {
  components: {

  },
  data() {
    return {
      noticedata:[],
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      imgserverUrl:imgserverUrl
    }
  },
  created () {
    this.getnoticelist()
  },
  mounted () {

  },
  methods: {
    getnoticelist() {
        // 按照特定方式格式化
        function sortArr(arr, str) {
            var _arr = [],
                _t = [],
                // 临时的变量
                _tmp;

            // 按照特定的参数将数组排序将具有相同值得排在一起
            arr = arr.sort(function(a, b) {
                var s = a[str],
                    t = b[str];

                return s < t ? -1 : 1;
            });

            if ( arr.length ){
                _tmp = arr[0][str];
            }
            // console.log( arr );
            // 将相同类别的对象添加到统一个数组
            for (var i in arr) {
                // console.log( _tmp);
                if ( arr[i][str] === _tmp ){
                    // console.log(_tmp)
                    _t.push( arr[i] );
                } else {
                    _tmp = arr[i][str];
                    _arr.push( _t );
                    _t = [arr[i]];
                }
            }
            // 将最后的内容推出新数组
            _arr.push( _t );
            return _arr;
        }
      let zhethis=this;
      let params={};
      params.status='1';
      params.sortId=2;
      params.orderBy='updatedTime desc';
      getnoticedata(params).then(response => {
          zhethis.noticedata=response.data;
          for(let i=0;i<zhethis.noticedata.length;i++){
            zhethis.noticedata[i].createdTime = zhethis.noticedata[i].createdTime.split(' ')[0]
          }
          zhethis.noticedata = sortArr( zhethis.noticedata, 'createdTime').reverse()
          console.log( zhethis.noticedata )
      })
    },
    godetails(itemid){
      this.$router.push('/newsnoticeDetails/' + itemid);
    }
  }
}
</script>

<style scoped lang="scss">
.page{
  > div{
    padding: 10px 0;
    background:#F2F2F2;
    padding: 0 12.5px 12.5px 12.5px;
    > ul{
      > li{
        padding-top: 15px;
        > p{
          width: 25%;
          margin: 0 auto;
          margin-bottom: 15px;
          background: #CECECE;
          color: #fff;
          font-size:12px;
          text-align: center;
          border: 1px solid #CECECE;
          border-radius: 3px;
          padding: 2px 0;
        }
        > div{
          background: #fff;
          border: 1px solid #fff;
          border-radius: 5px;
          font-size: 0;
          > .img{
            height: 50px;
            padding:11px 11px 11px 15px;
            > img{
              width: 50px;
              height:50px;
              float: left;
            }
            > p{
              float: left;
              display: block;
              width: calc( 100% - 60px);
              line-height: 25px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              padding-right: 10px;
              word-break: break-all;
              height: 50px;
            }
          }
          > p{
            // position: relative;
            // top: 0;
            // left: 0;
            > span{
              // position: absolute;
              // top: 0;
              // left: 0;
              // color: #fff;
              display: inline-block;
              width: 96%;
              font-size: 14px;
              line-height: 25px;
              padding-left: 15px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
</style>
