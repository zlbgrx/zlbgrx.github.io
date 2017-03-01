//购物车功能实现
$(function(){
	//取出cookie，判断购物车中是否有商品；有的话让商品列表显示，没有的话让空购物车显示
	var cartStr = $.cookie('cart')? $.cookie('cart') : "{}";
	if(cartStr == "{}"){//如果为空
		$('.cart .none').css('display','block').siblings('.myCart').css('display','none');
	}else{//非空
		$('.cart .none').css('display','none').siblings('.myCart').css('display','block');
		//遍历cookie中的所有商品，将其在购物车中显示出来
		var cartObj = JSON.parse(cartStr);
		for(var id in cartObj){
			var info = cartObj[id];
			var item = $('<ul class="goods" data-good-id="'+id+'">' +
							'<li class="checked"><input type="checkbox"/ class="check"></li>' +
							'<li class="order">' +
								'<div>' +
									'<a href="javascript:;">' +
										'<img src=" ' + info.src + ' " />' +
									'</a>' +
									'<a  href="javascript:;"> ' + info.name + ' </a>' +
								'</div>' +
							'</li>' +
							'<li class="uPrice">¥<span class="price"> ' + info.price + ' </span></li>' +
							'<li class="num">' +
								'<a  href="javascript:;" class="reduce">-</a>' +
								'<input type="text"  value=" ' + info.num + ' " class="input"/>' +
								'<a  href="javascript:;" class="increase">+</a>' +
							'</li>' +
							'<li class="sum">¥<span class="all"> ' + info.price*info.num + ' </span></li>' +
							'<li class="del">' +
								'<a href="javascript:;" class="remove">删除</a>' +
							'</li>' +
						'</ul>');
		$('.myCart .list').append(item);
		}
		total();
		//数量加减按钮及其相关功能的实现
		$('.goods .input').blur(function(){
			var goodId = $(this).parents('ul.goods').attr('data-good-id');
			var num = parseInt($(this).val() );//失去焦点时获取该输入框的值
			//判断输入的是否为数字，如果不是数字，就让其等于1
			var REG_NUM = /^\d+$/;
			if(REG_NUM.test(num)){
				num = parseInt(num);
			} else {
				num = 1;
			}
			$(this).val(num);//将输入值赋给value
			//更新一下小计
			var price =parseFloat( $(this).parents('.goods').find('.price').html() );//转化数据类型
			$(this).parents('.goods').find('.sum .all').html(price*num);
			//并重新将修改过的信息存入cookie中
			var cartStr = $.cookie('cart')? $.cookie('cart') : "{}";
			var cartObj = JSON.parse(cartStr);
			cartObj[goodId].num = num;
			//转为json文件，存回cookie
			cartStr = JSON.stringify(cartObj);
			$.cookie("cart",cartStr,{expires:7,path:"/"});
			//更新页面中的数量及总价信息
			total();
			allNum();
		});
		//点击加减按钮实现数量增减
		//点击减少的按钮
		$('.reduce').click(function(){
			var goodId = $(this).parents('.goods').attr('data-good-id');
			var num = parseInt( $(this).siblings('.input').val() );//获取输入框的value值
			num -- ;
			if(num <= 1){//限定最小值为1
				num = 1;
			}
			$(this).siblings('.input').val(num);//更新输入框的值
			//更新小计
			var price =parseFloat( $(this).parents('.goods').find('.price').html() );//转化数据类型
			$(this).parents('.goods').find('.sum .all').html(price*num);
			//更新cookie信息
			var cartStr = $.cookie('cart') ? $.cookie('cart'):"{}";
			var cartObj = JSON.parse(cartStr);
			cartObj[goodId].num = num;
			//转为json文件，存回cookie
			cartStr = JSON.stringify(cartObj);
			$.cookie("cart",cartStr,{expires:7,path:"/"});
			//更新页面中的数量及总价信息
			total();
			allNum();
		});
		//点击增加的按钮
		$('.increase').click(function(){
			var goodId = $(this).parents('.goods').attr('data-good-id');
			var num = parseInt( $(this).siblings('.input').val() );//获取输入框的value
			num ++ ;
			$(this).siblings('.input').val(num);//更新输入框的值
			//更新小计
			var price =parseFloat( $(this).parents('.goods').find('.price').html() );//转化数据类型
			$(this).parents('.goods').find('.sum .all').html(price*num);
			//更新cookie信息
			var cartStr = $.cookie('cart') ? $.cookie('cart'):"{}";
			var cartObj = JSON.parse(cartStr);
			cartObj[goodId].num = num;
			//转为json文件，存回cookie
			cartStr = JSON.stringify(cartObj);
			$.cookie("cart",cartStr,{expires:7,path:"/"});
			//更新页面中的数量及总价信息
			total();
			allNum();
		});
		//删除对应的选项
		
		$('.remove').click(function(){
			var goodId = $(this).parents('.goods').attr('data-good-id');
			var cartStr = $.cookie('cart') ? $.cookie('cart'):"{}";
			var cartObj = JSON.parse(cartStr);
			//将其从对象中删除
			delete cartObj[goodId];
			//更新cookie
			cartStr = JSON.stringify(cartObj);
			$.cookie('cart', cartStr, {expires:7,path:"/"});
			//判断一下是不是全删除了，如果是，显示购物车为空
			cartStr = $.cookie('cart') ? $.cookie('cart'):"{}";
			if(cartStr == "{}"){
				$('.cart .myCart').fadeOut().siblings('.none').fadeIn();
			}
			//并从页面上消失
			$(this).parents('.goods').slideUp();
			//更新页面中的数量及总价信息
			total();
			allNum();
		});
		//更新下方总计价格
		function total(){
			var goodId = $(this).parents('.goods').attr('data-good-id');
			var cartStr = $.cookie('cart') ? $.cookie('cart'):"{}";
			var cartObj = JSON.parse(cartStr);
			var total = 0
			for(var goodId in cartObj ){
				//获取小计值
				var all = parseInt(cartObj[goodId].num)*parseFloat(cartObj[goodId].price);
				//总价等于所有小计相加
				total+=all;
			}
			$('.pay .right .total').html(total);
		}
		//更新购物车中的商品总数量
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
			$('#num').html(allNum);
			//将数据信息同时显示在购物车页面左上方
			$('#cartNum').html(allNum);
		}	
		$('.payNow').click(function(){
			var money = $('.pay .right .total').html();
			alert('您购买的商品共计'+ money + '元，请将钱款直接打到本站支付宝账户：1513····6508，工作人员会尽快为您安排发货！')
		});
		
	}
});

//热卖推荐
$(function() {
	var arrHot = [{
		imgSrc: "../img/cartImg/01.jpg",
		href: "javascript:;",
		dec:"OTHERMIX七格格 秋新款纯色圆领甜美灯笼袖短裙收腰显瘦连衣裙 6MB3037N",
		priceN: "¥249.90",
		priceB: "¥1009.00"
	}, {
		imgSrc: "../img/cartImg/02.jpg",
		href: "javascript:;",
		dec: "歌莉娅 时尚韩版单肩斜挎包 A2G1601475",
		priceN: "¥219.90",
		priceB: "¥1180.00"
	}, {
		imgSrc: "../img/cartImg/03.jpg",
		href: "javascript:;",
		dec: "古奇天伦 纯色系带女低帮休闲鞋 8443",
		priceN: "¥228.90",
		priceB: "¥498.00"
	}, {
		imgSrc: "../img/cartImg/04.jpg",
		href: "javascript:;",
		dec: "Kiehl's/科颜氏 牛油果保湿眼霜",
		priceN: "¥300.90",
		priceB: "¥270.00"
	}, {
		imgSrc: "../img/cartImg/05.jpg",
		href: "javascript:;",
		dec: "VDL 贝壳提亮液妆前乳30ml",
		priceN: "¥108.90",
		priceB: "¥142.00"
	}];
	for(var i = 0;i<arrHot.length;i++){
		var item = $('<div class="item">'+
						'<img src=" '+ arrHot[i].imgSrc+ ' " />'+
						'<a href=" '+ arrHot[i].href+ '"> '+ arrHot[i].dec+ '</a>'+
						'<p>'+
							'<span class="priceN"> '+ arrHot[i].priceN+ '</span>'+
							'<span class="priceB"> '+ arrHot[i].priceB+ '</span>'+
						'</p>'+
					'</div>');
		$('.suggest .box').append(item);
	}
})