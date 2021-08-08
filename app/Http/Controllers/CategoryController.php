<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Request;
use App\Models\Category;
use Validator;

//use Illuminate\Http\Request;

class CategoryController extends Controller
{
        protected $backroute = 'list-category';

  
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data     = Category::orderBy('id','DESC');
        $category = $data->paginate(20);

        return view('category.index',compact('category'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if ( Request::isMethod('post') ) {
            $category = new Category();
            $data = Request::except('_method', '_token');
            $validator = $this->validate($data,$category->getRules('rules'));
            if ($validator->fails() ) {
                return redirect()->back()
                            ->withErrors($validator)
                            ->withInput();
            }

            $category->insertOrUpdate($data);            
            \Session::flash('success', 'Category created successfully.');
            return redirect()->route( $this->backroute );
        }
        return view('category.create');
    }

    /**
     * Delete a Category.
     *
    
     */
    public function delete($id)
    {
       $data = Category::find( $id );

        if ( Request::isMethod('post') ) 
        {
            $data->delete();
            \Session::flash('success', 'Category deleted successfully.');
            return redirect()->route( $this->backroute );
        }

        return view('category.delete')->with(['data' => $data,
                                            'backroute' => $this->backroute
                                                ]);
    }

    /**
     * Edit and Update the specified resource.
    
     */
    public function edit($id)
    {
       $data = Category::where('id',$id)->first();

        if ( Request::isMethod('post') ) {
           // $category = new Category();
            $result = Request::except('_method', '_token');

            $validate = $this->validate($result,$data->getUpdateRules(),$data->getRules('rules'));


            if ( $validate->fails() ) {
                return redirect()->back()
                            ->withErrors($validate)
                            ->withInput();
            }

            $data->insertOrUpdate( $result );

            \Session::flash('success', 'Category Updated successfully.');
             return redirect()->route( $this->backroute );
        }

       return view('category.edit')->with([
                                        'backroute' => $this->backroute,
                                        'data' => $data]);    
    }
}
