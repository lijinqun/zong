import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// import { geturl } from 'dist/urldata.js';
// import env from '../env'

//var apiServer = 'http://web.cliantech.com/zdccc';

var apiServer = 'http://dev.cliantech.com/chuangshi';
//var apiServer = 'http://localhost:8081/chuangshi';

//本地测试服务器
//var apiServer = 'http://192.168.1.8:8080/chuangshi';
//正式服务器
// var apiServer = 'http://1.zouwei.hk/chuangshi';
// export const imgurl ='http://192.168.1.8:8080/chuangshi';

//export const imgurl ='http://dev.cliantech.com/chuangshi';
export const imgurl ='http://1.zouwei.hk/chuangshi';

// var apiServer = geturl();
// 以下是测试服务器
 // var apiServer = 'api';
// var apiServer = 'http://ccc.cliantech.com/zdccc';
// ${ apiServer } api
// var apiServer = 'http://192.168.1.8:8080/zdccc';
// 本地测试服务器
// var apiServer = 'http://192.168.1.145:8080/zdccc';
// var apiServer='http://192.168.43.144:8080/zdccc'
// var apiServer='http://localhost:8080/zdccc'

// var apiServer = 'http://zdccc.cliantech.com/zdccc';

// 正式网址
// http://web.cliantech.com/admin/index.html

// 101. 商品类型列表
// export const getGoodsCat = () => {
//     return axios.get(`${apiServer}/goodsCat/list`)
//         .then(response => response.data);
// };

export const getGoodsCat = (names) => {
    return axios.get(`${apiServer}/goodsCat/list`, {
        params: {
            orderBy: names
        }
    })
        .then(response => response.data);
};

//102. 商品列表
export const getGoods = (cat_id) => {
    return axios.post(`${apiServer}/goods/list`, qs.stringify({
        cat_id: cat_id
    }))
        .then(response => response.data);
};

//201. 供应商类型列表
export const getSupplyCat = () => {
    return axios.get(`${apiServer}/supplyCat/list`)
        .then(response => response.data);
};

//202. 供应商列表
export const getSupplyer = (cat_id) => {
    return axios.post(`${apiServer}/supplyer/list`, qs.stringify({
        cat_id: cat_id
    }))
        .then(response => response.data);
};
//商家组别
export const getbusiness = () => {
    return axios.post(`${apiServer}/business/cat/list`, qs.stringify({
        'columns': 'id,name,parent.name'
    }))
        .then(response => response.data);
};
//商家列表(父)
export const getbusinesslist = (ids) => {
    return axios.post(`${apiServer}/business/list`, qs.stringify({
        'columns': 'id,name,cat.name,username,parents,cat_id',
        'parents_b': 'null',
        'cat_id': ids
    }))
        .then(response => response.data);
};
//商家列表
export const getbusinesslist2 = (ids) => {
    return axios.post(`${apiServer}/business/list`, qs.stringify({
        'columns': 'id,name,cat.name,username,parents,cat_id',
        'parents_nb': 'null',
        'parent_id': ids
    }))
        .then(response => response.data);
};

//301. 用户计划分页
export const getBusinessPlan = (pageSizes, pageNumbers, goodsCatId, goodsName, supplierId, supplyCatId, needDateFrom, needDateTo, businessids, parentbusiness, businessid) => {
    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (goodsCatId) {
        params["goodsCat.id"] = goodsCatId;
    }
    if (goodsName) {
        params.goodsName = goodsName;
    }
    if (supplierId) {
        params.supplierId = supplierId;
    }
    if (supplyCatId) {
        params.supplyCatId = supplyCatId;
    }
    if (businessid) {
        params['business.id'] = businessid;
    } else if (parentbusiness) {
        params['business.parent_id'] = parentbusiness;
    } else if (businessids) {
        params['business.cat_id'] = businessids;
    }

    params["needDate_ge"] = needDateFrom ? needDateFrom : '';
    params["needDate_le"] = needDateTo ? needDateTo : '';
    params.columns = "group_concat(t.id) as id,group_concat(concat(business.name, ' ', t.count)) as businessnames, sum(t.count) as count,needDate,goods.name,goodsCat.name,supplier.supplyName";
    return axios.post(`${apiServer}/businessPlan/page`, qs.stringify(params))
        .then(response => response.data);
};

//303. 批量更新用户计划 - 可以用于指定供应商
export const batchUpdate = (ids, supplierId) => {
    return axios.post(`${apiServer}/businessPlan/batchUpdate`, qs.stringify({
        id: ids,
        supplierId: supplierId
    }))
        .then(response => response.data);
};


// 销售推广人员
// 销售推广人员分页
export const getapplyforparterlist = (pageNumbers, pageSizes, conditions, sorts, names, wechats, phones, states) => {
    var params = {};
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (names) {
        params.name_lk = names;
    }
    if (wechats) {
        params["member.username_lk"] = wechats;
    }
    if (phones) {
        params.phone = phones;
    }
    if (states == "0" || states == "1" || states == "2") {
        params.status = states;
    }
    params.columns = 'id,name,memberId,remarks,phone,status,count(partner.id) as partnerCount,member.username';
    return axios.get(`${apiServer}/admin/sales/promoter/page`, {
        params
    })
        .then(response => response.data);
};

// 销售推广人员审核
export const updateapplyforparter = (ids, status, memberids) => {
    var params = {};
    if (status == 1) {
        params.commissionType = 5;
    } else {
        params.commissionType = 1;
    }
    params.status = status;
    params.id = ids;
    params.memberId = memberids;

    return axios.get(`${apiServer}/admin/sales/promoter/update`, {
        params
    })
        .then(response => response.data);
};
// 销售推广人员绑定微信号
export const upbinding = (ids, memberId) => {
    return axios.post(`${apiServer}/admin/sales/promoter/batchUpdate`, qs.stringify({
        'id': ids,
        'memberId': memberId
    }))
        .then(response => response.data);
};

// 合作商家
export const businesspage = (pageNumbers, pageSizes, conditions, sorts, names, names2, memberusername, memberusername2, refereeMemberUsername, refereeMemberUsername2, businessPhone, businessPhone2, states, stages, stages2, houseName, houseName2) => {
    var params = {};
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (names) {
        params.businessName_lk = names;
    }
    if (names2) {
        params.businessName = names2;
    }
    if (memberusername) {
        params["member.username_lk"] = memberusername;
    }
    if (memberusername2) {
        params["member.username"] = memberusername2;
    }
    if (refereeMemberUsername) {
        params["refereeMember.username_lk"] = refereeMemberUsername;
    }
    if (refereeMemberUsername2) {
        params["refereeMember.username"] = refereeMemberUsername2;
    }
    if (businessPhone) {
        params.businessPhone_lk = businessPhone;
    }
    if (businessPhone2) {
        params.businessPhone = businessPhone2;
    }
    if (stages) {
        params.stage_lk = stages;
    }
    if (stages2) {
        params.stage = stages2;
    }
    if (houseName) {
        params.houseName_lk = houseName;
    }
    if (houseName2) {
        params.houseName = houseName2;
    }
    if (states == "0" || states == "1" || states == "2") {
        params.status = states;
    }
    params.columns = 'id,businessName,memberId,remarks,status,stage,refereeMember.username,totalHouseholds,businessPhone,member.username,refereeMemberId,houseName';
    return axios.get(`${apiServer}/admin/sales/partner/page`, {params}
    )
        .then(response => response.data);
};

// 合作商家审核
export const businessbatchUpate = (ids, status, memberIds) => {

    var params = {};
    if (status == 1) {
        params.commissionType = 2;
    } else {
        params.commissionType = 1;
    }
    params.status = status;
    params.id = ids;
    params.memberId = memberIds;


    return axios.get(`${apiServer}/admin/sales/partner/update`, {params}
    )
        .then(response => response.data);
};
// 合作商家绑定微信昵称
export const bindingUpate2 = (ids, memberId, types) => {
    var params = [];
    params.id = ids;
    params.memberId = memberId;
    if (types) {
        params.commissionType = types;
    }
    return axios.post(`${apiServer}/admin/sales/partner/update`, qs.stringify((params)))
        .then(response => response.data);
};
// 合作商家绑定推荐人
export const bindingUpate3 = (ids, pepoleid) => {
    return axios.post(`${apiServer}/admin/sales/partner/batchUpdate`, qs.stringify({
        'id': ids,
        'refereeMemberId': pepoleid
    }))
        .then(response => response.data);
};
// 合作商家添加小区
export const bindingUpateHouseName = (ids, houseNames) => {
    return axios.get(`${apiServer}/admin/sales/partner/update`, {
        params: {
            'id': ids,
            'houseName': houseNames
        }
    })
        .then(response => response.data);
};

// 合作商家详情
export const businessdetails = (ids) => {
    return axios.post(`${apiServer}/admin/sales/partner/list`, qs.stringify({
        'id': ids,
        // columns:'businessName,businessAddress,businessBank,businessBankName,businessBankAccount,houseName,status,houseAddress,totalHouseholds,totalResideNumber,businessPhone,id,bindingArea.area,bindingArea.area as houseNames,group_concat(bindingArea.area) as bindingAreaNamesbox'
        columns: 'id,businessName,businessAddress,memberId,remarks,houseName,businessBank,businessBankName,businessBankAccount,status,stage,refereeMember.username,totalHouseholds,businessPhone,member.username,refereeMemberId'
        // salesPartnerId
        // 'member.username':,
        // 'status':status
        // columns:'id,businessName,memberId,remarks,status,refereeMember.username,totalHouseholds,businessPhone,member.username'
    }))
        .then(response => response.data);
};

// 合作商家详情修改
export const businessupdate = (ids, area1, area2, area3, area4, area5, businessName, businessAddress, businessBank, businessBankName, businessBankAccount, houseName, status, houseAddress, totalHouseholds, totalResideNumber, businessPhone) => {
    var params = [];
    params.id = ids;
    if (area1.area) {
        params["area1.area"] = area1;
    }
    if (area2.area) {
        params["area2.area"] = area2;
    }
    if (area3.area) {
        params["area3.area"] = area3;
    }
    if (area4.area) {
        params["area4.area"] = area4;
    }
    if (area5.area) {
        params["area5.area"] = area5;
    }
    if (businessName) {
        params.businessName = businessName;
    }
    if (businessAddress) {
        params.businessAddress = businessAddress;
    }
    if (businessBank) {
        params.businessBank = businessBank;
    }
    if (businessBankAccount) {
        params.businessBankAccount = businessBankAccount;
    }
    if (businessBankName) {
        params.businessBankName = businessBankName;
    }
    if (houseName) {
        params.houseName = houseName;
    }
    if (houseAddress) {
        params.houseAddress = houseAddress;
    }
    if (totalHouseholds) {
        params.totalHouseholds = totalHouseholds;
    }
    if (totalResideNumber) {
        params.totalResideNumber = totalResideNumber;
    }
    if (businessPhone) {
        params.businessPhone = businessPhone;
    }
    if (status == "0" || status == "1" || status == "2") {
        params.status = status;
    }
    return axios.post(`${apiServer}/admin/sales/partner/update`, qs.stringify(params)
        // 'member.username':,
        // 'status':status
        // columns:'id,businessName,memberId,remarks,status,refereeMember.username,totalHouseholds,businessPhone,member.username'
    )
        .then(response => response.data);
};

// 合作商家绑定小区
export const bindingarea = (ids, salesPartnerId) => {
    return axios.post(`${apiServer}/area/batchUpdate`, qs.stringify({
        'id': ids,
        'salesPartnerId': salesPartnerId
    }))
        .then(response => response.data);
};

//获取省份
export const province = () => {
    return axios.post(`${apiServer}/area/list`, qs.stringify({
        'level': 1
    }))
        .then(response => response.data);
};

//获取市、区、街道办
export const addressbox = (ids, conditions) => {
    var params = [];
    if (conditions) {
        params.columns = conditions;
    }
    params.parent_id = ids;
    return axios.post(`${apiServer}/area/list`, qs.stringify(params))
        .then(response => response.data);
};
//获取省份、市、区、街道办列表
export const getareabox = (levelid) => {
    return axios.get(`${apiServer}/area/list`, {
        params: {'level': levelid, 'columns': 'id,area,fullName,level,parentNames,parent_id,parentIds,operNo'}
    })
        .then(response => response.data);
};

//获取省份、市、区、街道办列表
export const getarealevel = (levelid, parentid) => {
    return axios.get(`${apiServer}/area/list`, {
        params: {'level': levelid, 'parent_id': parentid, 'columns': 'id,area,fullName,level,parentNames,parent_id,parentIds,operNo'}
    })
        .then(response => response.data);
};


// 用户提成
export const commissionpage = (pageNumbers, pageSizes, conditions, sorts, nameids, memberUsername) => {
    var params = {};
    // var params=[];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (conditions) {
        params.columns = conditions;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (nameids) {
        params["member.id"] = nameids;
    }
    if (memberUsername) {
        params["member.username_lk"] = memberUsername;
    }
    params.columns = 'member.id, member.username,sum(if(t.type = 1, t.amount, 0)) as shareAmount,sum(if(t.type = 2, t.amount, 0)) as partnerAmount,sum(if(t.type = 3, t.amount, 0)) as salesAmount,sum(if(t.type = 4, t.amount, 0)) as businessAmount,sum(if(t.type = 5, t.amount, 0)) as promotionAmount,sum(if(t.type = 6, t.amount, 0)) as distributionAmount,sum(t.amount) as totalnumber';
    // sum(if(t.type, t.amount, 0)) as totalnumber
    return axios.get(`${apiServer}/commission/record/page`, {params}
        // return axios.post(`${apiServer}/commission/record/page`,qs.stringify(params)
        // 'member.username':,
        // 'status':status
        // columns:'id,businessName,memberId,remarks,status,refereeMember.username,totalHouseholds,businessPhone,member.username'
    )
        .then(response => response.data);
};

//用户提成详情
export const commissiondetails = (pageNumbers, pageSizes, sorts, ids, types, orderids, needDateFrom, needDateTo) => {
    var params = {};
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (orderids) {
        params.orderId = orderids;
    }
    if (needDateFrom) {
        params.needDateFrom = needDateFrom.getFullYear() + '-' + (needDateFrom.getMonth() + 1) + '-' + needDateFrom.getDate();
    }
    if (needDateTo) {
        params.needDateTo = needDateTo.getFullYear() + '-' + (needDateTo.getMonth() + 1) + '-' + needDateTo.getDate();
    }
    params["member.id"] = ids;
    params.type = types;
    params.columns = 'memberId,member.username,sum(detail.amount) as sumAmount,orderId,orders.order_no,orders.delivery,createdtime,rebate,rebateUnit,amount,members.username';
    return axios.get(`${apiServer}/commission/record/page`, {params})
        .then(response => response.data);
};

//获取微信会员
export const wechatname = (pageNumbers, pageSizes, sorts, names, names2) => {
    var params = {};
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (names) {
        params['username_lk'] = names;
    }
    if (names2) {
        params['username'] = names2;
    }
    params.columns = 'id,username,login_date,count(child.id) as childCount,salesPartner.stage';
    return axios.get(`${apiServer}/admin/member/page`, {
        params
    })
        .then(response => response.data);
    // return axios.post(`${apiServer}/admin/member/page`,qs.stringify(params))
    // .then(response => response.data);
};


//获取人员关联
export const relationpeople = (pageNumbers, pageSizes, sorts, names, parentnames) => {
    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (names) {
        params['operName_lk'] = names;
    }
    if (parentnames) {
        params['parent.operName_lk'] = parentnames;
    }
    params.columns = 'operNo,operName,parentOperNo,parent.operName'
    return axios.post(`${apiServer}/operator/page`, qs.stringify(params))
        .then(response => response.data);
};

// 绑定上级用户
export const bdparents = (ids, parents) => {
    return axios.post(`${apiServer}/operator/batchUpdate`, qs.stringify({
        'operNo': ids,
        'parentOperNo': parents
    }))
        .then(response => response.data);
};
//获取订单状态信息
// export const getorderstatus =(orderstatus)=>{
//     var params={};
//     if(orderstatus){
//      params["order_status_in"] = orderstatus;
//     }
//     params.orderBy = "t.create_date desc";
//     params.groupBy = "t.id";
//     params.columns = 'id,orderType,isClosed,order_no,amount,consignee,member.nickname,member.username,member.image,mobile,house,numberBuildings,unit,roomNo,payment_date,create_date,order_status,originalTotalAmount,merchant.shopName';
//     return axios.get(`${apiServer}/admin/order/page`, {params})
//         .then(response => response.data);
// };
  

    
//获取自营订单列表
export const getorder = (pageNumbers, pageSizes, conditions, sorts, orderIds, usernames, userphones, innname, orderstatus, ordertypes, goodstypes, difference, needDateFrom, needDateTo, housedata, pdbindingStage, orderarea2, orderarea3, orderarea4, pdbindingoperName, pdbindingsalesPromoter, operNo, ordertype,address) => {
    var params = {};
    // var pdbindingStage1="";
    // var pdbindingStage2="";
    // var pdbindingoperName1="";
    // var pdbindingoperName2="";
    // var pdbindingsalesPromoter1="";
    // var pdbindingsalesPromoter2="";
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (orderIds) {
        params['order_no_lk'] = orderIds;
    }
    if (usernames) {
        // params.consignee_lk=encodeURI(usernames);
        params.consignee_lk = usernames;
    }
    if (userphones) {
        params.mobile_lk = userphones;
    }
    if (innname) {
        params["salesPartner.stage_lk"] = innname;
    }
    if (orderstatus) {
        params["order_status_in"] = orderstatus;
    }
    if (ordertypes) {
        params.orderType = ordertypes;
    }
    if (goodstypes) {
        params.status = goodstypes;
    }
    if (housedata) {
        // params.house_lk=encodeURI(housedata);
        params.house_lk = housedata;
    }
    if (operNo) {
        params.oper_no = operNo;
    }
    if (orderarea2) {
        params.area_id_level2 = orderarea2;
    }
    if (orderarea3) {
        params.area_id_level3 = orderarea3;
    }
    if (orderarea4) {
        params.area_id_level4 = orderarea4;
    }
    if (pdbindingStage == 1) {
        params["salesPartnerStage_nb"] = 'null';
    } else if (pdbindingStage == 2) {
        params["salesPartnerStage_b"] = 'null';
    }
    if (pdbindingoperName == 1) {
        params["operName_nb"] = 'null';
    } else if (pdbindingoperName == 2) {
        params["operName_b"] = 'null';
    }
    if (pdbindingsalesPromoter == 1) {
        params["salesPromoter.name_nb"] = 'null';
    } else if (pdbindingsalesPromoter == 2) {
        params["salesPromoter.name_b"] = 'null';
    }
    if (difference == "2") {
        params["address_nb"] = 'null';
    } else if (difference == "1") {
        params["address_b"] = 'null';
    } else if (difference == "0") {

    }
    if (ordertype) {
        params.ordertype_in = ordertype;
    }
    if (address) {
        params.numberBuildings_lk = address;
    }
    //自营商家id=0
    params.merchantId = 0;
    
    if (needDateFrom) {
//      params["delivery_date_ge"] = needDateFrom + ' 00:00:00';
//      params["delivery_date_le"] = needDateTo + ' 23:59:59';
        params.create_date_ge = needDateFrom ;
        params.create_date_le = needDateTo;
    }
    
    params.orderBy = "t.create_date desc";
    params.groupBy = "t.id";
    params.columns = 'area1.area,area2.area,area3.area,id,orderType,isClosed,order_no,amount,consignee,member.nickname,member.username,member.image,mobile,house,numberBuildings,unit,roomNo,payment_date,create_date,order_status,originalTotalAmount,merchant.shopName,fullAddress';
    return axios.get(`${apiServer}/admin/order/page`, {params})
        .then(response => response.data);
};

//获取非自营订单列表
export const getnorder = (pageNumbers, pageSizes, conditions, sorts, orderIds, usernames, userphones, innname, orderstatus, ordertypes, goodstypes, difference, needDateFrom, needDateTo, housedata, pdbindingStage, orderarea2, orderarea3, orderarea4, pdbindingoperName, pdbindingsalesPromoter, operNo, ordertype,address, merchantId) => {
    var params = {};
    // var pdbindingStage1="";
    // var pdbindingStage2="";
    // var pdbindingoperName1="";
    // var pdbindingoperName2="";
    // var pdbindingsalesPromoter1="";
    // var pdbindingsalesPromoter2="";
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (orderIds) {
        params['order_no_lk'] = orderIds;
    }
    if (usernames) {
        // params.consignee_lk=encodeURI(usernames);
        params.consignee_lk = usernames;
    }
    if (userphones) {
        params.mobile_lk = userphones;
    }
    if (innname) {
        params["salesPartner.stage_lk"] = innname;
    }
    if (orderstatus) {
        params["order_status_in"] = orderstatus;
    }
    if (ordertypes) {
        params.orderType = ordertypes;
    }
    if (goodstypes) {
        params.status = goodstypes;
    }
    if (housedata) {
        // params.house_lk=encodeURI(housedata);
        params.house_lk = housedata;
    }
    if (operNo) {
        params.oper_no = operNo;
    }
    if (orderarea2) {
        params.area_id_level2 = orderarea2;
    }
    if (orderarea3) {
        params.area_id_level3 = orderarea3;
    }
    if (orderarea4) {
        params.area_id_level4 = orderarea4;
    }
    if (pdbindingStage == 1) {
        params["salesPartnerStage_nb"] = 'null';
    } else if (pdbindingStage == 2) {
        params["salesPartnerStage_b"] = 'null';
    }
    if (pdbindingoperName == 1) {
        params["operName_nb"] = 'null';
    } else if (pdbindingoperName == 2) {
        params["operName_b"] = 'null';
    }
    if (pdbindingsalesPromoter == 1) {
        params["salesPromoter.name_nb"] = 'null';
    } else if (pdbindingsalesPromoter == 2) {
        params["salesPromoter.name_b"] = 'null';
    }
    if (difference == "2") {
        params["address_nb"] = 'null';
    } else if (difference == "1") {
        params["address_b"] = 'null';
    } else if (difference == "0") {

    }
    if (ordertype) {
        params.ordertype_in = ordertype;
    }
    if (address) {
        params.fullAddress_lk = address;
    }
    if (merchantId) {
        params.merchantId = merchantId;
    } else {
        params.merchantId_ne = 0;
    }
    
    if (needDateFrom) {
//      params["delivery_date_ge"] = needDateFrom + ' 00:00:00';
//      params["delivery_date_le"] = needDateTo + ' 23:59:59';
        params.create_date_ge = needDateFrom;
        params.create_date_le = needDateTo;
    }
    
    params.orderBy = "t.create_date desc";
    params.groupBy = "t.id";
    params.columns = 'id,orderType,isClosed,order_no,amount,consignee,member.nickname,member.username,member.image,mobile,house,fullAddress,unit,roomNo,payment_date,create_date,order_status,originalTotalAmount,merchant.shopName';
    return axios.get(`${apiServer}/admin/order/page`, {params})
        .then(response => response.data);
};

//获取订单列表  匹配地址用
export const getorder2 = (pageNumbers, pageSizes, conditions, sorts, orderIds, usernames, userphones, innname, orderstatus, ordertypes, goodstypes, difference, needDateFrom, needDateTo, housedata, pdbindingStage, orderarea2, orderarea3, orderarea4, pdbindingoperName, pdbindingsalesPromoter, operNo) => {
    var params = {};
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }else{
        params.pageNumber = 1;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (orderIds) {
        params['order_no_lk'] = orderIds;
    }
    if (usernames) {
        // params.consignee_lk=encodeURI(usernames);
        params.consignee_lk = usernames;
    }
    if (userphones) {
        params.mobile_lk = userphones;
    }
    if (innname) {
        params["salesPartner.stage_lk"] = innname;
    }
    if (orderstatus) {
        params["order_status"] = orderstatus;
    }
    if (ordertypes) {
        params.orderType = ordertypes;
    }
    if (goodstypes) {
        params.status = goodstypes;
    }
    if (housedata) {
        // params.house_lk=encodeURI(housedata);
        params.house_lk = housedata;
    }
    if (operNo) {
        params.oper_no = operNo;
    }
    if (orderarea2) {
        params.area_id_level2 = orderarea2;
    }
    if (orderarea3) {
        params.area_id_level3 = orderarea3;
    }
    if (orderarea4) {
        params.area_id_level4 = orderarea4;
    }
    if (pdbindingStage == 1) {
        params["salesPartnerStage_nb"] = 'null';
    } else if (pdbindingStage == 2) {
        params["salesPartnerStage_b"] = 'null';
    }
    if (pdbindingoperName == 1) {
        params["operName_nb"] = '';
    } else if (pdbindingoperName == 2) {
        params["operName_b"] = '';
    }
    if (pdbindingsalesPromoter == 1) {
        params["salesPromoter.name_nb"] = 'null';
    } else if (pdbindingsalesPromoter == 2) {
        params["salesPromoter.name_b"] = 'null';
    }
    if (difference == "2") {
        params["address_nb"] = 'null';
    } else if (difference == "1") {
        params["address_b"] = 'null';
    } else if (difference == "0") {

    }

    if (needDateFrom) {
        params["delivery_date_ge"] = needDateFrom + ' 00:00:00';
        params["delivery_date_le"] = needDateTo + ' 23:59:59';
    }
    params.orderBy = "t.create_date desc";
    params.groupBy = "t.id";
    params.columns = 'id,order_no,amount,consignee,delivery_date,order_date,mobile,address,order_status,orderType,payment_date,status,house,area_id_level2,area_id_level3,area4.area,area_id_level4,area5.area,bindingArea.area,numberBuildings,oper_no,operMobile,operName,address_id'
    return axios.get(`${apiServer}/admin/order/page`, {params})
        .then(response => response.data);
};
//获取订单详情列表
 export  const getdetailslist=(pageNumbers,needDateFrom,needDateTo,orderstatus,goodsName) =>{
    var params = {};
    if(pageNumbers){
        params.pageNumber = pageNumbers;
    }else{
        params.pageNumber = 1;
    }
    // if(orderIds){
    //     params["noder_no"] = orderIds;
    // }
    if (needDateFrom) {
        params["ord.create_date_ge"] = needDateFrom  + ' 00:00:00';
    }
     if (needDateTo) {
        params["ord.create_date_le"] = needDateTo + ' 23:59:59';
    }

    if(orderstatus){
        params['ord.order_status_in'] = orderstatus;
    }
      if(goodsName){
        params["goods.name_lk"] = goodsName;
    }
    params.orderBy ="t.create_date desc"
    params.columns="ord.create_date,supplier.name,ord.order_no,ord.consignee,ord.mobile,ord.fullAddress,goods.name,goods.number,specValueNames,quantity,supplierPrice,supplierAmount,price,amount,ord.order_status,express.expressName,ordExpress.expressNo"
    return axios.get(`${apiServer}/admin/order/detail/page`, {params})
        .then(response => response.data)

 }
 //修改订单详情价格
 export const updateprice=(id,price) =>{
    var params ={};
    params.id = id;
    params.price = price;
     return axios.get(`${apiServer}/admin/order/detail/changePrice`, {params})
        .then(response => response.data)
 }
 //打印订单数据
  export  const printdetails=(needDateFrom,needDateTo,orderstatus,goodsName) =>{

    if (needDateFrom) {
        needDateFrom = needDateFrom;
    }
    if(needDateTo){
        needDateTo = needDateTo ;
    }
    // if(orderstatus){
    //     params['ord.order_status_in'] = orderstatus;
    // }
    // if(goodsName){
    //     params["goods.name_lk"] = goodsName;
    // }            
   let href = "";
    var columns = "ord.create_date,supplier.name,ord.order_no,ord.consignee,ord.mobile,ord.fullAddress,goods.name,goods.number,specValueNames,quantity,supplierPrice,supplierAmount,price,amount,ord.order_status,express.expressName,ordExpress.expressNo";
    var headers = "订单日期,供应商,单号,收件人,电话,地址,商品名,商品编号,规格,数量,供货单价,供货金额,销售单价,销售金额,货物状态,快递公司,快递单号";
    var codelist = "ord.order_status(0:等待付款,1:已完成,2:待发货,3:待收货,4:问题件,5:已取消,6:已过期,7:已确认)";
    href =  apiServer + '/admin/order/detail/export?';
    href += 'ord.create_date_ge=' + needDateFrom;
    href += '&ord.create_date_le=' + needDateTo;
    href += '&ord.order_status_in=' + orderstatus;
    href += '&goods.name_lk=' + goodsName;
    href += '&columns=' + columns + '&headers=' + headers + '&codelist=' + codelist;
    console.log('href:' + href);
    document.location = href;
    }
//模拟

// 订单更新status
export const updatanewstatus = (ids, status) => {
    var params = {};
    params.id = ids;
    params.order_status = status;
    return axios.get(`${apiServer}/admin/order/update`, {params})
        .then(response => response.data);
};

// 订单更新address
export const updatanewaddress = (ids, address) => {
    var params = {};
    params.id = ids;
    params.address = address;
    return axios.get(`${apiServer}/admin/order/update`, {params})
        .then(response => response.data);
};

// 获取判断address的列表
export const getmatchingaddress = (pdaddress) => {
    var params = [];
    if (pdaddress == "2") {
        params["address_nb"] = 'null';
    } else if (pdaddress == "1") {
        params["address_b"] = 'null';
    } else if (pdaddress == "0") {

    }
    if (needDateFrom) {
        params["delivery_date_ge"] = needDateFrom + ' 00:00:00';
        params["delivery_date_le"] = needDateTo + ' 23:59:59';
    }
    params.orderBy = "t.create_date desc";
    params.groupBy = "t.id";
    return axios.post(`${apiServer}/admin/order/list`, qs.stringify(params))
        .then(response => response.data);
};

// 订单详情
export const orderdetailslist = (ids) => {
    return axios.post(`${apiServer}/admin/order/get`, qs.stringify({
        'id': ids,
        // columns:'id,packingAmount,refundAmount,goodsAmount,originalTotalAmount,deliveryAmount,commissionAmount,balanceAmount,needPaidAmount,diffTotalPrice,couponMoney,salesPartnerStage,salesPartnerBusinessName,salesPartnerName,salesPartnerBusinessPhone,salesPartnerBusinessAddress,order_no,amount,consignee,delivery_date,order_date,mobile,address,order_status,orderType,payment_date,status,sms_status,salesPartner.stage,concat(area1.area, area2.area, area3.area, area4.area,t.house) as fullAddress,house,area_id_level1,area_id_level2,area_id_level3,area_id_level4,operName,oper_no,operMobile,salesPartnerRefereeMemberId'
    }))
        .then(response => response.data);
};


export const orderdetailsdata = (ids) => {
    var params = {};
    params.order_id = ids;
    params.columns = 'good_id,id,amount,price,quantity,goods.name,specification.valueNames,incomeCoinAmount,consumeCoinAmount,balanceAmount,needPaidAmount,bonusPoint';
    return axios.get(`${apiServer}/admin/order/detail/list`, {params})
        .then(response => response.data);
};

// 订单详情更新
export const orderupdate = (ids, consignee,mobile,orderdetailshouse,fullAddress,orderstatus) => {
    var params = {};
    params.id = ids;
    if (consignee) {
        params.consignee = consignee;
    }
    if (orderdetailshouse) {
        params.house = orderdetailshouse;
    }
    if (mobile) {
        params.mobile = mobile;
    }
    if (orderstatus) {
        params.order_status = orderstatus;
    }
    if (fullAddress) {
        params.fullAddress = fullAddress;
    }
    return axios.get(`${apiServer}/admin/order/update`, {params}
    )
        .then(response => response.data);
};

//指定订单送货员
export const operatorupdateapi = (ids, operNo, OperatorName, OperatorMobile) => {
    var params = {};
    params.id = ids;
    params.oper_no = operNo;
    params.operMobile = OperatorMobile;
    params.operName = OperatorName;
    return axios.get(`${apiServer}/admin/order/batchUpdate`, {params}
    )
        .then(response => response.data);
};

//获取送货员
export const orderarea4operNo = (ids) => {
    var params = {};
    params.id = ids;
    params.level = 4;
    params.columns = 'operNo';
    return axios.get(`${apiServer}/area/list`, {params}
    )
        .then(response => response.data);
};

//指定区域送货员
export const operatorupdatepeople = (ids, operNo) => {
    var params = {};
    params.id = ids;
    params.operNo = operNo;
    return axios.get(`${apiServer}/admin/area/batchUpdate`, {params}
    )
        .then(response => response.data);
};
//区域送货员列表
export const getoperatorlist = (operNo) => {
    var params = {};
    params.operatorRole = 3;
    if (operNo) {
        params.operNo = operNo;
    }
    // params.columns = operNo;
    return axios.get(`${apiServer}/admin/operator/list`, {params}
    )
        .then(response => response.data);
};
//去限制区域送货员列表
export const getoperatordata = (operNo) => {
    var params = {};
    if (operNo) {
        params.operNo = operNo;
    }
    // params.columns = operNo;
    return axios.get(`${apiServer}/admin/operator/get`, {params}
    )
        .then(response => response.data);
};

export const orderupdate2 = (ids, order_status) => {
    var params = [];
    params.id = ids;
    params.order_status = order_status;
    return axios.post(`${apiServer}/admin/order/batchUpdate`, qs.stringify(params)
    )
        .then(response => response.data);
};

// 获取菜驿站
export const bindinginnlist = (ids, salesPartnerId, stage, houseName) => {
    var params = {};
    if (ids) {
        params["bindingAreaParent.parent_id"] = ids;
    }
    if (stage) {
        params.stage_lk = stage;
    }
    if (houseName) {
        params.houseName_lk = houseName;
    }
    params.columns = 'id,businessName,businessAddress,houseName,stage,name,businessPhone,member.username,member.id,refereeMember.id,refereeMember.mobile,refereeMember.username';
    return axios.get(`${apiServer}/admin/sales/partner/list`, {
        params
    })
        .then(response => response.data);
};

export const bindinginn2 = (ids, innids, bindingbusinessAddress, bindingbusinessName, bindingbusinessPhone, bindinghouseName, bindingstage, bindingsalesPartnerName, bindingsalesPartnerMemberId, bindingRefereeMemberId) => {
    var params = {};
    params.id = ids;
    params["salesPartnerId"] = innids;
    params.salesPartnerStage = bindingstage != null && bindingstage != 'null' && bindingstage != '' ? bindingstage : '';
    params.salesPartnerBusinessName = bindingbusinessName != null && bindingbusinessName != 'null' && bindingbusinessName != '' ? bindingbusinessName : '';
    params.salesPartnerBusinessAddress = bindingbusinessAddress != null && bindingbusinessAddress != 'null' && bindingbusinessAddress != '' ? bindingbusinessAddress : '';
    params.salesPartnerBusinessPhone = bindingbusinessPhone != null && bindingbusinessPhone != 'null' && bindingbusinessPhone != '' ? bindingbusinessPhone : '';
    params.salesPartnerHouseName = bindinghouseName != null && bindinghouseName != 'null' && bindinghouseName != '' ? bindinghouseName : '';
    params.salesPartnerName = bindingsalesPartnerName != null && bindingsalesPartnerName != 'null' && bindingsalesPartnerName != '' ? bindingsalesPartnerName : '';
    params.salesPartnerMemberId = bindingsalesPartnerMemberId != null && bindingsalesPartnerMemberId != 'null' && bindingsalesPartnerMemberId != '' ? bindingsalesPartnerMemberId : '';
    params.salesPartnerRefereeMemberId = bindingRefereeMemberId != null && bindingRefereeMemberId != 'null' && bindingRefereeMemberId != '' ? bindingRefereeMemberId : '';
    return axios.get(`${apiServer}/admin/order/batchUpdate`, {params}
    )
        .then(response => response.data);
};


export const moneylist = (val, pagesizes, conditions, sorts, memberid, usernames, goodstypes) => {
    var params = {};
    if (val) {
        params.pageNumber = val;
    }
    if (pagesizes) {
        params.pageSize = pagesizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (memberid) {
        params.id = memberid;
    }
    if (usernames) {
        params["member.username_lk"] = usernames;
    }
    if (goodstypes == '0') {
        params.status = 0;
    } else if (goodstypes == '1') {
        params.status = 1;
    } else if (goodstypes == '2') {
        params.status = 2;
    }
    params.orderBy = 'createdTime desc';
    params.columns = 'member.username,id,amount,status,createdTime';
    return axios.get(`${apiServer}/admin/withdraw/record/page`, {params}
    )
        .then(response => response.data);
};

export const moneyupdata = (ids, statuss) => {
    var params = [];
    params.id = ids;
    params.status = statuss;
    return axios.post(`${apiServer}/admin/withdraw/record/audit`, qs.stringify(params)
    )
        .then(response => response.data);
};

// 合作商家满意度
export const partnerSatisfaction = (pageNumbers, pageSizes, conditions, sorts, ids, memberId) => {
    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (ids) {
        params.id = ids;
    }
    if (memberId) {
        params.memberId = memberId;
    }
    params.columns = 'id,salesPartnerId,salesPartner.businessName,salesPartner.houseName,grade'
    return axios.post(`${apiServer}/admin/sales/partner/grade/page`, qs.stringify(params))
        .then(response => response.data);
};

// 员工满意度

export const peopleSatisfaction = (pageNumbers, pageSizes, conditions, sorts, ids, operNo, operName, needDateFrom, needDateTo) => {
    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (ids) {
        params.id = ids;
    }
    if (operNo) {
        params.operNo = operNo;
    }
    if (operName) {
        params["oper.operName"] = operName;
    }
    if (needDateFrom) {
        params["gradeDate_ge"] = needDateFrom ? needDateFrom.getFullYear() + '-' + (needDateFrom.getMonth() + 1) + '-' + needDateFrom.getDate() : '';
        params["gradeDate_le"] = needDateTo ? needDateTo.getFullYear() + '-' + (needDateTo.getMonth() + 1) + '-' + needDateTo.getDate() : '';
    }
    // params.orderBy="t.create_date desc"
    // params.groupBy="operNo"
    params.columns = 'id,operNo,grade,oper.operName,gradeDate,oper.parentOperNo,sum(grade)/count(Id) as avgGrade'
    return axios.post(`${apiServer}/admin/operator/grade/page`, qs.stringify(params))
        .then(response => response.data);
};

// 通知发送接口
export const verificationNotice = (ids) => {
    var params = [];
    params.ids = ids;
    return axios.post(`${apiServer}/admin/order/verificationNotice`, qs.stringify(params))
        .then(response => response.data);
};


// 登录
// export const gologin = (names,passwords) => {
//     var params = [];
//     params.operNo = names;
//     params.password = passwords;
//     return axios.post(`${apiServer}/admin/operator/login`,qs.stringify(params))
//         .then(response => response.data);
// };
export const gologin = (names, passwords) => {
    return axios.get(`${apiServer}/admin/operator/login`, {
        params: {'operNo': names, 'password': passwords,}
    })
        .then(response => response.data);
};

// 退款
export const orderrefundAmount = (ids, moneys) => {
    var params = [];
    params.orderId = ids;
    params.refundAmount = moneys;
    // weixinAmount微信退钱金额；balanceAmount:补充菜钱退款金额；commissionAmount:分销退款金额
    // params.refundAmount = moneys;
    // params.refundAmount = moneys;

    return axios.post(`${apiServer}/admin/order/refund`, qs.stringify(params))
        .then(response => response.data);
};

//匹配地区
// export const getmatchingArea4 = (houseName) => {
//     var params = [];
//     params.area_lk = houseName;
//     // customQuery="(t.house like '%y%' or t.house like '%b%')";
//     // customQuery="(t.house like '%y%' or t.house like '%b%')";
//     // params.columns = 'parentArea.area,parentArea4.area'+'&area_lk='+houseName
//     params.columns = 'parentArea.area,parentArea2.area,parentArea3.area,parentArea4.area'
//     return axios.post(`${apiServer}/admin/area/list`,qs.stringify(params))
//         .then(response => response.data);
// };
export const getmatchingArea4 = (houseName) => {
    return axios.get(`${apiServer}/admin/area/list`, {
        params: {
            'area_lk': houseName,
            'columns': 'parentArea.area,parentArea.id,parentArea3.area,parentArea3.id,parentArea2.operNo,parentArea2.area,parentArea2.id,parentArea4.area,parentArea4.id,area'
        }
    })
        .then(response => response.data);
};

//匹配菜驿站
// export const getmatchingStage = (houseName) => {
//     var params = [];
//     params.houseName_lk = houseName;
//     params.columns = 'id,businessPhone,stage,houseName'
//     return axios.post(`${apiServer}/admin/sales/partner/list`,qs.stringify(params))
//         .then(response => response.data);
// };
export const getmatchingStage = (houseName) => {
    return axios.get(`${apiServer}/admin/sales/partner/list`, {
        params: {'houseName_lk': houseName, 'columns': 'id,businessPhone,stage,houseName',}
    })
        .then(response => response.data);
};

export const updatamatchingArea4 = (ids, areaids) => {
    return axios.get(`${apiServer}/admin/order/batchUpdate`, {
        params: {'id': ids, 'area4.id': areaids,}
    })
        .then(response => response.data);
};

export const updataorderArea4 = (ids, thisarea2, thisarea3, thisarea4, operNo, operName, operMobile) => {
    var params = {};
    if (ids) {
        params.id = ids;
    }
    if (thisarea2) {
        params.area_id_level2 = thisarea2;
    }
    if (thisarea3) {
        params.area_id_level3 = thisarea3;
    }
    if (thisarea4) {
        params.area_id_level4 = thisarea4;
    }
    if (operNo) {
        params.oper_no = operNo;
    }
    if (operName) {
        params.operName = operName;
    }
    if (operMobile) {
        params.operMobile = operMobile;
    }
    return axios.get(`${apiServer}/admin/order/update`, {
        params
    })
        .then(response => response.data);
};

// 早晚 发送短信
export const sendmessagelog = (deliveryDates, types) => {
    return axios.get(`${apiServer}/admin/order/salesPartnerMessage`, {
        params: {'deliveryDate': deliveryDates, 'type': types,}
    })
        .then(response => response.data);
};


//匹配分拣人员
// export const getmatchingoperName = (operNamedata) => {
//     var params = {};
//     params.customQuery = operNamedata;
//     return axios.get(`${apiServer}/admin/area/list`, {params})
//         .then(response => response.data);
// };

export const getmatchingoperName = (operNamedata) => {
    var params = {};
    params.orderArea_lk = operNamedata;
    params.columns = 'area,fullName,id,operNo,orderArea,oper.operName,oper.operMobile';
    return axios.get(`${apiServer}/admin/area/list`, {params})
        .then(response => response.data);
};

// 更新用户地址
export const updataAddress = (ids, areaIdLevel2, areaIdLevel3, areaIdLevel4) => {
    var params = {};
    if (ids) {
        params.id = ids;
    }
    if (areaIdLevel2) {
        params.areaIdLevel2 = areaIdLevel2;
    }
    if (areaIdLevel3) {
        params.areaIdLevel3 = areaIdLevel3;
    }
    if (areaIdLevel4) {
        params.areaIdLevel4 = areaIdLevel4;
    }
    return axios.get(`${apiServer}/admin/address/update`, {params})
        .then(response => response.data);
};
/* ---------------------------2018-1-26------------------------------ */
// 商品管理-获取商品列表
export const getwechatgood = (data) => {
    var params = {};
    if (data) {
        if (data.pageNumber) {
            params.pageNumber = data.pageNumber;
        }
        if (data.pageSize) {
            params.pageSize = data.pageSize;
        }
        if (data['cat.name']) {
            params['cat.name_lk'] = data['cat.name'];
        }
        if (data['good.name']) {
            params['good.name_lk'] = data['good.name'];
        }
        if (data['specialsType.name']) {
            params['specialsType.name_lk'] = data['specialsType.name'];
        }
        if (data.status) {
            params.status_lk = data.status;
        }
        if (data.auditStatus) {
            params.auditStatus_lk = data.auditStatus;
        }
    }
    // 默认降序
    params.orderBy = 'id desc';
    // 获取列表参数
    params.columns = data && data.columns ? data.columns : 'id,goodId,good.id,cat.name,good.name,good.standard,good.smallimage,specialsType.name,good.unit,good.recipe_unit,stock,price,onlinePrice,type,status,auditStatus,dummyStock,actualStock,dummyStockStatus';
    return axios.get(`${apiServer}/admin/wechat/good/page`, {params})
        .then(response => response.data);
};
// 商品管理-获取导入商品
export const getimportgoods = (data) => {
    var params = {};
    if (data) {
        if (data.pageNumber) {
            params.pageNumber = data.pageNumber;
        }
        if (data.pageSize) {
            params.pageSize = data.pageSize;
        }
        if (data['cat.name']) {
            params['cat.name_lk'] = data['cat.name'];
        }
        if (data.name) {
            params['name_lk'] = data.name;
        }
    }
    // 默认降序
    params.orderBy = 'id desc';
    // 获取列表参数
    params.columns = data && data.columns ? data.columns : 'id,name,cat.name,specials_type_id,unit';
    return axios.get(`${apiServer}/admin/goods/page`, {params})
        .then(response => response.data);
};

// 商品管理-获取特产分类
export const getspecialstype = (data) => {
    var params = {};
    if (data) {
        if (data.pageNumber) {
            params.pageNumber = data.pageNumber;
        }
        if (data.pageSize) {
            params.pageSize = data.pageSize;
        }

        if (data.id) {
            params.id = data.id;
        }
        if (data.name) {
            params.name = data.name;
        }
    }
    // 默认降序
    params.orderBy = 'name asc';
    // 获取列表参数
    params.columns = data && data.columns ? data.columns : 'id,name';
    return axios.get(`${apiServer}/admin/specials/type/list`, {params})
        .then(response => response.data);
};
// 商品管理-获取商品分类
export const getcat = (data) => {
    var params = {};
    if (data) {
        if (data.pageNumber) {
            params.pageNumber = data.pageNumber;
        }
        if (data.pageSize) {
            params.pageSize = data.pageSize;
        }

    }
    // 默认降序
    params.orderBy = 'name asc';
    // 获取列表参数
    params.columns = data && data.columns ? data.columns : 'id,name';
    return axios.get(`${apiServer}/admin/goods/cat/list`, {params})
        .then(response => response.data);
};
// 商品管理-批量更新商品列表
export const batchupdategood = (data) => {
    var params = {};
    if (data) {
        // 更新 库存和单价
        if (data.batchUpdateColumnsList) {
            params.batchUpdateColumnsList = JSON.stringify(data.batchUpdateColumnsList);
        }
    }
    console.log(params)
    return axios.post(`${apiServer}/admin/wechat/good/batchUpdateGood`, qs.stringify(params))
        .then(response => response.data);
};
// 商品管理-批量更新商品上下线状态
export const batchupdatestatus = (data) => {
    var params = {};
    if (data) {
        if (data.ids) {
            params.ids = data.ids;
        }
        // 上下线状态
        if (data.onlineStatus) {
            params.onlineStatus = data.onlineStatus;
        }
    }
    return axios.post(`${apiServer}/admin/wechat/good/isOnlineconfig`, qs.stringify(params))
        .then(response => response.data);
};
// 商品管理-批量更新商品审核状态
export const batchupdateauditstatus = (data) => {
    var params = {};
    if (data) {
        if (data.ids) {
            params.ids = data.ids;
        }
        // 审核状态
        if (data.auditStatus) {
            params.auditStatus = data.auditStatus;
        }
    }
    return axios.post(`${apiServer}/admin/wechat/good/auditconfig`, qs.stringify(params))
        .then(response => response.data);
};
// 商品管理-批量导入商品
export const batchsavegood = (data) => {
    var params = {};
    if (data) {
        if (data.batchSaveColumnsList) {
            params.batchSaveColumnsList = JSON.stringify(data.batchSaveColumnsList);
        }
    }
    console.log(params)
    return axios.post(`${apiServer}/admin/wechat/good/batchSave`, qs.stringify(params))
        .then(response => response.data);
};
/* ---------------------------2018-1-29------------------------------ */
// 计划管理-获取平台订单
/* export const getplatformorder = (data) => {
    var params = {};
    if (data) {
        if (data.pageNumber) {
            params.pageNumber = data.pageNumber;
        }
        if (data.pageSize) {
            params.pageSize = data.pageSize;
        }
        if (data.plan_status) {
            if (data.plan_status == 0) {
                params.plan_status_n = data.plan_status;
            } else {
                params.plan_status = data.plan_status;
            }
            // params.plan_status = data.plan_status == 0 ? null : data.plan_status;
        }
        if (data['ord.delivery_date']) {
            params['ord.delivery_date_lk'] = data['ord.delivery_date'];
        }
    }
    params.orderBy = 'cat.name,goods.name';
    params.groupBy = 't.good_id,t.plan_status';
    params['ord.order_status_in'] = '1,3';
    // 获取列表参数
    params.columns = data && data.columns ? data.columns : 'cat.name,goods.id as goodId,group_concat(t.id) as ids,sum(t.quantity) as qty,ord.delivery_date,price,sum(t.price*t.quantity) as amount,goods.name,if(t.plan_status is null,0,1) as status';
    return axios.get(`${apiServer}/admin/order/detail/page`, {params})
        .then(response => response.data);
}; */
export const getplatformorder = (data) => {
    var params = {};
    if (data) {
        if (data.pageNumber) {
            params.pageNumber = data.pageNumber;
        }
        if (data.pageSize) {
            params.pageSize = data.pageSize;
        }
        if (data.deliveryDateFrom) {
            params.deliveryDateFrom = data.deliveryDateFrom;
        }
        if (data.deliveryDateTo) {
            params.deliveryDateTo = data.deliveryDateTo;
        }
        if (data.goodsName) {
            params.goodsName = data.goodsName;
        }
        if (data.goodsCatId) {
            params.goodsCatId = data.goodsCatId;
        }
        if (data.operNo) {
            params.operNo = data.operNo;
        }
    }
    return axios.get(`${apiServer}/admin/order/getTotalOrders`, {params})
        .then(response => response.data);
};
// 计划管理-批量导入平台订单
export const batchsavebusinessplan = (data) => {
    var params = {};
    if (data) {
        if (data.addBusinessPlanColumnsList) {
            params.addBusinessPlanColumnsList = JSON.stringify(data.addBusinessPlanColumnsList);
        }
    }
    return axios.post(`${apiServer}/admin/order/addBusinessPlan`, qs.stringify(params))
        .then(response => response.data);
};
/* ---------------------------2018-2-2------------------------------ */
// 计划管理-获取分组订单列表
export const getgrouporders = (data) => {
    var params = {};
    if (data) {
        if (data.pageNumber) {
            params.pageNumber = data.pageNumber;
        }
        if (data.pageSize) {
            params.pageSize = data.pageSize;
        }
        if (data.deliveryDateFrom) {
            params.deliveryDateFrom = data.deliveryDateFrom;
        }
        if (data.deliveryDateTo) {
            params.deliveryDateTo = data.deliveryDateTo;
        }
        if (data.parentOperName) {
            params.parentOperName = data.parentOperName;
        }
        if (data.operName) {
            params.operName = data.operName;
        }
        if (data.goodsCatId) {
            params.goodsCatId = data.goodsCatId;
        }
        if (data.goodsName) {
            params.goodsName = data.goodsName;
        }
        if (data.goodsId) {
            params.goodsId = data.goodsId;
        }
    }
    // 默认降序
    // params.orderBy = 'goodsCatName desc';
    // 获取列表参数
    // params.columns = data && data.columns ? data.columns : 'id,name';
    return axios.get(`${apiServer}/admin/order/getGroupingOrders`, {params})
        .then(response => response.data);
};
// 计划管理-获取分组经理配送员
export const getgrouporderperson = (data) => {
    var params = {};
    if (data) {
        if (data.parentOperNo) {
            params.parentOperNo = data.parentOperNo;
        }
    }
    // 获取列表参数
    params.columns = 'operatorRole,operName,parentOperNo,operNo';
    return axios.get(`${apiServer}/admin/operator/list`, {params})
        .then(response => response.data);
};


//获取会员列表
export const getpeoplemember = (pageNumbers, pageSizes, sorts, names, peoplemember,memberType,parentpeoplename) => {
    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (names) {
        params['username_lk'] = names;
    }
    if (peoplemember) {
        params['memberNo_lk'] = peoplemember;
    }
    if (parentpeoplename) {
        params['parent.username_lk'] = parentpeoplename;
    }
    if (memberType) {
        params.memberType = memberType;
    }
    params.orderBy = "id asc";
    params.columns = 'maxBuyPoint,parent.username,parent.nickname,id,balance,point,memberNo,username,memberType,image,nickname,incomeCoin,consumeCoin'
    return axios.post(`${apiServer}/admin/member/page`, qs.stringify(params))
        .then(response => response.data);
};

//获取非运营会员列表
export const getnpeoplemember = (pageNumbers, pageSizes, sorts, names, peoplemember,memberType,parentpeoplename) => {
    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (names) {
        params['username_lk'] = names;
    }
    if (peoplemember) {
        params['memberNo_lk'] = peoplemember;
    }
    if (parentpeoplename) {
        params['parent.username_lk'] = parentpeoplename;
    }
    if (memberType) {
        params.memberType = memberType;
    }
    params.memberType = 9;
    params.orderBy = "id asc";
    params.columns = 'maxBuyPoint,parent.username,parent.nickname,id,balance,point,memberNo,username,memberType,image,nickname,incomeCoin,consumeCoin'
    return axios.post(`${apiServer}/admin/member/page`, qs.stringify(params))
        .then(response => response.data);
};

//更新会员信息
export const updatepeoplelist = (ids,balances, points,memberType) => {
    var params = [];
    params.id = ids;
    if (points) {
        params.point = points;
    }
    if (balances) {
        params.balance = balances;
    }
    if (memberType) {
        params.memberType = memberType;
    }
    return axios.post(`${apiServer}/admin/member/update`, qs.stringify(params))
        .then(response => response.data);
};

//绑定上级会员
export const updateparentpeople = (ids,parentid) => {
    var params = [];
    params.id = ids;
    params.parent_Id = parentid;
    return axios.post(`${apiServer}/admin/member/update`, qs.stringify(params))
        .then(response => response.data);
};

//更新会员member
export const updatpeoplememberid = (ids,memberid,maxbuynum) => {
    var params = [];
    params.id = ids;
    if(memberid){
        params.memberNo = memberid;
    }
    if(maxbuynum){
        params.maxBuyPoint = maxbuynum;
    }
    return axios.post(`${apiServer}/admin/member/update`, qs.stringify(params))
        .then(response => response.data);
};

// 上传图片
export const updaimg = (formdata) => {
    return axios.post(`${apiServer}/admin/adv/save`, formdata)
        .then(response => response.data);
};

export const moreupdaimg = (formdata) => {
    return axios.post(`${apiServer}/admin/goods/imageUpload`, formdata)
        .then(response => response.data);
};

// 获取图片列表
export const getimglist = (type) => {
    var params = [];
    params.type = type;
    // console.log(1111)
    // var config = {
    //  onUploadProgress: progressEvent => {
    //   var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
    //   console.log(complete)
    //   console.log(2222)
    //      }
    //  }
    // params.columns = '';
    // return axios.post(`${apiServer}/admin/adv/list`, qs.stringify(params), config)
    return axios.post(`${apiServer}/admin/adv/list`, qs.stringify(params))
        .then(response => response.data);
};

// 删除图片
export const removeimgfun = (ids) => {
    var params = [];
    params.id = ids;
    return axios.post(`${apiServer}/admin/adv/delete`, qs.stringify(params))
        .then(response => response.data);
};


// 获取供应商
export const getsupplierlist = (pageNumber,pageSize,id,name,isdel) => {
    var params = {};
    if (pageNumber) {
        params.pageNumber = pageNumber;
    }
    if (pageSize) {
        params.pageSize = pageSize;
    }
    if (id) {
        params.id = id;
    }
    if (name) {
        params.name_lk = name;
    }
    if(isdel){
         params.isdel = isdel;
    }
   
    params.orderBy = "id asc"
     return axios.get(`${apiServer}/admin/goods/supplier/page`, {params})
        .then(response => response.data);
};

// 获取商品类型
export const gettypelist = () => {
    var params = [];
    // params.id = ids;
    return axios.post(`${apiServer}/admin/goods/type/list`, qs.stringify(params))
        .then(response => response.data);
};


// 获取商品类别
export const getcategoryIdsdata = (ids) => {
    var params = [];
    // params.id = ids;
    if(ids){
       params.ids = ids;
    }
    return axios.post(`${apiServer}/admin/goods/category/goodsCategoryList`, qs.stringify(params))
        .then(response => response.data);
};

// 获取商品类别(单个)
export const getonecategorydata = (id) => {
    var params = {};
    // params.id = ids;
    if(id){
        params.id = id;
    }
    return axios.get(`${apiServer}/admin/goods/category/get`, {params})
        .then(response => response.data);
};


// 获取商品标签
export const getlabelIdsdata = (ids) => {
    var params = [];
     if(ids){
       params.ids = ids;
    }
    // params.id = ids;
    return axios.post(`${apiServer}/admin/goods/label/list`, qs.stringify(params))
        .then(response => response.data);
};

// 新增商品
export const savegoods = (formdata) => {
     return axios.post(`${apiServer}/admin/goods/save`, formdata)
        .then(response => response.data);
};

// 更新商品
export const updateGood = (formdata) => {
     return axios.post(`${apiServer}/admin/goods/updateGood`, formdata)
        .then(response => response.data);
};

// 自营商品列表
export const getgoodslist = (pageNumber,pageSize,goodname,id,typename,suppliername,isOnline,status,catid,parent2catid,parent1catid,isdel) => {
     var params = {};
    if (pageNumber) {
        params.pageNumber = pageNumber;
    }
    if (pageSize) {
        params.pageSize = pageSize;
    }
    if (goodname) {
        params.name_lk = goodname;
    }
    if (id) {
        params.id = id;
    }
    if (typename) {
        params['type.name_lk'] = typename;
    }
    if (suppliername) {
        params['supplier.name_lk'] = suppliername;
    }
    if (isOnline) {
        params.isOnline = isOnline;
    }
    if (status) {
        params.status = status;
    }
    if (catid) {
        params['cat.id'] = catid;
    }
    if (parent2catid) {
        params['parent2.id'] = parent2catid;
    }
    if (parent1catid) {
        params['parent1.id'] = parent1catid;
    }
    if(isdel){
        params.isdel = isdel;
    }else{
        params.isdel = 0;
    }
    params['supplier.isdel'] = '0';
    params.orderBy = "id desc";
    params.merchantId = 0;
    params.columns = 'id,name,sort,type.name,supplier.name,isOnline,indexImage,status,updatedTime,merchantId,isdel'
     return axios.get(`${apiServer}/admin/goods/page`, {params})
        .then(response => response.data);
};

// 自营商品列表
export const getngoodslist = (pageNumber,pageSize,goodname,id,typename,suppliername,isOnline,status,catid,parent2catid,parent1catid, merchantId) => {
    var params = {};
   if (pageNumber) {
       params.pageNumber = pageNumber;
   }
   if (pageSize) {
       params.pageSize = pageSize;
   }
   if (goodname) {
       params.name_lk = goodname;
   }
   if (id) {
       params.id = id;
   }
   if (typename) {
       params['type.name_lk'] = typename;
   }
   if (suppliername) {
       params['supplier.name_lk'] = suppliername;
   }
   if (isOnline) {
       params.isOnline = isOnline;
   }
   if (status) {
       params.status = status;
   }
   if (catid) {
       params['cat.id'] = catid;
   }
   if (parent2catid) {
       params['parent2.id'] = parent2catid;
   }
   if (parent1catid) {
       params['parent1.id'] = parent1catid;
   }
    if (merchantId) {
        params.merchantId = merchantId;
    } else {
        params.merchantId_ne = 0;
    }

   params.isdel = '0';
   params.orderBy = "id desc";
   params.columns = 'id,name,sort,type.name,supplier.name,isOnline,indexImage,status,updatedTime,merchantId,merchant.shopName'
    return axios.get(`${apiServer}/admin/goods/page`, {params})
       .then(response => response.data);
};

// 商品详情
export const getgooddetails = (id) => {
     var params = {};
        params.id = id;
     return axios.get(`${apiServer}/admin/goods/goodsDetail`, {params})
        .then(response => response.data);
};


// 获取商品所属供应商
export const getgoodsupplier = (id) => {
    var params = {};
    params.isdel ='0';
    return axios.get(`${apiServer}/admin/goods/supplier/list`, {params})
     .then(response => response.data);
};


//// 获取商品所属类型
//export const getgoodtype = (id) => {
//   var params = {};
//      params.id = id;
//   return axios.get(`${apiServer}/admin/goods/type/list`, {params})
//      .then(response => response.data);
//};

// 新增商品类别（）
export const insertcategorypar = (data) => {
     var params = {};
        params.name = data.name;
        params.isOnline = data.isOnline;
        params.parentId = data.parentId;
        params.grade = data.grade;
        params.sort = data.sort;
    return axios.post(`${apiServer}/admin/goods/category/save`, qs.stringify(params))
        .then(response => response.data);
};

// 修改商品类别（）
export const updatecategorychi = (formdata) => {
    return axios.post(`${apiServer}/admin/goods/category/update`, formdata)
        .then(response => response.data);
};

// 删除商品类别
export const delcategoryid = (data) => {
     var params = {};
        params.id = data.id;
    return axios.post(`${apiServer}/admin/goods/category/delete`, qs.stringify(params))
        .then(response => response.data);
};

export const getrental =(sorts,names,names2,status,needDateFrom,needDateTo,memberNo) =>{
     var params = {};
      if (sorts) {
        params.orderBy = sorts;
    }
    if (names) {
        params["member.username_lk"] = names;
    }
    if (status) {
        params.status = status;
    }
    if (needDateFrom) {
        params.createdTime_ge = needDateFrom + ' 00:00:00';
    }
    if (needDateTo) {
        params.createdTime_le = needDateTo + ' 23:59:59';
    }
    if(memberNo){
        params['member.memberNo_lk'] = memberNo;
    }
    params.orderBy = 'createdTime asc'
    params.columns='sum(t.amount) as amount'
     return axios.post(`${apiServer}/admin/withdraw/record/list`, qs.stringify(params))
        .then(response => response.data );
};
// 提现列表
export const getbalancelist = (pageNumbers, pageSizes, sorts, names, names2, status, needDateFrom, needDateTo,memberNo,bankName,bankusername) => {
    var params = {};
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (names) {
        params["member.username_lk"] = names;
    }
    if (status) {
        params.status = status;
    }
    if (needDateFrom) {
        params.createdTime_ge = needDateFrom + ' 00:00:00';
    }
    if (needDateTo) {
        params.createdTime_le = needDateTo + ' 23:59:59';
    }
    if(memberNo){
        params['member.memberNo_lk'] = memberNo;
    }
    if(bankName){
        params.bankName = bankName;
    }
    if(bankusername){
        params.bankusername = bankusername;
    }
    params.orderBy = "createdTime asc"
    params.columns='id,member.username,amount,memberId,status,auditTime,auditBy,createdTime,member.memberNo,bankName,bankusername,bankAccount'
     return axios.post(`${apiServer}/admin/withdraw/record/page`, qs.stringify(params))
        .then(response => response.data );
};

// 提现审核
export const balanceexamine = (ids,status) => {
    var params = [];
    params.id = ids;
    params.status=status;
     return axios.post(`${apiServer}/admin/withdraw/record/audit`, qs.stringify(params))
        .then(response => response.data);
};

// 新增商品标签（）
export const insertlabel = (data) => {
     var params = {};
        params.isIndexOnline = data.isIndexOnline;
        params.name = data.name;
        params.parentId = data.parentId;
        params.grade = data.grade;
        params.sort = data.sort;
    return axios.post(`${apiServer}/admin/goods/label/save`, qs.stringify(params))
        .then(response => response.data);
};

// 修改商品标签（）
export const updatelabel = (data) => {
     var params = {};
        params.name = data.name;
        params.grade = data.grade;
        params.id = data.id;
        params.isIndexOnline = data.isIndexOnline;
        params.sort = data.sort;
        params.parentId = data.parentId;
        
    return axios.post(`${apiServer}/admin/goods/label/update`, qs.stringify(params))
        .then(response => response.data);
};

// 删除商品标签
export const dellabelid = (data) => {
     var params = {};
        params.id = data.id;
    return axios.post(`${apiServer}/admin/goods/label/delete`, qs.stringify(params))
        .then(response => response.data);
};


// 新增供应商（）
export const insertsupplier = (data) => {
     var params = {};
        params.name = data.name;
        if(data.id){
            params.id = data.id;
        }
    return axios.post(`${apiServer}/admin/goods/supplier/save`, qs.stringify(params))
        .then(response => response.data);
};

// 修改供应商（）
export const updatesupplier = (data) => {
     var params = {};
    // 获取列表参数
    if (data) {
        // 更新 库存和单价
        if (data.batchUpdateColumnsList) {
            params.batchUpdateColumnsList = JSON.stringify(data.batchUpdateColumnsList);
        }
    }
    return axios.post(`${apiServer}/admin/goods/supplier/batchUpdateColumnsList`, qs.stringify(params))
        .then(response => response.data);
};

// 删除供应商
export const delsupplierid = (data) => {
     var params = {};
        params.id = data.id;
        params.isdel = '1';
    return axios.post(`${apiServer}/admin/goods/supplier/update`, qs.stringify(params))
        .then(response => response.data);
};

//恢复供应商regain
export const regainsupplier =(id) =>{
    var params = {};
    params.id =id;
    params.isdel = "0";
    return axios.post(`${apiServer}/admin/goods/supplier/update`, qs.stringify(params))
        .then(response => response.data);
}
// 文章列表
export const getarticlelist = (pageNumbers,pageSizes,id,title,author,articletype,status,needDateFrom,needDateTo) => {
    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (id) {
        params.id = id;
    }
    if (title) {
        params.title_lk = title;
    }
    if (author) {
        params.author_lk = author;
    }  
    if (articletype) {
        params['sort.name_lk'] = articletype;
    }    
    if (status) {
        params.status = status;
    }  
    if(needDateFrom) {
        params.createdTime_ge = needDateFrom + ' 00:00:00';
        params.createdTime_le = needDateTo + ' 23:59:59';
    }
    params.orderBy = "createdTime desc"
    params.columns='id,title,sort.name,author,status,createdTime'
    return axios.post(`${apiServer}/admin/article/page`, qs.stringify(params))
        .then(response => response.data);
};


// 文章详情
export const getarticledetails = (id) => {
    var params = {};
    params.id = id;
    return axios.get(`${apiServer}/admin/article/list`, {params}
    ).then(response => response.data);
};

// 文章根据id删除
export const delarticle = (id) => {
    var params = {};
    params.id = id;
    return axios.get(`${apiServer}/admin/article/delete`, {params}
    ).then(response => response.data);
};

// 文章分类列表
export const getarticledtype = () => {
    var params = {};
    return axios.get(`${apiServer}/admin/article/sort/list `, {params}
    ).then(response => response.data);
};

// 文章保存
export const updatearticle = (data) => {
    let formdata = new FormData();
    if (data.id) {
        formdata.append('id',data.id);
    }
    if (data.title) {
        formdata.append('title',data.title);
    }
    if (data.subhead) {
        formdata.append('subhead',data.subhead);
    }    
    if (data.author) {
        formdata.append('author',data.author);
    }  
    if (data.typeId) {
        formdata.append('sortId',data.typeId);
    }
    if (data.status) {
        formdata.append('status',data.status);
    }
    if (data.content) {
        formdata.append('content',data.content);
    }
    if(data.icon_file){
        formdata.append('icon_file',data.icon_file);
    }
    return axios.post(`${apiServer}/admin/article/update`,formdata)
        .then(response => response.data);
};

// 文章新增
export const insertarticle = (data) => {
    let formdata = new FormData();
    if (data.title) {
        formdata.append('title',data.title);
    }
    if (data.subhead) {
        formdata.append('subhead',data.subhead);
    }    
    if (data.author) {
        formdata.append('author',data.author);
    }  
    if (data.typeId) {
        formdata.append('sortId',data.typeId);
    }
    if (data.status) {
        formdata.append('status',data.status);
    }
    if (data.content) {
        formdata.append('content',data.content);
    }
    if(data.icon_file){
        formdata.append('icon_file',data.icon_file);
    }
    return axios.post(`${apiServer}/admin/article/save`, formdata)
        .then(response => response.data);
};

// 商品类别列表page
export const getcategorylist = (pageNumbers,pageSizes, grade, name, parname,parentId,id,sort) => {
    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
        params.grade = grade;
        params.sort = sort;
    if (name) {
        params.name_lk = name;
    }
    if (parname) {
        params['parent.name_lk'] = parname;
    }
    if (parentId) {
        params.parentId = parentId;
    }
    if (id) {
        params.id = id;
    }
    
    params.orderBy = "sort asc"
    params.columns='id,grade,parent.name,name,sort,image,parentId'
    return axios.post(`${apiServer}/admin/goods/category/page`, qs.stringify(params))
        .then(response => response.data);
};

// 保存商品类别列表page
export const updatecategorylist = (data) => {
    var params = {};
    // 获取列表参数
    if (data) {
        // 更新 库存和单价
        if (data.batchUpdateColumnsList) {
            params.batchUpdateColumnsList = JSON.stringify(data.batchUpdateColumnsList);
        }
    }
    return axios.post(`${apiServer}/admin/goods/category/batchUpdateColumnsList`, qs.stringify(params))
        .then(response => response.data);
};

// 批量商品审核
export const batchauditmerchandise = (ids,status) => {
    var params = [];
    params.id = ids;
    params.status=status;
     return axios.post(`${apiServer}/admin/goods/batchUpdate`, qs.stringify(params))
        .then(response => response.data);
};

// 批量删除商品(其实是isdel变成1)
export const deletegood = (ids,isdel) => {
    var params = [];
    params.id = ids;
    params.isdel=isdel;
     return axios.post(`${apiServer}/admin/goods/batchUpdate`, qs.stringify(params))
        .then(response => response.data);
};

// 批量保存商品列表序号
export const updategoodlistsort = (data) => {
   var params = {};
    // 获取列表参数
    if (data) {
        // 更新 库存和单价
        if (data.batchUpdateColumnsList) {
            params.batchUpdateColumnsList = JSON.stringify(data.batchUpdateColumnsList);
        }
    }
    return axios.post(`${apiServer}/admin/goods/batchUpdateColumnsList`, qs.stringify(params))
        .then(response => response.data);
};


// 商品标签列表page
export const getlabellist = (pageNumbers,pageSizes, grade, name, parname) => {
    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
        params.grade = grade;
    
    if (name) {
        params.name_lk = name;
    }
    if (parname) {
        params['parent.name_lk'] = parname;
    }      
    params.orderBy = "grade asc,sort asc"
    params.columns='id,grade,parent.name,name,sort'
    return axios.post(`${apiServer}/admin/goods/label/page`, qs.stringify(params))
        .then(response => response.data);
};

// 保存商品标签列表page
export const updatelabellist = (data) => {
    var params = {};
    // 获取列表参数
    if (data) {
        // 更新 库存和单价
        if (data.batchUpdateColumnsList) {
            params.batchUpdateColumnsList = JSON.stringify(data.batchUpdateColumnsList);
        }
    }
    return axios.post(`${apiServer}/admin/goods/label/batchUpdateColumnsList`, qs.stringify(params))
        .then(response => response.data);
};

// 获取商品标签(单个)
export const getonelabeldata = (id) => {
    var params = {};
    // params.id = ids;
    if(id){
        params.id = id;
    }
    return axios.get(`${apiServer}/admin/goods/label/get`, {params})
        .then(response => response.data);
};

// 获取商品类型
export const getgoodtypelist = (pageNumber,pageSize,id,name) => {
    var params = {};
    if (pageNumber) {
        params.pageNumber = pageNumber;
    }
    if (pageSize) {
        params.pageSize = pageSize;
    }
    if (id) {
        params.id = id;
    }
    if (name) {
        params.name_lk = name;
    }
    params.orderBy = "id asc"
     return axios.get(`${apiServer}/admin/goods/type/page`, {params})
        .then(response => response.data);
};

// 新增商品类型（）
export const insertgoodtype = (data) => {
     var params = {};
        params.name = data.name;
        if(data.id){
            params.id = data.id;
        }
    return axios.post(`${apiServer}/admin/goods/type/save`, qs.stringify(params))
        .then(response => response.data);
};

// 修改商品类型（）
export const updategoodtype = (data) => {
     var params = {};
    // 获取列表参数
    if (data) {
        // 更新 库存和单价
        if (data.batchUpdateColumnsList) {
            params.batchUpdateColumnsList = JSON.stringify(data.batchUpdateColumnsList);
        }
    }
    return axios.post(`${apiServer}/admin/goods/type/batchUpdateColumnsList`, qs.stringify(params))
        .then(response => response.data);
};

// 删除商品类型
export const delgoodtypeid = (data) => {
     var params = {};
        params.id = data.id;
    return axios.post(`${apiServer}/admin/goods/type/delete`, qs.stringify(params))
        .then(response => response.data);
};

// 商品类别按级别搜索下拉数据
export const getcategorygrade = (grade) => {
    var params = {};
    if(grade){
        params.grade = grade;
    }
//  params.orderBy = "parent2.id asc,parent.id asc"
    params.orderBy = "grade asc"
    params.columns='parent.name,parent.id,parent2.id,parent2.name,name,id'
    return axios.get(`${apiServer}/admin/goods/category/list`, {params})
        .then(response => response.data);
};


 // 日期格式化
export function dateFormat(date,formats) {
  let format = formats;
  
  if (date != 'Invalid Date') {
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
            ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  }
  return '';

}

// 获取商铺列表
export const getshop = (pageNumbers, pageSizes, sorts, shopNames,status,carIds, phone,shopStatus,account,province,city,town,memberId,username) => {

    var params = [];
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if(memberId){
        params['memberId_lk'] = memberId;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (shopNames) {
        params['shopName_lk'] = shopNames;
    }
    if (status) {
        params.status = status;
    }
    if (carIds) {
        params.catId = carIds;
    }
    if (phone) {
        params.phone_lk = phone;
    }
    if (shopStatus) {
        params.shopStatus = shopStatus;
    }
    if(account == 1){
        params['oper.operNo_nn'] = account;
      
    }else{
         params['oper.operNo_n'] = account;
    }
    if (province) {
        params['area1.id'] = province;
    }
    if (city) {
        params['area2.id'] = city;
    }
    if (town) {
        params['area3.id'] = town;
    }
    if(username){
        params['member.username_lk'] = username;
    }
    params.orderBy='createdTime desc'
    params.columns = 'id,shopName,status,phone,catId,member.memberNo,memberId,shopStatus,member.username,member.memberType,cat.name,operNo,oper.operName,area1.area,area2.area,area3.area'
    return axios.post(`${apiServer}/admin/merchant/page`, qs.stringify(params))
        .then(response => response.data);
};

// 商铺审核
export const updateshop = (ids,status) => {
    var params = [];
    params.id = ids;
    params.status=status;
     return axios.post(`${apiServer}/admin/merchant/update`, qs.stringify(params))
        .then(response => response.data);
};

// 获取商铺
export const shopdetails = (id) => {
    var params = [];
    params.id=id;
    // params.columns = ''
    return axios.post(`${apiServer}/admin/merchant/get`, qs.stringify(params))
        .then(response => response.data)

};

// 商铺类型
export const getshopcatId = () => {
    var params = [];
    params.orderBy='sort asc';
    // params.status=status;
     return axios.post(`${apiServer}/admin/merchant/cat/list`, qs.stringify(params))
        .then(response => response.data);
};

export const updateshopdetails = (formdata) => {
     return axios.post(`${apiServer}/admin/merchant/update`, formdata)
        .then(response => response.data);
};

// 快递公司
export const getcouriercompany = () => {
    var params = {};
    return axios.get(`${apiServer}/admin/express/list`, {params})
        .then(response => response.data);
};

// 快递单号绑定订单号
export const bindingcourierandorder = (ids,couriercompanyid,courierId) => {
     var params = {};
        if(ids){
            params.id = ids;
        }
        if(couriercompanyid){
            params.expressId = couriercompanyid;
        }
        if(courierId){
            params.expressNo = courierId;
        }
        console.log(params);
    return axios.post(`${apiServer}/admin/order/deliver`, qs.stringify(params))
        .then(response => response.data);
};

// 保存新加标签
export const savegoodsspec = (levelList1,levelList2,levelList3) => {
     var params = {};
        
        if(levelList1){
            params.levelList1 = JSON.stringify(levelList1);
        }
        if(levelList2){
            params.levelList2 = JSON.stringify(levelList2);
        }
        if(levelList3){
            params.levelList3 = JSON.stringify(levelList3);
        }
    return axios.post(`${apiServer}/admin/goods/specification/label/saveSpecLabel`, qs.stringify(params))
        .then(response => response.data);
};

// 获取商品规格标签
export const getspeclist = (id) => {
    var params = {};
    //if(pid){
            params.goodsId = id;
   //}
    return axios.get(`${apiServer}/admin/goods/specification/label/getSpecLabelList`, {params})
        .then(response => response.data);
};

// 删除商品规格标签
export const delspecone = (id,labelId) => {
    var params = {};
    //if(pid){
        params.labelId = labelId;
            params.id = id;
   //}
    return axios.post(`${apiServer}/admin/goods/specification/value/deleteSpecLabel`, qs.stringify(params))
        .then(response => response.data);    
};

// 更改商品规格标签主名
export const delspecqueen = (name,id) => {
    var params = {};
    //if(pid){
        params.name = name;
            params.id = id;
   //}
    return axios.post(`${apiServer}/admin/goods/specification/value/deleteSpecLabel`, qs.stringify(params))
        .then(response => response.data);    
};

// 订单详情的退款按钮
export const returnordermon = (id) => {
    var params = {};
    //if(pid){
            params.id = id;
   //}
    return axios.post(`${apiServer}/admin/return/record/refund`, qs.stringify(params))
        .then(response => response.data);    
};

// 关闭订单
export const closeorder = (id,isClosed) => {
    var params = {};
    //if(pid){
        params.isClosed = isClosed;
            params.id = id;
   //}
    return axios.post(`${apiServer}/admin/order/update`, qs.stringify(params))
        .then(response => response.data);    
};

// 获取已发货的快递订单信息
export const getexpress = (id) => {
    var params = {};
        params.orderId = id;
    return axios.get(`${apiServer}/admin/order/express/get`, {params})
        .then(response => response.data);
};


// 更改已发货的快递订单信息
export const updateexpress = (id,name,Number) => {
    var params = {};
        params.id = id;
        if(name){
            params.expressId = name;
        }
        if(Number){
            params.expressNo = Number;
        }
    return axios.get(`${apiServer}/admin/order/express/update`, {params})
        .then(response => response.data);
};


// 获取退货申请列表
export const getreturnorderpage = (pageNumbers,pageSizes,ordernumber,ordername,needDateFrom,needDateTo,status) => {
   var params = {};
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if(ordernumber) {
        params['ord.order_no_lk'] = ordernumber;
    }
    if(ordername)   {
        params['goods.name_lk']= ordername;
    }
    if (needDateFrom) {
        params.requestTime_ge = needDateFrom + ' 00:00:00';
    }
    if (needDateTo) {
        params.requestTime_le = needDateTo + ' 23:59:59';
    }   
    if (status) {
        params.status = status;
    }   
    params.orderBy = "requestTime desc"
    params.columns = "id,status,ord.order_no,goods.name,requestTime"
    return axios.get(`${apiServer}/admin/return/record/page`, {params})
        .then(response => response.data);    
};

// 审核退货申请
export const checkreturnorder = (id,status,operNo) => {
    var params = {};
    //if(pid){
        params.status = status;
        params.id = id;
        params.operNo = operNo;
            
   //}
    return axios.post(`${apiServer}/admin/return/record/audit`, qs.stringify(params))
        .then(response => response.data);    
};

// 线下充值-余额
export const addBalance = (id,amount) => {
    var params = {};
    params.id = id;
    params.amount = amount;
    return axios.post(`${apiServer}/admin/member/addBalance`, qs.stringify(params))
        .then(response => response.data);    
};

// 线下充值-积分
export const addPoint = (id,amount) => {
    var params = {};
    params.id = id;
    params.amount = amount;
    return axios.post(`${apiServer}/admin/member/addPoint`, qs.stringify(params))
        .then(response => response.data);    
};


// 用户列表
export const getuser = (pageNumbers,pageSizes,name) => {
    var params = {};
    if(name){
        params.operName_lk = name;
    }
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    params.columns = 'operNo,operName,group_concat(operRole.roleName) as roleNames,group_concat(role.cnname) as cnNames'
    return axios.post(`${apiServer}/admin/operator/page?customQuery=(operRole.roleName not in ("administrator", "finance") or operRole.roleName is null)`, qs.stringify(params))
        .then(response => response.data);    
};

// 新建用户
export const saveoperator = (params) => {
    return axios.post(`${apiServer}/admin/operator/save`, qs.stringify(params))
        .then(response => response.data);    
};

// 商家绑定帐号
export const bindingoperNo = (id,operNo) => {
    var params = {};
    params.id = id;
    params.operNo = operNo;
    return axios.post(`${apiServer}/admin/merchant/update`, qs.stringify(params))
        .then(response => response.data);    
};

// 权限角色列表
export const getrolelist = () => {
    var params = {};
    return axios.post(`${apiServer}/admin/role/list?name_nin=%27administrator%27,%27finance%27,%27manager%27`, qs.stringify(params))
        .then(response => response.data);    
};


// 分配权限
export const saveoperatorrole = (params) => {
    return axios.post(`${apiServer}/admin/operator/role/assignRoles`, qs.stringify(params))
        .then(response => response.data);    
};

// 获取菜单
export const getcascadedList = () => {
    return axios.post(`${apiServer}/admin/menu/cascadedList`, qs.stringify())
        .then(response => response.data);    
};

//修改最大限额
export const updatemaxbuy = (ids,maxbuynum) => {
    var params = [];
    params.id = ids;
    if(maxbuynum){
        params.maxBuyPoint = maxbuynum;
    }
    return axios.post(`${apiServer}/admin/member/changeMaxBuyPoint`, qs.stringify(params))
        .then(response => response.data);
};

//修改密码
export const updatePassword = (oldPassword,newPassword,confirmPassword) => {
    var params = [];
    params.oldPassword = oldPassword;
    params.newPassword = newPassword;
    params.confirmPassword = confirmPassword;
    return axios.post(`${apiServer}/admin/operator/changePassword`, qs.stringify(params))
        .then(response => response.data);
};


//批量确认订单
export const updateconfirmoreder = (ids) => {
    var params = [];
    params.id = ids;
    return axios.post(`${apiServer}/admin/order/confirm`, qs.stringify(params))
        .then(response => response.data);
};

//批量取消订单
export const cancelconfirmorder = (ids) => {
    var params = [];
    params.id = ids; 
    return axios.post(`${apiServer}/admin/order/rollbackConfirm`, qs.stringify(params))
        .then(response => response.data);
};

// 新建区域商家
export const saveareapartner = (params) => {
    return axios.post(`${apiServer}/admin/area/partner/save`, qs.stringify(params))
        .then(response => response.data);    
};
// 区域运营商列表
export const getareapartner = (pageNumbers, pageSizes, name) => {
    var params = {};
    // if (level) {
    //     params.level = level;
    // }
    if(name){
        params.nickname = name;
    }
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    params.columns = 'id,nickname,mobile,operNo,memberId,member.memberNo,level,area.fullName'
    return axios.post(`${apiServer}/admin/area/partner/page`, qs.stringify(params))
        .then(response => response.data);    
};

// 商店列表
export const getmerchantpage= (pageNumbers, pageSizes, name) => {
    var params = {};
    if(name){
        params.shopName_lk = name;
    }
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    params.columns = 'id,member.username,shopName,area1.area,area2.area,area3.area'
    return axios.post(`${apiServer}/admin/merchant/page`, qs.stringify(params))
        .then(response => response.data);    
};


// 获取区域订单列表
export const getareaorder = (pageNumbers, pageSizes, conditions, sorts, orderIds, usernames, userphones, innname, orderstatus, ordertypes, goodstypes, difference, needDateFrom, needDateTo, housedata, pdbindingStage, orderarea2, orderarea3, orderarea4, pdbindingoperName, pdbindingsalesPromoter, operNo, ordertype,address) => {
    var params = {};
    // var pdbindingStage1="";
    // var pdbindingStage2="";
    // var pdbindingoperName1="";
    // var pdbindingoperName2="";
    // var pdbindingsalesPromoter1="";
    // var pdbindingsalesPromoter2="";
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    if (sorts) {
        params.orderBy = sorts;
    }
    if (orderIds) {
        params['order_no_lk'] = orderIds;
    }
    if (usernames) {
        // params.consignee_lk=encodeURI(usernames);
        params.consignee_lk = usernames;
    }
    if (userphones) {
        params.mobile_lk = userphones;
    }
    if (innname) {
        params["salesPartner.stage_lk"] = innname;
    }
    if (orderstatus) {
        params["order_status_in"] = orderstatus;
    }
    if (ordertypes) {
        params.orderType = ordertypes;
    }
    if (goodstypes) {
        params.status = goodstypes;
    }
    if (housedata) {
        // params.house_lk=encodeURI(housedata);
        params.house_lk = housedata;
    }
    if (operNo) {
        params.oper_no = operNo;
    }
    if (orderarea2) {
        params.area_id_level2 = orderarea2;
    }
    if (orderarea3) {
        params.area_id_level3 = orderarea3;
    }
    if (orderarea4) {
        params.area_id_level4 = orderarea4;
    }
    if (pdbindingStage == 1) {
        params["salesPartnerStage_nb"] = 'null';
    } else if (pdbindingStage == 2) {
        params["salesPartnerStage_b"] = 'null';
    }
    if (pdbindingoperName == 1) {
        params["operName_nb"] = 'null';
    } else if (pdbindingoperName == 2) {
        params["operName_b"] = 'null';
    }
    if (pdbindingsalesPromoter == 1) {
        params["salesPromoter.name_nb"] = 'null';
    } else if (pdbindingsalesPromoter == 2) {
        params["salesPromoter.name_b"] = 'null';
    }
    if (difference == "2") {
        params["address_nb"] = 'null';
    } else if (difference == "1") {
        params["address_b"] = 'null';
    } else if (difference == "0") {

    }
    if (ordertype) {
        params.ordertype_in = ordertype;
    }
    if (address) {
        params.numberBuildings_lk = address;
    }
    
    if (needDateFrom) {
//      params["delivery_date_ge"] = needDateFrom + ' 00:00:00';
//      params["delivery_date_le"] = needDateTo + ' 23:59:59';
        params.create_date_ge = needDateFrom + ' 00:00:00';
        params.create_date_le = needDateTo + ' 23:59:59';
    }
    
    params.orderBy = "t.create_date desc";
    params.groupBy = "t.id";
    params.columns = 'id,orderType,isClosed,order_no,amount,consignee,member.nickname,member.username,member.image,mobile,house,numberBuildings,unit,roomNo,payment_date,create_date,order_status,originalTotalAmount';
    params.columns = 'id,order_no,area1.area,area2.area,area3.area,merchant.shopName,orderType,amount,get_points';
    return axios.get(`${apiServer}/admin/order/page`, {params})
        .then(response => response.data);
};


// 余额列表
export const getbalancepage= (pageNumbers, pageSizes, memberId) => {
    var params = {};
    if(memberId){
        params.memberId = memberId;
    }
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    params.orderBy = "recordTime desc";
    params.columns = 'id,amount,recordTime'
    return axios.post(`${apiServer}/admin/member/balance/record/page`, qs.stringify(params))
        .then(response => response.data);    
};


// 积分列表
export const getpointpage= (pageNumbers, pageSizes, memberId) => {
    var params = {};
    if(memberId){
        params.memberId = memberId;
    }
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    params.orderBy = "recordTime desc";
    params.columns = 'id,amount,recordTime'
    return axios.post(`${apiServer}/admin/member/point/record/page`, qs.stringify(params))
        .then(response => response.data);    
};


// 积分列表
export const getcoinpage= (pageNumbers, pageSizes, memberId, coinType) => {
    var params = {};
    if(memberId){
        params.memberId = memberId;
    }
    if(coinType){
        params.coinType = coinType;
    }
    if (pageNumbers) {
        params.pageNumber = pageNumbers;
    }
    if (pageSizes) {
        params.pageSize = pageSizes;
    }
    params.orderBy = "recordTime desc";
    params.columns = 'id,amount,recordTime'
    return axios.post(`${apiServer}/admin/member/coin/record/page`, qs.stringify(params))
        .then(response => response.data);    
};

// 更新商铺状态
export const updateshopstatus = (ids,shopStatus) => {
    var params = [];
    params.id = ids;
    params.shopStatus = shopStatus;
     return axios.post(`${apiServer}/admin/merchant/update`, qs.stringify(params))
        .then(response => response.data);
};

// 更新商铺省市区
export const updateshoparea = (ids, provinceId, cityId, townId) => {
    var params = [];
    params.id = ids;
    params.areaIdLevel1 = provinceId;
    params.areaIdLevel2 = cityId;
    params.areaIdLevel3 = townId;
     return axios.post(`${apiServer}/admin/merchant/update`, qs.stringify(params))
        .then(response => response.data);
};

// 获取非自营商家列表
export const getmerchantlist = () => {
    var params = [];
    params.merchnatId_ne = 0;
    params.columns = 'id, shopName';
    return axios.get(`${apiServer}/admin/merchant/list`, params)
        .then(response => response.data);
};

//获取转让信息列表
export const gettransferlist=(pageNumber,goodsName,username,tradetype,tradeStatus,province,city,town) =>{
    var params ={};
    if(pageNumber){
        params.pageNumber = pageNumber;
    }           
    if(goodsName){
        params.goodsName = goodsName;
    }
    if(username){
        params['member.username'] = username;
    }
    if(tradetype){
        params.tradetype = tradetype;
    }
    if(tradeStatus){
        params.tradeStatus = tradeStatus;
    }
    if (province) {
        params['area1.id'] = province;
    }
    if (city) {
        params['area2.id'] = city;
    }
    if (town) {
        params['area3.id'] = town;
    }
    params.type=1;
    params.orderBy = "t.createdTime desc";
    params.columns='id,price,totalQuantity,tradedQuantity,member.username,goodsName,goodsImage,type,tradeStatus,createdTime,expiredTime,tradetype,area1.area,area2.area,area3.area'
    return axios.get(`${apiServer}/admin/coin/trade/page`, {params})
     .then(response => response.data);
}

//获取认领信息列表
export const gettransferlist2=(pageNumber,goodsName,username,tradetype,tradeStatus,province,city,town) =>{
    var params ={};
    if(pageNumber){
        params.pageNumber = pageNumber;
    }           
    if(goodsName){
        params.goodsName = goodsName;
    }
    if(username){
        params['member.username'] = username;
    }
    if(tradetype){
        params.tradetype = tradetype;
    }
    if(tradeStatus){
        params.tradeStatus = tradeStatus;
    }
    if (province) {
        params['area1.id'] = province;
    }
    if (city) {
        params['area2.id'] = city;
    }
    if (town) {
        params['area3.id'] = town;
    }
    params.type=2;
    params.orderBy = "t.createdTime desc";
    params.columns='id,price,totalQuantity,tradedQuantity,member.username,goodsName,goodsImage,type,tradeStatus,createdTime,expiredTime,tradetype,area1.area,area2.area,area3.area'
    return axios.get(`${apiServer}/admin/coin/trade/page`, {params})
     .then(response => response.data);
}

//获取出让/认领交易记录
export const gettradrecord = (pageNumbers,orderid,goodsName,orderType,orderstatus,needDateFrom,needDateTo) => {
    var params = {};

    if(pageNumbers){
        params.pageNumber =pageNumbers
    }
    if(orderid){
        params['order_no_lk'] = orderid
    }
    if(goodsName){
        params['coinTrade.goodsName_lk'] = goodsName
    }
    if(orderType){
        params["orderType_in"] = orderType
    }
    if(orderstatus){
        params['order_status_in'] = orderstatus
    }
    if (needDateFrom) {
     // params["delivery_date_ge"] = needDateFrom + ' 00:00:00';
     // params["delivery_date_le"] = needDateTo + ' 23:59:59';
        params.create_date_ge = needDateFrom ;
        params.create_date_le = needDateTo;
    }
    params.orderBy = "t.create_date desc";
    // params.columns = 'id,orderType,isClosed,order_no,amount,consignee,member.nickname,member.username,member.image,mobile,house,numberBuildings,unit,roomNo,payment_date,create_date,order_status,originalTotalAmount,merchant.shopName,fullAddress';
    params.columns = 'orderType,isClosed,order_no,amount,member.username,payment_date,create_date,order_status,coinTrade.goodsName,coinTrade.goodsImage';
    return axios.get(`${apiServer}/admin/order/page`, {params})
        .then(response => response.data);
};