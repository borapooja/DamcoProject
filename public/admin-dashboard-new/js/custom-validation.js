
/********************* Jquery validation *********************/

$(document).ready(function() {

    $("[name='room_status[]']").click(function(){
        $("input[name='room_status[]']").each(function(){
            var current = $(this);
            var current_ele_id = current.data('value');
            if($( this).is(":checked") ) {
                $( '.room_type_' + current_ele_id ).show();
            } else {
                $( '.room_type_' + current_ele_id ).hide();
            }
        });
    });

    //method for check name with characters and one space between words
    $.validator.addMethod( "alpha", function( value, element ) {
        return this.optional( element ) || /^[A-Za-z]+( [A-Za-z]+)*$/i.test( value );
    }, "Letters only please." );

    $.validator.addMethod( "alphaNumericWithSpace", function( value, element ) {
        return this.optional( element ) || /^[A-Za-z0-9- ]*$/i.test( value );
    }, "Letters only please." );
    
    $.validator.addMethod('selectcheck', function (value) {
        return (value != '0');
    }, "City required.");

    $.validator.addMethod("selectOneAmenity", function(value, elem, param) {
        if($("input[name='spoken_language[]']:checkbox:checked").length > 0){
            return true;
       }else {
            return false;
       }
    },"You must select at least one room amenity!");

    $.validator.addMethod('oneCheck', function(value, ele) {
        return $("input[name='room_status[]']:checked").length >= 1;
    }, 'Please Select Atleast One CheckBox')

    $.validator.addMethod('minImageWidth', function(value, element, minWidth) {
            return ($(element).data('width') || 0) >= minWidth;
        },  function(minWidth, element) {
            var width = $(element).data('width');
            return (width)
                ? ("Image dimensions must be greater than 2048 x 1536 px")
                : "Selected file is not an image.";
    });
    $.validator.addMethod('minImageHeight', function(value, element, minHeight) {
            return ($(element).data('height') || 0) >= minHeight;
        }, function(minHeight, element) {
            var height = $(element).data('height');
            return (height)
                ? ("Image dimensions must be greater than 2048 x 1536 px")
                : "Selected file is not an image.";
    });
    $.validator.addMethod('ImageSize', function(value, element, minSize) {
            return ($(element).data('size') || 0) <= minSize;
        }, function(minSize, element) {
            var height = $(element).data('size');
            return (height)
                ? ("Image Size must be less than " + minSize + " MB")
                : "Selected file is not an image.";
    });

    $.validator.addMethod('width', function (value, element) {
        if ($(element).data('width')) {
            return $(element).data('width') >= 800;
        }
        return true;
    }, 'Image needs to be wider than 800px');

    $.validator.addMethod('minTestimonialImageWidth', function(value, element, minWidth) {
            return ($(element).data('width') || 0) >= minWidth;
        }, function(minWidth, element) {
            var width = $(element).data('width');
            return (width)
                ? ("Image dimensions must be greater than 1366 x 430 px")
                : "Selected file is not an image.";
    });
    $.validator.addMethod('minTestimonialImageHeight', function(value, element, minHeight) {
            return ($(element).data('height') || 0) >= minHeight;
        }, function(minHeight, element) {
            var height = $(element).data('height');
            return (height)
                ? ("Image dimensions must be greater than 1366 x 430 px")
                : "Selected file is not an image.";
    });

    $.validator.addMethod("checkRoomType", function(value, elem, param) {
        if( $("input[name='room_status[]']").length > 0) {
            if($("input[name='room_status[]']:checked").length == 0){
                return false;
            }else {
                error =0;
                $("input[name='room_status[]']:checked").each(function(){
                    $(this).parent().parent().parent().siblings().find("input:text").each(function(){
                        if($(this).val() == '' || $(this).val() == 0) {
                              error =1;   
                        }
                    });
                    $(this).parent().parent().parent().siblings().find("select").each(function(){
                          if($(this).val() == '' || $(this).val() == 0) {
                              error =1; 
                          }
                    });
                });
                if (error)
                    return false;
                else
                    return true;
            }
        } else {
            return false;
        }
    },"You have to enter all details for selected room types!");

    /*-----------staff-management add form validation-----------*/
    $("form[name='add-staff-management']").validate({
        rules: {
            first_name: {
              required: true,
              // lettersonly: true,
              maxlength: 30
            },
            last_name: {
              required: true,
              // lettersonly: true,
              maxlength: 30
            },
            email: {
              required: true,
              email: true
            },
            password : {
              required: true,
             // minlength:6
            },
            password_confirmation : {
              required: true,
              equalTo: "#password"
            },
            contact_number: {
              required: true,
              number: true,
              minlength:4,
              maxlength:15
            },
            // picture: {
            //   accept: "jpeg|png|jpg|bmp"
            // },
            country_id: {
              required:true
            },
            city_id : {
              required: true,
              selectcheck:true
            },
            address : {
              required: true
            },
            city_name : {
              required: true
            },
            zip : {
              required: true
            }
        },
        messages: {
            first_name: {
              required: "Please enter first name.",
              lettersonly: "Please enter only characters.",
              maxlength : "Please enter not more than 30 characters."
            },
            last_name: {
              required: "Please enter last name.",
              lettersonly: "Please enter only characters.",
              maxlength : "Please enter not more than 30 characters."
            },
            email: {
              required: "Please enter email.",
              email: "Please enter a valid email address."
            },
            password_confirmation: {
              required: "Please enter password.",
              //equalTo: "Password must be atleast 6 characters."
            },
           
            password_confirmation: {
              required: "Please enter confirm password.",
              equalTo: " Please enter confirm password Same as password"
            },
            contact_number: {
              required: "Please enter Contact number.",
              number: "Please enter only Numbers.",
              minlength : "Please enter atleast 4 numbers.",
              maxlength : "Please enter not more than 15 numbers."
            },
            // picture: {
            //   accept: "Please upload jpeg,bmp,png,jpg images."
            // },
            country_id: {
              required: "Please select country."
            },
            city_id: {
              required: "Please select city.",
              selectcheck: "Please select city."
            },
            address: {
              required: "Please enter address."
            },
            city_name: {
              required: "Please enter city."
            },
            zip: {
              required: "Please enter zip."
            }
        }
    });

    /*-----------staff-management edit form validation-----------*/
    $("form[name='edit-staff-management']").validate({
        rules: {
            first_name: {
              required: true,
              // lettersonly: true,
              maxlength: 30
            },
            last_name: {
              required: true,
              // lettersonly: true,
              maxlength: 30
            },
            email: {
              required: true,
              email: true
            },
            contact_number: {
              required: true,
              number: true,
              minlength:4,
              maxlength:15
            },
            // picture: {
            //   accept: "image/jpg,image/jpeg,image/png,image/bmp"
            //   //accept: "jpeg|png|jpg|bmp",
                  //extension: "jpg|jpeg|png|gif"
            // },
            country_id: {
              required:true
            },
            city_id : {
              required: true,
              selectcheck:true
            },
            city_name:{
              required: true,
            },
            old_password: {
              required: function(element) {
                var new_pas = ($("#old_password").val())? $("#old_password").val().length : $("#new_password").val().length;
                if (new_pas > 0) {
                  return true;
                }
                else {
                  return false;
                }
              },
            },
            new_password: {
              required: function(element) {
                var new_pas = ($("#old_password").val())? $("#old_password").val().length : $("#new_password").val().length;
                if (new_pas > 0) {
                  return true;
                }
                else {
                  return false;
                }
              },
              minlength:6
            },
            new_password_confirmation: {
              required: function(element) {
                var new_pas = ($("#old_password").val())? $("#old_password").val().length : $("#new_password").val().length;
                if (new_pas > 0) {
                  return true;
                }
                else {
                  return false;
                }
              },
              equalTo: "#new_password"
            }
        },
        messages: {
            first_name: {
              required: "Please enter first name.",
              lettersonly: "Please enter only characters.",
              maxlength : "Please enter not more than 30 characters."
            },
            last_name: {
              required: "Please enter last name.",
              lettersonly: "Please enter only characters.",
              maxlength : "Please enter not more than 30 characters."
            },
            email: {
              required: "Please enter email.",
              email: "Please enter a valid email address."
            },
            contact_number: {
              required: "Please enter Contact number.",
              number: "Please enter only Numbers.",
              minlength : "Please enter atleast 4 numbers.",
              maxlength : "Please enter not more than 15 numbers."
            },
            // picture: {
            //   accept: "Please upload jpeg,bmp,png,jpg images."
            // },
            country_id: {
              required: "Please select country."
            },
            city_id: {
              required: "Please select city.",
              selectcheck: "Please select city."
            },
            city_name: {
              required: "Please enter city."
            },
            old_password: {
              required: "Please enter old password."
            },
            new_password: {
              required: "Please enter new password.",
              //minlength : "New password must be atleast 6 characters."
            },
            new_password_confirmation: {
              required: "Please enter confirm password.",
              equalTo: " Please enter confirm password Same as new password"
            }
        }
    });

    /*-----------company-details form validation-----------*/
    $("form[name='company-detail']").validate({
        rules: {
            title: {
              required: true,
              alpha: true
            },
            email: {
              required: true,
              email: true
            },
            contact_number: {
              required: true,
              number: true,
              minlength:4,
              maxlength:15
            }
        },
        // Specify validation error messages
        messages: {
            title: {
              required: "Please enter Company Name.",
              alpha: "Please enter only characters."
            },
            email: {
              required: "Please enter email.",
              email: "Please enter a valid email address."
            },
            contact_number: {
              required: "Please enter Contact Number.",
              number: "Please enter only Numbers.",
              minlength : "Please enter atleast 4 numbers.",
              maxlength : "Please enter not more than 15 numbers."
            }
        },
        // errorPlacement: function(error, element) { 
        //     $(element).addClass('help-block');        
        //     error.insertBefore(element);
        // }
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        //submitHandler: function(form) {
            //form.submit();
        //}
    });

    /*-----------home-details form validation-----------*/
    $("form[name='add-home-info']").validate({
        rules: {
            testimonial_image: {
                required: function(element) {
                    if ($("#td_testimonial_image").val() == 0 || $("#td_testimonial_image").val() == '' ){
                        return true;
                    } else {
                        return false;
                    }
                },
                minTestimonialImageWidth: function(element) {
                    if ($("#td_testimonial_image").val() == 0 || $("#td_testimonial_image").val() == ''){
                        return 1366;
                    } else {
                        if ($("input[name='testimonial_image']").val() != ''){
                            return 1366;
                        } else {
                          return false;
                        }
                    }
                },
                minTestimonialImageHeight: function(element) {
                    if ($("#td_testimonial_image").val() == 0 || $("#td_testimonial_image").val() == ''){
                        return 430;
                    } else {
                        if ($("input[name='testimonial_image']").val() != ''){
                            return 430;
                        } else {
                          return false;
                        }
                    }
                },
                accept: "image/jpg,image/jpeg,image/png,image/bmp"
            }
        },
        messages: {
            testimonial_image: {
                required:"Please upload testimonial image.",
                accept: "Please upload jpeg,bmp,png,jpg images."
            }
        },
        errorPlacement: function(error, element) { 
            if (element.attr("name") == "testimonial_image") {
                var lastCheck = $('[name="'+element.attr("name")+'"]');
                error.insertAfter(lastCheck.parent().parent().parent());
            }
            else {
                error.insertAfter(element); 
            }
        }
    });

});