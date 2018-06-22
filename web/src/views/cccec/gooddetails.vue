<template>
    <div>
        <row>
            <card>
                <p slot="title">
                    <icon type="ios-list"></icon>
                    商品详情
                </p>
                <!--<div class="sreach-box">
                    <i-button type="ghost" icon="" @click="goback()">返回</i-button>
                    <i-button type="ghost" icon="" @click="updatedata">保存</i-button>
                </div>-->
            </card>
        </row>
        <Row>
    <Card>
        <div class="dataheader">
            <span class="dataheadertxt">基本信息</span>
        </div>
        <div class="inputbox">
            <div class="informationbox"><span><b>供应商</b>:</span>
                <i-select v-model="supplierId" clearable="" filterable="">
                    <i-option v-for="item in supplierIdlist" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                </i-select>
            </div>
            <div class="informationbox"><span><b>标题</b>:</span>
                <i-input v-model="goodname" placeholder="请输入..."></i-input>
            </div>
        </div>
        
        <div class="inputbox">
            <div class="informationbox"><span><b>商品类型</b>: </span>
                <!--<i-input v-model="goodtypename" placeholder="请输入..."></i-input>-->
                <i-select v-model="typeId" clearable="" filterable="">
                    <i-option v-for="item in typeIdlist" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                </i-select>
            </div>
            <div class="informationbox"><span><b>自定义编号</b>: </span>
                <i-input v-model="number" placeholder="请输入..."></i-input>
            </div>
        </div>
        
        <div class="inputbox" style="display:none">
            <div class="informationbox">
                <span><b>开售日期</b>: </span>
                <DatePicker type="date" class="datetimeselect" id="clickday" v-model="saledate" :options="options3" value="yyyy年MM月dd日" placeholder="开售日期"></DatePicker>
            </div>
            <div class="informationbox">
                <span><b>开售时间</b>: </span>
                <Time-picker type="time" class="datetimeselect" v-model="saletime" value="HH:mm:ss" confirm placeholder="选择时间"></Time-picker>
            </div>
        </div>
        
       <div class="inputbox">
                    <div class="informationbox">
                        <span><b>摘要:</b></span>
                        <i-input v-model="summary" placeholder="请输入..."></i-input>
                    </div>
                    <div class="informationbox">
                        <span><b>上架/下架:</b></span>
                        <div class="ivu-input-wrapper"><i-switch v-model="isOnline"  @on-change="clickisOnline"></i-switch></div>
                    </div>
                </div>
                
                <div class="inputbox">
                    
                    <div class="informationbox">
                        <span><b>审核状态:</b>&nbsp;&nbsp;{{status == false?'未审核':'已审核'}} </span>
                       
                    </div>

                </div>
                  <!-- <div class="inputbox">
                    <div class="informationbox">
                        <span>单个/多个:</span>
                        <div class="ivu-input-wrapper"><i-switch v-model="isSingleorder" true-value='1' false-value='0'></i-switch></div>
                    </div>
                    <div class="informationbox">
                        <span>单一支付: </span>
                        <div class="ivu-input-wrapper"><i-switch v-model="isSinglePaymentMode" true-value='1' false-value='0'></i-switch></div>
                    </div>
                    
                </div>
                <div class="inputbox">
                     <div class="informationbox">
                        <span>收取佣金：</span>
                        <div class="ivu-input-wrapper"><i-switch v-model="hasCommission" true-value='1' false-value='0'></i-switch></div>
                    </div>
                    <div class="informationbox"></div>
                </div> -->
        
        <div class="dataheader">
            <span class="dataheadertxt">商品主图</span>
        </div>
        <div class="inputbox">
                    <div>
                        <label>
                            <div style="width:100px;height:100px;text-align:center;" >
                                <Button><Icon type="ios-cloud-upload-outline" size="20" ></Icon><input style="width:65px;position:absolute;opacity:0" type="file" name="" id="goodImage" @change="preview()">上传图片</Button>
                                 <Button @click="modal1=true" style="margin-top:5px"><Icon type="ios-cloud-upload-outline" size="20"></Icon>编辑上传</Button>
                            </div>
                            <Modal  width="1000" 
                                v-model="modal1"
                                title="截图"
                                :mask-closable="false"
                                @on-ok="ok(1)"
                                @on-cancel="cancel(1)">
                                

                                <Row :gutter="10">
                                    <Row >                                     
                                        <div class="image-editor-con1-btn-con margin-top-10">
                                            <input style="width:65px;margin-bottom:10px" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange1" id="fileinput1" class="fileinput" />
                                            <!-- <Button type="info" class="filelabel" for="fileinput1"><Icon type="image"></Icon>&nbsp;选择图片</Button> -->
                                        </div>
                                    </Row>
                                    <Row   style="height:650px">
                                        <div  class="cropper">
                                            <img id="cropimg1" alt="">
                                        </div>
                                    </Row>
                                    
                                   
                                 
                                     
                                </Row>
                            </Modal>
                           <!--  <input type="file" style="display:none;" name="" id="goodImage" @change="preview()"> -->
                        </label>
                    </div>
                    <div @click="handleView()"><img :src="goodImageurl" style="max-width:100px;max-height:100px;margin-left:10px;"></div>
                </div>
        <!--<div class="dataheader">
            <input type="image" :src='indeximage' style="width:150px;height:150px;margin-left: 5px;" />
        </div>-->
        
        <div class="dataheader">
            <span class="dataheadertxt">商品图片</span>
        </div>
        <!--<div class="dataheader">
            <div id = 'imgdiv'>
            </div>
        </div>-->
        <div class="inputbox">
                     <div>
                        <label>
                            <div style="width:100px;height:100px;text-align:center;" >
                                <Button><Icon type="ios-cloud-upload-outline" size="20" ></Icon><input style="width:65px;position:absolute;opacity:0" type="file" name="" id="imageList" @change="previewlist()">上传图片</Button>
                                 <Button @click="modal2=true" style="margin-top:5px"><Icon type="ios-cloud-upload-outline" size="20"></Icon>编辑上传</Button>
                            </div>
                            <Modal  width="1000" 
                                v-model="modal2"
                                title="截图"
                                :mask-closable="false"
                                @on-ok="ok(2)"
                                @on-cancel="cancel(2)">
                                

                                <Row :gutter="10">
                                     <Row >
                                        <div class="image-editor-con1-btn-con margin-top-10">
                                            <input style="width:65px;margin-bottom:10px" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange2" id="fileinput2" class="fileinput" />
                                            <!-- <label class="filelabel" for="fileinput2"><Icon type="image"></Icon>&nbsp;选择图片</label> -->
                        
                                        </div>
                                    </Row>
                                    <Row   style="height:650px">
                                        <div class="cropper">
                                            <img id="cropimg2" alt="">
                                        </div>
                                    </Row>
                                   
                                </Row>
                            </Modal>
                            
                        </label>
                    </div>
                    <div><img v-for="list1 in imageListdata" :src="list1" @click="imageListView(list1)" style="max-width:100px;max-height:100px;margin-left:10px;"></div>
        </div>
       <!--  <div class="inputbox">
            <div>
                <label>
                    <div style="width:100px;height:100px;line-height: 100px;text-align:center; border:1px solid #cccccc;">
                        <Icon type="ios-cloud-upload-outline" size="20"></Icon>
                         上传图片
                    </div>
                    <input type="file" style="display:none;" name="" id="imageList" @change="previewlist()">
                </label>
            </div>
            <div><img v-for="list1 in imageListdata" :src="list1" @click="imageListView(list1)" style="max-width:100px;max-height:100px;margin-left:10px;"></div>
        </div> -->
                
        <div class="dataheader">
            <span class="dataheadertxt">商品详情</span>
        </div>
        <div class="inputbox">
             <!-- <button @click="getUEContent()">获取内容</button> -->
            <div class="editor-container">
              <UEditor :config=config ref="ueditor"></UEditor>
            </div>
        </div>
       <!-- <div class="dataheader" id='details'>-->
       <!-- </div>-->
       <div class="dataheader">
                <span class="dataheadertxt">商品规格</span>
           </div>
            <div class="inputbox">
                <div class='informationbox'><span>规格名称一:</span>
                    <!--<i-input v-model="level1" placeholder="请输入规格名"></i-input>-->
                    <p>{{level1}}</p>
                    <i-button size="small" icon="edit" @click="visibleselect1=true"></i-button>
                </div>
                &nbsp;
                 <div class="informationbox">
                        <Button icon="ios-plus-empty" type="primary" size="small"  shape="circle" @click="handleAdd(1)">添加标签</Button>
                        <div v-show="divlabel1" style="display: flex;">
                            <i-input v-model="label1" placeholder="请输入规格项"></i-input>
                            <i-button type="info" icon="" @click="savelabel(1)">确定</i-button>
                        </div>
                   </div>
            </div>
            <div class="inputbox">
                <div class="informationbox">
                    &nbsp;&nbsp;&nbsp;&nbsp;<Tag v-for="item in countsmall1" color="red" :key="item.id" :name="item.id" closable @on-close="handleClose1">{{ item.name}}</Tag>
                </div>
        
            </div>
            <div style="border: 0.5px solid #D7D4F0 ;margin: 0 10%;" >
                </div>
            
            <div class="inputbox">
                <div class='informationbox'><span>规格名称二:</span>
                    <!--<i-input v-model="level2" placeholder="请输入规格名"></i-input>-->
                    <p>{{level2}}</p>
                    <i-button size="small" icon="edit" @click="visibleselect2=true"></i-button>
                </div>
                &nbsp;
                <div class="informationbox">
                    <Button icon="ios-plus-empty" type="primary" size="small"  shape="circle" @click="handleAdd(2)">添加标签</Button>
                    <div v-if="divlabel2" style="display: flex;">
                        <i-input v-model="label2" placeholder="请输入规格项"></i-input>
                        <i-button type="info" icon="" @click="savelabel(2)">确定</i-button>
                    </div>
                </div>
            </div>  
            <div class="inputbox">
                <div class="informationbox">
                    &nbsp;&nbsp;&nbsp;&nbsp;<Tag v-for="item in countsmall2" color="red" :key="item.id" :name="item.id" closable @on-close="handleClose2">{{ item.name }}</Tag>
                </div>
                <!-- <div class="informationbox" style="width:300px" v-if="divlabel2">
                        <div class="ivu-input-wrapper">
                            <span>订单：</span><i-switch v-model="isSingleorder2"  size="large">
                                <span slot="open">单个</span>
                                <span slot="close">多个</span>
                            </i-switch>
                        </div>
                        <div class="ivu-input-wrapper">
                            <span>支付方式：</span><i-switch v-model="isSinglePaymentMode2"  size="large">
                                <span slot="open">单种</span>
                                <span slot="close">多种</span>
                            </i-switch>
                        </div>
                        <div class="ivu-input-wrapper">
                            <span>支付佣金：</span><i-switch v-model="hasCommission2"  size="large">
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </div>
                    </div> -->
            </div>
            <div style="border: 0.5px solid #D7D4F0 ;margin: 0 10%;" >
                </div>
            
            <div class="inputbox">
                <div class='informationbox'><span>规格名称三:</span>
                    <p>{{level3}}</p>
                    <!--<i-input v-model="level3" placeholder="请输入规格名"></i-input>-->
                    <i-button size="small" icon="edit" @click="visibleselect3=true"></i-button>
                </div>
                &nbsp;
                <div class="informationbox">
                    <Button icon="ios-plus-empty" type="primary" size="small"  shape="circle" @click="handleAdd(3)">添加标签</Button>
                    <div v-if="divlabel3" style="display: flex;">
                    <i-input v-model="label3" placeholder="请输入规格项"></i-input>
                    <i-button type="info" icon="" @click="savelabel(3)">确定</i-button>
                    </div>      
                </div>
            </div>  
            <div class="inputbox">
                <div class="informationbox">
                    &nbsp;&nbsp;&nbsp;&nbsp;<Tag v-for="item in countsmall3" color="red" :key="item.id" :name="item.id" closable @on-close="handleClose3">{{ item.name }}</Tag>
                </div>
                <!-- <div class="informationbox" style="width:300px" v-if="divlabel3">
                        <div class="ivu-input-wrapper">
                            <span>订单：</span><i-switch v-model="isSingleorder3"  size="large">
                                <span slot="open">单个</span>
                                <span slot="close">多个</span>
                            </i-switch>
                        </div>
                        <div class="ivu-input-wrapper">
                            <span>支付方式：</span><i-switch v-model="isSinglePaymentMode3"  size="large">
                                <span slot="open">单种</span>
                                <span slot="close">多种</span>
                            </i-switch>
                        </div>
                        <div class="ivu-input-wrapper">
                            <span>支付佣金：</span><i-switch v-model="hasCommission3"  size="large">
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </div>
                    </div> -->
            </div>
       
       
       
        <div class="dataheader">
            <span class="dataheadertxt">规格表</span>
            <can-edit-table
                    class="table" 
                    refs="tableExcel"
                    v-model="tableData"
                    :editIncell="true"
                    :columns-list="tableColumnsupdate"
            ></can-edit-table>
        </div>
        <!--<div class="inputbox">
            <i-button type="error" icon="plus" @click="addspecificatio()">添加规格</i-button>
        </div>
        <div id="specificationdiv" class="specificationul">
            <ul v-show="clickaddspecificatio">
                <li>规格</li>
                <li>规格名称</li>
                <li>供货价</li>
                <li>标价</li>
                <li>折扣价</li>
                <li>商城积分</li>
                <li>库存</li>
            </ul>
        </div>-->
        <div class="dataheader">
                <span class="dataheadertxt">新增规格表</span>
                <can-edit-table-two
                        class="table" 
                        refs="tableExcel2"
                        v-model="spealldata"
                        :editIncell="true"
                        :loading="loading"
                        :columns-list="tableColumnsinsert"
                ></can-edit-table-two>
        </div>
        
        <!--<div class="dataheader">
                    &nbsp;<span class="dataheadertxt">商品信息</span>
        </div>-->
        <div class="dataheader">
            <span class="dataheadertxt">商品信息表</span>
            <can-edit-table-three
                    class="table" 
                    refs="tableExcel3"
                    v-model="tableDatainformation"
                    :editIncell="true"
                    :columns-list="tableColumnsinformation"
            ></can-edit-table-three>
        </div>
        <div class="inputbox">
            <i-button type="error" icon="plus" @click="addspecificatio()">添加商品信息</i-button>
        </div>
        <div id="specificationdiv" class="specificationul">
            <ul v-show="clickaddspecificatio">
                <li>  </li>
                <li>标题</li>
                <li>内容</li>
            </ul>
        </div>
        
        <div class="dataheader">
            <span class="dataheadertxt">商品类别 : </span>
        </div>
        <div class="inputbox">
            <Tree :data="categorylist" show-checkbox multiple ref="categoryIdsTree"></Tree>
        </div>
        
        <div class="dataheader">
            <span class="dataheadertxt">商品标签</span>
        </div>
        <div class="inputbox">
            <Tree :data="labellist" show-checkbox multiple ref="labelIdsTree"></Tree>
        </div>
        
        <div class="informationbtn">
            <i-button type="warning" icon="" @click="goback()">返回</i-button>
            <i-button type="info" icon="" @click="updatedata()">保存</i-button>
        </div>
        </Card>
    </Row>
    <modal title="图片预览" v-model="visible">
            <img :src="newbigimg" v-if="visible" style="width: 100%">
            <div slot="footer">
            <Button type="error" size="large" long  @click="del">删除</Button>
            </div>
    </modal>
    <modal title="修改" v-model="visibleselect1"   @on-ok="changegood(1)" :closable="false">
        <div class='informationbox'><span>规格名:</span>
            <i-input v-model="updatelevelName1" placeholder="请输入规格名"></i-input>
        </div>
    </modal>
    <modal title="修改" v-model="visibleselect2"   @on-ok="changegood(2)" :closable="false">
        <div class='informationbox'><span>规格名:</span>
            <i-input v-model="updatelevelName2" placeholder="请输入规格名"></i-input>
        </div>
    </modal>
    <modal title="修改" v-model="visibleselect3"   @on-ok="changegood(3)" :closable="false">
        <div class='informationbox'><span>规格名:</span>
            <i-input v-model="updatelevelName3" placeholder="请输入规格名"></i-input>
        </div>
    </modal>
    </div>
</template>
<script>
    import canEditTable from './components/canEditTable.vue';
    import canEditTabletwo from './components/canEditTabletwo.vue';
    import canEditTablethree from './components/canEditTablethree.vue';
    import Bus from './bus.js';
    import {UEditor} from '@/components/ueditor/index.js';
    import "../../../static/js/jquery-2.0.0.min.js";
     import Cropper from 'cropperjs';
    import util from "@/libs/util";
    import {
        delspecone,getgooddetails,getlabelIdsdata,getcategoryIdsdata,imgurl,getsupplierlist,gettypelist,updateGood,getspeclist,getgoodsupplier
    }
        from "./../api/api.js";
    export default {
        name: "goodDetails",
        components: {
            UEditor,'can-edit-table': canEditTable,'can-edit-table-two': canEditTabletwo,'can-edit-table-three': canEditTablethree
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

                isSingleorder:false,
                isSinglePaymentMode:false,
                hasCommission:false,
                isSingleorder2:false,
                isSinglePaymentMode2:false,
                hasCommission2:false,
                isSingleorder3:false,
                isSinglePaymentMode3:false,
                hasCommission3:false,
                coinprice:'',
                modal1:false,
                modal2:false,
                 option1: {
                    showCropedImage: false,
                    cropedImg: ''
                },
                 option2: {
                    showCropedImage2: false,
                    cropedImg2: ''
                },
                tableColumns:[],
                 cropdata2: {
                    x: '',
                    y: '',
                    w: '',
                    h: '',
                    deg: '',
                    scaleX: '',
                    scaleY: ''
                },
                imgWidth:'',
                imgHeight:'',
                tableDatainformation:[],
                id1:'',
                id2:'',
                id3:'',
                updatelevelName1:'',
                updatelevelName2:'',
                updatelevelName3:'',
                visibleselect1:false,
                visibleselect2:false,
                visibleselect3:false,
                spealldata: [],
                rowdata1 : [],
                rowdata2 : [],
                rowdata3 : [],
                divlabel1:false,
                divlabel2:false,
                divlabel3:false,
                duibi1: [],
                duibi2: [],
                duibi3: [],
                count1: [],
                count2: [],
                count3: [],
                countte1: [],
                countte2: [],
                countte3: [],
                countsmall1: [],
                countsmall2: [],
                countsmall3: [],
                level1:'',
                level2:'',
                level3:'',
                label1:'',
                label2:'',
                label3:'',
                length:'',
                loading:false,
                id: "",//商品id
                batchUpdateBox: false,
                ids: "",
                tableData: [],//商品规格资源
               // suppliername: '',//供应商,
                goodname: '',    //商品名称
               // goodtypename: '',//商品类型
                number: '', //自定义编号
                saledate: '',//开售日期
                saletime: '',//开售时间
                summary: '',//摘要
                isOnline: '',//是否上架
                status: '',
                indeximage: '',//商品主图
                imagedates: [],//图片数组
                supplierId: '',//供应商id
                typeId: '', //商品类型id
                tableColumnsupdate:[],
                tableColumnsinsert:[],
                tableColumnsinformation:[{
                    title: '标题',
                    key: 'label',
                    align: 'center',
                    editable: true
                },  {
                    title: '内容',
                    key: 'key',
                    align: 'center',
                    editable: true
                }, {
                    title: '操作',
                    align: 'center',
                    key: 'handle',
                    handle: ['delete']
                }],
                tableColumns3:[{
                    title: '',
                    key: 'key1',
                    align: 'center'
                },{
                    title: '',
                    key: 'key2',
                    align: 'center'
                },{
                    title: '',
                    key: 'key3',
                    align: 'center'
                },  {
                    title: '供货价',
                    key: 'supplyPrice',
                    align: 'center',
                    editable: true
                }, {
                    title: '标价',
                    key: 'price',
                    align: 'center',
                    editable: true
                }, {
                    title: '折扣价',
                    key: 'discount',
                    align: 'center',
                    editable: true
                },
                {
                    title: '库存',
                    key: 'stock',
                    align: 'center',
                    editable: true
                }, 
                {
                    title: '积分',
                    key: 'bonusPoint',
                    align: 'center',
                    editable: true
                }, 
                // {
                //     title:"价格",
                //     key:"coinPrice",
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'订单数',
                //     key:'isSingleOrder',
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'支付方式',
                //     key:'isSinglePaymentMode',
                //     align:'center',
                //    render: (h, params) => {
                //         return h('select', [h('option', params.row.isSinglePaymentMode)]);
                //     }
                // },
                // {
                //     title:'佣金',
                //     key:'hasCommission',
                //     align:'center',
                //     editable: true
                // },
                {
                    title: '操作',
                    align: 'center',
                    key: 'handle',
                    handle: ['delete']
                }],
                tableColumns2:[{
                    title: '',
                    key: 'key1',
                    align: 'center'
                },{
                    title: '',
                    key: 'key2',
                    align: 'center'
                }, {
                    title: '供货价',
                    key: 'supplyPrice',
                    align: 'center',
                    editable: true
                }, {
                    title: '标价',
                    key: 'price',
                    align: 'center',
                    editable: true
                }, {
                    title: '折扣价',
                    key: 'discount',
                    align: 'center',
                    editable: true
                },
                {
                    title: '库存',
                    key: 'stock',
                    align: 'center',
                    editable: true
                }, {
                    title: '积分',
                    key: 'bonusPoint',
                    align: 'center',
                    editable: true
                },
                //  {
                //     title:"价格",
                //     key:"coinPrice",
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'订单数',
                //     key:'isSingleOrder',
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'支付方式',
                //     key:'isSinglePaymentMode',
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'佣金',
                //     key:'hasCommission',
                //     align:'center',
                //     editable: true
                // },
                {
                    title: '操作',
                    align: 'center',
                    key: 'handle',
                    handle: ['delete']
                }],
                tableColumns1: [{
                    title: '',
                    key: 'key1',
                    align: 'center'
                },  {
                    title: '供货价',
                    key: 'supplyPrice',
                    align: 'center',
                    editable: true
                }, {
                    title: '标价',
                    key: 'price',
                    align: 'center',
                    editable: true
                }, {
                    title: '折扣价',
                    key: 'discount',
                    align: 'center',
                    editable: true
                },
                {
                    title: '库存',
                    key: 'stock',
                    align: 'center',
                    editable: true
                },{
                    title: '积分',
                    key: 'bonusPoint',
                    align: 'center',
                    editable: true
                },
                //  {
                //     title:"价格",
                //     key:"coinPrice",
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'订单数',
                //     key:'isSingleOrder',
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'支付方式',
                //     key:'isSinglePaymentMode',
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'佣金',
                //     key:'hasCommission',
                //     align:'center',
                //     editable: true
                // },
                 {
                    title: '操作',
                    align: 'center',
                    key: 'handle',
                    handle: ['delete']
                }],//商品规格
                details: '',//商品详情
                options3: {
                    disabledDate (date) {
                         return date && date.valueOf() < Date.now();
                    }
                },
                delInformationlist:'',
                visible: false,
                newbigimg: '',
                goodImageurl: '',
                updateimgurldata:"",
                imageListdata: [],
                imageidlist: [],//图片数组的id
                goodImageurldata: [],
                clickaddspecificatio: false,
                categorylist: [],//类别数状数据
                categoryids: '',//本来拥有的类别
                categorylistidslist: [],//拥有类别id作为数组
                goodsLabelids: '',//本来拥有的标签
                labellistidslist: [],//拥有标签id作为数组
                labellist: [],//标签树状数据
                delimagelist: undefined, //需要删除的图片id
                delspeclist: undefined,//需要删除的规格id
                supplierIdlist: [],
                typeIdlist: [],
                addcategoryids: '',//要增加的商品类别
                delcategoryids: '',//要删除的商品类别
                spealldatanew:[],
            };
        },
        mounted() {
            let img1 = document.getElementById('cropimg1');
        this.cropper1 = new Cropper(img1, {
            dragMode: 'move',
            preview: '#preview1',
            restore: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false
        }); 
        img1.addEventListener('crop', (e) => {
            this.cropdata2.w = parseInt(e.detail.width);
            this.cropdata2.h = parseInt(e.detail.height);
        });
         let img2 = document.getElementById('cropimg2');
        this.cropper2 = new Cropper(img2, {
            dragMode: 'move',
            preview: '#preview2',
            restore: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false
        }); 
            Bus.$off('delete');
            Bus.$off('deleteInformation');
            var that = this;
            this.id = this.$route.params.id;
            // 初始化获取数据
            getgooddetails(this.id).then(response => {
//              console.log(JSON.stringify(response));
                if(response.data.name){
                this.goodname = response.data.name;}
                this.number = response.data.number;
                var datetime = response.data.saleTime;
                if(datetime!=undefined&&datetime!=null&&datetime!=''){
                    this.saledate = datetime.split(" ")[0];
                    this.saletime = datetime.split(" ")[1];
                }
                this.summary = response.data.summary;
                this.isOnline = response.data.isOnline ==0 ?  false:true;
                this.status = response.data.status == 0 ? false:true;
                this.imagedates = response.data.images;
                this.addimage(this.imagedates);
                // this.isSingleorder = response.data.isSingleorder ==0 ?  false:true;
                // this.isSinglePaymentMode = response.data.isSinglePaymentMode ==0 ?  false:true;
                // this.hasCommission = response.data.hasCommission ==0 ?  false:true;
                // this.coinprice = response.data.coinprice;
                if(response.data.indexImage){
                    this.goodImageurl = imgurl + response.data.indexImage;
                }
                if(response.data.goodsExtras){
                    this.tableDatainformation = response.data.goodsExtras;
                }
                console.log(JSON.stringify(this.tableDatainformation));
                this.details = response.data.detail;
                this.supplierId = response.data.supplierId;
                this.typeId = response.data.typeId;
                if(this.details){
                    setTimeout(() => {
                        that.setContent();
                    }, 1000);
                }//富文本框传入内容
                this.categoryids = this.addcategoryidslist(response.data.goodsCategory);
                this.goodsLabelids = this.addlabelids(response.data.goodsLabel);
                if(response.data.spec.length>0){
                    this.isSingleorder = (response.data.spec[0].isSingleOrder == 1? true : false);
                    this.isSinglePaymentMode = (response.data.spec[0].isSinglePaymentMode == 1? true : false);
                    this.hasCommission = (response.data.spec[0].hasCommission == 1? true : false);
                    this.coinprice = response.data.spec[0].coinPrice;
                    console.log("isSingleOrder："+this.isSingleorder);

                    if(response.data.spec[0].levelName3 !=undefined){
                  
                        this.tableColumnsupdate = this.tableColumns3;
                    }else if(response.data.spec[0].levelName2 !=undefined){
                   
                        this.tableColumnsupdate = this.tableColumns2;
                    }else{
                        this.tableColumnsupdate = this.tableColumns1;
                    }
                        this.tableData = response.data.spec;
//                      this.tableColumns[0].title = response.data.spec[0].levelName1;
//                      this.tableColumns[1].title = response.data.spec[0].levelName2;
//                      this.tableColumns[2].title = response.data.spec[0].levelName3;
                }
           });
            setTimeout(() => {
                   //   that.setContent();
//                  getgoodsupplier(this.supplierId).then(response => {
//                      if(response.data.length>0){
//                          this.suppliername = response.data[0].name;}
//                  });
//                  getgoodtype(this.typeId).then(response => {
//                      if(response.data.length>0){
//                          this.goodtypename = response.data[0].name;}
//                  });
                    getcategoryIdsdata(this.categoryids).then(response => {
                        this.categorylist = response.data;
                           });
                    getlabelIdsdata(this.goodsLabelids).then(response => {
                        this.labellist = response.data;
                            });
                    //标签的获取api
                    this.getseclistdata(this.id);        
            }, 1000);
            getgoodsupplier().then(response => {
                this.supplierIdlist=response.data;
            })
            gettypelist().then(response => {
                this.typeIdlist=response.data;
            })
            
            
            var that = this;
            //删除
            Bus.$on('delete', function (deleteId) {
                var id = deleteId;
                console.log(deleteId);
                if (that.delspeclist == undefined || that.delimagelist == ''){
                    that.delspeclist = ''+id;
                }else{
                    that.delspeclist = that.delspeclist + ',' + id;
                }
            });
            Bus.$on('deleteInformation', function (deleteId) {
                var id = deleteId;
                console.log(deleteId);
                if (that.delInformationlist == undefined || that.delInformationlist == ''){
                    that.delInformationlist = ''+id;
                }else{
                    that.delInformationlist = that.delInformationlist + ',' + id;
                }
            });
        },
        created() {
            console.log(this.details);
//          if(this.details){
//              this.setContent();
//          }
        },
        methods: {
            updataSize(index){
            if(index == 1){
            this.cropdata2.w =parseInt(this.imgWidth);
            this.cropdata2.h =parseInt(this.imgHeight);    
            this.cropper1.setCropBoxData({"width":this.cropdata2.w,"height":this.cropdata2.h})
            }else{
            this.cropdata2.w =parseInt(this.imgWidth);
            this.cropdata2.h =parseInt(this.imgHeight);    
            this.cropper2.setCropBoxData({"width":this.cropdata2.w,"height":this.cropdata2.h})
            };
        },
         handleChange1 (e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.cropper1.replace(reader.result);
                reader.onload = null;
            };
            reader.readAsDataURL(file);
            this.cropper1.setCropBoxData({"width":400,"height":400});
        },
        handlecrop1 () {
            this.goodImageurl = '';
            var obj = this.cropper1.getCropBoxData();  
            let file = this.cropper1.getCroppedCanvas({"width":obj.width,"height":obj.height}).toDataURL();
            this.option1.cropedImg = file;
            this.option1.showCropedImage = true;
            this.goodImageurl = file;
            this.updateimgurldata = $('#fileinput1')[0].files[0];
            this.modal1=false;
        },
         handleChange2(e) {

            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.cropper2.replace(reader.result);
                reader.onload = null;
            };
            reader.readAsDataURL(file);

        },
        handlecrop2() {

            var obj = this.cropper2.getCropBoxData();  
            let file= this.cropper2.getCroppedCanvas({"width":obj.width,"height":obj.height}).toDataURL();
            this.option2.cropedImg2= file;
            this.option2.showCropedImage2= true;
            this.imageListdata.push(file);
            this.goodImageurldata.push($('#fileinput2')[0].files[0]);
            this.modal2=false;
        },


         ok (index) {
            if(index == 1){
                    this.handlecrop1();
            }else{
                    this.handlecrop2();
            }
             

            },
          cancel (index) {
                this.$Message.info('Clicked cancel');
            },
             clickisOnline (status) {
            // this.$Message.info('开关状态：' + status);
             },
            changegood(val){
//              delspecqueen(this['updatelevelName'+val],this['id'+val]).then(response => {
//                      this.$Message.success('更改成功');
//                      getgooddetails(this.id).then(response => {
//                          if(response.data.spec){
//                                  this.tableData = response.data.spec;
//                                      this.tableColumns[0].title = response.data.levelName1
//                                      this.tableColumns[1].title = response.data.levelName2
//                                      this.tableColumns[2].title = response.data.levelName3
//                                  
//                                  
//                              }
                            
                                this['level'+val] = this['updatelevelName'+val];
                            
                            
                            //this.tableColumnsupdate[val-1].title = this['level'+val];
                            //this.tableColumnsinsert[val-1].title = this['level'+val];
                            this.updatetableColumns(this.length);
//                      })
//              });
//              
            },
            updatetableColumns(length){
                this.length = length;
                this.tableColumns = this['tableColumns'+length];
                for(var i= 0;i<length;i++){
                    let c= i+1;
                    this.tableColumnsupdate[i].title = this['level'+c];
                }

            },
            getseclistdata(val){
                getspeclist(val).then(response => {
                    if(response.data){
                        for(var i = 0;i<response.data.length;i++){
                            let c= i+1;
                            this['id'+c] = response.data[i].labelId; 
                            this['level'+c]= response.data[i].levelName;
                            console.log(this.level2);
                            if(response.data[i].levelList){
                                this['countte'+c] = response.data[i].levelList;
                                for(let row1 of  response.data[i].levelList){
                                //  if(row1.name.length> 3){
                                    //  row1.name = row1.name.substr(0,3)+'..'
                                        this['countsmall'+c].push({name:row1.name,id:row1.id});
                                //  }else{
                                    //  this['countsmall'+c].push({name:row1.name,id:row1.id});
                                    //}
                                    this['duibi'+c].push(row1.id);
                                }   
                            }
                        }
                    }
                    

                            this.updatetableColumns(response.data.length);
                    
                    //console.log(this.count1);
                    console.log(this.countsmall1);
                });
            },
            checkdata(spealldatanew){
                console.log(this.$store.state.goods.edittingStore);
                for(let row1 of  this.$store.state.goods.edittingStore){            
                    for(let row2 of  spealldatanew){
                        if(row1.key3&&row2.key3){
                            if(row1.key1 == row2.key1&& row1.key2 == row2.key2&& row1.key3 == row2.key3){
                                var delindex = spealldatanew.indexOf(row2);
                                spealldatanew.splice(delindex, 1);
                            }
                        }else if(row1.key2 && row2.key2 && !row1.key3 &&!row2.key3 ){
                            console.log('更表'+row2.key2);
                            console.log(row1.key2);
                            if(row1.key1 == row2.key1&& row1.key2 == row2.key2){
                            var delindex = spealldatanew.indexOf(row2);
                            spealldatanew.splice(delindex, 1);
                            }
                        }
                        else if(row1.key1 && row2.key1 && !row1.key2 &&!row2.key2 ){
                            if(row1.key1 == row2.key1){
                            var delindex = spealldatanew.indexOf(row2);
                            spealldatanew.splice(delindex, 1);
                            }
                        }
                    }
                }
                return spealldatanew;
            },
            inserttablespe(){
                this.loading = true;
                var spealldatanew = [];
                var speallnamedata=[];
            if(this.countte3.length !=0){
                console.log("count1:"+this.count1);
                for (let row1 of  this.countsmall1) {
                    for(let row2 of  this.countsmall2){
                        for(let row3 of  this.countsmall3){
                                spealldatanew.push({
                                key1:row1.name,
                                key2:row2.name,
                                key3:row3.name,
                                //name: +'/'+row2+'/'+row3,
                                supplyPrice:'0',
                                price:'0',
                                discount:'0',
                                integral:'0',
                                stock:'0',
                                isSingleOrder:'0',
                                isSinglePaymentMode: '0',
                                hasCommission: '0',
                                coinprice: '0'
                                });
                        }   
                    }
                }
                if(this.length !=3){
                    this.tableData = [];
                }
                this.length = 3;
                //this.tableColumnsupdate = this.tableColumns3;
                this.tableColumnsinsert = this.tableColumns3;
                this.tableColumnsinsert[0].title = this.level1;
                this.tableColumnsinsert[1].title = this.level2;
                this.tableColumnsinsert[2].title = this.level3;

                this.tableColumnsupdate = this.tableColumns3;
                this.tableColumnsupdate[0].title = this.level1;
                this.tableColumnsupdate[1].title = this.level2;
                this.tableColumnsupdate[2].title = this.level3;
                spealldatanew = this.checkdata(spealldatanew);
            }else if(this.countte2.length !=0 ){
                console.log(22);
                for (let row1 of  this.countsmall1) {
                    for(let row2 of  this.countsmall2){
                                spealldatanew.push({
                                key1:row1.name,
                                key2:row2.name,
                                supplyPrice:'0',
                                price:'0',
                                discount:'0',
                                integral:'0',
                                stock:'0',
                                 isSingleOrder:'0',
                                isSinglePaymentMode: '0',
                                hasCommission: '0',
                                coinprice: '0'
                                });
                    }
                }
                if(this.length !=2){
                    this.tableData = [];
                }
                this.length = 2;
                //this.tableColumnsupdate = this.tableColumns2;
                console.log(spealldatanew);
                this.tableColumnsinsert = this.tableColumns2;
                this.tableColumnsinsert[0].title = this.level1;
                this.tableColumnsinsert[1].title = this.level2;
                this.tableColumnsupdate = this.tableColumns2;
                this.tableColumnsupdate[0].title = this.level1;
                this.tableColumnsupdate[1].title = this.level2;
                spealldatanew = this.checkdata(spealldatanew);
            }else{
                console.log(33);
                for (let row1 of  this.countsmall1) {
                                speallnamedata.push(row1.name);
                                spealldatanew.push({
                                key1:row1.name,
                                supplyPrice:'0',
                                price:'0',
                                discount:'0',
                                integral:'0',
                                stock:'0',
                                isSingleOrder:'0',
                                isSinglePaymentMode: '0',
                                hasCommission: '0',
                                coinprice: '0'
                                });
                }
                if(this.length !=1){
                    this.tableData = [];
                }
                this.length = 1;
                //this.tableColumnsupdate = this.tableColumns1;
                this.tableColumnsinsert = this.tableColumns1;
                this.tableColumnsinsert[0].title = this.level1;
                this.tableColumnsupdate = this.tableColumns1;
                this.tableColumnsupdate[0].title = this.level1;
                spealldatanew = this.checkdata(spealldatanew);
            }           
                
//              
                this.spealldata = [];
                console.log(spealldatanew);
                let that = this;
                    setTimeout(function(){
                        that.spealldata = spealldatanew;
                        //that.tableData = spealldatanew;
                        that.loading = false;
                    },500);
                    
                    
                
            },
            delspec(name,specid){
                delspecone(name,specid).then(response => {
                    if(response.code=="200"){
                        this.$Message.success('删除成功');
                        getgooddetails(this.id).then(response => {
                            this.tableData = response.data.spec;
                            if(response.data.spec.length > 0){
                                if(response.data.spec[0].levelName3 !=undefined){
                                    this.tableColumnsupdate = this.tableColumns3;
                                }else if(response.data.spec[0].levelName2 !=undefined){
                                    this.tableColumnsupdate = this.tableColumns2;
                                }else{
                                    this.tableColumnsupdate = this.tableColumns1;
                                }
                                    
                            }
                            
                        })
                    
                    }else{
                        this.$Message.error('删除失败，请重试')
                    }
                })
            },
            handleClose1 (event, name) {
                console.log(name);
                
                var countIdlist = [];
                for(let row of  this.countsmall1){
                    countIdlist.push(row.id);
                }
                
                const index = countIdlist.indexOf(name);
                for(let row of  this.duibi1){
                    console.log(row == name);
                    if(row == name){
                        console.log(name);
                        console.log(row);
                        this.delspec(name,this.id1);
                        this.duibi1.splice(index, 1);
                    }
                }
                
                console.log(index);
                this.countte1.splice(index, 1);
                this.countsmall1.splice(index, 1);
                this.inserttablespe();
            },
            handleClose2 (event, name) {
                var countIdlist = [];
                for(let row of  this.countsmall2){
                    countIdlist.push(row.id);
                }
                const index = countIdlist.indexOf(name);
                for(let row of  this.duibi2){
                    if(row == name){
                        this.delspec(name,this.id2);
                        this.duibi2.splice(index, 1);
                    }
                }
               
                this.countte2.splice(index, 1);
                this.countsmall2.splice(index, 1);
                this.inserttablespe();
            },
            handleClose3 (event, name) {
                var countIdlist = [];
                for(let row of  this.countsmall3){
                    countIdlist.push(row.id);
                }
                
                const index = countIdlist.indexOf(name);
                
                
                for(let row of  this.duibi3){
                    if(row == name){
                        this.delspec(name,this.id3);
                        this.duibi3.splice(index, 1);
                    }
                }
                this.countsmall3.splice(index, 1);
                this.countte3.splice(index, 1);
                this.inserttablespe();
            },
            savelabel(val) {
                 if(this['label'+val] == ""){
                 this.$Message.error('请输入标签');return;
                }
                console.log("重复几次"+ this['countsmall'+val].push({id:this['label'+val],name:this['label'+val]}));
                //}
                // this['countte'+val].push({id:this['label'+val],name:this['label'+val]});
                this['label'+val] = "";
                this['divlabel'+val]=false;
                this.inserttablespe();
                console.log(this.countsmall1);
                //console.log(this.count1);
                
        //     this['count'+val].push(this['label'+val]);
        //     //if(this['label'+val].length > 3){
        //     //  var ss= this['label'+val].substr(0,3)+'..'
        //     //  this['countsmall'+val].push(ss);
        // //  }else{
        //         this['countsmall'+val].push(this['label'+val]);
        // //  }
        //     //console.log(ss);
            
            
        //     this['divlabel'+val]=false;
        //     this['label'+val] = "";
        //     this.inserttablespe();
            },
            handleAdd (val) {
                if(this['level'+val] == ""){
                     this.$Message.error('请输入规格名');return;
                }
                    this['divlabel'+val]=true;
            },
            addcategoryidslist(data){
                var idsdata = '';
                for(var i = 0; i < data.length; i++){
                    if(data[i]){
                        idsdata = idsdata + ',' + data[i].id;
                    this.categorylistidslist.push(data[i].id);
                    }
                }
                return idsdata;
            },
            addlabelids(data){
                var idsdata = '';
                for(var i = 0; i < data.length; i++){
                    if(data[i]){
                        idsdata = idsdata + ',' + data[i].id;
                        this.labellistidslist.push(data[i].id);
                    }
                }
                return idsdata;
            },
            addspecificatio(){
                this.clickaddspecificatio=true;
                let txtdata=["标题","内容"];
                let newtxt="";
                for(var txts=0;txts<txtdata.length;txts+=1){
                    newtxt+='<li style="text-align:center;height:23px;flex:1;">'+
                                '<input type="text" style="text-align:center;width: 100%; height: 100%; border:none; border-right: 2px solid #f5f5f5;" name="">'+
                            '</li>';
                }
                let specificationtxt = '<ul style="display:flex; padding: 0 0 10px;margin: 0 10%;background: #f5f5f5;">'+
                                            '<li style="text-align:center;height:23px;flex:1;">'+
                                                '信息'+($("#specificationdiv ul").length)+
                                            '</li>'+
                                            newtxt
                                        '</ul>';
                $("#specificationdiv").append(specificationtxt);
            },
            setContent (){
                this.$refs.ueditor.serUEContent(this.details);
            },
            del(){
                var idindex = '';
                console.log(this.newbigimg);
                for(var i=0; i < this.imageListdata.length; i++){
                    if(this.newbigimg == this.imageListdata[i]){
                        console.log(this.imageListdata[i]);
                        idindex = i;
                        this.imageListdata.splice(i, 1);
                        break;
                    }
                }
                console.log(this.imageidlist[idindex]);
                if (this.delimagelist == undefined || this.delimagelist == ''){
                    this.delimagelist = this.imageidlist[idindex];
                }else{
                    this.delimagelist = this.delimagelist + ',' + this.imageidlist[idindex];
                }
                this.imageidlist.splice(idindex, 1);
                setTimeout(() => {
                    this.visible = false;
                    this.$Message.success('删除成功');
                }, 1000);
            },
            previewlist(){
                let file = $('#imageList')[0];
                let zhethis=this;
                if (file.files && file.files[0]) {
                  var reader = new FileReader();
                  reader.onload = function(evt) {
                    zhethis.imageListdata.push(evt.target.result);
                    zhethis.goodImageurldata.push($('#imageList')[0].files[0]);
                  }
                  reader.readAsDataURL(file.files[0]);
                }
            },
            imageListView(imgurl){
                this.visible = true;
                this.newbigimg=imgurl;
             },
            handleView (name) {
            this.visible = true;
            this.newbigimg=this.goodImageurl;
            },
            preview(){
                let file = $('#goodImage')[0];
                // let file2 = $('#fileUp2')[0];
                // let file3 = $('#fileUp3')[0];
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
            addimage(data){
//              var imagetxt = '';
//              for(var i=0 ;i < data.length ;i++){
//                  imagetxt = imagetxt + '<input type="image" style="width:100px;height:100px;margin-left: 5px;" src="' + imgurl + data[i].image + '" /> '
//              }
//              $("#imgdiv").append(imagetxt);
                for(var i=0 ;i < data.length ;i++){
                    this.imageListdata.push(imgurl+data[i].image);
                    this.imageidlist.push(data[i].id);
                }
                //console.log(this.imageidlist);
            },
            selectIds(selection) {
                if (selection.length == 0) {
                    this.ids = '';
                }
                selection.forEach((item, index) => {
                    if (index == 0) {
                        this.ids = item.id;
                    } else {
                        this.ids = this.ids + ',' + item.id;
                    }
                })
            },
            goback() {
                let argu = {};
                util.openNewPage(this, 'goodslist', argu);
                // this.$router.push({
                //     name: 'goodslist',
                //     params: argu
                // });
                window.history.go(-1);
                this.$store.commit('removeTag', 'gooddetails');
                this.$store.commit('closePage', 'gooddetails');
                localStorage.pageOpenedList = JSON.stringify(this.$store.state.pageOpenedList);
                if (this.currentPageName === 'gooddetails') {
                    let lastPageName = '';
                    if (this.$store.state.pageOpenedList.length > 1) {
                        lastPageName = this.$store.state.pageOpenedList[1].name;
                    } else {
                        lastPageName = this.$store.state.pageOpenedList[0].name;
                    }
                    this.$router.push({
                        name: 'goodslist'
                    });
                }
            },
            updatedata() {
                //delimagelist//需要删除图片的id
                //delspeclist//需要删除规格
                let formdata = new FormData();
                if(this.delimagelist!=undefined&&this.delimagelist!='undefined'){
                    formdata.append('imageIds',this.delimagelist);
                }
                if(this.delspeclist!=undefined&&this.delspeclist!='undefined'){
                    formdata.append('specificationIds',this.delspeclist);
                }
                if(this.delInformationlist!=undefined&&this.delInformationlist!='undefined'){
                    formdata.append('delGoodsExtraIds',this.delInformationlist);
                }
                
                formdata.append('id',this.id);
                formdata.append('supplierId',this.supplierId);
                formdata.append('name',this.goodname);
                formdata.append('typeId',this.typeId);
                formdata.append('number',this.number);
                formdata.append('summary',this.summary);
                //formdata.append('merchantId',0);
                
                let updayeSpelist = []
                if(this.$store.state.goods.edittingStore.length!=0){
                    
                for(let row of this.$store.state.goods.edittingStore){
                    let specdata=[];
                                specdata.push(
                                    {
                                        key:row.key1 ==undefined ? '':row.key1,
                                        levelName:row.key1 ==undefined ? '':this.level1,
                                        //  isSingleOrder:this.isSingleorder == true? 1 : 0,
                                        // isSinglePaymentMode:this.isSinglePaymentMode == true? 1 : 0,
                                        // hasCommission: this.hasCommission == true? 1 : 0, 
                                      
                                    },
                                    {
                                        key:row.key2 ==undefined ? '':row.key2,
　　　　　　　　                        levelName:row.key2 ==undefined ? '':this.level2,
                                        
                              
                                    },
                                    {
                                        key:row.key3 ==undefined ? '':row.key3,
　　　　　　　　                        levelName:row.key3 ==undefined ? '':this.level3,
                                        
                                    });
                                    updayeSpelist.push({
                                        isSingleOrder:row.isSingleorder == 0 ? 0 : 1,
                                        isSinglePaymentMode:row.isSinglePaymentMode == 0 ? 0 : 1,
                                        hasCommission: row.hasCommission == 0 ? 0 : 1,
                                        spec: specdata,
                                        id: row.id,
                                        coinprice: row.coinprice,
                                        supplyPrice: row.supplyPrice,
                                        price: row.price,
                                        discount: row.discount,
                                        bonusPoint: row.bonusPoint&&row.bonusPoint>=0?row.bonusPoint:row.discount,
                                        integral:'0',
                                        stock: row.stock
                                    });
                }
               }
            //  updayeSpelist = JSON.stringify(updayeSpelist);
              //  console.log(updayeSpelist);
               // formdata.append('updateSpecificationList',updayeSpelist);
                let nowdate=this.saledate;
                let nowclicktime=this.saletime;
                let nowYeardate="";
                let nowMonthdate="";
                let nowDaydate="";
                let nowclickday="";
                if(nowdate!=""&&nowdate!=null&&nowdate!=undefined){
    
                    nowYeardate=nowdate.getFullYear();
                    // 获取月份
                    nowMonthdate=((nowdate.getMonth()+1)<10?'0'+(nowdate.getMonth()+1):(nowdate.getMonth()+1));
                    // 获取日期
                    nowDaydate=(nowdate.getDate()<10?'0'+nowdate.getDate():nowdate.getDate());
                    nowclickday=nowYeardate+'-'+nowMonthdate+'-'+nowDaydate;
                }
                let timetostr= nowclicktime.toString(); 
                if(timetostr.length>'8'&&nowclicktime!=""&&nowclicktime!=null&&nowclicktime!=undefined){
                    nowclicktime=(nowclicktime.getHours()<10?'0'+nowclicktime.getHours():nowclicktime.getHours())+':'+(nowclicktime.getMinutes()<10?'0'+nowclicktime.getMinutes():nowclicktime.getMinutes())+':'+(nowclicktime.getSeconds()<10?'0'+nowclicktime.getSeconds():nowclicktime.getSeconds()); 
                }
               
                let zhetime=nowclickday+" "+nowclicktime;
                if(zhetime!=" "){
                    formdata.append('saleTime',zhetime);
                }
                let isonlinedata=0;
                if(this.isOnline==true){
                    isonlinedata=1;
                }
                formdata.append('isOnline',isonlinedata);
                
                let isstatus=0;
                if(this.status==true){
                    isstatus=1;
                }
                formdata.append('status',isstatus);
                if($('#goodImage')[0].files[0]!=undefined&&$('#goodImage')[0].files[0]!='undefined'){
                    formdata.append('goodImage',$('#goodImage')[0].files[0]);
                }
                
                for(let k=0;k<this.goodImageurldata.length;k++){
                    formdata.append('imageList'+k,this.goodImageurldata[k]);
                }
                let content = this.$refs.ueditor.getUEContent();
                formdata.append('detail',content);
                let specificationdatatxt=[];
//              if($("#specificationdiv ul").length>1){
//                  for(var sl=1;sl<$("#specificationdiv ul").length;sl++){
//                      specificationdatatxt.push({'name':$("#specificationdiv ul").eq(sl).find("input").eq(0).val(),'supplyPrice':$("#specificationdiv ul").eq(sl).find("input").eq(1).val(),'price':$("#specificationdiv ul").eq(sl).find("input").eq(2).val(),'discount':$("#specificationdiv ul").eq(sl).find("input").eq(3).val(),'integral':$("#specificationdiv ul").eq(sl).find("input").eq(4).val(),'stock':$("#specificationdiv ul").eq(sl).find("input").eq(5).val()});
//                  }
//              } 
                console.log(this.$store.state.goods.goodsTable);
                if(this.$store.state.goods.goodsTable.length!=0){
                for (let row of this.$store.state.goods.goodsTable) {
                    let specdata2=[];
                                specdata2.push({
                                    key:row.key1 ==undefined ? '':row.key1,
　　　　　　　　                        levelName:row.key1 ==undefined ? '':this.level1},
                                    {
                                    key:row.key2 ==undefined ? '':row.key2,
　　　　　　　　                        levelName:row.key2 ==undefined ? '':this.level2},
                                    {
                                    key:row.key3 ==undefined ? '':row.key3,
　　　　　　　　                        levelName:row.key1 ==undefined ? '':this.level3});
                            console.log(specdata2)
                                updayeSpelist.push({
//                                  levelName1:this.level1,
//                                  levelName2:this.level2,
//                                  levelName3:this.level3,
//                                  key1:row.key1,
//                                  key2:row.key2,
//                                  key3:row.key3,
                                    spec: specdata2,
                                    supplyPrice: row.supplyPrice,
                                    price: row.price,
                                    discount: row.discount,
                                    bonusPoint:  row.bonusPoint&&row.bonusPoint>=0?row.bonusPoint:row.discount,
                                    integral:'0',
                                    stock: row.stock
                                });
                       }
                }
                updayeSpelist=JSON.stringify(updayeSpelist);
                console.log(updayeSpelist);
                formdata.append('specificationList',updayeSpelist);
                
                  let updateGoodsExtraList=[];
                    if($("#specificationdiv ul").length>1){
                        for(var sl=1;sl<$("#specificationdiv ul").length;sl++){
                            updateGoodsExtraList.push({'label':$("#specificationdiv ul").eq(sl).find("input").eq(0).val(),'key':$("#specificationdiv ul").eq(sl).find("input").eq(1).val()});
                        }
                    }
            
                //console.log(JSON.stringify(updateGoodsExtraList));
                formdata.append('goodsExtraList',JSON.stringify(updateGoodsExtraList));
                
               
                let updayeinsertoinformation = [];
                 if(this.$store.state.goods.cacheGoodsTable.length!=0){
                for(let row of this.$store.state.goods.cacheGoodsTable){
                    updayeinsertoinformation.push({
                        id: row.id,
                        label: row.label,
                        key: row.key,
                        goodsId:this.id
                    });
                }
                }
                formdata.append('updateGoodsExtraList',JSON.stringify(updayeinsertoinformation));
                console.log(JSON.stringify(updayeinsertoinformation));
                
                let nowlabelIds="";
                let nowlabelIdsTree=this.$refs.labelIdsTree.getCheckedNodes();
                let nowlabelIdsdata = [];
                for(let i=0; i<nowlabelIdsTree.length; i++){
                    nowlabelIdsdata.push(nowlabelIdsTree[i].id);
                }
                let labellistidslistJOSN = this.labellistidslist;
                let dellabelids = '';
                for(var i=0; i<labellistidslistJOSN.length; i++){
                    if (nowlabelIdsdata.indexOf(labellistidslistJOSN[i]) == '-1') {
                        dellabelids += ',' + labellistidslistJOSN[i];
                    }
                }   
                let addlabelids = '';
                for(var i=0; i<nowlabelIdsdata.length; i++){
                    if (labellistidslistJOSN.indexOf(nowlabelIdsdata[i]) == '-1') {
                        addlabelids += ',' + nowlabelIdsdata[i];
                    }
                }   
                formdata.append('labelIds',addlabelids);
                formdata.append('delLabelIds',dellabelids);
                console.log(addlabelids);
                console.log(dellabelids);
                

                let nowcategoryIds="";
                let nowcategoryIdsTree=this.$refs.categoryIdsTree.getCheckedNodes();
                let nowcategoryIdsdata = [];
                for(let i=0; i<nowcategoryIdsTree.length; i++){
                    nowcategoryIdsdata.push(nowcategoryIdsTree[i].id);
                }
                let categorylistidslistJSON = this.categorylistidslist;
                this.delcategoryids = '';
                for(var i=0; i<categorylistidslistJSON.length; i++){
                    if (nowcategoryIdsdata.indexOf(categorylistidslistJSON[i]) == '-1') {
                        this.delcategoryids += ',' + categorylistidslistJSON[i];
                    }
                }   
                this.addcategoryids = '';
                for(var i=0; i<nowcategoryIdsdata.length; i++){
                    if (categorylistidslistJSON.indexOf(nowcategoryIdsdata[i]) == '-1') {
                        this.addcategoryids += ',' + nowcategoryIdsdata[i];
                    }
                }   
                formdata.append('categoryIds',this.addcategoryids);
                formdata.append('delCategoryIds',this.delcategoryids);
                
                console.log(this.$store.state.goods.edittingStore);
                console.log(this.$store.state.goods.cacheGoodsTable);
                 console.log(this.$store.state.goods.goodsTable);
                console.log(nowlabelIdsTree);
                console.log(nowcategoryIdsTree);

                console.log(JSON.stringify(formdata));
                updateGood(formdata).then(response => {
                    if(response.code=="200"){
                        this.$Modal.success({
                            title: "温馨提示",
                            content: '<p>保存成功</p>'
                        });
                    }else{
                        this.$Modal.error({
                            title: "温馨提示",
                            content: response.message
                        });
                    }
                });
            }
        },
        watch: {
            '$route'(to, from) {
                if (to.name == 'goodDetails') {
                    console.log(212121);
                   document.body.scrollTop = document.documentElement.scrollTop = 0;
                    }
                    this.tableloading = false;
                }
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
                background: #EFEFEF;
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

