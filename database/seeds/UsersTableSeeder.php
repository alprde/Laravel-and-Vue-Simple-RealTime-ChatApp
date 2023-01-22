<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::create([
            'name' => 'System',
            'email' => 'system@system.com',
            'password' => \Illuminate\Support\Facades\Hash::make('emsal_system'), // secret
            'remember_token' => str_random(10),
        ]);
    }
}
