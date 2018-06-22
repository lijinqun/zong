<template>
  <div class="back_box">
	  <img src="../assets/back1.png" @click='reback()' id='aaa'>
	  <span style="margin-right: 20px;">{{title}}</span>
	  <router-link to="/activity" v-if="activity">
	  		
	  </router-link>
  </div>
</template>
<script type="text/javascript">
	export default{
		name:'back',
		data(){
			return{
				// title:''
			}
		},
		methods:{
			reback(){
      		  // console.log(this.$route.path)
      		  // if(this.$route.path=='/hello'){
      		  // 	console.log(111)
      		  // 	this.$store.state.saveIndex.dpisback = true
      		  // 	history.go(-1)
      		  // }else{
      		  // 	javascript:history.back();
      		  // }
      		  if(this.order) {
	      		  this.$router.push(localStorage.getItem('orderSrc'))
      		  }else if(this.address) {
      		  	  this.$router.push(localStorage.getItem('addressSrc'))
      		  }else {
      		  	  this.$router.push(this.back)
      		  }
			}
		},
		props: ['back','title','activity','order','address']
	}
</script>
<style type="text/css">
	.back_box{
		position: relative;
   	    line-height: 2.5em;
		color: #000;
		text-align: center;
	    font-weight: bold;
	    font-size: 1.2em;
		overflow: hidden;
		width: 100%;
		background: rgb(239, 239, 239);
	    border-bottom: 1px solid rgba(0, 0, 0, 0.0470588);
	    top: 0px;
	    position: fixed;
	    z-index:10;
	}
	.back_box img{
		width: 13px;
		height: 23px;
		float: left;
		position: relative;
   	    margin-top: 10px;
		margin-left: 5%
	}
	.back_box > a {
		position: absolute;
		top: .4rem;
		right: .5rem;
		font-weight: normal;
		float: right;
		font-size: .6rem;
		padding: .3rem;
		line-height: 1;
		border: 1px solid green;
		color: green!important;
		border-radius: 3px;
	}
</style>
