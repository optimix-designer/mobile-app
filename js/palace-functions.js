/* Copyright AurelienD http://themeforest.net/user/AurelienD?ref=AurelienD */

var slider_img_src = new Array();
var header_img_src = '';

function resize_image(img, url, hh) {
	// widths: 2048, 1440, 1024, 768, 512, 320
	var ww = $(window).width();
	if (ww <= 320) {
		ww = 320;
	} else if (ww <= 512) {
		ww = 512;
	} else if (ww <= 768) {
		ww = 768;
	} else if (ww <= 1024) {
		ww = 1024;
	} else if (ww <= 1440) {
		ww = 1440;
	} else {
		ww = 2048;
	}
	img.css('backgroundSize', ww + 'px ' + hh + 'px');
	if (window.devicePixelRatio >= 2) {
		ww = ww * 2;
		hh = hh * 2;
    }
	img.css('backgroundImage', 'url(timthumb/timthumb.php?src=' + url + '&h=' + hh + '&w=' + ww + ')');
}

function resize_slider_images() {
	var	i = 0;
	$('.slide').each(function() {
		resize_image($(this), slider_img_src[i], 400); 
		i++;
	});
}

function resize_header_image() {
	resize_image($('#header-img div'), header_img_src, 275);
}

function launch_resize_images(page) {
	var time_out = null;
	$(window).resize(function() {
		if (time_out != null) {
			clearTimeout(time_out);
		}
		if (page == 'home') {
			time_out = setTimeout(resize_slider_images, 500);
		} else {
			time_out = setTimeout(resize_header_image, 500);
		}
	});
	window.onorientationchange = function(){
		if (page == 'home') {
			resize_slider_images();
		} else {
			resize_header_image();
		}
	}
}

function timthumb_slider_images() {
	var i = 0;
	$('.slide').each(function() {
		var bg = $(this).css('backgroundImage');
		bg = bg.replace(/"/g, '');
		bg = bg.replace(/'/g, '');
		slider_img_src[i] = bg.substr(4, bg.length - 11);
		i++;
	});
	launch_resize_images('home');
	resize_slider_images();
}

function timthumb_header_image() {
	header_img_src = $('#header-img div').css('backgroundImage');
	header_img_src = header_img_src.replace(/"/g, '');
	header_img_src = header_img_src.replace(/'/g, '');
	var l = header_img_src.length - 11;
	header_img_src = header_img_src.substr(4,l);
	launch_resize_images('inner_page');
	resize_header_image();
}
	
function navigation() {

	var nav_processing = false;
	var nav_expanded = false;
	var h = $('#nav-list').height() + 1;
	var t = 0 - h;
	var nh = h + 89;
	
	$('#nav-button').css({display: 'block'});
	$('#nav-arrow').css({display: 'block'});
	nav_plus();
	
	$('#nav-list li:last-child').addClass('nav-list-last-item');
	$('#nav-list').css({top: t + 'px'});
	$('#nav-button').click(function() {
		if (!nav_processing && !nav_expanded) {
			nav_processing = true;
			nav_expanded = true;
			if (!($.browser.msie && parseInt($.browser.version, 10) === 8)) {
				$('#nav-arrow').rotate({animateTo:180});
			}
			$('#nav-container').css({height: h});
			$('#bg-logo').css({borderBottomWidth: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0});
			$('#nav-list').animate({top: '0px'}, function() {
				nav_processing = false;
			});
			$('#navigation').animate({height: nh});
		}
		if (!nav_processing && nav_expanded) {
			nav_processing = true;
			nav_expanded = false;
			if (!($.browser.msie && parseInt($.browser.version, 10) === 8)) {
				$('#nav-arrow').rotate({animateTo:0});
			}
			$('#nav-list').animate({top: t}, function() {
				$('#nav-container').css({height: '0px'});
				$('#bg-logo').css({borderBottomWidth: '1px', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px'});
				nav_processing = false;
			});
			$('#navigation').animate({height: '89px'});
		}
		return false;
	});
}

function slider_populate_legend(e, pos) {
	$('#strip-legend').html($('.slide-legend').eq(pos).html());
}

function slider() {
	var header_slider = new Swipe(document.getElementById('header-slider'), {'speed': 1000, 'callback': slider_populate_legend/*, 'auto': 2000*/});
	
	$('#strip-legend').html($('.slide-legend:first-child').html());
	
	if (!($.browser.msie && parseInt($.browser.version, 10) === 8)) {
		$('#slider-button-right, #slider-button-left').css('display', 'block');
	}
	
	$('#slider-button-right').click(function() {
		header_slider.next();
		return false;
	});
	
	$('#slider-button-left').click(function() {
		header_slider.prev();
		return false;
	});
	
}

function gallery() {
	var photo_swipe = $('#gallery a').photoSwipe({ enableMouseWheel: false, captionAndToolbarAutoHideDelay: 7000 });
}
		
function set_datepicker() {

	function update_selects(dates) { 
		if (dates.length) {
			$('#select-check-in-day').val(dates[0].getDate()); 
			$('#select-check-in-month').val(dates[0].getMonth() + 1); 
			$('#select-check-in-year').val(dates[0].getFullYear()); 
		}
		$('#datepick-wrapper').fadeOut();
		$('#button-show-calendar').css({display: 'block'});
		$('#button-hide-calendar').css({display: 'none'});
	} 
	
	$('#select-check-in-day, #select-check-in-month, #select-check-in-year').change(function() { 
		$('#datepick-wrapper').datepick('setDate', new Date($('#select-check-in-year').val(), $('#select-check-in-month').val() - 1, $('#select-check-in-day').val())); 
	});
	
	var datepick_options = { 
		pickerClass: 'datepick-width-100p',
		changeMonth: false,
		firstDay: 1,
		minDate: 0,
		prevText: ' ',
		nextText: ' ', 
		commandsAsDateFormat: true,
		dateFormat: 'dd/mm/yyyy',
		prevStatus: '',
		nextStatus: '',
		onSelect: update_selects
	};
	
	$('#datepick-wrapper').datepick(datepick_options);
	
	$('#button-show-calendar').click(function() {
		$('#datepick-wrapper').fadeIn();
		$('#button-hide-calendar').css({display: 'block'});
		$(this).css({display: 'none'});
		return false;
	});
	
	$('#button-hide-calendar').click(function() {
		$('#datepick-wrapper').fadeOut();
		$('#button-show-calendar').css({display: 'block'});
		$(this).css({display: 'none'});
		return false;
	});
}

function validation() {

	function befSub() {
		$('#submit-result').html('');
		$('input').blur();
		$('input[type="submit"]').attr('disabled', 'true');
		$('.ajax-loader').css({display: 'block'});
	}

	function aftSub() {
		$('.ajax-loader').css({display: 'none'});
		$('input[type="submit"]').removeAttr('disabled');
		$('#form-contact, #form-reservation').hide('slow', function() {
			$('#submit-result').show('slow');
		});
	}
	
	$('#form-reservation').validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		errorPlacement: function(error, element) {
			error.insertAfter(element.parent('p').find('label'));
		},
		submitHandler: function(form) {
			var d = new Date($('#select-check-in-year').val(), $('#select-check-in-month').val() - 1, $('#select-check-in-day').val());
			var td = new Date();
			if (d < td) {
				alert('Your check-in date can not be before today!');
			} else {
				$(form).ajaxSubmit({target: '#submit-result', beforeSubmit: befSub, success: aftSub});
			}
		}
	});

	$('#form-contact').validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		errorPlacement: function(error, element) {
			error.insertAfter(element.parent('p').find('label'));
		},
		submitHandler: function(form) {
			$(form).ajaxSubmit({target: '#submit-result', beforeSubmit: befSub, success: aftSub});
		}
	});
}

function map() {

	var your_location = new google.maps.LatLng(48.857798, 2.295241);
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	var mapOptions = {
		center: your_location,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var marker = new google.maps.Marker({
		position: your_location,
		map: map
	});
	
	directionsDisplay.setMap(map);
	
	function getDirections(start) {
		var DIR_STATUS_MSG = new Array();
		DIR_STATUS_MSG[google.maps.DirectionsStatus.INVALID_REQUEST] = "The DirectionsRequest provided was invalid.";
		DIR_STATUS_MSG[google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED] = "Too many DirectionsWaypoints were provided in the DirectionsRequest. The total allowed waypoints is 8, plus the origin and destination.";
		DIR_STATUS_MSG[google.maps.DirectionsStatus.NOT_FOUND] = "The address could not be geocoded.";
		DIR_STATUS_MSG[google.maps.DirectionsStatus.OK] = "The response contains a valid DirectionsResult.";
		DIR_STATUS_MSG[google.maps.DirectionsStatus.OVER_QUERY_LIMIT] = "The webpage has gone over the requests limit in too short a period of time.";
		DIR_STATUS_MSG[google.maps.DirectionsStatus.REQUEST_DENIED] = "The webpage is not allowed to use the directions service.";
		DIR_STATUS_MSG[google.maps.DirectionsStatus.UNKNOWN_ERROR] = "A directions request could not be processed due to a server error. The request may succeed if you try again.";
		DIR_STATUS_MSG[google.maps.DirectionsStatus.ZERO_RESULTS] = "No route could be found between the origin and destination.";
		var request = {
			origin: start,
			destination: your_location,
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(result);
				marker.setMap(null);
			} else {
				alert(DIR_STATUS_MSG[status]);
			}
		});
	}
	
	$('#button-get-directions').click(function() {
		getDirections($('#input-address').val());
		return false;
	});
	
	$('#button-get-directions-current').click(function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				var current_location = new google.maps.LatLng(
					position.coords.latitude,
					position.coords.longitude
				);
				getDirections(current_location);
			});
		} else {
			alert('Geolocation is not supported.');
		}
		return false;
	});
	
	$(window).unload(function() { 
		GUnload(); 
	});
}

(function(doc) {

	var addEvent = 'addEventListener',
	    type = 'gesturestart',
	    qsa = 'querySelectorAll',
	    scales = [1, 1],
	    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}

	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [.25, 1.6];
		doc[addEvent](type, fix, true);
	}

}(document));

function demo() {
	
	var c1 = '', c1b = '', c2 = '', c3 = '', c4 = '';
	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function change_color(c) {
		c1 = 'button-' + c;
		c4 = 'list-bullets-' + c;
		if (c == 'blue') {
			c2 = '#486876';
			c3 = '#35bbc4';
		}
		if (c == 'cyan') {
			c2 = '#35bbc4';
			c3 = '#486876';
		}
		if (c == 'green') {
			c2 = '#57972e';
			c3 = '#ff8422';
		}
		if (c == 'grey') {
			c2 = '#717171';
			c3 = '#222';
		}
		if (c == 'orange') {
			c2 = '#ff8422';
			c3 = '#901523';
		}
		if (c == 'purple') {
			c2 = '#664876';
			c3 = '#486876';
		}
		if (c == 'red') {
			c2 = '#901523';
			c3 = '#ff8422';
		}
		if ($('.button').length > 0) {
			c1b = c1;
			if ($('.button:first').attr('class').indexOf('width-half') >= 0) {
				c1b = c1 + ' width-half';
			}
		}
		$('.button').each(function() {
			c1b = c1;
			if ($(this).attr('class').indexOf('width-half') >= 0) {
				c1b = c1b + ' width-half';
			}
			if ($(this).attr('class').indexOf('palace-input-submit') >= 0) {
				c1b = c1b + ' palace-input-submit';
			}
			$(this).attr('class','button ' + c1b);
		});
		$('.button-big').attr('class','button-big ' + c1);
		$('.list-bullets').attr('class','list-bullets ' + c4);
		$('.list-alternate').attr('class','list-alternate ' + c4);
		$('a.demo-link').css('color', c2);
		$('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a').hover(function() {
			$(this).css('color', c2);
		}, function() {
			$(this).css('color', '#333');
		});
		$('a.demo-link').hover(function() {
			$(this).css('color', c3);
		}, function() {
			$(this).css('color', c2);
		});
	}
	
	$('#button-settings-1').click(function() {
		$('#panel-settings-1').fadeToggle();
		return false;
	});
	
	$('#button-settings-2').click(function() {
		$('#panel-settings-2').fadeToggle();
		return false;
	});
	
	if (document.cookie) {
		var coo = readCookie('pm');
		if (coo != null) {
			change_color(coo);
		}
    } 
	
	$('.color-setting').click(function() {
		var c = $(this).attr('class');
		var re = new RegExp("demo-.*","");
		var s = c.match(re);
		var col = s[0].replace('demo-','');
		document.cookie = 'pm=' + col;
		change_color(col);
		return false;
	});
}
