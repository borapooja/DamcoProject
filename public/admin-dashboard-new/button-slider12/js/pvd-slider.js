function convertHex(hex,opacity){
  hex = hex.replace('#','');
  r = parseInt(hex.substring(0,2), 16);
  g = parseInt(hex.substring(2,4), 16);
  b = parseInt(hex.substring(4,6), 16);

  result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
  return result;
}

$(document).ready(function() {

	$('.pmd-tabs').pmdTab();

	// single range slider with default tooltip open
	var offerButton =$('#custom'), pvdSlider=$('#pvd-slider'),
		sliderBorderSize = document.getElementById('slider-border-size'), 
		sliderBorderRadius=document.getElementById('slider-border-radius'),
		paddingVertical = document.getElementById('padding-vertical'), 
		paddingHorizontal = document.getElementById('padding-horizontal'), 
		borderSize = document.getElementById('border-size'), 
		borderRadius=document.getElementById('border-radius'),
		fontSize= document.getElementById('font-size');
		sliderOpacity= document.getElementById('slider-opacity');
	
	var lang  = $.trim($( ".change-slider-lang" ).val());
    var token = $("input[name=_token]").val();
    var type = $("#slider_type").val();
    var display_on = $(".display-on").val();
    if(type == 2){
    	var group = $.trim($( ".group-name option:selected" ).val());
    	var hotel = '';
    } else {
    	var group = '';
    	var hotel = $.trim($( ".hotel-name option:selected" ).val());
    }
    var action = '/backend/get-slider-detail';
    if(role == 'backend/subadmin') {
    	action = '/backend/subadmin/get-slider-detail';
    }
    if ( lang && (hotel || group ) && type) {
        $.ajax({
            'url': action,
            'type': 'post',
            'data': { 'lang': lang, 'hotel': hotel, 'group': group, 'type': type, 'display_on':display_on, '_token': token},
            'success': function( response ) {
            	if ( response != 'null') {
	            	response = jQuery.parseJSON( response );
	            	$('#button-label').val( response.button_label );
	            	$('#button-title').val( response.button_title );
	            	$('#slider-label').val( response.header_label );
	            	offerButton.attr('title', response.button_title );
	            	offerButton.html( response.button_label );
	            	if (response.header_label) pvdSlider.find( "h3" ).text( response.header_label );
	            	else pvdSlider.find( "h3" ).text('');
					var text = response.description;
					text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
					pvdSlider.find( "p" ).html(text);
					$('#slider-explanation').html( text );
					$('#htmloutput').val($('#getContext').html());
	          	}
            }
        });
    }
    
	// $( "#code" ).click(function() {
	// 	var apiKey=$('#api-key').val();
	// 	if(!apiKey) {
		
	// 	}
	// 	else {
	// 		$('#htmloutput').val('<script src="http://privatedeal.com/apps/slider-button/embed/?key='+ apiKey +' async></script>');
	// 		$('#htmloutput').css('display','block');
	// 	}
	// 	document.execCommand('copy');
	// });

	/*set basic styles*/
	offerButton.css({
		'display': 'inline-block',
		'text-align': 'center',
		'white-space': 'nowrap',
		'vertical-align': 'vertical-align',
		// 'background-color' : '#fff'
	});

	function refreshOutput () {
		$('#htmloutput').val($('#getContext').html());
	};
	
	// $('#apikey').bind("change paste keyup blur", function() {
	// 	offerButton.attr('href', $(this).val());
	// 	$('#htmloutput').val($('#getContext').html());
	// });


	/*SLIDER*/
	/*1 _ SLIDER POSITION*/
    $('input[type=radio][name=slide-hor-pos]').change(function() {
		pvdSlider.removeClass("left right center");
		pvdSlider.addClass($(this).val());
/*
		if($(this).val()=='center') {
			$('#slide-ver-middle').prop('disabled', true);
		}
		else {
			$('#slide-ver-middle').prop('disabled', false);
		}
*/
		$('#htmloutput').val($('#getContext').html());
    });

    $('input[type=radio][name=slide-ver-pos]').change(function() {
		pvdSlider.removeClass("top middle bottom");
		pvdSlider.addClass($(this).val());
		$('#htmloutput').val($('#getContext').html());
    });


	$('#slider-label').bind("change paste keyup blur", function() {
		pvdSlider.find( "h3" ).text($(this).val());
		$('#htmloutput').val($('#getContext').html());
	});

	$('#slider-explanation').bind("change paste keyup blur", function() {
		var text =$(this).val();
		text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
		pvdSlider.find( "p" ).html(text);
		$('#htmloutput').val($('#getContext').html());
	});

	 $('input[type=radio][name=slider_font]').change(function() {
		$('#pvd-container').css("font-family", $(this).val());
    });

	noUiSlider.create(sliderBorderSize, {
		start: [ 0 ],
		connect: 'lower',
		format: wNumb({
			decimals: 0,
			postfix: 'px',
		}),
		tooltips: [wNumb({ decimals: 0, postfix:'px' }) ],
		range: {
			'min': [ 0 ],
			'max': [ 10 ]
		}
	});

	sliderBorderSize.noUiSlider.on('update', function( values, handle ) {
		pvdSlider.css('border', values + ' solid '+ $('#slider-border-color').val());
		$('#slider-border').val(values);
		$('#htmloutput').val($('#getContext').html());

	});

	noUiSlider.create(sliderBorderRadius, {
		start: [ 0 ],
		connect: 'lower',
		format: wNumb({
			decimals: 0,
			postfix: 'px',
		}),
		tooltips: [wNumb({ decimals: 0, postfix:'px' }) ],
		range: {
			'min': [ 0 ],
			'max': [ 100 ]
		}
	});
	sliderBorderRadius.noUiSlider.on('update', function( values, handle ) {
		pvdSlider.css('border-radius', values);
		$('#slider-button-rad').val(values);
		$('#htmloutput').val($('#getContext').html());
	});


	$('.hotel-name').on('change', function () {
        var hotelname = $.trim($(this).children("option:selected").text());
    	
        hotelname = hotelname.split(' ').join('').toLowerCase();
        if (hotelname == 'selecthotel') { hotelname = ''; }

        if (location.protocol == 'http:') var protocol = 'http://';
        else var protocol = 'https://';
        
        hotelname = hotelname.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        
        hotelname = protocol + hotelname + WB_DOMAIN;
    	
		offerButton.attr('href', hotelname);
		$('#htmloutput').val($('#getContext').html());
    });

    $('.group-name').on('change', function () {
        var hotelname = $.trim($(this).children("option:selected").text());
    	
        hotelname = hotelname.split(' ').join('').toLowerCase();
        if (hotelname == 'selecthotel') { hotelname = ''; }

        if (location.protocol == 'http:') var protocol = 'http://';
        else var protocol = 'https://';
        
        hotelname = hotelname.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        
    	$('.hotel-url').val(hotelname + WB_DOMAIN);
        hotelname = protocol + hotelname + WB_DOMAIN;
		offerButton.attr('href', hotelname);
		$('#htmloutput').val($('#getContext').html());
    });
    
	/*BUTTON*/
	$('#button-title').bind("change paste keyup blur", function() {
		offerButton.attr('title', $(this).val());
		$('#htmloutput').val($('#getContext').html());
	});

	$("#button-label").bind("change paste keyup blur", function() {
		offerButton.html($(this).val());
		$('#htmloutput').val($('#getContext').html());
	});
	$("#button-class").bind("change paste blur", function() {
		offerButton.attr('class', '');
		offerButton.addClass($(this).val());
		$('#htmloutput').val($('#getContext').html());
	});

	$(document).on('change', '.change-slider-lang', function() {
	    var current = $(this);
	    var lang  = current.val();
	    var type = $("#slider_type").val();
    	var display_on = $(".display-on").val();
	    if(type == 2){
	    	var group = $.trim($( ".group-name option:selected" ).val());
	    	var hotel = '';
	    } else {
	    	var group = '';
	    	var hotel = $.trim($( ".hotel-name option:selected" ).val());
	    }
	    $('.custom-radio-btns').hide();
	    var token = $("input[name=_token]").val();
	    var action = '/backend/get-slider-detail';
	    if(role == 'backend/subadmin') {
	    	action = '/backend/subadmin/get-slider-detail';
	    }
	    
	    if ( lang && (hotel || group ) && type) {
	        $.ajax({
	            'url': action,
	            'type': 'post',
	            'data': { 'lang': lang, 'hotel': hotel, 'group': group, 'type': type, 'display_on':display_on, '_token': token},
	            'success': function( response ) {
	            	if ( response != 'null')
		            {
		            	response = jQuery.parseJSON( response );
		            	// console.log(response);
		            	$('#button-label').val( response.button_label );
		            	$('#button-title').val( response.button_title );
		            	$('#slider-label').val( response.header_label );
		            	$('#font_value').val( response.font );
		            	$('#font').html( response.font );
		            	$('.custom-radio-btns').show();
		            	
		            	offerButton.attr('title', response.button_title );
		            	offerButton.html( response.button_label );
		            	if (response.header_label) pvdSlider.find( "h3" ).text( response.header_label );
		            	else pvdSlider.find( "h3" ).text('');
						var text = response.description;
						text = text.replace(/(?:\r\n|\r|\n)/g, '<br />');
						pvdSlider.find( "p" ).html(text);

						$('#slider-explanation').html( text );

						$('#htmloutput').val($('#getContext').html());
		          	}
	            }
	        });
	    }
	});

	noUiSlider.create(paddingVertical, {
		start: [ 5 ],
		connect: 'lower',
		format: wNumb({
			decimals: 0,
			postfix: 'px',
		}),
		tooltips: [wNumb({ decimals: 0, postfix:'px' }) ],
		range: {
			'min': [ 0 ],
			'max': [ 50 ]
		}
	});
	
	if (attributes) { paddingVertical.noUiSlider.set( attributes.btn_left_padding ); }
	
	paddingVertical.noUiSlider.on('update', function( values, handle ) {
		offerButton.css({'padding-left': values, 'padding-right': values});
		$('#button-padding-hor').val(values);
		$('#btn-left-padding').val(values);
		$('#htmloutput').val($('#getContext').html());
	});

	noUiSlider.create(paddingHorizontal, {
		start: [ 5 ],
		connect: 'lower',
		format: wNumb({
			decimals: 0,
			postfix: 'px',
		}),
		tooltips: [wNumb({ decimals: 0, postfix:'px' }) ],
		range: {
			'min': [ 0 ],
			'max': [ 50 ]
		}
	});

	if (attributes) { paddingHorizontal.noUiSlider.set( attributes.btn_top_padding ); }

	paddingHorizontal.noUiSlider.on('update', function( values, handle ) {
		offerButton.css({'padding-top': values, 'padding-bottom': values});
		$('#button-padding-ver').val(values);
		$('#btn-top-padding').val(values);
		$('#htmloutput').val($('#getContext').html());
	});


	noUiSlider.create(borderSize, {
		start: [ 1 ],
		connect: 'lower',
		format: wNumb({
			decimals: 0,
			postfix: 'px',
		}),
		tooltips: [wNumb({ decimals: 0, postfix:'px' }) ],
		range: {
			'min': [ 0 ],
			'max': [ 10 ]
		}
	});

	if (attributes) { borderSize.noUiSlider.set( attributes.btn_border_width ); }

	borderSize.noUiSlider.on('update', function( values, handle ) {
		offerButton.css('border', values + ' solid '+ $('#border-color').val());
		$('#button-border').val(values);
		$('#btn-border-width').val(values);
		$('#htmloutput').val($('#getContext').html());
	});



	noUiSlider.create(borderRadius, {
		start: [ 1 ],
		connect: 'lower',
		format: wNumb({
			decimals: 0,
			postfix: 'px',
		}),
		tooltips: [wNumb({ decimals: 0, postfix:'px' }) ],
		range: {
			'min': [ 0 ],
			'max': [ 100 ]
		}
	});

	if (attributes) { borderRadius.noUiSlider.set( attributes.btn_border_radius ); }

	borderRadius.noUiSlider.on('update', function( values, handle ) {
		offerButton.css('border-radius', values);
		$('#btn-border-radius').val(values);
		$('#button-border-rad').val(values);
		$('#htmloutput').val($('#getContext').html());
	});

	noUiSlider.create(sliderOpacity, {
		start: 1.0,
		step: 0.1,
		connect: 'lower',
		format: wNumb({
			decimals: 1,
			// postfix: 'px',
		}),
		tooltips: [wNumb({ decimals: 1 }) ],
		range: {
			'min': 0,
			'max': 1.0
		}
	});

	if (attributes) { sliderOpacity.noUiSlider.set( attributes.slider_body_opacity ); }

	sliderOpacity.noUiSlider.on('update', function( values, handle ) {
		
		var hex = convertHex($('#slider-background-color').val(),values*100);
		$('#pvd-slider').css('background-color', hex);

		$('#slider-body-opacity').val(values);
		$('#htmloutput').val($('#getContext').html());
	});

	noUiSlider.create(fontSize, {
		start: [ 14 ],
		connect: 'lower',
		format: wNumb({
			decimals: 0,
			postfix: 'px',
		}),
		tooltips: [wNumb({ decimals: 0, postfix:'px' }) ],
		range: {
			'min': [ 0 ],
			'max': [ 100]
		}
	});

	if (attributes) { fontSize.noUiSlider.set( attributes.btn_font_size ); }

	fontSize.noUiSlider.on('update', function( values, handle ) {
		offerButton.css('font-size', values);
		$('#button-font-size').val(values);
		$('#btn-font-size').val(values);
		$('#htmloutput').val($('#getContext').html());
	});

    rotate = 0;
    executed = false;
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    function getDocHeight() {
        var D = document;
        return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight);
    }
    $('.color-picker').colorPicker(input = {
        customBG: '#F4EFE1',
        margin: '4px -2px 0',
        doRender: 'div div',
        opacity: false,
        buildCallback: function($elm) {
            var colorInstance = this.color, colorPicker = this;
            $elm.prepend('<div class="cp-panel">' + '<div class="col-val">R</div> <input type="text" class="cp-r" /><br>' + '<div class="col-val">G</div> <input type="text" class="cp-g" /><br>' + '<div class="col-val">B</div> <input type="text" class="cp-b" /><hr>' + '<div class="col-val">#</div> <input type="text" class="cp-HEX" />' + '</div>').on('change', 'input', function(e) {
                var value = this.value, className = this.className, type = className.split('-')[1], color = {};
                
                color[type] = value;
                if (type == 'HEX') {
                    color[type] = color[type].replace(/^#/, '');
                    var regExpHex = new RegExp(/^[0-9A-F]{1,6}$/i);
                    if (!regExpHex.test(color[type])) {
                        color[type] = '000000';
                        value = '000000';
                    }
                } else if (type == 'r' || type == 'g' || type == 'b') {
                    if (isNaN(color[type])) {
                        color[type] = '0';
                    }
                } else {}
                colorInstance.setColor(type === 'HEX' ? value : color, type === 'HEX' ? 'HEX' : /(?:r|g|b)/.test(type) ? 'rgb' : 'hsv');
                colorPicker.render();
                this.blur();
            });
        },
        /*
        positionCallback: function($elm) {
            var _$UI = this.$UI, position = $elm.offset(), $window = $(window), gap = this.color.options.gap;
            topAmount = 162;
            uiMargin = 20;
            leftAmount = $elm.outerWidth() - 45;
            if ($elm[0].id == 'color2') {
                topAmount = 0;
                leftAmount =- 310;
                leftAmount -= uiMargin;
                this.$UI[0].classList.add('cp2');
            } else if (this.$UI[0].classList.contains('cp2')) {
                this.$UI[0].classList.remove('cp2');
            }
            return {
                'left': (_$UI._left = position.left + leftAmount) - ((_$UI._left += _$UI._width - ($window.scrollLeft() + $window.width())) + gap > 0 ? _$UI._left + gap : 0),
                'top': (_$UI._top = position.top - topAmount) - ((_$UI._top += _$UI._height - ($window.scrollTop() + $window.height())) + gap > 0 ? _$UI._top + gap : 0)
            }
        },
        */
        cssAddon: '.cp-color-picker{box-sizing:border-box; width:310px;background-color:#323E3E;overflow:visible;z-index:999;border:0px solid #ccc;padding:12px 14px 8px;border-radius:5px;box-shadow: 14px 14px 14px 1px rgba(00,00,00,0.3);}' + '.cp-color-picker .cp-panel {line-height: 30px; float:right;' + 'padding:0px; margin-top:-1px; overflow:visible}' + '.cp-xy-slider:active {cursor:none;}' + '.cp-panel, .cp-panel input {color:#fbfbfb; font-size:14px;}' + '.cp-panel input {width:80px; height:30px; padding:0;margin-bottom:5px;' + 'text-align:center; line-height:12px; background:transparent;' + 'border:1px solid rgba(255,255,255,0.2);border-radius:0px}' + '.cp-panel .cp-HEX {width:80px; margin:5px 0px 0 0px;}' + '.col-val {display:inline-block;width:12px;margin-right:3px}' + '.cp-z-slider {height:138px;float:left;margin-left:0;margin-right:10px}' + '.cp-xy-slider {height:138px;width:138px;margin-right:6px;border:0px solid #ccc}' + '.cp-alpha {display:none}',
        forceAlpha: false,
        renderCallback: function($elm, toggled) {
            var colors = this.color.colors.RND, modes = {
                r: colors.rgb.r,
                g: colors.rgb.g,
                b: colors.rgb.b,
                HEX: this.color.colors.HEX
            };
            $('input', '.cp-panel').each(function() {
                this.value = modes[this.className.substr(3)];
            });
			// console.log($elm.attr('name'));
        	if($elm.attr('name')=='color') {
				$('#custom').css('color', '#'+this.color.colors.HEX);
        	}
        	else if ($elm.attr('name')=='background-color') {
				$('#custom').css('background-color', '#'+this.color.colors.HEX);
        	}
        	else if ($elm.attr('name')=='site-color') {
				$('#getContext').css('background-color', '#'+this.color.colors.HEX);
        	}
        	else if ($elm.attr('name')=='slider-border-color') {
				$('#pvd-slider').css('border', $('#slider-border').val() + ' solid '+ $('#slider-border-color').val());
        	}

        	else if ($elm.attr('name')=='slider-header-color') {
				$('#pvd-offer').css('color', '#'+this.color.colors.HEX);
        	}
        	else if ($elm.attr('name')=='slider-header-background-color') {
				$('#pvd-offer').css('background-color', '#'+this.color.colors.HEX);
        	}

        	else if ($elm.attr('name')=='slider-color') {
				$('#pvd-explanation').css('color', '#'+this.color.colors.HEX);
				$('#pvd-explanation').find('h3').css('color', '#'+this.color.colors.HEX);
				$('#pvd-explanation').find('p').css('color', '#'+this.color.colors.HEX);
        	}
        	else if ($elm.attr('name')=='slider-background-color') {
				// $('#pvd-slider').css('background-color', '#'+this.color.colors.HEX);
				var value = $('#slider-body-opacity').val();
				var hex = convertHex('#'+this.color.colors.HEX,value*100);
				$('#pvd-slider').css('background-color', hex);
        	}
        	else  {
				$('#custom').css('border', $('#button-border').val() + ' solid '+ $('#border-color').val());
        	}

        }
    });
	
	if (attributes) {

		// $('#getContext').css('background-color', + attributes.site_color + ' !important');

		// $('#custom').css('background-color', + attributes.background_color + ' !important');
		// console.log(attributes.background_color);

		// $('#custom').css('color', + attributes.font_color );
		// $('#custom').css('background-color', + attributes.background_color );
		// $('#custom').css('border', ' solid ' + attributes.border_color );

		// $('#pvd-offer').css('color', + attributes.slider_header_color );
		// $('#pvd-offer').css('background-color', + attributes.slider_header_background_color );

		// $('#pvd-explanation').css('color', + attributes.slider_color );
		// $('#pvd-explanation').find('h3').css('color', + attributes.slider_color );
		// $('#pvd-explanation').find('p').css('color', + attributes.slider_color );

		// $('#pvd-slider').css('background-color', + attributes.slider_background_color );
	}

	var request;


	$( "#save" ).click(function() {
		var type = $("#slider_type").val();
	    if(type == 2){
	    	var apiKey = $.trim($( ".group-name option:selected" ).text());
	    } else {
	    	//var apiKey = $.trim($( ".hotel-name option:selected" ).text());
	    	var apiKey = $.trim($( "#wb_url" ).val());
	    }
		apiKey = apiKey.split(' ').join('').toLowerCase();
		var lang = $.trim($( ".change-slider-lang option:selected" ).val());

		if (apiKey == 'selecthotel') { apiKey = ''; }
		if (apiKey == 'selectgroup') { apiKey = ''; }
		if( ! apiKey ) return false;

		if( ! lang ) return false;
		
		var protocol = domain = '';

        if (location.protocol == 'http:') protocol = 'http://';
        else protocol = 'https://';

        var res = WB_DOMAIN.charAt(0);

        if (res == '.') { res = WB_DOMAIN.substring(1); }
        
    	domain = protocol + res;
    	
    	apiKey = apiKey.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    	
		$('#htmloutput').val('<script src="'+domain+'/slider-button/'+lang+'/'+ apiKey +'" async></script>');
		$('#htmloutput').css('display','block');

		document.execCommand('copy');
	});

	$("#frm-save").submit(function(event){
		// event.preventDefault();
		$('#htmloutput').val($('#getContext').html());
	});

	// Bind to the submit event of our form
	// $("#frm-save").submit(function(event){

	// 	// Prevent default posting of form - put here to work in case of errors
	// 	event.preventDefault();

	// 	// Abort any pending request
	// 	if (request) {
	// 		request.abort();
	// 	}
	// 	// setup some local variables
	// 	var $form = $(this);

	// 	// Let's select and cache all the fields
	// 	var $inputs = $form.find("input, select, button, textarea");

	// 	// Serialize the data in the form
	// 	var data = $form.serialize();

	// 	// Let's disable the inputs for the duration of the Ajax request.
	// 	// Note: we disable elements AFTER the form data has been serialized.
	// 	// Disabled form elements will not be serialized.
	// 	$inputs.prop("disabled", true);

	// 	// Fire off the request to /form.php
	// 	request = $.ajax({
	// 		url: "save.php",
	// 		type: "post",
	// 		data: data
	// 	});

	// 	// Callback handler that will be called on success
	// 	request.done(function (response, textStatus, jqXHR){
	// 		// Log a message to the console
	// 		var apiKey=$('#api-key').val();
	// 		if(!apiKey) {
		
	// 		}
	// 		else {
	// 			$('#htmloutput').val('<script src="http://privatedeal.com/apps/slider-button/embed/?key='+ apiKey +' async></script>');
	// 			$('#htmloutput').css('display','block');
	// 		}
	// 		document.execCommand('copy');
	// 	});

	// 	// Callback handler that will be called on failure
	// 	request.fail(function (jqXHR, textStatus, errorThrown){
	// 		// Log the error to the console
	// 		console.error(
	// 			"The following error occurred: "+
	// 			textStatus, errorThrown
	// 		);
	// 	});

	// 	// Callback handler that will be called regardless
	// 	// if the request failed or succeeded
	// 	request.always(function () {
	// 		// Reenable the inputs
	// 		$inputs.prop("disabled", false);
	// 	});

	// });
	
});

