<template>
  <div class="shop-setting">
    <!-- 头部 -->
    <top-header title="店铺设置"></top-header>
    <!-- <header class="top-title">
      <a class="back-off" href="#/selfSetting">
        <van-icon name="arrow-left" />
      </a>
      <span>店铺设置</span>
    </header> -->
    <!-- 基本信息 -->
    <div class="page">
      <div class="top">
        <span class="title">创建店铺</span>
        <!-- <span class="btn">保存</span> -->
      </div>
      <van-cell-group>
        <van-field label="店铺名称" v-model="merchantdata.shopName" placeholder="请输入店铺名称..."/>
        <van-cell is-link @click="getarea(1),showarea=true">
          <template slot="title">
            <span class="van-cell-text">店铺地址</span>
            <span v-text="fullarea" style="margin-left:29px;"></span>
          </template>
        </van-cell>
        <van-field label="详细地址" v-model="merchantdata.address" placeholder="请输入店铺详细地址"/>
        <!-- <van-cell title="店铺地址" value="请选择" is-link /> -->
        <van-field label="联系电话" v-model="merchantdata.phone" placeholder="可填写多个号码，逗号分隔..." />
        <!-- <van-field label="经营类别" icon="arrow" :value="catIdname" placeholder="请选择" @click="catIdshow=true"/> -->
        <div class="choosebox">
          <p><span class="headtxt">经营类别</span><span class="datatxt" v-text="catIdname" @click='catIdshow=true'></span></p>
        </div>
        <van-field v-model="merchantdata.shortDesc" label="简要描述" type="textarea" placeholder="这里能让客户对店铺更了解" rows="1" autosize />
        <van-radio-group v-model="isVisiable">
          <van-cell-group>
            <van-cell style="display:inline-block;width:auto;"><van-radio name="1">申请显示在附近</van-radio></van-cell>
            <van-cell style="display:inline-block;margin-left:35px;width:auto;"><van-radio name="2">不显示在附近</van-radio></van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-cell-group>
    </div>
    <!-- 门店资质 -->
    <div class="page" v-if="isVisiable=='1'">
      <div class="top top-boder">
        <span class="title">门店照片</span>
        <!-- <span class="btn">保存</span> -->
      </div>
      <div class="photo-box">
        <div class="single-photo" v-if="clickshopImage1Fileurl.length<4">
          <label>
              <!-- <div class="box" v-if="clickshopImage1Filedata==false"></div> -->
              <div class="box"></div>
              <input type="file" style="display:none;" ref="shopImage1File" @change="preview()">
              <!-- <img class="imgbox" :src="clickshopImage1Fileurl" alt="" v-if="clickshopImage1Filedata==true"> -->
          </label>
          <!-- <div class="box"></div> -->
        </div>
        <div class="single-photo" v-for="item in clickshopImage1Fileurl">
          <img class="imgbox" :src="item" alt="">
        </div>
        <!-- <div class="single-photo">
          <div class="box"></div>
        </div>
        <div class="single-photo">
          <div class="box"></div>
        </div> -->
      </div>
      <p class="remark">* 请使用横拍照片，不能大于2M，最多4张</p>
    </div>
    <div class="page" v-if="isVisiable=='1'">
      <div class="top top-boder">
        <span class="title">执照资质</span>
        <!-- <span class="btn">保存</span> -->
      </div>
      <p class="remark">请上传营业执照</p>
      <div class="photo-box">
        <div class="single-photo width50">
          <!-- <div class="box"></div> -->
          <label>
              <div class="box" v-if="clicklicensedata==false"></div>
              <input type="file" style="display:none;" ref="license" @change="clicklicenseimg()">
              <img class="imgbox" :src="clicklicenseurl" alt="" v-if="clicklicensedata==true">
          </label>
          <img src="" alt="">
          <span class="l-text">营业执照正面</span>
          <!-- <span class="r-text">查看示例</span> -->
        </div>
        <div class="single-photo width50">
          <!-- <div class="box"></div> -->
          <label>
              <div class="box" v-if="clicklicensedata2==false"></div>
              <input type="file" style="display:none;" ref="license2" @change="clicklicenseimg2()">
              <img class="imgbox" :src="clicklicenseurl2" alt="" v-if="clicklicensedata2==true">
          </label>
          <img src="" alt="">
          <span class="l-text">本人手持营业执照</span>
          <!-- <span class="r-text">查看示例</span> -->
        </div>
      </div>
      <p class="remark">执照类型</p>
      <van-radio-group v-model="merchantdata.businessLicenseType">
        <van-cell-group>
          <van-cell><van-radio name="1">个体 </van-radio></van-cell>
          <van-cell><van-radio name="2">商家 </van-radio></van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-notice-bar text="请填写营业执照上的注册号或统一社会信用代码" :left-icon="require('./../../assets/8.png')" />
      <van-cell-group>
        <van-field label="注册号" v-model="merchantdata.registerNumber" placeholder="请输入..."/>
      </van-cell-group>
      <van-notice-bar text="请填写营业执照上名称这一行的内容" :left-icon="require('./../../assets/8.png')" />
      <van-cell-group>
        <van-field label="执照名称" v-model="merchantdata.licenseName" placeholder="请输入..."/>
      </van-cell-group>
      <van-notice-bar text="请填写营业执照中营业期限的截止日期；如无营业期限这一项\或结束日期为永久，则选长期有效" :left-icon="require('./../../assets/8.png')" />
      <p class="remark">营业期限</p>
      <van-radio-group v-model="clickdaybtn">
        <van-cell-group>
          <van-cell><van-radio name="1" @click="showday='';clickdaybtn='1'">长期有效 </van-radio></van-cell>
          <van-cell><van-radio name="2" @click="businessEndDateshow=true">选择时间 <span>{{showday}}</span></van-radio></van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <!-- 法人资质 -->
    <div class="page" v-if="isVisiable=='1'">
      <div class="top top-boder">
        <span class="title">法人资质</span>
        <!-- <span class="btn">保存</span> -->
      </div>
      <p class="remark">请上传法人身份证</p>
      <div class="photo-box">
        <div class="single-photo width50">
          <!-- <div class="box"></div> -->
          <label>
              <div class="box" v-if="clickIdCarddata==false"></div>
              <input type="file" style="display:none;" ref="IdCard" @change="clickIdCardimg()">
              <img class="imgbox" :src="clickIdCardurl" alt="" v-if="clickIdCarddata==true">
          </label>
          <img src="" alt="">
          <span class="l-text">身份证正面</span>
          <!-- <span class="r-text">查看示例</span> -->
        </div>
        <div class="single-photo width50">
          <!-- <div class="box"></div> -->
          <label>
              <div class="box" v-if="clickIdCarddata2==false"></div>
              <input type="file" style="display:none;" ref="IdCard2" @change="clickIdCardimg2()">
              <img class="imgbox" :src="clickIdCardurl2" alt="" v-if="clickIdCarddata2==true">
          </label>
          <img src="" alt="">
          <span class="l-text">本人手持身份证</span>
          <!-- <span class="r-text">查看示例</span> -->
        </div>
      </div>
      <p class="remark">与法人关系</p>
      <van-radio-group v-model="merchantdata.legelPersonRelationship">
        <van-cell-group>
          <van-cell><van-radio name="1">本人 </van-radio></van-cell>
          <van-cell><van-radio name="2">同事 </van-radio></van-cell>
          <van-cell><van-radio name="3">其他 </van-radio></van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-notice-bar text="请填写法人身份证号码" :left-icon="require('./../../assets/8.png')" />
      <van-cell-group>
        <van-field label="身份证号码" v-model="merchantdata.legalPersonIdCardNum" placeholder="请输入..."/>
      </van-cell-group>
    </div>
    <!-- 承诺 -->
    <div class="page nonemargin">
      <h4 class="end-itd-title">我特做出如下承诺：</h4>
      <p class="end-itd-text">-我使用法定代表/负责人/合法授权人身份作为基础资质入驻从众链商，承诺所有资料完全正确有效且合法资源申请开通。</p>
      <p class="end-itd-text">-开通后的店铺将严格遵守法律法规经营，承诺坚决不损害用户及扰乱社会，如又不实经营或违法经营，产生的一切法律责任和损失有我方完全承担。</p>
      <van-radio-group v-model="agree">
        <van-cell-group>
          <van-cell><van-radio name="1">同意以上条款 </van-radio></van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-button class="tjbtn" :class="agree==true?'tjbtnbgf00':'tjbtnbgccc'" type="primary" bottom-action @click="out">提交审核</van-button>
    </div>
    <!-- 经营类别 -->
    <van-popup v-model="catIdshow" position="bottom">
      <div class="popupheader">
        <p @click="catIdshow=false">取消</p>
        <p class="rightbtn" @click="catIdconfirm()">确认</p>
      </div>
      <van-picker :columns="catIdcolumns" @change="onChangecatId" />
    </van-popup>
    <!-- 日期选择 -->
    <van-popup v-model="businessEndDateshow" position="bottom">
      <van-datetime-picker type="date" @cancel="businessEndDateshow=false" @confirm="clickEndDatebtn"/>
    </van-popup>
    <!-- 地址 -->
    <van-popup v-model="showarea" position="bottom">
      <van-picker show-toolbar :columns="areacolumns" @change="onChange" @cancel="showarea=false" @confirm="confirmbtn" ref='areapicker' />
    </van-popup>
  </div>
</template>

<script>
import { imgserverUrl,saveMerchant ,getMerchantcatlist,dateFormat,getMerchantInfo,updateMerchant,getareadata} from "./../../api";
import { Toast,Dialog } from 'vant';
export default {
  name: 'shop-setting',
  data () {
    return {
      userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
      
      merchantdata: {},

      isVisiable:'',


      merchantcat:[],
      catIdshow:false,
      catIdnum:'',
      catIdname:'请选择',
      catIdcolumns: [],

      businessEndDateshow:false,
      showday:'',
      clickdaybtn:'',

      clickshopImage1Filedata:false,
      clickshopImage1Fileurl:[],
      shopImageFile:[],

      clicklicensedata:false,
      clicklicenseurl:'',
      clicklicensedata2:false,
      clicklicenseurl2:'',

      clickIdCarddata:false,
      clickIdCardurl:'',
      clickIdCarddata2:false,
      clickIdCardurl2:'',

      agree:'',

      messagedata:{},
      showarea:false,
      areacolumns:[
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2',
          defaultIndex: 0
        },
        {
          values: [],
          className: 'column3',
          defaultIndex: 0
        }
      ],
      area1idbox:[],
      area2idbox:[],
      area3idbox:[],
      area1id:'',
      area2id:'',
      area3id:'',
      areaIdLevel1:'',
      areaIdLevel2:'',
      areaIdLevel3:'',
      fullarea:'',
    }
  },
  watch: {
      area1id(data) {
        this.$refs.areapicker.setColumnValues(2,[]);
        this.getarea(2,this.area1idbox[data]);
        this.area2id=0;
      },
      area2id(data) {
          if(data != undefined && this.area2idbox[data] != undefined){
            var v = this.area2idbox[data];
            console.log('area2idbox:' + v);
            this.getarea(3, v);
          }
          this.area3id=0;
      }
  },
  created () {
    this.$nextTick(() => {
      // this.$router.go(-1);
      this.getMerchantcat();
      this.shopImageFile=[];
      let zhethis=this;
      getMerchantInfo(this.userInfo.id).then(response => {
          if(response.data){
              zhethis.merchantdata=response.data;
              console.log(zhethis.merchantdata)
              zhethis.fullarea=response.data['area3.fullName'];
              for (var i = 0; i < zhethis.merchantcat.length; i++) {
                if(zhethis.merchantdata.catId==zhethis.merchantcat[i].id){
                  zhethis.catIdname=zhethis.merchantcat[i].name;
                }
              }
              zhethis.merchantdata.businessLicenseType=String(response.data.businessLicenseType);
              zhethis.merchantdata.legelPersonRelationship=String(response.data.legelPersonRelationship);
              if(zhethis.merchantdata.businessEndDate==null){
                zhethis.clickdaybtn='1'
              }
              if(response.data.shopImage1){
                zhethis.clickshopImage1Fileurl.push(imgserverUrl+response.data.shopImage1);
              }
              if(response.data.shopImage2){
                zhethis.clickshopImage1Fileurl.push(imgserverUrl+response.data.shopImage2);
              }
              if(response.data.shopImage3){
                zhethis.clickshopImage1Fileurl.push(imgserverUrl+response.data.shopImage3);
              }
              if(response.data.shopImage4){
                zhethis.clickshopImage1Fileurl.push(imgserverUrl+response.data.shopImage4);
              }
              if(response.data.businessLicenseImage1){
                zhethis.clicklicenseurl= imgserverUrl+response.data.businessLicenseImage1;
                zhethis.clicklicensedata=true;
              }
              if(response.data.businessLicenseImage2){
                zhethis.clicklicenseurl2= imgserverUrl+response.data.businessLicenseImage2;
                zhethis.clicklicensedata2=true;
              }
              if(response.data.legalPersonIdCardImage1){
                zhethis.clickIdCardurl= imgserverUrl+response.data.legalPersonIdCardImage1;
                zhethis.clickIdCarddata=true;
              }
              if(response.data.legalPersonIdCardImage2){
                zhethis.clickIdCardurl2= imgserverUrl+response.data.legalPersonIdCardImage2;
                zhethis.clickIdCarddata2=true;
              }
              zhethis.isVisiable=response.data.isVisiable==true?'1':response.data.isVisiable==false?'2':'';
          }
      })
    })
  },
  methods: {
    out () {
      
      // this.$router.push('/selfSetting')
      let params=this.merchantdata;
      if(this.showday!=""){
        params.businessEndDate=this.showday;
      }else{
        delete params.businessEndDate
      }
      params.memberId=this.userInfo.id;

      params.areaIdLevel1=this.areaIdLevel1?this.areaIdLevel1:this.merchantdata.areaIdLevel1;
      params.areaIdLevel2=this.areaIdLevel2?this.areaIdLevel2:this.merchantdata.areaIdLevel2;
      params.areaIdLevel3=this.areaIdLevel3?this.areaIdLevel3:this.merchantdata.areaIdLevel3;

      //判断
      if(params.shopName==''||params.shopName==null||params.shopName==undefined){
        Dialog.alert({
        title: '温馨提示',
          message: '请输入正确的店铺名称'
        }).then(() => {
          window.scrollTo(0,0);
        });
        return
      } 
      if(params.areaIdLevel3==''||params.areaIdLevel3==null||params.areaIdLevel3==undefined){
        Dialog.alert({
        title: '温馨提示',
          message: '请选择正确地址'
        }).then(() => {
          window.scrollTo(0,0);
        });
        return
      }
      if(params.address==''||params.address==null||params.address==undefined){
        Dialog.alert({
        title: '温馨提示',
          message: '请输入详细地址'
        }).then(() => {
          window.scrollTo(0,0);
        });
        return
      }
      if(params.phone==''||params.phone==null||params.phone==undefined){
        Dialog.alert({
        title: '温馨提示',
          message: '请输入联系电话'
        }).then(() => {
          window.scrollTo(0,0);
        });
        return
      }
      if(params.catId==''||params.catId==null||params.catId==undefined){
        Dialog.alert({
        title: '温馨提示',
          message: '请选择经营类别'
        }).then(() => {
          window.scrollTo(0,0);
        });
        return
      }
      if(params.shortDesc==''||params.shortDesc==null||params.shortDesc==undefined){
        Dialog.alert({
        title: '温馨提示',
          message: '请输入简要描述'
        }).then(() => {
          window.scrollTo(0,0);
        });
        return
      }
      if(this.isVisiable){
        if(this.isVisiable=='1'){
          this.merchantdata.isVisiable=true;
        }
        if(this.isVisiable=='2'){
          this.merchantdata.isVisiable=false;
        }
      }else{
        Dialog.alert({
        title: '温馨提示',
          message: '请选择是否显示附近'
        }).then(() => {
          window.scrollTo(0,0);
        });
        return
      }
      


      for (let key of Object.keys(params)) {
        if(params[key]==null||params[key]=='null'||params[key]==undefined){
          delete params[key];
        }
      }
      if(this.agree==false){
        Dialog.alert({
        title: '温馨提示',
          message: '请阅读并同意以上条款'
        }).then(() => {

        });
        return
      }else{
        getMerchantInfo(this.userInfo.id).then(response => {
          if(response.data!=null){
            if(this.shopImageFile.length>0){
              for(var i = 0; i < this.shopImageFile.length; i++){
                params["shopImage"+(i+1)]=this.shopImageFile[i];
              }
            }
            params.id=response.data.id;
            updateMerchant(params).then(response => {
              if(response.code=='200'){
                Toast.success('修改成功');
                setTimeout(function(zhethis){
                  zhethis.$router.push('/merchantCenter');
                },500,this)
              }else{
                Dialog.alert({
                title: '温馨提示',
                  message: response.message
                }).then(() => {
                  
                });
              }
            })
          }else{
            if(this.shopImageFile.length>0){
              for(var i = 0; i < this.shopImageFile.length; i++){
                params["shopImage"+(i+1)+"_file"]=this.shopImageFile[i];
              }
            }
            saveMerchant(params).then(response => {
              if(response.code=='200'){
                Toast.success('修改成功');
                setTimeout(function(zhethis){
                  zhethis.$router.push('/merchantCenter');
                },500,this)
              }else{
                Dialog.alert({
                title: '温馨提示',
                  message: response.message
                }).then(() => {
                  
                });
              }
            })
          }
        })
      
        
      }

      
    },
    getMerchantcat(){
      let zhethis=this;
      getMerchantcatlist().then(response => {
        zhethis.merchantcat = response.data;
        for(let i = 0;i < zhethis.merchantcat.length; i++){
          zhethis.catIdcolumns.push(zhethis.merchantcat[i].name)
        }
      })
    },
    preview(){
        let file = this.$refs.shopImage1File.files[0];
        let zhethis=this;
        if (file) {
          // zhethis.merchantdata.shopImage1File = zhethis.$refs.shopImage1File.files[0];
          if(zhethis.shopImageFile.length<1){
            zhethis.clickshopImage1Fileurl=[];
          }
          zhethis.shopImageFile.push(zhethis.$refs.shopImage1File.files[0])
          
          var reader = new FileReader();
          reader.onload = function(evt) {
            zhethis.clickshopImage1Fileurl.push(evt.target.result);
            // zhethis.clickshopImage1Filedata=true;
          }
          reader.readAsDataURL(file);
        }
        console.log(zhethis.clickshopImage1Fileurl)
    },
    clicklicenseimg(){
        let file = this.$refs.license.files[0];
        let zhethis=this;
        if (file) {
          zhethis.merchantdata.businessLicenseImage1_file = zhethis.$refs.license.files[0];
          var reader = new FileReader();
          reader.onload = function(evt) {
            zhethis.clicklicenseurl = evt.target.result;
            zhethis.clicklicensedata=true;
          }
          reader.readAsDataURL(file);
        }
    },
    clicklicenseimg2(){
        let file = this.$refs.license2.files[0];
        let zhethis=this;
        if (file) {
          zhethis.merchantdata.businessLicenseImage2_file = zhethis.$refs.license2.files[0];
          var reader = new FileReader();
          reader.onload = function(evt) {
            zhethis.clicklicenseurl2 = evt.target.result;
            zhethis.clicklicensedata2=true;
          }
          reader.readAsDataURL(file);
        }
    },
    clickIdCardimg(){
        let file = this.$refs.IdCard.files[0];
        let zhethis=this;
        if (file) {
          zhethis.merchantdata.legalPersonIdCardImage1_file = zhethis.$refs.IdCard.files[0];
          var reader = new FileReader();
          reader.onload = function(evt) {
            zhethis.clickIdCardurl = evt.target.result;
            zhethis.clickIdCarddata=true;
          }
          reader.readAsDataURL(file);
        }
    },
    clickIdCardimg2(){
        let file = this.$refs.IdCard2.files[0];
        let zhethis=this;
        if (file) {
          zhethis.merchantdata.legalPersonIdCardImage2_file = zhethis.$refs.IdCard2.files[0];
          var reader = new FileReader();
          reader.onload = function(evt) {
            zhethis.clickIdCardurl2 = evt.target.result;
            zhethis.clickIdCarddata2=true;
          }
          reader.readAsDataURL(file);
        }
    },
    catIdconfirm(){
      this.catIdshow=false;
      if(this.catIdnum==""){
        this.catIdnum=this.merchantcat[0].id;
        this.catIdname=this.merchantcat[0].name;
      }
      this.merchantdata.catId = this.catIdnum;
    },
    onChangecatId(picker, value, index) {
      this.catIdnum=this.merchantcat[index].id;
      this.catIdname=this.merchantcat[index].name;
    },
    clickEndDatebtn(data){
      this.businessEndDateshow=false;
      this.showday=dateFormat(data,'yyyy-MM-dd');
      this.clickdaybtn='2';
    },


    // 地址
    getarea(data,parentid){
      let zhethis=this;
      let params={};
      let areaarray=[];
      params.level=data;
      if(parentid){
        params.parent_id=parentid;
      }
      zhethis.areacolumns[(data-1)].values=[];
      zhethis['area'+data+'idbox']=[];
      getareadata(params).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          areaarray.push(response.data[i].area);
          zhethis['area'+data+'idbox'].push(response.data[i].id);
        }
        if(data==2){
          if(this.area2idbox[0] != undefined){
            zhethis.getarea(3,this.area2idbox[0]);
          }
        }
        zhethis.$refs.areapicker.setColumnValues((data-1),areaarray)
      })
    },
    onChange(picker, values,areacolumn,areaarray) {
      this.area1id=picker.getColumnIndex(0);
      this.area2id=picker.getColumnIndex(1);
      this.area3id=picker.getColumnIndex(2);
      console.log(this.area2id)
      console.log(this.area1id)
    },
    confirmbtn(data,index){
      this.fullarea="";
      for (var i = 0; i < data.length; i++) {
        this.fullarea+=(data[i]!=undefined?data[i]:'');
      }
      this.areaIdLevel1= this.area1idbox[this.area1id];
      this.areaIdLevel2= this.area2idbox[this.area2id];
      this.areaIdLevel3= this.area3idbox[this.area3id];
      this.showarea=false;
    },
  }
  
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
