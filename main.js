function hasUserMedia(){
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
		|| navigator.msGetUserMedia);
}
if(hasUserMedia()){
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || 
		navigator.mozGetUserMedia || navigator.msGetUserMedia;
	var video = document.querySelector('video');
	var canvas = document.querySelector("canvas");
	var streaming = false;
	var constraints = {
		video:true/*{
			mandatory:{
				minWidth:640,
				minHeight:480
			}
		}*/,
		audio:false
	};
	//如果是手机端
	/*if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMiNi/i.test(navigator.userAgent)){
		constraints = {
			video:{
				mandatory:{
					minWidth:480,
					minHeight:320,
					maxWidth:1024,
					maxHeight:768
				}
			},
			audio:true
		};
	}*/
	//设置规范(https://tools.ietf.org/html/draft-alvestrand-constraints-resolution-03)
	navigator.getUserMedia(
		constraints
	/*{
		video: {
			mandatory: { minAspectRatio: 1.333, maxAspectRatio: 1.334 },//纵横比
			optional: [
	          { frameRate: 60 },//帧率 
	          { width: 640 }, //分辨率
	          { heigth: 480 }
	        ]
		},
		audio: false
	}*/,function(stream){
		video.src = window.URL.createObjectURL(stream);
		streaming = true;
	},function(error){
		console.log('Raised an error when capturing:',error);
	});
	document.querySelector("#capture").addEventListener('click',function(event){
		if(streaming){
			canvas.width = video.videoWidth;
			canvas.heigth = video.videoHeight;
			var context = canvas.getContext('2d');
			context.drawImage(video,0,0,video.videoWidth,video.videoHeight);
		}
	});
}else{
	alert('抱歉，你的浏览器不支持！');
}