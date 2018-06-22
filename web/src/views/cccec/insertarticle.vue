<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>
                    新增文章
                </p>
            </card>
        </row>
        <Row>
    <Card>
        <div class="dataheader">
            <span class="dataheadertxt">基本信息</span>
        </div>
        <div class="inputbox">
            <div class="informationbox"><span><b>主标题</b>:</span>
            	<i-input v-model="title" placeholder="请输入..."></i-input>
            </div>
            <div class="informationbox"><span><b>副标题</b>:</span>
                <i-input v-model="subhead" placeholder="请输入..."></i-input>
            </div>
        </div>
		
        <div class="inputbox">
            <div class="informationbox"><span><b>作者</b>: </span>
            	<i-input v-model="author" placeholder="请输入..."></i-input>
            </div>
            <div class="informationbox"><span><b>文章分类</b>: </span>
            	<i-select v-model="typeId" clearable="" filterable="">
                    <i-option v-for="item in typeIdlist" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                </i-select>
            </div>
        </div>
        
        <div class="inputbox">
            <div class="informationbox">
                <span><b>下线/上线</b>: </span>
                <div class="ivu-input-wrapper"><i-switch v-model="status" ></i-switch></div>
            </div>
        </div>
        
        <div class="dataheader">
            <span class="dataheadertxt">文章logo</span>
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
            <div><img :src="goodImageurl" style="max-width:100px;max-height:100px;margin-left:10px;"></div>
        </div>

        <div class="dataheader">
            <span class="dataheadertxt">文章内容</span>
        </div>
        <div class="inputbox">
             <!-- <button @click="getUEContent()">获取内容</button> -->
            <div class="editor-container">
              <UEditor :config=config ref="ueditor"></UEditor>
            </div>
        </div>
        
        
	    <div class="informationbtn">
	        <i-button type="info" icon="" @click="insert()">新增</i-button>
	    </div>
        </Card>
    </Row>
    </div>
</template>
<script>
	import {UEditor} from '@/components/ueditor/index.js';
	import "../../../static/js/jquery-2.0.0.min.js";
    import util from "@/libs/util";
    import {
    	getarticledtype,insertarticle,imgurl
    }
        from "./../api/api.js";
    export default {
        name: "insertarticle",
        components: {
        	UEditor
    	},
        data() {
            return {
            	config: {
		            //可以在此处定义工具栏的内容
		            // toolbars: [
		            //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
		            //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
		            //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
		            // ],
		            autoHeightEnabled: false,
		            autoFloatEnabled: true,
		           // initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
		            autoClearinitialContent:false, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
		            initialFrameWidth: null,
		            initialFrameHeight: 450,
		            BaseUrl: '',
		            UEDITOR_HOME_URL: 'static/ueditor/',
		        },
                title: '',
                subhead: '',
                author: '',
                typeId: '',//文章分类id
                status: false,
                typeIdlist: [],
                content: '',
                
                goodImageurl:'',
                updateimgurldata:'',
                
            };
        },
        mounted() {
            getarticledtype().then(response => {
            	this.typeIdlist = response.data;
            });
        },
        created() {
        },
        methods: {
            preview(){
                let file = $('#goodImage')[0];
                let zhethis=this;
    
                if (file.files && file.files[0]) {
                  var reader = new FileReader();
                  reader.onload = function(evt) {
                    zhethis.goodImageurl = evt.target.result;
                    zhethis.updateimgurldata = $('#goodImage')[0].files[0];
                  }
                  reader.readAsDataURL(file.files[0]);
                }
            },
        	insert () {
        		if(this.title&&this.subhead&&this.author&&this.typeId&&this.$refs.ueditor.getUEContent()){
	        		var params = {
	        			title : this.title,
	        			subhead : this.subhead,
	        			author : this.author,
	        			typeId : this.typeId,
	        			status : this.status == false ? '0' : '1',
	        			content : this.$refs.ueditor.getUEContent(),
                        icon_file:this.updateimgurldata
	        		};
	        		console.log(params);
	        		insertarticle(params).then(response => {
	            		if(response.code=="200"){
		                    this.$Modal.success({
		                        title: "温馨提示",
		                        content: '<p>新增成功</p>'
		                    });
							util.openNewPage(this, 'articlelist', '');
                                        this.$router.push({
                                            name: 'articlelist',
                                            params: ''
                                        });
		                }else{
		                    this.$Modal.error({
		                        title: "温馨提示",
		                        content: response.message
		                    });
		                }
	            	});
            	}else{
            		this.$Modal.error({
                        title: "提示",
                        content: '<p>请填写完整信息</p>'
                    });
            		
            	}
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
//	        	}
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