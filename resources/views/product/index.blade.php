@extends('layouts.Product.main')

@section('pageTitle', 'Product ')

@section('content')

    <div class="hotel-content inner-content text-center">
        <div class="heading">
            <h1>Product</h1>
            
            <div class="sort-list">
                <ul class="list-inline text-center">
                    <li>
                        <a href="{{ url('create-product') }}">
                            <img src="{{ url('admin-dashboard-new/img/add-icon.png') }}" alt="" title=""/>
                            <h3>Product</h3>
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
                            <th>Category</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            @if(count($product) > 0)
                            @foreach($product as $key => $value)
                            <tr>
                                <td>{{$key+1}}</td>
                                <td>{{$value->name}}</td>
                                <td><?php echo getCategoryName($value->category_id); ?></td>
                                <td>{{$value->SKU}}</td>
                                <td>{{$value->price}}</td>
                                   <td>
                                        <a href="{{ url('view-product/' . $value->id) }}">
                                            <img src="{{ url('admin-dashboard-new/img/view-icon.png') }}" alt="" title=""/>
                                        </a>
                                        <a href="{{ url('edit-product/' . $value->id) }}">
                                            <img src="{{ url('admin-dashboard-new/img/edit-icon.png') }}" alt="" title=""/>
                                        </a>
                                        
                                        <a href="{{ url('delete-product/' . $value->id) }}">
                                            <img src="{{ url('admin-dashboard-new/img/delete-icon-2.png') }}" alt="" title=""/>
                                        </a>
                                </td>
                            </tr>
                            @endforeach
                            @else
                            <tr>
                                <td colspan="4"><center>No Data found ..!! </center></td>
                            </tr>
                            @endif
                        
                        

                    </tbody>
                </table>
                                {{ $product->appends(Request::all())->links() }}

            </div>
        </div>
    </div>




@endsection