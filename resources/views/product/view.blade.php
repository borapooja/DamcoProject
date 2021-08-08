@extends('layouts.Product.main')

@section('pageTitle', 'Product- ')

@section('content')

<div class="inner-content text-center">
    <div class="heading">
      <h1>View Product</h1>
     </div>


    <div class="form-content text-left">
    @if($data)
       <form action="{{route('edit-product',$data->id)}}" method="POST" >
           {{csrf_field()}}         
            <div class="bank-account clearfix text-left">
                <div class="col-md-12 lpadding">
                    <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <h4>Name*</h4>
                    <label>{{$data->name}}</label>
                        
                    </div>
                </div>
                <div class="col-md-12 lpadding">
                    <div class="form-group{{ $errors->has('category_id') ? ' has-error' : '' }}">
                        <h4> Category </h4>
                        <label><?php echo getCategoryName($data->category_id); ?></label>

                    
                    </div>
                </div>
                <div class="col-md-12 lpadding">
                 
                    <div class="form-group{{ $errors->has('SKU') ? ' has-error' : '' }}">
                            <h4>SKU*</h4>
                           <label>{{$data->SKU}}"</label>

                            
                    </div>
                </div>
             
                 <div class="col-md-12 lpadding">
                 
                    <div class="form-group{{ $errors->has('price') ? ' has-error' : '' }}">
                            <h4>Price*</h4>
                            <label>{{$data->price}}</label>
                    </div>
                </div>
            </div>
            <div class="form-btn text-left">
                  <a href="{{ route('list-product')}}"><button type="button" class="btn btn-cancel">Back</button></a>
              </div>
          </form>
        @endif
    </div>
</div>




@endsection