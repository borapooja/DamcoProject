<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Category extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'category';

    protected $fillable = [
        
        'name','status'
    ];
    private $rules = [
        'category_name' => 'required|max:100|unique:category,name',
        'status' => 'required',

       
    ];
    //  public function rules()
    // {
    //     return [
    //         'category_name' => 'required|max:100',
    //         'status' => 'required',
    //     ];
    // }

    public function getRules($argument)
    {

        return $this->$argument;
    }
     public function getUpdateRules()
    {
        return [
            'category_name' => 'required|max:100|unique:category,name,'.$this->id,
            'status' => 'required',
        ];
    }
   

    // public function saveCategory($data)
    // {
    //     $category = New Category();
    //     $category->name   =  $data['category_name'];
    //     $category->status =  $data['status'];
    //     $category->save();
    // }

    public function InsertorUpdate($request)
    {
        $request['name'] = $request['category_name'];
        $this->fill($request, true);
        $this->save();
    }


}
