$(function() {
	//goodsList模拟商品列表
	var arrGoodsList = [{
		imgSrc: "../img/cartImg/goods01.jpg", //图片路径
		href: "javascript:;", //商品链接
		dec: "La Babite 拉贝缇 拉夏贝尔 新款西装领中长款毛呢大衣 ", //产品描述
		price: "399" //产品价格
	}, {
		imgSrc: "../img/cartImg/goods02.jpg", //图片路径
		href: "javascript:;", //商品链接
		dec: "Candie's 拉夏贝尔Candie's新款字母印花圆领九分袖T恤 ", //产品描述
		price: "219" //产品价格
	}, {
		imgSrc: "../img/cartImg/goods03.jpg", //图片路径
		href: "javascript:;", //商品链接
		dec: "Candie's 拉夏贝尔Candie's新款雪纺拼接立领套头长袖修身", //产品描述
		price: "129" //产品价格
	}, {
		imgSrc: "../img/cartImg/goods04.jpg", //图片路径
		href: "javascript:;", //商品链接
		dec: "Candie's 拉夏贝尔 新款印花简洁廓形长袖套头卫衣 ", //产品描述
		price: "179" //产品价格
	}, {
		imgSrc: "../img/cartImg/goods05.jpg", //图片路径
		href: "javascript:;", //商品链接
		dec: "La Chapelle 拉夏贝尔新款貉子毛领中长款长袖连帽羽绒服 ", //产品描述
		price: "1019" //产品价格
	}, {
		imgSrc: "../img/cartImg/goods06.jpg", //图片路径
		href: "javascript:;", //商品链接
		dec: "La Chapelle 拉夏贝尔 新款条纹长袖毛织套头毛巾绣字母毛衣  ", //产品描述
		price: "179" //产品价格
	}, {
		imgSrc: "../img/cartImg/goods07.jpg", //图片路径
		href: "javascript:;", //商品链接
		dec: "La Chapelle 拉夏贝尔新款羊毛混纺绣花高领长袖毛针织衫 ", //产品描述
		price: "238" //产品价格
	}, {
		imgSrc: "../img/cartImg/goods08.jpg", //图片路径
		href: "javascript:;", //商品链接
		dec: "La Chapelle 拉夏贝尔新款中长款九分袖毛针织衫10009065", //产品描述
		price: "359" //产品价格
	}];
	for(var i = 0; i < arrGoodsList.length; i++) {
		var item = $('<div class="item" date-good-id="sp' + (i + 1) + '">' +
			'<img src="' + arrGoodsList[i].imgSrc + '"  class="goodImg"/>' +
			'<a href="' + arrGoodsList[i].href + '" class="dec">' + arrGoodsList[i].dec + '</a>' +
			'<p>价格：¥<span class="price">' + arrGoodsList[i].price + '</span></p>' +
			'<a href="javascript:;" class="addCart">加入购物车</a>' +
			'</div>');
		$('.goodsList .cantainer').append(item);
	}
});

//商品列表页物品添加到购物车功能实现
$(function() {
	//进入页面，先判断购物车内是否已有商品
	loadCart();

	function loadCart() {
		//读取本地存储的cookie,若果没有，返回undefined,此处让其为空
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "{}";
		var cartObj = JSON.parse(cartStr); //转为易于操作的对象
		var total = 0; //定义购物车内商品数量初始值为零
		for(var goodId in cartObj) {
			total += cartObj[goodId].num;
		}
		$('#num').html(total); //将这个数值在右上角购物车栏中显示
		//将数据信息同时显示在购物车页面左上方
		$('#cartNum').html(total);
	}
	//点击添加到购物车按钮时
	$('.addCart').click(function(e) {
		//获取商品的相关信息
		var goodId = $(this).parent('.item').attr('date-good-id');
		var goodName = $(this).siblings('.dec').html();
		var goodSrc = $(this).siblings('.goodImg').attr('src');
		var goodPrice = $(this).siblings('p').find('.price').html();
		//获取本地存储的cookie，看购物车内是否已有该商品
		var cartStr = $.cookie('cart') ? $.cookie('cart') : '{}';
		var cartObj = JSON.parse(cartStr);
		//用if in 判断是否存在该商品
		if(goodId in cartObj) {
			cartObj[goodId].num += 1; //有得换只需要每点击一次，让其数量加一即可
		} else { //没有的话，将该商品的信息添加到购物车中，并存入本地cookie
			cartObj[goodId] = {
				name: goodName,
				price: goodPrice,
				src: goodSrc,
				num: 1
			}
		}
		//点击添加购物车时图片变化效果
		var cloneImg = $(this).siblings('.goodImg').clone();
		cloneImg.css({
			width: 260,
			height: 260
		});
		cloneImg.fly({
			start: {
				left: e.clientX, //开始位置（必填）#fly元素会被设置成position: fixed
				top: e.clientY, //开始位置（必填）
			},
			end: {
				left: $('#num').offset().left - $(window).scrollLeft(), //结束位置
				top: $('#num').offset().top - $(window).scrollTop(), //结束位置
				width: 0, //结束时高度
				height: 0, //结束时高度
			},
			autoPlay: true, //是否直接运动,默认true
			onEnd: function() {
					cloneImg.remove();
					//图片飞进购物车后,更新购物车按钮上的总数
					loadCart();
				} //结束回调
		});
		//更新cookie信息，将其存入本地
		cartStr = JSON.stringify(cartObj);
		$.cookie("cart", cartStr, {
			expires: 7,
			path: "/"
		});

	});

});