(function(){
	
	var docuH = document.documentElement.clientHeight,
		allMoveBox = document.getElementsByClassName('swiper-slide'),
		didiLogo = document.getElementById('logo'),
		sixWord = document.getElementById('six-word'),
		firstLoad = document.getElementById('first-load'),
		secLoadImg = document.getElementsByClassName('load-img'),
		loadingBg = document.getElementById('loading'),
		icount = 0,
		timer = null,
		timer2 = null;
	document.getElementsByClassName('swiper-container').item(0).style.height = docuH + 'px';
	
	var addClass = function (ele,strClass){
		var reg = new RegExp("(?:^| )" + strClass + "(?: |$)");
		if(reg.test(ele.className)){
			//如果此类样式已经存在，则什么也不需要做
		}else{//不存在
			ele.className = ele.className.trim() + " " + strClass;
		}
	};
	
	var removeClass=function (ele,strClass){
		if(!(ele&&ele.nodeType == 1)){	
			alert('第一参数ele需要是一个DOM元素对象');
			throw new Error('第一参数ele需要是一个DOM元素对象');
		}
		if(typeof strClass != 'string'){
			alert('第二参数必须为string类型');
			throw new Error('第二参数必须为string类型');
			
		}
		
		var reg=new RegExp("(?:^| )" + strClass + "(?: |$)","g");
		ele.className = ele.className.replace(reg,'').trim();	
	};
	
	var getIndex=function (ele){
		var nIndex=0;
		var p=ele.previousSibling
		while(p){
			if(p.nodeType==1){
				nIndex++;//让累加一次
			}			
			p=p.previousSibling;//继续判断它的下一个哥哥		
		}
		return nIndex;	
	};
	
	var wordArray = [
			'<em>12</em>','<em>.12 </em>','用','滴','滴','叫','车，','没','有','司','机','接','您','并','等','待','超','过',' 1 ','分','钟，','我','们','就','送','不','低','于',' 8 ','元','出','租','车','券','一','张。','补','偿','代','金','券','将','于','次','日','到','账。'
		];
		
	//for iphone 4
	
	
	//当最大的一张背景加载完成后
	var imgObj = new Image();
	imgObj.src = firstLoad.getAttribute('_src');
	imgObj.onload = function(){
		for(var i = 0; i < secLoadImg.length; i++){
			secLoadImg[i].src = secLoadImg[i].getAttribute('thissrc');	
		}
		loadingBg.style.display = 'none';
		window.setTimeout(function(){
			addClass(allMoveBox[0],'slide-move');
		},500);	
	}
	
	var mySwiper = new Swiper('.swiper-container',{
		paginationClickable: true,
		mode: 'vertical',
		onSlideChangeStart: function(){//当滑块将要滑到下一块时
			var thisDiv = mySwiper.activeSlide(),
				thisIndex = getIndex(thisDiv);
			if(thisIndex > 0 && thisIndex < 5){
				didiLogo.style.display = 'block';	
			}
			else{
				didiLogo.style.display = 'none';	
			}
		},
		onSlideChangeEnd: function(){//当滑块滑到下一块时
			var thisDiv = mySwiper.activeSlide(),
				thisIndex = getIndex(thisDiv);
			for(var i = 0; i < allMoveBox.length; i++){
				removeClass(allMoveBox[i],'slide-move');	
			}
			addClass(thisDiv,'slide-move');
			//第五屏文字动态效果
			if(thisIndex == 5){
				timer2 = window.setTimeout(function(){
					timer = window.setInterval(function(){
						if(icount >= wordArray.length){
							window.clearInterval(timer);
							icount = 0;
							return false;	
						}
						sixWord.innerHTML += wordArray[icount];
						icount ++;
					},80);	
				},600);
			}
			else{
				icount = 0;
				sixWord.innerHTML = '';	
				window.clearInterval(timer);
				window.clearTimeout(timer2);
			}
		}
	});


})()