$(function() {
	//top下拉菜单
	//鼠标在菜单上时的移入移出事件
	$('.top .slideUp').mouseover(function() {
		$('.top .up').css('display', 'block');
	})
	$('.top .slideUp').mouseout(function() {
			$('.top .up').css('display', 'none');
		})
		//鼠标移入到选项卡上时的移入移出事件
	$('.top .up').mouseover(function() {
		$(this).css('display', 'block');
	})
	$('.top .up').mouseout(function() {
		$(this).css('display', 'none');
	})

	//search搜索栏右侧移动端按钮对应的选项卡弹出
	$('.s_right .icon1').mouseover(function() {
		$('.tanchu').css('display', 'block');
	})
	$('.s_right .icon1').mouseout(function() {
		$('.tanchu').css('display', 'none');
	})
	$('.tanchu').mouseover(function() {
		$(this).css('display', 'block');
	})
	$('.tanchu').mouseout(function() {
			$(this).css('display', 'none');
		})
		//购物车弹出框
	$('.cart').mouseover(function() {
		$('.cart-up').css('display', 'block');
	})
	$('.cart').mouseout(function() {
		$('.cart-up').css('display', 'none');
	})
	$('.cart-up').mouseover(function() {
		$(this).css('display', 'block');
	})
	$('.cart-up').mouseout(function() {
		$(this).css('display', 'none');
	})
	//屏幕右侧导航条
	$('.bar .item').mouseenter(function(){
		$(this).find('a').css('display','block');
	});
	$('.bar .item').mouseleave(function(){
		$(this).find('a').css('display','none');
	});
	//回到顶部
	$('.backTop').click(function(){
		var res = $(document).scrollTop();
		$('html body').animate({scrollTop:0});
	});
	//关闭导航条
	$('.close').click(function(){
		$('.bar').fadeOut();
		
	});
	//页面版芯上任何位置获得焦点时显示导航条
	$('.cantainer').click(function(){
			$('.bar').fadeIn();
	});
})