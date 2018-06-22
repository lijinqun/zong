import Main from './views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['./views/login.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['./views/error_page/404.vue'], resolve);
    }
};

export const page401 = {
    path: '/401',
    meta: {
        title: '401-权限不足'
    },
    name: 'error_401',
    component: resolve => {
        require(['./views/error_page/401.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: resolve => {
        require(['./views/error_page/500.vue'], resolve);
    }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => {
        require(['./views/form/article-publish/preview.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['./views/main_components/locking-page.vue'], resolve);
    }
};
export const print = {
    path: '/print',
    name: 'print',
    component: resolve => {
        require(['./views/print/print.vue'], resolve);
    }
};
export const printPerson = {
    path: '/printPerson',
    name: 'printPerson',
    component: resolve => {
        require(['./views/print/printPerson.vue'], resolve);
    }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        {
            path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => {
                require(['./views/home/home.vue'], resolve);
            }
        },
        {
            path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => {
                require(['./views/own-space/own-space.vue'], resolve);
            }
        },
        {
            path: 'order/:order_id', title: '订单详情', name: 'order_info', component: resolve => {
                require(['./views/advanced-router/component/order-info.vue'], resolve);
            }
        },  // 用于展示动态路由
        {
            path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => {
                require(['./views/advanced-router/component/shopping-info.vue'], resolve);
            }
        },  // 用于展示带参路由
        {
            path: 'message', title: '消息中心', name: 'message_index', component: resolve => {
                require(['./views/message/message.vue'], resolve);
            }
        },
        // {
        //     path: 'bsdetails/:id', title: '合作商家详情', name: 'businessdetails', component: resolve => {
        //         require(['./views/cccec/businessdetails.vue'], resolve);
        //     }
        // },
//         {
//             path: 'orderdetails/:id', title: '订单详情', name: 'orderdetails', component: resolve => {
//                 require(['./views/cccec/order/orderdetails.vue'], resolve);
//             }
//         },
        // {
        //     path: 'commissiondetails/:type/:id', title: '提成详情', name: 'commissiondetails', component: resolve => {
        //         require(['./views/cccec/commissiondetails.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'bindingwechat/:id', title: '绑定微信昵称', name: 'bindingwechat', component: resolve => {
        //         require(['./views/cccec/bindingwechat.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'bindingpeople/:id', title: '绑定推荐人', name: 'bindingpeople', component: resolve => {
        //         require(['./views/cccec/bindingpeople.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'bindingarea/:id', title: '绑定小区', name: 'bindingarea', component: resolve => {
        //         require(['./views/cccec/bindingarea.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'bindinginn/:id', title: '绑定菜驿站', name: 'bindinginn', component: resolve => {
        //         require(['./views/cccec/bindinginn.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'matchingaddress', title: '匹配地址', name: 'matchingaddress', component: resolve => {
        //         require(['./views/cccec/matchingaddress.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'extensionbindingwechat/:id',
        //     title: '推广人员绑定微信昵称',
        //     name: 'extensionbindingwechat',
        //     component: resolve => {
        //         require(['./views/cccec/extensionbindingwechat.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'bdparent/:id', title: '绑定上级用户', name: 'bdparent', component: resolve => {
        //         require(['./views/cccec/bdparent.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'peopleSatisfactionDetails/:id',
        //     title: '详情',
        //     name: 'peopleSatisfactionDetails',
        //     component: resolve => {
        //         require(['./views/cccec/peopleSatisfactionDetails.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'new3', title: '测试页面3', name: 'new3', icon: 'edit', component: resolve => {
        //         require(['./views/cccec/new3.vue'], resolve);
        //     }
        // },
        // {
        //     path: 'new2', title: '测试页面2', name: 'new2', icon: 'edit', component: resolve => {
        //         require(['./views/cccec/new2.vue'], resolve);
        //     }
        // }

        {
            path: 'bindingparentpeople', title: '绑定父级人员', name: 'bindingparentpeople', icon: 'edit', component: resolve => {
                require(['./views/cccec/bindingparentpeople.vue'], resolve);
            }
        },
        {
             path: 'setupinformation/:id', title: '上传', name: 'setupinformation', icon: 'edit', component: resolve => {
                    require(['./views/cccec/setupinformation.vue'], resolve);
                }
        },
        {
             path: 'ueditordata', title: '富文本框', name: 'ueditordata', icon: 'edit', component: resolve => {
                    require(['./views/cccec/ueditordata.vue'], resolve);
                }
        },
        {
             path: 'moreimg', title: '多图上传', name: 'moreimg', icon: 'edit', component: resolve => {
                    require(['./views/cccec/moreimg.vue'], resolve);
                }
        },
        {
             path: 'gooddetails/:id', title: '商品详情', name: 'gooddetails', icon: 'edit', component: resolve => {
                    require(['./views/cccec/gooddetails.vue'], resolve);
                }
        },
        {
            path: 'orderdetails/:id', title: '订单详情', name: 'orderdetails', component: resolve => {
                require(['./views/cccec/order/orderdetails.vue'], resolve);
            }
        },
         {
                path: 'articledetails/:id', title: '文章详情', name: 'articledetails', icon: 'edit', component: resolve => {
                    require(['./views/cccec/articledetails.vue'], resolve);
                }
        },{
                path: 'editcategorydetails/:id', title: '商品类别详情', name: 'editcategorydetails', icon: 'edit', component: resolve => {
                    require(['./views/cccec/editcategorydetails.vue'], resolve);
                }
        },{
                path: 'editlabeldetails/:id', title: '商品标签详情', name: 'editlabeldetails', icon: 'edit', component: resolve => {
                    require(['./views/cccec/editlabeldetails.vue'], resolve);
                }
        },
        {
            path: 'shopdetails/:id', title: '商铺详情', name: 'shopdetails', component: resolve => {
                require(['./views/cccec/shop/shopdetails.vue'], resolve);
            }
        },
        {
            path: '/ccces/operation/balancepage', title: '余额列表', name: 'balancepage', icon: 'edit', component: resolve => {
                require(['./views/cccec/operation/balancepage.vue'], resolve);
            }
        },
        {
            path: '/ccces/operation/pointpage', title: '积分列表', name: 'pointpage', icon: 'edit', component: resolve => {
                require(['./views/cccec/operation/pointpage.vue'], resolve);
            }
        },
        {
            path: '/ccces/operation/coinpage', title: '珠宝列表', name: 'coinpage', icon: 'edit', component: resolve => {
                require(['./views/cccec/operation/coinpage.vue'], resolve);
            }
        }

    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export let appRouter = [
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: resolve => { require(['./views/access/access.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/cccecbackstage',
    //     icon: 'ios-grid-view',
    //     name: 'cccecbackstage',
    //     title: '指派供应商',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'quote', title: '指派供应商', name: 'quote', icon: 'edit', component: resolve => {
    //                 require(['./views/cccec/quote.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/cccecpeople',
    //     icon: 'ios-grid-view',
    //     name: 'cccecpeople',
    //     title: '销售推广人员',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'extension', title: '销售推广人员', name: 'extension', icon: 'edit', component: resolve => {
    //                 require(['./views/cccec/extension.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/cccecbusiness',
    //     icon: 'ios-grid-view',
    //     name: 'cccecbusiness',
    //     title: '合作商家',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'business', title: '合作商家', name: 'business', icon: 'edit', component: resolve => {
    //                 require(['./views/cccec/business.vue'], resolve);
    //             }
    //         },
    //     ]
    // },
    // {
    //     path: '/ccceccommission',
    //     icon: 'ios-grid-view',
    //     name: 'ccceccommission',
    //     title: '用户提成',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'commission', title: '用户提成', name: 'commission', icon: 'edit', component: resolve => {
    //                 require(['./views/cccec/commission.vue'], resolve);
    //             }
    //         },
    //     ]
    // },
    // {
    //     path: '/cccecrelation',
    //     icon: 'ios-grid-view',
    //     name: 'cccecrelation',
    //     title: '人员管理',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'relation', title: '人员管理', name: 'relation', icon: 'edit', component: resolve => {
    //                 require(['./views/cccec/relation.vue'], resolve);
    //             }
    //         },
    //     ]
    // },

    // {
    //     path: '/cccecorderpage',
    //     icon: 'ios-grid-view',
    //     name: 'cccecorderpage',
    //     title: '订单管理',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'orderpage', title: '订单管理', name: 'orderpage', icon: 'edit', component: resolve => {
    //                 require(['./views/cccec/orderpage.vue'], resolve);
    //             }
    //         },
    //     ]
    // },
    // {
    //     path: '/cccecmoney',
    //     icon: 'ios-grid-view',
    //     name: 'cccecmoney',
    //     title: '提现管理',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'money', title: '提现管理', name: 'money', icon: 'edit', component: resolve => {
    //                 require(['./views/cccec/money.vue'], resolve);
    //             }
    //         },
    //     ]
    // },
    // {
    //     path: '/satisfaction',
    //     icon: 'ios-grid-view',
    //     name: 'Satisfaction',
    //     title: '满意度管理',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'partnerSatisfaction',
    //             title: '合作商家满意度',
    //             name: 'partnerSatisfaction',
    //             icon: 'edit',
    //             component: resolve => {
    //                 require(['./views/cccec/partnerSatisfaction.vue'], resolve);
    //             }
    //         },
    //         {
    //             path: 'peopleSatisfaction',
    //             title: '员工满意度',
    //             name: 'peopleSatisfaction',
    //             icon: 'edit',
    //             component: resolve => {
    //                 require(['./views/cccec/peopleSatisfaction.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/goods',
    //     icon: 'ios-grid-view',
    //     name: 'goods',
    //     title: '商品管理',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'goodsList',
    //             title: '商品列表',
    //             name: 'goodsList',
    //             icon: 'edit',
    //             component: resolve => {
    //                 require(['./views/cccec/goods/goodsList.vue'], resolve);
    //             }
    //         }, {
    //             path: 'importGoods',
    //             title: '导入商品',
    //             name: 'importGoods',
    //             icon: 'edit',
    //             component: resolve => {
    //                 require(['./views/cccec/goods/importGoods.vue'], resolve);
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/plan',
    //     icon: 'ios-grid-view',
    //     name: 'plan',
    //     title: '计划管理',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'platformOrder',
    //             title: '平台总订单',
    //             name: 'platformOrder',
    //             icon: 'edit',
    //             component: resolve => {
    //                 require(['./views/cccec/plan/platformOrder.vue'], resolve);
    //             }
    //         } ,
    //         {
    //             path: 'groupOrder',
    //             title: '平台分订单',
    //             name: 'groupOrder',
    //             icon: 'edit',
    //             component: resolve => {
    //                 require(['./views/cccec/plan/groupOrder.vue'], resolve);
    //             }
    //         }
    //     ]
    // }


    {
        path: '/cccecrelation',
        icon: 'ios-grid-view',
        name: 'cccecrelation',
        title: '人员管理',
        //access: 0,
        component: Main,
        children: [
            {
                path: 'peoplelist', title: '人员管理', name: 'peoplelist', icon: 'edit', component: resolve => {
                    require(['./views/cccec/peoplelist.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/setupdata',
        icon: 'ios-grid-view',
        name: 'setupdata',
        title: '图片管理',
        component: Main,
        children: [
            {
                path: 'installlogo', title: '图片管理', name: 'installlogo', icon: 'edit', component: resolve => {
                    require(['./views/cccec/installlogo.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/goodsdata',
        icon: 'ios-grid-view',
        name: 'goodsdata',
        title: '商品管理',
        component: Main,
        children: [
            {
                path: 'goodslist', title: '商品列表', name: 'goodslist', icon: 'edit', component: resolve => {
                    require(['./views/cccec/goodslist.vue'], resolve);
                }
            },
            {
                path: 'ngoodslist', title: '商家商品列表', name: 'ngoodslist', icon: 'edit', component: resolve => {
                    require(['./views/cccec/ngoodslist.vue'], resolve);
                }
            },
            {
                path: 'savegoods', title: '新增商品', name: 'savegoods', icon: 'edit', component: resolve => {
                    require(['./views/cccec/screen.vue'], resolve);
                }
            },
//          {
//              path: 'editcategory', title: '商品类别', name: 'editcategory', icon: 'edit', component: resolve => {
//                  require(['./views/cccec/editcategory.vue'], resolve);
//              }
//          },
             {
                path: 'editcategorypage', title: '商品类别', name: 'editcategorypage', icon: 'edit', component: resolve => {
                    require(['./views/cccec/editcategorypage.vue'], resolve);
                }
            },
            {
                path: 'editlabel', title: '商品标签', name: 'editlabel', icon: 'edit', component: resolve => {
                    require(['./views/cccec/editlabelpage.vue'], resolve);
                }
            },
            {
                path: 'editsupplier', title: '商品供应商', name: 'editsupplier', icon: 'edit', component: resolve => {
                    require(['./views/cccec/editsupplierpage.vue'], resolve);
                }
            },
            {
                path: 'edittype', title: '商品类型', name: 'edittype', icon: 'edit', component: resolve => {
                    require(['./views/cccec/edittypepage.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/balance',
        icon: 'ios-grid-view',
        name: 'balance',
        title: '提现管理',
        //access: 0,
        component: Main,
        children: [
            {
                path: 'balancewithdrawals', title: '提现管理', name: 'balancewithdrawals', icon: 'edit', component: resolve => {
                    require(['./views/cccec/balancewithdrawals.vue'], resolve);
                }
            },
        ]
    },
    {
        path: '/cccecorderpage',
        icon: 'ios-grid-view',
        name: 'cccecorderpage',
        title: '订单管理',
        component: Main,
        children: [
            {
                path: 'orderpage', title: '订单列表', name: 'orderpages', icon: 'edit', component: resolve => {
                    require(['./views/cccec/order/orderpages.vue'], resolve);
                }
            },
            {
                path: 'norderpage', title: '非自营订单列表', name: 'norderpage', icon: 'edit', component: resolve => {
                    require(['./views/cccec/order/norderpages.vue'], resolve);
                }
            },
            {
                path: 'returnorderpage', title: '退货列表', name: 'returnorderpage', icon: 'edit', component: resolve => {
                    require(['./views/cccec/order/returnorderpage.vue'], resolve);
                }
            },
            {
                path: 'orderdetailslist', title: '订单详情列表',name: 'orderdetailslist', icon: 'edit', component: resolve=>{
                    require(['./views/cccec/order/orderdetailslist.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/articlepage',
        icon: 'ios-grid-view',
        name: 'articlepage',
        title: '文章管理',
        component: Main,
        children: [
            {
                path: 'articlelist', title: '文章列表', name: 'articlelist', icon: 'edit', component: resolve => {
                    require(['./views/cccec/articlelist.vue'], resolve);
                }
            },
            {
                path: 'insertarticle', title: '新增文章', name: 'insertarticle', icon: 'edit', component: resolve => {
                    require(['./views/cccec/insertarticle.vue'], resolve);
                }
            }
        ]
    },
    {
        path: '/shop',
        icon: 'ios-grid-view',
        name: 'shop',
        title: '商铺管理',
        component: Main,
        children: [
            {
                path: 'shoplist', title: '商铺列表', name: 'shoplist', icon: 'edit', component: resolve => {
                    require(['./views/cccec/shop/shoplist.vue'], resolve);
                }
            }
        ]
    },
    {
       path: '/user',
       icon: 'ios-grid-view',
       name: 'user',
       title: '用户管理',
       component: Main,
       children: [
           {
               path: 'people', title: '用户列表', name: 'people', icon: 'edit', component: resolve => {
                   require(['./views/cccec/people.vue'], resolve);
               }
           }
       ]
   },
   {
       path: '/operation',
       icon: 'ios-grid-view',
       name: 'operation',
       title: '运营中心',
       component: Main,
       children: [
           {
               path: '/ccces/operation/optuser', title: '区域账号', name: 'optuser', icon: 'edit', component: resolve => {
                   require(['./views/cccec/operation/optuser.vue'], resolve);
               }
           },
           {
               path: '/ccces/operation/merchant', title: '区域商家', name: 'merchant', icon: 'edit', component: resolve => {
                   require(['./views/cccec/operation/merchant.vue'], resolve);
               }
           },
           {
               path: '/ccces/operation/order', title: '区域订单', name: 'order', icon: 'edit', component: resolve => {
                   require(['./views/cccec/operation/order.vue'], resolve);
               }
           },
           {
               path: '/ccces/operation/peopleshare', title: '区域提成', name: 'peopleshare', icon: 'edit', component: resolve => {
                   require(['./views/cccec/operation/peopleshare.vue'], resolve);
               }
           }
       ]
   },
   {
       path: '/community',
       icon: 'ios-grid-view',
       name: 'community',
       title: '置换管理',
       component: Main,
       children: [
           {
               path: '/ccces/community/shopTransfer',
                title: '出让列表', name: 'shopTransfer', 
                icon: 'edit', 
                component: resolve => {
                   require(['./views/cccec/community/shopTransfer.vue'], resolve);
                }
           },
           {
               path: '/ccces/community/shopalaim',
                title: '认领列表', name: 'shopalaim', 
                icon: 'edit', 
                component: resolve => {
                   require(['./views/cccec/community/shopalaim.vue'], resolve);
                } 
           },
           {
               path: '/ccces/community/tradrecord',
                title: '交易记录', name: 'tradrecord', 
                icon: 'edit', 
                component: resolve => {
                   require(['./views/cccec/community/tradrecord.vue'], resolve);
                } 
           }
       ]
   }
];

// 所有上面定义的路由都要写在下面的routers里
export let routers = [
    print,
    printPerson,
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page401,
    page404
];
