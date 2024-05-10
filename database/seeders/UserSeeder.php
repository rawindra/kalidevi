<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $adminRole = Role::create(['name' => 'admin']);
       $stockManagerRole = Role::create(['name' => 'stock-manager']);
       $userRole = Role::create(['name' => 'user']);

       $adminUser = User::create([
        'name' => 'Kali Devi Store',
        'email' => 'info@kalidevi.com.np',
        'password' => bcrypt('palung@1993'),
       ]);

       $stockManagerUser = User::create([
        'name' => 'Bijaya Thapa',
        'email' => 'tbijay91@gmail.com',
        'password' => bcrypt('palung@1993'),
       ]);

       $clientUser = User::create([
        'name' => 'Binod Chaudhary',
        'email' => 'bunnycdy@gmail.com',
        'password' => bcrypt('Binod@5991'),
       ]);

       $adminUser->assignRole($adminRole);
       $stockManagerUser->assignRole($stockManagerRole);
       $stockManagerUser->assignRole($userRole);
    }
}
