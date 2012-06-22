/*
 *  Script by Anthony Mattox
 *
 *  Created: 4/9/11
 *  Last Edited: 4/10/11
 *
 */


$(document).ready(init);

function init() {
	// ADD EMAIL ADDRESS BY CONTACT FORM
	var name = 'pulsus';
	var host = 'anthonymattox.com';
	$('#email').html('Email: <a href="mailto:'+name+'@'+host+'">'+name+'@'+host+'</a>');
	
	
	
	// CONTACT FORM
	$('form').each(function() {
		var form = $(this);
		var inputs = $(this).find('input:text, textarea');
		var submitButton = $(this).find('input:submit');
		
		inputs.each(function() {
			var label = $(this).prev('label');
			if (label.length>0) {
				label.hide();
				if ($(this).val()=='' || $(this).val()==label.text()) {
					$(this).val(label.text());
					$(this).addClass('default');
				}
				
				$(this).focus(function() {
					if ($(this).val()=='' || $(this).val()==label.text()) {
						$(this).val('');
						$(this).removeClass('default');
						testSubmit();
					}
				});
				$(this).blur(function() {
					if ($(this).val()=='' || $(this).val()==label.text()) {
						$(this).val(label.text());
						$(this).addClass('default');
						testSubmit();
					}
				});
			}
		});
		submitButton.animate({'opacity': .3}, 0);
		submitButton.attr('disabled', 'disabled');
		submitButton.addClass('disabled');
		
		function testSubmit() {
			if (formFilled()) {
				submitButton.animate({'opacity': 1}, 0);
				submitButton.removeAttr('disabled');
				submitButton.removeClass('disabled');
			} else {
				submitButton.animate({'opacity': .3}, 0);
				submitButton.attr('disabled', 'disabled');
				submitButton.addClass('disabled');
			}
		}
		
		function formFilled() {
			if (inputs.hasClass('default')) {
				return false;
			}
			return true;
		}
		
		/*
		$(this).submit(function () {
			form.animate({'opacity':0},600, function() {
				form.hide();
			});
			jQuery.post('http://pulsusgame.com/scripts/jsmail.php', $(this).serialize(), function (data) {
				form.before(data);
				form.prev('.response').animate({'opacity': 0}, 0).animate({'opacity': 1}, 600);
			});
			return false;
		});
		*/
	});
	
	
	// Thank you header
	$('#feedback_thanks').each(function() {
		$(this).delay(7000).animate({
			'opacity': 0
		}, 300, function() {
			$(this).hide();
		});
	});
	
	
	
	// SCREENSHOT SCROLLER
	$('#screenshots').each(function() {
		var current;
		var currentButton;
		var sscontainer = $(this);
		var ssnavbuttons = $('#ssnav_buttons');
		$(this).find('.screenshot').each(function(i) {
			if (i==0) {
				current = $(this);
				$(this).show();
			} else {
			 	$(this).hide();
			}
			ssnavbuttons.append('<a href="#">'+(i+1)+'</a>');
		});
		
		ssnavbuttons.find('a').each(function(i) {
			if (i==0) {
				$(this).addClass('current');
				currentButton = $(this);
			}
			$(this).click(function() {
				pauseTimer();
				switchTo(sscontainer.find('.screenshot:eq('+i+')'));
				return false;
			});
		});
		
		$(this).click(function() {
			pauseTimer();
			nextImage();
		});
		
		$(document).everyTime(4000, 'sstimer', function() {
			nextImage();
		});
		
		function nextImage() {
			var nextImage = current.next('.screenshot');
			if (nextImage.length==0) {
				nextImage = sscontainer.find('.screenshot:first');
			}
			switchTo(nextImage);
		}
		
		function pauseTimer() {
			$(document).stopTime('sstimer');
			$(document).oneTime(12000, 'sstimer', function() {
				$(document).everyTime(4000, 'sstimer', function() {
					nextImage();
				});
			});
		}
		
		function switchTo(image) {
			current.fadeOut(400);
			current = image;
			current.fadeIn(400);
			currentButton.removeClass('current', 200, function() {
				$(this).removeAttr('style');
			});
			currentButton = ssnavbuttons.find('a:eq('+current.index()+')');
			currentButton.addClass('current', 200);
		}
	});
	
	
	
	
	// SILLY LINKS
	$('a').each(function() {
		$(this).mouseenter(function() {
			$(this).removeClass('color0').removeClass('color1').removeClass('color2').addClass('color'+Math.floor(Math.random()*3));
		});
	});
}