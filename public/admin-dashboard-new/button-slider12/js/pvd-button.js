$(document).ready(function() {

	// single range slider with default tooltip open
	var offerButton =$('#custom'), 
		paddingVertical = document.getElementById('padding-vertical'), 
		paddingHorizontal = document.getElementById('padding-horizontal'), 
		borderSize = document.getElementById('border-size'), 
		borderRadius=document.getElementById('border-radius'),
		fontSize= document.getElementById('font-size');

	$( "#code" ).click(function() {
		$('#htmloutput').css('display','block');
		$('#htmloutput').val($('#getContext').html()).select();
		document.execCommand('copy');
	});

	/*set basic styles*/
	offerButton.css({
		'display': 'inline-block',
		'text-align': 'center',
		'white-space': 'nowrap',
		'vertical-align': 'vertical-align',
		'background-color' : '#fff'
	});

	function refreshOutput () {
		$('#htmloutput').val($('#getContext').html());
	};
	
	// $('#apikey').bind("change paste keyup blur", function() {
	// 	offerButton.attr('href', $(this).val());
	// 	$('#htmloutput').val($('#getContext').html());
	// });

	$('.hotel-name').on('change', function () {
		
        var hotelname = $.trim($(this).children("option:selected").text());
    	
        hotelname = hotelname.split(' ').join('').toLowerCase();

        if (hotelname == 'selecthotel') { hotelname = ''; }

        if (location.protocol == 'http:') var protocol = 'http://';
        else var protocol = 'https://';
        
        hotelname = hotelname.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        
        hotelname = protocol + hotelname + WB_DOMAIN;
    	
		offerButton.attr('href', hotelname);
		offerButton.attr('target', '_blank');
		$('#htmloutput').val($('#getContext').html());
    });

	$('#button-title').bind("change paste keyup blur", function() {
		offerButton.attr('title', $(this).val());
		$('#htmloutput').val($('#getContext').html());
	});
	
/*
		

*/
	$("#button-label").bind("change paste keyup blur", function() {
		offerButton.html($(this).val());
		$('#htmloutput').val($('#getContext').html());
	});
	$("#button-class").bind("change paste blur", function() {
		offerButton.attr('class', '');
		offerButton.addClass($(this).val());
		$('#htmloutput').val($('#getContext').html());
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
		$('#btn-top-padding').val(values);
		console.log(values)
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
		$('#button-border').value=values;
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
		$('#htmloutput').val($('#getContext').html());
		$('#btn-font-size').val(values);
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
			console.log(this.color.colors.HEX);
        	if($elm.attr('name')=='color') {
				$('#custom').css('color', '#'+this.color.colors.HEX);
        	}
        	else if ($elm.attr('name')=='background-color') {
				$('#custom').css('background-color', '#'+this.color.colors.HEX);
        	}
        	else  {
				$('#custom').css('border', $('#button-border').val() + ' solid '+ $('#border-color').val());
        	}

        }
    });
	
	if (attributes) {
		$('#custom').css('color', attributes.font_color );
		$('#custom').css('background-color', attributes.background_color );
		// $('#custom').css('border', ' solid ' + attributes.border_color );
	}
		
});

