<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use DB;
class RoleController extends Controller
{

    public function loadRole(Request $request) {
        $data = DB::connection('mysql')
        ->select(
            DB::raw(
                "SELECT 
                    r.id,
                    r.role_name,
                    r.description
                FROM roles AS r
                "
            )
        );
        return $data;
    }

    public function tableRole( Request $request ) {
        // return $request;

        $table = DB::connection('mysql')
        ->select(
            DB::raw(
                "SELECT
                    ua.id,
                    ua.full_name,
                    ua.email,
                    ua.password,
                    ua.role_id,
                    r.role_name,
                    r.`description`
                FROM user_auths AS ua
                LEFT JOIN roles AS r
                ON ua.role_id = r.id
                "
            )
        );

        return $table;
    }
  
}
