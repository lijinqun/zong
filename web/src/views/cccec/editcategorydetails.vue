<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>
                    商品类别详情
                </p>
            </card>
        </row>
        <Row>
    <Card>
        <div class="dataheader">
            <span class="dataheadertxt">基本信息</span>
        </div>
        <div class="inputbox">
            <div class="informationbox"><span><b>名称</b>:</span>
            	<i-input v-model="name" placeholder="请输入修改名称"></i-input>
            </div>
            <div class="informationbox"><span><b>序号</b>: </span>
            	<i-input v-model="sort" placeholder="请输入..."></i-input>
            </div>
        </div>
		
        <div class="inputbox">
        	<div class="informationbox" id="parname"><span><b>上级名称</b>:</span>
        	<i-select v-model="parentId" clearable="" filterable="">
                <i-option v-for="item in parentdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
            </i-select>
        	</div>
            <div class="informationbox"><span><b>是否上架</b>:</span>
                <div class="ivu-input-wrapper"><i-switch v-model="isOnline" ></i-switch></div>
            </div>
        </div>
		
		<div class="dataheader">
            <span class="dataheadertxt">类别图片</span>
        </div>
        <div class="inputbox">
            <div>
                <label>
                    <div style="width:100px;height:100px;line-height: 100px;text-align:center; border:1px solid #cccccc;">
                                <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                上传图片
                    </div>
                    <input type="file" style="display:none;" name="" id="goodImage" @change="preview()">
                </label>
            </div>
            <div @click="handleView()"><img :src="imageurl" style="max-width:100px;max-height:100px;margin-left:10px;"></div>
        </div>
        
	    <div class="informationbtn">
	        <i-button type="warning" icon="" @click="goback()">返回</i-button>
	        <i-button type="info" icon="" @click="update()">保存</i-button>
	    </div>
        </Card>
    </Row>
       <modal title="图片预览" v-model="visible">
            <img :src="newbigimg" v-if="visible" style="width: 100%">
    	</modal>
    </div>
</template>
<script>
	import "../../../static/js/jquery-2.0.0.min.js";
    import util from "@/libs/util";
    import {
        getonecategorydata,getcategorylist,updatecategorychi,imgurl
    }
        from "./../api/api.js";
    export default {
        name: "categoryDetails",
        data() {
            return {
            	visible: false,
            	newbigimg: '',
            	imageurl: '',
                id: "",
                name: '',
                sort: '',
                isOnline: '',
                grade: '',
                parentId: '0',
                parentdata: [],
                par: '',
                parentId2:''
            };
        },
        mounted() {
        	var that = this;
			this.id = this.$route.params.id;
            this.grade = this.$route.params.grade;
            this.parentId = this.$route.params.parentId;
            console.log("获取的GRADE"+this.grade);
            getonecategorydata(this.id).then(response => {
            	this.name = response.data.name;
            	this.isOnline = response.data.isOnline ==0 ? false : true;
            	this.sort = response.data.sort;
            	if(response.data.image){
            		this.imageurl = imgurl + response.data.image;
            	}
            });
           
                this.par = this.grade - 1;
                console.log("par:"+this.par);
                if(this.par == 0){
                	$('#parname').hide();
                }
                if(this.grade == 3){
                    this.parentId = sessionStorage.getItem("parent");
                }else{
                    this.parentId = '';
                }
    			getcategorylist('','',this.par,'','',this.parentId,'','').then(response => {
            	   this.parentdata = response.data.list;
                    this.parentId = this.$route.params.parentId;
        		})

            
        },
        created() {
        },
        methods: {
        	handleView (name) {
            this.visible = true;
            this.newbigimg=this.imageurl;
        	},
        	preview(){
	            let file = $('#goodImage')[0];
	            // let file2 = $('#fileUp2')[0];
	            // let file3 = $('#fileUp3')[0];
	            let zhethis=this;
	
	            if (file.files && file.files[0]) {
	              var reader = new FileReader();
	              reader.onload = function(evt) {
	                zhethis.imageurl = evt.target.result;
	               // zhethis.updateimgurldata = $('#goodImage')[0].files[0];
	              }
	              reader.readAsDataURL(file.files[0]);
	            }
        	},
        	update () {
				if(this.grade != 1 ){
					if(this.parentId == ''){
						this.$Modal.error({
                        title: "提示",
                        content: '<p>请填写基本信息</p>'
                    	});
                    	return;
					}
				}
     			if(this.name&&this.grade&&this.isOnline&&this.sort){
	        		let formdata = new FormData();
	        			formdata.append('id',this.id);
	        			formdata.append('sort',this.sort);
	        			formdata.append('name',this.name);
	        			formdata.append('grade',this.grade);
	        			formdata.append('isOnline',this.isOnline == true ? 1 : 0);
	        			formdata.append('categoryImage',$('#goodImage')[0].files[0]);
	        			formdata.append('parentId',this.parentId);
		     			updatecategorychi(formdata).then(response => {
		     				if(response.code=="200"){
			                    this.$Modal.success({
			                        title: "温馨提示",
			                        content: '<p>修改成功</p>'
			                    });
			                }else{
			                    this.$Modal.error({
			                        title: "温馨提示",
			                        content: response.message
			                    });
			                }
		            	})
		     	}else{
            		this.$Modal.error({
                        title: "提示",
                        content: '<p>请填写基本信息</p>'
                    });
            		
            	}			
        	},
            goback() {
                // this.grade = this.$router.params.grade;
                if(this.grade == 1){
                  this.grade = 1  ;
                }else{
                     this.grade = this.grade -1
                }
               
                if(this.grade ==2){
                    console.log('grade2');
                    this.parentId2= sessionStorage.getItem("parent");
                }
                if(this.grade ==3){
                     console.log('grade3');
                    this.parentId2 = sessionStorage.getItem("parent2");
                }
                 console.log('grade:'+ this.parentId2);
	            let argu = {
                    grade: this.grade,
                    parent :  this.parentId2
                };
                console.log("值："+ this.parentId);
	            util.openNewPage(this, 'editcategorypage', argu);
	            this.$router.push({
	                name: 'editcategorypage',
	                params: argu
	            });
                // window.history.go(-1);
	            this.$store.commit('removeTag', 'editcategorydetails');
	            this.$store.commit('closePage', 'editcategorydetails');
	            localStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList);
	            if (this.currentPageName === 'editcategorydetails') {
	                let lastPageName = '';
	                if (this.$store.state.pageOpenedList.length > 1) {
	                    lastPageName = this.$store.state.pageOpenedList[1].name;
	                } else {
	                    lastPageName = this.$store.state.pageOpenedList[0].name;
	                }
	                this.$router.push({
	                    name: 'editcategorypage'
	                });
	            }
            },
            updatedata() {
            }
        },
	    watch: {
//		    '$route'(to, from) {
//		        if (to.name == 'articledetails') {
//		            var that = this;
//		            this.id = this.$route.params.id;
//		                getfoodlistmaterial(1,this.pageSize,'',this.id).then(response => {
//		                    this.tableData = response.data.list;
//		                    that.tableloading = false;
//		                });
//		           }
//		        }
		        // console.log(to);
		   }
    };
</script>
<style lang="less" scoped>

    .dataheader{
        padding: 20px 10% 5px;
        font-weight: bold;
        font-size: 1rem;
        >.dataheadertxt{
            width: 110px;
            display: inline-block;
        }
    }

    .inputboxhead{
        padding: 0 10% 26px;
        >span{
            display: inline-block;
        }
        >p{
            display: inline-block;
            padding-left: 5%;
        }
    }
    .inputbox{
         display: flex;
         padding: 15px 0 15px;
         margin: 0 10%;
         background: #f5f5f5;
         > .informationbox{
            flex: 2;
            display: flex;
            margin-left: 0rem;
            padding: 0;
             > span:nth-child(1){
                    width: 150px;
                    text-align: right;
                    white-space: nowrap;
                    line-height: 32px;
                    margin-right: 1rem;
                }
            >p{
                display: inline-block;
                width: 100%;
                padding-left: 5px;
                line-height: 32px;
                // border: 1px solid #dddee1;
                cursor:not-allowed; 
            }
            >.posabsolute{
                position: absolute;
                color: #fff;
                background-color: #ed3f14;
                padding: 2px 10px;
                font-size: 0.5rem;
                top: 6px;
                left: 230px;
                border-radius: 3px;
                cursor: pointer;
            }
            .datetimeselect{
                width: 100%;
            }
         }
         > .informationbox:nth-child(2){
            padding: 0 10% 0 0;
            
         }
         > .posrelative{
            position: relative;
         }
    }
    .inputheadborder{
        border-bottom: 1px solid #dddee1;
    }
    .informationbtn{
        text-align: center;
        padding: 4rem 0;
        > button {
            margin-left: 1rem;
            width: 110px;
        }
    }
    .testcenter{
        text-align: center;
        display: block;
    }
    .specificationul{
        >ul{
            display: flex;
            padding: 0 0 10px;
            margin: 0 10%;
            background: #f5f5f5;
            >li{
                flex:1;
                text-align: center;
                height: 23px;
                >input{
                    width: 100%;
                    height: 100%;
                    border: none;
                    border-right: 2px solid #f5f5f5;
                    text-align: center;
                }
            }
        }
    }

</style>