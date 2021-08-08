<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Request;
use App\Models\Category;
use \Validator;

//use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $backroute = 'list-product';
    /**
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        $data = Product::orderBy('id','DESC');
       
        $category = Category::where('status','1')->get();

        $product = $data->paginate(20);
        return view('product.index',compact('product','category'));
    }

    /**
     * Show and create the form for adding new product.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $category = Category::where('status','1')->get();
        if ( Request::isMethod('post') ) {
            $product = new Product();
            $data = Request::except('_method', '_token');

            $validator = $this->validate($data,$product->getRules('rules'));

            if ($validator->fails() ) {
                return redirect()->back()
                            ->withErrors($validator)
                            ->withInput();
            }
           

            $product->store($data);            
            \Session::flash('success', 'product created successfully.');
            return redirect()->route( $this->backroute );
        }
        return view('product.create',compact('category'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function view($id)
    {
        $data = Product::Select('products.*','category.name')->join('category','category.id','=','products.category_id')->where('products.id',$id)->first();
        return view('product.view')->with([ 'data' => $data,
                                        'backroute' => $this->backroute]);    ;

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Category::where('status','1')->get();
        $data = Product::where('products.id',$id)->first();

        if ( Request::isMethod('post') ) {
           // $category = new Category();
            $result = Request::except('_method', '_token');

            $validate = $this->validate($result,$data->getUserUpdateRules(),$data->getRules('rules'));

            //$validate = $data->afterValidate( $validate,$data);

            if ( $validate->fails() ) {
                return redirect()->back()
                            ->withErrors($validate)
                            ->withInput();
            }

            $data->storeUpdate( $result,$id );

            \Session::flash('success', 'Category Updated successfully.');
             return redirect()->route( $this->backroute );
        }

       return view('product.edit')->with([ 'category' => $category,
                                        'backroute' => $this->backroute,
                                        'data' => $data]);    
    }

     /**
     * Delete a Category.
     *
    
     */
    public function delete($id)
    {
       $data = Product::find( $id );

        if ( Request::isMethod('post') ) 
        {
            $data->delete();
            \Session::flash('success', 'Product deleted successfully.');
            return redirect()->route( $this->backroute );
        }

        return view('product.delete')->with(['data' => $data,'backroute' => $this->backroute ]);
    }
}
