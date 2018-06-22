<style lang="less">
    @import '../../styles/common.less';
    @import './access.less';
</style>

<template>
    <div class="access">
        <Row>
            <Col span="4">
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        当前用户
                    </p>
                    <div class="access-user-con access-current-user-con">
                        <img :src="avatorPath" alt="">
                        <p>当前用户权限值:<b>{{ accessCode }}</b></p>
                    </div>
                </Card>
            </Col>
            <Col span="20" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="android-contacts"></Icon>
                        不同权限用户的不同菜单
                    </p>
                    <div class="access-user-con access-change-access-con">
                        <Col span="8">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <i-switch :value="switchValue" @on-change="changeAccess" size="large"></i-switch>
                                <div @click="settxt()">点击生成</div>
                            </Row>
                        </Col>
                        <Col span="16" class="padding-left-10">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <p>您可以通过左侧的开关来切换当前用户的权限值，然后您可以观察左侧菜单栏的变化，如果当前用户的权限值是<b> 0 </b>，则左侧菜单栏会显示’权限测试页‘这一项('权限测试页'只用于测试，点击不会跳转)。</p>
                            </Row>
                        </Col>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Main from '../Main.vue';
export default {
    name: 'access_index',
    data () {
        return {
            accessCode: parseInt(Cookies.get('access')),
            switchValue: parseInt(Cookies.get('access')) === 1
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        settxt(){
            var kk = {};
            kk.path='/cccecrelation';
            kk.icon= 'ios-grid-view';
            kk.title= '人员管理1';
            kk.name= 'cccecrelation';
            kk.access= 0;
            kk.component= Main;
            kk.children= [
                { path: 'peoplelist', title: '人员管理', name: 'peoplelist', icon: 'edit' }
            ];
            var params=[];
            params.newrouters=kk;
            this.$store.commit("updateapprouterdata",params);
        },

    settxt2(){


            var kk = {};
            kk.path='/balance';
            kk.icon= 'ios-grid-view';
            kk.title= '提现管理1';
            kk.name= 'balance';
            kk.access= 0;
            kk.component= Main;
            kk.children= [
                { path: 'balancewithdrawals', title: '提现管理', name: 'balancewithdrawals', icon: 'edit' }
            ];
            var params=[];
            params.newrouters=kk;
            this.$store.commit("updateapprouterdata",params);
        },
        changeAccess (res) {
            if (res) {
                this.accessCode = 1;
                Cookies.set('access', 1);
            } else {
                this.accessCode = 0;
                Cookies.set('access', 0);
                this.settxt();
                this.settxt2();
            }
            this.$store.commit('updateMenulist');
        }
    }
};
</script>

<style>

</style>
