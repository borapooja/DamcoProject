<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('pageTitle') Hotel Management</title>

        <!-- Bootstrap -->
        <link href="{{ url('admin-dashboard-new/css/bootstrap.min.css') }}" rel="stylesheet">
        <!--style css-->
        <link href="{{ url('admin-dashboard-new/css/style.css') }}" rel="stylesheet">
        <!--fontawesome css-->
        <script src="{{ url('admin-dashboard-new/js/jquery.min.js') }}"></script>
         <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Raleway'>
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>

        <link rel="stylesheet" href="{{url('select/style.css')}}">
      </head>
    <body>

    <?php 
        $path = \Illuminate\Support\Facades\Route::currentRouteName();

        $productRoutes = in_array( $path, [
                                    'create-product', 
                                    'edit-product',
                                    'view-product',
                                    'list-product',
                                   
                                ]);
    ?>

        <div class="container-fluid offset-0">
            <div class="">
                <div class="dashboard-left text-center">
                    <div class="dashboard-logo clearfix">
                        <a href="{{ route('list-product') }}"><img src="{{ url('admin-dashboard-new/img/dashboard-logo.png') }}" alt="" title=""/></a>
                    </div>
                    <div class="dashboard-menu">
                        <ul class="list-unstyled">
                            <li class="<?= $productRoutes == 1 ? 'active' : '' ?>">
                                <a href="{{route('list-product')}}">
                                    <img src="{{ url('admin-dashboard-new/img/profiles.png') }}" alt="Profiles" title="Profiles"/>
                                    <span>Product</span>
                                </a>
                                
                            </li>
                        </ul>
                        <?php 

    				        $categoryRoutes = in_array( $path, [
    				                                    'create-category', 
    	                                                'edit-category',
    	                                                'view-category',
    	                                                'list-category',

    					                                ]);
    				    ?>
    				    <ul class="list-unstyled">
                            <li class="<?= $categoryRoutes == 1 ? 'active' : '' ?>">
                                <a href="{{ route('list-category') }}">
                                    <img src="{{ url('admin-dashboard-new/img/profiles.png') }}" alt="Profiles" title="Profiles"/>
                                    <span>Category</span>
                                </a>
                                
                            </li>
                        </ul>
                    </div>
                </div>
           
            </div>
        </div>
        
        <div class="">
            <div class="dashboard-right">
                <div class="dashboard-header">
                    <nav class="navbar">
                      <div class="container-fluid offset-0">
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                          
	                        <ul class="nav navbar-nav navbar-right">
	                            <li class="dropdown">
	                              <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="{{ url('admin-dashboard-new/img/user-img.png') }}" class="u-img" alt="" title=""/> {{ (Auth::user()->name) ? Auth::user()->name : 'Admin'}}<span class="caret"></span></a>
	                              <ul class="dropdown-menu">
	                                <li>
	                                    <a href="{{ route('logout') }}"
	                                        onclick="event.preventDefault();
	                                                 document.getElementById('logout-form').submit();">
	                                        Logout
	                                    </a>

	                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
	                                        {{ csrf_field() }}
	                                    </form>
	                                </li>
	                              </ul>
	                            </li>
	        
	                          </ul>
                        </div>
                      </div>
                    </nav>
                </div>
                <div class="dashboard-content">

                    @if ( Session::has('success') )
                        <div class="alert alert-success">{{ Session::get('success') }}</div>
                    @endif

                    @if ( Session::has('error') )
                        <div class="alert alert-danger">{{ Session::get('error') }}</div>
                    @endif

                    @if ( Session::has('info') )
                        <div class="alert alert-info">{{ Session::get('info') }}</div>
                    @endif


                    @yield('content')

                </div>
            </div>
        </div>
    </div>
  <script src="{{ url('admin-dashboard-new/js/bootstrap.min.js') }}"></script>
      <script  src="{{url('admin-dashboard-new/js/index.js')}}"></script>

 </body>
</html>
