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

const Playqrcode = () => import('@/views/playqrcode/index.vue')//小福霸游戏
const Record = () => import('@/views/playqrcode/record.vue')//小福霸游戏
const Talkqrcode = () => import('@/views/talkqrcode/index.vue')// 二维码
// const Talkqrcode = () => import('@/views/talkqrcode/luckywheel.vue')// 二维码
// const Luckywheel = () => import('@/views/talkqrcode/luckywheel.vue')// Z转盘
const Code = () => import('@/views/code')// 二维码
const Skincare = () => import('@/views/skincare')// 二维码

// 智能云贵   components文件夹
const My = () => import('@/cloudark/my')//智能云柜
const Personalcenter = () => import('@/cloudark/personalcenter')//个人中心
const Buynow = () => import('@/cloudark/buynow')//
const Game = () => import('@/cloudark/game')//游戏
const Immediately = () => import('@/cloudark/immediately')//立即购买
const Businesslevel = () => import('@/cloudark/businesslevel')//店长等级
const Reference = () => import('@/cloudark/reference')//店长等级参照表
const Specialsupply = () => import('@/cloudark/specialsupply')//店长等级参照表

// 优惠券模块
const CouponsList = () => import('@/cloudark/coupons/couponsList.vue')  //优惠券店长等级参照表
const CouponGame = () => import('@/cloudark/coupons/couponGame.vue')  //优惠券转盘游戏
const IntegralInsufficient = () => import('@/cloudark/coupons/integralInsufficient.vue')//优惠券抽奖链豆不足
const DrawSorry = () => import('@/cloudark/coupons/drawSorry.vue')//优惠券抽奖没抽中
const Allcoupons = () => import('@/cloudark/coupons/allcoupons.vue')//我的页面进入的优惠券列表
const Share = () => import('@/cloudark/share/index.vue')//乐分享
const Credit = () => import('@/cloudark/credit/index.vue')//链商信用
const Results = () => import('@/cloudark/results/index.vue')//团队业绩





Vue.use(Router)

// 路由目录
const router = new Router({
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
      path: '/Playqrcode',
      name: 'playqrcode',
      component: Playqrcode
    },
    {
      path: '/Talkqrcode',
      name: 'talkqrcode',
      component: Talkqrcode
    },
    {
      path: '/Code',
      name: 'code',
      component: Code
    },
    {
      path: '/My',
      name: 'my',
      component: My
    },
    {
      path: '/Personalcenter',
      name: 'personalcenter',
      component: Personalcenter
    },
    {
      path: '/Buynow',
      name: 'buynow',
      component: Buynow
    },
    {
      path: '/Game',
      name: 'game',
      component: Game
    },
    {
      path: '/Skincare',
      name: 'skincare',
      component: Skincare
    },
    {
      path: '/Immediately',
      name: 'immediately',
      component: Immediately
    },
    {
      path: '/Record',
      name: 'record',
      component: Record
    },
    {
      path: '/Businesslevel',
      name: 'businesslevel',
      component: Businesslevel
    },
    {
      path: '/Reference',
      name: 'reference',
      component: Reference
    },
    {
      path: '/Specialsupply',
      name: 'specialsupply',
      component: Specialsupply
    },
    {
      path: '/CouponsList',
      name: 'couponsList',
      component: CouponsList
    },
    {
      path: '/CouponGame/:id',
      name: 'couponGame',
      component: CouponGame
    },
    {
      path: '/IntegralInsufficient',
      name: 'integralInsufficient',
      component: IntegralInsufficient
    },
    {
      path: '/DrawSorry',
      name: 'drawSorry',
      component: DrawSorry
    },
    {
      path: '/Allcoupons',
      name: 'allcoupons',
      component: Allcoupons
    },
    {
      path: '/Share',
      name: 'share',
      component: Share
    },
    {
      path: '/Credit',
      name: 'credit',
      component: Credit
    },
    {
      path: '/Results',
      name: '/results',
      component: Results
    }
  ]
})
// 路由拦截器
// 跳转路由前，需要做什么，to：目的路由，from：当前路由，next：跳转路由
router.beforeEach((to, from, next) => {
  document.title = '从众链商新零售';
  // 判断是否为本地测试环境
  if (process.env.NODE_ENV === 'local') {
    // console.log('process.env.NODE_ENV');
    if (to.name == 'phonepp') {
      console.log('if (to.fullPath.indexOf(myself))');
      next();
      return;
    }
    // console.log(tools.getQueryParams())
    // sessionStorage.setItem('user', '{"country":"中国","province":"广东","city":"珠海","openid":"ocBij08f1Nm_1vcb5zDLg_O4meys","sex":1,"nickname":" 蛟哥®","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/1FicuI1tGmGYOD9cXCKMVAXvp9fMc5AzSibl333kaxzrs7YTlpJCvfZOzdw41PiaU4T6l7vcRObYCoLgnicbziaMibBw/132","language":"zh_CN","privilege":[]}')
    // sessionStorage.setItem('userInfo', '{"is_locked":true,"open_id":"ocBij08f1Nm_1vcb5zDLg_O4meys","locked_date":null,"login_date":"2018-02-26 19:15:46","maxBuyPoint":20001.00,"zip_code":null,"password":null,"login_failure_count":null,"balance":32932900000.130000000000,"parent_Id":14,"id":9,"register_ip":null,"create_date":"2018-02-26 18:40:49","achMoney":0.00,"area":null,"image":"http://thirdwx.qlogo.cn/mmopen/Y1LicqvW94Qo3ofpkQd4K5jXFbxDPLqVhWEf17uFrGgwpibqia7UHl3dczXOILqUmaMicTsqOmC1ibxe3F9AHdeBhypVmJAdIeDAU/132","buyPoint":0.00,"birth":null,"login_ip":null,"memberNo":"123456789","balancePayAmount":138000.00,"application_notice":null,"name":null,"focus_time":"2018-02-26 18:15:30","commissionPayAmount":0.00,"coin":0.0000,"gender":null,"incomeCoin":29606.5792,"city":null,"point":1210756.027569800834,"member_rank":null,"is_enabled":true,"identity":2,"nickname":"%EE%94%93+%E8%9B%9F%E5%93%A5%C2%AE","apply_id":null,"disabled":false,"balanceWithdrawAmount":0.00,"attention_state":1,"email":null,"introduction":null,"withdrawal_amount":null,"amount":null,"address":null,"ach_temp_id":null,"mobile":13434450121,"consumeCoin":3289.6200,"successfully_amount":null,"commissionType":1,"memberType":6,"modify_date":"2018-04-02 09:35:05","age":null,"username":"*?"}')
    sessionStorage.setItem('user', '{"country":"中国","province":"广东","city":"珠海","openid":"o3uTC1Qm5kmPWbr0JdUoKpxZ4YJ8","sex":1,"nickname":" 蛟哥®","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/1FicuI1tGmGYOD9cXCKMVAXvp9fMc5AzSibl333kaxzrs7YTlpJCvfZOzdw41PiaU4T6l7vcRObYCoLgnicbziaMibBw/132","language":"zh_CN","privilege":[]}')
    sessionStorage.setItem('userInfo', '{"is_locked":true,"open_id":"o3uTC1Qm5kmPWbr0JdUoKpxZ4YJ8","locked_date":null,"login_date":"2018-02-26 19:15:46","maxBuyPoint":20001.00,"zip_code":null,"password":null,"login_failure_count":null,"balance":32932900000.130000000000,"parent_Id":0,"id":24402,"register_ip":null,"create_date":"2018-02-26 18:40:49","achMoney":0.00,"area":null,"image":"http://thirdwx.qlogo.cn/mmopen/Y1LicqvW94Qo3ofpkQd4K5jXFbxDPLqVhWEf17uFrGgwpibqia7UHl3dczXOILqUmaMicTsqOmC1ibxe3F9AHdeBhypVmJAdIeDAU/132","buyPoint":0.00,"birth":null,"login_ip":null,"memberNo":"123456789","balancePayAmount":138000.00,"application_notice":null,"name":null,"focus_time":"2018-02-26 18:15:30","commissionPayAmount":0.00,"coin":0.0000,"gender":null,"incomeCoin":29606.5792,"city":null,"point":1210756.027569800834,"member_rank":null,"is_enabled":true,"identity":2,"nickname":"%EE%94%93+%E8%9B%9F%E5%93%A5%C2%AE","apply_id":null,"disabled":false,"balanceWithdrawAmount":0.00,"attention_state":1,"email":null,"introduction":null,"withdrawal_amount":null,"amount":null,"address":null,"ach_temp_id":null,"mobile":13434450121,"consumeCoin":3289.6200,"successfully_amount":null,"commissionType":1,"memberType":6,"modify_date":"2018-04-02 09:35:05","age":null,"username":"*?"}')
    tools.routerHIstory(to, from)
    next()
  } else {
    tools.routerHIstory(to, from)
    if (to.name == 'phonepp') {
      console.log('if (to.fullPath.indexOf(myself))');
      next();
      return;
    }
    document.title = '从众链商新零售';
    let redFlag = tools.getQueryParams().redFlag;
    let comm = tools.getQueryParams().community;
    console.log('window.location.href:' + window.location.href);
    console.log('getQueryParams:' + JSON.stringify(tools.getQueryParams()));
    console.log('to.fullPath:' + to.fullPath + '.::');
    // if (redFlag == "1") {
    //   var redirectUrl = "http://1.zouwei.hk/zouwei/order/?community=" + comm + "#" + to.fullPath;
      
    //   if (to.fullPath.indexOf('transfer') > -1) {
    //     redirectUrl = "http://1.zouwei.hk/zouwei/order/?community=" + comm;
    //     console.log("redirectUrl transfer:" + redirectUrl);
    //   }
    //   if (to.fullPath == '/') {
    //     redirectUrl = "http://1.zouwei.hk/zouwei/order/?community=" + comm;
    //     console.log("redirectUrl /:" + redirectUrl);
    //   }
    //   if (to.fullPath.indexOf('merchantCodePay') > -1) {
    //     redirectUrl = "http://1.zouwei.hk/zouwei/order/?community=" + comm;
    //     console.log("redirectUrl /:" + redirectUrl);
    //   }
    //   console.log("redirectUrl :" + redirectUrl);
    //   window.location = redirectUrl;
    //   return;
    // }
    // 判断是否已经登陆过
    if (sessionStorage.getItem('user')) {
      // alert('tools.getQueryParams().community---登陆过了' + tools.getQueryParams().community)
      // alert('tools.getQueryParams().code---登陆过了:' + tools.getQueryParams().code)
    // alert('已登陆过')
      const user = JSON.parse(sessionStorage.getItem('user'))
      getUserInfo(user.openid).then(response => {
        if (response.data) {
          sessionStorage.setItem('userInfo', JSON.stringify(response.data))
          let noncestr = ''
          let ticket = ''
          let timestamp = ''
          let memberNo = response.data.memberNo
          console.log(to)
          if (to.path !== '/myshop' || to.name !== 'Goodsdetails' || to.name !== 'NewsnoticeDetails') {
          // getJssdk().then(___response => {
          //   // tools.settingWechatShare(getAppID(), response.data[0].noncestr, response.data[0].ticket, response.data[0].timestamp, getServerUrl(), memberNo)
          //   noncestr = ___response.data[0].noncestr
          //   ticket = ___response.data[0].ticket
          //   timestamp = ___response.data[0].timestamp
          //   tools.settingWechat(getAppID(), this.noncestr, this.ticket, this.timestamp, () => {
          //     // 添加微信朋友分享
          //     tools.menuShareAppMessage(this.shopname || '从众链商', this.introduction || ' 链接世界 共享未来  愿天下没有销不出去的好产品', getServerUrl() + '/zouwei/order/#/myshop?community=' + memberNo, getServerUrl() + '/zouwei/order/icon.jpg', () => {})
          //     // 添加微信朋友圈分享
          //     tools.menuShareTimeline(this.shopname || '从众链商', getServerUrl() + '/zouwei/order/#/myshop?community=' + memberNo, getServerUrl() + '/zouwei/order/icon.jpg', () => {})
          //   })
          // })
            // } else {
            getJssdk().then(___response => {
            // tools.settingWechatShare(getAppID(), response.data[0].noncestr, response.data[0].ticket, response.data[0].timestamp, getServerUrl(), memberNo)
              noncestr = ___response.data[0].noncestr
              ticket = ___response.data[0].ticket
              timestamp = ___response.data[0].timestamp
              memberNo = response.data.memberNo
              tools.settingWechat(getAppID(), noncestr, ticket, timestamp, () => {
                tools.menuShareAppMessage('从众链商新零售', ' 链接世界 共享未来  愿天下没有销不出去的好产品', getServerUrl() + '/zouwei/order/index.html?community=' + memberNo + '#' + to.fullPath, getServerUrl() + '/zouwei/order/icon.jpg', () => {})
                tools.menuShareTimeline('从众链商新零售', getServerUrl() + '/zouwei/order/index.html?community=' + memberNo + '#' + to.fullPath, getServerUrl() + '/zouwei/order/icon.jpg', () => {})
              })
              var url = window.location.href;//encodeURIComponent(window.location.href);
              console.log('encodeURIComponent url1:' + url + ' indexof:' + url.indexOf('oldopenid'));
              // alert('encodeURIComponent url1:' + url + ' indexof:' + url.indexOf('oldopenid'));
              if (url.indexOf('oldopenid') > -1) {
                var aurl = url.replace('oldopenid', 'derecatedopenid');
                console.log('derecatedopenid url:' + aurl);
                // 切割url 去掉oldopenid
                var opt = window.location.href.split('?')[1];
                var href = opt.replace('oldopenid', 'derecatedopenid');
                // window.location = aurl;
                window.history.pushState({}, 0, 'http://' + window.location.host + this.dirpath + '/?' + href);
              }
            })
          }
          next()
        } else {
        //  alert('openid出错')
          sessionStorage.clear()
          localStorage.clear()
          // 获取当前url, 该url必须是公众号上的白名单，否则会出现response_type错误
          const url = encodeURIComponent(window.location.href)
          // 发起微信正式授权
          //window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${getAppID()}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
        }
      })
    } else {
    // 检测路由中是否有parentID
      if (tools.getQueryParams().community) {
        sessionStorage.setItem('parentMemberNo', tools.getQueryParams().community)
      }
      // alert('tools.getQueryParams().community---没登录:' + tools.getQueryParams().community)
      // alert('tools.getQueryParams().code---没登录:' + tools.getQueryParams().code)
      // 获取授权后返回的url中的code
      if (tools.getQueryParams().code) {
        console.log(tools.getQueryParams().code)
        // 通过code获取用户的openID
        getOpenIdByCode(tools.getQueryParams().code).then(response => {
          if (response.data.errcode == 40001){
            const url = encodeURIComponent(window.location.href)
            // 发起微信正式授权
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${getAppID()}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
            return
          }
        // alert('成功授权')
        // 保存微信返回的用户信息
          sessionStorage.setItem('user', JSON.stringify(response.data))
          // 保存openid
          sessionStorage.setItem('openid', response.data.openid)
          // 检测用户是否注册
          getUserInfo(response.data.openid).then(_res => {
            if (_res.data === null) {
              //用手机号码绑定跳转
              // if (sessionStorage.getItem('login') == null || sessionStorage.getItem('login') == undefined) {
              //   next({
              //     name: 'phonepp'
              //   });
              // }
              sessionStorage.setItem('login', response.data.openid);
              
            //  alert('未注册')

              //var oldOpenId = tools.getQueryParams().oldopenid;
              //console.log('get redirect oldOpenId:' + oldOpenId);
              register(response.data.openid,'', response.data.nickname, sessionStorage.getItem('parentMemberNo') || '', response.data.headimgurl).then(_response => {
                getUserInfo(response.data.openid).then(__response => {
                  
                  sessionStorage.setItem('userInfo', JSON.stringify(__response.data))
                  let memberNo = __response.data.memberNo
                  let noncestr = ''
                  let ticket = ''
                  let timestamp = ''
                  getJssdk().then(___response => {
                  // tools.settingWechatShare(getAppID(), response.data[0].noncestr, response.data[0].ticket, response.data[0].timestamp, getServerUrl(), memberNo)
                    noncestr = ___response.data[0].noncestr
                    ticket = ___response.data[0].ticket
                    timestamp = ___response.data[0].timestamp
                    tools.settingWechat(getAppID(), noncestr, ticket, timestamp, () => {
                      tools.menuShareAppMessage('从众链商新零售', ' 链接世界 共享未来  愿天下没有销不出去的好产品', getServerUrl() + this.dirpath + '/index.html?community=' + memberNo, getServerUrl() + '/cccec/order/icon.jpg', () => {})
                      tools.menuShareTimeline('从众链商新零售', getServerUrl() + this.dirpath + '/index.html?community=' + memberNo, getServerUrl() + '/cccec/order/icon.jpg', () => {})
                    })
                    /*
                    var url = window.location.href;//encodeURIComponent(window.location.href);
                    console.log('encodeURIComponent url2:' + url + ' indexof:' + url.indexOf('oldopenid'));
                    // alert('encodeURIComponent url2:' + url + ' indexof:' + url.indexOf('oldopenid'));
                    
                    if (url.indexOf('oldopenid') > -1) {
                      var aurl = url.replace('oldopenid', 'derecatedopenid');
                      console.log('derecatedopenid url:' + aurl);
                      // 切割url 去掉oldopenid
                      var opt = window.location.href.split('?')[1];
                      var href = opt.replace('oldopenid', 'derecatedopenid');
                      // window.location = aurl;
                      window.history.pushState({}, 0, 'http://' + window.location.host + this.dirpath + '/?' + href);
                    }*/
                  })
                  next()
                })
              })
            } else {
            //  alert('已注册')
              // 同步用户修改头像或者昵称
              var usr = _res.data;
              usr.image = response.data.headimgurl;
              usr.username = response.data.nickname;
              sessionStorage.setItem('userInfo', JSON.stringify(usr))
              let memberNo = _res.data.memberNo
              let noncestr = ''
              let ticket = ''
              let timestamp = ''
              // let shaValue = ''
              // let full = ''
              getJssdk().then(___response => {
                noncestr = ___response.data[0].noncestr
                ticket = ___response.data[0].ticket
                timestamp = ___response.data[0].timestamp
                tools.settingWechat(getAppID(), noncestr, ticket, timestamp, () => {
                  tools.menuShareAppMessage('从众链商新零售', ' 链接世界 共享未来  愿天下没有销不出去的好产品', getServerUrl() + '/zouwei/order/index.html?community=' + memberNo, getServerUrl() + '/zouwei/order/icon.jpg', () => {})
                  tools.menuShareTimeline('从众链商新零售', getServerUrl() + '/zouwei/order/index.html?community=' + memberNo, getServerUrl() + '/zouwei/order/icon.jpg', () => {})
                })
                var url = window.location.href;//encodeURIComponent(window.location.href);
                console.log('encodeURIComponent url3:' + url + ' indexof:' + url.indexOf('oldopenid'));
                // alert('encodeURIComponent url3:' + url + ' indexof:' + url.indexOf('oldopenid'));
                if (url.indexOf('oldopenid') > -1) {
                  var aurl = url.replace('oldopenid', 'derecatedopenid');
                  console.log('derecatedopenid url:' + aurl);
                  // 切割url 去掉oldopenid
                  var opt = window.location.href.split('?')[1];
                  // var href = opt.split('&')[1]
                  var href = opt.replace('oldopenid', 'derecatedopenid');
                  // window.location = aurl;
                  window.history.pushState({}, 0, 'http://' + window.location.host + this.dirpath + '/?' + href);
                }
              // full = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + window.location.href
              // shaValue = sha1(full)
              // wx.config({
              //   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              //   appId: getAppID(), // 必填，公众号的唯一标识
              //   timestamp: timestamp, // 必填，生成签名的时间戳
              //   nonceStr: noncestr, // 必填，生成签名的随机串
              //   signature: shaValue, // 必填，签名，见附录1
              //   jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              // })
              // wx.ready(function () {
              //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
              //   // 分享给朋友
              //   wx.onMenuShareAppMessage({
              //     title: '从众链商', // 分享标题
              //     desc: ' 链接世界 共享未来  愿天下没有销不出去的好产品', // 分享描述
              //     link: getServerUrl() + '/zouwei/order/index.html?community=' + memberNo,
              //     // 获取未付款订单, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              //     imgUrl: getServerUrl() + '/zouwei/order/icon.jpg', // 分享图标
              //     type: '', // 分享类型,music、video或link，不填默认为link
              //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              //     success: function () { // 用户确认分享后执行的回调函数
              //     },
              //     cancel: function () {
              //       // 用户取消分享后执行的回调函数
              //     }
              //   })
              //   // 分享朋友圈
              //   wx.onMenuShareTimeline({
              //     title: '从众链商', // 分享标题
              //     link: getServerUrl() + '/zouwei/order/index.html?community=' + memberNo,
              //     // 获取未付款订单, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              //     imgUrl: getServerUrl() + '/zouwei/order/icon.jpg', // 分享图标
              //     success: function () {
              //       // 用户确认分享后执行的回调函数
              //     },
              //     cancel: function () {
              //       // 用户取消分享后执行的回调函数
              //     }
              //   })
              // })
              })
              // var url = encodeURIComponent(window.location.href);
              // console.log('encodeURIComponent url:' + url);
              // var aurl = url.replace('oldopenid', 'derecatedopenid');
              // console.log('derecatedopenid url:' + aurl);
              // window.location = aurl;
              next()
            }
          })
        })
      } else {
      // 获取当前url, 该url必须是公众号上的白名单，否则会出现response_type错误
        const url = encodeURIComponent(window.location.href)
        // 发起微信正式授权
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${getAppID()}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
      }
    }
  }
})

export default router
