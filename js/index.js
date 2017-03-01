//登录信息
$(function(){
	//取出cookie中的用户名信息
	var userStr = $.cookie("loginedUser") ? $.cookie("loginedUser") : "{}";
	if(userStr !="{}"){//如果非空
		var userObj = JSON.parse(userStr);
		$('#user').html(userObj);
		//登陆后点击用户名不让其再跳转到登录页面
		$('#user').attr("href","javascript:;")
		$('#register').html("注销！")
		$('#register').attr("href","javascript:;")
		//注销
		$('#register').click(function(){
			//删除cookie,将其赋值为空对象即可，不能设为null，下次无法存储
			$.cookie("loginedUser","",{expires: 7,
					path: "/"}	
			);
			//重新获取cookie值，更新页面内容
			$('#user').html("登录")
			$('#register').html("免费注册！")
			//删除cookie之后，再次点击登录和注册时，恢复其跳转功能
			$('#register').click(function(){
		
			$('#register').attr("href","register/register.html")
			});
			$('#user').click(function(){
				$('#user').attr("href","login/login.html")
			});
		});
	}else{
		$('#user').html("登录")
		$('#user').attr("href","login/login.html")
		$('#register').html("免费注册！")
		$('#register').attr("href","register/register.html")
	}	
});
//购物车信息
$(function(){
	function allNum(){
			var goodId = $(this).parents('.goods').attr('data-good-id');
			var cartStr = $.cookie('cart') ? $.cookie('cart'):"{}";
			var cartObj = JSON.parse(cartStr);
			var allNum = 0;
			for(var goodId in cartObj){
				var num = parseInt(cartObj[goodId].num);
				allNum += num;
			}
			//将这个数值在右上角购物车栏中显示
			$('#cartNum').html(allNum);
			$('.bar .car a').html(allNum);
			if(allNum!=0){
				$('#cartInner').html('您的购物车中有'+ allNum + '件商品，快来看看吧！');
				$('#cartInner').css('color','deepskyblue').css('font-size','15px');
				$('#goCart').click(function(){
					window.location.href = "cart/cart.html";
				});
				$('.bar .car a').click(function(){
					window.location.href = "cart/cart.html";
				});
			}
		}
	
	 allNum();
});
$(function() {
		//banner部分轮播图
		//将轮播图的图片和链接以数组的形式提前整理存储起来
		var arrCarousel = [{
			imgSrc: 'img/indexImg/banner/01.jpg',//图片路径
			href: 'second/second.html'//图片对应链接
		}, {
			imgSrc: 'img/indexImg/banner/02.jpg',
			href: 'second/second.html'
		}, {
			imgSrc: 'img/indexImg/banner/03.jpg',
			href: 'second/second.html'
		}, {
			imgSrc: 'img/indexImg/banner/04.jpg',
			href: 'second/second.html'
		}, {
			imgSrc: 'img/indexImg/banner/05.jpg',
			href: 'second/second.html'
		}, {
			imgSrc: 'img/indexImg/banner/06.jpg',
			href: 'second/second.html'
		}];
		//利用循环动态生成对应的项目并添加进页面指定位置
		for(var i = 0, len = arrCarousel.length; i < len; i++) {
			var item = $('<div class="item">' +
				'<a href="' + arrCarousel[i].href + '">' +
				'<img src="' + arrCarousel[i].imgSrc + '" />' +
				'</a>' +
				'</div>');
			var li = $('<li></li>');
			$('#carousel').append(item);
			$('.carousel_list').append(li);
		}
		//初始化第一张显示，其他默认隐藏
		$('#carousel .item').eq(0).css('display', 'block').siblings('div').css('display', 'none');
		$('.carousel_list li').eq(0).css('background','#f43');
		//设置自动轮播
		var index = 0; //各个项目共用索引值
		var timer;
		//定义轮播函数
		function carousel() {
			timer = setInterval(function() {
				index++;
				if(index == $('#carousel .item').length) {
					index = 0;
				}
				show();
			}, 5000)
		}

		carousel();
		//定义鼠标移入移出事件
		$('#carousel').mouseover(function() {
			clearInterval(timer);
		});
		$('#carousel').mouseleave(function() {
				carousel();
		});
			//为按钮添加点击事件，实现点击按钮时切换
		$('#carousel .cont1').click(function() { //左侧--
			index--;
			if(index < 0) {
				index = arrCarousel.length - 1;
			}
			show();
		});
		$('#carousel .cont2').click(function() { //右侧++
				index++;
				if(index >= arrCarousel.length) {
					index = 0;
				}
				show();
		});
		//定义按钮和页面之间的切换状态实现	
		function show() {
			//按钮样式切换
			$('.carousel_list li').eq(index).css('background', '#FF3344')
				.siblings('li').css('background', '#D9D9D9');
			//轮播图项目切换
			$('#carousel .item').eq(index).fadeIn()
				.siblings('div').css('display', 'none');
		}
		//手动切换
		$('.carousel_list li').mouseover(function() {
				clearInterval(timer);
				index = $(this).index();
				show();
				console.log(index);
		});
		
//banner右下方商品栏
	var bnanerBottom = [{
		imgSrc: 'img/indexImg/banner_bottom/01.jpg',
		href: 'javascript:;'
	}, {
		imgSrc: 'img/indexImg/banner_bottom/02.jpg',
		href: 'javascript:;'
	}, {
		imgSrc: 'img/indexImg/banner_bottom/03.jpg',
		href: 'javascript:;'
	}];
	//动态生成相关产品并添加到指定位置
	for(var i = 0; len = bnanerBottom.length; i++) {
		var item = $('<div class="item">' +
			'<a href="'+ bnanerBottom[i].href + '">' +
			'<img src="' + bnanerBottom[i].imgSrc + '" />' +
			'</a>' +
			'</div>');
		$('.banner_bottom_inner').append(item);
		$('.banner_bottom_inner .item').css('float', 'left').css('margin-left', '12px');
	
	}

});
//侧边栏tab切换部分
//功能描述，鼠标移入左侧按钮时，对应按钮背景色切换，向右箭头显现，右侧显示对应的商品分类列表，
$(function() {
		$('.side_left .item').mouseover(function() {
			var index = $(this).index();
			$(this).css('background', '#E6E6E6').siblings().css('background', '#fff'); //背景切换
			$('.side_left span').eq(index).css('display', 'block').parent().siblings().find('span').css('display', 'none'); //span标签显隐切换
			$('.side_right .tab').eq(index).addClass('active').siblings().removeClass('active'); //对应右侧栏目切换
		});
		$('.side_left .item').mouseout(function() {
			var index = $(this).index();
			$(this).css('background', '#fff');
			$('.side_right .tab').eq(index).removeClass('active');
		});
		$('.side_right .tab').mouseover(function() {
			var index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('.side_left .item').eq(index).css('background', '#E6E6E6').siblings().css('background', '#fff');
			$('.side_left span').eq(index).css('display', 'block');
		});
		$('.side_right .tab').mouseout(function() {
			$(this).removeClass('active');
			$('.side_left .item').css('background', '#fff');
			$('.side_left span').css('display', 'none');
		});
});

//今日特价商品部分倒计时
function getDiff(start, end) {
	var st = start.getTime(); //当前时间的总毫秒数
	var et = end.getTime(); //截止时间的总毫秒数
	var temp = et - st; //两个时间的毫秒数差值
	var sm = temp % 1000; //剩余的不足一秒的毫秒数 
	var s = parseInt(temp / 1000); //剩余的总秒数
	var ss = (s % 60); //不足1分钟的秒数
	var min = parseInt(s / 60); //剩余的总分钟数
	var smin = (min % 60); //剩余的不足1小时的分钟数
	var h = parseInt(min / 60); //剩余的总的小时数
	var sh = (h % 24); //剩余的不足一天的小时数
	var day = parseInt(h / 24); //剩余的总的天数
	return {
		sm: sm,
		ss: ss,
		smin: smin,
		sh: sh,
		day: day
	};
}
var day = document.getElementById("time_d"); //小时
var sh = document.getElementById("time_h"); //小时
var smin = document.getElementById("time_m"); //分钟
var ss = document.getElementById("time_s"); //秒
setInterval(function() {
	var sTime = new Date();
	var eTime = new Date("2016/11/11 20:00:00");
	var obj = getDiff(sTime, eTime);
	var time1 = obj.day;
	day.innerHTML = time1;
}, 1);
setInterval(function() {
	var sTime = new Date();
	var eTime = new Date("2016/11/11 20:00:00");
	var obj = getDiff(sTime, eTime);
	var time2 = obj.sh;
	sh.innerHTML = time2;
}, 1);
setInterval(function() {
	var sTime = new Date();
	var eTime = new Date("2016/11/11 20:00:00");
	var obj = getDiff(sTime, eTime);
	var time3 = obj.smin;
	smin.innerHTML = time3;
}, 1);
setInterval(function() {
		var sTime = new Date();
		var eTime = new Date("2016/11/11 20:00:00");
		var obj = getDiff(sTime, eTime);
		var time4 = obj.ss;
		ss.innerHTML = time4;
	}, 1);
//今日特价商品动态添加
$(function() {
	//将商品的信息提前以数组的形式整理存储
	var arrPrice = [{
		imgSrc: "img/indexImg/price/01.jpg",//商品图片路径
		href: "javascript:;",//对应链接
		dec: "ARMANI JEANS	秋冬新品男款外",//商品描述
		price_before: "¥3400.00",//原价
		price_now: "¥1499.00"//现价
	}, {
		imgSrc: "img/indexImg/price/02.jpg",
		href: "javascript:;",
		dec: "FURLA	女款牛皮手提包",
		price_before: "¥1500.00",
		price_now: "¥999.00"
	}, {
		imgSrc: "img/indexImg/price/03.jpg",
		href: "javascript:;",
		dec: "EMPORIO ARMANI 秋冬新品男款",
		price_before: "¥1500.00",
		price_now: "¥999.00"
	}, {
		imgSrc: "img/indexImg/price/04.jpg",
		href: "javascript:;",
		dec: "TIGAN 261	 男款小牛皮手提包",
		price_before: "¥6500.00",
		price_now: "¥2999.00"
	}, {
		imgSrc: "img/indexImg/price/05.jpg",
		href: "javascript:;",
		dec: "",
		price_before: "",
		price_now: ""
	}];
	//利用循环生成对应项目，添加到指定的栏目中
	for(var i = 0, len = arrPrice.length; i < len; i++) {
		var item = $('<div class="item">' +
						'<a href="' + arrPrice[i].href + '">' +
							'<img src="' + arrPrice[i].imgSrc + '" />' +
						'</a>' +
						'<a href="' + arrPrice[i].href + '">' + arrPrice[i].dec + '</a>' +
						'<p>' +
							'<span class="price_before">' + arrPrice[i].price_before + '</span>' +
							'<span class="price_now">' + arrPrice[i].price_now + '</span>' +
						'</p>' +
					'</div>');
		$('.price .price_bottom').append(item);
	}
});

//品牌上新部分动态添加及相关效果实现
$(function() {
	//定义数组存放商品的有关信息
	var arrNew = [{
		imgSrc: "img/indexImg/new/01.jpg",
		href: "javsscript",
		logoSrc: "img/indexImg/new/logo01.jpg",
		dec_01: "优雅的本土风范",
		dec_02: "全场7.5折"
	}, {
		imgSrc: "img/indexImg/new/02.jpg",
		href: "javsscript",
		logoSrc: "img/indexImg/new/logo02.jpg",
		dec_01: "秋冬绅士风",
		dec_02: "5折封顶"
	}, {
		imgSrc: "img/indexImg/new/03.jpg",
		href: "javsscript",
		logoSrc: "img/indexImg/new/logo03.jpg",
		dec_01: "甜美包包 甜蜜来袭",
		dec_02: "折上9折"
	}, {
		imgSrc: "img/indexImg/new/04.jpg",
		href: "javsscript",
		logoSrc: "img/indexImg/new/logo04.jpg",
		dec_01: "迷情诱惑 温情奉献",
		dec_02: "低至30元"
	}, {
		imgSrc: "img/indexImg/new/05.jpg",
		href: "javsscript",
		logoSrc: "img/indexImg/new/logo05.jpg",
		dec_01: "享誉世界的传奇品牌",
		dec_02: "满199减50"
	}];
	
	for(var i = 0,len = arrNew.length;i<len;i++){
		var item = $('<div class="item">' +
						'<div class="top">'+
							'<a href="' + arrNew[i].href + '">' +
								'<img src="' + arrNew[i].imgSrc + '"/>' +
							'</a>' +
						'</div>' +
						'<div class="bottom_logo">' +
							'<img src="' + arrNew[i].logoSrc + '" />' +
						'</div>' +
						'<div class="bottom_dec">' +
							'<p>' + arrNew[i].dec_01 + '</p>' +
							'<span>' + arrNew[i].dec_02 + '</span>' +
						'</div>' +
					'</div>');
		$('.new .new_bottom').append(item);
	}
	//定义初始状态
	$('.new .new_bottom .item').eq(2).css({width:398});//外侧item
	$('.new .new_bottom .top img').eq(2).css({width:398,height:880});//图片
	$('.new_bottom .top').eq(2).css({height:420});//图片所在的div
	$('.new_bottom .item .bottom_dec').eq(2).css('display','block')
	.siblings('.bottom_logo').css('display','none');
	$('.new .new_bottom .item').mouseover(function(){
		var index = $(this).index();
		//图片变化
		//整个图框item变化
		$(this).stop().animate({width:398},300).siblings('.item').stop().animate({width:200},300);
		//商品栏上半部分图片所在的top区域变化
		$('.new_bottom .top').eq(index).css({height:420})
		.parent().siblings().find('.top').css({height:440});
		//top下的img变化
		$('.new_bottom .top img').eq(index).stop().animate({width:398,height:880},300)
		.parents('.new_bottom .item').siblings().find('.top img').stop().animate({height:440,width:200},300);
		//图片下方的logo和描述信息切换
		$('.new_bottom .item .bottom_dec').eq(index).css('display','block')
		.parent('.item').siblings().find('.bottom_dec').css('display','none');
		$('.new_bottom .item .bottom_logo').eq(index).css('display','none')
		.parent('.item').siblings().find('.bottom_logo').css('display','block');
	});
});
//奢侈品部分
$(function() {
	//luxury_left添加项目
	var arrLuxuryL = [{
		imgSrc: "img/indexImg/luxuryGoods/left_01.jpg",
		href: "javascript:;"
	}];
	var luxury_l = $('<a href="' + arrLuxuryL[0].href + '"><img src="' + arrLuxuryL[0].imgSrc + '"></a>');
	$('.luxury .luxury_left').append(luxury_l);
	//luxury_center添加项目
	var arrLuxuryC = [{
					imgSrc: "img/indexImg/luxuryGoods/center_01.jpg",
					href: "javascript:;"
				},{
					imgSrc: "img/indexImg/luxuryGoods/center_02.jpg",
					href: "javascript:;"
				}];
	for(var i = 0, len = arrLuxuryC.length; i < len; i++) {
		var luxury_c = $('<div class="item">' +
							'<a href="' + arrLuxuryC[i].href + '">' +
								'<img src="' + arrLuxuryC[i].imgSrc + '" class="slide"/>' +
							'</a>' +
						'</div>');
		$('.luxury .luxury_center').append(luxury_c);
		$('.luxury .luxury_center .item').eq(1).css('height','307px');
	}
	//luxury_right添加项目
	var arrLuxuryR = [{
					imgSrc: "img/indexImg/luxuryGoods/right_01.jpg",
					href: "javascript:;"
				},{
					imgSrc: "img/indexImg/luxuryGoods/right_02.jpg",
					href: "javascript:;"
				},
				{
					imgSrc: "img/indexImg/luxuryGoods/right_03.jpg",
					href: "javascript:;"
				},
				{
					imgSrc: "img/indexImg/luxuryGoods/right_04.jpg",
					href: "javascript:;"
				},
				{
					imgSrc: "img/indexImg/luxuryGoods/right_05.jpg",
					href: "javascript:;"
				},
				{
					imgSrc: "img/indexImg/luxuryGoods/right_06.jpg",
					href: "javascript:;"
				}];
	for(var i = 0, len = arrLuxuryR.length; i < len; i++) {
		var luxury_r = $('<div class="item">' +
							'<a href="' + arrLuxuryR[i].href + '">' +
								'<img src="' + arrLuxuryR[i].imgSrc + '" class="slide"/>' +
							'</a>' +
						'</div>');
		$('.luxury .luxury_right').append(luxury_r);
		
	}
			
	//luxury01页面内容生成
	var arrLuxury01 = [{
		imgSrc: "img/indexImg/luxuryGoods/dp01.jpg",//商品图片路径
		href: "javascript:;",//对应链接
		dec: "女式牛皮钱包",//商品描述
		priceN: "¥1890.00",//原价
		priceB: "¥2700.00"//现价
	},{
		imgSrc: "img/indexImg/luxuryGoods/dp02.jpg",
		href: "javascript:;",
		dec: "女式棉质手提包",
		priceN: "¥2300.00",
		priceB: "¥2590.00"
	},{
		imgSrc: "img/indexImg/luxuryGoods/dp03.jpg",
		href: "javascript:;",
		dec: "女款手提包",
		priceN: "¥1399.00",
		priceB: "¥3150.00"
	},{
		imgSrc: "img/indexImg/luxuryGoods/dp04.jpg",
		href: "javascript:;",
		dec: "女款手提包",
		priceN: "¥1390.00",
		priceB: "¥1990.00"
	},{
		imgSrc: "img/indexImg/luxuryGoods/dp05.jpg",
		href: "javascript:;",
		dec: "秋冬新品女式手提包",
		priceN: "¥490.00",
		priceB: "¥700.00"
	},{
		imgSrc: "img/indexImg/luxuryGoods/dp06.jpg",
		href: "javascript:;",
		dec: "女款半身裙",
		priceN: "¥1900.00",
		priceB: "¥2990.00"
	},{
		imgSrc: "img/indexImg/luxuryGoods/dp07.jpg",
		href: "javascript:;",
		dec: "女式牛皮钱包",
		priceN: "¥1890.00",
		priceB: "¥2700.00"
	},{
		imgSrc: "img/indexImg/luxuryGoods/dp08.jpg",
		href: "javascript:;",
		dec: "女款机织半身裙",
		priceN: "¥2690.00",
		priceB: "¥3890.00"
	},{
		imgSrc: "img/indexImg/luxuryGoods/dp09.jpg",
		href: "javascript:;",
		dec: "秋冬新品女款毛衫",
		priceN: "¥2900.00",
		priceB: "¥1990.00"
	},{
		imgSrc: "img/indexImg/luxuryGoods/dp10.jpg",
		href: "javascript:;",
		dec: "男款纯棉针织套头衫",
		priceN: "¥2390.00",
		priceB: "¥3800.00"
	}];
	for(var i = 0,len = arrLuxury01.length;i<len;i++){
		var item = $('<div class="item">' +
							'<a href=" ' + arrLuxury01[i].href + ' ">' +
								'<img src="' + arrLuxury01[i].imgSrc + '" class="slide" />' +
							'</a>' +
							'<a href="' + arrLuxury01[i].href + '">' + arrLuxury01[i].dec + '</a>' +
							'<p>' +
								'<span class="priceN">' + arrLuxury01[i].priceN + '</span>' +
								'<span class="priceB">' + arrLuxury01[i].priceB + '</span>' +
							'</p>' +
						'</div>');
		$('.luxuryGoods .luxury01').append(item);
	}
	//奢侈品栏tab切换
	$('.luxuryTab').eq(0).css('background','url(img/indexImg/luxuryGoods/luxury_bg.png)').css('color','#fff');
	$('.luxuryTab').mouseover(function(){
		var index = $(this).index();
		$(this).css('background','url(img/indexImg/luxuryGoods/luxury_bg.png)').css('color','#fff')
		.siblings().css('background','').css('color','#333');
		$('.luxuryGoods .luxury').eq(index).addClass('active').siblings('.luxury').removeClass('active');
	});
	
	
});

//华盛商城mall部分
$(function(){
	//tab切换第一个页面左上角
	var arrMallr_t1 = [{imgSrc:"img/indexImg/mall/t_01.jpg",href:"javascript:;"}];
		 var item1 = $('<div class="item">' +
						'<a href="' +arrMallr_t1[0].href + '">' +
							'<img src="' +arrMallr_t1[0].imgSrc + '"  class="slide"/>' +
						'</a>' +
					'</div>' );
		$('.mall_right .right_top .right_t_l').append(item1);
	//tab切换第一个页面右上角
	var arrMallr_t2 = [{imgSrc:"img/indexImg/mall/t_02.jpg",href:"javascript:;"}];
		 var item2 = $('<div class="item">' +
						'<a href="' +arrMallr_t2[0].href + '">' +
							'<img src="' +arrMallr_t2[0].imgSrc + '"  class="slide"/>' +
						'</a>' +
					'</div>' );
		$('.mall_right .right_top .right_t_r').append(item2);
	//tab切换第一个页面上轮播图
	var mallCarousel = [{imgSrc:"img/indexImg/mall/carousel-01.jpg",href:"javascript:;"},
						{imgSrc:"img/indexImg/mall/carousel-02.jpg",href:"javascript:;"},
						{imgSrc:"img/indexImg/mall/carousel-03.jpg",href:"javascript:;"},
						{imgSrc:"img/indexImg/mall/carousel-04.jpg",href:"javascript:;"}
						];
	for(var i = 0,len = mallCarousel.length;i<len;i++){
		var item = $('<div class="item">' +
						'<a href="' +mallCarousel[i].href + '">' +
							'<img src="' +mallCarousel[i].imgSrc + '"/>' +
						'</a>' +
					'</div>' );
		$('.mall_right .right_top .right_t_c').append(item);
	}
	var index = 0;
	var timer;
	function carousel(){
		timer = setInterval(function(){
			index++;
			if(index == mallCarousel.length){
				index = 0;
			}
			show();
		},5000)
	}
	 carousel();
	function show(){
		$('.right_top .right_t_c .item').eq(index).css('display','block').siblings('.item').css('display','none');
		$('#mall_list li').eq(index).css('background','#666').siblings().css('background','#CBCBCB');
	}
	$('.mall_right .right_top .right_t_c').mouseover(function(){
		clearInterval(timer);
	});
	$('.mall_right .right_top .right_t_c').mouseout(function(){
		carousel();
	});
	$('#mall_list li').mouseover(function(){
		index = $(this).index();
		show();
	});
	//mall第一个页面上右下栏
	var mallR_b = [	{imgSrc:"img/indexImg/mall/b_01.jpg",href:"javascript:;"},
					{imgSrc:"img/indexImg/mall/b_02.jpg",href:"javascript:;"},
					{imgSrc:"img/indexImg/mall/b_03.jpg",href:"javascript:;"},
					{imgSrc:"img/indexImg/mall/b_04.jpg",href:"javascript:;"}
				]
	for(var i = 0,len = mallR_b.length;i<len;i++){
		var item = $('<div class="item">' +
						'<a href="' +mallR_b[i].href + '">' +
							'<img src="' +mallR_b[i].imgSrc + '" class="slide"/>' +
						'</a>' +
					'</div>' );
		$('.mall_right .right_bottom').append(item);
		$('.mall_right .right_bottom .item').eq(1).css('width',"232px");
		$('.mall_right .right_bottom .item').eq(2).css('width',"232px");
	}
	
	//mall下的tab02
	var mallTab02 = [{
					imgSrc: "img/indexImg/mall/tab02/01.JPG",//商品图片路径
					href: "javascript:;",//对应链接
					dec: "男式衬衫 HBAE-T12A10",//商品描述
					priceN: "¥150.00",//原价
					priceB: "¥168.00"//现价
				},{
					imgSrc: "img/indexImg/mall/tab02/02.JPG",
					href: "javascript:;",
					dec: "男士时尚衬衫 HBAP-12B412",
					priceN: "¥139.00",
					priceB: "¥1390.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab02/03.JPG",
					href: "javascript:;",
					dec: "男士时尚棉衣 BBNA-T3B012",
					priceN: "¥398.00",
					priceB: "¥3980.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab02/04.JPG",
					href: "javascript:;",
					dec: "男士时尚休闲长袖T恤 DTA7583",
					priceN: "¥295.00",
					priceB: "¥1180.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab02/05.JPG",
					href: "javascript:;",
					dec: "新品长款时尚休闲T恤 160228070",
					priceN: "¥120.00",
					priceB: "¥299.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab02/06.JPG",
					href: "javascript:;",
					dec: "拉夏贝尔拉贝缇 新款字母珠片绣套",
					priceN: "¥239.00",
					priceB: "¥399.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab02/07.JPG",
					href: "javascript:;",
					dec: "拉夏贝尔 新款宽松破洞时尚休闲修身直筒牛仔长裤 10008246",
					priceN: "¥221.00",
					priceB: "¥369.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab02/08.JPG",
					href: "javascript:;",
					dec: "新品时尚猫须拼接牛仔裤 ",
					priceN: "¥105.00",
					priceB: "¥349.00"
				}];
				
		//动态生成数据并添加到相应的位置
		for(var i = 0,len = mallTab02.length;i<len;i++){
			var itemList = $('<div class="itemList">' +
								'<a href=" ' + mallTab02[i].href+ ' ">' +
									'<img src=" ' + mallTab02[i].imgSrc+ ' "  class="slide"/>' +
								'</a>' +
									'<div>' +
									'	<a href="javascript:;"> ' + mallTab02[i].dec+ '  HBAE-T12A10</a>' +
										'<p>' +
											'<span class="priceN"> ' + mallTab02[i].priceN+ ' </span>' +
											'<span class="priceB"> ' + mallTab02[i].priceB+ ' </span>' +
										'</p>' +
									'</div>' +
								'</div>' );
			$('#mallTab02').append(itemList);
		}
		
	//mall下的tab03
	var mallTab03 = [{
					imgSrc: "img/indexImg/mall/tab03/01.JPG",//商品图片路径
					href: "javascript:;",//对应链接
					dec: "女式针织外套 83495003",//商品描述
					priceN: "¥299.00",//原价
					priceB: "¥168.00"//现价
				},{
					imgSrc: "img/indexImg/mall/tab03/02.JPG",
					href: "javascript:;",
					dec: "女式针织外套 83495040",
					priceN: "¥299.00",
					priceB: "¥390.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab03/03.JPG",
					href: "javascript:;",
					dec: "男式摇粒两件套冲锋衣 ",
					priceN: "¥398.00",
					priceB: "¥780.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab03/04.JPG",
					href: "javascript:;",
					dec: "男式套绒冲锋衣 KAWD91300-",
					priceN: "¥599.00",
					priceB: "¥1180.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab03/05.JPG",
					href: "javascript:;",
					dec: "女式休闲运动鞋 99999931",
					priceN: "¥349.00",
					priceB: "¥599.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab03/06.JPG",
					href: "javascript:;",
					dec: "三叶草女子经典跑步鞋 S77322",
					priceN: "¥489.00",
					priceB: "¥899.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab03/07.JPG",
					href: "javascript:;",
					dec: "男式复古休闲跑步鞋 ML515POR",
					priceN: "¥221.00",
					priceB: "¥369.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab03/08.JPG",
					href: "javascript:;",
					dec: "男式运动休闲鞋 F37322 ",
					priceN: "¥499.00",
					priceB: "¥649.00"
				}];
				
		//动态生成数据并添加到相应的位置
		for(var i = 0,len = mallTab03.length;i<len;i++){
			var itemList = $('<div class="itemList">' +
								'<a href=" ' + mallTab03[i].href+ ' ">' +
									'<img src=" ' + mallTab03[i].imgSrc+ ' "  class="slide"/>' +
								'</a>' +
									'<div>' +
									'	<a href="javascript:;"> ' + mallTab03[i].dec+ '  HBAE-T12A10</a>' +
										'<p>' +
											'<span class="priceN"> ' + mallTab03[i].priceN+ ' </span>' +
											'<span class="priceB"> ' + mallTab03[i].priceB+ ' </span>' +
										'</p>' +
									'</div>' +
								'</div>' );
			$('#mallTab03').append(itemList);
		}	
	//mall下的tab04
	var mallTab04 = [{
					imgSrc: "img/indexImg/mall/tab04/01.JPG",//商品图片路径
					href: "javascript:;",//对应链接
					dec: "商务休闲电脑背包 RE0902A",//商品描述
					priceN: "¥299.00",//原价
					priceB: "¥168.00"//现价
				},{
					imgSrc: "img/indexImg/mall/tab04/02.JPG",
					href: "javascript:;",
					dec: "伊魁特背包 IKB60115103046-19",
					priceN: "¥299.00",
					priceB: "¥390.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab04/03.JPG",
					href: "javascript:;",
					dec: "时尚女士手提斜跨包  ",
					priceN: "¥398.00",
					priceB: "¥780.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab04/04.JPG",
					href: "javascript:;",
					dec: "时尚潮流拉杆箱22寸 ",
					priceN: "¥599.00",
					priceB: "¥1180.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab04/05.JPG",
					href: "javascript:;",
					dec: "时尚女士休闲鞋 A17C186-02",
					priceN: "¥349.00",
					priceB: "¥599.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab04/06.JPG",
					href: "javascript:;",
					dec: "时尚女士日常休闲鞋 A153153050",
					priceN: "¥489.00",
					priceB: "¥899.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab04/07.JPG",
					href: "javascript:;",
					dec: "男士时尚牛皮日常休闲鞋",
					priceN: "¥221.00",
					priceB: "¥369.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab04/08.JPG",
					href: "javascript:;",
					dec: "牛皮商务男鞋 P5BAZ5612B ",
					priceN: "¥499.00",
					priceB: "¥649.00"
				}];
				
		//动态生成数据并添加到相应的位置
		for(var i = 0,len = mallTab04.length;i<len;i++){
			var itemList = $('<div class="itemList">' +
								'<a href=" ' + mallTab04[i].href+ ' ">' +
									'<img src=" ' + mallTab04[i].imgSrc+ ' "  class="slide"/>' +
								'</a>' +
									'<div>' +
									'	<a href="javascript:;"> ' + mallTab04[i].dec+ '  HBAE-T12A10</a>' +
										'<p>' +
											'<span class="priceN"> ' + mallTab04[i].priceN+ ' </span>' +
											'<span class="priceB"> ' + mallTab04[i].priceB+ ' </span>' +
										'</p>' +
									'</div>' +
								'</div>' );
			$('#mallTab04').append(itemList);
		}	
	//mall下的tab05
	var mallTab05 = [{
					imgSrc: "img/indexImg/mall/tab05/01.JPG",//商品图片路径
					href: "javascript:;",//对应链接
					dec: "商务休闲电脑背包 RE0902A",//商品描述
					priceN: "¥99.00",//原价
					priceB: "¥168.00"//现价
				},{
					imgSrc: "img/indexImg/mall/tab05/02.JPG",
					href: "javascript:;",
					dec: "男童舒适外套656EN824",
					priceN: "¥299.00",
					priceB: "¥390.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab05/03.JPG",
					href: "javascript:;",
					dec: "全腰梭织夹裤 AB546582  ",
					priceN: "¥98.00",
					priceB: "¥180.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab05/04.JPG",
					href: "javascript:;",
					dec: "全腰针织长裤 AG536598",
					priceN: "¥99.00",
					priceB: "¥118.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab05/05.JPG",
					href: "javascript:;",
					dec: "布拉格模杯围文胸 33012",
					priceN: "¥349.00",
					priceB: "¥599.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab05/06.JPG",
					href: "javascript:;",
					dec: "蕾丝花边聚拢型性感蕾丝文胸 ",
					priceN: "¥89.00",
					priceB: "¥199.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab05/07.JPG",
					href: "javascript:;",
					dec: "舒适柔软平脚裤 410B1201",
					priceN: "¥221.00",
					priceB: "¥369.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab05/08.JPG",
					href: "javascript:;",
					dec: "男士简约舒适船袜盒装 T18WT1/10001 ",
					priceN: "¥499.00",
					priceB: "¥649.00"
				}];
				
		//动态生成数据并添加到相应的位置
		for(var i = 0,len = mallTab05.length;i<len;i++){
			var itemList = $('<div class="itemList">' +
								'<a href=" ' + mallTab05[i].href+ ' ">' +
									'<img src=" ' + mallTab05[i].imgSrc+ ' "  class="slide"/>' +
								'</a>' +
									'<div>' +
									'	<a href="javascript:;"> ' + mallTab05[i].dec+ '  HBAE-T12A10</a>' +
										'<p>' +
											'<span class="priceN"> ' + mallTab05[i].priceN+ ' </span>' +
											'<span class="priceB"> ' + mallTab05[i].priceB+ ' </span>' +
										'</p>' +
									'</div>' +
								'</div>' );
			$('#mallTab05').append(itemList);
		}	
	//mall下的tab06
	var mallTab06 = [{
					imgSrc: "img/indexImg/mall/tab06/01.JPG",//商品图片路径
					href: "javascript:;",//对应链接
					dec: "聚能醒肤洁面泡 150ml",//商品描述
					priceN: "¥99.00",//原价
					priceB: "¥168.00"//现价
				},{
					imgSrc: "img/indexImg/mall/tab06/02.JPG",
					href: "javascript:;",
					dec: "雪颜科研致白乳液",
					priceN: "¥299.00",
					priceB: "¥390.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab06/03.JPG",
					href: "javascript:;",
					dec: "水感透白净瑕凝乳75ml",
					priceN: "¥98.00",
					priceB: "¥180.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab06/04.JPG",
					href: "javascript:;",
					dec: "透净 瞬洁舒缓眼唇卸妆液 70ml",
					priceN: "¥99.00",
					priceB: "¥118.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab06/05.JPG",
					href: "javascript:;",
					dec: "三件套:动力小火车 120*200 42337",
					priceN: "¥349.00",
					priceB: "¥599.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab06/06.JPG",
					href: "javascript:;",
					dec: "儿童纯棉三件套:塔西 120*200  ",
					priceN: "¥89.00",
					priceB: "¥199.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab06/07.JPG",
					href: "javascript:;",
					dec: "天丝四件套: 魔法衣柜 150*200 42663",
					priceN: "¥799.00",
					priceB: "¥1369.00"
				},
				{
					imgSrc: "img/indexImg/mall/tab06/08.JPG",
					href: "javascript:;",
					dec: "丘比特之吻四件套180*210 12544",
					priceN: "¥1499.00",
					priceB: "¥1649.00"
				}];
				
		//动态生成数据并添加到相应的位置
		for(var i = 0,len = mallTab06.length;i<len;i++){
			var itemList = $('<div class="itemList">' +
								'<a href=" ' + mallTab06[i].href+ ' ">' +
									'<img src=" ' + mallTab06[i].imgSrc+ ' "  class="slide"/>' +
								'</a>' +
									'<div>' +
									'	<a href="javascript:;"> ' + mallTab06[i].dec+ '  HBAE-T12A10</a>' +
										'<p>' +
											'<span class="priceN"> ' + mallTab06[i].priceN+ ' </span>' +
											'<span class="priceB"> ' + mallTab06[i].priceB+ ' </span>' +
										'</p>' +
									'</div>' +
								'</div>' );
			$('#mallTab06').append(itemList);
		}	
		
	//tab切换实现
	$('.mall_top div a').eq(0).css('background','url(img/indexImg/mall/mall_bg.png)').css('color','#fff');
	$('.mall_top div a').mouseover(function(){
		var index = $(this).index();
		$(this).css('background','url(img/indexImg/mall/mall_bg.png)').css('color','#fff')
		.siblings('a').css('background','').css('color','#333');
		$('.mall .mall_right').eq(index).addClass('active').siblings('.mall_right').removeClass('active');
	});
		
});
//mall商城下方点击可变的商品品牌logo广告条
$(function(){
	$('.clickAdv .click').eq(1).css('display','none');
	var index = 0;
	$('.clickAdv .left').click(function(){
		index++;
		if(index>1){
			index = 0;
		}
		show();
	})
	$('.clickAdv .right').click(function(){
		index--;
		if(index<0){
			index = 1;
		}
		show();
	})
	function show(){
		$('.clickAdv .click').eq(index).fadeIn().siblings('.click').css('display','none');
	}
});
//跨境汇部分
$(function(){
	//左侧上半部分
	var arrOverseasLt = [{
					imgSrc: 'img/indexImg/overSeas/left_t01.jpg',//图片路径
					href: 'javascript:;'//图片对应链接
				}, {
					imgSrc: 'img/indexImg/overSeas/left_t02.jpg',
					href: 'javascript:;'
				}];
	for(var i = 0;i<arrOverseasLt.length;i++){
		var item = $('<div class="item">' +
								'<a href="'+arrOverseasLt[i].href+'">' +
									'<img src="'+arrOverseasLt[i].imgSrc+'" />' +
								'</a>' +
							'</div>');
		$('.overseas_left_top').append(item);
		$('.overseas_left_top .item').eq(1).css('margin-right','0px');
	}
	//左侧下半部分
	var arrOverseasLb = [{
					imgSrc: 'img/indexImg/overSeas/left_b01.jpg',//图片路径
					href: 'javascript:;'//图片对应链接
				}, {
					imgSrc: 'img/indexImg/overSeas/left_b02.jpg',
					href: 'javascript:;'
				}, {
					imgSrc: 'img/indexImg/overSeas/left_b03.jpg',
					href: 'javascript:;'
				}, {
					imgSrc: 'img/indexImg/overSeas/left_b03.jpg',
					href: 'javascript:;'
				}];
	for(var i = 0;i<arrOverseasLb.length;i++){
		var item = $('<div class="item">' +
								'<a href="'+arrOverseasLb[i].href+'">' +
									'<img src="'+arrOverseasLb[i].imgSrc+'" class="slide"/>' +
								'</a>' +
							'</div>');
		$('.overseas_left_bottom').append(item);
	}
	//overseas右侧点击事件
	var index = 0;
	$('.overseas_right .logo').eq(1).css('display','none');
	$('.overseas_right .prev').click(function(){
		index--;
		if(index<0){
			index = 1;
		}
		show();
	})
	$('.overseas_right .next').click(function(){
		index++;
		if(index>1){
			index = 0;
		}
		show();
	})
	function show(){
		$('.overseas_right .logo').eq(index).fadeIn().siblings('.logo').css('display','none');
	}
});
//品牌特卖部分
$(function() {
	//动态添加商品部分
	var arrBrandSale = [{
					imgSrc: 'img/indexImg/brandSale/01.jpg',//图片路径
					href: 'javascript:;'//图片对应链接
				},{
					imgSrc: 'img/indexImg/brandSale/02.jpg',//图片路径
					href: 'javascript:;'//图片对应链接
				},{
					imgSrc: 'img/indexImg/brandSale/03.jpg',//图片路径
					href: 'javascript:;'//图片对应链接
				},{
					imgSrc: 'img/indexImg/brandSale/04.jpg',//图片路径
					href: 'javascript:;'//图片对应链接
				},{
					imgSrc: 'img/indexImg/brandSale/05.jpg',//图片路径
					href: 'javascript:;'//图片对应链接
				},{
					imgSrc: 'img/indexImg/brandSale/06.jpg',//图片路径
					href: 'javascript:;'//图片对应链接
				}];
	for(var i = 0;i<arrBrandSale.length;i++){
		var item = $('<div class="item">' +
							'<a href="' + arrBrandSale[i].href + ' ">' +
								'<img src="' + arrBrandSale[i].imgSrc + ' " />' +
							'</a>' +
							'<a href="' + arrBrandSale[i].href + ' " class="buyNow">立即购买</a>' +
							'<div class="time">' +
								'<span>仅剩</span>' +
								'<span class="day num"></span>' +
								'<span>天</span>' +
								'<span class="hour num"></span>' +
								'<span>小时</span>' +
								'<span class="min num"></span>' +
								'<span>分</span>' +
								'<span class="sec num"></span>' +
								'<span>秒</span>' +
							'</div>' +
						'</div>' );
		$('.brandSale .sale').append(item);
	}
		//倒计时
		function getDiff(start,end){
		var st = start.getTime();//当前时间的总毫秒数
		var et = end.getTime();//截止时间的总毫秒数
		var temp = et-st;//两个时间的毫秒数差值
		var sm = temp%1000;//剩余的不足一秒的毫秒数 
		var s = parseInt(temp/1000);//剩余的总秒数
		var ss = (s%60);//不足1分钟的秒数
		var min = parseInt(s/60);//剩余的总分钟数
		var smin = (min%60);//剩余的不足1小时的分钟数
		var h = parseInt(min/60);//剩余的总的小时数
		var sh = (h%24);//剩余的不足一天的小时数
		var day = parseInt(h/24);//剩余的总的天数
		return {sm:sm,ss:ss,smin:smin,sh:sh,day:day};
	}
		setInterval(function(){
		var sTime = new Date();
		var eTime = new Date("2016/11/11 20:00:00");
		var obj = getDiff(sTime,eTime);
		var time1 = obj.day;
		$('.sale .time .day').html(time1);
	},1) 
	setInterval(function(){
		var sTime = new Date();
		var eTime = new Date("2016/11/11 20:00:00");
		var obj = getDiff(sTime,eTime);
		var time2 = obj.sh;
		$('.sale .time .hour').html(time2);
	},1) 
	setInterval(function(){
		var sTime = new Date();
		var eTime = new Date("2016/11/11 20:00:00");
		var obj = getDiff(sTime,eTime);
		var time3 = obj.smin;
		$('.sale .time .min').html(time3);
	},1) 
	setInterval(function(){
		var sTime = new Date();
		var eTime = new Date("2016/11/11 20:00:00");
		var obj = getDiff(sTime,eTime);
		var time4 = obj.ss;
		$('.sale .time .sec').html(time4);
	},1)
});
//鼠标移动到商品图片上时位置变化效果的实现
$(function(){
	$('.slide').mouseover(function(){
		$(this).stop().animate({left:10},300);
	});
	$('.slide').mouseout(function(){
		$(this).stop().animate({left:0},300);
	});
});
