<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Product extends Model
{
    use HasFactory;
    use SoftDeletes;


    protected $fillable = [
        
        'name','category_id','SKU','price'
    ];
    private $rules = [
        'name' => 'required|max:100|unique:products,name',
        'category_id' => 'required',
        'SKU' => 'required',
        'price' => 'required|numeric',

       
    ];

     public function getUserUpdateRules()
    {
        return [
            'name' => 'required|max:100|unique:products,name,'.$this->id,
            'category_id' => 'required',
            'SKU' => 'required',
            'price' => 'required|numeric',
        ];
    }

    public function getRules($argument)
    {

        return $this->$argument;
    }

    public function store($request)
    { 
        if(isset($request['category_id']))
        {       
                $category = $str = implode (", ", $request['category_id']);
                $product = new Product();
                $product->name = $request['name'];
                $product->category_id = $category;
                $product->SKU = $request['SKU'];
                $product->price = $request['price'];
                $product->save();

           
        }
        
    }
   

    public function storeUpdate($request,$id)
    { 
        if(isset($request['category_id']))
        {       
                $category = $str = implode (", ", $request['category_id']);
                $result = Product::where('id',$id)
                     ->update(['name' =>$request['name'],'category_id'=>$category,'SKU'=>$request['SKU'],'price' =>$request['price']]);
              

           
        }
        
    }


}
