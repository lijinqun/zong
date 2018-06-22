<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    新增商品
                </p>
            </Card>
        </Row>
        <Row>
            <Card>
                <div class="dataheader">
                    <span class="dataheadertxt">基本信息</span>
                </div>
                <div class="inputbox">
                    <div class="informationbox"><span>供应商:</span>
                        <i-select v-model="supplierId" clearable="" filterable="">
                            <i-option v-for="item in supplierIdlist" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                        </i-select>
                    </div>
                    <div class="informationbox"><span>标题:</span>
                        <i-input v-model="name" placeholder="请输入..."></i-input>
                    </div>
                </div>

                <div class="inputbox">
                    <div class="informationbox"><span>商品类型:</span>
                        <i-select v-model="typeId" clearable="" filterable="">
                            <i-option v-for="item in typeIdlist" :value="item.id" :key="item.id">{{ item.name }}</i-option>
                        </i-select>
                    </div>
                    <div class="informationbox"><span>自定义编号:</span>
                        <i-input v-model="number" placeholder="请输入..."></i-input>
                    </div>
                </div>
                <div class="inputbox" style="display:none">
                    <div class="informationbox">
                        <span>开售日期:</span>
                        <DatePicker type="date" class="datetimeselect" id="clickday" v-model="online" :options="options3" value="yyyy年MM月dd日" placeholder="开售日期"></DatePicker>
                    </div>
                    <div class="informationbox">
                        <span>开售时间:</span>
                        <!-- <DatePicker type="date" class="datetimeselect" v-model="onlinetime" :options="options3" placeholder="开售时间"></DatePicker> -->
                         <Time-picker type="time" class="datetimeselect" v-model="onlinetime" value="HH:mm:ss" confirm placeholder="选择时间"></Time-picker>
                    </div>
                </div>

                <div class="inputbox">
                    <div class="informationbox">
                        <span>摘要:</span>
                        <i-input v-model="summary" placeholder="请输入..."></i-input>
                    </div>
                    <div class="informationbox">
                        <span>上架/下架:</span>
                        <div class="ivu-input-wrapper"><i-switch v-model="isOnline"  @on-change="clickisOnline"></i-switch></div>
                    </div>
                </div>
                
                 <!--  <div class="inputbox">
                    <div class="informationbox">
                        <span>单个/多个:</span>
                        <div class="ivu-input-wrapper"><i-switch v-model="isSingleorder"  v-bind:true-value='1' v-bind:false-value='0'></i-switch></div>
                    </div>
                    <div class="informationbox">
                        <span>单一支付: </span>
                        <div class="ivu-input-wrapper"><i-switch v-model="isSinglePaymentMode" v-bind:true-value='1' v-bind:false-value='0'></i-switch></div>
                    </div>
                    
                </div>
                <div class="inputbox">
                     <div class="informationbox">
                        <span>收取佣金：</span>
                        <div class="ivu-input-wrapper"><i-switch v-model="hasCommission" v-bind:true-value='1' v-bind:false-value='0'></i-switch></div>
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
                
                <div class="dataheader">
                    <span class="dataheadertxt">商品图片</span>
                </div>
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
                <div class="dataheader">
                    <span class="dataheadertxt">商品详情</span>
                </div>
                <div class="inputbox">
                     <!-- <button @click="getUEContent()">获取内容</button> -->
                    <div class="editor-container">
                      <UEditor :config=config ref="ueditor"></UEditor>
                    </div>
                    <!-- <i-button type="error" style="display:block;" icon="plus" @click="getUEContent()">获取内容</i-button> -->
                </div>
                <div class="dataheader">
                    <span class="dataheadertxt">商品规格</span>
                </div>
                <!--<div class="inputbox">
                    <i-button type="error" icon="plus" @click="addcolorsize()">添加类型</i-button>
                    &nbsp;
                    <i-button type="error" icon="plus" @click="adddata()">添加数据</i-button>
                    <i-button type="error" icon="plus" @click="addspecificatio()">添加规格</i-button>
                </div>-->
                
                <div class="inputbox" >
                    <div class='informationbox'><span>规格名称一:</span>

                        <i-input v-model="level1" placeholder="请输入规格名"></i-input>

                    </div>
                    &nbsp;
                    <div class="informationbox">
                        <Button icon="ios-plus-empty" type="primary" size="small"  shape="circle" @click="handleAdd(1)">添加标签</Button>
                        <div v-if="divlabel1" style="display: flex;">
                            <i-input v-model="label1" placeholder="请输入规格项"></i-input>
                            <i-button type="info" icon="" @click="savelabel(1)">确定</i-button>
                        </div>
                   </div>
                </div>
                <div class="inputbox">
                    <div class="informationbox">
                        &nbsp;&nbsp;&nbsp;&nbsp;<Tag v-for="item in countsmall1" color="red" :key="item" :name="item" closable @on-close="handleClose1">{{ item }}</Tag>
                    </div>
                </div>
                <div style="border: 0.5px solid #D7D4F0 ;margin: 0 10%;" >
                </div>
                
                <div class="inputbox">
                    <div class='informationbox'><span>规格名称二:</span>
                        <i-input v-model="level2" placeholder="请输入规格名"></i-input>
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
                        &nbsp;&nbsp;&nbsp;&nbsp;<Tag v-for="item in countsmall2" color="red" :key="item" :name="item" closable @on-close="handleClose2">{{ item }}</Tag>
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
                        <i-input v-model="level3" placeholder="请输入规格名"></i-input>
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
                        &nbsp;&nbsp;&nbsp;&nbsp;<Tag v-for="item in countsmall3" color="red" :key="item" :name="item" closable @on-close="handleClose3">{{ item }}</Tag>
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
                            v-model="spealldata"
                            :editIncell="true"
                            :loading="loading"
                            :columns-list="tableColumns"
                    ></can-edit-table>
                </div>
                
                <div class="dataheader">
                    &nbsp;<span class="dataheadertxt">商品信息</span>
                </div>
                <div class="inputbox">
                    <i-button type="error" icon="plus" @click="addspecificatio()">添加商品信息</i-button>
                </div>
                <div id="specificationdiv" class="specificationul">
                    <ul v-show="clickaddspecificatio">
                        <li>  </li>
                        <li>标题</li>
                        <li>内容</li>
                        <!--<li>供货价</li>
                        <li>标价</li>
                        <li>折扣价</li>
                        <li>商城积分</li>
                        <li>库存</li>-->
                    </ul>
                </div>        
                <div class="dataheader">
                    <span class="dataheadertxt">商品类别</span>
                </div>
                <div class="inputbox">
                    <Tree :data="categoryIdsdata" show-checkbox multiple ref="categoryIdsTree"></Tree>
                </div>

                <div class="dataheader">
                    <span class="dataheadertxt">商品标签</span>
                </div>
                <div class="inputbox">
                    <Tree :data="labelIdsdata" show-checkbox multiple ref="labelIdsTree"></Tree>
                </div>
                
                <div class="informationbtn">
                    <!--<i-button type="warning" icon="" @click="goback()">返回</i-button>-->
                    <i-button type="info" icon="" @click="savegoodsdata()">保存</i-button>
                </div>
            </Card>
        </Row>
        <modal title="图片预览" v-model="visible">
            <img :src="newbigimg" v-if="visible" style="width: 100%">
        </modal>
        <!--<modal title="添加框" v-model="visible2"  @on-ok="inserttablespe" :closable="false">
            <i-input v-model="level1" placeholder="请输入规格名"></i-input>
            <br><br>
            <Tag v-for="item in count1" :key="item" :name="item" closable @on-close="handleClose1">{{ item }}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(1)">添加标签</Button>
            <div v-if="divlabel1" style="display: flex;">
                <i-input v-model="label1" placeholder="请输入规格项"></i-input>
                <i-button type="info" icon="" @click="savelabel(1)">确定</i-button>
            </div>
            <br><br>
            <i-input v-model="level2" placeholder="请输入规格名"></i-input>
            <br><br>
            <Tag v-for="item in count2" :key="item" :name="item" closable @on-close="handleClose2">{{ item }}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(2)">添加标签</Button>
            <div v-if="divlabel2" style="display: flex;">
                <i-input v-model="label2" placeholder="请输入规格项"></i-input>
                <i-button type="info" icon="" @click="savelabel(2)">确定</i-button>
            </div>
            <br><br>
            <i-input v-model="level3" placeholder="请输入规格名"></i-input>
            <br><br>
            <Tag v-for="item in count3" :key="item" :name="item" closable @on-close="handleClose3">{{ item }}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(3)">添加标签</Button>
            <div v-if="divlabel3" style="display: flex;">
                <i-input v-model="label3" placeholder="请输入规格项"></i-input>
                <i-button type="info" icon="" @click="savelabel(3)">确定</i-button>
            </div>
            <!--<p>参数：</p>
            <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose3">{{ item }}</Tag>
            <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd(3)">添加标签</Button>-->
        <!--</modal>-->
        
        <!--<modal title="添加框" v-model="visibleselect"   @on-ok="changegood" :closable="false">
                 <Cascader :data="selectlabeldata" trigger="hover" @on-change = "getvalue"></Cascader>
        </modal>-->
        <!--<modal title="新增类别" v-model="visible" :loading="loading" @on-ok="insert" :closable="false">
        <div class="informationbox"><span>级别:</span>
        <i-input v-model="insertgrade" placeholder="请输入级别" @on-change="getpar"></i-input>
        </div>
        <br>
        <div class="informationbox"><span>上级名称:</span>
            <i-select v-model="parentId" clearable="" filterable="" id="grade1">
                <i-option v-for="item in parentdata" :value="item.id" :key="item.id">{{ item.name }}</i-option>
            </i-select>
            <i-select v-model="parentId" clearable="" filterable="" id="grade2">
                <i-option v-for="item in parentdata" :value="item.id" :key="item.id">{{item['parent.name']}}/{{ item.name }}</i-option>
            </i-select>
        </div>
        <br>
        <div class="informationbox"><span>名称:</span>
            <i-input v-model="insertname" placeholder="请输入名称"></i-input>
       </div>
        </modal>-->
    </div>
</template>

<script>
    import canEditTable from './components/canEditTable.vue';
    import Bus from './bus.js';
    import {UEditor} from '@/components/ueditor/index.js'
    import util from "@/libs/util";
    import {getsupplierlist,gettypelist,getlabelIdsdata,getcategoryIdsdata,savegoods,savegoodsspec,getspeclist,getgoodsupplier
    }from "./../api/api.js";
    import "../../../static/js/jquery-2.0.0.min.js";
    import Cropper from 'cropperjs';
export default {
    name: 'order',
    components: {
        UEditor,'can-edit-table': canEditTable
    },
    data () {
        let self=this;
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
                initialContent:'',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                initialFrameWidth: null,
                initialFrameHeight: 450,
                BaseUrl: '',
                UEDITOR_HOME_URL: 'static/ueditor/'
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
            coinprice2:'',
            coinprice3:'',
            modal1:false,
            modal2:false,
            // PaymentModelist:[
            //     {
            //         id:'0',
            //         name:''
            //     },
            //     {
            //         id:'1',
            //         name:'微信支付'
            //     },{
            //         id:'2',
            //         name:'余额'
            //     },{}
            // ],
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
            tableColumns1:[{
                    title: '',
                    key: 'label1',
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
                },  {
                    title: '积分',
                    key: 'bonusPoint',
                    align: 'center',
                    editable: true
                },
                {
                    title:"珠宝数量",
                    key:"coinprice",
                    align:'center',
                    editable: true
                },
                {
                    title:'单独订单',
                    key:'isSingleOrder',
                    align:'center',
                    editable: true
                },
                {
                    title:'珠宝支付',
                    key:'isSinglePaymentMode',
                    align:'center',
                     editable: true
                    // render: (h, params) => {
                    //     return h('i-select', [h('i-option', params.row.isSinglePaymentMode!==null?
                    //         {
                    //             props:{
                    //                 value:params.row.isSinglePaymentMode
                    //             }
                               
                    //         }:'')]);
                    // }
                },
                {
                    title:'支付佣金',
                    key:'hasCommission',
                    align:'center',
                    editable: true
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'handle',
                    handle: ['delete']
                }],
            tableColumns2:[{
                    title: '',
                    key: 'label1',
                    align: 'center'
                },{
                    title: '',
                    key: 'label2',
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
                // {
                //     title:"珠宝数量",
                //     key:"coinprice",
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'唯一订单',
                //     key:'isSingleOrder',
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'珠宝支付',
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
            tableColumns3:[{
                    title: '',
                    key: 'label1',
                    align: 'center'
                },{
                    title: '',
                    key: 'label2',
                    align: 'center'
                },{
                    title: '',
                    key: 'label3',
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
//              {
//                  title: '商城积分',
//                  key: 'integral',
//                  align: 'center',
//                  editable: true
//              }, 
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
                // {
                //     title:"价格",
                //     key:"coinprice",
                //     align:'center',
                //     editable: true
                // },
                // {
                //     title:'订单数量',
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
            iswho:'',
            loading:false,
            selectspecdata:[],  
            listspec:[],    
            pid: '0',
            supplierId:'',
            name:'',
            typeId:'',
            number:'',
            summary:'',
            online:'',
            onlinetime:'',
            isOnline:false,
            newbigimg:'',
            imageListdata:[],
            status: false,
            supplierIdlist:[],
            typeIdlist:[],
            labelIdsdata:[],
            categoryIdsdata:[],
            count1: [],
            count2: [],
            count3: [],
            countsmall1: [],
            countsmall2: [],
            countsmall3: [],
            clickaddspecificatio:false,
            label1: '',
            label2: '',
            label3: '',
            visible2: false,
            visible: false,
            updateimgurl:'',
            goodImageurl:'',
            divlabel1:false,
            divlabel2:false,
            divlabel3:false,
            updateimgurldata:"",
            goodImageurldata:[],
            spealldata:[],
            level1:'',
            level2:'',
            level3:'',
            visibleselect:false,
            index:'',
            rowdata1 : [],
            rowdata2 : [],
            rowdata3 : [],
            spealldatanew:[],
            selectlabeldata:[],
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now();
                }
            },
        };
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
            this.iswho = 2;
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.cropper1.replace(reader.result);
                reader.onload = null;
            };
            reader.readAsDataURL(file);
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
        adddata() {
                this.loading = true;
                let tablelist = this.spealldata;
                tablelist[tablelist.length] = {};
                this.spealldata = [];
                let that = this;
                setTimeout(function(){
                    that.spealldata = tablelist;
                    that.loading = false;
                },500);
            },
        changegood () {
                //selectspecdata
//              let selectlist = this.selectid.split(',');
                let tablelist = this.spealldata;
                tablelist[this.index]['id'] = this.selectspecdata[2].value;
                tablelist[this.index]['name'] = this.selectspecdata[0].label + '/' + this.selectspecdata[1].label + '/' + this.selectspecdata[2].label;
                this.spealldata = [];
                let that = this;
                this.loading = true;
                setTimeout(function(){
                    that.spealldata = tablelist;
                    that.loading = false;
                },500);
                
        },
        savelabel(val) {
            if(this['label'+val] == ""){
                 this.$Message.error('请输入标签');return;
            }
            this['count'+val].push(this['label'+val]);
            //if(this['label'+val].length > 3){
            //  var ss= this['label'+val].substr(0,3)+'..'
            //  this['countsmall'+val].push(ss);
        //  }else{
                this['countsmall'+val].push(this['label'+val]);
        //  }
            //console.log(ss);
            
            
            this['divlabel'+val]=false;
            this['label'+val] = "";
            this.inserttablespe();
        },
        handleAdd (val) {
            if(this['level'+val] == ""){
                 this.$Message.error('请输入规格名');return;
            }
                this['divlabel'+val]=true;
        },
        handleClose1 (event, name) {
            const index = this.count1.indexOf(name);
            this.count1.splice(index, 1);
            this.countsmall1.splice(index, 1);
            this.inserttablespe();
        },
        handleClose2 (event, name) {
            console.log(name);
            const index = this.count2.indexOf(name);
            this.count2.splice(index, 1);
            this.countsmall2.splice(index, 1);
            this.inserttablespe();
        },
        handleClose3 (event, name) {
            const index = this.count3.indexOf(name);
            this.count3.splice(index, 1);
            this.countsmall3.splice(index, 1);
            this.inserttablespe();
        },
        inserttablespe(){
            this.loading = true;
            this.spealldatanew = [];
            if(this.count3.length !=0){
                console.log("count1:"+this.count1);

                for (let row1 of  this.count1) {
                    for(let row2 of  this.count2){
                        for(let row3 of  this.count3){

                                this.spealldatanew.push({
                                label1:row1,
                                label2:row2,
                                label3:row3,
                                supplyPrice:'0', 
                                price:'0',
                                discount:'0',
//                              integral:'0',
                                stock:'0',
                                isSingleOrder:'0',
                                isSinglePaymentMode: '0',
                                hasCommission: '0',
                                coinprice: '0'
                                });
                        }   
                    }
                }
                this.tableColumns = this.tableColumns3;
                this.tableColumns[0].title = this.level1;
                this.tableColumns[1].title = this.level2;
                this.tableColumns[2].title = this.level3;
            }else if(this.count2.length !=0 ){
                console.log(21);
                for (let row1 of  this.count1) {
                    for(let row2 of  this.count2){
                                this.spealldatanew.push({
                                label1:row1,
                                label2:row2,
                                isSingleOrder:'0',
                                isSinglePaymentMode: '0',
                                hasCommission: '0',
                                coinprice: '0',
                                supplyPrice:'0',
                                price:'0',
                                discount:'0',
//                              integral:'0',
                                stock:'0'
                                });
                    }
                }
                this.tableColumns = this.tableColumns2;
                this.tableColumns[0].title = this.level1;
                this.tableColumns[1].title = this.level2;
            }else{
                console.log(331);
                for (let row1 of  this.count1) {
                                this.spealldatanew.push({
                                label1:row1,
                                isSingleOrder:'0',
                                isSinglePaymentMode: '0',
                                hasCommission: '0',
                                coinprice: '0',
                                supplyPrice:'0',
                                price:'0',
                                discount:'0',
//                              integral:'0',
                                stock:'0'
                                });
                }
                this.tableColumns = this.tableColumns1;
                this.tableColumns[0].title = this.level1;
            }
            
            
            this.spealldata = [];
            let that = this;
                setTimeout(function(){
                    that.spealldata = that.spealldatanew;
                    that.loading = false;
                },500);
            
            
//          this.loading = true;
//              let tablelist = this.spealldata;
//              tablelist[tablelist.length] = {};
//              this.spealldata = [];
//              let that = this;
//              setTimeout(function(){
//                  that.spealldata = tablelist;
//                  that.loading = false;
//              },500);
            
//          if(this.count1 == ''||this.count2 == ''||this.count3 == ''){
//              this.$Message.error('请输入三层规格');
//              return;
//          }
//          
            this.rowdata1 = [];
//          this.rowdata2 = [];
//          this.rowdata3 = [];
            for (let row1 of  this.count1) {
                this.rowdata1.push({
                            key: row1,
                            levelName:this.level1,

                        });
            }
            for (let row2 of  this.count2) {
                this.rowdata1.push({
                            key: row2,
                            levelName:this.level2
                        });
            }
            for (let row3 of  this.count3) {
                this.rowdata1.push({
                            key: row3,
                            levelName:this.level3
                        });
            }
//          
//          //console.log()
//          savegoodsspec(rowdata1,rowdata2,rowdata3).then(response => {
//              if (response.success) {
//                          this.$Message.success('添加成功');
//                          this.getseclistdata();
//                        //  this.getfoodLists(this.pageNumber);
//                      } else {
//                          console.log(response.message);
//                          this.$Message.error(response.message);
//                      }
//          })
//          
                
            
        },
        getUEContent() {
        let content = this.$refs.ue.uedatasubmits();
        console.log(content)
      },
        clickisOnline (status) {
            // this.$Message.info('开关状态：' + status);
        },
        preview(){
            this.iswho = 1;
            let file = $('#goodImage')[0];
            let zhethis=this;
            if (file.files && file.files[0]) {
              var reader = new FileReader();
              reader.onload = function(evt) {
                zhethis.goodImageurl = evt.target.result;
                zhethis.updateimgurldata = $('#goodImage')[0].files[0];
                console.log( $('#goodImage')[0].files[0]);
              }
              reader.readAsDataURL(file.files[0]);
            }
        },
        handleView () {
            this.visible = true;
            this.newbigimg=this.goodImageurl;
        },
        
        previewlist(){
            let file = $('#imageList')[0];
            let zhethis=this;
            if (file.files && file.files[0]) {
              var reader = new FileReader();
              reader.onload = function(evt) {
                console.log(evt.target.result);
                console.log(zhethis.imageListdata);
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

        getsupplier(){
            getgoodsupplier().then(response => {
                this.supplierIdlist=response.data;
            })
        },
        gettype(){
            gettypelist().then(response => {
                this.typeIdlist=response.data;
            })
        },
        addcolorsize(){
            this.visible2 = true;
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

        getlabelIdsdatalist(){
            getlabelIdsdata().then(response => {
                   this.labelIdsdata=response.data;
                   console.log(this.labelIdsdata);
//              var nowlabeldata=[];
//              for(var i=0;i<response.data.length;i++){
//                  nowlabeldata.push({
//                      "expand":true,
//                      "title":response.data[i].name,
//                      "id":response.data[i].id,
//                      "grade":response.data[i].grade,
//                  })
//                  if(response.data[i].children){
//                      nowlabeldata[i].children=[];
//                      for(var j=0;j<response.data[i].children.length;j++){
//                          nowlabeldata[i].children.push({
//                              "expand":true,
//                              "title":response.data[i].children[j].name,
//                              "id":response.data[i].children[j].id,
//                              "grade":response.data[i].children[j].grade,
//                          })
//                          if(response.data[i].children[j].children){
//                              nowlabeldata[i].children[j].children=[];
//                              for(var k=0;k<response.data[i].children[j].children.length;k++){
//                                  nowlabeldata[i].children.children.push({
//                                      "expand":true,
//                                      "title":response.data[i].children[j].children[k].name,
//                                      "id":response.data[i].children[j].children[k].id,
//                                      "grade":response.data[i].children[j].children[k].grade,
//                                  })
//                              }
//                          }
//                      }
//                  }
//              }
//              this.labelIdsdata=nowlabeldata;
            })
        },

        getcategoryIdsdatalist(){
            getcategoryIdsdata().then(response => {
                   this.categoryIdsdata=response.data;
//              var nowlabeldata2=[];
//              for(var i=0;i<response.data.length;i++){
//                  nowlabeldata2.push({
//                      "expand":true,
//                      "title":response.data[i].name,
//                      "id":response.data[i].id,
//                      "grade":response.data[i].grade,
//                  })
//              }
//              this.categoryIdsdata=nowlabeldata2;
            })
        },


        savegoodsdata(){
            let formdata = new FormData();
            formdata.append('status',this.status == false ? '0' : '1');
            formdata.append('supplierId',this.supplierId);
            formdata.append('name',this.name);
            formdata.append('typeId',this.typeId);
            formdata.append('number',this.number);
            formdata.append('summary',this.summary);
            formdata.append('status','0');
            // formdata.append('merchantId',0);
            
//          formdata.append('levelList1',this.rowdata1);
//          formdata.append('levelList2',this.rowdata2);
//          formdata.append('levelList3',this.rowdata3);
            
            let nowdate=this.online;
            let nowclicktime=this.onlinetime;
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
            }console.log(zhetime);
            let isonlinedata=0;
            if(this.isOnline==true){
                isonlinedata=1;
            }
            formdata.append('isOnline',isonlinedata);
            if(this.iswho == 1){
                 formdata.append('goodImage',$('#goodImage')[0].files[0]);
            }
            if(this.iswho == 2){
                formdata.append('goodImage',$('#fileinput1')[0].files[0]);
            }
           
            for(let k=0;k<this.goodImageurldata.length;k++){
                formdata.append('imageList'+k,this.goodImageurldata[k]);
            }
            let content = this.$refs.ueditor.getUEContent();
            formdata.append('detail',content);
            let specificationdatatxt=[];
//          if($("#specificationdiv ul").length>1){
//              for(var sl=1;sl<$("#specificationdiv ul").length;sl++){
//                  specificationdatatxt.push({'name':$("#specificationdiv ul").eq(sl).find("input").eq(0).val(),'supplyPrice':$("#specificationdiv ul").eq(sl).find("input").eq(1).val(),'price':$("#specificationdiv ul").eq(sl).find("input").eq(2).val(),'discount':$("#specificationdiv ul").eq(sl).find("input").eq(3).val(),'integral':$("#specificationdiv ul").eq(sl).find("input").eq(4).val(),'stock':$("#specificationdiv ul").eq(sl).find("input").eq(5).val()});
//              }
//          }

            
            console.log(this.$store.state.goods.edittingStore);
            for (let row of this.$store.state.goods.edittingStore) {
                                let specdata=[];
                                specdata.push(
                                    {
                                        key:row.label1 ==undefined ? '':row.label1,
　　　　　　　　                        levelName:row.label1 ==undefined ? '':this.level1,
                                        
                                    },
                                    {
                                        key:row.label2 ==undefined ? '':row.label2,
　　　　　　　　                        levelName:row.label2 ==undefined ? '':this.level2,
                                    },
                                    {
                                        key:row.label3 ==undefined ? '':row.label3,
    　　　　　　　　                    levelName:row.label3 ==undefined ? '':this.level3,

                                    }
                                );

                                specificationdatatxt.push({
                                    isSingleOrder: row.isSingleOrder == 0 ? 0 : 1,
                                    isSinglePaymentMode: row.isSinglePaymentMode == 0 ? 0: 1 ,
                                    hasCommission: row.hasCommission == 0 ? 0 : 1,
                                    coinprice: row.coinprice,
                                    spec: specdata,
                                    supplyPrice: row.supplyPrice,
                                    price: row.price,
                                    discount: row.discount,
                                    integral: '0',
                                    bonusPoint: row.bonusPoint&&row.bonusPoint>=0?row.bonusPoint:row.discount,
                                    stock: row.stock
                                });
                        }
           
            specificationdatatxt=JSON.stringify(specificationdatatxt);
             formdata.append('specificationList',specificationdatatxt);
             
            let updateGoodsExtraList=[];
            if($("#specificationdiv ul").length>1){
                for(var sl=1;sl<$("#specificationdiv ul").length;sl++){
                    updateGoodsExtraList.push({'label':$("#specificationdiv ul").eq(sl).find("input").eq(0).val(),'key':$("#specificationdiv ul").eq(sl).find("input").eq(1).val()});
                }
            }
            
            //console.log(JSON.stringify(updateGoodsExtraList));
            formdata.append('goodsExtraList',JSON.stringify(updateGoodsExtraList));
            let nowlabelIds="";
            let nowlabelIdsTree=this.$refs.labelIdsTree.getCheckedNodes();
            console.log(this.$refs.labelIdsTree.getCheckedNodes());
            for(let tr=0;tr<nowlabelIdsTree.length;tr++){
                if(nowlabelIdsTree[tr].grade!='1'){
                    if(nowlabelIds==""){
                        nowlabelIds=nowlabelIdsTree[tr].id;
                    }else{
                        nowlabelIds=nowlabelIds+","+nowlabelIdsTree[tr].id;
                    }
                }else{
                    nowlabelIds = nowlabelIds+","+nowlabelIdsTree[tr].id;
                }
                
            }
            formdata.append('labelIds',nowlabelIds);
            let nowcategoryIds="";
            let nowcategoryIdsTree=this.$refs.categoryIdsTree.getCheckedNodes();

             for(let nn=0;nn<nowcategoryIdsTree.length;nn++){
                if(nn==0){console.log(nowcategoryIdsTree);
                    nowcategoryIds=nowcategoryIdsTree[0].id;
                }else{
                    nowcategoryIds=nowlabelIds+","+nowcategoryIdsTree[nn].id;
                }
            }

            formdata.append('categoryIds',nowcategoryIds);
            // formdata.append('labelIdsdata',this.labelIdsdata);
            console.log(formdata);
            savegoods(formdata).then(response => {
                if(response.code=="200"){
                    this.$Modal.success({
                        title: "温馨提示",
                        content: '<p>添加成功</p>'
                    });
                    this.$router.push('/goodsdata/goodslist')
                }else{
                    this.$Modal.error({
                        title: "温馨提示",
                        content: response.message
                    });
                }
            });
        },
        goback(){

        },
        getseclistdata(){
            getspeclist(this.pid).then(response => {
                console.log(212121);
                console.log(JSON.stringify(response.data));
                this.selectlabeldata = response.data;
            });
        },
        getvalue(value, selectedData){
            console.log(value);
            console.log(selectedData);
            this.selectspecdata = selectedData;
        }
        
    },
    created() {
        
    },
    mounted () {

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
  
        var that = this;
        Bus.$off('changevisible');    
        Bus.$off('updatetable');    
        
        this.getseclistdata();
        Bus.$on('changevisible', function (index) {
            console.log(index);
                that.index = index;
                that.visibleselect = true;
            });
        
        
         Bus.$on('updatetable', function (index,key,value) {
                that.index = index;
                var key1 = key;
                that.spealldata[that.index][key1] = value;
                console.log(that.spealldata);
            });
    },
    beforeRouteEnter (to,from,next){
            next ( vm => {
                vm.getsupplier();
                vm.gettype();
                vm.getlabelIdsdatalist();
                vm.getcategoryIdsdatalist();

                // vm.getarea4();
                // vm.init();
            })
        },
    watch:{
        // '$route' () {
        //     this.init();
        // },
        // 'area4Address':{
        //     handler:function(curVal,oldVal){
        //         console.log(this.orderoperNo)
        //         console.log(curVal)
        //         var zhethis =this;
        //         orderarea4operNo(curVal).then(response => {
        //             zhethis.orderoperNo=response.data[0].operNo;
        //         })
        //     }
        // }
    }
};
</script>

<style lang="less" scoped>
    @import '../../styles/common.less';
    @import './image-editor.less';
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
    
    .inputbox2{
         display: flex;
         padding: 15px 0 15px;
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
    .hideid{
        display: none;
    }
    .labelclass{
        width: 30%;
        margin-left: 2%;
    }
</style>
