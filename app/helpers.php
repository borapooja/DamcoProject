<?php 

use Illuminate\Support\Facades\Auth;
//use DB;

function getCategoryName($category)
{
  $cat  = explode(',',$category);
  foreach($cat as $value)
  {
  	 $data = \DB::table('category')->where('id',$value)->first();
     $name[] = $data->name;
  }
  $result = implode(',',$name);
  //dd($result);
 
  return $result;
 
}
 ?>}
