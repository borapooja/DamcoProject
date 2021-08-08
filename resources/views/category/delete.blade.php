@extends('layouts.Product.main')

@section('pageTitle', "Delete Category $data->name ")

@section('content')

<div class="inner-content text-center">
   <form action="{{route('delete-category', [$data->id])}}" method="POST" >
       {{csrf_field()}}         

		<div class="" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				
					<div class="modal-header">
						<h4 class="modal-title">Confirmation</h4>
					</div>
					<div class="modal-body">
						<p>Are you sure you want to delete Category {{ $data->name }}?</p>
					</div>
					<div class="modal-footer">
			            <div class="form-btn text-left">
			                <button type="submit" class="btn btn-submit">Delete</button>
			                <button type="button" onclick="document.location = '{{ route($backroute) }}'" class="btn btn-cancel">Cancel</button>
			            </div>
					</div>
				
				</div>
			</div>
		</div>

	</form>
</div>

@endsection