<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VisitorModel;
use App\Models\ServicesModel;
use App\Models\CoursesModel;



class HomeController extends Controller
{
    function HomeIndex(){

        $UserIP = $_SERVER['REMOTE_ADDR'];
        date_default_timezone_set("Asia/Dhaka");
        $timeDate = date("Y-m-d h:i:sa");

        VisitorModel::insert(['ip_address'=>$UserIP,'visit_time'=>$timeDate]);

        $servicesData = json_decode(ServicesModel::all());
        $coursesData = json_decode(CoursesModel::orderBy('id','desc')->limit(6)->get());

        return view('Home',['servicesData'=>$servicesData,'coursesData'=>$coursesData]);
    }
}
