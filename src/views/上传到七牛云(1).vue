<template>
	<div class="about"><input type="file" @change="upload" /></div>
</template>
<script>
	
	// 七牛云 oss 一个月免费10G  注册会分配一个临时域名可以用一个月  想长久需要绑定一个已经备案的域名
	// 网址 www.qiniu.com
	// JS-SDK  https://developer.qiniu.com/kodo/1283/javascript
	// demo 地址 http://jssdk-v2.demo.qiniu.io/    
export default {
	methods: {
		async upload(e) {
			let file = e.target.files[0]; // 获取到文件  //
			
			let { type } = file;
			//  拿到类型  比如jpg
			type = type.split('/')[1];  
			// 重新命名
			let file_name = `${new Date().getTime()}_${Math.random()
				.toString(36)
				.slice(2)}.${type}`;
				
				
				
            // 去自己的服务器拿到上传七牛云需要的 token  为何放在服务端呢?  主要是为了安全，因为里边包含了一些账号信息
			
			let { token } = await this.$http.post(莱头条的baseurl+'/upload/token');
			
			
            // new一个form data   并且把文件 token  和文件的名字放进去  file token key是固定的 不能改 
			const formdata = new FormData();
			formdata.append('file', file);
			formdata.append('token', token);
			formdata.append('key', file_name);
			
			// https://upload-z1.qiniup.com 是上传到七牛的真正接口  其中z1是华北区域
			
			let result = await this.$http.post('https://upload-z1.qiniup.com', formdata);
			console.log(result);
			console.log(`http://toutiao.longxiaokj.com/` + result.key);
			
			 // `http://toutiao.longxiaokj.com/` + result.key  这个地址就是传到服务器的地址  
			 // 发布文章时 imageSrc  字段需要的就是这个
		}
	}
};
</script>
