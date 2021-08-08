<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;



class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json =   base_path().'/product_data.json';
        $product = json_decode(file_get_contents($json), true);
  
        foreach ($product['products'] as $key => $value) {
            $getData = explode(',',$value['category']);
            $cat_id  = [];
            foreach($getData as $key1=> $cat)
            { 
                $check = Category::where('name',$cat)->get();
                if(count($check)>0){
                   $cat_id[] = $check[0]->id;
                }
                else
                {
                    $category = Category::create([
                    "name" => $cat,
                    "status" => "1"
                    ]); 
                     $cat_id[] = $category->id ;
                     //dd($cat_id);
                     $result = array_unique($cat_id);
                }
               
               

              
            }
             $result[$key]= array_unique($cat_id);
            

            
            if(count($result[$key]) >0)
            {
                $category = implode(',',$result[$key]);
                    Product::create([
                    "name" => $value['name'],
                    "category_id" => $category,
                    "SKU" => $value['sku'],
                    "price" => $value['price'],
            ]);

            } 
            
        }
       
    }
    
}
