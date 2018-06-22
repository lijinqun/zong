<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit2">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit2" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
                    <!-- <input type="text" v-model="namess" name="">
                    <input type="text" v-model="passs" name="">
                    <div style="width:50px;height:50px;background:#000;" @click="handleSubmit()"></div> -->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Main from './Main.vue';
import {gologin,getcascadedList}from "./api/api.js";
import {routers, otherRouter, appRouter} from '../router';
import Util from '../libs/util';
export default {
    data () {
        return {
            form: {
                userName: 'admin',
                password: ''
            },
            namess:'',
            passs:'',
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            tabarray:[
                {
        　　　　　　"parentName":"",
        　　　　　　"children":[],
        　　　　　　"name":"商品管理",
        　　　　　　"icon":null,
        　　　　　　"actionUrl":null,
        　　　　　　"id":3,
        　　　　　　"sort":6,
        　　　　　　"parentId":0
        　　　　},
        　　　　{
        　　　　　　"parentName":"",
        　　　　　　"children":[

        　　　　　　],
        　　　　　　"name":"订单管理",
        　　　　　　"icon":null,
        　　　　　　"actionUrl":null,
        　　　　　　"id":5,
        　　　　　　"sort":10,
        　　　　　　"parentId":0
        　　　　}
            ],
            allrouter:[],
            newrouter:[],
        };
    },
    methods: {
        handleSubmit () {
            Cookies.set('user', this.form.userName);
            //Cookies.set('password', this.form.password);
            // 图片
            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');

            // 权限值
            if (this.form.userName === 'admin') {
                Cookies.set('access', 0);
                this.$store.commit('updateMenulist');
            } else {
                Cookies.set('access', 1);
                 this.$router.push({
                        name: 'login'
                });
            }
            this.$router.push({
                name: 'home_index'
            });
        },
        handleSubmit2 () {
            var zhethis=this;
            gologin(this.form.userName,this.form.password).then(response => {
                        console.log(response);
                        if(response.code=='200'){
                            Cookies.set('user', zhethis.form.userName);
                            //Cookies.set('password', zhethis.form.password);
                            // 图片
                            zhethis.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');

                            // 权限值
                            if (zhethis.form.userName === 'admin') {
                                Cookies.set('access', 0);
                                // zhethis.$store.commit('updateMenulist');
                            } else {
                                Cookies.set('access', 0);
                            }



                            // let newrouter=[];
                            // let allrouter=appRouter;
                            // console.log(allrouter)
                            // this.$store.state.routers=[];

                            // getcascadedList().then(response => {
                            //     console.log(response)
                            //     if(response.code=='200'&&response.data!=null){
                            //         for (var i = 0; i < response.data.length; i++) {
                            //             for (var k = 0; k < allrouter.length; k++) {
                            //                 if(response.data[i].name==allrouter[k].title){
                            //                     newrouter.push(allrouter[k])
                            //                 }
                            //             }
                            //         }
                            //         this.$store.state.routers=[otherRouter, ...newrouter]
                            //         appRouter.splice(0,appRouter.length);
                            //         for (var g = 0; g < newrouter.length; g++) {
                            //             let newarr={};
                            //             newarr.newrouters=newrouter[g];
                            //             this.$store.commit('updateapprouterdata',newarr);
                            //         }
                            //         this.$store.commit('updateMenulist',newrouter);
                            //         Util.toDefaultPage([otherRouter, ...newrouter], to.name, router, next);
                            //     }else{
                            //          Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
                            //     }
                                
                            // })




                            zhethis.$router.push({
                                name: 'home_index'
                            });
                            location.reload()
                        }else{
                            alert(response.message)
                            console.log(response.message)
                        }
                    })
            this.$refs.loginForm.validate((valid) => {
                console.log(111111111)
                console.log(valid)
                var zhethis=this;
                if(valid){
                    // gologin(this.form.userName,this.form.password).then(response => {
                    //     console.log(response);
                    //     if(response.success){
                    //         Cookies.set('user', zhethis.form.userName);
                    //         Cookies.set('password', zhethis.form.password);
                    //         // 图片
                    //         zhethis.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');

                    //         // 权限值
                    //         if (zhethis.form.userName === 'admin') {
                    //             Cookies.set('access', 0);
                    //         } else {
                    //             Cookies.set('access', 1);
                    //         }
                    //         zhethis.$router.push({
                    //             name: 'home_index'
                    //         });
                    //     }else{
                    //         alert(response.message)
                    //         console.log(response.message)
                    //     }
                    // })
                }

                // if (valid) {
                //     Cookies.set('user', this.form.userName);
                //     Cookies.set('password', this.form.password);
                //     // 图片
                //     this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');

                //     // 权限值
                //     if (this.form.userName === 'iview_admin') {
                //         Cookies.set('access', 0);
                //     } else {
                //         Cookies.set('access', 1);
                //     }
                //     // this.$router.push({
                //     //     name: 'home_index'
                //     // });
                // }
            });
        }
    }
};
</script>

