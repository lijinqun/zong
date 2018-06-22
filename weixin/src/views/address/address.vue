<template>
	<div class="address-box">
		<back back="/cart" title="地址信息" address="true"></back>
		<ul class="address-ul">
			<li v-for="(item,index) in myAdress">
				<div class="text-box">
					<div class="personal">
						<span class="name">{{decodeURI(decodeURI(item.consignee))}}</span>
						<span class="phone">{{item.mobile}}</span>
						<!-- <span class="ringhttxt" v-for="inndata in innlist" v-if="item.salesPartnerId==inndata.id">{{inndata.stage}}</span> -->
					</div>
					<p>{{(item["area4.fullName"]!=null?item["area4.fullName"]:item["area3.fullName"]!=null?item["area3.fullName"]:item["area2.fullName"]!=null?item["area2.fullName"]:'')}}
						<span v-if="item.house">{{(item.house!=null?decodeURI(decodeURI(item.house)):'')}}</span>
						<span v-if="item.address">
							<span v-if="item.house">(</span>
							{{decodeURI(decodeURI(item.address))}}
							<span v-if="item.house">)</span>
						</span>
						<span v-if="item.numberBuildings">{{(item.numberBuildings!=null?decodeURI(decodeURI(item.numberBuildings)):'')}}</span>
					<!-- 	<span v-if="item.unit">{{(item.unit!=null?decodeURI(item.unit):'')}}</span>
						{{(item.roomNo!=null?decodeURI(item.roomNo):'')}} -->
					</p>
					
				</div>
				<div class="button-box">
					<div class="address-dafult" @click="radio(item.id,index)">
						<i :class="{'i-action':item.defaultCheck}"></i>
						<span v-show="item.defaultCheck">默认地址</span>
						<span v-show="!item.defaultCheck">设为默认</span>
					</div>
					<span @click='compile(item.id)'>编辑</span>
					<span @click="delAddress(item.id,index)">删除</span>
				</div>
			</li>
		</ul>
		<div class="create-address">
			<div class="create-btn" @click="createAddress">添加新地址</div>
			<div class="create-btn rightbtn" @click="gocart">返回购物车</div>
		</div>
		 <!-- <ul class="address_box" v-if='myAdress.length' style="margin-top: 50px;margin-bottom: 40px">
			<li v-for='(address,index) in myAdress' @click='radio(index,address.id)'>
        <img height="25px" width="25px" style="float: left;margin:22px 8px 0 8px;" src="../assets/images/icon_nav_msg.png" v-if='(raddo==index)' >
        <div style="margin-left: 3%">	
        <p class="address_p">收件人：{{decodeURI(address.consignee)}}</p>
        <p class="address_p">电话：{{address.mobile}}<img style="transform: rotate(180deg);float: right;" width="25px" height="25px" src="../assets/back.png" @click.stop='compile(address.id)'></p>
        <p class="address_p">收货地址：
        {{(address.area1!=null?address.area1.area:'')
        +(address.area2!=null?address.area2.area:'')
        +(address.area3!=null?address.area3.area:'')
        +(address.area4!=null?address.area4.area:'')
        +(address.area5!=null?address.area5.area:'')
        +decodeURI(address.address)
        +(address.house!=null?decodeURI(address.house):'')
        +(address.numberBuildings!=null?decodeURI(address.numberBuildings):'')
        +(address.unit!=null?decodeURI(address.unit):'')
        +(address.roomNo!=null?decodeURI(address.roomNo):'')}}</p>
		</div>
      </li>
		</ul>
		<p v-else='addressArr.length ' style="margin-top: 50px;margin-bottom: 40px">暂无地址信息</p>
    <div class="settlement">
      <p @click='show()' class="settlement_address buy">添加新地址</p>
    </div>  -->
		<!-- Modal -->
<!-- <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document" style="margin: 60px">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">添加新地址</h4>
      </div>
      <div class="modal-body">
        <input type="text" name="" class="form-control" v-bind:class='{error:inname==""}' v-model='inname' placeholder="收件人姓名：">
        <input type="text" name="" class="form-control" v-bind:class='{error:inphone==""}' v-model='inphone' placeholder="收件人电话：">
        <div class="fz_form"><b>市</b> <span>珠海市</span></div>
        <div @click='hierarchy(0)' class="fz_form" ><b>区</b> <span v-text='qu'></span></div>
        <div @click='hierarchy(1)' class="fz_form" ><b>镇</b> <span v-text='zhen'></span></div>
        <div @click='hierarchy(2)' class="fz_form" ><b>社区</b> <span v-text='xiaoqu'></span></div>
         <div @click='hierarchy(3)' class="fz_form" ><b>小区</b> <span v-text='sbxq'></span></div>
	    <input type="text" name="" class="form-control" placeholder="栋号" v-model='sbdh'>
	    <input type="text" name="" class="form-control" placeholder="单元" v-model='sbdy'> 
	    <input type="text" name="" class="form-control" placeholder="房号" v-model='sbfh'>
        <input type="text" name="" class="form-control" v-model='inaddress'  placeholder="详细地址：">
      </div>
      <div id="about" class="weui-popup__container  popup-bottom" style="width: 100%;margin-bottom:20%;">
		  <div class="weui-popup__overlay"></div>
		  <div class="weui-popup__modal">
		    <div class="weui-cells weui-cells_radio" style="height: 300px;margin: 0 auto;border: 1px solid gray">
			  <label class="weui-cell weui-check__label"  v-for='(ad,index) in add' v-bind:for="'x'+index"  @click='hide(caseNum,ad,index)'>
			    <div class="weui-cell__bd" style="">
			      <p >{{ad}}</p>
			    </div>
			    <div class="weui-cell__ft">
			      <input type="radio" class="weui-check" name="radio1" v-bind:id="'x'+index">
			      <span class="weui-icon-checked"></span>
			    </div>
			  </label>
			</div>
		  </div>
		</div>
      <div class="modal-footer" style="margin-top: 0">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click='post()'>保存</button>
      </div>
    </div>
  </div>
</div> -->


	</div>
</template>
<script type="text/javascript">
	import back from './back.vue'
	export default{
		data(){
			return{
				// 驿站
				innlist:[],

				Things0:[],//记录区层级
				Things1:[],//记录镇层级
				Things2:[],//记录村层级
				Things3:[],//记录小区层级
				caseNum:0,//当前层级
				qu:'',//区的值
				zhen:'',//镇的值
				cun:'',//村的值
				xiaoqu:'',//小区的取值
				add:[],//当前层级的所有数据
				choseAdress:null,//所有层级数据
				inname:'',
				inphone:'',
				inaddress:'',//详细地址信息
				popupVisible:false,
				addressArr:[],
				addressUrl:"",
				raddo:-1,//实现单选功能
				textqu:'',//区的文本值
				areaIdLevel1:869,
				areaIdLevel2:870,
				areaIdLevel3:'',
				areaIdLevel4:'',
				areaIdLevel5:'',
				areaIdLevel:[],
				myAdress:[],
				sbxq:'',
				sbxq1:'',
				sbdh:'',
				sbdy:'',
				sbfh:''
			}
		},
		components: {
            back
        },
		methods:{
			radio(id,index){//设为默认地址
				var zhethis=this;
				var idarray="";
				this.myAdress.forEach((item)=>{
					item.defaultCheck = false;
					if(idarray==""){
						idarray=item.id;
					}else{
						idarray+=","+item.id;
					}
				})
				console.log(idarray)
				this.myAdress[index].defaultCheck = true;
				var openID = this.$store.state.weixin.finOpenid;
				// $.ajax({
				// 	type:"GET",
				// 	url: this.$store.state.base.baseurl+"weixin/address/selecteAddress.do?address.id="+id+"&openId="+openID,
				// 	data: '',
				// 	dataType: "",
				// 	success:function(data){                                       
				// 		// zhethis.getAdress();
				// 	},
				// 	error:function(error){
				// 		alert('系统错误！')
						
				// 	}
				// })
				$.ajax({
			        url: this.$store.state.commenturl.newbaseurl+'weixin/address/batchUpdate',
			        type: 'POST',
			        dataType: '',
			        data: { 
			        	'id':idarray,
			        	'defaultCheck':'0'
			        	 },
			        success: function(data) {
			        	$.ajax({
					        url: zhethis.$store.state.commenturl.newbaseurl+'weixin/address/update',
					        type: 'POST',
					        dataType: '',
					        data: { 
					        	'id':id,
					        	'defaultCheck':'1'
					        	 },
					        success: function(data) {
					        	zhethis.getAdress();
					        }
					    })
			        }
			    })
				
			},
			compile(i){//编辑
				console.log(i)
				localStorage.compileAdress = i
				this.$router.push('compile')
			},
			getAdress(){
			//获取用户已有地址信息
			var openID = this.$store.state.weixin.finOpenid
			var that = this
				// $.ajax({
				// 	type:"GET",
				// 	url: this.$store.state.base.baseurl+"weixin/address/addressList.do?address.openId="+openID,
				// 	data: '',
				// 	dataType: "",
				// 	success:function(data){                                       
				// 		that.myAdress=data.addressList//获取地址信息
				// 		console.log(that.myAdress)
				// 		that.myAdress.forEach((item)=>{
				// 			if(item.numberBuildings=='null'){
				// 				item.numberBuildings = ''
				// 			}
				// 			if(item.roomNo=='null'){
				// 				item.roomNo = ''
				// 			}
				// 			if(item.unit=='null'){
				// 				item.unit = ''
				// 			}
				// 		})
				// 	}
				// })

				
				$.ajax({
			        url: this.$store.state.commenturl.newbaseurl+'weixin/address/list',
			        type: 'POST',
			        dataType: '',
			        data: { 
			        	'open_id':openID,
			        	'columns':'id,defaultCheck,disabled,house,member_id,mobile,numberBuildings,open_id,roomNo,unit,consignee,areaIdLevel1,areaIdLevel2,areaIdLevel3,areaIdLevel4,areaIdLevel5,area2.fullName,area3.fullName,,area4.fullName'
			        	 },
			        success: function(data) {
			          	console.log(data)
			          	that.myAdress=data.data;
			          	that.myAdress.forEach((item)=>{
							if(item.numberBuildings=='null'){
								item.numberBuildings = ''
							}
							if(item.roomNo=='null'){
								item.roomNo = ''
							}
							if(item.unit=='null'){
								item.unit = ''
							}
						})
			        }
			    })
			},
			show(){
				$('#myModal').modal('show')
				console.log('show')
			},
			delAddress(id,index){
				// $.ajax({
				// 	type:"GET",
				// 	url: this.$store.state.base.baseurl+"weixin/address/deleteAddress.do?address.id="+id,
				// 	data: '',
				// 	dataType: "",
				// 	success:function(data){
				// 	},
				// 	error:function(error){
				// 		console.log(error)
						
				// 	}
				// })
				this.getAdress()
			},
			createAddress() {
				this.$router.push('createAddress')
			},
			gocart(){
				this.$router.push('cart')
			}
		},
		beforeRouteEnter(to,from,next){
			next(vm=>{
				 vm.$store.commit('showHead',true)
				 vm.$store.commit('showNav', false)
        		 vm.$store.commit('changeTitle', '地址信息')
				// 请求

				if(!localStorage.getItem('selfId')){
					$.ajax({
				        url: vm.$store.state.commenturl.newbaseurl+'weixin/member/get',
				        type: 'POST',
				        dataType: '',
				        data: {
				            'open_id':vm.$store.state.weixin.finOpenid,
				            'columns':'id,username,open_id,nickname,image'
				        },
				        success: function(data) {
				            console.log(data.data)
				            vm.$store.state.community.selfId = data.data.id;
				            vm.$store.state.weixin.finOpenid = data.data.open_id;
				            localStorage.setItem('selfId',data.data.id);
				            localStorage.setItem('codeStorage',data.data.open_id);
				        }
				    })
				}


							 // $.ajax({
        //                            type:"GET",
        //                            url: vm.$store.state.base.baseurl+"weixin/area/queryAreas.do",
        //                            data: '',
        //                            dataType: "",
        //                            success:function(data){                              
        //                                 vm.addressArr=JSON.parse(data.jsonStr)//获取地址信息
        //                                 console.log(vm.addressArr)
       	// 								vm.choseAdress = vm.addressArr[0].nodes[0].nodes
       	// 								console.log(vm.choseAdress)
       	//                             },
        //                            error:function(error){
        //                                 console.log(error)
                                      
        //                             }
        //                       })

        					// 驿站信息
							 // $.ajax({
						  //         url: vm.$store.state.commenturl.newbaseurl+'weixin/sales/partner/list',
						  //         type: 'POST',
						  //         dataType: '',
						  //         data: { 'columns':'id,businessPhone,businessAddress,stage,group_concat(bindingArea.area) houseName' },
						  //         success: function(data) {
						  //         	console.log(data)
						  //           vm.innlist = data.data;
						  //           // zhethis.innshow=true;
						  //           // zhethis.innwindowheight();
						  //           // if(zhethis.innlist==""){

						  //           // }
						  //         }
						  //       })
							 vm.getAdress()

	          // vm.$http.get('http://cliantech.com/cccec/weixin/area/queryAreas.do').then(function(data){
	          //   vm.addressArr=data.jsonStr
	          //   console.log(vm.addressArr)
	          // },function(response){

	          //   if(response){
	          //     //alert('e')
	          //   }
         	 // })
	          // 获取街道数据
	          // vm.choseAdress=cAdress
	          // console.log(vm.choseAdress)
        })
		},
		beforeRouteLeave(to, from, next){

      		this.$store.commit('showHead', false)
      		 this.$store.commit('showNav', true)
       		 next()//允许通过路由
   		 },
	}
</script>
<style scoped lang="sass">
	.address-box {
		padding-top: 49px;
		> .address-ul {
			padding-bottom: 2rem;
			> li {
				margin-bottom: 1rem;
				padding-left: .5rem;
				background-color: #fff;
				> .text-box {
					padding: .2rem 0;
					text-align: left;
					border-bottom: 1px solid #f2f2f2;
					> .personal {
						line-height: 1.4rem;
						.ringhttxt{
							float: right;
							padding-right: 0.3rem;
							padding-left: 0;
							max-width: 55%;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						> span + span {
							padding-left: 1rem;
						} 
					}
					> p {
						padding-right: 2rem;
						font-size: .5rem;
						color: #929292;
					}
				}
				> .button-box {
					display: flex;
					font-size: .5rem;
					text-align: left;
					> .address-dafult {
						position: relative;
						flex: 1;
						padding: .2rem 0;
						padding-left: 1rem;
						> i {
							position: absolute;
							top: 7px;
							left: 0;
							display: block;
							width: .6rem;
							height: .6rem;
							background-color: #fff;
							border: 1px solid #333;
							border-radius: .6rem;
						}
						> .i-action {
							background-color: #f00;
							border: none;
						}
					}
					> span {
						padding: 0 .2rem 0 1rem;
						line-height: 1.2rem;
						color: #929292;
						background: url('./../assets/change.png')no-repeat left 6px;
						background-size: 14px;
					}
					> span + span {
						background: url('./../assets/del.png')no-repeat left 6px;
						background-size: 14px;
					}
				}
			}
		}
		> .create-address {
			position: fixed;
			bottom: 0;
			left: 0;
			padding: .2rem 0rem;
			width: 100%;
			height: 2rem;
			background-color: #efefef;
			display: flex;
			> .create-btn {
				flex:1;
				line-height: 1.6rem;
				color: #fff;
				background-color: #f00;
			}
			> .create-btn:hover {
				background-color: #b50000;
			}
			> .rightbtn{
				background: #03CC51;
			}
		}
	}
</style>
