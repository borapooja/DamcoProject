@extends('layouts.Product.main')

@section('pageTitle', 'Category- ')

@section('content')

<div class="inner-content text-center">
  <div class="heading">
      <h1>Edit Category</h1>
  </div>


  <div class="form-content text-left">
    @if($data)
    <form action="{{route('edit-category', [$data->id])}}" method="POST" >
       {{csrf_field()}}         
      <div class="bank-account clearfix text-left">
        <div class="col-md-6 lpadding">
          <div class="form-group{{ $errors->has('category_name') ? ' has-error' : '' }}">
          <label>Name*</label>
          <input type="text" id="category_name" name="category_name" class="form-control" value="{{$data->name}}">
               
            @if ($errors->has('category_name'))
              <span class="help-block">
                  <strong>{{ $errors->first('category_name') }}</strong>
              </span>
          @endif
          </div>
        </div>
        <div class="col-md-6 lpadding">
          <div class="form-group{{ $errors->has('status') ? ' has-error' : '' }}">
            <label>Select Status</label>
            <select class="form-control" name="status">
                <option value="1" @if($data->status == 1) selected @endif>Active</option>
                <option value="0" @if($data->status == 0) selected @endif>Inactive</option>
            </select>

            @if ($errors->has('status'))
              <span class="help-block">
                  {{ $errors->first('status') }}
              </span>
            @endif
          </div>
        </div>
      </div>
      <div class="form-btn text-left">
          <button type="submit" class="btn btn-submit">Update</button>
          <a href="{{ route('list-category')}}"><button type="button" class="btn btn-cancel">Cancel</button></a>
      </div>
    </form>
  @endif

    </div>
</div>




@endsection