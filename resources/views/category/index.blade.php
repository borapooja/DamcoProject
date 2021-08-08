@extends('layouts.Product.main')

@section('pageTitle', 'Category- ')

@section('content')

    <div class="hotel-content inner-content text-center">
        <div class="heading">
            <h1>Category</h1>
            
            <div class="sort-list">
                <ul class="list-inline text-center">
                    <li>
                        <a href="{{ route('create-category') }}">
                            <img src="{{ url('admin-dashboard-new/img/add-icon.png') }}" alt="" title=""/>
                            <h3>Category</h3>
                        </a>
                    </li>
                   
                </ul>
            </div>
        </div>
        <div class="form-content">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                             <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            @if(count($category) > 0)
                            @foreach($category as $key => $value)
                            <tr>
                                <td>{{$key+1}}</td>
                                <td>{{$value->name}}</td>
                                <td>{{($value->status == '1'? 'Active':'InActive')}}</td>
                                   <td>
                                        <!-- <a href="{{ url('view-category/' . $value->id) }}">
                                            <img src="{{ url('admin-dashboard-new/img/view-icon.png') }}" alt="" title=""/>
                                        </a> -->
                                        <a href="{{ route('edit-category' ,[$value->id]) }}">
                                            <img src="{{ url('admin-dashboard-new/img/edit-icon.png') }}" alt="" title=""/>
                                        </a>
                                        
                                        <a href="{{ route('delete-category' ,[$value->id]) }}">
                                            <img src="{{ url('admin-dashboard-new/img/delete-icon-2.png') }}" alt="" title=""/>
                                        </a>
                                </td>
                            </tr>
                            @endforeach
                            @else
                            <tr>
                                <td colspan="3"><center>No Data found ..!! </center></td>
                            </tr>
                            @endif
                    </tbody>
                      {{ $category->appends(Request::all())->links() }}
                </table>
            </div>
        </div>
    </div>




@endsection