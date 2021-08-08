<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('login', 'Auth\AuthController@index')->name('login');
Route::post('post-login', 'Auth\AuthController@postLogin')->name('login.post'); 
Route::get('registration', 'Auth\AuthController@registration')->name('register');
Route::post('post-registration', 'Auth\AuthController@postRegistration')->name('register.post'); 
Route::get('logout', 'Auth\AuthController@logout')->name('logout');

Route::group(['middleware' => ['auth:sanctum', 'verified']], function() {
    //Route::get('/list-all-items','ProductController@index')->name('list-product');
Route::get('/list-product','ProductController@index')->name('list-product');
Route::match(['get','post'],'/create-product','ProductController@create')->name('create-product');
Route::match(['get','post'],'/edit-product/{id}','ProductController@edit')->name('edit-product');
Route::match(['get', 'post'], 'delete-product/{id}', 'ProductController@delete')->name('delete-product');
Route::get('/view-product/{id}','ProductController@view')->name('view-product');

Route::get('/list-category','CategoryController@index')->name('list-category');
Route::match(['get','post'],'/create-category','CategoryController@create')->name('create-category');
Route::match(['get','post'],'/edit-category/{id}','CategoryController@edit')->name('edit-category');
Route::match(['get', 'post'], 'delete-category/{id}', 'CategoryController@delete')->name('delete-category');
Route::get('/view-category/{id}','CategoryController@view')->name('view-category');
});

