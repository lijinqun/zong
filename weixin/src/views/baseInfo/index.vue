<template>
  <div class="base-info">
    <!-- 头部 -->
    <top-header title="基本资料"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/selfSetting">
        <van-icon name="arrow-left" />
      </a>
      <span>基本资料</span>
    </header> -->
    <!-- 第一部分 -->
    <div class="group-type">
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <span style="border-left: 5px solid #e0bf63;padding-left: 1rem;" class="van-cell-text">基本信息</span>
          </template>
        </van-cell>
        <van-cell title="头像" is-link @click="show=true" />
        <van-cell title="会员ID" :value="userInfo.memberNo"/>
        <van-cell title="昵称" is-link @click="showText=true" />
        <van-cell title="姓名" is-link />
        <van-cell title="性别" is-link />
        <van-cell title="出生日期" is-link />
        <van-cell title="文化程度" is-link />
      </van-cell-group>
    </div>
    <!-- 第二部分 -->
    <div class="group-type">
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <span style="border-left: 5px solid #e0bf63;padding-left: 1rem;" class="van-cell-text">会员信息</span>
          </template>
        </van-cell>
        <van-cell title="会员等级" 
          :value="userInfo.memberType === 1 ? '普通会员' : userInfo.memberType === 2 ? '店长' : '商家'" 
          is-link />
        <van-cell title="身份认证" value="无" is-link />
        <van-cell title="注册时间" />
        <van-cell title="我的推荐人" :value="parentName" is-link />
        <van-cell title="我的粉丝数" :value="childListLength" is-link />
      </van-cell-group>
    </div>
    <!-- 第三部分 -->
    <div class="group-type">
      <van-cell-group>
        <van-cell>
          <template slot="title">
            <span style="border-left: 5px solid #e0bf63;padding-left: 1rem;" class="van-cell-text">联系信息</span>
          </template>
        </van-cell>
        <van-cell title="所在地区" value="未选择" is-link />
        <van-cell title="详细地址" value="未填写" is-link />
        <van-cell title="手机号码" />
        <van-cell title="微信号" value="未填写" is-link />
        <van-cell title="紧急联系人" value="未填写" is-link />
        <van-cell title="与ta关系" value="未选择" is-link />
        <van-cell title="紧急联系号码" value="未填写" is-link />
      </van-cell-group>
    </div>
    <van-popup v-model="show" position="right" style="width:70%;height: 100%;">
      <div class="bg-white">
        <div class="photo">
          <img src="./../../assets/7.jpg" alt="">
        </div>
        <div class="page">
          <button class="warning">上传图片</button>
        </div>
        <div class="page">
          <button>确认保存</button>
        </div>
      </div>
    </van-popup>
    <van-dialog v-model="showText">
      <h4 style="text-align:center">修改信息</h4>
      <van-field
        v-model="value"
        label="用户名"
        placeholder="请输入..."
      />
    </van-dialog>
  </div>
</template>

<script>
import { getAllChildren, getUserInfoById } from "./../../api";
export default {
  name: 'base-info',
  data () {
    return {
      show: false,
      showText: false,
      value: '',
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      childListLength: '',
      parentName: ''
    }
  },
  created () {
    getAllChildren(this.userInfo.id).then(response => {
      this.childListLength = response.data.length
    })
    getUserInfoById(this.userInfo.parent_Id).then(reseponse => {
      if (reseponse.data) {
        this.parentName = reseponse.data.username
      }
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" >
  @import './index.scss';
</style>
