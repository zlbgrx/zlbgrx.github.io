//二级页面
//banner图下方的推荐商品
$(function() {
	var arrSuggest = [{
		imgSrc: "../img/secondImg/suggest/top.jpg",
		href: "javascript:;"
	}, {
		imgSrc: "../img/secondImg/suggest/bottom.jpg",
		href: "javascript:;"
	}];
	for(var i = 0; i < arrSuggest.length; i++) {
		var img = $('<a href=" ' + arrSuggest[i].href + ' ">' +
			'<img src=" ' + arrSuggest[i].imgSrc + ' " />' +
			'</a>');
		$('.suggest .layout').append(img);
	}
});
//连衣裙专区
$(function() {
	//动态生成页面上所有项目
	var len = arrDress.length;
	for(var i = 0; i < len; i++) {
		var item = $('<div class="item"> ' +
			'<a href="' + arrDress[i].href + '" class="bigImg">' +
			'<img src=" ' + arrDress[i].imgSrc01 + ' " class="active" />' +
			'<img src=" ' + arrDress[i].imgSrc02 + ' " />' +
			'<img src=" ' + arrDress[i].imgSrc03 + ' " />' +
			'<img src=" ' + arrDress[i].imgSrc04 + ' " />' +
			'</a>' +
			'<a href="javascript:;" class="left">&lt;</a>' +
			'<a href="javascript:;" class="right">&gt;</a>' +
			'<div class="tab">' +
			'<img src=" ' + arrDress[i].imgSrc01 + ' " class="border img" />' +
			'<img src=" ' + arrDress[i].imgSrc02 + ' " class="img" />' +
			'<img src=" ' + arrDress[i].imgSrc03 + ' " class="img" />' +
			'<img src=" ' + arrDress[i].imgSrc04 + ' " class="img" />' +
			'</div>' +
			'<a href=" ' + arrDress[i].href + ' " class="dec"> ' + arrDress[i].dec + '  </a>' +
			'<span class="price_before"> ' + arrDress[i].priceB + ' </span>' +
			'<div class="bot">' +
			'<span> ' + arrDress[i].priceN + ' </span>' +
			'<a href=" ' + arrDress[i].href + ' ">立即购买&gt;</a>' +
			'</div>' +
			'<img src="../img/secondImg/01.png" class="youhui" />' +
			'</div>');
		$('.dress .dress_in').append(item);
	}
	//定义每一行最后一右边距为零
	$('.dress .dress_in .item').eq(3).css('margin-right', '0px');
	$('.dress .dress_in .item').eq(7).css('margin-right', '0px');
	
});
//外套专区coat

$(function() {
	//动态生成页面上所有项目
	var len = arrCoat.length;
	for(var i = 0; i < len; i++) {
		var item = $('<div class="item"> ' +
			'<a href="' + arrCoat[i].href + '" class="bigImg">' +
			'<img src=" ' + arrCoat[i].imgSrc01 + ' " class="active" />' +
			'<img src=" ' + arrCoat[i].imgSrc02 + ' " />' +
			'<img src=" ' + arrCoat[i].imgSrc03 + ' " />' +
			'<img src=" ' + arrCoat[i].imgSrc04 + ' " />' +
			'</a>' +
			'<a href="javascript:;" class="left">&lt;</a>' +
			'<a href="javascript:;" class="right">&gt;</a>' +
			'<div class="tab">' +
			'<img src=" ' + arrCoat[i].imgSrc01 + ' " class="border img" />' +
			'<img src=" ' + arrCoat[i].imgSrc02 + ' " class="img" />' +
			'<img src=" ' + arrCoat[i].imgSrc03 + ' " class="img" />' +
			'<img src=" ' + arrCoat[i].imgSrc04 + ' " class="img" />' +
			'</div>' +
			'<a href=" ' + arrCoat[i].href + ' " class="dec"> ' + arrDress[i].dec + '  </a>' +
			'<span class="price_before"> ' + arrCoat[i].priceB + ' </span>' +
			'<div class="bot">' +
			'<span> ' + arrCoat[i].priceN + ' </span>' +
			'<a href=" ' + arrCoat[i].href + ' ">立即购买&gt;</a>' +
			'</div>' +
			'<img src="../img/secondImg/01.png" class="youhui" />' +
			'</div>');
		$('.coat .coat_in').append(item);
	}
	//定义每一行最后一右边距为零
	$('.coat .coat_in .item').eq(3).css('margin-right', '0px');
	$('.coat .coat_in .item').eq(7).css('margin-right', '0px');
	
});

//T恤专区

$(function() {
	//动态生成页面上所有项目
	var len = arrTshirt.length;
	for(var i = 0; i < len; i++) {
		var item = $('<div class="item"> ' +
			'<a href="' + arrTshirt[i].href + '" class="bigImg">' +
			'<img src=" ' + arrTshirt[i].imgSrc01 + ' " class="active" />' +
			'<img src=" ' + arrTshirt[i].imgSrc02 + ' " />' +
			'<img src=" ' + arrTshirt[i].imgSrc03 + ' " />' +
			'<img src=" ' + arrTshirt[i].imgSrc04 + ' " />' +
			'</a>' +
			'<a href="javascript:;" class="left">&lt;</a>' +
			'<a href="javascript:;" class="right">&gt;</a>' +
			'<div class="tab">' +
			'<img src=" ' + arrTshirt[i].imgSrc01 + ' " class="border img" />' +
			'<img src=" ' + arrTshirt[i].imgSrc02 + ' " class="img" />' +
			'<img src=" ' + arrTshirt[i].imgSrc03 + ' " class="img" />' +
			'<img src=" ' + arrTshirt[i].imgSrc04 + ' " class="img" />' +
			'</div>' +
			'<a href=" ' + arrTshirt[i].href + ' " class="dec"> ' + arrTshirt[i].dec + '  </a>' +
			'<span class="price_before"> ' + arrTshirt[i].priceB + ' </span>' +
			'<div class="bot">' +
			'<span> ' + arrTshirt[i].priceN + ' </span>' +
			'<a href=" ' + arrTshirt[i].href + ' ">立即购买&gt;</a>' +
			'</div>' +
			'<img src="../img/secondImg/01.png" class="youhui" />' +
			'</div>');
		$('.t-shirt .t-shirt-in').append(item);
	}
	//定义每一行最后一右边距为零
	$('.t-shirt .t-shirt-in .item').eq(3).css('margin-right', '0px');
	$('.t-shirt .t-shirt-in .item').eq(7).css('margin-right', '0px');
	
});
//针织衫专区
$(function() {
	//动态生成页面上所有项目
	var len = arrKnit.length;
	for(var i = 0; i < len; i++) {
		var item = $('<div class="item"> ' +
			'<a href="' + arrKnit[i].href + '" class="bigImg">' +
			'<img src=" ' + arrKnit[i].imgSrc01 + ' " class="active" />' +
			'<img src=" ' + arrKnit[i].imgSrc02 + ' " />' +
			'<img src=" ' + arrKnit[i].imgSrc03 + ' " />' +
			'<img src=" ' + arrKnit[i].imgSrc04 + ' " />' +
			'</a>' +
			'<a href="javascript:;" class="left">&lt;</a>' +
			'<a href="javascript:;" class="right">&gt;</a>' +
			'<div class="tab">' +
			'<img src=" ' + arrKnit[i].imgSrc01 + ' " class="border img" />' +
			'<img src=" ' + arrKnit[i].imgSrc02 + ' " class="img" />' +
			'<img src=" ' + arrKnit[i].imgSrc03 + ' " class="img" />' +
			'<img src=" ' + arrKnit[i].imgSrc04 + ' " class="img" />' +
			'</div>' +
			'<a href=" ' + arrKnit[i].href + ' " class="dec"> ' + arrKnit[i].dec + '  </a>' +
			'<span class="price_before"> ' + arrKnit[i].priceB + ' </span>' +
			'<div class="bot">' +
			'<span> ' + arrKnit[i].priceN + ' </span>' +
			'<a href=" ' + arrKnit[i].href + ' ">立即购买&gt;</a>' +
			'</div>' +
			'</div>');
		$('.knit .knit-in').append(item);
	}
	//定义每一行最后一右边距为零
	$('.knit .knit-in .item').eq(3).css('margin-right', '0px');
	$('.knit .knit-in .item').eq(7).css('margin-right', '0px');
	
});
//衬衫专区
$(function() {
	//动态生成页面上所有项目
	var len = arrShirt.length;
	for(var i = 0; i < len; i++) {
		var item = $('<div class="item"> ' +
				'<a href="' + arrShirt[i].href + '" class="bigImg">' +
					'<img src=" ' + arrShirt[i].imgSrc01 + ' " class="active" />' +
					'<img src=" ' + arrShirt[i].imgSrc02 + ' " />' +
					'<img src=" ' + arrShirt[i].imgSrc03 + ' " />' +
					'<img src=" ' + arrShirt[i].imgSrc04 + ' " />' +
				'</a>' +
				'<a href="javascript:;" class="left">&lt;</a>' +
				'<a href="javascript:;" class="right">&gt;</a>' +
				'<div class="tab">' +
					'<img src=" ' + arrShirt[i].imgSrc01 + ' " class="border img" />' +
					'<img src=" ' + arrShirt[i].imgSrc02 + ' " class="img" />' +
					'<img src=" ' + arrShirt[i].imgSrc03 + ' " class="img" />' +
					'<img src=" ' + arrShirt[i].imgSrc04 + ' " class="img" />' +
				'</div>' +
					'<a href=" ' + arrShirt[i].href + ' " class="dec"> ' + arrShirt[i].dec + '  </a>' +
					'<span class="price_before"> ' + arrShirt[i].priceB + ' </span>' +
					'<div class="bot">' +
					'<span> ' + arrShirt[i].priceN + ' </span>' +
					'<a href=" ' + arrShirt[i].href + ' ">立即购买&gt;</a>' +
				'</div>' +
			'</div>');
		$('.shirt .shirt-in').append(item);
	}
	//定义每一行最后一右边距为零
	
	$('.shirt .shirt-in .item').eq(3).css('margin-right', '0px');
	$('.shirt .shirt-in .item').eq(7).css('margin-right', '0px');
	
});
$(function(){
	//商品下方的小图标鼠标移入时实现与大图切换
	var index = 0;
	$('.item .tab .img').mouseenter(function() {
		index = $(this).index();
		$(this).addClass('border').siblings('img').removeClass('border');
		$(this).parent('.tab').siblings('.bigImg').find('img').eq(index).addClass('active')
		.siblings('img').removeClass('active');
	});
	//为左右按钮添加点击事件
	$('.item .left').click(function(){
		index--;
		console.log(index)
		if(index<=0){
			index = 0;
		}
		$(this).siblings('.tab').find('img').eq(index).addClass('border').siblings('img').removeClass('border');
		$(this).siblings('.bigImg').find('img').eq(index).addClass('active').siblings('img').removeClass('active');
	});
	$('.item .right').click(function(){
		index++;
		if(index>=3){
			index = 3 ;
		}
		$(this).siblings('.tab').find('img').eq(index).addClass('border').siblings('img').removeClass('border');
		$(this).siblings('.bigImg').find('img').eq(index).addClass('active').siblings('img').removeClass('active');
	});

});
