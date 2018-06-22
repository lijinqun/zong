<template>
    <div>
        


        <div>
            <Row>
                <Card>
                    <p slot="title">
                        <Icon type="ios-cloud-upload-outline"></Icon>
                        上传
                    </p>
                    <Row>
                        <Card>
                            <!-- <p slot="title">
                                <Icon type="ios-cloud-upload-outline"></Icon>
                                上传图片
                            </p>
                            <div class="demo-upload-list" v-for="item in uploadList">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload" 
                            :data='aaaa'
                            multiple
                            type="drag"
                            action="http://ccc.cliantech.com/chuangshi/admin/adv/save"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                            </div>
                        </Upload> -->
                        <form class="fromcss" id="form1" onsubmit="return false" action="##" method="post">
                            <div class="inputbox">
                                <div class="informationbox"><span>名称:</span>
                                    <i-input v-model="logoname" placeholder="请输入名称..."></i-input>
                                </div>
                                <div class="informationbox posrelative"><span>序号:</span>
                                    <i-input v-model="logosort" placeholder="请输入序号..."></i-input>
                                </div>
                            </div>
                            <div class="inputbox">
                                <div class="informationbox"><span>链接:</span>
                                    <i-input v-model="logolink" placeholder="请输入链接..."></i-input>
                                </div>
                                <div class="informationbox posrelative">

                                </div>
                            </div>
                            <div class="inputbox">
                                <div class="informationbox"><span>上传图片:</span>
                                    <label class="ivu-input-wrapper">
                                        <div style="height:58px;line-height: 58px; border:1px solid #cccccc;">
                                            <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                            上传图片
                                        </div>
                                        <input type="file" style="display:none;" name="" id="fileUp" @change="preview()">
                                    </label>
                                   
                                    
                                </div>
                                <div class="informationbox posrelative">

                                </div>
                            </div>
                             <!-- <label class="ivu-input-wrapper">
                                        <div style="height:58px;line-height: 58px; border:1px solid #cccccc;">
                                            <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                            上传图片
                                        </div>
                                        <input type="file" style="display:none;" name="" id="fileUp2" @change="preview()">
                                    </label>
                                    <label class="ivu-input-wrapper">
                                        <div style="height:58px;line-height: 58px; border:1px solid #cccccc;">
                                            <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                            上传图片
                                        </div>
                                        <input type="file" style="display:none;" name="" id="fileUp3" @change="preview()">
                                    </label> -->
                            <div @click="handleView()"><img :src="updateimgurl" style="max-width:500px;max-height:500px;margin-bottom:20px;"></div>
                            <div class="informationbtn">
                                <i-button type="info" icon="" @click="up()">提交</i-button>
                                <i-button type="warning" icon="" @click="goback()">返回</i-button>
                            </div>
                        </form>
                        <Modal title="图片预览" v-model="visible">
                            <img :src="updateimgurl" v-if="visible" style="width: 100%">
                        </Modal>
                        <Modal v-model="editdata" title="编辑" @on-ok="editup()">
                            <form class="fromcss" id="form1">
                                <div class="inputbox">
                                    <div class="informationbox"><span>名称:</span>
                                        <i-input v-model="editlogoname" placeholder="请输入名称..."></i-input>
                                    </div>
                                    <div class="informationbox posrelative"><span>序号:</span>
                                        <i-input v-model="editlogosort" placeholder="请输入序号..."></i-input>
                                    </div>
                                </div>
                                <div class="inputbox">
                                    <div class="informationbox"><span>链接:</span>
                                        <i-input v-model="editlogolink" placeholder="请输入链接..."></i-input>
                                    </div>
                                    <div class="informationbox"><span>上传图片:</span>
                                        <label class="ivu-input-wrapper">
                                            <div style="height:58px;line-height: 58px; border:1px solid #cccccc;">
                                                <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                                                上传图片
                                            </div>
                                            <input type="file" style="display:none;" name="" id="editfileUp" @change="preview()">
                                        </label>
                                    </div>
                                </div>
                                <div class="inputbox">
                                    <div style="width:100%;">
                                        <img :src="editlogosrc" style="width:300px;display:block;margin:auto;">
                                    </div>
                                </div>
                                <div @click="handleView()"><img :src="updateimgurl" style="max-width:500px;max-height:500px;margin-bottom:20px;"></div>
                                <!-- <div class="informationbtn">
                                    <i-button type="info" icon="" @click="editup()">提交</i-button>
                                </div> -->
                            </form>
                        </Modal>
                        </Card>
                    </Row>
                    <div>
                    </div>
                </Card>
            </Row>
            <Row>
                <Card>
                    <i-table :columns="tableColumns" :data="tableData" style="width: 100%;" @on-selection-change="selectIds"></i-table>
                </Card>
            </Row>
        </div>
    </div>
</template>
<script>
import {
        updaimg,getimglist,imgurl,removeimgfun,moreupdaimg
    }
    from "./../api/api.js";
    import "../../../static/js/jquery-2.0.0.min.js";
    import util from "@/libs/util";
    export default {
        data () {
            return {
                editdata:false,

                logoname:'',
                logosort:'',
                logolink:'',
                
                editlogoname:'',
                editlogosort:'',
                editlogolink:'',
                editlogosrc:'',
                aaaa:{
                    name:'1111',
                    link:'111',
                    type:'1'
                },
                updateimgurl:'',

                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                tableColumns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: 'id',
                    key: 'id',
                    width: 60,
                    align: 'center'
                },  {
                    title: '类型',
                    key: 'type',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [h('p', params.row.type == 1 ? '滚动图' : params.row.type == 2 ? '广告图' : '热卖图')]);
                    },
                },  {
                    title: '排序',
                    key: 'sort',
                    align: 'center'
                },  {
                    title: '图片',
                    key: 'image',
                    width: 68,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {
                          attrs: {
                            style: 'width: 30px;height: 30px;'
                          },
                        }, [
                            h('img', params.row.image!=null?{
                              props: {
                                type: 'primary',
                                size: 'small'
                              },
                              attrs: {
                                src: imgurl+params.row.image, style: 'width:30px;height: 30px;border-radius: 2px;'
                              },
                              style: {},
                            }:''),
                          ]);
                    }
                },  {
                    title: '名称',
                    key: 'name',
                    align: 'center'
                },  {
                    title: '链接',
                    key: 'link',
                    align: 'center'
                },{
                    title: '操作',
                    key: 'ctrl',
                    render: (h, params) => {
                        return h('div', [
                         // h('Button',{
                         //     props: {
                         //         type: 'info',
                         //         size: 'small'
                         //     },
                         //     on: {
                         //            click: () => {
                         //                this.editimgdata(params.row);
                         //            }
                         //        }
                         // },'编辑'),
                         h('Poptip', {
                            props: {
                                confirm: true,
                                title: '您确定要删除这条数据吗?',
                                transfer: true
                            },
                            on: {
                                'on-ok': () => {
                                    this.removelogo(params.row.id);
                                }
                            }
                        }, [
                            h('Button', {
                                style: {
                                    margin: '0 5px'
                                },
                                props: {
                                    type: 'error',
                                    size: 'small'
                                }
                            }, '删除')
                            ])
                        ])
                    }
                }
                
                ],
                tableData: [
                    {
                        id:'1',
                        type:'滚动图',
                        number:'5'
                    }
                ]
            }
        },
        methods: {
            goback() {
                let argu = {};
                util.openNewPage(this, 'installlogo', argu);
                this.$router.push({
                    name: 'installlogo',
                    params: argu
                });
                this.$store.commit('removeTag', 'installlogo');
                this.$store.commit('closePage', 'installlogo');
                localStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList);
                if (this.currentPageName === 'installlogo') {
                    let lastPageName = '';
                    if (this.$store.state.pageOpenedList.length > 1) {
                        lastPageName = this.$store.state.pageOpenedList[1].name;
                    } else {
                        lastPageName = this.$store.state.pageOpenedList[0].name;
                    }
                    this.$router.push({
                        name: 'installlogo'
                    });
                }
            },
            preview(){
                let file = $('#fileUp')[0];
                // let file2 = $('#fileUp2')[0];
                // let file3 = $('#fileUp3')[0];
                let zhethis=this;
                if (file.files && file.files[0]) {
                  var reader = new FileReader();
                  reader.onload = function(evt) {
                    zhethis.updateimgurl = evt.target.result;
                  }
                  reader.readAsDataURL(file.files[0]);
                }
            },
            up(){
                let that = this;
                let file = $('#fileUp')[0].files[0];
                // let file2 = $('#fileUp2')[0].files[0];
                // let file3 = $('#fileUp3')[0].files[0];
                let formdata = new FormData();
                formdata.append('file',file)
                // formdata.append('file',file2)
                // formdata.append('file',file3)
                formdata.append('name',this.logoname);
                formdata.append('sort',this.logosort);
                formdata.append('link',this.logolink)
                formdata.append('type',this.$route.params.id)
                updaimg(formdata).then(response => {
                    if(response.code=="200"){
                        that.$Modal.success({
                            title: '温馨提示',
                            content: '<p>添加成功</p>'
                        });
                        that.getimglistdata();
                    }else{
                        that.$Modal.error({
                            title: '温馨提示',
                            content: '<p>'+response.message+'</p>'
                        });
                    }
                })
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: '图片  ' + file.name + ' 超过2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },
            selectIds(selection) {
                selection.forEach((item, index) => {
                    if (index == 0) {
                        this.ids = item.id;
                    } else {
                        this.ids = this.ids + ',' + item.id;
                    }
                    this.balancenumarray=item.balance==null?'0':item.balance;
                    this.pointnumarray=item.point==null?'0':item.point;
                })
            },
            getimglistdata(){
                this.tableData=[];
                let zhethis=this;
                getimglist(this.$route.params.id).then(response => {
                    console.log(response);
                    zhethis.tableData = response.data;
                })
            },
            removelogo(id){
                let zhethis=this;
                removeimgfun(id).then(response => {
                    console.log(response);
                    zhethis.getimglistdata(this.$route.params.id);
                })
            },
            editimgdata(data){
                let zhethis=this;
                console.log(data)
                zhethis.editlogoname=data.id;
                zhethis.editlogoid=data.name;
                zhethis.editlogosort=data.sort;
                zhethis.editlogolink=data.link;
                zhethis.editlogosrc=imgurl+data.image;
                zhethis.editdata=true;
            },
            editup(){
                let zhethis = this;
                let file = $('#editfileUp')[0].files[0];
                let formdata = new FormData();
                if(file!=undefined){
                    formdata.append('file',file)
                }
                formdata.append('id',this.editlogoname);
                formdata.append('name',this.editlogoname);
                formdata.append('sort',this.editlogosort);
                formdata.append('link',this.editlogolink)
                formdata.append('type',this.$route.params.id)
                moreupdaimg(formdata).then(response => {
                    if(response.code=='200'){
                        zhethis.$Modal.success({
                            title: "温馨提示",
                            content: '<p>修改成功</p>'
                        });
                    }
                })
            }
        },
        mounted () {
            // this.uploadList = this.$refs.upload.fileList;
            this.getimglistdata();
        }
    }
</script>
<style lang="less" scoped>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

    .fromcss{
        text-align: center;
    }
    .inputbox{
         display: flex;
         padding: 0 0 10px;
         > .informationbox{
            flex: 2;
            display: flex;
            margin-left: 0rem;
            padding: 0;
             > span {
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
</style>
