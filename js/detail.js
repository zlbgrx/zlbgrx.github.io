//将商品的图片信息添加进对应位置
$(function(){
	var arrImg = [
				{imgSrc:"../img/detailImg/details/01.jpg"},
				{imgSrc:"../img/detailImg/details/02.jpg"},
				{imgSrc:"../img/detailImg/details/03.jpg"},
				{imgSrc:"../img/detailImg/details/04.jpg"},
				{imgSrc:"../img/detailImg/details/05.jpg"}
				];
	var len = arrImg.length;
	//添加左侧tab栏里的小图片
	for(var i = 0;i<len;i++){
		var tabImg = $('<img src="' +arrImg[i].imgSrc + '"/>');
		$('.details_left .tabImg').append(tabImg);
	}
	//添加smallImg
	for(var i = 0;i<len;i++){
		var smallImg = $('<img src="' +arrImg[i].imgSrc + '" />');
		$('.details_left .smallImg').append(smallImg);
	}
	//初始化样式，除第一张外全部隐藏
	$('.details_left .smallImg img').eq(0).css('display','block')
	.siblings('img').css('display','none');
	//添加bigImg
	for(var i = 0;i<len;i++){
		var bigImg = $('<img src="' +arrImg[i].imgSrc + '" />');
		$('.details_left .bigImg').append(bigImg);
	}
	//初始化样式，除第一张外全部隐藏
	$('.details_left .bigImg img').eq(0).css('display','block')
	.siblings('img').css('display','none');
	//实现左侧小图片点击时与右侧大图实现对应切换
	var index = 0;//统一索引
	$('.details_left .tabImg img').click(function(){
		index = $(this).index()-2;
		//tab栏里小图片变化
		$(this).css('border','1px solid red').siblings('img').css('border','1px solid #fff');
		//对应的smallimg变化
		$('.details_left .smallImg img').eq(index).css('display','block')
		.siblings('img').css('display','none');
		//对应的bigImg变化
		$('.details_left .bigImg img').eq(index).css('display','block')
		.siblings('img').css('display','none');
	});
	//点击上下按钮时，图片对应切换
	$('.tabImg .prev').click(function(){
		index--;
		if(index <= -1){
			index = 4;
		}
		$(this).siblings('img').eq(index).css('border','1px solid red').siblings('img').css('border','1px solid #fff');
		$(this).parent('.tabImg').siblings('.smallImg').find('img').eq(index).css('display','block')
		.siblings('img').css('display','none');
		$(this).parent('.tabImg').siblings('.bigImg').find('img').eq(index).css('display','block')
		.siblings('img').css('display','none');
	});
	$('.tabImg .next').click(function(){
		index++;
		if(index>=5){
			index = 0;
		}
		$(this).siblings('img').eq(index).css('border','1px solid red').siblings('img').css('border','1px solid #fff');
		$(this).parent('.tabImg').siblings('.smallImg').find('img').eq(index).css('display','block')
		.siblings('img').css('display','none');
		$(this).parent('.tabImg').siblings('.bigImg').find('img').eq(index).css('display','block')
		.siblings('img').css('display','none');
	});
	//当鼠标移到smallImg上时，选取框tool显示，同时bigImg显示出来
	$('.details_left .smallImg').mouseenter(function(){
		$('.smallImg .tool').css('display','block');
		$('.details_left .bigImg').css('display','block');
	});
	$('.details_left .smallImg').mouseleave(function(){
		$('.smallImg .tool').css('display','none');
		$('.details_left .bigImg').css('display','none');
	});

	//放大镜功能实现
	$('.smallImg').mousemove(function(e){
		//获取鼠标相对于smallImg的定位
		var e = e||window.event;
		var toLeft = e.clientX - $(this).offset().left;
		var toTop = e.pageY - $(this).offset().top;
		//确定拾取框的left值，由于鼠标是在拾取框中心位置，即拾取框left值为鼠标left值减拾取框宽度的一半
		var left = toLeft - $('.tool').width()/2;
		var top = toTop - $('.tool').height()/2;
		//作位置限定，不能让拾取框跑出图片所在区域
		 var leftMax = $('.smallImg').width()- $('.tool').width();
		 var topMax = $('.smallImg').height()- $('.tool').height();
		if(left<0){
			left = 0;
		}else if(left > leftMax){
			left = leftMax;
		}else if(top<0){
			top = 0;
		}else if(top>topMax){
			top = topMax;
		}
		//将left值赋给拾取框，让其随鼠标移动
		$('.tool').css({left:left,top:top});
		//给对应的大图定位赋值
		//先求换算系数
		var k = $('.smallImg').width()/$('.tool').width();
		$('.bigImg img').css({left:-k*left,top:-k*top});
	})

	//左下分享弹出框
	$('.shareBox').css('display','none');
	$('.share .share3').mouseenter(function(){
		$('.shareBox').css('display','block');
	});
	$('.share .share3').mouseleave(function(){
		$('.shareBox').css('display','none');
	});
	
	$('.shareBox').mouseenter(function(){
		$(this).css('display','block');
		console.log(1)
	});
	$('.shareBox').mouseleave(function(){
		$(this).css('display','none');
	});
	//弹出框上对应项目选中时的状态变化
	$('.shareBox a').mouseenter(function(){
		$(this).css('background','#ededed').siblings('a').css('background','#fff');
	});

});
//选择添加到购物车相关效果的实现
$(function(){
	//默认选中框
	$('.buy .color a').eq(0).css('border','1px solid #c00').css('background','url(../img/detailImg/details/select.png) no-repeat right bottom');
	$('.buy .size a').eq(0).css('border','1px solid #c00').css('background','url(../img/detailImg/details/select.png) no-repeat right bottom');
	//选择颜色时选择框的变化
	$('.buy .color a').click(function(){
		$(this).css('border','1px solid #c00').css('background','url(../img/detailImg/details/select.png) no-repeat right bottom');
	});
	//选择尺码时选择框的变化
	$('.buy .size a').click(function(){
		$(this).css('border','1px solid #c00').css('background','url(../img/detailImg/details/select.png) no-repeat right bottom')
		.siblings('a').css('border','1px solid #ededed').css('background','none');
	});
	//点击加减按钮数量变化，左侧剩余数量也发生变化
	var value = 1;
	var num = parseInt($('#sy').html());//剩余的数量
	var sum = num + 1;
	//++操作
	$('.jiajian .jia').click(function(){
		value++;
		num--;
		//限制范围，不让数量一直增加，与剩余量相统一
		if(value >= num){
			value = sum;
			num = 0;
		}
		$('.jiajian input').val(value);
		$('#sy').html(num);
	});
	//--操作
	$('.jiajian .jian').click(function(){
		value--;
		num++;
		//限制范围，不让数量一直增加，与剩余量相统一
		if(value <= 1){
			value = 1;
			num = sum - 1;
		}
		
		$('.jiajian input').val(value);
		$('#sy').html(num);
	});
	//客户端二维码
	$('.count .qrCode').mouseenter(function(){
		$('.qrCode .code').css('display','block');
	});
	$('.count .qrCode').mouseleave(function(){
		$('.qrCode .code').css('display','none');
	});
});
$(function(){
	//show作则热门推荐栏目
	var arrHot = [{
		imgSrc: "../img/detailImg/show/hot01.jpg",
		href: "javascript:;",
		dec: "女装春秋新款通勤连衣裙",
		price: "¥459.00"
	}, {
		imgSrc: "../img/detailImg/show/hot02.jpg",
		href: "javascript:;",
		dec: "新款中长款毛衣女长袖连",
		price: "¥179.00"
	}, {
		imgSrc: "../img/detailImg/show/hot03.jpg",
		href: "javascript:;",
		dec: "新款韩版毛呢背心裙背带",
		price: "¥279.00"
	}, {
		imgSrc: "../img/detailImg/show/hot04.jpg",
		href: "javascript:;",
		dec: "符号系列 个性文艺翻领蓬",
		price: "¥350.00"
	}, {
		imgSrc: "../img/detailImg/show/hot05.jpg",
		href: "javascript:;",
		dec: "新款拼接圆领收腰印花民",
		price: "¥256.00"
	}];
	//动态生成相应的项目并添加进页面
	for(var i = 0;i<arrHot.length;i++){
		var item = $('<div class="item">' +
						'<a href=" ' + arrHot[i].href + ' ">' +
							'<img src=" ' + arrHot[i].imgSrc + ' " />' +
						'</a>' +
						'<a  href=" ' + arrHot[i].href + ' "> ' + arrHot[i].dec + ' </a>' +
						'<span> ' + arrHot[i].price + ' </span>' +
					'</div>');
		$('.show .show_left').append(item);
	}
	//右侧产品细节展示
	var arrShow = [
					{imgSrc:"../img/detailImg/show/01.jpg"},
					{imgSrc:"../img/detailImg/show/02.jpg"},
					{imgSrc:"../img/detailImg/show/03.jpg"},
					{imgSrc:"../img/detailImg/show/04.jpg"},
					{imgSrc:"../img/detailImg/show/05.jpg"},
					{imgSrc:"../img/detailImg/show/06.jpg"},
					{imgSrc:"../img/detailImg/show/07.jpg"},
					{imgSrc:"../img/detailImg/show/08.jpg"},
					{imgSrc:"../img/detailImg/show/09.jpg"},
					{imgSrc:"../img/detailImg/show/10.jpg"},
					{imgSrc:"../img/detailImg/show/11.jpg"},
					{imgSrc:"../img/detailImg/show/12.jpg"},
					{imgSrc:"../img/detailImg/show/13.jpg"},
					{imgSrc:"../img/detailImg/show/14.jpg"},
					{imgSrc:"../img/detailImg/show/15.jpg"},
					{imgSrc:"../img/detailImg/show/16.jpg"},
					{imgSrc:"../img/detailImg/show/17.jpg"},
					{imgSrc:"../img/detailImg/show/18.jpg"},
					{imgSrc:"../img/detailImg/show/19.jpg"},
					{imgSrc:"../img/detailImg/show/20.jpg"},
					{imgSrc:"../img/detailImg/show/21.jpg"}
				];
	for(var i = 0;i<arrShow.length;i++){
		var img = $('<img src="' + arrShow[i].imgSrc + '" />');
		$('.introduce').append(img);
	}
	//产品详情与售后服务栏切换
	//为切换按钮添加样式
	$('.show .show_right .top a').click(function(){
		var index = $(this).index();
		$(this).addClass('active').siblings('a').removeClass('active');
		//做一个判断，如果是第一个按钮，就让商品详细介绍introduce显示，售后服务项隐藏、、、
		if(index == 0){
			$('.show .show_right  .introduce').css('display','block').siblings('.service').css('display','none');
		}else{
			$('.show .show_right  .service').css('display','block').siblings('.introduce').css('display','none');
		}
	});
});










































