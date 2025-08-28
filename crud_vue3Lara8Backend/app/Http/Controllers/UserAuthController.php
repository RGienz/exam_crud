<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use App\Models\UserAuth;
use App\Models\Role;
use Illuminate\Http\Request;
use DB;
class UserAuthController extends Controller
{

   

    public function loginUser($email , $password) {
        // return $email . $password;
      
        if (!$email || !$password) {
            return response()->json(['error' => 'Email and password are required'], 400);
        }
    
        $user = UserAuth::where('email', $email)->first();
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        if ($user->password === null) {
            return response()->json(['error' => 'Employee not Registered'], 404);
        }
    
        if (Hash::check($password, $user->password)) {
            // unset($user->password); 
            return response()->json(['message' => 'Login successful', 'user' => $user]);
        } else {
            return response()->json(['error' => 'Incorrect password'], 401);
        }
    }


    public function registerPersonnel( Request $request ){
        // return $request;

        $data = UserAuth::where('email' , $request->email)->first();
        $data2 = UserAuth::where('full_name' , $request->fullname)->first();

        if($data || $data2){
            echo 'andito';
        } else {
            echo 'wala';

            $saveUser = new UserAuth();

            $saveUser->full_name = $request->fullname;
            $saveUser->email = $request->email;
            $saveUser->role_id = $request->selectedRole;
            $saveUser->password = Hash::make($request->confirmPassword);
            $saveUser->created_at = date('Y-m-d H:i:s');
            $saveUser->save();
        }
    }

    public function updateUserTable(Request $request)
{
    try {
        // UserAuth record
        $user = UserAuth::find($request->user_authorize_id);

        if ($user) {
            $user->full_name  = $request->full_name;
            $user->email      = $request->email;
            $user->role_id    = $request->role_id;
            $user->updated_at = now();
            $user->save();
        }

        // Role record
        $role = Role::find($request->roles_Con_id);

        if ($role) {
            $role->description = $request->description;
            $role->updated_at  = now();
            $role->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'User and Role updated successfully',
            'data' => [
                'user' => $user,
                'role' => $role
            ]
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error updating records',
            'error'   => $e->getMessage()
        ], 500);
    }
}



}
