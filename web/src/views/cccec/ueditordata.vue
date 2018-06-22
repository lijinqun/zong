<template>
    <div>
       <div class="hello"> 
        <div id="editor" type="text/plain" style="max-width:1388px;min-height:500px;"></div> 
        <!-- <button @click="uedatasubmits">保存</button> 
        <button @click="xieru">写入</button>  -->
        </div> 
           
    </div>
</template>
<script>
import '../../../static/utf8-jsp/ueditor.config.js' 
import '../../../static/utf8-jsp/ueditor.all.js'; 
import '../../../static/utf8-jsp/lang/zh-cn/zh-cn.js'; 
// import '../../../static/utf8-jsp/ueditor.parse.min.js'; 
export default { 
name: 'hello', 
data () { 
return { 
ue: '', 
uedata: [], 
xierudata: [] 
} 
}, 
mounted() { 
// this.ue = UE.getEditor('editor',{ 
// BaseUrl: '', 
// UEDITOR_HOME_URL: 'static/utf8-jsp/', 
// // toolbars:[] 
// }); 
this.ue = UE.getEditor('editor',{
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/utf8-jsp/',
        // toolbars: [
        //   ['fullscreen', 'source', 'undo', 'redo'],
        //   ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
        // ]
      })
}, 
methods: { 
uedatasubmits(){ 
this.uedata=UE.getEditor('editor').getContent(); 
return this.uedata;
console.log(this.uedata); 
}, 
xieru(){ 
UE.getEditor('editor').setContent('欢迎使用ueditor'); 
} 
} 
} 
</script>
<style lang="less" scoped>
    @import '../../../static/utf8-jsp/themes/default/dialogbase.css';
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
