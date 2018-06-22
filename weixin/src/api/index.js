// 引入依赖包
import { ajax } from './config'
import config from './../config'
import tools from './../utils'
import { MP } from './map.js'

// 配置根接口地址
// let serverApiUrl = ''
// let serverUrl = ''
// let appID = ''
// let appSecret = ''
// // export const imgserverUrl = 'http://ccc.cliantech.com/chuangshi'

// // if (process.env.NODE_ENV === 'production') {
// //   appID = 'wx9493d225821813a5'
// //   appSecret = '5f3b3c68ca0f9f5bdf9c6730ffb8151c'
// //   serverApiUrl = 'http://1.zouwei.hk/chuangshi'
// //   serverUrl = 'http://1.zouwei.hk'
// // } else if (process.env.NODE_ENV === 'development') {
//   appID = 'wx5192b26feb7c2c04'
//   appSecret = '7508eee8b2430046751c867e5cec85de'
//   // serverApiUrl = 'http://ccc.cliantech.com/chuangshi'
//   // serverUrl = 'http://ccc.cliantech.com'
//   serverApiUrl = 'http://dev.cliantech.com/chuangshi'
//   serverUrl = 'http://dev.cliantech.com'
// }
// **************************   公共路径/参数    **********************************
export const imgserverUrl = config.imgserverUrl
export const getAppID = () => {
  return config.appID
}
export const getServerUrl = () => {
  return config.serverUrl
}
export const getServerApiUrl = () => {
  return config.serverApiUrl
}

// **************************   接口列表    **********************************

// 根据授权的code获取用户的openID
export const getOpenIdByCode = (code) => {
  const params = {
    code: code,
    appId: config.appID,
    appSecret: config.appSecret
  }
  return ajax('/weixin/member/getOpenIdByCode', 'get', params)
}

// 用户注册
// export const register = (openId, username, parentMemberNo, headimgurl) => {
//   const params = {
//     openId: openId,
//     username: username,
//     parentMemberNo: parentMemberNo || '',
//     headimgurl: headimgurl
//   }
//   return ajax('/weixin/member/register', 'get', params)
// }

export const register = (openId, oldOpenId, username, parentMemberNo, headimgurl) => {
  const params = {
    openId: openId,
    username: username,
    parentMemberNo: parentMemberNo || '',
    headimgurl: headimgurl,
    oldOpenId: oldOpenId
  }
  return ajax('/weixin/member/register', 'get', params)
}

// 获取jssdk加密必要信息
export const getJssdk = () => {
  const params = {
    url: 'getJssdk'
  }
  return ajax('/weixin/member/getJssdk', 'get', params)
}

// 通过openid获取用户数据
export const getUserInfo = (openid) => {
  const params = {
    open_id: openid || 0
  }
  return ajax('/weixin/member/get', 'get', params)
}

// 通过openid获取用户数据
export const getUserInfoByNo = (memberNo) => {
  const params = {
    memberNo: memberNo || 0
  }
  return ajax('/weixin/member/get', 'get', params)
}
// 通过openid获取用户数据
export const getUserInfoById = (id) => {
  const params = {
    id: id || 0
  }
  return ajax('/weixin/member/get', 'get', params)
}

// 会员升级，发起微信支付
export const upgrade = (id, memberType, paymentMode, tradePassword, addressId) => {
  const params = {
    id: id,
    memberType: memberType,
    paymentMode: paymentMode,
    tradePassword: tradePassword || '',
  }
  if(memberType == 2 ){
    params.addressId = addressId
  }
  return ajax('/weixin/member/upgrade', 'get', params)
}

// 线下下单支付
export const buyPoint = (id, point, memberNo, paymentMode, tradePassword) => {
  let params = {}
    params.id = id
    params.point = point
    params.memberNo = memberNo
    params.paymentMode = paymentMode || 1
  if (tradePassword) {
    params.tradePassword = tradePassword
  }
  return ajax('/weixin/member/buyPoint', 'get', params)
}

// 获取粉丝列表
export const getAllChildren = (id, maxLevel) => {
  const params = {
    id: id,
    maxLevel: maxLevel
  }
  return ajax('/weixin/member/getAllChildren', 'get', params)
}
// 粉丝总数
export const getAllChildrenCount = (id) => {
  const params = {
    id: id,
    columns:'id, username, count(child.id) as childCount' ,
    groupBy:'id'
  }
  return ajax('/weixin/member/get', 'get', params)
}


// 获取我的客户
export const getCustomer = (parent_id, pageNumber, pageSize) => {
  const params = {
    parent_id: parent_id,
    pageNumber: pageNumber,
    pageSize: pageSize,
    // maxLevel: maxLevel
    columns:'id, username, memberNo, image'
  }
  return ajax('/weixin/member/page', 'get', params)
}

// 余额转账
export const balanceTransfer = (id, toMemberNo, amount, tradePassword) => {
  let params = {}
  params.id = id
  params.toMemberNo = toMemberNo
  params.amount = amount
  if (tradePassword) {
    params.tradePassword = tradePassword
  }
  return ajax('/weixin/member/balance/transfer', 'get', params)
}

// 珠宝转账
export const coinTransfer = (id, toMemberNo, amount, tradePassword) => {
  let params = {}
  params.id = id
  params.toMemberNo = toMemberNo
  params.amount = amount
  if (tradePassword) {
    params.tradePassword = tradePassword
  }
  return ajax('/weixin/member/coin/transfer', 'get', params)
}

// 商家中心
export const getMerchantSummary = (memberId) => {
  const params = {
    memberId: memberId
  }
  return ajax('/weixin/member/getMerchantSummary', 'get', params)
}

// 店长中心
export const getShopManagerSummary = (memberId) => {
  const params = {
    memberId: memberId
  }
  return ajax('/weixin/member/getShopManagerSummary', 'get', params)
}

// 微信获取排行榜商品
export const getrankingList = (labelid) => {
  const params = {
    'label.id': labelid,
    'status': '1',
    'groupBy': 'spec.goodsId',
    'isOnline': '1',
    'isdel': '0',
    'spec.isdel': '0',
    'orderBy': 'sort desc',
    'columns': 'name,indexImage,id,min(spec.discount) as price,label.id,sort'
  }
  return ajax('/weixin/goods/list', 'get', params)
}

// 微信首页底部热卖商品(带类型)
export const sellingData = () => {
  const params = {
    'cat1Ids': '10,47,48,49,45,44,56,46,25,50',
    'orderBy': 'sales desc',
  }
  return ajax('/weixin/goods/specification/listGroupByCat', 'get', params)
}

// 微信最新上架
export const merchantData = (pageNumber,pageSize) => {
  const params = {
    'isdel': '0',
    'isOnline': '1',
    'status':'1',
    'spec.isdel':'0',
    'columns': 'id,name,indexImage,createdTime,min(spec.discount) as discount',
    'orderBy': 'createdTime desc',
    'pageNumber':pageNumber,
    'pageSize':pageSize,
    'supplier.isDel':0
  }
  return ajax('/weixin/goods/page', 'get', params)
}

// 微信首页发现好货必买清单
export const listingData = (pageNumber, pageSize) => {
  const params = {
    'isdel': '0',
    'isOnline': '1',
    'status': '1',
    'spec.isdel': '0',
    'columns': 'id,name,indexImage,createdTime,min(spec.discount) as discount,merchantId',
    'orderBy': 'createdTime desc',
    'label.name': '热卖',
    'pageNumber': pageNumber,
    'pageSize': pageSize,
    'supplier.isDel': 0,
    'merchantId':0
  }
  return ajax('/weixin/goods/page', 'get', params)
}

// 微信商品类别接口
export const getGoodsCategory = (grade, parentid, ifmerchantId, name_lk) => {
  var params = {}
  if (parentid) {
    params.parentId = parentid
  }
  if (ifmerchantId) {
    if (grade == '1') {
      params.customQuery = '(exists (select 1 from yk_goods_category pp,yk_goods_category p,yk_goods_category_record r,yk_goods g where pp.id = p.parentId and pp.parentId = t.id and r.categoryId = p.id and r.goodsId = g.id and g.merchantId= ' + ifmerchantId + '))'
    } else if (grade == '2') {
      params.customQuery = '(exists (select 1 from yk_goods_category p,yk_goods_category_record r,yk_goods g where p.parentId = t.id and r.categoryId = p.id and r.goodsId = g.id and g.merchantId= ' + ifmerchantId + '))'
    } else if (grade == '3') {
      params.customQuery = '(exists (select 1 from yk_goods_category_record r,yk_goods g where r.categoryId = t.id and r.goodsId = g.id and g.merchantId= ' + ifmerchantId + '))'
    }
  }
  params.grade = grade
  params.pageSize = '1000'
  params.isOnline = '1'
  params.isdel = '0'
  params.orderBy = 'sort asc'
  if (name_lk){
    params['goods.name_lk'] = name_lk;
    params.groupBy = 'id' 
  }

  return ajax('/weixin/goods/category/page', 'get', params)
}

// 热门商品类别
export const getGoodsSelling = (id, pageNumber, pageSize) => {
  var params = {}
  params.isdel = '0';
  params.isOnline = '1';
  params.status = '1';
  params['spec.isdel'] = '0';
  params.columns = 'id,name,indexImage,createdTime,min(spec.discount) as discount';
  params.orderBy = 'createdTime desc';
  params.merchantId = 0;
  params['parent1.id'] = id;
  params.pageNumber = pageNumber;
  params.pageSize = pageSize;
  params['supplier.isDel'] = 0
  return ajax('/weixin/goods/page', 'get', params)
}


// 微信获取商品
export const getGoodsList = (catid, merchantId,isOnline) => {
  let params = {}
  if (catid) {
    params['cat.id'] = catid
  }
  if (merchantId) {
    params.merchantId = merchantId
  }
  if (isOnline) {
    params.isOnline = isOnline
  }
  params.status = '1'
  params.isdel = '0'
  params['spec.isdel'] = '0'
  params.groupBy = 'id'
  params.columns = 'name,indexImage,id,min(spec.discount) as discount,sort,merchantId,isOnline'
  params.orderBy = 'sort asc'
  params['supplier.isDel'] = 0

  return ajax('/weixin/goods/list', 'get', params)
}

// 福霸家族
export const getfubaList = (catid, merchantId, isOnline) => {
  let params = {}
  if (catid) {
    params['cat.id'] = catid
  }
  if (merchantId) {
    params.merchantId = merchantId
  }
  if (isOnline) {
    params.isOnline = isOnline
  }
  params.status = '1'
  params.isdel = '0'
  params['spec.isdel'] = '0'
  params.groupBy = 'id'
  params.columns = 'name,indexImage,id,min(spec.discount) as discount,sort,merchantId,isOnline'
  params.orderBy = 'id asc'
  params['supplier.isDel'] = 0

  return ajax('/weixin/goods/list', 'get', params)
}

// 上下架商品
export const updateGoodsonline = (id,online) => {
  let params = {}
  params.id=id;
  params.isOnline=online;
  return ajax('/weixin/goods/update', 'get', params)
}

// 搜索微信商品
export const searchGoodsList = (data) => {
  const params = {
    'name_lk': data,
    'status': '1',
    'groupBy': 'spec.goodsId',
    'isOnline': '1',
    'isdel': '0',
    'spec.isdel': '0',
    'columns': 'name,indexImage,id,min(spec.discount) as discount',
    'orderBy': 'sort asc'
  }
  return ajax('/weixin/goods/list', 'get', params)
}

// 微信获取商品详情
export const getGoodsDetails = (id) => {
  const params = {
    'id': id,
    'columns': 'id,detail,name,indexImage,id,isOnline,number,updatedTime,status,summary,supplierId,typeId,merchantId,paymentModes'
  }
  return ajax('/weixin/goods/goodsDetail', 'get', params)
}

// 微信获取商品选中规格价格
export const getpricedata = (specValueIds, specLabelIds) => {
  const params = {
    'specValueIds': specValueIds,
    'specLabelIds': specLabelIds
  }
  // return ajax('/weixin/goods/specification/getSpec', 'get', params)
  return ajax('/weixin/goods/specification/get', 'get', params)
}

// 添加购物车
export const addGood = (memberId, goodsId, goodsSpecificationId, quantity, machineId) => {
  const params = {
    'memberId': memberId,
    'goodsId': goodsId,
    'goodsSpecificationId': goodsSpecificationId,
    'quantity': quantity
  }
  if (machineId != 0){
    params.machineId = machineId;
  }
  return ajax('/weixin/cart/item/addGoods', 'get', params)
}

// 获取购物车
export const getGoodCart = (cartmemberId) => {
  const params = {
    'memberId': cartmemberId,
    'goods.isdel': 0,
    'columns': 'id,goodsSpecificationId,merchantId,goodId,quantity,goods.name,goodsSpec.name,merchant.shopName,goods.isdel,goodsSpec.price,goodsSpec.discount,goodsSpec.valueNames,goods.indexImage,goodsSpec.id,goodsSpec.isSingleOrder,goodsSpec.isSinglePaymentMode,goodsSpec.coinPrice,machineId,goods.paymentModes'
  }
  return ajax('/weixin/cart/item/getGroupList', 'get', params)
}

// 获取购物车数量
export const GoodCart = (cartmemberId) => {
  const params = {
    'memberId': cartmemberId,
    'goods.isdel': 0,
    'columns': 'count(*) as totalcount'
  }
  return ajax('/weixin/cart/item/getGroupList', 'get', params)
}

export const updateGoodCart = (memberId, id, quantity) => {
  const params = {
    'memberId': memberId,
    'id': id,
    'quantity': quantity
  }
  return ajax('/weixin/cart/item/update', 'get', params)
}

// 批量删除购物车
export const removeGoodCart = (memberId, goodsids) => {
  const params = {
    'memberId': memberId,
    'id': goodsids
  }
  return ajax('/weixin/cart/item/batchDelete', 'get', params)
}

// 获取地址
export const getaddress = (memberid) => {
  const params = {
    'member_id': memberid,
    'columns': 'id,defaultCheck,disabled,address,member_id,zipNo,mobile,fullAddress,open_id,roomNo,unit,consignee,areaIdLevel1,areaIdLevel2,areaIdLevel3,areaIdLevel4,areaIdLevel5,area2.fullName,area3.fullName,area4.fullName'
  }
  return ajax('/weixin/address/list', 'get', params)
}

// 新增地址
export const saveaddress = (params) => {
  // const params = {
  //   // 'member_id': memberid,
  // }
  return ajax('/weixin/address/save', 'get', params)
}

// 编辑地址
export const updataddress = (params) => {
  // const params = {
  //   // 'member_id': memberid,
  // }
  return ajax('/weixin/address/update', 'get', params)
}
// 修改默认地址
export const updataddress2 = (params) => {
  // const params = {
  //   // 'member_id': memberid,
  // }
  return ajax('/weixin/address/updateDefaultCheck', 'get', params)
}

export const removeaddress = (id) => {
  const params = {
    'id': id
  }
  return ajax('/weixin/address/delete', 'get', params)
}

// 获取省市区
export const getareadata = (params) => {
  return ajax('/weixin/area/list', 'get', params)
}

// 生成订单
// export const saveorder = (memberId, paymentMode, orderList, payonemode, password, cartItemId) => {
//   let params = {}
//   if (payonemode == 1) {
//     params.isSinglePaymentMode = 1
//   }
//   if (password) {
//     params.tradePassword = password
//   }
//   params.memberId = memberId
//   params.paymentMode = paymentMode
//   params.orderList = orderList
//   params.cartItemId = cartItemId
//   return ajax('/weixin/order/createOrder', 'get', params)
// }
// 生成订单
export const saveorder = (memberId, orderList, cartItemId, isSinglePaymentMode, paymentMode) => {
  let params = {}
  params.memberId = memberId
  params.orderList = orderList
  params.cartItemId = cartItemId
  if (isSinglePaymentMode ){
    params.isSinglePaymentMode = isSinglePaymentMode
  }
  if (paymentMode){
    params.paymentMode = paymentMode
  }
  // if (paymentModes) {
  //   params.paymentModes = paymentModes
  // }

  return ajax('/weixin/order/createOrder', 'get', params)
}

// 去支付
export const gopayorder = (memberId, subOrderNo, type, tradePassword) => {
  const params = {
    'openId': memberId,
    'subOrderNo': subOrderNo,
    'paymentMode':type,
    'tradePassword': tradePassword
  }
  return ajax('/weixin/order/payOrder', 'get', params)
}

// 获取订单
export const getorderdata = (params) => {
  // return ajax('/weixin/order/orderList', 'get', params)
  return ajax('/weixin/order/pageWithDetail', 'get', params)
}

// 获取订单数量
export const getorder = (params) => {
  // return ajax('/weixin/order/orderList', 'get', params)
  return ajax('/weixin/order/get', 'get', params)
}




// 订单确认收货
export const confirmorder = (params) => {
  return ajax('/weixin/order/confirmReception', 'get', params)
}

// 获取订单详情
export const getorderdetails = (params) => {
  return ajax('/weixin/order/detail/list', 'get', params)
}

//
export const cancelorder = (params) => {
  return ajax('/weixin/order/cancel', 'get', params)
}

// 订单退货申请
export const refundsgoods = (params) => {
  return ajax('/weixin/return/record/request', 'get', params)
}

// 珠宝提现
export const gowithdraw = (params) => {
  return ajax('/weixin/member/coin/sell', 'get', params)
}

// 余额提现
export const gowithdrawbalance = (params) => {
  return ajax('/weixin/withdraw/record/save', 'get', params)
}
export const getbalancerecord = (params) => {
  return ajax('/weixin/withdraw/record/page', 'get', params)
}

// 余额充值
export const recharge = (id, amount) => {
  const params = {
    id: id,
    amount: amount
  }
  return ajax('/weixin/member/balance/recharge', 'get', params)
}

// 珠宝提现
export const coinSell = (memberId, amount, tradePassword) => {
  const params = {
    memberId: memberId,
    amount: amount,
    tradePassword: tradePassword
  }
  return ajax('/weixin/member/coin/sell', 'get', params)
}

// 查询用户转账-转入记录
export const balanceRecord = (memberId) => {
  const params = {
    columns: 'memberId, name, otherMember.username as otherMemberName, amount, otherMember.image as image, recordTime',
    memberId: memberId,
    type: 4,
    orderBy: 'recordTime desc'
  }
  return ajax('/weixin/member/balance/record/page', 'get', params)
}
// 获取商家订单
export const getMerchantorderdata = (params) => {
  // return ajax('/weixin/order/orderList', 'get', params)
  return ajax('/weixin/order/page', 'get', params)
}
// 获取商家信息
export const getMerchantInfo = (memberId) => {
  const params = {
    memberId: memberId,
    columns: 'allowCoin,businessTypeName,area3.fullName,createdTime,id,memberId,phone,shopName,remarks,status,type,member.username,member.memberNo,member.image,address,businessLicenseImage1,businessLicenseImage2,businessLicenseType,businessEndDate,catId,isdel,isVisiable,legalPersonIdCardImage1,legalPersonIdCardImage2,legalPersonIdCardNum,legelPersonRelationship,licenseName,registerNumber,shopImage1,shopImage2,shopImage3,shopImage4,shortDesc,areaIdLevel1,areaIdLevel2,areaIdLevel3'
  }
  return ajax('/weixin/merchant/get', 'get', params)
}

// 更新商家信息
export const updateMerchantInfo = (params) => {
  return ajax('/weixin/merchant/update', 'get', params)
}

// 保存商家信息
export const saveMerchantInfo = (params) => {
  return ajax('/weixin/merchant/save', 'get', params)
}

// 商家扫码支付
export const payOsoOrder = (memberId, merchantMemberId, amount, paymentMode, tradePassword) => {
  let params = {}
    params.memberId = memberId
    params.merchantMemberId = merchantMemberId
    params.amount = amount
    params.paymentMode = paymentMode // 支付方式，1：微信，2：余额，3：收益珠宝，4：消费珠宝
  if (tradePassword) {
    params.tradePassword = tradePassword
  }
  return ajax('/weixin/order/payOsoOrder', 'get', params)
}

// 查询商家转账-转入记录
export const businessbalanceRecord = (memberId) => {
  const params = {
    columns: 'id,amount,name,ord.amount as orderAmount,recordTime',
    memberId: memberId,
    type: 9,
    orderBy: 'recordTime desc'
  }
  return ajax('/weixin/member/balance/record/list', 'get', params)
}

// 获取图片列表
export const getimglist = (type) => {
  const params = {
    'type': type,
    'orderBy': 'sort asc'
  }
  return ajax('/weixin/adv/list', 'get', params)
}

// 获取标签列表
export const getlabellist = () => {
  const params = {}
  return ajax('/weixin/goods/label/list', 'get', params)
}

// 获取文章分类
export const getarticlesort = (params) => {
  return ajax('/weixin/article/sort/list', 'get', params)
}

// 获取消息通知列表
export const getnoticedata = (params) => {
  return ajax('/weixin/article/list', 'get', params)
}
// 获取消息通知内容
export const getnoticetxt = (params) => {
  return ajax('/weixin/article/get', 'get', params)
}

// 更新小店配置
export const updateshopsetting = (params) => {
  return ajax('/weixin/shop/update', 'post', params, false, true)
}

// 获取小店信息
export const getshopdata = (params) => {
  return ajax('/weixin/shop/get', 'get', params)
}

// 新建小店信息
export const saveshopdata = (params) => {
  return ajax('/weixin/shop/save', 'post', params, false, true)
}

// 获取珠宝历史价格
export const getHistorytPrice = () => {
  const params = {
    columns: 'date,price',
    orderBy: 'date desc',
    pageSize: 20
  }
  return ajax('/weixin/coin/price/page', 'get', params)
}

// 获取珠宝最新价格
export const getLatestPrice = () => {
  return ajax('/weixin/coin/price/getLatestPrice?columns=price,date', 'get')
}

// 修改头部信息
export const setTitle = (t) => {
  // document.title = t
  var i = document.createElement('iframe')
  i.src = '//m.baidu.com/favicon.ico'
  i.style.display = 'none'
  i.onload = function () {
    setTimeout(function () {
      i.remove()
    }, 9)
  }
  document.body.appendChild(i)
}

// 获取总奖励
export const getAllCommissionPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getAllCommissionPage', 'get', params)
}
// 获取今月奖励
export const getThisMonthCommissionPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getThisMonthCommissionPage', 'get', params)
}
// 昨日奖励
export const getLastDayCommissionPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getLastDayCommissionPage', 'get', params)
}
// 累计订单
export const getAllOrderPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getAllOrderPage', 'get', params)
}
// 今月订单
export const getThisMonthOrderPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getThisMonthOrderPage', 'get', params)
}
// 昨天订单
export const getLastDayOrderPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getLastDayOrderPage', 'get', params)
}
// 累计销售
export const getAllSalesPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getAllSalesPage', 'get', params)
}
// 今月销售
export const getThisMonthSalesPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getThisMonthSalesPage', 'get', params)
}
// 昨天销售
export const getLastDaySalesPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getLastDaySalesPage', 'get', params)
}
// 累计链豆
export const getAllPointPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getAllPointPage', 'get', params)
}
// 今月链豆
export const getThisMonthPointPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getThisMonthPointPage', 'get', params)
}
// 昨天链豆
export const getLastDayPointPage = (memberId, pageNumber, pageSize) => {
  const params = {
    memberId: memberId,
    pageNumber: pageNumber,
    pageSize: pageSize
  }
  return ajax('/weixin/member/getLastDayPointPage', 'get', params)
}

// 日期格式化
export function dateFormat (date, formats) {
  let format = formats
  
  if (date != 'Invalid Date') {
    var o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));}
    for (var k in o)
      {if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));}
    return format
  }
  return ''

}

// 获取商家列表
// export const getMerchantPage = (pageNumber, pageSize, type, status, areaIdLevel2) => {
//   let params = {}
//   if (type) {
//     params.catId = type
//   }
//   if (areaIdLevel2) {
//     params.areaIdLevel2 = areaIdLevel2
//   }
//   params.status = 1
//   params.isVisiable = 1
//   params.orderBy = 'sort asc'
//   params.pageNumber = pageNumber
//   params.pageSize = pageSize
//   return ajax('/weixin/merchant/page', 'get', params)
// }

export const getMerchantPage = (pageNumber, pageSize, type, status, areaIdLevel2, longitude, latitude) => {
  let params = {}
  if (type) {
    params.catId = type
  }
  if (areaIdLevel2) {
    params.areaIdLevel2 = areaIdLevel2
  }
  params.status = 1
  params.isVisiable = 1
  params.orderBy = 'sort asc'
  params.pageNumber = pageNumber
  params.pageSize = pageSize
  params.longitude = longitude
  params.latitude = latitude

  return ajax('/weixin/merchant/vicinity', 'get', params)
}


// 搜搜商家列表
export const shopName_lk = (shopName_lk) => {
  let params = {
    shopName_lk: shopName_lk
  }
  
  return ajax('/weixin/merchant/page', 'get', params)
}

// 获取商家列表的类型
export const getMerchantcatlist = () => {
  const params = {
    orderBy: 'sort asc',
    columns: 'id,sort,name,remarks'
  }
  return ajax('/weixin/merchant/cat/list', 'get', params)
}

// 保存商家信息
export const saveMerchant = (params) => {
  return ajax('/weixin/merchant/save', 'post', params, false, true)
}

// 更新商家信息
export const updateMerchant = (params) => {
  return ajax('/weixin/merchant/update', 'post', params, false, true)
}

// 查询用户余额明细
export const balanceDetails = (memberId, pageNumber, pageSize, type) => {
  let params = {}
  params = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    columns: 'memberId, name,type,otherMemberId, otherMember.username as otherMemberName, otherMember.memberNo as otherMemberNo, amount, otherMember.image as otherimage, recordTime,member.memberNo as memberNo,member.image as memberimage,member.username as memberName',
    memberId: memberId,
    orderBy: 'recordTime desc'
  }
  if (type) {
    let typedata = "(t.type = '" + type[0] + "'"
    for (var i = 1; i < type.length; i++) {
      typedata += " or t.type = '" + type[i] + "'"
    }
    typedata += ')';
    params.customQuery = typedata
  }

  return ajax('/weixin/member/balance/record/page', 'get', params)
}

// 查询珠宝转账明细
export const coinDetails = (memberId, pageNumber, pageSize, type) => {
  let params = {}
  params = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    columns: 'memberId, name,type,otherMemberId, otherMember.username, otherMember.memberNo, amount, otherMember.image, recordTime,member.memberNo,member.image,member.username',
    memberId: memberId,
    orderBy: 'recordTime desc',
    'type_in': type
  }
  return ajax('/weixin/member/coin/record/page', 'get', params)
}

// 查询珠宝明细
export const coinTypeDetails = (memberId, pageNumber, pageSize, coinType) => {
  let params = {}
  params = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    columns: 'memberId, name,type,otherMemberId, otherMember.username, otherMember.memberNo, amount, otherMember.image, recordTime,member.memberNo,member.image,member.username,coinType',
    memberId: memberId,
    orderBy: 'recordTime desc',
    'coinType': coinType
  }
  return ajax('/weixin/member/coin/record/page', 'get', params)
}

// 是否已经签到
export const isSigned = (memberId) => {
  let params = {}
  params = {
    memberId: memberId
  }
  return ajax('/weixin/member/isSigned', 'get', params)
}

// 签到-领取10链豆
export const getsign = (memberId) => {
  let params = {}
  params = {
    memberId: memberId
  }
  return ajax('/weixin/member/sign', 'get', params)
}

// 链豆记录
export const pointrecordPage = (params) => {
  return ajax('/weixin/member/point/record/page', 'get', params)
}

// 用户链豆
export const getsumsign = (params) => {
  return ajax('/weixin/member/point/record/get', 'get', params)
}

// 是否已关注
export const getsubscribe = (openId) => {
  let params = {}
  params = {
    openId: openId
  }
  return ajax('/weixin/member/subscribe', 'get', params)
}

// 更新手机号
export const updatephone = (id, phone, phoneCode) => {
  let params = {}
  params.id = id
  params.mobile = phone
  if (phoneCode) {
    params.phoneCode = phoneCode
  }
  return ajax('/weixin/member/updateMobile', 'get', params)
}

// 手机号登录
export const updatephoneData = (phone, phoneCode, openId, headimgurl, parentMemberNo, nickname) => {
  let params = {}
  // params.id = id
  if (phone ){
    params.mobile = phone
  }

  if (phoneCode ){
    params.phoneCode = phoneCode
  }
  params.openId = openId
  params.headimgurl = headimgurl
  if (parentMemberNo) {
    params.parentMemberNo = parentMemberNo
  }
  params.username = nickname
  return ajax('/weixin/member/register', 'get', params)
}


// 余额记录
export const balancerecord = (id, pageNumber, pageSize) => {
  let params = {}
  params = {
    memberId: id,
    pageNumber: pageNumber,
    pageSize: pageSize,
    orderBy: 'recordTime desc',
    columns: 'name,amount,recordTime,id,member.id,member.memberNo,member.image,member.username,otherMember.id,otherMember.memberNo,otherMember.image,otherMember.username,type'
  }
  return ajax('/weixin/member/balance/record/page', 'get', params)
}

// 余额记录
export const pointrecord = (id, pageNumber, pageSize) => {
  let params = {}
  params = {
    memberId: id,
    pageNumber: pageNumber,
    pageSize: pageSize,
    orderBy: 'recordTime desc',
    columns: 'name,amount,recordTime,id,member.id,member.memberNo,member.image,member.username,otherMember.id,otherMember.memberNo,otherMember.image,otherMember.username,type'
  }
  return ajax('/weixin/member/point/record/page', 'get', params)
}

// 获取城市列表
export const getcity = () => {
  let params = {}
  params = {
    orderBy: 'firstPinyin asc,pinyin asc',
    level: 2
    // columns : 'id,firstPinyin,pinyin,area'
  }
  return ajax('/weixin/area/listByPinyin', 'get', params)
}

// 获取城市列表
export const getHotcity = () => {
  let params = {}
  params = {
    isHot: 1
    // columns : 'id,firstPinyin,pinyin,area'
  }
  return ajax('/weixin/area/list', 'get', params)
}

// 修改支付密码
export const updatepasswork = (params) => {
  return ajax('/weixin/member/changeTradePassword', 'get', params)
}

// 发送验证码
export const sendPhoneCode = (phone) => {
  let params = {}
  params.mobile = phone
  return ajax('/weixin/member/sendPhoneCode', 'get', params)
}

// 判断交易密码
export const showpassword = (id) => {
  let params = {}
  params.id = id
  params.columns = 'tradePassword'
  return ajax('/weixin/member/get', 'get', params)
}

// 获取用户升级所需费用
export const getUpgradeAmount = (id, memberType) => {
  let params = {
    id: id,
    memberType: memberType
  }
  return ajax('/weixin/member/getUpgradeAmount', 'get', params)
}

// 获取商家推荐商品
export const listGroupByCat = (merchantId) => {
  let params = {
    merchantId: merchantId
  }
  return ajax('/weixin/goods/listGroupByCat', 'get', params)
}

// 获取类别下的所有商品
export const getGoodsAllByGrup = (id, merchantId) => {
  let params = {
    'parent1.id': id,
    merchantId: merchantId,
    status: 1,
    isdel: 0,
    'spec.isdel': 0,
    isOnline: 1,
    groupBy: 'id',
    columns: 'name,indexImage,id,min(spec.discount) as discount,sort,merchantId',
    orderBy: 'sort asc',
  }
  return ajax('/weixin/goods/list', 'get', params)
}

// 出让列表认领列表
export const transferList = (id, pageNumber, pageSize, memberId, memberId_ne, my, expiredTime_gt) => {
  let params = {
    orderBy: 'id desc',
    tradeStatus:1,
    pageNumber: pageNumber,
    pageSize: pageSize,
    columns: 'id, goodsName, goodsImage, price, totalQuantity,tradedQuantity,memberId, createdTime, member.username, tradeType,tradeStatus,type',
    // customQuery: '(t.toMemberId=' + memberId + ' or toMemberId is null)',
  }
  if (memberId_ne){
      params.memberId_ne = memberId_ne
  }
  if (id ){
    params.type = id
  }
  if(my){
    params.memberId = my
  }
  if (expiredTime_gt){
    params.expiredTime_gt = expiredTime_gt
  }
  return ajax('/weixin/coin/trade/page', 'get', params)
}

// 出让列表认领列表
export const xzList = (id, pageNumber, pageSize, memberId, memberId_ne, my) => {
  let params = {
    orderBy: 'id desc',
    tradeStatus_in: '1,2',
    pageNumber: pageNumber,
    pageSize: pageSize,
    columns: 'id, goodsName, goodsImage, price, totalQuantity,tradedQuantity, createdTime, member.username, tradeType,tradeStatus,type',
    // customQuery: '(t.toMemberId=' + memberId + ' or toMemberId is null)',
  }
  if (memberId_ne) {
    params.memberId_ne = memberId_ne
  }
  if (id) {
    params.type = id
  }
  if (my) {
    params.memberId = my
  }
  return ajax('/weixin/coin/trade/page', 'get', params)
}

// 去认领
export const claimList = (id) => {
  let params = {
    'id': id,
    columns: 'id, goodsName,fullAddress, price,(totalQuantity - tradedQuantity) as remainingQuantity'
  }
  return ajax('/weixin/coin/trade/get', 'get', params)
}


// 确认认领并支付
export const claimPay = (memberId, id, paymentMode, quantity, tradePassword) => {
  let params = {}
  params.memberId= memberId;
  params.id= id;
  if(paymentMode){
    params.paymentMode = paymentMode;
  }
  params. quantity= quantity;
  if (tradePassword){
    params.tradePassword = tradePassword;
  }

  // params. phoneCode=phoneCode;
  return ajax('/weixin/coin/trade/buy', 'get', params)
}

// 新增出让
export const newTransfer = (type, memberId, price, totalQuantity, tradeType, tradePassword, areaIdLevel1, areaIdLevel2, areaIdLevel3, address, fullAddress, toMemberNo, paymentMode) => {
  let params = {
    type: type,
    memberId: memberId,
    price: price,
    totalQuantity: totalQuantity,
    tradeType: tradeType,
    // toMemberNo: toMemberNo,
    // tradePassword: tradePassword,
    // phoneCode: phoneCode,
    areaIdLevel1: areaIdLevel1 ,
    areaIdLevel2: areaIdLevel2,
    areaIdLevel3: areaIdLevel3,
    // address: address,
    fullAddress: fullAddress 
  }
  if (tradePassword){
    params.tradePassword = tradePassword
  }
  if (toMemberNo) {
    params.toMemberNo = toMemberNo
  }

  if (address){
    params.fullAddress = address
  }
  if (paymentMode){
    params.paymentMode = paymentMode
  }
  

  return ajax('/weixin/coin/trade/save', 'get', params)
}

// 认领列表中的出让
export const transfer = (id, memberId, quantity, tradePassword) => {
  let params = {
    id: id,
    memberId: memberId,
    quantity: quantity,
    tradePassword: tradePassword,
    paymentMode:2,
  }

  return ajax('/weixin/coin/trade/sell', 'get', params)
}

// 关闭出让或者认领
export const down = (id, memberId, tradePassword) => {
  let params = {
    id: id,
    memberId: memberId,
    tradePassword: tradePassword
  }

  return ajax('/weixin/coin/trade/close', 'get', params)
}

// 珠宝交易记录
export const getJewelry = (params) => {
  // return ajax('/weixin/order/orderList', 'get', params)
  return ajax('/weixin/order/page', 'get', params)
}

// 忘记密码
export const forgetTradePassword = (id) => {
  let params = {
    id: id
  }
  return ajax('/weixin/member/forgetTradePassword', 'get', params)
}

// 重置密码
export const resetTradePassword = (id, phoneCode, newTradePassword, confirmedNewTradePassword) => {
  let params = {
    id: id,
    phoneCode: phoneCode,
    newTradePassword: newTradePassword,
    confirmedNewTradePassword: confirmedNewTradePassword
  }
  return ajax('/weixin/member/resetPassword', 'get', params)
}

// 置换详情
export const detailsList = (id) => {
  let params = {
    id: id,
    columns:'price, totalQuantity, tradedQuantity, stock, createdTime, goodsName, goodsImage,memberId,tradeStatus'
  }
  return ajax('/weixin/coin/trade/get', 'get', params)
}

// 置换记录
export const recordList = (id) => {
  let params = {
    coinTradeId: id,
    columns: 'member.username, member.image, amount, payment_date, coinAmount, serviceFeeRate, serviceFeeAmount,member.memberNo',
    orderBy: 'payment_date desc',
    payment_status:1,
    orderType_in:'6,8'
  }
  return ajax('/weixin/order/page', 'get', params)
}

// 待付款 增加去支付
export const paySingleOrder = (orderNo, memberId, tradePassword, type) => {
  let params = {
    orderNo: orderNo,
    openId: memberId,
    tradePassword: tradePassword,
    'paymentMode': type
  }
  return ajax('/weixin/order/paySingleOrder', 'get', params)
}

// 快递接口
export const courier = (orderId) => {
  let params = {
    orderId: orderId,
    columns: 'expressId,expressNo,express.expressName'
  }
  return ajax('/weixin/order/express/get', 'get', params)
}

// 根据快递ID获取快递公司名字
// export const courierName = (expressId) => {
//   let params = {
//     id:expressId
//   }
//   return ajax('/weixin/express/list', 'get', params)
// }

export const updateOrder = (orderId) => {
  let params = {
    id: orderId,
    order_status:5
  }
  return ajax('/weixin/order/update', 'get', params)
}

// 社区置换取消微信支付
export const paymentOrder = (orderNo) => {
  let params = {
    orderNo: orderNo
  }
  return ajax('/weixin/coin/trade/cancelBuyOrder', 'get', params)
}


// *********************************app**************************************************
// app登录
export const appSendPhoneCode = (mobile) => {
  let params = {
    mobile: mobile
  }
  return ajax('/app/member/sendPhoneCode', 'get', params)
}

// APP登录

export const appLogin = (mobile, phoneCode) => {
  let params = {
    mobile: mobile,
    phoneCode: phoneCode
  }
  return ajax('/app/member/loginByCode', 'get', params)
}

// app注册
export const appRegister = (mobile, phoneCode, password) => {
  let params = {
    mobile: mobile,
    phoneCode: phoneCode,
    password: password
  }
  return ajax('/app/member/register', 'get', params)
}

// app账号密码登录
export const loginByPassword = (mobile, password) => {
  let params = {
    mobile: mobile,
    password: password
  }
  return ajax('/app/member/loginByPassword', 'get', params)
}

// 智能云柜分享
export const shareSmart = (router, title, detailed) => {
  let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};
  getJssdk().then(response => {
    let noncestr = response.data[0].noncestr
    let ticket = response.data[0].ticket
    let timestamp = response.data[0].timestamp
    // 启动微信设置
    tools.settingWechat(getAppID(), noncestr, ticket, timestamp, () => {
      // 添加微信朋友分享
      tools.menuShareAppMessage(title, detailed , getServerUrl() + '/zouwei/order/index.html?community=' + userInfo.memberNo + `#/` + router, getServerUrl() + '/zouwei/order/icon.jpg', () => { })
      // 添加微信朋友圈分享
      tools.menuShareTimeline(detailed, getServerUrl() + '/zouwei/order/index.html?community=' + userInfo.memberNo + `#/` + router, getServerUrl() + '/zouwei/order/icon.jpg', () => { })
    })
  })
}

// 智能云柜分页
export const cloudarkList = (id) => {
  let params = {
    columns: 'id, machineNo, shopName, machineType, pointType, goodsSpec.name',
    goodsSpecId: id,
    stock:1,
    pageSize:1000
  }
  return ajax('/weixin/machine/page', 'get', params)
}

// 罚酒游戏记录保存
export const savegame = (memberId, gameResult) => {
  let params = {
    memberId: memberId,
    gameResult: gameResult
  }
  return ajax('/weixin/fbgameItem/save', 'get', params)
}

// 罚酒游戏最新记录
export const getgamelatestlist = (rows) => {
  let params = {
    rows: rows
  }
  return ajax('/weixin/fbgameItem/getNow', 'get', params);
}

// 罚酒游戏最多记录
export const getgametoplist = (rows) => {
  let params = {
    rows: rows
  }
  return ajax('/weixin/fbgame/getTop', 'get', params);
}

// 罚酒游戏我的记录
export const record = (memberId) => {
  let params = {
    memberId: memberId,
    orderBy: 'createdTime desc',
  }
  return ajax('/weixin/fbgameItem/list', 'get', params);
}

// 更新会员上级
export const themember = (id, parentMemberNo) => {
  let params = {
    id: id,//  （当前会员的id)
    parentMemberNo: parentMemberNo // （上级会员的memberNo)
  }
  return ajax('/weixin/member/updateParent', 'get', params);
}

// GPS定位
export const gpsPositioning = ( callback,cancel) => {
  // GPS定位获取经纬度
  let _this = this;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      MP("yNlGG8gD03gixPzzvyHMfNiTOz50mXAl").then(BMap => {
        var map = new BMap.Map("allmap");
        // var ggPoint = new BMap.Point(113.594804, 22.267425);
        var ggPoint = new BMap.Point(position.coords.longitude, position.coords.latitude);
        var gc = new BMap.Geocoder();
        // 坐标转换之后的回调函数
        var translateCallback = function (data) {
          if (data.status === 0) {
            sessionStorage.setItem('longitude', data.points[0].lng)
            sessionStorage.setItem('latitude', data.points[0].lat)
            gc.getLocation(data.points[0], function (rs) {
              var addComp = rs.addressComponents;
              //alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);//省市区什么路多少号
              // _this.cityname = addComp.city;
              sessionStorage.setItem('cityname', addComp.city)
              callback()
            });
          }
        }
        // 坐标转换
        setTimeout(function () {
          var convertor = new BMap.Convertor();
          var pointArr = [];
          pointArr.push(ggPoint);
          convertor.translate(pointArr, 1, 5, translateCallback)
        }, 100);
      })
    }, function (error) {
      switch (error.code) {
        case error.TIMEOUT:
          // alert("连接超时，请重试");
          cancel()
          break;
        case error.PERMISSION_DENIED:
          // alert("您拒绝了使用位置共享服务");
          cancel()
          break;
        case error.POSITION_UNAVAILABLE:
          // alert("亲爱的火星网友，非常抱歉，我们暂时无法为您所在的星球提供位置服务");
          cancel()
          break;
      }
    }, { enableHighAcuracy: true, timeout: 5000, maximumAge: 0 }
    );
  } else {
    alert("您的浏览器不支持Geolocation!");
    cancel()
  }
}

// 会员星级定义
export const definition = () => {
  let params = {
    columns : 'memberGrade, childCount, childManagerCount, orderAmount, childGrade1Count, childGrade2Count, childGrade3Count'
  }
  return ajax('/weixin/member/grade/config/list', 'get', params);
}

// 会员个人统计：
export const vipstatistical = (memberId) => {
  let params = {
    memberId: memberId ,
    columns : 'member.memberGrade, orderAmount, teamPerformance, childCount, childManagerCount, childGrade1Count, childGrade2Count, childGrade3Count'
  }
  return ajax('/weixin/member/statistic/get', 'get', params);
}

// oso订单支付后抽奖
export const draw = (memberId, orderId) => {
  let params = {
    memberId: memberId,
    orderId: orderId
    //columns : 'member.memberGrade, orderAmount, teamPerformance, childCount, childManagerCount, childGrade1Count, childGrade2Count, childGrade3Count'
  }
  return ajax('/weixin/prize/draw', 'get', params);
}

// 用积分抽奖（10个积分）
export const drawbypoint = (memberId) => {
  let params = {
    memberId: memberId
    //columns : 'member.memberGrade, orderAmount, teamPerformance, childCount, childManagerCount, childGrade1Count, childGrade2Count, childGrade3Count'
  }
  return ajax('/weixin/prize/drawByPoint', 'get', params);
}

// 用户优惠券列表
export const couponsList = (memberId, startTime_lt) => {
  let params = {
    columns:'couponName, id,amount, startTime, endTime, status, useTime,createdTime,unit',
    memberId: memberId,
    orderBy:'createdTime desc',
    status: 1,
    startTime_lt: startTime_lt

  }
  return ajax('/weixin/member/coupon/list', 'get', params);
}


// 能使用的优惠券有多少
export const gtDate = (memberId, endTime_le) => {
  let params = {
    columns: 'count(id) as childCount',
    memberId: memberId,
    status:1,
    endTime_gt: endTime_le,
    startTime_lt: endTime_le

  }
  return ajax('/weixin/member/coupon/list', 'get', params);
}

// 团队业绩列表
export const teamList = (memberId, endTime_le) => {
  let params = {
    orderBy:'performance desc'
    // columns: 'managerMember.username,managerMemberId,performance',
  }
  return ajax('/weixin/team/page', 'get', params);
}