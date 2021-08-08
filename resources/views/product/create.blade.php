@extends('layouts.Product.main')

@section('pageTitle', 'Product- ')

@section('content')

<div class="inner-content text-center">
    <div class="heading">
          <h1>Add Product</h1>
    </div>


    <div class="form-content text-left">
       <form action="{{route('create-product')}}" method="POST" >
           {{csrf_field()}}         
            <div class="bank-account clearfix text-left">
                <div class="col-md-6 lpadding">
                    <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label>Name*</label>
                    <input type="text" id="name" name="name" class="form-control" value="{{old('name')}}">
                         
                      @if ($errors->has('name'))
                        <span class="help-block">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                    </div>
                </div>
              
                <div class="col-md-6 lpadding">
                    <div class="form-group{{ $errors->has('SKU') ? ' has-error' : '' }}">
                        <label>SKU*</label>
                        <input type="text" id="SKU" name="SKU" class="form-control" value="{{old('SKU')}}">

                        @if ($errors->has('SKU'))
                            <span class="help-block">
                                {{ $errors->first('SKU') }}
                            </span>
                        @endif
                    </div>
                 </div>
         
                 <div class="col-md-6 lpadding">
                 
                    <div class="form-group{{ $errors->has('price') ? ' has-error' : '' }}">
                        <label>Price*</label>
                        <input type="text" id="price" name="price" class="form-control" value="{{old('price')}}">

                        @if ($errors->has('price'))
                            <span class="help-block">
                                {{ $errors->first('price') }}
                            </span>
                        @endif
                    </div>
                </div>
                <div class="col-md-6 lpadding">
                   <div class="form-group{{ $errors->has('category_id') ? ' has-error' : '' }}">
                        <label>Select category</label>
                        <!-- <select multiple="multiple" id="myMulti" name="category_id[]">
                             @foreach($category as $key =>$value)
                              <option value="{{$value->id}}">{{$value->name}}</option>
                             
                              @endforeach
                              
                            </select> -->
                        <select class="form-control" name="category_id[]" multiple>
    <!--                       <option value="">Select</option>
     -->                      @foreach($category as $key =>$value)
                            <option value="{{$value->id}}">{{$value->name}}</option>
                            @endforeach
                        </select>

                        @if ($errors->has('category_id'))
                            <span class="help-block">
                                {{ $errors->first('category_id') }}
                            </span>
                        @endif
                        </div>
                    </div>
                </div>
              <div class="form-btn text-left">
                  <button type="submit" class="btn btn-submit">Create</button>
                  <a href="{{ route('list-product')}}"><button type="button" class="btn btn-cancel">Cancel</button></a>
              </div>
            </form>
        </div>
    </div>
</div>



@endsection