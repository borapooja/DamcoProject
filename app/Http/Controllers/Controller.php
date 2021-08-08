<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function validate($arguments, Array $rule, Array $message = [])
    {   
        $arguments = is_object($arguments) ? $arguments->all() : $arguments;
        
        return Validator::make($arguments, $rule, $message);
    }
}

