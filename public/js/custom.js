$( document ).ready(function() {
    var mario = $('.mario-sprite'),
    	coin  = $('.coin'),
    	box   = $('.box');

    $('.start-animation').on('click', function(){
    	mario.addClass('animate-mario');
    	coin.addClass('animate-coin');
    	//change coin box image
    	setTimeout(function(){
    		box.attr('src', '../img/empty.png');
    	}, 2000);
    	//at end of 5 second animation, reset
    	setTimeout(function(){
    		mario.removeClass('animate-mario');
    		coin.removeClass('animate-coin');
    		box.attr('src', '../img/question.gif');
    	}, 4000);
    });
});