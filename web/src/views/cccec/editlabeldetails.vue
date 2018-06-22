<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>
                    商品标签详情
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
            <div class="informationbox"><span><b>是否上线主页</b>:</span>
                <div class="ivu-input-wrapper"><i-switch v-model="isIndexOnline" ></i-switch></div>
            </div>
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
        getonelabeldata,getlabellist,updatelabel
    }
        from "./../api/api.js";
    export default {
        name: "labelDetails",
        data() {
            return {
            	visible: false,
            	newbigimg: '',
            	imageurl: '',
                id: "",
                name: '',
                sort: '',
                isIndexOnline: '',
                grade: '',
                parentId: 0,
                parentdata: [],
                par: '',
                
            };
        },
        mounted() {
        	var that = this;
			this.id = this.$route.params.id;
            getonelabeldata(this.id).then(response => {
            	this.name = response.data.name;
            	this.isIndexOnline = response.data.isIndexOnline ==0 ? false : true;
            	this.sort = response.data.sort;
            	this.grade = response.data.grade;
            	this.parentId = response.data.parentId;
            });
           
        	setTimeout(() => {
                this.par = this.grade - 1;
                if(this.par == 0){
                	$('#parname').hide();
                }
    			getlabellist('','',this.par).then(response => {
            		this.parentdata = response.data.list;
        		})
            }, 500);
            
        },
        created() {
        },
        methods: {
        	update () {
        		if(this.grade != 1 ){
					if(this.parentId == ''){
						this.$Modal.error({
                        title: "提示",
                        content: '<p>请填写完整信息</p>'
                    	});
                    	return;
					}
				}
        		if(this.name&&this.grade&&this.isIndexOnline&&this.sort){
	        		var param = {
							name : this.name,
							grade : this.grade ,
							id : this.id,
							isIndexOnline : this.isIndexOnline == true ? 1 : 0 ,
							sort : this.sort,
							parentId : this.parentId
	            	};
		     			updatelabel(param).then(response => {
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
                        content: '<p>请填写完整信息</p>'
                    });
            		
            	}	
        	},
            goback() {
	            let argu = {};
	            util.openNewPage(this, 'editlabel', argu);
	            this.$router.push({
	                name: 'editlabel',
	                params: argu
	            });
	            this.$store.commit('removeTag', 'editlabeldetails');
	            this.$store.commit('closePage', 'editlabeldetails');
	            localStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList);
	            if (this.currentPageName === 'editlabeldetails') {
	                let lastPageName = '';
	                if (this.$store.state.pageOpenedList.length > 1) {
	                    lastPageName = this.$store.state.pageOpenedList[1].name;
	                } else {
	                    lastPageName = this.$store.state.pageOpenedList[0].name;
	                }
	                this.$router.push({
	                    name: 'editlabel'
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