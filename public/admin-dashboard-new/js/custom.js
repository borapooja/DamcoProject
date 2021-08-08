
/********************* Jquery Steps Js *********************/
   
    errObj = messages[locale].hotel_err;
    var form = $("#example-advanced-form").show();

    if (typeof bidding_button === 'undefined') bidding_button = 0;

    form.steps({
      headerTag: "h3",
      bodyTag: "fieldset",
      transitionEffect: "fade",
      labels: {
          finish: finishButton,
          next: nextButton,
          previous: previousButton,
          loading: "Loading ..."
      },
      onInit: function (event, current) {
          $('.actions > ul > li:first-child').attr('style', 'display:none');
      },
      onStepChanging: function (event, currentIndex, newIndex)
      {
        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex)
        {
          return true;
        }
        
        // Forbid next action on "Warning" step if the user is to young
        if (newIndex === 3 && Number($("#age-2").val()) < 18)
        {
          return false;
        }
        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex)
        {
          // To remove error styles
          form.find(".body:eq(" + newIndex + ") label.error").remove();
          form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
        }
        form.validate().settings.ignore = ":disabled,:hidden";

        $('.val-room-status-msg').html('');
        return form.valid();
      },
      onStepChanged: function (event, currentIndex, priorIndex)
      {
        if (currentIndex > 0) {
            $('.actions > ul > li:first-child').attr('style', '');
        } else {
            $('.actions > ul > li:first-child').attr('style', 'display:none');
        }
        // Used to skip the "Warning" step if the user is old enough.
        if (currentIndex === 2 && ( $("input[name='bidding_button']:checked").val()==0 || ((role == 'hotel' || role == 'group')&& bidding_button == 0) ))
        {
          //form.steps('incomplete', 4);
          form.steps("setStep",4);
        }
        // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
        if (currentIndex === 3 && priorIndex === 4 && ( $("input[name='bidding_button']:checked").val()==0 || ((role == 'hotel' || role == 'group') && bidding_button == 0) ))
        {
          form.steps("setStep",1);
        }

        if ( $("input[name='bidding_button']:checked").val()==0 || ((role == 'hotel' || role == 'group') && bidding_button == 0) ) {
            $(".room_type_images").css( {"display": "none"} );
        }

      },
      onFinishing: function (event, currentIndex)
      {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
      },
      onFinished: function (event, currentIndex)
      {
          if($("input[name='bidding_button']:checked").val() == 0 || ((role == 'hotel' || role == 'group') && bidding_button == 0) ) {
            $("#example-advanced-form").submit();
            var button = $("#example-advanced-form").find('a[href="#finish"]');
            button.attr("href", '#finish-disabled');
            button.parent().addClass("disabled");

            //$("#example-advanced-form .actions a[href='#finish']").hide();
            return;
          }

          $('#room_type_image_error').html('');
          if($("input[name='room_status[]']:checked").length == 0){
              $('#room_type_image_error').html(errObj.room_type_image_error);
              return false;
          }else {
              var error = image = false;
              $("input[name='room_status[]']:checked").each(function(){
                  var current = $(this);
                  var current_ele_id = current.data('value');
                  var arr = $('[name="room_image['+current_ele_id+'][]"]');
                  var counter = 0;
                  arr.each(function() {
                      obj = $(this);
                      if ( obj.val() != '' ) {
                          var ext = obj.val().split('.').pop().toLowerCase();
                          if($.inArray(ext, ['bmp','png','jpg','jpeg']) == -1) {
                              image = true;
                          }
                          counter += 1;
                      }
                  });
                  if ( counter == 0 ) {
                      error = true;
                  }
              });
              
              if (error)  {
                  var edit_case = true;
                  $("input[name='room_status[]']:checked").each(function(){
                      var current = $(this);
                      var current_ele_id = current.data('value');
                      if ( $('#room_image_exist_' + current_ele_id ).val() != 1 ){
                          edit_case = false;
                      }
                  });
                  if (! edit_case) {
                      $('#room_type_image_error').html(errObj.room_wise_image_error);
                      return false;
                  }
              }
              if (image)  {
                  $('#room_type_image_error').html(errObj.valid_room_image_error);
                  return false;
              }
          }
          $("#example-advanced-form").submit();
          var button = $("#example-advanced-form").find('a[href="#finish"]');
            button.attr("href", '#finish-disabled');
            button.parent().addClass("disabled");
      }
    }).validate({
        errorPlacement: function errorPlacement(error, element) { 
          if (element.attr("name") == "room_status[]") {
              $('.val-room-status-msg').html(error.html());
          }
          else if (element.attr("name") == "primary_image") {
              var lastCheck = $('[name="'+element.attr("name")+'"]');
              error.insertAfter(lastCheck.parent().parent().parent());
          }
          else if (element.attr("type") == "checkbox") {
              var lastCheckBox = $('[name="'+element.attr("name")+'"]:last');
              error.insertAfter(lastCheckBox.closest('div'));
          }
          else {
              error.insertAfter(element); 
          }
        },
        rules: {
            hotel_name: {
              required: true,
              // alphaNumericWithSpace:true,
              maxlength: 255
            },
            number_of_total_rooms: {
              required: true,
              number: true,
            },
            /*website: {
              required: true,
            },*/
            number_of_stars: {
              required: true,
            },
            contact_person: {
              required: true,
              maxlength: 30
            },
            contact_number: {
              required: true,
              number: true,
              minlength:4,
              maxlength:15
            },
            email: {
              required: true,
              email: true
            },
            invoice_email: {
              required: true,
              email: true
            },
            country_id: {
              required: true,
            },
            address: {
              required: true,
            },
            city_id : {
              required: true,
              selectcheck:true
            },
            postal_code: {
              required: true
              //number: true
            },
            currency_code: {
              required: true
            },
            status: {
              required: true
            },
            nightuse_checkin: {
              required: true
            },
            nightuse_checkout: {
              required: true
            },
            dayuse_checkin: {
              required: false
            },
            dayuse_checkout: {
              required: false
            },
           /* city_tax: {
              required: true, number: true
            },*/
            vat:{
              required: function(element) {
                if(  $("input[name='is_vat']:checked").val() != 0){
                    return true;
                } else {
                  return false;
                }
              }
            },
             vat:{
              required: function(element) {
                if(  $("input[name='is_vat']:checked").val() != 0){
                    return true;
                } else {
                  return false;
                }
              }
            },
            city_tax:{
              required: function(element) {
                if(  $("input[name='is_city_tax']:checked").val() != 0){
                    return true;
                } else {
                  return false;
                }
              }
            },
            additional_tax:{
              required: function(element) {
                if(  $("input[name='is_additional_tax']:checked").val() != 0){
                    return true;
                } else {
                  return false;
                }
              }
            },
            /*vat: {
              required: true, number: true
            },*/
            booking_booster_email:{
              required: function(element) {
                if(  $("input[name='booking_booster']:checked").val() != 0){
                    return true;
                } else {
                  return false;
                }
              }
            },
            group_id:{
              required: function(element) {
                if(  $("input[name='is_group_hotel']:checked").val() != 0){
                    return true;
                } else {
                  return false;
                }
              }
            },
            "room_status[]": {
                required: function(element) {
                    if( ( $("input[name='bidding_button']:checked").val() != 0 && $("input[name='bidding_button']:checked").val() != undefined)  || ((role == 'hotel' || role == 'group') && bidding_button != 0) ) {
                      if( $("input[name='room_status[]']").length > 0) {
                          if($("input[name='room_status[]']:checked").length == 0){
                              return true;
                          }else {
                              return false;
                          }
                      } else {
                          return false;
                      }
                    } else {
                      return false;
                    }
                },
                checkRoomType: function(element) {
                    if( ( $("input[name='bidding_button']:checked").val() != 0 && $("input[name='bidding_button']:checked").val() != undefined) || ((role == 'hotel' || role == 'group') && bidding_button != 0) ) {
                      return true;
                    } else {
                      return false;
                    }
                }
            },
            "amenity_id[]": {
                required: function(element) {
                    if( ( $("input[name='bidding_button']:checked").val() != 0 && $("input[name='bidding_button']:checked").val() != undefined) || ((role == 'hotel' || role == 'group') && bidding_button != 0) ) {
                      if($("input[name='amenity_id[]']:checked").length == 0){
                          return true;
                      }else {
                          return false;
                      }
                    } else {
                      return false;
                    }
                }
            },
            primary_image: {
                required: function(element) {
                    if ($("#primary_image_exist").val() == 0){
                        return true;
                    } else {
                        return false;
                    }
                },
                minImageWidth: function(element) {
                    if ($("#primary_image_exist").val() == 0){
                        return 2048;
                    } else {
                        if ($("input[name='primary_image']").val() != ''){
                            return 2048;
                        } else {
                          return false;
                        }
                    }
                },
                minImageHeight: function(element) {
                    if ($("#primary_image_exist").val() == 0){
                        return 1536;
                    } else {
                        if ($("input[name='primary_image']").val() != ''){
                            return 1536;
                        } else {
                          return false;
                        }
                    }
                },
                ImageSize: function(element) {
                    if ($("#primary_image_exist").val() == 0){
                        return 2;
                    } else {
                        if ($("input[name='primary_image']").val() != ''){
                            return 2;
                        } else {
                          return false;
                        }
                    }
                },
                accept: "image/jpg,image/jpeg,image/png,image/bmp"
            }
        },
        messages: {
            hotel_name: {
              required: errObj.hotel_name.required,
              lettersonly: errObj.hotel_name.lettersonly,
              maxlength : errObj.hotel_name.maxlength
            },
            number_of_total_rooms: {
              required: errObj.number_of_total_rooms.required,
              number: errObj.number_of_total_rooms.number
            },  
            website: {
              required: errObj.website.required
            },
            number_of_stars: {
              required: errObj.number_of_stars.required
            },
            contact_person: {
              required: errObj.contact_person.required,
              lettersonly: errObj.contact_person.lettersonly,
              maxlength: errObj.contact_person.maxlength
            },
            contact_number: {
              required: errObj.contact_number.required,
              number: errObj.contact_number.number,
              minlength: errObj.contact_number.minlength,
              maxlength: errObj.contact_number.maxlength
            },
            email: {
              required: errObj.email.required,
              email: errObj.email.email
            },
            invoice_email: {
              required: errObj.email.required,
              email: errObj.email.email
            },
            country_id: {
              required: errObj.country_id.required
            },
            address: {
              required: errObj.address.required
            },
            city_id: {
              required: errObj.city_id.required,
              selectcheck: errObj.city_id.selectcheck
            },
            postal_code: {
              required: errObj.postal_code.required
              //number: errObj.postal_code.number
            },
            currency_code: {
              required: errObj.currency_code.required
            },
            status: {
              required: errObj.status.required
            },
            nightuse_checkin: {
              required: errObj.nightuse_checkin.required
            },
            nightuse_checkout: {
              required: errObj.nightuse_checkout.required
            },
            dayuse_checkin: {
              required: errObj.dayuse_checkin.required
            },
            dayuse_checkout: {
              required: errObj.dayuse_checkout.required
            },
            additional_tax: {
              required: errObj.additional_tax.required, 
              number: errObj.additional_tax.number
            },
            city_tax: {
              required: errObj.city_tax.required, 
              number: errObj.city_tax.number
            },
            vat: {
              required: errObj.vat.required, 
              number: errObj.vat.number
            },
            "room_status[]": {
              required: errObj.room_status.required,
              checkRoomType: errObj.room_status.checkRoomType
            },
            "amenity_id[]": {
              required: errObj.amenity_id.required
            },
            primary_image: {
              required: errObj.primary_image.required,
              minImageWidth: errObj.primary_image.minImageWidth,
              minImageHeight: errObj.primary_image.minImageHeight,
              error: errObj.primary_image.error,
              accept: errObj.primary_image.accept
            },
          booking_booster_email: {
              required: errObj.email.required,
              email: errObj.email.email
            },
          group_id: {
              required: errObj.group_id.required
          },
        }
    });
    
    
    function handleStep(){
        bidding_button = parseInt($.trim($("input[name='bidding_button']:checked").val()));
        if($("input[name='bidding_button']:checked").val() == 0 || ((role == 'hotel' || role == 'group') && bidding_button == 0) ) {
            $("#example-advanced-form-t-2, #example-advanced-form-t-3").hide();
            $(".room_type_images").hide();
        }
        else {
            $("#example-advanced-form-t-2, #example-advanced-form-t-3").show();
            $(".room_type_images").show();
        }
    }

    if($("input[name='bidding_button']:checked").val() == 0 || ((role == 'hotel' || role == 'group') && bidding_button == 0) ) {
        $("#example-advanced-form-t-2, #example-advanced-form-t-3").hide();
        $(".room_type_images").css( {"display": "none"} );
        // $(".room_type_images").hide();
    }

/********** Dropdown select text *********************/


$(".dropdown-menu li a").click(function(){
    var selText = $(this).text();
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});

/****** Toggle Div ***************/

/*$( ".dashboard-menu ul li" ).click( function () {
  var current = $(this);
  current.closest('.list-unstyled').find( '.toggle-dropdown' ).hide();
  current.find( '.toggle-dropdown' ).toggle();
});*/

/************** Rating Js ************************/


// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;

(function($, window) {
  var Starrr;

  Starrr = (function() {
    Starrr.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      change: function(e, value) {}
    };

    function Starrr($el, options) {
      var i, _, _ref,
        _this = this;

      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i) != null) {
          this.options[i] = this.$el.data(i);
        }
      }
      this.createStars();
      this.syncRating();
      this.$el.on('mouseover.starrr', 'span', function(e) {
        return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('mouseout.starrr', function() {
        return _this.syncRating();
      });
      this.$el.on('click.starrr', 'span', function(e) {
        return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('starrr:change', this.options.change);
    }

    Starrr.prototype.createStars = function() {
      var _i, _ref, _results;

      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
      }
      return _results;
    };

    Starrr.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrr:change', rating);
    };

    Starrr.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref;

      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
        }
      }
      if (rating && rating < 5) {
        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
        }
      }
      if (!rating) {
        return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
      }
    };

    return Starrr;

  })();
  return $.fn.extend({
    starrr: function() {
      var args, option;

      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;

        data = $(this).data('star-rating');
        if (!data) {
          $(this).data('star-rating', (data = new Starrr($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
    return $(".starrr").starrr();
});


/*
|---------------------------------------------------------------------------------------
| Admin Dashboard Custom JS
|---------------------------------------------------------------------------------------
|
*/

$(document).ready(function() {

  // Admin dashboard supplier condition ajax call
  $('.edit-data-set').click(function() {
      var current = $(this);
      current.hide();
      current.next().show();
      current.closest('.data-set').find('.commission-label span, .du-commission-label span, .nu-commission-label span, .du-wb-commission-label span, .nu-wb-commission-label span').hide();
      current.closest('.data-set').find('.commission-label input, .du-commission-label input, .nu-commission-label input, .du-wb-commission-label input, .nu-wb-commission-label input').show();
  });

  // Admin dashboard supplier condition ajax call
  $('.save-data-set').click(function() {

    var current = $(this);
    current.hide();
    current.next().show();
    var id = current.data('id');
    var action = $( '#formid-' + id ).prop('action');
    var token = $("input[name=_token]").val();

    var dataset = current.closest('.data-set');
    var commission = dataset.find('.commission-value').val();

    var du_commission = dataset.find('.du-commission').val();
    var nu_commission = dataset.find('.nu-commission').val();
    var du_wb_commission = dataset.find('.du-wb-commission').val();
    var nu_wb_commission = dataset.find('.nu-wb-commission').val();

    // console.log(commission, du_commission, nu_commission, du_wb_commission, nu_wb_commission);

    if ( du_commission && nu_commission || du_wb_commission && nu_wb_commission || commission ) 
    {
      if ( du_commission < 100 && nu_commission < 100 && du_wb_commission < 100 && nu_wb_commission < 100 || commission < 100 && id ) 
      {
        $.ajax({
          'url': action,
          'type': 'post',
          headers: {
              'Cache-Control': 'no-cache'
          },
          'data': {
                    'country_id': id, 
                    '_token': token, 
                    'commission': commission, 
                    'day_use_commission': du_commission, 
                    'night_use_commission': nu_commission, 
                    'day_use_wb_commission': du_wb_commission, 
                    'night_use_wb_commission': nu_wb_commission
                  },
          'success': function( response ) {

            // console.log(response);
            if ( response != 'null')
            {
              response = jQuery.parseJSON( response );
              current.hide();
              current.prev().show();

              var commission = response.commission ? response.commission : 0;
              dataset.find('.commission-label span').text('').append(response).show();
              dataset.find('.commission-label input').hide();

              var day_use_commission = response.day_use_commission ? response.day_use_commission : 0;
              dataset.find('.du-commission-label span').text('').append(day_use_commission).show();
              dataset.find('.du-commission-label input').hide();

              var night_use_commission = response.night_use_commission ? response.night_use_commission : 0;
              dataset.find('.nu-commission-label span').text('').append(night_use_commission).show();
              dataset.find('.nu-commission-label input').hide();

              var day_use_wb_commission = response.day_use_wb_commission ? response.day_use_wb_commission : 0;
              dataset.find('.du-wb-commission-label span').text('').append(day_use_wb_commission).show();
              dataset.find('.du-wb-commission-label input').hide();

              var night_use_wb_commission = response.night_use_wb_commission ? response.night_use_wb_commission : 0;
              dataset.find('.nu-wb-commission-label span').text('').append(night_use_wb_commission).show();
              dataset.find('.nu-wb-commission-label input').hide();

            } else {
              alert('Something went wrong.');
            }
          }
        })
      } else {
        alert('Please enter valid numbers in two digits.');
        current.show();
        current.prev().hide();
      }
    } else {
        current.hide();
        current.prev().show();
        current.closest('.data-set').find('.commission-label span, .du-commission-label span, .nu-commission-label span, .du-wb-commission-label span, .nu-wb-commission-label span').show();
        current.closest('.data-set').find('.commission-label input, .du-commission-label input, .nu-commission-label input, .du-wb-commission-label input, .nu-wb-commission-label input').hide();
    }
  });

  $('#save-hotel-data-set').click(function() {

    var current = $(this);
    current.hide();
    current.next().show();
    var id = current.data('id');
    var action = $( '#formid-' + id ).prop('action');
    var token = $("input[name=_token]").val();

    var dataset = current.closest('.data-set');
    var commission = dataset.find('.commission-value').val();

    var du_commission = dataset.find('.du-commission').val();
    var nu_commission = dataset.find('.nu-commission').val();
    var du_wb_commission = dataset.find('.du-wb-commission').val();
    var nu_wb_commission = dataset.find('.nu-wb-commission').val();

    // console.log(commission, du_commission, nu_commission, du_wb_commission, nu_wb_commission);

    if ( du_commission && nu_commission || du_wb_commission && nu_wb_commission || commission ) 
    {
      if ( du_commission < 100 && nu_commission < 100 && du_wb_commission < 100 && nu_wb_commission < 100 || commission < 100 && id ) 
      {
        $.ajax({
          'url': action,
          'type': 'post',
          headers: {
              'Cache-Control': 'no-cache'
          },
          'data': {
                    'hotel_id': id, 
                    '_token': token, 
                    'commission': commission, 
                    'day_use_commission': du_commission, 
                    'night_use_commission': nu_commission, 
                    'day_use_wb_commission': du_wb_commission, 
                    'night_use_wb_commission': nu_wb_commission
                  },
          'success': function( response ) {

            // console.log(response);
            if ( response != 'null')
            {
              response = jQuery.parseJSON( response );
              current.hide();
              current.prev().show();

              var commission = response.commission ? response.commission : 0;
              dataset.find('.commission-label span').text('').append(response).show();
              dataset.find('.commission-label input').hide();

              var day_use_commission = response.day_use_commission ? response.day_use_commission : 0;
              dataset.find('.du-commission-label span').text('').append(day_use_commission).show();
              dataset.find('.du-commission-label input').hide();

              var night_use_commission = response.night_use_commission ? response.night_use_commission : 0;
              dataset.find('.nu-commission-label span').text('').append(night_use_commission).show();
              dataset.find('.nu-commission-label input').hide();

              var day_use_wb_commission = response.day_use_wb_commission ? response.day_use_wb_commission : 0;
              dataset.find('.du-wb-commission-label span').text('').append(day_use_wb_commission).show();
              dataset.find('.du-wb-commission-label input').hide();

              var night_use_wb_commission = response.night_use_wb_commission ? response.night_use_wb_commission : 0;
              dataset.find('.nu-wb-commission-label span').text('').append(night_use_wb_commission).show();
              dataset.find('.nu-wb-commission-label input').hide();

            } else {
              alert('Something went wrong.');
            }
          }
        })
      } else {
        alert('Please enter valid numbers in two digits.');
        current.show();
        current.prev().hide();
      }
    } else {
        current.hide();
        current.prev().show();
        current.closest('.data-set').find('.commission-label span, .du-commission-label span, .nu-commission-label span, .du-wb-commission-label span, .nu-wb-commission-label span').show();
        current.closest('.data-set').find('.commission-label input, .du-commission-label input, .nu-commission-label input, .du-wb-commission-label input, .nu-wb-commission-label input').hide();
    }
  });
  // Admin dashboard supplier condition ajax call


  $('#language_id').click(function() {
      $.ajax({
          headers: {
              'Cache-Control': 'no-cache'
          },
          'url':'/language?language_code='+$('#language_id').val(),
          'type': 'get',        
          'success': function( response ) {
              window.location.reload();
          }
      })
  });

  // Search Form Submit
  $('#search-city, #search-country, #platform-type ').change(function(){
      search_sort.submit();
  });


  // toggling listing menu
  if ( $('.toggle-dropdown').hasClass('drop-pop-in') ) {
      $('.drop-pop-in').show();
  }


    /************** Upload Image with Preview *****************************/
    /*
        var brand = document.getElementById('logo-id');
        brand.className = 'attachment_upload';
        brand.onchange = function() {
            document.getElementById('fakeUploadLogo').value = this.value.substring(12);
        };

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    $('.img-preview').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#logo-id").change(function() {
            readURL(this);
        });
     */

    function readURL($input) 
    {
        var input = $input[0];
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var image  = new Image();

            reader.onload = function(e) {
                $a = $input.closest('.form-group');

                if ($a.hasClass('comp-details')) {
                    $a.find('.img-preview').attr('style', 'background:url('+ e.target.result +')');
                }

                $a.find('.img-preview').attr('src', e.target.result);
                $a.find('.fakeUploadLogo').val( $input.val().substring(12) );
                
                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result;
                image.onload = function() {
                    $input.data('height', this.height);
                    $input.data('width', this.width);
                    var size = parseFloat((input.files[0].size / 1024) / 1024).toFixed(2); //in mb
                    $input.data('size', size);
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('.attachment_upload').change( function() {
        readURL($(this));
    });


    /************** Upload Image with Preview *****************************/

    // Load cities based on country id for hotel
   
    $(document).on('change', '.country-box', function() {
        
        var url = 'admin';
        var current = $(this);
        var token = $("input[name=_token]").val();

        if ( current.data('url') === 'hotel' ) url = 'hotel';
        if ( current.data('url') === 'group' ) url = 'group';

        var action = '/' + url + '/cities-list';
        var countryid = current.val();
        
        if ( countryid ) {
            $.ajax({
              headers: {
                  'Cache-Control': 'no-cache'
              },
              'url': action,
              'type': 'post',
              'data': {'countryid': countryid, '_token': token},
              'success': function( response ) {
                  if (current.closest('form').find('.city-box').hasClass('city-hotels')) {
                    current.closest('form').find('.city-box').html('<option value="">Select City</option>').append( response );
                  } else {
                    current.closest('form').find('.city-box').html( response );
                  }
                  //current.closest('form').find('.hotel-list').html( '<option value="">Select Hotel</option>' );
              }
            })
        }
    });
    
    // Load hotels based on city id for hotel
    $(document).on('change', '.city-hotels', function() {

      var url = 'admin';
      var current = $(this);
      var token = $("input[name=_token]").val();
      
      if ( current.data('url') === 'hotel' ) url = 'hotel';
      if ( current.data('url') === 'group' ) url = 'group';
      
      var action = '/' + url + '/hotels-list';
      var cityid = current.val();
      
      if ( cityid ) {
        $.ajax({
          headers: {
              'Cache-Control': 'no-cache'
          },
          'url': action,
          'type': 'post',
          'data': {'cityid': cityid, '_token': token},
          'success': function( response ) {
            current.closest('form').find('.hotel-list').html( response );
          }
        })
      }

    });

/*
    // bind change event to select
    $('#language-box').on('change', function () {

        var language = $(this).val(),
        current_url = window.location.pathname;

        if ( language ) window.location = baseurl + current_url + '?lang=' + language;

        return false;
    });
*/

    // generate hotel url by hotel name.
    $('.hotel-name').on('change', function () {

        var hotelname = $.trim($(this).children("option:selected").text());
        
        hotelname = hotelname.split(' ').join('').toLowerCase();

        if (hotelname == 'selecthotel') { $('.hotel-url').val(''); return false; }

        hotelname = hotelname.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        
        hotelname = hotelname + WB_DOMAIN;
        
        $('.hotel-url').val(hotelname);

    });
    

    // Get bank details by currency
    $('.currency-box').change(function() {

      var currency = $(this).val();
      var token = $("input[name=_token]").val();
      var action = '/admin/get-bank-details';

      if ( currency ) {
        $.ajax({
          headers: {
              'Cache-Control': 'no-cache'
          },
          'url': action,
          'type': 'post',
          'data': {'currency': currency, '_token': token},
          'success': function( response ) {
            if ( response != 'null' )
            {
              response = jQuery.parseJSON( response );
              $("input[name=bank_name]").val( response.bank_name );
              $("input[name=bank_address]").val( response.bank_address );
              $("input[name=iban]").val( response.iban );
              $("input[name=swift]").val( response.swift );

            } else {
              $("input[name=bank_name]").val('');
              $("input[name=bank_address]").val('');
              $("input[name=iban]").val('');
              $("input[name=swift]").val('');
            }
          }
        })
      }
    });

    /************** Date Picker ******************/

    $( function() {
      var start = new Date();
      start.setFullYear(start.getFullYear() - 70);
      var end = new Date();
      end.setFullYear(end.getFullYear() - 18);

      $('.datepicker_age').datepicker({
          changeMonth: true,
          changeYear: true,
          minDate: start,
          maxDate: end,
          dateFormat: "yy-mm-dd",
          yearRange: start.getFullYear() + ':' + end.getFullYear()
      });

    });


    $( function() {
        $( ".fromdate-bt" ).datepicker({
            dateFormat: "yy-mm-dd",
            firstDay:1,
            onSelect: function(dateText) {
                $('.todate-bt').val('').datepicker('destroy');

                $('.todate-bt').datepicker({
                    minDate: new Date(dateText),
                    dateFormat: "yy-mm-dd",
                    firstDay:1
                });
            }
        });

        $( ".todate-bt" ).datepicker({
            dateFormat: "yy-mm-dd",
            firstDay:1,
            minDate: new Date( $('.fromdate-bt').val() )
        });
        $( ".bookfromdate-bt" ).datepicker({
            dateFormat: "yy-mm-dd",
            firstDay:1,
            onSelect: function(dateText) {
                $('.booktodate-bt').val('').datepicker('destroy');

                $('.booktodate-bt').datepicker({
                    minDate: new Date(dateText),
                    dateFormat: "yy-mm-dd",
                    firstDay:1
                });
            }
        });

        $( ".booktodate-bt" ).datepicker({
            dateFormat: "yy-mm-dd",
            firstDay:1,
            minDate: new Date( $('.bookfromdate-bt').val() )
        });

    });

    $(document).ready(function() {
        $( ".fromdate-ra" ).datepicker({
            dateFormat: "yy-mm-dd",
            firstDay:1,
            minDate: new Date(),
            onSelect: function(dateText) {
                $('.todate-ra').val('').datepicker('destroy');
                $('.todate-end').val('').datepicker('destroy');

                $('.todate-ra').datepicker({
                    minDate: new Date(dateText),
                    firstDay:1,
                    dateFormat: "yy-mm-dd"
                });
                $('.todate-end').datepicker({
                    minDate: new Date(dateText),
                     maxDate: new Date($('#expiry_date').val()),
                    firstDay:1,
                    dateFormat: "yy-mm-dd"
                });
            },
        });
         $( ".todate-ra" ).datepicker({
            dateFormat: "yy-mm-dd",
            firstDay:1,
            minDate: new Date( $('.todate-ra').val() )
        });
        $( ".todate-end" ).datepicker({
            dateFormat: "yy-mm-dd",
            firstDay:1,
            minDate: new Date( $('.fromdate-ra').val() ),
           maxDate: new Date($('#expiry_date').val()),

        });
          //console.log($('#expiry_date').val())

    });



  /*************** Timepicker  js ******************/
  $(function () 
  {
      $('.datetimepicker4').datetimepicker(
      {
          format: 'LT',
          format: 'HH:mm',
          stepping: 60
      });
  });


  // By Default Disable radio button
  $(".active-check").change(function() {
    if ($(this).hasClass('enable')) {
      var button = $(this).closest('.bank-account');
      button.find('.disable').attr('disabled', false);
      button.find('.wrap').css('opacity', '1');
    } else {
      var button = $(this).closest('.bank-account');
      button.find('.disable').attr('checked', false);
      button.find('.disable').attr('disabled', true);
      button.find('.wrap').css('opacity', '.2');
    }
  });

  $(".active-check-input").change(function() {
    if ($(this).hasClass('enable')) {
      var button = $(this).closest('.bank-account');
      button.find('.disable-input').attr('disabled', false);
    } else {
      var button = $(this).closest('.bank-account');
      button.find('.disable-input').attr('disabled', true);
    }
  });


  $(document).on('click', '.add-button-event', function() {

    var current = $(this);
    var current_ele_id = current.data('value');
    var bank_acc = current.closest('.bank-account');

    var bed_two = bank_acc.find('.bed_two_' + current_ele_id);
    var bed_three = bank_acc.find('.bed_three_' + current_ele_id);

    if (bed_two.hasClass('ai-beds')) {
      bed_two.removeClass('ai-beds');
    } else {
      bed_three.removeClass('ai-beds');
    }

  });


  $(document).on('click', '.remove_bed', function() {

    var current = $(this);
    var bedtype = current.closest('.bedtype');

    bedtype.find('.inputtext').val('');
    bedtype.find('.bedselect').prop('selectedIndex',0);
    bedtype.addClass('ai-beds');

  });
    $(document).on('click', '.status-change', function() {

        var current = $(this);
        var pro_padding = current.closest('.profile-padding');
        var id = current.data('value');

        if (current.text() == saveLink) {
            
            var selectedVal = $('#status-select').val();

            $.ajax({
                headers: {
                    'Cache-Control': 'no-cache'
                },
                'url': baseurl + '/' + role + '/booking/change-status',
                'type': 'get',
                'data': {'status': selectedVal, 'booking_id': id},
                'success': function( response ) {
                    // if (response == 'Accepted') {
                    //   pro_padding.find('.status-span').text('Confirmed').show();
                    // } else {
                    //   pro_padding.find('.status-span').text(response).show();
                    // }

                    // if (response === 'No show') $('.noshow-zero').text('0.00');

                    // pro_padding.find('.status-dropdown').hide();

                    // if (response == 'Accepted') {
                    //     current.text('Edit');
                    // } else {
                    //     current.hide();
                    // }

                    window.location = '/'+ role +'/booking/view/' + id;
                }
            })

        } else {
            pro_padding.find('.status-span').hide();
            pro_padding.find('.status-dropdown').show();
            current.text(saveLink);
        }
    });
    /*paid date update*/
    $(".paid-date").datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function(date, instance) {
            var current = $(this);
            var id = current.data('id');
            var token = $("input[name=_token]").val();
            $.ajax
            ({
                headers: {
                    'Cache-Control': 'no-cache'
                },
                type: "Post",
                url: '/admin/update-paid-date',
                data: { 'value':date, 'id':id, '_token':token },
                success: function(result)
                {
                    if ( result.status ) {
                        window.location.reload(true);
                    }
                }
             });  
         }
    });

 $('.update-paid-date').click(function() {
      $('.paid-section').toggle();
      $('.date-section').toggle();
  });
   /* $('#Carousel').carousel({
        interval: 5000
    });*/
    $("#myCarousel").carousel({
        interval: false
    });


    $(document).on('change', '.platform-type', function () {
      var current = $(this),
      platform, hotel_id;

      hotel_id = $('#hotel-id').val();

      if (current.val() == 2) platform = 'global';
      else platform = 'white_brand';

      if ( current.val() == 4 ) $('.roomCategory').hide();
      else $('.roomCategory').show();

      $.ajax({
        headers: {
            'Cache-Control': 'no-cache'
        },
        'url': baseurl + '/' + role + '/get-room-types',
        'type': 'get',
        'data': {'platform': platform, 'hotel_id': hotel_id},
        'success': function( response ) {
          if (response != null) {
            $('.room-categories').html(response);

            if (platform == 'global') $('.room-categories').prop('name', 'room_type');
            if (platform == 'white_brand') $('.room-categories').prop('name', 'wb_room_type');
          }
        }
      });
    });


/*    $(document).on('change', '.graph-hotel', function() {

      var current = $(this);
      current.closest('.form').find('.platform-type').attr('data-value', current.val());

    });*/


    $(document).on('change', '.stats-platform-type', function () {
      var current = $(this),
      platform;

      // platform = current.val();
      if (current.val() == 1) platform = 'global';
      else platform = 'white_brand';

      // alert(platform);

      $.ajax({
        headers: {
            'Cache-Control': 'no-cache'
        },
        'url': baseurl + '/' + role + '/get-room-types',
        'type': 'get',
        'data': {'platform': platform},
        'success': function( response ) {
          if (response != null) {
            $('.room-categories').html(response);

            if (platform == 'global') $('.room-categories').prop('name', 'room_type');
            if (platform == 'white_brand') $('.room-categories').prop('name', 'wb_room_type');
          }
        }
      });
    });


    $(document).on('change', '.admin-stats-platform-type', function () {
      var current = $(this),
      platform;

      if (current.val() == 1) platform = 'global';
      else platform = 'white_brand';

      if ( current.val() == 1 || current.val() == 2 ) $('.roomCategory').show();
      else $('.roomCategory').hide();

      hotel_id = $('#hotel-id').val();

      $.ajax({
        headers: {
            'Cache-Control': 'no-cache'
        },
        'url': baseurl + '/' + role + '/get-room-types',
        'type': 'get',
        'data': {'platform': platform, 'hotel_id': hotel_id},
        'success': function( response ) {
          if (response != null) {
            $('.room-categories').html(response);

            if (platform == 'global') $('.room-categories').prop('name', 'room_type');
            if (platform == 'white_brand') $('.room-categories').prop('name', 'wb_room_type');
          }
        }
      });
    });


    
/*    $( "#daily-dashboard-hotel" ).submit(function( event ) {

      console.log(role, $('.platform-type').val());

      if ($('.platform-type').val() == 4 && $('.room-categories').val() == '') {
        alert('please select a category to make search.');
        event.preventDefault();
      }

    });
*/

    $(document).on('change', '.hotel-list', function () {

      var current   = $(this);
      var hotel_id  = current.val();
      var _token = $("input[name=_token]").val();
      var platform_type = $("select[name=platform_type]").val();

      // alert(_token);

      $.ajax({
        'url': baseurl + '/' + role + '/room-categories',
        'type': 'get',
        headers: {
            'Cache-Control': 'no-cache'
        },
        'data': {'hotel_id': hotel_id, '_token': _token, 'platform_type': platform_type},
        'success': function( response ) {
          if (response != null) {
            $('.room-category').html(response);
          }
          // console.log(response);
        }
      });
    });
     $(document).on('change', '.use-type', function () {

      var current   = $(this);
      var hotel_id  = current.val();
      var _token = $("input[name=_token]").val();

          console.log(hotel_id);
      $.ajax({
        'url': baseurl + '/' + role +'/use-type-option',
        'type': 'post',
        'data': {'hotel_id': hotel_id, '_token': _token},
        headers: {
            'Cache-Control': 'no-cache'
        },
        'success': function( response ) {
          if (response != null) {
            $('.dn_use_type').show();
            $('.dn_use_type').html(response);
          }
        }
      });
    });

    $(document).on('change', '.fetch-faq', function () {

      var current = $(this), language, faq_type, page_name, platform_type;
      var formContent = current.closest('.form-content');

      if (current.hasClass('cat')) {
        language = formContent.find('.lang').val();
        platform_type = formContent.find('.platform_type').val();
        faq_type = current.val();
      } else if(current.hasClass('lang')) {
        faq_type = formContent.find('.cat').val();
        platform_type = formContent.find('.platform_type').val();
        language = current.val();
      } else {
        language = formContent.find('.lang').val();
        faq_type = formContent.find('.cat').val();
        platform_type = current.val();
      }

      page_name = current.closest('.form-content').find('#page-name').val();

      // console.log('lang - ' + language, ' | faqtype - ' + faq_type, ' | pagename - ' + page_name, ' | platform - ' + platform_type);

      if (language && page_name)
      {
        $.ajax({
          'url': baseurl + '/' + role + '/fetch-faq',
          'type': 'get',
          'data': {'language': language, 'faq_type': faq_type, 'page_name': page_name, 'platform_type': platform_type},
          headers: {
              'Cache-Control': 'no-cache'
          },
          'success': function( response ) {
            if (response != null) {
              CKEDITOR.instances['ck-editor'].setData(response);
            } else {
              CKEDITOR.instances['ck-editor'].setData('');
            }
          }
        });
      }
    });


    /*Home pages details*/

    $(document).on('change', '.home-pages-ajax', function () {

      var current = $(this), language, faq_type, page_name;

      if (current.hasClass('lang')) {
        platform = current.closest('.form-content').find('.platform').val();
        language = current.val();
      } else {
        language = current.closest('.form-content').find('.lang').val();
        platform = current.val();
      }

      if (platform === 'whitebrand') {
        $('.whitebrand-ele').hide();
      } else {
        $('.whitebrand-ele').show();
      }

      if (language && platform)
      {
        $.ajax({
          'url': baseurl + '/' + role + '/home-pages',
          'type': 'get',
          'data': {'language': language, 'platform': platform},
          headers: {
              'Cache-Control': 'no-cache'
          },
          'success': function( response ) {

              if (response != 'null') {
                response = jQuery.parseJSON( response );

                if (response.headline) $('#headline').val(response.headline);

                if (response.step_one) CKEDITOR.instances['step-one'].setData(response.step_one);
                
                if (response.step_two) CKEDITOR.instances['step-two'].setData(response.step_two);

                if (response.step_three) CKEDITOR.instances['step-three'].setData(response.step_three);

                if (response.top_destination_one_text) CKEDITOR.instances['td-one'].setData(response.top_destination_one_text);

                if (response.top_destination_two_text) CKEDITOR.instances['td-two'].setData(response.top_destination_two_text);

                if (response.top_destination_three_text) CKEDITOR.instances['td-three'].setData(response.top_destination_three_text);

                if (response.top_destination_four_text) CKEDITOR.instances['td-four'].setData(response.top_destination_four_text);

                if (response.testimonial) CKEDITOR.instances['testimonial'].setData(response.testimonial);
            } else {

              $('#headline').val('');
              CKEDITOR.instances['step-one'].setData('');
              CKEDITOR.instances['step-two'].setData('');
              CKEDITOR.instances['step-three'].setData('');
              CKEDITOR.instances['td-one'].setData('');
              CKEDITOR.instances['td-two'].setData('');
              CKEDITOR.instances['td-three'].setData('');
              CKEDITOR.instances['td-four'].setData('');
              CKEDITOR.instances['testimonial'].setData('');

            }

          }
        });
      }
    });

    /*Home pages details*/



    // Get booking users ajax call
      $(document).on('change', '.get-booking-users', function() {

        var hotelId = $(this).val();
        var token = $("input[name=_token]").val();

        if ( hotelId ) {
          $.ajax({
            'url': baseurl + '/' + role + '/booking-users',
            'type': 'get',
            'data': {'hotel_id': hotelId, '_token': token},
            headers: {
                'Cache-Control': 'no-cache'
            },
            'success': function( response ) {
              if (response) 
              {
                response = jQuery.parseJSON( response );
                var listing = '<option value="">Select User</option>';
                $.each(response, function (i, v) {
                  listing += '<option value="'+ v.email +'">'+ v.first_name + ' ' + v.last_name + ' (' + v.email + ")"  +'</option>';
                });

                $('.booking-user').html(listing);
              }
            }
          })
        }

      });
    // Get booking users ajax call




    $(document).on('click', '.isCouponAvailable', function() {

      var currentObj  = $(this);
      var email_id    = currentObj.data('email');
      var booking_id    = currentObj.data('bid');

      if (email_id && booking_id) 
      {
        $.ajax({
          'url': baseurl + '/' + role + '/is-coupon',
          'type': 'get',
          'data': {'email_id': email_id, 'booking_id': booking_id},
          headers: {
              'Cache-Control': 'no-cache'
          },
          'success': function( response ) {
              $('#couponModalData').html(response);
              $('#couponModalData').modal();
              // console.log(response);
          }
        });
      }

    });


    /*
    Coupon name suggestion
    $(document).on('keyup', '.coupon-user-search', function () {

      var current = $(this);

      var keyword = current.val();

      if (keyword) 
      {
        $.ajax({
          'url': baseurl + '/' + role + '/search-coupon-user',
          'type': 'get',
          'data': {'keyword': keyword},
          'success': function( response ) {
              $('#search-response').html(response);
              $('.coupon-search-response').show();
          }
        });
      }

    });*/
    $('.coupon-user-search').select2({
      language: {
        inputTooShort: function () { return ''; }
      },
      formatNoMatches: function() {
        return '';
      },
      minimumInputLength: 1,
      maximumInputLength: 3,
      ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
              url: baseurl + '/' + role + '/search-coupon-user',
              dataType: 'json',
              quietMillis: 250,
              headers: {
                  'Cache-Control': 'no-cache'
              },
              data: function (term, page) { // page is the one-based page number tracked by Select2
                  return {
                  
                      q: term, //search term
                      page: page // page number
                  };
              },
              processResults: function (data) {
              // Tranforms the top-level key of the response object from 'items' to 'results'
                  return {
                      results: data.items
                  };
              }
          },
    });

    // function for content management home page on Landing Page Details by vikas
    $('.top-destination-cities').on('change', function () {
        var city_id = $(this).attr('id');
        city_id = city_id.split('-');
        if(city_id.length > 1) {
            city_id = city_id[1];
            // alert($.trim($(this).find("option:selected").text()));
            if($(this).val() == 0 || $(this).val() == ''){
                $('#top_destination_city_'+city_id).val('')  
            } else{
                $('#top_destination_city_'+city_id).val($.trim($(this).children("option:selected").text()))  
            }
        }
    });

});

function selectUser( user_email, user_name ) 
{
  $('.coupon-user-search').val( user_name + ' (' + user_email + ')' );
  $('.user-email').val( user_email );
  $('.coupon-search-response').hide();
}

//save data in local storage for refresh all tabs after logout
// window.localStorage.setItem('logged_in', true);
// function storageChange (event) {
//     if(event.key === 'logged_in') {
//         window.location.reload();
//         // alert('Logged in: ' + event.newValue)
//     }
// }
// window.addEventListener('storage', storageChange, false);

//show admin daily graph
$(document).on('click', '#showDailyGraph', function() {
    hotel_id = $.trim($('#hotel-id').val());
    platform_type = $.trim($("select[name=platform_type]").val());
    roomCat  = $.trim($( ".room-categories option:selected" ).val());
    if ( hotel_id == ''){
        $('.hotel-validate-error').show(); $('.ptype-validate-error,.room-validate-error').hide(); return false;
    } else if ( platform_type == '' ) {
        $('.ptype-validate-error').show(); $('.hotel-validate-error,.room-validate-error').hide(); return false;
    } else{
      if ( platform_type != 3 ) {
          if ( roomCat == '' ) {
            $('.room-validate-error').show(); $('.hotel-validate-error,.ptype-validate-error').hide(); return false; 
          } else return true; 
      }
      $('.hotel-validate-error,.ptype-validate-error,.room-validate-error').hide(); return true; 
    }
});

//show hotel daily graph
$(document).on('click', '#showHotelDailyGraph', function() {
    platform_type = $.trim($("select[name=platform_type]").val());
    roomCat  = $.trim($( ".room-categories option:selected" ).val());
    if ( platform_type != 4 ) {
        if ( roomCat == '' ) {
          $('.room-validate-error').show(); return false; 
        }
    }
    $('.room-validate-error').hide(); return true; 
});

$(document).on('keypress','.currencyInput', function(evt){
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;

  if (charCode == 46 || charCode == 44) {
    return true;
  }

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }

  return true;
});

/*Comma separated */
function currencyFormat(newval){
    newval = newval.replace(/\,/g,"");
    var parts = newval.toString().split(".");
    if(currency_code = 'IDR')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");

    return parts.join(".");
}

$(document).on('blur', '.currencyInput', function(e) {   
      var current = $(this);
      var newval = current.val();      
      current.val(currencyFormat(newval));    
});

$(document).on('keypress','.numeric,input[type="number"]', function(evt){
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;

  if (charCode == 46) {
    return true;
  }

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }

  return true;
});

$('.numeric,input[type="number"],,').bind('paste drop',function(e){
  e.preventDefault();
});

// $(".active-check-input").change(function() {
//     alert();
// });

/**/

$(document).on('change', '.admin-rates-hotel-list', function() {

      var current = $(this);
      var countryid = current.closest('form').find('.country-box').val();
      var cityid = current.closest('form').find('.city-box').val();
      var hotelid = current.val();
      var url = 'admin';
      if ( current.data('url') === 'group' ) url = 'group';
      if (hotelid) {
          var redirect_url = '';
          if (url == 'group'){
            redirect_url =  baseurl + '/' + url +'/group-rates-availabilities';
          } else {
            redirect_url =  baseurl + '/' + url +'/rates-availabilities';
          }
          redirect_url += '?country='+countryid;
          redirect_url += '&city='+cityid;
          redirect_url += '&hotel_id='+hotelid;
          window.location.href = redirect_url;
      }
});
$(document).on('change', '.admin-hotel-room-list', function() {

      var current = $(this);
      var countryid = current.closest('form').find('.country-box').val();
      var cityid = current.closest('form').find('.city-box').val();
      var hotelid = current.val();
      var url = 'admin';
      if ( current.data('url') === 'group' ) url = 'group';
      if (hotelid) {
          var redirect_url = '';
          if (url == 'group'){
            redirect_url =  baseurl + '/' + url +'/group-room-list';
          } else {
            redirect_url =  baseurl + '/' + url +'/admin-room-list';
          }
          redirect_url += '?country='+countryid;
          redirect_url += '&city='+cityid;
          redirect_url += '&hotel_id='+hotelid;
          window.location.href = redirect_url;
      }
});
$(document).on('click', '.change-room-status-group', function() {
    var current = $(this);
    var open = current.data('open');
    if (open) { return false; }
    var oldval = current.attr('data-value');
    var id = current.attr('data-id');
    var name = current.data('name');
    current.html('<input type="text" data-url="group" data-name="'+name+'" data-id="'+id+'" class="check-numeric new_input calendar-room-input" name="'+name+'" value='+oldval+'>');
    current.attr('data-open', 1);
    current.find('.new_input').focus().val('').val(oldval); 
});

$(document).on('click', '.change-room-status', function() {
    var current = $(this);
    var open = current.data('open');
    if (open) { return false; }
    var oldval = current.attr('data-value');
    var id = current.attr('data-id');
    var name = current.data('name');
    current.html('<input type="text"  data-url="hotel" data-name="'+name+'" data-id="'+id+'" class="check-numeric new_input calendar-room-input" name="'+name+'" value='+oldval+'>');
    current.attr('data-open', 1);
    current.find('.new_input').focus().val('').val(oldval); 
});

$(document).on('blur', '.new_input', function(e) {
   
    $('#update-calendar').show();
    var current = $(this);
      var newval = current.val();
      if ( current.data('url') === 'hotel' ) {
          var action = '/hotel/calendar-update';
          var closest = current.closest('.change-room-status');
      }else if ( current.data('url') === 'group' ){
          var action = '/group/group-calendar-update';
          var closest = current.closest('.change-room-status-group');
      }
      $(window).keyup(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 9) {
           //closest.next().trigger('click');
        }
      });
      var oldval = closest.attr('data-value');
      closest.html(currencyFormat(newval));
      closest.attr('data-open', 0);
      closest.attr('data-value', newval);
      name = current.data('name');
      var id = current.data('id');

      var token = $("input[name=_token]").val();
      $.ajax({
          'url': action,
          'type': 'post',
          'data': { 'name': name, 'value': newval, 'id': id, '_token': token },
          headers: {
              'Cache-Control': 'no-cache'
          },
          'success': function( response ) {
              if ( response.status ) {
                 // window.location.reload(true);
              }
          }
      });
});

$(document).on('keypress','.check-numeric', function(evt){
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    var current = $(this);
    var closest = current.closest('.change-room-status');
    var oldval = closest.data('value');
    var name = current.data('name');
    var newval = current.val();

    if (name == "number_of_rooms") {

        // if ( current.val() <= 0 || isNaN(newval) ) return false;

        if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

        return true;

    } else {

      var regex = /^(\d*)\.{0,1}(\d*)$/;
      
      //if( ! regex.test(newval) ) { return false; }

      if (charCode == 46 || charCode == 44) return true;

      if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

    }

});

$('.check-numeric').bind('paste drop',function(e){
    e.preventDefault();
});

$(document).on('change', '.open-close-status', function() {
    var current = $(this);
    var value = current.data('value');
    var id = current.data('id');

    var token = $("input[name=_token]").val();
    var action = '/hotel/calendar-update';
    if ( current.data('url') === 'group' ) {
          var action = '/group/group-calendar-update';
      }

    $.ajax({
        'url': action,
        'type': 'post',
        'data': { 'name': 'is_close', 'value': value, 'id': id, '_token': token},
        headers: {
            'Cache-Control': 'no-cache'
        },
        'success': function( response ) {
            // response = $.parseJSON( response );
            if ( response.status ) {
                window.location.reload(true);
            }
        }
    });
});


$('.wb_room_category').sortable({

    stop: function() {
    var data = new Array();
    var token = $("input[name=_token]").val();
    $('.wb_room_category>tr').each(function() {
    data.push($(this).attr("id"));
    });

    data = data.filter( Number );
     $.ajax({
        url:"/"+ role + "/white-brand-room-order",
        type:'post',
        data:{position:data,'_token': token},
        headers: {
            'Cache-Control': 'no-cache'
        },
        success:function(){
            //alert('your change successfully saved');
        }
    });
  },
});

$('.wb_template_email').sortable({

    stop: function() {
    var data = new Array();
    var token = $("input[name=_token]").val();
    $('.wb_template_email>tr').each(function() {
    data.push($(this).attr("id"));
    });

    data = data.filter( Number );
     $.ajax({
        url:"/"+ role + "/email-template-order",
        type:'post',
        data:{position:data,'_token': token},
        headers: {
            'Cache-Control': 'no-cache'
        },
        success:function(){
            //alert('your change successfully saved');
        }
    });
  },
});


 
$('.help-screen').sortable({

    stop: function() {
    var data = new Array();
    var token = $("input[name=_token]").val();
    $('.help-screen>tr').each(function() {
        data.push($(this).attr("id"));
    });
    data = data.filter( Number );
    console.log(data);
     $.ajax({
        url:"/admin/help-image-order",
        type:'post',
        data:{position:data,'_token': token},
        headers: {
            'Cache-Control': 'no-cache'
        },
        success:function(){
            //alert('your change successfully saved');
        }
    });
  },
});

$('#createNewRoomCat').on('submit', function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    if (this) {
      formData = formDataFilter(formData)
    }
    var url = $(this).prop('action');
      $.ajax({
          type: "POST",
          url: url,
          data: formData,
          contentType: false,
          cache: false,
          processData:false,
          headers: {
              'Cache-Control': 'no-cache'
          },
          success: function( msg ) {
              if(role == 'hotel')
                  window.location.href='/hotel/white-brand';
              else if(role == 'admin')
                  window.location.href='/admin/admin-room-list';
              else if(role == 'group')
                  window.location.href='/group/group-room-list';
          },
          error:function(response){
            if(response.responseJSON && response.responseJSON.errors){
              var errors = response.responseJSON.errors;
                  $.each(errors, function (key, val) {
                      $("#" + key + "_error").text(val);
                  });
            }
          }
       });
   });
  var formDataFilter = function(formData) {
    if (!(window.FormData && formData instanceof window.FormData)) return formData
      if (!formData.keys) return formData // unsupported browser
      var newFormData = new window.FormData()
      Array.from(formData.entries()).forEach(function(entry) {
        var value = entry[1]
        if (value instanceof window.File && value.name === '' && value.size === 0) {
          newFormData.append(entry[0], new window.Blob([]), '')
        } else {
          newFormData.append(entry[0], value)
        }
      })
    return newFormData
  }

  $('#createNewRoomCatEdit').on('submit', function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    if (this) {
      formData = formDataFilter(formData)
    }
    var url = $(this).prop('action');
      $.ajax({
          type: "POST",
          url: url,
          data: formData,
          contentType: false,
          cache: false,
          processData:false,
          headers: {
              'Cache-Control': 'no-cache'
          },
          success: function( msg ) {
            if(role == 'hotel')
                window.location.href='/hotel/white-brand';
            else if(role == 'admin')
                window.location.href='/admin/admin-room-list';
            else if(role == 'group')
                window.location.href='/group/group-room-list';
          },
          error:function(response){
             if(response.responseJSON && response.responseJSON.errors){
              var errors = response.responseJSON.errors;
                  $.each(errors, function (key, val) {
                      $("#" + key + "_error").text(val);
                  });
            }
          }
       });
   });

  $('#whiteBrandPageCreate').on('submit', function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    if (this) {
      formData = formDataFilter(formData)
    }
    formData.append('hotel_banner_en', CKEDITOR.instances['hbe-ck-editor'].getData());
    formData.append('hotel_banner_fr', CKEDITOR.instances['hbf-ck-editor'].getData());
    formData.append('hotel_banner_de', CKEDITOR.instances['hbd-ck-editor'].getData());
    
    var url = $(this).prop('action');
      $.ajax({
          type: "POST",
          url: url,
          data: formData,
          contentType: false,
          cache: false,
          processData:false,
          headers: {
              'Cache-Control': 'no-cache'
          },
          success: function( msg ) {
              window.location.href='/admin/white-brand';
          },
          error:function(response){
             if(response.responseJSON && response.responseJSON.errors){
              var errors = response.responseJSON.errors;
                  $.each(errors, function (key, val) {
                      $("#error_"+key).text(val);
                  });
            }
          }
       });
   });

  $('#whiteBrandPageUpdate').on('submit', function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    if (this) {
      formData = formDataFilter(formData)
    }
    formData.append('hotel_banner_en', CKEDITOR.instances['hbe-ck-editor'].getData());
    formData.append('hotel_banner_fr', CKEDITOR.instances['hbf-ck-editor'].getData());
    formData.append('hotel_banner_de', CKEDITOR.instances['hbd-ck-editor'].getData());
    
    var url = $(this).prop('action');
      $.ajax({
          type: "POST",
          url: url,
          data: formData,
          contentType: false,
          cache: false,
          processData:false,
          headers: {
              'Cache-Control': 'no-cache'
          },
          success: function( msg ) {
              window.location.href='/admin/white-brand';
          },
          error:function(response){
            $('[id^="error_"]').text('');
             if(response.responseJSON && response.responseJSON.errors){
              var errors = response.responseJSON.errors;
                  $.each(errors, function (key, val) {
                     $("#error_"+key).text(val);
                  });
            }
          }
       });
   });

 $(document).on('change', '#coupon_id', function () {
      var current = $(this);
      
      $.ajax({
        'url': baseurl + '/' + role + '/expire-coupon-date',
        'type': 'get',
        'data': {'coupon_id': current.val()},
        headers: {
              'Cache-Control': 'no-cache'
          },
        'success': function( response ) {
          if (response != null) {
          $("#expiry_date").val(response);
          }
        }
      });
    });


    $('[id^="calendar_"]').click(function(){
      if ($(this).prop('checked')==true){
          $("#calendar").prop("checked", true);
      } 
        
    });
    $('#calendar').click(function(){
      if ($(this).prop('checked')==false){
          $('[id^="calendar_"]').prop("checked", false);
      }         
    });

    $('[id^="rate_"]').click(function(){
        if ($(this).prop('checked')==true) {
            $("#rate").prop("checked", true);
        } else {
            $("#rate").prop("checked", false);
        }
    });
    $('#rate').click(function(){
        if ($(this).prop('checked')==false) {
            $('[id^="rate_"]').prop("checked", false);
        } else {
            $('[id^="rate_"]').prop("checked", true);
        }
    });

    $('[id^="last_minute_"]').click(function(){
      if ($(this).prop('checked')==true){
          $("#last_minute").prop("checked", true);
      } 
    });

    $('#last_minute').click(function(){
      if ($(this).prop('checked')==false){
          $('[id^="last_minute_"]').prop("checked", false);
      }         
    });

    $('[id^="last_minute_"]').click(function(){
      if ($(this).prop('checked')==true){
          $("#last_minute").prop("checked", true);
      } 
    });

    $('#last_minute').click(function(){
      if ($(this).prop('checked')==false){
          $('[id^="last_minute_"]').prop("checked", false);
      }         
    });

    $('[id^="booking_"]').click(function(){
      if ($(this).prop('checked')==true){
          $("#booking").prop("checked", true);
      } 
    });

    $('#booking').click(function(){
      if ($(this).prop('checked')==false){
          $('[id^="booking_"]').prop("checked", false);
      }         
    });
    
    $('[id^="coupon_"]').click(function(){
      if ($(this).prop('checked')==true){
          $("#coupon").prop("checked", true);
      } 
    });

    $('#coupon').click(function(){
      if ($(this).prop('checked')==false){
          $('[id^="coupon_"]').prop("checked", false);
      }         
    });

    $('[id^="couponmanagement_"]').click(function(){
      if ($(this).prop('checked')==true){
          $("#couponmanagement").prop("checked", true);
      } 
    });

    $('#couponmanagement').click(function(){
      if ($(this).prop('checked')==false){
          $('[id^="couponmanagement_"]').prop("checked", false);
      }         
    });

    $('[id^="hotel_profile_"]').click(function(){
      if ($(this).prop('checked')==true){
          $("#hotel_profile").prop("checked", true);
      } 
    });

    $('#hotel_profile').click(function(){
      if ($(this).prop('checked')==false){
          $('[id^="hotel_profile_"]').prop("checked", false);
      }         
    });

     $('[id^="room_categories_"]').click(function(){
      if ($(this).prop('checked')==true){
          $("#room_categories").prop("checked", true);
      } 
    });

    $('#room_categories').click(function(){
      if ($(this).prop('checked')==false){
          $('[id^="room_categories_"]').prop("checked", false);
      }         
    });

     $('[id^="client_"]').click(function(){
      if ($(this).prop('checked')==true){
          $("#client").prop("checked", true);
      } 
    });

    $('#client').click(function(){
      if ($(this).prop('checked')==false){
          $('[id^="client_"]').prop("checked", false);
      }         
    });

    $('#update-calendar').click(function(){     
         window.location.reload(true);
    });

    
    $('#select_all').click(function(){
      if ($(this).prop('checked')==true){
          $(".export").prop("checked", true);
      }else{
          $(".export").prop("checked", false);
      } 
    });

  $("#export-form").submit(function(e){
      var len = $('.export:checked').length;
      if(len>0){
        return true;
      }else{
        $('.export-error').show();
        e.preventDefault();
        return false;
      }
  });

  $(document).on('change', '.slider_type', function() {
    var type = $(this).val();
      if (type == 1){
          $("#group_type").hide();
          $("#hotel_type").show();
      }else{
            $("#hotel_type").hide();
            $("#group_type").show();
      } 
    });

$(document).ready(function() {
  if($('.slider_type').val() == ''){
      $("#group_type").hide();
      $("#hotel_type").hide();
  }
});
$(document).ready(function() {
$('.group-name').on('change', function () {
        var name = $.trim($(this).children("option:selected").text());
        name = name.split(' ').join('').toLowerCase();
        if (name == 'selectgroup') { $('.hotel-url').val(''); return false; }

        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        
      $('.hotel-url').val(name + WB_DOMAIN);
    });

    $('.group-name-text').on('blur', function () {
          var name = $.trim($(this).val());
          name = name.split(' ').join('').toLowerCase(); 
          if (name == 'selectgroup') { $('.hotel-url').val(''); return false; }         
          name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        $('.hotel-url').val(name + WB_DOMAIN);
      });
});

$("input[name='is_city_tax']").click(function(){
    if($("input[name='is_city_tax']:checked").val() != 0){
         $("#city-input").show();
      } else {
        $("#city-input").hide();
      }
  });
$("input[name='is_vat']").click(function(){
    if($("input[name='is_vat']:checked").val() != 0){
         $("#vat-input").show();
      } else {
        $("#vat-input").hide();
      }
  });
$("input[name='is_additional_tax']").click(function(){
    if($("input[name='is_additional_tax']:checked").val() != 0){
         $("#additional-input").show();
      } else {
        $("#additional-input").hide();
      }
  });

$("input[name='service_applied']").click(function(){
    var service_applied = $("input[name='service_applied']:checked").val();
    if(service_applied == 1){
        $('#night-use').show();
        $('#day-use').hide();
    } else if(service_applied == 0 ){
       $('#day-use').show();
       $('#night-use').hide();
    }else if(service_applied == 2 ){
       $('#day-use').show();
       $('#night-use').show();
    }
  });