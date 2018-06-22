<template>
   
  <div id="demo" class="demo" style="width: 650px; height: 400px;"> 
   <form id="uploadForm" action="" method="post" enctype="multipart/form-data"> 
    <div class="upload_box"> 
     <div class="upload_main"> 
      <div class="upload_choose"> 
       <div class="convent_choice"> 
        <div class="andArea"> 
         <div class="filePicker">
          点击选择文件
         </div> 
         <input id="fileImage" type="file" size="30" name="fileselect[]" multiple="" /> 
        </div> 
       </div> 
       <span id="fileDragArea" class="upload_drag_area">或者将文件拖到此处</span> 
      </div> 
      <div class="status_bar"> 
       <div id="status_info" class="info"></div> 
       <div class="btns"> 
        <div class="webuploader_pick">
         继续选择
        </div> 
        <div class="upload_btn">
         开始上传
        </div> 
       </div> 
      </div> 
      <div id="preview" class="upload_preview"></div> 
     </div> 
     <div class="upload_submit"> 
      <button type="button" id="fileSubmit" class="upload_submit_btn">确认上传文件</button> 
     </div> 
     <div id="uploadInf" class="upload_inf"></div> 
    </div>
   </form>
  </div>
</template>
<!-- <script type="text/javascript" src=""></script> -->
<script>
import '../../../static/js/jquery-2.0.0.min.js' 
import '../../../static/js/index.js' 
import '../../../static/js/jqueryrotate.js'; 
import '../../../static/js/zyFile.js'; 
import '../../../static/js/zyUpload.js'; 
export default { 
name: 'hello', 
data () { 
return { 
// ue: '', 
// uedata: [], 
// xierudata: [] 
} 
}, 
mounted() { 
// this.ue = UE.getEditor('editor',{ 
// BaseUrl: '', 
// UEDITOR_HOME_URL: 'static/utf8-jsp/', 
// // toolbars:[] 
// }); 
}, 
methods: { 
// submits(){ 
// this.uedata.push(UE.getEditor('editor').getContent()); 
// console.log(this.uedata.join("\n")); 
// }, 
xieru(){ 
UE.getEditor('editor').setContent('欢迎使用ueditor');
} 
} 
} 
</script>
<style lang="less" scoped>
    @import '../../../static/css/zyUpload.css'; 
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
