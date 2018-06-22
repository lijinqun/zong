import Vue from 'vue'
import Router from 'vue-router'
import { getAppID, getOpenIdByCode, register, getUserInfo, getJssdk, getServerUrl } from './../api'
import tools from './../utils'

// 懒加载组件引入
const Home = () => import('@/views/home') // 首页
const Myself = () => import('@/views/myself') // 我的
const CustomerIntroduce = () => import('@/views/customerIntroduce') // 会员权益
const SelfSetting = () => import('@/views/selfSetting') // 个人设置
const BaseInfo = () => import('@/views/baseInfo') // 基本资料
const ShopSetting = () => import('@/views/shopSetting') // 店铺设置/店长设置
const AccountCenter = () => import('@/views/accountCenter') // 结算中心
const OfflineOrder = () => import('@/views/offlineOrder') // 商家线下销售
const Cart = () => import('@/views/cart') // 购物车
const NearBy = () => import('@/views/nearBy') // 附近
const ShoppingMail = () => import('@/views/shoppingMail') // 附近
const BeyondPay = () => import('@/views/beyondPay') // 超出限额
const UserChild = () => import('@/views/userChild') // 粉丝
const Transfer = () => import('@/views/transfer') // 支付/转账
const TransferBefore = () => import('@/views/transferBefore') // 支付/转账之前
const Balance = () => import('@/views/balance') // 支付/转账
const Recharge = () => import('@/views/recharge') // 支付/转账
const MerchantCenter = () => import('@/views/merchantCenter') //
const ShopCenter = () => import('@/views/shopCenter') //
const OrderList = () => import('@/views/orderList') //
const Goodsdetails = () => import('@/views/goodsdetails') // 商品详情
const Payorder = () => import('@/views/payorder') // 生成订单
const Address = () => import('@/views/address') // 地址)
// const Address = () => import('@/views/address/address.vue') // 地址)
// const Compile = () => import('@/views/address/compile.vue') // 地址)
// const CreateAddress = () => import('@/views/address/createAddress.vue') // 地址
const OrderDetails = () => import('@/views/orderDetails') // 订单详情
const Withdraw = () => import('@/views/withdraw') // 提现
const Withdrawbalance = () => import('@/views/withdrawbalance') //
const SweepCode = () => import('@/views/sweepCode') //
const SweepHistory = () => import('@/views/sweepHistory') // 转账历史
const SweepMerchantCode = () => import('@/views/sweepMerchantCode') //
const MerchantCodePay = () => import('@/views/merchantCodePay') //
const MerchantInfoSetting = () => import('@/views/merchantInfoSetting') //
const BusinessHistory = () => import('@/views/businessHistory') // 商家历史Newsnotice
const Goods = () => import('@/views/goods') // 商品
const Newsnotice = () => import('@/views/newsnotice') // 消息通知
const NewsnoticeDetails = () => import('@/views/newsnoticeDetails') // 消息详情
const Myshop = () => import('@/views/myshop') // 我的小店
const Myshopsetting = () => import('@/views/myshopsetting') // 我的小店设置
const ShopCenterHistory = () => import('@/views/shopCenterHistory') //
const BalanceDetails = () => import('@/views/balanceDetails') // 余额明细
const ReturnGoods = () => import('@/views/ReturnGoods') // 退货
const Sign = () => import('@/views/sign') // 签到
const Qrcode = () => import('@/views/qrcode') // 二维码
const Phone = () => import('@/views/phone')
const City = () => import('@/views/city')
const Recordcontent = () => import('@/views/recordcontent')
const Merchantshop = () => import('@/views/merchantshop')
const Paypassword = () => import('@/views/paypassword')
const Updatepaypassword = () => import('@/views/updatepaypassword')
const IntegralRule = () => import('@/views/integralRule')
const Manageshop = () => import('@/views/manageshop')
const MerchantorderList = () => import('@/views/merchantorderList')
const MerchantGoods = () => import('@/views/merchantGoods')
const Order = () => import('@/views/order')// 订单页
const Selling = () => import('@/views/selling')// 热卖
const Product = () => import('@/views/product')// 热卖
const Community = () => import('@/views/community')// 社区置换
const Communityto = () => import('@/views/communityto')// 社区置换
const Claim = () => import('@/views/claim')// 认领
const Conversion = () => import('@/views/conversion')// 认领
const Confirm = () => import('@/views/confirm')// 认领
const New = () => import('@/views/new')// 新增认领
const Newclaim = () => import('@/views/newclaim')// 新增出让
const Successful = () => import('@/views/successful')// 付款成功
const Discipline = () => import('@/views/discipline')// 我的出让认领列表
const Img = () => import('@/views/img')// 我的出让认领列表
const Img2 = () => import('@/views/img2')// 我的出让认领列表
const Changepaypassword = () => import('@/views/changepaypassword')// 修改密码
const Forgotpassword = () => import('@/views/forgotpassword')// 忘记密码
const Replacement = () => import('@/views/replacement')// 我的
const Details = () => import('@/views/details')// 我的
const DetailsSecond = () => import('@/views/detailsSecond')// 我的
const DisciplineMy = () => import('@/views/disciplineMy')// 我的
// const Payment = () => import('@/views/payment')// 付款
const Withdrawal = () => import('@/views/withdrawal')// 余额提现
const Phonepp = () => import('@/views/phonepp')// 
const Login = () => import('@/views/login')// 手机验证码登录
const Registered = () => import('@/views/registered')// 注册
const Passwordlogin = () => import('@/views/passwordlogin')// 账号密码登录
const Changeloginpassword = () => import('@/views/changeloginpassword')// 账号密码登录












Vue.use(Router)

// 路由目录
const router2 = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/myself',
      name: 'Myself',
      component: Myself
    },
    {
      path: '/customerItd',
      name: 'CustomerIntroduce',
      component: CustomerIntroduce
    },
    {
      path: '/selfSetting',
      name: 'SelfSetting',
      component: SelfSetting
    },
    {
      path: '/baseInfo',
      name: 'BaseInfo',
      component: BaseInfo
    },
    {
      path: '/shopSetting',
      name: 'ShopSetting',
      component: ShopSetting
    },
    {
      path: '/accountCenter',
      name: 'AccountCenter',
      component: AccountCenter
    },
    {
      path: '/offlineOrder',
      name: 'OfflineOrder',
      component: OfflineOrder
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/nearBy',
      name: 'NearBy',
      component: NearBy
    },
    {
      path: '/shoppingMail',
      name: 'ShoppingMail',
      component: ShoppingMail
    },
    {
      path: '/beyondPay',
      name: 'BeyondPay',
      component: BeyondPay
    },
    {
      path: '/userChild',
      name: 'UserChild',
      component: UserChild
    },
    {
      path: '/transfer/:toId',
      name: 'Transfer',
      component: Transfer
    },
    {
      path: '/transferBefore',
      name: 'TransferBefore',
      component: TransferBefore
    },
    {
      path: '/balance',
      name: 'Balance',
      component: Balance
    },
    {
      path: '/recharge',
      name: 'Recharge',
      component: Recharge
    },
    {
      path: '/merchantCenter',
      name: 'MerchantCenter',
      component: MerchantCenter
    },
    {
      path: '/shopCenter',
      name: 'ShopCenter',
      component: ShopCenter
    },
    {
      path: '/orderList/:id',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/goodsdetails/:id',
      name: 'Goodsdetails',
      component: Goodsdetails
    },
    {
      path: '/payorder',
      name: 'Payorder',
      component: Payorder
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    // {
    //   path: '/compile',
    //   name: 'Compile',
    //   component: Compile
    // },
    // {
    //   path: '/createAddress',
    //   name: 'CreateAddress',
    //   component: CreateAddress
    // }

    {
      path: '/orderDetails/:id',
      name: 'OrderDetails',
      component: OrderDetails
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      component: Withdraw
    },
    {
      path: '/withdrawbalance',
      name: 'Withdrawbalance',
      component: Withdrawbalance
    },
    {
      path: '/sweepCode',
      name: 'SweepCode',
      component: SweepCode
    },
    {
      path: '/sweepHistory',
      name: 'SweepHistory',
      component: SweepHistory
    },
    {
      path: '/sweepMerchantCode',
      name: 'SweepMerchantCode',
      component: SweepMerchantCode
    },
    {
      path: '/merchantCodePay/:id',
      name: 'MerchantCodePay',
      component: MerchantCodePay
    },
    {
      path: '/merchantInfoSetting',
      name: 'MerchantInfoSetting',
      component: MerchantInfoSetting
    },
    {
      path: '/businessHistory',
      name: 'BusinessHistory',
      component: BusinessHistory
    },
    {
      path: '/goods/:id',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/newsnotice/:id',
      name: 'Newsnotice',
      component: Newsnotice
    },
    {
      path: '/newsnoticeDetails/:id',
      name: 'NewsnoticeDetails',
      component: NewsnoticeDetails
    },
    {
      path: '/myshop',
      name: 'Myshop',
      component: Myshop
    },
    {
      path: '/myshopsetting',
      name: 'Myshopsetting',
      component: Myshopsetting
    },
    {
      path: '/shopCenterHistory/:type',
      name: 'ShopCenterHistory',
      component: ShopCenterHistory
    },
    {
      path: '/balanceDetails/:id',
      name: 'BalanceDetails',
      component: BalanceDetails
    },
    {
      path: '/returnGoods/:id',
      name: 'ReturnGoods',
      component: ReturnGoods
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/qrcode',
      name: 'Qrcode',
      component: Qrcode
    },
    {
      path: '/phone',
      name: 'Phone',
      component: Phone
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/recordcontent/:type',
      name: 'Recordcontent',
      component: Recordcontent
    },
    {
      path: '/merchantshop',
      name: 'Merchantshop',
      component: Merchantshop
    },
    {
      path: '/paypassword',
      name: 'Paypassword',
      component: Paypassword
    },
    {
      path: '/updatepaypassword',
      name: 'Updatepaypassword',
      component: Updatepaypassword
    },
    {
      path: '/integralRule',
      name: 'IntegralRule',
      component: IntegralRule
    },
    {
      path: '/manageshop',
      name: 'Manageshop',
      component: Manageshop
    },
    {
      path: '/merchantorderList/:id',
      name: 'MerchantorderList',
      component: MerchantorderList
    },
    {
      path: '/merchantGoods/:id',
      name: 'MerchantGoods',
      component: MerchantGoods
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Selling/:id',
      name: 'selling',
      component: Selling
    },
    {
      path: '/Product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/Community',
      name: 'community',
      component: Community
    },
    {
      path: '/Communityto',
      name: 'communityto',
      component: Communityto
    },
    {
      path: '/Claim/:id',
      name: 'claim',
      component: Claim
    },
    {
      path: '/Conversion/:id',
      name: 'conversion',
      component: Conversion
    },
    {
      path: '/Confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/New',
      name: 'new',
      component: New
    },
    {
      path: '/Newclaim',
      name: 'newclaim',
      component: Newclaim
    },
    {
      path: '/Successful',
      name: 'successful',
      component: Successful
    },
    {
      path: '/Discipline',
      name: 'discipline',
      component: Discipline
    },
    {
      path: '/Img',
      name: 'img',
      component: Img
    },
    {
      path: '/Img2',
      name: 'img',
      component: Img2
    },
    {
      path: '/Changepaypassword',
      name: 'changepaypassword',
      component: Changepaypassword
    },
    {
      path: '/Forgotpassword',
      name: 'forgotpassword',
      component: Forgotpassword
    },
    {
      path: '/Replacement',
      name: 'replacement',
      component: Replacement
    },
    {
      path: '/Details/:id',
      name: 'details',
      component: Details
    },
    {
      path: '/DetailsSecond/:id',
      name: 'detailsSecond',
      component: DetailsSecond
    },
    {
      path: '/DisciplineMy',
      name: 'disciplineMy',
      component: DisciplineMy
    },
    // {
    //   path: '/Payment',
    //   name: 'payment',
    //   component: Payment
    // },
    {
      path: '/Withdrawal',
      name: 'withdrawal',
      component: Withdrawal
    },
    {
      path: '/Phonepp',
      name: 'phonepp',
      component: Phonepp
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Registered',
      name: 'registered',
      component: Registered
    },
    {
      path: '/Passwordlogin',
      name: 'passwordlogin',
      component: Passwordlogin
    },
    {
      path: '/Changeloginpassword',
      name: 'changeloginpassword',
      component: Changeloginpassword
    }
  ]
})
// 路由拦截器
// 跳转路由前，需要做什么，to：目的路由，from：当前路由，next：跳转路由
router2.beforeEach((to, from, next) => {
  console.log('.................router2.........................');
  // 判断是否为本地测试环境
  if (process.env.NODE_ENV === 'local') {
    console.log('process.env.NODE_ENV');
    if (to.name == 'login' || to.name == 'registered' || to.name == 'passwordlogin') {
      console.log('if (to.fullPath.indexOf(myself))');
      next();
      return;
    }
    if (sessionStorage.getItem('userName')) {
      console.log('inner user');
      next();
    } else {
      console.log('inner login');
      next({
        name: 'login'
      });
      return;
    }
    console.log(tools.getQueryParams())
    // sessionStorage.setItem('user', '{"country":"中国","province":"广东","city":"珠海","openid":"ocBij08f1Nm_1vcb5zDLg_O4meys","sex":1,"nickname":" 蛟哥®","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/1FicuI1tGmGYOD9cXCKMVAXvp9fMc5AzSibl333kaxzrs7YTlpJCvfZOzdw41PiaU4T6l7vcRObYCoLgnicbziaMibBw/132","language":"zh_CN","privilege":[]}')
    // sessionStorage.setItem('userInfo', '{"is_locked":true,"open_id":"ocBij08f1Nm_1vcb5zDLg_O4meys","locked_date":null,"login_date":"2018-02-26 19:15:46","maxBuyPoint":20001.00,"zip_code":null,"password":null,"login_failure_count":null,"balance":32932900000.130000000000,"parent_Id":14,"id":9,"register_ip":null,"create_date":"2018-02-26 18:40:49","achMoney":0.00,"area":null,"image":"http://thirdwx.qlogo.cn/mmopen/vi_32/1FicuI1tGmGYOD9cXCKMVAXvp9fMc5AzSibl333kaxzrs7YTlpJCvfZOzdw41PiaU4T6l7vcRObYCoLgnicbziaMibBw/132","buyPoint":0.00,"birth":null,"login_ip":null,"memberNo":"123456789","balancePayAmount":138000.00,"application_notice":null,"name":null,"focus_time":"2018-02-26 18:15:30","commissionPayAmount":0.00,"coin":0.0000,"gender":null,"incomeCoin":29606.5792,"city":null,"point":1210756.027569800834,"member_rank":null,"is_enabled":true,"identity":2,"nickname":"%EE%94%93+%E8%9B%9F%E5%93%A5%C2%AE","apply_id":null,"disabled":false,"balanceWithdrawAmount":0.00,"attention_state":1,"email":null,"introduction":null,"withdrawal_amount":null,"amount":null,"address":null,"ach_temp_id":null,"mobile":13434450121,"consumeCoin":3289.6200,"successfully_amount":null,"commissionType":1,"memberType":3,"modify_date":"2018-04-02 09:35:05","age":null,"username":" 蛟哥®"}')
    sessionStorage.setItem('user', '{"country":"中国","province":"广东","city":"珠海","openid":"ocBij08f1Nm_1vcb5zDLg_O4meys","sex":1,"nickname":" 李金全","headimgurl":"http://thirdwx.qlogo.cn/mmopen/Y1LicqvW94Qo3ofpkQd4K5jXFbxDPLqVhWEf17uFrGgwpibqia7UHl3dczXOILqUmaMicTsqOmC1ibxe3F9AHdeBhypVmJAdIeDAU/132","language":"zh_CN","privilege":[]}')
    sessionStorage.setItem('userInfo', '{"is_locked":true,"open_id":"ocBij08f1Nm_1vcb5zDLg_O4meys","locked_date":null,"login_date":"2018-02-26 19:15:46","maxBuyPoint":20001.00,"zip_code":null,"password":null,"login_failure_count":null,"balance":32932900000.130000000000,"parent_Id":14,"id":24402,"register_ip":null,"create_date":"2018-02-26 18:40:49","achMoney":0.00,"area":null,"image":"http://thirdwx.qlogo.cn/mmopen/Y1LicqvW94Qo3ofpkQd4K5jXFbxDPLqVhWEf17uFrGgwpibqia7UHl3dczXOILqUmaMicTsqOmC1ibxe3F9AHdeBhypVmJAdIeDAU/132","buyPoint":0.00,"birth":null,"login_ip":null,"memberNo":"123456789","balancePayAmount":138000.00,"application_notice":null,"name":null,"focus_time":"2018-02-26 18:15:30","commissionPayAmount":0.00,"coin":0.0000,"gender":null,"incomeCoin":29606.5792,"city":null,"point":1210756.027569800834,"member_rank":null,"is_enabled":true,"identity":2,"nickname":"%EE%94%93+%E8%9B%9F%E5%93%A5%C2%AE","apply_id":null,"disabled":false,"balanceWithdrawAmount":0.00,"attention_state":1,"email":null,"introduction":null,"withdrawal_amount":null,"amount":null,"address":null,"ach_temp_id":null,"mobile":13434450121,"consumeCoin":3289.6200,"successfully_amount":null,"commissionType":1,"memberType":3,"modify_date":"2018-04-02 09:35:05","age":null,"username":"李金全"}')
    // sessionStorage.setItem('userInfo', '{"achMoney": null,"ach_temp_id": null,"address": null,"age": null,"amount": 0,"application_notice": null,"apply_id": null,"area": null,"attention_state": 0,"balance": 0,"balancePayAmount": 0,"balanceWithdrawAmount": 0,"birth": null,"buyPoint": 0,"city": null,"coin": 0,"commissionPayAmount": 0,"commissionType": 1,"consumeCoin": 0,"create_date": "2018-05-31 13:34:30","createdBy": null,"disabled": false,"email": "","focus_time": null,"gender": null,"id": 24429,"identity": 2,"image": null,"incomeCoin": 0,"introduction": null,"is_enabled": true,"is_locked": false,"locked_date": null,"login_date": "2018-05-31 13:34:30","login_failure_count": 0,"login_ip": "127.0.0.1","maxBuyPoint": 2000000,"memberEndDate": null,"memberNo": "678657507","memberType": 1,"member_rank": null,"mobile": "13434450121","modify_date": null,"name": null,"nickname": "李金全","oldOpenId": null,"open_id": null,"parent_Id": 0,"password": "9B278481DFC9CD70A08A9C4D21A0A7F9AB59B0C79EEBD31418CBF46D70D222B8496CF7BC694CD9DA","point": 0,"register_ip": "127.0.0.1","successfully_amount": null,"tradePassword": null,"updatedBy": null,"upgradePaidAmount": null,"username": null,"visible": 1,"withdrawal_amount": null,"zip_code": null,}')
    tools.routerHIstory(to, from)
    next()
  } else {
    tools.routerHIstory(to, from)
    next();
    if (to.name == 'login' || to.name == 'registered' || to.name == 'passwordlogin') {
      console.log('if (to.fullPath.indexOf(myself))');
      next();
      return;
    }
    console.log('userName:' + sessionStorage.getItem('userName'));
    if (sessionStorage.getItem('userName')) {
      console.log('inner user');
      next();
    } else {
      console.log('inner login');
      next({
        name: 'login'
      });
      return;
    }
  }
})

export default router2
