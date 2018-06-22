<template>
	<div class="create-address">
		<back back="/address" title="新增地址"></back>
		<ul>
			<li>
				<span style="color:#f00;width:auto">*</span><span>收货人：</span>
				<input type="text" v-model="adressMsg.consignee" placeholder="请输入收货人姓名">
			</li>
			<li>
				<span style="color:#f00;width:auto">*</span><span>联系方式：</span>
				<input type="text" v-model.number="adressMsg.mobile" placeholder="请输入您的手机号">
			</li>
			<li @click="popupVisibleCity=true;titxt=false;">
				<span style="color:#f00;width:auto">*</span><span>所在地区：</span>
				<span v-show="titxt" class="titxt">请选择所在小区</span>
				<!-- <input type="text" v-model="adressMsg.address"> -->
				<!-- <p style="line-height:2rem;padding-left:1rem" v-if="!areaIdLevel1">{{adressMsg.area2.area}}{{adressMsg.area3.area}}{{adressMsg.area4.area}}</p> -->
				<p style="line-height:2rem;flex:auto">{{areaIdLevel2}}{{areaIdLevel3}}{{areaIdLevel4}} <span style="float:right;color:#ccc">></span></p>
			</li>
			<!-- <li class="choicequ">
				<input type="radio" v-model="choicemode" name="addqu" id="addqu1" value="1">
				<label for="addqu1">搜索小区</label>
				<input type="radio" class="marleft" v-model="choicemode" name="addqu" id="addqu2" value="2">
				<label for="addqu2">自定义地址</label>
			</li> -->

			<li v-show="searchaddress">
				<span style="color:#f00;width:auto">*</span><span>小区名称：</span>
				<input type="text" v-model="xiaoqu" @click="a=0" placeholder="请输入小区名称/大厦" @change="chackIt">
			</li>
            <div class="bottom-box" v-show="showXiaoQu">
                <p v-for="(item,index) in newArr" class="up-p" @click="setXiaoQu(item)">{{item.area}}</p>
            </div>
			<li v-show="searchaddress">
				<span style="color:#f00;width:auto">*</span><span>详细地址：</span>
                <!-- <input type="text" v-model="adressMsg.address" placeholder="如果以上小区未能满足您的具体地址，请填写备注。"> -->
                <textarea class="redzi" v-model="adressMsg.address" placeholder="填写您在小区的栋号、单元、房号等！"></textarea>
            </li>

            <!-- <li v-show="customaddress">
				<span style="color:#f00;width:auto">*</span><span>小区名称：</span>
				<input type="text" v-model="xiaoqu" placeholder="请输入你的自定义小区名称/大厦">
			</li>
            <li v-show="customaddress">
				<span style="color:#f00;width:auto">*</span><span>详细地址：</span>
                <textarea class="redzi" v-model="adressMsg.address" placeholder="填写您的自定义栋号、单元、房号等！"></textarea>
            </li> -->
            <li class="caiinn" @click="showinn()" v-show="innstart">
				<span>菜 驿 站：</span>
				<span v-if="innnames==''">请选择</span>
				<span v-if="innnames!=''">{{innnames}}</span>
				<span style="color:#ccc;position:absolute;right:0.2rem;width:0.3rem;">></span>
            </li>
            <li class="tellphone" @click="gokefu()">
				<span>联系客服</span>
				<span style="color:#ccc;position:absolute;right:0.2rem;width:0.3rem;">></span>
            </li>
			<!-- <li>
				<span>栋号/商铺：</span>
				<input type="text" v-model="adressMsg.numberBuildings" placeholder="请只输入字母或数字" @blur="testData('1',adressMsg.numberBuildings)">
			</li>
			<li>
				<span>单元/座：</span>
				<input type="text" v-model="adressMsg.unit" placeholder="请只输入字母或数字" @blur="testData('2',adressMsg.unit)">
			</li>
			<li>
				<span>房号：</span>
				<input type="text" v-model="adressMsg.roomNo" placeholder="请只输入字母或数字" @blur="testData('3',adressMsg.roomNo)">
			</li> -->
		</ul>
		<div class="create-address">
			<div class="create-btn" @click="post">确认</div>
		</div>
		<mt-popup v-model="popupVisibleCity" position="bottom" style="width:100%">
			<p v-for="(item,index) in area2data" class="up-p" @click="setCity(index,item.id,item.area)">{{item.area}}</p>
		</mt-popup> 
		<mt-popup v-model="popupVisibleQu" position="bottom" style="width:100%" :closeOnClickModal="false">
			<p v-for="(item,index) in area3data" class="up-p" @click="setQu(index,item.id,item.area)">{{item.area}}</p>
			<!-- <p class="up-p" @click="setQu(index)" v-if="!choseAdress[indexCity].c">{{choseAdress[indexCity].n}}</p> -->
		</mt-popup>
		<mt-popup v-model="popupVisibleZhen" position="bottom" style="width:100%">
			<p v-for="(item,index) in area4data" class="up-p" @click="setZhen(index,item.id,item.area)">{{item.area}}</p>
		</mt-popup>
		<div class="innmain" ref="innheight" v-show="innshow">
		    <div class="inndiv" style="margin-bottom: 40px;">
		      <ul class="innlists">
		        <li class="innli" v-for="item in innList" :key="item.id" @click="consoleinn(item.stage,item.id)">
		          <input type="radio" name="saveUpinn" :value="item.id" v-model="upinn" >
		          <span class="innheader">{{item.stage}}</span>
		          <p class="inndata">地址：{{item.businessAddress}}</p>
		          <p class="inndata">电话：{{item.businessPhone}}</p>
		        </li>
		        <!-- <li v-if="innList.length==0">你附近暂无驿站</li> -->
		      </ul>
		      <div class="bgwhite footerbtn">
		        <div class="tjbtn" @click="hideinn()">确认</div>
		      </div>
		    </div>
		</div>
	</div>
</template>
<script type="text/javascript">
import back from './back.vue';
import axios from 'axios'
	export default{
		data(){
			return{
				showxq: false,

				innstart:false,   //菜驿站功能

				innshow:false,
				upinn:'',
        		innList:[ ],
        		innnames:'',
        		innids:'0',
				a: 0,
                arr: [],
                area: '',
				newArr:[],
				xiaoqu: '',
				xiaoquid: '',
				donghao: '',
				danyuan: '',
				fanghao: '',
				beizhu: '',
				showXiaoQu: false,
				popupVisibleCity: false,
				popupVisibleQu: false,
				popupVisibleZhen: false,
				indexCity: 0,
				indexQu: 0,
				adressMsg:{
                    consignee: '',
                    address: '',
                    area: '',
                    zipNo: '',
                    house: '',
					mobile: '',
					numberBuildings: '',
					unit: '',
					roomNo: ''
                },
				choseAdress:null,//所有层级数据
				qrmodify:1,  //确认匹配地址弹框已出现
				areaIdLevel1:'',
				areaIdLevel2:'',
				areaIdLevel3:'',
				areaIdLevel4:'',
                areaIdLevel5:'',
                areaIdLevel2Id:'',
				areaIdLevel3Id:'',
				areaIdLevel4Id:'',
				areaIdLevel5Id:'',
				areaIdLevel:[],
				getChinese1: false,
				getChinese2: false,
				getChinese3: false,

				// 
				choicemode:1,
				searchaddress:true,
				customaddress:false,
				radionum:1,
				titxt:true,


				// 地区
				area2data:[],
				area3data:[],
				area4data:[],
			}
		},
		watch: {
			xiaoqu(){
				if(this.a == 0){
					this.showXiaoQu = true
					if(this.xiaoqu==''){
						this.newArr = []
					}else{
						this.newArr = []
						// this.arr.forEach((item,index)=>{
						// 	if(item.hasOwnProperty('c')){
						// 		item.c.forEach((itemChil)=>{
						// 			if(!itemChil.n.indexOf(this.xiaoqu)>0){
						// 				this.newArr.push(itemChil)
						// 			}
						// 		})
						// 	}
						// })
						
						this.arr.forEach((items)=>{
							console.log(items)
							if(!items.area.indexOf(this.xiaoqu)>0){
								this.newArr.push(items)
							}
						})
					}
				}
			},
			'choicemode':{
	    		handler:function(curVal,oldVal){
	    			console.log(curVal)
	    			if(curVal==1){
	    				this.radionum = 1;
	    				this.searchaddress=true;
	    				this.customaddress=false;
	    				this.adressMsg.address="";
	    			}else{
	    				this.radionum = 2;
	    				this.searchaddress=false;
	    				this.customaddress=true;
	    				this.xiaoqu="";
	    				this.adressMsg.address="";
	    			}
	    		}
	    	}
		},
		components: {
            back
        },
		methods:{
			innwindowheight:function(){
		        if(this.$refs.innheight.clientHeight<window.innerHeight){
		          this.$refs.innheight.style.height = window.innerHeight + "px";
		        }
		      },
		    showinn:function(){
		    	if(this.areaIdLevel2Id == ''){
					alert('温馨提示', '请选择所在地区信息');
				}else{
					var zhethis = this;
					$.ajax({
			          url: this.$store.state.commenturl.newbaseurl+'weixin/sales/partner/list',
			          type: 'POST',
			          dataType: '',
			          data: { 'bindingAreaParent.parent_id': this.areaIdLevel4Id,'columns':'id,businessPhone,businessAddress,stage,group_concat(bindingArea.area) houseName' },
			          success: function(data) {
			            zhethis.innList = data.data;
			            zhethis.innshow=true;
			            // zhethis.innwindowheight();
			            // if(zhethis.innList==""){

			            // }
			          }
			        })
					
				}
				
			},
			hideinn:function(){
				if(this.innnames==''){
					alert('温馨提示', '请选择菜驿站');
				}else{
					this.innshow=false;
				}
				
			},
			consoleinn(names,ids){
		        // sessionStorage.setItem('innid',ids);
		        // sessionStorage.setItem('innname',names);
		        this.innnames=names;
		        this.innids=ids;
		        this.upinn = ids;
		    },
			gokefu:function(){
				this.$router.push('/customerservice');
			},
			setCity(index,id,name) {
				let zhethis = this;
				// this.indexCity = index
				// this.areaIdLevel2 = this.choseAdress[this.indexCity].n
				// this.areaIdLevel2Id = this.choseAdress[this.indexCity].v
				this.areaIdLevel2 = name;
				this.areaIdLevel2Id = id;
				$.ajax({
			        url: this.$store.state.commenturl.newbaseurl+'weixin/area/list',
			        type: 'POST',
			        dataType: '',
			        data: { 
			        	'level':'3',
			        	'parent_id':id,
			        	'columns':'id,area,fullName,level,parent_id,parentIds,parentNames'
			        	 },
			        success: function(data) {
			          	console.log(data)
			          	zhethis.area3data=data.data;
			        }
			    })
				this.popupVisibleCity = false
				this.popupVisibleQu = true
			},
			setQu(index,id,name) {
				let zhethis = this;
				// this.indexQu = index
				// this.areaIdLevel3 = this.choseAdress[this.indexCity].c[this.indexQu].n
				// this.areaIdLevel3Id = this.choseAdress[this.indexCity].c[this.indexQu].v
				this.areaIdLevel3 = name;
				this.areaIdLevel3Id = id;
				$.ajax({
			        url: this.$store.state.commenturl.newbaseurl+'weixin/area/list',
			        type: 'POST',
			        dataType: '',
			        data: { 
			        	'level':'4',
			        	'parent_id':id,
			        	'columns':'id,area,fullName,level,parent_id,parentIds,parentNames'
			        	 },
			        success: function(data) {
			          	console.log(data)
			          	zhethis.area4data=data.data;
			        }
			    })
				this.popupVisibleQu = false
				this.popupVisibleZhen = true
			},
			setZhen(index,id,name) {
				let zhethis = this;
				// this.arr = this.choseAdress[this.indexCity].c[this.indexQu].c[index].c
				// this.areaIdLevel4 = this.choseAdress[this.indexCity].c[this.indexQu].c[index].n
				// this.areaIdLevel4Id = this.choseAdress[this.indexCity].c[this.indexQu].c[index].v
				$.ajax({
			        url: this.$store.state.commenturl.newbaseurl+'weixin/area/list',
			        type: 'POST',
			        dataType: '',
			        data: { 
			        	'level':'6',
			        	'parentArea2.id':id,
			        	'columns':'id,area,fullName,level,parent_id,parentIds,parentNames'
			        	 },
			        success: function(data) {
			          	console.log(data)
			          	zhethis.arr=data.data;
			        }
			    })
			    this.popupVisibleZhen = false;
				this.areaIdLevel4 = name;
				this.areaIdLevel4Id = id;
				localStorage.setItem('Level4Id',this.areaIdLevel4Id)
			},
			setXiaoQu(item) {
				this.a = 1;
				// this.xiaoqu= item.n
				// this.areaIdLevel5Id = item.p
				// this.xiaoquid = item.v
				this.xiaoqu= item.area;
				this.areaIdLevel5Id = item.id;
				// this.xiaoquid = item.v
				this.showXiaoQu = false;

			},
			chackIt() {
				if(this.xiaoqu!= ''&&this.qrmodify==1){
					this.qrmodify=2;
				// 	// this.xiaoqu="";qrmodify
				// 	axios.get(this.$store.state.commenturl.newbaseurl+'area/list',{
				// 		params: {  
				// 			'area':this.xiaoqu,
				// 			'columns':'area,city,fullName,id,parentIds,parentNames,parent_id,parentArea2.area,parentArea3.area,parentArea2.id,parentArea3.id,parentArea4.area,parentArea4.id'
				// 		}
				// 	}).then(response=>{
				// 		console.log(response)
				// 		if(response.data.data[0]){
				// 			if(this.areaIdLevel2Id!=response.data.data[0]['parentArea2.id']||this.areaIdLevel3Id!=response.data.data[0]['parentArea3.id']||this.areaIdLevel4Id!=response.data.data[0]['parentArea4.id']){
				// 		        alert({
				// 		        	message:'你输入的小区 "'+this.xiaoqu+'" 是属于 "'+response.data.data[0]['parentArea4.area']+response.data.data[0]['parentArea3.area']+response.data.data[0]['parentArea2.area']+'" 的，请确认输入的小区是否正确',
				// 		        	title:'温馨提示',
				// 		        	showConfirmButton:true,
				// 		        	showCancelButton:true,
				// 		        	confirmButtonText:'确认修改',
				// 		        	cancelButtonText:'返回'
				// 		        }).then(action => {
				// 			        	if(action=='confirm'){
				// 			        		this.areaIdLevel2Id=response.data.data[0]['parentArea4.id'];
				// 		        			this.areaIdLevel3Id=response.data.data[0]['parentArea3.id'];
				// 		        			this.areaIdLevel4Id=response.data.data[0]['parentArea2.id'];
				// 		        			this.areaIdLevel2=response.data.data[0]['parentArea4.area'];
				// 		        			this.areaIdLevel3=response.data.data[0]['parentArea3.area'];
				// 		        			this.areaIdLevel4=response.data.data[0]['parentArea2.area'];
				// 			        	}else{
				// 			        		return
				// 			        	}
					        			
				// 	        		})
				// 			}
				// 		}
				// 	})

				// 	// alert('温馨提示', '平台暂时没有搜索到此小区名"'+this.xiaoqu+'"，请落实好小区名字是否准确，平台将以此小区名进行配送。');
				}
			},
			testData(name,data){
				if(name == '1'){
					
				}else if(name == '2'){
					if(data != ''){
						const a = /^[0-9a-zA-Z\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u96f6\u000d\u000a]*$/g
						if(!a.test(data)){
							// alert('提示', '请输入数字和字母');
							this.getChinese2 = true
						}else{
							this.getChinese2 = false
						}
					}
				}else{
					if(data != ''){
						const a = /^[0-9a-zA-Z\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u96f6\u000d\u000a]*$/g
						if(!a.test(data)){
							// alert('提示', '请输入数字和字母');
							this.getChinese3 = true
						}else{
							this.getChinese3 = false
						}
					}
				}
			},
		// 	post(){//保存
		// 		console.log(this.adressMsg.address)
		// 								console.log(this.xiaoqu)
		// 		if(this.adressMsg.consignee == ''){
		// 			alert('提示', '请输入收货人信息');
		// 		}else if(this.adressMsg.mobile == ''){
		// 			alert('提示', '请输入联系方式');
		// 		}else if(this.areaIdLevel2Id == ''){
		// 			alert('提示', '请选择所在地区信息');
		// 		}else{
		// 			if(this.newArr.length == 0){
		// 				if(this.adressMsg.address != ''){
		// 					if(this.getChinese1){
		// 						alert('提示', '栋号必须为数字或字母，请重新输入');
		// 					}else if(this.getChinese2){
		// 						alert('提示', '单元必须为数字或字母，请重新输入');
		// 					}else if(this.getChinese3){
		// 						alert('提示', '房号必须为数字或字母，请重新输入');
		// 					}else{
		// 						var openID = this.$store.state.weixin.finOpenid
		// 						axios.get(this.$store.state.base.baseurl+'weixin/address/createAddress.do',{
		// 							params: {  
		// 								'address.address':encodeURI(this.adressMsg.address),
		// 								'address.area':'666',
		// 								'address.zipNo':'519000',
		// 								'address.defautSelect':1,
		// 								'address.consignee':encodeURI(this.adressMsg.consignee),
		// 								'address.mobile':this.adressMsg.mobile,
		// 								'address.openId':openID,
		// 								'address.areaIdLevel1':869,
		// 								'address.areaIdLevel2':this.areaIdLevel2Id,
		// 								'address.areaIdLevel3':this.areaIdLevel3Id,
		// 								'address.areaIdLevel4':this.areaIdLevel4Id,
		// 								'address.areaIdLevel5':this.areaIdLevel5Id,
		// 								'address.house':encodeURI(this.xiaoqu),
		// 								'address.houseId':this.xiaoquid,
		// 								'address.numberBuildings':encodeURI(this.adressMsg.numberBuildings),
		// 								'address.unit':encodeURI(this.adressMsg.unit),
		// 								'address.roomNo':encodeURI(this.adressMsg.roomNo)
		// 							},
		// 						})
		// 							.then(response=>{
		// 								this.$router.push('address')
		// 							},error => {

		// 							})
		// 					}
		// 				}else{
		// 					if(this.xiaoqu == ''){
		// 						alert('提示', '请输入小区或小区备注信息');
		// 					}else{
		// 						alert('提示', '系统无该小区信息，请输入小区备注');
		// 					}
		// 				}
		// 			}else{
		// 				if(this.xiaoqu != ''){
		// 					if(this.getChinese1){
		// 						alert('提示', '栋号必须为数字或字母，请重新输入');
		// 					}else if(this.getChinese2){
		// 						alert('提示', '单元必须为数字或字母，请重新输入');
		// 					}else if(this.getChinese3){
		// 						alert('提示', '房号必须为数字或字母，请重新输入');
		// 					}else{
		// 						var openID = this.$store.state.weixin.finOpenid
		// 						axios.get(this.$store.state.base.baseurl+'weixin/address/createAddress.do',{
		// 							params: {  
		// 								'address.address':encodeURI(this.adressMsg.address),
		// 								'address.area':'666',
		// 								'address.zipNo':'519000',
		// 								'address.defautSelect':1,
		// 								'address.consignee':encodeURI(this.adressMsg.consignee),
		// 								'address.mobile':this.adressMsg.mobile,
		// 								'address.openId':openID,
		// 								'address.areaIdLevel1':869,
		// 								'address.areaIdLevel2':this.areaIdLevel2Id,
		// 								'address.areaIdLevel3':this.areaIdLevel3Id,
		// 								'address.areaIdLevel4':this.areaIdLevel4Id,
		// 								'address.areaIdLevel5':this.areaIdLevel5Id,
		// 								'address.house':encodeURI(this.xiaoqu),
		// 								'address.houseId':this.xiaoquid,
		// 								'address.numberBuildings':encodeURI(this.adressMsg.numberBuildings),
		// 								'address.unit':encodeURI(this.adressMsg.unit),
		// 								'address.roomNo':encodeURI(this.adressMsg.roomNo)
		// 							},
		// 						})
		// 							.then(response=>{
		// 								this.$router.push('address')
		// 							},error => {

		// 							})
		// 					}
		// 				}else{
		// 					if(this.adressMsg.address == ''){
		// 						alert('提示', '请输入小区或小区备注信息');
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}	
		// },

		post(){//保存
			// var reg=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
			var reg=/^(0|86|17951)?(1)[0-9]{10}$/;
				console.log(this.adressMsg.address)
				console.log(this.xiaoqu)
				if(this.adressMsg.consignee == ''){
					alert('温馨提示', '请输入收货人信息');
				}else if(this.adressMsg.mobile == ''){
					alert('温馨提示', '请输入联系方式');
				}else if(this.areaIdLevel2Id == ''){
					alert('温馨提示', '请选择所在地区信息');
				}else if(this.innstart==true&&this.innnames==''){
					alert('温馨提示', '请选择菜驿站');
				}else if(reg.test(this.adressMsg.mobile)){
					if(this.radionum == 1){
							if(this.xiaoqu != ''&&this.qrmodify==2){
									if (this.adressMsg.address == '') {
										alert('温馨提示', '请填写您的详细地址，如：小区的栋号、单元、房号等！');
									}else{
										var openID = this.$store.state.weixin.finOpenid;
										let zhethis = this;
										// axios.get(this.$store.state.base.baseurl+'weixin/address/createAddress.do',{
										// 	params: {
										// 		'address.area':'666',
										// 		'address.zipNo':'519000',
										// 		'address.defautSelect':1,
										// 		'address.consignee':encodeURI(encodeURI(this.adressMsg.consignee)),	
										// 		'address.mobile':this.adressMsg.mobile,
										// 		'address.openId':openID,
										// 		'address.areaIdLevel1':869,
										// 		'address.areaIdLevel2':this.areaIdLevel2Id,
										// 		'address.areaIdLevel3':this.areaIdLevel3Id,
										// 		'address.areaIdLevel4':this.areaIdLevel4Id,
										// 		'address.areaIdLevel5':this.areaIdLevel5Id,
										// 		'address.salesPartnerId':this.innids,
										// 		'address.house':encodeURI(encodeURI(this.xiaoqu)),
										// 		// 'address.houseId':this.xiaoquid,
										// 		'address.numberBuildings':encodeURI(encodeURI(this.adressMsg.address))
										// 	},
										// })
										// .then(response=>{
										// 	this.$router.push('address')
										// },error => {

										// })

										$.ajax({
									        url: this.$store.state.commenturl.newbaseurl+'weixin/address/save',
									        type: 'GET',
									        dataType: '',
									        data: { 
									        	'area':'666',
												'zipNo':'519000',
												'defaultCheck':0,
												'consignee':this.adressMsg.consignee,	
												'mobile':this.adressMsg.mobile,
												'open_id':openID,
												'member_id':this.$store.state.community.selfId,
												'areaIdLevel1':869,
												'areaIdLevel2':this.areaIdLevel2Id,
												'areaIdLevel3':this.areaIdLevel3Id,
												'areaIdLevel4':this.areaIdLevel4Id,
												'areaIdLevel5':this.areaIdLevel5Id,
												// 'salesPartnerId':this.innids,
												'house':this.xiaoqu,
												// 'houseId':this.xiaoquid,
												'numberBuildings':this.adressMsg.address
									        	 },
									        success: function(data) {
									          	console.log(data)
									          	zhethis.$router.push('address');
									        }
									    })
									}
									
								}else if(this.xiaoqu!= ''&&this.qrmodify==1){
									this.chackIt();
								}else{
									alert('提示', '请输入你的小区/大厦');
								}
						
					}else{
						if(this.xiaoqu != ''&&this.qrmodify==2){
									if (this.adressMsg.address == '') {
										alert('提示', '填写您小区的自定义栋号、单元、房号等！');
									}else{
								var openID = this.$store.state.weixin.finOpenid;
								let zhethis = this;
								// axios.get(this.$store.state.base.baseurl+'weixin/address/createAddress.do',{
								// 	params: {
								// 		'address.area':'666',
								// 		'address.zipNo':'519000',
								// 		'address.defautSelect':1,
								// 		'address.consignee':encodeURI(encodeURI(this.adressMsg.consignee)),
								// 		'address.mobile':this.adressMsg.mobile,
								// 		'address.openId':openID,
								// 		'address.areaIdLevel1':869,
								// 		'address.areaIdLevel2':this.areaIdLevel2Id,
								// 		'address.areaIdLevel3':this.areaIdLevel3Id,
								// 		'address.areaIdLevel4':this.areaIdLevel4Id,
								// 		'address.areaIdLevel5':this.areaIdLevel5Id,
								// 		'address.salesPartnerId':this.innids,
								// 		'address.house':encodeURI(encodeURI(this.xiaoqu)),
								// 		// 'address.houseId':this.xiaoquid,
								// 		'address.numberBuildings':encodeURI(encodeURI(this.adressMsg.address))
								// 	},
								// })
								// .then(response=>{
								// 	this.$router.push('address')
								// },error => {

								// })
								$.ajax({
							        url: this.$store.state.commenturl.newbaseurl+'weixin/address/save',
							        type: 'GET',
							        dataType: '',
							        data: { 
							        	'area':'666',
										'zipNo':'519000',
										'defaultCheck':0,
										'consignee':encodeURI(encodeURI(this.adressMsg.consignee)),	
										'mobile':this.adressMsg.mobile,
										'open_id':openID,
										'areaIdLevel1':869,
										'areaIdLevel2':this.areaIdLevel2Id,
										'areaIdLevel3':this.areaIdLevel3Id,
										'areaIdLevel4':this.areaIdLevel4Id,
										'areaIdLevel5':this.areaIdLevel5Id,
										// 'salesPartnerId':this.innids,
										'house':encodeURI(encodeURI(this.xiaoqu)),
										// 'houseId':this.xiaoquid,
										'numberBuildings':encodeURI(encodeURI(this.adressMsg.address))
							        	 },
							        success: function(data) {
							          	console.log(data)
							          	zhethis.$router.push('address');
							        }
							    })
							}
							}else if(this.xiaoqu!= ''&&this.qrmodify==1){
								this.chackIt();
							}else{
								alert('提示', '请输入你的自定义小区名称/大厦');
							}
						}
				}else{
					alert('提示', '请输入正确的手机号码');
				}
			}	
		},
		created() {
			var zhethis = this;
			// axios.get(this.$store.state.base.baseurl+'weixin/area/queryAreas.do')
			// 	.then(response => {
			// 		this.addressArr=JSON.parse(response.data.jsonStr)//获取地址信息
			// 		this.choseAdress = this.addressArr[0].c
			// 		// console.log(response.data.jsonStr)
			// 	},error =>{
			// 		console.log(error)
			// 	})
			$.ajax({
			        url: this.$store.state.commenturl.newbaseurl+'weixin/area/list',
			        type: 'POST',
			        dataType: '',
			        data: { 
			        	'level':'2',
			        	'columns':'id,area,fullName,level,parent_id,parentIds,parentNames'
			        	 },
			        success: function(data) {
			          	console.log(data)
			          	zhethis.area2data=data.data;
			        }
			    })
		},
		beforeRouteEnter(to,from,next){
			next(vm=>{
				vm.$store.commit('showHead',true)
				vm.$store.commit('showNav',false)
				vm.$store.commit('changeTitle', '新增地址')
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
	.create-address {
		padding-top: 49px;
		background-color: #fff;
		text-align: left;
		position: relative;
		.placeholder(@a){
		      &::-webkit-input-placeholder { /* WebKit browsers */
		            @a();
		      }
		      &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
		            @a();
		      }
		      &::-moz-placeholder { /* Mozilla Firefox 19+ */
		            @a();
		      }
		      &:-ms-input-placeholder { /* Internet Explorer 10+ */
		            @a();
		      }
		}
		> ul {
			padding: 0 .5rem;
			width: 100%;
			padding-bottom: 0rem;
			> li {
				display: flex;
				height: 2rem;
                font-size: .6rem;
                border-top: 1px solid #f2f2f2;
				> span {
					display: block;
					width: 4rem;
					line-height: 2rem;
				}
				> .titxt{
					position: absolute;
					left: 4.8rem;
					width: 6rem;
					color: #999999;
				}
				> input {
					display: block;
					flex: auto;
					border: none;
                }
                > textarea {
                    flex: auto;
                    padding: 0.5rem 0;
                    height: 1.9rem;
                    resize: none;
                    border: none;
                }
                > textarea{
				    // .placeholder({
				    //       color:#888;
				    // })
				}
                
            }
            > .tellphone{
				padding-left: 0.3rem;
				position: relative;
				border-bottom: 1px solid #f2f2f2;
			}
			> .caiinn{
				padding-left: 0.3rem;
				position: relative;
				border-bottom: 1px solid #f2f2f2;
			}
			
            > .choicequ{
            	height: 2rem;
            	line-height: 2rem;
            	// padding: 0 1rem;
                	> input {
						display: inline-block;
						flex: none;
						margin-top: 0;
						width: 0.6rem;
						vertical-align: middle;
						margin-right: 0.3rem;
						height: 2rem;
	                }
	                > label {
	                	display: inline-block;
						flex: none;
						width: 3rem;
						height: 2rem;
						line-height: 2rem;
						margin: 0;
						margin-top: 0.05rem;
						font-size: 0.6rem;
						font-weight: normal;
						vertical-align: middle;
						color: #666666;
	                }
	                > .marleft{
	                	margin-left: 1rem;
	                }
                }
            // > li:nth-child(6) {
            //     height: 3rem;
            // }
		}
		.up-p {
			position: relative;
			padding: 0 1rem 0 2rem;
			line-height: 1.65rem;
			font-size: .6rem;
			background-color: #f1f1f1;//getaddr.png
			border-top: 1px solid #fff;
			margin-bottom: 0;
		}
		.up-p::before {
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			content: '';
			width: 2rem;
			height: 1.65rem;
			background: url('./../assets/getaddr.png') no-repeat center;
		}
		.up-p + .up-p {
			border-top: 1px solid #fff;
		}
		input:focus,textarea:focus{
			outline: none;
		}
		.create-address {
			position: fixed;
			bottom: 0;
			left: 0;
			padding: .2rem 1rem;
			width: 100%;
			height: 2rem;
			background-color: #efefef;
			text-align: center;
			> .create-btn {
				line-height: 1.6rem;
				color: #fff;
				background-color: #f00;
			}
			> .create-btn:hover {
				background-color: #b50000;
			}
		}

		// 菜驿站
  .innmain{
    text-align: left;
    background: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
    padding-bottom: 1.8rem;
    z-index: 999;
    width: 100%;
    .inndiv{
    	>.innlists{
		    text-align: left;
		    >.innli{
			    border-bottom: 1px solid #cccccc;
			    padding: 0.3rem 0.5rem;
			    >p{
				    margin-bottom: 0;
				  }
				>.innheader{
				    font-size: 0.68rem;
				    font-weight: bold;
				    padding-left: 0.5rem;
				  }
				>.inndata{
				     font-size: 0.52rem;
				  }
			  }
			
		  }
		>.footerbtn{
		      height: 1.8rem;
		      position: fixed;
		      bottom: 0;
		      width: 100%;
		      >.tjbtn{
			      height: 1.8rem;
			      position: absolute;
			      z-index: 999;
			      right: 0;
			      background: #ff5500;
			      color: #ffffff;
			      top: 0;
			      width: 100%;
			      text-align: center;
			      line-height: 1.8rem;
			      font-size: 0.625rem;
			  }
		  }
		
    }
    
  }



	}


	
  

</style>