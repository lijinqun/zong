import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {routers, otherRouter, appRouter} from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import Cookies from 'js-cookie';
import 'iview/dist/styles/iview.css';
import goods from '@/store/goods';
import order from '@/store/order';

import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
import zhTLocale from 'iview/src/locale/lang/zh-TW';
import {getcascadedList}from "./views/api/api.js";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
const mergeTW = Object.assign(zhTLocale, locales['zh-TW']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);
Vue.locale('zh-TW', mergeTW);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    console.log('to:' + to.name);
    console.log('from:' + from.name);
    console.log('next:' + next.name);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') {  // 判断当前是否是锁定状态
        next(false);
        router.replace({
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        if (!Cookies.get('user') && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('user') && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            let newrouter=[];
            let allrouter=appRouter;
            store.state.routers=[];
            getcascadedList().then(response => {
             
                if(response.code=='200'&&response.data!=null){
                    store.state.orgMenuList = response.data;
                    for (var i = 0; i < response.data.length; i++) {
                        for (var k = 0; k < allrouter.length; k++) {
                            if(response.data[i].name==allrouter[k].title){
                                newrouter.push(allrouter[k])

                            }
                        }
                    }
                    store.state.routers=[otherRouter, ...newrouter]
                    appRouter.splice(0,appRouter.length);
                    for (var g = 0; g < newrouter.length; g++) {
                        let newarr={};
                        newarr.newrouters=newrouter[g];
                        store.commit('updateapprouterdata',newarr);
                    }
                    Util.toDefaultPage([otherRouter, ...newrouter], to.name, router, next);
                    store.commit('updateMenulist', newrouter);
                }else{
                     Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
                      Cookies.remove('user');
                      Cookies.remove('access');
                      next({
                        name: 'login'
                        });
                     
                   // this.router.push({
                   //      name: 'login'
                   //      });
                     }
                
            })

            // if (Util.getRouterObjByName([otherRouter, ...appRouter], to.name).access !== undefined) {  // 判断用户是否有权限访问当前页
            //     if (Util.getRouterObjByName([otherRouter, ...appRouter], to.name).access === parseInt(Cookies.get('access'))) {
            //         Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);  // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
            //     } else {
            //         router.replace({
            //             name: 'error_401'
            //         });
            //         next();
            //     }
            // } else {
            //     Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
            // }
        }
    }
    iView.LoadingBar.finish();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
// 状态管理
const store = new Vuex.Store({
    state: {
        routers: [
            otherRouter,
            ...appRouter
        ],
        menuList: [],
        orgMenuList: [],
        tagsList: [...otherRouter.children],
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ],  // 面包屑数组
        openedSubmenuArr: [],  // 要展开的菜单数组
        menuTheme: '', // 主题
        theme: '',
        cachePage: [],
        lang: '',
        isFullScreen: false,
        dontCache: ['text-editor'],  // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    getters: {

    },
    mutations: {
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        increateTag (state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
        },
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            router.push({
                name: 'home_index'
            });
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList (state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.theme = mainTheme;
        },
        lock (state) {
            Cookies.set('locking', '1');
        },
        unlock (state) {
            Cookies.set('locking', '0');
        },
        setMenuList (state, menulist) {
            state.menuList = menulist;
        },
        updateapprouterdata(state,newrouter){
            // 添加菜单
            // appRouter.splice(0,0,newrouter.newrouters);
            appRouter.push(newrouter.newrouters);
        },


        // updateMenulist (state,newrouterarray) {
        updateMenulist (state, newrouterarray) {
            console.log(state);
            console.log('orgMenuList:' + JSON.stringify(state.orgMenuList));
            console.log(newrouterarray);
            if (newrouterarray == null) {
                console.log('newrouterarray is null')
                return;
            }
            //debugger
            let accessCode = parseInt(Cookies.get('access'));
            let menuList = [];
            let orgMenuList = state.orgMenuList;
            newrouterarray.forEach((item, index) => {
            // appRouter.forEach((item, index) => {
                //debugger
                if (item.access !== undefined) {
                    if (Util.showThisRoute(item.access, accessCode)) {
                        if (item.children.length === 1) {
                            menuList.push(item);
                        } else {
                            let len = menuList.push(item);
                            let childrenArr = [];
                            childrenArr = item.children.filter(child => {
                                if (child.access !== undefined) {
                                    if (child.access === accessCode) {
                                        return child;
                                    }
                                } else {
                                    return child;
                                }
                            });
                            menuList[len - 1].children = childrenArr;
                        }
                    }
                } else {
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (Util.showThisRoute(child.access, accessCode)) {
                                    return child;
                                }
                            } else {
                                return child;
                            }
                        });
                        let newChildArr = [];
                        for (var i = 0; i < orgMenuList.length; i++) {
                            for (var j = 0; j < orgMenuList[i].children.length; j++) {
                                var childMenu = orgMenuList[i].children[j];
                                for (var k = 0; k < childrenArr.length; k++) {
                                    //console.log('menu:' + childMenu.name + ' ' + childrenArr[k].title);
                                    if(childMenu.name==childrenArr[k].title){
                                        newChildArr.push(childrenArr[k])
                                        console.log('menu:' + childMenu.name + ' ' + childrenArr[k].title);
                                    }
                                }
                            }
                        }
                        let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                        handledItem.children =  newChildArr;//childrenArr;//
                        //console.log('state.orgChildArr:' + JSON.stringify(childrenArr));
                        //console.log('state.newChildArr:' + JSON.stringify(newChildArr));
                        menuList.splice(len - 1, 1, handledItem);
                    }
                }
            });
            state.menuList = menuList;
            console.log('state.menuList:' + JSON.stringify(state.menuList));
            console.log('state.routers:' + state.routers)
        },



        // updateMenulist (state) {
        //     let accessCode = parseInt(Cookies.get('access'));
        //     let menuList = [];
        //     appRouter.forEach((item, index) => {
        //         if (item.access !== undefined) {
        //             if (Util.showThisRoute(item.access, accessCode)) {
        //                 if (item.children.length === 1) {
        //                     menuList.push(item);
        //                 } else {
        //                     let len = menuList.push(item);
        //                     let childrenArr = [];
        //                     childrenArr = item.children.filter(child => {
        //                         if (child.access !== undefined) {
        //                             if (child.access === accessCode) {
        //                                 return child;
        //                             }
        //                         } else {
        //                             return child;
        //                         }
        //                     });
        //                     menuList[len - 1].children = childrenArr;
        //                 }
        //             }
        //         } else {
        //             if (item.children.length === 1) {
        //                 menuList.push(item);
        //             } else {
        //                 let len = menuList.push(item);
        //                 let childrenArr = [];
        //                 childrenArr = item.children.filter(child => {
        //                     if (child.access !== undefined) {
        //                         if (Util.showThisRoute(child.access, accessCode)) {
        //                             return child;
        //                         }
        //                     } else {
        //                         return child;
        //                     }
        //                 });
        //                 let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
        //                 handledItem.children = childrenArr;
        //                 menuList.splice(len - 1, 1, handledItem);
        //             }
        //         }
        //     });
        //     state.menuList = menuList;
        // },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang (state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        handleFullScreen (state) {
            let main = document.body;
            if (state.isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                }
            }
        },
        changeFullScreenState (state) {
            state.isFullScreen = !state.isFullScreen;
        }
    },
    actions: {

    },
    modules: {
        goods,
        order
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        //console.log('.....................mounted.............................');
        this.$store.commit('updateMenulist');
        // 全屏相关
        document.addEventListener('fullscreenchange', () => {
            this.$store.commit('changeFullScreenState');
        });
        document.addEventListener('mozfullscreenchange', () => {
            this.$store.commit('changeFullScreenState');
        });
        document.addEventListener('webkitfullscreenchange', () => {
            this.$store.commit('changeFullScreenState');
        });
        document.addEventListener('msfullscreenchange', () => {
            this.$store.commit('changeFullScreenState');
        });
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
