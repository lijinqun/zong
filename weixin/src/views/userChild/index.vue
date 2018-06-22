<template>
  <div class="user-child">
    <!-- 头部 -->
    <top-header title="我的客户"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/myself">
        <van-icon name="arrow-left" />
      </a>
      <span>我的粉丝</span>
    </header> -->
    <!-- <van-cell-group>
      <van-cell v-for="(item, index) in list" :key="index" :title="item.username" :value="item.memberNo">
        <template slot="title">
          <img :src="item.image" alt="" style="height: 25px;float:left;margin-right:1rem;">
          <span class="van-cell-text">{{item.username}}</span>
        </template>
      </van-cell>
    </van-cell-group> -->
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      >
      <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.username" :icon="item.image" :value="item.memberNo"/> -->
      <van-cell-group>
        <van-cell v-for="(item, index) in list" :key="index" :title="item.username" :value="item.memberNo">
          <template slot="title">
            <img :src="item.image" alt="" style="height: 25px;float:left;margin-right:1rem;">
            <span class="van-cell-text">{{item.username}}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { getAllChildren,getCustomer } from "./../../api";
import { List } from 'vant';
export default {
  name: 'user-child',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      list: [],
      loading: false,
      finished: false,
      pageNumber:1,
      pageSize:10
    }
  },
  created () {
    // getAllChildren(this.userInfo.id).then(response => {
    //   this.list = response.data
    // })
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        let _this = this;
          getCustomer(this.userInfo.id,this.pageNumber,this.pageSize).then(res => {
            for(let i=0;i<res.data.list.length;i++){
              _this.list.push(res.data.list[i])
            }
            _this.loading = false;
            if((this.pageNumber * this.pageSize) >= (res.data.totalRow)){
              _this.finished = true;
            }else{
              _this.pageNumber++;
            }
            // _this.list = res.data.list;
            console.log(_this.list)
          })
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
